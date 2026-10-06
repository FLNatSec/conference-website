import type { EcosystemNode, FloridaRegion, FloridaStat, HistoryEra, NodeCategory } from "@/lib/types";

/*
 * Why Florida — the ecosystem and its history.
 *
 * Every entry links an official or reputable source (researched 2026-10-05).
 * Keep it that way: add a statistic, company, or claim only with a source, and
 * prefer official sites (.mil, .gov, the organization itself).
 */
export const ecosystemReviewStatus: "draft" | "verified" = "draft";

/** Display order and labels for node categories. */
export const categoryOrder: NodeCategory[] = ["military", "space", "industry", "research", "innovation", "ports"];

export const categoryLabels: Record<NodeCategory, string> = {
  military: "Military & government",
  space: "Space & launch",
  industry: "Industry",
  research: "Universities & research",
  innovation: "Innovation & investment",
  ports: "Ports",
};

/** Headline figures — each verified against the cited source. */
export const floridaStats: FloridaStat[] = [
  {
    value: "3 of 11",
    label: "U.S. unified combatant commands headquartered in Florida: Central, Special Operations, and Southern",
    source: { title: "U.S. Department of Defense — Combatant Commands", url: "https://www.defense.gov/About/Combatant-Commands/" },
  },
  {
    value: "$102.6B",
    label: "Economic impact of Florida’s military and defense industry (2022 data)",
    source: {
      title: "Florida Defense Support Task Force — 2024 Economic Impact Summary",
      url: "https://www.macdill.af.mil/Portals/26/2024-Florida-Military-and-Defense-Economic-Impact-Summary.pdf",
    },
  },
  {
    value: "865,000+",
    label: "Florida jobs supported by military and defense activity (2022 data)",
    source: {
      title: "Florida Defense Support Task Force — 2024 Economic Impact Summary",
      url: "https://www.macdill.af.mil/Portals/26/2024-Florida-Military-and-Defense-Economic-Impact-Summary.pdf",
    },
  },
  {
    value: "90",
    label: "Launches from Florida’s spaceports in 2024 — a state record",
    source: {
      title: "Space Florida",
      url: "https://www.spaceflorida.gov/news/from-earth-to-orbit-florida-setting-the-standard-for-aerospace-commerce-in-2024-and-the-future",
    },
  },
];

const n = (
  category: NodeCategory,
  name: string,
  place: string,
  description: string,
  sourceTitle: string,
  url: string,
): EcosystemNode => ({ category, name, place, description, source: { title: sourceTitle, url } });

export const regions: FloridaRegion[] = [
  {
    id: "northwest",
    name: "Northwest Florida",
    anchorId: "northwest",
    coordinates: [-86.55, 30.47],
    summary:
      "From Pensacola to Tallahassee: Air Force weapons test and special operations, naval aviation training, and research universities in the state capital.",
    nodes: [
      n("military", "Eglin Air Force Base", "Okaloosa County", "Air Force weapons development, test, and evaluation", "Eglin AFB", "https://www.eglin.af.mil/"),
      n("military", "Hurlburt Field", "Okaloosa County", "Headquarters, Air Force Special Operations Command", "AFSOC", "https://www.afsoc.af.mil/"),
      n("military", "Naval Air Station Pensacola", "Pensacola", "Center of naval aviation training", "NAS Pensacola", "https://cnrse.cnic.navy.mil/Installations/NAS-Pensacola/"),
      n("military", "Naval Air Station Whiting Field", "Milton", "Primary and helicopter training for Navy and Marine Corps aviators", "Training Air Wing Five", "https://cnatra.navy.mil/tw5/"),
      n("military", "Tyndall Air Force Base", "Panama City", "Air Force base on the Gulf coast", "Tyndall AFB", "https://www.tyndall.af.mil/"),
      n("military", "Naval Surface Warfare Center Panama City Division", "Panama City", "Navy R&D for littoral and expeditionary warfare", "NAVSEA", "https://www.navsea.navy.mil/Home/Warfare-Centers/NSWC-Panama-City/"),
      n("research", "Florida State University", "Tallahassee", "Research university; home of the Air Force–funded Florida Center for Advanced Aero-Propulsion", "FSU", "https://www.fsu.edu/"),
      n("research", "FAMU-FSU College of Engineering", "Tallahassee", "Joint engineering college; Air Force Center of Excellence in aerospace morphing, with UF", "AFRL", "https://afresearchlab.com/afrl-grant-launches-center-of-excellence-at-famu-fsu-college-of-engineering/"),
      n("research", "National High Magnetic Field Laboratory", "Tallahassee", "National user facility operated with FSU and UF", "National MagLab", "https://nationalmaglab.org/"),
      n("research", "UF Research and Engineering Education Facility", "Shalimar", "UF engineering campus adjacent to Eglin, supporting Air Force research", "UF REEF", "https://www.eng.ufl.edu/reef/about/"),
      n("research", "University of West Florida", "Pensacola", "NSA/DHS Southeast regional hub for cybersecurity education", "UWF", "https://news.uwf.edu/uwf-re-designated-as-cybersecurity-regional-hub-for-the-southeast-us-with-expanded-mission-region-and-partnerships/"),
      n("research", "Florida Institute for Human & Machine Cognition", "Pensacola", "Research institute in robotics and human–machine systems", "IHMC", "https://www.ihmc.us/"),
      n("innovation", "Doolittle Institute", "Niceville", "AFRL innovation institute for tech transfer and transition with the Munitions Directorate", "Doolittle Institute", "https://doolittleinstitute.org/"),
    ],
  },
  {
    id: "north-central",
    name: "North Central Florida",
    anchorId: "gainesville",
    coordinates: [-82.3248, 29.6516],
    summary: "Gainesville — home of the inaugural summit — with a flagship research university and the Florida National Guard’s premier training site.",
    nodes: [
      n("military", "Camp Blanding Joint Training Center", "Starke", "Florida National Guard’s premier training site, about 73,000 acres", "Florida National Guard", "https://fl.ng.mil/Commands/Camp-Blanding-Joint-Training-Center/"),
      n("research", "University of Florida", "Gainesville", "Flagship research university; host of the inaugural summit", "UF", "https://www.ufl.edu/"),
      n("research", "UF FLARE", "Gainesville & Eglin AFB", "Florida Applied Research in Engineering: secure research for the Department of Defense", "UF News", "https://news.ufl.edu/2026/05/uf-flare-/"),
      n("research", "HiPerGator", "Gainesville", "UF’s AI supercomputer", "UF Research Computing", "https://www.rc.ufl.edu/"),
    ],
  },
  {
    id: "northeast",
    name: "Northeast Florida",
    anchorId: "northeast",
    coordinates: [-81.66, 30.33],
    summary: "Naval aviation and surface fleet operations around Jacksonville, with aircraft production, sustainment, and ship repair.",
    nodes: [
      n("military", "Naval Air Station Jacksonville", "Jacksonville", "Navy air station on the St. Johns River", "NAS Jacksonville", "https://cnrse.cnic.navy.mil/Installations/NAS-Jacksonville/"),
      n("military", "Naval Station Mayport", "Jacksonville", "Navy surface ship base on the Atlantic", "NS Mayport", "https://cnrse.cnic.navy.mil/Installations/NAVSTA-Mayport/"),
      n("industry", "Northrop Grumman", "St. Augustine", "Production line for the Navy’s E-2D Advanced Hawkeye", "Northrop Grumman", "https://investor.northropgrumman.com/news-releases/news-release-details/northrop-grumman-dedicates-aircraft-integration-center"),
      n("industry", "Boeing", "Cecil Airport, Jacksonville", "Maintenance and repair for Navy and Air Force aircraft, including P-8, KC-46, and F/A-18", "Military & Aerospace Electronics", "https://www.militaryaerospace.com/commercial-aerospace/article/14232522/boeing-mro-jacksonville"),
      n("industry", "BAE Systems Jacksonville Shipyards", "Jacksonville", "Navy and commercial ship repair; $200M+ shiplift expansion", "BAE Systems", "https://www.baesystems.com/en-us/article/business-state-consortium-kicks-off-bae-systems-200-million-ship-repair-facility-upgrade-in-jacksonville"),
      n("ports", "JAXPORT", "Jacksonville", "Atlantic seaport for trade and logistics", "JAXPORT", "https://www.jaxport.com/"),
    ],
  },
  {
    id: "central",
    name: "Central Florida & the Space Coast",
    anchorId: "space-coast",
    coordinates: [-80.6, 28.4],
    summary:
      "The Cape’s government and commercial launch base, the Defense Department’s modeling and simulation hub, and a deep aerospace and defense industry.",
    nodes: [
      n("military", "Cape Canaveral Space Force Station & Patrick SFB", "Brevard County", "Space Launch Delta 45 runs the Eastern Range", "Patrick SFB", "https://www.patrick.spaceforce.mil/"),
      n("military", "NASA Kennedy Space Center", "Merritt Island", "NASA’s launch center for human spaceflight", "NASA", "https://www.nasa.gov/kennedy/"),
      n("military", "Team Orlando", "Central Florida Research Park", "Army PEO STRI, Navy NAWCTSD, Air Force AFAMS, and Marine Corps training systems", "Team Orlando", "https://www.teamorlando.org/"),
      n("space", "SpaceX", "Cape Canaveral & KSC", "Falcon launches from the Cape and Kennedy", "SpaceX", "https://www.spacex.com/"),
      n("space", "Blue Origin", "Merritt Island", "New Glenn rocket factory at Exploration Park", "FOX 35 Orlando", "https://www.fox35orlando.com/news/inside-blue-origins-rocket-factory-florida"),
      n("space", "United Launch Alliance", "Cape Canaveral", "National security and civil launches", "ULA", "https://www.ulalaunch.com/"),
      n("space", "Lockheed Martin Orion", "Kennedy Space Center", "Final assembly and testing of NASA’s Orion spacecraft", "NASA", "https://www.nasa.gov/reference/operations-and-checkout-facility-kennedy-space-center/"),
      n("space", "Relativity · Stoke · Firefly", "Cape Canaveral", "New launch companies leasing historic Cape pads (LC-16, LC-14, LC-20)", "NASASpaceflight", "https://www.nasaspaceflight.com/2025/12/commercial-neighbors-stoke-relativity/"),
      n("industry", "L3Harris Technologies", "Melbourne", "Global defense technology company headquartered in Melbourne", "L3Harris", "https://www.l3harris.com/"),
      n("industry", "Lockheed Martin", "Orlando", "Missiles and Fire Control and Rotary and Mission Systems operations", "Lockheed Martin", "https://lockheedmartin.com/en-us/who-we-are/business-areas/missiles-and-fire-control/orlando.html"),
      n("industry", "Northrop Grumman", "Melbourne", "Aircraft integration, sustainment, and electronic warfare", "Northrop Grumman", "https://investor.northropgrumman.com/news-releases/news-release-details/northrop-grumman-dedicates-aircraft-integration-center"),
      n("industry", "Embraer", "Melbourne", "U.S. aircraft assembly and completion center", "Embraer", "https://www.embraer.com/"),
      n("research", "University of Central Florida", "Orlando", "Research university beside the Central Florida Research Park", "UCF", "https://www.ucf.edu/"),
      n("research", "Florida Tech & Embry-Riddle", "Melbourne & Daytona Beach", "Engineering, aviation, and aerospace universities", "Florida Tech", "https://www.fit.edu/"),
      n("innovation", "Red 6", "Orlando", "Defense tech startup building augmented-reality combat flight training", "Axios", "https://www.axios.com/2025/05/21/red6-airforce-orlando-augmented-reality"),
      n("innovation", "Phase Shift Ventures", "Orlando", "Venture firm backing early-stage deep tech and dual-use startups", "Phase Shift Ventures", "https://phaseshiftventures.substack.com/"),
      n("ports", "Port Canaveral", "Cape Canaveral", "Deepwater port beside the launch complex", "Port Canaveral", "https://www.portcanaveral.com/"),
    ],
  },
  {
    id: "tampa-bay",
    name: "Tampa Bay & the Gulf Coast",
    anchorId: "tampa-bay",
    coordinates: [-82.46, 27.95],
    summary:
      "Two combatant command headquarters at MacDill, Special Operations Command’s innovation hub, defense manufacturers, and a growing defense-tech startup scene.",
    nodes: [
      n("military", "U.S. Central Command", "MacDill AFB, Tampa", "Unified combatant command headquarters", "CENTCOM", "https://www.centcom.mil/"),
      n("military", "U.S. Special Operations Command", "MacDill AFB, Tampa", "Unified combatant command headquarters", "SOCOM", "https://www.socom.mil/"),
      n("industry", "RTX (Raytheon)", "Largo", "Radar and surveillance systems production", "RTX", "https://raytheon.mediaroom.com/2026-05-11-RTXs-Collins-Aerospace-accelerates-production-with-26-5-million-investment-in-Largo,-Florida"),
      n("industry", "Honeywell Aerospace", "Clearwater", "Navigation systems for the Air Force under a 15-year DoD contract", "Trade & Industry Development", "https://www.tradeandindustrydev.com/region/florida/news/fl-work-35b-dod-contract-be-done-honeywell-16409"),
      n("research", "University of South Florida & Cyber Florida", "Tampa", "Research university and home of the Florida Center for Cybersecurity", "Cyber Florida", "https://cyberflorida.org/"),
      n("innovation", "SOFWERX", "Ybor City, Tampa", "SOCOM’s open innovation hub linking startups, academia, and operators", "SOF News", "https://sof.news/news/sofwerx/"),
      n("innovation", "Tampa Bay Wave — DefenseTech|X", "Tampa", "Federally funded accelerator for early-stage defense tech startups", "Tampa Bay Wave", "https://www.tampabaywave.org/defensetechx-accelerator-tampa-bay-wave/"),
      n("ports", "Port Tampa Bay", "Tampa", "Gulf seaport on Tampa Bay", "Port Tampa Bay", "https://www.porttb.com/"),
    ],
  },
  {
    id: "south",
    name: "South Florida & the Keys",
    anchorId: "south",
    coordinates: [-80.19, 25.77],
    summary:
      "Southern Command, the Coast Guard’s Southeast District, interagency operations in the Keys, gateways to the hemisphere, and new defense-tech capital.",
    nodes: [
      n("military", "U.S. Southern Command", "Doral", "Combatant command for Central and South America and the Caribbean", "SOUTHCOM", "https://www.southcom.mil/"),
      n("military", "Coast Guard Southeast District", "Miami", "Coast Guard district for the Southeast U.S. and the Caribbean", "U.S. Coast Guard", "https://www.news.uscg.mil/Press-Releases/Article/4235021/coast-guard-district-7-renamed-to-coast-guard-southeast-district/"),
      n("military", "Joint Interagency Task Force South", "Key West", "Interagency task force countering illicit trafficking", "JIATF-South", "https://www.jiatfs.southcom.mil/"),
      n("military", "Naval Air Station Key West", "Key West", "Navy air station for training and operations", "NAS Key West", "https://cnrse.cnic.navy.mil/Installations/NAS-Key-West/"),
      n("military", "Homestead Air Reserve Base", "Homestead", "482nd Fighter Wing, flying F-16s", "Homestead ARB", "https://www.homestead.afrc.af.mil/"),
      n("research", "Florida International University", "Miami", "Research university; Gordon Institute for national security policy", "FIU Gordon Institute", "https://gordoninstitute.fiu.edu/"),
      n("innovation", "Andreessen Horowitz — American Dynamism", "West Palm Beach", "Regional base for a16z’s defense and industrial tech fund", "Commercial Observer", "https://commercialobserver.com/?p=579276"),
      n("ports", "PortMiami & Port Everglades", "Miami & Fort Lauderdale", "Seaports linked to the Caribbean and Latin America", "PortMiami", "https://www.miamidade.gov/portmiami/"),
    ],
  },
];

/** Statewide institutions that finance, support, and connect the ecosystem. */
export const statewide: EcosystemNode[] = [
  n("innovation", "Space Florida", "Statewide", "The state’s aerospace finance and development authority: spaceport infrastructure and project financing", "Space Florida", "https://www.spaceflorida.gov/"),
  n("innovation", "Florida Defense Support Task Force", "Statewide", "State body that supports Florida’s military installations and defense economy", "Select Florida", "https://selectflorida.org/"),
  n("innovation", "Florida Opportunity Fund", "Statewide", "State venture fund program whose targets include aerospace, homeland security, and defense", "Florida Statutes §288.9624", "https://flsenate.gov/laws/statutes/2010/288.9624"),
];

/** History — milestones, each with a present-day legacy. No causal claims. */
export const history: HistoryEra[] = [
  {
    year: "1914",
    title: "Naval aviation takes root in Pensacola",
    body: "The Navy established an aeronautic station at Pensacola, beginning more than a century of naval aviation training in Northwest Florida.",
    regionId: "northwest",
    source: { title: "NAS Pensacola", url: "https://cnrse.cnic.navy.mil/Installations/NAS-Pensacola/" },
  },
  {
    year: "1939",
    title: "Camp Blanding",
    body: "Florida established Camp Blanding as a National Guard training reservation. In World War II it became a major Army training center, training many of the infantry replacements of 1944–45.",
    regionId: "north-central",
    source: { title: "Florida National Guard", url: "https://fl.ng.mil/Commands/Camp-Blanding-Joint-Training-Center/" },
  },
  {
    year: "1942",
    title: "Training for war at Eglin",
    body: "At Eglin Field, the Doolittle Raiders trained for their mission over Japan.",
    regionId: "northwest",
    source: { title: "Eglin Air Force Base", url: "https://www.eglin.af.mil/" },
  },
  {
    year: "1950",
    title: "The first launch from Cape Canaveral",
    body: "A Bumper rocket lifted off from Cape Canaveral — the first launch from the Cape.",
    regionId: "central",
    source: { title: "NASA", url: "https://www.nasa.gov/" },
  },
  {
    year: "1969",
    title: "Apollo 11",
    body: "Apollo 11 launched from Kennedy Space Center’s Launch Complex 39A on its mission to the Moon.",
    regionId: "central",
    source: { title: "NASA", url: "https://www.nasa.gov/mission/apollo-11/" },
  },
  {
    year: "1983",
    title: "U.S. Central Command",
    body: "U.S. Central Command was established, headquartered at MacDill Air Force Base in Tampa.",
    regionId: "tampa-bay",
    source: { title: "U.S. Central Command", url: "https://www.centcom.mil/" },
  },
  {
    year: "1987",
    title: "U.S. Special Operations Command",
    body: "U.S. Special Operations Command was established, also headquartered at MacDill Air Force Base.",
    regionId: "tampa-bay",
    source: { title: "U.S. Special Operations Command", url: "https://www.socom.mil/" },
  },
  {
    year: "1997",
    title: "Southern Command moves to Miami",
    body: "U.S. Southern Command relocated its headquarters from Panama to the Miami area.",
    regionId: "south",
    source: { title: "U.S. Southern Command", url: "https://www.southcom.mil/" },
  },
  {
    year: "2015",
    title: "SOFWERX opens in Tampa",
    body: "Special Operations Command created SOFWERX in Ybor City to bring startups, academia, and nontraditional innovators to the special operations community.",
    regionId: "tampa-bay",
    source: { title: "SOF News", url: "https://sof.news/news/sofwerx/" },
  },
  {
    year: "2019",
    title: "The Space Force era",
    body: "The U.S. Space Force was established; Florida’s Cape launch installations later became Space Force installations.",
    regionId: "central",
    source: { title: "U.S. Space Force", url: "https://www.spaceforce.mil/" },
  },
  {
    year: "2024",
    title: "A record year in launch",
    body: "Florida’s spaceports supported a record 90 launches, as commercial companies joined government missions on the Space Coast.",
    regionId: "central",
    source: {
      title: "Space Florida",
      url: "https://www.spaceflorida.gov/news/from-earth-to-orbit-florida-setting-the-standard-for-aerospace-commerce-in-2024-and-the-future",
    },
  },
];

/** The opportunity ahead — framed as opportunities, not policy claims. */
export const opportunities = [
  { priority: "Space security", strength: "Government and commercial launch, spacecraft production, and the Eastern Range" },
  { priority: "Maritime security & the Western Hemisphere", strength: "Southern Command, the Coast Guard, interagency operations, and Atlantic and Gulf ports" },
  { priority: "AI, autonomy & cyber", strength: "University research, Team Orlando’s simulation community, and cyber education hubs" },
  { priority: "Defense industrial base", strength: "Aircraft production and sustainment, missiles, sensors, ship repair, and suppliers statewide" },
  { priority: "Defense tech & capital", strength: "SOFWERX, AFRL’s Doolittle Institute, startup accelerators, and new venture investment" },
  { priority: "Talent & workforce", strength: "Universities, installations, and a large veteran and defense workforce" },
];

export const connectedGroups = [
  "Government & military",
  "Industry & startups",
  "Investors",
  "Universities & researchers",
  "Students & talent",
];
