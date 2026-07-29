import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ProgrammeMapDiagram } from "@/components/diagrams/ProgrammeMapDiagram";
import { getPublishedProgrammes } from "@/lib/content/programmes";
import { partnerCta } from "@/content/navigation";
import { images } from "@/lib/images";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: "Programmes",
  description:
    "Explore BGIVS programmes in governance reform, university research collaboration, corporate value alignment, SME development, value-systems research, and sustainable community impact.",
  path: "/programmes",
});

export default async function ProgrammesPage() {
  const programmes = await getPublishedProgrammes();

  return (
    <>
      <PageHero
        label="Programmes"
        title="Programme Areas"
        description="Programmes that help institutions align performance with purpose, responsibility, and meaningful impact. Schedules and fees are shared upon enquiry."
        imageSrc={images.sectionCollaboration.src}
      />
      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Where We Work"
            description="Jump to a sector pathway, then explore the challenges, activities, and outcomes."
            className="mb-10"
          />
          <ProgrammeMapDiagram programmes={programmes} />
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8">
            {programmes.map((programme, index) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                index={index}
                detailed
              />
            ))}
          </div>
        </Container>
      </section>
      <CallToAction
        title="Enquire About a Programme"
        description="Tell us about your institution and the programme area most relevant to your needs."
        primary={{ label: partnerCta.label, href: partnerCta.href }}
        secondary={{ label: "Contact the Institute", href: "/contact" }}
      />
    </>
  );
}
