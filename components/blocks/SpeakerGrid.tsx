import Image from "next/image";
import { features } from "@/content/features";
import { getSpeakers } from "@/lib/content";

/** True when there are confirmed speakers to show. Use to gate a whole section. */
export function hasSpeakers(): boolean {
  return features.speakers && getSpeakers().length > 0;
}

/**
 * Confirmed speakers from content/speakers.ts, keynotes first. For navy surfaces.
 * Renders nothing while features.speakers is off or the list is empty.
 */
export function SpeakerGrid() {
  if (!hasSpeakers()) return null;
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {getSpeakers().map((speaker) => (
        <li key={speaker.id} id={speaker.id} className="scroll-mt-24">
          {speaker.headshot && (
            <span className="relative mb-5 block aspect-4/5 overflow-hidden bg-ink-deep">
              <Image
                src={speaker.headshot}
                alt=""
                fill
                sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                className="object-cover"
              />
            </span>
          )}
          <div className="border-t border-bone/15 pt-4">
            {speaker.keynote && <p className="type-label mb-2 text-highlight-300">Keynote</p>}
            <h3 className="font-display text-[1.25rem] leading-tight font-medium">{speaker.name}</h3>
            <p className="mt-1 text-[0.95rem] text-bone/80">{speaker.title}</p>
            <p className="text-[0.95rem] text-bone/65">{speaker.organization}</p>
            {speaker.bio && <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/75">{speaker.bio}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
