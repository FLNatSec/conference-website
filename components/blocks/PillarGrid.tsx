import { cn } from "@/lib/cn";
import type { Pillar } from "@/lib/types";

/** Pillars (e.g., why partner) on a navy surface. `numbered` restores the 01/02 labels. */
export function PillarGrid({ pillars, numbered = false }: { pillars: Pillar[]; numbered?: boolean }) {
  return (
    <ol className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar, i) => (
        <li key={pillar.title} className="flex flex-col bg-ink-2 p-7 md:p-8">
          {numbered && <p className="type-label text-bone/60">{String(i + 1).padStart(2, "0")}</p>}
          <h3
            className={cn(
              "type-expanded font-display text-[1.55rem] leading-none font-semibold uppercase",
              numbered && "mt-10 md:mt-16",
            )}
          >
            {pillar.title}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-bone/75">{pillar.body}</p>
        </li>
      ))}
    </ol>
  );
}
