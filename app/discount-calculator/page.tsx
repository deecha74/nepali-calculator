import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { DiscountTipCalculator } from '@/components/calculators/DiscountTipCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Discount, Tip & Bill Split Calculator Nepal [13% VAT Support]',
  description: 'Calculate shopping percentage discounts, restaurant tip amounts, 13% Nepal VAT, and per-person group bill splits instantly →',
  path: '/discount-calculator',
  keywords: ['discount calculator nepal', 'tip calculator nepal', 'restaurant bill split calculator', 'percentage off calculator'],
});

export default function DiscountCalculatorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Discount, Tip & Group Bill Split Calculator',
    description: 'Calculate retail discounts, tips, 13% VAT, and per-person bill splits.',
    url: `${SITE_CONFIG.url}/discount-calculator`,
    category: 'UtilityApplication',
  });

  const faqs = [
    {
      question: 'How do you calculate final price after percentage discount and 13% VAT?',
      answer: 'First subtract the discount amount (Original Price × Discount %) from the tag price to get the discounted subtotal, then multiply the discounted subtotal by 1.13 to include 13% VAT.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <DiscountTipCalculator />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Discount & Tip Calculator FAQs" />
      </div>
    </div>
  );
}

