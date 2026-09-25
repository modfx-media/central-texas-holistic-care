"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  Droplets,
  Dumbbell,
  FlaskConical,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Stethoscope,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const WP_BASE =
  "https://centraltexasholisticcarepllc.com/wp-content/uploads/2025/06";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

type DripService = {
  number: string;
  title: string;
  h2: string;
  tagline?: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
  icon: LucideIcon;
  highlights: readonly string[];
};

const SERVICES: readonly DripService[] = [
  {
    number: "01",
    title: "Immune Booster",
    h2: "Immune Booster IV Therapy: Strengthen Your Body's Defense",
    body: "Give your immune system the powerful support it needs with our Immune Booster IV Therapy, a targeted blend of vitamins, antioxidants, and hydration designed to help your body fight off illness, recover faster, and feel revitalized.",
    href: "/iv-nutrition/immune-booster/",
    image: {
      src: `${WP_BASE}/Immune-Booster-IV-Therapy-Strengthen-Your-Bodys-Defense-pexels-jonathanborba-3076513-scaled.webp`,
      alt: "Immune Booster IV Therapy",
    },
    icon: ShieldCheck,
    highlights: ["Vitamin C + Zinc", "Glutathione", "Pre-travel & flu season"],
  },
  {
    number: "02",
    title: "Workout Recovery",
    h2: "Workout Recovery IV Therapy",
    tagline: "Recharge. Rebuild. Refuel.",
    body: "Push past your limits and bounce back with strength using our Workout Recovery IV Therapy, a scientifically formulated blend of fluids, vitamins, and amino acids designed to accelerate muscle repair, reduce inflammation, and restore peak energy post-exercise.",
    href: "/iv-nutrition/workout-recovery/",
    image: {
      src: "/images/iv/workout-recovery.webp",
      alt: "Workout Recovery IV Therapy",
    },
    icon: Dumbbell,
    highlights: ["Amino acids + Taurine", "High-dose Magnesium", "Post-training recovery"],
  },
  {
    number: "03",
    title: "Myer's Cocktail",
    h2: "Myer's Cocktail IV Therapy",
    tagline: "The Ultimate Wellness Infusion for Energy, Immunity & Relief",
    body: "The Myer's Cocktail is a time-tested IV therapy blend designed to deliver immediate full-body hydration, increase energy, and alleviate chronic symptoms. Whether you're battling stress, fatigue, migraines, or immune challenges, this powerful infusion helps you feel recharged and restored from the inside out.",
    href: "/iv-nutrition/myers-cocktail/",
    image: {
      src: "/images/services/myers-cocktail-iv-therapy-v3.png",
      alt: "Myer's Cocktail IV therapy at Central Texas Holistic Care",
    },
    icon: Sparkles,
    highlights: ["Magnesium + B-complex", "Energy & clarity", "Time-tested blend"],
  },
  {
    number: "04",
    title: "Cold & Flu",
    h2: "Cold & Flu IV Therapy",
    tagline: "Fight Off Symptoms Fast. Rehydrate. Recover.",
    body: "Don't let cold or flu symptoms slow you down. Our Cold & Flu IV Therapy delivers targeted nutrients and hydration directly into your bloodstream to help you recover faster, reduce symptoms, and strengthen your immune system when you need it most.",
    href: "/iv-nutrition/cold-and-flu/",
    image: {
      src: `${WP_BASE}/Cold-Flu-main-pexels-olly-3801394-scaled.webp`,
      alt: "Cold & Flu IV Therapy",
    },
    icon: Snowflake,
    highlights: ["High-dose Vitamin C", "Anti-inflammatory relief", "Shortens illness"],
  },
  {
    number: "05",
    title: "Hangover",
    h2: "Hangover IV Therapy",
    tagline: "Hydrate. Detox. Bounce Back Fast.",
    body: "Don't let a night of fun turn into a day of regret. Our Hangover IV Therapy is designed to rapidly rehydrate, flush out toxins, relieve nausea, and restore energy, so you can get back on your feet faster and feel like yourself again.",
    href: "/iv-nutrition/hangover/",
    image: {
      src: "/images/iv/hangover-iv-therapy.webp",
      alt: "Hangover IV Therapy",
    },
    icon: Sunrise,
    highlights: ["Electrolytes + Glutathione", "Anti-nausea support", "Same-day relief"],
  },
];

export default function IVNutritionPageClient() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesGrid />
      <FinalCTA />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Hero                                      */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b1d04] py-14 sm:py-20 lg:py-28">
      <Image
        src="/images/source/iv-infusion-therapy.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#0f2706]/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f2706]/80 via-[#0f2706]/20 to-[#0f2706]/40"
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.10]"
      >
        <defs>
          <pattern
            id="iv-landing-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M56 0 L0 0 0 56"
              fill="none"
              stroke="#C4A862"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iv-landing-grid)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/30 to-transparent"
      />

      {/* Drip motif: vertical streams */}
      {[16, 32, 50, 68, 84].map((leftPct, i) => (
        <motion.span
          key={leftPct}
          aria-hidden
          className="pointer-events-none absolute top-0 hidden h-40 w-px bg-gradient-to-b from-transparent via-[#9DD270]/40 to-transparent md:block"
          style={{ left: `${leftPct}%` }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.25, 0.7, 0.25] }}
          transition={{
            duration: 3 + (i % 3) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.nav
          variants={fadeUp}
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-2 text-[12px] text-white/65"
        >
          <Link href="/" className="transition-colors hover:text-[#C4A862]">
            Home
          </Link>
          <ChevronRight aria-hidden className="size-3.5 text-white/30" />
          <span className="text-white/90">IV Infusion</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            IV Infusion Therapy
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-[#9DD270] to-[#C4A862] bg-clip-text text-transparent">
              IV Nutrition
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#C4A862]/70 to-transparent"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-stone-200 sm:text-base"
        >
          Physician-supervised IV infusions for immunity, recovery, energy,
          and resilience, delivered in a calm, private setting in Harker
          Heights.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <CalendarCheck className="size-4" />
            Book An Appointment
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#C4A862]/60 hover:bg-white/10"
          >
            <Phone className="size-4 text-[#C4A862]" />
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/70"
        >
          {[
            { Icon: ShieldCheck, label: "Physician-supervised" },
            { Icon: Droplets, label: "Sterile, single-use" },
            { Icon: Stethoscope, label: "Brief health screening" },
          ].map(({ Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5 text-[#9DD270]" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Intro / approach                               */
/* -------------------------------------------------------------------------- */

function IntroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#f0f5eb] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a3a0a]"
          >
            <FlaskConical className="size-3.5 text-[#6CBE45]" />
            Five Signature Drips
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)" }}
          >
            Targeted nutrition,{" "}
            <span className="italic text-[#8a6f30]">delivered straight in.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-stone-700"
          >
            Each drip is a specific formulation of fluids, vitamins, minerals,
            and amino acids, chosen for a clear outcome. Browse the menu
            below and pick the one that fits the moment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Services grid                                  */
/* -------------------------------------------------------------------------- */

function ServicesGrid() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#F0EBE0] to-[#ece4d0] py-12 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.10]"
      >
        <defs>
          <pattern
            id="iv-grid-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#8a6f30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iv-grid-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]"
          >
            The IV Menu
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.35rem)" }}
          >
            Choose your drip
          </motion.h2>
        </motion.div>

        <div className="space-y-12">
          {SERVICES.map((s, idx) => (
            <ServiceCard key={s.href} service={s} reverse={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  reverse,
}: {
  service: DripService;
  reverse: boolean;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative grid grid-cols-1 gap-8 rounded-3xl border border-[#C4A862]/25 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,39,6,0.45)] backdrop-blur lg:grid-cols-12 lg:gap-12 lg:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 size-4 border-l-2 border-t-2 border-[#C4A862]/55"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-[#C4A862]/55"
      />

      <motion.div
        variants={fadeUp}
        className={`relative lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#C4A862]/25 shadow-[0_24px_60px_-32px_rgba(15,39,6,0.4)]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 40rem, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/55 via-transparent to-transparent"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
            <Icon className="size-3.5" />
            {service.title}
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`relative flex flex-col justify-center lg:col-span-7 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 shadow-lg shadow-[#1a3a0a]/30">
            <span className="font-heading text-lg font-bold tracking-wider">
              {service.number}
            </span>
          </span>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
              Drip {service.number}
            </p>
            <h3
              className="mt-0.5 font-heading font-semibold leading-tight text-[#0f2706]"
              style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)" }}
            >
              {service.h2}
            </h3>
          </div>
        </div>

        {service.tagline && (
          <p className="mt-4 font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
            {service.tagline}
          </p>
        )}

        <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
          {service.body}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <li
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/30 bg-[#faf6ec] px-3 py-1.5 text-[11.5px] font-medium text-[#1a3a0a]"
            >
              <Sparkles className="size-3 text-[#6CBE45]" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={service.href}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#1a3a0a]/30 ring-1 ring-[#C4A862]/30 transition hover:shadow-lg hover:shadow-[#1a3a0a]/40"
          >
            Learn More
            <ArrowRight className="size-4 text-[#C4A862] transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30]"
          >
            Book this drip
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Final CTA                                   */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 72%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C4A862] backdrop-blur"
        >
          <CalendarCheck className="size-3.5" />
          Ready when you are
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(1.85rem, 4.2vw, 3rem)" }}
        >
          One infusion can change{" "}
          <span className="italic text-[#C4A862]">how the day feels.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-stone-300"
        >
          Book a drip and we&apos;ll match the formula to what your body
          actually needs.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <CalendarCheck className="size-4" />
            Book An Appointment
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#C4A862]/60 hover:bg-white/10"
          >
            <Phone className="size-4 text-[#C4A862]" />
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
