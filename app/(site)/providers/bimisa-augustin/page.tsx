import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/providers/bimisa-augustin/`;
const PAGE_TITLE = "Bimisa Augustin, DNP, FNP-C, PMHNP-BC | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, is a nurse practitioner at Central Texas Holistic Care in Killeen, TX. 26 years of clinical experience, including 10 years and six combat deployments with the U.S. Army.";
const BOOKING =
  "https://www.tebra.com/care/provider/bimisa-augustin-dnp-msn-aprnfnp-c-1043765431?lid=2324997788/";

const pageMetadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    type: "profile",
    siteName: "Central Texas Holistic Care",
  },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/providers/bimisa-augustin", pageMetadata);
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bimisa Augustin",
  honorificSuffix: "DNP, FNP-C, PMHNP-BC",
  jobTitle: "Doctor of Nursing Practice, Family Nurse Practitioner, Psychiatric Mental Health Nurse Practitioner",
  url: CANONICAL,
  worksFor: {
    "@type": "MedicalClinic",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
    telephone: "+1-254-213-2423",
    address: {
      "@type": "PostalAddress",
      streetAddress: "311 E. Stan Schlueter Loop #207",
      addressLocality: "Killeen",
      addressRegion: "TX",
      postalCode: "76542",
    },
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Mary Hardin-Baylor" },
    { "@type": "CollegeOrUniversity", name: "Maryville University" },
    { "@type": "CollegeOrUniversity", name: "The University of Alabama" },
  ],
};

export default function BimisaAugustinPage() {
  return (
    <CMSRoute path="/providers/bimisa-augustin">
      <Script
        id="ld-bimisa"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <article className="bg-[var(--color-cream)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Provider · Killeen, TX
          </p>
          <h1 className="mt-3 font-heading text-4xl font-light text-[var(--color-forest)] sm:text-5xl">
            Bimisa Augustin, DNP, FNP-C, PMHNP-BC
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted,#6B6B6B)]">
            Doctor of Nursing Practice. Family nurse practitioner and psychiatric mental health nurse practitioner at Central Texas Holistic Care, 311 E. Stan Schlueter Loop, Suite 207, Killeen.
          </p>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
            <p>
              Bimisa Augustin has 26 years of clinical experience. Ten of those years were with the U.S. Army, including six combat deployments. That service is the reason her visits start with what is actually getting in the way of daily life, not a checklist of products.
            </p>
            <p>
              Her training is a Bachelor of Science in Nursing from the University of Mary Hardin-Baylor, a Master of Science in Nursing as a family nurse practitioner from Maryville University, a Doctor of Nursing Practice from the University of Alabama, and postgraduate certification as a psychiatric mental health nurse practitioner. She is licensed as a nurse practitioner. She is not a physician, and hormone and wellness plans at this clinic are clinician-directed from her evaluation and from the labs.
            </p>
            <p>
              Patients see her for bioidentical hormone therapy, metabolic and wellness concerns, and the overlap between hormones, sleep, mood, and energy. Psychiatric training is part of how she reads fatigue and mood change. It does not turn a hormone visit into a psychiatry intake. If the labs and the history point somewhere else, she says so before a protocol starts.
            </p>
            <p>
              The clinic is in Killeen and serves Harker Heights, Copperas Cove, Belton, Temple, and the rest of the Bell and Coryell County towns listed on the areas page. Booking is with her directly through the clinic scheduler.
            </p>
            <p>
              She describes the goal of a visit in one line: she wants clients to thrive, not just survive.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "26 years of clinical experience",
              "10 years, U.S. Army, six combat deployments",
              "BSN, University of Mary Hardin-Baylor",
              "MSN, Maryville University (FNP)",
              "DNP, The University of Alabama",
              "Postgraduate PMHNP certification",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white px-4 py-3 text-sm text-[var(--color-forest)]"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-white"
            >
              Book with Bimisa Augustin
            </a>
            <Link href="/about-us/" className="inline-flex rounded-full border border-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-[var(--color-forest)]">
              Back to the team
            </Link>
            <a href="tel:+12542132423" className="inline-flex items-center text-sm font-semibold text-[var(--color-forest)]">
              (254) 213-2423
            </a>
          </div>
        </div>
      </article>
    </CMSRoute>
  );
}
