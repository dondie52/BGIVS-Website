import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Babobiz Global Institute of Value Systems website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero label="Legal" title="Terms of Use" />
      <section className="bg-white py-16 sm:py-20">
        <Container className="prose-institutional space-y-4 text-muted">
          <p>
            This website provides institutional information about {siteConfig.name} (
            {siteConfig.shortName}), including its mission, framework, programmes, services, and
            publications.
          </p>
          <p>
            Website content is provided for general informational purposes. It does not constitute
            legal, financial, or professional advice, and it does not create a client relationship
            unless confirmed through a formal engagement with BGIVS.
          </p>
          <p>
            Framework descriptions on this website are overviews. Full technical methodology is
            available through official BGIVS publications, research, training, and consulting
            engagements.
          </p>
          <p>
            Visitors must not attempt to misuse website forms, interfere with site security, or
            submit false, unlawful, or harmful content. BGIVS may use rate limiting, audit logs,
            consent-based analytics, and administrative review to protect the website and improve
            institutional services.
          </p>
          <p>
            All institutional names, marks, and content remain the property of their respective
            owners. For permissions or formal correspondence, contact{" "}
            <a href={siteConfig.emailHref} className="font-semibold text-blue hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
