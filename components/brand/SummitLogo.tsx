import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

interface SummitLogoProps {
  /** Width classes; defaults to the page-hero size. */
  className?: string;
  /** Rendered width for the image srcset; defaults to the page-hero size. */
  sizes?: string;
  /** Empty alt when a nearby label already names the summit (e.g. the header wordmark). */
  decorative?: boolean;
}

/**
 * The full summit emblem (organizer-provided, public/brand/summit-logo.png).
 * This is the dark-background version, with its flat background removed so it sits on ink.
 */
export function SummitLogo({
  className = "w-76 md:w-96 lg:w-128",
  sizes = "(min-width: 1024px) 512px, (min-width: 768px) 384px, 304px",
  decorative = false,
}: SummitLogoProps) {
  return (
    <Image
      src="/brand/summit-logo.png"
      alt={decorative ? "" : `${site.name} logo`}
      width={1100}
      height={860}
      sizes={sizes}
      className={cn("h-auto max-w-full shrink-0", className)}
    />
  );
}
