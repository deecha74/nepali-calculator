import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { HomeAutoLoanCalculator } from '@/components/calculators/HomeAutoLoanCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Home Loan & Mortgage EMI Calculator — NRB LTV & 50% DSTI Rule',
  description: 'Calculate monthly Home Loan EMI in Nepal, down payment LTV requirement, total interest, and minimum gross salary required under NRB 50% DSTI guidelines →',
  path: '/nepal-home-loan',
  keywords: ['home loan calculator nepal', 'ghar karja emi calculator', 'mortgage calculator nepal', 'nrb home loan ltv rule'],
});

export default function NepalHomeLoanPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Home Loan & Mortgage EMI Calculator',
    description: 'Calculate home loan monthly EMI, down payment, and NRB 50% DSTI salary requirement in Nepal.',
    url: `${SITE_CONFIG.url}/nepal-home-loan`,
    category: 'FinanceApplication',
  });

  const faqs = [
    {
      question: 'What is the maximum Home Loan limit and LTV ratio in Nepal?',
      answer: 'Under Nepal Rastra Bank (NRB) Unified Directives, commercial banks finance up to 50%–60% of the fair market valuation (up to 70% for first-time homebuyers) with a maximum cap of NPR 2 Crore for residential housing loans.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Nepal Home Loan & Mortgage EMI Calculator (घर कर्जा किस्ता)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Calculate your monthly housing loan installment, down payment, and minimum monthly salary required under NRB 50% DSTI rules.
        </p>
      </div>
      <HomeAutoLoanCalculator defaultMode="home" />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Nepal Home Loan FAQs" />
      </div>
    </div>
  );
}

