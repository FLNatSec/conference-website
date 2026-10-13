import type { NextConfig } from "next";
import { features, flaggedPages } from "./content/features";

const nextConfig: NextConfig = {
  // Hidden pages (content/features.ts) redirect to their replacement until switched back on.
  async redirects() {
    return flaggedPages
      .filter((page) => !features[page.flag])
      .map((page) => ({ source: page.path, destination: page.fallback, permanent: false }));
  },
};

export default nextConfig;
