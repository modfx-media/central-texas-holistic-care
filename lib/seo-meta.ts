/**
 * Audited title and description strings.
 * Homepage title is 50–60 characters. Other titles are 60 or fewer.
 * Descriptions are 140–158 characters.
 * Lengths are checked in scripts/seo-content-update.ts.
 */

export const HOME_TITLE = "Killeen Holistic Medicine | Central Texas Holistic Health";
export const HOME_DESCRIPTION =
  "Central Texas Holistic Health offers hormone therapy, IV nutrition, and men's and women's care at 311 E. Stan Schlueter Loop, Killeen. Serving Harker Heights.";

export const LARISSA_TITLE = "Larissa Garth, PA-C | Central Texas Holistic Care";
export const LARISSA_DESCRIPTION =
  "Larissa Garth, DMSc, PA-C, is a physician assistant at Central Texas Holistic Care in Killeen, with 10+ years in clinic and a decade as a U.S. Army officer.";
export const LARISSA_IMAGE = "/images/providers/dr-larissa-garth.jpg";
export const LARISSA_IMAGE_WIDTH = 910;
export const LARISSA_IMAGE_HEIGHT = 894;
export const LARISSA_IMAGE_ALT =
  "Larissa Garth, DMSc, MPH, MPAS, PA-C, physician assistant at Central Texas Holistic Care in Killeen";

export const BIMISA_TITLE = "Bimisa Augustin, DNP | Central Texas Holistic Care";
export const BIMISA_DESCRIPTION =
  "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, nurse practitioner at Central Texas Holistic Care in Killeen. 26 years in clinic, including U.S. Army service.";
export const BIMISA_IMAGE = "/images/providers/dr-bimisa-augustin.jpg";
export const BIMISA_IMAGE_WIDTH = 822;
export const BIMISA_IMAGE_HEIGHT = 1024;
export const BIMISA_IMAGE_ALT =
  "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, nurse practitioner at Central Texas Holistic Care in Killeen";

export const KILLEEN_TRT_TITLE = "Killeen Testosterone Therapy | Holistic Health Care";
export const KILLEEN_TRT_DESCRIPTION =
  "Clinician-supervised testosterone therapy for men at our Killeen clinic. Labs and symptoms come first, then a written plan before any dose is chosen.";

export const HORMONE_TITLE = "Hormone Therapy (BHRT) | Central Texas Holistic Care";
export const HORMONE_DESCRIPTION =
  "Hormone therapy in Killeen for men and women, matched to your labs. Testosterone, estrogen, and progesterone at our Stan Schlueter Loop clinic.";

export const STEM_TITLE = "Stem Cell Therapy in Killeen | Central Texas Holistic Care";
export const STEM_DESCRIPTION =
  "Clinician-supervised stem cell, exosome, and PRP therapy in Killeen, TX. Non-surgical regenerative injections for joints, tendons, hair, and recovery.";

export const TEMPLE_TITLE = "Temple Wellness Care | Central Texas Holistic Care";
export const TEMPLE_DESCRIPTION =
  "Temple patients come to our Killeen clinic for hormone therapy, IV nutrition, testosterone care, and wellness exams. About 35 minutes via I-14.";

export const MENOPAUSE_TITLE = "Killeen Menopause Care | Central Texas Holistic Care";
export const MENOPAUSE_DESCRIPTION =
  "Menopause care in Killeen, TX: symptom review, hormone labs, and a clinician-led plan at Central Texas Holistic Care on Stan Schlueter Loop.";

export const KILLEEN_MENOPAUSE_TITLE = "Menopause Hormone Care in Killeen | Holistic Care";
export const KILLEEN_MENOPAUSE_DESCRIPTION =
  "Menopause hormone care for women in Killeen, seen at 311 E. Stan Schlueter Loop. A clinician reviews symptoms and labs before any plan starts.";

export type SeoMetaUpdate = {
  /** CMS path without a trailing slash. */
  path: string;
  title: string;
  description: string;
  /** Value currently shipped in code before this audit, for the dry-run report. */
  previousTitle: string;
  previousDescription: string;
};

export const SEO_META_UPDATES: readonly SeoMetaUpdate[] = [
  {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    previousTitle: "Holistic Medicine in Killeen, TX | Central Texas Holistic Care",
    previousDescription:
      "Holistic medicine and hormone therapy in Killeen, TX. Bioidentical HRT, IV nutrition, and men's and women's health at 311 E. Stan Schlueter Loop. Serving Harker Heights. Book today.",
  },
  {
    path: "/providers/larissa-garth",
    title: LARISSA_TITLE,
    description: LARISSA_DESCRIPTION,
    previousTitle: "Larissa Garth, DMSc, MPH, MPAS, PA-C | Central Texas Holistic Care",
    previousDescription:
      "Larissa Garth, DMSc, MPH, MPAS, PA-C, is a certified physician assistant at Central Texas Holistic Care in Killeen, TX. More than 10 years of clinical experience and a decade as a U.S. Army officer.",
  },
  {
    path: "/providers/bimisa-augustin",
    title: BIMISA_TITLE,
    description: BIMISA_DESCRIPTION,
    previousTitle: "Bimisa Augustin, DNP, FNP-C, PMHNP-BC | Central Texas Holistic Care",
    previousDescription:
      "Bimisa Augustin, DNP, FNP-C, PMHNP-BC, is a nurse practitioner at Central Texas Holistic Care in Killeen, TX. 26 years of clinical experience, including 10 years and six combat deployments with the U.S. Army.",
  },
  {
    path: "/areas-we-serve/killeen/testosterone-therapy",
    title: KILLEEN_TRT_TITLE,
    description: KILLEEN_TRT_DESCRIPTION,
    previousTitle: "Testosterone Therapy in Killeen, TX | Central Texas Holistic Care",
    previousDescription:
      "Lab-guided testosterone replacement therapy for men in Killeen, TX. Killeen is ~5 min from our clinic via East Stan Schlueter Loop / US-190. Book a consultation.",
  },
  {
    path: "/hormone-therapy",
    title: HORMONE_TITLE,
    description: HORMONE_DESCRIPTION,
    previousTitle: "Hormone Therapy (BHRT) | Central Texas Holistic Care",
    previousDescription:
      "Bioidentical hormone replacement therapy (BHRT) in Killeen, TX. Testosterone for men, estrogen and progesterone for women, personalized to your labs. Serving Harker Heights.",
  },
  {
    path: "/stem-cells",
    title: STEM_TITLE,
    description: STEM_DESCRIPTION,
    previousTitle: "Stem Cell Therapy in Killeen, TX | Central Texas Holistic Care",
    previousDescription:
      "Clinician-supervised stem cell, exosome, and PRP therapy in Killeen, TX. Non-surgical regenerative injections for joints, tendons, hair, and recovery.",
  },
  {
    path: "/areas-we-serve/temple",
    title: TEMPLE_TITLE,
    description: TEMPLE_DESCRIPTION,
    previousTitle: "Temple, TX | Central Texas Holistic Care",
    previousDescription:
      "Hormone therapy, IV nutrition, TRT, and wellness care for Temple, TX. ~35 min via I-14 East to I-35 North. Book a consultation.",
  },
  {
    path: "/women/menopausal-disorders",
    title: MENOPAUSE_TITLE,
    description: MENOPAUSE_DESCRIPTION,
    previousTitle: "Menopausal Disorders | Central Texas Holistic Care",
    previousDescription:
      "Comprehensive menopausal care at Central Texas Holistic Care: guidance, symptom relief, and personalized plans to navigate menopause with comfort.",
  },
  {
    path: "/areas-we-serve/killeen/hormone-therapy/menopause-care",
    title: KILLEEN_MENOPAUSE_TITLE,
    description: KILLEEN_MENOPAUSE_DESCRIPTION,
    previousTitle: "Menopause Hormone Replacement in Killeen, TX | Central Texas Holistic Care",
    previousDescription:
      "Full bioidentical hormone replacement for menopausal and post-menopausal women, restoring sleep, mood, libido, bone health, and quality of life. Seen at our Killeen clinic, about 5 minutes from Killeen via East Stan Schlueter Loop / US-190.",
  },
];

/** Use an absolute title when the string already includes the brand separator. */
export function metadataTitle(title: string): string | { absolute: string } {
  return title.includes("|") ? { absolute: title } : title;
}
