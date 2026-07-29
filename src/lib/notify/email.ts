import "server-only";

type EnquiryEmailPayload = {
  fullName: string;
  positionRole: string;
  organization: string;
  organizationCategory: string;
  email: string;
  phone?: string | null;
  country: string;
  programmeOrService: string;
  message: string;
  sourcePage?: string | null;
  referrer?: string | null;
  enquiryId?: string | null;
};

type BookRequestEmailPayload = {
  fullName: string;
  email: string;
  organization?: string | null;
  country: string;
  quantity: number;
  message?: string | null;
  publicationSlug: string;
  bookRequestId?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function field(label: string, value: string | null | undefined): string {
  const display = value && value.trim() ? value.trim() : "—";
  return `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(display)}</td></tr>`;
}

async function sendResendEmail(options: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return {
        ok: false,
        error: `Resend error ${response.status}: ${detail.slice(0, 400)}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Resend request failed",
    };
  }
}

function mailConfig() {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ?? "info@BGIVS.com";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "BGIVS <onboarding@resend.dev>";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://bgivs-website.vercel.app";

  return { apiKey, adminEmail, fromEmail, siteUrl };
}

/**
 * Direct Resend notification from the App Router.
 * Used when Edge Function invoke is unavailable, or as a last-resort delivery
 * path when the database insert cannot complete.
 */
export async function sendEnquiryNotificationEmail(
  payload: EnquiryEmailPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { apiKey, adminEmail, fromEmail, siteUrl } = mailConfig();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const programme = payload.programmeOrService || "General enquiry";
  const adminLink = payload.enquiryId
    ? `${siteUrl.replace(/\/$/, "")}/admin/enquiries/${payload.enquiryId}`
    : `${siteUrl.replace(/\/$/, "")}/admin/enquiries`;

  const adminResult = await sendResendEmail({
    apiKey,
    from: fromEmail,
    to: adminEmail,
    subject: `New BGIVS enquiry: ${programme}`,
    html: `
      <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
        <h1 style="font-size:20px;">New BGIVS enquiry</h1>
        <p><em>From Metrics to Meaning</em></p>
        <table style="border-collapse:collapse;font-size:14px;">
          ${field("Full name", payload.fullName)}
          ${field("Position / role", payload.positionRole)}
          ${field("Organization", payload.organization)}
          ${field("Organization category", payload.organizationCategory)}
          ${field("Email", payload.email)}
          ${field("Phone", payload.phone)}
          ${field("Country", payload.country)}
          ${field("Programme or service", payload.programmeOrService)}
          ${field("Message", payload.message)}
          ${field("Source page", payload.sourcePage)}
          ${field("Referrer", payload.referrer)}
        </table>
        <p style="margin-top:16px;"><a href="${escapeHtml(adminLink)}">Open in admin</a></p>
      </div>
    `,
    text: [
      "New BGIVS enquiry",
      `Full name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Organization: ${payload.organization}`,
      `Programme or service: ${payload.programmeOrService}`,
      `Message: ${payload.message}`,
      `Admin link: ${adminLink}`,
    ].join("\n"),
  });

  if (!adminResult.ok) return adminResult;

  return sendResendEmail({
    apiKey,
    from: fromEmail,
    to: payload.email,
    subject: "BGIVS has received your enquiry",
    html: `
      <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
        <p>Dear ${escapeHtml(payload.fullName)},</p>
        <p>Thank you for contacting Babobiz Global Institute of Value Systems (BGIVS).</p>
        <p><strong>From Metrics to Meaning</strong></p>
        <p>We have received your enquiry regarding <strong>${escapeHtml(programme)}</strong> and will review it carefully.</p>
        <p>This message confirms receipt only. A member of the institute will follow up as appropriate.</p>
        <p>With regards,<br/>BGIVS</p>
      </div>
    `,
    text: [
      `Dear ${payload.fullName},`,
      "",
      "Thank you for contacting Babobiz Global Institute of Value Systems (BGIVS).",
      `We have received your enquiry regarding ${programme} and will review it carefully.`,
      "",
      "With regards,",
      "BGIVS",
    ].join("\n"),
  });
}

export async function sendBookRequestNotificationEmail(
  payload: BookRequestEmailPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { apiKey, adminEmail, fromEmail, siteUrl } = mailConfig();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const adminLink = payload.bookRequestId
    ? `${siteUrl.replace(/\/$/, "")}/admin/book-requests/${payload.bookRequestId}`
    : `${siteUrl.replace(/\/$/, "")}/admin/book-requests`;

  const adminResult = await sendResendEmail({
    apiKey,
    from: fromEmail,
    to: adminEmail,
    subject: `New BGIVS publication request: ${payload.publicationSlug}`,
    html: `
      <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
        <h1 style="font-size:20px;">New BGIVS publication request</h1>
        <table style="border-collapse:collapse;font-size:14px;">
          ${field("Full name", payload.fullName)}
          ${field("Email", payload.email)}
          ${field("Organization", payload.organization)}
          ${field("Country", payload.country)}
          ${field("Quantity", String(payload.quantity))}
          ${field("Publication", payload.publicationSlug)}
          ${field("Message", payload.message)}
        </table>
        <p style="margin-top:16px;"><a href="${escapeHtml(adminLink)}">Open in admin</a></p>
      </div>
    `,
    text: [
      "New BGIVS publication request",
      `Full name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Publication: ${payload.publicationSlug}`,
      `Quantity: ${payload.quantity}`,
      `Admin link: ${adminLink}`,
    ].join("\n"),
  });

  if (!adminResult.ok) return adminResult;

  return sendResendEmail({
    apiKey,
    from: fromEmail,
    to: payload.email,
    subject: "BGIVS has received your publication request",
    html: `
      <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
        <p>Dear ${escapeHtml(payload.fullName)},</p>
        <p>Thank you for your publication request. BGIVS has received it and will follow up with fulfilment details.</p>
        <p>With regards,<br/>BGIVS</p>
      </div>
    `,
    text: [
      `Dear ${payload.fullName},`,
      "",
      "Thank you for your publication request. BGIVS has received it and will follow up with fulfilment details.",
      "",
      "With regards,",
      "BGIVS",
    ].join("\n"),
  });
}
