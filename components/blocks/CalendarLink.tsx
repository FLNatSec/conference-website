"use client";

import type { ComponentPropsWithoutRef } from "react";

/** iPhone, iPad (including iPadOS, which reports as a Mac), and Android. */
function isMobileDevice() {
  const ua = navigator.userAgent;
  return /android|iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * A calendar link with a separate URL for phones and tablets (Outlook on the
 * web needs a different link there). The desktop URL is the default, so the
 * link works before JavaScript loads; on mobile it is swapped at click time.
 */
export function CalendarLink({ mobileHref, ...props }: ComponentPropsWithoutRef<"a"> & { mobileHref: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (isMobileDevice()) event.currentTarget.href = mobileHref;
      }}
    />
  );
}
