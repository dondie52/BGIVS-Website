import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminProfile = {
  id: string;
  full_name: string | null;
  role: "admin" | "editor";
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminUser = {
  id: string;
  email?: string;
};

async function loadActiveStaffProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, active, created_at, updated_at")
    .eq("id", userId)
    .eq("active", true)
    .in("role", ["admin", "editor"])
    .maybeSingle();

  if (error) {
    console.error("[admin-auth] profile lookup failed", {
      message: error.message,
    });
    return null;
  }

  return data as AdminProfile | null;
}

/**
 * Requires an authenticated user with an active admin or editor profile.
 * Redirects to /admin/login when unauthorized.
 */
export async function requireAdminUser(): Promise<{
  user: AdminUser;
  profile: AdminProfile;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  const profile = await loadActiveStaffProfile(user.id);
  if (!profile) {
    redirect("/admin/login");
  }

  return {
    user: { id: user.id, email: user.email },
    profile,
  };
}

/**
 * Requires an authenticated user with the admin role.
 */
export async function requireAdminRole(): Promise<{
  user: AdminUser;
  profile: AdminProfile;
}> {
  const result = await requireAdminUser();
  if (result.profile.role !== "admin") {
    redirect("/admin/login");
  }
  return result;
}

/**
 * Returns the current admin/editor profile when present, otherwise null.
 */
export async function getOptionalAdminProfile(): Promise<{
  user: AdminUser;
  profile: AdminProfile;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await loadActiveStaffProfile(user.id);
  if (!profile) return null;

  return {
    user: { id: user.id, email: user.email },
    profile,
  };
}

/**
 * Only allow relative redirects under /admin (open-redirect safe).
 */
export function isSafeRedirectPath(path: string | null): boolean {
  if (!path) return false;
  if (!path.startsWith("/admin")) return false;
  if (path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  if (path.includes("\\")) return false;
  return true;
}
