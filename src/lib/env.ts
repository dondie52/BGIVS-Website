import "server-only";

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getPublicEnv() {
  return {
    supabaseUrl: required(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    supabasePublishableKey: required(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://bgivs-website.vercel.app",
  };
}

/** Shared optional secrets used by public form API routes. */
export function getFormRuntimeEnv() {
  return {
    rateLimitSecret:
      process.env.RATE_LIMIT_SECRET ?? "bgivs-dev-rate-limit-secret",
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
    adminNotificationEmail:
      process.env.ADMIN_NOTIFICATION_EMAIL ?? "kabisoilw@gmail.com",
    resendApiKey: process.env.RESEND_API_KEY ?? "",
    resendFromEmail:
      process.env.RESEND_FROM_EMAIL ?? "BGIVS <onboarding@resend.dev>",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      "https://bgivs-website.vercel.app",
  };
}

export function getServerEnv() {
  const publicEnv = getPublicEnv();
  return {
    ...publicEnv,
    ...getFormRuntimeEnv(),
    serviceRoleKey: required(
      "SUPABASE_SERVICE_ROLE_KEY",
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    ),
  };
}
