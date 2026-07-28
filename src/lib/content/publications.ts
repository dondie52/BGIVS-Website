import "server-only";

import {
  publications as staticPublications,
} from "@/content/publications";
import { createClient } from "@/lib/supabase/server";
import { filterPublished } from "@/lib/content/utils";
import type { Publication } from "@/types";
import type { Database } from "@/types/database";

export const revalidate = 60;

type PublicationRow = Database["public"]["Tables"]["publications"]["Row"];

function mapPublication(row: PublicationRow): Publication {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    author: row.author ?? "",
    publisher: row.publisher ?? "",
    category: "Books",
    image: row.cover_path ?? "/images/publications/placeholder.jpg",
    description: row.description ?? "",
    topics: row.topics ?? [],
  };
}

export async function getPublishedPublications(): Promise<Publication[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[content/publications] list failed", {
        message: error.message,
      });
      return staticPublications;
    }

    const published = filterPublished(data ?? []);
    if (published.length === 0) {
      return staticPublications;
    }

    return published.map(mapPublication);
  } catch (error) {
    console.error("[content/publications] unexpected list error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return staticPublications;
  }
}

export async function getPublishedPublicationBySlug(
  slug: string,
): Promise<Publication | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("[content/publications] slug lookup failed", {
        message: error.message,
        slug,
      });
      return staticPublications.find((p) => p.slug === slug) ?? null;
    }

    if (!data) {
      return staticPublications.find((p) => p.slug === slug) ?? null;
    }

    return mapPublication(data);
  } catch (error) {
    console.error("[content/publications] unexpected slug error", {
      message: error instanceof Error ? error.message : "unknown",
      slug,
    });
    return staticPublications.find((p) => p.slug === slug) ?? null;
  }
}
