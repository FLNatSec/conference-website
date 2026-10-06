import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { formatDateRange, getCurrentEdition, getOrgGroups } from "@/lib/content";

/** Footer. Organizer groups render only roles whose public wording is confirmed. */
export function SiteFooter() {
  const edition = getCurrentEdition();
  const groups = getOrgGroups(edition);
  const linkClass = "text-[0.95rem] text-bone/75 transition-colors hover:text-bone";

  return (
    <footer className="bg-ink text-bone">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Wordmark variant="stacked" />
          <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-bone/70">
            A student-led summit connecting Florida’s national-security ecosystem with leaders from across the country.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:col-span-3">
          {groups.map((group) => (
            <div key={group.roleLabel}>
              <p className="type-label text-bone/60">{group.roleLabel}</p>
              <ul className="mt-3 space-y-1.5">
                {group.organizations.map((org) => (
                  <li key={org.id} className="text-[0.95rem] text-bone/85">
                    {org.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="type-label text-bone/60">Explore</p>
          <ul className="mt-3 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="type-label text-bone/60">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={`mailto:${site.contact.email}`} className={linkClass}>
                {site.contact.email}
              </a>
            </li>
            {site.social.linkedin && (
              <li>
                <a href={site.social.linkedin} className={linkClass} rel="noopener noreferrer" target="_blank">
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a href={site.mailingList.href} className={linkClass}>
                {site.ctas.primary.label}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-bone/10">
        <Container className="flex flex-col gap-3 py-6 text-bone/60 md:flex-row md:items-center md:justify-between">
          <p className="type-label">
            {edition.label} · {edition.city}, {edition.state} · {formatDateRange(edition.startDate, edition.endDate)}
          </p>
        </Container>
      </div>
    </footer>
  );
}
