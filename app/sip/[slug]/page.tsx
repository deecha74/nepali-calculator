import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { PROGRAMMATIC_SIP_SCENARIOS, ProgrammaticSipScenario } from '@/lib/rates/programmaticSip';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { SipCalculator } from '@/components/calculators/SipCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { calculateSip } from '@/lib/rates/sipRates';

export async function generateStaticParams() {
  return PROGRAMMATIC_SIP_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_SIP_SCENARIOS.find((s) => s.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/sip/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticSipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_SIP_SCENARIOS.find((s) => s.slug === slug);

  if (!item) {
    notFound();
  }

  const calc5Yr = calculateSip(item.monthlyAmount, item.expectedRate, 5);
  const calc10Yr = calculateSip(item.monthlyAmount, item.expectedRate, 10);
  const calc15Yr = calculateSip(item.monthlyAmount, item.expectedRate, 15);

  const schema = generateWebApplicationSchema({
    name: `SIP of NPR ${item.monthlyAmount.toLocaleString()} Per Month Calculator Nepal`,
    description: item.metaDescription,
    url: `https://nepalcalc.com/sip/${item.slug}`,
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: `How much will NPR ${item.monthlyAmount.toLocaleString()} per month grow to in 10 years?`,
      answer: `At an expected 12% CAGR, investing NPR ${item.monthlyAmount.toLocaleString()} every month totals NPR ${calc10Yr.investedAmount.toLocaleString('en-IN')} in principal savings and generates an estimated NPR ${calc10Yr.wealthGain.toLocaleString('en-IN')} in wealth gain, resulting in a maturity value of approximately NPR ${calc10Yr.maturityValue.toLocaleString('en-IN')}.`,
    },
    {
      question: `How can I start an SIP of NPR ${item.monthlyAmount.toLocaleString()} in Nepal?`,
      answer: `You can initiate an online SIP through merchant capital portals such as NIMB Ace Capital (for NIBL Sahabhagita Fund), Siddhartha Capital (for Siddhartha Systematic Investment Scheme), or NMB Capital by submitting your Demat/BOID and linking your bank account or ConnectIPS.`,
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '24px' }}>
        <Link href="/sip" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
          <ArrowLeft size={14} />
          <span>Back to All SIP Calculations</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>NPR {item.monthlyAmount.toLocaleString()}/month SIP</span>
          <span className="badge badge-emerald">12% CAGR Benchmark</span>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '750px', lineHeight: '1.6' }}>
          {item.metaDescription}
        </p>
      </div>

      {/* Quick Tenure Milestones Matrix */}
      <div className="white-card" style={{ padding: 'clamp(16px, 3vw, 24px)', marginBottom: '32px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="#059669" />
          <span>Expected Maturity Milestones at 12% Annual Growth</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>5 Years Milestone</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              रु {calc5Yr.maturityValue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Invested: रु {calc5Yr.investedAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>10 Years Milestone</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              रु {calc10Yr.maturityValue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Invested: रु {calc10Yr.investedAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>15 Years Milestone</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
              रु {calc15Yr.maturityValue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Invested: रु {calc15Yr.investedAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Preloaded Interactive SIP Widget */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
          Simulate & Customize Your NPR {item.monthlyAmount.toLocaleString()} Monthly Plan
        </h2>
        <SipCalculator initialMonthlyAmount={item.monthlyAmount} />
      </div>

      <AdBanner slotId={`sip-${item.slug}-bottom`} format="horizontal" />

      {/* Cross links */}
      <div className="white-card" style={{ padding: '24px', margin: '40px 0 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          Explore Other Popular Monthly SIP Amounts in Nepal
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROGRAMMATIC_SIP_SCENARIOS.filter((s) => s.slug !== item.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/sip/${s.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                fontSize: '12px',
                fontWeight: 600,
                color: '#334155',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <span>NPR {s.monthlyAmount.toLocaleString()}/mo SIP</span>
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      <FAQAccordion items={faqs} title={`NPR ${item.monthlyAmount.toLocaleString()} Monthly SIP FAQs`} />
    </div>
  );
}
