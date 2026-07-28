import type { StrategicPillar } from "@/types";

export const strategicPillars: StrategicPillar[] = [
  {
    id: "research-and-innovation",
    name: "Research and Innovation",
    description:
      "Developing, testing, documenting, and improving integrated value-system frameworks, institutional assessment methods, strategic KPIs, policy tools, research models, and governance solutions.",
    keyActivities: [
      "Framework development and refinement",
      "Institutional assessment methodology design",
      "Strategic KPI and policy tool development",
      "Evidence-based research and documentation",
      "Governance and value-systems innovation",
    ],
    beneficiaries: [
      "Universities and research institutions",
      "Policymakers",
      "Governments and public institutions",
      "Development agencies",
      "Institutional leaders",
    ],
    outcomes: [
      "Stronger evidence base for institutional decisions",
      "Improved value-systems frameworks and tools",
      "Clearer pathways for governance improvement",
      "Research that informs training and consulting practice",
    ],
    cta: { label: "Collaborate on Research", href: "/contact?interest=research-collaboration" },
  },
  {
    id: "capacity-building-and-training",
    name: "Capacity Building and Training",
    description:
      "Equipping leaders, institutions, businesses, public officials, researchers, students, and development practitioners with practical knowledge in governance, ethical leadership, accountability, sustainability, organizational values, corporate citizenship, and responsible development.",
    keyActivities: [
      "Leadership and governance programmes",
      "Workshops and institutional training",
      "Capacity-building initiatives for public and private sectors",
      "Curriculum and learning support",
      "Practical skills development in value systems",
    ],
    beneficiaries: [
      "Institutional leaders",
      "Public officials",
      "Corporate managers",
      "SME owners",
      "Researchers and students",
      "Development practitioners",
    ],
    outcomes: [
      "Stronger ethical leadership capacity",
      "Improved governance literacy",
      "Practical skills for institutional improvement",
      "Shared language for values, responsibility, and performance",
    ],
    cta: { label: "Enquire About Training", href: "/contact?interest=training-and-capacity-building" },
  },
  {
    id: "consulting-and-institutional-transformation",
    name: "Consulting and Institutional Transformation",
    description:
      "Helping organizations assess their systems, identify governance, performance, responsibility, and value gaps, align strategy with purpose, and implement sustainable institutional improvements.",
    keyActivities: [
      "Institutional assessments",
      "Value-alignment and governance reviews",
      "Strategy and purpose alignment",
      "Corporate responsibility and sustainability advisory",
      "Transformation planning and implementation support",
    ],
    beneficiaries: [
      "Governments and public institutions",
      "Corporations",
      "SMEs",
      "NGOs",
      "Development agencies",
    ],
    outcomes: [
      "Clearer understanding of institutional gaps",
      "Better alignment of strategy with purpose and values",
      "Stronger accountability and transparency practices",
      "Sustainable pathways for institutional improvement",
    ],
    cta: {
      label: "Request Institutional Consulting",
      href: "/contact?interest=institutional-consulting",
    },
  },
  {
    id: "publishing-and-knowledge-dissemination",
    name: "Publishing and Knowledge Dissemination",
    description:
      "Publishing books, research reports, policy papers, articles, training manuals, institutional guides, thought-leadership materials, and evidence-based frameworks.",
    keyActivities: [
      "Book and research report publishing",
      "Policy papers and institutional guides",
      "Thought-leadership materials",
      "Knowledge dissemination through training and events",
      "Framework documentation and communication",
    ],
    beneficiaries: [
      "Researchers",
      "Universities",
      "Policymakers",
      "Institutional leaders",
      "Development practitioners",
    ],
    outcomes: [
      "Accessible, evidence-based institutional knowledge",
      "Wider dissemination of value-systems frameworks",
      "Support for teaching, policy, and practice",
      "Stronger institutional learning ecosystems",
    ],
    cta: { label: "Explore Publications", href: "/research" },
  },
];
