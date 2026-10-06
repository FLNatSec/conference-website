"use client";

import { useEffect, useState } from "react";
import { contrastRatio, parseColor, toHex } from "@/lib/contrast";

interface Token {
  name: string;
  role: string;
}

interface Measured {
  hex: string;
  onPaper: number;
  onInk: number;
}

/** Resolves a CSS color token to RGB via a probe element (handles any color syntax). */
function resolve(name: string): [number, number, number] | null {
  const probe = document.createElement("span");
  probe.style.color = `var(--color-${name})`;
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return parseColor(value);
}

const grade = (r: number) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "—");

/**
 * Palette swatches with live WCAG contrast against paper and ink. Values are read
 * from the CSS tokens at runtime, so this sheet can never drift from globals.css.
 */
export function PaletteSwatches({ groups }: { groups: { title: string; tokens: Token[] }[] }) {
  const [measured, setMeasured] = useState<Record<string, Measured>>({});

  useEffect(() => {
    // Measure after layout, once fonts and styles have applied.
    const frame = requestAnimationFrame(() => {
      const paper = resolve("paper");
      const ink = resolve("ink");
      if (!paper || !ink) return;
      const result: Record<string, Measured> = {};
      for (const group of groups)
        for (const { name } of group.tokens) {
          const rgb = resolve(name);
          if (rgb) result[name] = { hex: toHex(rgb), onPaper: contrastRatio(rgb, paper), onInk: contrastRatio(rgb, ink) };
        }
      setMeasured(result);
    });
    return () => cancelAnimationFrame(frame);
  }, [groups]);

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="type-label mb-4 text-graphite/70">{group.title}</p>
          <ul className="grid grid-cols-2 gap-px border border-graphite/12 bg-graphite/12 sm:grid-cols-3 lg:grid-cols-5">
            {group.tokens.map(({ name, role }) => {
              const m = measured[name];
              return (
                <li key={name} className="bg-paper">
                  <div className="h-20 border-b border-graphite/10" style={{ background: `var(--color-${name})` }} />
                  <div className="space-y-1 p-3">
                    <p className="font-mono text-[0.78rem] text-graphite">{name}</p>
                    <p className="font-mono text-[0.72rem] text-graphite/70">{m?.hex ?? "…"}</p>
                    <p className="text-[0.78rem] leading-snug text-graphite/70">{role}</p>
                    {m && (
                      <p className="pt-1 font-mono text-[0.68rem] text-graphite/70">
                        paper {m.onPaper.toFixed(2)} · {grade(m.onPaper)}
                        <br />
                        ink {m.onInk.toFixed(2)} · {grade(m.onInk)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
