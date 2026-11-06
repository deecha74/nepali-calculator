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

      <CalorieBmrWaterCalculator />

      <AdBanner slotId="calorie-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Daily Calorie, BMR & Hydration FAQs" />
      </div>
    </div>
  );
}

