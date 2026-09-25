"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  HeartPulse,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { GoogleRatingBadge } from "@/components/home/Testimonials";
import HomeInsuranceMarquee from "@/components/home/HomeInsuranceMarquee";
import { useBookingPopup } from "@/components/booking/BookingPopupProvider";
import { formatPublishedDate, getAllPosts, type BlogPost } from "@/lib/blog-data";

/* -------------------------------------------------------------------------- */
/*                                Site data                                   */
/* -------------------------------------------------------------------------- */

const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const ADDRESS_LINE_1 = "311 E. Stan Schlueter Loop #207";
const ADDRESS_LINE_2 = "Killeen, TX 76542";
const DIRECTIONS_URL =
  "https://www.google.com/maps/place/Central+Texas+Holistic+Care/@31.075632,-97.7480549,895m/data=!3m1!1e3!4m15!1m8!3m7!1s0x86454b020a215555:0xb6e37773caed83b4!2s311+E+Stan+Schlueter+Loop+%23207,+Killeen,+TX+76542,+USA!3b1!8m2!3d31.075632!4d-97.7480549!16s%2Fg%2F11rnfbj6qc!3m5!1s0x864549a554865219:0x19284a788b4a1a58!8m2!3d31.075632!4d-97.7480549!16s%2Fg%2F11ln_0df5q!5m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("311 E. Stan Schlueter Loop #207, Killeen, TX 76542") +
  "&z=15&output=embed";

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*                                Hero slides                                 */
/* -------------------------------------------------------------------------- */

type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero/doctor-1.png",
    eyebrow: "Since 2024",
    title: "Holistic Medicine and Hormone Therapy in Killeen, TX",
    description:
      "Comprehensive healthcare for men and women featuring hormone therapy, IV nutrition, wellness exams, stem cell therapy, weight management, and personalized treatment plans, all under one roof in Killeen, TX.",
    ctaLabel: "Meet the providers",
    ctaHref: "/about-us/",
  },
  {
    image: "/images/hero/mens-hormone-treatment.png",
    eyebrow: "Men's Health & Testosterone",
    title: "Reclaim Energy, Strength, and Drive.",
    description:
      "Clinician-supervised testosterone optimization, wellness exams, and lab-guided protocols built for men in Killeen, TX.",
    ctaLabel: "Explore Men's Health",
    ctaHref: "/men/",
  },
  {
    image: "/images/hero/iv-therapy.png",
    eyebrow: "IV Nutrition Therapy",
    title: "Nutrients Delivered, Right Where You Need Them.",
    description:
      "Myers' Cocktail, immune boosters, hangover recovery, and workout recovery drips supervised by our providers in Killeen, TX.",
    ctaLabel: "Explore IV Menu",
    ctaHref: "/iv-nutrition/",
  },
  {
    image: "/images/hero/testosterone.png",
    eyebrow: "Hormone Replacement Therapy",
    title: "Restore Balance With Bioidentical HRT.",
    description:
      "Bioidentical hormone replacement and pellet therapy tailored to your labs, for men and women.",
    ctaLabel: "Learn About HRT",
    ctaHref: "/hormone-therapy/",
  },
  {
    image: "/images/hero/couple.png",
    eyebrow: "Women's Health & Menopause",
    title: "Care Designed Around Every Life Stage.",
    description:
      "Gynecological exams, menstrual and menopausal support, and hormone care built around your labs and history.",
    ctaLabel: "Explore Women's Health",
    ctaHref: "/women/",
  },
];

const AUTOPLAY_MS = 5500;

function HeroSlider({
  googleMeta,
}: {
  googleMeta?: { rating: number; reviewCount: number; reviewsUrl: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;
  const { openBookingPopup } = useBookingPopup();

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#0f2706]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Highlights of Central Texas Holistic Care"
    >
      <div className="relative h-[min(80vh,720px)] w-full sm:h-[min(78vh,760px)]">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[index].image}
              alt={HERO_SLIDES[index].title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            {/* Cinematic gradients */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[#0f2706]/55"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/80 via-[#0f2706]/20 to-[#0f2706]/40"
            />
          </motion.div>
        </AnimatePresence>

        {/* Copy block */}
        <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mx-auto max-w-3xl text-white"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C4A862]">
                  {HERO_SLIDES[index].eyebrow}
                </p>
                <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
              </div>
              <h1
                className="mt-5 font-heading font-semibold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)" }}
              >
                {HERO_SLIDES[index].title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {HERO_SLIDES[index].description}
              </p>
              {googleMeta && googleMeta.rating > 0 && googleMeta.reviewCount > 0 && (
                <div className="mt-6 flex justify-center">
                  <GoogleRatingBadge
                    rating={googleMeta.rating}
                    reviewCount={googleMeta.reviewCount}
                    reviewsUrl={googleMeta.reviewsUrl}
                    tone="dark"
                  />
                </div>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={HERO_SLIDES[index].ctaHref}
                  target={HERO_SLIDES[index].ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={HERO_SLIDES[index].ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  {HERO_SLIDES[index].ctaLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={() => openBookingPopup(BOOKING_URL)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/10"
                >
                  <CalendarCheck className="size-4 text-[#C4A862]" />
                  Book Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-10 bg-[#C4A862]"
                    : "w-4 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/20"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Announcement bar                              */
/* -------------------------------------------------------------------------- */

function AnnouncementMarquee() {
  const items = [
    "Provider-led · Killeen, TX",
    "Most insurance accepted",
    "0% APR financing · Cherry & Denefits",
    "Same-day appointments",
    "Trusted by 1,200+ patients",
  ];
  const doubled = [...items, ...items];

  return (
    <section
      aria-label="Practice highlights"
      className="relative overflow-hidden border-y border-[#1a3a0a]/10 bg-[color:var(--color-cream-soft)] py-4"
    >
      <div className="marquee-track flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1a3a0a]/80"
          >
            <Sparkles className="size-3 text-[#C4A862]" />
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-scroll 32s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Welcome                                     */
/* -------------------------------------------------------------------------- */

const WELCOME_BULLETS = [
  "Bioidentical hormone replacement",
  "Personalized nutrition support",
  "Regenerative & restorative care",
  "Preventative, root-cause approach",
] as const;

function WelcomeSection() {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-[#1a3a0a]/15">
              <Image
                src="/images/source/the-best-thing-you-can-do-for-your-health.jpeg"
                alt="Central Texas Holistic Care patient enjoying wellness"
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
            {/* Floating info card */}
            <div className="absolute -bottom-8 -right-4 hidden max-w-[240px] rounded-2xl bg-white p-5 shadow-2xl shadow-[#1a3a0a]/20 ring-1 ring-[#C4A862]/25 sm:block lg:-right-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#6CBE45]/15 text-[#1a3a0a]">
                  <Leaf className="size-4" />
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                  Provider-Led
                </p>
              </div>
              <p className="mt-3 text-sm leading-snug text-stone-700">
                Trusted by <strong className="text-[#1a3a0a]">1,200+</strong>{" "}
                patients across Central Texas.
              </p>
            </div>
          </motion.div>

          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Welcome to CTHC
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.05] text-[#1a3a0a]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              The Best Thing You Can Do{" "}
              <span className="italic text-[#8a6f30]">to Your Health.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600 sm:text-lg">
              We focus on regenerative, restorative and preventative treatments
              through our specialization in hormonal and metabolic systems
              dysfunctions. We help to restore patients&apos; lives with natural
              bioidentical hormone replacement, nutrition support and
              regenerative services and allopathic treatments.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {WELCOME_BULLETS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-stone-700"
                >
                  <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-[#6CBE45]/15 text-[#1a3a0a]">
                    <Sparkles className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/about-us/"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1a3a0a] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1a3a0a]/25 transition hover:bg-[#0f2706]"
              >
                About Us
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] hover:border-[#6CBE45] hover:bg-[#f0f5eb]"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Providers intro                               */
/* -------------------------------------------------------------------------- */

type Provider = {
  name: string;
  credentials: string;
  role: string;
  image: string;
  blurb: string;
  badge: string;
  bookingUrl: string;
};

const PROVIDERS: Provider[] = [
  {
    name: "Dr. Bimisa Augustin",
    credentials: "DNP, FNP-C, PMHNP-BC",
    role: "Doctor of Nursing Practice · Family & Psychiatric NP",
    image: "/images/providers/dr-bimisa-augustin.jpg",
    blurb:
      "26 years of medical experience and a US Army veteran with 6 combat deployments. Dr. Augustin is passionate about integrative, hormone-based therapies that help patients thrive.",
    badge: "Founder & Provider",
    bookingUrl:
      "https://www.tebra.com/care/provider/bimisa-augustin-dnp-msn-aprnfnp-c-1043765431?lid=2324997788/",
  },
  {
    name: "Dr. Larissa Garth",
    credentials: "DMSC, MPH, MPAS, PA-C",
    role: "Doctor of Medical Science · Certified Physician Assistant",
    image: "/images/providers/dr-larissa-garth.jpg",
    blurb:
      "10+ years of clinical experience. Dr. Garth blends traditional medicine with hormone health therapy to enhance patient vitality and long-term wellness.",
    badge: "Provider",
    bookingUrl:
      "https://www.tebra.com/care/provider/larissa-garth-pa-c-1487096947",
  },
];

function ProvidersSection() {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Meet Your Providers
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Board-certified. Deeply experienced.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Every plan is built and supervised by a licensed clinician who
            takes the time to know your story.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PROVIDERS.map((provider, i) => (
            <motion.article
              key={provider.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-b from-white to-[#faf6ec] shadow-lg shadow-[#1a3a0a]/8 transition-shadow hover:shadow-2xl hover:shadow-[#1a3a0a]/15 sm:flex-row"
            >
              <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-56">
                <Image
                  src={provider.image}
                  alt={`${provider.name}, ${provider.credentials}`}
                  fill
                  sizes="(min-width: 1024px) 14rem, (min-width: 640px) 40vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/40 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4A862] backdrop-blur">
                  <Star className="size-3" />
                  {provider.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-heading text-xl font-semibold text-[#1a3a0a] sm:text-2xl">
                  {provider.name},{" "}
                  <span className="italic text-[#8a6f30]">
                    {provider.credentials}
                  </span>
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a3a0a]/70">
                  {provider.role}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">
                  {provider.blurb}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={provider.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#1a3a0a] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#1a3a0a]/20 transition hover:bg-[#0f2706]"
                  >
                    <CalendarCheck className="size-3.5 text-[#C4A862]" />
                    Book with {provider.name.split(" ")[1]}
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                  <Link
                    href="/about-us/"
                    className="text-xs font-semibold text-[#8a6f30] hover:text-[#1a3a0a]"
                  >
                    Read full bio
                    <ArrowUpRight className="ml-1 inline size-3" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Services                                   */
/* -------------------------------------------------------------------------- */

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
      "Clinician-supervised infusions delivering vitamins, minerals, and amino acids directly to your bloodstream.",
    href: "/iv-nutrition/",
  },
  {
    image: "/images/services/hormone-treatments-for-men.jpg",
    title: "Hormone Therapy",
    blurb:
      "Bioidentical hormone replacement and pellet therapy tailored to your labs.",
    href: "/hormone-therapy/",
  },
  {
    image: "/images/services/testosterone-therapy.webp",
    title: "Testosterone Therapy",
    blurb:
      "Lab-guided TRT for men, reclaim strength, focus, drive, and recovery.",
    href: "/men/testosterone/",
  },
  {
    image: "/images/services/annual-wellness-exams.webp",
    title: "Wellness Exams",
    blurb:
      "Comprehensive preventive screenings, biomarker labs, and longevity-focused checkups.",
    href: "/men/wellness-exams/",
  },
  {
    image: "/images/services/comprehensive-gynecological-exams-for-womens-health-v3.jpg",
    title: "Gynecological Exams",
    blurb:
      "Routine women's health visits, screenings, and reproductive care in a calm environment.",
    href: "/women/gynecological-exams/",
  },
  {
    image: "/images/services/menopausal-disorder.jpg",
    title: "Menopausal Care",
    blurb:
      "Peri- and post-menopause support, manage hot flashes, sleep, mood, and bone health.",
    href: "/women/menopausal-disorders/",
  },
];

function ServicesGrid() {
  return (
    <section className="relative w-full bg-[color:var(--color-cream-soft)] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Medical Services
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Care that&apos;s designed around you.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            From hormone balance to IV nutrition and preventive medicine, every
            plan starts with your labs and your goals.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#1a3a0a]/8 ring-1 ring-stone-200 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1a3a0a]/15"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/40 via-transparent to-transparent"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-[#1a3a0a]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {service.blurb}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6f30] transition-colors hover:text-[#1a3a0a]"
                >
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Approach pillars                              */
/* -------------------------------------------------------------------------- */

type Pillar = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Stethoscope,
    title: "What Is Holistic Medicine?",
    body: "Holistic medicine focuses on treating the entire body, not just isolated symptoms or conditions. This whole-body approach promotes long-term health, balance, and a deeper sense of well-being.",
  },
  {
    icon: Droplet,
    title: "IV Hydration Therapy",
    body: "Boost your energy, immunity, and wellness with IV Hydration Therapy, a nutrient-rich infusion of vitamins, minerals, and fluids delivered straight into your bloodstream for fast absorption.",
  },
  {
    icon: ShieldCheck,
    title: "Comprehensive Wellness Exams",
    body: "Regular wellness exams are key to preventive healthcare, assessing your overall health and keeping you current on vaccinations and screenings tailored to your age, lifestyle, and goals.",
  },
];

function PillarsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Our Approach
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Whole-person medicine, at every visit.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-b from-white to-[#faf6ec] p-8 transition-shadow hover:shadow-xl hover:shadow-[#1a3a0a]/10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#C4A862] to-transparent opacity-60"
              />
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862] shadow-lg shadow-[#0f2706]/25">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  HRT feature                               */
/* -------------------------------------------------------------------------- */

function HRTFeatureSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 size-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C4A862]">
                Restoring Balance
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Hormone Replacement Therapy{" "}
              <span className="italic text-[#C4A862]">(HRT).</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-200 sm:text-lg">
              Hormone Replacement Therapy (HRT) helps restore hormonal balance
              by supplementing your body with bioidentical hormones, bringing
              levels back to their optimal range. This targeted therapy can
              effectively reduce symptoms of imbalance while improving energy,
              mood, and overall quality of life.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                "Bioidentical",
                "Energy",
                "Mood",
                "Sleep",
                "Libido",
                "Lab-guided",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[#C4A862]/40 bg-[#C4A862]/10 px-3.5 py-1 text-xs font-semibold text-[#C4A862]"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Link
                href="/hormone-therapy/"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] shadow-lg transition hover:-translate-y-0.5"
              >
                Learn About HRT
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[#C4A862]/30 shadow-2xl shadow-black/40">
              <Image
                src="/images/home-2/hrt.png"
                alt="Hormone replacement therapy at Central Texas Holistic Care"
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0b1d04]/50 via-transparent to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Journey                                    */
/* -------------------------------------------------------------------------- */

const JOURNEY_STEPS = [
  {
    n: "01",
    title: "Reach Out",
    body: "Call us at (254) 213-2423, fill out a contact form, or book directly through our online portal. We respond same or next business day.",
    badge: "Day 1",
  },
  {
    n: "02",
    title: "Personal Consult",
    body: "Tell us what you're experiencing and your goals. We pair you with a provider whose expertise matches your needs.",
    badge: "Week 1",
  },
  {
    n: "03",
    title: "Build Your Plan",
    body: "Targeted labs, comprehensive history, and a personalized plan combining family medicine and natural therapies.",
    badge: "Week 2",
  },
  {
    n: "04",
    title: "Heal & Thrive",
    body: "Ongoing follow-ups, IV menu, supplements, and pellet refills: your provider adjusts the plan as your body responds.",
    badge: "Ongoing",
  },
] as const;

function JourneySection() {
  return (
    <section className="relative w-full bg-[color:var(--color-cream-soft)] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Your Journey
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Four steps from first call to feeling like yourself.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map(({ n, title, body, badge }, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 shadow-sm"
            >
              <span
                aria-hidden
                className="absolute right-5 top-4 font-heading text-5xl font-bold text-[#C4A862]/25"
              >
                {n}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#C4A862]/40 bg-[#C4A862]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]">
                {badge}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Blog posts                                  */
/* -------------------------------------------------------------------------- */

function BlogSection({ posts }: { posts: BlogPost[] }) {
  const latestPosts = posts
    .slice(0, 3)
    .map((post) => ({
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      date: formatPublishedDate(post.publishedAt),
      read: `${post.readMinutes} min read`,
      href: `/blog/${post.slug}/`,
      image: post.coverImage,
    }));

  return (
    <section className="relative w-full bg-[color:var(--color-cream-soft)] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-10 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                From the Blog
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Insights for your{" "}
              <span className="italic text-[#8a6f30]">journey.</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              Straightforward guides on hormones, IV nutrition, and preventive
              medicine, written by our providers for real patients.
            </p>
          </div>
          <Link
            href="/blog/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a3a0a] hover:border-[#6CBE45] hover:bg-[#f0f5eb]"
          >
            View all articles
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <motion.article
              key={post.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#1a3a0a]/8 ring-1 ring-stone-200 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1a3a0a]/15"
            >
              <Link href={post.href} className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0f2706]/40 via-transparent to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30] shadow-sm backdrop-blur">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-[11px] text-stone-500">
                  <span>{post.date}</span>
                  <span aria-hidden className="size-1 rounded-full bg-stone-300" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.read}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-[#1a3a0a]">
                  <Link
                    href={post.href}
                    className="hover:text-[#8a6f30]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {post.excerpt}
                </p>
                <Link
                  href={post.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6f30] transition-colors hover:text-[#1a3a0a]"
                >
                  Read more
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CTA band                                  */
/* -------------------------------------------------------------------------- */

function CTABand() {
  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--color-cream-soft)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#C4A862]/25 bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] p-10 shadow-2xl shadow-[#1a3a0a]/25 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #C4A862 0%, transparent 40%), radial-gradient(circle at 80% 80%, #6CBE45 0%, transparent 40%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C4A862]">
                  Ready when you are
                </p>
              </div>
              <h2
                className="mt-4 font-heading font-semibold leading-[1.1] text-white"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)" }}
              >
                You are our top priority.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                Request an appointment today and we&apos;ll walk you through
                every option, honestly, and design a plan that fits your goals.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] shadow-lg transition hover:-translate-y-0.5"
              >
                <CalendarCheck className="size-4" />
                Request Appointment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[#C4A862]/70 hover:bg-white/10"
              >
                <Phone className="size-4 text-[#C4A862]" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Location                                   */
/* -------------------------------------------------------------------------- */

const HOURS = [
  { day: "Mon to Fri", time: "8:00 AM to 5:00 PM" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

function LocationSection() {
  return (
    <section className="relative w-full bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Visit Us
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#1a3a0a]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
            >
              Care, right in the heart of Killeen.
            </h2>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Address
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-[#1a3a0a]">
                    {ADDRESS_LINE_1}
                  </p>
                  <p className="text-sm text-stone-600">{ADDRESS_LINE_2}</p>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#8a6f30] hover:text-[#1a3a0a]"
                  >
                    Get directions
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-0.5 block text-base font-semibold text-[#1a3a0a] hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <Clock className="size-5" />
                </span>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Hours
                  </p>
                  <ul className="mt-1.5 space-y-1 text-sm text-stone-700">
                    {HOURS.map(({ day, time }) => (
                      <li key={day} className="flex justify-between gap-4">
                        <span className="font-semibold text-[#1a3a0a]">
                          {day}
                        </span>
                        <span className="text-stone-600">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 shadow-xl shadow-[#1a3a0a]/8">
            <iframe
              title="Clinic location map"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full"
            />
            {/* Get Directions button overlay */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open directions in your maps app"
              className="group absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1a3a0a] shadow-lg shadow-[#0f2706]/25 ring-1 ring-[#1a3a0a]/10 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <MapPin className="size-4 text-[#6CBE45]" />
              <span>Get Directions</span>
              <ArrowUpRight className="size-3.5 text-[#1a3a0a] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Page shell                                  */
/* -------------------------------------------------------------------------- */

export default function Home2Client({
  latestBlogPosts,
  testimonials,
  googleMeta,
}: {
  latestBlogPosts?: BlogPost[];
  testimonials?: ReactNode;
  googleMeta?: { rating: number; reviewCount: number; reviewsUrl: string };
}) {
  const posts = latestBlogPosts?.length ? latestBlogPosts : getAllPosts();

  return (
    <>
      <HeroSlider googleMeta={googleMeta} />
      <HomeInsuranceMarquee />
      <WelcomeSection />
      <ServicesGrid />
      <ProvidersSection />
      <AnnouncementMarquee />
      <PillarsSection />
      <HRTFeatureSection />
      <JourneySection />
      {testimonials}
      <BlogSection posts={posts} />
      <CTABand />
      <LocationSection />
    </>
  );
}
