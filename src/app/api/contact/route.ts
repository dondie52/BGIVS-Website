import { NextResponse } from "next/server";
import { hasFormErrors, validateContactForm, type ContactFormValues } from "@/lib/form";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormValues;

    // Anti-spam honeypot: silently accept and discard bot submissions.
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const errors = validateContactForm(body);
    if (hasFormErrors(errors)) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    /*
     * DEMO SUBMISSION HANDLER
     * -----------------------
     * This route currently validates and acknowledges enquiries without
     * sending email or writing to a database.
     *
     * Connect one of the following when ready:
     * 1. Email service (Resend, SendGrid, Nodemailer, etc.)
     * 2. CRM or ticketing API
     * 3. Database / Supabase table for enquiry storage
     * 4. Webhook to an internal operations channel
     *
     * Example (pseudo):
     * await resend.emails.send({
     *   to: "kabisoilw@gmail.com",
     *   subject: `BGIVS enquiry: ${body.interest}`,
     *   replyTo: body.email,
     *   text: JSON.stringify(body, null, 2),
     * });
     */

    console.info("[BGIVS contact demo]", {
      fullName: body.fullName,
      organization: body.organization,
      email: body.email,
      interest: body.interest,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message:
        "Enquiry received by the demo handler. Connect an email service, database, or CRM to process submissions in production.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process this enquiry." },
      { status: 500 },
    );
  }
}
