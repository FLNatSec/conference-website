import { audiences } from "@/content/summit";

/** Who the summit serves and what each audience gains — on a light (paper) surface. */
export function AudienceGrid() {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map((audience, i) => (
        <li key={audience.title} className="border-t border-graphite/20 pt-5">
          <p className="type-label text-graphite/70">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 font-display text-[1.35rem] leading-tight font-medium tracking-[-0.01em]">{audience.title}</h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-graphite/80">{audience.value}</p>
        </li>
      ))}
    </ul>
  );
}
