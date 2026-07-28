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

export default async function BookRequestsListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = first(params.q).trim();
  const status = first(params.status) as EnquiryStatus | "";
  const page = Math.max(1, Number(first(params.page) || "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  let query = supabase
    .from("book_requests")
    .select(
      "id, full_name, email, organization, country, quantity, status, submitted_at, publication_id, publications:publication_id(title, slug)",
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

  const { data, count } = await query;
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  type Row = {
    id: string;
    full_name: string;
    email: string;
    organization: string | null;
    quantity: number;
    status: EnquiryStatus;
    submitted_at: string;
    publications: { title: string; slug: string } | null;
  };

  const rows = (data ?? []) as unknown as Row[];

  return (
    <div>
      <AdminHeader
        title="Book requests"
        description="Requests for publication copies."
      />

      <form className="mb-6 grid gap-3 rounded-lg border border-border bg-white p-4 sm:grid-cols-3">
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
          <select
            name="status"
            defaultValue={status}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
          >
            Apply filters
          </button>
        </div>
      </form>

      <DataTable
        rows={rows}
        emptyMessage="No book requests found."
        columns={[
          {
            key: "name",
            header: "Name",
            render: (row) => (
              <Link
                href={`/admin/book-requests/${row.id}`}
                className="font-semibold text-navy hover:underline"
              >
                {row.full_name}
              </Link>
            ),
          },
          {
            key: "publication",
            header: "Publication",
            render: (row) => row.publications?.title || "—",
          },
          { key: "qty", header: "Qty", render: (row) => String(row.quantity) },
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
              href={`/admin/book-requests?${new URLSearchParams({
                ...(q ? { q } : {}),
                ...(status ? { status } : {}),
                page: String(page - 1),
              }).toString()}`}
              className="rounded-md border border-border bg-white px-3 py-1.5 font-semibold text-navy"
            >
              Previous
            </Link>
          ) : null}
          {page < totalPages ? (
            <Link
              href={`/admin/book-requests?${new URLSearchParams({
                ...(q ? { q } : {}),
                ...(status ? { status } : {}),
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
