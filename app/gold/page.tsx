import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { GoldCalculator } from '@/components/calculators/GoldCalculator';
import { Gold100YearComparison } from '@/components/gold/Gold100YearComparison';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';

export const metadata: Metadata = constructMetadata({
  title: "Price of Gold in Nepal Today (सुनको भाउ) — 24K, 22K & Jewelry Calculator",
  description: "Live price of gold in Nepal today per tola, 1 lal, and 10 grams per official FENEGOSIDA rates. Calculate 24K Hallmark & 22K Tejabi jewelry cost with making charge (ज्याला) and jarti (जर्ती).",
  path: "/gold",
  keywords: [
    "price of gold in nepal",
    "gold price in nepal today",
    "1 lal gold price in nepal today",
    "todays gold price in nepal",
    "gold price in nepal today per tola",
    "1 tola gold price in nepal today",
    "10 gram gold price in nepal today",
    "fenegosida gold rate",
    "today gold silver rate nepal",
    "tola to gram nepal",
    "1 tola ma kati gram huncha",
    "1 tola ma kati lal huncha",
    "1 lal sun ko vau kati huncha",
    "nepal ma aaja sun ko vau kati cha",
    "gold jarti kasari nikalne",
    "gold jewelry making charge calculator",
    "सुनको भाउ आज",
    "चाँदीको भाउ",
    "१ लाल सुनको भाउ",
    "सुन ज्याला जर्ती हिसाब"
  ],
});

export default function GoldPage() {
  const schema = generateWebApplicationSchema({
    name: "Price of Gold in Nepal Today & Jewelry Calculator",
    description: "Check today's gold price in Nepal per tola, 1 lal, and 10 grams. Calculate 24K Hallmark and 22K Tejabi jewelry prices with labor and wastage charges.",
    url: "https://nepalcalc.com/gold",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the price of gold in Nepal today per tola? (नेपालमा आज सुनको भाउ कति छ?)",
      answer: "Today's official gold price in Nepal published by FENEGOSIDA is रु 2,89,700 per tola for 24K Hallmark Fine Gold (छापावाल सुन) and रु 2,88,700 per tola for 22K Tejabi Gold (तेजाबी सुन).",
    },
    {
      question: "1 Lal sun ko vau aaja kati cha? (How much is 1 Lal gold in Nepal?)",
      answer: "Today's 1 Lal gold price in Nepal is approximately रु 2,897 for 24K Hallmark gold and रु 2,887 for 22K Tejabi gold. In Nepal, 1 Tola contains exactly 100 Lal (१ तोला = १०० लाल).",
    },
    {
      question: "1 Tola ma kati gram huncha? (How many grams are in 1 Tola?)",
      answer: "Under the official Nepal gold market standard (FENEGOSIDA), exactly 1 Tola = 11.6638 grams. 1 Tola also equals 100 Lal or 16 Aana.",
    },
    {
      question: "What is the 10 gram gold price in Nepal today?",
      answer: "Today's 10 gram gold price in Nepal is रु 2,48,370 for 24K Hallmark gold and रु 2,47,520 for 22K Tejabi gold.",
    },
    {
      question: "What is Jarti (जर्ती) in Nepal jewelry purchases?",
      answer: "Jarti is the percentage of gold accounted for material wastage during melting, designing, soldering, and crafting of jewelry, typically ranging between 1% and 5% depending on the complexity of craftsmanship.",
    },
    {
      question: "What is the difference between Chhapawal (Hallmark) and Tejabi gold?",
      answer: "Chhapawal (छापावाल) is certified 24 Karat gold with 99.9% purity. Tejabi (तेजाबी) is 22 Karat recycled/refined gold with 91.6% purity. Tejabi is slightly harder and ideal for durable traditional ornaments.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <GoldCalculator />

      <AdBanner slotId="gold-page-mid" format="horizontal" />

      {/* 100-Year Historical Gold Rate Comparison (Today vs 10 Years, 20 Years, 50 Years, 100 Years) */}
      <Gold100YearComparison />

      {/* Programmatic SEO Quick Access Grid */}
      <div className="white-card" style={{ padding: '28px', margin: '36px 0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={18} color="#d97706" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Popular Gold & Silver Price Queries in Nepal
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Explore dedicated rate breakdowns, unit formulas, and instant calculators for popular Nepal gold searches:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_GOLD_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/gold/${item.slug}`}
              className="interactive-nav-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                background: 'var(--surface-primary)',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.shortTitle}
                </div>
                <div style={{ fontSize: '12px', color: '#d97706', fontWeight: 600, marginTop: '2px' }}>
                  Approx: रु {item.approximateFinePriceNpr.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {item.badge}
                </div>
              </div>
              <ArrowRight size={16} color="#d97706" />
            </Link>
          ))}
        </div>
      </div>

      {/* Traditional Units Overview Table */}
      <div className="white-card" style={{ padding: '28px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Scale size={20} color="#d97706" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Nepal Traditional Gold Measurement Units Guide
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Quick reference conversion table between Nepali traditional units (Tola, Lal, Aana) and metric grams:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Unit (एकाइ)</th>
                <th>Tola (तोला)</th>
                <th>Lal (लाल)</th>
                <th>Aana (आना)</th>
                <th>Grams (ग्राम)</th>
                <th>Today 24K Approx</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1 Lal (१ लाल)</strong></td>
                <td>0.01 Tola</td>
                <td>1 Lal</td>
                <td>0.16 Aana</td>
                <td>0.1166 g</td>
                <td>रु 2,897</td>
              </tr>
              <tr>
                <td><strong>1 Aana (१ आना)</strong></td>
                <td>0.0625 Tola</td>
                <td>6.25 Lal</td>
                <td>1 Aana</td>
                <td>0.7289 g</td>
                <td>रु 18,106</td>
              </tr>
              <tr>
                <td><strong>1 Gram (१ ग्राम)</strong></td>
                <td>0.0857 Tola</td>
                <td>8.57 Lal</td>
                <td>1.37 Aana</td>
                <td>1.0000 g</td>
                <td>रु 24,837</td>
              </tr>
              <tr>
                <td><strong>1 Ginni (गिन्नी - 8g)</strong></td>
                <td>0.6859 Tola</td>
                <td>68.59 Lal</td>
                <td>10.97 Aana</td>
                <td>8.0000 g</td>
                <td>रु 1,98,696</td>
              </tr>
              <tr>
                <td><strong>10 Grams (१० ग्राम)</strong></td>
                <td>0.8573 Tola</td>
                <td>85.73 Lal</td>
                <td>13.72 Aana</td>
                <td>10.000 g</td>
                <td>रु 2,48,370</td>
              </tr>
              <tr style={{ background: '#fef3c7', fontWeight: 700 }}>
                <td><strong>1 Tola (१ तोला)</strong></td>
                <td>1.00 Tola</td>
                <td>100 Lal</td>
                <td>16 Aana</td>
                <td>11.6638 g</td>
                <td>रु 2,89,700</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <FAQAccordion
        items={faqs}
        title="Frequently Asked Questions — Gold & Silver Rates in Nepal"
        quickSummary={{
          question: "What is today's official gold price in Nepal per tola?",
          directAnswer: "Today's official gold rate published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) is रु 2,89,700 per tola for 24K Hallmark Fine Gold (छापावाल सुन) and रु 2,88,700 per tola for 22K Tejabi Gold (तेजाबी सुन). Per 10 grams, 24K gold is रु 2,48,370 and per 1 Lal it is रु 2,897.",
          keyFacts: ["1 Tola = 11.6638g", "1 Tola = 100 Lal", "FENEGOSIDA Official Live"],
          authoritySource: "Federation of Nepal Gold & Silver Dealers (FENEGOSIDA)"
        }}
      />

      <AdBanner slotId="gold-page-bottom" format="horizontal" />
    </div>
  );
}
