import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...site.nav.map((item) => item.href)];
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
