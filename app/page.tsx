import { CtaBand } from "@/components/blocks/CtaBand";
import { StatewideBand } from "@/components/blocks/StatewideBand";
import { WhyFloridaPreview } from "@/components/blocks/WhyFloridaPreview";
import { HomeHero } from "@/components/sections/home/HomeHero";
import {
  AboutSection,
  AudienceSection,
  ExperiencePreview,
  GetInvolvedSection,
  OrganizersSection,
  ProgramPreview,
} from "@/components/sections/home/HomeSections";
import { features } from "@/content/features";

// Narrative: what it is → why Florida → what to expect → who it's for → how to get involved → join.
// Sections behind flags are kept for later (docs/feature-flags.md).
export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <WhyFloridaPreview />
      <ExperiencePreview />
      {features.detailedProgram && <ProgramPreview />}
      <AudienceSection />
      {features.statewideVision && <StatewideBand />}
      <GetInvolvedSection />
      {/* Organizers + partner recognition return once sponsor/partner logos are confirmed. */}
      {features.sponsors && <OrganizersSection />}
      <CtaBand />
    </>
  );
}
