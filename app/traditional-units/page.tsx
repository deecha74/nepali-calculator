import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { TraditionalUnitsConverter } from '@/components/calculators/TraditionalUnitsConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { PROGRAMMATIC_TRADITIONAL_UNITS } from '@/lib/rates/traditionalUnitRates';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Mana, Pathi, Muri & Dharni to KG Converter — परम्परागत नाप",
  description: "Convert traditional Nepali weights (Dharni, Sher, Pao to KG/Grams) and volume units (Mana, Pathi, Muri to Liters/KG).",
  path: "/traditional-units",
  keywords: [
    "dharni to kg",
    "1 dharni in kg",
    "1 dharni ma kati kg huncha",
    "1 pao ma kati gram huncha",
    "1 kg ma kati pao huncha",
    "1 pathi ma kati mana huncha",
    "1 muri ma kati pathi huncha",
    "1 quintal ma kati kg huncha",
    "1 dharni ma kati pao huncha",
    "mana to liter",
    "pathi to kg",
    "muri to pathi",
    "pao to gram nepal",
    "traditional units nepal kati huncha",
    "नेपाली नाप",
    "धार्नी माना पाथी हिसाब"
  ],
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
      question: "1 Dharni ma kati KG huncha? (How many KG in 1 Dharni?)",
      answer: "Officially, 1 Dharni equals 2.3328 KG (12 Pao). In local vegetable and fruit markets across Kathmandu and Nepal, traders traditionally approximate 1 Dharni as 2.4 KG or 2.5 KG.",
    },
    {
      question: "1 Pao ma kati gram huncha? (How many grams in 1 Pao?)",
      answer: "In Nepal, 1 Pao equals approximately 194.4 grams officially (or 200 grams in practical local market trade). Therefore, 1 Kilogram contains approximately 5 Pao.",
    },
    {
      question: "1 Pathi ma kati Mana ra KG huncha?",
      answer: "1 Pathi equals exactly 8 Mana (approx. 4.54 liters). For food grains like paddy and rice, 1 Pathi weighs approximately 3.5 to 4.2 Kilograms depending on grain moisture density. 1 Muri contains 20 Pathi (160 Mana).",
    },
    {
      question: "1 Quintal ma kati KG huncha?",
      answer: "1 Quintal equals exactly 100 Kilograms (१ क्विन्टल = १०० केजी).",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TraditionalUnitsConverter />

      {/* Programmatic conversion quick links */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
          Specific Unit Conversions (विशिष्ट परम्परागत नाप हिसाब)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_TRADITIONAL_UNITS.map((unit) => (
            <Link
              key={unit.slug}
              href={`/traditional-units/${unit.slug}`}
              className="two-up-card-item showcase-card-better"
              style={{
                textDecoration: 'none',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                display: 'block',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{unit.shortTitle}</span>
                <span style={{ display: 'block', fontSize: '11.5px', color: '#64748b', marginTop: '3px' }}>
                  {unit.fromUnitNepali} देखि {unit.toUnitNepali} ({unit.formula})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="traditional-units-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepali Traditional Measurement FAQs" />
    </div>
  );
}
