import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { InflationCalculator } from '@/components/calculators/InflationCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Inflation Calculator Nepal — Purchasing Power & Money Value Erosion",
  description: "Calculate purchasing power and inflation impact in Nepal. Based on Nepal Rastra Bank (NRB) consumer price index (CPI) average inflation rates.",
  path: "/inflation",
  keywords: [
    "inflation calculator nepal",
    "purchasing power calculator nepal",
    "nepal rastra bank cpi inflation",
    "nepali rupee value over time",
    "money value inflation nepal",
  ],
});

export default function InflationPage() {
  const schema = generateWebApplicationSchema({
    name: "Inflation Calculator Nepal",
    description: "Calculates purchasing power erosion and future money equivalents under Nepal Rastra Bank inflation benchmarks.",
    url: "https://nepalcalc.com/inflation",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the average inflation rate in Nepal?",
      answer: "According to Nepal Rastra Bank (NRB) economic bulletins, consumer price index (CPI) inflation in Nepal typically averages between 5.5% to 7.5% per annum, influenced primarily by food prices, petroleum imports, and Indian inflation parity.",
    },
    {
      question: "How does inflation affect savings in Nepali banks?",
      answer: "If inflation is 6.2% and your bank savings account yields 4% interest, your real return is negative (-2.2%). This means your purchasing power diminishes each year unless invested in higher-yielding assets like Fixed Deposits, SIP mutual funds, or real estate.",
    },
    {
      question: "How do I beat inflation in Nepal?",
      answer: "To beat inflation, invest your surplus savings in instruments that earn greater than 7% to 12% annually, such as SEBON-approved mutual funds, blue-chip NEPSE dividend stocks, debentures, commercial bank fixed deposits (FD), and real estate land.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>NRB Consumer Price Index</span>
          <span className="badge badge-neutral">Real Purchasing Power</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Inflation & Purchasing Power Calculator Nepal
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Calculate how inflation affects your hard-earned money and determine what you will need in the future to preserve your wealth.
        </p>
      </div>

      <InflationCalculator />

      <AdBanner slotId="inflation-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Nepal Inflation & Purchasing Power FAQs" />
      </div>
    </div>
  );
}
