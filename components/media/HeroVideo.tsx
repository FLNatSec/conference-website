"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { VideoChapter, VideoSource } from "@/lib/types";
import { cn } from "@/lib/cn";

interface HeroVideoProps {
  desktop: VideoSource;
  mobile: VideoSource;
  chapters: VideoChapter[];
  credit: string;
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
 * reduced motion, Save-Data, or slow connections. Also renders the hero's
 * bottom strip: the synced chapter label, credit, and a pause control.
 */
export function HeroVideo({ desktop, mobile, chapters, credit }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [status, setStatus] = useState<Status>("poster");
  const [chapterIndex, setChapterIndex] = useState(0);

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

  const onTimeUpdate = () => {
    const t = videoRef.current?.currentTime ?? 0;
    let index = 0;
    chapters.forEach((c, i) => {
      if (t >= c.start) index = i;
    });
    if (index !== chapterIndex) setChapterIndex(index);
  };

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

  const chapter = chapters[chapterIndex];

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
        onTimeUpdate={chapters.length > 1 ? onTimeUpdate : undefined}
      />

      <div className="absolute inset-x-0 bottom-0 z-3">
        {/* Fixed height so the pause control appearing later never shifts layout. */}
        <Container className="flex h-16 items-center justify-between gap-4 border-t border-bone/15 text-bone/70">
          <p className="type-label flex min-w-0 items-center gap-3" aria-live="off">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight-300" />
            <span className="truncate">
              {chapter.label}
              
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <span className="type-label hidden text-bone/60 md:inline">{credit}</span>
            {status !== "poster" && (
              <button
                type="button"
                onClick={toggle}
                className="type-label inline-flex items-center gap-2 rounded-full border border-bone/25 px-3 py-1.5 text-bone/80 transition-colors hover:border-bone/60 hover:text-bone"
              >
                <span aria-hidden="true">{status === "playing" ? "❚❚" : "▶"}</span>
                {status === "playing" ? "Pause video" : "Play video"}
              </button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
