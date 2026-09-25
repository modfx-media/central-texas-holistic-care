"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Droplet,
  HeartPulse,
  Pill,
  Stethoscope,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    title: "IV Infusion Therapy",
    description:
      "Targeted IV blends (Myers' cocktail, immune, recovery, and more) for fast, deep cellular nutrition.",
    href: "/iv-nutrition/",
    icon: Droplet,
  },
  {
    title: "Medical Weight Loss & Peptides",
    description:
      "Clinician-supervised weight loss with modern peptide protocols matched to your metabolism.",
    href: "/men/",
    icon: Activity,
  },
  {
    title: "Hormone Pelleting",
    description:
      "EvexiPEL bio-identical hormone pellets that release steadily for stable energy and mood.",
    href: "/hormone-therapy/",
    icon: Pill,
  },
  {
    title: "Acute Care Services",
    description:
      "Same-day acute visits for everyday concerns: colds, injuries, infections, and more.",
    href: "/about-us/",
    icon: Stethoscope,
  },
  {
    title: "Men's Health Optimization",
    description:
      "Testosterone, performance, recovery, and preventive screening for every life stage.",
    href: "/men/testosterone/",
    icon: UserCheck,
  },
  {
    title: "Chronic Care Management",
    description:
      "Whole-person plans for hormone, metabolic, and inflammatory conditions, not just symptoms.",
    href: "/women/",
    icon: HeartPulse,
  },
];

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-[color:var(--color-background)] py-14 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,173,90,0.18), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8BAD5A]">
              What We Offer
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-4 font-heading font-light leading-[1.1] text-[#1a3a0a]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Comprehensive services,{" "}
              <span className="italic text-[#5b7d33]">one trusted clinic</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-base text-stone-600 sm:text-lg">
              Modern, evidence-based care delivered with a holistic lens, so every plan
              fits the person, not the population.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description, href, icon: Icon }) => (
            <RevealItem key={title}>
              <motion.div
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-stone-200/70 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-shadow hover:shadow-2xl hover:shadow-[#2D5016]/15"
              >
                {/* Glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-[#8BAD5A]/0 via-[#8BAD5A]/0 to-[#8BAD5A]/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-[#8BAD5A]/30 group-hover:via-[#2D5016]/15 group-hover:opacity-100"
                />

                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#2D5016]/10 text-[#2D5016] transition-colors group-hover:bg-[#2D5016] group-hover:text-white">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 font-heading text-2xl text-[#1a3a0a]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {description}
                </p>

                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D5016] transition-colors hover:text-[#1F3A0F]"
                >
                  Learn more
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
