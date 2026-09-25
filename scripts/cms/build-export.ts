import fs from "node:fs";
import path from "node:path";

import { getAllPosts, type BlogBlock } from "../../lib/blog-data";
import { STATIC_CMS_PATHS } from "../../lib/cms/manifest";
import { normalizeCmsPath } from "../../lib/cms/url";
import {
  getLiveCities,
  getLiveCityServicePairs,
  getLiveCityServiceTreatmentTriples,
} from "../../lib/locations";
import {
  composeCityHubMeta,
  composeCityServiceCopy,
  composeMetaDescription,
  composeMetaTitle,
} from "../../lib/programmatic-content";
import { lexicalHeading, lexicalParagraph, lexicalRoot, textToLexical } from "./lexical";

type ExportRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  data: Record<string, unknown>;
};

const STATIC_TITLES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Central Texas Holistic Care | Holistic & Preventive Medicine in Harker Heights, TX",
    description:
      "Central Texas Holistic Care offers personalized holistic medicine, hormone therapy, IV nutrition, men's and women's health in Harker Heights, TX. Book today.",
  },
  "/about-us": {
    title: "About Us",
    description:
      "Meet the clinicians behind Central Texas Holistic Care in Killeen, TX.",
  },
  "/men": { title: "Men's Health", description: "Men's health, testosterone, and wellness exams." },
  "/men/testosterone": {
    title: "Testosterone Therapy",
    description: "Physician-supervised testosterone therapy in Central Texas.",
  },
  "/men/wellness-exams": {
    title: "Men's Wellness Exams",
    description: "Comprehensive preventive screenings for men.",
  },
  "/women": { title: "Women's Health", description: "Hormone balance, exams, and menopause care." },
  "/women/gynecological-exams": {
    title: "Gynecological Exams",
    description: "Routine women's health and screenings.",
  },
  "/women/menopausal-disorders": {
    title: "Menopausal Disorders",
    description: "Personalized peri- and post-menopause care.",
  },
  "/women/menstrual-disorders": {
    title: "Menstrual Disorders",
    description: "Hormone balance and cycle regulation.",
  },
  "/iv-nutrition": {
    title: "IV Nutrition",
    description: "Physician-supervised IV infusion menu.",
  },
  "/iv-nutrition/immune-booster": {
    title: "Immune Booster IV",
    description: "Strengthen your body's defense with IV nutrition.",
  },
  "/iv-nutrition/workout-recovery": {
    title: "Workout Recovery IV",
    description: "Recharge, rebuild, and refuel after training.",
  },
  "/iv-nutrition/myers-cocktail": {
    title: "Myer's Cocktail IV",
    description: "Energy, immunity, and relief in one drip.",
  },
  "/iv-nutrition/cold-and-flu": {
    title: "Cold & Flu IV",
    description: "Fight symptoms fast and recover.",
  },
  "/iv-nutrition/hangover": {
    title: "Hangover IV",
    description: "Hydrate, detox, and bounce back.",
  },
  "/hormone-therapy": {
    title: "Hormone Therapy (BHRT)",
    description: "Bio-identical hormone replacement therapy in Harker Heights, TX.",
  },
  "/stem-cells": {
    title: "Stem Cell Therapy",
    description: "Regenerative stem cell care at Central Texas Holistic Care.",
  },
  "/payment-plans": {
    title: "Payment Plans",
    description: "Flexible financing options for care.",
  },
  "/contact": {
    title: "Contact Us",
    description: "Contact Central Texas Holistic Care in Killeen, TX.",
  },
  "/reviews": {
    title: "Patient Reviews",
    description: "5-star Google reviews from CTHC patients.",
  },
  "/areas-we-serve": {
    title: "Areas We Serve",
    description: "Holistic care serving communities across Central Texas.",
  },
  "/blog": {
    title: "Blog",
    description: "Insights on hormones, IV nutrition, and whole-person care.",
  },
  "/privacy-policy": { title: "Privacy Policy", description: "Privacy policy." },
  "/terms-of-service": { title: "Terms of Service", description: "Terms of service." },
  "/accessibility": { title: "Accessibility", description: "Accessibility statement." },
  "/sitemap": { title: "Sitemap", description: "HTML sitemap." },
  "/get-financed": {
    title: "Get Financed",
    description: "Apply for flexible financing in under a minute.",
  },
};

function pageRecord(
  cmsPath: string,
  title: string,
  description: string,
  layout: unknown[],
  extras: Record<string, unknown> = {},
): ExportRecord {
  const normalized = normalizeCmsPath(cmsPath);
  const slug =
    normalized === "/"
      ? "home"
      : normalized.replace(/^\//, "").replace(/\//g, "--");
  return {
    collection: "pages",
    legacyId: `page:${normalized}`,
    sourceUrl: normalized,
    data: {
      title,
      slug,
      path: normalized,
      legacyId: `page:${normalized}`,
      sourceUrl: normalized,
      layout,
      meta: { title, description },
      canonicalUrl: normalized === "/" ? "/" : `${normalized}/`,
      _status: "draft",
      ...extras,
    },
  };
}

function blogBlocksToLexical(blocks: BlogBlock[]): Record<string, unknown> {
  const children: unknown[] = [];
  for (const block of blocks) {
    if (block.type === "p") children.push(lexicalParagraph(block.text));
    else if (block.type === "h2") children.push(lexicalHeading(block.text, "h2"));
    else if (block.type === "h3") children.push(lexicalHeading(block.text, "h3"));
    else if (block.type === "quote") children.push(lexicalParagraph(block.text));
    else if (block.type === "callout") {
      children.push(lexicalHeading(block.title, "h3"));
      children.push(lexicalParagraph(block.text));
    } else if (block.type === "list") {
      for (const item of block.items) children.push(lexicalParagraph(`• ${item}`));
    } else if (block.type === "steps") {
      block.items.forEach((item, index) => {
        children.push(
          lexicalParagraph(
            `${index + 1}. ${item.title ? `${item.title}: ` : ""}${item.text}`,
          ),
        );
      });
    }
  }
  return lexicalRoot(children);
}

function buildRecords(): ExportRecord[] {
  const records: ExportRecord[] = [];

  for (const cmsPath of STATIC_CMS_PATHS) {
    const meta = STATIC_TITLES[cmsPath] ?? {
      title: cmsPath,
      description: "",
    };
    records.push(
      pageRecord(cmsPath, meta.title, meta.description, [
        {
          blockType: "hero",
          heading: meta.title,
          subheading: meta.description,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: meta.title, href: cmsPath === "/" ? "/" : `${cmsPath}/` },
          ],
        },
        {
          blockType: "richText",
          content: textToLexical(meta.description),
        },
      ]),
    );
  }

  for (const city of getLiveCities()) {
    const meta = composeCityHubMeta(city);
    const cmsPath = `/areas-we-serve/${city.slug}`;
    records.push(
      pageRecord(cmsPath, meta.title, meta.description, [
        {
          blockType: "hero",
          heading: `${city.name}, TX`,
          subheading: city.shortDescription,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: "Areas We Serve", href: "/areas-we-serve/" },
            { label: city.name, href: `${cmsPath}/` },
          ],
        },
        {
          blockType: "richText",
          content: textToLexical(city.shortDescription),
        },
      ]),
    );
  }

  for (const { city, service } of getLiveCityServicePairs()) {
    const copy = composeCityServiceCopy(city, service);
    const cmsPath = `/areas-we-serve/${city.slug}/${service.slug}`;
    records.push(
      pageRecord(
        cmsPath,
        composeMetaTitle(city, service),
        composeMetaDescription(city, service),
        [
          {
            blockType: "hero",
            heading: copy.h1,
            subheading: service.shortDescription,
            breadcrumbs: [
              { label: "Home", href: "/" },
              { label: "Areas We Serve", href: "/areas-we-serve/" },
              { label: city.name, href: `/areas-we-serve/${city.slug}/` },
              { label: service.name, href: `${cmsPath}/` },
            ],
          },
          {
            blockType: "richText",
            content: textToLexical(
              [
                ...copy.introParagraphs,
                copy.whoWeServe,
                copy.whyChoose,
                copy.drivingDirections,
              ]
                .filter(Boolean)
                .join("\n\n"),
            ),
          },
          {
            blockType: "faq",
            title: "Frequently Asked Questions",
            items: copy.faqs.map((faq) => ({
              question: faq.q,
              answer: faq.a,
            })),
          },
        ],
      ),
    );
  }

  for (const { city, service, treatment } of getLiveCityServiceTreatmentTriples()) {
    const cmsPath = `/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}`;
    const title = `${treatment.name} in ${city.name}, TX`;
    const description = `${treatment.shortDescription} Available in ${city.name}, TX.`;
    records.push(
      pageRecord(cmsPath, title, description, [
        {
          blockType: "hero",
          heading: treatment.name,
          subheading: treatment.shortDescription,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: city.name, href: `/areas-we-serve/${city.slug}/` },
            {
              label: service.name,
              href: `/areas-we-serve/${city.slug}/${service.slug}/`,
            },
            { label: treatment.name, href: `${cmsPath}/` },
          ],
        },
        {
          blockType: "richText",
          content: textToLexical(treatment.longDescription),
        },
        {
          blockType: "faq",
          title: "Frequently Asked Questions",
          items: treatment.faqs.map((faq) => ({
            question: faq.q,
            answer: faq.a,
          })),
        },
      ]),
    );
  }

  for (const post of getAllPosts()) {
    const cmsPath = `/blog/${post.slug}`;
    records.push({
      collection: "posts",
      legacyId: `post:${post.slug}`,
      sourceUrl: cmsPath,
      data: {
        title: post.title,
        slug: post.slug,
        path: cmsPath,
        legacyId: `post:${post.slug}`,
        sourceUrl: cmsPath,
        excerpt: post.excerpt,
        category: post.category,
        authorName: post.author.name,
        content: blogBlocksToLexical(post.content),
        publishedAt: post.publishedAt,
        sourceUpdatedAt: post.updatedAt || post.publishedAt,
        meta: { title: post.title, description: post.excerpt },
        canonicalUrl: `${cmsPath}/`,
        _status: "draft",
      },
    });
  }

  return records;
}

function buildGlobals() {
  return {
    header: {
      phone: "(254) 213-2423",
      phoneTel: "+12542132423",
      address: "311 E. Stan Schlueter Loop #207, Killeen, TX",
      bookingUrl:
        "https://www.tebra.com/care/practice/central-texas-holistic-care-163683",
      nav: [
        { label: "Home", href: "/" },
        {
          label: "About Us",
          href: "/about-us/",
          children: [
            { label: "Blog", href: "/blog/", description: "Insights from our clinicians." },
            { label: "Contact Us", href: "/contact/", description: "Get in touch with our care team." },
            {
              label: "Patient Reviews",
              href: "/reviews/",
              description: "5-star Google reviews from CTHC patients.",
            },
          ],
        },
        {
          label: "Men",
          href: "/men/",
          children: [
            {
              label: "Testosterone Therapy",
              href: "/men/testosterone/",
              description: "Optimize energy, mood, and performance.",
            },
            {
              label: "Wellness Exams",
              href: "/men/wellness-exams/",
              description: "Comprehensive preventive screenings.",
            },
          ],
        },
        {
          label: "Women",
          href: "/women/",
          children: [
            {
              label: "Gynecological Exams",
              href: "/women/gynecological-exams/",
              description: "Routine women's health & screenings.",
            },
            {
              label: "Menopausal Disorders",
              href: "/women/menopausal-disorders/",
              description: "Personalized peri- and post-menopause care.",
            },
            {
              label: "Menstrual Disorders",
              href: "/women/menstrual-disorders/",
              description: "Hormone balance and cycle regulation.",
            },
          ],
        },
        {
          label: "IV Nutrition",
          href: "/iv-nutrition/",
          children: [
            { label: "Immune Booster", href: "/iv-nutrition/immune-booster/", description: "Strengthen your body's defense." },
            { label: "Workout Recovery", href: "/iv-nutrition/workout-recovery/", description: "Recharge, rebuild, refuel." },
            { label: "Myer's Cocktail", href: "/iv-nutrition/myers-cocktail/", description: "Energy, immunity & relief in one drip." },
            { label: "Cold & Flu", href: "/iv-nutrition/cold-and-flu/", description: "Fight symptoms fast and recover." },
            { label: "Hangover", href: "/iv-nutrition/hangover/", description: "Hydrate, detox, bounce back fast." },
          ],
        },
        { label: "Hormone Therapy", href: "/hormone-therapy/" },
        { label: "Stem Cells", href: "/stem-cells/", pulse: true },
        { label: "Payment Plans", href: "/payment-plans/" },
      ],
    },
    footer: {
      tagline: "Healing from the Inside Out",
      phone: "254-213-2423",
      phoneTel: "+12542132423",
      addressLine1: "311 E. Stan Schlueter Loop #207",
      addressLine2: "Killeen, TX 76542",
      hours: "Mon to Fri · 8:00 am to 5:00 pm",
      quickLinks: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us/" },
        { label: "Blog", href: "/blog/" },
        { label: "Men's Health", href: "/men/" },
        { label: "Women's Health", href: "/women/" },
        { label: "IV Nutrition", href: "/iv-nutrition/" },
        { label: "Hormone Therapy", href: "/hormone-therapy/" },
        { label: "Stem Cell Therapy", href: "/stem-cells/" },
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "Payment Plans", href: "/payment-plans/" },
        { label: "Patient Reviews", href: "/reviews/" },
        { label: "Contact", href: "/contact/" },
      ],
      services: [
        { label: "IV Infusion Therapy", href: "/iv-nutrition/" },
        { label: "Hormone Pelleting", href: "/hormone-therapy/" },
        { label: "Men's Health Optimization", href: "/men/testosterone/" },
        { label: "Chronic Care Management", href: "/about-us/" },
      ],
    },
    "site-settings": {
      siteName: "Central Texas Holistic Care",
      defaultDescription:
        "Central Texas Holistic Care (CTHC) specializes in individualized health plans combining traditional family medicine with holistic therapies.",
      bookingUrl:
        "https://www.tebra.com/care/practice/central-texas-holistic-care-163683",
      phone: "(254) 213-2423",
      phoneTel: "+12542132423",
      address: "311 E. Stan Schlueter Loop #207, Killeen, TX",
    },
  };
}

export function buildContentExport() {
  return {
    version: 1,
    records: buildRecords(),
    globals: buildGlobals(),
  };
}

if (process.argv[1]?.includes("build-export")) {
  const outDir = path.resolve("data");
  fs.mkdirSync(outDir, { recursive: true });
  const exportData = buildContentExport();
  const outFile = path.join(outDir, "content-export.json");
  fs.writeFileSync(outFile, JSON.stringify(exportData, null, 2));
  console.log(`Wrote ${exportData.records.length} records to ${outFile}`);
}
