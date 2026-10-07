"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { cn } from "@/lib/cn";

export const SIGNUP_SUCCESS =
  "You’re on the list. We’ll send speaker announcements, registration updates, program releases, and innovation opportunities as they’re announced.";

const field =
  "h-12 w-full border border-bone/25 bg-ink-deep/60 px-4 text-[0.98rem] text-bone placeholder:text-bone/45 " +
  "transition-colors focus:border-highlight-300 focus:outline-none";

/** Mailing-list signup (Kit backend via a Server Action). Designed for navy surfaces. */
export function SignupForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status" className={cn("border border-highlight-300/50 bg-ink-deep/60 p-6", className)}>
        <p className="type-label flex items-center gap-2 text-highlight-300">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight-300" />
          Subscribed
        </p>
        <p className="mt-3 max-w-[52ch] text-[1.02rem] leading-relaxed text-bone">{SIGNUP_SUCCESS}</p>
      </div>
    );
  }

  return (
    <form action={action} className={cn("max-w-xl space-y-3", className)} noValidate={false}>
      <div>
        <label htmlFor="signup-email" className="type-label mb-1.5 block text-bone/70">
          Email <span aria-hidden="true">*</span>
        </label>
        <input id="signup-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="signup-first" className="type-label mb-1.5 block text-bone/70">
            First name
          </label>
          <input id="signup-first" name="first_name" type="text" autoComplete="given-name" maxLength={100} className={field} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="signup-org" className="type-label mb-1.5 block text-bone/70">
            Organization / affiliation
          </label>
          <input id="signup-org" name="organization" type="text" autoComplete="organization" maxLength={200} className={field} placeholder="Optional" />
        </div>
      </div>

      {/* Honeypot — hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="signup-website">Website</label>
        <input id="signup-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap bg-bone px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-white disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join the mailing list"}
        </button>
        <p aria-live="polite" className={cn("text-sm", state.status === "error" ? "text-alert-300" : "text-bone/60")}>
          {state.status === "error" ? state.message : "No spam. Unsubscribe anytime."}
        </p>
      </div>
    </form>
  );
}
