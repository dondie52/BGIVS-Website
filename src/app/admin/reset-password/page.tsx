"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [checkingLink, setCheckingLink] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY") {
        setLinkValid(true);
        setCheckingLink(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      if (session) {
        setLinkValid(true);
      }
      setCheckingLink(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(
          /session/i.test(updateError.message)
            ? "This reset link has expired or already been used. Please request a new one."
            : updateError.message || "Unable to update password.",
        );
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to update password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">BGIVS</p>
          <h1 className="mt-2 text-2xl font-semibold text-navy">Set new password</h1>
          <p className="mt-2 text-sm text-muted">
            Choose a new password for your admin account.
          </p>
        </div>

        {checkingLink ? (
          <p className="mb-4 text-center text-sm text-muted">Verifying reset link…</p>
        ) : !linkValid ? (
          <>
            <p
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
              role="alert"
            >
              This reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/admin/forgot-password"
              className="block w-full rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-deep-navy"
            >
              Request a new link
            </Link>
          </>
        ) : (
          <>
            {error ? (
              <p
                className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-navy focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
                />
              </div>
              <div>
                <label htmlFor="confirm" className="mb-1.5 block text-sm font-semibold text-navy">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-navy focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy disabled:opacity-60"
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/admin/login" className="font-semibold text-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
