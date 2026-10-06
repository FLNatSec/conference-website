import { cn } from "@/lib/cn";

interface SectionLabelProps {
  /** Deprecated: section numbers are no longer shown. */
  index?: string;
  title: string;
  /** Deprecated: annotations are no longer shown. */
  meta?: string;
  className?: string;
}

/** Small section heading (eyebrow), e.g. "Florida today". */
export function SectionLabel({ title, className }: SectionLabelProps) {
  return (
    <p className={cn("font-display text-[0.9rem] font-semibold tracking-[0.14em] uppercase", className)}>{title}</p>
  );
}
