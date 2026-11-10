import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Receipt } from 'lucide-react';
import { PROGRAMMATIC_TDS_SCENARIOS } from '@/lib/rates/programmaticTds';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { TdsCalculator } from '@/components/calculators/TdsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_TDS_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_TDS_SCENARIOS.find((c) => c.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/tds/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticTdsPage({ params }: PageProps) {
  const { slug } = await params;
  const item = PROGRAMMATIC_TDS_SCENARIOS.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `${SITE_CONFIG.url}/tds/${item.slug}`,
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
          href="/tds"
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
          <span>All Nepal TDS & Withholding Tax Rates (स्रोतमा कर कट्टी)</span>
        </Link>
      </div>

      {/* Interactive Live Converter */}
      <TdsCalculator />

      {/* Direct Featured Answer Box (AEO Snippet) */}
      <div
        className="aeo-answer-container"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
          border: '1.5px solid #bbf7d0',
          borderRadius: '16px',
          padding: '24px 28px',
          marginTop: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px -4px rgba(22, 163, 74, 0.08)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#15803d', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Official IRD Nepal Provision • आन्तरिक राजस्व विभाग निर्देशिका</span>
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 900, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.25 }}>
          {item.shortTitle} — Rule Breakdown
        </h2>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
          {item.headlineAnswer}
        </p>

        {/* Legal metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Statutory TDS Rate</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#16a34a' }}>{item.tdsRate}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Governing Section</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#003893' }}>{item.sectionCode}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Threshold / Limit</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>{item.thresholdExemption}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Gross-Up Calculation</span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>{item.grossUpExample}</div>
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 750, color: '#0f172a' }}>
          <Check size={15} color="#16a34a" />
          <span>Must be deposited via IRD e-TDS by the 25th of next BS month (दफा ९०)</span>
        </div>
      </div>

      {/* Cross-linking scenarios matrix */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
          Explore Other Nepal TDS Withholding Slabs (अन्य स्रोतमा कर कट्टी दर)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_TDS_SCENARIOS.filter((c) => c.slug !== item.slug).map((sc) => (
            <Link
              key={sc.slug}
              href={`/tds/${sc.slug}`}
              className="two-up-card-item showcase-card-better"
              style={{ textDecoration: 'none', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}
            >
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{sc.shortTitle}</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{sc.tdsRate} • {sc.sectionCode}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="tds-programmatic-bottom" format="horizontal" />
      <FAQAccordion items={item.faqs} title={`${item.shortTitle} FAQs`} />
    </div>
  );
}

