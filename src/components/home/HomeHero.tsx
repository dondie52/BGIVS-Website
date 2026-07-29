import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

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
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="fade-up mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl leading-snug !text-white sm:text-4xl lg:text-5xl">
            {siteConfig.name}{" "}
            <span className="text-light-gold">({siteConfig.shortName})</span>
          </h1>
          <p className="mt-6 text-sm font-medium tracking-wide text-white/70 sm:text-base">
            Research. Training. Consulting. Publishing. Institutional Transformation.
          </p>
        </div>

        <div className="fade-up flex justify-center" style={{ animationDelay: "120ms" }}>
          <BgivsLogo
            priority
            className="hero-shield"
            sizes="(max-width: 640px) 78vw, 430px"
          />
        </div>
      </Container>
    </section>
  );
}
