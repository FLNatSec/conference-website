import type { HeroAnchor, HeroEdge, HeroRoute } from "@/lib/types";

/**
 * The opening-hero network: a small set of regional anchors that read as a
 * statewide system. The detailed ecosystem (installations, ports, universities)
 * belongs to the Why Florida map, not here.
 *
 * Positions are real coordinates; labels are regions, not facilities.
 */
export const heroAnchors = [
  {
    id: "northwest",
    label: "Northwest Florida",
    coordinates: [-86.55, 30.47],
    tier: "core",
    labelSide: "bottom",
    mobileLabelSide: "right",
  },
  {
    id: "northeast",
    label: "Northeast Florida",
    coordinates: [-81.66, 30.33],
    tier: "optional",
    labelSide: "right",
  },
  {
    id: "gainesville",
    label: "Gainesville",
    coordinates: [-82.3248, 29.6516],
    tier: "core",
    labelSide: "left",
  },
  {
    id: "central",
    label: "Central Florida",
    coordinates: [-81.38, 28.54],
    tier: "core",
    labelSide: "left",
    labelNudge: [0, -0.15],
    hideLabelOnMobile: true,
  },
  {
    id: "space-coast",
    label: "Space Coast",
    coordinates: [-80.6, 28.4],
    tier: "core",
    labelSide: "right",
    labelNudge: [0, 0.2],
  },
  {
    id: "tampa-bay",
    label: "Tampa Bay",
    coordinates: [-82.46, 27.95],
    tier: "core",
    labelSide: "left",
  },
  {
    id: "south",
    label: "South Florida",
    coordinates: [-80.19, 25.77],
    tier: "core",
    labelSide: "right",
  },
  {
    id: "keys",
    label: "Florida Keys",
    coordinates: [-81.78, 24.56],
    tier: "optional",
    labelSide: "bottom",
  },
] as const satisfies readonly HeroAnchor[];

export type HeroAnchorId = (typeof heroAnchors)[number]["id"];

/** The host anchor for the current edition (rotates with future hosts). */
export const heroHostAnchorId: HeroAnchorId = "gainesville";

/** A sparse statewide mesh — deliberately not hub-and-spoke. Order = draw order. */
export const heroEdges = [
  { from: "northwest", to: "gainesville", bend: -0.1 },
  { from: "gainesville", to: "northeast", bend: 0.18 },
  { from: "gainesville", to: "central", bend: -0.16 },
  { from: "gainesville", to: "tampa-bay", bend: 0.14 },
  { from: "northeast", to: "space-coast", bend: 0.16 },
  { from: "central", to: "space-coast", bend: -0.35 },
  { from: "tampa-bay", to: "central", bend: 0.2 },
  { from: "tampa-bay", to: "south", bend: 0.12 },
  { from: "space-coast", to: "south", bend: 0.13 },
  { from: "south", to: "keys", bend: -0.16 },
] as const satisfies readonly (HeroEdge & { from: HeroAnchorId; to: HeroAnchorId })[];

/** Lines that leave the frame — Florida's reach beyond itself. */
export const heroRoutes = [
  {
    id: "launch",
    label: "Launch trajectory from the Space Coast",
    style: "trajectory",
    waypoints: [
      [-80.6, 28.4],
      [-79.95, 28.62],
      [-79.0, 29.15],
      [-77.9, 30.05],
      [-76.6, 31.45],
      [-75.2, 33.2],
    ],
  },
  {
    id: "straits",
    label: "Sea lane through the Straits of Florida",
    style: "sea-lane",
    waypoints: [
      [-85.9, 21.9],
      [-84.4, 23.25],
      [-82.6, 24.05],
      [-81.2, 24.28],
      [-80.25, 24.85],
      [-79.85, 25.7],
      [-79.7, 26.75],
      [-78.8, 27.55],
      [-77.2, 27.95],
      [-74.9, 28.25],
    ],
  },
  {
    id: "gulf",
    label: "Gulf route from Tampa Bay toward the Yucatán Channel",
    style: "sea-lane",
    waypoints: [
      [-82.62, 27.62],
      [-83.35, 26.75],
      [-84.25, 25.25],
      [-85.1, 23.6],
      [-85.75, 22.25],
      [-86.2, 21.2],
    ],
  },
] as const satisfies readonly HeroRoute[];
