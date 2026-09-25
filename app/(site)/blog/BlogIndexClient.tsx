"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import PageHero from "@/components/layout/PageHero";
import { formatPublishedDate, type BlogPost } from "@/lib/blog-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* -------------------------------------------------------------------------- */
/*                                   Featured                                  */
/* -------------------------------------------------------------------------- */

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl shadow-[#1a3a0a]/10">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-[#0f2706]/70 via-[#0f2706]/10 to-transparent"
            />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/50 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862] backdrop-blur">
              Featured
            </span>
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 sm:p-10 lg:p-14">
            <Link
              href={post.categoryHref}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#1a3a0a]/15 bg-[#f0f5eb] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#1a3a0a] transition-colors hover:border-[#6CBE45] hover:bg-[#e5eeda]"
            >
              {post.category}
            </Link>
            <h2
              className="font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}
            >
              <Link
                href={`/blog/${post.slug}/`}
                className="transition-colors hover:text-[#2D5016]"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-[15px] leading-relaxed text-stone-600">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[12px] text-stone-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5 text-[#8a6f30]" />
                {formatPublishedDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-[#8a6f30]" />
                {post.readMinutes} min read
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}/`}
              className="group mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a3a0a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a3a0a]/25 transition hover:bg-[#0f2706]"
            >
              Read the article
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Card                                     */
/* -------------------------------------------------------------------------- */

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md shadow-[#1a3a0a]/5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1a3a0a]/15"
    >
      <Link
        href={`/blog/${post.slug}/`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/40 via-transparent to-transparent"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862] backdrop-blur">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3 text-[11.5px] text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-[#8a6f30]" />
            {formatPublishedDate(post.publishedAt)}
          </span>
          <span aria-hidden className="h-3 w-px bg-stone-300" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-[#8a6f30]" />
            {post.readMinutes} min
          </span>
        </div>

        <h3 className="font-heading text-[1.3rem] font-semibold leading-snug text-[#1a3a0a]">
          <Link
            href={`/blog/${post.slug}/`}
            className="transition-colors hover:text-[#2D5016]"
          >
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-stone-600">
          {post.excerpt}
        </p>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <Link
            href={`/blog/${post.slug}/`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8a6f30] transition-colors group-hover:text-[#1a3a0a]"
          >
            Read article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/blog/${post.slug}/`}
            aria-label={`Read: ${post.title}`}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f5eb] text-[#1a3a0a] transition-all group-hover:bg-[#1a3a0a] group-hover:text-white"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const featured = posts[0];
  const rest = posts.slice(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [rest, activeCategory, query]);

  return (
    <main className="bg-white">
      <PageHero
        title="Insights from our providers"
        subtitle="Evidence-based writing on hormone health, IV nutrition, men's and women's medicine, from the clinicians who see it every day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog/" },
        ]}
        backgroundImage="/images/blog-page-banner-img.jpeg"
      />

      {/* Featured */}
      {featured && (
        <div className="pt-14 sm:pt-20">
          <FeaturedPost post={featured} />
        </div>
      )}

      {/* Filters */}
      <section className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-[color:var(--color-cream-soft)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "inline-flex items-center rounded-full px-4 py-1.5 text-[12.5px] font-semibold tracking-wide transition-all " +
                    (active
                      ? "bg-[#1a3a0a] text-white shadow-md shadow-[#1a3a0a]/25"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-[#6CBE45] hover:text-[#1a3a0a]")
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
              className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-9 pr-4 text-sm text-stone-700 outline-none transition-colors placeholder:text-stone-400 focus:border-[#6CBE45] focus:ring-2 focus:ring-[#6CBE45]/25"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <p className="text-sm text-stone-500">
              No articles matched your filters. Try clearing the search or
              switching category.
            </p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-16 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(108,190,69,0.22), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-10 size-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C4A862]">
              Ready for a real conversation?
            </p>
            <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="font-heading font-semibold leading-[1.1]"
            style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)" }}
          >
            Reading is a start. A plan is what changes things.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-stone-200">
            Book a consultation with our team and turn what you&apos;ve read
            into a personalized plan built on labs, not guesswork.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.tebra.com/care/practice/central-texas-holistic-care-163683"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] shadow-lg transition hover:-translate-y-0.5"
            >
              Book Appointment
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/10"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
