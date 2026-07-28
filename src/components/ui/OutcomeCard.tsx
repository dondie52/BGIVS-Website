import { CheckCircle2 } from "lucide-react";
import type { Outcome } from "@/types";

type OutcomeCardProps = {
  outcome: Outcome;
};

export function OutcomeCard({ outcome }: OutcomeCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-white px-4 py-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
      <p className="text-sm font-medium text-navy">{outcome.label}</p>
    </div>
  );
}
