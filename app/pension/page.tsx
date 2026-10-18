import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PensionCalculator } from '@/components/calculators/PensionCalculator';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "EPF, CIT & Pension Calculator Nepal (पेन्सन हिसाब)",
  description: "Calculate retirement provident fund balance (EPF), Nagarik Lagani Kosh (CIT), compounding interest, and monthly pension payouts in Nepal.",
  path: "/pension",
  keywords: [
    "pension calculator nepal",
    "epf calculator nepal",
    "karmachari sanchaya kosh balance",
    "cit retirement calculator nepal",
    "nagarik lagani kosh pension",
    "retirement fund calculator nepal",
  ],
});

export default function PensionPage() {
  const schema = generateWebApplicationSchema({
    name: "EPF, CIT & Pension Retirement Calculator Nepal",
    description: "Calculates retirement corpus and monthly pension payouts for EPF and CIT in Nepal.",
    url: "https://nepalcalc.com/pension",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "How is Karmachari Sanchaya Kosh (EPF) calculated in Nepal?",
      answer: "Under Nepal law, 10% of an employee's basic monthly salary is deducted, and the employer contributes a matching 10%, depositing a total of 20% into the employee's EPF account every month.",
    },
    {
      question: "What interest rate does EPF and CIT pay in Nepal?",
      answer: "Historically, Karmachari Sanchaya Kosh (EPF) and Nagarik Lagani Kosh (CIT) provide between 7.5% to 8.0% compound interest annually on accumulated balances, plus annual profit distribution bonuses.",
    },
    {
      question: "Are EPF and CIT contributions tax-exempt in Nepal?",
      answer: "Yes! Total contributions to approved retirement funds (EPF, CIT, and Social Security Fund - SSF) are deductible up to NPR 5,00,000 or one-third (1/3) of your gross income, reducing your taxable income significantly.",
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
          <span className="badge badge-emerald">Retirement Fund</span>
          <span className="badge badge-neutral">EPF & CIT Compounding</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          EPF, CIT & Pension Retirement Calculator Nepal
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Project your total retirement corpus, compound interest earnings, and estimated monthly pension at age 58.
        </p>
      </div>

      <PensionCalculator />

      <AdBanner slotId="pension-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Nepal EPF, CIT & Pension FAQs"
          quickSummary={{
            question: "How is retirement fund and pension calculated in Nepal?",
            directAnswer: "In Nepal, monthly retirement savings comprise 20% of basic salary (10% employee + 10% employer matching) in Karmachari Sanchaya Kosh (EPF) plus optional voluntary deposits in Nagarik Lagani Kosh (CIT). These compound at an average 7.5% annual interest rate until retirement age (typically 58), yielding a lump-sum retirement corpus or monthly annuity pension.",
            keyFacts: ["20% Monthly EPF Deposit", "7.5% Compound Interest Benchmark", "Tax Deduction up to NPR 5 Lakhs"],
            authoritySource: "Karmachari Sanchaya Kosh Act"
          }}
        />
      </div>
    </div>
  );
}
