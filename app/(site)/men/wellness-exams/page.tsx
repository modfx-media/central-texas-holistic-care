import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import WellnessExamsPageClient from "./WellnessExamsPageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/men/wellness-exams/`;

const PAGE_TITLE = "Annual Wellness Exams for Men | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Annual Wellness Exams for men in Killeen, TX: preventive screenings, vaccinations, and early detection to protect your long-term health at Central Texas Holistic.";

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
  return cmsMetadata("/men/wellness-exams", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Men", item: `${SITE_URL}/men/` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Wellness Exams",
      item: CANONICAL,
    },
  ],
};

const medicalProcedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Annual Wellness Exam",
  alternateName: "Men's Annual Wellness Exam",
  url: CANONICAL,
  description:
    "A thorough annual wellness exam designed to monitor overall health, detect early signs of disease, and support informed decisions about long-term well-being. Includes preventive screening for heart disease, diabetes, colon cancer, prostate cancer, and low testosterone, plus recommended adult vaccinations.",
  procedureType: "https://schema.org/DiagnosticProcedure",
  bodyLocation: "Whole body",
  preparation:
    "Bring a list of current medications and prior lab results if available.",
  provider: {
    "@type": "MedicalOrganization",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
  },
};

export default function WellnessExamsPage() {
  return (
    <CMSRoute path="/men/wellness-exams">
    <>
      <Script
        id="ld-wellness-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-wellness-procedure"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalProcedureSchema),
        }}
      />
      <WellnessExamsPageClient />
    </>
      </CMSRoute>
  );
}
