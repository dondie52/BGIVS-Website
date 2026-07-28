import type { Publication, PublicationCategory } from "@/types";

export const publicationCategories: PublicationCategory[] = [
  { id: "books", name: "Books" },
  {
    id: "research-reports",
    name: "Research Reports",
    emptyMessage: "New research publications will be added as they become available.",
  },
  {
    id: "policy-papers",
    name: "Policy Papers",
    emptyMessage: "New research publications will be added as they become available.",
  },
  {
    id: "articles",
    name: "Articles",
    emptyMessage: "New research publications will be added as they become available.",
  },
  {
    id: "institutional-guides",
    name: "Institutional Guides",
    emptyMessage: "New research publications will be added as they become available.",
  },
  {
    id: "training-materials",
    name: "Training Materials",
    emptyMessage: "New research publications will be added as they become available.",
  },
];

export const publications: Publication[] = [
  {
    slug: "bvsdq-csrdq-framework",
    title: "BVSDQ–CSRDQ Framework",
    subtitle: "A Strategic Tool for Business Successfulness",
    author: "Dr. Lindunda Wamunyima",
    publisher: "Babobiz Knowledge Press",
    category: "Books",
    image: "/images/publications/bvsdq-csrdq-framework.jpg",
    description:
      "A practical framework integrating Business Value System Disclosure Quality and Corporate Social Responsibility Disclosure Quality into a unified and measurable institutional approach. The publication examines how ethics, governance, strategy, transparency, stakeholder trust, and responsible business practices can support sustainable organizational performance.",
    topics: [
      "Business values",
      "Governance",
      "Ethics",
      "Corporate responsibility",
      "Strategic KPIs",
      "Transparency",
      "Accountability",
      "Stakeholder trust",
      "Sustainability",
      "Institutional performance",
    ],
  },
  {
    slug: "business-values-corporate-citizenship-botswana",
    title: "Business Values and Corporate Citizenship in Botswana",
    subtitle: "A Strategic Framework for Sustainable Development",
    author: "Dr. Lindunda Wamunyima",
    publisher: "Babobiz Knowledge Press",
    category: "Books",
    image: "/images/publications/business-values-botswana.jpg",
    description:
      "An African-centred framework examining how business values and corporate citizenship can strengthen governance, stakeholder trust, inclusive growth, responsible enterprise development, and national sustainability.",
    topics: [
      "Ethical leadership",
      "Corporate governance",
      "Accountability",
      "Sustainable enterprise development",
      "Stakeholder engagement",
      "CSR integration",
      "National development",
      "Inclusive growth",
      "Corporate citizenship",
    ],
  },
];

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
