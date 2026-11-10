import type { Metadata } from 'next';
import Link from 'next/link';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateGEODatasetSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { BankLoanComparison } from '@/components/calculators/BankLoanComparison';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { ArrowLeft, Building2, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { PROGRAMMATIC_BANK_LOAN_SCENARIOS, NEPAL_COMMERCIAL_BANKS } from '@/lib/rates/bankLoanRates';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Bank Loan Comparison 2083 — Compare Home, EV & Auto Loan EMI Rates',
  description:
    'Compare current loan interest rates across top Nepal Commercial Banks (Nabil, Global IME, NIC Asia, RBB, Everest, Standard Chartered). Real-time monthly EMI, base rates, and NRB 50% DSTI limits.',
  path: '/emi/banks',
  keywords: [
    'nepal bank loan comparison 2083',
    'bank home loan interest rates nepal',
    'compare loan emi nepal',
    'nabil vs global ime home loan',
    'ev car loan interest rate nepal',
    'commercial bank base rate nepal',
    'घर कर्जा ब्याजदर तुलना',
    'नेपालका बैंकहरूको ब्याजदर',
  ],
});

export default function BankLoanComparisonPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/emi/banks`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Commercial Bank Loan EMI Comparison Suite',
    description:
      'Compare home loans, electric vehicle (EV) financing, and education loans across Nepal commercial banks with live base rates and DBR calculation.',
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Loan EMI Calculator', url: `${SITE_CONFIG.url}/emi` },
    { name: 'Bank Loan Comparison', url: canonicalUrl },
  ]);

  const datasetSchema = generateGEODatasetSchema({
    name: 'Nepal Commercial Banks Base Rates and Retail Loan Spread Matrix (FY 2083/84)',
    description:
      'Quarterly statutory base rates and interest rate spreads published by Class A commercial banks licensed by Nepal Rastra Bank.',
    url: canonicalUrl,
    keywords: [
      'Nepal Bank Base Rates 2083',
      'Commercial Bank Home Loan Spreads',
      'NRB Retail Loan Lending Directives',
    ],
  });

  const faqs = [
    {
      question: 'Which commercial bank in Nepal offers the lowest home loan interest rate?',
      answer:
        'Rastriya Banijya Bank (RBB) consistently maintains Nepal’s lowest base rate (around 6.95% to 7.10%), resulting in the most affordable initial effective home loan rate (~8.50% to 9.00% APR). Among private commercial banks, Nabil Bank and Standard Chartered Bank maintain highly competitive base rates (~7.15% to 7.45%) with low spread margins.',
    },
    {
      question: 'What is the maximum financing (LTV) allowed for Electric Vehicles (EVs) in Nepal?',
      answer:
        'Under Nepal Rastra Bank (NRB) monetary directives, commercial banks can finance up to 80% Loan-to-Value (LTV) for passenger Electric Vehicles (EVs like BYD Atto 3, Tata Nexon EV, MG4). In contrast, conventional petrol and diesel passenger vehicles are capped at a maximum of 50% financing.',
    },
    {
      question: 'How is the NRB 50% Debt-to-Burden Ratio (DSTI / DBR) calculated?',
      answer:
        'Nepal Rastra Bank strictly mandates that a borrower’s total monthly debt service (EMI for all active loans) cannot exceed 50% of verified monthly gross family income. For example, if your monthly EMI is NPR 40,000, your certified monthly family income must be at least NPR 80,000.',
    },
    {
      question: 'Can banks increase my fixed home loan interest rate after approval?',
      answer:
        'In Nepal, most retail bank loans are variable-rate loans tied to the quarterly Base Rate (आधार दर + प्रिमियम). While your agreed premium spread remains fixed throughout the contract, your total interest rate will rise or fall automatically as the bank’s quarterly base rate fluctuates.',
    },
  ];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/emi"
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
          <span>Back to Bank Loan EMI Calculator</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: '#eff6ff',
            color: '#003893',
            fontSize: '12px',
            fontWeight: 800,
            marginBottom: '10px',
            border: '1px solid #bfdbfe',
          }}
        >
          <Building2 size={13} />
          <span>NEPAL COMMERCIAL BANKS LOAN COMPARISON 2083</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.25 }}>
          Nepal Bank Loan Comparison & EMI Calculator
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Compare live retail lending rates, quarterly base rates, and monthly EMI schedules across top Class A commercial banks for Home, EV, Auto, and Abroad Study Loans.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <BankLoanComparison />

      {/* Popular Bank-Specific Programmatic Guides */}
      <section style={{ marginTop: '48px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Explore Specific Bank Loan Rates & Documentation Guides
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {PROGRAMMATIC_BANK_LOAN_SCENARIOS.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/emi/banks/${scenario.slug}`}
              style={{
                display: 'block',
                padding: '16px 18px',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                  {scenario.shortCode}
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  {scenario.categoryNameEn}
                </span>
              </div>
              <h4 style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 750, color: '#0f172a', lineHeight: 1.4 }}>
                {scenario.title}
              </h4>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slotId="bank-emi-bottom" format="horizontal" />

      {/* FAQs */}
      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Frequently Asked Questions (Nepal Bank Loans)" />
      </div>
    </div>
  );
}

