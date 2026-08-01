import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SocialSharePlaceholder } from "@/components/ui/SocialSharePlaceholder";
import { CallToAction } from "@/components/ui/CallToAction";
import {
  getPublishedPublicationBySlug,
  getPublishedPublications,
} from "@/lib/content/publications";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const publications = await getPublishedPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublishedPublicationBySlug(slug);
  if (!publication) return {};
  return createPageMetadata({
    title: publication.title,
    description: publication.description,
    path: `/research/${publication.slug}`,
  });
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublishedPublicationBySlug(slug);
  if (!publication) notFound();

  return (
    <>
      <PageHero
        label="Publication"
        title={publication.title}
        subtitle={publication.subtitle}
        description={`${publication.author} · ${publication.publisher}`}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research and Publications", href: "/research" },
              { label: publication.title },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
            <div className="flex items-center justify-center rounded-2xl border border-border bg-off-white p-5 sm:p-8">
              <Image
                src={publication.image}
                alt={`Cover of ${publication.title} by ${publication.author}`}
                width={420}
                height={630}
                className="h-auto w-auto max-w-full rounded-sm object-contain shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                style={{ maxHeight: "680px", maxWidth: "min(100%, 420px)" }}
                priority
              />
            </div>

            <div>
              <h2 className="text-2xl text-navy">About this publication</h2>
              <p className="mt-4 max-w-3xl text-muted">{publication.description}</p>

              <h3 className="mt-8 text-lg text-navy">Topics</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {publication.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border bg-off-white px-3 py-1 text-sm text-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={`/research/request/${publication.slug}`}
                  variant="primary"
                >
                  Request a Copy
                </Button>
                <Button
                  href={`/contact?interest=book-enquiry&message=${encodeURIComponent(`I would like to enquire about ${publication.title}.`)}`}
                  variant="outline"
                >
                  Enquire About This Book
                </Button>
              </div>

              <div className="mt-8">
                <SocialSharePlaceholder title={publication.title} />
              </div>

              {publication.isbn ? (
                <p className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-navy">ISBN:</span> {publication.isbn}.
                  Publication pricing and fulfilment options will be confirmed through direct
                  enquiry.
                </p>
              ) : (
                <p className="mt-6 text-sm text-muted">
                  ISBN details will be displayed once officially verified. Publication pricing and
                  fulfilment options will be confirmed through direct enquiry.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Use This Work in Your Institution"
        description="Enquire about copies, training connections, research collaboration, or institutional application of the ideas in this publication."
        primary={{ label: "Contact the Institute", href: "/contact" }}
        secondary={{ label: "Explore Publications", href: "/research" }}
      />
    </>
  );
}
