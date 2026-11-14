/**
 * "Save the date" calendar invites, built from the current edition so the
 * details live in one place (`invite` in content/editions). The invite covers
 * the main program day; its description names the full summit dates and
 * points to the site.
 *
 * Reminders: Apple Calendar keeps every alarm, Outlook usually keeps one, and
 * Google Calendar ignores alarms (its "add event" link cannot carry them).
 */
import { site } from "@/content/site";
import { formatDayLabel, formatEditionDates, getCurrentEdition } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import type { Edition } from "@/lib/types";

/** Public path of the .ics file (app/save-the-date.ics/route.ts). Stable: safe to link from emails. */
export const ICS_PATH = "/save-the-date.ics";

const DAY_MS = 86_400_000;

/** "2026-11-14T02:36:04.123Z" → "20261114T023604Z" */
const icsStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Minutes the timezone is ahead of UTC at a given instant (e.g. -240 for EDT). */
function offsetMinutes(at: Date, timeZone: string) {
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
      .formatToParts(at)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
}

/** A local wall-clock time in an IANA timezone, as a UTC iCalendar stamp. */
function utcStamp(date: string, time: string, timeZone: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const asUtc = Date.UTC(y, m - 1, d, hh, mm);
  return icsStamp(new Date(asUtc - offsetMinutes(new Date(asUtc), timeZone) * 60_000));
}

/** Days between a date and the same day `months` earlier (e.g. Mar 26 → Jan 26 is 59). */
function daysInMonthsBefore(date: string, months: number) {
  const [y, m, d] = date.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, m - 1 - months, d)) / DAY_MS);
}

export function getSummitEvent(edition: Edition = getCurrentEdition()) {
  const { invite, timezone } = edition;
  const url = new URL("/", siteUrl).toString();
  const location = `${edition.city}, ${edition.state}`;
  return {
    uid: `summit-${edition.year}@${siteUrl.hostname}`,
    title: site.name,
    location,
    url,
    start: utcStamp(invite.date, invite.start, timezone),
    end: utcStamp(invite.date, invite.end, timezone),
    timezone,
    description: `Save the date for the ${edition.number === 1 ? "inaugural " : ""}${site.name}, ${formatEditionDates(edition)}, in ${location}. This invite covers the main program on ${formatDayLabel(invite.date, ", ")}. Speakers, program, and updates: ${url}`,
    reminders: invite.remindMonthsBefore.map((months) => ({
      days: daysInMonthsBefore(invite.date, months),
      label: `${site.name} is ${months === 1 ? "one month" : `${months} months`} away`,
    })),
  };
}

/** Prefilled "add event" link for Google Calendar. */
export function googleCalendarHref() {
  const event = getSummitEvent();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.start}/${event.end}`,
    ctz: event.timezone,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/* ---------- iCalendar (RFC 5545) ---------- */

const escapeText = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Fold content lines at 75 octets; continuation lines start with a space. */
function fold(line: string) {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    const limit = lines.length === 0 ? 75 : 74;
    if (bytes + size > limit) {
      lines.push(current);
      current = "";
      bytes = 0;
    }
    current += char;
    bytes += size;
  }
  lines.push(current);
  return lines.join("\r\n ");
}

/** The .ics file served at ICS_PATH (Apple Calendar, Outlook, and most other apps). */
export function summitIcs(now = new Date()) {
  const event = getSummitEvent();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Save the Date//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${icsStamp(now)}`,
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `URL:${event.url}`,
    // A save-the-date shouldn't mark the day busy before anyone registers.
    "TRANSP:TRANSPARENT",
    "X-MICROSOFT-CDO-BUSYSTATUS:FREE",
    ...event.reminders.flatMap((reminder) => [
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(reminder.label)}`,
      `TRIGGER:-P${reminder.days}D`,
      "END:VALARM",
    ]),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function icsFilename(edition: Edition = getCurrentEdition()) {
  return `florida-national-security-summit-${edition.year}.ics`;
}
