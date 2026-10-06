import { lanes } from "@/content/summit";
import { cn } from "@/lib/cn";

/**
 * The five lanes of conversation, as horizontal bands. Topics are indicative
 * of the conversation — never presented as finalized sessions.
 */
export function LaneList({ tone = "ink", compact = false }: { tone?: "ink" | "paper"; compact?: boolean }) {
  const line = tone === "ink" ? "border-bone/12" : "border-graphite/15";
  const muted = tone === "ink" ? "text-bone/70" : "text-graphite/70";

  return (
    <ol className={cn("border-t", line)}>
      {lanes.map((lane, i) => (
        <li
          key={lane.title}
          className={cn(
            "grid gap-3 border-b py-6 transition-colors duration-200 md:grid-cols-12 md:items-baseline md:gap-8",
            compact ? "md:py-6" : "md:py-9",
            line,
            tone === "ink" ? "hover:bg-bone/[0.03]" : "hover:bg-graphite/[0.03]",
          )}
        >
          <p className={cn("type-label md:col-span-1", muted)}>{String(i + 1).padStart(2, "0")}</p>
          <h3
            className={cn(
              "type-expanded font-display font-semibold uppercase md:col-span-4",
              compact ? "text-[1.6rem] leading-none md:text-[1.9rem]" : "text-[1.9rem] leading-none md:text-[2.4rem]",
            )}
          >
            {lane.title}
          </h3>
          <ul className={cn("flex flex-wrap gap-x-5 gap-y-1.5 text-[0.98rem] md:col-span-7", muted)}>
            {lane.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-current opacity-60" />
                {topic}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
