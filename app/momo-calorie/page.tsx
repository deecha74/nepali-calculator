import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { MomoCalorieCalculator } from '@/components/calculators/MomoCalorieCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Momo Calorie & Nutrition Counter — Buff, Chicken, Veg, Fried & Jhol",
  description: "Calculate exact calories, protein, carbs, and fat in 1 plate of Nepali momo (Buff, Chicken, Veg, Paneer, Pork). Discover burn-off exercise times and health facts.",
  path: "/momo-calorie",
  keywords: [
    "momo calorie counter",
    "calories in buff momo",
    "chicken momo calories",
    "veg momo nutrition nepal",
    "fried momo calories",
    "c momo calories",
    "nepali food calories",
    "मोमो क्यालोरी",
  ],
});

export default function MomoCaloriePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Momo Calorie & Nutrition Counter",
    description: "Calculates calories, protein, carbohydrates, and fat for Nepali momos (steamed, fried, kothey, c-momo, jhol) and exercise burn-off times.",
    url: "https://nepalcalc.com/momo-calorie",
    category: "HealthApplication",
  });

  const faqs = [
    {
      question: "How many calories are in 1 plate of Buff momo?",
      answer: "A standard plate of 10 steamed Buff momos contains approximately 420 calories, with roughly 32g of protein, 34g of carbohydrates, and 18g of fat. Deep frying increases the total to approximately 620 calories per plate.",
    },
    {
      question: "Which type of momo has the lowest calories in Nepal?",
      answer: "Steamed Vegetable (Veg) momo has the lowest calorie count, at approximately 280 calories per plate (10 pieces), followed by steamed Chicken momo (~380 calories).",
    },
    {
      question: "How many calories does momo achar (sauce) add?",
      answer: "A typical serving of tomato achar adds about 30 to 45 calories, while sesame (til) or peanut (badam) based achar can add 60 to 90 calories per plate due to healthy natural fats.",
    },
    {
      question: "How long does it take to burn off 1 plate of momo?",
      answer: "Burning off 1 plate of steamed chicken momo (approx. 380-420 kcal) requires roughly 70 to 80 minutes of brisk walking, or 35 to 40 minutes of moderate jogging.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-orange">Nepali Street Food</span>
          <span className="badge badge-neutral">Fitness & Nutrition</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Nepali Momo Calorie Counter (मोमो क्यालोरी काउन्टर)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Check calories, protein, carbs, and fat in your favorite plate of Buff, Chicken, Veg, Fried, or Jhol Momo.
        </p>
      </div>

      <MomoCalorieCalculator />

      <AdBanner slotId="momo-calorie-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Momo Nutrition & Calorie FAQs"
          quickSummary={{
            question: "How many calories are in 1 plate of Nepali momo?",
            directAnswer: "A standard plate (10 pieces) of steamed Buff momo contains approximately 420 calories, Chicken momo has 380 calories, and Veg momo has 280 calories. Deep-frying increases the calorie count by 40-50% to roughly 580-620 kcal per plate, while spicy C-momo sauce or sesame Jhol adds 65 to 85 extra calories.",
            keyFacts: [
              "Buff Steamed: ~420 kcal/plate",
              "Chicken Steamed: ~380 kcal/plate",
              "Veg Steamed: ~280 kcal/plate",
              "Fried Momo: ~580 - 620 kcal",
              "Walking ~75 mins to burn 1 plate"
            ],
            authoritySource: "Nepal Food & Nutrition Reference Database"
          }}
        />
      </div>
    </div>
  );
}
