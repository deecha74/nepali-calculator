import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { UniversalUnitConverter } from '@/components/calculators/UniversalUnitConverter';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Universal Unit Converter Nepal — Length, Weight (Dharni/Pau/Tola) & Temperature',
  description:
    'Convert metric and imperial units alongside traditional Nepali measurement units including Dharni (धार्नी), Pau (पाउ), Tola (तोला), and Haat (हात) →',
  path: '/unit-converter',
  keywords: [
    'unit converter nepal',
    'dharni to kg converter',
    'pau to gram nepal',
    'tola to gram converter',
    'haat to feet nepal',
    'length weight temperature converter',
  ],
});

export default function UnitConverterPage() {
  const schema = generateWebApplicationSchema({
    name: 'Universal Unit Converter Nepal (Dharni, Pau, Tola, Metric & Imperial)',
    description: 'Convert Length, Weight (including Nepali Dharni, Pau, and Tola), and Temperature.',
    url: `${SITE_CONFIG.url}/unit-converter`,
    category: 'UtilitiesApplication',
  });

  const faqs = [
    {
      question: 'How many kilograms are in 1 Dharni in Nepal?',
      answer:
        'In Nepal, 1 standard Dharni (धार्नी) equals approximately 2.393 kilograms (around 2.4 kg), which is subdivided into 12 Pau (पाउ) of roughly 199.4 grams each.',
    },
    {
      question: 'How many grams are in 1 Pau in Nepal?',
      answer:
        'One traditional Nepali Pau (पाउ) is approximately 199.4 grams (commonly rounded to 200 grams in local retail vegetable and meat markets across Kathmandu and hilly districts).',
    },
    {
      question: 'What is 1 Haat in feet or inches?',
      answer:
        'One traditional Nepali Haat (हात - cubit from elbow to middle fingertip) is standardized at 18 inches (1.5 feet or 45.72 cm).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Universal Unit Converter (Dharni, Pau, Tola, Length &amp; Temp)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Instantly convert between Metric, Imperial, and traditional Nepali units like Dharni (धार्नी), Pau (पाउ), Tola (तोला), and Haat (हात).
        </p>
      </div>
      <UniversalUnitConverter />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Unit Conversion FAQs" />
      </div>
    </div>
  );
}
