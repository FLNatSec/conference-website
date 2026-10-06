import Image from "next/image";
import { AudienceGrid } from "@/components/blocks/AudienceGrid";
import { FormatDays } from "@/components/blocks/FormatDays";
import { InnovationFeature } from "@/components/blocks/InnovationFeature";
import { LaneList } from "@/components/blocks/LaneList";
import { OrgGroups } from "@/components/blocks/OrgGroups";
import { PillarGrid } from "@/components/blocks/PillarGrid";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { heroVideo } from "@/content/media/hero-video";
import { mission, pillars, thesis } from "@/content/summit";

/*
 * Homepage sections, in order. Each answers part of: What is this? Why Florida?
 * What happens at the summit? Why should I get involved?
 */

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
            <p className="mt-8">
              <TextLink href="/program" className="font-medium text-bone">
                Explore the program
              </TextLink>
            </p>
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
              <ButtonLink href="/innovation" variant="secondary" arrow>
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
            label="Who should attend"
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
              <TextLink href="/partners" className="font-medium text-graphite">
                Partner with the summit
              </TextLink>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
