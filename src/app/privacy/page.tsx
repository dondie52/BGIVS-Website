import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description: "Privacy notice for Babobiz Global Institute of Value Systems website enquiries.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Notice" />
      <section className="bg-white py-16 sm:py-20">
        <Container className="prose-institutional space-y-4 text-muted">
          <p>
            Babobiz Global Institute of Value Systems ({siteConfig.shortName}) respects the
            privacy of individuals who contact the institute through this website.
          </p>
          <p>
            Information submitted through the contact form—such as your name, role, organization,
            email address, phone number, country, and message—is collected solely to respond to
            your enquiry and to manage related institutional correspondence.
          </p>
          <p>
            BGIVS does not sell personal information. Access to enquiry information is limited to
            authorized institutional use. A more detailed privacy policy may be published as
            institutional processes are formalized.
          </p>
          <p>
            For privacy-related questions, contact{" "}
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
