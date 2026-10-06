import { cn } from "@/lib/cn";

/**
 * Hairline rule — the system's main structural device.
 * `draw` animates it in when inside a <Reveal> (CSS in globals.css).
 */
export function Rule({ draw = false, className }: { draw?: boolean; className?: string }) {
  return <hr className={cn("h-px border-0 bg-current opacity-20", draw && "reveal-rule", className)} />;
}
