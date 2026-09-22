import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { GoogleRatingBadge } from "@/components/home/Testimonials";
import PageHero from "@/components/layout/PageHero";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/reviews/`;
const PAGE_TITLE = "Google Reviews | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Read 5-star Google reviews from patients at Central Texas Holistic Care in Killeen, TX.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Patient Google Reviews")}`,
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
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent("Patient Google Reviews")}`,
    ],
  },
};

function FiveStars() {
  return (
    <div aria-label="Rating: 5 out of 5" className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[#C4A862]">
          ★
        </span>
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);

  return (
    <>
      <PageHero
        title="Patient Reviews"
        subtitle="5-star Google reviews from people who chose Central Texas Holistic Care."
        backgroundImage="/images/blog-page-banner-img.jpeg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reviews", href: "/reviews/" },
        ]}
      />

      <section className="bg-[color:var(--color-cream-soft)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#8a6f30]">
                Google
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-[#1a3a0a] sm:text-4xl">
                What patients write on Google.
              </h2>
            </div>
            <GoogleRatingBadge
              rating={meta.rating}
              reviewCount={meta.reviewCount}
              reviewsUrl={meta.reviewsUrl}
            />
          </div>

          {visible.length === 0 ? (
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-stone-600">
              5-star Google comments will appear here when Google includes them
              in this listing. You can still read every review on Google.
            </p>
          ) : (
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((review) => (
                <li
                  key={`${review.name}-${review.relativeTime ?? review.quote.slice(0, 24)}`}
                  className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <FiveStars />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                      Google
                    </span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-stone-700">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <p className="mt-5 text-sm font-semibold text-[#1a3a0a]">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-stone-500">
                    {review.relativeTime ?? "Posted on Google"}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12">
            <a
              href={meta.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6f30] transition-colors hover:text-[#1a3a0a]"
            >
              View all Google reviews
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
