"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { KnowledgeResource } from "@/types";

type KnowledgeResourceCardProps = {
  resource: KnowledgeResource;
};

export function KnowledgeResourceCard({ resource }: KnowledgeResourceCardProps) {
  const actionClass =
    "mt-auto inline-flex items-center gap-2 rounded-md border border-navy/25 px-4 py-2 text-sm font-semibold text-navy transition hover:border-gold-dark hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-blue";

  return (
    <article className="institutional-card gold-accent-border flex h-full flex-col p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-navy text-white">
          <FileText aria-hidden="true" size={22} />
        </span>
        <p className="section-label">{resource.type}</p>
      </div>
      <h4 className="text-lg text-navy">{resource.title}</h4>
      <p className="mt-3 text-sm text-muted">{resource.description}</p>
      <div className="mt-6 flex">
        {resource.external ? (
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className={actionClass}
          >
            {resource.actionLabel}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        ) : (
          <Link href={resource.href} className={actionClass}>
            {resource.actionLabel}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}
