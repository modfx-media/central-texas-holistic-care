"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Atom,
  Battery,
  Beaker,
  CalendarCheck,
  ChevronRight,
  Coffee,
  Dumbbell,
  Droplets,
  FlaskConical,
  Flame,
  HeartPulse,
  Leaf,
  type LucideIcon,
  MessageCircle,
  Pill,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Sunrise,
  TrendingUp,
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const ICONS = {
  droplets: Droplets,
  battery: Battery,
  zap: Zap,
  sun: Sun,
  shieldCheck: ShieldCheck,
  atom: Atom,
  dumbbell: Dumbbell,
  flame: Flame,
  pill: Pill,
  beaker: Beaker,
  flask: FlaskConical,
  sparkles: Sparkles,
  activity: Activity,
  heartPulse: HeartPulse,
  trendingUp: TrendingUp,
  snowflake: Snowflake,
  sunrise: Sunrise,
  coffee: Coffee,
  leaf: Leaf,
  messageCircle: MessageCircle,
} as const satisfies Record<string, LucideIcon>;

export type IVIconKey = keyof typeof ICONS;

export type IVIngredient = {
  /** Ingredient name (e.g. "IV Fluids") */
  name: string;
  /** Short benefit description */
  detail: string;
  iconKey: IVIconKey;
};

export type IVBenefit = {
  iconKey: IVIconKey;
  title: string;
  body?: string;
};

export type IVFAQ = { q: string; a: string };

export type IVRelated = {
  title: string;
  href: string;
  blurb: string;
  iconKey: IVIconKey;
};

export type IVSubpageProps = {
  /** Hero H1 (e.g. "Immune Booster") */
  h1: string;
  /** Breadcrumb label for the current page */
  breadcrumbLabel: string;
  /** Hero eyebrow */
  eyebrow: string;
  /** Hero subtitle */
  heroSubtitle: string;
  /** Overview H2 (full title) */
  h2: string;
  /** Optional gold italic accent substring inside h2 */
  h2Accent?: string;
  /** Optional gold tagline rendered above h2 (e.g. "Recharge. Rebuild. Refuel.") */
  tagline?: string;
  /** Overview body paragraph */
  body: string;
  /** Optional closing italic line shown in Overview */
  closingNote?: string;
  /** Overview/Hero icon key */
  iconKey: IVIconKey;
  /** Three trust ticks for hero */
  trust: readonly { iconKey: IVIconKey; label: string }[];
  /** Highlight chips for overview */
  highlights: readonly string[];
  /** Overview image */
  image: { src: string; alt: string };
  /** Ingredients section ("What's Inside the …Drip?") */
  ingredients?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    items: readonly IVIngredient[];
  };
  /** "Key Benefits" pillar grid */
  benefits?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    items: readonly IVBenefit[];
  };
  /** FAQs */
  faqs?: readonly IVFAQ[];
  /** Related IV services */
  related?: readonly IVRelated[];
  /** Final-CTA heading */
  ctaHeading: { lead: string; accent: string; trail?: string };
  /** Final-CTA subline */
  ctaSubline: string;
};

export default function IVSubpageClient(props: IVSubpageProps) {
  return (
    <>
      <HeroSection {...props} />
      <OverviewSection {...props} />
      {props.ingredients && props.ingredients.items.length > 0 && (
        <IngredientsSection {...props.ingredients} h1={props.h1} />
      )}
      {props.benefits && props.benefits.items.length > 0 && (
        <BenefitsSection {...props.benefits} h1={props.h1} />
      )}
      {props.faqs && props.faqs.length > 0 && (
        <FAQSection faqs={props.faqs} h1={props.h1} />
      )}
      {props.related && props.related.length > 0 && (
        <RelatedSection related={props.related} />
      )}
      <FinalCTA {...props} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Hero                                      */
/* -------------------------------------------------------------------------- */

function HeroSection({
  h1,
  breadcrumbLabel,
  eyebrow,
  heroSubtitle,
  trust,
  image,
}: IVSubpageProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b1d04] py-14 sm:py-20 lg:py-28">
      <Image
        src={image.src}
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
            id="iv-sub-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#iv-sub-hero-grid)" />
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

      {/* falling-drip motif */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[14%] top-0 hidden h-32 w-px bg-gradient-to-b from-transparent via-[#9DD270]/40 to-[#6CBE45]/0 md:block"
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[16%] top-0 hidden h-40 w-px bg-gradient-to-b from-transparent via-[#C4A862]/45 to-[#C4A862]/0 md:block"
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.35, 0.8, 0.35] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
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
          <Link
            href="/iv-nutrition/"
            className="transition-colors hover:text-[#C4A862]"
          >
            IV Infusion
          </Link>
          <ChevronRight aria-hidden className="size-3.5 text-white/30" />
          <span className="text-white/90">{breadcrumbLabel}</span>
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            {eyebrow}
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
        >
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-[#9DD270] to-[#C4A862] bg-clip-text text-transparent">
              {h1}
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
          {heroSubtitle}
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
          {trust.map(({ iconKey, label }) => {
            const Icon = ICONS[iconKey];
            return (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5 text-[#9DD270]" />
                {label}
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Overview                                    */
/* -------------------------------------------------------------------------- */

function OverviewSection({
  h2,
  h2Accent,
  tagline,
  body,
  closingNote,
  image,
  highlights,
  iconKey,
  eyebrow,
}: IVSubpageProps) {
  const Icon = ICONS[iconKey];
  const [h2Lead, h2Trail] =
    h2Accent && h2.includes(h2Accent)
      ? [h2.replace(h2Accent, "").trimEnd(), h2Accent]
      : [h2, ""];

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
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative lg:col-span-6"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#C4A862]/25 shadow-[0_30px_80px_-40px_rgba(15,39,6,0.45)] sm:aspect-[5/6]">
            <Image
              src={image.src}
              alt={image.alt}
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
              <Icon className="size-3.5" />
              {eyebrow}
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
                <span className="size-1.5 rounded-full bg-[#9DD270]" />
                Clinician-supervised IV
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
            <Icon className="size-3.5 text-[#6CBE45]" />
            Overview
          </motion.div>

          {tagline && (
            <motion.p
              variants={fadeUp}
              className="mt-5 font-heading text-[15px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]"
            >
              {tagline}
            </motion.p>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-3 font-heading font-semibold leading-[1.15] text-[#0f2706]"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.15rem)" }}
          >
            {h2Lead}
            {h2Trail && (
              <>
                {" "}
                <span className="italic text-[#8a6f30]">{h2Trail}</span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[15.5px] leading-relaxed text-stone-700"
          >
            {body}
          </motion.p>

          {closingNote && (
            <motion.div
              variants={fadeUp}
              className="mt-6 rounded-2xl border border-[#C4A862]/30 bg-gradient-to-br from-[#faf6ec] to-white p-5 shadow-[0_14px_40px_-30px_rgba(15,39,6,0.3)]"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40">
                  <Sparkles className="size-4" />
                </span>
                <p className="pt-1 text-[14px] italic leading-relaxed text-[#1a3a0a]">
                  {closingNote}
                </p>
              </div>
            </motion.div>
          )}

          <motion.ul
            variants={fadeUp}
            className="mt-7 grid gap-3 sm:grid-cols-3"
          >
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 rounded-xl border border-[#C4A862]/25 bg-[#faf6ec]/70 px-3 py-2.5 text-[12.5px] font-medium text-[#1a3a0a]"
              >
                <Sparkles className="size-4 text-[#6CBE45]" />
                {h}
              </li>
            ))}
          </motion.ul>

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
              href="/iv-nutrition/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30]"
            >
              All IV Services
              <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Ingredients                                   */
/* -------------------------------------------------------------------------- */

function IngredientsSection({
  eyebrow = "What's Inside",
  title,
  titleAccent,
  items,
  h1,
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  items: readonly IVIngredient[];
  h1: string;
}) {
  const fullTitle = title ?? `What's Inside the ${h1} Drip?`;
  const accent = titleAccent ?? `${h1} Drip?`;
  const [titleLead, titleTrail] =
    accent && fullTitle.includes(accent)
      ? [fullTitle.replace(accent, "").trimEnd(), accent]
      : [fullTitle, ""];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#F0EBE0] to-[#ece4d0] py-12 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.12]"
      >
        <defs>
          <pattern
            id="iv-ingredients-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#8a6f30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iv-ingredients-dots)" />
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
            <FlaskConical className="size-3.5" />
            {eyebrow}
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.15] text-[#0f2706]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
          >
            {titleLead}
            {titleTrail && (
              <>
                {" "}
                <span className="italic text-[#8a6f30]">{titleTrail}</span>
              </>
            )}
          </motion.h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => {
            const Icon = ICONS[item.iconKey];
            const num = String(idx + 1).padStart(2, "0");
            return (
              <motion.li
                key={item.name}
                variants={fadeUp}
                className="group relative flex items-start gap-4 rounded-2xl border border-[#C4A862]/25 bg-white/90 p-5 shadow-[0_12px_36px_-26px_rgba(15,39,6,0.35)] backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[#C4A862]/55 hover:shadow-[0_20px_60px_-32px_rgba(15,39,6,0.45)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-2 top-2 size-3 border-l border-t border-[#C4A862]/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2 right-2 size-3 border-b border-r border-[#C4A862]/50"
                />
                <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 transition-transform group-hover:scale-[1.04]">
                  <Icon className="size-5" />
                  <span className="absolute -right-1.5 -top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-[#C4A862] text-[9px] font-bold text-[#0f2706] ring-2 ring-white">
                    {num}
                  </span>
                </span>
                <div className="pt-0.5">
                  <p className="font-heading text-[15px] font-semibold text-[#0f2706]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-stone-600">
                    {item.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Benefits                                    */
/* -------------------------------------------------------------------------- */

function BenefitsSection({
  eyebrow = "Key Benefits",
  title,
  titleAccent,
  items,
  h1,
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  items: readonly IVBenefit[];
  h1: string;
}) {
  const fullTitle = title ?? `Why patients choose our ${h1} drip`;
  const [titleLead, titleTrail] =
    titleAccent && fullTitle.includes(titleAccent)
      ? [fullTitle.replace(titleAccent, "").trimEnd(), titleAccent]
      : [fullTitle, ""];

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
            <Sparkles className="size-3.5 text-[#6CBE45]" />
            {eyebrow}
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.35rem)" }}
          >
            {titleLead}
            {titleTrail && (
              <>
                {" "}
                <span className="italic text-[#8a6f30]">{titleTrail}</span>
              </>
            )}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ iconKey, title: bTitle, body }) => {
            const Icon = ICONS[iconKey];
            return (
              <motion.div
                key={bTitle}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-[#C4A862]/25 bg-gradient-to-b from-white to-[#faf6ec] p-6 shadow-[0_18px_50px_-30px_rgba(15,39,6,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(15,39,6,0.45)]"
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
                <h3 className="mt-5 font-heading text-[16px] font-semibold leading-snug text-[#0f2706]">
                  {bTitle}
                </h3>
                {body && (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-700">
                    {body}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                      */
/* -------------------------------------------------------------------------- */

function FAQSection({ faqs, h1 }: { faqs: readonly IVFAQ[]; h1: string }) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ece4d0] via-[#F0EBE0] to-[#faf6ec] py-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#8a6f30]/25 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30] backdrop-blur"
          >
            <MessageCircle className="size-3.5" />
            Common Questions
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.35rem)" }}
          >
            About {h1}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10"
        >
          <Accordion
            items={faqs.map((f, idx) => ({
              value: `faq-${idx}`,
              title: f.q,
              content: (
                <p className="text-[14.5px] leading-relaxed text-stone-700">
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
/*                                  Related                                    */
/* -------------------------------------------------------------------------- */

function RelatedSection({ related }: { related: readonly IVRelated[] }) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 size-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 border-b border-[#C4A862]/25 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30]">
              More Drips
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0f2706] sm:text-3xl">
              Explore other IV therapies
            </h2>
          </div>
          <Link
            href="/iv-nutrition/"
            className="hidden items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30] sm:inline-flex"
          >
            All IV services
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {related.map((item) => {
            const Icon = ICONS[item.iconKey];
            return (
              <motion.div
                key={item.href}
                variants={fadeUp}
                className="group h-full"
              >
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
                  <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#0f2706]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-600">
                    {item.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors group-hover:text-[#8a6f30]">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Final CTA                                   */
/* -------------------------------------------------------------------------- */

function FinalCTA({ ctaHeading, ctaSubline }: IVSubpageProps) {
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
          {ctaHeading.lead}{" "}
          <span className="italic text-[#C4A862]">{ctaHeading.accent}</span>
          {ctaHeading.trail ? ` ${ctaHeading.trail}` : ""}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-stone-300"
        >
          {ctaSubline}
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
