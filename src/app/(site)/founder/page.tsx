import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { founderContent } from "@/content/outcomes";
import { publications } from "@/content/publications";
import { images } from "@/lib/images";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Founder",
  description:
    "Meet Dr. Lindunda Wamunyima, Founder of Babobiz Global Institute of Value Systems and developer of the BVSDQ–CSRDQ Framework.",
  path: "/founder",
});

export default function FounderPage() {
  return (
    <>
      <PageHero
        label="Founder"
        title={founderContent.name}
        subtitle={founderContent.subtitle}
        description="Educator, academic leader, researcher, and author focused on governance, value systems, accountability, institutional transformation, and sustainable development."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex justify-center">
            <Image
              src={images.founder.src}
              alt={images.founder.alt}
              width={images.founder.width}
              height={images.founder.height}
              priority
              className="h-auto w-auto rounded-[10px] object-contain shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
              style={{ maxWidth: "min(100%, 420px)", maxHeight: "600px" }}
              sizes="(max-width: 640px) min(88vw, 360px), 420px"
            />
          </div>
          <SectionHeading title="Biography" />
          <p className="mt-4 max-w-3xl text-muted">{founderContent.biography}</p>
          <p className="mt-4 max-w-3xl text-muted">{founderContent.contribution}</p>
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
            description="Dr. Wamunyima is the developer of the BVSDQ–CSRDQ Model, integrating Business Value System Disclosure Quality with Corporate Social Responsibility Disclosure Quality."
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
        title="Collaborate With the Founder and BGIVS"
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
