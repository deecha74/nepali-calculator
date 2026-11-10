import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle2, ShieldCheck, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import {
  PROGRAMMATIC_BANK_LOAN_SCENARIOS,
  NEPAL_COMMERCIAL_BANKS,
  getBankEffectiveRate,
  calculateMonthlyEmi,
} from '@/lib/rates/bankLoanRates';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { BankLoanComparison } from '@/components/calculators/BankLoanComparison';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_BANK_LOAN_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scenario = PROGRAMMATIC_BANK_LOAN_SCENARIOS.find((e) => e.slug === slug);
  if (!scenario) return {};

  return constructMetadata({
    title: scenario.title,
    description: scenario.metaDescription,
    path: `/emi/banks/${scenario.slug}`,
    keywords: scenario.keywords,
  });
}

export default async function ProgrammaticBankLoanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = PROGRAMMATIC_BANK_LOAN_SCENARIOS.find((e) => e.slug === slug);

  if (!scenario) {
    notFound();
  }

  const bank = NEPAL_COMMERCIAL_BANKS.find((b) => b.id === scenario.bankId) || NEPAL_COMMERCIAL_BANKS[0];
  const effectiveRate = getBankEffectiveRate(bank, scenario.category);
  const monthlyEmi = calculateMonthlyEmi(scenario.defaultAmount, effectiveRate, scenario.defaultTenureYears);
  const totalMonths = scenario.defaultTenureYears * 12;
  const totalRepayment = monthlyEmi * totalMonths;
  const totalInterest = totalRepayment - scenario.defaultAmount;
  const requiredIncome = monthlyEmi * 2; // NRB 50% DSTI

  const canonicalUrl = `${SITE_CONFIG.url}/emi/banks/${scenario.slug}`;

  const webAppSchema = generateWebApplicationSchema({
    name: scenario.title,
    description: scenario.metaDescription,
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Bank Loan Comparison', url: `${SITE_CONFIG.url}/emi/banks` },
    { name: scenario.title, url: canonicalUrl },
  ]);

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${bank.name} ${scenario.categoryNameEn}`,
    description: scenario.metaDescription,
    annualPercentageRate: effectiveRate,
    interestRate: effectiveRate,
    feesAndCommissionsSpecification: `${bank.processingFeePercent}% processing charge`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bank.name,
      url: bank.website,
    },
  };

  const faqs = [
    {
      question: `What is the current interest rate for ${bank.name} ${scenario.categoryNameEn}?`,
      answer: `As of the current fiscal quarter, ${bank.name} offers ${scenario.categoryNameEn} at an effective annual interest rate of ${effectiveRate}% p.a. (Base Rate ${bank.baseRate}% + Premium Spread). Rates are subject to quarterly adjustment based on Nepal Rastra Bank base rate revisions.`,
    },
    {
      question: `What is the monthly EMI for a NPR ${scenario.defaultAmount.toLocaleString('en-IN')} loan at ${bank.name}?`,
      answer: `For a loan amount of NPR ${scenario.defaultAmount.toLocaleString('en-IN')} (${(scenario.defaultAmount / 100000).toFixed(0)} Lakh) over ${scenario.defaultTenureYears} years at ${effectiveRate}% p.a., the estimated monthly EMI is approximately रु ${monthlyEmi.toLocaleString('en-IN')} per month. Total interest over the period is रु ${totalInterest.toLocaleString('en-IN')}.`,
    },
    {
      question: `What documents are required to apply for ${bank.name} ${scenario.categoryNameEn}?`,
      answer: `Under standard bank verification, applicants need: 1) Valid Nepali Citizenship, 2) Recent Passport-size photos, 3) Certified Salary Certificate & 6-month bank statement (or audited financial statements for business owners), 4) Land Ownership Certificate (Lalpurja), Cadastral Blue Print, and approved Building Completion Certificate (Naxa Pass) for property collateral, 5) Tax Clearance Certificate (PAN).`,
    },
    {
      question: `How much monthly income do I need to qualify for this loan at ${bank.name}?`,
      answer: `Under Nepal Rastra Bank (NRB) 50% Debt-to-Burden Ratio (DSTI) directives, your monthly repayment cannot exceed half your gross family income. To comfortably qualify for an EMI of रु ${monthlyEmi.toLocaleString('en-IN')}, a verified monthly family income of at least रु ${requiredIncome.toLocaleString('en-IN')} is recommended.`,
    },
  ];

  // Other bank alternatives in the same category
  const otherScenarios = PROGRAMMATIC_BANK_LOAN_SCENARIOS.filter(
    (s) => s.slug !== scenario.slug && s.category === scenario.category
  );

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
      />

      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/emi/banks"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to All Bank Loan Comparisons</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#003893', backgroundColor: '#eff6ff', padding: '3px 10px', borderRadius: '9999px', border: '1px solid #bfdbfe' }}>
            {bank.shortCode} • CLASS A COMMERCIAL BANK
          </span>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
            {scenario.categoryNameEn}
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3.8vw, 32px)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.3 }}>
          {scenario.title}
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Official repayment estimate based on {bank.name} Base Rate ({bank.baseRate}%) plus agreed spread.
        </p>
      </div>

      {/* Direct Fact Summary Card (GEO / AEO Friendly) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          padding: '20px',
          borderRadius: '16px',
          backgroundColor: '#f8fafc',
          border: '1.5px solid #e2e8f0',
          marginBottom: '32px',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{scenario.categoryNameEn} Rate</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#003893', marginTop: '2px' }}>
            {effectiveRate}% <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>p.a.</span>
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Base {bank.baseRate}% + Spread</div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Sample Monthly EMI</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>
            रु {monthlyEmi.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
            On रु {(scenario.defaultAmount / 100000).toFixed(0)} Lakh ({scenario.defaultTenureYears} Yrs)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Total Interest (Over Tenure)</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
            रु {totalInterest.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Total: रु {totalRepayment.toLocaleString('en-IN')}</div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Min. Income Required (50% DSTI)</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
            रु {requiredIncome.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Gross family monthly income</div>
        </div>
      </div>

      {/* Main Interactive Comparison Pre-filled */}
      <BankLoanComparison
        initialCategory={scenario.category}
        initialAmount={scenario.defaultAmount}
        initialTenureYears={scenario.defaultTenureYears}
        highlightBankId={bank.id}
      />

      {/* Required Documentation Checklist */}
      <div
        style={{
          marginTop: '36px',
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          border: '1.5px solid #eef2f6',
          boxShadow: '0 2px 8px rgba(11, 43, 92, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <FileText size={18} color="#003893" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
            Required Documents for {bank.name} {scenario.categoryNameEn}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Identification</strong>: Certified copy of Nepali Citizenship (नागरिकता) of borrower and guarantor, plus passport-size photos.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Income Proof</strong>: Formal employment letter, salary certificate, and minimum 6 months official bank statement showing regular credits.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Collateral Deeds</strong>: Land Ownership Certificate (Lalpurja), Cadastral Blue Print (नक्सा), and latest Malpot land tax receipt.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Municipality Approvals</strong>: Approved building construction drawing (नक्सा पास) and Building Completion Certificate (Nirman Sampanna).
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Bank Scenarios */}
      {otherScenarios.length > 0 && (
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            Compare Other Bank {scenario.categoryNameEn} Rates
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {otherScenarios.map((other) => (
              <Link
                key={other.slug}
                href={`/emi/banks/${other.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                <span>{other.title}</span>
                <ArrowRight size={14} color="#003893" style={{ flexShrink: 0, marginLeft: '8px' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdBanner slotId="bank-emi-detail-bottom" format="horizontal" />

      {/* FAQs */}
      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title={`Frequently Asked Questions (${bank.name})`} />
      </div>
    </div>
  );
}

