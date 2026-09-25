"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Atom,
  BatteryLow,
  Brain,
  CalendarCheck,
  ChevronRight,
  Dumbbell,
  Flame,
  Frown,
  HeartPulse,
  type LucideIcon,
  MessageCircle,
  Moon,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Thermometer,
  TrendingUp,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Accordion from "@/components/ui/Accordion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const WP =
  "https://centraltexasholisticcarepllc.com/wp-content/uploads/2025/06";

const MEN_IMAGE = "/images/services/hormone-treatments-for-men-v2.png";
const WOMEN_IMAGE = `${WP}/Hormone-Treatments-for-Women-pexels-thirdman-7659552-scaled.webp`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

type Symptom = { icon: LucideIcon; label: string };

const MEN_SYMPTOMS: readonly Symptom[] = [
  { icon: BatteryLow, label: "Persistent fatigue and lack of motivation" },
  { icon: Moon, label: "Difficulty sleeping and recovering from exercise" },
  { icon: HeartPulse, label: "Decreased libido and sexual performance" },
  { icon: Frown, label: "Mood swings, anxiety, or mild depression" },
  { icon: Scale, label: "Weight gain and increased abdominal fat" },
  { icon: Dumbbell, label: "Loss of muscle mass and strength" },
  { icon: Activity, label: "Joint stiffness and longer injury recovery" },
];

const WOMEN_SYMPTOMS: readonly Symptom[] = [
  { icon: Thermometer, label: "Hot flashes or night sweats" },
  { icon: Waves, label: "Low libido or vaginal dryness" },
  { icon: HeartPulse, label: "Irregular or painful periods" },
  { icon: Frown, label: "Mood changes, irritability, or anxiety" },
  { icon: Scale, label: "Weight gain and fatigue" },
  { icon: Brain, label: "Difficulty sleeping or concentrating" },
];

const PILLARS = [
  {
    icon: Stethoscope,
    title: "Clinician-supervised",
    body: "Every plan is overseen by a clinician, never algorithmic, never one-size-fits-all.",
  },
  {
    icon: Atom,
    title: "Bioidentical hormones",
    body: "Molecularly identical to what your body naturally produces, for a smoother response.",
  },
  {
    icon: TrendingUp,
    title: "Lab-guided dosing",
    body: "Baseline and follow-up labs drive every adjustment, so your dose tracks your physiology.",
  },
] as const;

const FAQS = [
  {
    q: "Who is hormone replacement therapy (HRT) right for?",
    a: "HRT is for men and women whose symptoms and lab work point to a hormonal imbalance, low testosterone in men, or estrogen/progesterone shifts in women during perimenopause and menopause. We confirm with bloodwork before starting any plan.",
  },
  {
    q: "How long until I feel a difference?",
    a: "Most patients notice changes in energy, sleep, and mood within 2-4 weeks. Libido, body composition, and recovery typically respond over 8-12 weeks as levels stabilize.",
  },
  {
    q: "Will I be on hormones forever?",
    a: "Not necessarily. Some patients use HRT to navigate a transition (perimenopause, post-op, recovery) and taper off. Others find ongoing optimization meaningful. We re-test regularly and adjust together.",
  },
  {
    q: "What delivery methods do you offer?",
    a: "We tailor the route to your goals, pellets, injections, topical creams, or oral, depending on lab targets, lifestyle, and preference. Insurance coverage varies by therapy.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Hero                                       */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1d04] text-[#FAF6EE]">
      <Image
        src="/images/hormone.jpeg"
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
      {/* gold grid */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hrt-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#C4A862"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hrt-grid)" />
      </svg>

      {/* radial spotlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-40px] h-[520px] w-[520px] rounded-full bg-[#6CBE45]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-80px] top-[120px] h-[480px] w-[480px] rounded-full bg-[#C4A862]/15 blur-3xl"
      />

      {/* gold hairlines */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />

      {/* animated DNA-style helix dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full bg-[#C4A862]/60"
            style={{ left: `${10 + i * 19}%`, top: "30%" }}
            animate={{
              y: [0, 18, 0, -18, 0],
              opacity: [0.4, 0.9, 0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4.5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={`b-${i}`}
            className="absolute size-1.5 rounded-full bg-[#6CBE45]/60"
            style={{ left: `${10 + i * 19}%`, top: "70%" }}
            animate={{
              y: [0, -18, 0, 18, 0],
              opacity: [0.4, 0.9, 0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4.5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25 + 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28">
        {/* breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#C4A862]"
        >
          <Link href="/" className="hover:text-[#FAF6EE]">
            Home
          </Link>
          <ChevronRight aria-hidden className="size-3 opacity-60" />
          <span className="text-[#FAF6EE]/80">Hormone Therapy</span>
        </motion.nav>

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/30 bg-[#C4A862]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A862]"
            >
              <Sparkles className="size-3.5" />
              Bioidentical HRT
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#FAF6EE] sm:text-5xl lg:text-6xl"
            >
              Hormone{" "}
              <span className="bg-gradient-to-br from-[#C4A862] via-[#d6bd7c] to-[#9DD270] bg-clip-text italic text-transparent">
                Therapy
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#FAF6EE]/85 sm:text-lg"
            >
              Personalized, lab-guided hormone optimization for men and
              women, restoring energy, mood, sleep, libido, and the way you
              feel in your own body.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6CBE45] px-5 py-2.5 text-sm font-semibold text-[#0b1d04] shadow-lg shadow-[#6CBE45]/20 transition-all hover:bg-[#9DD270]"
              >
                <CalendarCheck className="size-4" />
                Book An Appointment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#FAF6EE] backdrop-blur transition-colors hover:bg-white/10"
              >
                <Phone className="size-4 text-[#C4A862]" />
                {PHONE_DISPLAY}
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#FAF6EE]/70"
            >
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-[#C4A862]" />
                Clinician-supervised
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Atom className="size-3.5 text-[#C4A862]" />
                Bioidentical hormones
              </li>
              <li className="inline-flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-[#C4A862]" />
                Lab-guided dosing
              </li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Intro                                      */
/* -------------------------------------------------------------------------- */

function IntroSection() {
  return (
    <section className="relative bg-white py-12 sm:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/30 bg-[#C4A862]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]"
        >
          <Atom className="size-3.5" />
          Tailored to Your Biology
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-5 text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl lg:text-5xl"
        >
          Two paths.{" "}
          <span className="italic text-[#8a6f30]">One restored you.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg"
        >
          Men and women experience hormonal change differently, but the
          result is the same: energy fades, sleep slips, and your body stops
          feeling like yours. We build a plan around your labs, your
          symptoms, and your goals.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Men Section                                    */
/* -------------------------------------------------------------------------- */

function MenSection() {
  return (
    <section
      id="men"
      className="relative isolate overflow-hidden bg-[color:var(--color-cream-soft,#faf6ec)] py-14 sm:py-20"
    >
      {/* gold dot pattern */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="men-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#men-dots)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#C4A862]/20 shadow-xl shadow-[#1a3a0a]/10">
              <Image
                src={MEN_IMAGE}
                alt="Hormone treatments for men"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[#C4A862]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#C4A862]"
              />
            </div>
            {/* floating stat badge */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-[#C4A862]/30 bg-white/95 px-5 py-4 shadow-xl shadow-[#1a3a0a]/10 backdrop-blur sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
                For Men
              </p>
              <p className="mt-1 text-lg font-semibold text-[#1a3a0a]">
                Testosterone optimization
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#1a3a0a]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a]"
            >
              <Dumbbell className="size-3.5" />
              For Men
            </motion.span>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6f30]"
            >
              Restore Vitality. Reclaim Confidence.
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-2 text-3xl font-semibold leading-[1.1] tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Hormone Treatments{" "}
              <span className="italic text-[#8a6f30]">for Men</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-stone-700 sm:text-[17px]"
            >
              Aging doesn&apos;t just affect women, men also experience
              significant hormonal changes, especially a decline in
              testosterone levels. This natural drop can lead to a wide range
              of symptoms affecting daily life.
            </motion.p>

            <motion.h3
              variants={fadeUp}
              className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[#1a3a0a]"
            >
              Common Symptoms of Low Testosterone
            </motion.h3>

            <motion.ul
              variants={stagger}
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              {MEN_SYMPTOMS.map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  className="group relative flex items-start gap-3 rounded-xl border border-stone-200/80 bg-white/80 px-4 py-3 backdrop-blur transition-all hover:border-[#C4A862]/40 hover:shadow-md hover:shadow-[#1a3a0a]/5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#1a3a0a]/5 text-[#1a3a0a] transition-colors group-hover:bg-[#1a3a0a] group-hover:text-[#C4A862]">
                    <Icon className="size-4" />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-stone-700">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-start gap-3 rounded-2xl border border-[#C4A862]/30 bg-white/70 px-5 py-4 backdrop-blur"
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[#8a6f30]" />
              <p className="text-sm italic leading-relaxed text-stone-700 sm:text-[15px]">
                If you&apos;re noticing these signs, you don&apos;t have to
                accept them as just part of aging. Our tailored hormone
                replacement therapies (HRT) for men are designed to bring
                testosterone levels back into balance, improving mood,
                energy, sexual health, and overall well-being.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <Link
                href="/men/testosterone/"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1a3a0a] px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] shadow-md transition-colors hover:bg-[#2D5016]"
              >
                Explore Testosterone Therapy
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Women Section                                    */
/* -------------------------------------------------------------------------- */

function WomenSection() {
  return (
    <section
      id="women"
      className="relative isolate overflow-hidden bg-white py-14 sm:py-20"
    >
      {/* sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-[#9DD270]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#C4A862]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#1a3a0a]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a]"
            >
              <Wind className="size-3.5" />
              For Women
            </motion.span>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6f30]"
            >
              Balance Your Hormones. Transform Your Life.
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-2 text-3xl font-semibold leading-[1.1] tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Hormone Treatments{" "}
              <span className="italic text-[#8a6f30]">for Women</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-stone-700 sm:text-[17px]"
            >
              Hormonal shifts are a natural part of a woman&apos;s life , 
              from puberty to pregnancy, perimenopause, and menopause.
              However, persistent hormone imbalances are not something you
              simply have to live with. While it&apos;s common to dismiss
              symptoms like mood swings, fatigue, or irregular cycles as
              &ldquo;just part of it,&rdquo; hormonal imbalances can
              significantly impact your physical, emotional, and mental
              well-being.
            </motion.p>

            <motion.h3
              variants={fadeUp}
              className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[#1a3a0a]"
            >
              Signs You May Have a Hormone Imbalance
            </motion.h3>

            <motion.ul
              variants={stagger}
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              {WOMEN_SYMPTOMS.map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  className="group relative flex items-start gap-3 rounded-xl border border-stone-200/80 bg-[color:var(--color-soft-green,#f0f5eb)]/50 px-4 py-3 transition-all hover:border-[#9DD270]/60 hover:bg-[color:var(--color-soft-green,#f0f5eb)] hover:shadow-md hover:shadow-[#1a3a0a]/5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#1a3a0a] shadow-sm transition-colors group-hover:bg-[#1a3a0a] group-hover:text-[#C4A862]">
                    <Icon className="size-4" />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-stone-700">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-start gap-3 rounded-2xl border border-[#C4A862]/30 bg-[color:var(--color-cream-soft,#faf6ec)] px-5 py-4"
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[#8a6f30]" />
              <p className="text-sm italic leading-relaxed text-stone-700 sm:text-[15px]">
                With personalized hormone replacement therapy (HRT), we can
                help restore hormonal harmony and support your body through
                each life stage, enhancing energy, clarity, and confidence.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <Link
                href="/women/menopausal-disorders/"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1a3a0a] px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] shadow-md transition-colors hover:bg-[#2D5016]"
              >
                Explore Menopausal Care
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#C4A862]/20 shadow-xl shadow-[#1a3a0a]/10">
              <Image
                src={WOMEN_IMAGE}
                alt="Hormone treatments for women"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[#C4A862]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#C4A862]"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-[#C4A862]/30 bg-white/95 px-5 py-4 shadow-xl shadow-[#1a3a0a]/10 backdrop-blur sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
                For Women
              </p>
              <p className="mt-1 text-lg font-semibold text-[#1a3a0a]">
                Estrogen, progesterone & more
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Approach Pillars                                 */
/* -------------------------------------------------------------------------- */

function ApproachSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[color:var(--color-cream-soft,#faf6ec)] to-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/30 bg-[#C4A862]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]"
          >
            <ShieldCheck className="size-3.5" />
            Our Approach
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
          >
            Three principles{" "}
            <span className="italic text-[#8a6f30]">every plan follows.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white px-6 py-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#C4A862]/40 hover:shadow-xl hover:shadow-[#1a3a0a]/10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#C4A862]/60"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C4A862]/60"
              />
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862]">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  FAQ                                        */
/* -------------------------------------------------------------------------- */

function FAQSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-cream-soft,#faf6ec)] py-14 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="faq-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#faq-dots)" />
      </svg>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/30 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]"
          >
            <MessageCircle className="size-3.5" />
            Common Questions
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
          >
            About{" "}
            <span className="italic text-[#8a6f30]">Hormone Therapy</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <Accordion
            items={FAQS.map((f, idx) => ({
              value: `hrt-faq-${idx}`,
              title: f.q,
              content: (
                <p className="text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                  {f.a}
                </p>
              ),
            }))}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Final CTA                                    */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b1d04] via-[#1a3a0a] to-[#0f2706] py-24 text-[#FAF6EE] sm:py-28">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cta-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#C4A862"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4A862]/10 blur-3xl"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/30 bg-[#C4A862]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A862]"
        >
          <Zap className="size-3.5" />
          Ready When You Are
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          Feel like yourself again , {" "}
          <span className="bg-gradient-to-br from-[#C4A862] via-[#d6bd7c] to-[#9DD270] bg-clip-text italic text-transparent">
            on every level.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#FAF6EE]/85 sm:text-lg"
        >
          Start with a consultation and baseline labs. We&apos;ll build a
          plan that respects your goals, your physiology, and your timeline.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#6CBE45] px-6 py-3 text-sm font-semibold text-[#0b1d04] shadow-lg shadow-[#6CBE45]/25 transition-all hover:bg-[#9DD270]"
          >
            <CalendarCheck className="size-4" />
            Book An Appointment
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-white/5 px-5 py-3 text-sm font-semibold text-[#FAF6EE] backdrop-blur transition-colors hover:bg-white/10"
          >
            <Phone className="size-4 text-[#C4A862]" />
            {PHONE_DISPLAY}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Default Export                                 */
/* -------------------------------------------------------------------------- */

export default function HormoneTherapyClient() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <MenSection />
      <WomenSection />
      <ApproachSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
