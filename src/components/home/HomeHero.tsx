import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export function HomeHero() {
  return (
    <section className="home-hero-section navy-gradient relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(243,201,79,0.16), transparent 32%), radial-gradient(circle at 85% 15%, rgba(8,117,184,0.35), transparent 42%)",
        }}
      />
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
          className="hero-logo-block fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <div className="hero-logo-crop">
            <BgivsLogo
              priority
              className="hero-shield"
              sizes="(max-width: 640px) 92vw, 520px"
            />
          </div>

          <svg
            className="hero-tagline"
            viewBox="0 0 600 110"
            role="img"
            aria-label="From Metrics to Meaning"
          >
            <defs>
              <path id="hero-tagline-curve" d="M 90 25 Q 300 115 510 25" />
            </defs>
            <text fill="#FFFFFF">
              <textPath
                href="#hero-tagline-curve"
                startOffset="50%"
                textAnchor="middle"
              >
                From Metrics to Meaning
              </textPath>
            </text>
          </svg>
        </div>
      </Container>
    </section>
  );
}
