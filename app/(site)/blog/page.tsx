import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Script from "next/script";

import BlogIndexClient from "./BlogIndexClient";
import { SITE_URL } from "@/lib/site";
import { absoluteAssetUrl, getPublishedUiPosts } from "@/lib/ranked/ui";

export const revalidate = 3600;

const CANONICAL = `${SITE_URL}/blog/`;

const PAGE_TITLE = "Blog | Insights on Hormones, IV Nutrition & Whole-Person Care";
const PAGE_DESCRIPTION =
  "Evidence-based articles from Central Texas Holistic Care clinicians on hormone therapy, IV nutrition, men's and women's health, and whole-person medicine.";

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
  return cmsMetadata("/blog", pageMetadata);
}

export default async function BlogIndexPage() {
  const posts = await getPublishedUiPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Central Texas Holistic Care, Blog",
    url: CANONICAL,
    description: PAGE_DESCRIPTION,
    publisher: {
      "@type": "MedicalOrganization",
      name: "Central Texas Holistic Care",
      url: SITE_URL,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}/`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: {
        "@type": "Person",
        name: p.author.name,
      },
      image: absoluteAssetUrl(p.coverImage),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: CANONICAL },
    ],
  };

  return (
    <CMSRoute path="/blog">
    <>
      <Script
        id="ld-blog-index"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Script
        id="ld-blog-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogIndexClient posts={posts} />
    </>
      </CMSRoute>
  );
}
