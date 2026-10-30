import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import {
  LARISSA_DESCRIPTION,
  LARISSA_IMAGE,
  LARISSA_IMAGE_ALT,
  LARISSA_IMAGE_HEIGHT,
  LARISSA_IMAGE_WIDTH,
  LARISSA_TITLE,
} from "@/lib/seo-meta";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/providers/larissa-garth/`;
const PAGE_TITLE = LARISSA_TITLE;
const PAGE_DESCRIPTION = LARISSA_DESCRIPTION;
const PORTRAIT = `${SITE_URL}${LARISSA_IMAGE}`;
const BOOKING = "https://www.tebra.com/care/provider/larissa-garth-pa-c-1487096947";

const pageMetadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    type: "profile",
    siteName: "Central Texas Holistic Care",
    images: [
      {
        url: PORTRAIT,
        width: LARISSA_IMAGE_WIDTH,
        height: LARISSA_IMAGE_HEIGHT,
        alt: LARISSA_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PORTRAIT],
  },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/providers/larissa-garth", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about-us/` },
    { "@type": "ListItem", position: 3, name: "Larissa Garth", item: CANONICAL },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Larissa Garth",
  honorificSuffix: "DMSc, MPH, MPAS, PA-C",
  jobTitle: "Certified Physician Assistant",
  description: PAGE_DESCRIPTION,
  image: PORTRAIT,
  url: CANONICAL,
  worksFor: {
    "@type": "MedicalClinic",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
    telephone: "+1-254-213-2423",
    address: {
      "@type": "PostalAddress",
      streetAddress: "311 E. Stan Schlueter Loop #207",
      addressLocality: "Killeen",
      addressRegion: "TX",
      postalCode: "76542",
    },
  },
};

export default function LarissaGarthPage() {
  return (
    <CMSRoute path="/providers/larissa-garth">
      <script
        id="ld-larissa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        id="ld-larissa-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Provider · Killeen, TX
          </p>
          <h1 className="mt-3 font-heading text-4xl font-light text-[var(--color-forest)] sm:text-5xl">
            Larissa Garth, DMSc, MPH, MPAS, PA-C
          </h1>
          <Image
            src={LARISSA_IMAGE}
            alt={LARISSA_IMAGE_ALT}
            width={LARISSA_IMAGE_WIDTH}
            height={LARISSA_IMAGE_HEIGHT}
            priority
            className="mt-8 aspect-[4/5] w-full max-w-sm rounded-2xl object-cover"
          />
          <p className="mt-4 text-lg text-[var(--color-text-muted,#6B6B6B)]">
            Doctor of Medical Science and certified physician assistant at Central Texas Holistic Care, 311 E. Stan Schlueter Loop, Suite 207, Killeen.
          </p>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
            <p>
              Larissa Garth has more than 10 years of clinical experience in traditional medicine and hormone health. She is a certified physician assistant, which is a distinct license from a physician. Plans she writes are clinician-directed and tied to labs, symptoms, and follow-up, not a standing menu.
            </p>
            <p>
              Her credentials are a Doctor of Medical Science, a Master of Public Health, a Master of Physician Assistant Studies, and PA-C certification. She is also a published author. Public-health training shows up in how she talks about energy, sleep, focus, and the habits around a hormone plan, not only the prescription.
            </p>
            <p>
              She served as a U.S. Army officer for more than a decade. Patients who come in from Fort Hood and the surrounding Bell County towns usually recognize that background. The visit itself stays clinical: history, labs, a written plan, and a follow-up date before anyone leaves.
            </p>
            <p>
              People book her for testosterone and broader hormone concerns, recovery, and the day-to-day symptoms that show up when those are off: low energy, poor sleep, brain fog, and stalled training. If the numbers do not support treatment, that is the recommendation.
            </p>
            <p>
              She keeps a Nelson Mandela line in the room: “I never lose. I either win or I learn.” She uses it to set the tone for follow-up, especially when the first protocol needs a dose change.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "More than 10 years of clinical experience",
              "U.S. Army officer for over a decade",
              "Doctor of Medical Science (DMSc)",
              "Master of Public Health (MPH)",
              "Master of Physician Assistant Studies (MPAS)",
              "Certified Physician Assistant (PA-C)",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-forest)]"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-white"
            >
              Book with Larissa Garth
            </a>
            <Link href="/about-us/" className="inline-flex rounded-full border border-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-[var(--color-forest)]">
              Back to the team
            </Link>
            <a href="tel:+12542132423" className="inline-flex items-center text-sm font-semibold text-[var(--color-forest)]">
              (254) 213-2423
            </a>
          </div>
        </div>
      </article>
    </CMSRoute>
  );
}
