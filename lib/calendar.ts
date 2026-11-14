/**
 * "Save the date" calendar invites, built from the current edition so the
 * details live in one place (content/editions). The .ics file holds two events:
 *   1. the main program day (`invite`: e.g. Friday 8 AM–5 PM) with reminders, and
 *   2. an all-day banner across the summit dates (startDate–endDate).
 * The main day comes first, for apps that read only the first event.
 * Google's "add event" link holds one event, so it adds the main day.
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

/** "2027-03-25" → "20270325" */
const compact = (iso: string) => iso.replaceAll("-", "");

/** ISO date plus n days (UTC, no timezone drift). */
function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** "08:00" → "8 AM", "17:30" → "5:30 PM" */
function formatTime(time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const hour = hh % 12 || 12;
  return `${hour}${mm ? `:${String(mm).padStart(2, "0")}` : ""} ${hh < 12 ? "AM" : "PM"}`;
}

/** Short timezone name on a date, e.g. "EDT". */
function zoneName(date: string, timeZone: string) {
  const [y, m, d] = date.split("-").map(Number);
  return (
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(new Date(Date.UTC(y, m - 1, d, 12)))
      .find((part) => part.type === "timeZoneName")?.value ?? ""
  );
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
  const hours = `${formatTime(invite.start)}–${formatTime(invite.end)} ${zoneName(invite.date, timezone)}`;
  return {
    uid: `summit-${edition.year}`,
    title: site.name,
    location,
    url,
    timezone,
    description: `Save the date for the ${edition.number === 1 ? "inaugural " : ""}${site.name}, ${formatEditionDates(edition)}, in ${location}. The main program runs ${formatDayLabel(invite.date, ", ")}, ${hours}. Speakers, program, and updates: ${url}`,
    /** The main program day, as UTC stamps. */
    main: {
      start: utcStamp(invite.date, invite.start, timezone),
      end: utcStamp(invite.date, invite.end, timezone),
    },
    /** All-day range across the summit; calendar end dates are exclusive. */
    days: { start: compact(edition.startDate), end: compact(addDays(edition.endDate, 1)) },
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
    dates: `${event.main.start}/${event.main.end}`,
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
  const shared = (uid: string) => [
    `UID:${event.uid}-${uid}@${siteUrl.hostname}`,
    `DTSTAMP:${icsStamp(now)}`,
    `LOCATION:${escapeText(event.location)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `URL:${event.url}`,
    // A save-the-date shouldn't mark time busy before anyone registers.
    "TRANSP:TRANSPARENT",
    "X-MICROSOFT-CDO-BUSYSTATUS:FREE",
  ];
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Save the Date//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    // 1. Main program day, with reminders.
    "BEGIN:VEVENT",
    ...shared("main"),
    `DTSTART:${event.main.start}`,
    `DTEND:${event.main.end}`,
    `SUMMARY:${escapeText(`${event.title}: Main program`)}`,
    ...event.reminders.flatMap((reminder) => [
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(reminder.label)}`,
      `TRIGGER:-P${reminder.days}D`,
      "END:VALARM",
    ]),
    "END:VEVENT",
    // 2. All-day banner across the summit dates.
    "BEGIN:VEVENT",
    ...shared("days"),
    `DTSTART;VALUE=DATE:${event.days.start}`,
    `DTEND;VALUE=DATE:${event.days.end}`,
    `SUMMARY:${escapeText(event.title)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function icsFilename(edition: Edition = getCurrentEdition()) {
  return `florida-national-security-summit-${edition.year}.ics`;
}
