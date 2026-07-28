import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { getPublishedProgrammes } from "@/lib/content/programmes";
import { partnerCta } from "@/content/navigation";
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
        description="BGIVS designs programmes that help institutions align performance with purpose, responsibility, sustainability, and meaningful impact. Programme schedules and fees will be shared upon enquiry."
      />
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
