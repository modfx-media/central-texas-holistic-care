"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Beaker,
  CalendarCheck,
  Check,
  ChevronRight,
  Droplets,
  Flower2,
  HeartPulse,
  Leaf,
  type LucideIcon,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
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
  stethoscope: Stethoscope,
  sun: Sun,
  droplets: Droplets,
  shieldCheck: ShieldCheck,
  heartPulse: HeartPulse,
  sparkles: Sparkles,
  activity: Activity,
  flower2: Flower2,
  beaker: Beaker,
  messageCircle: MessageCircle,
  microscope: Microscope,
  leaf: Leaf,
} as const satisfies Record<string, LucideIcon>;

export type WomenIconKey = keyof typeof ICONS;

export type WomenChecklistItem = {
  /** Bold item label (e.g. "Breast exam") */
  label: string;
  /** Optional supporting detail rendered after an em-dash */
  detail?: string;
  iconKey?: WomenIconKey;
};

export type WomenChecklist = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  items: readonly WomenChecklistItem[];
};

export type WomenPillar = {
  iconKey: WomenIconKey;
  title: string;
  body: string;
};

export type WomenFAQ = { q: string; a: string };

export type WomenLongformSection = {
  heading: string;
  paragraphs: readonly string[];
  links?: readonly { href: string; label: string }[];
};

export type WomenRelated = {
  title: string;
  href: string;
  blurb: string;
  iconKey: WomenIconKey;
};

export type WomenSubpageProps = {
  /** Hero H1 (e.g. "Gynecological Exams") */
  h1: string;
  /** Short breadcrumb label for the current page (e.g. "Gynecological Exams") */
  breadcrumbLabel: string;
  /** Hero eyebrow above H1 (e.g. "Gynecological Exams") */
  eyebrow: string;
  /** Hero subtitle */
  heroSubtitle: string;
  /** Overview H2 */
  h2: string;
  /** Overview body paragraph */
  body: string;
  /** Optional additional Overview paragraphs */
  extraParagraphs?: readonly string[];
  /** Optional italic gold closing line shown in Overview after the body */
  closingNote?: string;
  /** Italic gold accent word(s) in the H2, optional. If provided, the matching substring is rendered in italic gold. */
  h2Accent?: string;
  /** Hero/overview icon key */
  iconKey: WomenIconKey;
  /** Three trust ticks for hero */
  trust: readonly { iconKey: WomenIconKey; label: string }[];
  /** Three highlight chips for overview */
  highlights: readonly string[];
  /** Overview image */
  image: { src: string; alt: string };
  /** Optional standalone background image for the hero banner. Falls back to `image.src` when omitted. */
  heroBackground?: string;
  /** Optional checklist sections rendered on parchment */
  checklists?: readonly WomenChecklist[];
  /** Optional "Why CTHC" trust pillars (3 recommended) */
  whyPillars?: readonly WomenPillar[];
  /** Optional FAQ items rendered in an accordion */
  faqs?: readonly WomenFAQ[];
  /** Extra headed sections, rendered when a page needs more than the overview */
  longform?: readonly WomenLongformSection[];
  /** Optional related services for cross-linking */
  related?: readonly WomenRelated[];
  /** Final-CTA heading (with optional gold accent via {accent} key) */
  ctaHeading: { lead: string; accent: string; trail?: string };
  /** Final-CTA subline */
  ctaSubline: string;
};

export default function WomenSubpageClient(props: WomenSubpageProps) {
  return (
    <>
      <HeroSection {...props} />
      <OverviewSection {...props} />
      {props.checklists && props.checklists.length > 0 && (
        <ChecklistsSection checklists={props.checklists} />
      )}
      {props.whyPillars && props.whyPillars.length > 0 && (
        <WhyPillarsSection pillars={props.whyPillars} h1={props.h1} />
      )}
      {props.longform && props.longform.length > 0 && (
        <LongformSection sections={props.longform} />
      )}
      {props.faqs && props.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: props.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            }),
          }}
        />
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

function LongformSection({ sections }: { sections: readonly WomenLongformSection[] }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-heading text-3xl font-light text-[#1a3a0a] sm:text-4xl">
              {section.heading}
            </h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-stone-700">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.links && section.links.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-stone-200 bg-[color:var(--color-cream-soft,#faf6ec)] px-4 py-2 text-sm font-medium text-[#1a3a0a] hover:border-[#C4A862]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroSection({
  h1,
  breadcrumbLabel,
  eyebrow,
  heroSubtitle,
  trust,
  image,
  heroBackground,
}: WomenSubpageProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b1d04] py-14 sm:py-20 lg:py-28">
      <Image
        src={heroBackground ?? image.src}
        alt={image.alt}
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
            id="women-sub-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#women-sub-hero-grid)" />
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
          <Link
            href="/women/"
            className="transition-colors hover:text-[#C4A862]"
          >
            Women
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
  body,
  extraParagraphs,
  closingNote,
  image,
  highlights,
  iconKey,
  eyebrow,
}: WomenSubpageProps) {
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
        {/* image */}
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
                Whole-woman care
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
            <Icon className="size-3.5 text-[#6CBE45]" />
            Overview
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.15] text-[#0f2706]"
            style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}
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

          {extraParagraphs?.map((p) => (
            <motion.p
              key={p}
              variants={fadeUp}
              className="mt-4 text-[15px] leading-relaxed text-stone-700"
            >
              {p}
            </motion.p>
          ))}

          {closingNote && (
            <motion.div
              variants={fadeUp}
              className="mt-6 rounded-2xl border border-[#C4A862]/30 bg-gradient-to-br from-[#faf6ec] to-white p-5 shadow-[0_14px_40px_-30px_rgba(15,39,6,0.3)]"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40">
                  <Flower2 className="size-4" />
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
              href="/women/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30]"
            >
              All Women&apos;s Services
              <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Checklists                                   */
/* -------------------------------------------------------------------------- */

function ChecklistsSection({
  checklists,
}: {
  checklists: readonly WomenChecklist[];
}) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#F0EBE0] to-[#ece4d0] py-12 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.12]"
      >
        <defs>
          <pattern
            id="women-checklist-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#8a6f30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#women-checklist-dots)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
        {checklists.map((cl) => {
          const [titleLead, titleTrail] =
            cl.titleAccent && cl.title.includes(cl.titleAccent)
              ? [cl.title.replace(cl.titleAccent, "").trimEnd(), cl.titleAccent]
              : [cl.title, ""];
          return (
            <motion.div
              key={cl.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8a6f30]/25 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a6f30] backdrop-blur">
                  <Check className="size-3.5" />
                  {cl.eyebrow}
                </div>
                <h2
                  className="mt-5 font-heading font-semibold leading-[1.15] text-[#0f2706]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.15rem)" }}
                >
                  {titleLead}
                  {titleTrail && (
                    <>
                      {" "}
                      <span className="italic text-[#8a6f30]">
                        {titleTrail}
                      </span>
                    </>
                  )}
                </h2>
              </motion.div>

              <motion.ul
                variants={stagger}
                className="mt-10 grid gap-4 sm:grid-cols-2"
              >
                {cl.items.map((item) => {
                  const Icon = ICONS[item.iconKey ?? "sparkles"];
                  return (
                    <motion.li
                      key={item.label}
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
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 transition-transform group-hover:scale-[1.04]">
                        <Icon className="size-5" />
                      </span>
                      <div className="pt-0.5">
                        <p className="font-heading text-[15px] font-semibold text-[#0f2706]">
                          {item.label}
                        </p>
                        {item.detail && (
                          <p className="mt-1 text-[13.5px] leading-relaxed text-stone-600">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Why pillars                                  */
/* -------------------------------------------------------------------------- */

function WhyPillarsSection({
  pillars,
  h1,
}: {
  pillars: readonly WomenPillar[];
  h1: string;
}) {
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
            Why CTHC for {h1}
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
          >
            Care that&apos;s{" "}
            <span className="italic text-[#8a6f30]">built around you.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {pillars.map(({ iconKey, title, body }) => {
            const Icon = ICONS[iconKey];
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-[#C4A862]/25 bg-gradient-to-b from-white to-[#faf6ec] p-7 shadow-[0_18px_50px_-30px_rgba(15,39,6,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(15,39,6,0.45)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 border-l border-t border-[#C4A862]/55"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-2.5 right-2.5 size-3.5 border-b border-r border-[#C4A862]/55"
                />
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] via-[#2D5016] to-[#0f2706] text-[#C4A862] ring-1 ring-[#C4A862]/40 shadow-md shadow-[#0f2706]/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-[#0f2706]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-700">
                  {body}
                </p>
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

function FAQSection({
  faqs,
  h1,
}: {
  faqs: readonly WomenFAQ[];
  h1: string;
}) {
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

function RelatedSection({
  related,
}: {
  related: readonly WomenRelated[];
}) {
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
              Related Care
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-[#0f2706] sm:text-3xl">
              More for women&apos;s health
            </h2>
          </div>
          <Link
            href="/women/"
            className="hidden items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1a3a0a] transition-colors hover:text-[#8a6f30] sm:inline-flex"
          >
            All services
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
              <motion.div key={item.href} variants={fadeUp} className="group h-full">
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

function FinalCTA({ ctaHeading, ctaSubline }: WomenSubpageProps) {
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
