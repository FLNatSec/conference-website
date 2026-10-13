/*
 * Feature flags — the one switchboard for content that is built but not yet
 * public. Flip a flag to `true`, check the page locally, then build.
 * Every flag is documented in docs/feature-flags.md.
 *
 * Keep this file free of "@/" imports: next.config.ts imports it to generate
 * redirects for hidden pages.
 */
export const features = {
  /* Pages. Off = removed from nav/sitemap, and the URL redirects to `fallback` below. */
  programPage: false,
  innovationPage: false,
  partnersPage: false,
  aboutPage: false,

  /* Sections and details. */
  /** Day-by-day format, full topic lanes, and proposed sessions. */
  detailedProgram: false,
  /** Speaker section (and future speaker cards and bios). */
  speakers: false,
  /** Sponsor logos and tiers (not built yet). Confirmed organizers always show. */
  sponsors: false,
  /** "Registration coming soon" line, registration updates, and future ticketing. */
  registration: false,
  /** The "Coming soon" note: speakers, innovation expo, pitch competition. */
  comingSoon: true,
  /** The statewide, rotating-host vision band. */
  statewideVision: false,
  /** "Approximately 200–300 attendees". */
  anticipatedAttendance: false,
} as const;

export type Feature = keyof typeof features;

/** Pages that can be switched off. While off, requests redirect (307) to `fallback`. */
export const flaggedPages = [
  { path: "/program", flag: "programPage", fallback: "/experience" },
  { path: "/innovation", flag: "innovationPage", fallback: "/experience#innovation" },
  { path: "/partners", flag: "partnersPage", fallback: "/get-involved" },
  { path: "/about", flag: "aboutPage", fallback: "/get-involved" },
] as const satisfies readonly { path: string; flag: Feature; fallback: string }[];

/** False only for a flagged page that is switched off. Use before linking to a route. */
export function isPageEnabled(path: string): boolean {
  const page = flaggedPages.find((p) => p.path === path);
  return page ? features[page.flag] : true;
}
