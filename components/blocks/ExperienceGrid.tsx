import { experience } from "@/content/summit";

/**
 * The four elements of the summit experience, on a navy surface. `detailed`
 * gives each card an anchor (used on /experience, e.g. #innovation).
 */
export function ExperienceGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
      {experience.elements.map((item) => (
        <li
          key={item.id}
          id={detailed ? item.id : undefined}
          className="flex scroll-mt-24 flex-col bg-ink-deep/80 p-7 backdrop-blur-sm md:p-8"
        >
          <h3 className="type-expanded max-w-[16ch] font-display text-[1.35rem] leading-[1.05] font-semibold uppercase md:text-[1.5rem]">
            {item.title}
          </h3>
          {item.status && (
            <p className="type-label mt-4 w-fit border border-bone/30 px-2.5 py-1 text-bone/80">{item.status}</p>
          )}
          <p className="mt-5 text-[0.98rem] leading-relaxed text-bone/80">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
