import { AdminHeader } from "@/components/admin/AdminHeader";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { updateSettingsAction } from "@/lib/admin/actions/settings";
import { requireAdminUser } from "@/lib/admin/auth";
import { PUBLIC_SETTINGS_KEYS } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/content/site";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

export default async function SettingsPage({ searchParams }: Props) {
  const { user } = await requireAdminUser();
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", [...PUBLIC_SETTINGS_KEYS]);

  const map = new Map((data ?? []).map((row) => [row.key, asString(row.value)]));

  const defaults: Record<(typeof PUBLIC_SETTINGS_KEYS)[number], string> = {
    contact_email: siteConfig.email,
    contact_phone: siteConfig.phone,
    location: siteConfig.location,
    site_name: siteConfig.name,
    short_name: siteConfig.shortName,
    tagline: siteConfig.tagline,
  };

  return (
    <div>
      <AdminHeader
        title="Settings"
        description="Public-facing contact and site identity settings."
      />
      <FlashMessage message={saved ? "Settings saved." : error} tone={error ? "error" : "success"} />

      <form action={updateSettingsAction} className="max-w-2xl space-y-4 rounded-lg border border-border bg-white p-6">
        {PUBLIC_SETTINGS_KEYS.map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 block font-semibold capitalize text-navy">
              {key.replace(/_/g, " ")}
            </span>
            <input
              name={key}
              defaultValue={map.get(key) ?? defaults[key]}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </label>
        ))}
        <button
          type="submit"
          className="rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-navy"
        >
          Save settings
        </button>
      </form>

      <div className="mt-6">
        <ChangePasswordForm email={user.email} />
      </div>
    </div>
  );
}
