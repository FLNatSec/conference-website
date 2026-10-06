import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FormatDays } from "@/components/blocks/FormatDays";
import { LaneList } from "@/components/blocks/LaneList";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { inquiryHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Program",
  description:
    "Two days — Connect and Convene — organized around five lanes: strategy, innovation, operations, industry, and people. The detailed program will be announced.",
};

export default function ProgramPage() {
  return (
    <>
      <PageHero
        label="Program"
        title="Connect. Convene."
        lede="Two days built around five broad lanes of conversation. The detailed program — speakers, sessions, and times — will be announced as it is confirmed."
      />

      <Section tone="ink-2">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              label="Format"
              meta="Preliminary"
              heading="Two days. One statewide network."
              lede="Friday is for connection — tours, workshops, careers, and innovation. Saturday convenes the full summit."
            />
            <div className="mt-14 md:mt-20">
              <FormatDays />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              label="Lanes"
              heading="Five lanes of conversation."
              lede="These lanes describe the kinds of conversations attendees can expect. They are not a finalized agenda."
            />
          </Reveal>
          <div className="mt-14 md:mt-20">
            <LaneList />
          </div>
        </Container>
      </Section>

      <Section tone="ink-2" spacing="compact">
        <Container>
          <Reveal>
            <SectionHeader
              label="Speakers"
              heading="Speakers coming soon."
              lede="Keynotes and panelists from government, the military, industry, and academia will be announced to the mailing list first."
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              index="03"
              label="Shape the program"
              heading="Suggest a speaker or a topic."
              lede="The program is being built now. If there is a voice, an organization, or a question the summit should take on, tell us."
            />
            <div className="mt-10">
              <ButtonLink href={inquiryHref("Speaker or topic suggestion")} tone="paper" arrow>
                Suggest a speaker or topic
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
