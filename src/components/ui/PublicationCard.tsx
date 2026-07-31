import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Publication } from "@/types";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="institutional-card overflow-hidden">
      <div className="flex items-center justify-center bg-gradient-to-br from-off-white via-white to-off-white px-4 py-6 transition-all duration-300 sm:px-5 sm:py-8">
        <Image
          src={publication.image}
          alt={`Cover of ${publication.title} by ${publication.author}`}
          width={300}
          height={450}
          className="h-auto w-auto max-w-full rounded-sm object-contain shadow-sm"
          style={{ maxHeight: "280px" }}
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="section-label mb-2">Book</p>
        <h3 className="font-serif font-bold text-lg sm:text-xl text-navy">
          <Link
            href={`/research/${publication.slug}`}
            className="transition-colors duration-150 hover:text-blue hover:underline"
          >
            {publication.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-medium text-muted">{publication.subtitle}</p>
        <p className="mt-3 text-sm text-muted">
          {publication.author} · {publication.publisher}
        </p>
        <p className="mt-4 text-sm text-muted line-clamp-4">{publication.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`/research/${publication.slug}`} variant="outline">
            View Publication
          </Button>
          <Button href={`/research/request/${publication.slug}`} variant="primary">
            Request a Copy
          </Button>
        </div>
      </div>
    </article>
  );
}
