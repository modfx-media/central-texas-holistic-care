import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import IVSubpageClient from "@/components/iv/IVSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/iv-nutrition/myers-cocktail/`;

const PAGE_TITLE = "Myer's Cocktail IV Therapy | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Myer's Cocktail IV Therapy in Harker Heights, TX. The time-tested infusion of fluids, B-complex, B12, vitamin C, and magnesium for energy and immunity.";

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
  return cmsMetadata("/iv-nutrition/myers-cocktail", pageMetadata);
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
      name: "Myer's Cocktail",
      item: CANONICAL,
    },
  ],
};

const therapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Myer's Cocktail IV Therapy",
  alternateName: "Classic Wellness IV Drip",
  description:
    "Physician-supervised Myer's Cocktail IV infusion of fluids, B-complex, B12, vitamin C, and magnesium designed for energy, immunity, and full-body relief.",
  url: CANONICAL,
};

export default function MyersCocktailPage() {
  return (
    <CMSRoute path="/iv-nutrition/myers-cocktail">
    <>
      <Script
        id="ld-myers-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-myers-therapy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }}
      />
      <IVSubpageClient
        h1="Myer's Cocktail"
        breadcrumbLabel="Myer's Cocktail"
        eyebrow="Myer's Cocktail IV"
        heroSubtitle="The time-tested wellness infusion of fluids, vitamins, and magnesium, for energy, immunity, and full-body relief."
        tagline="The Ultimate Wellness Infusion for Energy, Immunity & Relief"
        h2="Myer's Cocktail IV Therapy"
        h2Accent="IV Therapy"
        body="The Myer's Cocktail is a time-tested IV therapy blend designed to deliver immediate full-body hydration, increase energy, and alleviate chronic symptoms. Whether you're battling stress, fatigue, migraines, or immune challenges, this powerful infusion helps you feel recharged and restored from the inside out."
        closingNote="This all-in-one nutrient infusion is ideal for anyone seeking a natural health reset, whether for chronic conditions or everyday vitality."
        iconKey="sparkles"
        trust={[
          { iconKey: "shieldCheck", label: "Physician-supervised" },
          { iconKey: "droplets", label: "Sterile, single-use" },
          { iconKey: "heartPulse", label: "Time-tested formula" },
        ]}
        highlights={["Magnesium + B-complex", "Energy & clarity", "Whole-body reset"]}
        image={{
          src: "/images/services/myers-cocktail-iv-therapy-v3.png",
          alt: "Myer's Cocktail IV therapy at Central Texas Holistic Care",
        }}
        ingredients={{
          eyebrow: "What's Inside",
          title: "What's Inside the Myer's Cocktail?",
          titleAccent: "Myer's Cocktail?",
          items: [
            {
              name: "IV Fluids",
              detail: "Deep hydration to support circulation, detox, and energy.",
              iconKey: "droplets",
            },
            {
              name: "Vitamin B Complex",
              detail:
                "Revitalizes your system and supports immune cell growth.",
              iconKey: "battery",
            },
            {
              name: "Vitamin B12",
              detail:
                "Stimulates red blood cell production and strengthens immunity.",
              iconKey: "zap",
            },
            {
              name: "Vitamin C",
              detail:
                "A powerful antioxidant that reduces inflammation and boosts defense.",
              iconKey: "sun",
            },
            {
              name: "Magnesium",
              detail:
                "Eases muscle tension, prevents headaches, and supports relaxation.",
              iconKey: "flame",
            },
          ],
        }}
        benefits={{
          eyebrow: "Key Benefits",
          title: "A reset for energy, mood, and immunity",
          titleAccent: "mood, and immunity",
          items: [
            {
              iconKey: "zap",
              title: "Rapid hydration for immediate energy and vitality",
            },
            {
              iconKey: "sparkles",
              title: "Enhanced mood and mental clarity",
            },
            {
              iconKey: "heartPulse",
              title: "Reduced fatigue, stress, and anxiety",
            },
            {
              iconKey: "flame",
              title:
                "Relief from inflammation, allergies, cramps, and migraines",
            },
            {
              iconKey: "shieldCheck",
              title: "Boosted immune system function",
            },
            {
              iconKey: "leaf",
              title: "A balanced dose of essential nutrients for optimal wellness",
            },
          ],
        }}
        faqs={[
          {
            q: "What is a Myer's Cocktail?",
            a: "It's the classic, time-tested IV nutrient formula originally developed by Dr. John Myers, a balanced mix of B-vitamins, vitamin C, and magnesium designed for energy, immunity, and symptom relief.",
          },
          {
            q: "Who is it best for?",
            a: "Anyone seeking a whole-body reset, common picks include people dealing with fatigue, migraines, chronic stress, allergies, or frequent illness.",
          },
          {
            q: "How often can I get it?",
            a: "Many patients schedule monthly; some use it weekly during a high-symptom period. Your provider will tailor cadence to your goals.",
          },
          {
            q: "How quickly will I feel a difference?",
            a: "Most patients report improved energy, hydration, and clarity within hours of the infusion.",
          },
        ]}
        related={[
          {
            title: "Immune Booster",
            href: "/iv-nutrition/immune-booster/",
            blurb: "Stronger antioxidant + zinc focus for active immune support.",
            iconKey: "shieldCheck",
          },
          {
            title: "Workout Recovery",
            href: "/iv-nutrition/workout-recovery/",
            blurb: "Amino acids and high-dose magnesium for post-training rebuild.",
            iconKey: "dumbbell",
          },
          {
            title: "Cold & Flu IV",
            href: "/iv-nutrition/cold-and-flu/",
            blurb: "Targeted relief and shortened illness duration.",
            iconKey: "snowflake",
          },
        ]}
        ctaHeading={{
          lead: "Reset from the",
          accent: "inside out.",
        }}
        ctaSubline="Book the Myer's Cocktail and feel the difference within hours."
      />
    </>
      </CMSRoute>
  );
}
