import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { founderContent } from "@/content/outcomes";
import { images } from "@/lib/images";

type FounderCardProps = {
  compact?: boolean;
};

export function FounderCard({ compact = false }: FounderCardProps) {
  return (
    <article className="institutional-card overflow-hidden">
      <div className="flex items-center justify-center bg-off-white px-4 py-6 sm:px-5 sm:py-7">
        <Image
          src={images.founder.src}
          alt={images.founder.alt}
          width={images.founder.width}
          height={images.founder.height}
          className="h-auto w-auto rounded-lg object-contain shadow-sm"
          style={{ maxWidth: "min(100%, 300px)", maxHeight: "450px" }}
          sizes="(max-width: 640px) min(85vw, 280px), 300px"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="section-label mb-2">{founderContent.role}</p>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-navy">{founderContent.name}</h3>
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
