import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

export default async function ProgrammesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("programmes")
    .select("id, title, slug, status, sort_order, updated_at")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <AdminHeader title="Programmes" description="Edit programme content and publish status." />
      <DataTable
        rows={data ?? []}
        emptyMessage="No programmes found."
        columns={[
          {
            key: "title",
            header: "Title",
            render: (row) => (
              <Link href={`/admin/programmes/${row.id}`} className="font-semibold text-navy hover:underline">
                {row.title}
              </Link>
            ),
          },
          { key: "slug", header: "Slug", render: (row) => row.slug },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} kind="content" />,
          },
          {
            key: "updated",
            header: "Updated",
            render: (row) => formatDateTime(row.updated_at),
          },
        ]}
      />
    </div>
  );
}
