import type { NavGroup, NavLink } from "@/types";

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About BGIVS", href: "/about" },
  { label: "Our Framework", href: "/framework" },
  { label: "Strategic Pillars", href: "/pillars" },
  { label: "Programmes", href: "/programmes" },
  { label: "Services", href: "/services" },
  { label: "Research and Publications", href: "/research" },
  { label: "Governance", href: "/governance" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
];

export const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About BGIVS", href: "/about" },
      { label: "Mission and Vision", href: "/about#mission-vision" },
      { label: "Core Values", href: "/about#core-values" },
      { label: "Institutional Seal", href: "/about#institutional-seal" },
      { label: "Founder", href: "/founder" },
      { label: "Governance", href: "/governance" },
    ],
  },
  {
    label: "What We Do",
    href: "/pillars",
    items: [
      { label: "Strategic Pillars", href: "/pillars" },
      { label: "Programmes", href: "/programmes" },
      { label: "Consulting", href: "/services#governance-and-value-systems-consulting" },
      { label: "Training", href: "/services#leadership-and-governance-training" },
      { label: "Research", href: "/services#institutional-research" },
      { label: "Publishing", href: "/services#publishing-and-knowledge-development" },
    ],
  },
  {
    label: "Knowledge",
    href: "/research#resources",
    items: [
      { label: "BVSDQ–CSRDQ Framework®", href: "/framework" },
      { label: "Research and Publications", href: "/research" },
      { label: "Institutional Documents", href: "/research#institutional-guides" },
      { label: "BGIVS Organogram", href: "/knowledge/institutional-documents/bgivs-organogram" },
      { label: "Books", href: "/research#books" },
      { label: "Resources", href: "/research#resources" },
    ],
  },
];

export const footerNav: NavLink[] = [
  { label: "About BGIVS", href: "/about" },
  { label: "Our Framework", href: "/framework" },
  { label: "Strategic Pillars", href: "/pillars" },
  { label: "Programmes", href: "/programmes" },
  { label: "Services", href: "/services" },
  { label: "Research and Publications", href: "/research" },
  { label: "Governance", href: "/governance" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
];

export const partnerCta = {
  label: "Partner With BGIVS",
  href: "/contact?interest=partnership",
} as const;
