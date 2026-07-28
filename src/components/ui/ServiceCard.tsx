import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      id={service.id}
      className="institutional-card scroll-mt-28 flex h-full flex-col p-6"
    >
      <h3 className="text-xl text-navy">{service.title}</h3>
      <p className="mt-3 text-sm text-muted">{service.description}</p>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <h4 className="font-semibold text-navy">Who it is for</h4>
          <p className="mt-1 text-muted">{service.whoFor}</p>
        </div>
        <div>
          <h4 className="font-semibold text-navy">Main areas covered</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            {service.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-navy">Expected institutional value</h4>
          <p className="mt-1 text-muted">{service.institutionalValue}</p>
        </div>
      </div>
      <div className="mt-6">
        <Button
          href={`/contact?interest=${encodeURIComponent(service.id)}`}
          variant="outline"
        >
          Request This Service
        </Button>
      </div>
    </article>
  );
}
