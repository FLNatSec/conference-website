@AGENTS.md

# Project rules — Florida National Security Summit website

- **Name:** always "Florida National Security Summit" (never "Conference", never "FNSC"). Contact: flnatsecsummit@gmail.com.

- **Status:** early-stage site on Vercel; `main` = production (never deploy without approval). Public pages: Home, Why Florida, The Experience, Get Involved. Organizer: University of Florida National Security Club. Dates: March 25–27, 2027 (shown without "tentative"; `datesTentative` in the edition can bring the label back). Mailing list runs on Kit (app/actions/subscribe.ts). No numbered section labels or coordinate annotations (user preference). Logo is provisional (Florida silhouette + star, components/brand/Mark.tsx).
- **Feature flags:** unfinished pages and sections are hidden — never deleted — via `content/features.ts`; see `docs/feature-flags.md`. Link to a flaggable route only through `isPageEnabled()`.
- **Tokens only.** Colors, fonts, type scale, and easing live in `app/globals.css` (`@theme static`). Never hard-code hex values in components.
- **Content is data.** Site config, editions, organizations, and map data live in `/content` and are typed by `lib/types.ts`. Components read them through `lib/content.ts`. Never duplicate markup per speaker, partner, or year.
- **Organizer roles** are `roleLabel` fields per edition. Never hard-code relationship wording ("In partnership with", "Supported by"). `null` means unconfirmed, and the organization stays hidden publicly.
- **Claims must be sourced.** Statistics, companies, and superlatives appear only with a verified source (official .mil/.gov or the organization itself preferred), recorded in the data next to the claim.
- **Assets:** public-domain U.S. government, properly licensed, or organizer-provided only. Record every external asset in `docs/asset-sources.md`.
- **Client components are small islands** (header scroll, mobile nav, hero video, motion control, reveal, lab tools). Everything else is a Server Component.
- **Map geometry:** `content/florida/geometry.ts` is large; import it only from Server Components. Client code uses `content/florida/projection.ts` through `lib/map.ts`.
- **Motion:** the un-animated state is the final composition. Animations attach only under `prefers-reduced-motion: no-preference`, and ambient motion stops on its own.
- **Contrast:** text on paper uses at least `graphite/65`; text on ink uses at least `bone/55`. Palette is navy + ice with no hue accent (no orange — the brand must suit any host university). Primary CTA is a white button on navy, a navy button on paper.
- **Hero video:** poster first (LCP); video attaches after load, never under reduced motion / Save-Data / slow connections. Footage follows `docs/video-brief.md` (navy → ice duotone; no insignia, weapons, faces, or invented installations).
- Prefer SVG, CSS, and platform APIs. Recommend a dependency before adding one.
- **Contact flows:** "Join the mailing list" goes to the Kit signup form (#join). Inquiries are pre-addressed emails via `inquiryHref()` (content/site.ts) until dedicated forms exist.
- Read the Next 16 docs in `node_modules/next/dist/docs/` before using an unfamiliar API.
