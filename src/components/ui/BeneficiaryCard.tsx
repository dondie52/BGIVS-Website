import Link from "next/link";
import type { Beneficiary } from "@/types";

type BeneficiaryCardProps = {
  beneficiary: Beneficiary;
  compact?: boolean;
};

export function BeneficiaryCard({
  beneficiary,
  compact = false,
}: BeneficiaryCardProps) {
  return (
    <article className={`institutional-card h-full ${compact ? "p-5" : "p-6"}`}>
      <h3 className="text-lg text-navy">{beneficiary.name}</h3>
      <p className={`mt-2 text-sm text-muted ${compact ? "line-clamp-2" : ""}`}>
        {beneficiary.description}
      </p>
      <Link
        href={beneficiary.href}
        className="mt-4 inline-block text-sm font-semibold text-blue hover:text-navy hover:underline"
      >
        Explore related work
      </Link>
    </article>
  );
}
