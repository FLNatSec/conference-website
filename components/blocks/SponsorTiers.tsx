import { ButtonLink } from "@/components/ui/Button";
import { inquiryHref } from "@/content/site";
import { sponsorAddOns, sponsorBenefits, sponsorship, sponsorTiers } from "@/content/sponsorship";
import type { SignatureOption } from "@/lib/types";

function Options({ options }: { options: SignatureOption[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {options.map((option) => (
        <li key={option.title} className="text-[0.95rem] leading-snug text-bone/85">
          {option.title}
          {option.price && <span className="text-bone/65"> ({option.price})</span>}
          {!option.available && <span className="type-label ml-2 text-bone/60">Taken</span>}
        </li>
      ))}
    </ul>
  );
}

/**
 * Sponsorship tiers from content/sponsorship.ts: price, included benefits, and
 * signature sponsorships per tier, then add-ons and how to sponsor. For navy surfaces.
 * Gate with features.sponsorTiers.
 */
export function SponsorTiers() {
  const notes = sponsorBenefits.flatMap((benefit) => (benefit.note ? [benefit.note] : []));
  return (
    <div>
      <ul className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-5">
        {sponsorTiers.map((tier) => (
          <li key={tier.id} className="flex flex-col bg-ink p-6 md:p-7">
            <h3 className="type-label text-highlight-300">{tier.name}</h3>
            <p className="type-expanded mt-4 font-display text-[2rem] leading-none font-semibold">{tier.price}</p>
            <p className="mt-3 min-h-5 text-sm text-bone/65">{tier.limit}</p>
            <dl className="mt-5 border-t border-bone/12">
              {sponsorBenefits.map((benefit) => (
                <div key={benefit.id} className="border-b border-bone/12 py-3">
                  <dt className="text-sm text-bone/65">{benefit.label}</dt>
                  <dd className="mt-0.5 text-[0.98rem] text-bone">{tier.benefits[benefit.id]}</dd>
                </div>
              ))}
            </dl>
            <p className="type-label mt-6 text-bone/65">Signature sponsorships</p>
            <Options options={tier.signature} />
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="border-t border-bone/15 pt-5">
          <p className="type-label text-bone/65">Add-ons, any tier</p>
          <Options options={sponsorAddOns} />
        </div>
        <div className="border-t border-bone/15 pt-5">
          <p className="type-label text-bone/65">How to sponsor</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.95rem] text-bone/85">
            {sponsorship.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-8 max-w-[70ch] text-sm text-bone/60">{[...notes, sponsorship.footnote].join(" ")}</p>
      <div className="mt-8">
        <ButtonLink href={inquiryHref("Sponsorship inquiry")} arrow>
          Email us to sponsor
        </ButtonLink>
      </div>
    </div>
  );
}
