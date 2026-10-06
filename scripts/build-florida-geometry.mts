/**
 * Builds content/florida/geometry.ts from public-domain boundary data.
 *
 * Usage (Node 23.6+ runs TypeScript directly):
 *   node scripts/build-florida-geometry.mts <census-states.zip> <natural-earth-countries.zip>
 *
 * Inputs (see docs/asset-sources.md):
 *   - U.S. Census Bureau cartographic boundary file, cb_2024_us_state_500k.zip
 *   - Natural Earth 1:10m Admin-0 countries, ne_10m_admin_0_countries.zip
 *
 * Raw downloads are never committed — only the generated, simplified, projected paths.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import mapshaper from "mapshaper";
import { albers, makeProjector, type LonLat, type Point } from "../lib/geo.ts";

const [censusZip, naturalEarthZip] = process.argv.slice(2);
if (!censusZip || !naturalEarthZip) {
  console.error("Usage: node scripts/build-florida-geometry.mts <census.zip> <natural-earth.zip>");
  process.exit(1);
}

/** Geographic frame of the map (lon/lat). Generous ocean to the east and south for routes. */
const FRAME = { west: -88.6, east: -76.4, south: 22.6, north: 31.6 };
const VIEW_WIDTH = 1000;
const DECIMALS = 1;

type Ring = LonLat[];
type Polygon = Ring[];
type Geometry =
  | { type: "Polygon"; coordinates: Polygon }
  | { type: "MultiPolygon"; coordinates: Polygon[] };

async function extract(commands: string, input?: Record<string, string>): Promise<Polygon[]> {
  const output = await mapshaper.applyCommands(`${commands} -o out.json format=geojson`, input);
  const files = Object.values(output);
  if (!files.length) throw new Error(`mapshaper produced no output for: ${commands}`);
  // Multi-layer inputs produce one output file per layer; merge them.
  const features: { geometry: Geometry | null }[] = files.flatMap((file) => {
    const json = JSON.parse(file.toString());
    if (json.type === "FeatureCollection") return json.features;
    // Attribute-less output (e.g. after -dissolve) is a bare GeometryCollection.
    if (json.type === "GeometryCollection") return json.geometries.map((geometry: Geometry) => ({ geometry }));
    return [];
  });
  return features.flatMap(({ geometry }) => {
    if (geometry?.type === "Polygon") return [geometry.coordinates];
    if (geometry?.type === "MultiPolygon") return geometry.coordinates;
    return [];
  });
}

const florida = await extract(
  `-i "${censusZip}" -filter 'STUSPS=="FL"' -simplify interval=450 keep-shapes -filter-islands min-area=1.5km2`,
);
const neighbors = await extract(
  `-i "${censusZip}" -filter '["AL","GA","MS","SC"].includes(STUSPS)' ` +
    `-clip bbox=${FRAME.west - 1},${FRAME.south - 1},${FRAME.east + 1},${FRAME.north + 1} ` +
    `-simplify interval=900`,
);
const international = await extract(
  `-i "${naturalEarthZip}" -filter 'ADMIN=="Cuba"||ADMIN=="The Bahamas"' ` +
    `-clip bbox=${FRAME.west - 1},${FRAME.south - 2},${FRAME.east + 1},${FRAME.north} ` +
    `-simplify interval=1500 -filter-islands min-area=20km2`,
);

// Fit the frame into the viewBox.
const frameEdge: LonLat[] = [];
for (let t = 0; t <= 1; t += 0.02) {
  frameEdge.push([FRAME.west + (FRAME.east - FRAME.west) * t, FRAME.south]);
  frameEdge.push([FRAME.west + (FRAME.east - FRAME.west) * t, FRAME.north]);
  frameEdge.push([FRAME.west, FRAME.south + (FRAME.north - FRAME.south) * t]);
  frameEdge.push([FRAME.east, FRAME.south + (FRAME.north - FRAME.south) * t]);
}
const raw = frameEdge.map(albers);
const minX = Math.min(...raw.map(([x]) => x));
const maxX = Math.max(...raw.map(([x]) => x));
const minY = Math.min(...raw.map(([, y]) => y));
const maxY = Math.max(...raw.map(([, y]) => y));
const scale = VIEW_WIDTH / (maxX - minX);
const transform = { scale, tx: -minX * scale, ty: maxY * scale };
const viewHeight = (maxY - minY) * scale;
const project = makeProjector(transform);

const round = (n: number) => Number(n.toFixed(DECIMALS));
const ringToPath = (ring: Ring, close = true) => {
  const pts = ring.map((p) => project(p).map(round) as unknown as Point);
  const deduped = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
  return "M" + deduped.map(([x, y]) => `${x} ${y}`).join("L") + (close ? "Z" : "");
};
const ringArea = (ring: Ring) => {
  const pts = ring.map((p) => albers(p));
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
};

// Waterlines: concentric offsets of the Florida coast, computed here (not with SVG
// masks) so the browser draws a few plain lines. Clipped where they would fall on
// neighboring land, so contours sit only on water.
const UNIT_KM = 6371 / scale; // km per map unit
const WATERLINE_UNITS = [30, 21, 13.5, 7]; // outermost first
const asGeoJSON = async (commands: string) =>
  Object.values(await mapshaper.applyCommands(`${commands} -o out.json format=geojson`))[0].toString();
const floridaShape = await asGeoJSON(
  `-i "${censusZip}" -filter 'STUSPS=="FL"' -simplify interval=450 keep-shapes -filter-islands min-area=1.5km2 -dissolve`,
);
const neighborShape = await asGeoJSON(`-i "${censusZip}" -filter '["AL","GA"].includes(STUSPS)' -dissolve`);
const waterlines: string[] = [];
for (const units of WATERLINE_UNITS) {
  const rings = await extract(
    `-i fl.json -buffer radius=${(units * UNIT_KM).toFixed(2)}km -erase nb.json -simplify interval=1200`,
    { "fl.json": floridaShape, "nb.json": neighborShape },
  );
  waterlines.push(rings.flatMap((poly) => poly.map((ring) => ringToPath(ring))).join(""));
}

// Mainland = the polygon with the largest outer ring. Everything else is an island.
const sorted = [...florida].sort((a, b) => ringArea(b[0]) - ringArea(a[0]));
const [mainland, ...islands] = sorted;

const mainlandOutline = ringToPath(mainland[0]);
const islandPaths = islands.map((poly) => ringToPath(poly[0])).join("");
const neighborPaths = neighbors.flatMap((poly) => poly.map((r) => ringToPath(r))).join("");
const internationalPaths = international.flatMap((poly) => poly.map((r) => ringToPath(r))).join("");

// Graticule: 1° meridians (straight, converging) and parallels (gentle arcs).
const graticule: string[] = [];
for (let lon = Math.ceil(FRAME.west); lon <= Math.floor(FRAME.east); lon++) {
  const line: Ring = [];
  for (let lat = FRAME.south - 1; lat <= FRAME.north + 1; lat += 0.5) line.push([lon, lat]);
  graticule.push(ringToPath(line, false));
}
for (let lat = Math.ceil(FRAME.south); lat <= Math.floor(FRAME.north); lat++) {
  const line: Ring = [];
  for (let lon = FRAME.west - 1; lon <= FRAME.east + 1; lon += 0.25) line.push([lon, lat]);
  graticule.push(ringToPath(line, false));
}

const header = `// GENERATED by scripts/build-florida-geometry.mts — do not edit by hand.
// Sources: U.S. Census Bureau cartographic boundaries (cb_2024_us_state_500k) and
// Natural Earth 1:10m Admin-0 countries. Both public domain. See docs/asset-sources.md.
`;

// Small file: safe to import from client components (labels, the brand mark).
const projectionOut = `${header}
import type { ViewTransform } from "@/lib/geo";

export const mapProjection = {
  width: ${VIEW_WIDTH},
  height: ${round(viewHeight)},
  frame: ${JSON.stringify(FRAME)},
  transform: ${JSON.stringify(transform)} satisfies ViewTransform,
} as const;
`;

// Large file: path data. Import only from server components.
const geometryOut = `${header}
export const floridaGeometry = {
  /** Florida mainland outer coastline + land border, a single subpath (draw-on friendly). */
  mainland: ${JSON.stringify(mainlandOutline)},
  /** Keys, barrier islands, and other Florida islands. */
  islands: ${JSON.stringify(islandPaths)},
  /** Faint context: Alabama, Georgia, Mississippi, South Carolina (clipped). */
  neighbors: ${JSON.stringify(neighborPaths)},
  /** Faint context: Cuba and The Bahamas. */
  international: ${JSON.stringify(internationalPaths)},
  /** 1° graticule in the Florida Albers projection. */
  graticule: ${JSON.stringify(graticule.join(""))},
  /** Concentric coastal waterlines, outermost first (precomputed buffers, water only). */
  waterlines: ${JSON.stringify(waterlines)},
} as const;
`;

const dir = (name: string) => fileURLToPath(new URL(`../content/florida/${name}`, import.meta.url));
writeFileSync(dir("projection.ts"), projectionOut);
writeFileSync(dir("geometry.ts"), geometryOut);
console.log(
  `Wrote content/florida/projection.ts and geometry.ts\n  viewBox 0 0 ${VIEW_WIDTH} ${round(viewHeight)}\n` +
    `  mainland ${mainlandOutline.length} chars, islands ${islands.length} (${islandPaths.length} chars), ` +
    `neighbors ${neighborPaths.length} chars, intl ${internationalPaths.length} chars`,
);
