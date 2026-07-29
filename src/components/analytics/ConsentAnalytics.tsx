"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CONSENT_KEY = "bgivs_analytics_consent";
const VISITOR_KEY = "bgivs_analytics_id";
const SESSION_KEY = "bgivs_session_id";
const CONSENT_VERSION = "2026-07-29";

function randomId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function readLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures; consent remains in memory for this page.
  }
}

function ensureStoredId(key: string, prefix: string): string {
  const existing = readLocalStorage(key);
  if (existing) return existing;
  const next = randomId(prefix);
  writeLocalStorage(key, next);
  return next;
}

export function ConsentAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return readLocalStorage(CONSENT_KEY);
  });

  const fullPath = useMemo(() => {
    const qs = searchParams.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (consent !== "accepted") return;

    const visitorId = ensureStoredId(VISITOR_KEY, "visitor");
    const sessionId = ensureStoredId(SESSION_KEY, "session");

    const payload = {
      visitorId,
      sessionId,
      path: fullPath,
      pageTitle: document.title,
      referrer: document.referrer || undefined,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      consentVersion: CONSENT_VERSION,
    };

    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }, [consent, fullPath]);

  function accept() {
    writeLocalStorage(CONSENT_KEY, "accepted");
    setConsent("accepted");
  }

  function decline() {
    writeLocalStorage(CONSENT_KEY, "declined");
    setConsent("declined");
  }

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-4 shadow-[0_-12px_30px_rgba(4,21,47,0.12)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm text-muted">
          BGIVS would like to use a small analytics identifier to understand visits,
          enquiries, pages viewed, devices, referrers, and study interest. We do not
          store raw IP addresses. See the{" "}
          <Link href="/privacy" className="font-semibold text-blue hover:underline">
            privacy notice
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={decline}
            className="rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-off-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
          >
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  );
}
