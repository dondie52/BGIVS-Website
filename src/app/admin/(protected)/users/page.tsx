import { AdminHeader } from "@/components/admin/AdminHeader";
import { FlashMessage } from "@/components/admin/FlashMessage";
import {
  setUserActiveAction,
  updateUserRoleAction,
} from "@/lib/admin/actions/settings";
import { requireAdminRole } from "@/lib/admin/auth";
import { formatDateTime } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UsersAdminPage({ searchParams }: Props) {
  await requireAdminRole();
  const sp = await searchParams;
  const saved = sp.saved === "1" || sp.saved === "true";
  const error = typeof sp.error === "string" ? sp.error : null;

  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, active, created_at, updated_at")
    .order("created_at", { ascending: true });

  return (
    <div>
      <AdminHeader
        title="Users"
        description="Manage staff roles and active status. Admin only."
      />
      <FlashMessage message={saved ? "User updated." : error} tone={error ? "error" : "success"} />

      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-off-white">
            <tr>
              <th className="px-4 py-3 font-semibold text-navy">Name</th>
              <th className="px-4 py-3 font-semibold text-navy">Role</th>
              <th className="px-4 py-3 font-semibold text-navy">Active</th>
              <th className="px-4 py-3 font-semibold text-navy">Updated</th>
              <th className="px-4 py-3 font-semibold text-navy">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(profiles ?? []).map((profile) => (
              <tr key={profile.id}>
                <td className="px-4 py-3 text-navy">
                  <div className="font-semibold">{profile.full_name || "Unnamed"}</div>
                  <div className="text-xs text-muted">{profile.id}</div>
                </td>
                <td className="px-4 py-3">
                  <form action={updateUserRoleAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={profile.id} />
                    <select
                      name="role"
                      defaultValue={profile.role}
                      className="rounded-md border border-border px-2 py-1 text-sm"
                    >
                      <option value="admin">admin</option>
                      <option value="editor">editor</option>
                    </select>
                    <button type="submit" className="text-xs font-semibold text-blue hover:underline">
                      Save
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      profile.active
                        ? "font-semibold text-emerald-700"
                        : "font-semibold text-red-700"
                    }
                  >
                    {profile.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{formatDateTime(profile.updated_at)}</td>
                <td className="px-4 py-3">
                  <form action={setUserActiveAction}>
                    <input type="hidden" name="id" value={profile.id} />
                    <input type="hidden" name="active" value={profile.active ? "false" : "true"} />
                    <button
                      type="submit"
                      className="text-sm font-semibold text-navy hover:underline"
                    >
                      {profile.active ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
