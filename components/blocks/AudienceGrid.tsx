import { audiences } from "@/content/summit";

/** Who the summit serves and what each audience gains — on a light (paper) surface. */
export function AudienceGrid() {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {audiences.map((audience) => (
        <li key={audience.title} className="border-t border-graphite/20 pt-5">
          <h3 className="font-display text-[1.35rem] leading-tight font-medium tracking-[-0.01em]">{audience.title}</h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-graphite/80">{audience.value}</p>
        </li>
      ))}
    </ul>
  );
}
