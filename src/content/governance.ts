import type { GovernanceUnit } from "@/types";

export const governanceUnits: GovernanceUnit[] = [
  {
    id: "board-of-directors",
    name: "Board of Directors",
    responsibility:
      "Strategic oversight, institutional direction, governance, policy approval, accountability, and long-term stewardship.",
    level: "board",
  },
  {
    id: "executive-director",
    name: "Executive Director",
    responsibility:
      "Operational leadership, strategy implementation, programme coordination, partnership development, and institutional management.",
    level: "executive",
  },
  {
    id: "research-and-innovation",
    name: "Research and Innovation Unit",
    responsibility:
      "Research, framework development, institutional assessment, policy analysis, publications, evidence development, and innovation.",
    level: "unit",
  },
  {
    id: "training-and-capacity-building",
    name: "Training and Capacity Building Unit",
    responsibility:
      "Professional training, workshops, institutional development, leadership programmes, and capacity-building initiatives.",
    level: "unit",
  },
  {
    id: "publishing-and-communications",
    name: "Publishing and Communications Unit",
    responsibility:
      "Books, research reports, policy papers, articles, media, communications, institutional branding, and knowledge dissemination.",
    level: "unit",
  },
  {
    id: "administration-and-finance",
    name: "Administration and Finance Unit",
    responsibility:
      "Finance, administration, operations, compliance, procurement, documentation, and internal institutional support.",
    level: "unit",
  },
];

export const governancePhilosophy =
  "BGIVS is committed to responsible institutional stewardship. Governance at the institute emphasizes accountability, ethical leadership, transparency, strategic oversight, and the long-term credibility of its research, training, consulting, and publishing mandate.";
