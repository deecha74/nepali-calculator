import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { NeaCalculator } from '@/components/calculators/NeaCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "NEA Electricity Bill Calculator Nepal — Domestic Tariffs, Slabs & VAT",
  description: "Calculate your Nepal Electricity Authority (NEA) monthly bill online. Supports 5A, 15A, 30A, 60A meter rates, 5% VAT on high consumption, and 2% prompt payment rebates.",
  path: "/nea",
  keywords: [
    "nea electricity bill calculator",
    "bijuli bill nepal",
    "nea domestic tariff",
    "nea bill calculator online",
    "electricity unit rate nepal",
    "nea electricity tariff rates 5a 15a 30a",
    "nea bill check online",
    "nea 2 percent rebate within 7 days",
    "nea bill fine percentage slabs",
    "nea per unit price nepal 2081 2082",
    "nepal electricity authority online bill",
    "नेपाल विद्युत प्राधिकरण बिल हिसाब",
    "बिजुलीको बिल क्याल्कुलेटर",
    "विद्युत महसुल दर नेपाल"
  ],
});

export default function NeaPage() {
  const schema = generateWebApplicationSchema({
    name: "NEA Electricity Bill Calculator",
    description: "Domestic electricity tariff and monthly power bill estimator for Nepal Electricity Authority.",
    url: "https://nepalcalc.com/nea",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How do NEA electricity slabs work?",
      answer: "NEA charges electricity on consumption slabs: the first 0-20 units are lifeline rates (energy charge free for 5A meters, with just a Rs 30 minimum charge), and rates progressively increase for 21-30, 31-50, 51-100, 101-250, and >250 units.",
    },
    {
      question: "When do I get a 2% rebate on my NEA electricity bill?",
      answer: "Consumers who pay their electricity bill within 7 days of meter reading receive an instant 2% rebate on their total bill.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NeaCalculator />
      <AdBanner slotId="nea-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Electricity Billing FAQs" />
    </div>
  );
}
