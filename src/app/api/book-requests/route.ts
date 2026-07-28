import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";
import { createErrorId, PublicMessages } from "@/lib/errors";
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

async function notifyBookRequest(bookRequestId: string): Promise<void> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.functions.invoke("notify-book-request", {
      body: { bookRequestId },
    });

    if (error) {
      const { supabaseUrl, serviceRoleKey } = getServerEnv();
      await fetch(`${supabaseUrl}/functions/v1/notify-book-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ bookRequestId }),
      });
    }
  } catch (error) {
    console.error("[book-requests] notify failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
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
    const supabase = createAdminClient();

    const { data: publication, error: publicationError } = await supabase
      .from("publications")
      .select("id")
      .eq("slug", data.publicationSlug)
      .eq("status", "published")
      .maybeSingle();

    if (publicationError) {
      console.error("[book-requests] publication lookup failed", {
        errorId,
        message: publicationError.message,
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

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          message: PublicMessages.validation,
          errors: {
            publicationSlug: "The selected publication is not available.",
          },
        },
        { status: 400 },
      );
    }

    const { data: inserted, error } = await supabase
      .from("book_requests")
      .insert({
        publication_id: publication.id,
        full_name: data.fullName,
        organization: data.organization ?? null,
        email: data.email,
        phone: data.phone ?? null,
        country: data.country,
        quantity: data.quantity,
        message: data.message ?? null,
        consent: data.consent,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("[book-requests] insert failed", {
        errorId,
        message: error?.message,
        emailDomain: emailDomain(data.email),
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

    void notifyBookRequest(inserted.id);

    return NextResponse.json(
      { success: true, message: PublicMessages.bookRequestSuccess },
      { status: 201 },
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
