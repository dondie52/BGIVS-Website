import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { createErrorId, PublicMessages } from "@/lib/errors";
import { enforceRateLimit, verifyTurnstile } from "@/lib/rate-limit";
import {
  enquiryFieldErrors,
  enquirySchema,
  normalizeEnquiryInput,
} from "@/lib/validations/enquiry";

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1) : "unknown";
}

async function notifyEnquiry(
  enquiryId: string,
): Promise<void> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.functions.invoke("notify-enquiry", {
      body: { enquiryId },
    });

    if (error) {
      // Fallback to direct functions URL with service role.
      const { supabaseUrl, serviceRoleKey } = getServerEnv();
      await fetch(`${supabaseUrl}/functions/v1/notify-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ enquiryId }),
      });
    }
  } catch (error) {
    console.error("[enquiries] notify failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
  }
}

export async function POST(request: Request) {
  const errorId = createErrorId();

  try {
    const raw = await request.json();
    const normalized = normalizeEnquiryInput(raw);

    // Honeypot: pretend success without persisting.
    if (
      typeof normalized.website === "string" &&
      normalized.website.length > 0
    ) {
      return NextResponse.json(
        { success: true, message: PublicMessages.enquirySuccess },
        { status: 201 },
      );
    }

    const parsed = enquirySchema.safeParse(normalized);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: PublicMessages.validation,
          errors: enquiryFieldErrors(parsed.error),
        },
        { status: 400 },
      );
    }

    const rate = await enforceRateLimit({
      request,
      endpoint: "enquiries",
    });
    if (!rate.ok) {
      return NextResponse.json(
        { success: false, message: rate.message },
        { status: rate.status },
      );
    }

    const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        {
          success: false,
          message: PublicMessages.validation,
          errors: { turnstileToken: "Please complete the security check." },
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const supabase = createAdminClient();

    const { data: inserted, error } = await supabase
      .from("enquiries")
      .insert({
        full_name: data.fullName,
        position_role: data.positionRole,
        organization: data.organization,
        organization_category: data.organizationCategory,
        email: data.email,
        phone: data.phone ?? null,
        country: data.country,
        programme_or_service: data.programmeOrService,
        message: data.message,
        consent: data.consent,
        source_page: data.sourcePage ?? null,
        referrer: data.referrer ?? null,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("[enquiries] insert failed", {
        errorId,
        message: error?.message,
        emailDomain: emailDomain(data.email),
      });
      return NextResponse.json(
        { success: false, message: PublicMessages.server, errorId },
        { status: 500 },
      );
    }

    // Fire-and-forget notification; never fail the HTTP response for this.
    void notifyEnquiry(inserted.id);

    return NextResponse.json(
      { success: true, message: PublicMessages.enquirySuccess },
      { status: 201 },
    );
  } catch (error) {
    console.error("[enquiries] unexpected error", {
      errorId,
      message: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { success: false, message: PublicMessages.server, errorId },
      { status: 500 },
    );
  }
}
