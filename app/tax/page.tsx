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
    "salary ma tax kasari nikalne",
    "salary ma tax kasari calculate garne",
    "single ra married ma tax kati huncha",
    "nepal ma monthly income tax slab",
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
      question: "Salary ma tax kasari calculate garne? (How is salary tax calculated in Nepal?)",
      answer: "In Nepal, salary tax is calculated progressively on annual taxable income after permissible deductions (SSF/EPF/CIT, life insurance up to Rs 40,000, and health insurance up to Rs 20,000). Under the new law for FY 2083/84, the initial bracket is expanded up to NPR 10,00,000 (10 Lakh) taxed at 1% (or 0% for SSF contributors), followed by 10% on the next 5 Lakhs, 20% on the next 10 Lakhs, 27% on the next 15 Lakhs, and 29% above 40 Lakhs.",
    },
    {
      question: "Who is exempt from the 1% Social Security Tax (SST) in Nepal?",
      answer: "Employees whose employers register and contribute to the formal Social Security Fund (SSF) under the Social Security Act 2074 are 100% exempt from the initial 1% Social Security Tax on their first income slab bracket.",
    },
    {
      question: "What is the maximum tax deduction for Life and Health Insurance in Nepal?",
      answer: "Under the Nepal Income Tax Act, you can deduct up to NPR 40,000 per year for Life Insurance premiums and up to NPR 20,000 per year for Health Insurance premiums from your assessable taxable income.",
    },
    {
      question: "What are the tax slabs for Single vs Married in Nepal?",
      answer: "Under the new law (FY 2083/84), a unified threshold of up to NPR 10,00,000 (10 Lakh) applies with reduced top rates (29%). For prior fiscal years (FY 2082/83 and 2081/82), unmarried individuals have an initial base bracket of NPR 5,00,000 while married couples have NPR 6,00,000. Unmarried resident salaried females also receive a statutory 10% rebate on their calculated tax liability.",
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
