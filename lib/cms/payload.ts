import { getPayload } from "payload";

import config from "@payload-config";

export function isCMSConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export async function getCMS() {
  if (!isCMSConfigured()) {
    throw new Error("CMS database is not configured");
  }
  return getPayload({ config });
}
