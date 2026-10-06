import type { Audience, Lane, Pillar } from "@/lib/types";

/*
 * Summit copy. Edit wording here — components only handle layout.
 * Keep claims broad until each is sourced (see CLAUDE.md).
 */

export const mission =
  "To connect Florida’s national-security ecosystem with leaders, organizations, and ideas from across the country — creating a forum to align capabilities with national priorities, foster collaboration, and advance national security.";

export const thesis = {
  statement: "Florida has the capabilities.",
  emphasis: "The opportunity is to connect them.",
  body: "Florida hosts major combatant commands, military installations, space launch infrastructure, ports, research universities, and defense-industry clusters. Too often, they operate in parallel. The student-led Florida National Security Summit brings the people behind them into one room — with leaders from across the country — to align what Florida can do with what the nation needs.",
};

/** Motifs for the homepage Why Florida preview. Categories, not claims. */
export const floridaMotifs = [
  "Space & launch",
  "Military operations",
  "Ports & maritime",
  "Western Hemisphere",
  "Aviation & testing",
  "Simulation & training",
  "Research universities",
  "Defense industry",
  "Talent",
];

export const pillars: Pillar[] = [
  {
    title: "Ideas",
    body: "Keynotes and expert panels across strategy, technology, operations, industry, and workforce.",
  },
  {
    title: "Innovation",
    body: "University research, startups, student projects, and emerging technology — on display and in conversation.",
  },
  {
    title: "Connection",
    body: "Government, military, industry, investors, universities, researchers, and students in one room.",
  },
  {
    title: "Opportunity",
    body: "Careers, mentors, collaborators, partnerships, and pathways from research to mission.",
  },
];

/** Five broad lanes of conversation — indicative, not a finalized agenda. */
export const lanes: Lane[] = [
  {
    title: "Strategy",
    topics: ["Geopolitics", "Emerging threats", "National priorities", "Florida as a strategic asset"],
  },
  {
    title: "Innovation",
    topics: ["Defense technology", "University research", "Startups", "Technology transition", "Space"],
  },
  {
    title: "Operations",
    topics: ["Military readiness", "Combatant commands", "Intelligence", "AI, autonomy, and cyber"],
  },
  {
    title: "Industry",
    topics: [
      "Acquisition",
      "Venture and private capital",
      "Manufacturing",
      "Defense industrial base",
      "Supply chains",
      "Rapid fielding",
    ],
  },
  {
    title: "People",
    topics: [
      "Talent and education",
      "Workforce development",
      "Careers",
      "University–industry–government collaboration",
    ],
  },
];

export const innovation = {
  expo: {
    title: "National Security Innovation Expo",
    body: "A showcase for university research, student design teams, prototypes, startups, and emerging national-security capabilities.",
    forWhom: ["University labs and research centers", "Student design teams", "Startups and early-stage companies", "Emerging capabilities and prototypes"],
  },
  pitch: {
    title: "Pitch Competition",
    body: "An opportunity for promising ideas and technologies to engage with operators, investors, industry, and innovation leaders.",
    forWhom: ["Founders and startup teams", "University and student innovators", "Researchers with a path to mission"],
  },
  /** Shown wherever details are not yet set. Don't invent eligibility, prizes, or dates. */
  status: "Participation details, eligibility, and timelines will be announced to the mailing list.",
};

export const audiences: Audience[] = [
  {
    title: "Students & early career",
    value: "Exposure to national-security careers, ideas, organizations, and mentors.",
  },
  {
    title: "Government & military",
    value: "New technologies, research, talent, industry perspectives, and cross-sector connections.",
  },
  {
    title: "Industry & investors",
    value: "Access to talent, research, government stakeholders, emerging capabilities, and potential partners.",
  },
  {
    title: "Universities & research",
    value: "A platform to showcase capabilities and connect research and education with national-security needs.",
  },
];

export const statewide = {
  headline: "Built for Florida. Designed to move across it.",
  body: "The inaugural summit takes place in Gainesville in 2027. The long-term vision is a statewide summit that can rotate among Florida’s universities — convening the ecosystem in a different part of the state over time.",
};

export const finalCta = {
  headline: "Be part of the inaugural Florida National Security Summit.",
  body: "Join the mailing list to hear first as the summit takes shape.",
};

/** Why organizations partner with the summit (Partners page). */
export const partnerValues: Pillar[] = [
  {
    title: "Reach talent",
    body: "Meet students and early-career talent from across Florida’s universities who are pursuing national-security careers.",
  },
  {
    title: "Showcase capabilities",
    body: "Put research, technology, and programs in front of operators, government stakeholders, industry, and investors.",
  },
  {
    title: "Build relationships",
    body: "Connect with leaders across government, the military, industry, and academia in one place.",
  },
  {
    title: "Shape an institution",
    body: "Help establish a statewide summit designed to grow with Florida’s national-security ecosystem.",
  },
];

