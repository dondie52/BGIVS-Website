import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description:
    "Privacy notice for Babobiz Global Institute of Value Systems website enquiries and publication requests.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Notice" />
      <section className="bg-white py-16 sm:py-20">
        <Container className="prose-institutional max-w-3xl space-y-6 text-muted">
          <p>
            Babobiz Global Institute of Value Systems ({siteConfig.shortName}) respects the
            privacy of individuals who contact the institute through this website.
          </p>

          <div>
            <h2 className="mb-2 text-xl text-navy">What we collect</h2>
            <p>
              When you submit an enquiry or publication request, we may collect your name,
              position or role, organization and organization category, email address, phone
              number, country, programme or service of interest, publication preference,
              quantity, message content, and consent confirmation. Technical metadata such as
              the source page and referrer may also be recorded to help us understand how you
              reached the form.
            </p>
            <p className="mt-3">
              If you allow analytics, BGIVS may also collect page visits, a random visitor
              identifier, a session identifier, page title, referrer, UTM campaign fields,
              browser family, device type, operating system, language, timezone, screen size,
              and approximate country or region when supplied by the hosting provider. Raw IP
              addresses are not stored; they are converted into a one-way hash for grouping
              and abuse prevention.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl text-navy">Cookies and permission</h2>
            <p>
              The website asks for permission before analytics are recorded. If you accept,
              your browser stores a small consent value and random analytics identifiers so
              BGIVS can understand repeat visits and study interest. If you decline, analytics
              identifiers are not created for this site.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl text-navy">Why we collect it</h2>
            <p>
              This information is collected so that BGIVS can receive, acknowledge, and respond
              to institutional enquiries and publication requests, manage related correspondence,
              and maintain appropriate administrative records for the institute.
            </p>
            <p className="mt-3">
              Consented analytics are used to study public interest in BGIVS content, improve
              services and publications, understand enquiry pathways, measure campaign sources,
              and protect the website from misuse.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl text-navy">How we use it</h2>
            <p>
              Submitted information is used solely for institutional correspondence and
              administration. Access is limited to authorized BGIVS staff. We do not sell
              personal information. Notification emails may be sent to institute contacts and,
              where appropriate, a confirmation may be sent to the address you provide.
            </p>
            <p className="mt-3">
              Analytics reports are available only inside the protected BGIVS admin console.
              They are used in aggregate wherever possible for study and operational planning.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl text-navy">Retention</h2>
            <p>
              Enquiry and request records are retained for institutional administration.
              Automated deletion is not enabled at this time. A formal retention period will be
              confirmed once approved by BGIVS leadership. Until then, records remain available
              to authorized staff and may be updated or closed as part of normal case handling.
            </p>
            <p className="mt-3">
              Analytics records are retained for study and operational review until BGIVS
              approves a formal retention schedule. Visitors may clear their browser storage
              to remove the local consent and analytics identifiers on their device.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl text-navy">Contact for privacy matters</h2>
            <p>
              For privacy-related questions or requests, contact{" "}
              <a href={siteConfig.emailHref} className="font-semibold text-blue hover:underline">
                {siteConfig.email}
              </a>
              . A more detailed privacy policy may be published as institutional processes are
              formalized.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
