import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import LegalPageBody, { type LegalSection } from "@/components/legal/LegalPageBody";
import PageHero from "@/components/layout/PageHero";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/accessibility/`;
const LAST_UPDATED = "2026-06-30";

const PAGE_TITLE = "Accessibility Statement | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Central Texas Holistic Care is committed to WCAG 2.1 AA accessibility. Learn our standards, in-clinic accommodations, and how to request assistance.";

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
  return cmsMetadata("/accessibility", pageMetadata);
}

const SECTIONS: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    body: (
      <>
        <p>
          Central Texas Holistic Care, PLLC is committed to providing a website and a
          clinic experience that are accessible to the widest possible audience,
          regardless of ability or technology. We believe that everyone deserves equal
          access to the information and care we provide.
        </p>
        <p>
          We continually work to improve the accessibility of our digital and in-person
          experiences, and we welcome feedback that helps us do better.
        </p>
      </>
    ),
  },
  {
    id: "standards",
    title: "Standards we follow",
    body: (
      <>
        <p>
          Our website aims to conform to the{" "}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>{" "}
          standard published by the W3C. These guidelines explain how to make web
          content more accessible to people with a wide range of disabilities, including
          visual, auditory, physical, speech, cognitive, and neurological disabilities.
        </p>
        <p>
          In practice, this means we build and review our site for things like:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>Sufficient color contrast for text and interface elements.</li>
          <li>Keyboard-only navigation for menus, buttons, and forms.</li>
          <li>Semantic HTML, descriptive alt text for images, and visible focus states.</li>
          <li>Labels and instructions on all form fields.</li>
          <li>Predictable, consistent page structure with proper heading levels.</li>
          <li>Support for browser zoom up to 200% without loss of content or function.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ongoing-work",
    title: "Ongoing work",
    body: (
      <p>
        Accessibility is an ongoing process, not a one-time project. We test our website
        regularly with automated tools and manual review, and we work to fix issues we
        discover. Some legacy content or third-party tools (for example, online booking
        widgets, financing applications, or insurance portals) may not yet fully conform
        to WCAG 2.1 AA. We work with our vendors to push for improvements.
      </p>
    ),
  },
  {
    id: "clinic-accommodations",
    title: "In-clinic accommodations",
    body: (
      <>
        <p>
          Our clinic at 311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542 offers:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>Step-free entry and accessible parking near the building.</li>
          <li>Wheelchair-accessible exam rooms and restrooms.</li>
          <li>Adjustable exam tables and seating where clinically appropriate.</li>
          <li>Language interpretation services available on request (please notify us in advance).</li>
          <li>
            American Sign Language (ASL) and other communication accommodations on
            request, with reasonable notice so we can arrange the right provider.
          </li>
        </ul>
        <p>
          If you need an accommodation for your visit, please call us before your
          appointment so we can make the necessary arrangements.
        </p>
      </>
    ),
  },
  {
    id: "report-an-issue",
    title: "Report an accessibility issue",
    body: (
      <>
        <p>
          If you encounter a barrier on our website, in our clinic, or in any of our
          materials, please tell us. When you report an issue, it helps to include:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-stone-700">
          <li>The page or location where you encountered the issue.</li>
          <li>A description of what you experienced and what you expected.</li>
          <li>The device, browser, or assistive technology you were using.</li>
          <li>How we can reach you for follow-up.</li>
        </ul>
        <p>
          You can reach us by phone at{" "}
          <a
            className="text-[#2D5016] underline-offset-4 hover:underline"
            href="tel:+12542132423"
          >
            (254) 213-2423
          </a>
          . We aim to acknowledge accessibility reports within two business days and to
          provide a remediation plan or alternative access as quickly as possible.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party content",
    body: (
      <p>
        Our website links to and embeds tools from third parties (for example, Cherry
        and Denefits financing, our online booking provider, insurance portals, and
        social media). These third-party tools have their own accessibility standards
        and policies. If you encounter an accessibility barrier in one of these tools,
        we encourage you to report it to that vendor directly, and we appreciate you
        letting us know as well so we can advocate for improvements on your behalf.
      </p>
    ),
  },
  {
    id: "formal-complaints",
    title: "Formal complaints",
    body: (
      <p>
        If we are unable to resolve your concern through the steps above, you may also
        contact the U.S. Department of Health and Human Services Office for Civil Rights
        or the U.S. Department of Justice. Filing with us does not prevent you from
        also filing a complaint with these agencies.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <CMSRoute path="/accessibility">
    <>
      <PageHero
        title="Accessibility Statement"
        subtitle="Our commitment to making care, information, and our website accessible to everyone."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Accessibility", href: "/accessibility/" },
        ]}
      />
      <LegalPageBody
        lastUpdated={LAST_UPDATED}
        intro={
          <p>
            Central Texas Holistic Care is committed to ensuring that our website, our
            communications, and our clinic are accessible to people with disabilities.
            This statement describes the standards we follow and how to reach us if you
            encounter a barrier.
          </p>
        }
        sections={SECTIONS}
      />
    </>
      </CMSRoute>
  );
}
