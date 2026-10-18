import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { DepreciationCalculator } from '@/components/calculators/DepreciationCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Tax Depreciation Calculator (Schedule 2) — WDV Asset Pool & 7% Repairs",
  description: "Official tax depreciation calculator under Nepal Income Tax Act 2058 Schedule 2. Calculate WDV for Blocks A (5%), B (25%), C (20%), D (15%), and E with 3-tier timing absorption (3/3, 2/3, 1/3) and Section 16 repairs limit.",
  path: "/depreciation",
  keywords: [
    "nepal depreciation calculator",
    "schedule 2 depreciation income tax nepal",
    "block depreciation nepal",
    "wdv calculator nepal",
    "nepal income tax act schedule 2",
    "timing rule absorption nepal",
    "section 16 repairs nepal",
    "ह्रासकट्टी हिसाब नेपाल",
    "tax audit depreciation annex nepal"
  ],
});

export default function DepreciationPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Tax Depreciation Calculator",
    description: "Official Written Down Value (WDV) Block Depreciation and Section 16 Repairs calculator under Nepal Income Tax Act Schedule 2.",
    url: "https://nepalcalc.com/depreciation",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What are the 5 depreciation asset blocks in Nepal (Schedule 2)?",
      answer: "Under Schedule 2 of the Nepal Income Tax Act 2058: Block A includes permanent buildings and civil structures (5%); Block B includes computers, furniture, and office equipment (25%); Block C includes automobiles and transport vehicles (20%); Block D includes factory machinery and production plant (15%); and Block E includes intangible assets like software licenses and patents (amortized over useful life).",
    },
    {
      question: "How does the Nepal timing absorption rule (३/३, २/३, १/३) work?",
      answer: "When new assets are purchased during the fiscal year, they are absorbed into the depreciation base according to the date of acquisition: Assets purchased from Shrawan 1 to Poush end receive 100% (3/3) absorption; assets purchased from Magh 1 to Chaitra end receive 66.67% (2/3) absorption; and assets purchased from Baisakh 1 to Ashadh end receive 33.33% (1/3) absorption. The unabsorbed portion is added to the opening balance of the subsequent fiscal year.",
    },
    {
      question: "What is the Section 16 Repair and Maintenance 7% limitation in Nepal?",
      answer: "Under Section 16 of the Income Tax Act 2058, a business can deduct repair and maintenance expenses up to a maximum of 7% of the depreciation base for each asset block in that fiscal year. Any repair expenses exceeding this 7% threshold cannot be deducted as an immediate expense; the excess must be capitalized into the opening WDV of the block for the following fiscal year.",
    },
    {
      question: "Can computers and office laptops be depreciated under straight-line method in Nepal?",
      answer: "For statutory tax audit and tax return filing in Nepal, all tangible assets must be depreciated using the Written Down Value (WDV) asset pool method specified in Schedule 2. While companies may use Straight Line Method (SLM) for their internal financial statements (under NFRS / NAS), they must adjust to the WDV Schedule 2 rules when calculating their taxable income.",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DepreciationCalculator />
      <AdBanner slotId="depreciation-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepal Tax Depreciation FAQs" />
    </div>
  );
}
