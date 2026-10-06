import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks/CtaBand";
import { OrgGroups } from "@/components/blocks/OrgGroups";
import { PageHero } from "@/components/blocks/PageHero";
import { PillarGrid } from "@/components/blocks/PillarGrid";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { inquiryHref, site } from "@/content/site";
import { partnerValues } from "@/content/summit";

export const metadata: Metadata = {
  title: "Partners",
  description: `Partner with the ${site.name} — reach talent, showcase capabilities, and help build a statewide institution.`,
};

const partnershipHref = inquiryHref("Partnership inquiry");

export default function PartnersPage() {
  return (
    <>
      <PageHero
        label="Partners"
        title="Partner with the summit."
        lede="Universities, companies, government organizations, and foundations can help launch a statewide forum for Florida’s national-security ecosystem."
      >
        <ButtonLink href={partnershipHref} arrow>
          Start a conversation
        </ButtonLink>
      </PageHero>

      <Section tone="ink-2">
        <Container>
          <Reveal>
            <SectionHeader index="01" label="Why partner" heading="What partnership makes possible." />
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
              index="02"
              label="Organizers"
              heading="Who’s behind the summit."
              lede="Partners and sponsors coming soon — recognition will appear here as partnerships are confirmed."
            />
            <div className="mt-12">
              <OrgGroups />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              label="Get in touch"
              heading="Let’s talk about partnership."
              lede="Partnership is tailored to each organization. Tell us what you’d like to accomplish and we’ll follow up."
            />
            <div className="mt-10 flex flex-col gap-6">
              <div>
                <ButtonLink href={partnershipHref} arrow>
                  Email the summit team
                </ButtonLink>
              </div>
              <p className="text-bone/80">
                Or write to{" "}
                <TextLink href={`mailto:${site.contact.email}`} className="text-bone">
                  {site.contact.email}
                </TextLink>
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
