import Image from "next/image";
import { SignupForm } from "@/components/forms/SignupForm";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { heroVideo } from "@/content/media/hero-video";
import { site } from "@/content/site";
import { finalCta } from "@/content/summit";

/**
 * Closing invitation used at the end of every page (anchor: #join), with the
 * mailing-list signup form (Kit backend; see app/actions/subscribe.ts).
 */
export function CtaBand() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative isolate scroll-mt-16 overflow-hidden bg-ink text-bone">
      <Image src={heroVideo.posterDesktop} alt="" fill sizes="100vw" className="-z-20 object-cover object-right" />
      <div aria-hidden="true" className="shade-even absolute inset-0 -z-10" />

      <Container className="grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-36">
        <div className="md:col-span-7">
          <p className="type-label flex items-center gap-3 text-bone/75">
            <span aria-hidden="true" className="h-px w-7 bg-highlight-300" />
            Mailing list
          </p>
          <h2
            id="join-title"
            className="type-expanded mt-8 max-w-[18ch] font-display text-display-m font-semibold uppercase leading-[1.02]"
          >
            {finalCta.headline}
          </h2>
          <p className="mt-6 max-w-[48ch] text-lede text-bone/80">{finalCta.body}</p>
          <SignupForm className="mt-10" />
        </div>

        <div className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="type-label text-bone/70">Subscribers receive</p>
          <ul className="mt-4 border-t border-bone/15">
            {site.mailingList.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 border-b border-bone/15 py-3 text-[0.98rem] text-bone/85">
                <span aria-hidden="true" className="size-1 rounded-full bg-highlight-300" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2 text-[0.95rem] text-bone/80">
            <p>
              <TextLink href={`mailto:${site.contact.email}`} className="text-bone">
                {site.contact.email}
              </TextLink>
            </p>
            {site.social.linkedin && (
              <p>
                <TextLink href={site.social.linkedin} className="text-bone">
                  {site.name} on LinkedIn
                </TextLink>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
