import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { EmiCalculator } from '@/components/calculators/EmiCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Bank Loan EMI & Amortization Calculator Nepal — Home & Auto Loan",
  description: "Calculate monthly EMI, total interest, and view the full amortization schedule for home loans, vehicle loans, and personal loans across Nepal commercial banks.",
  path: "/emi",
  keywords: ["emi calculator nepal", "home loan calculator nepal", "bank loan interest nepal", "auto loan emi nepal", "loan amortization schedule nepal"],
});

export default function EmiPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Bank Loan EMI Calculator",
    description: "Calculate monthly loan EMIs and complete amortization schedule for Nepal banks.",
    url: "https://nepalicalc.com/emi",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "How is bank EMI calculated in Nepal?",
      answer: "EMI is calculated using standard reducing balance compounding formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is the number of months.",
    },
    {
      question: "Can I prepay my home loan in Nepal to save interest?",
      answer: "Yes, making partial prepayments directly reduces your principal loan balance, which dramatically cuts down total interest paid over the remaining tenure of the loan.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Prominent Link to Bank Loan Comparison Hub */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          borderRadius: '14px',
          backgroundColor: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#003893', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Building2 size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Compare All Nepal Commercial Bank Loan Interest Rates (NABIL, GBIME, NICA, RBB)
            </h4>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              Check live base rates, spread margins, and 50% DSTI affordability for Home, EV, and Auto Loans.
            </div>
          </div>
        </div>

        <Link
          href="/emi/banks"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: '#003893',
            color: '#ffffff',
            fontSize: '12.5px',
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          <span>Compare All Banks</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <EmiCalculator />
      <AdBanner slotId="emi-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Loan EMI & Banking FAQs" />
    </div>
  );
}
