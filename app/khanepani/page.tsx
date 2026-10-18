import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { KhanepaniCalculator } from '@/components/calculators/KhanepaniCalculator';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Drinking Water (Khanepani) Bill Calculator Nepal — KUKL Tariff Rates",
  description: "Calculate monthly drinking water bills and 50% sewerage drainage charges for Kathmandu Valley (KUKL) and Nepal Water Supply connections.",
  path: "/khanepani",
  keywords: [
    "khanepani bill calculator nepal",
    "kukl water bill calculator",
    "drinking water tariff nepal",
    "kathmandu khanepani bill",
    "खानेपानी महसुल",
  ],
});

export default function KhanepaniPage() {
  const schema = generateWebApplicationSchema({
    name: "Drinking Water (Khanepani) Bill Calculator Nepal",
    description: "Calculates piped drinking water and sewerage tariffs for KUKL and Nepal Water Supply.",
    url: "https://nepalcalc.com/khanepani",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "What is the minimum drinking water bill in Kathmandu (KUKL)?",
      answer: "For a standard 1/2-inch domestic pipe connection, the minimum monthly charge is NPR 100, which covers consumption up to 10,000 liters (10 units). If 50% sewerage charge applies, the minimum total bill is NPR 150 per month.",
    },
    {
      question: "How is 1 unit of water defined by KUKL in Nepal?",
      answer: "One unit of drinking water in Nepal equals exactly 1,000 liters (1 cubic meter).",
    },
    {
      question: "What is the 50% sewerage service charge?",
      answer: "Under municipal water guidelines, properties connected to public wastewater drains are assessed a 50% surcharge on their base water consumption bill for municipal sewage maintenance.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">Municipal Utility</span>
          <span className="badge badge-neutral">KUKL Approved Rates</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Drinking Water (खानेपानी) Bill Calculator Nepal
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Calculate monthly tap water consumption tariffs, slab increments, and 50% drainage sewerage fees.
        </p>
      </div>

      <AEOAnswerBox
        question="How is drinking water tariff calculated in Kathmandu Valley?"
        directAnswer="Kathmandu Upatyaka Khanepani Limited (KUKL) charges a base minimum of NPR 100 for the first 10,000 liters (10 units) on a 1/2-inch tap. Subsequent water is billed at NPR 32/unit (11-20 units), NPR 71/unit (21-30 units), and NPR 95/unit (>30 units), plus an optional 50% municipal sewerage drainage fee."
        keyFacts={["Min charge NPR 100 (10k Liters)", "50% Sewerage Surcharge", "1 Unit = 1,000 Liters"]}
        authoritySource="KUKL Tariff Board"
      />

      <KhanepaniCalculator />

      <AdBanner slotId="khanepani-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Nepal Khanepani Water Bill FAQs" />
      </div>
    </div>
  );
}
