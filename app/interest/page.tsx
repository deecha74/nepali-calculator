import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LocalInterestCalculator } from '@/components/calculators/LocalInterestCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Byaj & Fixed Deposit Calculator (ब्याज हिसाब)",
  description: "Calculate local village interest (सयकडा ब्याज, साउँ र चक्रवृद्धि ब्याज) and commercial bank Fixed Deposit returns with 5% TDS deduction.",
  path: "/interest",
  keywords: ["nepali byaj calculator", "sayakada byaj nepal", "fixed deposit calculator nepal", "mudhati khata byaj", "सयकडा ब्याज"],
});

export default function InterestPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Byaj & Fixed Deposit Calculator",
    description: "Calculate local interest and bank fixed deposits in Nepal.",
    url: "https://nepalcalc.com/interest",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What does 'सयकडा २' (Sayakada 2) interest mean in Nepal?",
      answer: "In informal lending in Nepal, 'सयकडा २' means a monthly interest of 2% on the principal (NPR 2 per month for every NPR 100). Annually, this equals 24% per year.",
    },
    {
      question: "What is the tax on Fixed Deposit interest in Nepal?",
      answer: "The government of Nepal levies a 5% Tax Deducted at Source (TDS) on interest income earned from bank deposits.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocalInterestCalculator />
      <AdBanner slotId="interest-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepali Interest & FD FAQs" />
    </div>
  );
}
