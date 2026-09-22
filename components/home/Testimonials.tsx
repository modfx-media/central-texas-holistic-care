"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type TestimonialItem = {
  name: string;
  quote: string;
  when: string;
};

export type TestimonialsProps = {
  items: TestimonialItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function GoogleRatingBadge({
  rating,
  reviewCount,
  reviewsUrl,
  tone = "light",
}: {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  tone?: "light" | "dark";
}) {
  if (rating <= 0 || reviewCount <= 0) return null;

  const onLight = tone === "light";

  return (
    <a
      href={reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        onLight
          ? "border border-stone-200 bg-white text-[#1a3a0a] hover:border-[#C4A862]"
          : "border border-white/25 bg-white/10 text-white hover:border-[#C4A862]/70 hover:bg-white/15"
      }`}
    >
      <GoogleMark className="size-4" />
      <span className="inline-flex items-center gap-1 text-[#C4A862]">
        <Star className="size-3.5 fill-current" />
        {rating.toFixed(1)}
      </span>
      <span className={onLight ? "text-stone-500" : "text-white/70"}>
        {reviewCount.toLocaleString()} Google reviews
      </span>
    </a>
  );
}

function FiveStars() {
  return (
    <div aria-label="Rating: 5 out of 5" className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-[#C4A862] text-[#C4A862]" />
      ))}
    </div>
  );
}

export function Testimonials({
  items,
  rating,
  reviewCount,
  reviewsUrl,
}: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next, paused, items.length]);

  useEffect(() => {
    if (index >= items.length) setIndex(0);
  }, [index, items.length]);

  if (items.length === 0) return null;

  const review = items[index] ?? items[0];

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-14 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Patient Stories
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
          >
            What our patients say.
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <GoogleRatingBadge
              rating={rating}
              reviewCount={reviewCount}
              reviewsUrl={reviewsUrl}
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/30 bg-[#C4A862]/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
              <GoogleMark className="size-3.5" />
              Google
            </span>
          </div>
        </div>

        <div className="relative mt-12 max-w-4xl mx-auto text-center">
          <span aria-hidden className="absolute -left-2 -top-6 text-[#C4A862]/25">
            <Quote className="size-16" />
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative"
            >
              <div className="flex items-center justify-center">
                <FiveStars />
              </div>
              <blockquote className="mt-6 text-xl leading-relaxed text-stone-700 sm:text-2xl">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-[#1a3a0a]">
                {review.name}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                {review.when}
              </p>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="inline-flex size-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-[#C4A862] hover:text-[#1a3a0a]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.name + i}
                    type="button"
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-8 bg-[#C4A862]"
                        : "w-3 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="inline-flex size-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-[#C4A862] hover:text-[#1a3a0a]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={`${item.name}-${item.when}`}
              className="flex h-full flex-col rounded-3xl border border-stone-200 bg-[#faf8f3] p-6 text-left shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <FiveStars />
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                  <GoogleMark className="size-3.5" />
                  Google
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-stone-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-[#1a3a0a]">{item.name}</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-stone-500">
                {item.when}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6f30] transition-colors hover:text-[#1a3a0a]"
          >
            View all Google reviews
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
