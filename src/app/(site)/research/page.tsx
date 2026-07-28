import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { publicationCategories } from "@/content/publications";
import { getPublishedPublications } from "@/lib/content/publications";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: "Research and Publications",
  description:
    "Explore BGIVS books and knowledge resources on the BVSDQ–CSRDQ Framework, business values, corporate citizenship, governance, and sustainable development.",
  path: "/research",
});

export default async function ResearchPage() {
  const publications = await getPublishedPublications();

  return (
    <>
      <PageHero
        label="Knowledge"
        title="Research and Publications"
        description="BGIVS publishes books, research, and institutional knowledge that advance value systems, governance, corporate responsibility, and sustainable development. ISBN details will be displayed once officially verified."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <SectionHeading
              id="books"
              title="Books"
              description="Featured publications currently available for enquiry."
            />
            <InstitutionalSeal size="md" />
          </div>
          <ResponsiveGrid columns={2}>
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section id="resources" className="scroll-mt-28 bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Knowledge Categories"
            description="Additional publication categories will be populated as new approved materials become available."
            className="mb-10"
          />
          <div className="grid gap-6">
            {publicationCategories
              .filter((category) => category.id !== "books")
              .map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-28">
                  <h3 className="mb-3 text-xl text-navy">{category.name}</h3>
                  <EmptyState
                    title={`${category.name} coming soon`}
                    message={
                      category.emptyMessage ??
                      "New research publications will be added as they become available."
                    }
                  />
                </div>
              ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Enquire About a Publication"
        description="Request a copy, explore collaboration, or ask about publishing and knowledge development with BGIVS."
        primary={{ label: "Enquire About This Book", href: "/contact?interest=book-enquiry" }}
        secondary={{ label: "Collaborate on Research", href: "/contact?interest=research-collaboration" }}
      />
    </>
  );
}
