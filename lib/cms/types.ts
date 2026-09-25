export type CmsSeo = {
  title?: string | null;
  description?: string | null;
  image?: { url?: string | null; alt?: string | null } | number | null;
};

export type CmsHeroBlock = {
  blockType: "hero";
  heading?: string | null;
  subheading?: string | null;
  backgroundImage?: { url?: string | null } | number | null;
  breadcrumbs?: { label: string; href: string }[] | null;
};

export type CmsRichTextBlock = {
  blockType: "richText";
  content?: unknown;
};

export type CmsFaqBlock = {
  blockType: "faq";
  eyebrow?: string | null;
  title?: string | null;
  intro?: string | null;
  items?: { question: string; answer: string }[] | null;
};

export type CmsCtaBlock = {
  blockType: "cta";
  heading?: string | null;
  body?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
};

export type CmsBlock = CmsHeroBlock | CmsRichTextBlock | CmsFaqBlock | CmsCtaBlock;

export type CmsRoutedDoc = {
  id: string | number;
  title?: string | null;
  slug?: string | null;
  path?: string | null;
  excerpt?: string | null;
  authorName?: string | null;
  content?: unknown;
  layout?: CmsBlock[] | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  excludeFromSitemap?: boolean | null;
  meta?: CmsSeo | null;
  updatedAt?: string | null;
  sourceUpdatedAt?: string | null;
  publishedAt?: string | null;
};

export type RoutedContent = {
  collection: "pages" | "posts";
  doc: CmsRoutedDoc;
};

export type CmsNavChild = {
  label: string;
  href: string;
  description?: string | null;
};

export type CmsNavItem = {
  label: string;
  href: string;
  pulse?: boolean | null;
  children?: CmsNavChild[] | null;
};

export type CmsHeader = {
  phone?: string | null;
  phoneTel?: string | null;
  address?: string | null;
  bookingUrl?: string | null;
  nav?: CmsNavItem[] | null;
};

export type CmsFooterLink = {
  label?: string | null;
  href?: string | null;
  external?: boolean | null;
};

export type CmsFooter = {
  tagline?: string | null;
  phone?: string | null;
  phoneTel?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  hours?: string | null;
  quickLinks?: CmsFooterLink[] | null;
  services?: CmsFooterLink[] | null;
};

export type CmsSiteSettings = {
  siteName?: string | null;
  defaultDescription?: string | null;
  bookingUrl?: string | null;
  phone?: string | null;
  phoneTel?: string | null;
  address?: string | null;
};

export type CmsSeoDoc = {
  path: string;
  noIndex?: boolean | null;
  excludeFromSitemap?: boolean | null;
  updatedAt?: string | null;
  sourceUpdatedAt?: string | null;
};
