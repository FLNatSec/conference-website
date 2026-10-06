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
  /** Set a URL to show the link; `null` hides it. */
  social: { linkedin: string | null };
  /**
   * Where "Join the mailing list" submits. Until a mailing provider is chosen,
   * this is a pre-addressed email; swap for a form/provider URL later.
   */
  mailingList: { href: string; benefits: string[] };
  /** Announcements not yet live. Remove an entry (or change it) when it launches. */
  comingSoon: { id: "speakers" | "partners" | "registration"; title: string; body: string }[];
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
  /** One-word framing, e.g. "Connect". */
  theme: string;
  /** High-level elements only — no times, rooms, session titles, or speakers. */
  elements: string[];
}

export interface Edition {
  year: number;
  /** 1 for the inaugural edition. */
  number: number;
  label: string;
  stage: Stage;
  startDate: string;
  endDate: string;
  timezone: string;
  city: string;
  state: string;
  coordinates: LonLat;
  /** Preliminary, high-level format. Editable; never presented as a final agenda. */
  format: FormatDay[];
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

/* ---------- People ---------- */

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
