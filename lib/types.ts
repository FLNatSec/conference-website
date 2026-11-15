/**
 * Content schema. Everything under /content is typed against these interfaces,
 * so a typo or missing field fails `npm run build` instead of shipping.
 */
import type { LonLat } from "@/lib/geo";

/* ---------- Site ---------- */

export interface NavItem {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** PROVISIONAL explanatory line under the hero title. */
  supportingLine: string;
  /** PROVISIONAL conceptual brand line (tested on Why Florida and social). */
  tagline: string;
  description: string;
  nav: NavItem[];
  ctas: { primary: Cta; secondary: Cta };
  contact: { email: string };
  /** One entry per account. Set a URL to show the link; `null` hides it. */
  social: Record<SocialPlatform, string | null>;
  /** Where "Join the mailing list" links go (the signup form's #join anchor). */
  mailingList: { href: string; benefits: string[] };
  /** Announcements not yet live. `show: false` keeps an entry in reserve; remove it when it launches. */
  comingSoon: ComingSoonItem[];
}

export type SocialPlatform = "linkedin" | "instagram" | "x" | "youtube" | "facebook";

export interface ComingSoonItem {
  id: "speakers" | "innovation-expo" | "pitch-competition" | "partners" | "registration";
  title: string;
  body: string;
  show: boolean;
}

/* ---------- Summit content (copy as data, so it's editable without touching layout) ---------- */

export interface Pillar {
  title: string;
  body: string;
}

export interface Lane {
  title: string;
  /** Supporting topics — indicative of the conversation, not a finalized agenda. */
  topics: string[];
}

export interface Audience {
  title: string;
  value: string;
}

/** One element of the summit experience (The Experience page and homepage). */
export interface ExperienceElement {
  /** Anchor id on /experience. */
  id: string;
  title: string;
  body: string;
  /** Short status tag, e.g. "Proposed". */
  status?: string;
}

/** A way to get involved; `href` is a pre-addressed email or an on-page anchor. */
export interface WayToGetInvolved {
  title: string;
  body: string;
  href: string;
  action: string;
}

/** A proposed session (kept for later; hidden while features.detailedProgram is off). */
export interface ProposedSession {
  title: string;
  format: string;
  question: string;
}

/* ---------- Organizations & roles ---------- */

export type OrganizationKind =
  | "student-org"
  | "university"
  | "university-unit"
  | "government"
  | "military"
  | "industry"
  | "nonprofit";

/** A permanent organization record. Its role is defined per edition, never here. */
export interface Organization {
  id: string;
  name: string;
  shortName?: string;
  kind: OrganizationKind;
  url?: string;
  /** Path under /public/orgs — add the file, then set this. */
  logo?: string;
}

export interface EditionOrgRole {
  orgId: string;
  /**
   * Public relationship wording, e.g. "Organized by". `null` means the wording
   * is not yet confirmed — the organization is hidden from public surfaces.
   */
  roleLabel: string | null;
}

/* ---------- Editions ---------- */

export type Stage = "awareness" | "announcements" | "registration" | "program" | "live" | "archive";

export interface FormatDay {
  /** ISO date, e.g. "2027-03-26". */
  date: string;
  /** Part of the day the program runs, e.g. "Afternoon and evening". */
  span?: string;
  /** High-level elements only — no times, rooms, session titles, or speakers. */
  elements: string[];
}

/** The "Save the date" calendar invite: an all-day event across the edition's dates. */
export interface CalendarInvite {
  /** Reminders, in months before the first day. Only the .ics file carries them. */
  remindMonthsBefore: number[];
  /** Time of day ("HH:MM", attendee's local time) the reminders appear. */
  reminderTime: string;
}

/** Where the summit is held. */
export interface Venue {
  name: string;
  /** Campus or host institution, e.g. "University of Florida". */
  campus?: string;
}

/** Who can attend and what it costs (shown on the homepage and Get Involved). */
export interface Admission {
  /** Short label, e.g. "Free and open to all". */
  label: string;
  /** One sentence for body copy. */
  detail: string;
  /** ISO date registration opens; omit while unknown. */
  registrationOpens?: string;
}

export type SessionKind = "keynote" | "panel" | "fireside" | "workshop" | "expo" | "tour" | "meal" | "social" | "competition";

/** One item on the detailed program (/program; hidden while features.programPage is off). */
export interface ProgramSession {
  id: string;
  kind: SessionKind;
  title: string;
  /** "HH:MM", 24-hour, local time. Omit until the time is set. */
  start?: string;
  end?: string;
  /** Room or building. */
  location?: string;
  description?: string;
  /** Ids from content/speakers.ts. Names show only while features.speakers is on. */
  speakerIds?: string[];
  /** Topic or title not final: marked "Tentative". */
  tentative?: boolean;
  /** Short qualifier, e.g. "Invitation only". */
  note?: string;
  /** Optional link under the session, e.g. to a section further down the page ("#workshops"). */
  link?: Cta;
}

export interface ProgramDay {
  /** ISO date. */
  date: string;
  /** Overall hours for the day, "HH:MM" 24-hour. */
  start?: string;
  end?: string;
  sessions: ProgramSession[];
}

/** One workshop in the Thursday grid. Its slot is `start` + `room`, which must match the block's slots and rooms. */
export interface Workshop {
  id: string;
  title: string;
  /** Slot start, "HH:MM" 24-hour, matching one of the block's `slots`. */
  start: string;
  /** Must match one of the block's `rooms` exactly. */
  room: string;
  /** Who runs it, e.g. "Jane Doe, P.E.". */
  host?: string;
  /** Page the host's name links to (profile or faculty page). */
  hostUrl?: string;
  /** Shown after the name, unlinked, e.g. "with the Example Society". */
  hostDetail?: string;
  description?: string;
  /** Who it is for, e.g. "Engineering students". */
  audience?: string;
  /** Organization sponsoring this workshop, if any. */
  sponsor?: string;
}

/** The workshop block: parallel rooms across fixed time slots. */
export interface WorkshopBlock {
  /** ISO date. */
  date: string;
  rooms: string[];
  slots: { start: string; end: string }[];
  sessions: Workshop[];
}

/** A confirmed sponsor for an edition (shown while features.sponsors is on). */
export interface EditionSponsor {
  /** Id from content/organizations.ts. */
  orgId: string;
  /** Id from content/sponsorship.ts. */
  tierId: SponsorTierId;
}

export interface Edition {
  year: number;
  /** 1 for the inaugural edition. */
  number: number;
  label: string;
  stage: Stage;
  startDate: string;
  endDate: string;
  /** Dates are not final — shown as "(tentative)" wherever they appear. */
  datesTentative?: boolean;
  timezone: string;
  city: string;
  state: string;
  coordinates: LonLat;
  venue?: Venue;
  admission?: Admission;
  /** Detailed program with sessions (and times, once set). Shown only on /program. */
  program?: ProgramDay[];
  /** Thursday workshops by room and time slot. Shown only on /program. */
  workshops?: WorkshopBlock;
  /** Confirmed sponsors. Add one only after the sponsorship is confirmed. */
  sponsors?: EditionSponsor[];
  /** Preliminary, high-level format. Editable; never presented as a final agenda. */
  format: FormatDay[];
  invite: CalendarInvite;
  orgRoles: EditionOrgRole[];
}

/* ---------- Media ---------- */

export interface VideoSource {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
}

export interface VideoChapter {
  /** Seconds from the start of the loop. */
  start: number;
  /** Ticker label — a verified place, or a theme (e.g. "Maritime") when the location is unverified. */
  label: string;
  /** Only when the filming location is verified. */
  coordinates?: LonLat;
}

export interface HeroVideoConfig {
  desktop: VideoSource;
  /** Vertical (9:16) encode for small screens. */
  mobile: VideoSource;
  /** Static imports (next/image StaticImageData). The poster is the first paint and LCP. */
  posterDesktop: import("next/image").StaticImageData;
  posterMobile: import("next/image").StaticImageData;
  /** Decorative footage — empty alt by default. */
  posterAlt: string;
  /** Short on-screen credit, e.g. "Footage: NASA". */
  credit: string;
  chapters: VideoChapter[];
}

/* ---------- Sponsorship ---------- */

export type SponsorTierId = "platinum" | "gold" | "silver" | "bronze" | "community";

/** A named sponsorship a tier can choose (e.g. "Keynote sponsor"). */
export interface SignatureOption {
  title: string;
  /** Extra cost on top of the tier, e.g. "+$1k". */
  price?: string;
  available: boolean;
}

export interface SponsorTier {
  id: SponsorTierId;
  name: string;
  /** Display price, e.g. "$10k". */
  price: string;
  /** Cap on sponsors at this tier, e.g. "Limited to 2 sponsors". */
  limit?: string;
  /** One value per row of `sponsorBenefits`, keyed by benefit id. */
  benefits: Record<string, string>;
  signature: SignatureOption[];
}

export interface SponsorBenefit {
  id: string;
  label: string;
  /** Footnote shown under the table. */
  note?: string;
}

/* ---------- People ---------- */

/** A confirmed speaker (shown while features.speakers is on). */
export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  /** Two or three sentences. */
  bio?: string;
  /** Path under /public/speakers (4:5). */
  headshot?: string;
  /** Listed first, with a "Keynote" tag. */
  keynote?: boolean;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  group: "advisor" | "steering" | "team";
  headshot?: string;
}

/* ---------- Why Florida ---------- */

export interface Source {
  title: string;
  url: string;
}

export type NodeCategory = "military" | "space" | "industry" | "research" | "innovation" | "ports";

export interface EcosystemNode {
  name: string;
  /** City or area. */
  place: string;
  category: NodeCategory;
  /** One short, factual line. Statistics only with a verified source. */
  description: string;
  source: Source;
}

/** A Florida strategic capability: one sentence, with a source when it carries a figure. */
export interface Capability {
  title: string;
  body: string;
  source?: Source;
}

/** A sourced headline figure. */
export interface FloridaStat {
  value: string;
  label: string;
  source: Source;
}

export interface FloridaRegion {
  id: string;
  name: string;
  /** Hero-network anchor this region corresponds to. */
  anchorId: string;
  coordinates: LonLat;
  summary: string;
  nodes: EcosystemNode[];
}

export interface HistoryEra {
  year: string;
  title: string;
  body: string;
  /** Region where this history lives on today. */
  regionId: string;
  source: Source;
}

/* ---------- Florida map ---------- */

export type LabelSide = "left" | "right" | "top" | "bottom";

export interface HeroAnchor {
  id: string;
  /** Regional name shown on the map — never an installation inventory. */
  label: string;
  coordinates: LonLat;
  /** `core` anchors always render; `optional` ones can be toggled (lab) and hide on mobile. */
  tier: "core" | "optional";
  labelSide: LabelSide;
  /** Fine-tune label position, in rem. */
  labelNudge?: readonly [x: number, y: number];
  /** Label side on small screens, when different. */
  mobileLabelSide?: LabelSide;
  /** Hidden on small screens to keep the mobile map calm. */
  hideLabelOnMobile?: boolean;
}

export interface HeroEdge {
  from: string;
  to: string;
  /** Arc bulge as a fraction of edge length; sign flips the side. */
  bend: number;
}

export interface HeroRoute {
  id: "launch" | "straits" | "gulf";
  label: string;
  /** Waypoints in lon/lat; the first and last may lie outside the map frame. */
  waypoints: LonLat[];
  style: "trajectory" | "sea-lane";
}
