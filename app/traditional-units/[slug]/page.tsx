import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Scale } from 'lucide-react';
import { PROGRAMMATIC_TRADITIONAL_UNITS } from '@/lib/rates/traditionalUnitRates';
import { constructMetadata, generateWebApplicationSchema, generateFaqSchema } from '@/lib/seo/metadata';
import { TraditionalUnitsConverter } from '@/components/calculators/TraditionalUnitsConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_TRADITIONAL_UNITS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_TRADITIONAL_UNITS.find((c) => c.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/traditional-units/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticTraditionalUnitPage({ params }: PageProps) {
  const { slug } = await params;
  const item = PROGRAMMATIC_TRADITIONAL_UNITS.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `https://nepalcalc.com/traditional-units/${item.slug}`,
    category: "UtilityApplication",
  });

  const faqSchema = generateFaqSchema(item.faqs);

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/traditional-units"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#003893',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          <span>All Traditional Nepali Units (सबै परम्परागत नाप)</span>
        </Link>
      </div>

      {/* Direct Featured Answer Box (AEO Snippet) */}
      <div
        className="aeo-answer-container"
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '1.5px solid #bfdbfe',
          borderRadius: '16px',
          padding: '24px 28px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px -4px rgba(37, 99, 235, 0.08)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1d4ed8', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Official Standard Conversion • आधिकारिक रूपान्तरण</span>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3.2vw, 28px)', fontWeight: 900, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.25 }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
          {item.headlineAnswer}
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '9999px', fontSize: '13.5px', fontWeight: 800, color: '#003893' }}>
          <Check size={15} color="#16a34a" />
          <span>Standard Formula: {item.formula}</span>
        </div>
      </div>

      {/* Interactive Live Converter */}
      <TraditionalUnitsConverter />

      {/* Other Programmatic Conversions Matrix */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
          Explore Other Traditional Nepali Conversions (अन्य नेपाली नाप)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_TRADITIONAL_UNITS.filter((c) => c.slug !== item.slug).map((unit) => (
            <Link
              key={unit.slug}
              href={`/traditional-units/${unit.slug}`}
              className="two-up-card-item showcase-card-better"
              style={{ textDecoration: 'none', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}
            >
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{unit.shortTitle}</span>
                <span style={{ display: 'block', fontSize: '11.5px', color: '#64748b', marginTop: '3px' }}>{unit.formula}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="traditional-units-bottom" format="horizontal" />
      <FAQAccordion items={item.faqs} title={`${item.shortTitle} FAQs`} />
    </div>
  );
}
