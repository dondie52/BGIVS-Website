"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FooterAccordionProps = {
  title: string;
  children: React.ReactNode;
};

export function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-light-gold hover:text-white"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="pb-4 text-sm text-white/80">{children}</div>}
    </div>
  );
}
