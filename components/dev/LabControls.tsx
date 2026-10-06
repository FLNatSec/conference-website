"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { replayHero } from "@/components/motion/HeroMotionControl";
import { cn } from "@/lib/cn";

/* ---------- State ---------- */

export interface HomeLabState {
  title: "expanded" | "editorial" | "anchored";
  tagline: "sans" | "mono";
  poster: boolean;
}

export interface MapLabState {
  anchors: 6 | 7 | 8;
  context: boolean;
  waterlines: boolean;
  labels: boolean;
}

const homeHref = (s: HomeLabState, patch: Partial<HomeLabState>) => {
  const n = { ...s, ...patch };
  return `/lab?${new URLSearchParams({ title: n.title, tagline: n.tagline, poster: n.poster ? "1" : "0" })}`;
};

const mapHref = (s: MapLabState, patch: Partial<MapLabState>) => {
  const n = { ...s, ...patch };
  const flag = (b: boolean) => (b ? "1" : "0");
  return `/lab/why-florida-opener?${new URLSearchParams({
    anchors: String(n.anchors),
    context: flag(n.context),
    waterlines: flag(n.waterlines),
    labels: flag(n.labels),
  })}`;
};

const hero = () => document.querySelector<HTMLElement>("[data-hero-root]");

/* ---------- Panels ---------- */

/** Review panel for the homepage video hero. Options are URL parameters (shareable). */
export function HomeLabControls({ state }: { state: HomeLabState }) {
  const [frame, setFrame] = useState(false);
  const restart = () => {
    const video = hero()?.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <Panel frame={frame} setFrame={setFrame}>
      <Group label="Video">
        <Chip onClick={restart}>Restart loop</Chip>
        <ChipLink href={homeHref(state, { poster: !state.poster })} active={state.poster}>
          Poster only
        </ChipLink>
      </Group>
      <Group label="Title">
        {(["expanded", "editorial", "anchored"] as const).map((t) => (
          <ChipLink key={t} href={homeHref(state, { title: t })} active={state.title === t}>
            {t}
          </ChipLink>
        ))}
      </Group>
      <Group label="Tagline">
        {(["sans", "mono"] as const).map((t) => (
          <ChipLink key={t} href={homeHref(state, { tagline: t })} active={state.tagline === t}>
            {t}
          </ChipLink>
        ))}
      </Group>
      <Group label="Preview">
        <Chip onClick={() => setFrame(true)}>Mobile frame</Chip>
        <ChipLink href="/lab/why-florida-opener">Why Florida opener →</ChipLink>
        <ChipLink href="/styleguide">Styleguide →</ChipLink>
      </Group>
    </Panel>
  );
}

/** Review panel for the Why Florida map opener (Network Activation). */
export function MapLabControls({ state }: { state: MapLabState }) {
  const [frame, setFrame] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [slow, setSlow] = useState(false);

  const replay = () => {
    const el = hero();
    if (el) replayHero(el);
  };
  const toggleReduced = () => {
    const el = hero();
    if (!el) return;
    if (reduced) delete el.dataset.motion;
    else el.dataset.motion = "reduce";
    setReduced(!reduced);
  };
  const toggleSlow = () => {
    const el = hero();
    const map = el?.querySelector<HTMLElement>(".fl-map");
    if (!el || !map) return;
    map.style.setProperty("--tempo", slow ? "" : "2.5");
    setSlow(!slow);
    replayHero(el);
  };

  return (
    <Panel frame={frame} setFrame={setFrame} frameSrc="/lab/why-florida-opener">
      <Group label="Motion">
        <Chip onClick={replay}>Replay</Chip>
        <Chip onClick={toggleSlow} active={slow}>
          Slow ×2.5
        </Chip>
        <Chip onClick={toggleReduced} active={reduced}>
          Reduced motion
        </Chip>
      </Group>
      <Group label="Anchors">
        {([6, 7, 8] as const).map((n) => (
          <ChipLink key={n} href={mapHref(state, { anchors: n })} active={state.anchors === n}>
            {n}
          </ChipLink>
        ))}
      </Group>
      <Group label="Layers">
        <ChipLink href={mapHref(state, { context: !state.context })} active={state.context}>
          Context land
        </ChipLink>
        <ChipLink href={mapHref(state, { waterlines: !state.waterlines })} active={state.waterlines}>
          Waterlines
        </ChipLink>
        <ChipLink href={mapHref(state, { labels: !state.labels })} active={state.labels}>
          Labels
        </ChipLink>
      </Group>
      <Group label="Preview">
        <Chip onClick={() => setFrame(true)}>Mobile frame</Chip>
        <ChipLink href="/lab">← Homepage hero</ChipLink>
      </Group>
    </Panel>
  );
}

/* ---------- Shared pieces ---------- */

function Panel({
  children,
  frame,
  setFrame,
  frameSrc = "/",
}: {
  children: ReactNode;
  frame: boolean;
  setFrame: (open: boolean) => void;
  frameSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside
        aria-label="Prototype review controls"
        className="fixed right-4 bottom-20 z-40 w-[min(22rem,calc(100vw-2rem))] border border-bone/15 bg-ink-2/95 text-bone shadow-2xl backdrop-blur"
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="type-label flex w-full items-center justify-between px-4 py-3 text-bone/80"
        >
          Prototype lab
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        {open && <div className="space-y-4 border-t border-bone/10 px-4 py-4 text-[0.82rem]">{children}</div>}
      </aside>

      {frame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile preview"
          className="fixed inset-0 z-70 flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
          onClick={() => setFrame(false)}
        >
          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <iframe
              title="Preview at 390 × 844"
              src={frameSrc}
              className="h-[min(844px,80vh)] w-[390px] rounded-[2rem] border-8 border-steel-800 bg-ink"
            />
            <button type="button" className="type-label text-bone/80" onClick={() => setFrame(false)} autoFocus>
              Close preview
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="type-label mb-2 text-bone/60">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

const chip = (active?: boolean) =>
  cn(
    "inline-flex h-8 items-center border px-3 capitalize transition-colors",
    active ? "border-highlight-300 bg-highlight-300/15 text-bone" : "border-bone/20 text-bone/75 hover:border-bone/50",
  );

function Chip({ active, ...props }: React.ComponentProps<"button"> & { active?: boolean }) {
  return <button type="button" aria-pressed={active} className={chip(active)} {...props} />;
}

function ChipLink({ active, ...props }: React.ComponentProps<typeof Link> & { active?: boolean }) {
  return <Link scroll={false} aria-current={active ? "true" : undefined} className={chip(active)} {...props} />;
}
