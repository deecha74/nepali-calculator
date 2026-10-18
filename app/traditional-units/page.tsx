import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { TraditionalUnitsConverter } from '@/components/calculators/TraditionalUnitsConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Mana, Pathi, Muri & Dharni to KG Converter — परम्परागत नाप",
  description: "Convert traditional Nepali weights (Dharni, Sher, Pao to KG/Grams) and volume units (Mana, Pathi, Muri to Liters/KG).",
  path: "/traditional-units",
  keywords: ["dharni to kg", "1 dharni in kg", "mana to liter", "pathi to kg", "muri to pathi", "pao to gram nepal", "नेपाली नाप"],
});

export default function TraditionalUnitsPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Traditional Units Converter",
    description: "Convert traditional Nepali weights and volumes to metric kilograms and liters.",
    url: "https://nepalcalc.com/traditional-units",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How many KG are in 1 Dharni in Nepal?",
      answer: "Officially, 1 Dharni equals 2.3328 KG (12 Pao). In local vegetable and fruit markets, traders traditionally approximate 1 Dharni as 2.4 KG or 2.5 KG.",
    },
    {
      question: "How many Mana are in 1 Pathi and 1 Muri?",
      answer: "1 Pathi equals exactly 8 Mana (approx. 4.54 liters). 1 Muri equals 20 Pathi or 160 Mana.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TraditionalUnitsConverter />
      <AdBanner slotId="traditional-units-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepali Traditional Measurement FAQs" />
    </div>
  );
}
