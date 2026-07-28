import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({
  label,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="navy-gradient relative overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(243,201,79,0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(8,117,184,0.35), transparent 40%)",
        }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {label ? <p className="section-label mb-4 text-light-gold">{label}</p> : null}
        <h1 className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-[3.25rem]">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-3xl text-lg font-medium text-light-gold sm:text-xl">
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p className="mt-5 max-w-3xl text-base text-white/85 sm:text-lg">{description}</p>
        ) : null}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta ? (
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="gold-outline">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        )}
        <nav aria-label="Breadcrumb" className="mt-10 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}
