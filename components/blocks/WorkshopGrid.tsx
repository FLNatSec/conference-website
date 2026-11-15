import { TextLink } from "@/components/ui/TextLink";
import { formatTimeRange, getCurrentEdition } from "@/lib/content";
import type { Workshop } from "@/lib/types";

function Card({ workshop, room }: { workshop?: Workshop; room: string }) {
  return (
    <div className="flex h-full flex-col bg-ink p-6 md:p-7">
      {/* Room name per card on small screens, where the column headers are hidden. */}
      <p className="type-label mb-3 text-bone/60 md:hidden">{room}</p>
      {workshop ? (
        <>
          <h4 className="font-display text-[1.15rem] leading-snug font-medium">{workshop.title}</h4>
          {workshop.host && (
            <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/85">
              {workshop.hostUrl ? (
                <TextLink href={workshop.hostUrl} target="_blank" rel="noopener noreferrer" className="text-bone">
                  {workshop.host}
                </TextLink>
              ) : (
                workshop.host
              )}
              {workshop.hostDetail && `, ${workshop.hostDetail}`}
            </p>
          )}
          {workshop.description && (
            <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/75">{workshop.description}</p>
          )}
          {(workshop.audience || workshop.sponsor) && (
            <p className="mt-auto flex flex-wrap gap-2 pt-5">
              {workshop.audience && (
                <span className="type-label border border-bone/30 px-2 py-0.5 text-bone/80">{workshop.audience}</span>
              )}
              {workshop.sponsor && (
                <span className="type-label border border-highlight-300/50 px-2 py-0.5 text-highlight-300">
                  Workshop sponsor: {workshop.sponsor}
                </span>
              )}
            </p>
          )}
        </>
      ) : (
        <p className="font-display text-[1.15rem] leading-snug font-medium text-bone/60">To be announced</p>
      )}
    </div>
  );
}

/**
 * Thursday's workshops from edition.workshops: one row per time slot, one column
 * per room. A slot with no workshop in the data reads "To be announced".
 * For navy surfaces; used on /program (hidden while features.programPage is off).
 */
export function WorkshopGrid() {
  const block = getCurrentEdition().workshops;
  if (!block) return null;
  const { rooms, slots, sessions } = block;
  // Columns: time, then one per room (set inline because the room count is data).
  const columns = { "--workshop-cols": `8.5rem repeat(${rooms.length}, minmax(0, 1fr))` } as React.CSSProperties;
  const grid = "grid gap-px md:grid-cols-(--workshop-cols)";

  return (
    <div style={columns} className="overflow-hidden border border-bone/12 bg-bone/12">
      <div aria-hidden="true" className={`hidden md:grid ${grid}`}>
        <p className="type-label bg-ink-2 p-4 text-bone/60">Time</p>
        {rooms.map((room) => (
          <p key={room} className="type-label bg-ink-2 p-4 text-bone/80">
            {room}
          </p>
        ))}
      </div>
      <ol className="mt-px grid gap-px">
        {slots.map((slot) => (
          <li key={slot.start} className={grid}>
            <p className="type-label bg-ink-2 p-4 text-bone/80 md:pt-7">{formatTimeRange(slot.start, slot.end)}</p>
            {rooms.map((room) => (
              <Card
                key={room}
                room={room}
                workshop={sessions.find((w) => w.start === slot.start && w.room === room)}
              />
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
