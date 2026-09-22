import { cache } from "react";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function placesApiKey(): string {
  return (
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    ""
  );
}

function fallbackPayload(): GoogleReviewsPayload {
  return {
    reviews: fiveStarReviews,
    meta: { ...googleReviewsMeta, fiveStarCount: fiveStarReviews.length },
  };
}

function reviewKey(review: GoogleReview): string {
  return `${review.name.trim().toLowerCase()}::${review.quote.trim().toLowerCase()}`;
}

function mergeFiveStarReviews(...lists: GoogleReview[][]): GoogleReview[] {
  const merged: GoogleReview[] = [];
  const seen = new Set<string>();

  for (const list of lists) {
    for (const review of list) {
      if (!isFiveStarReview(review)) continue;
      const key = reviewKey(review);
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(review);
    }
  }

  return merged;
}

type LegacyPlaceReview = {
  rating?: number;
  text?: string;
  author_name?: string;
  relative_time_description?: string;
};

type LegacyPlaceDetailsResponse = {
  status?: string;
  error_message?: string;
  result?: {
    reviews?: LegacyPlaceReview[];
  };
};

function cleanQuote(value: string): string {
  return value.trim().replace(/["\u201C\u201D]+$/g, "").trim();
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = cleanQuote(review.text?.text ?? review.originalText?.text ?? "");
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
  };
}

function mapLegacyReview(review: LegacyPlaceReview): GoogleReview | null {
  const quote = cleanQuote(review.text ?? "");
  const name = review.author_name?.trim() ?? "";
  const rating = review.rating ?? 0;

  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relative_time_description,
  };
}

/**
 * Place Details (legacy) newest-first set. Combined with "most relevant"
 * this surfaces additional 5-star quotes Google omits from a single sort.
 */
async function fetchNewestFiveStarReviews(
  apiKey: string,
  placeId: string,
): Promise<GoogleReview[]> {
  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: "reviews",
      reviews_sort: "newest",
      key: apiKey,
    });
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      {
        next: {
          revalidate: REVIEWS_REVALIDATE_SECONDS,
          tags: ["google-reviews"],
        },
      },
    );
    const data = (await response.json()) as LegacyPlaceDetailsResponse;

    if (!response.ok || data.status !== "OK") {
      console.error(
        "Google Places newest reviews request failed:",
        data.error_message ?? data.status ?? response.statusText,
      );
      return [];
    }

    return (data.result?.reviews ?? [])
      .map(mapLegacyReview)
      .filter((review): review is GoogleReview => review !== null);
  } catch (error) {
    console.error("Google Places newest reviews fetch error:", error);
    return [];
  }
}

/**
 * Places API (New) most-relevant reviews plus newest-sort 5-star quotes.
 * Each request still returns at most 5 reviews. Filter to exact 5 stars.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey = placesApiKey();
    const placeId =
      process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || placeId.startsWith("REPLACE_")) return fallbackPayload();

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": PLACES_FIELD_MASK,
          },
          next: {
            revalidate: REVIEWS_REVALIDATE_SECONDS,
            tags: ["google-reviews"],
          },
        },
      );

      const data = (await response.json()) as PlacesDetailsResponse;

      if (!response.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? response.statusText,
        );
        return fallbackPayload();
      }

      const relevantReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null);

      const newestReviews = await fetchNewestFiveStarReviews(apiKey, placeId);
      const liveReviews = mergeFiveStarReviews(
        relevantReviews,
        newestReviews,
        fiveStarReviews,
      );

      if (liveReviews.length === 0) return fallbackPayload();

      return {
        reviews: liveReviews,
        meta: {
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: liveReviews.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);
