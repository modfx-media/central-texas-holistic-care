import { draftMode } from "next/headers";

import { getCMS, isCMSConfigured } from "./payload";
import { withCMS } from "./safe";
import type {
  CmsFooter,
  CmsHeader,
  CmsRoutedDoc,
  CmsSeoDoc,
  CmsSiteSettings,
  RoutedContent,
} from "./types";
import { normalizeCmsPath } from "./url";

async function draftEnabled(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export async function queryRoutedContentByPath(
  path: string,
): Promise<RoutedContent | null> {
  if (!isCMSConfigured()) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    const normalized = normalizeCmsPath(path);
    const draft = await draftEnabled();

    const common = {
      draft,
      overrideAccess: draft,
      limit: 1,
      depth: 2,
      where: {
        path: {
          equals: normalized,
        },
      },
    } as const;

    const pages = await payload.find({
      collection: "pages",
      ...common,
    });

    const page = pages.docs[0] as CmsRoutedDoc | undefined;
    if (page) return { collection: "pages", doc: page };

    const posts = await payload.find({
      collection: "posts",
      ...common,
    });

    const post = posts.docs[0] as CmsRoutedDoc | undefined;
    if (post) return { collection: "posts", doc: post };

    return null;
  }, null);
}

export async function queryHeader(): Promise<CmsHeader | null> {
  if (!isCMSConfigured()) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return (await payload.findGlobal({ slug: "header", depth: 1 })) as CmsHeader;
  }, null);
}

export async function queryFooter(): Promise<CmsFooter | null> {
  if (!isCMSConfigured()) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return (await payload.findGlobal({ slug: "footer", depth: 1 })) as CmsFooter;
  }, null);
}

export async function querySiteSettings(): Promise<CmsSiteSettings | null> {
  if (!isCMSConfigured()) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    return (await payload.findGlobal({
      slug: "site-settings",
      depth: 0,
    })) as CmsSiteSettings;
  }, null);
}

export async function queryPublishedSeoDocs(): Promise<CmsSeoDoc[]> {
  if (!isCMSConfigured()) return [];
  return withCMS(async () => {
    const payload = await getCMS();
    const [pages, posts] = await Promise.all([
      payload.find({
        collection: "pages",
        draft: false,
        overrideAccess: false,
        limit: 10000,
        depth: 0,
        pagination: false,
        select: {
          path: true,
          noIndex: true,
          excludeFromSitemap: true,
          updatedAt: true,
          sourceUpdatedAt: true,
        },
      }),
      payload.find({
        collection: "posts",
        draft: false,
        overrideAccess: false,
        limit: 10000,
        depth: 0,
        pagination: false,
        select: {
          path: true,
          noIndex: true,
          excludeFromSitemap: true,
          updatedAt: true,
          sourceUpdatedAt: true,
        },
      }),
    ]);

    const docs: CmsSeoDoc[] = [];
    for (const doc of [...pages.docs, ...posts.docs]) {
      const path = typeof doc.path === "string" ? doc.path : null;
      if (!path) continue;
      docs.push({
        path: normalizeCmsPath(path),
        noIndex: Boolean(doc.noIndex),
        excludeFromSitemap: Boolean(doc.excludeFromSitemap),
        updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : null,
        sourceUpdatedAt:
          typeof doc.sourceUpdatedAt === "string" ? doc.sourceUpdatedAt : null,
      });
    }
    return docs;
  }, []);
}
