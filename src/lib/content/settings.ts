import "server-only";

import { siteConfig } from "@/content/site";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 60;

const SAFE_KEYS = [
  "contact_email",
  "contact_phone",
  "location",
  "site_name",
  "short_name",
  "tagline",
] as const;

export type PublicSiteSettings = {
  contact_email: string;
  contact_phone: string;
  location: string;
  site_name: string;
  short_name: string;
  tagline: string;
};

function asString(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

function defaults(): PublicSiteSettings {
  return {
    contact_email: siteConfig.email,
    contact_phone: siteConfig.phoneDisplay,
    location: siteConfig.location,
    site_name: siteConfig.name,
    short_name: siteConfig.shortName,
    tagline: siteConfig.tagline,
  };
}

/**
 * Loads public-safe site settings via the admin client.
 * Only the allow-listed keys are returned; sensitive keys are never selected.
 */
export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const fallback = defaults();

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", [...SAFE_KEYS]);

    if (error) {
      console.error("[content/settings] load failed", {
        message: error.message,
      });
      return fallback;
    }

    const next = { ...fallback };
    for (const row of data ?? []) {
      const key = row.key as (typeof SAFE_KEYS)[number];
      if (!SAFE_KEYS.includes(key)) continue;
      next[key] = asString(row.value, fallback[key]);
    }

    return next;
  } catch (error) {
    console.error("[content/settings] unexpected error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return fallback;
  }
}
