import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createFormClient, hasServiceRoleKey, hasSupabaseConfig } from "@/lib/supabase/form";
import { getServerEnv } from "@/lib/env";
import { createErrorId, PublicMessages } from "@/lib/errors";
import { sendBookRequestNotificationEmail } from "@/lib/notify/email";
import { enforceRateLimit, verifyTurnstile } from "@/lib/rate-limit";
import {
  bookRequestFieldErrors,
  bookRequestSchema,
  normalizeBookRequestInput,
} from "@/lib/validations/book-request";

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1) : "unknown";
}

async function notifyBookRequest(bookRequestId: string): Promise<boolean> {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return false;

    const supabase = createAdminClient();
    const { error } = await supabase.functions.invoke("notify-book-request", {
      body: { bookRequestId },
    });

    if (!error) return true;

    const { supabaseUrl, serviceRoleKey } = getServerEnv();
    const response = await fetch(
      `${supabaseUrl}/functions/v1/notify-book-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ bookRequestId }),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("[book-requests] notify failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return false;
  }
}

export async function POST(request: Request) {
  const errorId = createErrorId();

  try {
    const raw = await request.json();
    const normalized = normalizeBookRequestInput(raw);

    if (
      typeof normalized.website === "string" &&
      normalized.website.length > 0
    ) {
      return NextResponse.json(
        { success: true, message: PublicMessages.bookRequestSuccess },
        { status: 201 },
      );
    }

    const parsed = bookRequestSchema.safeParse(normalized);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: PublicMessages.validation,
          errors: bookRequestFieldErrors(parsed.error),
        },
        { status: 400 },
      );
    }

    const rate = await enforceRateLimit({
      request,
      endpoint: "book-requests",
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
    let bookRequestId: string | null = null;
    let persisted = false;
    let insertErrorMessage: string | undefined;

    if (hasSupabaseConfig()) {
      try {
        const supabase = createFormClient();

        const { data: publication, error: publicationError } = await supabase
          .from("publications")
          .select("id")
          .eq("slug", data.publicationSlug)
          .eq("status", "published")
          .maybeSingle();

        if (publicationError) {
          insertErrorMessage = publicationError.message;
          console.error("[book-requests] publication lookup failed", {
            errorId,
            message: publicationError.message,
          });
        } else if (!publication) {
          insertErrorMessage = "publication not found in database";
        } else {
          const row = {
            publication_id: publication.id,
            full_name: data.fullName,
            organization: data.organization ?? null,
            email: data.email,
            phone: data.phone ?? null,
            country: data.country,
            quantity: data.quantity,
            message: data.message ?? null,
            consent: data.consent,
          };

          if (hasServiceRoleKey()) {
            const { data: inserted, error } = await supabase
              .from("book_requests")
              .insert(row)
              .select("id")
              .single();

            if (error || !inserted) {
              insertErrorMessage = error?.message ?? "insert returned no row";
              console.error("[book-requests] insert failed", {
                errorId,
                message: insertErrorMessage,
                emailDomain: emailDomain(data.email),
              });
            } else {
              bookRequestId = inserted.id;
              persisted = true;
            }
          } else {
            const { error } = await supabase.from("book_requests").insert(row);
            if (error) {
              insertErrorMessage = error.message;
              console.error("[book-requests] insert failed", {
                errorId,
                message: insertErrorMessage,
                emailDomain: emailDomain(data.email),
              });
            } else {
              persisted = true;
            }
          }
        }
      } catch (error) {
        insertErrorMessage =
          error instanceof Error ? error.message : "insert threw";
        console.error("[book-requests] insert unexpected failure", {
          errorId,
          message: insertErrorMessage,
        });
      }
    } else {
      insertErrorMessage = "Supabase is not configured";
    }

    if (persisted) {
      void (async () => {
        if (bookRequestId) {
          const notified = await notifyBookRequest(bookRequestId);
          if (notified) return;
        }
        await sendBookRequestNotificationEmail({
          ...data,
          bookRequestId,
        });
      })();

      return NextResponse.json(
        { success: true, message: PublicMessages.bookRequestSuccess },
        { status: 201 },
      );
    }

    const emailed = await sendBookRequestNotificationEmail({
      ...data,
      bookRequestId: null,
    });

    if (emailed.ok) {
      console.warn("[book-requests] delivered via email fallback", {
        errorId,
        insertErrorMessage,
        emailDomain: emailDomain(data.email),
      });
      return NextResponse.json(
        { success: true, message: PublicMessages.bookRequestSuccess },
        { status: 201 },
      );
    }

    console.error("[book-requests] email fallback failed", {
      errorId,
      insertErrorMessage,
      emailError: emailed.error,
    });

    return NextResponse.json(
      {
        success: false,
        message: PublicMessages.bookRequestServer,
        errorId,
      },
      { status: 500 },
    );
  } catch (error) {
    console.error("[book-requests] unexpected error", {
      errorId,
      message: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        success: false,
        message: PublicMessages.bookRequestServer,
        errorId,
      },
      { status: 500 },
    );
  }
}
