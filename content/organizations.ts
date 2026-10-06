import type { Organization } from "@/lib/types";

/**
 * Permanent organization records. Roles ("Organized by", "Hosted by", …) are
 * assigned per edition in content/editions/<year>.ts — never here.
 *
 * Logos: add an SVG (preferred) to public/orgs/<id>.svg, then set `logo`.
 */
export const organizations = [
  {
    id: "florida-national-security-club",
    name: "Florida National Security Club",
    kind: "student-org",
  },
  {
    id: "engineering-innovation-institute",
    name: "Engineering Innovation Institute",
    shortName: "EII",
    kind: "university-unit",
  },
  {
    id: "uf-ieee",
    name: "UF IEEE",
    kind: "student-org",
  },
] as const satisfies readonly Organization[];

export type OrganizationId = (typeof organizations)[number]["id"];
