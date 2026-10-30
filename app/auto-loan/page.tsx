import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { HomeAutoLoanCalculator } from '@/components/calculators/HomeAutoLoanCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Auto & EV Car/Bike Loan EMI Calculator — Down Payment & Interest',
  description: 'Calculate monthly Auto Loan EMI for EV cars, petrol vehicles, and motorcycles in Nepal with 20% vs 50% down-payment LTV rules →',
  path: '/auto-loan',
  keywords: ['auto loan calculator nepal', 'ev car loan calculator nepal', 'bike finance emi calculator nepal', 'vehicle loan emi nepal'],
});

export default function AutoLoanPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Auto & EV Vehicle Loan EMI Calculator',
    description: 'Calculate monthly car and bike loan EMI and down payment in Nepal.',
    url: `${SITE_CONFIG.url}/auto-loan`,
    category: 'FinanceApplication',
  });

  const faqs = [
    {
      question: 'What is the down payment requirement for Electric Vehicles (EVs) vs Petrol Cars in Nepal?',
      answer: 'Under NRB directives, banks finance up to 80% LTV (20% down payment) for electric vehicles (EVs) and 50% to 60% LTV (40%–50% down payment) for private petrol/diesel cars.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Nepal Auto & EV Car/Bike Loan EMI Calculator (सवारी कर्जा किस्ता)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Calculate monthly vehicle hire-purchase EMI, down payment, and NRB 50% DSTI income eligibility for EV and petrol cars/bikes.
        </p>
      </div>
      <HomeAutoLoanCalculator defaultMode="auto" />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Auto & EV Vehicle Loan FAQs" />
      </div>
    </div>
  );
}

