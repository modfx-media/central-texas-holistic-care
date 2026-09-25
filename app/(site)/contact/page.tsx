import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";
import { Clock, MapPin, Phone } from "lucide-react";

import PageHero from "@/components/layout/PageHero";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/contact/`;

const PHONE_DISPLAY = "(254) 213-2423";
const PHONE_TEL = "+12542132423";
const ADDRESS_LINE_1 = "311 E. Stan Schlueter Loop, Suite 207";
const ADDRESS_LINE_2 = "Killeen, TX 76542";

const PAGE_TITLE = "Contact Us | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Contact Central Texas Holistic Care in Killeen, TX. Ask about hormone therapy, IV nutrition, TRT, weight loss, and wellness services, or book an appointment.";

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
  return cmsMetadata("/contact", pageMetadata);
}

export default function ContactPage() {
  return (
    <CMSRoute path="/contact">
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have a question or ready to start? Send us a message and our care team will get back to you shortly."
        backgroundImage="/images/blog-page-banner-img.jpeg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact/" },
        ]}
      />

      <section className="bg-[color:var(--color-cream-soft)] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14 lg:px-8">
          {/* Contact details */}
          <aside className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C4A862]/40 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6f30]">
                We&apos;re here to help
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1a3a0a] sm:text-4xl">
                Reach the clinic directly
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">
                Prefer to talk to a real person? Call, email, or drop by. We respond
                to messages within one business day.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-0.5 block text-base font-semibold text-[#1a3a0a] hover:underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Visit us
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-[#1a3a0a]">
                    {ADDRESS_LINE_1}
                  </p>
                  <p className="text-sm text-stone-600">{ADDRESS_LINE_2}</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1a3a0a]/8 text-[#1a3a0a]">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Hours
                  </p>
                  <p className="mt-0.5 text-sm text-stone-700">Mon - Fri · 8:00 am - 5:00 pm</p>
                  <p className="text-sm text-stone-700">Sat - Sun · Closed</p>
                </div>
              </li>
            </ul>
          </aside>

          {/* Form */}
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-[#1a3a0a]/5">
            <div className="border-b border-stone-200 bg-gradient-to-br from-[#f7f5ee] via-white to-[#f7f5ee] px-6 py-5 sm:px-8">
              <h3 className="text-xl font-semibold text-[#1a3a0a] sm:text-2xl">
                Send us a message
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                Fill out the form and we&apos;ll be in touch shortly.
              </p>
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-4">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/STmad3OWNbOfgOfBUVsr"
                id="inline-STmad3OWNbOfgOfBUVsr"
                title="Contact form"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form 0"
                data-height="650"
                data-layout-iframe-id="inline-STmad3OWNbOfgOfBUVsr"
                data-form-id="STmad3OWNbOfgOfBUVsr"
                style={{
                  width: "100%",
                  minHeight: 650,
                  border: "none",
                  borderRadius: 0,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
      </CMSRoute>
  );
}
