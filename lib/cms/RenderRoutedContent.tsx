import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

import PageHero from "@/components/layout/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";

import type {
  CmsBlock,
  CmsCtaBlock,
  CmsFaqBlock,
  CmsHeroBlock,
  CmsRoutedDoc,
} from "./types";

function mediaSrc(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: string | null }).url;
    return url ?? undefined;
  }
  return undefined;
}

function Hero({ block }: { block: CmsHeroBlock }) {
  return (
    <PageHero
      title={block.heading || ""}
      subtitle={block.subheading || undefined}
      breadcrumbs={
        block.breadcrumbs?.map((crumb) => ({
          label: crumb.label,
          href: crumb.href,
        })) ?? [{ label: "Home", href: "/" }]
      }
      backgroundImage={mediaSrc(block.backgroundImage)}
    />
  );
}

function Faq({ block }: { block: CmsFaqBlock }) {
  const items =
    block.items?.map((item) => ({
      question: item.question,
      answer: item.answer,
    })) ?? [];
  if (items.length === 0) return null;
  return (
    <FaqAccordion
      items={items}
      eyebrow={block.eyebrow || undefined}
      title={block.title || undefined}
      intro={block.intro || undefined}
      emitJsonLd
    />
  );
}

function Cta({ block }: { block: CmsCtaBlock }) {
  const href = block.buttonHref || "/contact/";
  const label = block.buttonLabel || "Book an appointment";
  return (
    <section className="bg-[color:var(--color-cream-soft)] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {block.heading ? (
          <h2 className="font-heading text-3xl font-light text-[#1a3a0a] sm:text-4xl">
            {block.heading}
          </h2>
        ) : null}
        {block.body ? (
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            {block.body}
          </p>
        ) : null}
        <Link
          href={href}
          className="mt-8 inline-flex items-center rounded-full bg-[#2D5016] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2D5016]/20 transition-colors hover:bg-[#1a3a0a]"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}

function BlockView({ block }: { block: CmsBlock }) {
  switch (block.blockType) {
    case "hero":
      return <Hero block={block} />;
    case "richText":
      return block.content ? (
        <section className="bg-[color:var(--color-cream-soft)] py-12 sm:py-16">
          <div className="prose prose-stone mx-auto max-w-3xl px-4 sm:px-6">
            <RichText data={block.content as never} />
          </div>
        </section>
      ) : null;
    case "faq":
      return <Faq block={block} />;
    case "cta":
      return <Cta block={block} />;
    default:
      return null;
  }
}

export function RenderRoutedContent({
  doc,
  collection,
}: {
  doc: CmsRoutedDoc;
  collection: "pages" | "posts";
}) {
  if (collection === "posts") {
    return (
      <article className="bg-[color:var(--color-cream-soft)]">
        <PageHero
          title={doc.title || "Article"}
          subtitle={doc.excerpt || undefined}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
            {
              label: doc.title || "Article",
              href: doc.path ? `${doc.path}/` : "/blog/",
            },
          ]}
        />
        {doc.content ? (
          <div className="prose prose-stone mx-auto max-w-3xl px-4 pb-20 sm:px-6">
            <RichText data={doc.content as never} />
          </div>
        ) : null}
      </article>
    );
  }

  const blocks = doc.layout ?? [];
  if (blocks.length === 0) {
    return (
      <PageHero
        title={doc.title || "Page"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: doc.title || "Page", href: doc.path ? `${doc.path}/` : "/" },
        ]}
      />
    );
  }

  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={`${block.blockType}-${index}`} block={block} />
      ))}
    </>
  );
}
