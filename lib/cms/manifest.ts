import {
  getLiveCities,
  getLiveCityServicePairs,
  getLiveCityServiceTreatmentTriples,
} from "@/lib/locations";
import { getAllPosts } from "@/lib/blog-data";
import { normalizeCmsPath } from "./url";

export const STATIC_CMS_PATHS = [
  "/",
  "/about-us",
  "/men",
  "/men/testosterone",
  "/men/wellness-exams",
  "/women",
  "/women/gynecological-exams",
  "/women/menopausal-disorders",
  "/women/menstrual-disorders",
  "/iv-nutrition",
  "/iv-nutrition/immune-booster",
  "/iv-nutrition/workout-recovery",
  "/iv-nutrition/myers-cocktail",
  "/iv-nutrition/cold-and-flu",
  "/iv-nutrition/hangover",
  "/hormone-therapy",
  "/stem-cells",
  "/payment-plans",
  "/contact",
  "/reviews",
  "/areas-we-serve",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
  "/accessibility",
  "/sitemap",
  "/get-financed",
] as const;

export function allExpectedCmsPaths(): string[] {
  const programmatic = [
    ...getLiveCities().map((city) => `/areas-we-serve/${city.slug}`),
    ...getLiveCityServicePairs().map(
      ({ city, service }) => `/areas-we-serve/${city.slug}/${service.slug}`,
    ),
    ...getLiveCityServiceTreatmentTriples().map(
      ({ city, service, treatment }) =>
        `/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}`,
    ),
  ];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}`);
  return [...STATIC_CMS_PATHS, ...programmatic, ...posts].map(normalizeCmsPath);
}
