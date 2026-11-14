import type { Edition } from "@/lib/types";

export const edition2027 = {
  year: 2027,
  number: 1,
  label: "Inaugural Summit",
  stage: "awareness",
  startDate: "2027-03-25",
  endDate: "2027-03-26",
  datesTentative: false,
  timezone: "America/New_York",
  city: "Gainesville",
  state: "Florida",
  coordinates: [-82.3248, 29.6516],

  // Day-by-day outline from the planning overview and sponsorship tiers (Nov 2026).
  // Shown on /experience. No times, rooms, session titles, or speakers.
  format: [
    {
      date: "2027-03-25",
      theme: "Connect",
      span: "Afternoon and evening",
      elements: ["Career workshops", "University lab tours", "VIP dinner for speakers and sponsors"],
    },
    {
      date: "2027-03-26",
      theme: "Convene",
      span: "Full day",
      elements: [
        "Networking breakfast",
        "Opening keynote",
        "Panels and fireside conversations",
        "Innovation Expo, all day",
        "Networking lunch",
        "Pitch competition",
        "Closing conversation",
        "Evening reception and happy hour",
      ],
    },
  ],

  // "Save the date" calendar invite (lib/calendar.ts): the main program day, in local time.
  invite: { date: "2027-03-26", start: "08:00", end: "17:00", remindMonthsBefore: [2, 1] },

  // roleLabel: null = public wording not yet confirmed; hidden from public surfaces.
  orgRoles: [
    { orgId: "uf-national-security-club", roleLabel: "Organized by" },
    { orgId: "engineering-innovation-institute", roleLabel: "Partners" },
    { orgId: "uf-ieee", roleLabel: "Partners" },
  ],
} satisfies Edition;
