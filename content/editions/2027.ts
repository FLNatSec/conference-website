import type { Edition } from "@/lib/types";

export const edition2027 = {
  year: 2027,
  number: 1,
  label: "Inaugural Summit",
  stage: "awareness",
  startDate: "2027-03-25",
  endDate: "2027-03-27",
  datesTentative: false,
  timezone: "America/New_York",
  city: "Gainesville",
  state: "Florida",
  coordinates: [-82.3248, 29.6516],

  // Preliminary outline from the planning overview. Hidden while
  // features.detailedProgram is off. No times, rooms, session titles, or speakers.
  format: [
    {
      date: "2027-03-25",
      theme: "Connect",
      elements: ["University, lab, and facility tours", "Career workshops", "Evening reception"],
    },
    {
      date: "2027-03-26",
      theme: "Convene",
      elements: [
        "Opening keynote",
        "Panels and fireside conversations",
        "Networking lunch",
        "Innovation expo",
        "Pitch competition",
        "Evening reception",
      ],
    },
    {
      date: "2027-03-27",
      theme: "Engage",
      elements: ["Informal networking"],
    },
  ],

  // roleLabel: null = public wording not yet confirmed; hidden from public surfaces.
  orgRoles: [
    { orgId: "uf-national-security-club", roleLabel: "Organized by" },
    { orgId: "engineering-innovation-institute", roleLabel: "Partners" },
    { orgId: "uf-ieee", roleLabel: "Partners" },
  ],
} satisfies Edition;
