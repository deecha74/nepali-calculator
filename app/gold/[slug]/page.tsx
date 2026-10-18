import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, CheckCircle, Scale, Coins, ArrowRight, ShieldCheck } from 'lucide-react';
import { PROGRAMMATIC_GOLD_ITEMS, ProgrammaticGoldItem } from '@/lib/rates/programmaticGold';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { GoldCalculator } from '@/components/calculators/GoldCalculator';
import { LiveGoldQuickAnswer } from '@/components/gold/LiveGoldQuickAnswer';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export async function generateStaticParams() {
  return PROGRAMMATIC_GOLD_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_GOLD_ITEMS.find((g) => g.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/gold/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticGoldPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_GOLD_ITEMS.find((g) => g.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `https://nepalcalc.com/gold/${item.slug}`,
    category: "FinanceApplication",
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const otherItems = PROGRAMMATIC_GOLD_ITEMS.filter((g) => g.slug !== item.slug);

  // Pre-configured calculator parameters
  const isLalQuery = item.slug.includes('1-lal');
  const initialMaking = isLalQuery ? 0 : 2500;
  const initialWastage = isLalQuery ? 0 : 2;

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb & Navigation */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/gold"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to All Gold & Silver Calculators</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} />
            <span>FENEGOSIDA Rates</span>
          </span>
          <span className="badge badge-emerald">Live Daily Update</span>
          <span className="badge badge-neutral">{item.badge}</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '780px', lineHeight: '1.6' }}>
          {item.metaDescription}
        </p>
      </div>

      {/* Featured Snippet Direct Answer Box (Google AEO Box) — 100% Real-Time Live */}
      <LiveGoldQuickAnswer
        unit={item.unit}
        amount={item.unit === 'gram' ? (item.gramAmount ?? 1) : (item.tolaAmount ?? 1)}
        slug={item.slug}
        headlineAnswer={item.headlineAnswer}
        conversionFormula={item.conversionFormula}
      />

      {/* Pre-configured Interactive Calculator */}
      <GoldCalculator
        initialMetalType={item.metalType}
        initialWeightUnit={item.unit}
        initialTola={item.tolaAmount ?? 1}
        initialLal={item.lalAmount ?? 0}
        initialGram={item.gramAmount ?? 11.66}
        initialMakingCharge={initialMaking}
        initialWastagePercent={initialWastage}
        titleTag="h2"
        customTitle={`Calculate ${item.shortTitle} with Making Charges & Jarti`}
        customSubtitle={`Adjust weight, labor charges (ज्याला), and wastage (जर्ती) for ${item.shortTitle} in Nepal.`}
      />

      <AdBanner slotId={`gold-${item.slug}-mid`} format="horizontal" />

      {/* Nepal Gold Weight Conversion Reference Table */}
      <div className="white-card" style={{ padding: '28px', margin: '40px 0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Scale size={20} color="#d97706" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Nepal Traditional Gold Units Conversion Table
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Jewelry in Nepal uses a combination of traditional Nepali units (Tola, Lal, Aana) and metric units (Grams).
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Nepali Unit</th>
                <th>Tola Equivalent</th>
                <th>Lal Equivalent</th>
                <th>Gram Equivalent</th>
                <th>Today 24K Approx Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr style={item.slug.includes('1-lal') ? { background: '#fef3c7', fontWeight: 700 } : {}}>
                <td><strong>1 Lal (१ लाल)</strong></td>
                <td>0.01 Tola</td>
                <td>1 Lal</td>
                <td>0.1166 Grams</td>
                <td>रु 1,685</td>
              </tr>
              <tr>
                <td><strong>1 Aana (१ आना)</strong></td>
                <td>0.0625 Tola</td>
                <td>6.25 Lal</td>
                <td>0.7289 Grams</td>
                <td>रु 10,531</td>
              </tr>
              <tr style={item.slug.includes('1-gram') ? { background: '#fef3c7', fontWeight: 700 } : {}}>
                <td><strong>1 Gram (१ ग्राम)</strong></td>
                <td>0.0857 Tola</td>
                <td>8.57 Lal</td>
                <td>1.0000 Grams</td>
                <td>रु 14,446</td>
              </tr>
              <tr style={item.slug.includes('8-gram') ? { background: '#fef3c7', fontWeight: 700 } : {}}>
                <td><strong>1 Ginni (गिन्नी - 8 Grams)</strong></td>
                <td>0.6859 Tola</td>
                <td>68.59 Lal</td>
                <td>8.0000 Grams</td>
                <td>रु 1,15,570</td>
              </tr>
              <tr style={item.slug.includes('10-gram') ? { background: '#fef3c7', fontWeight: 700 } : {}}>
                <td><strong>10 Grams (१० ग्राम)</strong></td>
                <td>0.8573 Tola</td>
                <td>85.73 Lal</td>
                <td>10.000 Grams</td>
                <td>रु 1,44,460</td>
              </tr>
              <tr style={item.slug.includes('per-tola') || item.slug.includes('1-tola') ? { background: '#fef3c7', fontWeight: 700 } : {}}>
                <td><strong>1 Tola (१ तोला)</strong></td>
                <td>1.00 Tola</td>
                <td>100 Lal</td>
                <td>11.6638 Grams</td>
                <td>रु 1,68,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Popular Gold Searches in Nepal */}
      <div className="white-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Coins size={18} color="#d97706" />
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Popular Gold & Silver Searches in Nepal
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {otherItems.map((other) => (
            <Link
              key={other.slug}
              href={`/gold/${other.slug}`}
              className="interactive-nav-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                background: 'var(--surface-primary)',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{other.shortTitle}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{other.badge}</div>
              </div>
              <ArrowRight size={14} color="#d97706" />
            </Link>
          ))}
        </div>
      </div>

      {/* Target FAQ Section with Schema */}
      <FAQAccordion items={item.faqs} title={`Frequently Asked Questions — ${item.shortTitle}`} />

      <AdBanner slotId={`gold-${item.slug}-bottom`} format="horizontal" />
    </div>
  );
}
