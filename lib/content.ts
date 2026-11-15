/**
 * Query helpers over /content. Components call these instead of reading raw
 * arrays, so the data shape can evolve (or move to a CMS) in one place.
 */
import { currentEditionYear, editions } from "@/content/editions";
import { organizations } from "@/content/organizations";
import { people } from "@/content/people";
import { speakers } from "@/content/speakers";
import { sponsorTiers } from "@/content/sponsorship";
import type { Edition, Organization, Person, Speaker, SponsorTier } from "@/lib/types";

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

/** "March 25–26, 2027" (handles cross-month and cross-year ranges). */
export function formatDateRange(start: string, end: string): string {
  const a = parts(start);
  const b = parts(end);
  if (a.y === b.y && a.m === b.m) return `${MONTHS[a.m]} ${a.d}–${b.d}, ${a.y}`;
  if (a.y === b.y) return `${MONTHS[a.m]} ${a.d} – ${MONTHS[b.m]} ${b.d}, ${a.y}`;
  return `${MONTHS[a.m]} ${a.d}, ${a.y} – ${MONTHS[b.m]} ${b.d}, ${b.y}`;
}

/** The edition's dates as shown publicly: "March 25–26, 2027 (tentative)". */
export function formatEditionDates(edition: Edition): string {
  const range = formatDateRange(edition.startDate, edition.endDate);
  return edition.datesTentative ? `${range} (tentative)` : range;
}

/** "Thursday" */
export function formatWeekday(iso: string): string {
  return WEEKDAYS[parts(iso).weekday];
}

/** "March 25" */
export function formatMonthDay(iso: string): string {
  const p = parts(iso);
  return `${MONTHS[p.m]} ${p.d}`;
}

/** "January 11, 2027" */
export function formatLongDate(iso: string): string {
  const p = parts(iso);
  return `${MONTHS[p.m]} ${p.d}, ${p.y}`;
}

/** "07:30" → "7:30 AM" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "7:30 AM – 5:00 PM", or just the start when there is no end. */
export function formatTimeRange(start: string, end?: string): string {
  return end ? `${formatTime(start)} – ${formatTime(end)}` : formatTime(start);
}

/** "J. Wayne Reitz Union, University of Florida, Gainesville, Florida" (city and state only, without a venue). */
export function formatLocation(edition: Edition): string {
  const { venue, city, state } = edition;
  return [venue?.name, venue?.campus, city, state].filter(Boolean).join(", ");
}

/** Confirmed speakers, keynotes first, otherwise in data order. */
export function getSpeakers(): Speaker[] {
  return [...speakers].sort((a, b) => Number(b.keynote ?? false) - Number(a.keynote ?? false));
}

export function getSpeaker(id: string): Speaker {
  const speaker = speakers.find((s) => s.id === id);
  if (!speaker) throw new Error(`Unknown speaker id "${id}" — add it to content/speakers.ts`);
  return speaker;
}

export function getPeople(group: Person["group"]): Person[] {
  return people.filter((p) => p.group === group);
}

export interface SponsorGroup {
  tier: SponsorTier;
  organizations: Organization[];
}

/** Confirmed sponsors grouped by tier, highest tier first. Tiers without sponsors are left out. */
export function getSponsorGroups(edition: Edition): SponsorGroup[] {
  const confirmed = edition.sponsors ?? [];
  return sponsorTiers
    .map((tier) => ({
      tier,
      organizations: confirmed.filter((s) => s.tierId === tier.id).map((s) => getOrganization(s.orgId)),
    }))
    .filter((group) => group.organizations.length > 0);
}
