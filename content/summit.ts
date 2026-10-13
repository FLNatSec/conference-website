import { inquiryHref } from "@/content/site";
import type { Audience, ExperienceElement, Lane, Pillar, ProposedSession, WayToGetInvolved } from "@/lib/types";

/*
 * Summit copy. Edit wording here — components only handle layout.
 * Keep claims broad until each is sourced (see CLAUDE.md).
 */

export const mission =
  "To connect Florida’s national security ecosystem with leaders, organizations, and ideas from across the country, aligning capabilities with national priorities, fostering collaboration, and inspiring the next generation of national security leaders.";

/** One sentence under the hero title: who is coming together. */
export const heroSummary =
  "Bringing together students and leaders from government, the military, industry, investment, and academia across Florida and the nation to foster collaboration and inspire the next generation.";

/** Homepage "What is the summit". The mission appears here as the two-part `dualMission`. */
export const about = {
  label: "What is the summit",
  heading: "A student-led summit with national reach.",
  body: "Organized by the University of Florida National Security Club, the inaugural Florida National Security Summit brings together students and established leaders to explore national security challenges, build partnerships, and create opportunities for the next generation. Rooted in Florida’s strategic capabilities, the Summit connects the state’s growing national security ecosystem with expertise and ideas from across the country.",
  /** Shown only when features.anticipatedAttendance is on. */
  attendance: "Approximately 200–300 attendees are anticipated.",
  vision:
    "Grow into an annual, statewide conference that rotates among Florida’s universities and draws leading voices from across the national security community.",
  dualMission: [
    {
      title: "Connect the ecosystem",
      body: "Bring government, the military, industry, investors, and universities together to align capabilities with national priorities and build lasting collaboration.",
    },
    {
      title: "Develop the next generation",
      body: "Introduce students from every discipline to national security careers, mentors, and real opportunities to contribute.",
    },
  ],
};

export const thesis = {
  statement: "Florida has the capabilities.",
  emphasis: "The opportunity is to connect them.",
  body: "Florida hosts major combatant commands, military installations, space launch infrastructure, ports, research universities, and defense-industry clusters. Too often, they operate in parallel. The student-led Florida National Security Summit brings the people behind them into one room — with leaders from across the country — to align what Florida can do with what the nation needs.",
};

/** Areas for the homepage Why Florida preview — the same five as the Why Florida page. */
export const floridaMotifs = ["Military", "Space", "Industry & investment", "Geography", "Education & research"];

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

/** Who the summit is for (homepage). Fuller value propositions live in the overview document. */
export const audiences: Audience[] = [
  {
    title: "Students",
    value: "Explore national security careers across engineering, computing, business, policy, and law, and meet mentors and employers.",
  },
  {
    title: "Military & government",
    value: "Share real operational and workforce challenges with people who can help solve them, and meet emerging talent.",
  },
  {
    title: "Companies & sponsors",
    value: "Reach students across disciplines and connect with government stakeholders, researchers, and potential partners.",
  },
  {
    title: "Founders & investors",
    value: "Meet government, industry, and investors in one room, and see promising research and ventures early.",
  },
  {
    title: "Universities & researchers",
    value: "Put labs, design teams, and research in front of the organizations that fund, adopt, and hire.",
  },
];

/* ---------- The Experience ---------- */

export const experience: { heading: string; lede: string; status: string; elements: ExperienceElement[] } = {
  heading: "What to expect.",
  lede: "Meaningful conversations on today’s national security challenges, emerging innovations, and opportunities for collaboration.",
  /** Stated wherever the experience is described in full. */
  status: "Final speakers, sessions, formats, and schedules will be announced as they are confirmed.",
  elements: [
    {
      id: "conversations",
      title: "Expert Conversations",
      body: "Keynotes, panels, and fireside discussions exploring national security challenges and opportunities with leaders from government, the military, industry, investment, and academia.",
    },
    {
      id: "innovation",
      title: "National Security Innovation Expo",
      body: "Student projects, university and national laboratory research, prototypes, and defense and dual-use startups, shown to the people who can carry them forward.",
    },
    {
      id: "pitch",
      title: "Pitch Competition",
      body: "A competition for students and early-stage ventures tackling national security challenges, judged by leaders from government, industry, and investment.",
    },
    {
      id: "networking",
      title: "Networking & Engagement",
      body: "Time for students, speakers, sponsors, researchers, and organizations to connect, potentially including tours, workshops, and receptions.",
    },
  ],
};

/** Tentative themes and example topics for /experience (not official tracks). */
export const discussionThemes = ["strategy", "innovation", "operations", "industry", "people"];

export const discussionTopics = [
  "Florida as a strategic national asset",
  "Defense innovation, acquisition, and capital",
  "The defense industrial base, manufacturing, and supply chains",
  "Space security and commercial space",
  "Maritime security and the Western Hemisphere",
  "National security talent and workforce development",
];

/** Proposed sessions from the planning overview. Hidden until features.detailedProgram is on. */
export const proposedSessions: ProposedSession[] = [
  {
    title: "Florida as a Strategic National Asset",
    format: "Opening keynote",
    question: "What makes Florida a strategic national asset, and how can its capabilities be better connected to national priorities?",
  },
  {
    title: "Defense Innovation, Acquisition & Capital",
    format: "Panel",
    question: "Why do promising technologies struggle to reach operational use, and how can government, industry, startups, and investors speed the process?",
  },
  {
    title: "Defense Industrial Base, Manufacturing & Supply Chains",
    format: "Panel",
    question: "Where are the most consequential gaps in U.S. industrial capacity, and what investments and policies would close them?",
  },
  {
    title: "Space Security & the Commercial Space Ecosystem",
    format: "Panel",
    question: "How can government and commercial space organizations work together to strengthen resilience and meet evolving national security needs?",
  },
  {
    title: "Building the Next Generation of National Security Talent",
    format: "Closing",
    question: "How can we create intentional pathways for students from every discipline to contribute to national security?",
  },
];

/** Further topics depending on speakers (hidden with proposedSessions). */
export const additionalTopics = [
  "Maritime security and the Western Hemisphere",
  "Military operations and joint readiness",
  "Energy security and critical infrastructure",
  "AI, autonomy, and cyber",
  "Emerging challenges and great-power competition",
];

/* ---------- Get involved ---------- */

export const waysToGetInvolved: WayToGetInvolved[] = [
  {
    title: "Speak or join as a guest",
    body: "Share your perspective in a keynote, panel, or fireside conversation, or join us as a featured guest.",
    href: inquiryHref("Speaking or attending as a guest"),
    action: "Get in touch",
  },
  {
    title: "Sponsor or partner",
    body: "Support the inaugural summit and connect with students, researchers, and leaders across sectors.",
    href: inquiryHref("Sponsorship or partnership inquiry"),
    action: "Start a conversation",
  },
  {
    title: "Exhibit or support innovation",
    body: "Show research, prototypes, or a startup at the Innovation Expo, or help support the proposed pitch competition.",
    href: inquiryHref("Innovation Expo / Pitch Competition interest"),
    action: "Express interest",
  },
  {
    title: "Attend and stay updated",
    body: "Join the mailing list for speaker announcements, program news, and attendance details.",
    href: "#join",
    action: "Join the mailing list",
  },
  {
    title: "Make an introduction",
    body: "Know a person or organization that should be part of the summit? We’d be grateful for the connection.",
    href: inquiryHref("Introduction"),
    action: "Connect us",
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

