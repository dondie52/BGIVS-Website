import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { footerNav } from "@/content/navigation";
import { FooterAccordion } from "@/components/layout/FooterAccordion";
import { getPublishedProgrammes } from "@/lib/content/programmes";
import { getPublishedPublications } from "@/lib/content/publications";
import { getPublicSiteSettings } from "@/lib/content/settings";

export async function Footer() {
  const year = new Date().getFullYear();
  const [programmes, publications, settings] = await Promise.all([
    getPublishedProgrammes(),
    getPublishedPublications(),
    getPublicSiteSettings(),
  ]);

  const email = settings.contact_email || siteConfig.email;
  const phone = settings.contact_phone || siteConfig.phoneDisplay;
  const location = settings.location || siteConfig.location;
  const name = settings.site_name || siteConfig.name;
  const tagline = settings.tagline || siteConfig.tagline;
  const emailHref = `mailto:${email}`;
  const firstPhone = phone.match(/(?:\+?267)?\s*\d{2}\s*\d{3}\s*\d{3}|\d{8}/)?.[0];
  const phoneDigits = firstPhone?.replace(/\D/g, "") ?? "";
  const phoneHref = phoneDigits
    ? `tel:+${phoneDigits.startsWith("267") ? phoneDigits : `267${phoneDigits}`}`
    : siteConfig.phoneHref;

  return (
    <footer className="bg-deep-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile Accordion Layout */}
        <div className="lg:hidden">
          <div className="mb-6 border-b border-white/10 pb-6">
            <Image
              src="/images/bgivs-company-seal.jpeg"
              alt="BGIVS company seal"
              width={80}
              height={80}
              sizes="80px"
              className="h-[80px] w-[80px] object-cover object-center"
            />
            <h2 className="mt-4 font-serif text-lg font-bold !text-white">{name}</h2>
            <p className="mt-1 text-xs font-medium text-light-gold">{tagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-white/80">
              A research, training, consulting, and publishing institution advancing integrated
              value systems for sustainable organizational and societal development.
            </p>
          </div>

          <FooterAccordion title="Navigate">
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-150 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title="Programmes">
            <ul className="space-y-2">
              {programmes.slice(0, 4).map((programme) => (
                <li key={programme.id}>
                  <Link
                    href={`/programmes#${programme.id}`}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {programme.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title="Publications">
            <ul className="space-y-2">
              {publications.map((pub) => (
                <li key={pub.slug}>
                  <Link
                    href={`/research/${pub.slug}`}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {pub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title="Contact">
            <div className="space-y-2">
              <p>
                <a href={emailHref} className="transition-colors duration-150 hover:text-white hover:underline">
                  {email}
                </a>
              </p>
              <p>
                <a href={phoneHref} className="transition-colors duration-150 hover:text-white hover:underline">
                  {phone}
                </a>
              </p>
              <p className="text-xs">{location}</p>
            </div>
          </FooterAccordion>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 lg:grid">
          <div>
            <Image
              src="/images/bgivs-company-seal.jpeg"
              alt="BGIVS company seal"
              width={110}
              height={110}
              sizes="110px"
              className="h-[110px] w-[110px] object-cover object-center"
            />
            <h2 className="mt-5 font-serif text-xl font-bold !text-white">{name}</h2>
            <p className="mt-2 text-sm font-medium text-light-gold">{tagline}</p>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              A research, training, consulting, and publishing institution advancing integrated
              value systems for sustainable organizational and societal development.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-gold">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-150 hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-gold">
              Programmes
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {programmes.slice(0, 6).map((programme) => (
                <li key={programme.id}>
                  <Link
                    href={`/programmes#${programme.id}`}
                    className="transition-colors duration-150 hover:text-white hover:underline"
                  >
                    {programme.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-gold">
              Publications & Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {publications.map((pub) => (
                <li key={pub.slug}>
                  <Link
                    href={`/research/${pub.slug}`}
                    className="transition-colors duration-150 hover:text-white hover:underline"
                  >
                    {pub.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-1 text-sm text-white/80">
              <p>
                <a href={emailHref} className="transition-colors duration-150 hover:text-white hover:underline">
                  {email}
                </a>
              </p>
              <p>
                <a href={phoneHref} className="transition-colors duration-150 hover:text-white hover:underline">
                  {phone}
                </a>
              </p>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors duration-150 hover:text-white hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-150 hover:text-white hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
