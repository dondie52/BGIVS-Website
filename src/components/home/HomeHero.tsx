import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export function HomeHero() {
  return (
    <section className="home-hero-section relative overflow-hidden">
      <Container className="home-hero-container relative pb-16 sm:pb-20 lg:pb-24">
        <div className="fade-up mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl leading-snug !text-white sm:text-4xl lg:text-5xl">
            {siteConfig.name}{" "}
            <span className="text-light-gold">({siteConfig.shortName})</span>
          </h1>
          <p className="mt-6 text-sm font-medium tracking-wide text-white/70 sm:text-base">
            Research. Training. Consulting. Publishing. Institutional Transformation.
          </p>
        </div>

        <div
          className="hero-logo-wrapper fade-up hidden sm:block"
          style={{ animationDelay: "120ms" }}
        >
          <BgivsLogo
            className="hero-logo"
            sizes="(max-width: 640px) 92vw, 520px"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
