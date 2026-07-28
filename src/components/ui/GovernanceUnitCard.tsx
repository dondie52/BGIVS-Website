import type { GovernanceUnit } from "@/types";

type GovernanceUnitCardProps = {
  unit: GovernanceUnit;
  showPlaceholder?: boolean;
};

export function GovernanceUnitCard({
  unit,
  showPlaceholder = true,
}: GovernanceUnitCardProps) {
  return (
    <article className="institutional-card h-full p-6">
      <p className="section-label mb-2">
        {unit.level === "board"
          ? "Board"
          : unit.level === "executive"
            ? "Executive"
            : "Institutional Unit"}
      </p>
      <h3 className="text-xl text-navy">{unit.name}</h3>
      <p className="mt-3 text-sm text-muted">{unit.responsibility}</p>
      {showPlaceholder ? (
        <div className="mt-5 rounded-md border border-dashed border-border bg-off-white px-4 py-3 text-sm text-muted">
          Leadership name, biography, and photograph will be added when officially provided.
        </div>
      ) : null}
    </article>
  );
}
