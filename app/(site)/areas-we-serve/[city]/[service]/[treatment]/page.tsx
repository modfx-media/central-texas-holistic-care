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
  ListChecks,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { composeTreatmentNarrative } from "@/lib/programmatic-content";
import Accordion from "@/components/ui/Accordion";
import {
  getCity,
  getLiveCityServiceTreatmentTriples,
  getNearbyCities,
  getService,
  getTreatment,
  getTreatmentsForService,
  type City,
  type Service,
  type Treatment,
} from "@/lib/locations";

const SITE_URL = "https://centraltexasholisticcarepllc.com";
const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

type Params = { city: string; service: string; treatment: string };

/* -------------------------------------------------------------------------- */
/*                          Static params + metadata                          */
/* -------------------------------------------------------------------------- */

export function generateStaticParams(): Params[] {
  return getLiveCityServiceTreatmentTriples().map(({ city, service, treatment }) => ({
    city: city.slug,
    service: service.slug,
    treatment: treatment.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug, treatment: treatmentSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  const treatment = getTreatment(treatmentSlug);
  if (!city?.live || !service?.live || !treatment?.live) return {};
  if (treatment.serviceSlug !== service.slug) return {};

  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}/`;
  const title = `${treatment.name} in ${city.name}, TX`;
  const description = `${treatment.shortDescription} Seen at our Killeen clinic, about ${city.driveTimeMin} minutes from ${city.name} via ${city.primaryRoute}.`;

  return cmsMetadata(
    `/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}`,
    {
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
    },
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Page                                       */
/* -------------------------------------------------------------------------- */

export default async function CityServiceTreatmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city: citySlug, service: serviceSlug, treatment: treatmentSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  const treatment = getTreatment(treatmentSlug);
  if (!city?.live || !service?.live || !treatment?.live) notFound();
  if (treatment.serviceSlug !== service.slug) notFound();

  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}/`;
  const siblings = getTreatmentsForService(service.slug).filter((t) => t.slug !== treatment.slug);
  const nearby = getNearbyCities(city, 4);

  const localFaq = {
    q: `Do you offer ${treatment.name.toLowerCase()} for ${city.name} patients?`,
    a: `Yes. ${city.name} residents reach our Killeen clinic in about ${city.driveTimeMin} minutes via ${city.primaryRoute}. We coordinate ${treatment.name.toLowerCase()} alongside your overall ${service.shortName} plan, and most ${city.name} patients schedule labs and the consult on the same visit so the trip is worth the drive.`,
  };
  const allFaqs = [...treatment.faqs, localFaq];

  /* ----------------------------- JSON-LD ---------------------------------- */

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve/` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${SITE_URL}/areas-we-serve/${city.slug}/` },
      {
        "@type": "ListItem",
        position: 4,
        name: service.name,
        item: `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}/`,
      },
      { "@type": "ListItem", position: 5, name: treatment.name, item: canonical },
    ],
  };

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: `${treatment.name} in ${city.name}, ${city.state}`,
    alternateName: treatment.secondaryKeywords,
    description: treatment.shortDescription,
    url: canonical,
    procedureType: service.schemaType,
    bodyLocation: service.schemaSpecialty,
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
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  /* ------------------------------ Render ---------------------------------- */

  return (
    <CMSRoute path={`/areas-we-serve/${city.slug}/${service.slug}/${treatment.slug}`}>
    <>
      <Script
        id={`ld-${city.slug}-${service.slug}-${treatment.slug}-breadcrumb`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`ld-${city.slug}-${service.slug}-${treatment.slug}-procedure`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <Script
        id={`ld-${city.slug}-${service.slug}-${treatment.slug}-faq`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TreatmentHero city={city} service={service} treatment={treatment} />

      {/* Intro + visit details */}
      <section className="bg-[var(--color-cream)] py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <div className="space-y-5">
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {treatment.name} for {city.name}, {city.state}
                </p>
                <h2
                  className="font-heading font-light leading-tight text-[var(--color-forest)]"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                >
                  An overview
                </h2>
                <p className="text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                  {composeTreatmentNarrative(city, service, treatment).map((paragraph) => (
                    <span key={paragraph.slice(0, 24)} className="mt-4 block">
                      {paragraph}
                    </span>
                  ))}
                </p>
                <p className="text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                  {city.name} patients typically reach our Killeen clinic in about
                  {" "}
                  {city.driveTimeMin} minutes via {city.primaryRoute}. Most schedule the
                  consult and any labs back-to-back so the trip from {city.county} County
                  is worth it. We coordinate {treatment.name.toLowerCase()} as part of
                  your overall {service.shortName} plan, not as a one-off purchase.
                </p>
              </div>

              <aside className="rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-6">
                <h3 className="font-heading text-lg font-light text-[var(--color-forest)]">
                  Visit details
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <Fact icon={Clock} label="Drive time" value={`~${city.driveTimeMin} min via ${city.primaryRoute}`} />
                  <Fact icon={MapPin} label="Clinic" value="311 E. Stan Schlueter Loop, Suite 207, Killeen, TX 76542" />
                  <Fact icon={ShieldCheck} label="Oversight" value="Clinician-led, clinician-supervised" />
                  <Fact icon={Stethoscope} label="Service area" value={`${service.name} program`} />
                </dl>
                <Link
                  href={`/areas-we-serve/${city.slug}/${service.slug}/`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
                >
                  View the full {service.name} page
                </Link>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a3a0a]"
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

      {/* Indicated for */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              Who {treatment.name.toLowerCase()} is for
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              Most {city.name} patients we treat with {treatment.name.toLowerCase()} fit one
              of the patterns below. If you do not see your situation here, the consult is
              still worth booking, every plan is built around your labs and goals.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {treatment.indicatedFor.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] p-4"
                >
                  <ListChecks aria-hidden className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-forest)]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              What you can expect
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {treatment.benefits.map((b, i) => (
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

      {/* Protocol */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              The protocol
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
              {treatment.protocol}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related treatments in same service */}
      {siblings.length > 0 && (
        <section className="bg-[var(--color-cream)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
                Other {service.name.toLowerCase()} options in {city.name}
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                Not sure {treatment.name.toLowerCase()} is the right route? These are the
                other {service.name.toLowerCase()} protocols we offer for {city.name}
                {" "}patients.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {siblings.map((sib) => (
                  <li key={sib.slug}>
                    <Link
                      href={`/areas-we-serve/${city.slug}/${service.slug}/${sib.slug}/`}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-md"
                    >
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <Sparkles aria-hidden className="size-3" />
                        {service.name}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-light leading-snug text-[var(--color-forest)]">
                        {sib.name} in {city.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted,#6B6B6B)]">
                        {sib.shortDescription}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
                        Read the page
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

      {/* Same treatment in nearby cities */}
      {nearby.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
                {treatment.name} in nearby cities
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-muted,#6B6B6B)] sm:text-lg">
                We also see {treatment.name.toLowerCase()} patients from the surrounding
                Central Texas communities below.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/areas-we-serve/${c.slug}/${service.slug}/${treatment.slug}/`}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border,rgba(45,80,22,0.12))] bg-[var(--color-cream)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-white hover:shadow-md"
                    >
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <MapPin aria-hidden className="size-3" />
                        {c.county} County
                      </span>
                      <h3 className="mt-2 font-heading text-base font-light leading-snug text-[var(--color-forest)]">
                        {treatment.name} in {c.name}
                      </h3>
                      <p className="mt-2 text-xs text-[var(--color-text-muted,#6B6B6B)]">
                        ~{c.driveTimeMin} min from clinic
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-[var(--color-forest)] transition-colors group-hover:text-[var(--color-accent)]">
                        See {c.name} page
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

      {/* FAQ */}
      <section className="bg-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-light text-[var(--color-forest)] sm:text-3xl">
              {treatment.name} questions
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8">
              <Accordion
                items={allFaqs.map((f, i) => ({
                  value: `faq-${i}`,
                  title: f.q,
                  content: <p className="text-[var(--color-text-muted,#6B6B6B)]">{f.a}</p>,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[var(--color-forest)] py-20 text-white sm:py-24">
        <svg
          aria-hidden
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        >
          <defs>
            <pattern id={`cta-tr-${treatment.slug}-dots`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill={`url(#cta-tr-${treatment.slug}-dots)`} />
        </svg>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2
              className="font-heading font-light leading-tight"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
            >
              Ready to talk about{" "}
              <span className="italic text-[var(--color-accent)]">{treatment.name.toLowerCase()}</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              Book a consult and we will start with labs, then build a plan that fits
              your goals and your schedule, with the drive from {city.name} built in.
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

function TreatmentHero({
  city,
  service,
  treatment,
}: {
  city: City;
  service: Service;
  treatment: Treatment;
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
          <pattern id={`tr-hero-dots-${treatment.slug}-${city.slug}`} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#C4A862" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill={`url(#tr-hero-dots-${treatment.slug}-${city.slug})`} />
      </svg>

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60 sm:text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
            </li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li>
              <Link href="/areas-we-serve/" className="transition-colors hover:text-white">
                Areas We Serve
              </Link>
            </li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li>
              <Link href={`/areas-we-serve/${city.slug}/`} className="transition-colors hover:text-white">
                {city.name}
              </Link>
            </li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li>
              <Link
                href={`/areas-we-serve/${city.slug}/${service.slug}/`}
                className="transition-colors hover:text-white"
              >
                {service.name}
              </Link>
            </li>
            <li><ChevronRight aria-hidden className="size-3.5 text-white/40" /></li>
            <li aria-current="page" className="text-white/90">{treatment.name}</li>
          </ol>
        </nav>

        <h1
          className="max-w-3xl font-heading font-light leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
        >
          {treatment.name} in{" "}
          <span className="italic text-[var(--color-accent)]">{city.name}, TX</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          {treatment.shortDescription}
        </p>

        <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-[var(--color-accent)]/25 bg-[#0b1d04]/45 p-4 backdrop-blur">
          <HeroStat label="Drive time" value={`~${city.driveTimeMin} min`} />
          <HeroStat label="County" value={city.county} />
          <HeroStat label="Program" value={service.name} />
        </dl>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="font-heading text-base font-light text-[var(--color-accent)] sm:text-lg">
        {value}
      </dt>
      <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
        {label}
      </dd>
    </div>
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
        <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted,#6B6B6B)]">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm text-[var(--color-forest)]">{value}</dd>
      </div>
    </div>
  );
}
