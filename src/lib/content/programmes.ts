import "server-only";

import { programmes as staticProgrammes } from "@/content/programmes";
import { createClient } from "@/lib/supabase/server";
import { filterPublished } from "@/lib/content/utils";
import type { Programme } from "@/types";
import type { Database } from "@/types/database";

export const revalidate = 60;

type ProgrammeRow = Database["public"]["Tables"]["programmes"]["Row"];

function mapProgramme(row: ProgrammeRow): Programme {
  return {
    id: row.slug,
    title: row.title,
    overview: row.short_description ?? "",
    challenges: row.challenges ?? [],
    activities: row.activities ?? [],
    beneficiaries: row.beneficiaries ?? [],
    outcomes: row.outcomes ?? [],
  };
}

export async function getPublishedProgrammes(): Promise<Programme[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("programmes")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[content/programmes] list failed", {
        message: error.message,
      });
      return staticProgrammes;
    }

    const published = filterPublished(data ?? []);
    if (published.length === 0) {
      return staticProgrammes;
    }

    return published.map(mapProgramme);
  } catch (error) {
    console.error("[content/programmes] unexpected list error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return staticProgrammes;
  }
}

export async function getPublishedProgrammeBySlug(
  slug: string,
): Promise<Programme | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("programmes")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("[content/programmes] slug lookup failed", {
        message: error.message,
        slug,
      });
      return staticProgrammes.find((p) => p.id === slug) ?? null;
    }

    if (!data) {
      return staticProgrammes.find((p) => p.id === slug) ?? null;
    }

    return mapProgramme(data);
  } catch (error) {
    console.error("[content/programmes] unexpected slug error", {
      message: error instanceof Error ? error.message : "unknown",
      slug,
    });
    return staticProgrammes.find((p) => p.id === slug) ?? null;
  }
}
