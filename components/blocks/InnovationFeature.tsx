import { innovation } from "@/content/summit";

/**
 * The Innovation Expo and Pitch Competition. `detailed` adds who each is for.
 * No eligibility, prizes, or dates are shown until they are set.
 */
export function InnovationFeature({ detailed = false }: { detailed?: boolean }) {
  const items = [innovation.expo, innovation.pitch];
  return (
    <div>
      <div className="grid gap-px overflow-hidden border border-bone/15 bg-bone/15 md:grid-cols-2">
        {items.map((item, i) => (
          <article key={item.title} className="flex flex-col bg-ink-deep/80 p-7 backdrop-blur-sm md:p-10">
            <p className="type-label text-highlight-300">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="type-expanded mt-8 max-w-[16ch] font-display text-[1.7rem] leading-[1.02] font-semibold uppercase md:text-[2.1rem]">
              {item.title}
            </h3>
            <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-relaxed text-bone/80">{item.body}</p>
            {detailed && (
              <>
                <p className="type-label mt-8 text-bone/60">Who it’s for</p>
                <ul className="mt-3 border-t border-bone/12">
                  {item.forWhom.map((who) => (
                    <li key={who} className="flex items-center gap-3 border-b border-bone/12 py-3 text-[0.98rem] text-bone/85">
                      <span aria-hidden="true" className="size-1 rounded-full bg-highlight-300" />
                      {who}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm text-bone/65">{innovation.status}</p>
    </div>
  );
}
