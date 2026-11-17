import Image from "next/image";
import type { Person } from "@/lib/types";

/** A team member: 4:5 headshot (initials until one exists), name, title, affiliation. Omit `person` for an open seat. */
export function PersonCard({ person }: { person?: Person }) {
  const initials = person?.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <li>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {person?.headshot ? (
          <Image src={person.headshot} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-display text-display-m font-medium text-steel-500"
          >
            {initials ?? ""}
          </span>
        )}
      </div>
      <div className="mt-4 border-t border-graphite/20 pt-4">
        {person ? (
          <>
            <p className="font-display text-[1.15rem] font-medium">{person.name}</p>
            <p className="mt-1 text-sm text-graphite/80">{person.title}</p>
            <p className="text-sm text-graphite/70">{person.affiliation}</p>
          </>
        ) : (
          <p className="font-display text-[1.15rem] font-medium text-graphite/65">To be announced</p>
        )}
      </div>
    </li>
  );
}
