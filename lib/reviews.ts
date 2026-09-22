/**
 * Per-client Google review types + fallback.
 * Fallback quotes must be real 5-star Google reviews for THIS business.
 * Leave googleReviews empty if none are on file.
 */
export const googleReviewsMeta = {
  rating: 3.8, // FALLBACK_RATING — Google's overall, not "5" by default
  reviewCount: 18, // FALLBACK_REVIEW_COUNT — Google's total, all stars
  fiveStarCount: 3,
  placeId: "ChIJGVKGVKVJRYYRWBpKi3hKKBk",
  reviewsUrl: "https://maps.google.com/?cid=1812780731610045016",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    quote:
      "Good afternoon all. My mother is one of her patient's and I had the privilege to meet the provider in person. She is a lovely women, professional and compassionate. The level of concern she had for my mom is heart warming. I worked in the Healthcare sector for over ten years, and all I can say is we need more people like her. I can't wait to establish care for myself! Clean beautiful decorated space with a front desk assistant who was kind as well.",
    name: "Alexis Gaither",
    rating: 5,
    relativeTime: "11 months ago",
  },
  {
    quote:
      "Absolutely recommend this practice, its so friendly and personalized. I feel seen and heard and thats something you can't say about most of the medical care these days.",
    name: "Rachel Valerio",
    rating: 5,
    relativeTime: "5 months ago",
  },
  {
    quote:
      "My doctor was extremely knowledgeable, attentive, and caring. They took the time to explain everything clearly and made me feel comfortable throughout my visit. Highly recommend.",
    name: "Desinaye Roberts",
    rating: 5,
    relativeTime: "10 months ago",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
