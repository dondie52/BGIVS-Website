import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    title === siteConfig.shortName
      ? `${siteConfig.shortName} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.shortName}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_BW",
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/images/bgivs-logo.jpeg`,
          width: 911,
          height: 1280,
          alt: "Babobiz Global Institute of Value Systems logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteConfig.url}/images/bgivs-logo.jpeg`],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
