import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type Tone = "paper" | "ink";
/** Section surfaces: the two tones plus a raised navy for alternating dark sections. */
export type SectionTone = Tone | "ink-2";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: SectionTone;
  /** Vertical rhythm. */
  spacing?: "default" | "compact" | "none";
}

const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-graphite",
  ink: "bg-ink text-bone",
  "ink-2": "bg-ink-2 text-bone",
};

const spacings = {
  default: "py-24 md:py-36",
  compact: "py-16 md:py-24",
  none: "",
};

/** A full-width band with a tone (light paper or dark navy). Page rhythm is built from these. */
export function Section({ tone = "paper", spacing = "default", className, ...props }: SectionProps) {
  return <section data-tone={tone} className={cn(tones[tone], spacings[spacing], className)} {...props} />;
}
