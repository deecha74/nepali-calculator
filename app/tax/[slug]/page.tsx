import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Wallet, CheckCircle2, ShieldCheck, TrendingDown, ArrowRight } from 'lucide-react';
import { PROGRAMMATIC_SALARY_TAXES, ProgrammaticSalaryTax } from '@/lib/rates/programmaticTax';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { IncomeTaxCalculator } from '@/components/calculators/IncomeTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export async function generateStaticParams() {
  return PROGRAMMATIC_SALARY_TAXES.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_SALARY_TAXES.find((s) => s.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/tax/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticSalaryTaxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_SALARY_TAXES.find((s) => s.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: `Tax on NPR ${item.monthlySalary.toLocaleString()} Salary Calculator Nepal`,
    description: item.metaDescription,
    url: `https://nepalcalc.com/tax/${item.slug}`,
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: `How much tax is deducted on NPR ${item.monthlySalary.toLocaleString()} monthly salary in Nepal?`,
      answer: `On a monthly salary of NPR ${item.monthlySalary.toLocaleString()} (annual NPR ${item.annualSalary.toLocaleString()}), the base tax is calculated using the Government of Nepal Inland Revenue Department (IRD) slab rates. If you are registered in Social Security Fund (SSF), the 1% Social Security Tax on the first slab is waived, making your effective tax NPR ${item.singleAnnualTaxSsf.toLocaleString()} per year. Without SSF, the annual tax is NPR ${item.singleAnnualTaxNormal.toLocaleString()}.`,
    },
    {
      question: `What is the net take-home pay for NPR ${item.monthlySalary.toLocaleString()} salary?`,
      answer: `After income tax deduction, the estimated monthly take-home salary is approximately NPR ${item.takeHomeMonthlySsf.toLocaleString()} (with SSF waiver) or NPR ${item.takeHomeMonthlyNormal.toLocaleString()} (standard TDS). You can further reduce tax liability through CIT/EPF investments (up to NPR 5 Lakh), life insurance (NPR 40,000), and health insurance (NPR 20,000).`,
    },
    {
      question: `Is the tax different if I am married?`,
      answer: `Yes, married individuals assess tax under the joint bracket. For this income tier, married annual tax is NPR ${item.marriedAnnualTaxSsf.toLocaleString()} (with SSF) or NPR ${item.marriedAnnualTaxNormal.toLocaleString()} (standard).`,
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '24px' }}>
        <Link href="/tax" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
          <ArrowLeft size={14} />
          <span>Back to General Income Tax Calculator</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-emerald">Nepal Salary Tax Guide</span>
          <span className="badge badge-neutral">NPR {item.monthlySalary.toLocaleString()} / month</span>
          <span className="badge badge-blue">FY 2083/84</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '750px', lineHeight: '1.6' }}>
          {item.metaDescription}
        </p>
      </div>

      {/* Quick Summary Card */}
      <div className="white-card" style={{ padding: '24px', marginBottom: '32px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wallet size={18} color="#10b981" />
          <span>Quick Tax Summary for NPR {item.monthlySalary.toLocaleString()}/month (NPR {item.annualSalary.toLocaleString()}/year)</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, display: 'block' }}>Unmarried (With SSF)</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              NPR {item.singleAnnualTaxSsf.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>/yr</span>
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>
              Take-home: ~NPR {item.takeHomeMonthlySsf.toLocaleString()}/mo
            </div>
          </div>

          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, display: 'block' }}>Unmarried (Without SSF)</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
              NPR {item.singleAnnualTaxNormal.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>/yr</span>
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>
              Take-home: ~NPR {item.takeHomeMonthlyNormal.toLocaleString()}/mo
            </div>
          </div>

          <div style={{ padding: '16px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, display: 'block' }}>Married Status (With SSF)</span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#3b82f6', marginTop: '4px' }}>
              NPR {item.marriedAnnualTaxSsf.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>/yr</span>
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>
              Take-home: ~NPR {item.takeHomeMonthlySsf.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator with Pre-filled Amount */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
          Interactive Tax Simulation & Deduction Planner
        </h2>
        <IncomeTaxCalculator initialMonthlySalary={item.monthlySalary} titleTag="h2" />
      </div>

      <AdBanner slotId={`tax-${item.slug}-bottom`} format="horizontal" />

      {/* Other Popular Salary Brackets Internal Links (Crucial for pSEO rank power) */}
      <div className="white-card" style={{ padding: '24px', margin: '40px 0 24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
          Explore Other Salary Tax Calculations in Nepal
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
          Compare tax brackets for different monthly salary levels under current Inland Revenue Department (IRD) guidelines:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROGRAMMATIC_SALARY_TAXES.filter((s) => s.slug !== item.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/tax/${s.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: '#f1f5f9',
                fontSize: '12px',
                fontWeight: 600,
                color: '#334155',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
              }}
            >
              <span>NPR {s.monthlySalary.toLocaleString()}/mo Tax</span>
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      <FAQAccordion items={faqs} title={`Frequently Asked Questions: NPR ${item.monthlySalary.toLocaleString()} Salary Tax`} />
    </div>
  );
}
