import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

/** What's next: speakers, partners, and registration — each marked "coming soon". */
export function ComingSoon() {
  return (
    <Section tone="ink-2" spacing="compact">
      <Container>
        <Reveal>
          <SectionHeader label="Coming soon" heading="Speakers, partners, and registration." />
          <ul className="mt-12 grid gap-px overflow-hidden border border-bone/12 bg-bone/12 md:grid-cols-3">
            {site.comingSoon.map((item) => (
              <li key={item.id} id={item.id} className="flex scroll-mt-24 flex-col bg-ink-2 p-7 md:p-8">
                <p className="type-label inline-flex w-fit items-center gap-2 border border-highlight-300/50 px-2.5 py-1 text-highlight-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight-300" />
                  Coming soon
                </p>
                <h3 className="type-expanded mt-8 font-display text-[1.55rem] leading-none font-semibold uppercase">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-bone/75">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={site.ctas.primary.href} arrow>
              Get notified
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
