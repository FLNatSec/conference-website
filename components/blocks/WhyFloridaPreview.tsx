import { FloridaMap } from "@/components/graphics/florida/FloridaMap";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { floridaMotifs } from "@/content/summit";
import { getCurrentEdition } from "@/lib/content";

/**
 * Homepage preview of the Why Florida thesis: a static statewide network map
 * plus the categories of capability. Evidence and sources live on /why-florida.
 */
export function WhyFloridaPreview({ index = "02" }: { index?: string }) {
  const edition = getCurrentEdition();
  return (
    <Section tone="ink" className="overflow-hidden">
      <Container>
        <Reveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionLabel index={index} title="Why Florida" className="text-bone/70" />
            <Rule draw className="mt-8 mb-10" />
            <h2 className="max-w-[16ch] font-display text-display-m font-medium tracking-[-0.02em]">
              A statewide national-security ecosystem.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lede text-bone/75">
              From the Panhandle to the Space Coast to the Keys, Florida brings together capabilities the nation relies on.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {floridaMotifs.map((motif) => (
                <li key={motif} className="type-label border border-bone/20 px-3 py-2 text-bone/80">
                  {motif}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/why-florida" variant="secondary" arrow>
                Explore why Florida
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="-mx-[8%] lg:-mr-[14%] lg:ml-0">
              <FloridaMap idPrefix="preview" anchors={8} hostTag={edition.label} />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
