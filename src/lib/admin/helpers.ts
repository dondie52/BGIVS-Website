import type { ContentStatus, EnquiryStatus, PublicationType } from "@/types/database";

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  "new",
  "in_progress",
  "responded",
  "closed",
  "spam",
];

export const CONTENT_STATUSES: ContentStatus[] = ["draft", "published", "archived"];

export const PUBLICATION_TYPES: PublicationType[] = [
  "book",
  "research_report",
  "policy_paper",
  "article",
  "institutional_guide",
  "training_material",
];

export const PUBLIC_SETTINGS_KEYS = [
  "contact_email",
  "contact_phone",
  "location",
  "site_name",
  "short_name",
  "tagline",
] as const;

export type PublicSettingsKey = (typeof PUBLIC_SETTINGS_KEYS)[number];

export function parseLines(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseCommaList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function getPublicMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return path;
  return `${base}/storage/v1/object/public/public-media/${path.replace(/^\//, "")}`;
}

export function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function formOptionalString(formData: FormData, key: string): string | null {
  const value = formString(formData, key);
  return value.length ? value : null;
}

export function formNumber(formData: FormData, key: string, fallback = 0): number {
  const raw = formString(formData, key);
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function formCheckbox(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}
