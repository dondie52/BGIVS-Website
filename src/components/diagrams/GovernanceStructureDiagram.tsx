"use client";

import { ArrowDown } from "lucide-react";
import { governanceUnits } from "@/content/governance";

export function GovernanceStructureDiagram() {
  const board = governanceUnits.find((u) => u.level === "board")!;
  const executive = governanceUnits.find((u) => u.level === "executive")!;
  const units = governanceUnits.filter((u) => u.level === "unit");

  return (
    <div
      className="rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Organizational structure: Board of Directors above Executive Director above four institutional units"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
        <StructureNode title={board.name} subtitle="Strategic oversight" emphasis />
        <ArrowDown className="h-5 w-5 text-gold" aria-hidden="true" />
        <StructureNode title={executive.name} subtitle="Operational leadership" />
        <ArrowDown className="h-5 w-5 text-gold" aria-hidden="true" />
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {units.map((unit) => (
            <StructureNode key={unit.id} title={unit.name} subtitle="Institutional unit" />
          ))}
        </div>
      </div>
    </div>
  );
}

function StructureNode({
  title,
  subtitle,
  emphasis = false,
}: {
  title: string;
  subtitle: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border px-5 py-4 text-center shadow-sm ${
        emphasis
          ? "border-gold/50 bg-navy text-white"
          : "border-border bg-white text-navy"
      }`}
    >
      <p className={`text-base font-semibold ${emphasis ? "text-white" : "text-navy"}`}>{title}</p>
      <p className={`mt-1 text-sm ${emphasis ? "text-white/80" : "text-muted"}`}>{subtitle}</p>
    </div>
  );
}
