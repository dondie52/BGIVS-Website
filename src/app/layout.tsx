import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.shortName,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortName,
  manifest: "/manifest.webmanifest",
  category: "education",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  authors: [{ name: siteConfig.name }],
  keywords: [
    "Babobiz Global Institute of Value Systems",
    "BGIVS",
    "BVSDQ",
    "CSRDQ",
    "BVSDQ–CSRDQ Framework",
    "Business Value System Disclosure Quality",
    "Corporate Social Responsibility Disclosure Quality",
    "Value systems research",
    "Governance consulting",
    "Institutional transformation",
    "Corporate responsibility",
    "Sustainable development",
    "Corporate citizenship Botswana",
    "Governance training",
    "Institutional consulting Botswana",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04152f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
