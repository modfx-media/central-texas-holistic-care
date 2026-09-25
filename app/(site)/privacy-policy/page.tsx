import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";

import LegalPageBody, { type LegalSection } from "@/components/legal/LegalPageBody";
import PageHero from "@/components/layout/PageHero";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/privacy-policy/`;
const LAST_UPDATED = "2026-06-30";

const PAGE_TITLE = "Privacy Policy | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "How Central Texas Holistic Care collects, uses, and protects your personal health information, including your rights under HIPAA and Texas state law.";

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
  return cmsMetadata("/privacy-policy", pageMetadata);
}

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <p>
          Central Texas Holistic Care, PLLC ("we", "us", "our") is a private medical
          practice headquartered in Killeen, Texas. This Privacy Policy describes how
          we collect and handle information when you visit our website, schedule an
          appointment, communicate with our staff, or receive care from our providers.
        </p>
        <p>
          Protected health information (PHI) you share with us in the course of receiving
          care is governed primarily by the Health Insurance Portability and Accountability
          Act of 1996 (HIPAA) and our separate Notice of Privacy Practices, which we
          provide at your first visit. This page covers the broader privacy practices
          around our website and general business operations.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect information in three main ways:</p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>
            <strong>Information you provide.</strong> Name, contact details, date of
            birth, insurance information, medical history, and anything else you share
            when you book an appointment, fill out an intake form, or contact us.
          </li>
          <li>
            <strong>Information collected automatically.</strong> When you visit our
            website, we and our service providers (such as analytics tools) may collect
            your IP address, browser type, device information, referring URL, pages
            viewed, and approximate location based on IP. We use first-party and limited
            third-party cookies for analytics and basic site functionality.
          </li>
          <li>
            <strong>Information from third parties.</strong> Insurance carriers, payment
            processors, and other healthcare providers may share information with us as
            part of providing or paying for your care.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>Provide, coordinate, and improve the medical care you receive.</li>
          <li>Communicate with you about appointments, results, and follow-up care.</li>
          <li>Process payments and submit insurance claims on your behalf.</li>
          <li>Run our website, troubleshoot issues, and improve user experience.</li>
          <li>Comply with legal, regulatory, and public-health reporting obligations.</li>
          <li>Send you occasional educational or appointment-reminder emails or texts (you can opt out at any time).</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "How we share your information",
    body: (
      <>
        <p>
          We do not sell your personal information. We share information only as needed
          to deliver care or operate the practice, including with:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>
            Other healthcare providers involved in your treatment.
          </li>
          <li>
            Insurance carriers and clearinghouses for billing and claims.
          </li>
          <li>
            Vendors who help us operate the practice (electronic medical records, payment
            processing, lab partners, analytics, hosting). These vendors are bound by
            confidentiality and HIPAA business-associate obligations where applicable.
          </li>
          <li>
            Government agencies, courts, or law enforcement when required by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under HIPAA and applicable state law, you have the right to:</p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>Request access to your medical records and a copy of your PHI.</li>
          <li>Request corrections or amendments to your records.</li>
          <li>Request an accounting of disclosures we have made.</li>
          <li>Request restrictions on how we use or share certain information.</li>
          <li>Request confidential communications (for example, by phone instead of mail).</li>
          <li>File a complaint without retaliation.</li>
        </ul>
        <p>
          To exercise any of these rights, contact our office in writing using the
          contact details below. We will respond within the timeframes required by law.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your information",
    body: (
      <>
        <p>
          We use administrative, physical, and technical safeguards to protect your
          information, including encrypted electronic health records, access controls,
          staff training, and routine security reviews. No system is perfectly secure,
          and we notify affected individuals and regulators in the event of a reportable
          breach as required by law.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          Our website uses cookies and similar technologies to remember your preferences
          and understand how visitors use our site. You can disable cookies in your
          browser settings, though some features of the site may not work as intended.
        </p>
        <p>
          We may use privacy-respecting analytics tools (for example, Google Analytics
          configured to anonymize IP addresses) to understand site traffic in aggregate.
          These tools do not access your medical records.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        Our website is not directed to children under 13, and we do not knowingly
        collect personal information from children online. If you believe we have
        collected information from a child without parental consent, please contact us
        and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we make material
        changes, we will update the effective date at the top of this page and, where
        appropriate, notify you by email or through a notice on our website.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how we handle your
        information, please reach out using the contact details below or visit our{" "}
        <Link href="/about-us/" className="text-[#2D5016] underline-offset-4 hover:underline">
          About Us
        </Link>{" "}
        page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <CMSRoute path="/privacy-policy">
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, protect, and share your personal and health information."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy/" },
        ]}
      />
      <LegalPageBody
        lastUpdated={LAST_UPDATED}
        intro={
          <p>
            Your privacy is important to us. This page explains the practical details of
            how Central Texas Holistic Care handles your information. For protected
            health information, our Notice of Privacy Practices (provided at your first
            visit) governs.
          </p>
        }
        sections={SECTIONS}
        footnote={
          <p>
            This policy does not create a contract or any legal rights beyond those
            already provided by HIPAA, the Texas Medical Records Privacy Act, or other
            applicable law.
          </p>
        }
      />
    </>
      </CMSRoute>
  );
}
