import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import Script from "next/script";
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import {
  getLiveCities,
  getLiveCityServiceTreatmentTriples,
  getLiveServices,
  getTreatmentsForService,
  type City,
  type Service,
} from "@/lib/locations";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const CANONICAL = `${SITE_URL}/areas-we-serve/`;
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

const PAGE_TITLE = "Areas We Serve | Central Texas Holistic Care";
const PAGE_DESCRIPTION =
  "Central Texas Holistic Care serves Killeen, Harker Heights, Copperas Cove, and surrounding Bell and Coryell County communities with hormone therapy and IV.";

const pageMetadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    type: "website",
    siteName: "Central Texas Holistic Care",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(PAGE_TITLE)}`,
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
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent(PAGE_TITLE)}`],
  },
  robots: { index: true, follow: true },
}

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/areas-we-serve", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Areas We Serve", item: CANONICAL },
  ],
};

const itemListSchema = (cities: City[], services: Service[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Areas We Serve",
  itemListElement: cities.flatMap((city, ci) =>
    services.map((service, si) => ({
      "@type": "ListItem",
      position: ci * services.length + si + 1,
      url: `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/`,
      name: `${service.name} in ${city.name}, TX`,
    })),
  ),
});

export default function AreasWeServePage() {
  const cities = getLiveCities();
  const services = getLiveServices();
  const triples = getLiveCityServiceTreatmentTriples();
  const totalPages = cities.length * services.length;
  const totalProtocolPages = triples.length;

  const flatPages = cities
    .flatMap((city) =>
      services.map((service) => ({
        href: `/areas-we-serve/${city.slug}/${service.slug}/`,
        label: `${service.name} in ${city.name}, TX`,
      })),
    )
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <CMSRoute path="/areas-we-serve">
    <>
      <Script
        id="ld-areas-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ld-areas-itemlist"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(cities, services)),
        }}
      />

      <AreasHero
        cities={cities}
        services={services}
        totalPages={totalPages}
        totalProtocolPages={totalProtocolPages}
      />

      {/* ──────────────── Cities ──────────────── */}
      <section className="bg-[var(--color-cream)] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Central Texas
              </p>
              <h2
                className="mt-3 font-heading font-light leading-tight text-[var(--color-forest)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Communities we care for
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                Our clinic in Killeen sits at the center of Bell County, with patients
                driving in from the surrounding communities every week. Pick your city
                to see the services we offer there.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <CityCard city={city} services={services} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-14 text-center text-sm text-[var(--color-text-muted,#6B6B6B)]">
              Outside these cities? We treat patients from Belton, Temple, Nolanville,
              Lampasas, Salado, and beyond. Call{" "}
              <a className="text-[var(--color-forest)] underline" href="tel:+12542132423">
                (254) 213-2423
              </a>{" "}
              to confirm we serve your area.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────── Service × City directory ──────────────── */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-20">
        <svg
          aria-hidden
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        >
          <defs>
            <pattern id="dir-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0 L0 0 0 56" fill="none" stroke="#C4A862" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#dir-grid)" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Service directory
              </p>
              <h2
                className="mt-3 font-heading font-light leading-tight text-[var(--color-forest)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Every service, every city
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                Find the page that matches your service and your city. Each one
                includes local drive-time, directions, and FAQs written for that
                community.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {services.map((s) => (
                <li
                  key={s.slug}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)]/70 px-3 py-1.5 text-xs font-medium text-[var(--color-forest)] backdrop-blur"
                >
                  <Sparkles aria-hidden className="size-3.5 text-[var(--color-accent)]" />
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-14 space-y-12">
            {cities.map((city, ci) => (
              <Reveal key={city.slug} delay={0.05 + ci * 0.04}>
                <div className="rounded-3xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                  <div className="flex flex-col gap-4 border-b border-[var(--color-border,rgba(45,80,22,0.10))] pb-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="font-serif text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {city.county} County, TX
                      </p>
                      <h3
                        className="mt-2 font-heading font-light leading-tight text-[var(--color-forest)]"
                        style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.125rem)" }}
                      >
                        {city.name}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-base">
                        {city.shortDescription}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted,#6B6B6B)]">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)]/70 px-3 py-1.5">
                        <Clock aria-hidden className="size-3.5 text-[var(--color-accent)]" />
                        ~{city.driveTimeMin} min via {city.primaryRoute}
                      </span>
                      <Link
                        href={`/areas-we-serve/${city.slug}/`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)] px-4 py-1.5 font-medium text-white transition-colors hover:bg-[#1a3a0a]"
                      >
                        View {city.name} hub
                        <ChevronRight aria-hidden className="size-3.5" />
                      </Link>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <ServiceTile city={city} service={service} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* A-Z index of every local page */}
          <Reveal delay={0.1}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)]/60 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-3 border-b border-[var(--color-border,rgba(45,80,22,0.10))] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-serif text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    A to Z index
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
                    Browse all {totalPages} local pages
                  </h3>
                </div>
                <p className="max-w-sm text-xs text-[var(--color-text-muted,#6B6B6B)] sm:text-right sm:text-sm">
                  Every service x city combination, alphabetized. Click through to the
                  page that fits your search.
                </p>
              </div>

              <ol className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {flatPages.map((entry, idx) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="group flex items-baseline gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white"
                    >
                      <span className="w-7 shrink-0 text-right font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-accent)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-sm text-[var(--color-forest)] underline-offset-4 group-hover:underline">
                        {entry.label}
                      </span>
                      <ChevronRight
                        aria-hidden
                        className="size-3 shrink-0 text-[var(--color-accent)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────── Closing CTA ──────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-forest)] py-20 text-white sm:py-24">
        <svg
          aria-hidden
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        >
          <defs>
            <pattern id="cta-areas-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill="url(#cta-areas-dots)" />
        </svg>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2
              className="font-heading font-light leading-tight"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
            >
              Ready to be{" "}
              <span className="italic text-[var(--color-accent)]">seen</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              Same-day consultations are typically available. Book online or give us a
              call to confirm your service and we will take it from there.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[#d4bb74]"
              >
                Book a consultation
                <ChevronRight aria-hidden className="size-3.5" />
              </a>
              <a
                href="tel:+12542132423"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
              >
                <Phone aria-hidden className="size-3.5" /> (254) 213-2423
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
      </CMSRoute>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 UI parts                                   */
/* -------------------------------------------------------------------------- */

function CityCard({ city, services }: { city: City; services: Service[] }) {
  return (
    <Link
      href={`/areas-we-serve/${city.slug}/`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg"
    >
      <span
        aria-hidden
        className="absolute right-5 top-5 h-3 w-3 border-r-2 border-t-2 border-[var(--color-accent)] opacity-60 transition-opacity group-hover:opacity-100"
      />

      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
        <MapPin aria-hidden className="size-3.5" />
        <span>{city.county} County, TX</span>
      </div>

      <h3 className="mt-3 font-heading text-2xl font-light text-[var(--color-forest)]">
        {city.name}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
        {city.shortDescription}
      </p>

      <p className="mt-5 text-xs text-[var(--color-text-muted,#6B6B6B)]">
        <span className="font-medium text-[var(--color-forest)]">{services.length}</span>{" "}
        services available
      </p>

      <div className="mt-5 flex items-center justify-between text-xs text-[var(--color-text-muted,#6B6B6B)]">
        <span>~{city.driveTimeMin} min from clinic</span>
        <span className="inline-flex items-center gap-1 font-medium text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
          View services
          <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function ServiceTile({ city, service }: { city: City; service: Service }) {
  return (
    <Link
      href={`/areas-we-serve/${city.slug}/${service.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)]/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-white hover:shadow-md"
    >
      <span
        aria-hidden
        className="absolute right-4 top-4 h-2 w-2 border-r-[1.5px] border-t-[1.5px] border-[var(--color-accent)] opacity-50 transition-opacity group-hover:opacity-100"
      />

      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
        <Stethoscope aria-hidden className="size-3" />
        {service.name}
      </div>

      <h4 className="mt-2 font-heading text-base font-light leading-snug text-[var(--color-forest)] sm:text-lg">
        {service.name} in {city.name}
      </h4>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
        {service.shortDescription}
      </p>

      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
        Read the page
        <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function AreasHero({
  cities,
  services,
  totalPages,
  totalProtocolPages,
}: {
  cities: City[];
  services: Service[];
  totalPages: number;
  totalProtocolPages: number;
}) {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[var(--color-forest)] text-white"
      style={{ minHeight: 400 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #1a3a0a 0%, #2D5016 60%, #244010 100%)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.10]"
      >
        <defs>
          <pattern id="areas-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#areas-dots)" />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(108,190,69,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(196,168,98,0.20), transparent 70%)",
        }}
      />

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight aria-hidden className="size-3.5 text-white/40" />
            </li>
            <li aria-current="page" className="text-white/90">
              Areas We Serve
            </li>
          </ol>
        </nav>

        <h1
          className="max-w-3xl font-heading font-light leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
        >
          Hormone, IV, and wellness care for{" "}
          <span className="italic text-[var(--color-accent)]">Central Texas</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          Patients from across Bell and Coryell County trust Central Texas Holistic Care
          for lab-guided hormone therapy, physician-supervised IV nutrition, and
          root-cause wellness medicine.
        </p>

        <dl className="mt-8 grid max-w-2xl grid-cols-4 gap-3 rounded-2xl border border-[var(--color-accent)]/25 bg-[#0b1d04]/45 p-4 backdrop-blur">
          <Stat label="Cities served" value={String(cities.length)} />
          <Stat label="Services" value={String(services.length)} />
          <Stat label="City pages" value={String(totalPages)} />
          <Stat label="Protocol pages" value={String(totalProtocolPages)} />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="font-heading text-2xl font-light text-[var(--color-accent)] sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
        {label}
      </dd>
    </div>
  );
}
