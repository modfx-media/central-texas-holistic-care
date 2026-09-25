import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import AboutUsPageClient from "./AboutUsPageClient";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/about-us/`;

const PAGE_TITLE = "About Us | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Meet the clinicians behind Central Texas Holistic Care in Killeen, TX. 20+ years combined in regenerative, restorative, and preventive medicine and hormones.";

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
  return cmsMetadata("/about-us", pageMetadata);
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Central Texas Holistic Care",
  alternateName: "CTHC",
  url: SITE_URL,
  telephone: "254-213-2423",
  address: {
    "@type": "PostalAddress",
    streetAddress: "311 E. Stan Schlueter Loop #207",
    addressLocality: "Killeen",
    addressRegion: "TX",
    postalCode: "76542",
    addressCountry: "US",
  },
  medicalSpecialty: [
    "Hormone Therapy",
    "Regenerative Medicine",
    "Preventive Medicine",
    "Functional Medicine",
    "Integrative Medicine",
  ],
  employee: [
    {
      "@type": "Person",
      name: "Dr. Bimisa Augustin",
      honorificSuffix: "DNP, FNP-C, PMHNP-BC",
      jobTitle:
        "Doctor of Nursing Practice | Family & Psychiatric Nurse Practitioner",
      image: `${SITE_URL}/images/providers/dr-bimisa-augustin.jpg`,
      affiliation: { "@type": "MedicalOrganization", name: "Central Texas Holistic Care" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Mary Hardin-Baylor" },
        { "@type": "CollegeOrUniversity", name: "Maryville University" },
        { "@type": "CollegeOrUniversity", name: "The University of Alabama" },
      ],
    },
    {
      "@type": "Person",
      name: "Dr. Larissa Garth",
      honorificSuffix: "DMSC, MPH, MPAS, PA-C",
      jobTitle: "Doctor of Medical Science | Certified Physician Assistant",
      image: `${SITE_URL}/images/providers/dr-larissa-garth.jpg`,
      affiliation: { "@type": "MedicalOrganization", name: "Central Texas Holistic Care" },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: CANONICAL },
  ],
};

export default function AboutUsPage() {
  return (
    <CMSRoute path="/about-us">
    <>
      <Script
        id="ld-about-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="ld-about-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutUsPageClient />
    </>
      </CMSRoute>
  );
}
