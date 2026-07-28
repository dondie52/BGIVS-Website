import { AdminSidebar } from "@/components/admin/AdminSidebar";
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
    <div className="flex min-h-screen bg-off-white">
      <AdminSidebar
        role={profile.role}
        email={user.email}
        fullName={profile.full_name}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
