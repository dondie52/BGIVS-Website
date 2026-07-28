import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ENQUIRY_STATUSES, formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/types/database";

const PAGE_SIZE = 20;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function EnquiriesListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = first(params.q).trim();
  const status = first(params.status) as EnquiryStatus | "";
  const orgCategory = first(params.org_category).trim();
  const programme = first(params.programme).trim();
  const dateFrom = first(params.date_from).trim();
  const dateTo = first(params.date_to).trim();
  const page = Math.max(1, Number(first(params.page) || "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  let query = supabase
    .from("enquiries")
    .select(
      "id, full_name, email, organization, organization_category, programme_or_service, status, submitted_at",
      { count: "exact" },
    )
    .order("submitted_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,email.ilike.%${q}%,organization.ilike.%${q}%`,
    );
  }
  if (status && ENQUIRY_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }
  if (orgCategory) {
    query = query.eq("organization_category", orgCategory);
  }
  if (programme) {
    query = query.ilike("programme_or_service", `%${programme}%`);
  }
  if (dateFrom) {
    query = query.gte("submitted_at", `${dateFrom}T00:00:00.000Z`);
  }
  if (dateTo) {
    query = query.lte("submitted_at", `${dateTo}T23:59:59.999Z`);
  }

  const { data, count } = await query;
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  const exportParams = new URLSearchParams();
  if (q) exportParams.set("q", q);
  if (status) exportParams.set("status", status);
  if (orgCategory) exportParams.set("org_category", orgCategory);
  if (programme) exportParams.set("programme", programme);
  if (dateFrom) exportParams.set("date_from", dateFrom);
  if (dateTo) exportParams.set("date_to", dateTo);

  return (
    <div>
      <AdminHeader
        title="Enquiries"
        description="Search, filter, and respond to contact form submissions."
        actions={
          <a
            href={`/api/admin/enquiries/export?${exportParams.toString()}`}
            className="rounded-md border border-border bg-white px-3 py-2 text-sm font-semibold text-navy hover:bg-off-white"
          >
            Export CSV
          </a>
        }
      />

      <form className="mb-6 grid gap-3 rounded-lg border border-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Search</span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Name, email, org"
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Status</span>
          <select name="status" defaultValue={status} className="w-full rounded-md border border-border px-3 py-2 text-sm">
            <option value="">All</option>
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Org category</span>
          <input
            name="org_category"
            defaultValue={orgCategory}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">Programme</span>
          <input
            name="programme"
            defaultValue={programme}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">From</span>
          <input
            type="date"
            name="date_from"
            defaultValue={dateFrom}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold text-navy">To</span>
          <input
            type="date"
            name="date_to"
            defaultValue={dateTo}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </label>
        <div className="flex items-end sm:col-span-2 lg:col-span-3 xl:col-span-6">
          <button
            type="submit"
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
          >
            Apply filters
          </button>
        </div>
      </form>

      <DataTable
        rows={data ?? []}
        emptyMessage="No enquiries match these filters."
        columns={[
          {
            key: "name",
            header: "Name",
            render: (row) => (
              <Link href={`/admin/enquiries/${row.id}`} className="font-semibold text-navy hover:underline">
                {row.full_name}
              </Link>
            ),
          },
          { key: "email", header: "Email", render: (row) => row.email },
          { key: "org", header: "Organization", render: (row) => row.organization || "—" },
          {
            key: "interest",
            header: "Interest",
            render: (row) => row.programme_or_service || "—",
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "date",
            header: "Submitted",
            render: (row) => formatDateTime(row.submitted_at),
          },
        ]}
      />

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <p>
          {count ?? 0} total · Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link
              href={`/admin/enquiries?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries({
                    q,
                    status,
                    org_category: orgCategory,
                    programme,
                    date_from: dateFrom,
                    date_to: dateTo,
                  }).filter(([, v]) => v),
                ),
                page: String(page - 1),
              }).toString()}`}
              className="rounded-md border border-border bg-white px-3 py-1.5 font-semibold text-navy"
            >
              Previous
            </Link>
          ) : null}
          {page < totalPages ? (
            <Link
              href={`/admin/enquiries?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries({
                    q,
                    status,
                    org_category: orgCategory,
                    programme,
                    date_from: dateFrom,
                    date_to: dateTo,
                  }).filter(([, v]) => v),
                ),
                page: String(page + 1),
              }).toString()}`}
              className="rounded-md border border-border bg-white px-3 py-1.5 font-semibold text-navy"
            >
              Next
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
