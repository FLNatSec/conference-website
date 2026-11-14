import { buttonClasses } from "@/components/ui/Button";
import { googleCalendarHref, ICS_PATH } from "@/lib/calendar";
import { cn } from "@/lib/cn";
import "./save-the-date.css";

interface SaveTheDateProps {
  /** Unique on the page: names the menu and its anchor. */
  id: string;
  /** `inline` sits in a line of mono text (homepage hero); `button` is a secondary button. */
  variant?: "inline" | "button";
  className?: string;
}

/**
 * "Save the date": a small menu of calendar options for the summit dates.
 * Built on the native popover API (no client JavaScript): opens on click,
 * closes on Escape or an outside click. Where CSS anchor positioning is
 * supported the menu drops below the button; elsewhere it centers on screen.
 * Designed for navy surfaces.
 */
export function SaveTheDate({ id, variant = "button", className }: SaveTheDateProps) {
  const menuId = `${id}-calendar-menu`;
  const anchor = `--${id}-calendar`;
  const item = "block px-3 py-2.5 text-[0.98rem] text-bone transition-colors hover:bg-bone/8 focus-visible:bg-bone/8";

  return (
    <>
      <button
        type="button"
        popoverTarget={menuId}
        style={{ anchorName: anchor }}
        className={cn(
          variant === "inline"
            ? "inline-flex items-center gap-2 border-b border-bone/40 pb-0.5 font-mono text-[0.82rem] tracking-[0.14em] text-bone uppercase transition-colors hover:border-bone"
            : buttonClasses({ variant: "secondary" }),
          className,
        )}
      >
        <CalendarIcon />
        Save the date
      </button>
      <div
        id={menuId}
        popover="auto"
        style={{ positionAnchor: anchor }}
        className="std-menu min-w-60 border border-bone/20 bg-ink-2 p-1.5 font-sans tracking-normal text-bone normal-case shadow-2xl shadow-ink-deep/60"
      >
        <p className="type-label px-3 pt-2 pb-1.5 text-bone/60">Add to your calendar</p>
        <ul>
          <li>
            <a href={googleCalendarHref()} target="_blank" rel="noopener noreferrer" className={item}>
              Google Calendar
            </a>
          </li>
          <li>
            <a href={ICS_PATH} className={item}>
              Apple Calendar
            </a>
          </li>
          <li>
            <a href={ICS_PATH} className={item}>
              Outlook
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="3" width="12" height="11" />
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3" strokeLinecap="square" />
    </svg>
  );
}
