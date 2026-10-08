import {
  BLOG_POSTS,
  getRelatedPosts,
  normalizeBulletBlocks,
  type BlogBlock,
  type BlogPost,
} from "@/lib/blog-data";
import { SITE_URL } from "@/lib/site";

import { queryCmsBlogPostBySlug, queryPublishedCmsBlogPosts } from "@/lib/cms/posts";

import { getPublishedBlogPosts } from "./posts";
import type { BlogPostData } from "./types";

const DEFAULT_AUTHOR: BlogPost["author"] = {
  name: "Dr. Bimisa Augustin",
  credentials: "DNP, FNP-C, PMHNP-BC",
  role: "Doctor of Nursing Practice · Family & Psychiatric NP",
  image: "/images/providers/dr-bimisa-augustin.jpg",
};

function wordCount(post: BlogPostData): number {
  const text = [post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.body])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
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
  if (/(hormone|menopause|perimenopause|hot flash|estradiol|progesterone)/.test(t)) {
    return { category: "Hormone Therapy", href: "/hormone-therapy/" };
  }
  if (/(women|female|gynecolog)/.test(t)) {
    return { category: "Women's Health", href: "/women/" };
  }
  return { category: "Insights", href: "/blog/" };
}

function rankedToBlocks(post: BlogPostData): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  if (post.intro.trim()) blocks.push({ type: "p", text: post.intro.trim() });

  for (const section of post.sections) {
    const heading = section.heading.trim();
    const headingIsTitle =
      heading.replace(/\s+/g, " ").toLowerCase() === post.title.replace(/\s+/g, " ").toLowerCase();
    if (heading && !headingIsTitle) {
      blocks.push({ type: "h2", text: heading });
    }
    for (const para of section.body) {
      const text = para.trim();
      if (text.length > 1) blocks.push({ type: "p", text });
    }
  }

  const filled = blocks.length ? blocks : [{ type: "p" as const, text: post.metaDescription || post.title }];
  return normalizeBulletBlocks(filled);
}

export function rankedDataToBlogPost(post: BlogPostData): BlogPost {
  const { category, href } = inferCategory(post.title);
  const minutes = Math.max(3, Math.round(wordCount(post) / 200));

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.metaDescription || post.intro,
    category,
    categoryHref: href,
    readMinutes: minutes,
    publishedAt: post.publishDate.slice(0, 10),
    author: DEFAULT_AUTHOR,
    coverImage: post.coverImage,
    tags: [category],
    relatedServiceHref: post.cta.href,
    relatedServiceLabel: post.cta.label,
    content: rankedToBlocks(post),
  };
}

export function absoluteAssetUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const origin = SITE_URL.replace(/\/$/, "");
  return `${origin}${src.startsWith("/") ? src : `/${src}`}`;
}

export async function getPublishedUiPosts(): Promise<BlogPost[]> {
  const merged = await getPublishedBlogPosts();
  const localBySlug = new Map(BLOG_POSTS.map((post) => [post.slug, post]));

  const designed = merged.map((data) => {
    const local = localBySlug.get(data.slug);
    if (local) {
      return {
        ...local,
        publishedAt: data.publishDate,
        coverImage: data.coverImage,
      };
    }
    return rankedDataToBlogPost(data);
  });

  const cmsPosts = await queryPublishedCmsBlogPosts();
  const seen = new Set(designed.map((post) => post.slug));
  const extras = cmsPosts.filter((post) => !seen.has(post.slug));

  return [...designed, ...extras].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPublishedUiPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedUiPosts();
  return (
    posts.find((post) => post.slug === slug) ??
    (await queryCmsBlogPostBySlug(slug)) ??
    undefined
  );
}

export async function getPublishedRelatedPosts(slug: string, count = 2): Promise<BlogPost[]> {
  const posts = await getPublishedUiPosts();
  const fromLive = posts.filter((post) => post.slug !== slug).slice(0, count);
  if (fromLive.length > 0) return fromLive;
  return getRelatedPosts(slug, count);
}
