import { useId } from "react";
import { cn } from "@/lib/cn";

/*
 * PROVISIONAL logo mark: Florida's silhouette (simplified from U.S. Census
 * boundaries) with a star knocked out of the peninsula — Florida + national.
 * Colors follow currentColor; the star is transparent, so it works on any surface.
 */

export const FLORIDA_SILHOUETTE = "M35.2 9.7L24.7 9.7L17.3 9.6L4.5 9.2L4.0 11.0L5.2 12.7L6.6 13.7L6.1 15.7L6.3 17.4L5.2 19.1L14.5 17.8L18.9 18.2L23.9 20.0L30.3 24.4L31.5 26.3L31.3 27.9L36.5 27.3L40.7 24.8L43.0 25.0L43.1 23.1L44.3 22.4L46.8 22.2L50.9 24.7L52.6 27.4L54.2 28.4L54.4 30.1L56.5 31.6L57.2 33.3L59.2 35.0L61.2 35.2L62.9 38.7L62.3 39.8L63.4 41.9L63.2 45.2L62.5 46.7L61.8 51.1L61.1 52.8L62.5 55.3L63.7 55.3L64.3 53.7L63.2 51.1L66.4 52.6L66.7 53.6L65.2 55.3L63.7 57.8L62.9 58.3L65.2 61.9L66.2 64.2L68.7 68.3L69.9 67.9L70.6 71.8L71.7 71.4L73.4 73.5L74.3 77.5L75.8 80.8L76.4 80.0L79.2 81.7L80.8 83.0L83.0 87.8L82.4 89.4L83.6 90.8L88.1 90.1L91.3 89.3L92.1 90.7L93.9 87.4L92.7 85.7L93.9 82.1L95.3 80.8L95.3 77.0L96.0 69.9L96.0 67.2L95.1 64.1L92.9 59.0L91.2 54.2L89.3 50.5L88.5 48.0L88.5 45.1L89.2 44.3L88.6 42.6L86.9 40.3L83.7 35.0L81.2 29.4L79.3 23.7L77.6 16.0L77.5 13.5L74.2 13.0L71.3 12.1L70.4 13.0L70.7 15.2L70.4 18.4L68.9 18.5L68.3 15.6L57.4 14.9L46.4 14.3L36.8 13.7L35.2 9.7Z";
export const MARK_STAR = "M71.50 42.50L73.60 48.11L79.58 48.37L74.90 52.10L76.50 57.88L71.50 54.57L66.50 57.88L68.10 52.10L63.42 48.37L69.40 48.11Z";

export function Mark({ className, title }: { className?: string; title?: string }) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <mask id={maskId}>
          <path d={FLORIDA_SILHOUETTE} fill="white" />
          <path d={MARK_STAR} fill="black" />
        </mask>
      </defs>
      <rect width="100" height="100" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
