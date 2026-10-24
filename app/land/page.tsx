import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LandConverter } from '@/components/calculators/LandConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { PROGRAMMATIC_LAND_CONVERSIONS } from '@/lib/rates/landRates';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Land Measurement Calculator — Ropani to Bigha & Sq Ft",
  description: "Official online land unit converter for Nepal. Convert Ropani, Aana, Paisa, Daam (Hill system) to Bigha, Kattha, Dhur (Terai system) and Square Feet/Meters.",
  path: "/land",
  keywords: [
    "land measurement nepal",
    "ropani to bigha",
    "aana to sqft",
    "dhur to sqft",
    "kattha to dhur",
    "nepal land converter",
    "1 ropani in square feet nepal",
    "1 aana in sq ft",
    "1 ropani ma kati aana huncha",
    "1 aana ma kati square feet huncha",
    "1 bigha ma kati kattha huncha",
    "1 kattha ma kati dhur huncha",
    "1 dhur ma kati square feet huncha",
    "terai to hill land converter nepal",
    "bigha kattha dhur calculation",
    "malpot land registration fee calculator",
    "जग्गा नाप क्यालकुलेटर",
    "रोपनी आना धुर बिघा हिसाब",
    "जग्गा रजिस्ट्रेसन दस्तुर"
  ],
});

export default function LandPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Land Measurement Converter",
    description: "Official Nepal land measurement converter across Ropani and Bigha systems.",
    url: "https://nepalcalc.com/land",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "1 Aana ma kati Square Feet huncha? (How much is 1 Aana in Sq Ft?)",
      answer: "One Aana equals 342.25 Square Feet (approx. 31.8 Square Meters). In the Kathmandu Valley and hill system, 1 Ropani contains exactly 16 Aana (5,476 Square Feet).",
    },
    {
      question: "1 Bigha ma kati Kattha ra Dhur huncha?",
      answer: "One Bigha equals 20 Kattha or 400 Dhur. In square feet, 1 Bigha equals 72,900 Square Feet (approx. 6,772.63 Square Meters).",
    },
    {
      question: "1 Ropani ma kati Bigha huncha? (Hill to Terai conversion)",
      answer: "One Bigha is equal to approximately 13.31 Ropani. Conversely, 1 Ropani equals approximately 0.0751 Bigha (or 1.5 Kattha).",
    },
    {
      question: "1 Kattha ma kati Dhur ra Square Feet huncha?",
      answer: "1 Kattha equals 20 Dhur or 3,645 Square Feet (approx. 338.63 Square Meters).",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LandConverter />

      {/* Programmatic conversion quick links */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
          Specific Unit Conversions (विशिष्ट एकाइ रूपान्तरण)
        </h3>
        <div className="two-up-mobile-carousel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_LAND_CONVERSIONS.map((conv) => (
            <Link
              key={conv.slug}
              href={`/land/${conv.slug}`}
              className="two-up-card-item showcase-card-better"
            >
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{conv.fromUnit} to {conv.toUnit}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{conv.fromUnitNepali} देखि {conv.toUnitNepali}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <div className="showcase-arrow-btn" style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={12} color="#003893" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="land-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepal Land Measurement FAQs" />
    </div>
  );
}
