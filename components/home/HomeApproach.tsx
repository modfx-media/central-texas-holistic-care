"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronRight, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import Image from "next/image";

type Pillar = {
  icon: string;
  title: string;
  body: string;
  accent: string;
};

const PILLARS: Pillar[] = [
  {
    icon: "/images/source/icon1.png",
    title: "What Is Holistic Medicine?",
    body:
      "Holistic medicine focuses on treating the entire body, not just isolated symptoms or conditions. This whole-body approach promotes long-term health, balance, and a deeper sense of well-being.",
    accent: "from-[#6CBE45]/25 to-transparent",
  },
  {
    icon: "/images/source/icon2.png",
    title: "Supplement-Based Therapies: IV Hydration Therapy",
    body:
      "Boost your energy, immunity, and wellness with IV Hydration Therapy \u2014 a nutrient-rich infusion of vitamins, minerals, and fluids delivered straight into your bloodstream for fast absorption.",
    accent: "from-[#8BAD5A]/25 to-transparent",
  },
  {
    icon: "/images/source/icon3.png",
    title: "Comprehensive Wellness Exams",
    body:
      "Regular wellness exams are key to preventive healthcare \u2014 assessing your overall health and keeping you current on vaccinations and screenings tailored to your age, lifestyle, and goals.",
    accent: "from-[#C4A862]/25 to-transparent",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function HomeApproach() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-14 sm:py-20 lg:py-28">
      {/* Seams that bridge white (above) and cream (below) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/80 via-white/0 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[color:var(--color-cream-soft)]/90 via-[color:var(--color-cream-soft)]/0 to-transparent"
      />

      {/* Architectural grid + organic curves */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.16]"
      >
        <defs>
          <pattern
            id="approach-grid"
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
          <pattern
            id="approach-curves"
            width="180"
            height="180"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(6)"
          >
            <path
              d="M0 90 Q 45 50 90 90 T 180 90"
              fill="none"
              stroke="#6CBE45"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M0 130 Q 45 90 90 130 T 180 130"
              fill="none"
              stroke="#9DD270"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#approach-grid)" />
        <rect width="100%" height="100%" fill="url(#approach-curves)" />
      </svg>

      {/* Editorial gold hairlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-20 h-px bg-gradient-to-r from-transparent via-[#C4A862]/30 to-transparent"
      />

      {/* Decorative spotlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 size-[520px] rounded-full blur-3xl"
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
              Our Approach &middot; Three Pillars
            </p>
            <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
          </div>
          <h2
            className="mt-5 font-heading font-semibold leading-[1.05] text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Whole-Person Care,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#9DD270] via-[#C4A862] to-[#9DD270] bg-clip-text italic text-transparent">
                From Every Angle.
              </span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#C4A862]/70 to-transparent"
              />
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-stone-300 sm:text-lg">
            Three core pillars guide every plan we build at CTHC: holistic
            medicine, supplement-based therapies, and consistent preventive
            care.
          </p>
        </motion.div>

        {/* Two-column feature: doctor portrait + vertical pillar stack */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-14">
          {/* Doctor portrait column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="relative"
          >
            {/* gold corner ticks (outer) */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-2 z-10 h-8 w-8 border-l-2 border-t-2 border-[#C4A862]/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 -right-2 z-10 h-8 w-8 border-b-2 border-r-2 border-[#C4A862]/70"
            />

            <div className="relative h-full overflow-hidden rounded-[28px] border border-[#C4A862]/30 bg-gradient-to-br from-[#1a3a0a]/40 via-[#0b1d04]/20 to-[#0b1d04]/40 shadow-2xl shadow-black/40 ring-1 ring-white/5">
              {/* Decorative botanical motif in the empty bands (behind image) */}
              <svg
                aria-hidden
                viewBox="0 0 400 500"
                preserveAspectRatio="xMidYMid slice"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
              >
                <defs>
                  <pattern
                    id="approach-img-leaf"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M22 60c0-22 18-40 40-40 17 0 31 11 36 26-18 5-35 18-38 37-17-5-38-14-38-23z"
                      stroke="#C4A862"
                      strokeWidth="0.9"
                      fill="none"
                    />
                    <path
                      d="M30 60c8-7 22-15 35-17"
                      stroke="#C4A862"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="500" fill="url(#approach-img-leaf)" />
              </svg>

              {/* Soft accent glows behind empty bands */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(108,190,69,0.22), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -bottom-10 size-48 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 72%)",
                }}
              />

              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/doctor-3.png"
                  alt="Provider at Central Texas Holistic Care delivering personalized, whole-person care"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-contain object-center"
                />

                {/* warm vignette */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0b1d04]/70 via-transparent to-[#0b1d04]/15"
                />
              </div>

              {/* floating top-left badge */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-[#0b1d04]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4A862] backdrop-blur">
                <Stethoscope className="size-3.5" />
                Clinician-supervised
              </div>

              {/* floating top-right badge (balances the top-left pill) */}
              <div className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-[#C4A862]/40 bg-[#0b1d04]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C4A862] backdrop-blur sm:inline-flex">
                <Sparkles className="size-3.5" />
                Central Texas
              </div>

              {/* Mid-band stat strip (sits just above the floating bottom card) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
                className="absolute inset-x-5 bottom-[5.75rem] grid grid-cols-3 gap-2 rounded-2xl border border-[#C4A862]/25 bg-[#0b1d04]/55 px-3 py-2.5 backdrop-blur sm:bottom-24 sm:gap-3 sm:px-4 sm:py-3"
              >
                {[
                  { label: "Lab-guided" },
                  { label: "Root-cause" },
                  { label: "Personalized" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center text-center ${
                      i !== 2 ? "border-r border-[#C4A862]/20" : ""
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-[#C4A862]" />
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C4A862] sm:text-[11px]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* floating bottom card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-[#C4A862]/30 bg-white/95 px-4 py-3 shadow-lg backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862]">
                  <ShieldCheck className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
                    Whole-person care
                  </p>
                  <p className="text-sm font-semibold leading-snug text-[#1a3a0a]">
                    A plan built around your goals &amp; labs.
                  </p>
                </div>
              </motion.div>

              {/* subtle decorative ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border border-[#C4A862]/20"
              />
            </div>
          </motion.div>

          {/* Pillars column */}
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="flex flex-col gap-5"
          >
            {PILLARS.map(({ icon, title, body, accent }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.65)] ring-1 ring-[#C4A862]/10 backdrop-blur-md transition-all hover:border-[#C4A862]/40 hover:bg-white/[0.07] hover:ring-[#C4A862]/30 sm:p-7"
              >
                {/* accent glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br blur-2xl ${accent}`}
                />
                {/* gold corner ticks */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-[#C4A862]/60"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-[#C4A862]/60"
                />

                <div className="relative flex items-start gap-5">
                  {/* icon + number stack */}
                  <div className="relative flex flex-col items-center gap-2">
                    <span className="font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-[#C4A862]">
                      0{i + 1}
                    </span>
                    <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] ring-1 ring-[#6CBE45]/40 transition-transform group-hover:scale-105 sm:size-[72px]">
                      <Image
                        src={icon}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 object-contain sm:size-14"
                        aria-hidden
                      />
                    </div>
                  </div>

                  {/* copy */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading text-lg font-medium leading-tight text-white sm:text-xl">
                        {title}
                      </h3>
                      <Sparkles
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-[#C4A862]/60 transition-colors group-hover:text-[#C4A862]"
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-300/90 sm:text-[15px]">
                      {body}
                    </p>

                    {/* bottom hover label */}
                    <div
                      aria-hidden
                      className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C4A862]/0 transition-colors group-hover:text-[#C4A862]"
                    >
                      <span className="h-px w-8 bg-gradient-to-r from-transparent via-[#C4A862]/70 to-[#C4A862]" />
                      <span>Pillar 0{i + 1}</span>
                      <ChevronRight className="size-3.5" />
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
