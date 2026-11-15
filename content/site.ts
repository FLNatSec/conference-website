import { features, isPageEnabled } from "@/content/features";
import { formatEditionDates, getCurrentEdition } from "@/lib/content";
import type { NavItem, SiteConfig, SocialPlatform } from "@/lib/types";

const email = "flnatsecsummit@gmail.com";

/**
 * Every navigable page, in menu order. Pages switched off in content/features.ts
 * drop out of the header, mobile menu, footer, and sitemap automatically.
 */
const allNav: NavItem[] = [
  { label: "Why Florida", href: "/why-florida" },
  { label: "The Experience", href: "/experience" },
  { label: "Get Involved", href: "/get-involved" },
  // Hidden pages (see docs/feature-flags.md)
  { label: "Program", href: "/program" },
  { label: "Innovation", href: "/innovation" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
];

export const site = {
  name: "Florida National Security Summit",

  // PROVISIONAL lines — neither is locked yet.
  supportingLine: "Uniting strategy, technology, and talent.",
  tagline: "The State of National Security",

  description: `A free, student-led summit bringing together students and leaders from government, the military, industry, investment, and academia across Florida and the nation. Inaugural summit: ${formatEditionDates(getCurrentEdition())}, Gainesville, Florida.`,

  nav: allNav.filter((item) => isPageEnabled(item.href)),

  ctas: {
    primary: { label: "Join the mailing list", href: "#join" },
    secondary: { label: "Get involved", href: "/get-involved" },
  },

  contact: { email },

  // Add an account's URL to show it in the footer, the closing section, and /about. `null` hides it.
  social: {
    linkedin: "https://www.linkedin.com/showcase/florida-national-security-summit/",
    instagram: null,
    x: null,
    youtube: null,
    facebook: null,
  },

  mailingList: {
    // The signup form lives in the closing section of every page (components/blocks/CtaBand.tsx).
    href: "#join",
    benefits: [
      "Speaker announcements",
      ...(features.registration ? ["Registration updates"] : []),
      "Program news",
      "Innovation Expo details",
      "Ways to get involved",
    ],
  },

  comingSoon: [
    {
      id: "speakers",
      title: "Speakers",
      body: "Keynotes and panelists from government, the military, industry, investment, and academia will be announced as they are confirmed.",
      show: !features.speakers,
    },
    {
      id: "innovation-expo",
      title: "Innovation Expo",
      body: "Details for student teams, researchers, and startups who want to exhibit are on the way.",
      show: true,
    },
    {
      id: "pitch-competition",
      title: "Pitch Competition",
      body: "A pitch competition is being planned and is not yet confirmed. Details will be shared with the mailing list.",
      show: true,
    },
    {
      id: "partners",
      title: "Partners",
      body: "Partner and sponsor announcements are coming soon. Interested in partnering? Get in touch.",
      show: features.sponsors,
    },
    {
      id: "registration",
      title: "Registration",
      body: "Registration is free. Join the mailing list to hear when it opens.",
      show: features.registration,
    },
  ],
} satisfies SiteConfig;

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  x: "X",
  youtube: "YouTube",
  facebook: "Facebook",
};

/** The social accounts that have a URL, in display order. */
export const socialLinks = (Object.keys(socialLabels) as SocialPlatform[]).flatMap((platform) => {
  const href = site.social[platform];
  return href ? [{ platform, label: socialLabels[platform], href }] : [];
});

/** Pre-addressed email for a specific inquiry (until dedicated forms exist). */
export function inquiryHref(subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
