import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdminRole } from "@/lib/admin/auth";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

export default async function AuditLogPage() {
  await requireAdminRole();
  const supabase = await createClient();
  const { data } = await supabase
    .from("admin_audit_logs")
    .select("id, actor_id, action, entity_type, entity_id, created_at, profiles:actor_id(full_name)")
    .order("created_at", { ascending: false })
    .limit(200);

  type Row = {
    id: string;
    actor_id: string | null;
    action: string;
    entity_type: string | null;
    entity_id: string | null;
    created_at: string;
    profiles: { full_name: string | null } | null;
  };

  const rows = (data ?? []) as unknown as Row[];

  return (
    <div>
      <AdminHeader
        title="Audit log"
        description="Recent administrative actions. Admin only."
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-off-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-navy">When</th>
              <th className="px-4 py-3 font-semibold text-navy">Actor</th>
              <th className="px-4 py-3 font-semibold text-navy">Action</th>
              <th className="px-4 py-3 font-semibold text-navy">Entity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No audit events yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-muted">{formatDateTime(row.created_at)}</td>
                  <td className="px-4 py-3 text-navy">
                    {row.profiles?.full_name || row.actor_id || "System"}
                  </td>
                  <td className="px-4 py-3 font-medium text-navy">{row.action}</td>
                  <td className="px-4 py-3 text-muted">
                    {row.entity_type || "—"}
                    {row.entity_id ? ` · ${row.entity_id}` : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
