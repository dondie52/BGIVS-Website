import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { siteConfig } from "@/content/site";
import { partnerCta } from "@/content/navigation";

export function HomeHero() {
  return (
    <section className="navy-gradient relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(243,201,79,0.16), transparent 32%), radial-gradient(circle at 85% 15%, rgba(8,117,184,0.35), transparent 42%)",
        }}
      />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="fade-up">
          <p className="section-label mb-4 text-light-gold">{siteConfig.name}</p>
          <h1 className="max-w-xl font-serif text-4xl !text-white sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Transforming governments, universities, corporations, SMEs, NGOs, and development
            institutions from performance-driven organizations into sustainable, value-driven
            systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/framework" variant="primary">
              Explore the BVSDQ–CSRDQ Framework
            </Button>
            <Button href={partnerCta.href} variant="gold-outline">
              {partnerCta.label}
            </Button>
          </div>
          <p className="mt-6 text-sm font-medium tracking-wide text-white/70">
            Research. Training. Consulting. Publishing. Institutional Transformation.
          </p>
        </div>

        <div className="fade-up flex justify-center lg:justify-end" style={{ animationDelay: "120ms" }}>
          <div className="flex min-h-[430px] w-full max-w-[380px] items-center justify-center rounded-2xl border border-border/60 bg-white p-8 shadow-lg sm:p-10">
            <BgivsLogo
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 90vw, 380px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
