"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

/**
 * Site header. Transparent over the dark hero; condenses to a solid ink bar
 * once the page scrolls. Navigation and CTA come from content/site.ts.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-bone transition-[background-color,border-color,backdrop-filter] duration-300",
        "border-b",
        scrolled ? "border-bone/10 bg-ink/88 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-site items-center justify-between gap-6 px-gutter transition-[height] duration-300",
          scrolled ? "h-16" : "h-18 md:h-22",
        )}
      >
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="relative text-[0.88rem] text-bone/75 transition-colors duration-200 hover:text-bone aria-[current=page]:text-bone aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-2 aria-[current=page]:after:h-px aria-[current=page]:after:bg-highlight-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ButtonLink href={site.ctas.primary.href} size="small">
              {site.ctas.primary.label}
            </ButtonLink>
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
