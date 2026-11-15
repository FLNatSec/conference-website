import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/blocks/CtaBand";
import { OrgGroups } from "@/components/blocks/OrgGroups";
import { PageHero } from "@/components/blocks/PageHero";
import { PeopleList } from "@/components/blocks/PeopleList";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { StatewideBand } from "@/components/blocks/StatewideBand";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { site, socialLinks } from "@/content/site";
import { mission } from "@/content/summit";
import { formatEditionDates, formatWeekday, getCurrentEdition, getPeople } from "@/lib/content";
import { features } from "@/content/features";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name}: a student-led summit. Mission, format, statewide vision, organizers, and contact.`,
};

const groupTitles = { advisor: "Advisors", steering: "Steering committee", team: "Planning team" } as const;

export default function AboutPage() {
  // Hidden while the flag is off (next.config.ts also redirects this URL). See docs/feature-flags.md.
  if (!features.aboutPage) notFound();
  const edition = getCurrentEdition();
  const facts = [
    ["Dates", formatEditionDates(edition)],
    ["Location", `${edition.city}, ${edition.state}`],
    ["Edition", edition.label],
    ["Format", edition.format.map((d) => formatWeekday(d.date)).join(" and ")],
  ];
  const groups = (Object.keys(groupTitles) as (keyof typeof groupTitles)[])
    .filter((g) => getPeople(g).length > 0)
    .map((group) => ({ group }));

  return (
    <>
      <PageHero label="About" title="About the summit" lede={mission} />

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              index="01"
              label="The summit"
              heading="A statewide forum for national security."
              lede="Organized by students, the Florida National Security Summit brings together government and military leaders, companies and investors, universities and researchers, and students — to connect Florida’s national-security ecosystem with leaders, organizations, and ideas from across the country."
            />
            <dl className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
              {facts.map(([term, value]) => (
                <div key={term} className="border-t border-graphite/20 pt-4">
                  <dt className="type-label text-graphite/70">{term}</dt>
                  <dd className="mt-2 font-display text-[1.2rem] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <StatewideBand index="02" />

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              index="03"
              label="Organizers"
              heading="An independent summit, organized in Florida."
              lede="Students lead the planning, with support from faculty, institutions, and partners. The summit has its own identity and is designed to grow into a statewide institution across Florida’s universities."
            />
            <div className="mt-12">
              <OrgGroups />
            </div>
          </Reveal>
        </Container>
      </Section>

      {groups.map(({ group }) => (
        <Section key={group} tone="paper" spacing="compact">
          <Container>
            <SectionHeader tone="paper" label={groupTitles[group]} heading={groupTitles[group]} />
            <div className="mt-10">
              <PeopleList group={group} />
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="ink-2">
        <Container>
          <Reveal>
            <SectionHeader
              index="04"
              label="Contact"
              heading="Get in touch."
              lede="Questions about speaking, partnering, the innovation expo, or attending — we’d like to hear from you."
            />
            <div className="mt-10 flex flex-col gap-6">
              <p className="text-lede">
                <TextLink href={`mailto:${site.contact.email}`} className="text-bone">
                  {site.contact.email}
                </TextLink>
              </p>
              {socialLinks.map((link) => (
                <p key={link.platform}>
                  <TextLink href={link.href} className="text-bone">
                    {site.name} on {link.label}
                  </TextLink>
                </p>
              ))}
              <div>
                <ButtonLink href={site.ctas.primary.href} arrow>
                  {site.ctas.primary.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
