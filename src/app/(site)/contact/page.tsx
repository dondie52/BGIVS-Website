import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Babobiz Global Institute of Value Systems for research collaboration, consulting, training, publishing, and partnership enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Contact the Institute"
        description="Partner with BGIVS for research, training, consulting, publishing, governance reform, or sustainable institutional development."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading title="Contact Details" />
              <div className="mt-6 space-y-4 text-sm text-muted">
                <p>
                  <span className="block font-semibold text-navy">Email</span>
                  <a href={siteConfig.emailHref} className="text-blue hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  <span className="block font-semibold text-navy">Phone</span>
                  <a href={siteConfig.phoneHref} className="text-blue hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="block font-semibold text-navy">Location</span>
                  {siteConfig.location}
                </p>
              </div>
              <p className="mt-8 max-w-md text-sm text-muted">
                Please use the form to share your enquiry. This initial form uses a demo
                submission handler and can later be connected to an email service, API route,
                database, or CRM.
              </p>
            </div>

            <div className="institutional-card p-6 sm:p-8">
              <h2 className="text-2xl text-navy">Enquiry Form</h2>
              <p className="mt-2 text-sm text-muted">
                Fields marked with <span className="text-red-700">*</span> are required.
              </p>
              <div className="relative mt-6">
                <Suspense
                  fallback={
                    <div className="rounded-md border border-border bg-off-white px-4 py-3 text-sm text-muted">
                      Loading form…
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
