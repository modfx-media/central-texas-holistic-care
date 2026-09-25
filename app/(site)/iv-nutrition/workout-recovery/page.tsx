import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import IVSubpageClient from "@/components/iv/IVSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/iv-nutrition/workout-recovery/`;

const PAGE_TITLE = "Workout Recovery IV Therapy | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Workout Recovery IV Therapy in Killeen, TX. Fluids, B-complex, B12, vitamin C, glutathione, zinc, taurine, and magnesium for faster muscle recovery.";

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
  return cmsMetadata("/iv-nutrition/workout-recovery", pageMetadata);
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
      name: "Workout Recovery",
      item: CANONICAL,
    },
  ],
};

const therapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Workout Recovery IV Therapy",
  alternateName: "Athletic Recovery IV Drip",
  description:
    "Clinician-supervised post-exercise IV infusion of fluids, amino acids, B-complex, vitamin C, glutathione, zinc, taurine, and high-dose magnesium to accelerate muscle repair and reduce inflammation.",
  url: CANONICAL,
};

export default function WorkoutRecoveryPage() {
  return (
    <CMSRoute path="/iv-nutrition/workout-recovery">
    <>
      <Script
        id="ld-workout-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-workout-therapy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }}
      />
      <IVSubpageClient
        h1="Workout Recovery"
        breadcrumbLabel="Workout Recovery"
        eyebrow="Workout Recovery IV"
        heroSubtitle="Refuel, rebuild, and bounce back, fluids, amino acids, and electrolytes delivered when your muscles can actually use them."
        tagline="Recharge. Rebuild. Refuel."
        h2="Workout Recovery IV Therapy"
        h2Accent="IV Therapy"
        body="Push past your limits and bounce back with strength using our Workout Recovery IV Therapy, a scientifically formulated blend of fluids, vitamins, and amino acids designed to accelerate muscle repair, reduce inflammation, and restore peak energy post-exercise."
        closingNote="Whether you're a competitive athlete or a weekend warrior, this IV therapy is your go-to recovery solution to train harder and recover smarter."
        iconKey="dumbbell"
        trust={[
          { iconKey: "shieldCheck", label: "Clinician-supervised" },
          { iconKey: "droplets", label: "Sterile, single-use" },
          { iconKey: "activity", label: "Athlete-trusted" },
        ]}
        highlights={[
          "Amino acids + Taurine",
          "High-dose Magnesium",
          "Post-training",
        ]}
        image={{
          src: "/images/iv/workout-recovery.webp",
          alt: "Workout Recovery IV Therapy",
        }}
        ingredients={{
          eyebrow: "What's Inside",
          title: "What's Inside the Recovery Drip?",
          titleAccent: "Recovery Drip?",
          items: [
            {
              name: "IV Fluids",
              detail:
                "Rapid hydration to restore electrolytes and prevent dehydration.",
              iconKey: "droplets",
            },
            {
              name: "Vitamin B Complex",
              detail:
                "Energizes the body and enhances protein and muscle metabolism.",
              iconKey: "battery",
            },
            {
              name: "Vitamin B12",
              detail:
                "Boosts stamina, supports red blood cell production, and reduces fatigue.",
              iconKey: "zap",
            },
            {
              name: "Vitamin C",
              detail:
                "Fights inflammation and promotes immune recovery post-workout.",
              iconKey: "sun",
            },
            {
              name: "Glutathione",
              detail:
                "Powerful antioxidant that alleviates muscle soreness and supports cellular detox.",
              iconKey: "shieldCheck",
            },
            {
              name: "Zinc",
              detail:
                "Speeds up healing, supports immune function, and repairs muscle tissues.",
              iconKey: "atom",
            },
            {
              name: "Taurine",
              detail:
                "Enhances endurance, reduces stress, and helps with mental focus.",
              iconKey: "activity",
            },
            {
              name: "High-Dose Magnesium (MIC)",
              detail:
                "Aids muscle recovery, improves circulation, and helps convert fat into usable energy.",
              iconKey: "flame",
            },
          ],
        }}
        benefits={{
          eyebrow: "Why This Drip",
          title: "Train harder. Recover smarter.",
          titleAccent: "Recover smarter.",
          items: [
            {
              iconKey: "dumbbell",
              title: "Faster muscle repair",
              body: "Amino acids and zinc support tissue rebuild after hard training.",
            },
            {
              iconKey: "flame",
              title: "Less soreness, more output",
              body: "Glutathione and high-dose magnesium calm inflammation and ease DOMS.",
            },
            {
              iconKey: "activity",
              title: "Sustained energy",
              body: "B-complex, B12, and taurine restore the energy systems your workout depleted.",
            },
          ],
        }}
        faqs={[
          {
            q: "When should I get the Workout Recovery drip?",
            a: "Best within 24 hours of a hard training session, competition, or long race. Many athletes also pre-load before big events.",
          },
          {
            q: "Will it help with cramps and muscle soreness?",
            a: "Yes, the high-dose magnesium and taurine are specifically chosen to ease cramping and post-exercise muscle soreness.",
          },
          {
            q: "How is this different from sports drinks?",
            a: "IV delivery bypasses the gut, meaning 100% absorption of electrolytes, amino acids, and B-vitamins, at clinically meaningful doses.",
          },
          {
            q: "Can I get this regularly during training blocks?",
            a: "Yes. Many endurance athletes schedule weekly during peak training and event prep.",
          },
        ]}
        related={[
          {
            title: "Myer's Cocktail",
            href: "/iv-nutrition/myers-cocktail/",
            blurb: "The classic wellness infusion for energy, immunity, and relief.",
            iconKey: "sparkles",
          },
          {
            title: "Immune Booster",
            href: "/iv-nutrition/immune-booster/",
            blurb: "Targeted antioxidant + immune support before travel or stress.",
            iconKey: "shieldCheck",
          },
          {
            title: "Hangover IV",
            href: "/iv-nutrition/hangover/",
            blurb: "Rapid rehydration, detox, and same-day recovery.",
            iconKey: "sunrise",
          },
        ]}
        ctaHeading={{
          lead: "Train hard.",
          accent: "Recover faster.",
        }}
        ctaSubline="Book the Workout Recovery drip and get back to peak, sooner."
      />
    </>
      </CMSRoute>
  );
}
