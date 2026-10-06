import { FloridaMap, type FloridaMapProps } from "@/components/graphics/florida/FloridaMap";
import { HeroMotionControl } from "@/components/motion/HeroMotionControl";
import { Container } from "@/components/ui/Container";
import { getCurrentEdition } from "@/lib/content";
import "./why-florida-opener.css";

interface WhyFloridaOpenerProps {
  /** Map options (anchors count, layers) — the lab overrides these. */
  map?: Partial<Omit<FloridaMapProps, "idPrefix" | "animate">>;
}

/**
 * Opener for the Why Florida page: the "Florida Network Activation" sequence —
 * the state drawn as a statewide system of regional anchors, with a launch
 * trajectory and sea lanes reaching beyond it. Text is server-rendered and
 * visible at first paint; the animation never gates content.
 */
export function WhyFloridaOpener({ map }: WhyFloridaOpenerProps) {
  const edition = getCurrentEdition();

  return (
    <section data-hero-root aria-labelledby="wf-title" className="wfo relative isolate overflow-hidden bg-ink text-bone">
      <div aria-hidden="true" className="wfo__atmosphere" />

      <div className="wfo__map">
        <FloridaMap idPrefix="wf" animate hostTag={edition.label} {...map} />
      </div>

      <Container className="wfo__content relative">
        <p className="type-label flex items-center gap-3 text-bone/70">
          <span aria-hidden="true" className="h-px w-7 bg-highlight-300" />
          Why Florida
        </p>

        <h1
          id="wf-title"
          className="type-expanded mt-6 font-display text-display-xl font-semibold tracking-[-0.012em] uppercase md:mt-8"
        >
          The
          <br />
          Connected
          <br />
          State
        </h1>

        <p className="mt-7 max-w-[30ch] font-serif text-[1.45rem] leading-snug text-bone/85 md:text-[1.75rem]">
          Florida is not where national security happens to meet. It is where much of it already operates.
        </p>
      </Container>

      <div className="wfo__strip">
        <Container className="flex items-center justify-end py-4 text-bone/60">
          <HeroMotionControl />
        </Container>
      </div>
    </section>
  );
}
