import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoreValueCard } from "@/components/ui/CoreValueCard";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { FounderCard } from "@/components/ui/FounderCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { siteConfig } from "@/content/site";
import { coreValues } from "@/content/values";
import { sealMeanings } from "@/content/framework";
import { strategicPillars } from "@/content/pillars";
import { partnerCta } from "@/content/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About BGIVS",
  description:
    "Learn about Babobiz Global Institute of Value Systems (BGIVS)—its mission, vision, core values, institutional seal, and commitment to integrated value systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={siteConfig.nameWithAbbreviation}
        title="Building Institutions That Create Meaningful Value"
        description={`${siteConfig.shortName} exists to redefine organizational success by connecting measurable performance with purpose, values, governance, responsibility, sustainability, credibility, and long-term societal impact.`}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading title="Who We Are" />
              <p className="mt-4 text-muted">{siteConfig.institutionalStatement}</p>
              <p className="mt-4 text-muted">
                Babobiz Global Institute of Value Systems is a research, training, consulting,
                and publishing institution.
              </p>
            </div>
            <div>
              <SectionHeading title="What We Do" />
              <p className="mt-4 text-muted">{siteConfig.whatWeDo}</p>
              <p className="mt-4 text-muted">
                The institute helps governments, universities, corporations, SMEs, NGOs,
                research institutions, and development agencies align measurable performance with
                purpose, governance, ethics, accountability, transparency, organizational values,
                corporate responsibility, sustainability, stakeholder trust, community impact,
                institutional credibility, institutional legitimacy, and long-term societal value.
              </p>
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
          />
          <p className="mt-6 max-w-3xl text-muted">
            BGIVS believes that organizational success cannot be defined by performance measures
            alone. Metrics matter—but they become meaningful when connected to purpose, ethics,
            governance integrity, responsibility, sustainability, credibility, and legitimacy.
            The institute works to help institutions move from short-term performance systems to
            enduring value-driven systems.
          </p>
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
                description="The circular institutional seal expresses the institute’s identity, intellectual framework, and philosophy. It is distinct from the shield-shaped BGIVS logo used in the website header, hero, and footer."
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
          <ResponsiveGrid columns={2}>
            {strategicPillars.map((pillar) => (
              <article key={pillar.id} className="institutional-card p-6">
                <h3 className="text-xl text-navy">{pillar.name}</h3>
                <p className="mt-3 text-sm text-muted">{pillar.description}</p>
              </article>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Author and Founder" className="mb-10" />
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
