import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateGEODatasetSchema,
  generateAEOAnswerSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { NepseWaccCalculator } from '@/components/calculators/NepseWaccCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'NEPSE WACC Calculator Nepal — Share Average & Bonus/Right Cost [2083/84]',
  description:
    'Calculate exact NEPSE Weighted Average Cost of Capital (WACC) for MeroShare. Supports secondary buys, IPO/FPO, bonus shares (Rs. 100 par), right shares & CGT →',
  path: '/nepse-wacc',
  keywords: [
    'nepse wacc calculator',
    'share average calculator nepal',
    'meroshare wacc calculation formula',
    'wacc after bonus share nepse',
    'wacc after right share nepal',
    'my purchase source meroshare',
    'नेप्से औसत लागत मूल्य',
    'मेरोसेयर WACC हिसाब',
  ],
});

export default function NepseWaccPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/nepse-wacc`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'NEPSE WACC & Share Average Price Calculator',
    description:
      'Calculate Weighted Average Cost of Capital (WACC) per share on the Nepal Stock Exchange (NEPSE) including SEBON fees, broker commissions, bonus shares, and right shares.',
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'NEPSE & Share', url: `${SITE_CONFIG.url}/nepse` },
    { name: 'NEPSE WACC Calculator', url: canonicalUrl },
  ]);

  const datasetSchema = generateGEODatasetSchema({
    name: 'CDSC MeroShare WACC Calculation Rules & Par Value Cost Basis',
    description:
      'Official CDSC and Nepal Stock Exchange (NEPSE) Weighted Average Cost of Capital (WACC) formula for secondary market trades, IPO allotments, bonus shares (NPR 100 par value), and right shares.',
    url: canonicalUrl,
    keywords: ['NEPSE WACC Formula', 'CDSC MeroShare My Purchase Source', 'Bonus Share WACC Par Value 100'],
  });

  const aeoSchema = generateAEOAnswerSchema({
    question: 'How is WACC calculated in MeroShare for NEPSE shares?',
    answer:
      'In CDSC MeroShare, Weighted Average Cost of Capital (WACC) per share is calculated by dividing the total acquisition cost of all share lots (including broker commission, 0.015% SEBON fee, and NPR 25 DP charge for secondary buys, plus NPR 100 par value per share for IPO, bonus, and right shares) by the total number of shares (kitta) held.',
    url: canonicalUrl,
  });

  const faqs = [
    {
      question: 'What is the cost price of Bonus Shares when calculating WACC in MeroShare?',
      answer:
        'Under CDSC and Inland Revenue Department (IRD) rules, bonus shares and right shares are valued at their face/par value of NPR 100 per kitta (or NPR 10 for Rs. 10 face-value mutual fund units) when computing your Weighted Average Cost of Capital (WACC).',
    },
    {
      question: 'Does secondary market WACC include broker commission and DP charge?',
      answer:
        'Yes. When you buy shares on the secondary market via TMS, your actual purchase cost in MeroShare ("My Purchase Source") includes the base transaction amount plus the tiered broker commission (0.27% to 0.40%), 0.015% SEBON fee, and NPR 25 CDSC DP charge.',
    },
    {
      question: 'Why is updating WACC mandatory before selling shares in Nepal?',
      answer:
        'After selling shares on NEPSE, you must complete "My Purchase Source" and "My WACC" in MeroShare before generating your EDIS (Electronic Debit Instruction Slip) so your broker and CDSC can deduct the exact Capital Gains Tax (5% for >365 days or 7.5% for ≤365 days). Failing to submit WACC and EDIS on time triggers a 20% closeout fine.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aeoSchema) }} />

      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '820px', margin: '0 auto 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">CDSC MeroShare EDIS</span>
          <span className="badge badge-neutral">बोनस, हकप्रद र दोस्रो बजार औसत मूल्य</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          NEPSE WACC & Share Average Price Calculator
        </h1>
        <p className="aeo-answer-container" style={{ fontSize: 'clamp(13.5px, 2vw, 15px)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Calculate your exact Weighted Average Cost of Capital (WACC) across IPOs, secondary market TMS buys, bonus shares (Rs. 100 par value), and right shares—and preview your net profit after 5% or 7.5% CGT.
        </p>
      </div>

      <NepseWaccCalculator />

      <AdBanner slotId="nepse-wacc-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1040px', margin: '40px auto 0' }}>
        <FAQAccordion
          items={faqs}
          title="NEPSE WACC & MeroShare Purchase Source FAQs"
          quickSummary={{
            question: 'How do you calculate WACC in MeroShare after receiving bonus or right shares?',
            directAnswer:
              'Add the total purchase cost of your secondary market shares (including broker commission, SEBON fee, and Rs. 25 DP charge) to the par value cost of your IPO, bonus, and right shares (Quantity × NPR 100), and divide by your total combined kitta.',
            keyFacts: [
              'Bonus & Right Share Cost: NPR 100 Par Value',
              'Secondary Buy Cost: Includes Broker + SEBON + Rs. 25 DP',
              'Long-Term CGT (>365 Days): 5%',
              'Short-Term CGT (≤365 Days): 7.5%',
            ],
            authoritySource: 'CDS and Clearing Limited (CDSC) & SEBON Guidelines',
          }}
        />
      </div>
    </div>
  );
}

