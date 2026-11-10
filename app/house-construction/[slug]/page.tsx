import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Home, Building2, Layers } from 'lucide-react';
import { PROGRAMMATIC_CONSTRUCTION_SCENARIOS } from '@/lib/rates/programmaticConstruction';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { HouseConstructionCalculator } from '@/components/calculators/HouseConstructionCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_CONSTRUCTION_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_CONSTRUCTION_SCENARIOS.find((c) => c.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/house-construction/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticConstructionPage({ params }: PageProps) {
  const { slug } = await params;
  const item = PROGRAMMATIC_CONSTRUCTION_SCENARIOS.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `${SITE_CONFIG.url}/house-construction/${item.slug}`,
    category: "UtilityApplication",
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
          href="/house-construction"
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
          <span>All Nepal House Construction & Material Calculators (घर बनाउने हिसाब)</span>
        </Link>
      </div>

      {/* Interactive Live Converter */}
      <HouseConstructionCalculator />

      {/* Direct Featured Answer Box (AEO Snippet) */}
      <div
        className="aeo-answer-container"
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '1.5px solid #bfdbfe',
          borderRadius: '16px',
          padding: '24px 28px',
          marginTop: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px -4px rgba(37, 99, 235, 0.08)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1d4ed8', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Engineering Thumb-Rule Estimate • नेपाल भवन संहिता आधारित</span>
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 900, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.25 }}>
          {item.shortTitle} — Cost & Material Breakdown
        </h2>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
          {item.headlineAnswer}
        </p>

        {/* Construction metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Budget</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#003893' }}>{item.estimatedBudget}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Rate / Sq. Ft.</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>{item.ratePerSqFt}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Cement Bags</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#16a34a' }}>{item.cementBags}</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Steel Rebar (TMT)</span>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#d97706' }}>{item.steelRebarTons}</div>
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 750, color: '#0f172a' }}>
          <Check size={15} color="#16a34a" />
          <span>Approx Breakdown: {item.materialShare} Materials + {item.laborShare} Labor</span>
        </div>
      </div>

      {/* Cross-linking scenarios matrix */}
      <section style={{ margin: '48px 0 24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
          Other House Plans & Material Estimates (अन्य घर तथा निर्माण हिसाब)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_CONSTRUCTION_SCENARIOS.filter((c) => c.slug !== item.slug).map((sc) => (
            <Link
              key={sc.slug}
              href={`/house-construction/${sc.slug}`}
              className="two-up-card-item showcase-card-better"
              style={{ textDecoration: 'none', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}
            >
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{sc.shortTitle}</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{sc.floorsText} • {sc.estimatedBudget}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="construction-programmatic-bottom" format="horizontal" />
      <FAQAccordion items={item.faqs} title={`${item.shortTitle} FAQs`} />
    </div>
  );
}

