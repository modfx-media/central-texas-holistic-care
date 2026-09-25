import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";
import {
  getCity,
  getLiveCityServicePairs,
  getLiveServices,
  getNearbyCities,
  getService,
  getTreatmentsForService,
  type City,
  type Service,
} from "@/lib/locations";
import {
  composeCityServiceCopy,
  composeMetaDescription,
  composeMetaTitle,
} from "@/lib/programmatic-content";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

type Params = { city: string; service: string };

/* -------------------------------------------------------------------------- */
/*                          Static params + metadata                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): Params[] {
  return getLiveCityServicePairs().map(({ city, service }) => ({
    city: city.slug,
    service: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city?.live || !service?.live) return {};

  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/`;
  const title = composeMetaTitle(city, service);
  const description = composeMetaDescription(city, service);

  return cmsMetadata(`/areas-we-serve/${city.slug}/${service.slug}`, {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Central Texas Holistic Care",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(title)}`],
    },
    robots: { index: true, follow: true },
  });
}

/* -------------------------------------------------------------------------- */
/*                                 Page                                       */
/* -------------------------------------------------------------------------- */

export default async function CityServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city?.live || !service?.live) notFound();

  const copy = composeCityServiceCopy(city, service);
  const nearby = getNearbyCities(city, 4);
  const otherServices = getLiveServices().filter((s) => s.slug !== service.slug);
  const treatments = getTreatmentsForService(service.slug);
  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/`;

  /* ----------------------------- JSON-LD ---------------------------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve/` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${SITE_URL}/areas-we-serve/${city.slug}/` },
      { "@type": "ListItem", position: 4, name: service.name, item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": service.schemaType,
    name: `${service.name} in ${city.name}, ${city.state}`,
    alternateName: service.secondaryKeywords,
    description: service.shortDescription,
    url: canonical,
    medicalSpecialty: service.schemaSpecialty,
    availableService: {
      "@type": "MedicalProcedure",
      name: service.name,
      description: service.longDescription,
    },
    provider: {
      "@type": "MedicalBusiness",
      name: "Central Texas Holistic Care",
      url: `${SITE_URL}/`,
      telephone: "+1-254-213-2423",
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
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* ------------------------------ Render ---------------------------------- */

  return (
    <CMSRoute path={`/areas-we-serve/${city.slug}/${service.slug}`}>
    <>
      <Script
        id={`ld-${city.slug}-${service.slug}-breadcrumb`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`ld-${city.slug}-${service.slug}-service`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`ld-${city.slug}-${service.slug}-faq`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServiceCityHero city={city} service={service} h1={copy.h1} />

      {/* Overview / intro */}
      <section className="bg-[var(--color-cream)] py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <div className="space-y-5">
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {service.name} for {city.name}, {city.state}
                </p>
                <h2
                  className="font-heading font-light leading-tight text-[var(--color-forest)]"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                >
                  An overview
                </h2>
                {copy.introParagraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>

              <aside className="rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-6">
                <h3 className="font-heading text-lg font-light text-[var(--color-forest)]">
                  Visit details
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <Fact icon={Clock} label="Drive time" value={`~${city.driveTimeMin} min via ${city.primaryRoute}`} />
                  <Fact icon={MapPin} label="Clinic" value="311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542" />
                  <Fact icon={ShieldCheck} label="Provider" value="Clinician-led, lab-guided care" />
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

      {/* Who we serve */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              Who we serve in {city.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {copy.whoWeServe}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              Why patients in {city.name} choose Central Texas Holistic Care
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {copy.whyChoose}
            </p>
            <h3 className="mt-8 font-heading text-xl font-light text-[var(--color-forest)]">
              What a visit from {city.name} looks like
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {copy.whatToExpect}
            </p>
            <h3 className="mt-8 font-heading text-xl font-light text-[var(--color-forest)]">
              Who in {city.name} this is for
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {copy.candidacy}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-4"
                >
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-forest)]">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              What to expect
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={0.05 * i}>
                <li className="relative h-full rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] p-6">
                  <span
                    aria-hidden
                    className="absolute right-5 top-5 font-heading text-3xl font-light text-[var(--color-accent)]/40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-light text-[var(--color-forest)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Conditions addressed */}
      <section className="bg-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              Conditions and concerns we address
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.addresses.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-forest)]">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Driving directions */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              Getting here from {city.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {copy.drivingDirections}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specific treatments */}
      {treatments.length > 0 && (
        <section className="bg-[var(--color-cream)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Specific protocols
              </p>
              <h2 className="mt-3 font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
                {service.name} protocols available to {city.name} patients
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                {service.name} is not one product, it is a set of protocols. Below are
                the specific routes we use, each with its own page describing how it
                works, who it fits, and what to expect.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {treatments.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/areas-we-serve/${city.slug}/${service.slug}/${t.slug}/`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-md"
                    >
                      <span
                        aria-hidden
                        className="absolute right-4 top-4 h-2 w-2 border-r-[1.5px] border-t-[1.5px] border-[var(--color-accent)] opacity-50 transition-opacity group-hover:opacity-100"
                      />
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {service.name}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-light leading-snug text-[var(--color-forest)] sm:text-lg">
                        {t.name} in {city.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
                        {t.shortDescription}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
                        Read the protocol
                        <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Frequently asked
            </p>
            <h2 className="mt-3 font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              {service.name} questions from {city.name} patients
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <Accordion
                items={copy.faqs.map((f, i) => ({
                  value: `faq-${i}`,
                  title: f.q,
                  content: f.a,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nearby cities + cross-service links */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {nearby.length > 0 && (
            <Reveal>
              <h2 className="font-heading text-2xl font-light text-[var(--color-forest)]">
                {service.name} in nearby communities
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/areas-we-serve/${c.slug}/${service.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] px-4 py-2 text-sm font-medium text-[var(--color-forest)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <MapPin aria-hidden className="size-3.5" />
                      {service.name} in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {otherServices.length > 0 && (
            <Reveal delay={0.1}>
              <h2 className="mt-12 font-heading text-2xl font-light text-[var(--color-forest)]">
                Other services we offer in {city.name}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/areas-we-serve/${city.slug}/${s.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] px-4 py-2 text-sm font-medium text-[var(--color-forest)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      {s.name} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <p className="mt-12 text-sm text-[var(--color-text-muted,#6B6B6B)]">
              Looking for the full {service.name.toLowerCase()} program details?{" "}
              <Link href={service.hubHref} className="text-[var(--color-forest)] underline">
                Visit our main {service.name} page
              </Link>{" "}
              or{" "}
              <Link href={`/areas-we-serve/${city.slug}/`} className="text-[var(--color-forest)] underline">
                see all services for {city.name}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[var(--color-forest)] py-20 text-white sm:py-24">
        <svg
          aria-hidden
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-[0.08]"
        >
          <defs>
            <pattern id={`cta-${city.slug}-${service.slug}-dots`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill={`url(#cta-${city.slug}-${service.slug}-dots)`} />
        </svg>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2
              className="font-heading font-light leading-tight"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
            >
              Ready to start{" "}
              <span className="italic text-[var(--color-accent)]">{service.shortName}</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              {copy.closingCta}
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

function ServiceCityHero({
  city,
  service,
  h1,
}: {
  city: City;
  service: Service;
  h1: string;
}) {
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
          <pattern id={`svc-${city.slug}-${service.slug}-dots`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill={`url(#svc-${city.slug}-${service.slug}-dots)`} />
      </svg>

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:text-sm">
            <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li><Link href="/areas-we-serve/" className="transition-colors hover:text-white">Areas We Serve</Link></li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li><Link href={`/areas-we-serve/${city.slug}/`} className="transition-colors hover:text-white">{city.name}</Link></li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li aria-current="page" className="text-white/90">{service.name}</li>
          </ol>
        </nav>

        <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {service.name}
        </p>
        <h1
          className="mt-3 max-w-3xl font-heading font-light leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
        >
          {h1.replace(`${city.name}, TX`, "")}
          <span className="italic text-[var(--color-accent)]">{city.name}, TX</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          {service.shortDescription}
        </p>
      </div>
    </section>
  );
}

function Fact({
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
