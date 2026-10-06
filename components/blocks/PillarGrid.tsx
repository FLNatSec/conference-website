import type { Pillar } from "@/lib/types";

/** Numbered pillars (e.g., the summit experience) on a navy surface. */
export function PillarGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <ol className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar, i) => (
        <li key={pillar.title} className="flex flex-col bg-ink-2 p-7 md:p-8">
          <p className="type-label text-bone/60">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="type-expanded mt-10 font-display text-[1.55rem] leading-none font-semibold uppercase md:mt-16">
            {pillar.title}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-bone/75">{pillar.body}</p>
        </li>
      ))}
    </ol>
  );
}
