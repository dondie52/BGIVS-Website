import Image from "next/image";
import { images } from "@/lib/images";

type BgivsLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Official BGIVS shield-shaped logo.
 * Always uses the original, unedited shield logo, never the institutional seal.
 */
export function BgivsLogo({
  className = "h-auto w-full object-contain",
  priority = false,
  sizes,
  width = images.logo.width,
  height = images.logo.height,
}: BgivsLogoProps) {
  return (
    <Image
      src={images.logo.src}
      alt={images.logo.alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

