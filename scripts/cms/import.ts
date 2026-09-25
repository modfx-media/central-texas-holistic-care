import fs from "node:fs";
import path from "node:path";

import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";

import payloadConfig from "../../payload.config";
import { buildContentExport } from "./build-export";

loadEnv({ path: ".env.local" });
loadEnv();

type ExportFile = {
  version: number;
  records: {
    collection: "pages" | "posts";
    legacyId: string;
    sourceUrl: string;
    data: Record<string, unknown>;
  }[];
  globals: Record<string, Record<string, unknown>>;
};

function requireDatabase() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      "DATABASE_URL is missing. Add the Neon pooled connection string, then rerun cms:import.",
    );
    process.exit(1);
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error("PAYLOAD_SECRET is missing.");
    process.exit(1);
  }
}

function loadExport(): ExportFile {
  const file = path.resolve(
    process.argv.find((arg) => arg.endsWith(".json")) || "data/content-export.json",
  );
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8")) as ExportFile;
  }
  return buildContentExport();
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "posts",
  legacyId: string,
  sourceUrl: string,
) {
  const byLegacy = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { legacyId: { equals: legacyId } },
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];

  const bySource = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { sourceUrl: { equals: sourceUrl } },
  });
  return bySource.docs[0] ?? null;
}

async function main() {
  requireDatabase();
  const apply = process.argv.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1";
  const publish = process.argv.includes("--publish");
  if (publish) {
    console.error("Refusing --publish. Import drafts only; publish one URL at a time in /admin.");
    process.exit(1);
  }

  const data = loadExport();
  console.log(`Loaded ${data.records.length} records (apply=${apply})`);

  if (!apply) {
    console.log("Dry run. Re-run with --apply after reviewing the export.");
    return;
  }

  process.env.CMS_IMPORT_APPLY = "1";
  const payload = await getPayload({ config: payloadConfig });

  for (const record of data.records) {
    try {
      const existing = await findExisting(
        payload,
        record.collection,
        record.legacyId,
        record.sourceUrl,
      );
      const doc = {
        ...record.data,
        _status: "draft",
      };
      if (existing) {
        await payload.update({
          collection: record.collection,
          id: existing.id,
          data: doc,
          draft: true,
          overrideAccess: true,
        });
        console.log(`updated ${record.collection} ${record.sourceUrl}`);
      } else {
        await payload.create({
          collection: record.collection,
          data: doc,
          draft: true,
          overrideAccess: true,
        });
        console.log(`created ${record.collection} ${record.sourceUrl}`);
      }
    } catch (error) {
      console.error(`[cms:import] skipped ${record.sourceUrl}`, error);
    }
  }

  for (const [slug, value] of Object.entries(data.globals)) {
    try {
      await payload.updateGlobal({
        slug: slug as "header" | "footer" | "site-settings",
        data: value,
        overrideAccess: true,
      });
      console.log(`updated global ${slug}`);
    } catch (error) {
      console.error(`[cms:import] skipped global ${slug}`, error);
    }
  }

  console.log("Draft import complete. Public pages stay on designed fallbacks until publish.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
