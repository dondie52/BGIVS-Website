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
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <h2 style={{ fontSize: "clamp(2rem, 8vw, 2.75rem)" }} className="font-serif font-bold leading-tight !text-white">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
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
    <Link href={href} className="font-semibold text-blue transition-colors duration-150 hover:text-navy hover:underline">
      {children}
    </Link>
  );
}
