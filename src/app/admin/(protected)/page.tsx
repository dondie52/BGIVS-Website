import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    newEnquiries,
    inProgressEnquiries,
    newBookRequests,
    publishedPublications,
    publishedProgrammes,
    recentEnquiries,
    recentBookRequests,
  ] = await Promise.all([
    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "in_progress"),
    supabase
      .from("book_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("publications")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("programmes")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("enquiries")
      .select("id, full_name, email, status, submitted_at, organization")
      .order("submitted_at", { ascending: false })
      .limit(5),
    supabase
      .from("book_requests")
      .select("id, full_name, email, status, submitted_at, quantity")
      .order("submitted_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "New enquiries", value: newEnquiries.count ?? 0, href: "/admin/enquiries?status=new" },
    {
      label: "In progress",
      value: inProgressEnquiries.count ?? 0,
      href: "/admin/enquiries?status=in_progress",
    },
    {
      label: "New book requests",
      value: newBookRequests.count ?? 0,
      href: "/admin/book-requests?status=new",
    },
    {
      label: "Published publications",
      value: publishedPublications.count ?? 0,
      href: "/admin/publications",
    },
    {
      label: "Published programmes",
      value: publishedProgrammes.count ?? 0,
      href: "/admin/programmes",
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Overview"
        description="Snapshot of enquiries, book requests, and published content."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-border bg-white p-5 hover:border-gold/50"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy">Recent enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm font-semibold text-blue hover:underline">
              View all
            </Link>
          </div>
          <DataTable
            rows={recentEnquiries.data ?? []}
            emptyMessage="No enquiries yet."
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
              { key: "org", header: "Organization", render: (row) => row.organization || "—" },
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
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy">Recent book requests</h2>
            <Link
              href="/admin/book-requests"
              className="text-sm font-semibold text-blue hover:underline"
            >
              View all
            </Link>
          </div>
          <DataTable
            rows={recentBookRequests.data ?? []}
            emptyMessage="No book requests yet."
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
        </section>
      </div>
    </div>
  );
}
