import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, DollarSign, TrendingUp } from 'lucide-react';
import { PROGRAMMATIC_FOREX_CONVERSIONS, DEFAULT_FOREX_RATES, ProgrammaticForexConversion } from '@/lib/rates/forexRates';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { ForexCalculator } from '@/components/calculators/ForexCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export async function generateStaticParams() {
  return PROGRAMMATIC_FOREX_CONVERSIONS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_FOREX_CONVERSIONS.find((f) => f.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/forex/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticForexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_FOREX_CONVERSIONS.find((f) => f.slug === slug);

  if (!item) {
    notFound();
  }

  const rate = DEFAULT_FOREX_RATES.find((r) => r.code === item.code) || DEFAULT_FOREX_RATES[0];
  const unitBuyPrice = rate.buyNpr / rate.unit;
  const unitSellPrice = rate.sellNpr / rate.unit;

  const schema = generateWebApplicationSchema({
    name: `${item.name} (${item.code}) to NPR Currency Converter`,
    description: item.metaDescription,
    url: `https://nepalcalc.com/forex/${item.slug}`,
    category: "FinanceApplication",
  });

  const conversionTiers = [1, 5, 10, 50, 100, 500, 1000];

  const faqs = [
    {
      question: `What is today's ${item.name} (${item.code}) buying rate in Nepal?`,
      answer: `According to Nepal Rastra Bank (NRB) standard foreign exchange rates, 1 ${item.code} buying rate is approximately NPR ${unitBuyPrice.toFixed(2)} and selling rate is NPR ${unitSellPrice.toFixed(2)}.`,
    },
    {
      question: `How much is 100 ${item.code} in Nepalese Rupees?`,
      answer: `100 ${item.code} equals approximately NPR ${(100 * unitBuyPrice).toLocaleString('en-IN', { maximumFractionDigits: 2 })} based on current Nepal Rastra Bank exchange rates.`,
    },
    {
      question: `Which banks give the best remittance rates for ${item.code} in Nepal?`,
      answer: `Commercial banks including Global IME Bank, Nabil Bank, NIC Asia, Prabhu Bank, and money transfer operators (IME, Western Union, City Express) offer competitive remittance rates close to NRB benchmarks, often with additional 1% bonus rates on remittance deposits.`,
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '24px' }}>
        <Link href="/forex" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
          <ArrowLeft size={14} />
          <span>Back to All Forex Rates</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">{item.flag} {item.code} to NPR</span>
          <span className="badge badge-neutral">1 {item.code} ≈ NPR {unitBuyPrice.toFixed(2)}</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '750px' }}>
          {item.metaDescription}
        </p>
      </div>

      {/* Live Conversion Quick Matrix */}
      <div className="white-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="#10b981" />
          <span>Quick Conversion Table: {item.code} to Nepalese Rupees (NPR)</span>
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="nepal-table">
            <thead>
              <tr>
                <th>Amount ({item.code})</th>
                <th>Buying Amount (NPR)</th>
                <th>Selling Amount (NPR)</th>
              </tr>
            </thead>
            <tbody>
              {conversionTiers.map((amt) => (
                <tr key={amt}>
                  <td style={{ fontWeight: 700 }}>
                    {item.flag} {amt.toLocaleString()} {item.code}
                  </td>
                  <td style={{ color: '#059669', fontWeight: 700 }}>
                    रु {(amt * unitBuyPrice).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: '#4b5563' }}>
                    रु {(amt * unitSellPrice).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Live Converter */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
          Interactive Live {item.name} Converter & Remittance Calculator
        </h2>
        <ForexCalculator initialCurrency={item.code} titleTag="h2" />
      </div>

      <AdBanner slotId={`forex-${item.slug}-bottom`} format="horizontal" />

      {/* Other Currency Conversions */}
      <div className="white-card" style={{ padding: '24px', margin: '40px 0 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          Other High-Volume Remittance & Forex Conversions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROGRAMMATIC_FOREX_CONVERSIONS.filter((f) => f.slug !== item.slug).map((f) => (
            <Link
              key={f.slug}
              href={`/forex/${f.slug}`}
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
              <span>{f.flag} {f.code} to NPR</span>
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      <FAQAccordion items={faqs} title={`${item.name} to NPR Frequently Asked Questions`} />
    </div>
  );
}
