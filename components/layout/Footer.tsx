import {
  MapPin,
  Phone,
  Clock,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import FooterColumns from "./FooterColumns";

// Brand icons were removed from lucide-react v1.x, define inline SVG fallbacks
// that match the LucideIcon contract so they slot into the SOCIALS map cleanly.
type IconProps = React.SVGProps<SVGSVGElement>;

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12" />
    </svg>
  );
}

const BOOKING_URL =
  "https://www.tebra.com/care/practice/central-texas-holistic-care-163683";

const QUICK_LINKS = [
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
  { label: "Book Appointment", href: BOOKING_URL, external: true },
];

const SERVICES = [
  { label: "IV Infusion Therapy", href: "/iv-nutrition/" },
  { label: "Hormone Pelleting", href: "/hormone-therapy/" },
  { label: "Men's Health Optimization", href: "/men/testosterone/" },
  { label: "Chronic Care Management", href: "/about-us/" },
];

const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Central-Texas-Holistic-Care/61573522504183/",
    icon: FacebookIcon as unknown as LucideIcon,
  },
];

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Central Texas Holistic Care",
  url: "https://centraltexasholisticcarepllc.com",
  telephone: "254-213-2423",
  address: {
    "@type": "PostalAddress",
    streetAddress: "311 E. Stan Schlueter Loop #207",
    addressLocality: "Killeen",
    addressRegion: "TX",
    postalCode: "76542",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: SOCIALS.map((s) => s.href),
};

function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M20 4c-7 0-13 4-15 11-1 4 1 7 4 7 7 0 13-6 13-13 0-2-1-4-2-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 19c4-6 9-9 14-11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Watermark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
    >
      <g stroke="#FAF6EE" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M400 580 C 320 420, 320 240, 400 60" />
        <path d="M400 480 C 280 470, 200 400, 180 320" />
        <path d="M400 380 C 520 360, 600 290, 620 210" />
        <path d="M400 300 C 280 290, 220 230, 200 160" />
        {[440, 360, 280, 200, 120].map((y, i) => {
          const cx = i % 2 === 0 ? 180 : 620;
          return (
            <ellipse
              key={y}
              cx={cx}
              cy={y}
              rx="80"
              ry="22"
              transform={`rotate(${i % 2 === 0 ? -22 : 22} ${cx} ${y})`}
            />
          );
        })}
      </g>
    </svg>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-base font-semibold uppercase tracking-[0.18em] text-white">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "text-sm text-white/60 transition-colors hover:text-white";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterProps = {
  tagline?: string;
  phone?: string;
  phoneTel?: string;
  addressLine1?: string;
  addressLine2?: string;
  hours?: string;
  quickLinks?: FooterLinkItem[];
  services?: FooterLinkItem[];
};

export default function Footer({
  tagline = "Healing from the Inside Out",
  phone = "254-213-2423",
  phoneTel = "+12542132423",
  addressLine1 = "311 E. Stan Schlueter Loop #207",
  addressLine2 = "Killeen, TX 76542",
  hours = "Mon to Fri · 8:00 am to 5:00 pm",
  quickLinks,
  services,
}: FooterProps) {
  const year = new Date().getFullYear();
  const links = quickLinks && quickLinks.length > 0 ? quickLinks : QUICK_LINKS;
  const serviceLinks = services && services.length > 0 ? services : SERVICES;

  return (
    <footer
      id="site-footer"
      className="relative mt-auto overflow-hidden border-t border-white/10 text-white/80"
      style={{ backgroundColor: "#0f2206" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />

      <Watermark />

      {/* Columns */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FooterColumns>
          {/* Column 1, Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-white"
              aria-label="Central Texas Holistic Care, Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Central Texas Holistic Care"
                width={1536}
                height={447}
                decoding="async"
                className="h-16 w-auto brightness-0 invert sm:h-20"
              />
            </Link>

            <p className="mt-4 font-heading text-lg italic text-[#8BAD5A]">
              {tagline}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#8BAD5A] hover:bg-[#8BAD5A]/10 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2, Quick Links */}
          <nav aria-label="Footer quick links">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-5 space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} external={l.external}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3, Services */}
          <nav aria-label="Footer services">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-5 space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4, Contact */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#8BAD5A]" aria-hidden />
                <address className="not-italic text-white/70">
                  {addressLine1}
                  <br />
                  {addressLine2}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#8BAD5A]" aria-hidden />
                <a
                  href={`tel:${phoneTel}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-[#8BAD5A]" aria-hidden />
                <div className="text-white/70">
                  <p className="font-medium text-white/85">Hours</p>
                  <p>{hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </FooterColumns>
      </div>

      {/* Gradient separator */}
      <div className="relative mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-[#8BAD5A]/30 to-transparent" />

      {/* Bottom bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p>
            © {year} Central Texas Holistic Care PLLC. All Rights Reserved.
          </p>
          <span aria-hidden className="hidden text-white/25 sm:inline">·</span>
          <p>
            Powered by{" "}
            <a
              href="https://modfxmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#8BAD5A] underline-offset-4 transition-colors hover:text-[#9DD270] hover:underline"
            >
              ModFX Media
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <FooterLink href="/sitemap/">Sitemap</FooterLink>
          </li>
          <li>
            <FooterLink href="/privacy-policy/">Privacy Policy</FooterLink>
          </li>
          <li>
            <FooterLink href="/terms-of-service/">Terms of Service</FooterLink>
          </li>
          <li>
            <FooterLink href="/accessibility/">Accessibility</FooterLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
