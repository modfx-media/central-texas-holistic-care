"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  Info,
  Link as LinkIcon,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  formatPublishedDate,
  type BlogBlock,
  type BlogPost,
} from "@/lib/blog-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const SITE_URL = "https://centraltexasholisticcarepllc.com";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* lucide-react v1.x removed brand icons; inline SVG fallbacks match Footer.tsx. */
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Reading progress                                */
/* -------------------------------------------------------------------------- */

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-[#6CBE45] via-[#1a3a0a] to-[#C4A862]"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Hero                                     */
/* -------------------------------------------------------------------------- */

function ArticleHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b1d04] text-[#FAF6EE]">
      <Image
        src={post.coverImage}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f2706]/70 via-[#0f2706]/85 to-[#0b1d04]"
      />

      {/* gold hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.22em] text-white/70"
        >
          <Link href="/" className="transition-colors hover:text-[#C4A862]">
            Home
          </Link>
          <ChevronRight className="size-3.5 text-white/40" />
          <Link href="/blog/" className="transition-colors hover:text-[#C4A862]">
            Blog
          </Link>
          <ChevronRight className="size-3.5 text-white/40" />
          <span className="truncate text-[#C4A862]">{post.category}</span>
        </nav>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={post.categoryHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/50 bg-[#C4A862]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4A862] transition-colors hover:bg-[#C4A862]/20"
            >
              {post.category}
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-white/70">
              <Clock className="size-3.5 text-[#C4A862]" />
              {post.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-white/70">
              <Calendar className="size-3.5 text-[#C4A862]" />
              {formatPublishedDate(post.publishedAt)}
            </span>
          </div>

          <h1
            className="mt-6 font-heading font-semibold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 5vw, 4rem)" }}
          >
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {post.excerpt}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Featured image                                 */
/* -------------------------------------------------------------------------- */

function FeaturedImage({ post }: { post: BlogPost }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-hidden={false}
      className="relative mx-auto -mt-16 max-w-5xl px-4 sm:-mt-20 sm:px-6 lg:-mt-24 lg:px-8"
    >
      <figure className="group relative overflow-hidden rounded-[2rem] border border-[#C4A862]/25 bg-white shadow-2xl shadow-[#0f2706]/25 ring-1 ring-white/60">
        {/* gold accent hairline top */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-[#C4A862] to-transparent"
        />
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/25 via-transparent to-transparent"
          />
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 bg-white/95 px-5 py-3 backdrop-blur sm:px-7">
          <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#8a6f30]">
            <Sparkles className="size-3.5 text-[#C4A862]" />
            {post.category}
          </span>
          <span className="text-[11.5px] text-stone-500">
            {formatPublishedDate(post.publishedAt)} · {post.readMinutes} min read
          </span>
        </figcaption>
      </figure>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Content renderer                               */
/* -------------------------------------------------------------------------- */

/** Convert a heading text into a URL-safe id used for the TOC. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={i}>{part}</span>;
        const href = match[2];
        const external = /^https?:\/\//i.test(href);
        const className =
          "font-semibold text-[#1a3a0a] underline decoration-[#C4A862]/70 underline-offset-2 hover:text-[#2D5016]";
        if (external) {
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {match[1]}
            </a>
          );
        }
        return (
          <Link key={i} href={href} className={className}>
            {match[1]}
          </Link>
        );
      })}
    </>
  );
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-[16.5px] leading-[1.85] text-stone-700">
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mt-14 scroll-mt-28 font-heading text-[1.7rem] font-semibold leading-tight text-[#1a3a0a] sm:text-[1.95rem]"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={slugifyHeading(block.text)}
          className="mt-10 scroll-mt-28 font-heading text-[1.25rem] font-semibold text-[#2D5016] sm:text-[1.35rem]"
        >
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <figure className="relative mt-10 rounded-3xl border border-[#C4A862]/30 bg-gradient-to-br from-[#faf6ec] to-white p-7 shadow-sm sm:p-9">
          <Quote
            aria-hidden
            className="absolute -top-4 left-6 size-9 rounded-full bg-[#1a3a0a] p-2 text-[#C4A862]"
          />
          <blockquote className="font-heading text-[1.2rem] italic leading-relaxed text-[#1a3a0a] sm:text-[1.35rem]">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite && (
            <figcaption className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
              {block.cite}
            </figcaption>
          )}
        </figure>
      );
    case "list":
      return (
        <ul className="mt-6 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[16px] leading-[1.7] text-stone-700"
            >
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#6CBE45]" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-8 flex flex-col gap-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <span
                aria-hidden
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-sm font-semibold text-[#C4A862]"
              >
                {i + 1}
              </span>
              <div>
                {item.title && (
                  <p className="font-heading text-[15.5px] font-semibold text-[#1a3a0a]">
                    {item.title}
                  </p>
                )}
                <p className="mt-1 text-[15.5px] leading-[1.75] text-stone-700">
                  <RichText text={item.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="mt-10 flex items-start gap-4 rounded-3xl border border-[#6CBE45]/25 bg-[color:var(--color-soft-green)] p-6">
          <span
            aria-hidden
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1a3a0a] shadow-md"
          >
            <Info className="size-5" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#1a3a0a]/80">
              {block.title}
            </p>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-stone-700">
              <RichText text={block.text} />
            </p>
          </div>
        </aside>
      );
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                             Table of contents                               */
/* -------------------------------------------------------------------------- */

function TableOfContents({
  headings,
  activeId,
}: {
  headings: { id: string; text: string }[];
  activeId: string | null;
}) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-md shadow-[#1a3a0a]/5"
    >
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
        <BookOpen className="size-4 text-[#8a6f30]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a6f30]">
          On this page
        </p>
      </div>
      <ul className="mt-4 flex flex-col gap-1.5">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={
                  "block rounded-lg border-l-2 px-3 py-1.5 text-[13px] leading-snug transition-all " +
                  (active
                    ? "border-[#6CBE45] bg-[#f0f5eb] font-semibold text-[#1a3a0a]"
                    : "border-transparent text-stone-600 hover:border-[#C4A862]/60 hover:text-[#1a3a0a]")
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Share bar                                    */
/* -------------------------------------------------------------------------- */

function ShareBar({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${post.slug}/`;

  const copyLink = async () => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard denied – silent */
    }
  };

  return (
    <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-[color:var(--color-cream-soft)] p-5 sm:p-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a6f30]">
          Share this article
        </p>
        <p className="mt-1 text-[13px] text-stone-600">
          Know someone this could help? Send it their way.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          aria-label="Share on Facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-colors hover:border-[#6CBE45] hover:text-[#1a3a0a]"
        >
          <FacebookIcon className="size-4" />
        </a>
        <a
          aria-label="Share on X (Twitter)"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-colors hover:border-[#6CBE45] hover:text-[#1a3a0a]"
        >
          <TwitterIcon className="size-4" />
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy article link"
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-[12.5px] font-semibold text-stone-700 transition-colors hover:border-[#6CBE45] hover:text-[#1a3a0a]"
        >
          <LinkIcon className="size-3.5" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Related posts                                  */
/* -------------------------------------------------------------------------- */

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="relative w-full bg-[color:var(--color-cream-soft)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Keep reading
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
            >
              More from our clinicians
            </h2>
          </div>
          <Link
            href="/blog/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a3a0a] hover:text-[#2D5016]"
          >
            View all articles
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md shadow-[#1a3a0a]/5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1a3a0a]/15"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/40 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862] backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3 text-[11.5px] text-stone-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[#8a6f30]" />
                    {formatPublishedDate(p.publishedAt)}
                  </span>
                  <span aria-hidden className="h-3 w-px bg-stone-300" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#8a6f30]" />
                    {p.readMinutes} min
                  </span>
                </div>
                <h3 className="font-heading text-[1.2rem] font-semibold leading-snug text-[#1a3a0a] transition-colors group-hover:text-[#2D5016]">
                  {p.title}
                </h3>
                <p className="line-clamp-3 text-[14.5px] leading-relaxed text-stone-600">
                  {p.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8a6f30] transition-colors group-hover:text-[#1a3a0a]">
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                     */
/* -------------------------------------------------------------------------- */

export default function BlogPostClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const headings = useMemo(
    () =>
      post.content
        .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
        .map((b) => ({ id: slugifyHeading(b.text), text: b.text })),
    [post.content],
  );

  /* Scroll spy: highlight the current section in the TOC. */
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Backup: when scrollY is at the very top of the article, force first heading active.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y < 200 && headings[0]) setActiveId(headings[0].id);
  });

  return (
    <main className="bg-white">
      <ReadingProgressBar />
      <ArticleHero post={post} />
      <FeaturedImage post={post} />

      {/* Body layout: sidebar TOC + article column */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          {/* Article */}
          <article ref={contentRef} className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#8a6f30]">
              <Sparkles className="size-3.5 text-[#C4A862]" />
              {post.tags.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span>{t}</span>
                  {i < post.tags.length - 1 && (
                    <span aria-hidden className="text-stone-300">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-2">
              {post.content.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* CTA box after content */}
            <div className="mt-14 overflow-hidden rounded-3xl border border-[#C4A862]/30 bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] p-8 text-white sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C4A862]">
                    Take the next step
                  </p>
                  <h2
                    className="mt-3 font-heading font-semibold leading-tight"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)" }}
                  >
                    Turn this article into a real plan built around your labs.
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/85">
                    Our clinicians will review your symptoms, order the right
                    workup, and design a plan that fits your body, budget, and
                    goals.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-[#1a3a0a] shadow-lg transition hover:-translate-y-0.5"
                  >
                    Book Appointment
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <Link
                    href={post.relatedServiceHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-[13.5px] font-semibold text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/10"
                  >
                    {post.relatedServiceLabel}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <ShareBar post={post} />

            {/* Back to blog */}
            <div className="mt-10">
              <Link
                href="/blog/"
                className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#8a6f30] transition-colors hover:text-[#1a3a0a]"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <TableOfContents headings={headings} activeId={activeId} />

              {/* Consult card */}
              <div className="overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] p-6 text-white shadow-lg shadow-[#1a3a0a]/15">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-[#C4A862]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862]">
                  Free consultation
                </span>
                <h4 className="mt-4 font-heading text-lg font-semibold leading-snug">
                  Ready to talk to a provider?
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                  Same-day appointments. Most insurance accepted. Financing
                  available.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#1a3a0a] transition hover:bg-[#faf6ec]"
                >
                  Book Appointment
                  <ArrowRight className="size-3.5" />
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="size-3.5 text-[#C4A862]" />
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* Have questions */}
              <Link
                href="/contact/"
                className="group flex items-center gap-3 rounded-3xl border border-stone-200 bg-[color:var(--color-cream-soft)] p-5 transition-colors hover:border-[#6CBE45] hover:bg-[#f0f5eb]"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#1a3a0a] shadow-sm">
                  <MessageCircle className="size-5 text-[#6CBE45]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#1a3a0a]">
                    Have questions?
                  </p>
                  <p className="text-[12px] text-stone-600">
                    Send us a message and we&apos;ll reply within one business
                    day.
                  </p>
                </div>
                <ArrowUpRight className="ml-auto size-4 text-[#8a6f30] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <RelatedPosts posts={related} />
    </main>
  );
}
