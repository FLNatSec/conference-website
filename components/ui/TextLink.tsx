import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Inline text link with a hairline underline that retracts on hover. Inherits color. */
export function TextLink({ className, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        "bg-[linear-gradient(currentColor,currentColor)] bg-size-[100%_1px] bg-bottom-right bg-no-repeat pb-0.5",
        "transition-[background-size] duration-300 ease-(--ease-precise) hover:bg-size-[0%_1px]",
        className,
      )}
      {...props}
    />
  );
}
