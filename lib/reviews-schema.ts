import { isFiveStarReview, type GoogleReview, type GoogleReviewsMeta } from "./reviews";

export function buildGoogleReviewsJsonLd(
  reviews: GoogleReview[],
  meta: GoogleReviewsMeta,
) {
  const visible = reviews.filter(isFiveStarReview);
  const schema: Record<string, unknown> = {};

  if (meta.rating > 0 && meta.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(meta.rating),
      reviewCount: String(meta.reviewCount),
      bestRating: "5",
    };
  }

  if (visible.length > 0) {
    schema.review = visible.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: review.quote,
    }));
  }

  return schema;
}
