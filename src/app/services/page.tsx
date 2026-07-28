import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { services } from "@/content/services";
import { partnerCta } from "@/content/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "BGIVS services include institutional research, governance consulting, institutional assessment, leadership training, corporate value alignment, sustainability advisory, publishing, and SME capacity building.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Institutional Services"
        description="BGIVS provides research, consulting, assessment, training, publishing, and capacity-building services that support responsible, value-driven institutional development. Outcomes depend on each institution’s context and engagement."
      />
      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <ResponsiveGrid columns={2}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>
      <CallToAction
        title="Request a Service Engagement"
        description="Share your institutional context and the service area you wish to explore."
        primary={{ label: "Contact the Institute", href: "/contact" }}
        secondary={{ label: partnerCta.label, href: partnerCta.href }}
      />
    </>
  );
}
