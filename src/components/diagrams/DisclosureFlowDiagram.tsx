import { ArrowDown, ArrowRight } from "lucide-react";

const stages = [
  {
    title: "Disclose",
    detail: "Values, performance, responsibility, and impact",
  },
  {
    title: "Assess",
    detail: "Quality, consistency, and credibility of disclosure",
  },
  {
    title: "Align",
    detail: "Strategy, governance, culture, and stakeholder expectations",
  },
  {
    title: "Transform",
    detail: "Sustainable institutional value and legitimacy",
  },
] as const;

export function DisclosureFlowDiagram() {
  return (
    <div
      className="rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Flow diagram from disclosure through assessment and alignment to institutional transformation"
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {stages.map((stage, index) => (
          <div key={stage.title} className="contents">
            <div
              className="diagram-panel fade-up rounded-xl border border-border bg-white p-5 text-center shadow-sm"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg text-navy">{stage.title}</h3>
              <p className="mt-2 text-sm text-muted">{stage.detail}</p>
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
    </div>
  );
}
