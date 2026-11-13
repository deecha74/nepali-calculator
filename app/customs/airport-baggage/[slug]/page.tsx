import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Plane,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  PROGRAMMATIC_BAGGAGE_ITEMS,
  ProgrammaticBaggageItem,
} from '@/lib/rates/programmaticBaggage';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { AirportBaggageCalculator } from '@/components/calculators/AirportBaggageCalculator';
import { GoldCustomsCalculator } from '@/components/calculators/GoldCustomsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_BAGGAGE_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_BAGGAGE_ITEMS.find((b) => b.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/customs/airport-baggage/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticBaggagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_BAGGAGE_ITEMS.find((b) => b.slug === slug);

  if (!item) {
    notFound();
  }

  const canonicalUrl = `${SITE_CONFIG.url}/customs/airport-baggage/${item.slug}`;

  const webAppSchema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: canonicalUrl,
    category: 'UtilityApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Customs', url: `${SITE_CONFIG.url}/customs` },
    { name: 'Airport Baggage', url: `${SITE_CONFIG.url}/customs/airport-baggage` },
    { name: item.shortTitle, url: canonicalUrl },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const otherItems = PROGRAMMATIC_BAGGAGE_ITEMS.filter((b) => b.slug !== item.slug);

  return (
    <div className="container" style={{ padding: '36px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/customs/airport-baggage"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          <span>All Airport Baggage &amp; Customs Calculators</span>
        </Link>
      </div>

      {/* Header with Country Flag & Item Tag */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            className="badge badge-amber"
            style={{
              background: '#fef3c7',
              color: '#b45309',
              fontWeight: 800,
              fontSize: '12px',
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            {item.countryFlag} {item.country}
          </span>
          <span
            className="badge badge-blue"
            style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              fontWeight: 800,
              fontSize: '12px',
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            {item.itemType}
          </span>
          <span
            className="badge badge-emerald"
            style={{
              background: '#ecfdf5',
              color: '#047857',
              fontWeight: 800,
              fontSize: '12px',
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            TIA Jhitigunta Aadesh २०८३/८४
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(21px, 2.8vw, 30px)',
            fontWeight: 900,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            margin: '0 0 10px',
          }}
        >
          {item.title}
        </h1>
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.metaDescription}
        </p>
      </div>

      {/* Quick Answer Statutory Rule Summary Card */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '14px',
          padding: '20px 22px',
          marginBottom: '26px',
          boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <ShieldCheck size={20} color="#059669" />
          <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Official TIA Baggage Regulation Quick Summary
          </h2>
        </div>

        <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.65, margin: '0 0 16px' }}>
          {item.headlineAnswer}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em' }}>
              Duty-Free Personal Allowance
            </span>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>
              {item.dutyFreeLimit}
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em' }}>
              Dutiable Tariff on Excess
            </span>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
              {item.dutyPayableRate}
            </div>
          </div>

          <div style={{ background: '#fef2f2', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#991b1b', letterSpacing: '0.04em' }}>
              Seizure / Warning Note
            </span>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b', marginTop: '2px', lineHeight: 1.4 }}>
              {item.confiscationRiskNotice}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Calculator (Above the Fold) */}
      <div style={{ marginBottom: '32px' }}>
        {item.category === 'gold' ? (
          <GoldCustomsCalculator />
        ) : (
          <AirportBaggageCalculator />
        )}
      </div>

      <AdBanner slotId="airport-baggage-mid" format="horizontal" />

      {/* Comprehensive FAQs Section */}
      <div style={{ margin: '36px 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Frequently Asked Questions: {item.shortTitle}
        </h2>
        <FAQAccordion items={item.faqs} />
      </div>

      {/* Cross-Link Other Airport Baggage Rules */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Plane size={18} color="#0284c7" />
          <h3 style={{ fontSize: '16.5px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Explore Baggage &amp; Customs Rules for Other Countries and Items
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {otherItems.map((other) => (
            <Link
              key={other.slug}
              href={`/customs/airport-baggage/${other.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                textDecoration: 'none',
                color: '#1e293b',
                fontSize: '13px',
                fontWeight: 700,
                transition: 'all 0.15s ease',
              }}
            >
              <span>
                {other.countryFlag} {other.shortTitle}
              </span>
              <ArrowRight size={14} color="#64748b" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

