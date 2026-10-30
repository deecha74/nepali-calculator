import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { PaintBrickConcreteCalculator } from '@/components/calculators/PaintBrickConcreteCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'Paint Cost, Wall Brick & Concrete Mix (M20) Calculator Nepal',
  description:
    'Calculate exact liters of Asian/Berger paint, wall primer, putty kg, number of bricks for 4.5" & 9" walls, and M15/M20/M25 concrete cement, sand & gitti in Nepal →',
  path: '/paint-cost',
  keywords: [
    'paint cost calculator nepal',
    'brick calculator nepal',
    'concrete mix calculator m20 nepal',
    'asian paints coverage per liter nepal',
    '9 inch wall brick calculation nepal',
    'घर रङरोगन खर्च र इँटा हिसाब',
  ],
});

export default function PaintBrickConcretePage() {
  const canonicalUrl = `${SITE_CONFIG.url}/paint-cost`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Paint Cost, Wall Brick & Concrete Mix (M20) Calculator',
    description:
      'Estimate liters of wall paint, primer, putty, number of bricks for 4.5-inch and 9-inch masonry walls, and cement/sand/aggregate quantities for M15, M20, and M25 RCC concrete.',
    url: canonicalUrl,
    category: 'UtilityApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'House Construction', url: `${SITE_CONFIG.url}/house-construction` },
    { name: 'Paint, Brick & Concrete Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'How many square feet does 1 liter of emulsion paint cover in Nepal?',
      answer:
        'A standard 1-liter bucket of interior or exterior emulsion paint (Asian Paints, Berger, or Pashupati Paints) covers approximately 110–120 sq. ft. for a single coat and 55–65 sq. ft. for two coats on a smoothly puttied and primed wall.',
    },
    {
      question: 'How many bricks are needed per square foot of wall in Nepal?',
      answer:
        'Using standard Nepali kiln bricks (9" × 4.5" × 2.75"), a 4.5-inch single-brick partition wall requires approximately 4.6 bricks per sq. ft., while a 9-inch outer load-bearing wall requires approximately 9.2 bricks per sq. ft. (plus 5% wastage buffer).',
    },
    {
      question: 'What is the M20 concrete mix ratio required by Nepal Building Code (NBC 105)?',
      answer:
        'M20 grade concrete follows a nominal volumetric mix ratio of 1 : 1.5 : 3 (1 part OPC/PPC cement, 1.5 parts washed river sand, and 3 parts 20mm crushed stone aggregate/gitti), which is the mandatory minimum grade for residential RCC columns, beams, and slabs under Nepal’s NBC 105 seismic code.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '820px', margin: '0 auto 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">Civil Engineering & Home Finishing</span>
          <span className="badge badge-neutral">रङरोगन, इँटा र ढलान (M20) हिसाब</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Paint Cost, Wall Brick & Concrete Mix (M20) Calculator
        </h1>
        <p style={{ fontSize: 'clamp(13.5px, 2vw, 15px)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          All-in-one civil engineering estimator for Nepal homeowners: calculate exact liters of paint/primer/putty, bricks for 4.5" and 9" walls, and M15/M20/M25 RCC slab materials.
        </p>
      </div>

      <PaintBrickConcreteCalculator />

      <AdBanner slotId="paint-brick-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Paint, Brickwork & Concrete Mix FAQs" />
      </div>
    </div>
  );
}

