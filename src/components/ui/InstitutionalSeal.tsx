import Image from "next/image";
import { images } from "@/lib/images";

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

export function InstitutionalSeal({
  size = "lg",
  framed = true,
  className = "",
  priority = false,
}: InstitutionalSealProps) {
  const image = (
    <Image
      src={images.seal.src}
      alt={images.seal.alt}
      width={images.seal.width}
      height={images.seal.height}
      priority={priority}
      className={`object-contain ${sizes[size]} ${className}`}
    />
  );

  if (!framed) return image;

  return (
    <div className="inline-flex rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
      {image}
    </div>
  );
}
