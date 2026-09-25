import type { MetadataRoute } from "next";

import { queryPublishedSeoDocs } from "@/lib/cms/query";
import { normalizeCmsPath } from "@/lib/cms/url";
import {
  getLiveCities,
  getLiveCityServicePairs,
  getLiveCityServiceTreatmentTriples,
} from "@/lib/locations";
import { getPublishedUiPosts } from "@/lib/ranked/ui";
import { SITE_URL } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

type StaticPage = {
  path: string;
  lastModified: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
};

const STATIC_PAGES: ReadonlyArray<StaticPage> = [
  { path: "/", lastModified: "2026-07-17", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about-us/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.8 },
  { path: "/men/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.9 },
  { path: "/men/testosterone/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.8 },
  { path: "/men/wellness-exams/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/women/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.9 },
  { path: "/women/gynecological-exams/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/women/menopausal-disorders/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/women/menstrual-disorders/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iv-nutrition/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.9 },
  { path: "/iv-nutrition/immune-booster/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iv-nutrition/workout-recovery/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iv-nutrition/myers-cocktail/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iv-nutrition/cold-and-flu/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.7 },
  { path: "/iv-nutrition/hangover/", lastModified: "2026-02-10", changeFrequency: "monthly", priority: 0.7 },
  { path: "/hormone-therapy/", lastModified: "2025-06-16", changeFrequency: "monthly", priority: 0.9 },
  { path: "/stem-cells/", lastModified: "2026-07-07", changeFrequency: "monthly", priority: 0.8 },
  { path: "/payment-plans/", lastModified: "2026-07-13", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact/", lastModified: "2026-07-07", changeFrequency: "yearly", priority: 0.8 },
  { path: "/reviews/", lastModified: "2026-09-22", changeFrequency: "weekly", priority: 0.7 },
  { path: "/areas-we-serve/", lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog/", lastModified: "2026-07-14", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy-policy/", lastModified: "2026-06-30", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service/", lastModified: "2026-06-30", changeFrequency: "yearly", priority: 0.3 },
  { path: "/accessibility/", lastModified: "2026-06-30", changeFrequency: "yearly", priority: 0.3 },
  { path: "/sitemap/", lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.4 },
];

const PROGRAMMATIC_LAST_MODIFIED = "2026-06-30";

function sitemapPathFromUrl(url: string): string {
  try {
    return normalizeCmsPath(new URL(url).pathname);
  } catch {
    return normalizeCmsPath(url);
  }
}

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsDocs = await queryPublishedSeoDocs();
  const skip = new Set(
    cmsDocs
      .filter((doc) => doc.noIndex || doc.excludeFromSitemap)
      .map((doc) => normalizeCmsPath(doc.path)),
  );
  const cmsDates = new Map(
    cmsDocs.map((doc) => [
      normalizeCmsPath(doc.path),
      doc.sourceUpdatedAt || doc.updatedAt || null,
    ]),
  );

  const staticEntries: SitemapEntry[] = STATIC_PAGES.map(
    ({ path, lastModified, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(cmsDates.get(normalizeCmsPath(path)) || lastModified),
      changeFrequency,
      priority,
    }),
  );

  const cityHubEntries: SitemapEntry[] = getLiveCities().map((city) => ({
    url: `${SITE_URL}/areas-we-serve/${city.slug}/`,
    lastModified: new Date(PROGRAMMATIC_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityServiceEntries: SitemapEntry[] = getLiveCityServicePairs().map(
    ({ city, service }) => ({
      url: `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/`,
      lastModified: new Date(PROGRAMMATIC_LAST_MODIFIED),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const cityServiceTreatmentEntries: SitemapEntry[] =
    getLiveCityServiceTreatmentTriples().map(({ city, service, treatment }) => ({
      url: `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}/`,
      lastModified: new Date(PROGRAMMATIC_LAST_MODIFIED),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const publishedPosts = await getPublishedUiPosts().catch(() => []);
  const blogEntries: SitemapEntry[] = publishedPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...cityHubEntries,
    ...cityServiceEntries,
    ...cityServiceTreatmentEntries,
    ...blogEntries,
  ].filter((entry) => !skip.has(sitemapPathFromUrl(entry.url)));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap();
}
