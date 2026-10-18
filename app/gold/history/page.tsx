import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, History, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { Gold100YearComparison } from '@/components/gold/Gold100YearComparison';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "100-Year Gold Price History & Return Comparison Nepal (1926 – 2026)",
  description: "Compare today's live gold rate vs 10 years ago (2016), 20, 50, and 100 years in Nepal. Calculate gold returns (CAGR), wealth multiplier, and year-by-year price archive in NPR per tola.",
  path: "/gold/history",
  keywords: [
    "todays gold rate vs 10 year gold rate nepal",
    "gold rate comparison in nepal",
    "gold price in nepal last 10 years",
    "100 years gold price history nepal",
    "historical gold price in nepal per tola",
    "gold return calculator nepal",
    "nepal gold price 1926 to 2026",
    "gold cagr nepal",
    "सुनको १०० वर्षे ऐतिहासिक मूल्य र नाफा"
  ],
});

export default function GoldHistoryPage() {
  const schema = generateWebApplicationSchema({
    name: "100-Year Gold Price History & Return Comparison Nepal",
    description: "Compare today's live gold rate with historical gold rates up to 100 years ago in Nepal. Calculate CAGR, multiplier, and historical profits.",
    url: "https://nepalcalc.com/gold/history",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What was the gold rate in Nepal 10 years ago (Today vs 2016)?",
      answer: "In 2016 AD (२०७२/७३ BS), 24K Hallmark gold in Nepal was approximately रु 52,500 per tola. Today (2026 AD), the rate stands at approximately रु 2,89,700 per tola. That is an enormous gain of +रु 2,37,200 per tola (+451.8% total profit) delivering an annualized compound growth rate (CAGR) of ~18.6% per year.",
    },
    {
      question: "What was the gold price in Nepal 100 years ago (1926 AD)?",
      answer: "In 1926 AD (१९८२ BS, during the Rana regime of Prime Minister Chandra Shumsher), gold was traded at approximately रु 20 per tola. Today's price of रु 2,89,700 per tola represents an increase of over 14,484 times (+1,448,400% total growth).",
    },
    {
      question: "What was the gold price in Nepal 20 years ago (2006 AD)?",
      answer: "In 2006 AD (२०६२/६३ BS, during People's Movement II), 24K gold was approximately रु 14,500 per tola. An investment of रु 14,500 then has grown to रु 2,89,700 today — a massive 20x return (+1,898% profit, ~16.2% CAGR).",
    },
    {
      question: "What was the gold price in Nepal 50 years ago (1976 AD)?",
      answer: "In 1976 AD (२०३२/३३ BS), gold was approximately रु 1,250 per tola. A single tola bought 50 years ago has multiplied by more than 231 times today.",
    },
    {
      question: "Has gold beaten inflation in Nepal over the last 100 years?",
      answer: "Yes, by a wide margin. Over the last 10, 20, 50, and 100 years, gold in Nepal has compounded at 12% to 18.6% annually (CAGR), significantly outperforming the average Nepal consumer inflation rate of 6% to 8% and the US Dollar depreciation against the Nepalese Rupee.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Navigation & Header */}
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
          <span>Back to Gold & Silver Rates</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} />
            <span>100-Year Historical Analysis</span>
          </span>
          <span className="badge badge-emerald">Live Rate Comparison</span>
          <span className="badge badge-neutral">1926 – 2026 AD</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)' }}>
          Nepal Gold Rate 100-Year History & Return Comparison (आज vs १० वर्ष अघि)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '800px', lineHeight: '1.6' }}>
          Analyze how much gold prices have grown in Nepal over 1 year, 5 years, 10 years, 20 years, 50 years, and 100 years. Compare past purchase costs against today&apos;s live FENEGOSIDA value with annualized compound returns (CAGR).
        </p>
      </div>

      <Gold100YearComparison />

      <AdBanner slotId="gold-history-mid" format="horizontal" />

      <FAQAccordion items={faqs} title="Frequently Asked Questions — Gold Price History & Returns in Nepal" />

      <AdBanner slotId="gold-history-bottom" format="horizontal" />
    </div>
  );
}
