import Link from "next/link";

import type { DepthPage } from "@/lib/enriched-local-copy";

export function DepthArticle({ page }: { page: DepthPage }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
        {page.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.links && section.links.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] px-4 py-2 text-sm font-medium text-[var(--color-forest)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
