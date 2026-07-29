import Link from "next/link";
import { BgivsLogo } from "@/components/brand/BgivsLogo";
import { Button } from "@/components/ui/Button";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { siteConfig } from "@/content/site";
import { navGroups, partnerCta } from "@/content/navigation";

const desktopExtraLinks = [
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
          <BgivsLogo
            priority
            className="site-logo h-[60px] w-auto shrink-0 object-contain lg:h-[76px]"
            sizes="(max-width: 640px) 60px, 76px"
          />
          <span className="min-w-0 whitespace-normal font-serif text-xs font-semibold leading-snug tracking-wide sm:text-sm lg:text-base">
            {siteConfig.name}{" "}
            <span className="text-light-gold">({siteConfig.shortName})</span>
          </span>
        </Link>

        <DesktopNavigation groups={navGroups} links={desktopExtraLinks} />

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button href={partnerCta.href} variant="primary" className="text-xs sm:text-sm">
              {partnerCta.label}
            </Button>
          </div>
          <MobileNavigation groups={navGroups} links={desktopExtraLinks} />
        </div>
      </div>
    </header>
  );
}
