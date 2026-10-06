import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { InnovationFeature } from "@/components/blocks/InnovationFeature";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { heroVideo } from "@/content/media/hero-video";
import { inquiryHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Innovation",
  description:
    "The National Security Innovation Expo and Pitch Competition — a showcase and a stage for research, student teams, startups, and emerging capabilities.",
};

export default function InnovationPage() {
  return (
    <>
      <PageHero
        label="Innovation"
        title="From lab to mission."
        lede="A showcase and a stage for the research, teams, and technologies shaping national security — in front of the operators, investors, industry, and government leaders who can carry them forward."
        image={heroVideo.posterDesktop}
      />

      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              label="Expo & pitch"
              heading="Two ways to bring an idea to the summit."
            />
            <div className="mt-14 md:mt-20">
              <InnovationFeature detailed />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHeader
              tone="paper"
              index="02"
              label="Get involved"
              heading="Interested in exhibiting or pitching?"
              lede="Let us know now. We’ll share participation details, eligibility, and timelines with interested teams as soon as they are set."
            />
            <div className="mt-10">
              <ButtonLink href={inquiryHref("Innovation Expo / Pitch Competition interest")} tone="paper" arrow>
                Express interest
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
