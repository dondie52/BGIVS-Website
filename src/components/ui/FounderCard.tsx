import { Button } from "@/components/ui/Button";
import { founderContent } from "@/content/outcomes";

type FounderCardProps = {
  compact?: boolean;
};

export function FounderCard({ compact = false }: FounderCardProps) {
  return (
    <article className="institutional-card overflow-hidden">
      <div className="p-6 sm:p-8">
        <p className="section-label mb-2">{founderContent.role}</p>
        <h3 className="text-2xl text-navy sm:text-3xl">{founderContent.name}</h3>
        <p className="mt-4 text-sm text-muted sm:text-base">{founderContent.biography}</p>
        {!compact ? (
          <p className="mt-4 text-sm text-muted sm:text-base">{founderContent.contribution}</p>
        ) : null}
        <div className="mt-6">
          <Button href="/founder" variant="outline">
            Learn More About the Founder
          </Button>
        </div>
      </div>
    </article>
  );
}
