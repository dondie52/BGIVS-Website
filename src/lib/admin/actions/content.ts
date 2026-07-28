"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdminUser } from "@/lib/admin/auth";
import {
  formNumber,
  formOptionalString,
  formString,
  parseLines,
  slugify,
} from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/types/database";

export async function updateProgrammeAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  if (!id) throw new Error("Missing programme id");

  const title = formString(formData, "title");
  const slug = formString(formData, "slug") || slugify(title);
  const status = (formString(formData, "status") || "draft") as ContentStatus;

  const payload = {
    title,
    slug,
    short_description: formOptionalString(formData, "short_description"),
    full_description: formOptionalString(formData, "full_description"),
    challenges: parseLines(formData.get("challenges")),
    activities: parseLines(formData.get("activities")),
    beneficiaries: parseLines(formData.get("beneficiaries")),
    outcomes: parseLines(formData.get("outcomes")),
    icon: formOptionalString(formData, "icon"),
    status,
    sort_order: formNumber(formData, "sort_order", 0),
  };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("programmes")
    .select("status, slug, title")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("programmes").update(payload).eq("id", id);
  if (error) {
    redirect(`/admin/programmes/${id}?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "programme.update",
    entityType: "programme",
    entityId: id,
    oldValues: existing,
    newValues: { status: payload.status, slug: payload.slug, title: payload.title },
  });

  revalidatePath("/admin/programmes");
  revalidatePath(`/admin/programmes/${id}`);
  revalidatePath("/programmes");
  redirect(`/admin/programmes/${id}?saved=1`);
}

export async function updateServiceAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  if (!id) throw new Error("Missing service id");

  const title = formString(formData, "title");
  const slug = formString(formData, "slug") || slugify(title);
  const status = (formString(formData, "status") || "draft") as ContentStatus;

  const payload = {
    title,
    slug,
    short_description: formOptionalString(formData, "short_description"),
    full_description: formOptionalString(formData, "full_description"),
    intended_for: parseLines(formData.get("intended_for")),
    areas_covered: parseLines(formData.get("areas_covered")),
    expected_value: parseLines(formData.get("expected_value")),
    icon: formOptionalString(formData, "icon"),
    status,
    sort_order: formNumber(formData, "sort_order", 0),
  };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("services")
    .select("status, slug, title")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("services").update(payload).eq("id", id);
  if (error) {
    redirect(`/admin/services/${id}?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "service.update",
    entityType: "service",
    entityId: id,
    oldValues: existing,
    newValues: { status: payload.status, slug: payload.slug, title: payload.title },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  revalidatePath("/services");
  redirect(`/admin/services/${id}?saved=1`);
}
