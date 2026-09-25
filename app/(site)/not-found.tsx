import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Compass,
  Droplets,
  Flower2,
  Home,
  Leaf,
  Stethoscope,
  UserRound,
} from "lucide-react";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

const PAGE_TITLE = "Page Not Found | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "We couldn't find that page. Explore our hormone therapy, IV nutrition, and men's & women's health services or head back to the home page.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/404/`,
    type: "website",
    siteName: "Central Texas Holistic Care",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Page Not Found")}&subtitle=${encodeURIComponent("Let's get you back on a healing path")}&tag=404`,
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
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent("Page Not Found")}&subtitle=${encodeURIComponent("Let's get you back on a healing path")}&tag=404`,
    ],
  },
};

type DestinationLink = {
  href: string;
  label: string;
  description: string;
  icon: typeof Home;
};

const SERVICE_LINKS: DestinationLink[] = [
  {
    href: "/hormone-therapy/",
    label: "Hormone Therapy",
    description: "Bioidentical HRT for hormone restoration.",
    icon: Flower2,
  },
  {
    href: "/iv-nutrition/",
    label: "IV Nutrition",
    description: "Physician-supervised IV infusion menu.",
    icon: Droplets,
  },
  {
    href: "/men/",
    label: "Men's Health",
    description: "Testosterone, wellness exams & longevity.",
    icon: UserRound,
  },
  {
    href: "/women/",
    label: "Women's Health",
    description: "Hormone balance, exams & menopause care.",
    icon: Leaf,
  },
  {
    href: "/about-us/",
    label: "About CTHC",
    description: "Meet our integrative care team.",
    icon: Stethoscope,
  },
];

export default function NotFound() {
  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--color-cream-soft)]">
      {/* decorative top gradient bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1a3a0a] via-[#2D5016] to-[#8BAD5A]" />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: 404 hero */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2D5016]/20 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[#2D5016]">
              <Compass className="size-3.5" />
              Off the Trail
            </div>

            <h1
              className="mt-8 font-heading font-light leading-[0.95] text-[#1a3a0a]"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              404
            </h1>
            <p
              className="mt-2 font-heading font-light text-[#2D5016]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              We couldn't find that page.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
              The page may have moved, been renamed, or no longer exists. Use the
              links here to get to the section you need, or call us at{" "}
              <a
                href="tel:+12542132423"
                className="font-medium text-[#2D5016] underline-offset-4 hover:underline"
              >
                254-213-2423
              </a>{" "}
              and we'll point you in the right direction.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#2D5016] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2D5016]/20 transition-colors hover:bg-[#1a3a0a]"
              >
                <Home className="size-4" />
                Back to home
              </Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#2D5016]/30 bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a0a] transition-colors hover:border-[#2D5016] hover:bg-[#f0f5eb]"
              >
                <Calendar className="size-4" />
                Book an appointment
              </a>
            </div>
          </div>

          {/* Right: destination grid */}
          <div className="rounded-3xl border border-stone-200 bg-white/70 p-7 shadow-sm backdrop-blur-sm sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8BAD5A]">
              Popular destinations
            </p>
            <h2 className="mt-2 font-heading text-2xl font-light text-[#1a3a0a]">
              Try one of these instead
            </h2>

            <ul className="mt-6 divide-y divide-stone-200">
              {SERVICE_LINKS.map(({ href, label, description, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-[#2D5016]"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f0f5eb] text-[#2D5016] transition-colors group-hover:bg-[#2D5016] group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-[#1a3a0a]">
                        {label}
                      </span>
                      <span className="block text-xs text-stone-500">
                        {description}
                      </span>
                    </span>
                    <ArrowRight className="size-4 -translate-x-1 text-stone-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#2D5016]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
