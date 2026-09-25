import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import IVSubpageClient from "@/components/iv/IVSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/iv-nutrition/immune-booster/`;

const PAGE_TITLE = "Immune Booster IV Therapy | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Immune Booster IV Therapy in Harker Heights, TX. IV fluids, B-complex, B12, vitamin C, glutathione, and zinc to strengthen defenses before travel or illness.";

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
  return cmsMetadata("/iv-nutrition/immune-booster", pageMetadata);
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
      name: "Immune Booster",
      item: CANONICAL,
    },
  ],
};

const therapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Immune Booster IV Therapy",
  alternateName: "Immune Support IV Drip",
  description:
    "Physician-supervised IV infusion of fluids, B-complex, B12, vitamin C, glutathione, and zinc designed to strengthen immune defense and accelerate recovery.",
  url: CANONICAL,
};

export default function ImmuneBoosterPage() {
  return (
    <CMSRoute path="/iv-nutrition/immune-booster">
    <>
      <Script
        id="ld-immune-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-immune-therapy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }}
      />
      <IVSubpageClient
        h1="Immune Booster"
        breadcrumbLabel="Immune Booster"
        eyebrow="Immune Booster IV"
        heroSubtitle="A targeted blend of fluids, vitamins, antioxidants, and minerals, built to defend, fortify, and recover."
        h2="Immune Booster IV Therapy: Strengthen Your Body's Defense"
        h2Accent="Strengthen Your Body's Defense"
        body="Give your immune system the powerful support it needs with our Immune Booster IV Therapy, a targeted blend of vitamins, antioxidants, and hydration designed to help your body fight off illness, recover faster, and feel revitalized."
        closingNote="Ideal during flu season, before travel, or whenever your immune system needs a lift, our IV therapy helps you stay protected, energized, and well."
        iconKey="shieldCheck"
        trust={[
          { iconKey: "shieldCheck", label: "Physician-supervised" },
          { iconKey: "droplets", label: "Sterile, single-use" },
          { iconKey: "sparkles", label: "Same-day relief" },
        ]}
        highlights={["Vitamin C + Zinc", "Glutathione boost", "Pre-travel ready"]}
        image={{
          src: `${SITE_URL}/wp-content/uploads/2025/06/Immune-Booster-IV-Therapy-Strengthen-Your-Bodys-Defense-pexels-jonathanborba-3076513-scaled.webp`,
          alt: "Immune Booster IV Therapy Strengthen Your Body's Defense",
        }}
        ingredients={{
          eyebrow: "What's Inside",
          title: "What's in the Immune Booster Drip?",
          titleAccent: "Immune Booster Drip?",
          items: [
            {
              name: "IV Fluids",
              detail:
                "Rehydrate and replenish your body to improve immunity and energy.",
              iconKey: "droplets",
            },
            {
              name: "Vitamin B Complex",
              detail:
                "Boost energy levels and support immune cell production.",
              iconKey: "battery",
            },
            {
              name: "Vitamin B12",
              detail:
                "An essential immunomodulator that increases white blood cell count.",
              iconKey: "zap",
            },
            {
              name: "Vitamin C",
              detail:
                "A potent antioxidant that reduces inflammation and enhances immune defense.",
              iconKey: "sun",
            },
            {
              name: "Glutathione",
              detail:
                "Fights oxidative stress, eases aches and pains, and supports detoxification.",
              iconKey: "shieldCheck",
            },
            {
              name: "Zinc",
              detail:
                "Helps white blood cells function optimally and may slow viral replication.",
              iconKey: "atom",
            },
          ],
        }}
        benefits={{
          eyebrow: "Why This Drip",
          title: "Built for resilience, not just recovery",
          titleAccent: "not just recovery",
          items: [
            {
              iconKey: "shieldCheck",
              title: "Stronger immune defense",
              body: "Antioxidants and zinc help your immune cells do their job, faster.",
            },
            {
              iconKey: "zap",
              title: "Faster bounce-back",
              body: "Hydration plus B-complex restores energy at the cellular level.",
            },
            {
              iconKey: "sparkles",
              title: "Travel & season ready",
              body: "Common pick before flights, big events, and the change of seasons.",
            },
          ],
        }}
        faqs={[
          {
            q: "How long does the Immune Booster drip take?",
            a: "Most infusions take 30-45 minutes from IV start to finish, including a brief intake and IV placement.",
          },
          {
            q: "When should I get this drip?",
            a: "Common timing: before travel, during flu season, at the first hint of illness, or after high-stress weeks.",
          },
          {
            q: "Is it safe to do regularly?",
            a: "Yes. Many patients schedule the Immune Booster monthly or seasonally, your provider will recommend cadence based on your goals.",
          },
          {
            q: "Will I feel different right away?",
            a: "Most patients notice improved hydration, energy, and mental clarity within hours; immune-defense effects build over the following 24-72 hours.",
          },
        ]}
        related={[
          {
            title: "Cold & Flu IV Therapy",
            href: "/iv-nutrition/cold-and-flu/",
            blurb: "Fight active symptoms fast with high-dose vitamin C and anti-inflammatory support.",
            iconKey: "snowflake",
          },
          {
            title: "Myer's Cocktail",
            href: "/iv-nutrition/myers-cocktail/",
            blurb: "The classic wellness infusion for energy, immunity, and relief.",
            iconKey: "sparkles",
          },
          {
            title: "Workout Recovery",
            href: "/iv-nutrition/workout-recovery/",
            blurb: "Rebuild faster with fluids, B-complex, taurine, and high-dose magnesium.",
            iconKey: "dumbbell",
          },
        ]}
        ctaHeading={{
          lead: "Strengthen the defense.",
          accent: "Skip the downtime.",
        }}
        ctaSubline="Book your Immune Booster IV and feel the difference within hours."
      />
    </>
      </CMSRoute>
  );
}
