import type { Edition } from "@/lib/types";

export const edition2027 = {
  year: 2027,
  number: 1,
  label: "Inaugural Summit",
  stage: "awareness",
  startDate: "2027-03-26",
  endDate: "2027-03-27",
  timezone: "America/New_York",
  city: "Gainesville",
  state: "Florida",
  coordinates: [-82.3248, 29.6516],

  // Preliminary, high-level format. No times, rooms, session titles, or speakers.
  format: [
    {
      date: "2027-03-26",
      theme: "Connect",
      elements: [
        "Tours",
        "Workshops",
        "Career and recruiting programming",
        "Innovation programming",
        "Opening reception",
      ],
    },
    {
      date: "2027-03-27",
      theme: "Convene",
      elements: [
        "Keynote",
        "Expert panels",
        "Networking",
        "Innovation expo",
        "Pitch competition",
        "Closing reception",
      ],
    },
  ],

  // roleLabel: null = public wording not yet confirmed; hidden from public surfaces.
  orgRoles: [
    { orgId: "florida-national-security-club", roleLabel: "Organized by" },
    { orgId: "engineering-innovation-institute", roleLabel: null },
    { orgId: "uf-ieee", roleLabel: null },
  ],
} satisfies Edition;
