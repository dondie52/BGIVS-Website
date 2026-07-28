import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { StrategicPillarCard } from "@/components/ui/StrategicPillarCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { strategicPillars } from "@/content/pillars";
import { partnerCta } from "@/content/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Strategic Pillars",
  description:
    "Explore BGIVS strategic pillars: Research and Innovation, Capacity Building and Training, Consulting and Institutional Transformation, and Publishing and Knowledge Dissemination.",
  path: "/pillars",
});

export default function PillarsPage() {
  return (
    <>
      <PageHero
        label="What We Do"
        title="Strategic Pillars"
        description="BGIVS advances integrated value systems through four connected institutional pillars that guide research, training, consulting, and knowledge dissemination."
      />
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8">
            {strategicPillars.map((pillar) => (
              <StrategicPillarCard key={pillar.id} pillar={pillar} detailed />
            ))}
          </div>
        </Container>
      </section>
      <CallToAction
        title="Work With BGIVS Across Our Pillars"
        description="Partner with the institute on research, training, consulting, or publishing initiatives that strengthen institutional value systems."
        primary={{ label: partnerCta.label, href: partnerCta.href }}
        secondary={{ label: "View Our Programmes", href: "/programmes" }}
      />
    </>
  );
}
