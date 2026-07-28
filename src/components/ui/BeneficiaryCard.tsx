import Link from "next/link";
import type { Beneficiary } from "@/types";

type BeneficiaryCardProps = {
  beneficiary: Beneficiary;
};

export function BeneficiaryCard({ beneficiary }: BeneficiaryCardProps) {
  return (
    <article className="institutional-card h-full p-6">
      <h3 className="text-lg text-navy">{beneficiary.name}</h3>
      <p className="mt-3 text-sm text-muted">{beneficiary.description}</p>
      <Link
        href={beneficiary.href}
        className="mt-5 inline-block text-sm font-semibold text-blue hover:text-navy hover:underline"
      >
        Explore related work
      </Link>
    </article>
  );
}
