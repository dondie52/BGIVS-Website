import { ArrowRight } from "lucide-react";

const metrics = ["Profit", "Efficiency", "Output", "KPIs"];
const meaning = [
  "Purpose",
  "Ethics",
  "Governance",
  "Responsibility",
  "Sustainability",
  "Credibility",
];

export function MetricsToMeaningDiagram() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Diagram showing metrics such as profit and efficiency transforming into meaning through purpose, ethics, governance, responsibility, sustainability, and credibility"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="diagram-panel fade-up rounded-xl border border-navy/15 bg-navy p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-light-gold">
            Metrics
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {metrics.map((item, index) => (
              <span
                key={item}
                className="diagram-chip rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm"
                style={{ animationDelay: `${80 + index * 60}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center" aria-hidden="true">
          <div className="diagram-flow-pulse hidden h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold lg:flex">
            <ArrowRight className="h-5 w-5" />
          </div>
          <p className="max-w-[9rem] text-xs font-semibold uppercase tracking-[0.12em] text-gold">
            From Metrics to Meaning
          </p>
        </div>

        <div
          className="diagram-panel fade-up rounded-xl border border-gold/40 bg-white p-5"
          style={{ animationDelay: "140ms" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Meaning</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {meaning.map((item, index) => (
              <span
                key={item}
                className="diagram-chip rounded-md border border-border bg-off-white px-3 py-1.5 text-sm text-navy"
                style={{ animationDelay: `${160 + index * 50}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
