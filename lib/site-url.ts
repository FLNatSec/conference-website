/**
 * The site's public origin. On Vercel, VERCEL_PROJECT_PRODUCTION_URL is the
 * production domain (custom domain when one is set). Override with
 * NEXT_PUBLIC_SITE_URL if needed.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

/** True only for the live production deployment (not previews or local dev). */
export const isProduction = process.env.VERCEL_ENV === "production";
