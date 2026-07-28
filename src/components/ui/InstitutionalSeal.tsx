import { BgivsSeal } from "@/components/brand/BgivsSeal";

type InstitutionalSealProps = {
  size?: "sm" | "md" | "lg" | "xl";
  framed?: boolean;
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: "h-16 w-16",
  md: "h-28 w-28",
  lg: "h-44 w-44 sm:h-52 sm:w-52",
  xl: "h-56 w-56 sm:h-72 sm:w-72",
};

/**
 * Framed display of the BGIVS institutional seal for formal contexts.
 * Prefer importing BgivsSeal directly when no frame/size helper is needed.
 */
export function InstitutionalSeal({
  size = "lg",
  framed = true,
  className = "",
  priority = false,
}: InstitutionalSealProps) {
  const image = (
    <BgivsSeal
      priority={priority}
      className={`object-contain ${sizes[size]} ${className}`}
      width={1024}
      height={1024}
    />
  );

  if (!framed) return image;

  return (
    <div className="inline-flex rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
      {image}
    </div>
  );
}
