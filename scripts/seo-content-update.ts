/**
 * Idempotent SEO meta update for Payload.
 *
 * Dry-run by default. Prints every title and description this pass would
 * store. Set APPLY=1 (and DATABASE_URL / PAYLOAD_SECRET) to write.
 * Does not replace page layouts. Body copy for Temple, Killeen hormone
 * therapy, and menopause is rendered from application code.
 *
 *   npx tsx scripts/seo-content-update.ts
 *   APPLY=1 npx tsx scripts/seo-content-update.ts
 */
import { config as loadEnv } from "dotenv";

import { getAllPosts } from "../lib/blog-data";
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
import {
  DESCRIPTION_LIMIT,
  TITLE_LIMIT,
  fitDescription,
  fitTitle,
} from "../lib/seo-length";
import { SEO_META_UPDATES, type SeoMetaUpdate } from "../lib/seo-meta";

loadEnv({ path: ".env.local" });
loadEnv();

type Change = {
  path: string;
  title: string;
  description: string;
  previousTitle?: string;
  previousDescription?: string;
};

function collectChanges(): Change[] {
  const byPath = new Map<string, Change>();

  for (const update of SEO_META_UPDATES) {
    byPath.set(update.path, {
      path: update.path,
      title: fitTitle(update.title),
      description: fitDescription(update.description),
      previousTitle: update.previousTitle,
      previousDescription: update.previousDescription,
    });
  }

  for (const city of getLiveCities()) {
    const meta = composeCityHubMeta(city);
    const path = `/areas-we-serve/${city.slug}`;
    if (!byPath.has(path)) {
      byPath.set(path, {
        path,
        title: fitTitle(meta.title),
        description: fitDescription(meta.description),
        previousTitle: `${city.name}, TX | Central Texas Holistic Care`,
        previousDescription: `Hormone therapy, IV nutrition, TRT, and wellness care for ${city.name}, TX. ~${city.driveTimeMin} min via ${city.primaryRoute}. Book a consultation.`,
      });
    }
  }

  for (const { city, service } of getLiveCityServicePairs()) {
    const path = `/areas-we-serve/${city.slug}/${service.slug}`;
    if (byPath.has(path)) continue;
    const rawTitle = composeMetaTitle(city, service);
    const rawDescription = composeMetaDescription(city, service);
    byPath.set(path, {
      path,
      title: fitTitle(rawTitle),
      description: fitDescription(rawDescription),
      previousTitle: rawTitle.includes("|")
        ? rawTitle
        : `${rawTitle} | Central Texas Holistic Care`,
      previousDescription: rawDescription,
    });
  }

  for (const { city, service, treatment } of getLiveCityServiceTreatmentTriples()) {
    const path = `/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}`;
    if (byPath.has(path)) continue;
    const rawTitle = `${treatment.name} in ${city.name}, TX`;
    const rawDescription = composeTreatmentMetaDescription(city, treatment);
    byPath.set(path, {
      path,
      title: fitTitle(rawTitle),
      description: fitDescription(rawDescription),
      previousTitle: `${rawTitle} | Central Texas Holistic Care`,
      previousDescription: rawDescription,
    });
  }

  for (const post of getAllPosts()) {
    const path = `/blog/${post.slug}`;
    byPath.set(path, {
      path,
      title: fitTitle(post.title),
      description: fitDescription(post.excerpt),
      previousTitle: `${post.title} | Central Texas Holistic Care`,
      previousDescription: post.excerpt,
    });
  }

  return [...byPath.values()];
}

function assertLimits(changes: Change[]) {
  const bad = changes.filter(
    (change) => change.title.length > TITLE_LIMIT || change.description.length > DESCRIPTION_LIMIT,
  );
  if (bad.length > 0) {
    for (const change of bad) {
      console.error(
        `OVER LIMIT ${change.path} title=${change.title.length} description=${change.description.length}`,
      );
    }
    process.exit(1);
  }
}

function printPlan(changes: Change[]) {
  const changed = changes.filter(
    (change) =>
      change.previousTitle !== change.title || change.previousDescription !== change.description,
  );
  console.log(`SEO meta plan: ${changes.length} paths, ${changed.length} differ from the previous template.`);
  console.log("Layouts are not modified. APPLY=1 writes meta.title and meta.description on an existing Payload document.");
  for (const change of changed) {
    console.log(`\n${change.path}`);
    if (change.previousTitle !== change.title) {
      console.log(`  title ${change.previousTitle?.length ?? "?"} -> ${change.title.length}: ${change.title}`);
    }
    if (change.previousDescription !== change.description) {
      console.log(
        `  description ${change.previousDescription?.length ?? "?"} -> ${change.description.length}: ${change.description}`,
      );
    }
  }
}

async function applyChanges(changes: Change[]) {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error("APPLY=1 requires DATABASE_URL. No database was written.");
    process.exit(1);
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error("APPLY=1 requires PAYLOAD_SECRET. No database was written.");
    process.exit(1);
  }

  const { getPayload } = await import("payload");
  const { default: payloadConfig } = await import("../payload.config");
  const payload = await getPayload({ config: payloadConfig });
  let updated = 0;
  let unchanged = 0;
  let missing = 0;

  for (const change of changes) {
    const found = await payload.find({
      collection: "pages",
      limit: 1,
      depth: 0,
      overrideAccess: true,
      where: { path: { equals: change.path } },
    });
    let doc = found.docs[0] as unknown as
      | { id: string | number; meta?: { title?: string | null; description?: string | null } }
      | undefined;
    let collection: "pages" | "posts" = "pages";
    if (!doc) {
      const posts = await payload.find({
        collection: "posts",
        limit: 1,
        depth: 0,
        overrideAccess: true,
        where: { path: { equals: change.path } },
      });
      doc = posts.docs[0] as unknown as typeof doc;
      collection = "posts";
    }
    if (!doc) {
      missing += 1;
      continue;
    }
    const currentTitle = doc.meta?.title ?? "";
    const currentDescription = doc.meta?.description ?? "";
    if (currentTitle === change.title && currentDescription === change.description) {
      unchanged += 1;
      continue;
    }
    await payload.update({
      collection,
      id: doc.id,
      depth: 0,
      overrideAccess: true,
      data: {
        meta: {
          ...(doc.meta ?? {}),
          title: change.title,
          description: change.description,
        },
      },
    });
    updated += 1;
  }

  console.log(`APPLY complete. updated=${updated} unchanged=${unchanged} missing=${missing}`);
}

async function main() {
  const changes = collectChanges();
  assertLimits(changes);
  const handTuned: SeoMetaUpdate[] = [...SEO_META_UPDATES];
  console.log(`Hand-tuned pages: ${handTuned.length}`);
  printPlan(changes);
  if (process.env.APPLY === "1") {
    await applyChanges(changes);
    return;
  }
  console.log("\nDry run only. Re-run with APPLY=1 to write these meta fields. The production database was not changed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
