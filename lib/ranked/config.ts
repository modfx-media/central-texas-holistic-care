import { SITE_URL } from "@/lib/site";

export const SITE_ORIGIN = (process.env.SITE_ORIGIN || SITE_URL).replace(
  /\/$/,
  "",
);

export const DEFAULT_COVER = "/images/blog/default-cover.jpg";
export const DEFAULT_COVER_ALT = "Central Texas Holistic Care article cover";

export const DEFAULT_CTA = {
  label: "Contact us",
  href: "/contact/",
};

/** Cover prompt for this brand. No patient faces / medical gore. */
export function coverPrompt(title: string): string {
  return [
    "Editorial photograph, 16:9 landscape, premium wellness clinic photography.",
    "Warm natural light, calm spa-like medical office in Central Texas.",
    `Theme inspired by: ${title.slice(0, 120)}.`,
    "Holistic hormone health, IV nutrition, or regenerative wellness atmosphere.",
    "No people, no faces, no patients, no medical gore, no needles in skin.",
    "Cinematic lighting, sharp, no grain, no watermark.",
    "No text, no letters, no logos, no captions, no readable signage.",
  ].join(" ");
}

/**
 * Committed cover URLs for Ranked slugs. String map only —
 * do not fs.stat public/ (that packs images into the cron bundle).
 */
export const COMMITTED_COVERS: Record<string, string> = {
  "how-to-prepare-for-a-female-hormone-therapy-consultation":
    "/images/blog-images/vitaly-gariev-rG5elqddGzo-unsplash.jpg",
  "fall-fatigue-when-a-wellness-clinic-in-killeen-can-help":
    "/images/blog-images/fall-fatigue-wellness-clinic-killeen.png",
};

export const COMMITTED_COVER_SLUGS: readonly string[] = Object.keys(COMMITTED_COVERS);
