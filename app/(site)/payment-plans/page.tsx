import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import PageHero from "@/components/layout/PageHero";
import PaymentPlansContent from "@/components/payment-plans/PaymentPlansContent";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/payment-plans/`;

const PAGE_TITLE =
  "Payment Plans | Cherry & Denefits Financing | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Pay over time for your care with two flexible financing partners: Cherry (soft credit check, 0% APR options) and Denefits (no credit check). Ask us how.";

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
  return cmsMetadata("/payment-plans", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Payment Plans",
      item: CANONICAL,
    },
  ],
};

const financingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: PAGE_TITLE,
  url: CANONICAL,
  description: PAGE_DESCRIPTION,
  about: [
    {
      "@type": "FinancialProduct",
      name: "Cherry Financing",
      url: "https://withcherry.com/",
      provider: {
        "@type": "Organization",
        name: "Cherry Technologies, Inc.",
        url: "https://withcherry.com/",
      },
      feesAndCommissionsSpecification:
        "Soft credit check with no impact to credit score. 0% APR options available for qualified borrowers. Terms vary based on eligibility.",
    },
    {
      "@type": "FinancialProduct",
      name: "Denefits Financing",
      url: "https://www.denefits.com/",
      provider: {
        "@type": "Organization",
        name: "Denefits",
        url: "https://www.denefits.com/",
      },
      feesAndCommissionsSpecification:
        "No credit check required. Instant approval decision. Flexible term lengths.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need good credit to be approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Denefits does not require a credit check and approves the vast majority of applicants. Cherry uses a soft credit check that does not impact your score.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know which option is right for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are great. Cherry tends to fit patients looking for higher approval limits and true 0% APR promotional options. Denefits is designed for anyone who prefers to skip a credit check altogether. Our team is happy to help you compare.",
      },
    },
    {
      "@type": "Question",
      name: "How long are the payment terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Terms are flexible and depend on the plan and provider you choose. You'll see the exact schedule and any applicable fees before you commit.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The easiest path is to inquire with our practice first. We'll answer any questions, discuss your care plan, and point you to the right application link.",
      },
    },
  ],
};

export default function PaymentPlansPage() {
  return (
    <CMSRoute path="/payment-plans">
    <>
      <Script
        id="ld-payment-plans-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-payment-plans-financing"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financingSchema) }}
      />
      <Script
        id="ld-payment-plans-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        title="Payment Plans"
        subtitle="Two flexible ways to pay over time, Cherry with a soft credit check or Denefits with no credit check at all. Inquire with the practice and we'll help you choose."
        backgroundImage="/images/source/insurance.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Payment Plans", href: "/payment-plans/" },
        ]}
      />
      <PaymentPlansContent />
    </>
      </CMSRoute>
  );
}
