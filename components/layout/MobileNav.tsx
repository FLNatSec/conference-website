"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { formatDateRange, getCurrentEdition } from "@/lib/content";

const edition = getCurrentEdition();

/**
 * Full-screen navigation sheet for small and medium screens.
 * Focus is trapped inside while open; Escape closes and returns focus.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const trigger = triggerRef.current;
    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="type-label inline-flex h-10 items-center gap-2.5 border border-bone/25 px-3.5 text-bone/85 transition-colors hover:border-bone/60 lg:hidden"
      >
        Menu
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M1 5h14M1 11h14" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-nav"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-ink text-bone"
          >
            <div className="flex h-18 items-center justify-between px-gutter">
              <Link href="/" onClick={close} aria-label={`${site.name} — home`}>
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={close}
                className="type-label inline-flex h-10 items-center gap-2.5 border border-bone/25 px-3.5 text-bone/85"
              >
                Close
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <nav aria-label="Primary" className="flex-1 px-gutter pt-10">
              <ul className="border-t border-bone/12">
                {site.nav.map((item, i) => (
                  <li key={item.href} className="border-b border-bone/12">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-5 font-display text-[1.9rem] font-medium tracking-tight"
                    >
                      {item.label}
                      <span className="type-label text-bone/60">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3">
                <ButtonLink href={site.ctas.primary.href} onClick={close} arrow>
                  {site.ctas.primary.label}
                </ButtonLink>
                <ButtonLink href={site.ctas.secondary.href} onClick={close} variant="secondary">
                  {site.ctas.secondary.label}
                </ButtonLink>
              </div>
            </nav>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-bone/12 px-gutter py-6 text-bone/55">
              <span className="type-label">
                {edition.label} · {formatDateRange(edition.startDate, edition.endDate)}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
