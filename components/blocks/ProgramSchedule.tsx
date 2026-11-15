import { TextLink } from "@/components/ui/TextLink";
import { features } from "@/content/features";
import { formatMonthDay, formatTimeRange, formatWeekday, getCurrentEdition, getSpeaker } from "@/lib/content";
import type { ProgramSession, SessionKind } from "@/lib/types";

const kindLabels: Record<SessionKind, string> = {
  keynote: "Keynote",
  panel: "Panel",
  fireside: "Fireside",
  workshop: "Workshop",
  expo: "Expo",
  tour: "Tour",
  meal: "Meal",
  social: "Reception",
  competition: "Competition",
};

function Tag({ children }: { children: string }) {
  return <span className="type-label border border-bone/30 px-2 py-0.5 text-bone/80">{children}</span>;
}

function Session({ session }: { session: ProgramSession }) {
  const names = features.speakers
    ? (session.speakerIds ?? []).map(getSpeaker).map((s) => `${s.name}, ${s.organization}`)
    : [];
  return (
    <li className="grid gap-2 border-b border-bone/12 py-5 md:grid-cols-12 md:gap-8">
      <p className="type-label pt-1 text-bone/70 md:col-span-3">
        {session.start ? formatTimeRange(session.start, session.end) : kindLabels[session.kind]}
      </p>
      <div className="md:col-span-9">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-display text-[1.15rem] leading-snug font-medium">{session.title}</span>
          {session.note && <Tag>{session.note}</Tag>}
          {session.tentative && <Tag>Tentative</Tag>}
        </p>
        {session.start && <p className="type-label mt-2 text-bone/60">{kindLabels[session.kind]}</p>}
        {session.description && (
          <p className="mt-2 max-w-[60ch] text-[0.98rem] leading-relaxed text-bone/75">{session.description}</p>
        )}
        {names.length > 0 && <p className="mt-2 text-[0.98rem] text-bone/85">{names.join(" · ")}</p>}
        {session.location && <p className="mt-2 text-sm text-bone/65">{session.location}</p>}
        {session.link && (
          <p className="mt-3">
            <TextLink href={session.link.href} className="font-medium text-bone">
              {session.link.label} <span aria-hidden="true">↓</span>
            </TextLink>
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * The detailed program from edition.program: each day's sessions, with times,
 * rooms, and speakers as they are added to the data. For navy surfaces.
 * Used on /program only (hidden while features.programPage is off).
 */
export function ProgramSchedule() {
  const edition = getCurrentEdition();
  const days = edition.program ?? [];
  if (days.length === 0) return null;

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {days.map((day) => (
        <section key={day.date} aria-labelledby={`day-${day.date}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3
              id={`day-${day.date}`}
              className="type-expanded font-display text-[clamp(1.75rem,1.1rem+2vw,2.75rem)] leading-none font-semibold uppercase"
            >
              {formatWeekday(day.date)}
            </h3>
            <p className="type-label text-bone/70">
              {formatMonthDay(day.date)}
              {day.start && ` · ${formatTimeRange(day.start, day.end)}`}
            </p>
          </div>
          <ol className="mt-6 border-t border-bone/12">
            {day.sessions.map((session) => (
              <Session key={session.id} session={session} />
            ))}
          </ol>
        </section>
      ))}
      <p className="text-sm text-bone/60">
        Sessions are listed in planned order and may change. Times, rooms, and speakers will be added as they are confirmed.
      </p>
    </div>
  );
}
