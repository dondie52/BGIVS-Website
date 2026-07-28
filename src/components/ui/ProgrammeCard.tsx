import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgrammePathwayDiagram } from "@/components/diagrams/ProgrammePathwayDiagram";
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
  compact?: boolean;
};

export function ProgrammeCard({
  programme,
  index = 0,
  detailed = false,
  compact = false,
}: ProgrammeCardProps) {
  const Icon = icons[index % icons.length];

  return (
    <article
      id={programme.id}
      className={`institutional-card scroll-mt-28 flex h-full flex-col ${compact ? "p-5" : "p-6"}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue/10 text-blue">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className={`text-navy ${compact ? "text-lg leading-snug" : "text-xl"}`}>
        {programme.title}
      </h3>
      <p
        className={`mt-2 text-sm text-muted ${compact ? "line-clamp-2" : ""}`}
      >
        {programme.overview}
      </p>

      {detailed ? <ProgrammePathwayDiagram programme={programme} /> : null}

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
