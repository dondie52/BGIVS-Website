import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { FlashMessage } from "@/components/admin/FlashMessage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { seedServicesAction } from "@/lib/admin/actions/content";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ServicesAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const seeded = sp.seeded === "1" || sp.seeded === "true";
  const error = typeof sp.error === "string" ? sp.error : null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, title, slug, status, sort_order, updated_at")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <AdminHeader
        title="Services"
        description="Edit service content and publish status."
        actions={
          <>
            <form action={seedServicesAction}>
              <button
                type="submit"
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy hover:bg-off-white"
              >
                Seed hardcoded services
              </button>
            </form>
            <Link
              href="/admin/services/new"
              className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-deep-navy"
            >
              New service
            </Link>
          </>
        }
      />
      <FlashMessage
        message={error ?? (seeded ? "Hardcoded services seeded into Supabase." : null)}
        tone={error ? "error" : "success"}
      />
      <DataTable
        rows={data ?? []}
        emptyMessage="No services found."
        columns={[
          {
            key: "title",
            header: "Title",
            render: (row) => (
              <Link href={`/admin/services/${row.id}`} className="font-semibold text-navy hover:underline">
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
