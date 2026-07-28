"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavGroup } from "@/types";

type DesktopNavigationProps = {
  groups: NavGroup[];
  links: { label: string; href: string }[];
};

export function DesktopNavigation({ groups, links }: DesktopNavigationProps) {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
      {groups.map((group) => (
        <NavDropdown key={group.label} group={group} />
      ))}
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {group.label}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-lg border border-border bg-white py-2 shadow-lg"
        >
          {group.items.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                className="block px-4 py-2.5 text-sm text-navy hover:bg-off-white"
                onClick={() => setOpen(false)}
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
