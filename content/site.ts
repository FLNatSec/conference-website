import type { SiteConfig } from "@/lib/types";

const email = "flnatsecsummit@gmail.com";

export const site = {
  name: "Florida National Security Summit",

  // PROVISIONAL lines — neither is locked yet.
  supportingLine: "Uniting strategy, technology, and talent.",
  tagline: "The State of National Security",

  description:
    "A student-led summit connecting Florida's national-security ecosystem — government, military, industry, investors, universities, and students — with leaders and ideas from across the country. Inaugural summit: March 26–27, 2027, Gainesville, Florida.",

  nav: [
    { label: "About", href: "/about" },
    { label: "Why Florida", href: "/why-florida" },
    { label: "Program", href: "/program" },
    { label: "Innovation", href: "/innovation" },
    { label: "Partners", href: "/partners" },
  ],

  ctas: {
    primary: { label: "Join the mailing list", href: "/#join" },
    secondary: { label: "Why Florida", href: "/why-florida" },
  },

  contact: { email },

  social: { linkedin: "https://www.linkedin.com/showcase/florida-national-security-summit/" },

  mailingList: {
    // Interim: a pre-addressed email until a mailing provider is chosen.
    href: `mailto:${email}?subject=${encodeURIComponent("Join the mailing list")}&body=${encodeURIComponent(
      "Please add me to the Florida National Security Summit mailing list.\n\nName:\nOrganization:\nRole (student, government/military, industry, investor, academia, media):",
    )}`,
    benefits: [
      "Speaker announcements",
      "Registration updates",
      "Program releases",
      "Innovation opportunities",
      "Summit news",
    ],
  },

  comingSoon: [
    {
      id: "speakers",
      title: "Speakers",
      body: "Keynotes and panelists from government, the military, industry, and academia will be announced soon.",
    },
    {
      id: "partners",
      title: "Partners",
      body: "Partner and sponsor announcements are coming soon. Interested in partnering? Get in touch.",
    },
    {
      id: "registration",
      title: "Registration",
      body: "Registration opens soon. Join the mailing list to be the first to know.",
    },
  ],
} satisfies SiteConfig;

/** Pre-addressed email for a specific inquiry (until dedicated forms exist). */
export function inquiryHref(subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
