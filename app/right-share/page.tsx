import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { RightShareCalculator } from '@/components/calculators/RightShareCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "NEPSE Right Share & Bonus Adjustment Price Calculator (नेप्से सेयर समायोजन)",
  description: "Calculate theoretical adjusted opening price after bonus and right share book closure on NEPSE. Estimate 5% cash dividend tax and Meroshare right application money.",
  path: "/right-share",
  keywords: [
    "right share adjustment price calculator nepal",
    "bonus share tax calculator nepal",
    "nepse share price adjustment formula",
    "wacc and bonus share calculation",
    "nepse bonus share adjustment",
    "meroshare right share apply",
    "नेप्से सेयर मूल्य समायोजन",
    "हकप्रद सेयर हिसाब"
  ],
});

export default function RightSharePage() {
  const schema = generateWebApplicationSchema({
    name: "NEPSE Right Share & Bonus Adjustment Calculator",
    description: "Calculate theoretical stock price adjustment and dividend tax on the Nepal Stock Exchange (NEPSE).",
    url: "https://nepalcalc.com/right-share",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What is the official NEPSE formula for calculating adjusted share price after bonus and right shares?",
      answer: "The Nepal Stock Exchange (NEPSE) uses the standard regulatory formula: Adjusted Price = [Market Price + (Right Ratio × Paid-Up Value)] / [1 + (Bonus % / 100) + Right Ratio]. In Nepal, the standard paid-up face value is NPR 100 per share.",
    },
    {
      question: "How is the 5% dividend tax on bonus shares calculated in Nepal?",
      answer: "Under the Income Tax Act of Nepal, the 5% dividend tax on bonus shares is calculated on the par value (face value) of NPR 100 per share, which equals NPR 5.00 per bonus share. If the company proposes a cash dividend designated for tax purposes, this is settled automatically. Otherwise, shareholders must deposit this tax through designated bank accounts prior to share credit in Demat.",
    },
    {
      question: "How do shareholders apply for right shares through Meroshare?",
      answer: "Eligible shareholders whose names are recorded before the book closure date can log in to their Meroshare account, navigate to 'My ASBA' > 'Apply for Issue', and apply for their allotted right shares at NPR 100 per share using their verified bank account C-ASBA authorization.",
    },
    {
      question: "Does the total value of an investor's holdings decrease on the book closure day?",
      answer: "No. While the market price per share drops theoretically to reflect the increased supply of shares, the investor receives bonus and right entitlements that balance the total market capitalization, keeping the net economic holding identical immediately after adjustment.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RightShareCalculator />
      <AdBanner slotId="right-share-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on NEPSE Right & Bonus Share Adjustments" />
    </div>
  );
}
