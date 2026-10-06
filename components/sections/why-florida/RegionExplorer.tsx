"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import type { LonLat } from "@/lib/geo";
import { MAP_HEIGHT, MAP_WIDTH, project } from "@/lib/map";
import type { EcosystemNode, FloridaRegion, NodeCategory } from "@/lib/types";
import { cn } from "@/lib/cn";
import "./region-explorer.css";

/** Short labels drawn on the map. */
const SHORT: Record<string, string> = {
  northwest: "Northwest",
  "north-central": "North Central",
  northeast: "Northeast",
  central: "Central & Space Coast",
  "tampa-bay": "Tampa Bay & Gulf Coast",
  south: "South & Keys",
};

/** Short labels placed inside each region on the map (lon/lat). */
const MAP_LABELS: Record<string, { text: string; at: LonLat }> = {
  northwest: { text: "Northwest", at: [-85.6, 30.55] },
  "north-central": { text: "North Central", at: [-82.65, 29.85] },
  northeast: { text: "Northeast", at: [-81.6, 30.25] },
  central: { text: "Central", at: [-81.25, 28.35] },
  "tampa-bay": { text: "Tampa Bay", at: [-82.15, 27.55] },
  south: { text: "South", at: [-80.85, 26.15] },
};

interface RegionExplorerProps {
  regions: FloridaRegion[];
  statewide: EcosystemNode[];
  categoryOrder: NodeCategory[];
  categoryLabels: Record<NodeCategory, string>;
  /** Interior label point per region, in map units. */
  labelPoints: Record<string, readonly [number, number]>;
  /** Florida's padded bounding box in map units — the map is zoomed to it. */
  bounds: { x: number; y: number; width: number; height: number };
  /** The static map stack (server-rendered): base map + region shapes with data-region. */
  children: ReactNode;
}

type Group = { label: string; nodes: EcosystemNode[] };

/** Splits groups into two balanced columns by item count, keeping order. */
function balance(groups: Group[]): [Group[], Group[]] {
  const left: Group[] = [];
  const right: Group[] = [];
  let l = 0;
  let r = 0;
  for (const g of groups) {
    if (l <= r) {
      left.push(g);
      l += g.nodes.length + 1;
    } else {
      right.push(g);
      r += g.nodes.length + 1;
    }
  }
  return [left, right];
}

/**
 * Interactive "Florida today". Hover or tap a region of the map (or use the
 * region buttons) to see what's there; with nothing selected it shows the
 * statewide institutions. Links of the form #region-<id> select a region.
 */
export function RegionExplorer({
  regions,
  statewide,
  categoryOrder,
  categoryLabels,
  labelPoints,
  bounds,
  children,
}: RegionExplorerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = regions.find((r) => r.id === activeId) ?? null;

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#region-", "");
      if (regions.some((r) => r.id === id)) {
        setActiveId(id);
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [regions]);

  // Region shapes are server-rendered; pick them up by delegation.
  const regionFrom = (e: MouseEvent) => (e.target as Element).closest?.("[data-region]")?.getAttribute("data-region");
  const onMapOver = (e: MouseEvent) => {
    const id = regionFrom(e);
    if (id) setActiveId(id);
  };

  const groups: Group[] = active
    ? categoryOrder
        .map((cat) => ({ label: categoryLabels[cat], nodes: active.nodes.filter((n) => n.category === cat) }))
        .filter((g) => g.nodes.length > 0)
    : [];
  const [left, right] = balance(groups);

  return (
    <div ref={rootRef} id="explorer" className="scroll-mt-24">
      {/* Title row */}
      <div className="mx-auto max-w-[46rem] text-center" aria-live="polite">
        <p className="type-label text-graphite/70">
          {active ? "Region" : "Hover over or tap a region on the map"}
        </p>
        <h3 className="type-expanded mt-3 font-display text-[1.8rem] leading-[1.05] font-semibold uppercase md:text-[2.3rem]">
          {active ? active.name : "Statewide"}
        </h3>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-graphite/80">
          {active
            ? active.summary
            : "Select a region to see the commands, companies, universities, startups, and investors there. Across the state, these institutions finance and support the ecosystem."}
        </p>
      </div>

      {/* Region buttons (keyboard and touch) */}
      <div className="mt-8 flex flex-wrap justify-center gap-1.5">
        <Chip active={!active} onClick={() => setActiveId(null)}>
          Statewide
        </Chip>
        {regions.map((r) => (
          <Chip key={r.id} active={r.id === activeId} onClick={() => setActiveId(r.id)}>
            {SHORT[r.id] ?? r.name}
          </Chip>
        ))}
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,1.15fr)_1fr] lg:gap-10">
        {/* Map (center on desktop, first on mobile) */}
        <div className="lg:sticky lg:top-24 lg:order-2">
          {/* Crop the full map frame to Florida so the state fills the column. */}
          <div className="relative overflow-hidden" style={{ aspectRatio: `${bounds.width} / ${bounds.height}` }}>
          <div
            className="rx-map absolute"
            style={{
              width: `${(MAP_WIDTH / bounds.width) * 100}%`,
              left: `${(-bounds.x / bounds.width) * 100}%`,
              top: `${(-bounds.y / bounds.height) * 100}%`,
            }}
            data-active={activeId ?? undefined}
            onMouseOver={onMapOver}
            onClick={onMapOver}
          >
            {children}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {regions.map((r) => {
                const at = MAP_LABELS[r.id];
                const p = at ? project(at.at) : labelPoints[r.id];
                if (!p) return null;
                return (
                  <span
                    key={r.id}
                    className={cn("rx-label", r.id === activeId && "rx-label--active")}
                    style={{ left: `${(p[0] / MAP_WIDTH) * 100}%`, top: `${(p[1] / MAP_HEIGHT) * 100}%` }}
                  >
                    {at?.text ?? SHORT[r.id] ?? r.name}
                  </span>
                );
              })}
            </div>
          </div>
          </div>
        </div>

        {/* Details on both sides */}
        <div key={`l-${activeId}`} className="rx-col space-y-8 lg:order-1">
          {active ? (
            left.map((g) => <NodeGroup key={g.label} label={g.label} nodes={g.nodes} />)
          ) : (
            <NodeGroup label="Statewide financing & support" nodes={statewide} />
          )}
        </div>
        <div key={`r-${activeId}`} className="rx-col space-y-8 lg:order-3">
          {active ? (
            right.map((g) => <NodeGroup key={g.label} label={g.label} nodes={g.nodes} />)
          ) : (
            <div>
              <p className="type-label border-b border-graphite/20 pb-2 text-highlight-700">Regions</p>
              <ul className="mt-3 space-y-3">
                {regions.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(r.id)}
                      onMouseEnter={() => setActiveId(r.id)}
                      className="group block text-left"
                    >
                      <span className="font-display text-[1.02rem] font-medium text-graphite underline-offset-4 group-hover:underline">
                        {r.name}
                      </span>
                      <span className="mt-0.5 block text-[0.9rem] leading-snug text-graphite/75">{r.summary}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "type-label border px-3 py-2 transition-colors",
        active ? "border-highlight-700 bg-highlight-700 text-paper" : "border-graphite/25 text-graphite/80 hover:border-graphite/60",
      )}
    >
      {children}
    </button>
  );
}

/** A labeled list of organizations, each linked to its source. */
export function NodeGroup({ label, nodes }: { label: string; nodes: EcosystemNode[] }) {
  return (
    <div>
      <p className="type-label border-b border-graphite/20 pb-2 text-highlight-700">{label}</p>
      <ul className="mt-3 space-y-3">
        {nodes.map((node) => (
          <li key={node.name + node.place}>
            <a
              href={node.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              title={`Source: ${node.source.title}`}
            >
              <span className="font-display text-[1.02rem] font-medium text-graphite underline-offset-4 group-hover:underline">
                {node.name}
              </span>
              <span className="text-sm text-graphite/60"> · {node.place}</span>
              <span className="mt-0.5 block text-[0.9rem] leading-snug text-graphite/75">{node.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
