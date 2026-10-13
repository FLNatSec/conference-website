import { SectionHeader } from "@/components/blocks/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { site } from "@/content/site";

const items = () => (features.comingSoon ? site.comingSoon.filter((item) => item.show) : []);

function Badge() {
  return (
    <p className="type-label inline-flex w-fit items-center gap-2 border border-highlight-300/50 px-2.5 py-1 text-highlight-300">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight-300" />
      Coming soon
    </p>
  );
}

/** What's next, as cards: each `site.comingSoon` entry marked "coming soon". For navy surfaces. */
export function ComingSoonCards() {
  const list = items();
  if (list.length === 0) return null;
  return (
    <div>
      <ul className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 md:grid-cols-3">
        {list.map((item) => (
          <li key={item.id} id={item.id} className="flex scroll-mt-24 flex-col bg-ink-2 p-7 md:p-8">
            <Badge />
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
    </div>
  );
}

/** One-line "coming soon" note (titles only) with a notify button. For navy surfaces. */
export function ComingSoonStrip() {
  const list = items();
  if (list.length === 0) return null;
  return (
    <div className="flex flex-col gap-6 border border-bone/15 bg-ink-deep/70 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <Badge />
        <p className="font-display text-[1.1rem] font-medium text-bone">
          {list.map((item, i) => (
            <span key={item.id} className="inline-block whitespace-nowrap">
              {i > 0 && (
                <span aria-hidden="true" className="px-2.5 text-bone/45">
                  ·
                </span>
              )}
              {item.title}
            </span>
          ))}
        </p>
      </div>
      <div className="shrink-0">
        <ButtonLink href={site.ctas.primary.href} variant="secondary" size="small" arrow>
          Get notified
        </ButtonLink>
      </div>
    </div>
  );
}

/** Standalone "Coming soon" section (formerly on the homepage; reusable anywhere). */
export function ComingSoon() {
  if (items().length === 0) return null;
  return (
    <Section tone="ink-2" spacing="compact">
      <Container>
        <Reveal>
          <SectionHeader label="Coming soon" heading="What’s next." />
          <div className="mt-12">
            <ComingSoonCards />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
