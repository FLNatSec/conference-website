# Feature flags

Everything that is built but not yet public is controlled from one file: `content/features.ts`.
Nothing behind a flag has been deleted — its components and data are intact and come back when the flag is turned on.

## How to turn something back on

1. In `content/features.ts`, change the flag from `false` to `true`.
2. Run `npm run dev` and check the page or section.
3. Run `npm run build` to confirm there are no errors.
4. Push to a branch and review the Vercel preview before merging to `main` (production).

## Pages

When a page flag is off, the page is removed from the header, mobile menu, footer, and sitemap, and its URL
redirects (307, temporary) to the replacement shown below. Turning the flag on restores the page exactly as it was
and removes the redirect.

| Flag | Page | While off, redirects to | What's on it |
|---|---|---|---|
| `programPage` | `/program` | `/experience` | The detailed program, session by session (data: `program` in `content/editions/2027.ts`), the Thursday workshop grid (data: `workshops` in the edition; 2 rooms by 4 one-hour slots), five lanes of conversation, speakers, suggest a speaker. Also adds a "See the full program" button on `/experience`. |
| `innovationPage` | `/innovation` | `/experience#innovation` | Innovation Expo and Pitch Competition in detail, with who each is for |
| `partnersPage` | `/partners` | `/get-involved` | Why partner, sponsorship tiers (with `sponsorTiers`), organizers and sponsors, partnership contact |
| `aboutPage` | `/about` | `/get-involved` | Mission, summit facts, statewide vision, organizers, people (advisors, steering committee, team), contact |

## Sections and details

| Flag | Default | Controls |
|---|---|---|
| `detailedProgram` | off | Homepage program preview and, on `/experience`, the proposed sessions (data: `proposedSessions` in `content/summit.ts`). The two-day outline on `/experience` is always shown (data: `format` in `content/editions/2027.ts`). |
| `speakers` | off | Confirmed speakers (data: `content/speakers.ts`): the speaker grid on `/experience` and `/program`, and speaker names on program sessions. Replaces the "Speakers" coming-soon card. Nothing shows while the list is empty. |
| `sponsors` | off | Confirmed sponsors grouped by tier (data: `sponsors` in `content/editions/2027.ts`) on the homepage, `/get-involved`, and `/partners`; the homepage organizers section; the "Partners" coming-soon card. |
| `sponsorTiers` | off | Sponsorship tiers, prices, benefits, signature sponsorships, and add-ons (data: `content/sponsorship.ts`, from the sponsorship prospectus) on `/get-involved` and `/partners`. |
| `advisors` | off | Advisors (data: `content/people.ts`, group `advisor`) under "Who's behind the summit" on `/get-involved`. Nothing shows while the list is empty. |
| `registration` | off | The "Registration updates" mailing-list benefit and the "Registration" coming-soon card; reserved for the registration link. The registration opening date is always shown (data: `admission` in the edition). |
| `comingSoon` | **on** | The "Coming soon" note (Speakers, Innovation Expo, Pitch Competition) on the homepage and `/experience` |
| `statewideVision` | off | The statewide, rotating-host band on the homepage, "Our vision" in the homepage "What is the summit" section, and the rotating-host sentence on `/get-involved` |
| `anticipatedAttendance` | off | "Approximately 200–300 attendees are anticipated" in the homepage "What is the summit" section |

## Previewing hidden content

Turn the flags on locally, run `npm run dev`, and look; turn them back off before committing unless the content
is ready. Speakers, sponsors, and advisors also need at least one entry in their data file to show anything.

## Other preserved content

- **Coming-soon entries** live in `site.comingSoon` (`content/site.ts`). Each has a `show` switch; remove an entry when it launches.
- **Homepage sections not currently used** — `MissionSection`, `ExperienceSection` (pillars), `InnovationSection`
  — remain in `components/sections/home/HomeSections.tsx` and can be added back to `app/page.tsx`.
- **Why Florida:** the "national priorities ↔ Florida strengths" list (`opportunities`) and the `WhyThisSummit`
  section are kept but not rendered; their content now lives in the "Florida today" introduction and the closing section.
- **Numbered labels:** `PillarGrid` accepts `numbered` to bring back the 01/02 labels.

## Adding a new flag

Add it to `features` in `content/features.ts` with a one-line comment, gate the section with
`{features.yourFlag && …}`, and add a row to this file. For a new hideable page, also add it to `flaggedPages`
and call `notFound()` at the top of the page when the flag is off. Keep `content/features.ts` free of `@/`
imports, because `next.config.ts` imports it.
