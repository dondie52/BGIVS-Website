import { HomeHero } from "@/components/home/HomeHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandPillarCard } from "@/components/ui/StrategicPillarCard";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { BeneficiaryCard } from "@/components/ui/BeneficiaryCard";
import { FounderCard } from "@/components/ui/FounderCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ImageBand } from "@/components/ui/ImageBand";
import { FrameworkDiagram } from "@/components/diagrams/FrameworkDiagram";
import { MetricsToMeaningDiagram } from "@/components/diagrams/MetricsToMeaningDiagram";
import { PillarsOverviewDiagram } from "@/components/diagrams/PillarsOverviewDiagram";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { siteConfig } from "@/content/site";
import { brandPillars } from "@/content/outcomes";
import { programmes } from "@/content/programmes";
import { homeBeneficiaries } from "@/content/beneficiaries";
import { publications } from "@/content/publications";
import { partnerCta } from "@/content/navigation";
import { images } from "@/lib/images";
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
            label="Institutional Philosophy"
            title="From Metrics to Meaning"
            description="Performance measures matter—but they become meaningful when connected to purpose, ethics, governance, responsibility, and lasting societal value."
            className="mb-8"
          />
          <MetricsToMeaningDiagram />
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
          <SectionHeading
            label="Our Framework"
            title="The BVSDQ–CSRDQ Framework"
            description="A strategic tool that helps organizations translate values and responsibilities into practical institutional strategies."
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

      <ImageBand
        src={images.sectionResearch.src}
        alt={images.sectionResearch.alt}
        title="Research that shapes institutional practice"
        description="Evidence-based frameworks, assessment methods, and knowledge products that help leaders move from disclosure to transformation."
      />

      <section className="bg-off-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Strategic Pillars"
            title="Four Pillars of Institutional Work"
            className="mb-8"
          />
          <PillarsOverviewDiagram />
          <div className="mt-8">
            <Button href="/pillars" variant="outline">
              Explore Our Strategic Pillars
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
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

      <ImageBand
        src={images.sectionCollaboration.src}
        alt={images.sectionCollaboration.alt}
        title="Partnerships that strengthen institutions"
        description="Collaborate with BGIVS on governance reform, leadership capacity, consulting, and sustainable development programmes."
      />

      <section className="bg-off-white py-12 sm:py-16">
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

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <SectionHeading
            label="Founder"
            title="Founder and Framework Developer"
            className="mb-8"
          />
          <FounderCard compact />
        </Container>
      </section>

      <section className="bg-off-white py-12 sm:py-16">
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
