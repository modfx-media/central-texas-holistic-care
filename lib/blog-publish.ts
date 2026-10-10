import type { BlogBlock, BlogPost } from "@/lib/blog-data";

/** Killeen, Texas. Publish dates are calendar days in the clinic's timezone. */
export const CLINIC_TIME_ZONE = "America/Chicago";

const PLACEHOLDER_COVER = "/images/blog/default-cover.jpg";

export type BlogPostOrigin = "cms" | "local" | "ranked";

export function calendarDate(value?: string | null): string | null {
  if (!value) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  return match?.[1] ?? null;
}

export function todayInTimeZone(now = new Date(), timeZone = CLINIC_TIME_ZONE): string {
  return now.toLocaleDateString("en-CA", { timeZone });
}

/** A missing date stays visible. A future calendar day stays hidden. */
export function isPublishDateReached(value?: string | null, now = new Date()): boolean {
  const day = calendarDate(value);
  if (!day) return true;
  return day <= todayInTimeZone(now);
}

export function normalizeBlogTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’`´]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function isPlaceholderCover(src?: string | null): boolean {
  if (!src?.trim()) return true;
  const path = src.trim().split("?")[0];
  return path === PLACEHOLDER_COVER || path.endsWith(PLACEHOLDER_COVER);
}

function assetPath(src: string): string {
  const bare = src.trim().split("?")[0];
  if (/^https?:\/\//i.test(bare)) {
    try {
      return new URL(bare).pathname;
    } catch {
      return bare;
    }
  }
  return bare;
}

export function sameAsset(a: string, b: string): boolean {
  return assetPath(a) === assetPath(b);
}

/**
 * The article template already shows the cover. Drop a leading body image
 * that is that same file so it is not painted again under the hero.
 */
export function withoutDuplicateCoverImage(blocks: BlogBlock[], coverImage: string): BlogBlock[] {
  const first = blocks[0];
  if (!first || first.type !== "image") return blocks;
  if (isPlaceholderCover(coverImage) || !sameAsset(first.src, coverImage)) return blocks;
  return blocks.slice(1);
}

function originRank(origin: BlogPostOrigin): number {
  if (origin === "cms") return 2;
  if (origin === "local") return 1;
  return 0;
}

/**
 * One card per article. Same slug or same normalized title is the same post.
 * The CMS copy wins. If that copy has no real cover, keep a sibling's image.
 */
export function dedupeBlogPosts<T extends BlogPost>(
  posts: readonly T[],
  originOf: (post: T) => BlogPostOrigin,
): T[] {
  const parent = posts.map((_, index) => index);
  const find = (index: number): number => {
    let cursor = index;
    while (parent[cursor] !== cursor) {
      parent[cursor] = parent[parent[cursor]];
      cursor = parent[cursor];
    }
    return cursor;
  };
  const union = (left: number, right: number) => {
    const a = find(left);
    const b = find(right);
    if (a !== b) parent[b] = a;
  };

  const bySlug = new Map<string, number>();
  const byTitle = new Map<string, number>();
  posts.forEach((post, index) => {
    const previousSlug = bySlug.get(post.slug);
    if (previousSlug === undefined) bySlug.set(post.slug, index);
    else union(index, previousSlug);

    const title = normalizeBlogTitle(post.title);
    if (!title) return;
    const previousTitle = byTitle.get(title);
    if (previousTitle === undefined) byTitle.set(title, index);
    else union(index, previousTitle);
  });

  const groups = new Map<number, number[]>();
  posts.forEach((_, index) => {
    const root = find(index);
    const group = groups.get(root);
    if (group) group.push(index);
    else groups.set(root, [index]);
  });

  const chosen: T[] = [];
  for (const indexes of groups.values()) {
    const [winnerIndex] = [...indexes].sort((a, b) => {
      const byOrigin = originRank(originOf(posts[b])) - originRank(originOf(posts[a]));
      if (byOrigin !== 0) return byOrigin;
      const byImage =
        Number(isPlaceholderCover(posts[a].coverImage)) -
        Number(isPlaceholderCover(posts[b].coverImage));
      if (byImage !== 0) return byImage;
      return posts[b].publishedAt.localeCompare(posts[a].publishedAt);
    });
    const winner = posts[winnerIndex];
    if (!isPlaceholderCover(winner.coverImage)) {
      chosen.push(winner);
      continue;
    }
    const donor = indexes
      .map((index) => posts[index])
      .find((post) => !isPlaceholderCover(post.coverImage));
    chosen.push(donor ? { ...winner, coverImage: donor.coverImage } : winner);
  }
  return chosen;
}
