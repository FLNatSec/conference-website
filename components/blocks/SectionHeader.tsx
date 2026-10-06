import type { ReactNode } from "react";
import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Deprecated: section numbers are no longer shown. */
  index?: string;
  /** Short section heading shown above the title, e.g. "Florida today". */
  label: string;
  /** Deprecated: annotations are no longer shown. */
  meta?: string;
  heading: ReactNode;
  lede?: ReactNode;
  /** Surface the header sits on (sets muted text colors). */
  tone?: "ink" | "paper";
  /** Heading level — h2 by default. */
  as?: "h1" | "h2";
  className?: string;
}

/**
 * The recurring section opening: a drawn hairline, a short section heading,
 * the title, and an optional lede. Use inside <Reveal> for the rule draw-in.
 */
export function SectionHeader({ label, heading, lede, tone = "ink", as = "h2", className }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={className}>
      <Rule draw className="mb-8 md:mb-10" />
      <SectionLabel title={label} className={tone === "ink" ? "text-highlight-300" : "text-highlight-700"} />
      <Heading className="mt-4 max-w-[24ch] font-display text-display-m font-medium tracking-[-0.02em]">{heading}</Heading>
      {lede && (
        <div className={cn("mt-6 max-w-[62ch] text-lede", tone === "ink" ? "text-bone/75" : "text-graphite/80")}>{lede}</div>
      )}
    </div>
  );
}
