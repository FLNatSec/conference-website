import type { HeroVideoConfig } from "@/lib/types";
import posterDesktop from "@/public/media/hero/hero-poster-desktop.jpg";
import posterMobile from "@/public/media/hero/hero-poster-mobile.jpg";

/**
 * Homepage hero footage. Encodes live in public/media/hero/ (recipe and the AI
 * shot brief: docs/video-brief.md; sources and licenses: docs/asset-sources.md).
 *
 * CURRENT (~29 s): NASA Artemis I launch (pad → ignition → ascent), then U.S.
 * DoD footage from DVIDS: USCGC Eagle under sail, a bomber formation over the
 * coast, and sunset from a ship's bridge. Graded navy → ice. Sources:
 * docs/asset-sources.md. Recipe: docs/video-brief.md.
 */
export const heroVideo = {
  desktop: { src: "/media/hero/hero-desktop.mp4", width: 1920, height: 1080 },
  mobile: { src: "/media/hero/hero-mobile.mp4", width: 720, height: 1280 },
  posterDesktop,
  posterMobile,
  posterAlt: "",
  credit: "Footage: NASA · U.S. DoD (DVIDS)",

  // On-screen chapter labels, synced to the loop (seconds from loop start).
  chapters: [
    { start: 0, label: "Space Coast", coordinates: [-80.62, 28.63] },
    // DVIDS clips: filming locations not yet verified, so themes rather than places.
    { start: 14.2, label: "Maritime" },
    { start: 19.2, label: "Air" },
    { start: 24.7, label: "Operations" },
  ],
} satisfies HeroVideoConfig;
