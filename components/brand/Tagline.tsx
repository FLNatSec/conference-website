import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** The (provisional) tagline from content/site.ts, in the editorial serif. */
export function Tagline({ className }: { className?: string }) {
  return <p className={cn("font-serif italic", className)}>{site.tagline}</p>;
}
