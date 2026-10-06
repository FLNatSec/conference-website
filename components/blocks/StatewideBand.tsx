import { FloridaMap } from "@/components/graphics/florida/FloridaMap";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { statewide } from "@/content/summit";
import { getCurrentEdition } from "@/lib/content";

/**
 * The statewide, rotating-host vision — stated without implying a future-host
 * process exists. Shows only the current edition marker.
 */
export function StatewideBand({ index = "07" }: { index?: string }) {
  const edition = getCurrentEdition();
  const marker = `Edition ${String(edition.number).padStart(2, "0")} · ${edition.city} · ${edition.year}`;

  return (
    <Section tone="ink-2" className="overflow-hidden">
      <Container>
        <Reveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionLabel index={index} title="Statewide" className="text-bone/70" />
            <Rule draw className="mt-8 mb-10" />
            <h2 className="type-expanded max-w-[16ch] font-display text-display-m leading-[1.02] font-semibold uppercase">
              {statewide.headline}
            </h2>
            <p className="mt-6 max-w-[50ch] text-lede text-bone/75">{statewide.body}</p>
            <p className="type-label mt-10 inline-flex items-center gap-3 border border-highlight-300/50 px-4 py-3 text-bone">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight-300" />
              {marker}
            </p>
          </div>
          <div className="lg:col-span-6">
            <FloridaMap
              idPrefix="statewide"
              anchors={8}
              showRoutes={false}
              showLabels={false}
              showWaterlines={false}
              hostTag={edition.label}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
