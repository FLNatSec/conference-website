import { SectionHeader } from "@/components/blocks/SectionHeader";
import { FloridaMap } from "@/components/graphics/florida/FloridaMap";
import { RegionExplorer } from "@/components/sections/why-florida/RegionExplorer";
import { floridaBounds, regionShapes } from "@/content/florida/regions-geometry";
import { MAP_HEIGHT, MAP_WIDTH } from "@/lib/map";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  capabilities,
  categoryGroups,
  connectedGroups,
  ecosystemReviewStatus,
  floridaStats,
  history,
  regions,
  statewide,
} from "@/content/florida/ecosystem";
import { isPageEnabled } from "@/content/features";
import { site } from "@/content/site";
import { thesis } from "@/content/summit";
import type { Source } from "@/lib/types";

/* ---------- 01 Florida today ---------- */

/**
 * Five strategic capabilities (what Florida has and the national priority each
 * serves), verified headline figures, then the region explorer — grouped by the
 * same five areas — for the specifics.
 */
export function FloridaToday() {
  return (
    <Section tone="paper" id="today">
      <Container>
        <Reveal>
          <SectionHeader
            tone="paper"
            index="01"
            label="Florida today"
            heading="From the Panhandle to the Keys."
            lede="Some of Florida’s key strengths, spread across the state and tied to national priorities."
          />
        </Reveal>

        <Reveal>
          <ul className="mt-12 border-t border-graphite/15 md:mt-16">
            {capabilities.map((capability) => (
              <li key={capability.title} className="grid gap-2 border-b border-graphite/15 py-5 md:grid-cols-12 md:gap-8">
                <h3 className="font-display text-[1.15rem] font-medium md:col-span-3">{capability.title}</h3>
                <p className="text-[1rem] leading-relaxed text-graphite/80 md:col-span-9">
                  {capability.body}
                  {capability.source && (
                    <>
                      {" "}
                      <SourceLink source={capability.source} inline />
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <dl className="mt-14 grid gap-px overflow-hidden border border-graphite/15 bg-graphite/15 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {floridaStats.map((stat) => (
              <div key={stat.value} className="flex flex-col bg-paper p-6 md:p-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="type-expanded font-display text-[2.4rem] leading-none font-semibold md:text-[2.9rem]">
                  {stat.value}
                </dd>
                <dd className="mt-4 text-[0.95rem] leading-snug text-graphite/80">{stat.label}</dd>
                <dd className="mt-auto pt-5">
                  <SourceLink source={stat.source} inline />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 md:mt-24">
          <RegionExplorer
            regions={regions}
            statewide={statewide}
            categoryGroups={categoryGroups}
            labelPoints={Object.fromEntries(Object.entries(regionShapes).map(([id, v]) => [id, v.label]))}
            bounds={floridaBounds}
          >
            <FloridaMap
              idPrefix="explorer"
              className="fl-map--paper"
              anchors={8}
              showAnchors={false}
              showNetwork={false}
              showRoutes={false}
              showLabels={false}
              showWaterlines={false}
            />
            <svg className="rx-regions" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
              {Object.entries(regionShapes).map(([id, shape]) => (
                <path key={id} d={shape.d} data-region={id} />
              ))}
            </svg>
          </RegionExplorer>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 02 How Florida got here ---------- */

export function FloridaHistory() {
  return (
    <Section tone="ink" id="history">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            label="How Florida got here"
            heading="More than a century in the making."
            lede="Today’s ecosystem was built over decades — by policy, investment, institutions, and geography."
          />
        </Reveal>

        <ol className="mt-16 md:mt-24">
          {history.map((era) => {
            const region = regions.find((r) => r.id === era.regionId);
            return (
              <li key={era.year + era.title} className="border-t border-bone/12 py-10 md:py-12">
                <Reveal className="grid gap-4 md:grid-cols-9 md:gap-8">
                  <p className="type-expanded font-display text-[2.6rem] leading-none font-semibold text-highlight-300 md:col-span-3 md:text-[3.4rem]">
                    {era.year}
                  </p>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-[1.35rem] leading-tight font-medium">{era.title}</h3>
                    <p className="mt-3 max-w-[56ch] text-[1.02rem] leading-relaxed text-bone/80">{era.body}</p>
                    <p className="type-label mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-bone/60">
                      {region && (
                        <a href={`#region-${region.id}`} className="text-bone/80 hover:text-bone">
                          Today: {region.name} →
                        </a>
                      )}
                      <SourceLink source={era.source} tone="ink" inline />
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}


/* ---------- 03 The opportunity (and why this summit exists) ---------- */

/** The two-part case for the summit, from the planning overview. */
const opportunityCase = [
  {
    title: "Building connections",
    body: "Bring Florida’s commands, industry, investors, and universities into the same conversations, and link them with the national security community across the country.",
  },
  {
    title: "Inspiring new talent",
    body: "Show students in engineering, computing, business, policy, and law the many ways they can contribute to national security, and connect them with the people already doing the work.",
  },
];

export function FloridaOpportunity() {
  return (
    <Section tone="ink-2" id="opportunity">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            label="The opportunity ahead"
            heading={
              <>
                {thesis.statement} <span className="text-highlight-300">{thesis.emphasis}</span>
              </>
            }
            lede={
              <>
                The {site.name} exists to strengthen those connections and to inform and inspire the next generation
                to join the mission.
              </>
            }
          />
        </Reveal>

        <Reveal className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ConnectionDiagram />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-bone/12">
              {opportunityCase.map((item) => (
                <li key={item.title} className="border-b border-bone/12 py-6">
                  <h3 className="font-display text-[1.2rem] font-medium">{item.title}</h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-bone/75">{item.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.ctas.primary.href} arrow>
                {site.ctas.primary.label}
              </ButtonLink>
              <ButtonLink href="/experience" variant="secondary">
                The Experience
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Five groups around the summit as the convening point (list on small screens). */
function ConnectionDiagram() {
  const cx = 300;
  const cy = 210;
  const radius = 160;
  const points = connectedGroups.map((label, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / connectedGroups.length;
    return { label, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  return (
    <>
      <svg viewBox="0 0 600 420" className="hidden w-full md:block" role="img" aria-label={`The summit connects ${connectedGroups.join(", ")}.`}>
        {points.map((p, i) =>
          points.slice(i + 1).map((q) => (
            <line key={p.label + q.label} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--color-bone)" strokeOpacity="0.12" />
          )),
        )}
        {points.map((p) => (
          <line key={p.label} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-highlight-300)" strokeOpacity="0.55" />
        ))}
        <circle cx={cx} cy={cy} r="34" fill="none" stroke="var(--color-highlight-300)" />
        <circle cx={cx} cy={cy} r="5" fill="var(--color-highlight-300)" />
        <text x={cx} y={cy + 56} textAnchor="middle" className="fill-bone font-mono text-[15px] tracking-[0.14em] uppercase">
          The summit
        </text>
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--color-bone)" />
            <text
              x={p.x}
              y={p.y + (p.y < cy ? -14 : 22)}
              textAnchor="middle"
              className="fill-bone/80 font-mono text-[14px] tracking-[0.1em] uppercase"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <ul className="border-t border-bone/12 md:hidden">
        {connectedGroups.map((g) => (
          <li key={g} className="type-label flex items-center gap-3 border-b border-bone/12 py-3 text-bone/80">
            <span aria-hidden="true" className="size-1 rounded-full bg-highlight-300" />
            {g}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------- Why this summit exists (not rendered; merged into FloridaOpportunity) ---------- */

export function WhyThisSummit() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            label="Why this summit"
            heading="A forum built to connect the network."
            lede={
              <>
                The {site.name} convenes Florida’s ecosystem — and leaders from across the country — to align
                capabilities with national priorities, foster collaboration, and advance national security.
              </>
            }
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.ctas.primary.href} arrow>
              {site.ctas.primary.label}
            </ButtonLink>
            {isPageEnabled("/program") && (
              <ButtonLink href="/program" variant="secondary">
                See the program
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ---------- Sources ---------- */

export function FloridaSources() {
  const all = new Map<string, Source>();
  for (const r of regions) for (const n of r.nodes) all.set(n.source.url, n.source);
  for (const e of history) all.set(e.source.url, e.source);
  for (const st of floridaStats) all.set(st.source.url, st.source);
  for (const c of capabilities) if (c.source) all.set(c.source.url, c.source);
  for (const node of statewide) all.set(node.source.url, node.source);
  const sources = [...all.values()].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Section tone="paper" spacing="compact" id="sources">
      <Container>
        <details className="group">
          <summary className="type-label flex cursor-pointer list-none items-center justify-between border-y border-graphite/20 py-5 text-graphite/80">
            Sources and notes ({sources.length})
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          {ecosystemReviewStatus === "draft" && (
            <p className="mt-6 max-w-[70ch] border-l-2 border-highlight-700 pl-4 text-sm text-graphite/80">
              Draft for review: this page links official sources for every institution and milestone, and is being
              fact-checked before publication.
            </p>
          )}
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="text-graphite/80 underline-offset-4 hover:text-graphite hover:underline" rel="noopener noreferrer" target="_blank">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </Section>
  );
}

function SourceLink({ source, tone = "paper", inline = false }: { source: Source; tone?: "paper" | "ink"; inline?: boolean }) {
  const cls =
    tone === "ink"
      ? "text-bone/60 hover:text-bone"
      : "text-graphite/70 hover:text-graphite";
  const link = (
    <a href={source.url} className={`${cls} type-label underline-offset-4 hover:underline`} rel="noopener noreferrer" target="_blank">
      Source: {source.title} ↗
    </a>
  );
  return inline ? link : <p className="mt-3">{link}</p>;
}
