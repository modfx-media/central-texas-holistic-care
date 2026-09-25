import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import HormoneTherapyClient from "@/components/hormone/HormoneTherapyClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/hormone-therapy/`;

const PAGE_TITLE = "Hormone Therapy (BHRT) | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Bio-identical hormone replacement therapy (BHRT) in Harker Heights, TX. Testosterone for men, estrogen and progesterone for women, personalized to your labs.";

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
  return cmsMetadata("/hormone-therapy", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Hormone Therapy",
      item: CANONICAL,
    },
  ],
};

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Hormone Therapy",
  url: CANONICAL,
  description: PAGE_DESCRIPTION,
  about: {
    "@type": "MedicalTherapy",
    name: "Hormone Replacement Therapy",
    alternateName: ["HRT", "BHRT", "Bioidentical Hormone Replacement Therapy"],
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Endocrinology",
    },
  },
  audience: [
    { "@type": "PeopleAudience", audienceType: "Men" },
    { "@type": "PeopleAudience", audienceType: "Women" },
  ],
  mainContentOfPage: {
    "@type": "WebPageElement",
    cssSelector: "main",
  },
};

export default function HormoneTherapyPage() {
  return (
    <CMSRoute path="/hormone-therapy">
    <>
      <Script
        id="ld-hrt-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-hrt-medicalwebpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalWebPageSchema),
        }}
      />
      <HormoneTherapyClient />
    </>
      </CMSRoute>
  );
}
