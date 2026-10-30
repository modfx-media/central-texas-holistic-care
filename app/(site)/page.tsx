import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

import { GoogleReviews } from "@/components/home/GoogleReviews";
import { Testimonials } from "@/components/home/Testimonials";
import Home2Client from "@/components/home2/Home2Client";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { getPublishedUiPosts } from "@/lib/ranked/ui";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-meta";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const PAGE_TITLE = HOME_TITLE;
const PAGE_DESCRIPTION = HOME_DESCRIPTION;

const pageMetadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/`,
    type: "website",
    siteName: "Central Texas Holistic Care",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Central Texas Holistic Health")}&subtitle=${encodeURIComponent("Killeen, TX · Hormone therapy, IV nutrition, men's and women's health")}`,
        width: 1200,
        height: 630,
        alt: "Central Texas Holistic Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent("Central Texas Holistic Health")}&subtitle=${encodeURIComponent("Killeen, TX · Hormone therapy, IV nutrition, men's and women's health")}`],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/", pageMetadata);
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Central Texas Holistic Care",
  },
  about: {
    "@type": "MedicalBusiness",
    name: "Central Texas Holistic Care",
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/api/og`,
  },
};

export default async function Home() {
  const [latestBlogPosts, googleReviews] = await Promise.all([
    getPublishedUiPosts()
      .catch(() => [])
      .then((posts) => posts.slice(0, 3)),
    getDisplayedGoogleReviews(),
  ]);

  return (
    <CMSRoute path="/">
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            ],
          }),
        }}
      />
      <Home2Client
        latestBlogPosts={latestBlogPosts}
        googleMeta={googleReviews.meta}
        testimonials={
          <GoogleReviews>
            {({ reviews, meta }) => (
              <Testimonials
                items={reviews.map((review) => ({
                  name: review.name,
                  quote: review.quote,
                  when: review.relativeTime ?? "Posted on Google",
                }))}
                rating={meta.rating}
                reviewCount={meta.reviewCount}
                reviewsUrl={meta.reviewsUrl}
              />
            )}
          </GoogleReviews>
        }
      />
    </>
      </CMSRoute>
  );
}
