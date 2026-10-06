import { ComingSoon } from "@/components/blocks/ComingSoon";
import { CtaBand } from "@/components/blocks/CtaBand";
import { StatewideBand } from "@/components/blocks/StatewideBand";
import { WhyFloridaPreview } from "@/components/blocks/WhyFloridaPreview";
import { HomeHero } from "@/components/sections/home/HomeHero";
import {
  AudienceSection,
  ExperienceSection,
  InnovationSection,
  MissionSection,
  OrganizersSection,
  ProgramPreview,
} from "@/components/sections/home/HomeSections";

// Narrative: what it is → why it exists → why Florida → the experience →
// program → innovation → who it serves → statewide vision → organizers → join.
export default function Home() {
  return (
    <>
      <HomeHero />
      <MissionSection />
      <WhyFloridaPreview index="02" />
      <ExperienceSection />
      <ProgramPreview />
      <InnovationSection />
      <AudienceSection />
      <StatewideBand index="07" />
      <ComingSoon />
      <OrganizersSection />
      <CtaBand />
    </>
  );
}
