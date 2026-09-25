"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Droplets,
  Heart,
  HeartPulse,
  Microscope,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  TestTube,
  TrendingUp,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const IMAGE_URL = "/images/services/annual-wellness-exams.webp";
const IMAGE_ALT =
  "Annual wellness exams for men at Central Texas Holistic Care";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

type Item = { label: string; detail: string; icon: typeof Stethoscope };

const VACCINES: readonly Item[] = [
  {
    label: "Seasonal flu shot",
    detail: "Protect against annual strains of influenza",
    icon: Syringe,
  },
  {
    label: "Updated COVID-19 vaccine",
    detail: "Boost immunity with the latest protection",
    icon: Shield,
  },
  {
    label: "RSV vaccine",
    detail: "Recommended for adults age 60 and older",
    icon: Wind,
  },
  {
    label: "Shingles vaccine",
    detail: "For adults age 50 and above",
    icon: ShieldCheck,
  },
  {
    label: "Tetanus shot",
    detail: "Every 10 years for continued protection",
    icon: Activity,
  },
  {
    label: "Pneumococcal vaccine",
    detail: "For adults 65+ or smokers to prevent pneumonia",
    icon: Droplets,
  },
];

const SCREENINGS: readonly { label: string; icon: typeof Stethoscope }[] = [
  { label: "Heart disease", icon: Heart },
  { label: "Diabetes", icon: TestTube },
  { label: "Colon cancer", icon: Microscope },
  { label: "Prostate cancer", icon: Stethoscope },
  { label: "Low testosterone levels", icon: TrendingUp },
];

export default function WellnessExamsPageClient() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <VaccinesSection />
      <ScreeningsSection />
      <ClosingCalloutSection />
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
        src="/images/source/mens-health-optimization.jpeg"
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
            id="wellness-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#wellness-hero-grid)" />
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
          <Link href="/men/" className="transition-colors hover:text-[#C4A862]">
            Men
          </Link>
          <ChevronRight aria-hidden className="size-3.5 text-white/30" />
          <span className="text-white/90">Wellness Exams</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            Wellness Exams
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-[#9DD270] to-[#C4A862] bg-clip-text text-transparent">
              Wellness Exams
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
          Preventive care that&apos;s thorough, personal, and built to keep you
          ahead of disease, not chasing it.
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
            { icon: ShieldCheck, label: "Provider-led" },
            { icon: ClipboardList, label: "Comprehensive screening" },
            { icon: Sparkles, label: "Personalized prevention plan" },
          ].map(({ icon: Icon, label }) => (
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
/*                                 Overview                                    */
/* -------------------------------------------------------------------------- */

function OverviewSection() {
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
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.16), transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative lg:col-span-6"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[#C4A862]/25 shadow-[0_30px_80px_-40px_rgba(15,39,6,0.45)]">
            <Image
              src={IMAGE_URL}
              alt={IMAGE_ALT}
              fill
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/55 via-transparent to-transparent"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
              <Stethoscope className="size-3.5" />
              Preventive Care
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#9DD270]" />
                Whole-person evaluation
              </span>
            </div>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-3 size-12 border-l-2 border-t-2 border-[#C4A862]/60"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -right-3 size-12 border-b-2 border-r-2 border-[#C4A862]/60"
          />
        </motion.div>

        {/* copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative lg:col-span-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#f0f5eb] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a3a0a]"
          >
            <ShieldCheck className="size-3.5 text-[#6CBE45]" />
            Overview
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
          >
            Wellness Exams
          </motion.h2>

          <motion.h3
            variants={fadeUp}
            className="mt-3 font-heading text-xl font-medium leading-snug text-[#1a3a0a] sm:text-2xl"
          >
            Annual Wellness Exams:{" "}
            <span className="italic text-[#8a6f30]">
              Your First Line of Defense
            </span>
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[15.5px] leading-relaxed text-stone-700"
          >
            Preventive care starts with a thorough annual wellness exam. These
            check-ups are designed to monitor your overall health, detect early
            signs of disease, and help you make informed decisions about your
            well-being.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 grid gap-3 sm:grid-cols-3"
          >
            {[
              { icon: ClipboardList, label: "Full intake & history" },
              { icon: TestTube, label: "Lab review" },
              { icon: Syringe, label: "Vaccinations" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-[#C4A862]/25 bg-[#faf6ec]/70 px-3 py-2.5 text-[12.5px] font-medium text-[#1a3a0a]"
              >
                <Icon className="size-4 text-[#6CBE45]" />
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#1a3a0a]/30 ring-1 ring-[#C4A862]/30 transition hover:shadow-lg hover:shadow-[#1a3a0a]/40"
            >
              <CalendarCheck className="size-4" />
              Book An Appointment
              <ArrowRight className="size-4 text-[#C4A862] transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/men/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30]"
            >
              All Men&apos;s Services
              <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Vaccines                                    */
/* -------------------------------------------------------------------------- */

function VaccinesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#F0EBE0] to-[#ece4d0] py-12 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.12]"
      >
        <defs>
          <pattern
            id="wellness-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#8a6f30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wellness-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#8a6f30]/25 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30] backdrop-blur"
          >
            <Syringe className="size-3.5" />
            Stay Protected
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.35rem)" }}
          >
            Recommended Vaccinations During Your{" "}
            <span className="italic text-[#8a6f30]">Wellness Visit</span> May
            Include:
          </motion.h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VACCINES.map(({ label, detail, icon: Icon }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="group relative flex h-full flex-col rounded-2xl border border-[#C4A862]/25 bg-white/90 p-6 shadow-[0_12px_36px_-26px_rgba(15,39,6,0.35)] backdrop-blur transition-all hover:-translate-y-1 hover:border-[#C4A862]/55 hover:shadow-[0_22px_60px_-32px_rgba(15,39,6,0.45)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l border-t border-[#C4A862]/55"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 border-b border-r border-[#C4A862]/55"
              />
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 transition-transform group-hover:scale-[1.04]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-[#0f2706]">
                {label}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-stone-600">
                {detail}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Screenings                                   */
/* -------------------------------------------------------------------------- */

function ScreeningsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.14), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#f0f5eb] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a3a0a]"
          >
            <Microscope className="size-3.5 text-[#6CBE45]" />
            Catch It Early
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
          >
            Your Annual Exam May Also{" "}
            <span className="italic text-[#8a6f30]">Screen For:</span>
          </motion.h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {SCREENINGS.map(({ label, icon: Icon }, idx) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="group relative flex flex-col items-center rounded-2xl border border-[#C4A862]/25 bg-gradient-to-b from-white to-[#faf6ec] p-6 text-center shadow-[0_14px_40px_-28px_rgba(15,39,6,0.35)] transition-all hover:-translate-y-1 hover:border-[#C4A862]/55 hover:shadow-[0_22px_60px_-30px_rgba(15,39,6,0.45)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l border-t border-[#C4A862]/55"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 border-b border-r border-[#C4A862]/55"
              />
              <span className="font-heading text-2xl text-[#C4A862]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 shadow-md shadow-[#0f2706]/20 transition-transform group-hover:scale-[1.05]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-[#0f2706]">
                {label}
              </h3>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Closing Callout                                */
/* -------------------------------------------------------------------------- */

function ClosingCalloutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ece4d0] via-[#F0EBE0] to-[#faf6ec] py-16 sm:py-20">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="relative overflow-hidden rounded-3xl border border-[#C4A862]/30 bg-white p-8 shadow-[0_24px_70px_-40px_rgba(15,39,6,0.45)] sm:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-2 size-14 border-l-2 border-t-2 border-[#C4A862]/55"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -right-2 size-14 border-b-2 border-r-2 border-[#C4A862]/55"
          />
          <motion.div
            variants={fadeUp}
            className="flex items-start gap-5 sm:items-center"
          >
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 shadow-md shadow-[#0f2706]/30">
              <HeartPulse className="size-6" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
                Our Commitment
              </p>
              <p className="mt-2 font-heading text-lg leading-snug text-[#0f2706] sm:text-xl">
                At{" "}
                <strong className="font-semibold">
                  Central Texas Holistic Care
                </strong>
                , our goal is to empower you with knowledge and preventive care
                that protects your{" "}
                <span className="italic text-[#8a6f30]">
                  long-term health.
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
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
          Schedule yours today
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(1.85rem, 4.2vw, 3rem)" }}
        >
          Stay ahead of{" "}
          <span className="italic text-[#C4A862]">illness &amp; disease.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-stone-300"
        >
          Book your annual wellness exam and walk out with a clear, personalized
          prevention plan.
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
