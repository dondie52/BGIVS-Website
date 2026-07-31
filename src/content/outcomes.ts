import type { Outcome } from "@/types";

export const institutionalOutcomes: Outcome[] = [
  { id: "governance", label: "Improved governance" },
  { id: "accountability", label: "Stronger accountability" },
  { id: "ethical-leadership", label: "Ethical leadership" },
  { id: "value-strategy-alignment", label: "Better value and strategy alignment" },
  { id: "transparency", label: "Improved transparency" },
  { id: "stakeholder-trust", label: "Stronger stakeholder trust" },
  { id: "sustainable-performance", label: "Sustainable performance" },
  { id: "credibility", label: "Institutional credibility" },
  { id: "legitimacy", label: "Institutional legitimacy" },
  { id: "community-impact", label: "Meaningful community impact" },
];

export const institutionalChallenges = [
  "Reputational risk",
  "Weak accountability",
  "Governance gaps",
  "Declining stakeholder trust",
  "Unsustainable growth",
  "Institutional fragility",
  "Limited social legitimacy",
];

export const brandPillars = [
  {
    id: "who-we-are",
    title: "Who We Are",
    description:
      "A research, training, consulting, and publishing institution advancing integrated value systems.",
  },
  {
    id: "what-we-do",
    title: "What We Do",
    description:
      "We transform organizations from performance-driven to value-driven systems.",
  },
  {
    id: "our-framework",
    title: "Our Framework",
    description:
      "The BVSDQ–CSRDQ Framework integrates internal organizational value with external institutional responsibility.",
  },
  {
    id: "our-impact",
    title: "Our Impact",
    description:
      "We help institutions move from metrics, outputs, and compliance to purpose, trust, sustainability, legitimacy, and meaningful impact.",
  },
] as const;

export const founderContent = {
  name: "Dr. Lindunda Wamunyima",
  role: "Founder and Framework Developer",
  subtitle: "Founder and Developer of the BVSDQ–CSRDQ Framework",
  biography:
    "Dr. Lindunda Wamunyima is an educator, academic leader, researcher, and author whose work focuses on governance, value systems, accountability, institutional transformation, and sustainable development. He is the developer of the BVSDQ–CSRDQ Model, a strategic framework integrating Business Value System Disclosure Quality with Corporate Social Responsibility Disclosure Quality.",
  contribution:
    "Through research, publishing, training, advocacy, and institutional consulting, Dr. Wamunyima contributes to the development of responsible, ethical, accountable, sustainable, credible, and legitimate organizations.",
  researchInterests: [
    "Governance",
    "Value systems",
    "Accountability",
    "Institutional transformation",
    "Sustainable development",
    "Corporate responsibility",
    "Corporate citizenship",
    "Leadership",
    "Research",
    "Publishing",
  ],
  competences: [
    "Business management",
    "Institutional leadership",
    "Framework development",
    "Research methodology",
    "Strategic consulting",
    "Organizational transformation",
  ],
  vision:
    "Dr. Wamunyima’s institutional vision is reflected in BGIVS: to advance integrated value systems so that institutions move from metrics to meaning—building organizations that are ethical, accountable, sustainable, credible, and legitimate.",
};
