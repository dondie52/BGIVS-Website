import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FrameworkDiagram } from "@/components/diagrams/FrameworkDiagram";
import { DisclosureFlowDiagram } from "@/components/diagrams/DisclosureFlowDiagram";
import { MetricsToMeaningDiagram } from "@/components/diagrams/MetricsToMeaningDiagram";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { CallToAction } from "@/components/ui/CallToAction";
import { Button } from "@/components/ui/Button";
import {
  frameworkApplications,
  frameworkIntro,
  frameworkMethods,
} from "@/content/framework";
import { publications } from "@/content/publications";
import { images } from "@/lib/images";
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
        imageSrc={images.sectionResearch.src}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_220px]">
            <div>
              <SectionHeading title="Framework Introduction" />
              <p className="mt-4 max-w-3xl text-muted">{frameworkIntro.explanation}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-off-white p-5">
                  <h3 className="text-lg text-navy">BVSDQ</h3>
                  <p className="mt-2 text-sm text-muted">{frameworkIntro.bvsdqFull}</p>
                </div>
                <div className="rounded-xl border border-border bg-off-white p-5">
                  <h3 className="text-lg text-navy">CSRDQ</h3>
                  <p className="mt-2 text-sm text-muted">{frameworkIntro.csrdqFull}</p>
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
            description="Institutions often optimize short-term metrics while underweighting governance integrity, responsibility, and sustainability."
            className="mb-8"
          />
          <MetricsToMeaningDiagram />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="How the Framework Connects"
            description="BVSDQ and CSRDQ combine into integrated institutional value."
            className="mb-10"
          />
          <FrameworkDiagram />
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="From Disclosure to Transformation"
            description="Disclosure quality should reflect real institutional values, governance, performance, responsibility, and impact."
            className="mb-10"
          />
          <DisclosureFlowDiagram />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-lg text-navy">Methods and tools</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {frameworkMethods.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-off-white px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-lg text-navy">Practical applications</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {frameworkApplications.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-off-white px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Publication Connection"
            description="The framework is documented through BGIVS publications and institutional work."
            className="mb-8"
          />
          <div className="flex flex-wrap gap-3">
            {publications.map((pub) => (
              <Button key={pub.slug} href={`/research/${pub.slug}`} variant="outline">
                View {pub.title}
              </Button>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-border bg-off-white p-5 text-sm text-muted">
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
