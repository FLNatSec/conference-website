import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import type { Tone } from "./Section";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "small";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  /** The surface the button sits on. */
  tone?: Tone;
  size?: ButtonSize;
}

const base =
  "group inline-flex items-center justify-center gap-3 font-sans font-medium tracking-[0.01em] whitespace-nowrap " +
  "transition-[background-color,color,border-color] duration-200 ease-(--ease-precise) " +
  "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const sizes: Record<ButtonSize, string> = {
  default: "h-12 px-6 text-[0.95rem]",
  small: "h-10 px-4 text-sm",
};

const variants: Record<Tone, Record<ButtonVariant, string>> = {
  ink: {
    primary: "bg-bone text-ink hover:bg-white",
    secondary: "border border-bone/35 text-bone hover:border-bone hover:bg-bone/5",
    ghost: "px-0! text-bone/80 hover:text-bone",
  },
  paper: {
    primary: "bg-ink text-paper hover:bg-ink-3",
    secondary: "border border-graphite/30 text-graphite hover:border-graphite hover:bg-graphite/5",
    ghost: "px-0! text-graphite/80 hover:text-graphite",
  },
};

export function buttonClasses({ variant = "primary", tone = "ink", size = "default" }: ButtonStyleOptions = {}) {
  return cn(base, sizes[size], variants[tone][variant]);
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-200 ease-(--ease-precise) group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & ButtonStyleOptions & { arrow?: boolean };

export function ButtonLink({ variant, tone, size, arrow = false, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses({ variant, tone, size }), className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonStyleOptions & { arrow?: boolean };

export function Button({ variant, tone, size, arrow = false, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonClasses({ variant, tone, size }), className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
