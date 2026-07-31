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
      <div className="flex items-center justify-center bg-off-white px-5 py-7 sm:px-5 sm:py-8">
        <Image
          src={images.founder.src}
          alt={images.founder.alt}
          width={images.founder.width}
          height={images.founder.height}
          className="h-auto w-auto rounded-[10px] object-contain shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
          style={{ maxWidth: "min(100%, 420px)", maxHeight: "600px" }}
          sizes="(max-width: 640px) min(88vw, 360px), 420px"
        />
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
    </article>
  );
}
