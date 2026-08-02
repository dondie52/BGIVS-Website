import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { publications } from "@/content/publications";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/framework",
    "/pillars",
    "/programmes",
    "/services",
    "/research",
    "/governance",
    "/founder",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...publications.map((publication) => ({
      url: `${siteConfig.url}/research/${publication.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
