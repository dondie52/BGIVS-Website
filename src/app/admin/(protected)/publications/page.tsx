import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

export default async function PublicationsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("id, title, slug, status, featured, publication_type, updated_at, sort_order")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  return (
    <div>
      <AdminHeader
        title="Publications"
        description="Manage research publications and books."
        actions={
          <Link
            href="/admin/publications/new"
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
          >
            New publication
          </Link>
        }
      />

      <DataTable
        rows={data ?? []}
        emptyMessage="No publications yet."
        columns={[
          {
            key: "title",
            header: "Title",
            render: (row) => (
              <Link
                href={`/admin/publications/${row.id}`}
                className="font-semibold text-navy hover:underline"
              >
                {row.title}
              </Link>
            ),
          },
          {
            key: "type",
            header: "Type",
            render: (row) => row.publication_type.replace(/_/g, " "),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} kind="content" />,
          },
          {
            key: "featured",
            header: "Featured",
            render: (row) => (row.featured ? "Yes" : "No"),
          },
          {
            key: "updated",
            header: "Updated",
            render: (row) => formatDateTime(row.updated_at),
          },
          {
            key: "preview",
            header: "",
            render: (row) => (
              <Link
                href={
                  row.status === "published"
                    ? `/research/${row.slug}`
                    : `/admin/preview/publications/${row.slug}`
                }
                className="text-sm font-semibold text-blue hover:underline"
                target="_blank"
              >
                Preview
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
