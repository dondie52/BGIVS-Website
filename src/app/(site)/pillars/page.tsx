import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StrategicPillarCard } from "@/components/ui/StrategicPillarCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { PillarsOverviewDiagram } from "@/components/diagrams/PillarsOverviewDiagram";
import { strategicPillars } from "@/content/pillars";
import { partnerCta } from "@/content/navigation";
import { images } from "@/lib/images";
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
        description="Four connected pillars guide research, training, consulting, and knowledge dissemination."
        imageSrc={images.sectionResearch.src}
      />
      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Pillar Overview"
            description="Each pillar reinforces the others around integrated institutional value systems."
            className="mb-10"
          />
          <PillarsOverviewDiagram />
        </Container>
      </section>
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
