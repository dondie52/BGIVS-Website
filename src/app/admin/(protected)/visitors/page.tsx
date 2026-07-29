import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type VisitorEvent = {
  id: string;
  visitor_id: string;
  session_id: string;
  path: string;
  page_title: string | null;
  referrer: string | null;
  device_type: string | null;
  browser_family: string | null;
  operating_system: string | null;
  language: string | null;
  timezone: string | null;
  country_code: string | null;
  occurred_at: string;
};

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function shortId(value: string): string {
  return value.replace(/^visitor_/, "").slice(0, 8);
}

function host(value: string | null): string {
  if (!value) return "Direct";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value.slice(0, 60);
  }
}

function countBy(rows: VisitorEvent[], key: keyof VisitorEvent, fallback = "Unknown") {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const value = row[key];
    const label = typeof value === "string" && value.trim() ? value.trim() : fallback;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function uniqueCount(rows: VisitorEvent[], key: keyof VisitorEvent): number {
  return new Set(rows.map((row) => row[key]).filter(Boolean)).size;
}

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const days = Math.min(90, Math.max(1, Number(first(params.days) || "30") || 30));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const supabase = await createClient();
  const { data } = await supabase
    .from("visitor_events")
    .select(
      "id, visitor_id, session_id, path, page_title, referrer, device_type, browser_family, operating_system, language, timezone, country_code, occurred_at",
    )
    .gte("occurred_at", since)
    .order("occurred_at", { ascending: false })
    .limit(500);

  const rows = (data ?? []) as VisitorEvent[];
  const topPages = countBy(rows, "path").slice(0, 8);
  const devices = countBy(rows, "device_type").slice(0, 6);
  const browsers = countBy(rows, "browser_family").slice(0, 6);
  const countries = countBy(rows, "country_code").slice(0, 6);
  const referrers = [...rows.reduce((map, row) => {
    const label = host(row.referrer);
    map.set(label, (map.get(label) ?? 0) + 1);
    return map;
  }, new Map<string, number>())]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 8);

  const stats = [
    { label: "Page views", value: rows.length },
    { label: "Visitors", value: uniqueCount(rows, "visitor_id") },
    { label: "Sessions", value: uniqueCount(rows, "session_id") },
    { label: "Pages studied", value: uniqueCount(rows, "path") },
  ];

  return (
    <div>
      <AdminHeader
        title="Visitors"
        description="Consent-based website analytics for study interest, referrals, and device context."
      />

      <form className="mb-6 flex max-w-xs items-end gap-3 rounded-lg border border-border bg-white p-4">
        <label className="block flex-1 text-sm">
          <span className="mb-1 block font-semibold text-navy">Period</span>
          <select name="days" defaultValue={String(days)} className="w-full rounded-md border border-border px-3 py-2 text-sm">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </label>
        <button type="submit" className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
          Apply
        </button>
      </form>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-6 xl:grid-cols-2">
        {[
          ["Top pages", topPages],
          ["Referrers", referrers],
          ["Devices", devices],
          ["Browsers", browsers],
          ["Countries", countries],
        ].map(([title, items]) => (
          <section key={title as string} className="rounded-lg border border-border bg-white p-5">
            <h2 className="text-lg font-semibold text-navy">{title as string}</h2>
            <div className="mt-4 space-y-3">
              {(items as { label: string; count: number }[]).length ? (
                (items as { label: string; count: number }[]).map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="truncate text-muted">{item.label}</span>
                    <span className="font-semibold text-navy">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No data yet.</p>
              )}
            </div>
          </section>
        ))}
      </div>

      <h2 className="mb-3 text-lg font-semibold text-navy">Recent visits</h2>
      <DataTable
        rows={rows.slice(0, 50)}
        emptyMessage="No consented visits recorded yet."
        columns={[
          {
            key: "time",
            header: "Time",
            render: (row) => formatDateTime(row.occurred_at),
          },
          {
            key: "visitor",
            header: "Visitor",
            render: (row) => shortId(row.visitor_id),
          },
          { key: "page", header: "Page", render: (row) => row.path },
          { key: "referrer", header: "Referrer", render: (row) => host(row.referrer) },
          {
            key: "device",
            header: "Device",
            render: (row) =>
              [row.device_type, row.browser_family, row.operating_system]
                .filter(Boolean)
                .join(" / ") || "Unknown",
          },
          {
            key: "context",
            header: "Context",
            render: (row) =>
              [row.country_code, row.language, row.timezone].filter(Boolean).join(" / ") ||
              "Unknown",
          },
        ]}
      />
    </div>
  );
}
