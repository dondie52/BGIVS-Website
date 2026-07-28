import "server-only";

import { services as staticServices } from "@/content/services";
import { createPublicClient } from "@/lib/supabase/public";
import { filterPublished, joinList } from "@/lib/content/utils";
import type { Service } from "@/types";
import type { Database } from "@/types/database";

export const revalidate = 60;

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

function mapService(row: ServiceRow): Service {
  return {
    id: row.slug,
    title: row.title,
    description: row.short_description ?? "",
    whoFor: joinList(row.intended_for),
    areas: row.areas_covered ?? [],
    institutionalValue: joinList(row.expected_value),
  };
}

export async function getPublishedServices(): Promise<Service[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[content/services] list failed", {
        message: error.message,
      });
      return staticServices;
    }

    const published = filterPublished(data ?? []);
    if (published.length === 0) {
      return staticServices;
    }

    return published.map(mapService);
  } catch (error) {
    console.error("[content/services] unexpected list error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return staticServices;
  }
}

export async function getPublishedServiceBySlug(
  slug: string,
): Promise<Service | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("[content/services] slug lookup failed", {
        message: error.message,
        slug,
      });
      return staticServices.find((s) => s.id === slug) ?? null;
    }

    if (!data) {
      return staticServices.find((s) => s.id === slug) ?? null;
    }

    return mapService(data);
  } catch (error) {
    console.error("[content/services] unexpected slug error", {
      message: error instanceof Error ? error.message : "unknown",
      slug,
    });
    return staticServices.find((s) => s.id === slug) ?? null;
  }
}
