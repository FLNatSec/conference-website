"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { VideoChapter, VideoSource } from "@/lib/types";
import { cn } from "@/lib/cn";

interface HeroVideoProps {
  desktop: VideoSource;
  mobile: VideoSource;
  /** Not shown on the page (kept in content for the lab). Footage credits live in docs/asset-sources.md. */
  chapters?: VideoChapter[];
  credit?: string;
}

type Status = "poster" | "playing" | "paused";

const SMALL_SCREEN = "(max-width: 47.99rem)";

/** Whether to skip video entirely and keep the poster (motion, data, or connection constraints). */
function shouldSkipVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType && /(^|-)2g|3g/.test(connection.effectiveType)) return true;
  return false;
}

/**
 * Background video for the homepage hero, layered over a server-rendered poster
 * (the poster is the first paint and LCP). The video source is attached only
 * after the page has loaded, picked per screen size, and skipped entirely under
 * reduced motion, Save-Data, or slow connections. Also renders a small
 * icon-only pause/play control (WCAG 2.2.2: moving content can be paused).
 */
export function HeroVideo({ desktop, mobile }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [status, setStatus] = useState<Status>("poster");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const start = () => {
      if (cancelled || shouldSkipVideo()) return;
      const source = window.matchMedia(SMALL_SCREEN).matches ? mobile : desktop;
      video.src = source.src;
      video.play().catch(() => {
        /* Autoplay blocked: the poster stays, which is a complete design on its own. */
      });
    };

    // Let the poster and text win the first paint; fetch video afterwards.
    if (document.readyState === "complete") setTimeout(start, 200);
    else window.addEventListener("load", () => setTimeout(start, 200), { once: true });

    // Pause while off-screen; resume on return unless the viewer paused it.
    const section = video.closest("[data-hero-root]");
    const observer = new IntersectionObserver(([entry]) => {
      if (!video.src || userPaused.current) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    if (section) observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [desktop, mobile]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 z-1 h-full w-full object-cover transition-opacity duration-1000 ease-(--ease-precise)",
          status === "poster" ? "opacity-0" : "opacity-100",
        )}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "poster" ? s : "paused"))}
      />

      {status !== "poster" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-3">
          <Container className="flex justify-end pb-5 md:pb-6">
            <button
              type="button"
              onClick={toggle}
              aria-label={status === "playing" ? "Pause background video" : "Play background video"}
              className="pointer-events-auto inline-flex size-8 items-center justify-center rounded-full border border-bone/20 text-[0.6rem] text-bone/60 transition-colors hover:border-bone/50 hover:text-bone"
            >
              <span aria-hidden="true">{status === "playing" ? "❚❚" : "▶"}</span>
            </button>
          </Container>
        </div>
      )}
    </>
  );
}
