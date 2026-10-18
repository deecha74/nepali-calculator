import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { ForexCalculator } from '@/components/calculators/ForexCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Forex & Remittance Converter Nepal — NRB Foreign Exchange Rates",
  description: "Convert foreign currencies to Nepali Rupees (NPR): USD, AUD, EUR, GBP, AED, SAR, QAR, JPY, KRW with Nepal Rastra Bank standard exchange rates.",
  path: "/forex",
  keywords: ["forex nepal", "remittance calculator nepal", "usd to npr", "aud to npr", "aed to npr", "nrb exchange rate today"],
});

export default function ForexPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Forex & Remittance Currency Converter",
    description: "Convert global remittances to Nepali Rupees with official exchange rates.",
    url: "https://nepalcalc.com/forex",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "Who sets the foreign exchange rates in Nepal?",
      answer: "The benchmark reference exchange rates are published daily by Nepal Rastra Bank (NRB), the central monetary authority of Nepal.",
    },
    {
      question: "Are commercial bank and remittance exchange rates different?",
      answer: "Yes, commercial banks and remittance agencies often offer slightly different buying and selling rates or loyalty incentives based on current market liquidity.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ForexCalculator />
      <AdBanner slotId="forex-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Remittance & Forex FAQs" />
    </div>
  );
}
