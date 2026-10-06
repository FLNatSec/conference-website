import type { CSSProperties } from "react";
import { floridaGeometry as geo } from "@/content/florida/geometry";
import { heroAnchors, heroEdges, heroHostAnchorId, heroRoutes } from "@/content/florida/hero-network";
import { arcPath, MAP_HEIGHT, MAP_WIDTH, project, smoothPath, toPercent } from "@/lib/map";
import { cn } from "@/lib/cn";
import "./florida-map.css";

/*
 * The Florida map system. One component, several presentations:
 *   - animated hero (animate)  — the Network Activation sequence (CSS-driven, see florida-map.css)
 *   - static sheet             — styleguide / later Why Florida previews
 *
 * Layers, bottom to top: graticule → context land → waterlines → Florida land
 * → coastline → network edges → routes → pulses → anchors. Labels are an HTML
 * overlay so text stays crisp and constant-size at any map scale.
 */

export interface FloridaMapProps {
  /** Unique per page — prefixes SVG ids (masks, gradients). */
  idPrefix: string;
  animate?: boolean;
  /** Number of anchors shown: 6 (core), 7 (+ Northeast), 8 (+ Keys). */
  anchors?: 6 | 7 | 8;
  showContext?: boolean;
  showWaterlines?: boolean;
  showLabels?: boolean;
  showNetwork?: boolean;
  showRoutes?: boolean;
  showAnchors?: boolean;
  /** Host anchor id; defaults to the current edition's host. */
  hostId?: string;
  /** Host tag, e.g. "Inaugural Edition". Coordinates are appended (hidden on mobile). */
  hostTag?: string;
  className?: string;
  style?: CSSProperties;
}

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Anchor reveal order (geographic, northwest → south) and timing. */
const ANCHOR_DELAY: Record<string, number> = {
  northwest: 1.2,
  northeast: 1.38,
  gainesville: 1.5,
  central: 1.66,
  "space-coast": 1.76,
  "tampa-bay": 1.88,
  south: 2.02,
  keys: 2.14,
};

const optionalIds = new Set<string>(heroAnchors.filter((a) => a.tier === "optional").map((a) => a.id));
const anchorPoint = new Map(heroAnchors.map((a) => [a.id, project(a.coordinates)]));

const edges = heroEdges.map((edge, i) => {
  const a = anchorPoint.get(edge.from)!;
  const b = anchorPoint.get(edge.to)!;
  const requires = [edge.from, edge.to].filter((id) => optionalIds.has(id)).join(" ");
  return { ...edge, i, d: arcPath(a, b, edge.bend), requires };
});

/** Edges that carry an ambient pulse after the sequence (kept few on purpose). */
const PULSE_EDGES = [0, 3, 5, 7, 8];

const routes = Object.fromEntries(heroRoutes.map((route) => [route.id, smoothPath(route.waypoints)])) as Record<
  (typeof heroRoutes)[number]["id"],
  string
>;
const launchStart = project(heroRoutes[0].waypoints[0]);
const launchEnd = project(heroRoutes[0].waypoints[heroRoutes[0].waypoints.length - 1]);

const viewBox = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;

export function FloridaMap({
  idPrefix,
  animate = false,
  anchors = 8,
  showContext = true,
  showWaterlines = true,
  showLabels = true,
  showNetwork = true,
  showRoutes = true,
  showAnchors = true,
  hostId = heroHostAnchorId,
  hostTag,
  className,
  style,
}: FloridaMapProps) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const visibleAnchors = heroAnchors.filter(
    (a) => a.tier === "core" || anchors === 8 || (anchors === 7 && a.id === "northeast"),
  );
  const visibleIds = new Set<string>(visibleAnchors.map((a) => a.id));
  const visibleEdges = edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to));
  const regionNames = visibleAnchors.map((a) => a.label).join(", ");

  return (
    <div
      className={cn("fl-map", className)}
      data-animate={animate || undefined}
      style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`, ...style }}
    >
      {/*
       * Two stacked layers: a static base (geography) and an animated overlay
       * (coast draw, network, routes, anchors). Each is its own compositing layer,
       * so animation frames never re-rasterize the geography beneath.
       */}
      <svg className="fl-map__svg fl-map__base" viewBox={viewBox} aria-hidden="true">
        <defs>
          {/* Shapes defined once; the overlay's coastline references the same path. */}
          <path id={id("mainland")} className="fl-def" d={geo.mainland} pathLength={1} />
          <path id={id("islands")} className="fl-def" d={geo.islands} />
        </defs>

        <path className="fl-graticule" d={geo.graticule} />

        {showContext && (
          <g className="fl-context">
            <path d={geo.neighbors} />
            <path d={geo.international} />
          </g>
        )}

        {showWaterlines && (
          <g className="fl-waterlines">
            {geo.waterlines.map((d, i) => (
              <path key={i} d={d} style={{ "--i": i } as Vars} />
            ))}
          </g>
        )}

        <g className="fl-land">
          <use href={`#${id("mainland")}`} />
          <use href={`#${id("islands")}`} />
        </g>
        <use className="fl-islands" href={`#${id("islands")}`} />
      </svg>

      <svg
        className="fl-map__svg fl-map__overlay"
        viewBox={viewBox}
        role="img"
        aria-label={`Map of Florida showing a statewide network linking ${regionNames}, with a launch trajectory leaving the Space Coast and sea lanes through the Straits of Florida and into the Gulf.`}
      >
        <defs>
          <linearGradient
            id={id("launch")}
            gradientUnits="userSpaceOnUse"
            x1={launchStart[0]}
            y1={launchStart[1]}
            x2={launchEnd[0]}
            y2={launchEnd[1]}
          >
            <stop offset="0" stopColor="var(--fl-line)" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="var(--fl-line)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--fl-line)" stopOpacity="0.08" />
          </linearGradient>
          {showRoutes &&
            (["straits", "gulf"] as const).map((routeId) => (
              <mask
                key={routeId}
                id={id(`reveal-${routeId}`)}
                maskUnits="userSpaceOnUse"
                x={-400}
                y={-400}
                width={MAP_WIDTH + 800}
                height={MAP_HEIGHT + 800}
              >
                <path
                  d={routes[routeId]}
                  pathLength={1}
                  fill="none"
                  stroke="white"
                  strokeWidth={12}
                  className="fl-reveal"
                  data-route={routeId}
                />
              </mask>
            ))}
        </defs>

        <use className="fl-coast" href={`#${id("mainland")}`} />

        {showNetwork && (
          <g className="fl-edges">
            {visibleEdges.map((e) => (
              <path
                key={`${e.from}-${e.to}`}
                className="fl-edge"
                d={e.d}
                pathLength={1}
                style={{ "--d": `${1.8 + e.i * 0.11}s` } as Vars}
              />
            ))}
          </g>
        )}

        {showRoutes && (
          <g className="fl-routes">
            <g mask={`url(#${id("reveal-straits")})`}>
              <path className="fl-sealane" d={routes.straits} data-route="straits" />
            </g>
            <g mask={`url(#${id("reveal-gulf")})`}>
              <path className="fl-sealane" d={routes.gulf} data-route="gulf" />
            </g>
            <path className="fl-trajectory" d={routes.launch} pathLength={1} stroke={`url(#${id("launch")})`} />
            <path className="fl-trajectory-head" d={routes.launch} pathLength={1} />
          </g>
        )}

        {showNetwork && animate && (
          <g className="fl-pulses" aria-hidden="true">
            {visibleEdges
              .filter((e) => PULSE_EDGES.includes(e.i))
              .map((e, n) => (
                <path
                  key={`${e.from}-${e.to}`}
                  className="fl-pulse"
                  d={e.d}
                  pathLength={1}
                  style={{ "--d": `${4.3 + n * 0.85}s` } as Vars}
                />
              ))}
          </g>
        )}

        {showAnchors && (
        <g className="fl-anchors">
          {visibleAnchors.map((a) => {
            const [x, y] = anchorPoint.get(a.id)!;
            const isHost = a.id === hostId;
            return (
              <g
                key={a.id}
                className={cn("fl-anchor", isHost && "fl-anchor--host")}
                data-tier={a.tier}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                style={{ "--d": `${ANCHOR_DELAY[a.id] ?? 1.5}s` } as Vars}
              >
                <circle className="fl-anchor__halo" r={4} />
                {isHost && <circle className="fl-anchor__ring" r={9} />}
                <circle className="fl-anchor__dot" r={isHost ? 3.6 : 3} />
              </g>
            );
          })}
        </g>
        )}
      </svg>

      {showLabels && (
        <div className="fl-labels" aria-hidden="true">
          {visibleAnchors.map((a) => {
            const isHost = a.id === hostId;
            const pos = toPercent(anchorPoint.get(a.id)!);
            const nudge = "labelNudge" in a ? a.labelNudge : undefined;
            return (
              <span
                key={a.id}
                className={cn("fl-label", isHost && "fl-label--host")}
                data-side={a.labelSide}
                data-mside={"mobileLabelSide" in a ? a.mobileLabelSide : undefined}
                data-mobile-hidden={("hideLabelOnMobile" in a && a.hideLabelOnMobile) || undefined}
                data-tier={a.tier}
                style={
                  {
                    ...pos,
                    "--d": `${(ANCHOR_DELAY[a.id] ?? 1.5) + (isHost ? 2.1 : 0.3)}s`,
                    "--nx": `${nudge?.[0] ?? 0}rem`,
                    "--ny": `${nudge?.[1] ?? 0}rem`,
                  } as Vars
                }
              >
                <span className="fl-label__name">{a.label}</span>
                {isHost && (
                  <span className="fl-label__tag">
                    {hostTag}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
