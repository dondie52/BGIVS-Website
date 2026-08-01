"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdminUser } from "@/lib/admin/auth";
import {
  formCheckbox,
  formNumber,
  formOptionalString,
  formString,
  parseCommaList,
  slugify,
} from "@/lib/admin/helpers";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, PublicationType } from "@/types/database";

async function uploadIfPresent(
  file: File | null,
  bucket: "public-media" | "private-publications",
  folder: string,
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  return path;
}

function publicationPayload(formData: FormData) {
  const title = formString(formData, "title");
  const slugInput = formString(formData, "slug");
  const status = formString(formData, "status") as ContentStatus;
  const publicationType = formString(formData, "publication_type") as PublicationType;

  return {
    title,
    slug: slugInput || slugify(title),
    subtitle: formOptionalString(formData, "subtitle"),
    author: formOptionalString(formData, "author"),
    publisher: formOptionalString(formData, "publisher"),
    isbn: formOptionalString(formData, "isbn"),
    facebook_url: formOptionalString(formData, "facebook_url"),
    description: formOptionalString(formData, "description") ?? "",
    publication_type: publicationType || "book",
    topics: parseCommaList(formData.get("topics")),
    status: status || "draft",
    featured: formCheckbox(formData, "featured"),
    sort_order: formNumber(formData, "sort_order", 0),
    published_at:
      status === "published" ? new Date().toISOString() : formOptionalString(formData, "published_at"),
  };
}

export async function createPublicationAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const payload = publicationPayload(formData);

  const cover = formData.get("cover");
  const document = formData.get("document");
  const coverFile = cover instanceof File ? cover : null;
  const documentFile = document instanceof File ? document : null;

  let cover_path: string | null = null;
  let document_path: string | null = null;
  try {
    cover_path = await uploadIfPresent(coverFile, "public-media", "covers");
    document_path = await uploadIfPresent(documentFile, "private-publications", "docs");
  } catch (error) {
    redirect(
      `/admin/publications/new?error=${encodeURIComponent(
        error instanceof Error ? error.message : "Upload failed",
      )}`,
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("publications")
    .insert({
      ...payload,
      cover_path,
      document_path,
      published_at: payload.status === "published" ? new Date().toISOString() : null,
    })
    .select("id, slug, status")
    .single();

  if (error || !data) {
    redirect(
      `/admin/publications/new?error=${encodeURIComponent(error?.message ?? "Create failed")}`,
    );
  }

  await writeAuditLog({
    actorId: user.id,
    action: "publication.create",
    entityType: "publication",
    entityId: data.id,
    newValues: { slug: data.slug, status: data.status },
  });

  revalidatePath("/admin/publications");
  revalidatePath("/research");
  if (data.status === "published") {
    revalidatePath(`/research/${data.slug}`);
  }
  redirect(`/admin/publications/${data.id}?saved=1`);
}

export async function updatePublicationAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const id = formString(formData, "id");
  if (!id) throw new Error("Missing publication id");

  const payload = publicationPayload(formData);
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  const cover = formData.get("cover");
  const document = formData.get("document");
  const coverFile = cover instanceof File ? cover : null;
  const documentFile = document instanceof File ? document : null;

  let cover_path = existing?.cover_path ?? null;
  let document_path = existing?.document_path ?? null;

  try {
    const newCover = await uploadIfPresent(coverFile, "public-media", "covers");
    const newDoc = await uploadIfPresent(documentFile, "private-publications", "docs");
    if (newCover) cover_path = newCover;
    if (newDoc) document_path = newDoc;
  } catch (error) {
    redirect(
      `/admin/publications/${id}?error=${encodeURIComponent(
        error instanceof Error ? error.message : "Upload failed",
      )}`,
    );
  }

  let published_at = existing?.published_at ?? null;
  if (payload.status === "published" && existing?.status !== "published") {
    published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("publications")
    .update({
      ...payload,
      cover_path,
      document_path,
      published_at,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/publications/${id}?error=${encodeURIComponent(error.message)}`,
    );
  }

  await writeAuditLog({
    actorId: user.id,
    action: "publication.update",
    entityType: "publication",
    entityId: id,
    oldValues: existing
      ? { status: existing.status, slug: existing.slug, title: existing.title }
      : null,
    newValues: { status: payload.status, slug: payload.slug, title: payload.title },
  });

  revalidatePath("/admin/publications");
  revalidatePath(`/admin/publications/${id}`);
  revalidatePath("/research");
  revalidatePath(`/research/${payload.slug}`);
  if (existing?.slug && existing.slug !== payload.slug) {
    revalidatePath(`/research/${existing.slug}`);
  }
  redirect(`/admin/publications/${id}?saved=1`);
}
