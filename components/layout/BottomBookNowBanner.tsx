"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";
const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const SHOW_AFTER_PX = 600;
const DISMISS_KEY = "cthc-book-banner-dismissed";

export default function BottomBookNowBanner() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    queueMicrotask(() => {
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === "1") {
          setDismissed(true);
        }
      } catch {
        /* ignore storage errors */
      }
    });
    const onScroll = () => {
      setScrolledPast(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
  };

  const visible = scrolledPast && !dismissed && !footerInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="book-now-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-5 sm:px-6"
        >
          <div
            role="region"
            aria-label="Book an appointment"
            className="pointer-events-auto relative flex w-full max-w-3xl items-center gap-3 overflow-hidden rounded-full border border-[#C4A862]/40 bg-gradient-to-br from-[#0f2706] via-[#1a3a0a] to-[#0b1d04] px-3 py-2.5 shadow-2xl shadow-[#0f2706]/40 backdrop-blur sm:gap-4 sm:px-5 sm:py-3"
          >
            {/* subtle gold sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C4A862]/60 to-transparent"
            />

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-[#C4A862]/20 text-[#C4A862] ring-1 ring-[#C4A862]/30 sm:inline-flex">
                <CalendarCheck className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-white sm:text-sm">
                  Ready to feel your best?
                </p>
                <p className="truncate text-[11px] text-white/75 sm:text-xs">
                  Provider-led · Killeen, TX
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-[#C4A862]/60 hover:bg-white/15"
              >
                <Phone className="size-4 text-[#C4A862]" />
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-br from-[#C4A862] via-[#8a6f30] to-[#5d4a1f] px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-black/25 ring-1 ring-[#C4A862]/40 transition hover:-translate-y-0.5 sm:px-5"
              >
                <CalendarCheck className="size-3.5" />
                Book Appointment
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

