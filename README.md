# Florida National Security Summit — website

The website for the Florida National Security Summit, a statewide summit convening Florida's national-security ecosystem. The inaugural summit takes place March 26–27, 2027, in Gainesville, Florida.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

> **Status:** first public version (awareness stage). Speakers, partners, and registration are marked "coming soon" in `content/site.ts → comingSoon`. Mailing list: Kit, via a custom form.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (all routes static) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run geo:build -- <census.zip> <naturalearth.zip>` | Regenerate the Florida map geometry (see `docs/asset-sources.md`) |
| `npm run geo:regions -- <county.zip>` | Regenerate the six Why Florida region shapes from Census counties |

## Deployment

Vercel deploys `main` to production and every other branch to a preview URL. Production is indexed (see `app/robots.ts`); previews are not. The review pages below return 404 in production.

## Mailing list (Kit)

The signup form (`components/forms/SignupForm.tsx`) posts to a Server Action (`app/actions/subscribe.ts`) that creates the subscriber in Kit as **active** (single opt-in), adds them to the form, and tags them. Credentials are server-side environment variables only; see `.env.example`. In Kit, keep the form's "Send incentive email" setting **off**.

## Review pages (not indexed)

- **`/`** — the video hero, a light thesis section, and a dark preliminary-format section.
- **`/lab`** — the same, plus a review panel: restart loop, poster-only, title and tagline variants, and a mobile frame.
- **`/lab/why-florida-opener`** — the "Florida Network Activation" map opener for the future Why Florida page, with replay, slow motion, simulated reduced motion, 6, 7, or 8 anchors, layer toggles, and a mobile frame.
- **`/styleguide`** — wordmark, tagline, palette (with live contrast ratios), typography, type alternates, buttons, section labels, section rhythm, map styling, and organizer roles.

## Project structure

```
app/                     routes; (dev)/ holds the review pages
components/
  ui/                    primitives: Container, Section, SectionLabel, Button, TextLink, Rule, Coordinates
  brand/                 Wordmark, Mark, Tagline (provisional)
  layout/                SiteHeader, MobileNav, SiteFooter, SkipLink
  graphics/florida/      FloridaMap + florida-map.css (the map system and Network Activation sequence)
  media/                 HeroVideo (background video: gated loading, pause, chapter label)
  motion/                HeroMotionControl, Reveal
  sections/home/         HomeHero (video), ThesisSample, FormatTeaser
  sections/why-florida/  WhyFloridaOpener (map)
  dev/                   lab and styleguide tools
content/                 all site data (typed)
  site.ts                name, provisional tagline, nav, CTAs
  editions/              one file per year; index.ts sets the current edition
  organizations.ts       permanent org records (roles are set per edition)
  florida/               map network data plus generated projection and geometry
  media/hero-video.ts    hero footage sources, posters, chapter labels, credit
lib/                     types, content helpers, projection, map math, contrast
scripts/                 build-florida-geometry.mts
docs/asset-sources.md    source and license record for every external asset
docs/video-brief.md      AI shot prompts, rules, file locations, and the ffmpeg grade/encode recipe
```

## Common tasks

- **Change the hero line or tagline:** edit `supportingLine` / `tagline` in `content/site.ts`.
- **Edit page copy:** `content/summit.ts` (mission, pillars, lanes, innovation, audiences, statewide) and `content/florida/ecosystem.ts` (Why Florida).
- **Add the LinkedIn link:** set `social.linkedin` in `content/site.ts`.
- **Add advisors or team members:** add entries to `content/people.ts` (only with their permission); the About page shows each group once it has members.
- **Confirm an organizer's public wording:** set `roleLabel` for that organization in `content/editions/2027.ts`. `null` keeps it hidden.
- **Add an organization logo:** add `public/orgs/<org-id>.svg`, then set `logo` in `content/organizations.ts`.
- **Adjust the hero network:** edit anchors, edges, or routes in `content/florida/hero-network.ts`. Positions are real coordinates.
- **Add an external image or video:** record it in `docs/asset-sources.md` first.
- **Replace the hero footage:** follow `docs/video-brief.md`, swap the files in `public/media/hero/`, and update the chapters in `content/media/hero-video.ts`.
