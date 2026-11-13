import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_LONGTAIL_GUIDES, ProgrammaticLongtailGuide } from '@/lib/rates/programmaticLicense';
import { FAQAccordion } from '@/components/FAQAccordion';
import { constructMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_LONGTAIL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = PROGRAMMATIC_LONGTAIL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Nepal Driving License Guide',
    };
  }

  return constructMetadata({
    title: `${guide.titleEn} — Nepal Driving License`,
    description: guide.metaDescEn,
    path: `/license/guide/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default async function LicenseLongtailGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = PROGRAMMATIC_LONGTAIL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleEn,
    description: guide.metaDescEn,
    url: `https://nepalcalc.com/license/guide/${guide.slug}`,
    inLanguage: ['en', 'ne'],
    publisher: {
      '@type': 'Organization',
      name: 'NepaliCalc',
      url: 'https://nepalicalc.com',
    },
  };

  const otherGuides = PROGRAMMATIC_LONGTAIL_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 6);

  return (
    <div style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/license"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#2563eb',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={16} />
          <span>All License Tools & Exam Hub (लाइसेन्स पोर्टल)</span>
        </Link>
      </div>

      {/* Main Answer Header Card */}
      <article
        className="white-card"
        style={{
          borderRadius: '24px',
          padding: '36px clamp(20px, 4vw, 40px)',
          border: '1.5px solid #dbeafe',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
          boxShadow: '0 10px 36px rgba(15, 23, 42, 0.05)',
          marginBottom: '36px',
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '9999px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            color: '#1d4ed8',
            fontSize: '12.5px',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <HelpCircle size={14} />
          <span>DoTM Rules & FAQ Guide (नेपाल लाइसेन्स नियम)</span>
        </div>

        {/* Primary Question H1 */}
        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.25,
            letterSpacing: '-0.025em',
            margin: '0 0 10px',
          }}
        >
          {guide.titleEn}
        </h1>

        <div style={{ fontSize: '18px', fontWeight: 700, color: '#475569', marginBottom: '24px' }}>
          {guide.titleNe}
        </div>

        {/* Direct Featured Snippet Box (Google Answer Box Ready) */}
        <div
          style={{
            padding: '20px 22px',
            borderRadius: '16px',
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>Quick Answer / मुख्य उत्तर:</span>
          </div>
          <div style={{ fontSize: '16px', color: '#14532d', lineHeight: 1.55, fontWeight: 600 }}>
            {guide.shortSnippetEn}
          </div>
          <div style={{ fontSize: '14.5px', color: '#166534', marginTop: '6px', lineHeight: 1.5 }}>
            {guide.shortSnippetNe}
          </div>
        </div>

        {/* Detailed Points Breakdown */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
            Key Rules & Important Facts (महत्वपूर्ण तथ्यहरू)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {guide.bulletPointsEn.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: 600, lineHeight: 1.5 }}>
                    {pt}
                  </div>
                  {guide.bulletPointsNe[idx] && (
                    <div style={{ fontSize: '13.5px', color: '#64748b', marginTop: '4px', lineHeight: 1.45 }}>
                      {guide.bulletPointsNe[idx]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Callout Link to Interactive Tool */}
        <div
          style={{
            padding: '24px',
            borderRadius: '18px',
            backgroundColor: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e40af' }}>
              {guide.relatedToolLabelEn}
            </div>
            <div style={{ fontSize: '13.5px', color: '#3b82f6', marginTop: '3px' }}>
              {guide.relatedToolLabelNe}
            </div>
          </div>

          <Link
            href={guide.relatedToolPath}
            className="hover-lift"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '9999px',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              fontSize: '14.5px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
            }}
          >
            <span>Open Tool Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      {/* Guide FAQs */}
      <div style={{ marginBottom: '48px' }}>
        <FAQAccordion items={guide.faqs} title="Frequently Asked Questions" />
      </div>

      {/* Related Longtail Guides Grid */}
      <div
        className="white-card"
        style={{
          borderRadius: '20px',
          padding: '28px 24px',
          border: '1.5px solid #e2e8f0',
          backgroundColor: '#ffffff',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
          Explore Related Driving License Guides (थप उपयोगी जानकारी)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {otherGuides.map((item) => (
            <Link
              key={item.slug}
              href={`/license/guide/${item.slug}`}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#0f172a',
                fontSize: '13.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
              className="hover:border-blue-300 hover:text-blue-600"
            >
              <span style={{ maxWidth: '85%' }}>{item.titleEn}</span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

