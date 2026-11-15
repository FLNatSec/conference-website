import { getPeople } from "@/lib/content";
import type { Person } from "@/lib/types";

/** People in one group (advisors, steering committee, or planning team) from content/people.ts. Paper surface. */
export function PeopleList({ group }: { group: Person["group"] }) {
  const members = getPeople(group);
  if (members.length === 0) return null;
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <li key={m.id} className="border-t border-graphite/20 pt-4">
          <p className="font-display text-[1.15rem] font-medium">{m.name}</p>
          <p className="mt-1 text-sm text-graphite/80">{m.title}</p>
          <p className="text-sm text-graphite/70">{m.affiliation}</p>
        </li>
      ))}
    </ul>
  );
}
