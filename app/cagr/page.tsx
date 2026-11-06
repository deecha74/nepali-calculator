import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { CagrSavingsCalculator } from '@/components/calculators/CagrSavingsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'CAGR Calculator Nepal — Compound Annual Growth Rate (Return %)',
  description:
    'Calculate exact Compound Annual Growth Rate (CAGR %), absolute return %, and Rule of 72 doubling years for NEPSE stocks, land, gold & mutual funds in Nepal →',
  path: '/cagr',
  keywords: [
    'cagr calculator nepal',
    'compound annual growth rate calculator',
    'nepse stock cagr calculator',
    'land price cagr nepal',
    'चक्रवृद्धि वार्षिक वृद्धिदर क्याल्कुलेटर',
  ],
});

export default function CagrPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/cagr`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal CAGR & Investment Growth Rate Calculator',
    description:
      'Calculate Compound Annual Growth Rate (CAGR), total return percentage, and money doubling time for stocks, real estate, and gold investments in Nepal.',
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Loans & Interest', url: `${SITE_CONFIG.url}/sip` },
    { name: 'CAGR Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'What is the CAGR formula?',
      answer:
        'Compound Annual Growth Rate (CAGR) is calculated as: CAGR = [(Ending Value / Beginning Value)^(1 / Number of Years)] - 1. It measures the smoothed annualized compounded rate of return over a multi-year period.',
    },
    {
      question: 'What is a good CAGR in Nepal for NEPSE stocks, Gold, and Land?',
      answer:
        'Historically in Nepal, commercial bank Fixed Deposits yield 6%–9% p.a., Gold in NPR has delivered ~13%–15% CAGR over the past decade, and prime residential land or top-performing NEPSE equities/SIP funds target 12%–18% CAGR.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <CagrSavingsCalculator />

      <AdBanner slotId="cagr-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="CAGR & Compound Return FAQs" />
      </div>
    </div>
  );
}

