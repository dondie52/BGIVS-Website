"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { programmes as staticProgrammes } from "@/content/programmes";
import { services as staticServices } from "@/content/services";
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

function programmePayload(formData: FormData, defaultStatus: ContentStatus = "draft") {
  const title = formString(formData, "title");
  const slug = formString(formData, "slug") || slugify(title);
  const status = (formString(formData, "status") || defaultStatus) as ContentStatus;

  return {
    title,
    slug,
    short_description: formString(formData, "short_description"),
    full_description: formOptionalString(formData, "full_description"),
    challenges: parseLines(formData.get("challenges")),
    activities: parseLines(formData.get("activities")),
    beneficiaries: parseLines(formData.get("beneficiaries")),
    outcomes: parseLines(formData.get("outcomes")),
    icon: formOptionalString(formData, "icon"),
    status,
    sort_order: formNumber(formData, "sort_order", 0),
  };
}

function servicePayload(formData: FormData, defaultStatus: ContentStatus = "draft") {
  const title = formString(formData, "title");
  const slug = formString(formData, "slug") || slugify(title);
  const status = (formString(formData, "status") || defaultStatus) as ContentStatus;

  return {
    title,
    slug,
    short_description: formString(formData, "short_description"),
    full_description: formOptionalString(formData, "full_description"),
    intended_for: parseLines(formData.get("intended_for")),
    areas_covered: parseLines(formData.get("areas_covered")),
    expected_value: parseLines(formData.get("expected_value")),
    icon: formOptionalString(formData, "icon"),
    status,
    sort_order: formNumber(formData, "sort_order", 0),
  };
}

export async function createProgrammeAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const payload = programmePayload(formData);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programmes")
    .insert(payload)
    .select("id, slug, status, title")
    .single();

  if (error || !data) {
    redirect(
      `/admin/programmes/new?error=${encodeURIComponent(error?.message ?? "Create failed")}`,
    );
  }

  await writeAuditLog({
    actorId: user.id,
    action: "programme.create",
    entityType: "programme",
    entityId: data.id,
    newValues: { status: data.status, slug: data.slug, title: data.title },
  });

  revalidatePath("/admin/programmes");
  revalidatePath("/programmes");
  redirect(`/admin/programmes/${data.id}?saved=1`);
}

export async function updateProgrammeAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  if (!id) throw new Error("Missing programme id");

  const payload = programmePayload(formData);

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

export async function seedProgrammesAction() {
  const { user } = await requireAdminUser();
  const rows = staticProgrammes.map((programme, index) => ({
    slug: programme.id,
    title: programme.title,
    short_description: programme.overview,
    challenges: programme.challenges,
    activities: programme.activities,
    beneficiaries: programme.beneficiaries,
    outcomes: programme.outcomes,
    status: "published" as const,
    sort_order: index + 1,
  }));

  const supabase = await createClient();
  const { error } = await supabase.from("programmes").upsert(rows, {
    onConflict: "slug",
  });

  if (error) {
    redirect(`/admin/programmes?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "programme.seed",
    entityType: "programme",
    newValues: { count: rows.length, source: "static" },
  });

  revalidatePath("/admin/programmes");
  revalidatePath("/programmes");
  redirect("/admin/programmes?seeded=1");
}

export async function createServiceAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const payload = servicePayload(formData);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .insert(payload)
    .select("id, slug, status, title")
    .single();

  if (error || !data) {
    redirect(
      `/admin/services/new?error=${encodeURIComponent(error?.message ?? "Create failed")}`,
    );
  }

  await writeAuditLog({
    actorId: user.id,
    action: "service.create",
    entityType: "service",
    entityId: data.id,
    newValues: { status: data.status, slug: data.slug, title: data.title },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect(`/admin/services/${data.id}?saved=1`);
}

export async function updateServiceAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  if (!id) throw new Error("Missing service id");

  const payload = servicePayload(formData);

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

export async function seedServicesAction() {
  const { user } = await requireAdminUser();
  const rows = staticServices.map((service, index) => ({
    slug: service.id,
    title: service.title,
    short_description: service.description,
    intended_for: service.whoFor ? [service.whoFor] : [],
    areas_covered: service.areas,
    expected_value: service.institutionalValue ? [service.institutionalValue] : [],
    status: "published" as const,
    sort_order: index + 1,
  }));

  const supabase = await createClient();
  const { error } = await supabase.from("services").upsert(rows, {
    onConflict: "slug",
  });

  if (error) {
    redirect(`/admin/services?error=${encodeURIComponent(error.message)}`);
  }

  await writeAuditLog({
    actorId: user.id,
    action: "service.seed",
    entityType: "service",
    newValues: { count: rows.length, source: "static" },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services?seeded=1");
}
