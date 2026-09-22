"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const ADDRESS = "311 E. Stan Schlueter Loop #207, Killeen, TX";

type NavChild = {
  label: string;
  href: string;
  description: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  hideOverview?: boolean;
  pulse?: boolean;
};

const NAV: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us/",
    children: [
      {
        label: "Blog",
        href: "/blog/",
        description: "Insights from our clinicians.",
      },
      {
        label: "Contact Us",
        href: "/contact/",
        description: "Get in touch with our care team.",
      },
      {
        label: "Patient Reviews",
        href: "/reviews/",
        description: "5-star Google reviews from CTHC patients.",
      },
    ],
  },
  {
    label: "Men",
    href: "/men/",
    children: [
      {
        label: "Testosterone Therapy",
        href: "/men/testosterone/",
        description: "Optimize energy, mood, and performance.",
      },
      {
        label: "Wellness Exams",
        href: "/men/wellness-exams/",
        description: "Comprehensive preventive screenings.",
      },
    ],
  },
  {
    label: "Women",
    href: "/women/",
    children: [
      {
        label: "Gynecological Exams",
        href: "/women/gynecological-exams/",
        description: "Routine women's health & screenings.",
      },
      {
        label: "Menopausal Disorders",
        href: "/women/menopausal-disorders/",
        description: "Personalized peri- and post-menopause care.",
      },
      {
        label: "Menstrual Disorders",
        href: "/women/menstrual-disorders/",
        description: "Hormone balance and cycle regulation.",
      },
    ],
  },
  {
    label: "IV Nutrition",
    href: "/iv-nutrition/",
    children: [
      {
        label: "Immune Booster",
        href: "/iv-nutrition/immune-booster/",
        description: "Strengthen your body's defense.",
      },
      {
        label: "Workout Recovery",
        href: "/iv-nutrition/workout-recovery/",
        description: "Recharge, rebuild, refuel.",
      },
      {
        label: "Myer's Cocktail",
        href: "/iv-nutrition/myers-cocktail/",
        description: "Energy, immunity & relief in one drip.",
      },
      {
        label: "Cold & Flu",
        href: "/iv-nutrition/cold-and-flu/",
        description: "Fight symptoms fast and recover.",
      },
      {
        label: "Hangover",
        href: "/iv-nutrition/hangover/",
        description: "Hydrate, detox, bounce back fast.",
      },
    ],
  },
  { label: "Hormone Therapy", href: "/hormone-therapy/" },
  { label: "Stem Cells", href: "/stem-cells/", pulse: true },
  { label: "Payment Plans", href: "/payment-plans/" },
];

/* -------------------------------------------------------------------------- */
/*                          Attention-grabbing label                           */
/* -------------------------------------------------------------------------- */

function PulseLabel({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <span className="font-semibold text-[#6CBE45]">{children}</span>
    );
  }
  return (
    <motion.span
      className="inline-block font-semibold text-[#6CBE45]"
      style={{ transformOrigin: "center" }}
      animate={{ opacity: [1, 0.55, 1], scale: [1, 1.06, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

/* -------------------------------------------------------------------------- */
/*                                  Logo                                       */
/* -------------------------------------------------------------------------- */

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Central Texas Holistic Care, Home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      {/* Plain <img> on purpose: bypasses next/image optimization which has
          intermittently failed to swap in the optimized variant during dev,
          leaving the logo blank. The asset is small and brand-critical. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Central Texas Holistic Care"
        width={1536}
        height={447}
        decoding="async"
        fetchPriority="high"
        className="block h-10 w-auto sm:h-11 lg:h-12"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Desktop nav menu                               */
/* -------------------------------------------------------------------------- */

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu.Root className="relative hidden xl:block">
      <NavigationMenu.List className="flex items-center gap-0.5">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);

          if (!item.children) {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild active={active}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13.5px] font-medium tracking-wide transition-colors",
                      active
                        ? "bg-[#1a3a0a]/8 text-[#1a3a0a]"
                        : "text-stone-700 hover:bg-[#1a3a0a]/5 hover:text-[#1a3a0a]",
                    )}
                  >
                    {item.pulse ? (
                      <PulseLabel>{item.label}</PulseLabel>
                    ) : (
                      item.label
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#6CBE45] via-[#1a3a0a] to-[#C4A862]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Trigger asChild>
                <div
                  className={cn(
                    "group relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-full text-[13.5px] font-medium tracking-wide transition-colors",
                    active
                      ? "bg-[#1a3a0a]/8 text-[#1a3a0a]"
                      : "text-stone-700 hover:bg-[#1a3a0a]/5 hover:text-[#1a3a0a]",
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="relative inline-flex items-center rounded-l-full py-1.5 pl-2.5 pr-1"
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#6CBE45] via-[#1a3a0a] to-[#C4A862]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </Link>
                  <span
                    aria-hidden
                    className="inline-flex items-center rounded-r-full py-1.5 pl-0.5 pr-2.5"
                  >
                    <ChevronDown
                      className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </span>
                </div>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-3 w-[420px] overflow-hidden rounded-2xl border border-stone-200/70 bg-white/95 shadow-2xl shadow-[#1a3a0a]/10 backdrop-blur-md"
                >
                  {/* gold accent strip */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#C4A862] to-transparent"
                  />
                  <ul className="grid gap-0.5 p-3">
                    {!item.hideOverview && (
                      <li>
                        <Link
                          href={item.href}
                          className="group/sub flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[color:var(--color-soft-green)]"
                        >
                          <span className="flex-1">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6f30]">
                              Overview
                            </span>
                            <span className="mt-0.5 block text-sm text-stone-600">
                              All {item.label} services at a glance.
                            </span>
                          </span>
                          <ArrowRight className="size-4 -translate-x-1 text-[#1a3a0a] opacity-0 transition-all group-hover/sub:translate-x-0 group-hover/sub:opacity-100" />
                        </Link>
                      </li>
                    )}
                    {!item.hideOverview && (
                      <li aria-hidden>
                        <span className="mx-3 my-1 block h-px bg-stone-200/80" />
                      </li>
                    )}
                    {item.children.map((child) => (
                      <li key={`${child.label}-${child.href}`}>
                        <Link
                          href={child.href}
                          className="group/sub relative flex items-start gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[color:var(--color-soft-green)]"
                        >
                          {/* left accent bar on hover */}
                          <span
                            aria-hidden
                            className="absolute left-1 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#6CBE45] opacity-0 transition-opacity group-hover/sub:opacity-100"
                          />
                          <span className="flex-1 pl-2">
                            <span className="block text-sm font-semibold text-stone-900 transition-colors group-hover/sub:text-[#1a3a0a]">
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-stone-500">
                              {child.description}
                            </span>
                          </span>
                          <ArrowRight className="mt-1 size-3.5 -translate-x-1 text-[#1a3a0a] opacity-0 transition-all group-hover/sub:translate-x-0 group-hover/sub:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* footer CTA */}
                  <div className="flex items-center justify-between gap-3 border-t border-stone-200/70 bg-[color:var(--color-cream-soft)] px-4 py-3">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">
                      Most insurance accepted
                    </span>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3a0a] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#2D5016]"
                    >
                      Book Appointment
                      <ArrowRight className="size-3" />
                    </a>
                  </div>
                </motion.div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      <div className="absolute left-0 top-full">
        <NavigationMenu.Viewport className="relative" />
      </div>
    </NavigationMenu.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Mobile drawer                                 */
/* -------------------------------------------------------------------------- */

function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-stone-900/40 xl:hidden"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(360px,94vw)] flex-col overflow-y-auto rounded-l-3xl bg-white shadow-2xl xl:hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-3 backdrop-blur">
              <Link
                href="/"
                onClick={onClose}
                aria-label="Central Texas Holistic Care, Home"
                className="inline-flex shrink-0 items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Central Texas Holistic Care"
                  width={1536}
                  height={447}
                  decoding="async"
                  className="block h-9 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex size-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:border-[#6CBE45] hover:bg-[#f0f5eb] hover:text-[#1a3a0a]"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2 px-4 pt-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-[#1a3a0a]/25 ring-1 ring-[#C4A862]/30"
              >
                <CalendarCheck className="size-3.5 text-[#C4A862]" />
                Book Now
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={onClose}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#1a3a0a]/15 bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1a3a0a]"
              >
                <Phone className="size-3.5 text-[#6CBE45]" />
                Call Us
              </a>
            </div>

            <nav className="flex-1 px-3 py-4">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                Menu
              </p>
              <ul className="flex flex-col gap-0.5">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  const isExpanded = expanded === item.href;

                  if (!item.children) {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors",
                            active
                              ? "bg-[#f0f5eb] text-[#1a3a0a]"
                              : "text-stone-800 hover:bg-stone-50",
                          )}
                        >
                          {item.pulse ? (
                            <PulseLabel>{item.label}</PulseLabel>
                          ) : (
                            item.label
                          )}
                          <ArrowRight className="size-4 text-stone-300" />
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isExpanded ? null : item.href)
                        }
                        aria-expanded={isExpanded}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors",
                          active
                            ? "bg-[#f0f5eb] text-[#1a3a0a]"
                            : "text-stone-800 hover:bg-stone-50",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 text-stone-500 transition-transform",
                            isExpanded && "rotate-180 text-[#1a3a0a]",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {!item.hideOverview && (
                              <li>
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="block rounded-lg px-3 py-2 text-[13.5px] text-stone-600 hover:bg-stone-50"
                                >
                                  Overview
                                </Link>
                              </li>
                            )}
                            {item.children.map((child) => (
                              <li key={`${child.label}-${child.href}`}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-[13.5px] transition-colors",
                                    pathname === child.href
                                      ? "font-semibold text-[#1a3a0a]"
                                      : "text-stone-600 hover:bg-stone-50",
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 rounded-2xl border border-stone-200 bg-[color:var(--color-cream-soft)] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6f30]">
                  Visit Us
                </p>
                <div className="mt-2 flex items-start gap-2 text-[12.5px] leading-snug text-stone-600">
                  <MapPin className="mt-0.5 size-4 flex-none text-[#8BAD5A]" />
                  {ADDRESS}
                </div>
                <div className="mt-3 h-px bg-stone-200" />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#1a3a0a]"
                >
                  <Phone className="size-4 text-[#6CBE45]" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Navbar                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top utility bar, insurance & financing visibility (scrolls away) */}
      <div className="hidden bg-gradient-to-r from-[#0f2706] via-[#1a3a0a] to-[#0f2706] text-[#FAF6EE] lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 font-medium">
              <ShieldCheck className="size-3.5 text-[#C4A862]" />
              Accepting most insurance plans
            </span>
            <span aria-hidden className="h-3 w-px bg-[#C4A862]/30" />
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#C4A862]"
            >
              <Phone className="size-3.5 text-[#C4A862]" />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="flex items-center gap-5 text-[#FAF6EE]/85">
            <span className="hidden items-center gap-2 xl:inline-flex">
              <MapPin className="size-3.5 text-[#C4A862]" />
              {ADDRESS}
            </span>
            <Link
              href="/payment-plans/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A862]/40 bg-[#C4A862]/15 px-3 py-1 font-semibold text-[#FAF6EE] transition-colors hover:border-[#C4A862] hover:bg-[#C4A862]/25"
            >
              0% APR financing · Cherry &amp; Denefits
              <ArrowRight className="size-3 text-[#C4A862]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar (sticky) */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-stone-200 bg-white/95 shadow-md shadow-[#1a3a0a]/5 backdrop-blur-md"
            : "border-[#1a3a0a]/12 bg-[color:var(--color-cream-soft)]/95 backdrop-blur",
        )}
      >
        {/* gold hairline accent on rest state */}
        {!scrolled && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
          />
        )}
        <div
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 transition-all duration-300 sm:gap-3 sm:px-6 lg:gap-5 lg:px-8 xl:grid-cols-[auto_1fr_auto]",
            scrolled ? "h-[52px] lg:h-[60px]" : "h-14 lg:h-[68px]",
          )}
        >
          <Logo />

          <div className="flex items-center justify-center">
            <DesktopMenu pathname={pathname} />
          </div>

          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            {/* Phone: icon-only on tablet, hidden on very small mobile */}
            <a
              href={`tel:${PHONE_TEL}`}
              aria-label={`Call ${PHONE_DISPLAY}`}
              title={PHONE_DISPLAY}
              className="hidden size-10 items-center justify-center rounded-full border border-[#1a3a0a]/15 bg-white/70 text-[#1a3a0a] backdrop-blur transition-colors hover:border-[#6CBE45] hover:bg-[#f0f5eb] sm:inline-flex"
            >
              <Phone className="size-4 text-[#6CBE45]" />
              <span className="sr-only">{PHONE_DISPLAY}</span>
            </a>

            {/* Book Appointment: full label on sm+, icon-only pill on mobile */}
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an appointment"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group relative inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-br from-[#2D5016] via-[#1a3a0a] to-[#0f2706] text-white shadow-lg shadow-[#1a3a0a]/30 ring-1 ring-[#C4A862]/30 transition-all hover:shadow-xl hover:shadow-[#1a3a0a]/40 sm:px-4 sm:py-2 sm:text-[13px] sm:font-semibold size-10 justify-center sm:size-auto"
            >
              {/* subtle gold sheen */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-10 hidden w-10 -skew-x-12 bg-gradient-to-r from-transparent via-[#C4A862]/30 to-transparent transition-transform duration-700 group-hover:translate-x-[260%] sm:block"
              />
              <CalendarCheck className="size-4 text-[#C4A862] sm:size-3.5" />
              <span className="hidden sm:inline">Book Appointment</span>
              <ArrowRight className="hidden size-3.5 transition-transform group-hover:translate-x-0.5 sm:inline" />
            </motion.a>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#1a3a0a]/15 bg-white/70 text-[#1a3a0a] backdrop-blur transition-colors hover:border-[#6CBE45] hover:bg-[#f0f5eb] xl:hidden"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
