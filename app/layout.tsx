import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: {
    default: "Nepali Calc — Smart All-in-One Calculators for Nepal",
    template: "%s | Nepali Calc",
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: "Nepali Calc" }],
  creator: "Nepali Calc",
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: [
      { url: "/nepal-flag.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/nepal-flag.svg",
    apple: "/nepal-flag.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: SITE_CONFIG.url,
    title: "Nepali Calc — Smart All-in-One Calculators for Nepal",
    description: SITE_CONFIG.description,
    siteName: "Nepali Calc",
    images: [
      {
        url: `${SITE_CONFIG.url}/hero-calc-3d.jpg`,
        width: 1200,
        height: 630,
        alt: "NepalCalc — Smart All-in-One Calculators for Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NepalCalc — Smart All-in-One Calculators for Nepal",
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/hero-calc-3d.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

import { AOSInit } from "@/components/AOSInit";
import { LanguageProvider } from "@/components/LanguageContext";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ParallaxMountainBackground } from "@/components/ParallaxMountainBackground";

const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      "name": SITE_CONFIG.shortName,
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}/hero-calc-3d.jpg`,
      "description": SITE_CONFIG.description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      "url": SITE_CONFIG.url,
      "name": SITE_CONFIG.shortName,
      "description": SITE_CONFIG.description,
      "publisher": {
        "@id": `${SITE_CONFIG.url}/#organization`,
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.url}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
        {/* AdSense Verification Tag Placeholder (User adds client-id when active) */}
        {/* <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" /> */}
      </head>
      <body>
        <LanguageProvider>
          <AOSInit />
          <ParallaxMountainBackground />
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 200px)', position: 'relative', zIndex: 1 }}>{children}</main>
          <Footer />
          <CookieConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
