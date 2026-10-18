import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { IncomeTaxCalculator } from '@/components/calculators/IncomeTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Salary & Income Tax Calculator 2083/84 — SSF & Slabs",
  description: "Calculate your salary tax in Nepal for FY 2083/84 & 2082/83. Supports SSF 1% waiver, CIT, EPF, married/unmarried slabs, and female 10% tax rebate.",
  path: "/tax",
  keywords: [
    "nepal salary tax calculator",
    "nepal income tax calculator",
    "income tax calculator nepal 2083",
    "salary tax calculator nepal",
    "ssf tax slab nepal",
    "nepal tax slab married unmarried",
    "आयकर हिसाब नेपाल",
    "salary take home pay nepal"
  ],
});

export default function TaxPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Income Tax Calculator",
    description: "Official Nepal salary and income tax calculator for individuals and couples.",
    url: "https://nepalcalc.com/tax",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "Who is exempt from the 1% Social Security Tax (SST) in Nepal?",
      answer: "Employees who contribute to the Social Security Fund (SSF) under the Social Security Act are exempt from paying the 1% Social Security Tax on their first income slab bracket.",
    },
    {
      question: "What is the maximum tax deduction for Life and Health Insurance in Nepal?",
      answer: "Under the Nepal Income Tax Act, you can deduct up to NPR 40,000 per year for Life Insurance premiums and up to NPR 20,000 per year for Health Insurance premiums from your taxable income.",
    },
    {
      question: "How does the female tax rebate work?",
      answer: "A resident natural female having only employment income from Nepal is entitled to a 10% tax rebate on her total assessed tax liability if filing as an individual (unmarried).",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IncomeTaxCalculator />
      <AdBanner slotId="tax-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepal Income Tax FAQs" />
    </div>
  );
}
