"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Service = {
  image: string;
  title: string;
  blurb: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    image: "/images/source/iv-infusion-therapy.jpg",
    title: "IV Infusion Therapy",
    blurb:
      "Clinician-supervised infusions delivering vitamins, minerals, and amino acids directly to your bloodstream for full absorption.",
    href: "/iv-nutrition/",
  },
  {
    image: "/images/services/hormone-treatments-for-men.jpg",
    title: "Hormone Therapy",
    blurb:
      "Bioidentical hormone replacement and pellet therapy tailored to your labs, restore energy, mood, sleep, and libido.",
    href: "/hormone-therapy/",
  },
  {
    image: "/images/services/testosterone-therapy.webp",
    title: "Testosterone Therapy",
    blurb:
      "Lab-guided TRT for men, reclaim strength, focus, drive, and recovery with a protocol built around your biology.",
    href: "/men/testosterone/",
  },
  {
    image: "/images/services/annual-wellness-exams.webp",
    title: "Wellness Exams",
    blurb:
      "Comprehensive preventive screenings, biomarker labs, and longevity-focused checkups for men at every stage of life.",
    href: "/men/wellness-exams/",
  },
  {
    image: "/images/services/comprehensive-gynecological-exams-for-womens-health-v3.jpg",
    title: "Gynecological Exams",
    blurb:
      "Routine women's health visits, screenings, and reproductive care delivered in a calm, judgment-free environment.",
    href: "/women/gynecological-exams/",
  },
  {
    image: "/images/services/menopausal-disorder.jpg",
    title: "Menopausal Care",
    blurb:
      "Personalized peri- and post-menopause support, manage hot flashes, sleep, mood, and bone health with proven therapies.",
    href: "/women/menopausal-disorders/",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function HomeServices() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const gap = 20;
    const cardWidth = firstCard ? firstCard.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[color:var(--color-cream-soft)] via-[color:var(--color-cream-dark)] to-[color:var(--color-cream-soft)] py-14 sm:py-20 lg:py-28"
    >
      {/* Soft seams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-soft-green)]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent"
      />
      {/* Editorial dot grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.22]"
      >
        <defs>
          <pattern
            id="services-dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#8a6f30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#services-dots)" />
      </svg>
      {/* Warm gold + forest accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 size-[460px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.30), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-24 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,80,22,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#6CBE45]" />
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#8BAD5A]">
              Supportive Therapies We Offer
            </p>
            <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#6CBE45]" />
          </div>
          <h2
            className="mt-5 font-heading font-semibold leading-[1.05] text-[#1a3a0a]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Care for Every{" "}
            <span className="bg-gradient-to-r from-[#2D5016] via-[#6CBE45] to-[#2D5016] bg-clip-text italic text-transparent">
              Season of Life.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">
            A full spectrum of evidence-based, holistic medicine, delivered
            in a warm, individualized setting at our Harker Heights clinic.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Carousel arrows */}
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollPrev}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white p-3 text-[#1a3a0a] shadow-lg shadow-[#2D5016]/10 transition-all hover:border-[#6CBE45] hover:bg-[#f0f5eb] disabled:cursor-not-allowed disabled:opacity-0 lg:flex"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next services"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollNext}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white p-3 text-[#1a3a0a] shadow-lg shadow-[#2D5016]/10 transition-all hover:border-[#6CBE45] hover:bg-[#f0f5eb] disabled:cursor-not-allowed disabled:opacity-0 lg:flex"
          >
            <ArrowRight className="size-5" />
          </button>

          <motion.div
            ref={scrollerRef}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map(({ image, title, blurb, href }, i) => (
              <motion.div
                key={title}
                data-card
                variants={fadeUp}
                className="w-[80%] flex-none snap-start sm:w-[45%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all hover:-translate-y-1.5 hover:border-[#6CBE45]/50 hover:shadow-2xl hover:shadow-[#2D5016]/15"
                >
                  {/* Visual w/ index badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f0f5eb]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* gradient overlay on hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#1a3a0a]/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90"
                    />
                    {/* index chip */}
                    <span className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full bg-white/90 px-2.5 py-1 font-heading text-[11px] font-medium tracking-[0.2em] text-[#2D5016] backdrop-blur-sm">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-xl font-medium leading-tight text-[#1a3a0a] transition-colors group-hover:text-[#2D5016]">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                      {blurb}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2D5016]">
                        Learn more
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span
                        aria-hidden
                        className="block h-[2px] w-0 rounded-full bg-gradient-to-r from-[#2D5016] to-[#6CBE45] transition-all duration-500 group-hover:w-12"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/about-us/"
            className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/20 bg-white px-7 py-3 text-sm font-semibold text-[#1a3a0a] transition-colors hover:border-[#6CBE45] hover:bg-[#f0f5eb]"
          >
            View All Services
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
