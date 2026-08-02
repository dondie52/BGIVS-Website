import { NextResponse } from "next/server";
import { z } from "zod";
import { createErrorId, PublicMessages } from "@/lib/errors";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasServiceRoleKey, hasSupabaseConfig } from "@/lib/supabase/form";
import { getFormRuntimeEnv } from "@/lib/env";
import { sha256Hex } from "@/lib/crypto-hash";
import { enforceRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const visitSchema = z.object({
  visitorId: z.string().min(8).max(128),
  sessionId: z.string().min(8).max(128),
  path: z.string().min(1).max(500),
  pageTitle: z.string().max(200).optional(),
  referrer: z.string().max(1000).optional(),
  language: z.string().max(80).optional(),
  timezone: z.string().max(120).optional(),
  screenWidth: z.number().int().min(0).max(10000).optional(),
  screenHeight: z.number().int().min(0).max(10000).optional(),
  consentVersion: z.string().max(40).optional(),
});

function header(request: Request, name: string): string | null {
  const value = request.headers.get(name);
  return value && value.trim() ? value.trim() : null;
}

function clientIp(request: Request): string {
  const forwarded = header(request, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return header(request, "x-real-ip") ?? "unknown";
}

function deviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobile|iphone|android/.test(ua)) return "mobile";
  if (ua) return "desktop";
  return "unknown";
}

function browserFamily(userAgent: string): string {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Chrome\//.test(userAgent) && !/Chromium\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) return "Safari";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  return userAgent ? "Other" : "Unknown";
}

function operatingSystem(userAgent: string): string {
  if (/Windows/i.test(userAgent)) return "Windows";
  if (/Android/i.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
  if (/Mac OS X|Macintosh/i.test(userAgent)) return "macOS";
  if (/Linux/i.test(userAgent)) return "Linux";
  return userAgent ? "Other" : "Unknown";
}

function utmValue(url: URL, key: string): string | null {
  const value = url.searchParams.get(key);
  return value ? value.slice(0, 200) : null;
}

export async function POST(request: Request) {
  const errorId = createErrorId();

  try {
    const raw = await request.json();
    const parsed = visitSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: PublicMessages.validation },
        { status: 400 },
      );
    }

    const rate = await enforceRateLimit({
      request,
      endpoint: "analytics_visit",
      maxRequests: 90,
      windowSeconds: 900,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { success: false, message: rate.message },
        { status: rate.status },
      );
    }

    if (!hasSupabaseConfig() || !hasServiceRoleKey()) {
      console.warn("[analytics] Supabase service role unavailable", { errorId });
      return NextResponse.json({ success: true }, { status: 202 });
    }

    const data = parsed.data;
    const url = new URL(data.path, "https://bgivs.local");
    const userAgent = header(request, "user-agent") ?? "";
    const countryCode =
      header(request, "x-vercel-ip-country") ?? header(request, "cf-ipcountry");
    const region = header(request, "x-vercel-ip-country-region");
    const city = header(request, "x-vercel-ip-city");
    const ip = clientIp(request);
    const { rateLimitSecret } = getFormRuntimeEnv();
    const ipHash = await sha256Hex(`${rateLimitSecret}:analytics:${ip}`);

    const supabase = createAdminClient();
    const { error } = await supabase.from("visitor_events").insert({
      visitor_id: data.visitorId,
      session_id: data.sessionId,
      event_name: "page_view",
      path: url.pathname,
      page_title: data.pageTitle ?? null,
      referrer: data.referrer ?? null,
      utm_source: utmValue(url, "utm_source"),
      utm_medium: utmValue(url, "utm_medium"),
      utm_campaign: utmValue(url, "utm_campaign"),
      utm_term: utmValue(url, "utm_term"),
      utm_content: utmValue(url, "utm_content"),
      device_type: deviceType(userAgent),
      browser_family: browserFamily(userAgent),
      operating_system: operatingSystem(userAgent),
      user_agent: userAgent.slice(0, 500) || null,
      language: data.language ?? null,
      timezone: data.timezone ?? null,
      screen_width: data.screenWidth ?? null,
      screen_height: data.screenHeight ?? null,
      country_code: countryCode,
      region,
      city,
      ip_hash: ipHash,
      consent_version: data.consentVersion ?? "2026-07-29",
      metadata: {},
    });

    if (error) {
      console.error("[analytics] insert failed", {
        errorId,
        message: error.message,
      });
    }

    return NextResponse.json({ success: true }, { status: error ? 202 : 201 });
  } catch (error) {
    console.error("[analytics] unexpected error", {
      errorId,
      message: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { success: false, message: PublicMessages.server, errorId },
      { status: 500 },
    );
  }
}
