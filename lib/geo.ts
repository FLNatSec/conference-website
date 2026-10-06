/**
 * Map projection shared by the geometry build script and runtime node placement.
 *
 * Albers equal-area conic with Florida's statewide parameters
 * (EPSG:3086 "Florida GDL Albers": lat0 24°, lon0 −84°, parallels 24° / 31.5°),
 * computed on a sphere — accurate to well under a pixel at the sizes we render.
 *
 * Keep this file dependency-free: scripts/build-florida-geometry.ts imports it directly.
 */

export type LonLat = readonly [lon: number, lat: number];
export type Point = readonly [x: number, y: number];

const RAD = Math.PI / 180;
const PHI1 = 24 * RAD;
const PHI2 = 31.5 * RAD;
const PHI0 = 24 * RAD;
const LAMBDA0 = -84 * RAD;

const N = (Math.sin(PHI1) + Math.sin(PHI2)) / 2;
const C = Math.cos(PHI1) ** 2 + 2 * N * Math.sin(PHI1);
const RHO0 = Math.sqrt(C - 2 * N * Math.sin(PHI0)) / N;

/** Raw projection on a unit sphere. Returns x east, y north. */
export function albers([lon, lat]: LonLat): Point {
  const rho = Math.sqrt(C - 2 * N * Math.sin(lat * RAD)) / N;
  const theta = N * (lon * RAD - LAMBDA0);
  return [rho * Math.sin(theta), RHO0 - rho * Math.cos(theta)];
}

/** Linear fit from raw projected units into SVG viewBox units (y down). */
export interface ViewTransform {
  scale: number;
  tx: number;
  ty: number;
}

export function makeProjector({ scale, tx, ty }: ViewTransform) {
  return (lonLat: LonLat): Point => {
    const [x, y] = albers(lonLat);
    return [x * scale + tx, -y * scale + ty];
  };
}

/** Formats a coordinate pair as e.g. "29.65°N 82.32°W". */
export function formatCoordinates([lon, lat]: LonLat, digits = 2): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(digits)}°${ns} ${Math.abs(lon).toFixed(digits)}°${ew}`;
}
