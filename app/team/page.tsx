import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { PersonCard } from "@/components/blocks/PersonCard";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { people, teamGroups } from "@/content/people";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Team",
  description: `The students and advisors behind the ${site.name}.`,
};

/** Columns at desktop width, by seat count: 3 → one row, 6 → two rows of three, 4 → one row. */
const columns = (seats: number) => (seats % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3");

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Team"
        title="The team"
        lede="The summit is organized by students at the University of Florida National Security Club, with guidance from faculty and professional advisors."
      />

      {teamGroups.map(({ group, title, lede, seats }) => {
        const members = people.filter((p) => p.group === group);
        const open = Math.max(seats - members.length, 0);
        return (
          <Section key={group} tone="paper" spacing="compact">
            <Container>
              <Reveal>
                <SectionHeader tone="paper" label={title} heading={title} lede={lede} />
                <ul className={cn("mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-14", columns(seats))}>
                  {members.map((m) => (
                    <PersonCard key={m.id} person={m} />
                  ))}
                  {Array.from({ length: open }, (_, i) => (
                    <PersonCard key={`open-${i}`} />
                  ))}
                </ul>
              </Reveal>
            </Container>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
