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
};

export function StrategicPillarCard({ pillar, detailed = false }: StrategicPillarCardProps) {
  const Icon = icons[pillar.id as keyof typeof icons] ?? Building2;

  return (
    <article className="institutional-card gold-accent-border flex h-full flex-col p-6">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-navy/5 text-navy">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-xl text-navy">{pillar.name}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{pillar.description}</p>
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
      <div className="mt-6">
        <Button href={pillar.cta.href} variant="outline" className="w-full sm:w-auto">
          {pillar.cta.label}
        </Button>
      </div>
    </article>
  );
}

export function BrandPillarCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <>
      <h3 className="text-xl text-navy">{title}</h3>
      <p className="mt-3 text-sm text-muted">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="institutional-card gold-accent-border block h-full p-6">
        {content}
      </Link>
    );
  }

  return <article className="institutional-card gold-accent-border h-full p-6">{content}</article>;
}
