import type { Beneficiary } from "@/types";

export const beneficiaries: Beneficiary[] = [
  {
    id: "governments",
    name: "Governments and public institutions",
    description:
      "Governance reform, accountability, public-sector performance, institutional credibility, ethical leadership, and sustainable policy implementation.",
    href: "/programmes#government-governance-reform",
  },
  {
    id: "universities",
    name: "Universities and research institutions",
    description:
      "Research collaboration, framework development, academic publications, conferences, institutional studies, curriculum support, and value-systems scholarship.",
    href: "/programmes#university-research-collaborations",
  },
  {
    id: "corporations",
    name: "Corporations",
    description:
      "Value alignment, governance, ethics, sustainability, stakeholder trust, corporate citizenship, accountability, and long-term business performance.",
    href: "/programmes#corporate-value-alignment",
  },
  {
    id: "smes",
    name: "Small and medium-sized enterprises",
    description:
      "Governance, resilience, business values, responsible growth, sustainability, strategy, and institutional capacity building.",
    href: "/programmes#sme-development-sustainability",
  },
  {
    id: "ngos",
    name: "NGOs",
    description:
      "Governance, accountability, impact measurement, sustainability, institutional legitimacy, community development, and evidence-based programmes.",
    href: "/programmes#sustainable-development-community-impact",
  },
  {
    id: "development-agencies",
    name: "Development agencies",
    description:
      "Governance, accountability, impact measurement, sustainability, institutional legitimacy, community development, and evidence-based programmes.",
    href: "/programmes#sustainable-development-community-impact",
  },
  {
    id: "policymakers",
    name: "Policymakers",
    description:
      "Policy alignment, institutional frameworks, governance reform tools, and evidence that connects performance with purpose and public value.",
    href: "/services#policy-and-framework-development",
  },
  {
    id: "researchers",
    name: "Researchers",
    description:
      "Collaborative research, publications, framework development, and scholarship on value systems, governance, and sustainable development.",
    href: "/programmes#university-research-collaborations",
  },
  {
    id: "institutional-leaders",
    name: "Institutional leaders",
    description:
      "Leadership development, value alignment, governance strengthening, and practical pathways for institutional transformation.",
    href: "/services#leadership-and-governance-training",
  },
  {
    id: "development-practitioners",
    name: "Development practitioners",
    description:
      "Practical tools, training, and frameworks that connect institutional improvement with inclusive and lasting community impact.",
    href: "/programmes#sustainable-development-community-impact",
  },
];

export const homeBeneficiaries = beneficiaries.filter((b) =>
  [
    "governments",
    "universities",
    "corporations",
    "smes",
    "ngos",
    "development-agencies",
  ].includes(b.id),
);
