/**
 * Map helpers bound to the committed Florida projection (small; client-safe): projection into the
 * geometry's viewBox, arcs between anchors, and smooth routes through waypoints.
 */
import { mapProjection } from "@/content/florida/projection";
import { makeProjector, type LonLat, type Point } from "@/lib/geo";

export const project = makeProjector(mapProjection.transform);

export const MAP_WIDTH = mapProjection.width;
export const MAP_HEIGHT = mapProjection.height;

const r = (n: number) => Math.round(n * 10) / 10;

/** Percent position within the map box — for HTML overlays (labels). */
export function toPercent([x, y]: Point): { left: string; top: string } {
  return { left: `${(x / MAP_WIDTH) * 100}%`, top: `${(y / MAP_HEIGHT) * 100}%` };
}

/** A gentle quadratic arc between two points; `bend` is a fraction of the chord length. */
export function arcPath(a: Point, b: Point, bend: number): string {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Perpendicular offset proportional to chord length.
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M${r(x1)} ${r(y1)}Q${r(cx)} ${r(cy)} ${r(x2)} ${r(y2)}`;
}

/** Smooth path through waypoints (Catmull–Rom converted to cubic Béziers). */
export function smoothPath(waypoints: readonly LonLat[]): string {
  const pts = waypoints.map(project);
  if (pts.length < 2) return "";
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}
