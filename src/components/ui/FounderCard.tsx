import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { founderContent } from "@/content/outcomes";

type FounderCardProps = {
  compact?: boolean;
};

export function FounderCard({ compact = false }: FounderCardProps) {
  return (
    <article className="institutional-card overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[240px_1fr]">
        <div className="bg-off-white p-6">
          <div className="mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-md border border-border bg-white shadow-sm">
            <Image
              src={images.founder.src}
              alt={images.founder.alt}
              width={images.founder.width}
              height={images.founder.height}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
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
      </div>
    </article>
  );
}

export function FounderPortrait() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="aspect-[3/4] overflow-hidden rounded-md bg-off-white">
        <Image
          src={images.founder.src}
          alt={images.founder.alt}
          width={images.founder.width}
          height={images.founder.height}
          className="h-full w-full object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}
