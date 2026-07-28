import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createFormClient, hasServiceRoleKey, hasSupabaseConfig } from "@/lib/supabase/form";
import { getServerEnv } from "@/lib/env";
import { createErrorId, PublicMessages } from "@/lib/errors";
import { sendEnquiryNotificationEmail } from "@/lib/notify/email";
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

async function notifyEnquiry(enquiryId: string): Promise<boolean> {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return false;

    const supabase = createAdminClient();
    const { error } = await supabase.functions.invoke("notify-enquiry", {
      body: { enquiryId },
    });

    if (!error) return true;

    const { supabaseUrl, serviceRoleKey } = getServerEnv();
    const response = await fetch(`${supabaseUrl}/functions/v1/notify-enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ enquiryId }),
    });
    return response.ok;
  } catch (error) {
    console.error("[enquiries] notify edge invoke failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return false;
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
    let enquiryId: string | null = null;
    let persisted = false;
    let insertErrorMessage: string | undefined;

    if (hasSupabaseConfig()) {
      try {
        const supabase = createFormClient();
        const row = {
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
        };

        if (hasServiceRoleKey()) {
          const { data: inserted, error } = await supabase
            .from("enquiries")
            .insert(row)
            .select("id")
            .single();

          if (error || !inserted) {
            insertErrorMessage = error?.message ?? "insert returned no row";
            console.error("[enquiries] insert failed", {
              errorId,
              message: insertErrorMessage,
              emailDomain: emailDomain(data.email),
            });
          } else {
            enquiryId = inserted.id;
            persisted = true;
          }
        } else {
          // Anon/publishable inserts are write-only (no SELECT policy). Do not
          // chain .select() or PostgREST will reject a successful insert.
          const { error } = await supabase.from("enquiries").insert(row);
          if (error) {
            insertErrorMessage = error.message;
            console.error("[enquiries] insert failed", {
              errorId,
              message: insertErrorMessage,
              emailDomain: emailDomain(data.email),
            });
          } else {
            persisted = true;
          }
        }
      } catch (error) {
        insertErrorMessage =
          error instanceof Error ? error.message : "insert threw";
        console.error("[enquiries] insert unexpected failure", {
          errorId,
          message: insertErrorMessage,
        });
      }
    } else {
      insertErrorMessage = "Supabase is not configured";
      console.error("[enquiries] missing Supabase config", { errorId });
    }

    if (persisted) {
      void (async () => {
        if (enquiryId) {
          const notified = await notifyEnquiry(enquiryId);
          if (notified) return;
        }
        await sendEnquiryNotificationEmail({
          ...data,
          enquiryId,
        });
      })();

      return NextResponse.json(
        { success: true, message: PublicMessages.enquirySuccess },
        { status: 201 },
      );
    }

    // Last-resort delivery: accept the enquiry via email so visitors are not blocked
    // when the database/RLS/service-role path is misconfigured.
    const emailed = await sendEnquiryNotificationEmail({
      ...data,
      enquiryId: null,
    });

    if (emailed.ok) {
      console.warn("[enquiries] delivered via email fallback", {
        errorId,
        insertErrorMessage,
        emailDomain: emailDomain(data.email),
      });
      return NextResponse.json(
        { success: true, message: PublicMessages.enquirySuccess },
        { status: 201 },
      );
    }

    console.error("[enquiries] email fallback failed", {
      errorId,
      insertErrorMessage,
      emailError: emailed.error,
    });

    return NextResponse.json(
      { success: false, message: PublicMessages.server, errorId },
      { status: 500 },
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
