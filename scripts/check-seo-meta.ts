/**
 * Build-time check for sitemap titles and descriptions.
 * Fails on length, a description that does not end in a sentence, or any
 * duplicate title or description.
 *
 *   npx tsx scripts/check-seo-meta.ts
 */
import fs from "node:fs";
import path from "node:path";

import { BLOG_POSTS } from "../lib/blog-data";
import { isPublishDateReached } from "../lib/blog-publish";
import {
  getLiveCities,
  getLiveCityServicePairs,
  getLiveCityServiceTreatmentTriples,
} from "../lib/locations";
import {
  composeCityHubMeta,
  composeMetaDescription,
  composeMetaTitle,
  composeTreatmentMetaDescription,
} from "../lib/programmatic-content";
import { fitDescription, fitTitle, DESCRIPTION_LIMIT, TITLE_LIMIT } from "../lib/seo-length";
import * as seoMeta from "../lib/seo-meta";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const STATIC_PAGE_FILES: Record<string, string> = {
  "/": "app/(site)/page.tsx",
  "/about-us/": "app/(site)/about-us/page.tsx",
  "/providers/bimisa-augustin/": "app/(site)/providers/bimisa-augustin/page.tsx",
  "/providers/larissa-garth/": "app/(site)/providers/larissa-garth/page.tsx",
  "/men/": "app/(site)/men/page.tsx",
  "/men/testosterone/": "app/(site)/men/testosterone/page.tsx",
  "/men/wellness-exams/": "app/(site)/men/wellness-exams/page.tsx",
  "/women/": "app/(site)/women/page.tsx",
  "/women/gynecological-exams/": "app/(site)/women/gynecological-exams/page.tsx",
  "/women/menopausal-disorders/": "app/(site)/women/menopausal-disorders/page.tsx",
  "/women/menstrual-disorders/": "app/(site)/women/menstrual-disorders/page.tsx",
  "/iv-nutrition/": "app/(site)/iv-nutrition/page.tsx",
  "/iv-nutrition/immune-booster/": "app/(site)/iv-nutrition/immune-booster/page.tsx",
  "/iv-nutrition/workout-recovery/": "app/(site)/iv-nutrition/workout-recovery/page.tsx",
  "/iv-nutrition/myers-cocktail/": "app/(site)/iv-nutrition/myers-cocktail/page.tsx",
  "/iv-nutrition/cold-and-flu/": "app/(site)/iv-nutrition/cold-and-flu/page.tsx",
  "/iv-nutrition/hangover/": "app/(site)/iv-nutrition/hangover/page.tsx",
  "/hormone-therapy/": "app/(site)/hormone-therapy/page.tsx",
  "/stem-cells/": "app/(site)/stem-cells/page.tsx",
  "/payment-plans/": "app/(site)/payment-plans/page.tsx",
  "/contact/": "app/(site)/contact/page.tsx",
  "/reviews/": "app/(site)/reviews/page.tsx",
  "/areas-we-serve/": "app/(site)/areas-we-serve/page.tsx",
  "/blog/": "app/(site)/blog/page.tsx",
  "/privacy-policy/": "app/(site)/privacy-policy/page.tsx",
  "/terms-of-service/": "app/(site)/terms-of-service/page.tsx",
  "/accessibility/": "app/(site)/accessibility/page.tsx",
  "/sitemap/": "app/(site)/sitemap/page.tsx",
};

const seoConstants = seoMeta as unknown as Record<string, string>;

function readSource(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function readStringLiteral(source: string, start: number): { value: string; end: number } {
  const quote = source[start];
  if (quote !== '"' && quote !== "'" && quote !== "`") {
    throw new Error(`expected string at ${start}`);
  }
  let value = "";
  for (let i = start + 1; i < source.length; i += 1) {
    const char = source[i];
    if (char === "\\") {
      const next = source[i + 1];
      value += next === "n" ? "\n" : next;
      i += 1;
      continue;
    }
    if (char === quote) return { value, end: i + 1 };
    value += char;
  }
  throw new Error("unterminated string");
}

function readAssignment(source: string, name: string): string {
  const match = new RegExp(`const ${name}\\s*=\\s*`).exec(source);
  if (!match) throw new Error(`missing ${name}`);
  const rest = source.slice(match.index + match[0].length).trimStart();
  const offset = source.length - source.slice(match.index + match[0].length).length;
  const bodyStart = offset + (source.slice(match.index + match[0].length).length - rest.length);
  if (rest[0] === '"' || rest[0] === "'" || rest[0] === "`") {
    if (rest[0] === "`" && rest.includes("${")) {
      return rest.replace(/^`Get Financed \| \$\{SITE_NAME\}`[\s\S]*$/, "Get Financed | Central Texas Holistic Care");
    }
    return readStringLiteral(source, bodyStart).value;
  }
  const ident = /^[A-Z0-9_]+/.exec(rest);
  if (!ident || !(ident[0] in seoConstants)) {
    throw new Error(`cannot resolve ${name} = ${rest.slice(0, 40)}`);
  }
  return seoConstants[ident[0]];
}

type Row = { path: string; title: string; description: string };

function row(path: string, title: string, description: string): Row {
  return { path, title: fitTitle(title), description: fitDescription(description) };
}

function collect(): Row[] {
  const rows: Row[] = [];
  for (const [urlPath, file] of Object.entries(STATIC_PAGE_FILES)) {
    const source = readSource(file);
    rows.push(row(urlPath, readAssignment(source, "PAGE_TITLE"), readAssignment(source, "PAGE_DESCRIPTION")));
  }
  for (const city of getLiveCities()) {
    const meta = composeCityHubMeta(city);
    rows.push(row(`/areas-we-serve/${city.slug}/`, meta.title, meta.description));
  }
  for (const { city, service } of getLiveCityServicePairs()) {
    rows.push(
      row(
        `/areas-we-serve/${city.slug}/${service.slug}/`,
        composeMetaTitle(city, service),
        composeMetaDescription(city, service),
      ),
    );
  }
  for (const { city, service, treatment } of getLiveCityServiceTreatmentTriples()) {
    rows.push(
      row(
        `/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}/`,
        `${treatment.name} in ${city.name}, TX`,
        composeTreatmentMetaDescription(city, treatment),
      ),
    );
  }
  for (const post of BLOG_POSTS) {
    if (!isPublishDateReached(post.publishedAt)) continue;
    rows.push(row(`/blog/${post.slug}/`, post.title, post.excerpt));
  }
  return rows;
}

function validateTreatmentDescriptions(errors: string[]) {
  for (const { city, treatment } of getLiveCityServiceTreatmentTriples()) {
    const description = fitDescription(composeTreatmentMetaDescription(city, treatment));
    const path = `/areas-we-serve/${city.slug}/${treatment.serviceSlug}/${treatment.slug}/`;
    if (!description.startsWith(treatment.metaLead)) {
      errors.push(`${path} description does not keep the full meta lead: ${description}`);
    }
    if (/Killeen patients at our Killeen/i.test(description)) {
      errors.push(`${path} city clause repeats Killeen: ${description}`);
    }
    if (city.slug !== "temple" && /\bminutes?\b|\bmin\b/i.test(description)) {
      errors.push(`${path} adds a drive time outside Temple: ${description}`);
    }
  }
}

function main() {
  const rows = collect();
  const errors: string[] = [];
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  for (const entry of rows) {
    if (entry.title.length > TITLE_LIMIT) errors.push(`${entry.path} title ${entry.title.length}: ${entry.title}`);
    if (entry.description.length > DESCRIPTION_LIMIT) {
      errors.push(`${entry.path} description ${entry.description.length}: ${entry.description}`);
    }
    if (!/[.!?]['"]?$/.test(entry.description)) {
      errors.push(`${entry.path} description does not end on a sentence: ${entry.description}`);
    }
    titles.set(entry.title, [...(titles.get(entry.title) ?? []), entry.path]);
    descriptions.set(entry.description, [...(descriptions.get(entry.description) ?? []), entry.path]);
  }

  for (const [title, paths] of titles) {
    if (paths.length > 1) errors.push(`duplicate title (${paths.length}): ${title}`);
  }
  for (const [description, paths] of descriptions) {
    if (paths.length > 1) {
      errors.push(`duplicate description (${paths.length}): ${description} -> ${paths.slice(0, 4).join(", ")}`);
    }
  }

  validateTreatmentDescriptions(errors);

  if (errors.length > 0) {
    console.error(`SEO meta check failed (${rows.length} URLs, ${errors.length} problems)`);
    for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
    if (errors.length > 50) console.error(`... ${errors.length - 50} more`);
    process.exit(1);
  }

  console.log(
    `SEO meta check passed: ${rows.length} sitemap URLs, 0 over ${TITLE_LIMIT}/${DESCRIPTION_LIMIT}, 0 duplicate titles, 0 duplicate descriptions.`,
  );
}

main();
