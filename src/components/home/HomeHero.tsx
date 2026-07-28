import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { siteConfig } from "@/content/site";
import { partnerCta } from "@/content/navigation";
import { images } from "@/lib/images";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={images.heroAtmosphere.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/92 via-navy/88 to-blue/75" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(243,201,79,0.18), transparent 32%), radial-gradient(circle at 85% 15%, rgba(8,117,184,0.28), transparent 42%)",
        }}
      />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="fade-up">
          <p className="mb-4 font-serif text-2xl font-semibold tracking-tight text-light-gold sm:text-3xl">
            {siteConfig.shortName}
          </p>
          <h1 className="max-w-xl font-serif text-4xl !text-white sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Helping institutions move from performance-driven metrics to sustainable,
            value-driven systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/framework" variant="primary">
              Explore the Framework
            </Button>
            <Button href={partnerCta.href} variant="gold-outline">
              {partnerCta.label}
            </Button>
          </div>
        </div>

        <div
          className="fade-up flex justify-center lg:justify-end"
          style={{ animationDelay: "120ms" }}
        >
          <BgivsLogo
            priority
            className="h-auto w-full max-w-[300px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:max-w-[360px]"
            sizes="(max-width: 1024px) 90vw, 360px"
          />
        </div>
      </Container>
    </section>
  );
}
