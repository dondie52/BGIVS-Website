"use client";

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
      className={`institutional-card scroll-mt-28 flex h-full flex-col ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10 text-blue transition-all duration-300 group-hover:bg-blue/15">
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
            className="text-sm font-semibold text-blue transition-colors duration-150 hover:text-navy hover:underline"
          >
            Explore {programme.title.split(" ")[0]}
          </Link>
        )}
      </div>
    </article>
  );
}
