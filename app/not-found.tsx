import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <Section tone="ink" spacing="none" className="flex min-h-[80svh] items-center pt-32 pb-24">
      <Container>
        <SectionLabel index="404" title="Not yet on the map" className="text-bone/60" />
        <h1 className="type-expanded mt-8 max-w-[16ch] font-display text-display-m font-semibold uppercase">
          This page hasn&rsquo;t been published yet
        </h1>
        <p className="mt-6 max-w-[52ch] text-lede text-bone/75">
          The summit site is growing as the program takes shape. Join the mailing list to hear when new
          announcements go live.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href={site.ctas.primary.href} variant="secondary">
            {site.ctas.primary.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
