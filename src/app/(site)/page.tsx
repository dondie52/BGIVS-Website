import { HomeHero } from "@/components/home/HomeHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandPillarCard } from "@/components/ui/StrategicPillarCard";
import { StrategicPillarCard } from "@/components/ui/StrategicPillarCard";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { BeneficiaryCard } from "@/components/ui/BeneficiaryCard";
import { FounderCard } from "@/components/ui/FounderCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { FrameworkDiagram } from "@/components/diagrams/FrameworkDiagram";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { siteConfig } from "@/content/site";
import { brandPillars, institutionalChallenges } from "@/content/outcomes";
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

const featuredProgrammes = programmes.slice(0, 3);
const featuredBeneficiaries = homeBeneficiaries.slice(0, 3);
const featuredPublications = publications.slice(0, 2);

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Institutional Introduction"
            title="Transforming Performance into Purpose"
            description="BGIVS advances integrated value systems through research, training, consulting, publishing, and strategic collaboration—helping organizations align performance with governance, ethics, sustainability, and meaningful impact."
          />
        </Container>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Core Brand Message"
            title="Who We Are, What We Do, and Why It Matters"
            className="mb-8"
          />
          <ResponsiveGrid columns={4}>
            {brandPillars.map((pillar) => (
              <BrandPillarCard
                key={pillar.id}
                title={pillar.title}
                description={pillar.description}
                compact
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

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <SectionHeading
              title="Performance Alone Is Not Enough"
              description="Institutions often prioritize profit, efficiency, and short-term targets while underweighting governance, ethics, accountability, sustainability, and stakeholder trust."
            />
            <ul className="flex flex-wrap gap-2">
              {institutionalChallenges.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-off-white px-3 py-1.5 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Our Framework"
            title="The BVSDQ–CSRDQ Framework®"
            description="A strategic tool that helps organizations translate values and responsibilities into practical, sustainable institutional strategies."
            className="mb-8"
          />
          <FrameworkDiagram />
          <div className="mt-8">
            <Button href="/framework" variant="primary">
              Discover the Framework
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Strategic Pillars"
            title="Four Pillars of Institutional Work"
            className="mb-8"
          />
          <ResponsiveGrid columns={2}>
            {strategicPillars.map((pillar) => (
              <StrategicPillarCard key={pillar.id} pillar={pillar} compact />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/pillars" variant="outline">
              Explore Our Strategic Pillars
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Programme Areas"
            title="Programmes Across Sectors"
            description="Selected programmes spanning public institutions, higher education, and enterprise development."
            className="mb-8"
          />
          <ResponsiveGrid columns={3}>
            {featuredProgrammes.map((programme, index) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                index={index}
                compact
              />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/programmes" variant="outline">
              View All Programmes
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Who We Serve"
            title="Strengthening Institutions Across Sectors"
            className="mb-8"
          />
          <ResponsiveGrid columns={3}>
            {featuredBeneficiaries.map((beneficiary) => (
              <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} compact />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/programmes" variant="outline">
              See Who We Serve
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Founder"
            title="Founder and Framework Developer"
            className="mb-8"
          />
          <FounderCard compact />
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Featured Publications"
            title="Knowledge That Advances Practice"
            className="mb-8"
          />
          <ResponsiveGrid columns={2}>
            {featuredPublications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </ResponsiveGrid>
          <div className="mt-8">
            <Button href="/research" variant="outline">
              Browse Research and Publications
            </Button>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Build a More Responsible, Sustainable, and Value-Driven Institution"
        description="Partner with BGIVS for research collaboration, governance reform, institutional assessment, leadership training, consulting, publishing, or sustainable development programmes."
        primary={{ label: partnerCta.label, href: partnerCta.href }}
        secondary={{ label: "Contact the Institute", href: "/contact" }}
      />
    </>
  );
}
