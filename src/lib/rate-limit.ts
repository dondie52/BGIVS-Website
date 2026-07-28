import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { PublicMessages } from "@/lib/errors";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Rate-limit by hashed IP + endpoint. Never stores the raw IP.
 */
export async function enforceRateLimit(options: {
  request: Request;
  endpoint: string;
  maxRequests?: number;
  windowSeconds?: number;
}): Promise<{ ok: true } | { ok: false; status: 429; message: string }> {
  const {
    request,
    endpoint,
    maxRequests = 5,
    windowSeconds = 900,
  } = options;

  const { rateLimitSecret } = getServerEnv();
  const ip = clientIp(request);
  const bucketHash = await sha256Hex(`${rateLimitSecret}:${ip}:${endpoint}`);

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_bucket_hash: bucketHash,
    p_endpoint: endpoint,
    p_max_requests: maxRequests,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    console.error("[rate-limit] check failed", { endpoint, message: error.message });
    // Fail closed would block all traffic on infra issues; fail open with log.
    return { ok: true };
  }

  if (data === false) {
    return {
      ok: false,
      status: 429,
      message: PublicMessages.rateLimit,
    };
  }

  return { ok: true };
}

/**
 * Verify Cloudflare Turnstile token when TURNSTILE_SECRET_KEY is configured.
 * If the secret is empty, verification is skipped (returns true).
 */
export async function verifyTurnstile(
  token: string | undefined,
): Promise<boolean> {
  const { turnstileSecretKey } = getServerEnv();

  if (!turnstileSecretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: turnstileSecretKey,
      response: token,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    if (!response.ok) return false;

    const payload = (await response.json()) as { success?: boolean };
    return Boolean(payload.success);
  } catch (error) {
    console.error("[turnstile] verification failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return false;
  }
}
