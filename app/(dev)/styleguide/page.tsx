import type { Metadata } from "next";
import Image from "next/image";
import { Instrument_Sans, Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { Tagline } from "@/components/brand/Tagline";
import { Wordmark } from "@/components/brand/Wordmark";
import { PaletteSwatches } from "@/components/dev/PaletteSwatches";
import { FloridaMap } from "@/components/graphics/florida/FloridaMap";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Coordinates } from "@/components/ui/Coordinates";
import { Rule } from "@/components/ui/Rule";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { heroVideo } from "@/content/media/hero-video";
import { site } from "@/content/site";
import { getCurrentEdition, getOrgGroups } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// Alternate faces for comparison only — loaded on this page, never site-wide.
const altSchibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-alt-schibsted", preload: false });
const altInstrument = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-alt-instrument",
  preload: false,
});
const altSourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-alt-source-serif",
  preload: false,
});

const palette = [
  {
    title: "Surfaces",
    tokens: [
      { name: "paper", role: "Light-break surface — cool fog" },
      { name: "paper-2", role: "Raised light surface, land on paper maps" },
      { name: "ink", role: "Primary dark surface — cinematic sections" },
      { name: "ink-2", role: "Raised dark surface, panels" },
      { name: "ink-3", role: "Land tone on dark maps, hover" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "graphite", role: "Body text on paper" },
      { name: "bone", role: "Body text and map lines on ink" },
      { name: "steel-400", role: "Secondary text, meta" },
      { name: "steel-600", role: "Rules and tertiary text on paper" },
      { name: "steel-800", role: "Rules on ink" },
    ],
  },
  {
    title: "Accents",
    tokens: [
      { name: "highlight-300", role: "Ice highlight — map nodes, host marker, focus, live states" },
      { name: "highlight-500", role: "Mid ice blue — hover, secondary highlight on navy" },
      { name: "highlight-700", role: "Emphasis, links, and map highlights on paper" },
      { name: "ink-deep", role: "Video overlays and vignettes" },
      { name: "steel-300", role: "Muted labels on navy" },
    ],
  },
];

export default function StyleguidePage() {
  const edition = getCurrentEdition();
  const allGroups = getOrgGroups(edition, { includePending: true });

  return (
    <div className={cn(altSchibsted.variable, altInstrument.variable, altSourceSerif.variable)}>
      {/* Intro */}
      <Section tone="ink" spacing="none" className="pt-36 pb-20 md:pt-44 md:pb-28">
        <Container>
          <SectionLabel index="00" title="Design language" meta="Prototype · v0.1" className="text-bone/60" />
          <h1 className="type-expanded mt-8 font-display text-display-l font-semibold uppercase">Styleguide</h1>
          <p className="mt-8 max-w-[52ch] text-lede text-bone/75">
            The visual system for the {site.name}, under review. Everything here is provisional — the tagline,
            wordmark, and type pairing are proposals to evaluate, not final decisions.
          </p>
          <p className="mt-6">
            <TextLink href="/lab" className="text-bone">
              Open the hero lab
            </TextLink>
          </p>
        </Container>
      </Section>

      {/* 01 Wordmark */}
      <Sheet index="01" title="Wordmark" note="Provisional typographic wordmark, with no symbol until a final logo is chosen.">
        <div className="grid gap-px bg-graphite/12 md:grid-cols-2">
          <Tile tone="ink">
            <Wordmark />
          </Tile>
          <Tile tone="paper">
            <Wordmark />
          </Tile>
          <Tile tone="ink" tall>
            <Wordmark variant="stacked" />
          </Tile>
          <Tile tone="paper" tall>
            <Wordmark variant="stacked" />
          </Tile>
        </div>
      </Sheet>

      {/* 02 Title & tagline */}
      <Sheet index="02" title="Title & tagline" note="The full summit name always dominates. The tagline is provisional and lives in content/site.ts.">
        <div className="grid gap-px bg-graphite/12 lg:grid-cols-3">
          <Tile tone="ink" tall label="A · Expanded (current)">
            <p className="type-expanded font-display text-[2.4rem] leading-[0.94] font-semibold uppercase">
              Florida
              <br />
              National
              <br />
              Security
              <br />
              Summit
            </p>
            <p className="mt-5 text-xl font-light text-bone/85">{site.tagline}</p>
          </Tile>
          <Tile tone="ink" tall label="B · Editorial">
            <p className="max-w-[11ch] font-display text-[2.6rem] leading-[0.98] font-medium tracking-[-0.025em]">
              Florida National Security Summit
            </p>
            <p className="mt-5 text-xl font-light text-bone/85">{site.tagline}</p>
          </Tile>
          <Tile tone="ink" tall label="C · Anchored">
            <p className="uppercase">
              <span className="type-expanded block font-display text-[3.4rem] leading-[0.88] font-semibold">Florida</span>
              <span className="type-expanded mt-2 block font-display text-[1.05rem] leading-[1.1] font-medium tracking-[0.02em] text-bone/90">
                National Security
                <br />
                Summit
              </span>
            </p>
            <p className="mt-5 text-xl font-light text-bone/85">{site.tagline}</p>
          </Tile>
        </div>
        <div className="mt-px grid gap-px bg-graphite/12 md:grid-cols-3">
          <Tile tone="ink" label="Tagline · sans light (homepage, current)">
            <p className="text-[1.65rem] leading-snug font-light text-bone/85">{site.tagline}</p>
          </Tile>
          <Tile tone="ink" label="Tagline · mono">
            <p className="font-mono text-[1.05rem] tracking-[0.18em] text-bone/85 uppercase">{site.tagline}</p>
          </Tile>
          <Tile tone="paper" label="Tagline · serif italic (Why Florida / editorial)">
            <Tagline className="text-[1.9rem] leading-tight text-graphite" />
          </Tile>
        </div>
      </Sheet>

      {/* 03 Palette */}
      <Sheet index="03" title="Palette" note="Navy + ice, with no hue accent, so the brand sits comfortably with any host university (no orange, no school color pairings). Contrast ratios are measured live from the CSS tokens.">
        <PaletteSwatches groups={palette} />
      </Sheet>

      {/* 04 Typography */}
      <Sheet index="04" title="Typography" note="Archivo (display/UI, variable width) · Newsreader (editorial serif) · IBM Plex Mono (annotation).">
        <div className="divide-y divide-graphite/12 border-y border-graphite/12">
          <Specimen name="Display XL · Archivo 600, width 125%">
            <p className="type-expanded font-display text-display-xl font-semibold uppercase">Convene</p>
          </Specimen>
          <Specimen name="Display L · Archivo 600, width 125%">
            <p className="type-expanded font-display text-display-l font-semibold uppercase">Why Florida</p>
          </Specimen>
          <Specimen name="Display M · Archivo 500">
            <p className="font-display text-display-m font-medium tracking-[-0.02em]">Five lanes of conversation</p>
          </Specimen>
          <Specimen name="Statement · Newsreader 400">
            <p className="max-w-[26ch] font-serif text-statement">
              Florida already holds many of the assets. <em className="text-highlight-700">The opportunity is to connect them.</em>
            </p>
          </Specimen>
          <Specimen name="Lede · Archivo 400">
            <p className="max-w-[60ch] text-lede text-graphite/85">
              A statewide summit designed to convene Florida&rsquo;s national-security ecosystem across host
              universities.
            </p>
          </Specimen>
          <Specimen name="Body · Archivo 400, 16px">
            <p className="max-w-[64ch] text-base leading-relaxed text-graphite/85">
              Government and military leaders, companies and investors, researchers and students — brought together to
              align capabilities with national priorities, foster collaboration, and advance national security.
            </p>
          </Specimen>
          <Specimen name="Label · Plex Mono 400, tracked caps">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-graphite/75">
              <SectionLabel index="02" title="Ecosystem" />
              <span className="type-label">Preliminary format</span>
              <Coordinates value={edition.coordinates} />
            </div>
          </Specimen>
        </div>
      </Sheet>

      {/* 05 Type alternates */}
      <Sheet index="05" title="Type alternates" note="For comparison only. If the current pairing doesn't feel exceptional, these are the leading alternatives.">
        <div className="grid gap-px bg-graphite/12 lg:grid-cols-3">
          <Tile tone="paper" label="Current · Archivo + Newsreader">
            <AltSpecimen display="var(--font-archivo)" serif="var(--font-newsreader)" stretch="125%" />
          </Tile>
          <Tile tone="paper" label="Alt 1 · Schibsted Grotesk + Newsreader">
            <AltSpecimen display="var(--font-alt-schibsted)" serif="var(--font-newsreader)" />
          </Tile>
          <Tile tone="paper" label="Alt 2 · Instrument Sans + Source Serif 4">
            <AltSpecimen display="var(--font-alt-instrument)" serif="var(--font-alt-source-serif)" />
          </Tile>
        </div>
      </Sheet>

      {/* 06 Buttons & links */}
      <Sheet index="06" title="Buttons & links" note="Primary: Join the mailing list. Secondary: Partner with us. Signal orange is reserved for the primary action on ink.">
        <div className="grid gap-px bg-graphite/12 md:grid-cols-2">
          <Tile tone="ink" label="On ink">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#" arrow>
                {site.ctas.primary.label}
              </ButtonLink>
              <ButtonLink href="#" variant="secondary">
                {site.ctas.secondary.label}
              </ButtonLink>
              <ButtonLink href="#" variant="ghost" arrow>
                Explore
              </ButtonLink>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ButtonLink href="#" size="small">
                Small primary
              </ButtonLink>
              <Button disabled>Disabled</Button>
              <TextLink href="#" className="text-bone">
                Text link
              </TextLink>
            </div>
          </Tile>
          <Tile tone="paper" label="On paper">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#" tone="paper" arrow>
                {site.ctas.primary.label}
              </ButtonLink>
              <ButtonLink href="#" tone="paper" variant="secondary">
                {site.ctas.secondary.label}
              </ButtonLink>
              <ButtonLink href="#" tone="paper" variant="ghost" arrow>
                Explore
              </ButtonLink>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ButtonLink href="#" tone="paper" size="small">
                Small primary
              </ButtonLink>
              <Button tone="paper" disabled>
                Disabled
              </Button>
              <TextLink href="#" className="text-graphite">
                Text link
              </TextLink>
            </div>
          </Tile>
        </div>
        <p className="mt-4 text-sm text-graphite/70">Press Tab to see the focus ring (2px ice-blue outline, offset).</p>
      </Sheet>

      {/* 07 Section labels & coordinates */}
      <Sheet index="07" title="Section labels & coordinates" note="Chart annotation in mono: section index, title, and a coordinate that rotates with each edition's host.">
        <div className="grid gap-px bg-graphite/12 md:grid-cols-2">
          <Tile tone="paper">
            <div className="space-y-5 text-graphite/75">
              <SectionLabel index="01" title="Thesis" meta="29.65°N 82.32°W" />
              <SectionLabel index="02" title="Ecosystem" />
              <SectionLabel index="03" title="Format" meta="Preliminary" />
              <Rule />
              <p className="type-label">
                {edition.label} · {edition.city} · {edition.year}
              </p>
            </div>
          </Tile>
          <Tile tone="ink">
            <div className="space-y-5 text-bone/70">
              <SectionLabel index="04" title="Innovation" />
              <p className="type-label flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-7 bg-highlight-300" />
                {edition.label} · {edition.city}, {edition.state}
              </p>
              <Coordinates value={edition.coordinates} />
            </div>
          </Tile>
        </div>
      </Sheet>

      {/* 08 Section rhythm */}
      <Sheet index="08" title="Section rhythm" note="Mostly dark (defense-tech), with light breaks for reading. Planned homepage cadence:">
        <ol className="overflow-hidden border border-graphite/12">
          {[
            ["ink", "Hero", "Cinematic video, navy grade"],
            ["paper", "Thesis", "Light break — editorial statement"],
            ["ink", "Ecosystem", "Static statewide map band"],
            ["ink-2", "Program", "Format and five lanes"],
            ["ink", "Innovation", "Signature moment — expo and pitch, imagery"],
            ["paper", "Partners", "Light break — clean, institutional"],
            ["ink", "Closing CTA", "Video still reprise — Join the mailing list"],
          ].map(([tone, name, desc], i) => (
            <li
              key={name}
              className={cn(
                "flex items-baseline justify-between gap-6 px-5",
                tone === "ink" ? "bg-ink py-7 text-bone" : tone === "ink-2" ? "bg-ink-2 py-7 text-bone" : "bg-paper py-5",
              )}
            >
              <span className="type-label opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display text-lg font-medium">{name}</span>
              <span className="hidden text-sm opacity-75 sm:block">{desc}</span>
            </li>
          ))}
        </ol>
      </Sheet>

      {/* 08b Video hero */}
      <Sheet index="08b" title="Video hero" note="Homepage footage is graded to a two-tone navy → ice duotone mapped to the brand tokens, so NASA public-domain footage and future AI b-roll share one look. The poster frame paints first; video loads after page load and never under reduced motion, Save-Data, or slow connections.">
        <div className="grid gap-px bg-graphite/12 md:grid-cols-12">
          <div className="relative aspect-video overflow-hidden bg-ink md:col-span-8">
            <Image src={heroVideo.posterDesktop} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="relative overflow-hidden bg-ink md:col-span-4">
            <Image src={heroVideo.posterMobile} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
          </div>
        </div>
        <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm text-graphite/80 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Grade", "Grayscale → navy (#08111C) to ice (#EAF0F5) duotone, light grain"],
            ["Encodes", "1920×1080 desktop, 720×1280 vertical mobile, H.264, 24 fps, no audio"],
            ["Loop", "10–25 s, slow camera, dips to navy between shots"],
            ["Rules", "No insignia, weapons, flags, faces, logos, or invented installations"],
          ].map(([term, desc]) => (
            <div key={term} className="border-t border-graphite/15 pt-3">
              <dt className="type-label text-graphite/70">{term}</dt>
              <dd className="mt-1.5">{desc}</dd>
            </div>
          ))}
        </dl>
      </Sheet>

      {/* 09 Map styling */}
      <Section tone="ink" spacing="compact">
        <Container>
          <SheetHeader
            index="09"
            title="Florida map"
            note="Public-domain geography (U.S. Census, Natural Earth) in the Florida Albers projection. One component powers the hero, these sheets, and the future Why Florida map."
            tone="ink"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="overflow-hidden lg:col-span-8">
              <FloridaMap idPrefix="sg-ink" hostTag={edition.label} />
            </div>
            <dl className="fl-map grid content-start gap-4 text-sm lg:col-span-4">
              <Legend sample="coast" label="Coastline" desc="Hairline, 1px, non-scaling" />
              <Legend sample="graticule" label="Graticule" desc="1° grid in the map projection" />
              <Legend sample="waterlines" label="Waterlines" desc="Concentric contours derived from the coast" />
              <Legend sample="edge" label="Network edge" desc="Gentle arc between regional anchors" />
              <Legend sample="trajectory" label="Launch trajectory" desc="Signal → bone gradient, leaves the frame" />
              <Legend sample="sealane" label="Sea lane" desc="Dashed, Gulf Stream teal" />
              <Legend sample="anchor" label="Regional anchor" desc="Region, not facility" />
              <Legend sample="host" label="Host anchor" desc="Edition host — rotates each year" />
            </dl>
          </div>
        </Container>
      </Section>
      <Section tone="paper" spacing="compact">
        <Container>
          <p className="type-label mb-6 text-graphite/70">On paper · six anchors, no context land</p>
          <div className="mx-auto max-w-4xl overflow-hidden">
            <FloridaMap idPrefix="sg-paper" className="fl-map--paper" anchors={6} showContext={false} hostTag={edition.label} />
          </div>
        </Container>
      </Section>

      {/* 10 Organizers */}
      <Sheet index="10" title="Organizers & roles" note="Roles are data (roleLabel), never hard-coded copy. Unconfirmed wording is hidden from public pages — shown here only for review.">
        <div className="grid gap-px bg-graphite/12 md:grid-cols-2">
          {allGroups.map((group) => (
            <Tile key={group.roleLabel ?? "pending"} tone="paper">
              {group.roleLabel ? (
                <p className="type-label text-graphite/70">{group.roleLabel}</p>
              ) : (
                <p className="type-label inline-flex items-center gap-2 border border-dashed border-highlight-700/60 px-2 py-1 text-highlight-700">
                  Role label pending
                </p>
              )}
              <ul className="mt-4 space-y-2">
                {group.organizations.map((org) => (
                  <li key={org.id} className="font-display text-lg text-graphite">
                    {org.name}
                  </li>
                ))}
              </ul>
            </Tile>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

/* ---------- Local layout helpers ---------- */

function SheetHeader({ index, title, note, tone = "paper" }: { index: string; title: string; note?: string; tone?: Tone }) {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      <SectionLabel index={index} title={title} className={cn("md:col-span-4", tone === "ink" ? "text-bone/65" : "text-graphite/65")} />
      {note && (
        <p className={cn("max-w-[60ch] text-[0.95rem] md:col-span-8", tone === "ink" ? "text-bone/65" : "text-graphite/70")}>
          {note}
        </p>
      )}
    </div>
  );
}

function Sheet({ index, title, note, children }: { index: string; title: string; note?: string; children: ReactNode }) {
  return (
    <Section tone="paper" spacing="compact" className="border-b border-graphite/10">
      <Container>
        <SheetHeader index={index} title={title} note={note} />
        <div className="mt-10">{children}</div>
      </Container>
    </Section>
  );
}

function Tile({ tone, label, tall, children }: { tone: Tone; label?: string; tall?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center p-8 md:p-10",
        tall && "min-h-80",
        tone === "ink" ? "bg-ink text-bone" : "bg-paper text-graphite",
      )}
    >
      {label && <p className="type-label mb-6 opacity-70">{label}</p>}
      {children}
    </div>
  );
}

function Specimen({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
      <p className="type-label text-graphite/70 md:col-span-3 md:pt-2">{name}</p>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </div>
  );
}

function AltSpecimen({ display, serif, stretch }: { display: string; serif: string; stretch?: string }) {
  return (
    <div>
      <p
        className="text-[2.1rem] leading-[0.95] font-semibold uppercase"
        style={{ fontFamily: display, fontStretch: stretch }}
      >
        Florida National Security Summit
      </p>
      <p className="mt-5 text-2xl italic" style={{ fontFamily: serif }}>
        The opportunity is to connect them.
      </p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-graphite/75" style={{ fontFamily: display }}>
        Government, military, industry, investors, universities, and students — convened to align capabilities with
        national priorities.
      </p>
    </div>
  );
}

function Legend({ sample, label, desc }: { sample: string; label: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-bone/10 pb-4">
      <svg viewBox="0 0 64 24" className="h-6 w-16 shrink-0 overflow-visible" aria-hidden="true">
        <LegendSample kind={sample} />
      </svg>
      <div>
        <dt className="text-bone">{label}</dt>
        <dd className="text-bone/55">{desc}</dd>
      </div>
    </div>
  );
}

function LegendSample({ kind }: { kind: string }) {
  switch (kind) {
    case "coast":
      return <path className="fl-coast" d="M2 16 C14 4, 24 20, 36 10 S56 8, 62 14" />;
    case "graticule":
      return <path className="fl-graticule" style={{ stroke: "color-mix(in oklab, var(--color-bone) 30%, transparent)" }} d="M2 8H62M2 18H62M20 2V22M44 2V22" />;
    case "waterlines":
      return (
        <g fill="none" stroke="var(--color-highlight-300)" strokeOpacity="0.45">
          <path d="M2 6 C20 6, 40 6, 62 6" />
          <path d="M2 12 C20 12, 40 12, 62 12" />
          <path d="M2 18 C20 18, 40 18, 62 18" />
        </g>
      );
    case "edge":
      return <path className="fl-edge" style={{ strokeOpacity: 0.7 }} d="M4 18 Q32 0 60 18" />;
    case "trajectory":
      return (
        <>
          <defs>
            <linearGradient id="lg-traj" x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-bone)" />
              <stop offset="0.4" stopColor="var(--color-bone)" stopOpacity="0.6" />
              <stop offset="1" stopColor="var(--color-bone)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M4 22 C30 20, 46 12, 62 2" fill="none" stroke="url(#lg-traj)" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case "sealane":
      return <path className="fl-sealane" d="M2 18 C22 18, 40 6, 62 6" />;
    case "anchor":
      return <circle cx="32" cy="12" r="3" fill="var(--color-bone)" />;
    case "host":
      return (
        <>
          <circle cx="32" cy="12" r="9" fill="none" stroke="var(--color-highlight-300)" />
          <circle cx="32" cy="12" r="3.6" fill="var(--color-highlight-300)" />
        </>
      );
    default:
      return null;
  }
}
