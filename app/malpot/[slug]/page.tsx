import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Building2, Landmark } from 'lucide-react';
import { PROGRAMMATIC_MALPOT_SCENARIOS } from '@/lib/rates/programmaticMalpot';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { MalpotTaxCalculator } from '@/components/calculators/MalpotTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_MALPOT_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_MALPOT_SCENARIOS.find((c) => c.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/malpot/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticMalpotPage({ params }: PageProps) {
  const { slug } = await params;
  const item = PROGRAMMATIC_MALPOT_SCENARIOS.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `${SITE_CONFIG.url}/malpot/${item.slug}`,
    category: "FinancialApplication",
  });

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/malpot"
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
          <span>All Nepal Malpot & Land Pass Calculators (मालपोत रजिष्ट्रेसन)</span>
        </Link>
      </div>

      {/* Interactive Live Converter */}
      <MalpotTaxCalculator />

      {/* Direct Featured Answer Box (AEO Snippet) */}
      <div
        className="aeo-answer-container"
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #eff6ff 100%)',
          border: '1.5px solid #fed7aa',
          borderRadius: '16px',
          padding: '24px 28px',
          marginTop: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px -4px rgba(180, 83, 9, 0.08)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#b45309', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Department of Land Management (DoLMA) Official Rules • भूमिसुधार तथा मालपोत</span>
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 900, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.25 }}>
          {item.shortTitle} — Official Rate Breakdown
        </h2>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
          {item.headlineAnswer}
        </p>

        {/* Regulatory metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Registration Tax</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#003893' }}>{item.registrationFeeRate}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Local Gov Fee</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>{item.localGovServiceFee}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Female Concession</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#16a34a' }}>{item.femaleRebatePercent}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Seller Capital Gains (CGT)</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#dc2626' }}>{item.cgtRate}</div>
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 750, color: '#0f172a' }}>
          <Check size={15} color="#16a34a" />
          <span>Calculated on the higher of declared transaction price vs government minimum valuation</span>
        </div>
      </div>

      {/* Cross-linking scenarios matrix */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
          Other Nepal Land Pass & Malpot Tax Guides (अन्य मालपोत तथा रजिष्ट्रेसन दर)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_MALPOT_SCENARIOS.filter((c) => c.slug !== item.slug).map((sc) => (
            <Link
              key={sc.slug}
              href={`/malpot/${sc.slug}`}
              className="two-up-card-item showcase-card-better"
              style={{ textDecoration: 'none', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}
            >
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{sc.shortTitle}</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{sc.locationOrType} • {sc.registrationFeeRate}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="malpot-programmatic-bottom" format="horizontal" />
      <FAQAccordion items={item.faqs} title={`${item.shortTitle} FAQs`} />
    </div>
  );
}

