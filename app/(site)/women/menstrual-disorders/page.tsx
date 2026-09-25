import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import WomenSubpageClient from "@/components/women/WomenSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/women/menstrual-disorders/`;

const PAGE_TITLE = "Menstrual Disorders | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Individualized care for irregular, painful, or heavy periods in Killeen, TX. We diagnose and treat menstrual disorders and hormonal imbalances at CTHC.";

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
  return cmsMetadata("/women/menstrual-disorders", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Women",
      item: `${SITE_URL}/women/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Menstrual Disorders",
      item: CANONICAL,
    },
  ],
};

const medicalConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Menstrual Disorders",
  url: CANONICAL,
  description:
    "Irregular, painful, or heavy periods that may signal underlying menstrual disorders or hormonal imbalances. Evaluated and treated through a thorough, individualized approach.",
  associatedAnatomy: {
    "@type": "AnatomicalStructure",
    name: "Reproductive system",
  },
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Individualized menstrual disorder treatment and hormone balance",
  },
};

export default function MenstrualDisordersPage() {
  return (
    <CMSRoute path="/women/menstrual-disorders">
    <>
      <Script
        id="ld-menstrual-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-menstrual-condition"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalConditionSchema),
        }}
      />
      <WomenSubpageClient
        h1="Menstrual Disorders"
        breadcrumbLabel="Menstrual Disorders"
        eyebrow="Menstrual Care"
        heroSubtitle="A thorough, individualized approach to diagnosing and treating irregular, painful, or heavy periods."
        h2="Menstrual Disorder Evaluation & Hormonal Support"
        h2Accent="Evaluation & Hormonal Support"
        body="Irregular, painful, or heavy periods can be signs of underlying menstrual disorders or hormonal imbalances. At Central Texas Holistic Care, we take a thorough, individualized approach to uncover the root cause of your symptoms."
        closingNote="Whether you're dealing with PMS, PCOS, endometriosis, or unexplained irregularities, our team will design a treatment plan that supports hormonal balance and restores your well-being."
        iconKey="droplets"
        trust={[
          { iconKey: "shieldCheck", label: "Provider-led" },
          { iconKey: "heartPulse", label: "Cycle-focused" },
          { iconKey: "sparkles", label: "Individualized care" },
        ]}
        highlights={[
          "Cycle evaluation",
          "Hormone balance",
          "Individualized care",
        ]}
        image={{
          src: "/images/services/menstrual-disorder.jpg",
          alt: "Menstrual disorder care at Central Texas Holistic Care",
        }}
        checklists={[
          {
            eyebrow: "What's Included",
            title: "Your Menstrual Disorder Assessment Includes",
            titleAccent: "Disorder Assessment",
            items: [
              {
                label: "Comprehensive consultation",
                detail:
                  "A detailed interview to understand your cycle history, symptoms, and overall health.",
                iconKey: "messageCircle",
              },
              {
                label: "Hormone testing",
                detail:
                  "A blood draw to identify imbalances in estrogen, progesterone, and other key reproductive hormones.",
                iconKey: "beaker",
              },
            ],
          },
          {
            eyebrow: "Conditions We Address",
            title: "Conditions We Diagnose & Treat",
            titleAccent: "Diagnose & Treat",
            items: [
              {
                label: "PMS & PMDD",
                detail: "Cyclic mood, pain, and physical symptom relief.",
                iconKey: "heartPulse",
              },
              {
                label: "PCOS",
                detail:
                  "Hormone and metabolic support for polycystic ovary syndrome.",
                iconKey: "activity",
              },
              {
                label: "Endometriosis",
                detail:
                  "Coordinated evaluation and pain-focused care planning.",
                iconKey: "microscope",
              },
              {
                label: "Unexplained irregularities",
                detail:
                  "Root-cause workup for cycles that don't fit a single diagnosis.",
                iconKey: "stethoscope",
              },
            ],
          },
        ]}
        whyPillars={[
          {
            iconKey: "microscope",
            title: "Root-cause focused",
            body: "We look beyond the symptom to the hormonal, metabolic, and lifestyle drivers behind it.",
          },
          {
            iconKey: "beaker",
            title: "Lab-guided treatment",
            body: "Hormone panels, thyroid, and metabolic markers inform every recommendation, not guesswork.",
          },
          {
            iconKey: "heartPulse",
            title: "Individualized care",
            body: "Plans are built for your cycle, your goals, and your life stage, and adjusted as you heal.",
          },
        ]}
        faqs={[
          {
            q: "What counts as a 'normal' cycle?",
            a: "Cycles generally range from 21-35 days with 2-7 days of bleeding. Heavy flow, severe pain, or significant variation month-to-month are worth evaluating.",
          },
          {
            q: "What's the difference between PMS and PMDD?",
            a: "PMS involves predictable cyclic symptoms (mood, bloating, cramps). PMDD is a more severe form with significant mood and functional impact in the days before your period.",
          },
          {
            q: "How is PCOS diagnosed?",
            a: "Diagnosis combines cycle history, hormone labs (including androgens), and sometimes imaging. We take care to rule out other causes of similar symptoms.",
          },
          {
            q: "What treatment options do you offer?",
            a: "Plans may include lifestyle and nutrition support, targeted supplementation, hormonal balancing, and medication when appropriate, chosen with you, not for you.",
          },
        ]}
        related={[
          {
            title: "Gynecological Exams",
            href: "/women/gynecological-exams/",
            blurb: "Routine, compassionate gynecological screening and care.",
            iconKey: "stethoscope",
          },
          {
            title: "Menopausal Disorders",
            href: "/women/menopausal-disorders/",
            blurb: "Comprehensive menopausal assessment and personalized care.",
            iconKey: "sun",
          },
          {
            title: "Hormone Therapy",
            href: "/hormone-therapy/",
            blurb: "Bioidentical hormones, pellets & BHRT tailored to your labs.",
            iconKey: "activity",
          },
        ]}
        ctaHeading={{ lead: "Get back to a", accent: "cycle that works for you." }}
        ctaSubline="Schedule a focused evaluation and build a plan that addresses the root cause."
      />
    </>
      </CMSRoute>
  );
}
