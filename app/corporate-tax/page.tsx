import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { CorporateTaxCalculator } from '@/components/calculators/CorporateTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Corporate Tax & Section 94 Advance Tax Calculator 2083/84",
  description: "Official corporate income tax calculator for Nepal companies, partnerships, and manufacturing industries. Calculate 20%, 25%, 30% corporate tax rates and Section 94 advance tax installments (Poush 40%, Chaitra 70%, Ashadh 100%).",
  path: "/corporate-tax",
  keywords: [
    "corporate tax calculator nepal",
    "advance tax installment nepal",
    "section 94 advance tax nepal",
    "pvt ltd tax rate nepal",
    "manufacturing industry tax rebate nepal",
    "it service export tax nepal",
    "कम्पनी आयकर नेपाल",
    "अग्रिम कर किस्ताबन्दी",
    "section 118 interest nepal"
  ],
});

export default function CorporateTaxPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Corporate Tax & Advance Tax Calculator",
    description: "Official corporate income tax and Section 94 quarterly advance tax instalment schedule calculator for Nepal businesses.",
    url: "https://nepalcalc.com/corporate-tax",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What are the standard corporate tax rates in Nepal for FY 2083/84?",
      answer: "General trading, consulting, and service companies are taxed at 25%. Special manufacturing industries designated under Section 11 pay a concessional rate of 20%. Banks, financial institutions (BFIs), general insurance companies, and tobacco/liquor manufacturers pay 30%. Information technology (IT) and software export services enjoy a 50% rebate, resulting in an effective rate of 12.5%.",
    },
    {
      question: "What are the deadlines for Section 94 Advance Tax Instalments (अग्रिम कर किस्ताबन्दी)?",
      answer: "Under Section 94 of the Income Tax Act 2058, every company and business entity must deposit advance income tax in three installments: 1st Instalment (40% cumulative) by the end of Poush (mid-January); 2nd Instalment (70% cumulative) by the end of Chaitra (mid-April); and 3rd Instalment (100% cumulative) by the end of Ashadh (mid-July).",
    },
    {
      question: "What happens if a company fails to pay the 80% advance tax threshold?",
      answer: "Under Section 118 of the Income Tax Act, if the advance tax paid by an installment deadline is less than 80% of the actual tax that would have been due, the Inland Revenue Department (IRD) charges interest at the rate of 15% per annum on the underpaid portion from the due date until the tax is settled.",
    },
    {
      question: "Can TDS deducted by clients be adjusted against corporate income tax?",
      answer: "Yes! All withholding tax (TDS) deducted by clients and customers on invoices paid to your company during the fiscal year serves as advance tax credit. It is deducted directly from your gross annual corporate income tax liability when preparing your D-03 tax return on the IRD portal.",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CorporateTaxCalculator />
      <AdBanner slotId="corporate-tax-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepal Corporate & Advance Tax FAQs" />
    </div>
  );
}
