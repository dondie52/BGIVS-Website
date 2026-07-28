import { describe, expect, it } from "vitest";
import {
  getPublicMediaUrl,
  isImageMediaPath,
  resolvePublicationCover,
} from "@/lib/admin/helpers";

describe("getPublicMediaUrl", () => {
  it("returns null for empty paths", () => {
    expect(getPublicMediaUrl(null)).toBeNull();
    expect(getPublicMediaUrl(undefined)).toBeNull();
    expect(getPublicMediaUrl("")).toBeNull();
  });

  it("preserves absolute URLs and site-relative assets", () => {
    expect(getPublicMediaUrl("https://cdn.example/cover.jpg")).toBe(
      "https://cdn.example/cover.jpg",
    );
    expect(getPublicMediaUrl("/images/publications/placeholder.jpg")).toBe(
      "/images/publications/placeholder.jpg",
    );
  });

  it("maps storage-relative paths when Supabase URL is set", () => {
    const previous = process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    expect(getPublicMediaUrl("covers/book.jpg")).toBe(
      "https://example.supabase.co/storage/v1/object/public/public-media/covers/book.jpg",
    );
    process.env.NEXT_PUBLIC_SUPABASE_URL = previous;
  });

  it("returns null for storage-relative paths without Supabase URL", () => {
    const previous = process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(getPublicMediaUrl("covers/book.jpg")).toBeNull();
    process.env.NEXT_PUBLIC_SUPABASE_URL = previous;
  });
});

describe("resolvePublicationCover", () => {
  it("falls back to the local placeholder", () => {
    const previous = process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(resolvePublicationCover(null)).toBe("/images/publications/placeholder.jpg");
    expect(resolvePublicationCover("covers/missing.jpg")).toBe(
      "/images/publications/placeholder.jpg",
    );
    process.env.NEXT_PUBLIC_SUPABASE_URL = previous;
  });
});

describe("isImageMediaPath", () => {
  it("detects common image extensions", () => {
    expect(isImageMediaPath("covers/a.JPG")).toBe(true);
    expect(isImageMediaPath("uploads/doc.pdf")).toBe(false);
  });
});
