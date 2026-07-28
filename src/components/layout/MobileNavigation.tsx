"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { partnerCta, primaryNav } from "@/content/navigation";
import type { NavGroup } from "@/types";

type MobileNavigationProps = {
  groups: NavGroup[];
  links: { label: string; href: string }[];
};

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function MobileNavigation({ groups }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menu =
    open && isClient
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-deep-navy/60"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <div
              id={panelId}
              className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4">
                <p className="font-serif text-lg font-semibold text-navy">Menu</p>
                <button
                  type="button"
                  className="rounded-md p-2 text-navy hover:bg-off-white"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              >
                <ul className="mb-4 space-y-1">
                  {primaryNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-3 py-2.5 text-sm font-medium text-navy hover:bg-off-white"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Explore by theme
                </p>
                {groups.map((group) => (
                  <MobileGroup
                    key={group.label}
                    group={group}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </nav>
              <div className="shrink-0 border-t border-border p-4">
                <Button
                  href={partnerCta.href}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {partnerCta.label}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white hover:bg-white/10"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {menu}
    </div>
  );
}

function MobileGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-border py-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-navy hover:bg-off-white"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {group.label}
        <ChevronDown
          className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded ? (
        <ul id={id} className="mb-2 space-y-1 pl-2">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-off-white hover:text-navy"
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
