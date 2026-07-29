import Link from "next/link";
import {
  Building2,
  Factory,
  Globe2,
  GraduationCap,
  Landmark,
  Leaf,
} from "lucide-react";
import type { Programme } from "@/types";

const icons = [
  Landmark,
  GraduationCap,
  Building2,
  Factory,
  Globe2,
  Leaf,
] as const;

const shortLabels: Record<string, string> = {
  "government-governance-reform": "Government",
  "university-research-collaborations": "Universities",
  "corporate-value-alignment": "Corporations",
  "sme-development-sustainability": "SMEs",
  "value-systems-research-development": "Research",
  "sustainable-development-community-impact": "Communities",
};

export function ProgrammeMapDiagram({ programmes }: { programmes: Programme[] }) {
  return (
    <div
      className="rounded-2xl border border-border bg-off-white p-6 sm:p-8"
      role="img"
      aria-label="Map of BGIVS programme areas across government, universities, corporations, SMEs, research, and communities"
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Programme Map</p>
        <p className="mt-2 text-sm text-muted">Six sectors. One value-systems approach.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((programme, index) => {
          const Icon = icons[index % icons.length];
          const label = shortLabels[programme.id] ?? programme.title;
          return (
            <Link
              key={programme.id}
              href={`#${programme.id}`}
              className="diagram-panel fade-up group flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-gold/60 hover:shadow-md"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy text-light-gold transition group-hover:bg-gold group-hover:text-deep-navy">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">{label}</span>
                <span className="mt-1 block line-clamp-2 text-xs text-muted">
                  {programme.overview}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
