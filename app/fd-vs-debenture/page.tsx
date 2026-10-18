import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { FdVsDebentureCalculator } from '@/components/calculators/FdVsDebentureCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Bank FD vs Debenture Calculator Nepal (मुद्दती vs ऋणपत्र)",
  description: "Compare returns between Commercial Bank Fixed Deposits (FD) and corporate debentures in Nepal. Accurate 5% TDS deduction, quarterly interest payout, and profit difference.",
  path: "/fd-vs-debenture",
  keywords: [
    "fixed deposit vs debenture nepal",
    "debenture yield calculator",
    "nepal bank fd interest rate",
    "mudhati khata byaj dar",
    "corporate debenture nepal return",
    "मुद्दती निक्षेप र ऋणपत्र"
  ],
});

export default function FdVsDebenturePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal FD vs Debenture Yield Calculator",
    description: "Financial calculator comparing bank fixed deposit interest rates with corporate debentures under Nepal Rastra Bank regulations.",
    url: "https://nepalcalc.com/fd-vs-debenture",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the difference between a Fixed Deposit and a Bank Debenture in Nepal?",
      answer: "A Fixed Deposit (FD) is a secure bank deposit insured up to NPR 5,00,000 by the Deposit and Credit Guarantee Fund (DCGF). A Debenture is a long-term debt instrument issued by commercial banks that offers higher interest rates (typically 1.5% to 2.5% higher than FD), listed on NEPSE, and pays interest on a quarterly or semi-annual schedule.",
    },
    {
      question: "How is tax (TDS) deducted on interest from FDs and Debentures?",
      answer: "Under the Nepal Income Tax Act, a flat 5% withholding tax (TDS) is deducted at source for individual resident investors. For registered companies and institutional investors, the TDS rate is 15%.",
    },
    {
      question: "Can I take a bank loan against Debentures like a Fixed Deposit?",
      answer: "Yes, commercial banks provide loans up to 80% to 90% against fixed deposit receipts and pledgeable NEPSE-listed debentures at base rate plus 1.5% to 2%.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FdVsDebentureCalculator />
      <div style={{ maxWidth: '880px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="FD & Debenture FAQs (मुद्दती तथा ऋणपत्र प्रश्नोत्तर)" />
      </div>
    </div>
  );
}
