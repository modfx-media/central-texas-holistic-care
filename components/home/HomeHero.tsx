"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  RefreshCw,
  Star,
} from "lucide-react";

const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const PHONE_TEL = "+12542132423";
const PHONE_DISPLAY = "(254) 213-2423";
const AUTOPLAY_MS = 6500;

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICE_TAGS: { label: string; href: string }[] = [
  { label: "Hormone Therapy", href: "/hormone-therapy/" },
  { label: "IV Nutrition", href: "/iv-nutrition/" },
  { label: "Men's Health", href: "/men/" },
  { label: "Women's Health", href: "/women/" },
];

type Slide = {
  src: string;
  alt: string;
  position: string;
  /** Title displayed in the "NOW FEATURING" card. */
  caption: string;
  /** Short eyebrow shown above the title on the card. */
  eyebrow: string;
};

const SLIDES: Slide[] = [
{
    src: "/images/hero/doctor-2.png",
    alt: "Board-certified clinician reviewing a patient wellness plan",
    position: "center 28%",
    caption: "Board-certified team",
    eyebrow: "Now featuring",
  },
  {
    src: "/images/hero/iv-therapy.png",
    alt: "IV nutrition therapy session in a calm clinical setting",
    position: "center 35%",
    caption: "IV nutrition therapy",
    eyebrow: "Now featuring",
  },
  {
    src: "/images/hero/couple.png",
    alt: "Couple enjoying renewed energy after hormone optimization",
    position: "center 30%",
    caption: "Whole-family wellness",
    eyebrow: "Now featuring",
  },
  {
    src: "/images/hero/testosterone.png",
    alt: "Testosterone and hormone optimization program for men",
    position: "center 32%",
    caption: "Hormone optimization",
    eyebrow: "Now featuring",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const headingId = useId();
  const total = SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const normalized = (next + total) % total;
      setDirection(
        normalized > index || (index === total - 1 && normalized === 0) ? 1 : -1,
      );
      setIndex(normalized);
    },
    [index, total],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;
    }
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const active = SLIDES[index];

  return (
    <section
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      aria-label="Central Texas Holistic Care highlights"
      className="relative isolate w-full overflow-hidden bg-[#0b1d04] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ─── Background slider (heavily overlaid) ─── */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={`bg-${active.src}`}
            custom={direction}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                opacity: { duration: 1.1, ease: EASE },
                scale: { duration: 9, ease: "linear" },
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE } }}
            className="absolute inset-0"
            aria-hidden
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: active.position }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Deep brand wash (matches reference's heavy navy treatment) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,29,4,0.92) 0%, rgba(15,39,6,0.86) 45%, rgba(26,58,10,0.78) 100%)",
          }}
        />
        {/* Soft grid overlay */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full opacity-[0.18] mix-blend-overlay"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#9DD270"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -bottom-24 size-[560px] rounded-full blur-3xl mix-blend-screen"
          style={{
            background:
              "radial-gradient(closest-side, rgba(108,190,69,0.35), transparent 70%)",
          }}
        />
      </div>

      {/* Live region for screen readers */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {index + 1} of {total}: {active.alt}
      </p>

      {/* ─── Foreground grid: copy + showcase card ─── */}
      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-32">
        {/* ─── Copy column ─── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <MapPin className="size-3.5 text-[#9DD270]" />
              Killeen, TX · Central Texas
            </span>
          </motion.div>

          <motion.h1
            id={headingId}
            variants={fadeUp}
            className="mt-7 font-heading font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Personalized care for{" "}
            <span className="relative inline-block">
              <span className="italic text-[#C4A862]">whole-body</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#C4A862] to-transparent opacity-80"
              />
            </span>{" "}
            wellness.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Combining root-cause functional medicine with provider-led
            hormone therapy and IV nutrition to help your body perform the way
            it was designed to, through advanced testing, personalized
            protocols, and most insurance accepted with 0% APR financing.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {SERVICE_TAGS.map((tag) => (
              <li key={tag.href}>
                <Link
                  href={tag.href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:border-[#9DD270] hover:bg-white/20 hover:text-[#E8F5DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DD270] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1d04]"
                >
                  {tag.label}
                  <ArrowRight className="size-3 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#a98a44] to-[#8a6f30] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b1d04] shadow-xl shadow-[#0b1d04]/45 ring-1 ring-[#C4A862]/40 transition-shadow hover:shadow-2xl hover:shadow-[#C4A862]/30"
            >
              Book free consultation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:border-[#9DD270] hover:bg-white/15"
            >
              <Phone className="size-4 text-[#9DD270]" />
              Call {PHONE_DISPLAY}
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-xs leading-relaxed text-white/65"
          >
            Meet with our team to discuss your health concerns, goals,
            symptoms, and treatment options. We&apos;ll help determine the best
            path forward for your unique needs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#C4A862] text-[#C4A862]" />
              ))}
            </div>
            <p className="text-sm text-white/80">
              Trusted by patients across Central Texas
            </p>
          </motion.div>
        </motion.div>

        {/* ─── Hero image showcase card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          {/* Glow halo */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#6CBE45]/20 via-transparent to-[#C4A862]/15 blur-2xl"
          />

          <button
            type="button"
            onClick={next}
            aria-label={`Show next slide (${((index + 1) % total) + 1} of ${total})`}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b1d04]/60 text-left shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DD270]"
          >
            {/* image */}
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={`card-${active.src}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    opacity: { duration: 0.9, ease: EASE },
                    scale: { duration: 9, ease: "linear" },
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.6, ease: EASE },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  priority={index === 0}
                  quality={95}
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, (min-width: 640px) 80vw, 95vw"
                  className="object-cover"
                  style={{ objectPosition: active.position }}
                />
              </motion.div>
            </AnimatePresence>

            {/* bottom caption gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,29,4,0) 0%, rgba(11,29,4,0.85) 70%, rgba(11,29,4,0.95) 100%)",
              }}
            />

            {/* "TAP FOR NEXT" pill */}
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#C4A862] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0b1d04] shadow-lg shadow-black/30 transition group-hover:bg-[#d4b974] group-hover:shadow-[#C4A862]/40">
              <RefreshCw className="size-3" />
              Tap for next
            </span>

            {/* slide number */}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/30 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-white/90 backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/40">/</span>
              {String(total).padStart(2, "0")}
            </span>

            {/* now featuring caption */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-10 sm:px-8 sm:pb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cap-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862]">
                    {active.eyebrow}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
                    {active.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* corner accents */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 bottom-3 size-4 border-b border-l border-[#C4A862]/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 bottom-3 size-4 border-b border-r border-[#C4A862]/70"
            />
          </button>

          {/* Thumbnail rail under card */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0b1d04]/55 p-1.5 shadow-lg shadow-black/40 backdrop-blur-md"
            aria-label="Slide previews"
          >
            {SLIDES.map((slide, i) => {
              const isActive = i === index;
              return (
                <li key={`thumb-${slide.src}`}>
                  <motion.button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show slide ${i + 1}: ${slide.caption}`}
                    aria-current={isActive ? "true" : undefined}
                    initial={false}
                    animate={{ width: isActive ? 64 : 40 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`relative h-10 overflow-hidden rounded-full ring-1 transition ${
                      isActive
                        ? "ring-2 ring-[#C4A862] shadow-md shadow-[#C4A862]/30"
                        : "ring-white/15 hover:ring-white/45"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="128px"
                      quality={90}
                      className="object-cover"
                      style={{ objectPosition: slide.position }}
                    />
                    <span
                      aria-hidden
                      className={`absolute inset-0 transition ${
                        isActive ? "bg-transparent" : "bg-[#0b1d04]/45"
                      }`}
                    />
                  </motion.button>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>
      </div>

      {/* ─── Side arrows (desktop) ─── */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-between px-3 sm:flex sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto group inline-flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg shadow-black/30 backdrop-blur-md transition hover:scale-105 hover:border-[#9DD270] hover:bg-white/20 sm:size-14"
        >
          <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto group inline-flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg shadow-black/30 backdrop-blur-md transition hover:scale-105 hover:border-[#9DD270] hover:bg-white/20 sm:size-14"
        >
          <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ─── Progress bar (bottom edge) ─── */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/10">
        <motion.div
          key={`bar-${index}-${paused ? "p" : "r"}`}
          className="h-full origin-left bg-gradient-to-r from-[#9DD270] via-[#C4A862] to-[#9DD270]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: paused ? 0.4 : AUTOPLAY_MS / 1000,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
