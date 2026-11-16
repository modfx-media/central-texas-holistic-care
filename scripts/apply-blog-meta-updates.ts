/**
 * Copy data/blog-meta-updates.json into Payload meta.title and meta.description.
 *
 * Dry-run by default. This file is not part of `next build`, `next dev`, or
 * `cms:import`. Nothing here runs unless someone executes it.
 *
 *   npx tsx scripts/apply-blog-meta-updates.ts
 *   APPLY=1 npx tsx scripts/apply-blog-meta-updates.ts
 *
 * APPLY=1 needs DATABASE_URL (or POSTGRES_URL) and PAYLOAD_SECRET. It updates
 * an existing post or page matched by path, then by slug. It does not create
 * documents, and it does not change the H1, excerpt, or body. Running it
 * again after a successful apply changes nothing.
 */
import { config as loadEnv } from "dotenv";

import { BLOG_META_UPDATES } from "../lib/blog-meta-defaults";
import { DESCRIPTION_LIMIT, TITLE_LIMIT, fitDescription, fitTitle } from "../lib/seo-length";

loadEnv({ path: ".env.local" });
loadEnv();

type MetaDoc = {
  id: string | number;
  meta?: { title?: string | null; description?: string | null } | null;
};

type PayloadClient = Awaited<ReturnType<typeof import("payload").getPayload>>;

function assertTargets() {
  for (const update of BLOG_META_UPDATES) {
    const title = fitTitle(update.title);
    const description = fitDescription(update.description);
    if (title !== update.title || title.length > TITLE_LIMIT) {
      throw new Error(`${update.path} title is not stable at <= ${TITLE_LIMIT}: ${title}`);
    }
    if (
      description !== update.description ||
      description.length < 140 ||
      description.length > 155 ||
      description.length > DESCRIPTION_LIMIT
    ) {
      throw new Error(
        `${update.path} description is not a stable 140-155 character sentence: ${description.length} ${description}`,
      );
    }
  }
}

function printPlan() {
  console.log("Blog meta update plan. Layout, H1, excerpt, and URL are not modified.");
  console.log("The production database is not contacted unless APPLY=1.");
  for (const update of BLOG_META_UPDATES) {
    console.log(`\n${update.path}`);
    console.log(
      `  title ${update.previousTitle.length} -> ${update.title.length}: ${update.title}`,
    );
    console.log(
      `  description ${update.previousDescription.length} -> ${update.description.length}: ${update.description}`,
    );
  }
}

async function applyUpdates() {
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

  for (const update of BLOG_META_UPDATES) {
    let collection: "posts" | "pages" = "posts";
    let doc = await findDoc(payload, "posts", update.path, update.slug);
    if (!doc) {
      collection = "pages";
      doc = await findDoc(payload, "pages", update.path, update.slug);
    }
    if (!doc) {
      missing += 1;
      console.error(`MISSING ${update.path} (slug ${update.slug}). No document was created.`);
      continue;
    }
    const currentTitle = doc.meta?.title ?? "";
    const currentDescription = doc.meta?.description ?? "";
    if (currentTitle === update.title && currentDescription === update.description) {
      unchanged += 1;
      console.log(`UNCHANGED ${update.path}`);
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
          title: update.title,
          description: update.description,
        },
      },
    });
    updated += 1;
    console.log(
      `UPDATED ${update.path} title ${currentTitle.length} -> ${update.title.length}; description ${currentDescription.length} -> ${update.description.length}`,
    );
  }

  console.log(`APPLY complete. updated=${updated} unchanged=${unchanged} missing=${missing}`);
  if (missing > 0) process.exit(1);
}

async function findDoc(
  payload: PayloadClient,
  collection: "posts" | "pages",
  path: string,
  slug: string,
): Promise<MetaDoc | undefined> {
  const byPath = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { path: { equals: path } },
  });
  if (byPath.docs[0]) return byPath.docs[0] as MetaDoc;
  const bySlug = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });
  return bySlug.docs[0] as MetaDoc | undefined;
}

async function main() {
  assertTargets();
  printPlan();
  if (process.env.APPLY === "1") {
    await applyUpdates();
    return;
  }
  console.log(
    "\nDry run only. Re-run with APPLY=1 to write meta.title and meta.description on the existing documents. The production database was not changed.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
