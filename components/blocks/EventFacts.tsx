import { formatEditionDates, formatLongDate, getCurrentEdition } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * The practical facts at a glance: when, where, cost, and registration.
 * All from the current edition; a fact without data is left out.
 */
export function EventFacts({ tone = "paper", className }: { tone?: "paper" | "ink"; className?: string }) {
  const edition = getCurrentEdition();
  const { venue, admission } = edition;
  const place = `${edition.city}, ${edition.state}`;

  const facts: { term: string; value: string; detail?: string }[] = [
    { term: "When", value: formatEditionDates(edition), detail: "Thursday and Friday" },
    venue
      ? { term: "Where", value: venue.name, detail: [venue.campus, place].filter(Boolean).join(", ") }
      : { term: "Where", value: place },
  ];
  if (admission) {
    facts.push({ term: "Cost", value: admission.label });
    if (admission.registrationOpens) {
      facts.push({
        term: "Registration",
        value: `Opens ${formatLongDate(admission.registrationOpens)}`,
        detail: "Join the mailing list to hear when it opens.",
      });
    }
  }

  const line = tone === "ink" ? "border-bone/15" : "border-graphite/20";
  const muted = tone === "ink" ? "text-bone/70" : "text-graphite/70";

  return (
    <dl className={cn("grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {facts.map((fact) => (
        <div key={fact.term} className={cn("border-t pt-4", line)}>
          <dt className={cn("type-label", muted)}>{fact.term}</dt>
          <dd className="mt-2">
            <span className="block font-display text-[1.2rem] leading-snug font-medium">{fact.value}</span>
            {fact.detail && <span className={cn("mt-1 block text-sm", muted)}>{fact.detail}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
