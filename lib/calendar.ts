/**
 * "Save the date" calendar invites, built from the current edition so the
 * details live in one place (content/editions). The invite is one all-day
 * event across the summit dates, so it shows in the calendar's all-day banner.
 *
 * Reminders: only the .ics file can carry them. Apple Calendar keeps every
 * reminder and Outlook usually keeps one. The Google and Outlook web links
 * cannot include reminders; those calendars apply the person's own defaults.
 */
import { site } from "@/content/site";
import { formatEditionDates, formatLocation, getCurrentEdition } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import type { Edition } from "@/lib/types";

/** Public path of the .ics file (app/save-the-date.ics/route.ts). Stable: safe to link from emails. */
export const ICS_PATH = "/save-the-date.ics";

const DAY_MS = 86_400_000;

/** "2026-11-14T02:36:04.123Z" → "20261114T023604Z" */
const icsStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** "2027-03-25" → "20270325" */
const compact = (iso: string) => iso.replaceAll("-", "");

/** ISO date plus n days (UTC, no timezone drift). */
function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Days between a date and the same day `months` earlier (e.g. Mar 25 → Jan 25 is 59). */
function daysInMonthsBefore(date: string, months: number) {
  const [y, m, d] = date.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y, m - 1 - months, d)) / DAY_MS);
}

/**
 * iCalendar trigger for a reminder `days` before an all-day event, at a local
 * time of day. Triggers count back from midnight, so 59 days at 09:00 is "-P58DT15H".
 */
function reminderTrigger(days: number, time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const minutes = days * 24 * 60 - (hh * 60 + mm);
  const d = Math.floor(minutes / (24 * 60));
  const h = Math.floor((minutes % (24 * 60)) / 60);
  const min = minutes % 60;
  const clock = h || min ? `T${h ? `${h}H` : ""}${min ? `${min}M` : ""}` : "";
  return `-P${d}D${clock}`;
}

export function getSummitEvent(edition: Edition = getCurrentEdition()) {
  const url = new URL("/", siteUrl).toString();
  const location = formatLocation(edition);
  return {
    uid: `summit-${edition.year}@${siteUrl.hostname}`,
    title: site.name,
    location,
    url,
    description: `Save the date for the ${edition.number === 1 ? "inaugural " : ""}${site.name}, ${formatEditionDates(edition)}, ${location}. Speakers, program, and updates: ${url}`,
    startDate: edition.startDate,
    endDate: edition.endDate,
    /** Calendar end dates for all-day events are exclusive: the day after the last day. */
    endExclusive: addDays(edition.endDate, 1),
    reminders: edition.invite.remindMonthsBefore.map((months) => ({
      trigger: reminderTrigger(daysInMonthsBefore(edition.startDate, months), edition.invite.reminderTime),
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
    dates: `${compact(event.startDate)}/${compact(event.endExclusive)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/**
 * Prefilled "new event" links for Outlook on the web: `work` is Microsoft 365
 * (work or school accounts), `personal` is Outlook.com. Outlook's desktop and
 * mobile pages read the end date differently, so there are two versions:
 * the client picks `mobile` on phones and tablets (components/blocks/CalendarLink.tsx).
 */
export function outlookHrefs(account: "work" | "personal") {
  const event = getSummitEvent();
  const origin = account === "work" ? "https://outlook.office.com" : "https://outlook.live.com";
  // Spaces as %20, not "+": Outlook shows "+" literally.
  const query = (end: string) =>
    Object.entries({
      rru: "addevent",
      startdt: event.startDate,
      enddt: end,
      allday: "true",
      subject: event.title,
      location: event.location,
      body: event.description,
    })
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  return {
    // Desktop: end date is exclusive.
    desktop: `${origin}/calendar/action/compose?${query(event.endExclusive)}`,
    // Mobile: end date is the last day.
    mobile: `${origin}/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&${query(event.endDate)}`,
  };
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

/** The .ics file served at ICS_PATH (Apple Calendar, Outlook desktop, and most other apps). */
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
    `DTSTART;VALUE=DATE:${compact(event.startDate)}`,
    `DTEND;VALUE=DATE:${compact(event.endExclusive)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `URL:${event.url}`,
    // A save-the-date shouldn't mark the days busy before anyone registers.
    "TRANSP:TRANSPARENT",
    "X-MICROSOFT-CDO-BUSYSTATUS:FREE",
    ...event.reminders.flatMap((reminder) => [
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(reminder.label)}`,
      `TRIGGER:${reminder.trigger}`,
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
