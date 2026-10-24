'use client';

import Script from 'next/script';

export function GoogleAnalytics({ gaId }: { gaId?: string }) {
  // Use prop, environment variable, or official Nepali Calc GA4 measurement ID
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID || 'G-TQCKJXBLRB';

  if (!measurementId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
