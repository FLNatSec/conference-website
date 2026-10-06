import { notFound } from "next/navigation";
import { isProduction } from "@/lib/site-url";

/** Internal review pages (/lab, /styleguide): available locally and on previews, hidden in production. */
export default function DevLayout({ children }: LayoutProps<"/">) {
  if (isProduction) notFound();
  return children;
}
