import { frameworkAreas } from "@/content/framework";
import { ArrowDown, ArrowRight } from "lucide-react";

export function FrameworkDiagram() {
  const [bvsdq, csrdq, integrated] = frameworkAreas;

  return (
    <div
      className="rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Diagram showing BVSDQ internal values and performance plus CSRDQ external responsibility and impact leading to Integrated Institutional Value"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        <FrameworkPanel
          title={bvsdq.title}
          subtitle={bvsdq.subtitle}
          items={bvsdq.items.slice(0, 5)}
          tone="navy"
        />
        <div className="flex items-center justify-center text-gold" aria-hidden="true">
          <span className="hidden lg:inline">
            <ArrowRight className="h-6 w-6" />
          </span>
          <span className="lg:hidden">
            <ArrowDown className="h-6 w-6" />
          </span>
        </div>
        <FrameworkPanel
          title={csrdq.title}
          subtitle={csrdq.subtitle}
          items={csrdq.items.slice(0, 5)}
          tone="blue"
        />
        <div className="flex items-center justify-center text-gold" aria-hidden="true">
          <span className="hidden lg:inline">
            <ArrowRight className="h-6 w-6" />
          </span>
          <span className="lg:hidden">
            <ArrowDown className="h-6 w-6" />
          </span>
        </div>
        <FrameworkPanel
          title={integrated.title}
          subtitle={integrated.subtitle}
          items={integrated.items.slice(0, 5)}
          tone="gold"
        />
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        BVSDQ (internal values and performance) + CSRDQ (external responsibility and impact) →
        Integrated Institutional Value
      </p>
    </div>
  );
}

function FrameworkPanel({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle: string;
  items: string[];
  tone: "navy" | "blue" | "gold";
}) {
  const tones = {
    navy: "border-navy/20 bg-navy text-white",
    blue: "border-blue/20 bg-blue text-white",
    gold: "border-gold/40 bg-white text-navy",
  };

  return (
    <div className={`rounded-xl border p-5 shadow-sm ${tones[tone]}`}>
      <h3 className={`text-lg ${tone === "gold" ? "text-navy" : "text-white"}`}>{title}</h3>
      <p className={`mt-1 text-sm ${tone === "gold" ? "text-muted" : "text-white/85"}`}>
        {subtitle}
      </p>
      <ul className={`mt-4 space-y-1.5 text-sm ${tone === "gold" ? "text-muted" : "text-white/90"}`}>
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
