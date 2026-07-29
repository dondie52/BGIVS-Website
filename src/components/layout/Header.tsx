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
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BgivsLogo
            priority
            width={58}
            height={68}
            className="h-[52px] w-[44px] shrink-0 object-contain sm:h-[68px] sm:w-[58px]"
            sizes="58px"
          />
          <span className="min-w-0">
            <span className="block font-serif text-xs font-semibold leading-snug tracking-wide sm:text-sm lg:text-base">
              {siteConfig.name}{" "}
              <span className="text-light-gold">({siteConfig.shortName})</span>
            </span>
            <span className="mt-0.5 hidden truncate text-xs text-white/70 lg:block">
              {siteConfig.tagline}
            </span>
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
