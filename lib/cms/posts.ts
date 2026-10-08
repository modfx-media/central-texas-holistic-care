import { draftMode } from "next/headers";

import type { BlogAuthor, BlogBlock, BlogPost } from "@/lib/blog-data";
import { DEFAULT_COVER } from "@/lib/ranked/config";

import { lexicalToBlocks } from "./lexical-to-blocks";
import { publicMediaUrl } from "./media-url";
import { getCMS, isCMSConfigured } from "./payload";
import { withCMS } from "./safe";
import type { CmsRoutedDoc } from "./types";
import { normalizeCmsPath } from "./url";

const DR_AUGUSTIN: BlogAuthor = {
  name: "Dr. Bimisa Augustin",
  credentials: "DNP, FNP-C, PMHNP-BC",
  role: "Doctor of Nursing Practice · Family & Psychiatric NP",
  image: "/images/providers/dr-bimisa-augustin.jpg",
};

const DR_GARTH: BlogAuthor = {
  name: "Dr. Larissa Garth",
  credentials: "DMSC, MPH, MPAS, PA-C",
  role: "Doctor of Medical Science · Certified Physician Assistant",
  image: "/images/providers/dr-larissa-garth.jpg",
};

async function draftEnabled(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

function inferCategory(title: string): { category: string; href: string } {
  const t = title.toLowerCase();
  if (/(iv|hydrat|myers|drip|infusion)/.test(t)) {
    return { category: "IV Nutrition", href: "/iv-nutrition/" };
  }
  if (/(testosterone|\blow t\b|men'?s health|men'?s wellness)/.test(t)) {
    return { category: "Men's Health", href: "/men/" };
  }
  if (/(regenerative|stem cell)/.test(t)) {
    return { category: "Regenerative Medicine", href: "/stem-cells/" };
  }
  if (/(hormone|menopause|perimenopause|hot flash|estradiol|progesterone|bioidentical)/.test(t)) {
    return { category: "Hormone Therapy", href: "/hormone-therapy/" };
  }
  if (/(women|female|gynecolog)/.test(t)) {
    return { category: "Women's Health", href: "/women/" };
  }
  return { category: "Insights", href: "/blog/" };
}

function authorFromName(name?: string | null): BlogAuthor {
  const value = name?.trim() ?? "";
  const lower = value.toLowerCase();
  if (lower.includes("garth")) return DR_GARTH;
  if (!value || lower.includes("augustin")) return DR_AUGUSTIN;
  return {
    name: value,
    credentials: "",
    role: "Central Texas Holistic Care",
    image: DR_AUGUSTIN.image,
  };
}

/** Public blog slug from the stored path, then the slug field. */
export function publicBlogSlug(doc: Pick<CmsRoutedDoc, "path" | "slug">): string | null {
  const path = doc.path ? normalizeCmsPath(doc.path) : "";
  if (path.startsWith("/blog/")) {
    const rest = path.slice("/blog/".length);
    if (rest && !rest.includes("/")) return rest;
  }
  const slug = doc.slug?.trim();
  if (slug && !slug.includes("/")) return slug;
  return null;
}

function blockWords(blocks: BlogBlock[]): number {
  const text = blocks
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
        case "h3":
        case "quote":
          return block.text;
        case "callout":
          return `${block.title} ${block.text}`;
        case "list":
          return block.items.join(" ");
        case "steps":
          return block.items.map((item) => `${item.title ?? ""} ${item.text}`).join(" ");
        default:
          return "";
      }
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

function dateOnly(value?: string | null): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? new Date().toISOString().slice(0, 10);
}

/** Map a published CMS post onto the designed article shape. */
export function cmsPostToBlogPost(doc: CmsRoutedDoc): BlogPost | null {
  const slug = publicBlogSlug(doc);
  const title = doc.title?.trim();
  if (!slug || !title) return null;

  const blocks = lexicalToBlocks(doc.content);
  const firstParagraph = blocks.find((block) => block.type === "p");
  const excerpt = (doc.excerpt?.trim() || (firstParagraph?.type === "p" ? firstParagraph.text : "") || title).slice(
    0,
    320,
  );
  const inferred = inferCategory(`${doc.category ?? ""} ${title}`);
  const category = doc.category?.trim() || inferred.category;
  const categoryHref = inferred.href;
  const coverImage = publicMediaUrl(doc.heroImage) || DEFAULT_COVER;
  const content = blocks.length > 0 ? blocks : [{ type: "p" as const, text: excerpt }];
  const relatedServiceHref = categoryHref === "/blog/" ? "/contact/" : categoryHref;

  return {
    slug,
    title,
    excerpt,
    category,
    categoryHref,
    readMinutes: Math.max(3, Math.round(blockWords(content) / 200)),
    publishedAt: dateOnly(doc.publishedAt || doc.updatedAt),
    updatedAt: doc.updatedAt ?? undefined,
    author: authorFromName(doc.authorName),
    coverImage,
    tags: [category],
    relatedServiceHref,
    relatedServiceLabel: relatedServiceHref === "/contact/" ? "Contact the clinic" : `Explore ${category}`,
    content,
  };
}

function matchesBlogSlug(doc: CmsRoutedDoc, slug: string): boolean {
  if (doc.slug?.trim() === slug) return true;
  return publicBlogSlug(doc) === slug;
}

/** Published CMS posts for the designed blog index. Empty when the DB is down. */
export async function queryPublishedCmsBlogPosts(): Promise<BlogPost[]> {
  if (!isCMSConfigured()) return [];
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "posts",
      draft: false,
      overrideAccess: false,
      depth: 2,
      limit: 1000,
      pagination: false,
      sort: "-publishedAt",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    const posts: BlogPost[] = [];
    const seen = new Set<string>();
    for (const doc of result.docs as CmsRoutedDoc[]) {
      if (doc._status && doc._status !== "published") continue;
      const post = cmsPostToBlogPost(doc);
      if (!post || seen.has(post.slug)) continue;
      seen.add(post.slug);
      posts.push(post);
    }
    return posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, []);
}

/**
 * One CMS post for a blog URL slug, including drafts during preview.
 * Public requests only receive published documents.
 */
export async function queryCmsBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isCMSConfigured() || !slug) return null;
  return withCMS(async () => {
    const payload = await getCMS();
    const draft = await draftEnabled();
    const path = normalizeCmsPath(`/blog/${slug}`);
    const result = await payload.find({
      collection: "posts",
      draft,
      overrideAccess: draft,
      depth: 2,
      limit: 5,
      where: {
        or: [{ slug: { equals: slug } }, { path: { equals: path } }],
      },
    });

    for (const doc of result.docs as CmsRoutedDoc[]) {
      if (!draft && doc._status && doc._status !== "published") continue;
      if (!matchesBlogSlug(doc, slug)) continue;
      const post = cmsPostToBlogPost(doc);
      if (post) return post;
    }
    return null;
  }, null);
}
