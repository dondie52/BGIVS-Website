import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CallToAction } from "@/components/ui/CallToAction";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "BGIVS Organogram | Institutional Documents",
  description:
    "The governance, executive, functional and support structure of the Babobiz Global Institute of Value Systems.",
  path: "/knowledge/institutional-documents/bgivs-organogram",
});

const coreUnits = [
  {
    name: "Research & Innovation Unit",
    roles: [
      "Head of Research & Innovation",
      "Research Analysts",
      "Policy Analysts",
      "Data & Diagnostics Specialists",
    ],
  },
  {
    name: "Training & Capacity Building Unit",
    roles: [
      "Head of Training",
      "Trainers / Facilitators",
      "Curriculum Developers",
      "Program Coordinators",
    ],
  },
  {
    name: "Publishing & Communications Unit",
    roles: [
      "Head of Publishing & Communications",
      "Editors & Content Developers",
      "Graphic Designers",
      "Media & Digital Communications Officers",
    ],
  },
  {
    name: "Administration & Finance Unit",
    roles: [
      "Head of Administration & Finance",
      "Finance Officer / Accountant",
      "Human Resources Officer",
      "Procurement & Logistics Officer",
      "Administrative Assistants",
    ],
  },
];

const supportServices = [
  {
    name: "Facilities & Maintenance",
    roles: ["Cleaners / Janitorial Staff", "Grounds Maintenance Personnel"],
  },
  {
    name: "Security Services",
    roles: ["Security Supervisor", "Security Guards"],
  },
];

function ArrowConnector() {
  return <div aria-hidden="true" className="mx-auto h-9 w-px bg-gold" />;
}

export default function OrganogramPage() {
  return (
    <>
      <PageHero
        label="Institutional Document"
        title="Babobiz Global Institute of Value Systems (BGIVS) - Organogram"
        description="The governance, executive, functional and support structure of the Babobiz Global Institute of Value Systems."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Knowledge", href: "/research#resources" },
              { label: "Institutional Documents", href: "/research#institutional-guides" },
              { label: "BGIVS Organogram" },
            ]}
          />

          <div className="mt-10" aria-label="BGIVS organisational hierarchy">
            <div className="mx-auto max-w-xl rounded-lg border border-navy bg-navy p-6 text-center text-white">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-light-gold">
                BD
              </span>
              <h2 className="text-2xl !text-white">Board of Directors</h2>
              <p className="mt-2 text-sm text-white/80">
                Strategic direction, policy oversight, and institutional accountability.
              </p>
            </div>

            <ArrowConnector />

            <div className="mx-auto max-w-xl rounded-lg border border-blue bg-blue p-6 text-center text-white">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-light-gold">
                ED
              </span>
              <h2 className="text-2xl !text-white">Executive Director</h2>
              <p className="mt-2 text-sm text-white/80">
                Overall leadership, strategy implementation, and institutional performance.
              </p>
            </div>

            <ArrowConnector />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {coreUnits.map((unit) => (
                <article key={unit.name} className="institutional-card h-full p-5">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-gold/10 text-sm font-bold text-gold">
                    Unit
                  </span>
                  <h3 className="text-lg text-navy">{unit.name}</h3>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                    {unit.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <ArrowConnector />

            <div className="mx-auto max-w-3xl rounded-lg border border-gold bg-off-white p-5 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-gold/10 text-sm font-bold text-gold">
                SS
              </span>
              <h2 className="text-xl text-navy">
                Support Services Through Administration & Finance
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {supportServices.map((service) => (
                <article key={service.name} className="institutional-card p-5">
                  <h3 className="text-lg text-navy">{service.name}</h3>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                    {service.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <section className="institutional-card p-6">
              <h2 className="text-2xl text-navy">Top Governance Level</h2>
              <h3 className="mt-5 text-lg text-navy">Board of Directors</h3>
              <p className="mt-2 text-muted">Provides:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>Strategic direction</li>
                <li>Policy oversight</li>
                <li>Institutional accountability</li>
              </ul>
            </section>

            <section className="institutional-card p-6">
              <h2 className="text-2xl text-navy">Executive Level</h2>
              <h3 className="mt-5 text-lg text-navy">Executive Director (ED)</h3>
              <p className="mt-2 text-muted">Responsible for:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                <li>Overall leadership</li>
                <li>Strategy implementation</li>
                <li>Institutional performance</li>
              </ul>
            </section>

            <section className="institutional-card p-6 lg:col-span-2">
              <h2 className="text-2xl text-navy">Core Functional Units</h2>
              <p className="mt-2 text-muted">
                All core functional units report to the Executive Director.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {coreUnits.map((unit) => (
                  <div key={unit.name}>
                    <h3 className="text-lg text-navy">{unit.name}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                      {unit.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="institutional-card p-6 lg:col-span-2">
              <h2 className="text-2xl text-navy">Support Services</h2>
              <p className="mt-2 text-muted">
                These services report through the Administration & Finance Unit.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {supportServices.map((service) => (
                  <div key={service.name}>
                    <h3 className="text-lg text-navy">{service.name}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                      {service.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </section>

      <CallToAction
        title="Explore BGIVS Knowledge Resources"
        description="Return to Knowledge Categories for institutional documents, papers, books, and frameworks."
        primary={{ label: "View Knowledge Categories", href: "/research#resources" }}
        secondary={{ label: "Contact BGIVS", href: "/contact" }}
      />
    </>
  );
}
