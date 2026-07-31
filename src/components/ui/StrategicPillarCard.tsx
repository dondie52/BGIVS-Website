"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { StrategicPillar } from "@/types";
import { BookOpen, Building2, FlaskConical, GraduationCap } from "lucide-react";

const icons = {
  "research-and-innovation": FlaskConical,
  "capacity-building-and-training": GraduationCap,
  "consulting-and-institutional-transformation": Building2,
  "publishing-and-knowledge-dissemination": BookOpen,
} as const;

type StrategicPillarCardProps = {
  pillar: StrategicPillar;
  detailed?: boolean;
  compact?: boolean;
};

export function StrategicPillarCard({
  pillar,
  detailed = false,
  compact = false,
}: StrategicPillarCardProps) {
  const Icon = icons[pillar.id as keyof typeof icons] ?? Building2;

  return (
    <article
      id={pillar.id}
      className={`institutional-card gold-accent-border scroll-mt-28 flex h-full flex-col ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/8 text-navy transition-all duration-300 group-hover:bg-navy/12">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className={`text-navy ${compact ? "text-lg leading-snug" : "text-xl"}`}>
        {pillar.name}
      </h3>
      <p
        className={`mt-2 text-sm text-muted ${compact ? "line-clamp-2" : "flex-1"}`}
      >
        {pillar.description}
      </p>
      {compact ? (
        <Link
          href={`/pillars#${pillar.id}`}
          className="mt-4 inline-block text-sm font-semibold text-blue transition-colors duration-150 hover:text-navy hover:underline"
        >
          Explore {pillar.name.split(" ").slice(0, 2).join(" ")}
        </Link>
      ) : null}
      {detailed ? (
        <div className="mt-5 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-navy">Key activities</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {pillar.keyActivities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-navy">Intended beneficiaries</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {pillar.beneficiaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-navy">Potential outcomes</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {pillar.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {compact ? null : (
        <div className="mt-6">
          <Button href={pillar.cta.href} variant="outline" className="w-full sm:w-auto">
            {pillar.cta.label}
          </Button>
        </div>
      )}
    </article>
  );
}

export function BrandPillarCard({
  title,
  description,
  href,
  compact = false,
}: {
  title: string;
  description: string;
  href?: string;
  compact?: boolean;
}) {
  const content = (
    <>
      <h3 className={`text-navy ${compact ? "text-lg" : "text-xl"}`}>{title}</h3>
      <p className={`mt-2 text-sm text-muted ${compact ? "line-clamp-3" : ""}`}>
        {description}
      </p>
    </>
  );

  const className = `institutional-card gold-accent-border block h-full ${compact ? "p-5" : "p-6"}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
