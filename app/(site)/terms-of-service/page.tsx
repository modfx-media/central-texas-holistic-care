import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";

import LegalPageBody, { type LegalSection } from "@/components/legal/LegalPageBody";
import PageHero from "@/components/layout/PageHero";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/terms-of-service/`;
const LAST_UPDATED = "2026-06-30";

const PAGE_TITLE = "Terms of Service | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "The terms governing your use of the Central Texas Holistic Care website: acceptable use, intellectual property, disclaimers, and limits of liability.";

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
  return cmsMetadata("/terms-of-service", pageMetadata);
}

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <p>
        By accessing or using the Central Texas Holistic Care, PLLC website
        (centraltexasholisticcarepllc.com) or any related online services (the "Site"),
        you agree to be bound by these Terms of Service ("Terms"). If you do not agree
        to these Terms, please do not use the Site. We may update these Terms from time
        to time, and your continued use of the Site after we post changes means you
        accept the revised Terms.
      </p>
    ),
  },
  {
    id: "not-medical-advice",
    title: "Not medical advice",
    body: (
      <>
        <p>
          The information on this Site is provided for general educational purposes only
          and is not a substitute for professional medical advice, diagnosis, or
          treatment. Reading our website does not establish a doctor-patient
          relationship.
        </p>
        <p>
          Always seek the advice of your physician or other qualified healthcare provider
          with any questions you may have regarding a medical condition. Never disregard
          professional medical advice or delay seeking it because of something you have
          read on this Site. If you think you may have a medical emergency, call 911 or
          your local emergency number immediately.
        </p>
      </>
    ),
  },
  {
    id: "use-of-site",
    title: "Use of the Site",
    body: (
      <>
        <p>You agree to use the Site only for lawful purposes. You will not:</p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>Submit false, misleading, or unauthorized health or insurance information.</li>
          <li>Attempt to gain unauthorized access to any part of the Site or its systems.</li>
          <li>Use automated tools (bots, scrapers) to access the Site without our written permission.</li>
          <li>Interfere with or disrupt the Site or impose an unreasonable load on our infrastructure.</li>
          <li>Use the Site to transmit malware, spam, or any unlawful content.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate your access to the Site at any
          time, with or without notice, for any reason.
        </p>
      </>
    ),
  },
  {
    id: "appointments",
    title: "Appointment requests and booking",
    body: (
      <>
        <p>
          Booking widgets, scheduling tools, and contact forms on this Site are provided
          for your convenience. Submitting a request through the Site is not a
          confirmation of an appointment. We will follow up to confirm date, time, and
          provider availability.
        </p>
        <p>
          Cancellation, rescheduling, and no-show policies are set out separately and
          are provided to you when you book. Patients are responsible for understanding
          and complying with those policies.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          All content on this Site, including text, images, logos, graphics, video, and
          design elements, is owned by Central Texas Holistic Care or our licensors and
          is protected by copyright, trademark, and other intellectual-property laws.
          You may view, download, and print pages from this Site for your personal,
          non-commercial use only.
        </p>
        <p>
          You may not republish, sell, or otherwise commercially exploit any content
          from this Site without our prior written permission. The marks "Central Texas
          Holistic Care", "CTHC", and our logo are trademarks of Central Texas Holistic
          Care, PLLC.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links and services",
    body: (
      <p>
        Our Site may link to third-party websites or services (for example, Cherry,
        Denefits, our online booking provider, or insurance carrier portals). We do not
        control those sites, and we are not responsible for their content, privacy
        practices, or terms. Your use of third-party sites is at your own risk and
        subject to their own terms.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    body: (
      <p>
        The Site and all content are provided "as is" and "as available", without any
        warranties of any kind, either express or implied, including but not limited to
        warranties of merchantability, fitness for a particular purpose, accuracy,
        non-infringement, or that the Site will be uninterrupted or error-free. Your use
        of the Site is at your sole risk.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, Central Texas Holistic Care, PLLC, its
        owners, officers, employees, and agents will not be liable for any indirect,
        incidental, consequential, special, or punitive damages arising out of or related
        to your use of the Site, even if we have been advised of the possibility of such
        damages. Our total liability for any claim arising out of or relating to the
        Site is limited to one hundred U.S. dollars (USD 100).
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to defend, indemnify, and hold harmless Central Texas Holistic Care,
        PLLC and its owners, officers, employees, and agents from any claims, damages,
        liabilities, costs, and expenses (including reasonable attorneys' fees) arising
        out of your use of the Site or violation of these Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of the State of Texas, without regard to
        its conflict-of-laws principles. Any dispute arising out of or relating to these
        Terms or your use of the Site will be brought exclusively in the state or
        federal courts located in Bell County, Texas, and you consent to the
        jurisdiction of those courts.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these Terms? Reach out using the contact details below or visit
        our{" "}
        <Link href="/about-us/" className="text-[#2D5016] underline-offset-4 hover:underline">
          About Us
        </Link>{" "}
        page.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <CMSRoute path="/terms-of-service">
    <>
      <PageHero
        title="Terms of Service"
        subtitle="The terms that govern your use of our website and related online services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms-of-service/" },
        ]}
      />
      <LegalPageBody
        lastUpdated={LAST_UPDATED}
        intro={
          <p>
            Please read these Terms carefully before using our website. They include
            important information about your rights and responsibilities, and they limit
            our liability in certain ways permitted by law.
          </p>
        }
        sections={SECTIONS}
      />
    </>
      </CMSRoute>
  );
}
