"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  Droplet,
  Flame,
  HandshakeIcon,
  Heart,
  HeartPulse,
  HelpCircle,
  Leaf,
  Mail,
  MessageSquare,
  Percent,
  Phone,
  PiggyBank,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const CHERRY_APPLY = "https://withcherry.com/";
const CHERRY_MANAGE = "https://pay.withcherry.com/login";
const DENEFITS_PREAPPROVAL =
  "https://request.denefits.com/pre-approval-application/e617b16ea40175bea036bbf4f2267c48";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const CONTACT_URL = "/contact/";
const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const TRUST_PILLS = [
  { icon: ShieldCheck, label: "No-credit-check option" },
  { icon: Percent, label: "0% APR options available" },
  { icon: Timer, label: "Fast, low-friction approvals" },
  { icon: Wallet, label: "Flexible term lengths" },
];

const STEPS = [
  {
    icon: MessageSquare,
    title: "Inquire with the practice",
    body: "Reach out by phone, contact form, or booking so our team can walk you through what care fits your goals.",
  },
  {
    icon: ClipboardCheck,
    title: "Choose a financing partner",
    body: "Together we'll help you pick the option that fits best, Cherry for soft-pull financing or Denefits for no credit check.",
  },
  {
    icon: CalendarCheck,
    title: "Start your care",
    body: "Use your approval at checkout and pay over time on a schedule that fits your budget.",
  },
];

type FinanceableService = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
};

const FINANCEABLE_SERVICES: FinanceableService[] = [
  {
    icon: Sparkles,
    title: "Hormone Therapy",
    body: "Bioidentical HRT programs for balance, energy, and long-term wellness.",
    href: "/hormone-therapy/",
  },
  {
    icon: Flame,
    title: "Testosterone (TRT)",
    body: "Optimize energy, mood, and performance with medically supervised TRT.",
    href: "/men/testosterone/",
  },
  {
    icon: Heart,
    title: "Women's Health",
    body: "Menopause, cycle, and hormone care tailored to every life stage.",
    href: "/women/",
  },
  {
    icon: Droplet,
    title: "IV Nutrition",
    body: "Myers' cocktail, immune boosters, recovery drips, and more.",
    href: "/iv-nutrition/",
  },
  {
    icon: Leaf,
    title: "Stem Cell Therapy",
    body: "Regenerative care for joint, tissue, and whole-body recovery.",
    href: "/stem-cells/",
  },
  {
    icon: HeartPulse,
    title: "Wellness Exams",
    body: "Comprehensive preventive visits and personalized care plans.",
    href: "/men/wellness-exams/",
  },
];

const WHY_FINANCE = [
  {
    icon: Rocket,
    title: "Start care sooner",
    body: "Don't wait months to save up, begin the treatment your body needs now.",
  },
  {
    icon: PiggyBank,
    title: "Protect your savings",
    body: "Keep your emergency fund intact by spreading care across manageable payments.",
  },
  {
    icon: Zap,
    title: "Predictable payments",
    body: "A fixed monthly schedule you can plan your budget around, no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Complements insurance",
    body: "Cover the out-of-pocket portion of concierge, wellness, and elective care.",
  },
];

const FAQS = [
  {
    q: "Do I need good credit to be approved?",
    a: "No. Denefits does not require a credit check and approves the vast majority of applicants. Cherry uses a soft credit check that does not impact your score.",
  },
  {
    q: "How do I know which option is right for me?",
    a: "Both are great. Cherry tends to fit patients looking for higher approval limits and true 0% APR promotional options. Denefits is designed for anyone who prefers to skip a credit check altogether. Our team is happy to help you compare.",
  },
  {
    q: "How long are the payment terms?",
    a: "Terms are flexible and depend on the plan and provider you choose. You'll see the exact schedule and any applicable fees before you commit.",
  },
  {
    q: "How do I get started?",
    a: "The easiest path is to inquire with our practice first. We'll answer any questions, discuss your care plan, and point you to the right application link.",
  },
];

export default function PaymentPlansContent() {
  return (
    <>
      {/* ───────────────────────────── Trust pills ───────────────────────────── */}
      <section className="relative w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {TRUST_PILLS.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2.5 rounded-2xl border border-stone-200 bg-[color:var(--color-cream-soft)] px-4 py-3 shadow-sm"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#1a3a0a] text-white">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm font-semibold text-stone-800">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── Two financing options ───────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[color:var(--color-cream-soft)] py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(196,168,98,0.35) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <Sparkles className="size-3 text-[#C4A862]" />
              Two ways to pay over time
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Two trusted partners.{" "}
              <span className="italic text-[#8a6f30]">One easy conversation.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-base text-stone-600 sm:text-lg"
            >
              We offer two flexible financing options so more patients can start
              care without waiting. Inquire with the practice and we&rsquo;ll
              help you decide which is the best fit.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8"
          >
            {/* Cherry card */}
            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1a3a0a]/10 sm:p-9"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#9DD270] via-[#6CBE45] to-[#2D5016]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-[#C4A862]/60"
              />
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a] ring-1 ring-[#6CBE45]/30">
                  <CreditCard className="size-6" />
                </span>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                    Option 1
                  </p>
                  <h3 className="font-heading text-2xl font-semibold text-[#1a3a0a]">
                    Cherry
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                A fast, soft-pull financing option with true 0% APR plans
                available for qualified borrowers. Ideal if you want higher
                approval limits and promotional-rate flexibility.
              </p>

              <ul className="mt-5 space-y-2.5 text-sm text-stone-700">
                {[
                  "Soft credit check, no impact to your score",
                  "True 0% APR options when eligible",
                  "Flexible term lengths",
                  "Manage your plan online anytime",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#6CBE45]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href={CHERRY_APPLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3a0a] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0f2706]"
                >
                  Learn about Cherry
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href={CHERRY_MANAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-[#1a3a0a] transition hover:border-[#1a3a0a]"
                >
                  Manage your account
                </Link>
              </div>
            </motion.article>

            {/* Denefits card */}
            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-[#C4A862]/40 bg-white p-7 shadow-sm ring-1 ring-[#C4A862]/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1a3a0a]/10 sm:p-9"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C4A862] via-[#8a6f30] to-[#C4A862]"
              />
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[#C4A862]/40 bg-[#C4A862]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
                <Sparkles className="size-3" />
                No credit check
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbf6e8] to-[#f2e6c2] text-[#8a6f30] ring-1 ring-[#C4A862]/30">
                  <ShieldCheck className="size-6" />
                </span>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                    Option 2
                  </p>
                  <h3 className="font-heading text-2xl font-semibold text-[#1a3a0a]">
                    Denefits
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                A no-credit-check payment plan built for patients who prefer to
                skip the credit pull entirely. Approved when traditional
                financing says no.
              </p>

              <ul className="mt-5 space-y-2.5 text-sm text-stone-700">
                {[
                  "No hard or soft credit check required",
                  "Instant, high approval rate",
                  "Flexible term lengths to fit your budget",
                  "On-time payments can help build credit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#C4A862]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href={DENEFITS_PREAPPROVAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  Learn about Denefits
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="https://www.denefits.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-[#1a3a0a] transition hover:border-[#1a3a0a]"
                >
                  Visit Denefits site
                </Link>
              </div>
            </motion.article>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center"
          >
            <p className="text-sm text-stone-600">
              Not sure which is right for you?
            </p>
            <Link
              href={CONTACT_URL}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a3a0a]/25 ring-1 ring-[#6CBE45]/25 transition hover:shadow-xl hover:shadow-[#6CBE45]/20"
            >
              <HandshakeIcon className="size-4 text-[#C4A862]" />
              Inquire with the practice
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
              Our team will help you choose the right option
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── What you can finance ────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 size-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(108,190,69,0.14), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-[color:var(--color-cream-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <Leaf className="size-3 text-[#C4A862]" />
              What you can finance
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Use financing across{" "}
              <span className="italic text-[#8a6f30]">the services we offer.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-base text-stone-600 sm:text-lg"
            >
              Cherry and Denefits can be applied to most of the programs at
              Central Texas Holistic Care, from hormone optimization to
              regenerative care.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FINANCEABLE_SERVICES.map(({ icon: Icon, title, body, href }) => (
              <motion.div key={title} variants={fadeUp}>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#C4A862]/40 hover:shadow-xl hover:shadow-[#1a3a0a]/10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#9DD270] via-[#6CBE45] to-[#C4A862] opacity-0 transition-opacity group-hover:opacity-100"
                  />
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a] ring-1 ring-[#6CBE45]/25">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-[#1a3a0a]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                    {body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a0a] transition group-hover:gap-2">
                    Explore
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl text-center text-xs text-stone-500"
          >
            Have a different service in mind? Ask us during your inquiry, most
            programs are eligible.
          </motion.p>
        </div>
      </section>

      {/* ───────────────────────────── How it works ──────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-[color:var(--color-cream-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <Sparkles className="size-3 text-[#C4A862]" />
              How it works
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Three steps.{" "}
              <span className="italic text-[#8a6f30]">Zero pressure.</span>
            </motion.h2>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-3"
          >
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#C4A862]/60"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#C4A862]/60"
                />
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a]">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-stone-400">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1a3a0a]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ────────────────── Why patients choose to finance ───────────────────── */}
      <section className="relative w-full overflow-hidden bg-[color:var(--color-cream-soft)] py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(196,168,98,0.35) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 size-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,168,98,0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <Sparkles className="size-3 text-[#C4A862]" />
              Why patients finance care
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Care that fits your life,{" "}
              <span className="italic text-[#8a6f30]">and your budget.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-base text-stone-600 sm:text-lg"
            >
              Financing helps our patients begin their care journey sooner
              without straining monthly cash flow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {WHY_FINANCE.map(({ icon: Icon, title, body }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#C4A862]/40 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-[#C4A862]/60"
                />
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a] ring-1 ring-[#6CBE45]/25">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-[#1a3a0a]">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                  {body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── Inquire with the practice ─────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[color:var(--color-cream-soft)] to-white py-14 sm:py-20 lg:py-24">
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
          className="pointer-events-none absolute -right-32 bottom-10 size-[440px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,168,98,0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <HandshakeIcon className="size-3 text-[#C4A862]" />
              Ready to begin?
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Inquire with the practice.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-base text-stone-600 sm:text-lg"
            >
              We&rsquo;ll walk you through your care options, answer questions,
              and help you choose the financing partner that fits best.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            <motion.a
              variants={fadeUp}
              href={`tel:${PHONE_TEL}`}
              className="group flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#1a3a0a] hover:shadow-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a] ring-1 ring-[#6CBE45]/30">
                <Phone className="size-5" />
              </span>
              <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                Call the clinic
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-[#1a3a0a]">
                {PHONE_DISPLAY}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a0a] transition group-hover:gap-2">
                Tap to call
                <ArrowRight className="size-3.5" />
              </span>
            </motion.a>

            <motion.div variants={fadeUp}>
              <Link
                href={CONTACT_URL}
                className="group flex h-full flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#1a3a0a] hover:shadow-md"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-[#1a3a0a] ring-1 ring-[#6CBE45]/30">
                  <Mail className="size-5" />
                </span>
                <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                  Send a message
                </p>
                <p className="mt-1 font-heading text-lg font-semibold text-[#1a3a0a]">
                  Contact form
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a0a] transition group-hover:gap-2">
                  Open form
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-2xl border border-[#C4A862]/40 bg-gradient-to-br from-white to-[#fbf6e8] p-6 text-center shadow-sm ring-1 ring-[#C4A862]/20 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbf6e8] to-[#f2e6c2] text-[#8a6f30] ring-1 ring-[#C4A862]/40">
                <CalendarCheck className="size-5" />
              </span>
              <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                Book online
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-[#1a3a0a]">
                Schedule a visit
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a0a] transition group-hover:gap-2">
                Open booking
                <ArrowRight className="size-3.5" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────── FAQ ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[color:var(--color-cream-soft)] py-12 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(196,168,98,0.35) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]"
            >
              <HelpCircle className="size-3 text-[#C4A862]" />
              Common questions
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl"
            >
              Frequently asked questions.
            </motion.h2>
          </motion.div>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="mt-10 space-y-3"
          >
            {FAQS.map(({ q, a }) => (
              <motion.div
                key={q}
                variants={fadeUp}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <dt className="text-base font-semibold text-[#1a3a0a]">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                  {a}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ───────────────────────────── Final CTA ─────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] py-20 text-white sm:py-24">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Care first.{" "}
            <span className="italic text-[#9DD270]">
              Payments on your schedule.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg"
          >
            Get in touch and we&rsquo;ll help you choose between Cherry and
            Denefits, and answer any questions about your care plan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#6CBE45] px-6 py-3 text-sm font-semibold text-[#0b1d04] shadow-[0_10px_30px_-10px_rgba(108,190,69,0.6)] transition hover:bg-[#9DD270]"
            >
              <Phone className="size-4" />
              {PHONE_DISPLAY}
            </a>
            <Link
              href={CONTACT_URL}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Mail className="size-4" />
              Contact the practice
            </Link>
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              <CalendarCheck className="size-4" />
              Book an appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────── Disclosures ───────────────────────────── */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 text-[11px] leading-relaxed text-stone-500 sm:px-6 lg:px-8">
          <p>
            Financing options are provided by independent third parties, Cherry
            Technologies, Inc. and Denefits, LLC. Central Texas Holistic Care is
            not a lender and does not make credit decisions. Approval, terms,
            APR, and payment schedules are determined solely by the financing
            provider and depend on your individual application. Availability of
            0% APR and promotional rates is subject to eligibility.
          </p>
          <p className="mt-3">
            Learn more at{" "}
            <a
              href="https://withcherry.com/lending-partners"
              className="underline hover:text-[#1a3a0a]"
              target="_blank"
              rel="noopener noreferrer"
            >
              withcherry.com/lending-partners
            </a>
            ,{" "}
            <a
              href="https://withcherry.com/terms"
              className="underline hover:text-[#1a3a0a]"
              target="_blank"
              rel="noopener noreferrer"
            >
              withcherry.com/terms
            </a>
            , and{" "}
            <a
              href="https://www.denefits.com/"
              className="underline hover:text-[#1a3a0a]"
              target="_blank"
              rel="noopener noreferrer"
            >
              denefits.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
