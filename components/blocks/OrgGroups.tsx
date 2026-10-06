import Image from "next/image";
import { getCurrentEdition, getOrgGroups } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Organizations grouped by their per-edition role label (data-driven; no
 * relationship wording is hard-coded). Only confirmed roles render publicly.
 * Logos appear automatically once `logo` is set in content/organizations.ts.
 */
export function OrgGroups({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const groups = getOrgGroups(getCurrentEdition());
  const muted = tone === "ink" ? "text-bone/70" : "text-graphite/70";
  const line = tone === "ink" ? "border-bone/15" : "border-graphite/20";

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.roleLabel} className={cn("border-t pt-5", line)}>
          <p className={cn("type-label", muted)}>{group.roleLabel}</p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
            {group.organizations.map((org) => (
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
