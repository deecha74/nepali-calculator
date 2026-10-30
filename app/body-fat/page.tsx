import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { BodyFatSleepCalculator } from '@/components/calculators/BodyFatSleepCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Body Fat Percentage Calculator (US Navy Method) & Lean Mass Estimator',
  description:
    'Calculate your body fat percentage, fat mass, and lean body mass using the accurate US Navy circumference method for men and women →',
  path: '/body-fat',
  keywords: [
    'body fat calculator nepal',
    'us navy body fat formula',
    'lean body mass calculator',
    'body fat percentage men women',
    'army physical fitness body fat',
  ],
});

export default function BodyFatPage() {
  const schema = generateWebApplicationSchema({
    name: 'Body Fat Percentage Calculator (US Navy Method)',
    description: 'Estimate body fat percentage, fat mass, and lean body mass using waist, neck, and height measurements.',
    url: `${SITE_CONFIG.url}/body-fat`,
    category: 'HealthApplication',
  });

  const faqs = [
    {
      question: 'How accurate is the US Navy Body Fat formula?',
      answer:
        'The US Navy circumference method estimates body fat within 3% to 4% of DEXA scan results when waist, neck, and hip measurements are taken accurately with a flexible tape measure.',
    },
    {
      question: 'What is a healthy body fat percentage?',
      answer:
        'For adult men, a fitness/healthy range is typically 14% to 24% (athletes 6%–13%). For adult women, a healthy fitness range is typically 21% to 31% (athletes 14%–20%).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Body Fat Percentage Calculator (US Navy Method)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Measure your body fat percentage, total fat mass (kg), and lean muscle mass using the validated US Navy tape measurement formula.
        </p>
      </div>
      <BodyFatSleepCalculator defaultTab="body_fat" />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Body Fat Percentage FAQs" />
      </div>
    </div>
  );
}
