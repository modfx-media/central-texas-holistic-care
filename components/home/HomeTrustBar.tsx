"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

type Pill = {
  icon: string | { kind: "emoji"; value: string };
  label: string;
  sub: string;
};

const PILLS: Pill[] = [
  {
    icon: { kind: "emoji", value: "🩺" },
    label: "Board-Certified",
    sub: "Family Medicine + Holistic",
  },
  {
    icon: { kind: "emoji", value: "✅" },
    label: "Most Insurance",
    sub: "16+ payers accepted",
  },
  {
    icon: "/images/source/icon3.png",
    label: "Practitioner Products",
    sub: "Curated by our clinicians",
  },
  {
    icon: { kind: "emoji", value: "💳" },
    label: "0% APR Financing",
    sub: "Pay over time via Cherry",
  },
  {
    icon: "/images/source/icon1.png",
    label: "Whole-Person Care",
    sub: "Mind, body &amp; lifestyle",
  },
  {
    icon: "/images/source/icon2.png",
    label: "Same-Day Visits",
    sub: "Acute &amp; new-patient",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function HomeTrustBar() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[#1a3a0a]/10 bg-[color:var(--color-soft-green)] py-14 sm:py-16">
      {/* subtle blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 size-[320px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(108,190,69,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#6CBE45]" />
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#8BAD5A]">
            Why Patients Choose CTHC
          </p>
          <span className="block h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#6CBE45]" />
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {PILLS.map(({ icon, label, sub }) => (
            <motion.li
              key={label}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border border-stone-200/70 bg-white/85 p-5 text-center backdrop-blur-sm transition-all hover:border-[#6CBE45]/50 hover:shadow-lg hover:shadow-[#2D5016]/10"
            >
              {/* hover gradient sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 left-1/2 size-32 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#6CBE45]/0 to-[#6CBE45]/0 blur-2xl transition-all group-hover:from-[#6CBE45]/25"
              />
              {typeof icon === "string" ? (
                <span className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] ring-1 ring-[#6CBE45]/20 transition-transform group-hover:scale-110">
                  <Image
                    src={icon}
                    alt={label}
                    width={40}
                    height={40}
                    className="size-8 object-contain"
                    aria-hidden
                  />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f5eb] to-[#e6f0db] text-2xl ring-1 ring-[#6CBE45]/20 transition-transform group-hover:scale-110"
                >
                  {icon.value}
                </span>
              )}
              <span className="relative mt-2 text-sm font-semibold text-[#1a3a0a]">
                {label}
              </span>
              <span
                className="relative text-[11px] leading-snug text-stone-500"
                dangerouslySetInnerHTML={{ __html: sub }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
