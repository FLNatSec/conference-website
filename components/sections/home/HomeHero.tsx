import { getImageProps } from "next/image";
import { HeroVideo } from "@/components/media/HeroVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroVideo } from "@/content/media/hero-video";
import { site } from "@/content/site";
import { formatDateRange, getCurrentEdition } from "@/lib/content";
import { cn } from "@/lib/cn";
import "./home-hero.css";

export type TitleVariant = "expanded" | "editorial" | "anchored";
export type TaglineStyle = "sans" | "mono";

interface HomeHeroProps {
  titleVariant?: TitleVariant;
  taglineStyle?: TaglineStyle;
  /** Lab only: render the poster without video. */
  posterOnly?: boolean;
}

/**
 * Homepage hero: full-bleed cinematic footage under a navy grade, with the
 * summit name anchored to the lower third. Text and poster are
 * server-rendered and visible at first paint; video fades in afterwards.
 */
export function HomeHero({ titleVariant = "expanded", taglineStyle = "sans", posterOnly = false }: HomeHeroProps) {
  const edition = getCurrentEdition();
  const dates = formatDateRange(edition.startDate, edition.endDate);

  // Art-directed poster: vertical crop on small screens, 16:9 elsewhere.
  const common = { alt: heroVideo.posterAlt, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: heroVideo.posterDesktop });
  const {
    props: { srcSet: mobileSrcSet, ...posterProps },
  } = getImageProps({ ...common, src: heroVideo.posterMobile });

  return (
    <section
      data-hero-root
      aria-labelledby="hero-title"
      className="vhero relative isolate overflow-hidden bg-ink text-bone"
    >
      <picture>
        <source media="(min-width: 48rem)" srcSet={desktopSrcSet} />
        <source srcSet={mobileSrcSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from posterProps (decorative: "") */}
        <img {...posterProps} fetchPriority="high" className="absolute inset-0 z-0 h-full w-full object-cover" />
      </picture>

      {!posterOnly && (
        <HeroVideo
          desktop={heroVideo.desktop}
          mobile={heroVideo.mobile}
          chapters={heroVideo.chapters}
          credit={heroVideo.credit}
        />
      )}

      <div aria-hidden="true" className="vhero__shade" />

      <Container className="vhero__content relative z-3">
        <HeroTitle variant={titleVariant} />

        <p
          className={cn(
            "mt-6 max-w-[34ch] text-bone/85 md:mt-7",
            taglineStyle === "mono"
              ? "font-mono text-[0.95rem] tracking-[0.18em] uppercase md:text-[1.05rem]"
              : "text-[1.35rem] leading-snug font-light md:text-[1.65rem]",
          )}
        >
          {site.supportingLine}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.82rem] tracking-[0.14em] text-bone uppercase md:mt-8">
          <time dateTime={edition.startDate}>{dates}</time>
          <span aria-hidden="true" className="h-px w-8 bg-bone/35" />
          <span className="text-bone/70">{edition.city}, Florida</span>
        </p>
        <p className="mt-3 font-mono text-[0.78rem] tracking-[0.14em] text-highlight-300 uppercase">
          Registration coming soon
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <ButtonLink href={site.ctas.primary.href} arrow>
            {site.ctas.primary.label}
          </ButtonLink>
          <ButtonLink href={site.ctas.secondary.href} variant="secondary">
            {site.ctas.secondary.label}
          </ButtonLink>
        </div>
      </Container>

      {posterOnly && (
        <div className="absolute inset-x-0 bottom-0 z-3">
          <Container className="border-t border-bone/15 py-4">
            <span className="type-label text-bone/70">Poster only · {heroVideo.credit}</span>
          </Container>
        </div>
      )}
    </section>
  );
}

/** Title treatments (expanded is the chosen default). The full summit name always dominates. */
function HeroTitle({ variant }: { variant: TitleVariant }) {
  const base = "font-display text-bone";

  if (variant === "editorial") {
    return (
      <h1 id="hero-title" className={cn(base, "text-display-xl font-medium tracking-[-0.025em] md:max-w-[11ch]")}>
        Florida National Security Summit
      </h1>
    );
  }

  if (variant === "anchored") {
    return (
      <h1 id="hero-title" className={cn(base, "uppercase")}>
        <span className="type-expanded block text-[clamp(3.4rem,1.6rem+6.2vw,8.2rem)] leading-[0.88] font-semibold tracking-[-0.01em]">
          Florida
        </span>
        <span className="type-expanded mt-3 block text-[clamp(1.2rem,0.85rem+1.3vw,2.15rem)] leading-[1.08] font-medium tracking-[0.02em] text-bone/90">
          National Security
          <br />
          Summit
        </span>
      </h1>
    );
  }

  return (
    <h1
      id="hero-title"
      className={cn(base, "type-expanded text-display-xl font-semibold tracking-[-0.012em] uppercase")}
    >
      Florida
      <br />
      National
      <br />
      Security
      <br />
      Summit
    </h1>
  );
}
