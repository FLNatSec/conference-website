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
  venue: { name: "J. Wayne Reitz Union", campus: "University of Florida" },
  admission: {
    label: "Free and open to all",
    detail: "The summit is free to attend and open to everyone.",
    registrationOpens: "2027-01-11",
  },

  // Day-by-day outline from the planning overview and sponsorship tiers (Nov 2026).
  // Shown on /experience. No times, rooms, session titles, or speakers.
  format: [
    {
      date: "2027-03-25",
      span: "Afternoon and evening",
      elements: ["Career workshops", "University lab tours", "VIP dinner for speakers and sponsors"],
    },
    {
      date: "2027-03-26",
      span: "Full day",
      elements: [
        "Keynotes, panels, and fireside conversations",
        "Innovation Expo, all day",
        "Networking breakfast and lunch",
        "Pitch competition (to be confirmed)",
        "Evening reception and happy hour",
      ],
    },
  ],

  // Detailed program: hours from the sponsorship prospectus, sessions from the Summit Long Overview (Nov 2026).
  // The order of sessions within a day is provisional. Shown only on /program,
  // which is hidden while features.programPage is off. Add `start`/`end` ("HH:MM") and
  // `location` to a session once set; add `speakerIds` once speakers are confirmed.
  program: [
    {
      date: "2027-03-25",
      start: "12:00",
      end: "16:00",
      sessions: [
        {
          id: "workshops",
          kind: "workshop",
          title: "Student workshops",
          start: "12:00",
          end: "16:00",
          description: "Eight one-hour workshops in two rooms.",
          link: { label: "See the full workshop schedule", href: "#workshops" },
        },
        { id: "lab-tours", kind: "tour", title: "University lab tours" },
        {
          id: "vip-dinner",
          kind: "meal",
          title: "VIP dinner",
          description: "An evening dinner for speakers and sponsors.",
          note: "Invitation only",
        },
      ],
    },
    {
      date: "2027-03-26",
      start: "07:30",
      end: "17:00",
      sessions: [
        { id: "breakfast", kind: "meal", title: "Networking breakfast" },
        {
          id: "opening-keynote",
          kind: "keynote",
          title: "Florida as a Strategic National Asset",
          note: "Opening",
          description:
            "How Florida’s military commands, space infrastructure, industry, research institutions, and investment ecosystem can contribute more effectively to national priorities.",
        },
        {
          id: "panel-innovation",
          kind: "panel",
          title: "Defense Innovation, Acquisition & Capital",
          tentative: true,
          description: "How promising technologies move from prototype to sustained operational capability.",
        },
        {
          id: "panel-ai",
          kind: "panel",
          title: "AI, Autonomous Warfare & the Future Fight",
          tentative: true,
          description: "How AI, autonomous vehicles, and uncrewed systems are transforming military operations.",
        },
        { id: "lunch", kind: "meal", title: "Networking lunch" },
        {
          id: "panel-industrial-base",
          kind: "panel",
          title: "Defense Industrial Base, Manufacturing & Supply Chains",
          tentative: true,
          description: "Whether America can manufacture, sustain, and replenish critical capabilities during prolonged conflict.",
        },
        {
          id: "panel-space",
          kind: "panel",
          title: "Space Security & the Commercial Space Ecosystem",
          tentative: true,
          description:
            "How commercial innovation is changing American space power, and how government and industry can strengthen resilience in a contested domain.",
        },
        { id: "pitch", kind: "competition", title: "Pitch competition", note: "To be confirmed" },
        {
          id: "closing-keynote",
          kind: "keynote",
          title: "What Makes a Nation Strong? Resilience, Innovation & America’s Future",
          note: "Closing",
          description: "What American history can teach us about the foundations of national strength, and what to build for the next generation.",
        },
        {
          id: "expo",
          kind: "expo",
          title: "Innovation Expo",
          description: "Exhibit and demo tables from companies, design teams, researchers, and startups.",
          note: "Open all day",
        },
        { id: "reception", kind: "social", title: "Evening reception and happy hour" },
      ],
    },
  ],

  // Thursday workshops: 2 rooms x 4 one-hour slots = 8 workshops. Shown only on /program.
  // Rename the rooms once they are booked (each workshop's `room` must match exactly).
  // A slot without an entry in `sessions` shows "To be announced". Example entry:
  //   {
  //     id: "licensure",
  //     title: "Workshop title",
  //     start: "12:00",
  //     room: "Room A",
  //     host: "Jane Doe",
  //     hostUrl: "https://example.edu/jane-doe",
  //     hostDetail: "Example Society",
  //     description: "One or two sentences on what students will do.",
  //     audience: "Engineering students",
  //     sponsor: "Example Company",
  //   },
  workshops: {
    date: "2027-03-25",
    rooms: ["Room A", "Room B"],
    slots: [
      { start: "12:00", end: "13:00" },
      { start: "13:00", end: "14:00" },
      { start: "14:00", end: "15:00" },
      { start: "15:00", end: "16:00" },
    ],
    sessions: [
      {
        // Proposed by Emily Monroe 11/11 and agreed in principle; slot and room not yet confirmed with her.
        id: "nspe-licensure",
        title: "Engineering Licensure: The FE and PE Exams",
        start: "12:00",
        room: "Room A",
        host: "Emily Monroe, P.E.",
        hostUrl: "https://engineering.dartmouth.edu/community/faculty/emily-monroe",
        hostDetail: "with the National Society of Professional Engineers",
        description:
          "An introduction to the FE and PE exams and the path to engineering licensure, with practice problems.",
        audience: "Engineering students",
      },
    ],
  },

  // Confirmed sponsors: { orgId, tierId }. Add the organization to content/organizations.ts first.
  sponsors: [],

  // "Save the date" invite (lib/calendar.ts): an all-day event across startDate–endDate,
  // with reminders the given months before the first day, at reminderTime (local).
  invite: { remindMonthsBefore: [2, 1], reminderTime: "09:00" },

  // roleLabel: null = public wording not yet confirmed; hidden from public surfaces.
  orgRoles: [
    { orgId: "uf-national-security-club", roleLabel: "Organized by" },
    { orgId: "engineering-innovation-institute", roleLabel: "Partners" },
    { orgId: "uf-ieee", roleLabel: "Partners" },
  ],
} satisfies Edition;
