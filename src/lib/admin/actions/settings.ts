"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdminRole, requireAdminUser } from "@/lib/admin/auth";
import {
  formString,
  PUBLIC_SETTINGS_KEYS,
  slugify,
  type PublicSettingsKey,
} from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export async function updateSettingsAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const supabase = await createClient();

  for (const key of PUBLIC_SETTINGS_KEYS) {
    const value = formString(formData, key);
    const { error } = await supabase.from("site_settings").upsert({
      key,
      value,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      redirect(`/admin/settings?error=${encodeURIComponent(error.message)}`);
    }
  }

  await writeAuditLog({
    actorId: user.id,
    action: "settings.update",
    entityType: "site_settings",
    entityId: null,
    newValues: Object.fromEntries(
      PUBLIC_SETTINGS_KEYS.map((key) => [key, formString(formData, key)]),
    ) as Record<PublicSettingsKey, string>,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  redirect("/admin/settings?saved=1");
}

export async function updateUserRoleAction(formData: FormData) {
  const { user } = await requireAdminRole();
  const id = formString(formData, "id");
  const role = formString(formData, "role") as UserRole;

  if (!id || (role !== "admin" && role !== "editor")) {
    redirect("/admin/users?error=Invalid+user+update");
  }

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("profiles")
    .select("role, active")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "user.role_change",
    entityType: "profile",
    entityId: id,
    oldValues: existing ? { role: existing.role } : null,
    newValues: { role },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function setUserActiveAction(formData: FormData) {
  const { user } = await requireAdminRole();
  const id = formString(formData, "id");
  const active = formString(formData, "active") === "true";

  if (!id) redirect("/admin/users?error=Missing+user");
  if (id === user.id && !active) {
    redirect("/admin/users?error=You+cannot+deactivate+yourself");
  }

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("profiles")
    .select("active")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("profiles").update({ active }).eq("id", id);
  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: active ? "user.activate" : "user.deactivate",
    entityType: "profile",
    entityId: id,
    oldValues: existing ? { active: existing.active } : null,
    newValues: { active },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function uploadMediaAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/media?error=Please+choose+a+file");
  }

  const folder = formString(formData, "folder") || "uploads";
  const ext = file.name.split(".").pop() || "bin";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const path = `${folder}/${Date.now()}-${base}.${ext}`;

  const supabase = await createClient();
  const { error } = await supabase.storage.from("public-media").upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) {
    redirect(`/admin/media?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "media.upload",
    entityType: "storage",
    entityId: path,
    newValues: { bucket: "public-media", path, name: file.name },
  });

  revalidatePath("/admin/media");
  redirect("/admin/media?saved=1");
}

export async function deleteMediaAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const path = formString(formData, "path");
  if (!path) redirect("/admin/media?error=Missing+path");

  const supabase = await createClient();
  const { error } = await supabase.storage.from("public-media").remove([path]);
  if (error) {
    redirect(`/admin/media?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "media.delete",
    entityType: "storage",
    entityId: path,
    oldValues: { bucket: "public-media", path },
  });

  revalidatePath("/admin/media");
  redirect("/admin/media?saved=1");
}
