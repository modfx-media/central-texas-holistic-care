import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Atom,
  Bone,
  CalendarCheck,
  Check,
  ClipboardList,
  Dna,
  Droplets,
  FlaskConical,
  HeartPulse,
  Microscope,
  Phone,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  Timer,
  Zap,
} from "lucide-react";

import FaqAccordion, { type FaqItem } from "@/components/sections/FaqAccordion";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/stem-cells/`;
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";

const PAGE_TITLE =
  "Stem Cell Therapy in Killeen, TX | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Physician-supervised stem cell, exosome, and PRP therapy in Killeen, TX. Non-surgical regenerative injections for joints, tendons, hair, and recovery.";

const pageMetadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    type: "website",
    siteName: "Central Texas Holistic Care",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(PAGE_TITLE)}`,
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent(PAGE_TITLE)}`],
  },
  robots: { index: true, follow: true },
}

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/stem-cells", pageMetadata);
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What are stem cells and how do they help me heal?",
    answer:
      "Stem cells are the body's regenerative signalers. They orchestrate tissue repair, modulate inflammation, and recruit your own repair cells to a site of injury. In therapy, we deliver concentrated stem cell and exosome signals directly to damaged joints, tendons, or tissues to support healing that your body is already trying to do.",
  },
  {
    question: "Is stem cell therapy right for me?",
    answer:
      "Most patients are candidates, but not every case is a fit. During your consultation we review your history, imaging, and labs, and then recommend the therapy that best matches your goals. If we don't think regenerative injections will help, we'll say so and point you to the right care.",
  },
  {
    question: "Is the procedure painful and how long does it take?",
    answer:
      "The injection itself is quick, typically 30 to 60 minutes in office. We use local anesthesia and, when appropriate, guided imaging so placement is precise. Most patients describe it as a brief pressure with mild soreness for a day or two afterward.",
  },
  {
    question: "How soon will I feel results?",
    answer:
      "Regeneration is a biological process, not a pill. Many patients notice reduced inflammation within 2 to 4 weeks, with continued improvement over 3 to 6 months as tissue remodels. Results depend on the condition, severity, and how well the surrounding environment is supported.",
  },
  {
    question: "Is this covered by insurance?",
    answer:
      "Regenerative therapy is typically not covered by insurance. We offer 0% APR financing through Cherry and Denefits so you can start care without a large upfront cost.",
  },
];

export default function StemCellsPage() {
  return (
    <CMSRoute path="/stem-cells">
    <>
      <HeroSection />
      <TrustTrio />
      <WhatItIsSection />
      <TherapyTypesSection />
      <ConditionsSection />
      <ProcessSection />
      <FaqAccordion
        items={FAQ_ITEMS}
        eyebrow="Stem Cell FAQ"
        title="Answers to the questions we hear most"
        intro="Regenerative therapy is different from anything your primary care doctor prescribes. Here's what we tell every new patient."
      />
      <FinalCTASection />
    </>
      </CMSRoute>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Hero                                     */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b1d04] py-14 sm:py-20 lg:py-28">
      <Image
        src="/images/stem-cell/regenerative-medicine.webp"
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
      {/* Botanical grid backdrop */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.10]"
      >
        <defs>
          <pattern
            id="sc-hero-grid"
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
        <rect width="100%" height="100%" fill="url(#sc-hero-grid)" />
      </svg>

      {/* Spotlights */}
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

      {/* Gold hairlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-16 h-px bg-gradient-to-r from-transparent via-[#C4A862]/30 to-transparent"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center justify-center gap-2 text-[12px] text-white/65"
        >
          <Link href="/" className="transition-colors hover:text-[#C4A862]">
            Home
          </Link>
          <span aria-hidden className="text-white/30">
            /
          </span>
          <span className="text-white/90">Stem Cell Therapy</span>
        </nav>

        <div className="flex items-center justify-center gap-3">
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#C4A862]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#C4A862]">
            Regenerative &middot; Cellular Repair
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#C4A862]" />
        </div>

        <h1
          id="page-hero-title"
          className="mt-6 font-heading font-semibold leading-[1.05] text-white"
          style={{ fontSize: "clamp(2.25rem, 5.2vw, 4rem)" }}
        >
          Regenerative healing,{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#9DD270] via-[#C4A862] to-[#9DD270] bg-clip-text italic text-transparent">
              powered by your own biology.
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#C4A862]/70 to-transparent"
            />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
          Physician-supervised{" "}
          <span className="font-semibold text-white">
            stem cell, exosome, and PRP injections
          </span>{" "}
          for joints, tendons, and whole-body recovery. Non-surgical, lab-guided,
          and built around your history, not a template.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <CalendarCheck className="size-4" />
            Book a Consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#C4A862]/60 hover:bg-white/10"
          >
            <Phone className="size-4 text-[#C4A862]" />
            Call {PHONE_DISPLAY}
          </a>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur">
          <Sparkles className="size-3 text-[#C4A862]" />
          Provider-led &middot; Killeen, TX &middot; 0% APR financing
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Trust trio                                  */
/* -------------------------------------------------------------------------- */

const TRUST_FEATURES = [
  {
    icon: Stethoscope,
    title: "Provider-led",
    body: "Every regenerative plan is designed and supervised by our medical team, not a franchise script.",
  },
  {
    icon: Microscope,
    title: "Lab-guided",
    body: "Bloodwork, imaging, and inflammation markers guide the protocol so you treat the cause, not the symptom.",
  },
  {
    icon: Syringe,
    title: "Precision injection",
    body: "Guided delivery to the exact tissue, joint, or tendon, not a generic infusion.",
  },
] as const;

function TrustTrio() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[#C4A862]/20 bg-gradient-to-b from-white to-[#faf6ec] p-7 transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(15,39,6,0.35)]"
            >
              <span
                aria-hidden
                className="absolute left-3 top-3 size-4 border-l border-t border-[#C4A862]/50"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 size-4 border-b border-r border-[#C4A862]/50"
              />

              <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862] shadow-md shadow-[#0f2706]/30">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {body}
              </p>
              <span
                aria-hidden
                className="mt-5 block h-px w-full bg-gradient-to-r from-[#1a3a0a] via-[#6CBE45] to-[#C4A862] opacity-40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              What it is                                    */
/* -------------------------------------------------------------------------- */

function WhatItIsSection() {
  const bullets = [
    {
      icon: Atom,
      title: "Cellular signals, not surgery",
      body: "Concentrated stem cell and exosome signals tell your body to recruit repair cells, quiet inflammation, and regenerate damaged tissue.",
    },
    {
      icon: Target,
      title: "Delivered where you need them",
      body: "Ultrasound- or landmark-guided injection into joints, tendons, scalp, or specific soft tissues.",
    },
    {
      icon: Zap,
      title: "Ongoing, not one-and-done",
      body: "We support the surrounding environment with nutrition, hormone balance, and peptide protocols so the results actually last.",
    },
  ] as const;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#f5efd9] to-[#ece4d0] py-12 sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.15]"
      >
        <defs>
          <pattern
            id="sc-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sc-dots)" />
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-[#C4A862]/30 shadow-[0_40px_100px_-40px_rgba(15,39,6,0.45)]">
              <Image
                src="/images/stem-cell/regenerative-medicine.webp"
                alt="Regenerative medicine, cellular healing visualization"
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d04]/70 via-[#0b1d04]/10 to-transparent"
              />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862] backdrop-blur">
                <Dna className="size-3" />
                Cellular
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left text-white backdrop-blur">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C4A862]">
                  <HeartPulse className="size-3" />
                  Whole-person
                </div>
                <p className="mt-2 text-sm leading-snug">
                  Concentrated signals, guided delivery, and a personalized
                  recovery plan built around your labs.
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                What it is
              </p>
            </div>
            <h2
              className="mt-4 font-heading font-semibold leading-[1.1] text-[#0f2706]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
            >
              A regenerative approach that works{" "}
              <span className="italic text-[#8a6f30]">with</span> your body.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone-700">
              Stem cell therapy uses the same signaling pathways your body
              already relies on to heal. We concentrate those signals and deliver
              them exactly where they&apos;re needed, then support the
              surrounding environment so the treatment has the best chance to
              take hold.
            </p>

            <ul className="mt-7 space-y-5">
              {bullets.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1a3a0a] shadow-[0_8px_24px_-12px_rgba(15,39,6,0.35)] ring-1 ring-[#C4A862]/30">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#1a3a0a]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Therapy types                                  */
/* -------------------------------------------------------------------------- */

const THERAPY_TYPES = [
  {
    icon: FlaskConical,
    tag: "Mesenchymal",
    title: "Stem Cell Injections",
    body: "Concentrated mesenchymal signals that recruit repair cells, calm inflammation, and support tissue regeneration in the treated area.",
    bullets: [
      "Joint & tendon repair",
      "Chronic inflammation",
      "Tissue-level healing",
    ],
  },
  {
    icon: Atom,
    tag: "Exosomes",
    title: "Exosome Therapy",
    body: "Nano-sized messengers that carry growth factors and RNA between cells, orchestrating a faster and more precise repair response.",
    bullets: [
      "Signaling amplification",
      "Anti-inflammatory support",
      "Skin & scalp regeneration",
    ],
  },
  {
    icon: Droplets,
    tag: "Autologous",
    title: "PRP (Platelet-Rich Plasma)",
    body: "Concentrated healing factors drawn from your own blood, spun and re-injected to jump-start the body's natural repair cycle.",
    bullets: [
      "Joints & soft tissue",
      "Hair restoration",
      "Aesthetic rejuvenation",
    ],
  },
] as const;

function TherapyTypesSection() {
  return (
    <section className="relative w-full bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              Therapies we offer
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
          >
            Three regenerative tools, one personalized plan.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            The right therapy depends on your goals, your tissue, and your labs.
            We&apos;ll choose one, or combine them, during your consultation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {THERAPY_TYPES.map(({ icon: Icon, tag, title, body, bullets }) => (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-[#f7f5ee] p-7 shadow-sm transition-shadow hover:shadow-[0_20px_60px_-30px_rgba(15,39,6,0.35)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#C4A862] to-transparent opacity-60"
              />
              <div className="flex items-center justify-between">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862] shadow-md shadow-[#0f2706]/30">
                  <Icon className="size-5" />
                </div>
                <span className="inline-flex items-center rounded-full border border-[#C4A862]/40 bg-[#C4A862]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]">
                  {tag}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-xl font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {body}
              </p>

              <ul className="mt-5 space-y-2 border-t border-stone-200/70 pt-4">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-stone-700"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[#6CBE45]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Conditions we treat                              */
/* -------------------------------------------------------------------------- */

const CONDITIONS = [
  { icon: Bone, label: "Knee & hip pain" },
  { icon: Activity, label: "Shoulder & rotator cuff" },
  { icon: Target, label: "Tendinitis & tears" },
  { icon: HeartPulse, label: "Chronic inflammation" },
  { icon: Sparkles, label: "Hair restoration" },
  { icon: Dna, label: "Aesthetic rejuvenation" },
  { icon: Timer, label: "Post-injury recovery" },
  { icon: Zap, label: "Athletic performance" },
] as const;

function ConditionsSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#0f2706] via-[#1a3a0a] to-[#0f2706] py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C4A862]">
              Conditions we treat
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-white"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
          >
            Where regenerative therapy tends to shine.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-200">
            Not every case is a fit. During your consultation we&apos;ll say so
            plainly and, when we can help, tell you which therapy makes the most
            sense.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONDITIONS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-4 backdrop-blur transition-colors hover:border-[#C4A862]/50 hover:bg-white/10"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#C4A862]/15 text-[#C4A862]">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-white">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Process                                     */
/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Consultation & workup",
    body: "We review your history, imaging, and labs, then decide together which regenerative approach fits your body and goals.",
  },
  {
    n: "02",
    icon: FlaskConical,
    title: "Personalized protocol",
    body: "Your provider designs the therapy, dose, and delivery site, and layers in nutrition and hormone support when it matters.",
  },
  {
    n: "03",
    icon: Syringe,
    title: "Guided injection",
    body: "In-office, minimally invasive. Most visits take 30 to 60 minutes with local anesthesia and precise, guided placement.",
  },
  {
    n: "04",
    icon: Timer,
    title: "Recovery & follow-up",
    body: "Structured follow-ups track pain, function, and inflammation over 3 to 6 months so we can adjust the plan as your body responds.",
  },
] as const;

function ProcessSection() {
  return (
    <section className="relative w-full bg-[color:var(--color-cream-soft)] py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
              How it works
            </p>
            <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          </div>
          <h2
            className="mt-4 font-heading font-semibold leading-[1.1] text-[#0f2706]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)" }}
          >
            Four steps from first visit to lasting result.
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <li
              key={n}
              className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <span
                aria-hidden
                className="absolute right-4 top-3 font-heading text-4xl font-bold text-[#C4A862]/25"
              >
                {n}
              </span>
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a3a0a] to-[#0f2706] text-[#C4A862] shadow-md shadow-[#0f2706]/30">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-[#1a3a0a]">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Final CTA                                   */
/* -------------------------------------------------------------------------- */

function FinalCTASection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 size-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.24), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,168,98,0.22), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C4A862]">
            Ready when you are
          </p>
          <span className="block h-[2px] w-8 rounded-full bg-[#C4A862]" />
        </div>
        <h2
          className="mt-4 font-heading font-semibold leading-[1.1] text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Find out if regenerative therapy is right for you.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
          Book a consultation and we&apos;ll walk you through your options,
          honestly. If regenerative therapy isn&apos;t the right call, we&apos;ll
          say so.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0f2706]/40 ring-1 ring-[#C4A862]/40 transition hover:shadow-2xl hover:shadow-[#C4A862]/30"
          >
            <CalendarCheck className="size-4" />
            Book a Consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#C4A862]/60 hover:bg-white/10"
          >
            <Phone className="size-4 text-[#C4A862]" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
