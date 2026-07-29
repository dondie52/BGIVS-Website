import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import { strategicPillars } from "@/content/pillars";

const icons = {
  "research-and-innovation": Lightbulb,
  "capacity-building-and-training": GraduationCap,
  "consulting-and-institutional-transformation": RefreshCw,
  "publishing-and-knowledge-dissemination": BookOpen,
} as const;

export function PillarsOverviewDiagram() {
  return (
    <div
      className="rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Four strategic pillars orbiting institutional value systems: research, training, consulting, and publishing"
    >
      <div className="relative mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        <div className="pointer-events-none absolute inset-[18%] hidden rounded-full border border-dashed border-gold/40 lg:block" aria-hidden="true" />
        <div className="diagram-center-pulse absolute left-1/2 top-1/2 z-10 hidden w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50 bg-navy px-4 py-5 text-center shadow-lg lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-light-gold">
            Integrated
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Value Systems</p>
        </div>

        {strategicPillars.map((pillar, index) => {
          const Icon = icons[pillar.id as keyof typeof icons] ?? Lightbulb;
          return (
            <Link
              key={pillar.id}
              href={`/pillars#${pillar.id}`}
              className="diagram-panel fade-up institutional-card group relative z-0 p-5 transition hover:border-gold/60"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue/10 text-blue transition group-hover:bg-gold/15 group-hover:text-gold">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg text-navy">{pillar.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{pillar.description}</p>
            </Link>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-muted lg:hidden">
        Four connected pillars that turn institutional performance into lasting value.
      </p>
    </div>
  );
}
