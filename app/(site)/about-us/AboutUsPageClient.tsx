"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarCheck,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const BOOKING_BIMISA =
  "https://www.tebra.com/care/provider/bimisa-augustin-dnp-msn-aprnfnp-c-1043765431?lid=2324997788/";
const BOOKING_LARISSA =
  "https://www.tebra.com/care/provider/larissa-garth-pa-c-1487096947";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function AboutUsPageClient() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <ProviderBimisa />
      <ProviderLarissa />
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
        src="/images/source/hero-medical-assistant.webp"
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
            id="about-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#about-hero-grid)" />
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
          <span className="text-white/90">About</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            Meet the Providers
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading font-semibold leading-[1.07] text-white"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.5rem)" }}
        >
          Empowering Health Through{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#9DD270] via-[#C4A862] to-[#9DD270] bg-clip-text italic text-transparent">
              Restorative &amp; Preventive Medicine
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#C4A862]/70 to-transparent"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-3xl text-[15px] leading-relaxed text-stone-200 sm:text-base"
        >
          At our practice, we specialize in regenerative, restorative, and
          preventive care, focusing on natural bioidentical hormone replacement,
          nutritional support, regenerative therapies, and evidence-based
          allopathic treatments to help restore vitality and quality of life.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-stone-300 sm:text-base"
        >
          With over 20 years of combined medical experience, our team has
          proudly served the Central Texas community, offering individualized
          care for hormonal imbalances, preventive health, and chronic
          conditions, blending functional medicine with optimal results with a
          natural and preventive philosophy.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#dr-bimisa"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <Users className="size-4" />
            Meet the Team
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#C4A862]/60 hover:bg-white/10"
          >
            <CalendarCheck className="size-4 text-[#C4A862]" />
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Stats strip                                  */
/* -------------------------------------------------------------------------- */

const STATS = [
  {
    icon: Award,
    value: "20+",
    label: "Years combined experience",
  },
  {
    icon: ShieldCheck,
    value: "2",
    label: "U.S. Army veterans on the team",
  },
  {
    icon: GraduationCap,
    value: "7+",
    label: "Advanced clinical degrees",
  },
  {
    icon: HeartPulse,
    value: "100%",
    label: "Personalized, root-cause care",
  },
] as const;

function StatsStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-[#C4A862]/20 bg-gradient-to-b from-white to-[#faf6ec] p-6 text-center"
            >
              <span
                aria-hidden
                className="absolute left-3 top-3 size-3 border-l border-t border-[#C4A862]/50"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 size-3 border-b border-r border-[#C4A862]/50"
              />
              <span className="mx-auto inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862] shadow-md shadow-[#1a3a0a]/30">
                <Icon className="size-5" />
              </span>
              <div
                className="mt-4 font-heading font-semibold text-[#0f2706]"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)" }}
              >
                {value}
              </div>
              <p className="mt-1 text-[13px] font-medium text-stone-600">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Provider, Bimisa                                */
/* -------------------------------------------------------------------------- */

function ProviderBimisa() {
  return (
    <section
      id="dr-bimisa"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#f5efd9] to-[#ece4d0] py-12 sm:py-20 lg:py-28"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.15]"
      >
        <defs>
          <pattern
            id="about-bimisa-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-bimisa-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/35 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
        >
          {/* Photo */}
          <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[#C4A862]/30 shadow-[0_40px_100px_-40px_rgba(15,39,6,0.45)]">
              <Image
                src="/images/providers/dr-bimisa-augustin.jpg"
                alt="Dr. Bimisa Augustin, DNP, FNP-C, PMHNP-BC"
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/55 via-[#0b1d04]/5 to-transparent"
              />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
                <Star className="size-3" />
                Founder &amp; Provider
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left text-white backdrop-blur">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862]">
                  <ShieldCheck className="size-3" />
                  U.S. Army Veteran
                </div>
                <p className="mt-2 text-sm leading-snug">
                  26 years of medical experience &middot; 10 years of service
                  &middot; 6 combat deployments
                </p>
              </div>
            </div>
            {/* gold corner accents */}
            <span
              aria-hidden
              className="absolute -left-3 -top-3 size-12 border-l-2 border-t-2 border-[#C4A862]/60"
            />
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 size-12 border-b-2 border-r-2 border-[#C4A862]/60"
            />
          </motion.div>

          {/* Copy */}
          <div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
            >
              <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Provider
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#0f2706]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
            >
              Dr. Bimisa Augustin,{" "}
              <span className="italic text-[#8a6f30]">
                DNP, FNP-C, PMHNP-BC
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-[#1a3a0a]/70"
            >
              Doctor of Nursing Practice | Family &amp; Psychiatric Nurse
              Practitioner
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] leading-relaxed text-stone-700"
            >
              Dr. Bimisa Augustin brings{" "}
              <span className="font-semibold text-[#1a3a0a]">
                26 years of medical experience
              </span>{" "}
              and a lifetime of dedication to patient care. Having served in
              the US Army for 10 years and 6 combat deployments, she developed
              a deep, service-driven approach to healthcare.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
                <GraduationCap className="size-4 text-[#6CBE45]" />
                Academic Achievements
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  "BSN, University of Mary Hardin-Baylor",
                  "MSN, Maryville University (Family Nurse Practitioner)",
                  "DNP, The University of Alabama",
                  "Postgraduate, Psychiatric Mental Health Nurse Practitioner",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 rounded-xl border border-[#C4A862]/20 bg-white px-3.5 py-2.5 text-[13px] text-stone-700 shadow-[0_4px_18px_-12px_rgba(15,39,6,0.25)]"
                  >
                    <BookOpenCheck className="mt-0.5 size-4 shrink-0 text-[#6CBE45]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-[15px] leading-relaxed text-stone-700"
            >
              Dr. Augustin believes in a holistic, patient-centered model of
              care. She is passionate about helping her patients achieve a
              better quality of life through integrative, hormone-based
              therapies that promote total wellness.
            </motion.p>

            <motion.figure
              variants={fadeUp}
              className="mt-7 relative overflow-hidden rounded-2xl border border-[#C4A862]/30 bg-white px-6 py-5 shadow-[0_18px_50px_-30px_rgba(15,39,6,0.25)]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#1a3a0a] via-[#6CBE45] to-[#C4A862]"
              />
              <Quote className="size-5 text-[#C4A862]" aria-hidden />
              <blockquote className="mt-2 font-heading text-base italic leading-snug text-[#0f2706] sm:text-lg">
                &ldquo;I pride myself on seeing my clients thrive, not just
                survive.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-[12px] font-medium uppercase tracking-[0.2em] text-[#8a6f30]">
               , Dr. Bimisa Augustin
              </figcaption>
            </motion.figure>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href={BOOKING_BIMISA}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a3a0a]/30 ring-1 ring-[#C4A862]/30 transition hover:shadow-xl hover:shadow-[#1a3a0a]/40"
              >
                <CalendarCheck className="size-4 text-[#C4A862]" />
                Book An Appointment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Provider, Larissa                               */
/* -------------------------------------------------------------------------- */

function ProviderLarissa() {
  return (
    <section
      id="dr-larissa"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-20 lg:py-28"
    >
      {/* sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.16), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.18), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        >
          {/* Copy first (image on right on desktop) */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Provider
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#0f2706]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
            >
              Dr. Larissa Garth,{" "}
              <span className="italic text-[#8a6f30]">
                DMSC, MPH, MPAS, PA-C
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-[#1a3a0a]/70"
            >
              Doctor of Medical Science | Certified Physician Assistant
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] leading-relaxed text-stone-700"
            >
              With more than{" "}
              <span className="font-semibold text-[#1a3a0a]">
                10 years of clinical experience
              </span>
              , Dr. Larissa Garth is a multifaceted healthcare professional
              dedicated to enhancing patient vitality through traditional
              medicine and hormone health therapy.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
                <GraduationCap className="size-4 text-[#6CBE45]" />
                Credentials
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  "Doctor of Medical Science (DMSC)",
                  "Master of Public Health (MPH)",
                  "Master of Physician Assistant Studies (MPAS)",
                  "Certified Physician Assistant (PA-C)",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 rounded-xl border border-[#C4A862]/20 bg-[#faf6ec] px-3.5 py-2.5 text-[13px] text-stone-700"
                  >
                    <BookOpenCheck className="mt-0.5 size-4 shrink-0 text-[#6CBE45]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-[15px] leading-relaxed text-stone-700"
            >
              Dr. Garth is a proud U.S. Army veteran, having served as an
              officer for over a decade. She is also a published author,
              contributing to certifiable excellence in her field. She combines
              her passion for education and personalized care to improve
              energy, focus, sleep, and overall well-being.
            </motion.p>

            <motion.figure
              variants={fadeUp}
              className="mt-7 relative overflow-hidden rounded-2xl border border-[#C4A862]/30 bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] px-6 py-5 shadow-[0_24px_60px_-30px_rgba(15,39,6,0.45)]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#C4A862] via-[#6CBE45] to-[#C4A862]"
              />
              <Quote className="size-5 text-[#C4A862]" aria-hidden />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C4A862]">
                Guided by her favorite quote from Nelson Mandela
              </p>
              <blockquote className="mt-2 font-heading text-base italic leading-snug text-white sm:text-lg">
                &ldquo;I never lose. I either win or I learn.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[13px] leading-snug text-stone-300">
                Dr. Garth inspires her patients to pursue health with
                self-compassion and teamwork.
              </figcaption>
            </motion.figure>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href={BOOKING_LARISSA}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8a6f30]/25 ring-1 ring-[#C4A862]/40 transition hover:shadow-xl"
              >
                <CalendarCheck className="size-4" />
                Book An Appointment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            variants={fadeUp}
            className="order-1 relative mx-auto w-full max-w-md lg:order-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[#C4A862]/30 shadow-[0_40px_100px_-40px_rgba(15,39,6,0.45)]">
              <Image
                src="/images/providers/dr-larissa-garth.jpg"
                alt="Dr. Larissa Garth, DMSC, MPH, MPAS, PA-C"
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/55 via-[#0b1d04]/5 to-transparent"
              />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
                <Sparkles className="size-3" />
                Published Author
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left text-white backdrop-blur">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862]">
                  <ShieldCheck className="size-3" />
                  U.S. Army Veteran
                </div>
                <p className="mt-2 text-sm leading-snug">
                  10+ years of clinical experience &middot; Officer for over a
                  decade
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="absolute -left-3 -top-3 size-12 border-l-2 border-t-2 border-[#C4A862]/60"
            />
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 size-12 border-b-2 border-r-2 border-[#C4A862]/60"
            />
          </motion.div>
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
          <Leaf className="size-3.5" />
          Ready when you are
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(1.85rem, 4.2vw, 3rem)" }}
        >
          Choose your provider and{" "}
          <span className="italic text-[#C4A862]">book your visit.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-stone-300"
        >
          One conversation. Honest answers. A plan built around your labs, your
          story, and your goals.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 grid gap-3 sm:grid-cols-2"
        >
          <a
            href={BOOKING_BIMISA}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-5 text-white backdrop-blur transition hover:border-[#C4A862]/50 hover:bg-white/[0.08]"
          >
            <Stethoscope className="size-5 text-[#C4A862]" />
            <span className="mt-1 font-heading text-base font-semibold">
              Book with Dr. Augustin
            </span>
            <span className="text-[12px] text-stone-300">
              DNP, FNP-C, PMHNP-BC
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#C4A862]">
              Open booking
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href={BOOKING_LARISSA}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-5 text-white backdrop-blur transition hover:border-[#C4A862]/50 hover:bg-white/[0.08]"
          >
            <Stethoscope className="size-5 text-[#C4A862]" />
            <span className="mt-1 font-heading text-base font-semibold">
              Book with Dr. Garth
            </span>
            <span className="text-[12px] text-stone-300">
              DMSC, MPH, MPAS, PA-C
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#C4A862]">
              Open booking
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-7 inline-flex items-center gap-2 text-[12px] text-white/70"
        >
          <span>Prefer to talk first?</span>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-semibold text-[#C4A862] transition-colors hover:text-[#9DD270]"
          >
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
