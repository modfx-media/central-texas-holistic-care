import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import {
  getCity,
  getLiveCities,
  getLiveServices,
  getNearbyCities,
  type City,
  type Service,
} from "@/lib/locations";
import { composeCityHubMeta } from "@/lib/programmatic-content";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

type Params = { city: string };

/* -------------------------------------------------------------------------- */
/*                          Static params + metadata                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): Params[] {
  return getLiveCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city || !city.live) return {};

  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/`;
  const meta = composeCityHubMeta(city);

  return cmsMetadata(`/areas-we-serve/${city.slug}`, {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
      siteName: "Central Texas Holistic Care",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(meta.title)}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(meta.title)}`],
    },
    robots: { index: true, follow: true },
  });
}

/* -------------------------------------------------------------------------- */
/*                                 Page                                       */
/* -------------------------------------------------------------------------- */

export default async function CityHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city || !city.live) notFound();

  const services = getLiveServices();
  const nearby = getNearbyCities(city, 4);
  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/`;

  /* ----------------------------- JSON-LD ---------------------------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Serve",
        item: `${SITE_URL}/areas-we-serve/`,
      },
      { "@type": "ListItem", position: 3, name: city.name, item: canonical },
    ],
  };

  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Central Texas Holistic Care",
    url: canonical,
    telephone: "+1-254-213-2423",
    medicalSpecialty: ["Endocrinology", "InternalMedicine", "PrimaryCare"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "311 E. Stan Schlueter Loop, Suite 207",
      addressLocality: "Killeen",
      addressRegion: "TX",
      postalCode: "76542",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county} County, Texas`,
      },
    },
    geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
  };

  return (
    <CMSRoute path={`/areas-we-serve/${city.slug}`}>
    <>
      <Script
        id={`ld-city-${city.slug}-breadcrumb`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`ld-city-${city.slug}-business`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />

      <CityHubHero city={city} />

      {/* Overview */}
      <section className="bg-[var(--color-cream)] py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div>
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Serving {city.name}, {city.state}
                </p>
                <h2
                  className="mt-3 font-heading font-light leading-tight text-[var(--color-forest)]"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                >
                  Care built for the way {city.name} lives
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                  {city.shortDescription}
                </p>
                <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
                  Our clinic in Killeen is about{" "}
                  <span className="font-medium text-[var(--color-forest)]">
                    {city.driveTimeMin} minutes
                  </span>{" "}
                  from {city.name} via {city.primaryRoute}, with parking right out front.
                </p>
              </div>

              <aside className="rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-6">
                <h3 className="font-heading text-lg font-light text-[var(--color-forest)]">
                  Quick facts
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <CityFact icon={Clock} label="Drive time" value={`~${city.driveTimeMin} min via ${city.primaryRoute}`} />
                  <CityFact icon={MapPin} label="County" value={`${city.county} County, ${city.state}`} />
                  <CityFact icon={MapPin} label="ZIPs served" value={city.zipCodes.join(", ")} />
                </dl>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a3a0a]"
                >
                  Book a consultation
                </a>
                <a
                  href="tel:+12542132423"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
                >
                  <Phone aria-hidden className="size-3.5" /> (254) 213-2423
                </a>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Services for {city.name} patients
              </p>
              <h2
                className="mt-3 font-heading font-light leading-tight text-[var(--color-forest)]"
                style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
              >
                What we treat in {city.name}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <ServiceCard city={city} service={service} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="bg-[var(--color-cream)] py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-light text-[var(--color-forest)]">
                Nearby communities we also serve
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/areas-we-serve/${c.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white px-4 py-2 text-sm font-medium text-[var(--color-forest)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <MapPin aria-hidden className="size-3.5" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}
    </>
    </CMSRoute>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 UI parts                                   */
/* -------------------------------------------------------------------------- */

function CityHubHero({ city }: { city: City }) {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[var(--color-forest)] text-white"
      style={{ minHeight: 360 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #1a3a0a 0%, #2D5016 60%, #244010 100%)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.10]"
      >
        <defs>
          <pattern id={`city-${city.slug}-dots`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill={`url(#city-${city.slug}-dots)`} />
      </svg>

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:text-sm">
            <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li><Link href="/areas-we-serve/" className="transition-colors hover:text-white">Areas We Serve</Link></li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li aria-current="page" className="text-white/90">{city.name}</li>
          </ol>
        </nav>

        <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {city.county} County, {city.state}
        </p>
        <h1
          className="mt-3 max-w-3xl font-heading font-light leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
        >
          Holistic care for{" "}
          <span className="italic text-[var(--color-accent)]">{city.name}, TX</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          Hormone therapy, IV nutrition, testosterone replacement, and wellness medicine
          for {city.name} residents. Roughly {city.driveTimeMin} minutes from {city.name} via {city.primaryRoute}.
        </p>
      </div>
    </section>
  );
}

function CityFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" />
      <div>
        <dt className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted,#6B6B6B)]">{label}</dt>
        <dd className="mt-0.5 text-sm text-[var(--color-forest)]">{value}</dd>
      </div>
    </div>
  );
}

function ServiceCard({ city, service }: { city: City; service: Service }) {
  return (
    <Link
      href={`/areas-we-serve/${city.slug}/${service.slug}/`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg"
    >
      <span
        aria-hidden
        className="absolute right-5 top-5 h-3 w-3 border-r-2 border-t-2 border-[var(--color-accent)] opacity-60 transition-opacity group-hover:opacity-100"
      />
      <h3 className="font-heading text-xl font-light text-[var(--color-forest)]">
        {service.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
        {service.shortDescription}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
        Learn more
        <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

