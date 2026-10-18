import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { NepseCalculator } from '@/components/calculators/NepseCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "NEPSE Share Calculator — Broker Commission & CGT (मेरो शेयर)",
  description: "Calculate NEPSE stock buy/sell returns, SEBON broker commissions (0.27%-0.40%), DP fee (NPR 25), and Capital Gains Tax (5% / 7.5%) in Nepal.",
  path: "/nepse",
  keywords: [
    "nepse share calculator",
    "share calculator nepal",
    "nepse broker commission calculator",
    "cgt calculator nepal",
    "sebon broker commission",
    "meroshare profit calculator",
    "मेरो शेयर क्यालकुलेटर",
    "शेयर हिसाब नेपाल"
  ],
});

export default function NepsePage() {
  const schema = generateWebApplicationSchema({
    name: "NEPSE Share Market Calculator",
    description: "Accurate NEPSE share profit, broker commission, and capital gains tax calculator.",
    url: "https://nepalcalc.com/nepse",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What is the Capital Gains Tax (CGT) rate on NEPSE shares?",
      answer: "For individual investors holding shares for less than 365 days, CGT is 7.5% on net profit. For holding periods of 365 days or more (long-term), CGT is reduced to 5.0%. Institutional investors pay 10.0%.",
    },
    {
      question: "How much broker commission is charged per NEPSE transaction?",
      answer: "Broker commission is tiered based on transaction volume: 0.40% up to Rs 50,000; 0.37% between Rs 50k - 5 Lakhs; 0.34% between Rs 5L - 20 Lakhs; 0.30% between Rs 20L - 1 Crore; and 0.27% above 1 Crore.",
    },
    {
      question: "What are the SEBON and DP charges?",
      answer: "SEBON regulatory fee is 0.015% of the transaction amount. The Depository Participant (DP) fee is NPR 25 per scrip per trading day.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NepseCalculator />
      <AdBanner slotId="nepse-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="NEPSE Share Trading FAQs" />
    </div>
  );
}
