import fs from "node:fs";
import path from "node:path";

import { allExpectedCmsPaths } from "../../lib/cms/manifest";
import { normalizeCmsPath } from "../../lib/cms/url";
import { buildContentExport } from "./build-export";

type ExportFile = {
  version: number;
  records: { sourceUrl?: string; data?: { path?: string } }[];
};

function loadExport(): ExportFile {
  const file = path.resolve("data/content-export.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8")) as ExportFile;
  }
  return buildContentExport();
}

const expected = new Set(allExpectedCmsPaths());
const exported = loadExport();
const got = new Set(
  exported.records
    .map((record) => normalizeCmsPath(record.data?.path || record.sourceUrl || ""))
    .filter(Boolean),
);

const missing = [...expected].filter((item) => !got.has(item));
const extra = [...got].filter((item) => !expected.has(item));

if (missing.length > 0) {
  console.error(`Missing ${missing.length} expected paths`);
  console.error(missing.slice(0, 50).join("\n"));
}

if (extra.length > 0) {
  console.warn(`Extra ${extra.length} export paths`);
}

if (missing.length > 0) {
  process.exit(1);
}

console.log(`Export covers ${got.size} paths.`);
