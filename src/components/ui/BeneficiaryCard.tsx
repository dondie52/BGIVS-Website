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
    <article className={`institutional-card h-full ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
      <h3 className="font-serif font-bold text-base sm:text-lg text-navy">{beneficiary.name}</h3>
      <p className={`mt-2 text-sm text-muted ${compact ? "line-clamp-2" : ""}`}>
        {beneficiary.description}
      </p>
      <Link
        href={beneficiary.href}
        className="mt-4 inline-block text-sm font-semibold text-blue transition-colors duration-150 hover:text-navy hover:underline"
      >
        Explore work with {beneficiary.name.split(" ")[0]}
      </Link>
    </article>
  );
}
