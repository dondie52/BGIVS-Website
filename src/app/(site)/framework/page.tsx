import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FrameworkDiagram } from "@/components/diagrams/FrameworkDiagram";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { CallToAction } from "@/components/ui/CallToAction";
import { Button } from "@/components/ui/Button";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import {
  frameworkApplications,
  frameworkAreas,
  frameworkIntro,
  frameworkMethods,
} from "@/content/framework";
import { institutionalChallenges } from "@/content/outcomes";
import { publications } from "@/content/publications";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "BVSDQ–CSRDQ Framework",
  description:
    "Explore the BVSDQ–CSRDQ Framework—Business Value System Disclosure Quality and Corporate Social Responsibility Disclosure Quality—as a strategic tool for institutional transformation.",
  path: "/framework",
});

export default function FrameworkPage() {
  return (
    <>
      <PageHero
        label="Our Framework"
        title={frameworkIntro.title}
        subtitle={frameworkIntro.subtitle}
        description={frameworkIntro.summary}
        primaryCta={{ label: "Request Institutional Consulting", href: "/contact?interest=institutional-consulting" }}
        secondaryCta={{ label: "Explore Publications", href: "/research" }}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_220px]">
            <div>
              <SectionHeading title="Framework Introduction" />
              <p className="mt-4 max-w-3xl text-muted">{frameworkIntro.explanation}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-off-white p-5">
                  <h3 className="text-lg text-navy sm:text-xl">
                    {frameworkIntro.bvsdqFull} (BVSDQ)
                  </h3>
                  <p className="mt-2 text-sm text-muted">Internal institutional value systems</p>
                </div>
                <div className="rounded-xl border border-border bg-off-white p-5">
                  <h3 className="text-lg text-navy sm:text-xl">
                    {frameworkIntro.csrdqFull} (CSRDQ)
                  </h3>
                  <p className="mt-2 text-sm text-muted">External institutional responsibility</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <InstitutionalSeal size="lg" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="The Institutional Problem"
            description="Modern institutions often prioritize short-term metrics such as profit, output, and efficiency, while neglecting deeper value systems including governance integrity, social responsibility, and sustainability."
            className="mb-8"
          />
          <ResponsiveGrid columns={2}>
            {institutionalChallenges.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted">
                {item}
              </div>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Framework Diagram" className="mb-10" />
          <FrameworkDiagram />
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Three Connected Areas" className="mb-10" />
          <ResponsiveGrid columns={3}>
            {frameworkAreas.map((area) => (
              <article key={area.id} className="institutional-card gold-accent-border p-6">
                <h3 className="text-xl text-navy sm:text-2xl">{area.title}</h3>
                <p className="mt-2 text-sm font-medium text-blue">{area.subtitle}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted">
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="From Disclosure to Institutional Transformation"
            description="Disclosure quality should reflect the strength, consistency, transparency, and credibility of actual institutional values, governance, performance, responsibility, and impact."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg text-navy">Strategic importance</h3>
              <p className="mt-3 text-sm text-muted">
                The framework helps institutions connect internal value systems with external
                responsibility, supporting credibility, legitimacy, stakeholder trust, and
                sustainable performance.
              </p>
              <h3 className="mt-8 text-lg text-navy">Methods and tools</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {frameworkMethods.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-navy">Practical applications</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {frameworkApplications.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-off-white px-3 py-2 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Publication Connection"
            description="The framework is documented and developed through BGIVS publications and related institutional work."
            className="mb-8"
          />
          <div className="flex flex-wrap gap-3">
            {publications.map((pub) => (
              <Button key={pub.slug} href={`/research/${pub.slug}`} variant="outline">
                View {pub.title}
              </Button>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-border bg-white p-5 text-sm text-muted">
            <strong className="text-navy">Disclaimer: </strong>
            {frameworkIntro.disclaimer}
          </p>
        </Container>
      </section>

      <CallToAction
        title="Apply the Framework in Your Institution"
        description="Enquire about consulting, training, research collaboration, or publication-based engagement with the BVSDQ–CSRDQ Framework."
        primary={{
          label: "Request Institutional Consulting",
          href: "/contact?interest=institutional-consulting",
        }}
        secondary={{ label: "Contact the Institute", href: "/contact" }}
      />
    </>
  );
}
