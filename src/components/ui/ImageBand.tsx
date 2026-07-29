import Image from "next/image";
import { Container } from "@/components/ui/Container";

type ImageBandProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  priority?: boolean;
};

export function ImageBand({
  src,
  alt,
  title,
  description,
  priority = false,
}: ImageBandProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-deep-navy/88 via-navy/78 to-navy/55"
        aria-hidden="true"
      />
      <Container className="relative py-16 sm:py-20">
        <p className="section-label mb-3 text-light-gold">In Focus</p>
        <h2 className="max-w-2xl text-3xl !text-white sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}
