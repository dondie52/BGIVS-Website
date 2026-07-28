import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CallToActionProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CallToAction({ title, description, primary, secondary }: CallToActionProps) {
  return (
    <section className="navy-gradient">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-white/85 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primary.href} variant="primary">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="gold-outline">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-blue hover:text-navy hover:underline">
      {children}
    </Link>
  );
}
