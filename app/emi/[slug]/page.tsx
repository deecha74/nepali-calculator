import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { PROGRAMMATIC_EMI_SCENARIOS } from '@/lib/rates/programmaticEmi';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { EmiCalculator } from '@/components/calculators/EmiCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_EMI_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_EMI_SCENARIOS.find((e) => e.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/emi/${item.slug}`,
    keywords: item.keywords,
  });
}

function calcEmi(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

export default async function ProgrammaticEmiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_EMI_SCENARIOS.find((e) => e.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: item.title,
    description: item.metaDescription,
    url: `${SITE_CONFIG.url}/emi/${item.slug}`,
    category: 'FinanceApplication',
  });

  const sampleTenures = [5, 7, 10, 15, 20];
  const sampleRates = [9.5, 10.5, 11.5];

  const defaultMonthlyEmi = calcEmi(item.loanAmount, item.defaultRate, item.defaultTenureYears);
  const totalPayable = defaultMonthlyEmi * item.defaultTenureYears * 12;
  const totalInterest = totalPayable - item.loanAmount;

  const faqs = [
    {
      question: `What is the monthly EMI for a ${item.displayLabel} loan in Nepal?`,
      answer: `At an average bank interest rate of ${item.defaultRate}% p.a. for a tenure of ${item.defaultTenureYears} years, the monthly EMI for a ${item.displayLabel} (NPR ${item.loanAmount.toLocaleString('en-IN')}) loan is approximately रु ${defaultMonthlyEmi.toLocaleString('en-IN')} per month.`,
    },
    {
      question: `How much minimum monthly income (DBR) is required for a ${item.displayLabel} bank loan in Nepal?`,
      answer: `Under Nepal Rastra Bank (NRB) Debt-to-Burden Ratio (DBR) directives, your monthly EMI generally cannot exceed 50% of your verifiable net monthly income. Therefore, for an EMI of रु ${defaultMonthlyEmi.toLocaleString('en-IN')}, banks typically require a minimum net monthly family income of around रु ${(defaultMonthlyEmi * 2).toLocaleString('en-IN')}.`,
    },
    {
      question: `How much total interest is paid on a ${item.displayLabel} loan over ${item.defaultTenureYears} years?`,
      answer: `Over ${item.defaultTenureYears} years (${item.defaultTenureYears * 12} monthly installments) at ${item.defaultRate}% p.a., the total interest payable is approximately रु ${totalInterest.toLocaleString('en-IN')}, bringing total repayment to रु ${totalPayable.toLocaleString('en-IN')}.`,
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '12px' }}>
        <Link href="/emi" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} />
          <span>Back to Bank Loan EMI Calculator</span>
        </Link>
      </div>

      {/* Interactive EMI Calculator pre-filled with the scenario */}
      <div style={{ marginBottom: '32px' }}>
        <EmiCalculator
          initialAmount={item.loanAmount}
          initialRate={item.defaultRate}
          initialTenure={item.defaultTenureYears}
          customTitle={item.title}
        />
      </div>

      {/* Tenure & Interest Rate Comparison Matrix */}
      <div className="white-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={18} color="#2563eb" />
          <span>{item.displayLabel} Loan EMI Comparison Across Tenures & Interest Rates</span>
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="nepal-table">
            <thead>
              <tr>
                <th>Loan Tenure</th>
                {sampleRates.map((r) => (
                  <th key={r}>EMI @ {r}% p.a.</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleTenures.map((yr) => (
                <tr key={yr}>
                  <td style={{ fontWeight: 700 }}>{yr} Years ({yr * 12} Months)</td>
                  {sampleRates.map((r) => (
                    <td key={r} style={{ fontWeight: 700, color: r === 10.5 ? '#0b2b5c' : '#334155' }}>
                      रु {calcEmi(item.loanAmount, r, yr).toLocaleString('en-IN')} / mo
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdBanner slotId={`emi-${item.slug}-bottom`} format="horizontal" />

      {/* Other Loan Amount Links */}
      <div className="white-card" style={{ padding: '24px', margin: '40px 0 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          Other Popular Bank Loan EMI Scenarios in Nepal
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROGRAMMATIC_EMI_SCENARIOS.filter((e) => e.slug !== item.slug).map((e) => (
            <Link
              key={e.slug}
              href={`/emi/${e.slug}`}
              className="hover-lift"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0b2b5c',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <span>{e.displayLabel} Loan EMI</span>
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      <FAQAccordion items={faqs} title={`${item.displayLabel} Loan EMI Frequently Asked Questions`} />
    </div>
  );
}

