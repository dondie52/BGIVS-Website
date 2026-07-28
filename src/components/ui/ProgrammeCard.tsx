import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Programme } from "@/types";
import {
  Building2,
  Factory,
  Globe2,
  GraduationCap,
  Landmark,
  Leaf,
} from "lucide-react";

const icons = [
  Landmark,
  GraduationCap,
  Building2,
  Factory,
  Globe2,
  Leaf,
] as const;

type ProgrammeCardProps = {
  programme: Programme;
  index?: number;
  detailed?: boolean;
};

export function ProgrammeCard({ programme, index = 0, detailed = false }: ProgrammeCardProps) {
  const Icon = icons[index % icons.length];

  return (
    <article
      id={programme.id}
      className="institutional-card scroll-mt-28 flex h-full flex-col p-6"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-blue/10 text-blue">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-xl text-navy">{programme.title}</h3>
      <p className="mt-3 text-sm text-muted">{programme.overview}</p>

      {detailed ? (
        <div className="mt-5 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-navy">Challenges addressed</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {programme.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-navy">Activities</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {programme.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-navy">Intended beneficiaries</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {programme.beneficiaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-navy">Potential outcomes</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {programme.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        {detailed ? (
          <Button
            href={`/contact?interest=${encodeURIComponent(programme.id)}`}
            variant="outline"
          >
            Enquire About This Programme
          </Button>
        ) : (
          <Link
            href={`/programmes#${programme.id}`}
            className="text-sm font-semibold text-blue hover:text-navy hover:underline"
          >
            Learn More
          </Link>
        )}
      </div>
    </article>
  );
}
