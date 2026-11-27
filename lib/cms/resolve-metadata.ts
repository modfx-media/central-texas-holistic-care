import type { Metadata } from "next";

import { blogMetaForPath } from "@/lib/blog-meta-defaults";
import { clampSeoMetadata } from "@/lib/seo-length";
import { KILLEEN_MENOPAUSE_DESCRIPTION } from "@/lib/seo-meta";

import type { CmsRoutedDoc } from "./types";
import { getPublicSiteURL, normalizeCmsPath, publicPathFromCms } from "./url";

const KILLEEN_MENOPAUSE_PATH = "/areas-we-serve/killeen/hormone-therapy/menopause-care";

function mediaImage(image: CmsRoutedDoc["meta"]): {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
} | undefined {
  const value = image?.image;
  if (!value || typeof value !== "object" || !("url" in value) || !value.url) return undefined;
  const record = value as {
    url: string;
    width?: number | null;
    height?: number | null;
    alt?: string | null;
  };
  return {
    url: record.url,
    ...(typeof record.width === "number" ? { width: record.width } : {}),
    ...(typeof record.height === "number" ? { height: record.height } : {}),
    ...(record.alt ? { alt: record.alt } : {}),
  };
}

export function metadataFromDoc(
  doc: CmsRoutedDoc,
  fallback: Metadata,
): Metadata {
  const site = getPublicSiteURL();
  const title = doc.meta?.title || doc.title || undefined;
  const description = doc.meta?.description || doc.excerpt || undefined;
  const path = doc.path ? publicPathFromCms(doc.path) : undefined;
  const canonical =
    doc.canonicalUrl || (path ? `${site}${path}` : undefined);
  const image = mediaImage(doc.meta);

  return {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: !doc.noIndex,
      follow: !doc.noFollow,
    },
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(image
        ? {
            images: [
              {
                url: image.url,
                ...(image.width ? { width: image.width } : {}),
                ...(image.height ? { height: image.height } : {}),
                alt: image.alt || title || "Central Texas Holistic Care",
              },
            ],
          }
        : {}),
    },
    twitter: {
      ...fallback.twitter,
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

/**
 * Curated title and description for five posts when that field is empty in
 * Payload. A published meta.title or meta.description is restored afterward
 * and wins. The database is not written here.
 * scripts/apply-blog-meta-updates.ts copies the same strings later.
 */
function withCuratedBlogMeta(path: string, meta: Metadata): Metadata {
  const curated = blogMetaForPath(path);
  if (!curated) return meta;
  return {
    ...meta,
    title: curated.title,
    description: curated.description,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, title: curated.title, description: curated.description }
      : meta.openGraph,
    twitter: meta.twitter
      ? { ...meta.twitter, title: curated.title, description: curated.description }
      : meta.twitter,
  };
}

/** Published Payload SEO text, unchanged. Blank and draft values are ignored. */
function publishedCmsText(
  doc: CmsRoutedDoc | null,
  field: "title" | "description",
): string | undefined {
  if (!doc || doc._status === "draft") return undefined;
  const value = doc.meta?.[field];
  if (typeof value !== "string" || value.trim() === "") return undefined;
  return value;
}

/**
 * The Killeen menopause treatment page used to replace an out-of-range
 * description after metadata resolution. That replacement stays for empty
 * CMS descriptions. It runs before published CMS text is restored, so an
 * editor's meta.title and meta.description are not clamped again.
 */
function withKilleenMenopauseFallback(
  path: string,
  meta: Metadata,
  doc: CmsRoutedDoc | null,
): Metadata {
  if (normalizeCmsPath(path) !== KILLEEN_MENOPAUSE_PATH) return meta;
  if (publishedCmsText(doc, "description") !== undefined) return meta;
  const current = typeof meta.description === "string" ? meta.description : "";
  if (current.length >= 140 && current.length <= 155) return meta;
  return clampSeoMetadata({
    ...meta,
    description: KILLEEN_MENOPAUSE_DESCRIPTION,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, description: KILLEEN_MENOPAUSE_DESCRIPTION }
      : meta.openGraph,
    twitter: meta.twitter
      ? { ...meta.twitter, description: KILLEEN_MENOPAUSE_DESCRIPTION }
      : meta.twitter,
  });
}

function applyPublishedCmsText(meta: Metadata, doc: CmsRoutedDoc | null): Metadata {
  const title = publishedCmsText(doc, "title");
  const description = publishedCmsText(doc, "description");
  if (title === undefined && description === undefined) return meta;

  const openGraph = meta.openGraph
    ? {
        ...meta.openGraph,
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
      }
    : meta.openGraph;
  const twitter = meta.twitter
    ? {
        ...meta.twitter,
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
      }
    : meta.twitter;

  return {
    ...meta,
    ...(title !== undefined ? { title: { absolute: title } } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(openGraph ? { openGraph } : {}),
    ...(twitter ? { twitter } : {}),
  };
}

/**
 * Same fallback pipeline as before (code defaults, doc title/excerpt, curated
 * blog map, length clamp). Published meta.title and meta.description replace
 * the matching title and description tags verbatim, including open graph and
 * twitter. Canonical, robots, and images are left as the pipeline produced them.
 */
export function resolveRoutedMetadata(
  path: string,
  fallback: Metadata,
  doc: CmsRoutedDoc | null,
): Metadata {
  const base = doc ? metadataFromDoc(doc, fallback) : fallback;
  const clamped = clampSeoMetadata(withCuratedBlogMeta(path, base));
  return applyPublishedCmsText(withKilleenMenopauseFallback(path, clamped, doc), doc);
}
