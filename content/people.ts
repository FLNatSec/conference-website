import type { Person, PersonGroup } from "@/lib/types";

/**
 * People listed publicly on /team (and /about when it returns).
 * Add someone only after they have agreed to be listed. Headshots: public/people/<id>.jpg (4:5).
 */
export const people: Person[] = [];

/**
 * The /team layout, in page order. `seats` is how many cards each group shows;
 * seats not yet filled by `people` show as "To be announced".
 */
export const teamGroups: { group: PersonGroup; title: string; lede: string; seats: number }[] = [
  {
    group: "organizer",
    title: "Lead organizers",
    lede: "The students leading the summit for the University of Florida National Security Club.",
    seats: 3,
  },
  {
    group: "team",
    title: "Planning team",
    lede: "Students running programming, partnerships, outreach, and operations.",
    seats: 6,
  },
  {
    group: "advisor",
    title: "Advisors",
    lede: "Faculty and professionals who guide the summit.",
    seats: 4,
  },
];
