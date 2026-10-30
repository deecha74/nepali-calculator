import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { CalorieBmrWaterCalculator } from '@/components/calculators/CalorieBmrWaterCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'Daily Calorie, BMR & Water Intake Calculator Nepal [Dal-Bhat Nutrition]',
  description:
    'Calculate your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), fat-loss calories, daily water liters & Nepali Dal-Bhat thali equivalents →',
  path: '/calorie-calculator',
  keywords: [
    'calorie calculator nepal',
    'bmr calculator nepal',
    'water intake calculator nepal',
    'dal bhat calories nepal',
    'tdee calculator weight loss',
    'दैनिक क्यालोरी र पानी क्याल्कुलेटर',
  ],
});

export default function CalorieCalculatorPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/calorie-calculator`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Daily Calorie (TDEE), BMR & Water Intake Calculator',
    description:
      'Calculate daily maintenance calories, BMR, weight loss/gain calorie targets, and daily water intake in liters tailored for Nepali diets.',
    url: canonicalUrl,
    category: 'HealthApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Health & Fitness', url: `${SITE_CONFIG.url}/bmi` },
    { name: 'Calorie, BMR & Water Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'How many calories are in a standard plate of Nepali Dal-Bhat-Tarkari?',
      answer:
        'A standard home-cooked plate of Nepali Dal-Bhat-Tarkari (1.5 cups steamed white rice, 1 bowl lentil dal, seasonal vegetable curry with 1 tsp oil, and achar) contains approximately 600 to 700 kcal. Adding chicken/mutton curry, ghee, or papad increases a large thali to 850–1,000 kcal.',
    },
    {
      question: 'How much water should I drink per day based on body weight?',
      answer:
        'Clinical hydration guidelines recommend approximately 35 ml of water per kilogram of body weight per day (e.g., 2.4 liters/day for a 68 kg adult), plus an extra 500 ml per hour of intense exercise or hot Terai summer weather.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '820px', margin: '0 auto 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">Mifflin-St Jeor Clinical Standard</span>
          <span className="badge badge-neutral">दैनिक क्यालोरी, BMR र पानी हिसाब</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Daily Calorie (TDEE), BMR & Water Intake Calculator
        </h1>
        <p style={{ fontSize: 'clamp(13.5px, 2vw, 15px)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Find your exact Basal Metabolic Rate (BMR), daily maintenance calories, fat-loss deficit target, and recommended daily water intake with Nepali Dal-Bhat nutrition equivalents.
        </p>
      </div>

      <CalorieBmrWaterCalculator />

      <AdBanner slotId="calorie-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Daily Calorie, BMR & Hydration FAQs" />
      </div>
    </div>
  );
}

