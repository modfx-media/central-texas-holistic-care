"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  Droplets,
  Flame,
  HeartPulse,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

type Service = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
  icon: typeof Stethoscope;
  highlights: readonly string[];
};

const SERVICES: readonly Service[] = [
  {
    eyebrow: "Testosterone Therapy",
    title: "Testosterone Therapy: Restore Vitality & Confidence",
    body: "Low testosterone levels can significantly impact your physical health, emotional well-being, and quality of life. Testosterone Replacement Therapy (TRT) is a safe and effective solution for men experiencing symptoms of hormonal decline.",
    href: "/men/testosterone/",
    image: {
      src: "/images/services/testosterone-therapy.webp",
      alt: "Testosterone therapy for men at Central Texas Holistic Care",
    },
    icon: TrendingUp,
    highlights: [
      "Lab-guided TRT",
      "Physician-supervised dosing",
      "Energy, focus & libido",
    ],
  },
  {
    eyebrow: "Annual Wellness Exams",
    title: "Annual Wellness Exams: Your First Line of Defense",
    body: "Preventive care starts with a thorough annual wellness exam. These check-ups are designed to monitor your overall health, detect potential issues early, and keep your vaccinations up to date, ensuring you stay ahead of illness and disease.",
    href: "/men/wellness-exams/",
    image: {
      src: "/images/services/annual-wellness-exams.webp",
      alt: "Annual wellness exams for men at Central Texas Holistic Care",
    },
    icon: Microscope,
    highlights: [
      "Comprehensive screening",
      "Lab review & vaccinations",
      "Personalized prevention plan",
    ],
  },
];

type MoreService = {
  title: string;
  description: string;
  href: string;
  icon: typeof Stethoscope;
};

const MORE_SERVICES: readonly MoreService[] = [
  {
    title: "Hormone Therapy",
    description: "Bioidentical hormones, pellets & BHRT.",
    href: "/hormone-therapy/",
    icon: Activity,
  },
  {
    title: "IV Nutrition",
    description: "Hydration, recovery & immune infusions.",
    href: "/iv-nutrition/",
    icon: Droplets,
  },
  {
    title: "Medical Weight Loss",
    description: "Peptide-guided, physician-supervised plans.",
    href: "/#services",
    icon: Flame,
  },
  {
    title: "Acute Care",
    description: "Same-day visits for everyday illness.",
    href: "/#services",
    icon: Zap,
  },
];

export default function MenPageClient() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
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
        src="/images/source/portrait-men-health.jpg"
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
            id="men-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#men-hero-grid)" />
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
          <span className="text-white/90">Men</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            Men&apos;s Health
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
              Men
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
          Strength, energy, performance, and longevity, supported with
          evidence-based, provider-led care designed around your labs and your
          life.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#services"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <Stethoscope className="size-4" />
            Explore Services
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
            { icon: HeartPulse, label: "Root-cause care" },
            { icon: Sparkles, label: "Same-day visits" },
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
/*                                 Services                                    */
/* -------------------------------------------------------------------------- */

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-20"
    >
      {/* sage + gold ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.14), transparent 70%)",
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1a3a0a]/15 bg-[#f0f5eb] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a3a0a]">
            <Stethoscope className="size-3.5 text-[#6CBE45]" />
            Services for Men
          </div>
          <h2
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
          >
            Two focused programs to keep you{" "}
            <span className="italic text-[#8a6f30]">at your best.</span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.href} service={service} index={idx} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-end justify-between gap-6 border-b border-[#C4A862]/25 pb-4"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
                Also for Men
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold text-[#0f2706] sm:text-3xl">
                Complementary care &amp; therapies
              </h3>
            </div>
            <span
              aria-hidden
              className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent sm:block"
            />
          </motion.div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_SERVICES.map((item) => (
              <MoreServiceCard key={item.title} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MoreServiceCard({ item }: { item: MoreService }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp} className="group relative h-full">
      <Link
        href={item.href}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#C4A862]/25 bg-gradient-to-b from-white to-[#faf6ec] p-6 shadow-[0_12px_40px_-28px_rgba(15,39,6,0.4)] transition-all hover:-translate-y-1 hover:border-[#C4A862]/55 hover:shadow-[0_20px_60px_-30px_rgba(15,39,6,0.5)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 border-l border-t border-[#C4A862]/55"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2.5 right-2.5 size-3.5 border-b border-r border-[#C4A862]/55"
        />

        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 shadow-md shadow-[#0f2706]/20">
          <Icon className="size-5" />
        </span>

        <h4 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#0f2706]">
          {item.title}
        </h4>
        <p className="mt-2 text-[13.5px] leading-relaxed text-stone-600">
          {item.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors group-hover:text-[#8a6f30]">
          Learn more
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl border border-[#C4A862]/25 bg-gradient-to-b from-white to-[#faf6ec] shadow-[0_24px_70px_-40px_rgba(15,39,6,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_36px_90px_-40px_rgba(15,39,6,0.5)]"
    >
      {/* gold corner ticks */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-10 size-4 border-l border-t border-[#C4A862]/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 size-4 border-b border-r border-[#C4A862]/60"
      />

      {/* image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 36rem, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority={index === 0}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/65 via-[#0b1d04]/10 to-transparent"
        />
        {/* eyebrow pill on image */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
          <Icon className="size-3.5" />
          {service.eyebrow}
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#9DD270]" />
            CTHC Program
          </span>
        </div>
      </div>

      {/* body */}
      <div className="relative px-6 py-7 sm:px-8 sm:py-8">
        <h3
          className="font-heading font-semibold leading-[1.15] text-[#0f2706]"
          style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)" }}
        >
          {service.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
          {service.body}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <li
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/30 bg-white px-3 py-1 text-[11px] font-medium text-[#1a3a0a]"
            >
              <span className="size-1 rounded-full bg-[#6CBE45]" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center justify-between gap-4">
          <Link
            href={service.href}
            className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1a3a0a]/30 ring-1 ring-[#C4A862]/30 transition hover:shadow-lg hover:shadow-[#1a3a0a]/40"
          >
            Read More
            <ArrowRight className="size-4 text-[#C4A862] transition-transform group-hover/cta:translate-x-1" />
          </Link>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-[#C4A862]/40 to-transparent"
          />
        </div>
      </div>
    </motion.article>
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
          <CalendarCheck className="size-3.5" />
          Ready when you are
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(1.85rem, 4.2vw, 3rem)" }}
        >
          Book your men&apos;s health{" "}
          <span className="italic text-[#C4A862]">consult.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-stone-300"
        >
          Honest answers, a clear plan, and care built around your labs and
          your goals.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="https://www.tebra.com/care/practice/central-texas-holistic-care-163683"
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
