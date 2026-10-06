import { formatDayLabel, getCurrentEdition } from "@/lib/content";

/**
 * The preliminary two-day format from edition.format. High-level elements only —
 * no times, rooms, session titles, or speakers. Designed for navy surfaces.
 */
export function FormatDays({ surface = "ink-2" }: { surface?: "ink" | "ink-2" }) {
  const edition = getCurrentEdition();
  const bg = surface === "ink" ? "bg-ink" : "bg-ink-2";

  return (
    <div>
      <ol className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 md:grid-cols-2">
        {edition.format.map((day, i) => (
          <li key={day.date} className={`flex flex-col ${bg} p-7 md:p-10`}>
            <p className="type-label flex items-baseline justify-between text-bone/70">
              <span>{formatDayLabel(day.date)}</span>
              <span className="text-bone/60">Day {String(i + 1).padStart(2, "0")}</span>
            </p>
            <p className="type-expanded mt-6 font-display text-[clamp(2rem,1.1rem+2.4vw,3.25rem)] leading-none font-semibold uppercase">
              {day.theme}
            </p>
            <ul className="mt-8 border-t border-bone/12">
              {day.elements.map((element) => (
                <li key={element} className="flex items-center gap-3 border-b border-bone/12 py-3 text-[0.98rem] text-bone/85">
                  <span aria-hidden="true" className="size-1 rounded-full bg-highlight-300" />
                  {element}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm text-bone/60">
        Preliminary format. The detailed program — sessions, speakers, and times — will be announced to the mailing list.
      </p>
    </div>
  );
}
