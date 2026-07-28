import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GovernanceUnitCard } from "@/components/ui/GovernanceUnitCard";
import { GovernanceStructureDiagram } from "@/components/diagrams/GovernanceStructureDiagram";
import { InstitutionalSeal } from "@/components/ui/InstitutionalSeal";
import { CallToAction } from "@/components/ui/CallToAction";
import { ResponsiveGrid } from "@/components/ui/ResponsiveGrid";
import { governancePhilosophy, governanceUnits } from "@/content/governance";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Governance",
  description:
    "Learn about BGIVS governance and institutional structure, including the Board of Directors, Executive Director, and institutional units.",
  path: "/governance",
});

export default function GovernancePage() {
  return (
    <>
      <PageHero
        label="Governance"
        title="Governance and Institutional Structure"
        description="BGIVS is guided by responsible oversight, ethical leadership, and clear institutional roles that support research, training, consulting, and publishing."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_220px]">
            <div>
              <SectionHeading title="Governance Philosophy" />
              <p className="mt-4 max-w-3xl text-muted">{governancePhilosophy}</p>
              <p className="mt-4 max-w-3xl text-muted">
                Official names, biographies, and photographs for board members, executives, and
                staff will be published when formally approved.
              </p>
            </div>
            <div className="flex justify-center">
              <InstitutionalSeal size="lg" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Organizational Structure" className="mb-10" />
          <GovernanceStructureDiagram />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Leadership and Institutional Units"
            description="Professional position placeholders until official names, biographies, and photographs are provided."
            className="mb-10"
          />
          <ResponsiveGrid columns={2}>
            {governanceUnits.map((unit) => (
              <GovernanceUnitCard key={unit.id} unit={unit} />
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      <section className="bg-off-white py-16 sm:py-20">
        <Container>
          <SectionHeading title="Accountability and Oversight" />
          <p className="mt-4 max-w-3xl text-muted">
            The Board of Directors provides strategic oversight and stewardship. The Executive
            Director leads operational implementation. Institutional units deliver research,
            training, publishing, communications, administration, and finance in support of the
            institute’s mandate.
          </p>
        </Container>
      </section>

      <CallToAction
        title="Governance Enquiry"
        description="Contact BGIVS for governance-related collaboration, institutional partnerships, or formal correspondence."
        primary={{ label: "Contact the Institute", href: "/contact" }}
        secondary={{ label: "About BGIVS", href: "/about" }}
      />
    </>
  );
}
