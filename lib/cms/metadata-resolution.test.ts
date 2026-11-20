/**
 * Proves published Payload meta.title / meta.description render verbatim, and
 * that empty CMS fields keep the previous fallback pipeline.
 *
 *   npx tsx --test lib/cms/metadata-resolution.test.ts
 */
import assert from "node:assert/strict";
import test from "node:test";

import type { Metadata } from "next";

import { blogMetaForPath } from "@/lib/blog-meta-defaults";
import { getCity, getService } from "@/lib/locations";
import { composeMetaDescription, composeMetaTitle } from "@/lib/programmatic-content";
import { clampSeoMetadata, fitDescription, fitTitle } from "@/lib/seo-length";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  KILLEEN_MENOPAUSE_DESCRIPTION,
  metadataTitle,
} from "@/lib/seo-meta";

import { metadataFromDoc, resolveRoutedMetadata } from "./resolve-metadata";
import type { CmsRoutedDoc } from "./types";
import { normalizeCmsPath } from "./url";

const ABOUT_TITLE = "About Us | Central Texas Holistic Care";
const ABOUT_DESCRIPTION =
  "Meet Bimisa Augustin, DNP, and Larissa Garth, PA-C, at Central Texas Holistic Care in Killeen, TX. 26 years and 10+ years of clinical experience in hormone and preventive care.";

const BLOG_PATH = "/blog/functional-medicine-labs-routine-bloodwork";
const MENOPAUSE_PATH = "/areas-we-serve/killeen/hormone-therapy/menopause-care";

const LONG_TITLE =
  "Our Story | Drug-Free Pain Relief in Saint Louis Park and the Greater Metro Area";
const PLAIN_TITLE = "Custom Clinic Title Without a Pipe";
const LONG_DESCRIPTION =
  "This published CMS description is intentionally longer than the site clamp and does not end on a comma. It must be rendered exactly as the editor saved it, with no added period and no truncation at a sentence boundary.";

function pageFallback(title: string, description: string, canonical: string): Metadata {
  return {
    title: metadataTitle(title),
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Central Texas Holistic Care",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function publishedDoc(
  path: string,
  meta: { title?: string | null; description?: string | null },
  extra: Partial<CmsRoutedDoc> = {},
): CmsRoutedDoc {
  return {
    id: path,
    path,
    excerpt: null,
    ...extra,
    title: extra.title ?? "Document title",
    _status: extra._status ?? "published",
    meta: {
      title: meta.title ?? null,
      description: meta.description ?? null,
    },
  };
}

/** Previous resolver: CMS fields, curated blog map, then length clamp, then the menopause swap. */
function legacyMetadata(path: string, fallback: Metadata, doc: CmsRoutedDoc | null): Metadata {
  const base = doc ? metadataFromDoc(doc, fallback) : fallback;
  const curated = blogMetaForPath(path);
  const withCurated = curated
    ? {
        ...base,
        title: curated.title,
        description: curated.description,
        openGraph: base.openGraph
          ? { ...base.openGraph, title: curated.title, description: curated.description }
          : base.openGraph,
        twitter: base.twitter
          ? { ...base.twitter, title: curated.title, description: curated.description }
          : base.twitter,
      }
    : base;
  let meta = clampSeoMetadata(withCurated);
  if (normalizeCmsPath(path) === MENOPAUSE_PATH) {
    const current = typeof meta.description === "string" ? meta.description : "";
    if (current.length < 140 || current.length > 155) {
      meta = clampSeoMetadata({
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
  }
  return meta;
}

function titleText(title: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  throw new Error("missing title");
}

function assertVerbatimTitle(meta: Metadata, expected: string) {
  assert.deepEqual(meta.title, { absolute: expected });
  assert.equal(titleText(meta.title), expected);
  assert.equal(meta.openGraph && "title" in meta.openGraph ? meta.openGraph.title : undefined, expected);
  assert.equal(meta.twitter && "title" in meta.twitter ? meta.twitter.title : undefined, expected);
  assert.notEqual(expected, fitTitle(expected));
}

const harker = getCity("harker-heights");
const iv = getService("iv-nutrition");
if (!harker || !iv) throw new Error("missing location fixtures");

const cases: { name: string; path: string; fallback: Metadata }[] = [
  {
    name: "home",
    path: "/",
    fallback: pageFallback(HOME_TITLE, HOME_DESCRIPTION, "https://centraltexasholisticcarepllc.com/"),
  },
  {
    name: "normal page",
    path: "/about-us",
    fallback: pageFallback(
      ABOUT_TITLE,
      ABOUT_DESCRIPTION,
      "https://centraltexasholisticcarepllc.com/about-us/",
    ),
  },
  {
    name: "location page",
    path: "/areas-we-serve/harker-heights/iv-nutrition",
    fallback: pageFallback(
      composeMetaTitle(harker, iv),
      composeMetaDescription(harker, iv),
      "https://centraltexasholisticcarepllc.com/areas-we-serve/harker-heights/iv-nutrition/",
    ),
  },
  {
    name: "blog post",
    path: BLOG_PATH,
    fallback: pageFallback(
      "What Functional Medicine Labs Can Reveal About Health",
      "Learn how functional medicine in Bell County uses advanced lab testing.",
      "https://centraltexasholisticcarepllc.com/blog/functional-medicine-labs-routine-bloodwork/",
    ),
  },
];

for (const entry of cases) {
  test(`${entry.name}: empty CMS meta matches the previous fallback`, () => {
    const doc = publishedDoc(entry.path, { title: "  ", description: "" }, {
      title: "Document title",
      excerpt: "A short excerpt from the document.",
    });
    assert.deepEqual(
      resolveRoutedMetadata(entry.path, entry.fallback, doc),
      legacyMetadata(entry.path, entry.fallback, doc),
    );
    assert.deepEqual(
      resolveRoutedMetadata(entry.path, entry.fallback, null),
      legacyMetadata(entry.path, entry.fallback, null),
    );
  });

  test(`${entry.name}: published CMS title and description are verbatim`, () => {
    const doc = publishedDoc(entry.path, {
      title: entry.name === "blog post" ? LONG_TITLE : PLAIN_TITLE,
      description: LONG_DESCRIPTION,
    });
    const meta = resolveRoutedMetadata(entry.path, entry.fallback, doc);
    const expectedTitle = entry.name === "blog post" ? LONG_TITLE : PLAIN_TITLE;
    assertVerbatimTitle(meta, expectedTitle);
    assert.equal(meta.description, LONG_DESCRIPTION);
    assert.equal(meta.openGraph && "description" in meta.openGraph ? meta.openGraph.description : undefined, LONG_DESCRIPTION);
    assert.equal(meta.twitter && "description" in meta.twitter ? meta.twitter.description : undefined, LONG_DESCRIPTION);
    assert.notEqual(LONG_DESCRIPTION, fitDescription(LONG_DESCRIPTION));
    assert.deepEqual(meta.robots, { index: true, follow: true });
    assert.deepEqual(meta.alternates, entry.fallback.alternates);
  });
}

test("location fallback title is still clamped when CMS meta is empty", () => {
  const entry = cases[2];
  const meta = resolveRoutedMetadata(entry.path, entry.fallback, null);
  assert.equal(titleText(meta.title), fitTitle(composeMetaTitle(harker, iv)));
  assert.equal(meta.description, fitDescription(composeMetaDescription(harker, iv)));
});

test("blog fallback still uses the curated map when CMS meta is empty", () => {
  const curated = blogMetaForPath(BLOG_PATH);
  if (!curated) throw new Error("missing curated blog meta");
  const entry = cases[3];
  const meta = resolveRoutedMetadata(entry.path, entry.fallback, publishedDoc(BLOG_PATH, {}));
  assert.equal(titleText(meta.title), curated.title);
  assert.equal(meta.description, curated.description);
});

test("a published title is kept when only the description is empty", () => {
  const entry = cases[0];
  const excerpt = "Excerpt only.";
  const legacy = legacyMetadata(
    entry.path,
    entry.fallback,
    publishedDoc(entry.path, { description: "" }, { excerpt }),
  );
  const meta = resolveRoutedMetadata(
    entry.path,
    entry.fallback,
    publishedDoc(entry.path, { title: PLAIN_TITLE, description: "" }, { excerpt }),
  );
  assertVerbatimTitle(meta, PLAIN_TITLE);
  assert.equal(meta.description, legacy.description);
  assert.equal(meta.description, fitDescription(excerpt));
});

test("a published description is kept when only the title is empty", () => {
  const entry = cases[1];
  const doc = publishedDoc(entry.path, { title: "", description: LONG_DESCRIPTION }, {
    title: "About the clinic",
  });
  const legacy = legacyMetadata(entry.path, entry.fallback, publishedDoc(entry.path, {}, { title: "About the clinic" }));
  const meta = resolveRoutedMetadata(entry.path, entry.fallback, doc);
  assert.equal(titleText(meta.title), titleText(legacy.title));
  assert.deepEqual(meta.title, legacy.title);
  assert.equal(meta.description, LONG_DESCRIPTION);
});

test("draft CMS meta still goes through the fallback pipeline", () => {
  const entry = cases[0];
  const doc = publishedDoc(entry.path, { title: PLAIN_TITLE, description: LONG_DESCRIPTION }, {
    _status: "draft",
  });
  assert.deepEqual(resolveRoutedMetadata(entry.path, entry.fallback, doc), legacyMetadata(entry.path, entry.fallback, doc));
  assert.notEqual(titleText(resolveRoutedMetadata(entry.path, entry.fallback, doc).title), PLAIN_TITLE);
});

test("killeen menopause keeps the hand-tuned description when CMS description is empty", () => {
  const fallback = pageFallback(
    "Menopause Care in Killeen, TX",
    "Too short.",
    "https://centraltexasholisticcarepllc.com/areas-we-serve/killeen/hormone-therapy/menopause-care/",
  );
  const doc = publishedDoc(MENOPAUSE_PATH, {}, { excerpt: "Too short." });
  const meta = resolveRoutedMetadata(MENOPAUSE_PATH, fallback, doc);
  assert.deepEqual(meta, legacyMetadata(MENOPAUSE_PATH, fallback, doc));
  assert.equal(meta.description, KILLEEN_MENOPAUSE_DESCRIPTION);
});

test("killeen menopause keeps a long published description and title", () => {
  const fallback = pageFallback(
    "Menopause Care in Killeen, TX",
    "Too short.",
    "https://centraltexasholisticcarepllc.com/areas-we-serve/killeen/hormone-therapy/menopause-care/",
  );
  const doc = publishedDoc(MENOPAUSE_PATH, { title: PLAIN_TITLE, description: LONG_DESCRIPTION });
  const meta = resolveRoutedMetadata(MENOPAUSE_PATH, fallback, doc);
  assertVerbatimTitle(meta, PLAIN_TITLE);
  assert.equal(meta.description, LONG_DESCRIPTION);
});

test("published CMS text keeps its own spacing", () => {
  const entry = cases[1];
  const title = "  About the Clinic, Exactly  ";
  const description = "  Description with surrounding spaces.  ";
  const meta = resolveRoutedMetadata(
    entry.path,
    entry.fallback,
    publishedDoc(entry.path, { title, description }),
  );
  assert.equal(titleText(meta.title), title);
  assert.equal(meta.description, description);
});
