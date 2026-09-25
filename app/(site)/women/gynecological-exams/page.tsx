import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import WomenSubpageClient from "@/components/women/WomenSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/women/gynecological-exams/`;

const PAGE_TITLE = "Gynecological Exams | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Compassionate gynecological care at Central Texas Holistic Care: routine exams, cervical cancer screening, STI testing, and hormone evaluation in Killeen, TX.";

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
  return cmsMetadata("/women/gynecological-exams", pageMetadata);
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
      name: "Gynecological Exams",
      item: CANONICAL,
    },
  ],
};

const medicalProcedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Gynecological Exam",
  alternateName: "Women's Annual Gynecological Exam",
  url: CANONICAL,
  description:
    "A routine gynecological exam to monitor reproductive health and screen for cervical cancer, STIs, and hormonal imbalances.",
  procedureType: "https://schema.org/DiagnosticProcedure",
  provider: {
    "@type": "MedicalOrganization",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
  },
};

export default function GynecologicalExamsPage() {
  return (
    <CMSRoute path="/women/gynecological-exams">
    <>
      <Script
        id="ld-gyne-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-gyne-procedure"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalProcedureSchema),
        }}
      />
      <WomenSubpageClient
        h1="Gynecological Exams"
        breadcrumbLabel="Gynecological Exams"
        eyebrow="Gynecological Exams"
        heroSubtitle="Routine, compassionate gynecological care to monitor reproductive health and catch concerns early."
        h2="Comprehensive Gynecological Exams for Women's Health"
        h2Accent="for Women's Health"
        body="A routine gynecological exam is essential for monitoring reproductive health and detecting early signs of disease. During your visit, our providers perform a thorough breast and pelvic examination to ensure everything is functioning as it should."
        closingNote="At Central Texas Holistic Care, we provide compassionate, discreet, and expert care tailored to every stage of a woman's life."
        iconKey="stethoscope"
        trust={[
          { iconKey: "shieldCheck", label: "Provider-led" },
          { iconKey: "heartPulse", label: "Compassionate care" },
          { iconKey: "sparkles", label: "Every life stage" },
        ]}
        highlights={[
          "Routine screening",
          "Early detection",
          "Compassionate care",
        ]}
        image={{
          src: "/images/services/gyne-overview.png",
          alt: "Comprehensive gynecological exams for women's health",
        }}
        heroBackground="/images/services/gyne-hero-banner.png"
        checklists={[
          {
            eyebrow: "What's Included",
            title: "What's Included in a Gynecological Exam",
            titleAccent: "Gynecological Exam",
            items: [
              {
                label: "Breast exam",
                detail:
                  "To check for lumps, abnormalities, or signs of breast cancer.",
                iconKey: "heartPulse",
              },
              {
                label: "Pelvic exam",
                detail:
                  "A physical evaluation of the vagina, cervix, uterus, fallopian tubes, and ovaries.",
                iconKey: "stethoscope",
              },
            ],
          },
          {
            eyebrow: "Early Detection",
            title: "These Exams Help Identify Conditions Such As",
            titleAccent: "Conditions Such As",
            items: [
              {
                label: "Breast abnormalities or changes",
                iconKey: "activity",
              },
              {
                label: "Pelvic Inflammatory Disease (PID)",
                iconKey: "microscope",
              },
              {
                label: "Infections or reproductive health concerns",
                iconKey: "shieldCheck",
              },
            ],
          },
        ]}
        whyPillars={[
          {
            iconKey: "shieldCheck",
            title: "Provider-led",
            body: "Every exam is performed and reviewed by our clinicians, thorough, attentive, and never rushed.",
          },
          {
            iconKey: "heartPulse",
            title: "Compassionate & discreet",
            body: "A calm, private setting and unhurried conversation so you feel heard and respected.",
          },
          {
            iconKey: "sparkles",
            title: "Whole-woman care",
            body: "We connect your gynecological health to hormones, lifestyle, and overall wellness, not just the visit in front of us.",
          },
        ]}
        faqs={[
          {
            q: "How often should I have a gynecological exam?",
            a: "For most adult women, a yearly visit is recommended. We'll tailor cadence to your age, history, and any current concerns.",
          },
          {
            q: "What happens during the visit?",
            a: "After a focused conversation about your symptoms and history, your provider performs a breast and pelvic exam, then orders any indicated screenings or labs.",
          },
          {
            q: "Do I need a Pap smear?",
            a: "Pap and HPV screening cadence depends on your age and prior results. Your provider will recommend the right schedule based on current guidelines and your history.",
          },
          {
            q: "How should I prepare?",
            a: "Bring a list of current medications, prior results if you have them, and a note of any symptoms or questions. Try to avoid scheduling on your period when possible.",
          },
        ]}
        related={[
          {
            title: "Menopausal Disorders",
            href: "/women/menopausal-disorders/",
            blurb: "Comprehensive menopausal assessment and personalized care.",
            iconKey: "sun",
          },
          {
            title: "Menstrual Disorders",
            href: "/women/menstrual-disorders/",
            blurb: "Root-cause evaluation for irregular, painful, or heavy cycles.",
            iconKey: "droplets",
          },
          {
            title: "Hormone Therapy",
            href: "/hormone-therapy/",
            blurb: "Bioidentical hormones, pellets & BHRT tailored to your labs.",
            iconKey: "activity",
          },
        ]}
        ctaHeading={{ lead: "Care that listens , ", accent: "and looks ahead." }}
        ctaSubline="Book your gynecological exam and walk out with a clear, personalized plan."
      />
    </>
      </CMSRoute>
  );
}
