import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { VillageInterestCalculator } from '@/components/calculators/VillageInterestCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Village Sahu Byaj Calculator — Sayakada 1, 2, 3 Interest (सयकडा ब्याज हिसाब)",
  description: "Calculate local village interest (सयकडा १, २, ३ ब्याज हिसाब) between Bikram Sambat dates with simple and annual compounding (साँवा थप) breakdowns.",
  path: "/village-interest",
  keywords: [
    "sayakada byaj calculator nepal",
    "gaule byaj hisab",
    "sahu ko byaj nikalne tarika",
    "sayakada 2 byaj calculator",
    "nepali byaj calculator bs date",
    "village interest calculator nepal",
    "सयकडा ब्याज हिसाब",
    "गाउँले ब्याज क्याल्कुलेटर"
  ],
});

export default function VillageInterestPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Village Sahu Byaj & Sayakada Interest Calculator",
    description: "Calculate traditional Nepali village lending interest between Bikram Sambat dates.",
    url: "https://nepalcalc.com/village-interest",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What does Sayakada 2 (सयकडा २) interest mean in Nepal?",
      answer: "In traditional Nepali community lending, 'Sayakada 2' means a monthly interest of 2% on the principal amount (NPR 2 per month for every NPR 100 borrowed). On an annual basis, this equals 24% interest per year.",
    },
    {
      question: "What is the difference between Simple Interest and Yearly Compounding (साँवा थप) in village lending?",
      answer: "In simple interest, the interest is calculated only on the original principal amount regardless of elapsed time. In yearly compounding (साँवा थप), accumulated interest at the end of each completed year is added to the principal to form the new base for the following year.",
    },
    {
      question: "What is the legal limit on personal loan interest in Nepal under the Civil Code?",
      answer: "Under Section 478 of the National Civil Code Act 2074 (मुलुकी देवानी संहिता २०७४), the maximum allowable interest rate for informal personal loans is 10% per year. Any interest contracted or demanded exceeding 10% per annum cannot be enforced through courts of law in Nepal.",
    },
    {
      question: "How do you calculate daily interest on village loans in Nepal?",
      answer: "Daily interest is calculated by dividing the monthly interest by 30 days (the standard banking and accounting convention in Nepal). For example, on a loan of NPR 100,000 at Sayakada 2 (NPR 2,000 per month), the daily interest is NPR 66.67.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VillageInterestCalculator />
      <AdBanner slotId="village-interest-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on Sayakada Byaj & Village Lending" />
    </div>
  );
}
