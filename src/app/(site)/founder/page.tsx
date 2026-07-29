import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FounderPortrait } from "@/components/ui/FounderCard";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { founderContent } from "@/content/outcomes";
import { publications } from "@/content/publications";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Author and Founder",
  description:
    "Meet Dr. Lindunda Wamunyima, Author and Founder of Babobiz Global Institute of Value Systems (BGIVS) and developer of the BVSDQ–CSRDQ Framework.",
  path: "/founder",
});

export default function FounderPage() {
  return (
    <>
      <PageHero
        label="Author and Founder"
        title={founderContent.name}
        subtitle={founderContent.subtitle}
        description="Educator, academic leader, researcher, and author focused on governance, value systems, accountability, institutional transformation, and sustainable development."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <FounderPortrait />
            <div>
              <SectionHeading title="Biography" />
              <p className="mt-4 text-muted">{founderContent.biography}</p>
              <p className="mt-4 text-muted">{founderContent.contribution}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Research Interests" className="mb-8" />
          <ul className="flex flex-wrap gap-2">
            {founderContent.researchInterests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm text-navy"
              >
                {interest}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Framework Development"
            description="Dr. Wamunyima is the developer of the BVSDQ–CSRDQ Model, integrating Business Value System Disclosure Quality (BVSDQ) with Corporate Social Responsibility Disclosure Quality (CSRDQ)."
          />
          <p className="mt-6 max-w-3xl text-muted">
            The framework supports institutions seeking to align internal values, governance,
            ethics, strategy, and disclosure quality with external responsibility, sustainability,
            accountability, and stakeholder impact.
          </p>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Publications" className="mb-10" />
          <ResponsiveGrid columns={2}>
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Institutional Vision" />
          <p className="mt-4 max-w-3xl text-muted">{founderContent.vision}</p>
        </Container>
      </section>

      <CallToAction
        title="Collaborate With the Author, Founder, and BGIVS"
        description="Enquire about research collaboration, speaking or training engagements, publishing, or institutional consulting."
        primary={{
          label: "Contact the Institute",
          href: "/contact?interest=research-collaboration",
        }}
        secondary={{ label: "Explore the Framework", href: "/framework" }}
      />
    </>
  );
}
