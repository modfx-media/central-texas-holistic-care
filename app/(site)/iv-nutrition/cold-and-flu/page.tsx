import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import IVSubpageClient from "@/components/iv/IVSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/iv-nutrition/cold-and-flu/`;

const PAGE_TITLE = "Cold & Flu IV Therapy | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Cold & Flu IV Therapy in Killeen, TX. Rapid rehydration, high-dose vitamin C, zinc, glutathione, and anti-inflammatory relief to shorten illness.";

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
  return cmsMetadata("/iv-nutrition/cold-and-flu", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "IV Infusion",
      item: `${SITE_URL}/iv-nutrition/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cold And Flu",
      item: CANONICAL,
    },
  ],
};

const therapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Cold & Flu IV Therapy",
  alternateName: "Viral Illness Recovery IV",
  description:
    "Clinician-supervised IV infusion of fluids, B-complex, B12, high-dose vitamin C, glutathione, zinc, and anti-inflammatory medication for symptom relief and faster recovery from cold or flu.",
  url: CANONICAL,
};

export default function ColdAndFluPage() {
  return (
    <CMSRoute path="/iv-nutrition/cold-and-flu">
    <>
      <Script
        id="ld-coldflu-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-coldflu-therapy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }}
      />
      <IVSubpageClient
        h1="Cold & Flu"
        breadcrumbLabel="Cold & Flu"
        eyebrow="Cold & Flu IV"
        heroSubtitle="Rapid rehydration, high-dose vitamin C, zinc, and symptom relief, designed to shorten viral illness and get you back on your feet."
        tagline="Fight Off Symptoms Fast. Rehydrate. Recover."
        h2="Cold & Flu IV Therapy"
        h2Accent="IV Therapy"
        body="Don't let cold or flu symptoms slow you down. Our Cold & Flu IV Therapy delivers targeted nutrients and hydration directly into your bloodstream to help you recover faster, reduce symptoms, and strengthen your immune system when you need it most."
        closingNote="Perfect for those battling seasonal flu, common cold, or viral fatigue, this IV therapy gives your body the immediate support it needs to heal faster and feel better."
        iconKey="snowflake"
        trust={[
          { iconKey: "shieldCheck", label: "Clinician-supervised" },
          { iconKey: "droplets", label: "Sterile, single-use" },
          { iconKey: "heartPulse", label: "Same-day relief" },
        ]}
        highlights={[
          "High-dose Vitamin C",
          "Anti-inflammatory relief",
          "Shortens illness",
        ]}
        image={{
          src: `${SITE_URL}/wp-content/uploads/2025/06/Cold-Flu-main-pexels-olly-3801394-scaled.webp`,
          alt: "Cold & Flu IV Therapy",
        }}
        ingredients={{
          eyebrow: "What's Inside",
          title: "What's Inside the Drip?",
          titleAccent: "the Drip?",
          items: [
            {
              name: "IV Fluids",
              detail:
                "Replenish lost fluids and electrolytes for instant hydration.",
              iconKey: "droplets",
            },
            {
              name: "Vitamin B Complex",
              detail: "Increases white blood cell count and energy.",
              iconKey: "battery",
            },
            {
              name: "Vitamin B12",
              detail: "Enhances immune response and reduces fatigue.",
              iconKey: "zap",
            },
            {
              name: "High-Dose Vitamin C",
              detail:
                "Powerful antioxidant that boosts immune function and reduces illness severity.",
              iconKey: "sun",
            },
            {
              name: "Glutathione",
              detail:
                "Anti-inflammatory powerhouse that relieves body aches and supports detox.",
              iconKey: "shieldCheck",
            },
            {
              name: "Zinc",
              detail: "Slows viral replication and shortens cold duration.",
              iconKey: "atom",
            },
            {
              name: "Anti-Inflammatory & Pain Relief Medication",
              detail:
                "Eases fever, body pain, and headaches quickly.",
              iconKey: "pill",
            },
          ],
        }}
        benefits={{
          eyebrow: "Key Benefits",
          title: "Less downtime. Faster recovery.",
          titleAccent: "Faster recovery.",
          items: [
            {
              iconKey: "droplets",
              title: "Rapid rehydration to combat fatigue and dehydration",
            },
            {
              iconKey: "shieldCheck",
              title: "Immune-boosting nutrients to fight infection",
            },
            {
              iconKey: "pill",
              title: "Relief from aches, fever, headaches, and body pain",
            },
            {
              iconKey: "flame",
              title: "Reduced inflammation and shorter illness duration",
            },
            {
              iconKey: "zap",
              title: "Energy restoration and faster recovery",
            },
          ],
        }}
        faqs={[
          {
            q: "When should I get the Cold & Flu IV?",
            a: "At the first sign of symptoms, sore throat, fatigue, congestion, or fever. The sooner you treat, the shorter the illness usually runs.",
          },
          {
            q: "Will it stop the cold or flu completely?",
            a: "No IV will cure a virus, but this drip is designed to reduce symptom severity, speed recovery, and ease the worst of the discomfort.",
          },
          {
            q: "Is it safe if I'm already on cold medication?",
            a: "Yes for most patients, your provider will review what you're taking before adding any meds to the drip.",
          },
          {
            q: "How long until I feel relief?",
            a: "Most patients feel meaningfully better within hours, especially from the hydration, pain, and anti-inflammatory support.",
          },
        ]}
        related={[
          {
            title: "Immune Booster",
            href: "/iv-nutrition/immune-booster/",
            blurb: "Build defense before illness strikes, common pre-travel pick.",
            iconKey: "shieldCheck",
          },
          {
            title: "Myer's Cocktail",
            href: "/iv-nutrition/myers-cocktail/",
            blurb: "The classic wellness infusion for energy, immunity, and relief.",
            iconKey: "sparkles",
          },
          {
            title: "Hangover IV",
            href: "/iv-nutrition/hangover/",
            blurb: "Same-day relief: hydration, detox, anti-nausea, pain support.",
            iconKey: "sunrise",
          },
        ]}
        ctaHeading={{
          lead: "Shorter illness.",
          accent: "Faster recovery.",
        }}
        ctaSubline="Book the Cold & Flu IV at the first sign of symptoms and skip the worst of it."
      />
    </>
      </CMSRoute>
  );
}
