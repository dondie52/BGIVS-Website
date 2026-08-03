"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const siteUrl =
        window.location.origin || process.env.NEXT_PUBLIC_SITE_URL;
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${siteUrl}/admin/reset-password`,
      });

      if (error) {
        setStatus("error");
        setMessage("Unable to send reset email. Please try again.");
        return;
      }

      setStatus("sent");
      setMessage(
        "If an account exists for that email, a password reset link has been sent.",
      );
    } catch {
      setStatus("error");
      setMessage("Unable to send reset email. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">BGIVS</p>
          <h1 className="mt-2 text-2xl font-semibold text-navy">Forgot password</h1>
          <p className="mt-2 text-sm text-muted">
            Enter your staff email and we will send a reset link.
          </p>
        </div>

        {message ? (
          <p
            className={`mb-4 rounded-md border px-3 py-2 text-sm ${
              status === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}

        {status !== "sent" ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-navy focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send reset link"}
            </button>
          </form>
        ) : null}

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/admin/login" className="font-semibold text-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
