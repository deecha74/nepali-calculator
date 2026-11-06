import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { OvertimeCalculator } from '@/components/calculators/OvertimeCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Overtime (OT) Calculator Nepal — Labour Act 2074 Hourly Pay",
  description: "Calculate overtime pay and hourly wage in Nepal compliant with Nepal Labour Act 2074 (Section 31). Calculate 1.5x basic hourly rates and extra hour earnings.",
  path: "/overtime",
  keywords: [
    "overtime calculator nepal",
    "ot calculation nepal labour act",
    "hourly salary calculator nepal",
    "labour act 2074 overtime rules",
    "overtime rate per hour in nepal",
  ],
});

export default function OvertimePage() {
  const schema = generateWebApplicationSchema({
    name: "Overtime (OT) Calculator Nepal",
    description: "Calculates employee overtime payment and hourly basic wage under Nepal Labour Act 2074.",
    url: "https://nepalicalc.com/overtime",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "How is overtime calculated in Nepal under Labour Act 2074?",
      answer: "Under Section 31 of the Nepal Labour Act 2074, an employee working beyond standard 8 hours a day or 48 hours a week is entitled to overtime remuneration at one and a half times (1.5x) the basic remuneration per hour.",
    },
    {
      question: "What is the formula for basic hourly rate in Nepal?",
      answer: "Hourly Rate = Monthly Basic Remuneration ÷ Total Monthly Regular Working Hours (usually 26 days × 8 hours = 208 hours). Overtime Rate = Hourly Rate × 1.5.",
    },
    {
      question: "Is overtime calculated on gross salary or basic salary?",
      answer: "Overtime is calculated strictly on the Basic Salary (पारिश्रमिक) and does not include performance allowances, meal allowances, or travel conveyance.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <OvertimeCalculator />

      <AdBanner slotId="overtime-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Nepal Labour Act Overtime (OT) FAQs" />
      </div>
    </div>
  );
}
