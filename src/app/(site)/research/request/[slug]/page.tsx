import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookRequestForm } from "@/components/forms/BookRequestForm";
import { getPublicationBySlug } from "@/content/publications";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) return {};
  return createPageMetadata({
    title: `Request a copy · ${publication.title}`,
    description: `Request a copy of ${publication.title} from Babobiz Global Institute of Value Systems.`,
    path: `/research/request/${publication.slug}`,
  });
}

export default async function BookRequestPage({ params }: Props) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);
  if (!publication) notFound();

  return (
    <>
      <PageHero
        label="Book request"
        title="Request a Copy"
        description={`Submit a request for “${publication.title}”.`}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research and Publications", href: "/research" },
              { label: publication.title, href: `/research/${publication.slug}` },
              { label: "Request a Copy" },
            ]}
          />

          <div className="mx-auto mt-10 max-w-2xl institutional-card p-6 sm:p-8">
            <h2 className="text-2xl text-navy">{publication.title}</h2>
            <p className="mt-2 text-sm text-muted">
              Fields marked with <span className="text-red-700">*</span> are required.
            </p>
            <div className="relative mt-6">
              <BookRequestForm
                publicationSlug={publication.slug}
                publicationTitle={publication.title}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
