import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import TestosteronePageClient from "./TestosteronePageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/men/testosterone/`;

const PAGE_TITLE = "Testosterone Therapy (TRT) | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Testosterone Therapy (TRT) in Killeen, TX: restore vitality, confidence, and wellness with clinician-supervised TRT tailored to your labs and symptoms.";

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
  return cmsMetadata("/men/testosterone", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men", item: `${SITE_URL}/men/` },
    { "@type": "ListItem", position: 3, name: "Testosterone", item: CANONICAL },
  ],
};

const medicalProcedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Testosterone Therapy",
  alternateName: "Testosterone Replacement Therapy (TRT)",
  url: CANONICAL,
  description:
    "Clinician-supervised testosterone replacement therapy for men experiencing fatigue, low libido, mood changes, weight gain, and slow recovery related to low testosterone.",
  medicineSystem: "https://schema.org/WesternConventional",
  relevantSpecialty: {
    "@type": "MedicalSpecialty",
    name: "Endocrinology",
  },
  provider: {
    "@type": "MedicalOrganization",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
  },
};

export default function TestosteronePage() {
  return (
    <CMSRoute path="/men/testosterone">
    <>
      <Script
        id="ld-testosterone-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-testosterone-therapy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalProcedureSchema),
        }}
      />
      <TestosteronePageClient />
    </>
      </CMSRoute>
  );
}
