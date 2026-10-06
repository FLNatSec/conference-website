/**
 * Query helpers over /content. Components call these instead of reading raw
 * arrays, so the data shape can evolve (or move to a CMS) in one place.
 */
import { currentEditionYear, editions } from "@/content/editions";
import { organizations } from "@/content/organizations";
import type { Edition, Organization } from "@/lib/types";

export function getCurrentEdition(): Edition {
  const edition = editions.find((e) => e.year === currentEditionYear);
  if (!edition) throw new Error(`No edition data for ${currentEditionYear}`);
  return edition;
}

export function getOrganization(id: string): Organization {
  const org = (organizations as readonly Organization[]).find((o) => o.id === id);
  if (!org) throw new Error(`Unknown organization id "${id}" — add it to content/organizations.ts`);
  return org;
}

export interface OrgGroup {
  roleLabel: string | null;
  organizations: Organization[];
}

/**
 * Organizations grouped by their role label for an edition, in data order.
 * By default, organizations whose public wording is unconfirmed are excluded.
 */
export function getOrgGroups(edition: Edition, { includePending = false } = {}): OrgGroup[] {
  const groups: OrgGroup[] = [];
  for (const { orgId, roleLabel } of edition.orgRoles) {
    if (roleLabel === null && !includePending) continue;
    const group = groups.find((g) => g.roleLabel === roleLabel);
    const org = getOrganization(orgId);
    if (group) group.organizations.push(org);
    else groups.push({ roleLabel, organizations: [org] });
  }
  return groups;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parses an ISO date (YYYY-MM-DD) without timezone drift. */
function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d, weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}

/** "March 26–27, 2027" (handles cross-month and cross-year ranges). */
export function formatDateRange(start: string, end: string): string {
  const a = parts(start);
  const b = parts(end);
  if (a.y === b.y && a.m === b.m) return `${MONTHS[a.m]} ${a.d}–${b.d}, ${a.y}`;
  if (a.y === b.y) return `${MONTHS[a.m]} ${a.d} – ${MONTHS[b.m]} ${b.d}, ${a.y}`;
  return `${MONTHS[a.m]} ${a.d}, ${a.y} – ${MONTHS[b.m]} ${b.d}, ${b.y}`;
}

/** "Friday · March 26" */
export function formatDayLabel(iso: string): string {
  const p = parts(iso);
  return `${WEEKDAYS[p.weekday]} · ${MONTHS[p.m]} ${p.d}`;
}
