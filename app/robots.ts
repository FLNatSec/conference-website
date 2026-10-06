import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Only the production deployment is indexed; previews stay out of search.
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab", "/styleguide"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
