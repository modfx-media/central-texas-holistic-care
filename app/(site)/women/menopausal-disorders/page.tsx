import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import WomenSubpageClient from "@/components/women/WomenSubpageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/women/menopausal-disorders/`;

const PAGE_TITLE = "Menopausal Disorders | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Comprehensive menopausal care at Central Texas Holistic Care: guidance, symptom relief, and personalized plans to navigate menopause with comfort.";

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
  return cmsMetadata("/women/menopausal-disorders", pageMetadata);
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
      name: "Menopausal Disorders",
      item: CANONICAL,
    },
  ],
};

const medicalConditionSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Menopausal Disorders",
  url: CANONICAL,
  description:
    "Disruptive physical and emotional symptoms associated with the menopausal transition, evaluated and managed through comprehensive assessment and personalized care.",
  associatedAnatomy: { "@type": "AnatomicalStructure", name: "Endocrine system" },
  possibleTreatment: {
    "@type": "MedicalTherapy",
    name: "Menopausal management and hormone evaluation",
  },
};

export default function MenopausalDisordersPage() {
  return (
    <CMSRoute path="/women/menopausal-disorders">
    <>
      <Script
        id="ld-meno-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-meno-condition"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalConditionSchema),
        }}
      />
      <WomenSubpageClient
        h1="Menopausal Disorders"
        breadcrumbLabel="Menopausal Disorders"
        eyebrow="Menopausal Care"
        heroSubtitle="Navigate peri- and post-menopause with comprehensive assessments, symptom relief, and a plan built around you."
        h2="Menopausal Disorder Assessment & Care"
        h2Accent="Assessment & Care"
        body="Menopause is a natural transition, but it can bring disruptive physical and emotional symptoms. At Central Texas Holistic Care, we offer comprehensive menopausal assessments to help you navigate this stage with confidence and comfort."
        extraParagraphs={[
          "Common symptoms we evaluate include hot flashes, night sweats, mood swings, weight changes, fatigue, and low libido. Based on your results, we create a personalized treatment plan, often involving bioidentical hormone therapy or natural alternatives, to restore balance and improve quality of life.",
        ]}
        iconKey="sun"
        trust={[
          { iconKey: "shieldCheck", label: "Provider-led" },
          { iconKey: "heartPulse", label: "Symptom relief" },
          { iconKey: "sparkles", label: "Personalized plan" },
        ]}
        highlights={["Full assessment", "Symptom relief", "Personalized plan"]}
        image={{
          src: "/images/services/menopausal-disorder.jpg",
          alt: "Menopausal disorder care at Central Texas Holistic Care",
        }}
        checklists={[
          {
            eyebrow: "What to Expect",
            title: "What to Expect During a Menopausal Assessment",
            titleAccent: "Menopausal Assessment",
            items: [
              {
                label: "In-depth consultation",
                detail:
                  "A detailed discussion of your symptoms, lifestyle, and medical history.",
                iconKey: "messageCircle",
              },
              {
                label: "Hormone testing",
                detail:
                  "A blood draw to evaluate sex hormone levels and detect any deficiencies.",
                iconKey: "beaker",
              },
            ],
          },
          {
            eyebrow: "Symptoms We Evaluate",
            title: "Common Symptoms of Menopause",
            titleAccent: "Menopause",
            items: [
              { label: "Hot flashes", iconKey: "sun" },
              { label: "Night sweats", iconKey: "droplets" },
              { label: "Mood swings", iconKey: "heartPulse" },
              { label: "Weight changes", iconKey: "activity" },
              { label: "Fatigue", iconKey: "leaf" },
              { label: "Low libido", iconKey: "sparkles" },
            ],
          },
        ]}
        whyPillars={[
          {
            iconKey: "beaker",
            title: "Hormone-guided care",
            body: "We dose to your labs and your symptoms, and re-test to confirm you're feeling better, not just looking better on paper.",
          },
          {
            iconKey: "leaf",
            title: "BHRT & natural options",
            body: "Bioidentical hormone therapy or non-hormonal alternatives, we map the plan to your goals and your medical history.",
          },
          {
            iconKey: "heartPulse",
            title: "Whole-person plan",
            body: "Sleep, mood, body composition, bone and heart health, all tracked alongside your hormones, not in silos.",
          },
        ]}
        faqs={[
          {
            q: "When does menopause typically start?",
            a: "Most women experience menopause between ages 45 and 55, with perimenopausal changes often beginning years earlier. Symptoms and timing vary widely from person to person.",
          },
          {
            q: "Is bioidentical hormone therapy (BHRT) right for me?",
            a: "BHRT can be a safe, effective option for many women, but it isn't right for everyone. We review your full history, labs, and goals before recommending any plan.",
          },
          {
            q: "What lab work is typically done?",
            a: "We commonly evaluate estrogen, progesterone, testosterone, FSH, LH, thyroid panel, and key metabolic markers, adjusted to your individual concerns.",
          },
          {
            q: "Are there non-hormonal options?",
            a: "Yes. Lifestyle, targeted supplementation, and non-hormonal prescription options can meaningfully improve hot flashes, sleep, and mood when hormones aren't a fit.",
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
        ctaHeading={{
          lead: "Move through menopause with",
          accent: "confidence.",
        }}
        ctaSubline="Schedule a comprehensive menopausal assessment and get clarity on what's next."
      />
    </>
      </CMSRoute>
  );
}
