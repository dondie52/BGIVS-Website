import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoreValueCard } from "@/components/ui/CoreValueCard";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { FounderCard } from "@/components/ui/FounderCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { MetricsToMeaningDiagram } from "@/components/diagrams/MetricsToMeaningDiagram";
import { PillarsOverviewDiagram } from "@/components/diagrams/PillarsOverviewDiagram";
import { siteConfig } from "@/content/site";
import { coreValues } from "@/content/values";
import { sealMeanings } from "@/content/framework";
import { partnerCta } from "@/content/navigation";
import { images } from "@/lib/images";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About BGIVS",
  description:
    "Learn about Babobiz Global Institute of Value Systems—its mission, vision, core values, institutional seal, and commitment to integrated value systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About BGIVS"
        title="Building Institutions That Create Meaningful Value"
        description="BGIVS connects measurable performance with purpose, values, governance, responsibility, sustainability, and long-term societal impact."
        imageSrc={images.sectionCollaboration.src}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading title="Who We Are" />
              <p className="mt-4 text-muted">{siteConfig.institutionalStatement}</p>
            </div>
            <div>
              <SectionHeading title="What We Do" />
              <p className="mt-4 text-muted">{siteConfig.whatWeDo}</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="mission-vision" className="scroll-mt-28 bg-off-white py-16 sm:py-20">
        <Container>
          <ResponsiveGrid columns={2}>
            <article className="institutional-card gold-accent-border p-8">
              <h2 className="text-2xl text-navy">Mission</h2>
              <p className="mt-4 text-muted">{siteConfig.mission}</p>
            </article>
            <article className="institutional-card gold-accent-border p-8">
              <h2 className="text-2xl text-navy">Vision</h2>
              <p className="mt-4 text-muted">{siteConfig.vision}</p>
            </article>
          </ResponsiveGrid>
        </Container>
      </section>

      <section id="core-values" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Core Values"
            description="These values guide how BGIVS conducts research, training, consulting, publishing, and institutional engagement."
            className="mb-10"
          />
          <ResponsiveGrid columns={3}>
            {coreValues.map((value) => (
              <CoreValueCard key={value.id} value={value} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Institutional Philosophy"
            description="From Metrics to Meaning"
            className="mb-8"
          />
          <MetricsToMeaningDiagram />
        </Container>
      </section>

      <section id="institutional-seal" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr]">
            <div className="flex justify-center lg:justify-start">
              <InstitutionalSeal size="xl" />
            </div>
            <div>
              <SectionHeading
                title="The BGIVS Institutional Seal"
                description="The circular institutional seal expresses the institute’s identity and philosophy. It is distinct from the shield-shaped logo used in the header, hero, and footer."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {sealMeanings.map((item) => (
                  <article key={item.title} className="rounded-lg border border-border bg-off-white p-4">
                    <h3 className="text-base text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Strategic Priorities" className="mb-10" />
          <PillarsOverviewDiagram />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Founder Introduction" className="mb-10" />
          <FounderCard compact />
        </Container>
      </section>

      <CallToAction
        title="Partner With BGIVS"
        description="Collaborate with the institute on research, governance reform, training, consulting, publishing, or sustainable institutional development."
        primary={{ label: partnerCta.label, href: partnerCta.href }}
        secondary={{ label: "Contact the Institute", href: "/contact" }}
      />
    </>
  );
}
