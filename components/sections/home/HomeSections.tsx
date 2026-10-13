import Image from "next/image";
import { AudienceGrid } from "@/components/blocks/AudienceGrid";
import { ComingSoonStrip } from "@/components/blocks/ComingSoon";
import { ExperienceGrid } from "@/components/blocks/ExperienceGrid";
import { FormatDays } from "@/components/blocks/FormatDays";
import { InnovationFeature } from "@/components/blocks/InnovationFeature";
import { LaneList } from "@/components/blocks/LaneList";
import { OrgGroups } from "@/components/blocks/OrgGroups";
import { PillarGrid } from "@/components/blocks/PillarGrid";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { WaysToGetInvolved } from "@/components/blocks/WaysToGetInvolved";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { features, isPageEnabled } from "@/content/features";
import { heroVideo } from "@/content/media/hero-video";
import { about, experience, mission, pillars, thesis } from "@/content/summit";

/*
 * Homepage sections. Each answers part of: What is this? Why Florida?
 * What happens at the summit? Who is it for? How do I get involved?
 * Sections not in app/page.tsx are kept for reuse (see docs/feature-flags.md).
 */

/** What the summit is: student-led, national, cross-sector, and the two-part mission (light break). */
export function AboutSection() {
  return (
    <Section tone="paper" id="about">
      <Container>
        <Reveal>
          <div>
            <hr className="reveal-rule mb-8 h-px border-0 bg-current opacity-20 md:mb-10" />
            <p className="mb-6 font-display text-[0.9rem] font-semibold tracking-[0.14em] text-highlight-700 uppercase">
              {about.label}
            </p>
            <h2 className="max-w-[22ch] font-serif text-statement font-normal tracking-[-0.012em] text-graphite">
              {about.heading}
            </h2>
            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-9 lg:gap-8">
              <div className="lg:col-span-5">
                <p className="text-lede text-graphite/85">{about.body}</p>
                {features.anticipatedAttendance && <p className="mt-6 text-lede text-graphite/85">{about.attendance}</p>}
              </div>
              <div className="lg:col-span-4">
                <p className="type-label text-graphite/70">Our mission</p>
                <ul className="mt-4">
                  {about.dualMission.map((item) => (
                    <li key={item.title} className="border-t border-graphite/20 py-5">
                      <h3 className="font-display text-[1.2rem] leading-tight font-medium">{item.title}</h3>
                      <p className="mt-2 text-[1rem] leading-relaxed text-graphite/80">{item.body}</p>
                    </li>
                  ))}
                </ul>
                <p className="type-label mt-6 text-graphite/70">Our vision</p>
                <p className="mt-4 border-t border-graphite/20 pt-5 text-[1rem] leading-relaxed text-graphite/80">{about.vision}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** The four elements of the experience, plus what's coming soon (dark, over footage). */
export function ExperiencePreview() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-bone md:py-36">
      <Image src={heroVideo.posterDesktop} alt="" fill sizes="100vw" className="-z-20 object-cover object-right" />
      <div aria-hidden="true" className="shade-even absolute inset-0 -z-10" />
      <Container>
        <Reveal>
          <SectionHeader label="The Experience" heading={experience.heading} lede={experience.lede} />
          <div className="mt-14 md:mt-20">
            <ExperienceGrid />
            <div className="mt-6">
              <ComingSoonStrip />
            </div>
            <div className="mt-10">
              <ButtonLink href="/experience" variant="secondary" arrow>
                Explore the experience
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Ways to get involved, each with a working link (light). */
export function GetInvolvedSection() {
  return (
    // Follows "Who it's for" (also paper), so it skips its own top padding; the header rule divides them.
    <Section tone="paper" id="get-involved" spacing="none" className="pb-24 md:pb-36">
      <Container>
        <Reveal>
          <SectionHeader
            tone="paper"
            label="Get involved"
            heading="Help build the inaugural summit."
            lede="The summit grows through partnership. Find the role that fits you, and we’ll be in touch."
          />
          <div className="mt-12 md:mt-16">
            <WaysToGetInvolved />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** 01 — Why the summit exists (light break). */
export function MissionSection() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <div>
            <hr className="reveal-rule mb-8 h-px border-0 bg-current opacity-20 md:mb-10" />
            <p className="mb-6 font-display text-[0.9rem] font-semibold tracking-[0.14em] text-highlight-700 uppercase">
              Mission
            </p>
            <h2 className="max-w-[22ch] font-serif text-statement font-normal tracking-[-0.012em] text-graphite">
              {thesis.statement} <em className="text-highlight-700">{thesis.emphasis}</em>
            </h2>
            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-9 lg:gap-8">
              <p className="text-lede text-graphite/85 lg:col-span-5">{thesis.body}</p>
              <figure className="border-t border-graphite/20 pt-5 lg:col-span-4">
                <figcaption className="type-label text-graphite/70">Our mission</figcaption>
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-graphite/85">{mission}</blockquote>
              </figure>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** 03 — What the summit offers beyond panels. */
export function ExperienceSection() {
  return (
    <Section tone="ink-2">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            label="The summit"
            heading="More than a conference."
            lede="Two days built to move ideas into action — and to connect the people who can act on them."
          />
          <div className="mt-14 md:mt-20">
            <PillarGrid pillars={pillars} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** 04 — Preliminary format and the five lanes of conversation. */
export function ProgramPreview() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            label="Program"
            meta="Preliminary"
            heading="Two days. One statewide network."
            lede="A day to connect, a day to convene — organized around five broad lanes of conversation."
          />
          <div className="mt-14 md:mt-20">
            <FormatDays surface="ink" />
            <div className="mt-16">
              <p className="type-label mb-2 text-bone/70">Five lanes of conversation</p>
              <LaneList compact />
            </div>
            {isPageEnabled("/program") && (
              <p className="mt-8">
                <TextLink href="/program" className="font-medium text-bone">
                  Explore the program
                </TextLink>
              </p>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** 05 — Innovation expo and pitch competition (dark signature moment over footage). */
export function InnovationSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-bone md:py-36">
      <Image src={heroVideo.posterDesktop} alt="" fill sizes="100vw" className="-z-20 object-cover object-right" />
      <div aria-hidden="true" className="shade-even absolute inset-0 -z-10" />
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            label="Innovation"
            heading="From lab to mission."
            lede="A showcase and a stage for the research, teams, and technologies shaping national security."
          />
          <div className="mt-14 md:mt-20">
            <InnovationFeature />
            <div className="mt-10">
              <ButtonLink href={isPageEnabled("/innovation") ? "/innovation" : "/experience#innovation"} variant="secondary" arrow>
                Innovation at the summit
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** 06 — Who should attend and what they gain (light break). */
export function AudienceSection() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <SectionHeader
            tone="paper"
            index="06"
            label="Who it’s for"
            heading="One room. Every part of the ecosystem."
          />
          <div className="mt-14 md:mt-20">
            <AudienceGrid />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** 08 — Organizers (data-driven roles; light). */
export function OrganizersSection() {
  return (
    <Section tone="paper" spacing="compact">
      <Container>
        <Reveal>
          <SectionHeader tone="paper" index="08" label="Organizers" heading="Organized in Florida, for the nation." />
          <div className="mt-12">
            <OrgGroups />
            <p className="mt-10">
              <TextLink href={isPageEnabled("/partners") ? "/partners" : "/get-involved"} className="font-medium text-graphite">
                Partner with the summit
              </TextLink>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
