import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { RemittanceCalculator } from '@/components/calculators/RemittanceCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Foreign Remittance In-Hand Net Calculator (नेपाल रेमिट्यान्स हिसाब)",
  description: "Calculate exact Nepalese Rupees (NPR) received by family from UAE (Dubai), Qatar, Saudi Arabia, Malaysia, USA, and Australia across bank deposit, wallet, and cash pickup.",
  path: "/remittance-calculator",
  keywords: [
    "remittance calculator nepal",
    "qatar riyal nepali rupees aaja",
    "dubai dirham rate in nepal today",
    "1000 aed in nepali rupees",
    "saudi riyal in nepali rupees today",
    "esewa money transfer rate nepal",
    "western union nepal rate",
    "foreign remittance in hand npr",
    "नेपाल रेमिट्यान्स हिसाब"
  ],
});

export default function RemittancePage() {
  const schema = generateWebApplicationSchema({
    name: "Foreign Remittance In-Hand Calculator Nepal",
    description: "Calculate exact net Nepalese Rupees (NPR) received by families in Nepal from international remittances.",
    url: "https://nepalcalc.com/remittance-calculator",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "Which channel gives the highest net NPR when sending money to Nepal?",
      answer: "Direct commercial bank account deposits (via Global IME, Nabil, NIC Asia, Everest) usually offer the highest net value because transfer fees are waived for amounts above standard thresholds, and Nepal Rastra Bank grants up to 1% extra interest on remittance-funded fixed deposits.",
    },
    {
      question: "How do exchange spreads affect the amount received in Nepal?",
      answer: "Money transfer operators apply an exchange rate spread on top of the official Nepal Rastra Bank buy rate. Digital wallet transfers and bank deposits maintain closer spreads compared to physical cash payout counters.",
    },
    {
      question: "Is remittance income taxable in Nepal?",
      answer: "No. Under Section 11 of the Nepal Income Tax Act, money sent by Nepali citizens working abroad through formal banking and remittance channels is completely exempt from income tax in Nepal.",
    },
    {
      question: "How long does it take for money sent abroad to arrive in a Nepali bank account?",
      answer: "Through real-time IPS and RTGS networks, most bank account deposits arrive within minutes to a few hours on banking days. Digital wallet credits (eSewa, Khalti) are typically instant.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RemittanceCalculator />
      <AdBanner slotId="remittance-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on Remittance to Nepal" />
    </div>
  );
}
