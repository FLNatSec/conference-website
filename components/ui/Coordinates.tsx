import { formatCoordinates, type LonLat } from "@/lib/geo";
import { cn } from "@/lib/cn";

/** Coordinates in the mono annotation style, e.g. "29.65°N 82.32°W". */
export function Coordinates({ value, className }: { value: LonLat; className?: string }) {
  return <span className={cn("type-label tabular-nums", className)}>{formatCoordinates(value)}</span>;
}
