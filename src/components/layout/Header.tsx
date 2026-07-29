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
        <Link href="/" className="navbar-brand">
          <span className="navbar-logo-frame" aria-hidden="true">
            <BgivsLogo
              priority
              className="navbar-logo"
              sizes="(max-width: 768px) 59px, 72px"
            />
          </span>
          <span className="navbar-title">
            {siteConfig.name}{" "}
            <strong>({siteConfig.shortName})</strong>
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
