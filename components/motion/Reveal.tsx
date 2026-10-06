"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

/**
 * Fades and rises its content in once when scrolled into view. Children with
 * the `reveal-rule` class (e.g. <Rule draw />) draw in as well. Styles live in
 * globals.css and are disabled under prefers-reduced-motion. Without JS the
 * content is simply visible.
 */
export function Reveal({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content already in view at load stays put — no flash.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={state === "idle" ? undefined : state} {...props}>
      {children}
    </div>
  );
}
