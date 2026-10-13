import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { OrgGroups } from "@/components/blocks/OrgGroups";
import { PageHero } from "@/components/blocks/PageHero";
import { PillarGrid } from "@/components/blocks/PillarGrid";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { WaysToGetInvolved } from "@/components/blocks/WaysToGetInvolved";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { partnerValues } from "@/content/summit";

export const metadata: Metadata = {
  title: "Get Involved",
  description: `Speak, sponsor, partner, exhibit, or attend the ${site.name}. Contact the student organizing team at ${site.contact.email}.`,
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        label="Take part"
        title="Get involved"
        lede="The inaugural summit is taking shape, and we’d like to build it with you. Whether you want to speak, sponsor, exhibit, or connect us with others, there’s a role for you."
      >
        <ButtonLink href={`mailto:${site.contact.email}`} arrow>
          Email the summit team
        </ButtonLink>
      </PageHero>

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader tone="paper" label="Ways to take part" heading="Find the path that fits." />
            <div className="mt-12 md:mt-16">
              <WaysToGetInvolved />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink-2">
        <Container>
          <Reveal>
            <SectionHeader
              label="Why partner"
              heading="What partnership makes possible."
              lede="Partnership is tailored to each organization. Tell us what you’d like to accomplish and we’ll follow up."
            />
            <div className="mt-14 md:mt-20">
              <PillarGrid pillars={partnerValues} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              label="Who’s behind the summit"
              heading="Led by students, built to grow."
              lede="The summit is led by the University of Florida National Security Club, with the UF Engineering Innovation Institute and UF IEEE as partners. Over time, the vision is a statewide conference that rotates among universities across Florida."
            />
            <div className="mt-12">
              <OrgGroups />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
