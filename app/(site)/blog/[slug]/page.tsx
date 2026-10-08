import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { notFound } from "next/navigation";
import Script from "next/script";

import BlogPostClient from "./BlogPostClient";
import { SITE_URL } from "@/lib/site";
import {
  absoluteAssetUrl,
  getPublishedRelatedPosts,
  getPublishedUiPost,
  getPublishedUiPosts,
} from "@/lib/ranked/ui";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPublishedUiPosts().catch(() => []);
  return [...new Set(posts.map((post) => post.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedUiPost(slug);
  if (!post) return {};

  const canonical = `${SITE_URL}/blog/${post.slug}/`;
  const image = absoluteAssetUrl(post.coverImage);

  return cmsMetadata(`/blog/${post.slug}`, {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      siteName: "Central Texas Holistic Care",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
    robots: { index: true, follow: true },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPublishedUiPost(slug);
  if (!post) notFound();

  const related = await getPublishedRelatedPosts(post.slug, 2);
  const canonical = `${SITE_URL}/blog/${post.slug}/`;
  const image = absoluteAssetUrl(post.coverImage);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "Central Texas Holistic Care",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/providers/dr-bimisa-augustin.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <Script
        id={`ld-article-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`ld-article-breadcrumb-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CMSRoute path={`/blog/${post.slug}`}>
        <BlogPostClient post={post} related={related} />
      </CMSRoute>
    </>
  );
}
