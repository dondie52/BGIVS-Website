import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type BookRequestRow = {
  id: string;
  publication_id: string;
  full_name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  quantity: number;
  message: string | null;
  consent: boolean;
  notification_status: "pending" | "sent" | "failed";
  submitted_at: string;
  publications: { title: string; slug: string } | null;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

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

function textField(label: string, value: string | null | undefined): string {
  const display = value && value.trim() ? value.trim() : "—";
  return `${label}: ${display}`;
}

async function authorizeRequest(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) return false;

  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (serviceRoleKey && token === serviceRoleKey) {
    return true;
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey =
    Deno.env.get("SUPABASE_ANON_KEY") ??
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY");

  if (!supabaseUrl || !anonKey) return false;

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(token);

  return Boolean(user) && !error;
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  const authorized = await authorizeRequest(req);
  if (!authorized) {
    return jsonResponse({ success: false, error: "Unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "[notify-book-request] Missing Supabase environment configuration",
    );
    return jsonResponse(
      { success: false, error: "Server misconfigured" },
      500,
    );
  }

  let bookRequestId: string | undefined;
  try {
    const body = (await req.json()) as { bookRequestId?: string };
    bookRequestId =
      typeof body.bookRequestId === "string" ? body.bookRequestId.trim() : "";
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON body" }, 400);
  }

  if (!bookRequestId) {
    return jsonResponse(
      { success: false, error: "bookRequestId is required" },
      400,
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: bookRequest, error: fetchError } = await supabase
    .from("book_requests")
    .select(
      "id, publication_id, full_name, organization, email, phone, country, quantity, message, consent, notification_status, submitted_at, publications(title, slug)",
    )
    .eq("id", bookRequestId)
    .maybeSingle();

  if (fetchError) {
    console.error("[notify-book-request] fetch failed", {
      message: fetchError.message,
    });
    return jsonResponse(
      { success: false, error: "Failed to load book request" },
      500,
    );
  }

  if (!bookRequest) {
    return jsonResponse(
      { success: false, error: "Book request not found" },
      404,
    );
  }

  const row = bookRequest as BookRequestRow;

  if (row.notification_status === "sent") {
    return jsonResponse({ success: true, alreadySent: true });
  }

  const siteUrl =
    Deno.env.get("SITE_URL") ?? "https://bgivs-website.vercel.app";
  const adminEmail =
    Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ?? "kabisoilw@gmail.com";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const fromEmail =
    Deno.env.get("RESEND_FROM_EMAIL") ?? "BGIVS <onboarding@resend.dev>";

  const publicationTitle = row.publications?.title ?? "Publication";
  const publicationSlug = row.publications?.slug ?? "";
  const adminLink = `${siteUrl.replace(/\/$/, "")}/admin/book-requests/${row.id}`;

  const markFailed = async (message: string) => {
    await supabase
      .from("book_requests")
      .update({
        notification_status: "failed",
        notification_error: message.slice(0, 1000),
      })
      .eq("id", row.id);
  };

  if (!resendApiKey) {
    const warning = "RESEND_API_KEY is not configured";
    console.warn("[notify-book-request]", warning);
    await markFailed(warning);
    return jsonResponse({
      success: true,
      warning,
      notificationStatus: "failed",
    });
  }

  const adminSubject = `New BGIVS book request: ${publicationTitle}`;
  const adminHtml = `
    <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
      <h1 style="font-size:20px;">New BGIVS book request</h1>
      <p><em>From Metrics to Meaning</em></p>
      <table style="border-collapse:collapse;font-size:14px;">
        ${field("Publication", publicationTitle)}
        ${field("Publication slug", publicationSlug)}
        ${field("Full name", row.full_name)}
        ${field("Organization", row.organization)}
        ${field("Email", row.email)}
        ${field("Phone", row.phone)}
        ${field("Country", row.country)}
        ${field("Quantity", String(row.quantity))}
        ${field("Message", row.message)}
        ${field("Submitted at", row.submitted_at)}
      </table>
      <p style="margin-top:16px;"><a href="${escapeHtml(adminLink)}">Open in admin</a></p>
    </div>
  `;
  const adminText = [
    "New BGIVS book request",
    "From Metrics to Meaning",
    textField("Publication", publicationTitle),
    textField("Publication slug", publicationSlug),
    textField("Full name", row.full_name),
    textField("Organization", row.organization),
    textField("Email", row.email),
    textField("Phone", row.phone),
    textField("Country", row.country),
    textField("Quantity", String(row.quantity)),
    textField("Message", row.message),
    textField("Submitted at", row.submitted_at),
    `Admin link: ${adminLink}`,
  ].join("\n");

  const userSubject = "BGIVS has received your book request";
  const userHtml = `
    <div style="font-family:Georgia,serif;color:#0b1f33;line-height:1.5;">
      <p>Dear ${escapeHtml(row.full_name)},</p>
      <p>Thank you for contacting Babobiz Global Institute of Value Systems (BGIVS).</p>
      <p><strong>From Metrics to Meaning</strong></p>
      <p>We have received your request for <strong>${escapeHtml(publicationTitle)}</strong> (quantity: ${row.quantity}).</p>
      <p>This message confirms receipt only. A member of the institute will follow up as appropriate regarding availability and fulfilment.</p>
      <p>With regards,<br/>BGIVS</p>
    </div>
  `;
  const userText = [
    `Dear ${row.full_name},`,
    "",
    "Thank you for contacting Babobiz Global Institute of Value Systems (BGIVS).",
    "From Metrics to Meaning",
    "",
    `We have received your request for ${publicationTitle} (quantity: ${row.quantity}).`,
    "This message confirms receipt only. A member of the institute will follow up as appropriate regarding availability and fulfilment.",
    "",
    "With regards,",
    "BGIVS",
  ].join("\n");

  const adminResult = await sendResendEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
    text: adminText,
  });

  if (!adminResult.ok) {
    console.error("[notify-book-request] admin email failed", {
      message: adminResult.error,
    });
    await markFailed(adminResult.error);
    return jsonResponse({
      success: true,
      warning: adminResult.error,
      notificationStatus: "failed",
    });
  }

  const userResult = await sendResendEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: row.email,
    subject: userSubject,
    html: userHtml,
    text: userText,
  });

  if (!userResult.ok) {
    console.error("[notify-book-request] user email failed", {
      message: userResult.error,
    });
    await markFailed(userResult.error);
    return jsonResponse({
      success: true,
      warning: userResult.error,
      notificationStatus: "failed",
    });
  }

  const { error: updateError } = await supabase
    .from("book_requests")
    .update({
      notification_status: "sent",
      notification_error: null,
    })
    .eq("id", row.id);

  if (updateError) {
    console.error("[notify-book-request] status update failed", {
      message: updateError.message,
    });
  }

  return jsonResponse({ success: true, notificationStatus: "sent" });
});
