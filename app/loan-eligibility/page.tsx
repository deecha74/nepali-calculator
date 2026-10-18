import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LoanEligibilityCalculator } from '@/components/calculators/LoanEligibilityCalculator';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Bank Loan Eligibility Calculator Nepal — NRB 50% DSTI Ratio Rule",
  description: "Calculate maximum home loan and auto loan eligibility in Nepal. Based on Nepal Rastra Bank (NRB) unified directive 50% Debt-Service-to-Income (DSTI) rule.",
  path: "/loan-eligibility",
  keywords: [
    "loan eligibility calculator nepal",
    "home loan eligibility nepal",
    "nrb dsti ratio rule nepal",
    "how much loan can i get on salary nepal",
    "bank loan calculator nepal",
  ],
});

export default function LoanEligibilityPage() {
  const schema = generateWebApplicationSchema({
    name: "Bank Loan Eligibility Calculator Nepal",
    description: "Calculates maximum allowable borrowing and loan pre-approval under Nepal Rastra Bank DSTI directives.",
    url: "https://nepalcalc.com/loan-eligibility",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the DSTI ratio rule by Nepal Rastra Bank?",
      answer: "Under Nepal Rastra Bank (NRB) Unified Directives, commercial banks cannot approve loans where total monthly EMIs exceed 50% of an individual's verified gross monthly income (or 60% for specific productive mortgage loans).",
    },
    {
      question: "How do banks in Nepal verify monthly salary for loans?",
      answer: "Banks require 3 to 6 months of official bank account salary statements, salary tax clearance (TDS certificate / IRD PAN tax filing), and an official employment verification letter from your employer.",
    },
    {
      question: "Can I combine my spouse's income for higher loan eligibility in Nepal?",
      answer: "Yes! Commercial banks in Nepal permit joint loan applications with your spouse, combining both salaries to qualify for higher home and auto loan amounts under the 50% DSTI ceiling.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">Nepal Rastra Bank Directive</span>
          <span className="badge badge-neutral">Commercial Bank Criteria</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Bank Loan Eligibility Calculator Nepal
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Calculate the maximum Home Loan, Auto Loan, or Personal Loan amount commercial banks will approve based on your monthly income.
        </p>
      </div>

      <LoanEligibilityCalculator />

      <AdBanner slotId="loan-eligibility-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Nepal Bank Loan Eligibility FAQs"
          quickSummary={{
            question: "How much loan can I get on my salary in Nepal?",
            directAnswer: "Under Nepal Rastra Bank (NRB) unified regulations, your total monthly debt payments (EMIs) cannot exceed 50% of your verified monthly salary (DSTI ratio). For example, on an NPR 80,000 monthly income with NPR 10,000 existing EMI, your maximum eligible new EMI is NPR 30,000/month, allowing approximately NPR 32 to 34 Lakhs in 20-year home financing at 9.5% interest.",
            keyFacts: ["50% DSTI Maximum Ceiling", "Home & Auto Loans", "Joint Spousal Income Allowed"],
            authoritySource: "Nepal Rastra Bank Unified Directive"
          }}
        />
      </div>
    </div>
  );
}
