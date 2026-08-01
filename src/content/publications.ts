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
      "Examines how business value systems contribute to corporate success, drawing on evidence from Botswana.",
    href: "/knowledge/a1-business-value-systems-corporate-successfulness.pdf",
    actionLabel: "View Paper",
    external: true,
  },
  {
    slug: "bridging-education-and-enterprise",
    title:
      "Bridging Education and Enterprise: Exploring the Link Between School Curriculum and Entrepreneurship in King William's Town, Eastern Cape",
    type: "Research paper PDF",
    categoryId: "research-reports",
    description:
      "Explores the relationship between school curriculum, enterprise development and entrepreneurship education.",
    href: "/knowledge/a2-bridging-education-and-enterprise.pdf",
    actionLabel: "View Paper",
    external: true,
  },
  {
    slug: "bvsd-csrd-involvement-model",
    title:
      "The BVSD-CSRD Involvement Model: Integrating Business Values and Social Responsibility in Practice",
    type: "Research paper PDF",
    categoryId: "research-reports",
    description:
      "Presents a model connecting business values and corporate social-responsibility disclosure in organisational practice.",
    href: "/knowledge/a3-bvsd-csrd-involvement-model.pdf",
    actionLabel: "View Paper",
    external: true,
  },
  {
    slug: "bgivs-organogram",
    title: "Babobiz Global Institute of Value Systems (BGIVS) - Organogram",
    type: "Institutional governance document",
    categoryId: "institutional-guides",
    description:
      "The governance, executive, functional and support structure of the Babobiz Global Institute of Value Systems.",
    href: "/knowledge/institutional-documents/bgivs-organogram",
    actionLabel: "View Organogram",
  },
];

export const publications: Publication[] = [
  {
    slug: "bvsdq-csrdq-framework",
    title: "BVSDQ–CSRDQ Framework®",
    subtitle: "A Strategic Tool for Business Successfulness",
    author: "Dr. Lindunda Wamunyima",
    publisher: "Babobiz Knowledge Press",
    category: "Books",
    image: "/images/publications/bvsdq-csrdq-framework.jpeg",
    description:
      "A practical framework integrating Business Value System Disclosure Quality and Corporate Social Responsibility Disclosure Quality into a unified and measurable institutional approach. The publication examines how ethics, governance, strategy, transparency, stakeholder trust, and responsible business practices can support sustainable organizational performance.",
    isbn: "978-99968-79-66-1",
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
    isbn: "978-99968-79-64-7",
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
  {
    slug: "barotse-change-volume-1",
    title: "Barotse Change",
    subtitle:
      "A Purely Barotzish Mindset Change Advocacy for a Completely Independent Barotseland in the Transition Period and Beyond — Volume I",
    author: "Dr. Lindunda Wamunyima",
    publisher: "Babobiz Knowledge Press",
    category: "Books",
    image: "/images/publications/barotse-change-volume-1.jpeg",
    description:
      "A structured advocacy for identity, justice, and self-determination that examines Barotseland's historical and political journey, the impact of the 1964 Agreement abrogation, and the governance, identity, and nationhood questions shaping the transition period and beyond.",
    isbn: "978-99968-79-62-3",
    topics: [
      "Barotseland history",
      "Identity and nationhood",
      "Justice and self-determination",
      "Governance",
      "1964 Barotseland Agreement",
      "Mindset change",
      "Transition planning",
      "National renewal",
    ],
  },
];

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
