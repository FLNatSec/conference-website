import type { Person } from "@/lib/types";

/**
 * People listed publicly (advisors, steering committee, planning team).
 * Add someone only after they have agreed to be listed. Sections stay hidden
 * while their group is empty. Headshots: public/people/<id>.jpg (4:5).
 */
export const people: Person[] = [];
