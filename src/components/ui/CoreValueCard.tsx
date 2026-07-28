import type { CoreValue } from "@/types";

type CoreValueCardProps = {
  value: CoreValue;
};

export function CoreValueCard({ value }: CoreValueCardProps) {
  return (
    <article className="institutional-card h-full p-5">
      <h3 className="text-lg text-navy">{value.name}</h3>
      <p className="mt-2 text-sm text-muted">{value.description}</p>
    </article>
  );
}
