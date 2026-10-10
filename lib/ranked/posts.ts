import { getRankedContentDetail, isRankedConfigured, listRankedContent } from "./client";
import { getRankedCoverImage } from "./cover";
import { fetchGoogleDocHtml } from "./google-doc";
import {
  htmlToBlogPost,
  isBlogContentType,
  isRankedPostLive,
  publishDateFromRanked,
  slugFromTitle,
} from "./html-to-post";
import { getLocalBlogPosts, isLocalDuplicateRankedItem } from "./local-posts";
import type { BlogPostData, RankedContentDetail, RankedContentListItem } from "./types";

async function resolveArticleHtml(
  item: RankedContentListItem,
  detail: RankedContentDetail | null,
): Promise<string | null> {
  const fromRanked = detail?.content_body?.trim();
  if (fromRanked) return fromRanked;
  const docUrl = detail?.document_url || detail?.source_url || item.document_url || item.source_url;
  return fetchGoogleDocHtml(docUrl);
}

function relatedFromLocal(excludeSlug: string): { title: string; slug: string }[] {
  return [...getLocalBlogPosts()]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)
    .map((p) => ({ title: p.h1, slug: p.slug }));
}

function uniqueSlug(title: string, contentId: string, taken: Set<string>): string {
  const base = slugFromTitle(title);
  if (!taken.has(base)) return base;
  const withId = `${base}-${contentId.slice(0, 8)}`;
  if (!taken.has(withId)) return withId;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export async function getLiveRankedBlogPosts(
  projectId?: string,
  opts: { generateCovers?: boolean; generateForSlug?: string } = {},
): Promise<BlogPostData[]> {
  if (!isRankedConfigured() && !projectId) return [];
  const id = process.env.RANKED_PROJECT_ID;
  if (!process.env.RANKED_API_KEY || !id) return [];
  if (projectId && projectId !== id) return [];

  try {
    const items = await listRankedContent(id);
    const candidates = items.filter(
      (item) =>
        isBlogContentType(item.content_type) &&
        isRankedPostLive(item.status, item.scheduled_date) &&
        !isLocalDuplicateRankedItem(item.title, slugFromTitle(item.title)),
    );
    const local = getLocalBlogPosts();
    const taken = new Set(local.map((p) => p.slug));
    const reservedCovers = new Set(local.map((p) => p.coverImage));
    const resolved = await Promise.all(
      candidates.map(async (item) => {
        let detail: RankedContentDetail | null = null;
        try {
          detail = await getRankedContentDetail(item.id, id);
        } catch (err) {
          console.error(`[ranked] detail failed for ${item.id}`, err);
        }
        try {
          const html = await resolveArticleHtml(item, detail);
          if (!html) return null;
          return { source: detail ?? item, html };
        } catch (err) {
          console.error(`[ranked] article HTML failed for ${item.id}`, err);
          return null;
        }
      }),
    );

    const posts: BlogPostData[] = [];
    for (const row of resolved) {
      if (!row) continue;
      const { source, html } = row;
      if (isLocalDuplicateRankedItem(source.title, slugFromTitle(source.title))) continue;
      const slug = uniqueSlug(source.title, source.id, taken);
      const post = htmlToBlogPost({
        title: source.title,
        html,
        description: source.description,
        publishDate: publishDateFromRanked(source.scheduled_date, source.created_at),
        slug,
        coverImage: source.featured_image_url,
      });
      if (!post) continue;
      post.coverImage = await getRankedCoverImage({
        contentId: source.id,
        title: source.title,
        slug,
        generate: Boolean(opts.generateCovers) || opts.generateForSlug === slug,
        reservedUrls: reservedCovers,
      });
      post.coverAlt = `${source.title} cover`;
      post.relatedPosts = relatedFromLocal(slug);
      posts.push(post);
      taken.add(slug);
    }
    return posts;
  } catch (err) {
    console.error("[ranked] failed to load content calendar", err);
    return [];
  }
}

export async function getLiveRankedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getLiveRankedBlogPosts(undefined, { generateForSlug: slug });
  return posts.find((p) => p.slug === slug);
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getPublishedBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPublishedBlogPosts(): Promise<BlogPostData[]> {
  const local = getLocalBlogPosts();
  const ranked = await getLiveRankedBlogPosts();
  const taken = new Set(local.map((p) => p.slug));
  return [...local, ...ranked.filter((p) => !taken.has(p.slug))];
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();
  return posts.map((p) => p.slug);
}
