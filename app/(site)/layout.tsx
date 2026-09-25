import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import BookingPopupProvider from "@/components/booking/BookingPopupProvider";
import Footer from "@/components/layout/Footer";
import Navbar, { type NavItem } from "@/components/layout/Navbar";
import BottomBookNowBanner from "@/components/layout/BottomBookNowBanner";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { queryFooter, queryHeader } from "@/lib/cms/query";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { buildGoogleReviewsJsonLd } from "@/lib/reviews-schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "Central Texas Holistic Care (CTHC) specializes in individualized health plans combining traditional family medicine with holistic therapies. Hormone therapy, IV nutrition, men's & women's health in Harker Heights, TX.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "c0pd5wEwUCk35gkGr_bVdSIqh447NqAj9m3EgEykIr8",
  },
};

export const viewport: Viewport = {
  themeColor: "#2D5016",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Central Texas Holistic Care",
  alternateName: "CTHC",
  url: SITE_URL,
  telephone: "254-213-2423",
  address: {
    "@type": "PostalAddress",
    streetAddress: "311 E. Stan Schlueter Loop #207",
    addressLocality: "Killeen",
    addressRegion: "TX",
    postalCode: "76542",
    addressCountry: "US",
  },
  medicalSpecialty: [
    "Hormone Therapy",
    "IV Nutrition",
    "Men's Health",
    "Women's Health",
    "Holistic Medicine",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ reviews, meta }, header, footer] = await Promise.all([
    getDisplayedGoogleReviews(),
    queryHeader(),
    queryFooter(),
  ]);
  const organizationJsonLd = {
    ...organizationSchema,
    ...buildGoogleReviewsJsonLd(reviews, meta),
  };
  const cmsNav: NavItem[] | undefined = header?.nav
    ?.filter((item) => item.label && item.href)
    .map((item) => ({
      label: item.label,
      href: item.href,
      pulse: Boolean(item.pulse),
      children: item.children
        ?.filter((child) => child.label && child.href)
        .map((child) => ({
          label: child.label,
          href: child.href,
          description: child.description || "",
        })),
    }));
  const cmsQuickLinks = footer?.quickLinks
    ?.filter((link) => link.label && link.href)
    .map((link) => ({
      label: link.label as string,
      href: link.href as string,
      external: Boolean(link.external),
    }));
  const cmsServices = footer?.services
    ?.filter((link) => link.label && link.href)
    .map((link) => ({
      label: link.label as string,
      href: link.href as string,
      external: Boolean(link.external),
    }));

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FT2E723L61"
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FT2E723L61');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6jz31gz6");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ScrollProgressBar />
        <BookingPopupProvider>
          <Navbar
            phone={header?.phone || undefined}
            phoneTel={header?.phoneTel || undefined}
            address={header?.address || undefined}
            bookingUrl={header?.bookingUrl || undefined}
            nav={cmsNav}
          />
          <main className="flex-1">{children}</main>
          <div
            aria-hidden
            className="h-px w-full bg-gradient-to-r from-transparent via-[#C4A862]/40 to-transparent"
          />
          <Footer
            tagline={footer?.tagline || undefined}
            phone={footer?.phone || undefined}
            phoneTel={footer?.phoneTel || undefined}
            addressLine1={footer?.addressLine1 || undefined}
            addressLine2={footer?.addressLine2 || undefined}
            hours={footer?.hours || undefined}
            quickLinks={cmsQuickLinks}
            services={cmsServices}
          />
          <BottomBookNowBanner />
        </BookingPopupProvider>
      </body>
    </html>
  );
}
