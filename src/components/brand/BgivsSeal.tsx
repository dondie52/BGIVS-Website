import Image from "next/image";
import { images } from "@/lib/images";

type BgivsSealProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Official BGIVS circular institutional seal.
 * Always uses /images/bgivs-institutional-seal.png — never the shield logo.
 * Use only in formal seal contexts (About, Governance, certificates, etc.).
 */
export function BgivsSeal({
  className = "h-auto w-full object-contain",
  priority = false,
  sizes,
  width = images.seal.width,
  height = images.seal.height,
}: BgivsSealProps) {
  return (
    <Image
      src={images.seal.src}
      alt={images.seal.alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
