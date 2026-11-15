import Image from "next/image";
import { features } from "@/content/features";
import { getCurrentEdition, getSponsorGroups } from "@/lib/content";

/** True when there are confirmed sponsors to show. Use to gate a whole section. */
export function hasSponsors(): boolean {
  return features.sponsors && getSponsorGroups(getCurrentEdition()).length > 0;
}

/**
 * Confirmed sponsors grouped by tier, highest first (edition.sponsors). Paper surface.
 * Logos appear once `logo` is set in content/organizations.ts; until then the name shows.
 * Renders nothing while features.sponsors is off or no sponsor is confirmed.
 */
export function SponsorWall() {
  if (!hasSponsors()) return null;
  return (
    <div className="flex flex-col gap-10">
      {getSponsorGroups(getCurrentEdition()).map(({ tier, organizations }) => (
        <div key={tier.id} className="border-t border-graphite/20 pt-5">
          <p className="type-label text-graphite/70">{tier.name} sponsors</p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
            {organizations.map((org) => (
              <li key={org.id}>
                {org.logo ? (
                  <span className="relative block h-12 w-44">
                    <Image src={org.logo} alt={org.name} fill sizes="176px" className="object-contain object-left" />
                  </span>
                ) : (
                  <span className="font-display text-[1.35rem] font-medium tracking-[-0.01em]">{org.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
