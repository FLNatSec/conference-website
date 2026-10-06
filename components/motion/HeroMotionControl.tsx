"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Status = "playing" | "paused" | "done";

/**
 * Pause / replay control for the hero sequence, plus automatic pausing while
 * the hero is off-screen. The animation itself is pure CSS (florida-map.css);
 * this component only toggles data attributes on the nearest [data-hero-root]
 * and restarts CSS animations through the Web Animations API.
 *
 * Hidden when the user prefers reduced motion (there is nothing to control).
 */
export function HeroMotionControl({ className }: { className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("playing");
  const runId = useRef(0);

  const root = () => buttonRef.current?.closest<HTMLElement>("[data-hero-root]") ?? null;

  const watchCompletion = useCallback(() => {
    const el = root();
    if (!el) return;
    const id = ++runId.current;
    // Resolves asynchronously (immediately if nothing is animating, e.g. reduced motion).
    Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished))
      .then(() => {
        if (runId.current === id) setStatus("done");
      })
      .catch(() => {
        /* cancelled by a replay */
      });
  }, []);

  useEffect(() => {
    const el = root();
    if (!el) return;
    watchCompletion();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "true";
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [watchCompletion]);

  const onClick = () => {
    const el = root();
    if (!el) return;
    if (status === "playing") {
      el.dataset.paused = "true";
      setStatus("paused");
    } else if (status === "paused") {
      delete el.dataset.paused;
      setStatus("playing");
    } else {
      replayHero(el);
      setStatus("playing");
      watchCompletion();
    }
  };

  const label = status === "playing" ? "Pause motion" : status === "paused" ? "Play motion" : "Replay";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={cn(
        "type-label inline-flex items-center gap-2 rounded-full border border-bone/20 px-3 py-1.5 text-bone/70",
        "transition-colors duration-200 hover:border-bone/45 hover:text-bone motion-reduce:hidden",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex size-3 items-center justify-center">
        {status === "playing" ? <PauseIcon /> : status === "paused" ? <PlayIcon /> : <ReplayIcon />}
      </span>
      {label}
    </button>
  );
}

/** Restarts every CSS animation inside the hero from its first frame. */
export function replayHero(el: HTMLElement) {
  delete el.dataset.paused;
  for (const animation of el.getAnimations({ subtree: true })) {
    animation.cancel();
    animation.play();
  }
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor">
      <rect x="2" y="1.5" width="2.5" height="9" rx="0.5" />
      <rect x="7.5" y="1.5" width="2.5" height="9" rx="0.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor">
      <path d="M3 1.8v8.4a.5.5 0 0 0 .76.43l6.7-4.2a.5.5 0 0 0 0-.86l-6.7-4.2A.5.5 0 0 0 3 1.8z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.2 6a3.8 3.8 0 1 0 1.2-2.8" strokeLinecap="round" />
      <path d="M2.4 1.4v2.4h2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
