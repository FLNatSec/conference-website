import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional duotone background still (graded footage frame). */
  image?: StaticImageData;
  children?: ReactNode;
}

/** Interior page opener: navy, large expanded title, short lede, optional actions. */
export function PageHero({ label, title, lede, image, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-bone">
      {image && (
        <>
          <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover object-right" />
          <div
            aria-hidden="true"
            className="shade-left absolute inset-0 -z-10"
          />
        </>
      )}
      <Container className="pt-36 pb-20 md:pt-48 md:pb-28">
        <p className="type-label flex items-center gap-3 text-bone/75">
          <span aria-hidden="true" className="h-px w-7 bg-highlight-300" />
          {label}
        </p>
        <h1 className="type-expanded mt-8 max-w-[14ch] font-display text-display-l font-semibold uppercase">{title}</h1>
        {lede && <div className="mt-8 max-w-[56ch] text-lede text-bone/80">{lede}</div>}
        {children && <div className="mt-10 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </Container>
    </section>
  );
}
