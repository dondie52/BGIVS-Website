import { HomeHero } from "@/components/home/HomeHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandPillarCard } from "@/components/ui/StrategicPillarCard";
import { StrategicPillarCard } from "@/components/ui/StrategicPillarCard";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { BeneficiaryCard } from "@/components/ui/BeneficiaryCard";
import { OutcomeCard } from "@/components/ui/OutcomeCard";
import { FounderCard } from "@/components/ui/FounderCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { FrameworkDiagram } from "@/components/diagrams/FrameworkDiagram";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { siteConfig } from "@/content/site";
import { brandPillars, institutionalChallenges, institutionalOutcomes } from "@/content/outcomes";
import { strategicPillars } from "@/content/pillars";
import { programmes } from "@/content/programmes";
import { homeBeneficiaries } from "@/content/beneficiaries";
import { publications } from "@/content/publications";
import { partnerCta } from "@/content/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: siteConfig.shortName,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Institutional Introduction"
            title="Transforming Performance into Purpose"
            description="Babobiz Global Institute of Value Systems advances the science and practice of integrated value systems. Through research, institutional training, consulting, publishing, and strategic collaboration, BGIVS helps organizations align measurable performance with governance, ethics, responsibility, sustainability, and meaningful impact."
          />
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Core Brand Message"
            title="Who We Are, What We Do, and Why It Matters"
            className="mb-10"
          />
          <ResponsiveGrid columns={4}>
            {brandPillars.map((pillar) => (
              <BrandPillarCard
                key={pillar.id}
                title={pillar.title}
                description={pillar.description}
                href={
                  pillar.id === "our-framework"
                    ? "/framework"
                    : pillar.id === "who-we-are"
                      ? "/about"
                      : pillar.id === "what-we-do"
                        ? "/pillars"
                        : "/about"
                }
              />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              title="Performance Alone Is Not Enough"
              description="Modern institutions frequently prioritize profit, efficiency, output, growth, and short-term targets while giving insufficient attention to governance integrity, ethics, transparency, accountability, sustainability, stakeholder trust, and community impact."
            />
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy">
                This imbalance may contribute to:
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {institutionalChallenges.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-off-white px-4 py-3 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Our Framework"
            title="The BVSDQ–CSRDQ Framework"
            description="A strategic and measurable tool that helps organizations translate values and responsibilities into practical, actionable, and sustainable institutional strategies."
            className="mb-10"
          />
          <FrameworkDiagram />
          <div className="mt-8">
            <Button href="/framework" variant="primary">
              Discover the Framework
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Strategic Pillars"
            title="Four Pillars of Institutional Work"
            className="mb-10"
          />
          <ResponsiveGrid columns={2}>
            {strategicPillars.map((pillar) => (
              <StrategicPillarCard key={pillar.id} pillar={pillar} />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/pillars" variant="outline">
              Explore Our Strategic Pillars
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Programme Areas"
            title="Programmes Across Sectors"
            className="mb-10"
          />
          <ResponsiveGrid columns={3}>
            {programmes.map((programme, index) => (
              <ProgrammeCard key={programme.id} programme={programme} index={index} />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/programmes" variant="outline">
              View All Programmes
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Who We Serve"
            title="Strengthening Institutions Across Sectors"
            className="mb-10"
          />
          <ResponsiveGrid columns={3}>
            {homeBeneficiaries.map((beneficiary) => (
              <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Expected Institutional Outcomes"
            description="BGIVS supports institutions seeking lasting improvement across governance, responsibility, and meaningful impact—without relying on unverified statistics."
            className="mb-10"
          />
          <ResponsiveGrid columns={2}>
            {institutionalOutcomes.map((outcome) => (
              <OutcomeCard key={outcome.id} outcome={outcome} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Founder"
            title="Founder and Framework Developer"
            className="mb-10"
          />
          <FounderCard compact />
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            label="Featured Publications"
            title="Knowledge That Advances Practice"
            className="mb-10"
          />
          <ResponsiveGrid columns={2}>
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <CallToAction
        title="Build a More Responsible, Sustainable, and Value-Driven Institution"
        description="Partner with BGIVS for research collaboration, governance reform, institutional assessment, leadership training, consulting, publishing, or sustainable development programmes."
        primary={{ label: partnerCta.label, href: partnerCta.href }}
        secondary={{ label: "Contact the Institute", href: "/contact" }}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 rounded-2xl border border-border bg-off-white p-8 lg:grid-cols-2">
            <div>
              <SectionHeading title="Contact the Institute" />
              <div className="mt-6 space-y-2 text-sm text-muted">
                <p>
                  Email:{" "}
                  <a
                    href={siteConfig.emailHref}
                    className="font-semibold text-blue hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={siteConfig.phoneHref}
                    className="font-semibold text-blue hover:underline"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Button href="/contact" variant="primary">
                Go to Contact Form
              </Button>
              <Button href={partnerCta.href} variant="outline">
                {partnerCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
