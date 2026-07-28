"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdminUser } from "@/lib/admin/auth";
import { formOptionalString, formString } from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/types/database";

export async function updateEnquiryAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  const status = formString(formData, "status") as EnquiryStatus;
  const assignedTo = formOptionalString(formData, "assigned_to");

  if (!id) throw new Error("Missing enquiry id");

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("enquiries")
    .select("status, assigned_to, last_contacted_at")
    .eq("id", id)
    .single();

  const update: {
    status: EnquiryStatus;
    assigned_to: string | null;
    last_contacted_at?: string;
  } = {
    status,
    assigned_to: assignedTo,
  };

  if (status === "responded" && existing?.status !== "responded") {
    update.last_contacted_at = new Date().toISOString();
  }

  const { error } = await supabase.from("enquiries").update(update).eq("id", id);
  if (error) {
    redirect(`/admin/enquiries/${id}?error=${encodeURIComponent("Failed to update enquiry.")}`);
  }

  if (existing && existing.status !== status) {
    await writeAuditLog({
      actorId: user.id,
      action: "enquiry.status_change",
      entityType: "enquiry",
      entityId: id,
      oldValues: { status: existing.status },
      newValues: { status },
    });
  }

  if (existing && existing.assigned_to !== assignedTo) {
    await writeAuditLog({
      actorId: user.id,
      action: "enquiry.assign",
      entityType: "enquiry",
      entityId: id,
      oldValues: { assigned_to: existing.assigned_to },
      newValues: { assigned_to: assignedTo },
    });
  }

  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  redirect(`/admin/enquiries/${id}?saved=1`);
}

export async function addEnquiryNoteAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const enquiryId = formString(formData, "enquiry_id");
  const note = formString(formData, "note");

  if (!enquiryId || !note) {
    redirect(
      `/admin/enquiries/${enquiryId || ""}?error=${encodeURIComponent("Note cannot be empty.")}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiry_notes").insert({
    enquiry_id: enquiryId,
    author_id: user.id,
    note,
  });

  if (error) {
    redirect(
      `/admin/enquiries/${enquiryId}?error=${encodeURIComponent("Failed to add note.")}`,
    );
  }

  await writeAuditLog({
    actorId: user.id,
    action: "enquiry.note_add",
    entityType: "enquiry",
    entityId: enquiryId,
    newValues: { note },
  });

  revalidatePath(`/admin/enquiries/${enquiryId}`);
  redirect(`/admin/enquiries/${enquiryId}?saved=1`);
}

export async function updateBookRequestAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  const status = formString(formData, "status") as EnquiryStatus;

  if (!id) throw new Error("Missing book request id");

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("book_requests")
    .select("status")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("book_requests").update({ status }).eq("id", id);
  if (error) {
    redirect(
      `/admin/book-requests/${id}?error=${encodeURIComponent("Failed to update request.")}`,
    );
  }

  if (existing && existing.status !== status) {
    await writeAuditLog({
      actorId: user.id,
      action: "book_request.status_change",
      entityType: "book_request",
      entityId: id,
      oldValues: { status: existing.status },
      newValues: { status },
    });
  }

  revalidatePath("/admin/book-requests");
  revalidatePath(`/admin/book-requests/${id}`);
  redirect(`/admin/book-requests/${id}?saved=1`);
}
