import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FormatDays } from "@/components/blocks/FormatDays";
import { LaneList } from "@/components/blocks/LaneList";
import { PageHero } from "@/components/blocks/PageHero";
import { ProgramSchedule } from "@/components/blocks/ProgramSchedule";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { hasSpeakers, SpeakerGrid } from "@/components/blocks/SpeakerGrid";
import { WorkshopGrid } from "@/components/blocks/WorkshopGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { inquiryHref } from "@/content/site";
import { features } from "@/content/features";
import { formatMonthDay, formatTime, formatWeekday, getCurrentEdition } from "@/lib/content";

export const metadata: Metadata = {
  title: "Program",
  description:
    "Two days organized around five lanes: strategy, innovation, operations, industry, and people. The detailed program will be announced.",
};

export default function ProgramPage() {
  // Hidden while the flag is off (next.config.ts also redirects this URL). See docs/feature-flags.md.
  if (!features.programPage) notFound();
  const edition = getCurrentEdition();
  return (
    <>
      <PageHero
        label="Program"
        title="The program"
        lede="Thursday’s workshops and Friday’s main program, session by session. Times, rooms, and speakers will be added as they are confirmed."
      />

      <Section tone="ink-2">
        <Container>
          <Reveal>{edition.program?.length ? <ProgramSchedule /> : <FormatDays />}</Reveal>
        </Container>
      </Section>

      {edition.workshops && (
        <Section tone="ink" id="workshops" className="scroll-mt-16">
          <Container>
            <Reveal>
              <SectionHeader
                label={`${formatWeekday(edition.workshops.date)}, ${formatMonthDay(edition.workshops.date)}`}
                heading="Workshops."
                lede={`${edition.workshops.rooms.length * edition.workshops.slots.length} one-hour workshops across ${edition.workshops.rooms.length} rooms, from ${formatTime(edition.workshops.slots[0].start)} to ${formatTime(edition.workshops.slots.at(-1)!.end)}. Pick one each hour.`}
              />
            </Reveal>
            <div className="mt-12 md:mt-16">
              <WorkshopGrid />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="ink-2">
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

      <Section tone="ink" spacing={hasSpeakers() ? "default" : "compact"} id="speakers" className="scroll-mt-16">
        <Container>
          <Reveal>
            {hasSpeakers() ? (
              <>
                <SectionHeader label="Speakers" heading="Who you’ll hear from." lede="More speakers will be announced as they are confirmed." />
                <div className="mt-12 md:mt-16">
                  <SpeakerGrid />
                </div>
              </>
            ) : (
              <SectionHeader
                label="Speakers"
                heading="Speakers coming soon."
                lede="Keynotes and panelists from government, the military, industry, and academia will be announced to the mailing list first."
              />
            )}
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
