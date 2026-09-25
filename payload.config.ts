import path from "path";
import { fileURLToPath } from "url";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { SiteSettings } from "./globals/SiteSettings";
import { getCorsOrigins, getServerURL } from "./lib/cms/url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = Boolean(process.env.VERCEL);
const isImport = Boolean(process.env.CMS_IMPORT_APPLY);
const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
    user: Users.slug,
  },
  collections: [Users, Media, Pages, Posts],
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  db: vercelPostgresAdapter({
    forceUseVercelPostgres: true,
    pool: {
      connectionString,
    },
    push: !isVercel && !isImport && Boolean(connectionString),
  }),
  editor: lexicalEditor(),
  globals: [Header, Footer, SiteSettings],
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
