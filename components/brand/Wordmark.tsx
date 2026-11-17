import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Mark } from "./Mark";
import { SummitLogo } from "./SummitLogo";

/*
 * PROVISIONAL logo lockups: the Florida mark plus the name in the display face.
 *   horizontal: summit emblem + two-line name (header, mobile menu)
 *   stacked:    mark above a three-line name (footer, posters)
 */

type WordmarkVariant = "horizontal" | "stacked";

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
}

export function Wordmark({ variant = "horizontal", className }: WordmarkProps) {
  const [florida, national, security, summit] = site.name.toUpperCase().split(" ");

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-start gap-4", className)}>
        <Mark className="size-14" />
        <span className="type-expanded font-display text-[1.35rem] leading-[1.02] font-semibold tracking-[0.02em]">
          {florida}
          <br />
          {national} {security}
          <br />
          {summit}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SummitLogo className="w-14" sizes="56px" decorative />
      <span className="type-expanded font-display text-[0.74rem] leading-[1.15] font-semibold tracking-[0.06em]">
        {florida} {national}
        <br />
        {security} {summit}
      </span>
    </span>
  );
}
