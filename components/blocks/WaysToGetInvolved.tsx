import { TextLink } from "@/components/ui/TextLink";
import { waysToGetInvolved } from "@/content/summit";

/** Ways to get involved, each with a working link (pre-addressed email or #join). Paper surface. */
export function WaysToGetInvolved() {
  return (
    <ul className="border-t border-graphite/20">
      {waysToGetInvolved.map((way) => (
        <li key={way.title} className="grid gap-3 border-b border-graphite/20 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
          <h3 className="font-display text-[1.2rem] leading-tight font-medium md:col-span-4">{way.title}</h3>
          <p className="text-[0.98rem] leading-relaxed text-graphite/80 md:col-span-5">{way.body}</p>
          <p className="md:col-span-3 md:text-right">
            <TextLink href={way.href} className="font-medium text-graphite">
              {way.action} <span aria-hidden="true">→</span>
            </TextLink>
          </p>
        </li>
      ))}
    </ul>
  );
}
