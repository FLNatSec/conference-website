import type { SignatureOption, SponsorBenefit, SponsorTier } from "@/lib/types";

/*
 * Sponsorship tiers, from the 2027 Sponsorship Prospectus (Nov 2026).
 * Hidden while features.sponsorTiers is off. Keep this file in step with the prospectus:
 * prices, benefits, and which signature options are still available.
 */

export const sponsorship = {
  heading: "Sponsorship tiers.",
  lede: "Each tier includes the benefits below. Early sponsors can also choose a signature sponsorship and be featured at a session.",
  steps: ["Choose your tier", "Select a signature sponsorship", "Email us to confirm"],
  footnote: "Tiers, signature sponsorships, and add-ons are subject to availability.",
};

/** Rows of the benefits comparison, in display order. */
export const sponsorBenefits: SponsorBenefit[] = [
  { id: "vipDinner", label: "VIP dinner tickets (Thursday)" },
  { id: "resumes", label: "Resume access" },
  { id: "expo", label: "Innovation Expo space", note: "Innovation Expo exhibit space is subject to availability." },
  { id: "nametag", label: "Nametag ad" },
  { id: "recognition", label: "Recognition" },
];

export const sponsorTiers: SponsorTier[] = [
  {
    id: "platinum",
    name: "Platinum",
    price: "$15k+",
    limit: "Limited to 2 sponsors",
    benefits: { vipDinner: "4", resumes: "Yes", expo: "Presenting sponsor", nametag: "Yes", recognition: "Top billing" },
    signature: [{ title: "Innovation Expo presenting sponsor", available: true }],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$10k",
    benefits: { vipDinner: "4", resumes: "Yes", expo: "Included", nametag: "Yes", recognition: "Large" },
    signature: [
      { title: "Keynote sponsor", available: true },
      { title: "Lunch", available: true },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "$6k",
    benefits: { vipDinner: "4", resumes: "Yes", expo: "Included", nametag: "Yes", recognition: "Medium" },
    signature: [
      { title: "Happy hour", available: true },
      { title: "Lanyards", available: true },
    ],
  },
  {
    id: "bronze",
    name: "Bronze",
    price: "$3k",
    benefits: { vipDinner: "2", resumes: "No", expo: "Included", nametag: "No", recognition: "Small" },
    signature: [
      { title: "Challenge coins", available: true },
      { title: "Coffee break sponsor", available: true },
    ],
  },
  {
    id: "community",
    name: "Community",
    price: "$1k",
    benefits: { vipDinner: "2", resumes: "No", expo: "$1k add-on", nametag: "No", recognition: "Website logo and social post" },
    signature: [{ title: "Innovation Expo table", price: "+$1k", available: true }],
  },
];

/** Available with any tier. */
export const sponsorAddOns: SignatureOption[] = [
  { title: "Workshop sponsor", price: "+$1k", available: true },
  { title: "Travel grant", price: "+$500", available: true },
];
