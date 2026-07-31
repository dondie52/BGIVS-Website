import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/admin/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireAdminUser();

  return (
    <AdminShell
      role={profile.role}
      email={user.email}
      fullName={profile.full_name}
    >
      {children}
    </AdminShell>
  );
}
