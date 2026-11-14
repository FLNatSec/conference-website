import type { Metadata } from "next";
import { ComingSoonCards } from "@/components/blocks/ComingSoon";
import { CtaBand } from "@/components/blocks/CtaBand";
import { ExperienceGrid } from "@/components/blocks/ExperienceGrid";
import { FormatDays } from "@/components/blocks/FormatDays";
import { PageHero } from "@/components/blocks/PageHero";
import { SaveTheDate } from "@/components/blocks/SaveTheDate";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { heroVideo } from "@/content/media/hero-video";
import { inquiryHref } from "@/content/site";
import { discussionThemes, discussionTopics, experience, proposedSessions, schedule } from "@/content/summit";
import { formatEditionDates, getCurrentEdition } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "Two days in Gainesville: workshops and a VIP dinner, then expert conversations, the National Security Innovation Expo, a pitch competition, and an evening reception. Final speakers, sessions, and times will be announced as they are confirmed.",
};

export default function ExperiencePage() {
  const edition = getCurrentEdition();
  return (
    <>
      <PageHero
        label="What to expect"
        title="The Experience"
        image={heroVideo.posterDesktop}
        lede={
          <>
            <p>{experience.lede}</p>
            <p className="mt-4 text-[1rem] text-bone/70">{experience.status}</p>
          </>
        }
      />

      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeader label="The summit" heading="What the summit will offer." />
            <div className="mt-14 md:mt-20">
              <ExperienceGrid detailed />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink-2" id="schedule" className="scroll-mt-16">
        <Container>
          <Reveal>
            <SectionHeader label={formatEditionDates(edition)} heading={schedule.heading} lede={schedule.lede} />
            <div className="mt-12 md:mt-16">
              <FormatDays />
            </div>
            <div className="mt-10">
              <SaveTheDate id="experience" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader
                label="Topics"
                heading="Conversations will touch on…"
                lede={`Tentative themes focus on ${discussionThemes.slice(0, -1).join(", ")}, and ${discussionThemes.at(-1)}, with topics such as these.`}
              />
            </div>
            <ul className="border-t border-bone/12 lg:col-span-6 lg:col-start-7 lg:self-end">
              {discussionTopics.map((topic) => (
                <li key={topic} className="flex items-center gap-4 border-b border-bone/12 py-4 text-[1.05rem] text-bone/85">
                  <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-highlight-300" />
                  {topic}
                </li>
              ))}
            </ul>
          </Reveal>

          {features.detailedProgram && (
            <div className="mt-20">
              <SectionHeader label="Proposed sessions" heading="Draft program." />
              <ol className="mt-10 border-t border-bone/12">
                {proposedSessions.map((session) => (
                  <li key={session.title} className="grid gap-2 border-b border-bone/12 py-5 md:grid-cols-12 md:gap-8">
                    <p className="type-label text-bone/60 md:col-span-2">{session.format}</p>
                    <p className="font-display text-[1.1rem] font-medium md:col-span-4">{session.title}</p>
                    <p className="text-[0.98rem] leading-relaxed text-bone/75 md:col-span-6">{session.question}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Container>
      </Section>

      {features.comingSoon && (
        <Section tone="ink-2" spacing="compact">
          <Container>
            <Reveal>
              <SectionHeader label="Coming soon" heading="Announcements on the way." />
              <div className="mt-12">
                <ComingSoonCards />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              label="Get involved"
              heading="Help shape the summit."
              lede="The program is being built now. If you’d like to exhibit or pitch, or know a voice or topic the summit should include, tell us."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={inquiryHref("Innovation Expo / Pitch Competition interest")} tone="paper" arrow>
                Express interest in exhibiting or pitching
              </ButtonLink>
              <ButtonLink href={inquiryHref("Speaker or topic suggestion")} tone="paper" variant="secondary">
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
