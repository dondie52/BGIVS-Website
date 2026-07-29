import { ArrowDown, ArrowRight } from "lucide-react";
import type { Programme } from "@/types";

export function ProgrammePathwayDiagram({ programme }: { programme: Programme }) {
  const stages = [
    { title: "Challenges", items: programme.challenges.slice(0, 3), tone: "navy" as const },
    { title: "Activities", items: programme.activities.slice(0, 3), tone: "blue" as const },
    { title: "Outcomes", items: programme.outcomes.slice(0, 3), tone: "gold" as const },
  ];

  return (
    <div
      className="mt-5"
      role="img"
      aria-label={`${programme.title} pathway from challenges through activities to outcomes`}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {stages.map((stage, index) => (
          <div key={stage.title} className="contents">
            <div
              className={`rounded-xl border p-4 ${
                stage.tone === "navy"
                  ? "border-navy/20 bg-navy text-white"
                  : stage.tone === "blue"
                    ? "border-blue/20 bg-blue text-white"
                    : "border-gold/40 bg-white text-navy"
              }`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-[0.12em] ${
                  stage.tone === "gold" ? "text-gold" : "text-light-gold"
                }`}
              >
                {stage.title}
              </p>
              <ul
                className={`mt-3 space-y-1.5 text-sm ${
                  stage.tone === "gold" ? "text-muted" : "text-white/90"
                }`}
              >
                {stage.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            {index < stages.length - 1 ? (
              <div className="flex items-center justify-center text-gold" aria-hidden="true">
                <span className="hidden lg:inline">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="lg:hidden">
                  <ArrowDown className="h-5 w-5" />
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {programme.beneficiaries.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-off-white px-2.5 py-1 text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
