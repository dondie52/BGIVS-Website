import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { partnerCta } from "@/content/navigation";

export function HomeHero() {
  return (
    <section className="home-hero-section relative overflow-hidden">
      <Container className="home-hero-container relative py-12 sm:py-16 lg:py-20">
        <div className="fade-up mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-light-gold">
            Research · Training · Consulting · Publishing
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight !text-white sm:text-5xl lg:text-6xl">
            Building Responsible, Sustainable and Value-Driven Institutions
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
            BGIVS helps governments, universities, businesses, and development organisations align governance, performance, ethics, sustainability, and stakeholder responsibility.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button href="/framework" variant="primary">
              Explore the Framework
            </Button>
            <Button href={partnerCta.href} variant="gold-outline">
              Partner With BGIVS
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
