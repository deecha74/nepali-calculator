import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { SavingsGoalCalculator } from '@/components/calculators/SavingsGoalCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Savings Goal & Monthly Deposit Calculator Nepal — बचत लक्ष्य हिसाब',
  description: 'Calculate exact monthly savings required to reach 10 Lakh, 50 Lakh, or 1 Crore in Nepal with recurring deposit and compound interest breakdown →',
  path: '/savings-goal',
  keywords: ['savings goal calculator nepal', 'monthly saving calculator', 'how to save 1 crore in nepal', 'recurring deposit calculator nepal'],
});

export default function SavingsGoalPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Savings Goal & Monthly Deposit Calculator',
    description: 'Calculate required monthly savings to hit target financial goals in Nepal.',
    url: `${SITE_CONFIG.url}/savings-goal`,
    category: 'FinanceApplication',
  });

  const faqs = [
    {
      question: 'How much do I need to save monthly to reach NPR 25 Lakh in 5 years?',
      answer: 'At an average 9% annual compounded return (e.g., recurring deposit or mutual fund SIP), starting with NPR 2 Lakh requires saving approximately NPR 29,000 per month for 5 years to reach NPR 25 Lakh.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Savings Goal & Monthly Deposit Calculator (बचत लक्ष्य हिसाब)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Plan your wedding, education, house down-payment, or 1 Crore retirement fund by calculating the exact monthly deposit needed.
        </p>
      </div>
      <SavingsGoalCalculator />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Savings Goal FAQs" />
      </div>
    </div>
  );
}

