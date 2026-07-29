import type { KnowledgeResource, Publication, PublicationCategory } from "@/types";

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
    name: "Institutional Documents",
    emptyMessage: "New research publications will be added as they become available.",
  },
  {
    id: "training-materials",
    name: "Training Materials",
    emptyMessage: "New research publications will be added as they become available.",
  },
];

export const knowledgeResources: KnowledgeResource[] = [
  {
    slug: "business-value-systems-corporate-successfulness-botswana",
    title: "How Business Value Systems Drive Corporate Successfulness: Evidence from Botswana",
    type: "Research paper PDF",
    categoryId: "research-reports",
    description:
      "A research paper on business value systems and corporate successfulness using evidence from Botswana.",
    href: "/docs/knowledge/A1%20How%20Business%20Value%20Systems%20Drive%20Corporate%20Successfulness%20A.pdf",
    actionLabel: "Read Paper",
    external: true,
  },
  {
    slug: "bridging-education-and-enterprise",
    title:
      "Bridging Education and Enterprise: Exploring the Link Between School Curriculum and Entrepreneurship in King William's Town, Eastern Cape",
    type: "Research paper PDF",
    categoryId: "research-reports",
    description:
      "A research paper exploring the link between school curriculum and entrepreneurship in King William's Town, Eastern Cape.",
    href: "/docs/knowledge/A2%20Bridging%20Education%20and%20Enterprise%20B.pdf",
    actionLabel: "Read Paper",
    external: true,
  },
  {
    slug: "bvsd-csrd-involvement-model",
    title:
      "The BVSD-CSRD Involvement Model: Integrating Business Values and Social Responsibility in Practice",
    type: "Research paper PDF",
    categoryId: "research-reports",
    description:
      "A research paper on the BVSD-CSRD Involvement Model and the integration of business values and social responsibility in practice.",
    href: "/docs/knowledge/A3%20The%20BVSD%20CSRD%20Involvement%20Model%20Integrating%20Business%20Values%20and%20Social%20Responsibility%20in%20Practice.pdf",
    actionLabel: "Read Paper",
    external: true,
  },
  {
    slug: "bgivs-organogram",
    title: "Babobiz Global Institute of Value Systems (BGIVS) - Organogram",
    type: "Institutional document",
    categoryId: "institutional-guides",
    description:
      "The governance, executive, functional and support structure of the Babobiz Global Institute of Value Systems.",
    href: "/research/organogram",
    actionLabel: "View Organogram",
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
    image: "/images/publications/bvsdq-csrdq-framework.jpeg",
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
    image: "/images/publications/business-values-botswana.jpeg",
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
