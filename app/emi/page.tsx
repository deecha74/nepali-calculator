import type { Metadata } from 'next';
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
    url: "https://nepalcalc.com/emi",
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
      <EmiCalculator />
      <AdBanner slotId="emi-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Loan EMI & Banking FAQs" />
    </div>
  );
}
