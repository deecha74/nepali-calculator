import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { BmiCalculator } from '@/components/calculators/BmiCalculator';
import { AEOAnswerBox } from '@/components/AEOAnswerBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "BMI Calculator Nepal — Ideal Body Weight for Height (उचाइ र तौल हिसाब)",
  description: "Calculate your Body Mass Index (BMI) and healthy ideal weight range for height in feet/inches. Tailored for WHO South Asian and Nepali health risk standards.",
  path: "/bmi",
  keywords: [
    "bmi calculator nepal",
    "ideal weight calculator height feet nepal",
    "body mass index nepal",
    "healthy weight range nepal",
    "उचाइ अनुसार तौल",
  ],
});

export default function BmiPage() {
  const schema = generateWebApplicationSchema({
    name: "BMI & Ideal Weight Calculator Nepal",
    description: "Calculates Body Mass Index (BMI) using WHO South Asian health thresholds.",
    url: "https://nepalicalc.com/bmi",
    category: "HealthApplication",
  });

  const faqs = [
    {
      question: "Why is the BMI cutoff lower for Nepalese and South Asians?",
      answer: "The World Health Organization (WHO) lowered the healthy BMI cutoff for South Asians to 22.9 (instead of 24.9) because South Asian populations naturally have a higher percentage of body fat and visceral adiposity at lower body weights, increasing early risk for Type-2 Diabetes and hypertension.",
    },
    {
      question: "What is considered a healthy BMI in Nepal?",
      answer: "A BMI between 18.5 and 22.9 is classified as healthy and normal. A score between 23.0 and 27.4 is categorized as Overweight, and 27.5 or higher indicates Obesity.",
    },
    {
      question: "How do I calculate BMI manually?",
      answer: "BMI = Weight in kilograms ÷ (Height in meters)². For example, for 68 kg weight and 5 ft 7 in (1.70 m) height: 68 ÷ (1.70 × 1.70) = 23.5 BMI.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <BmiCalculator />

      <AdBanner slotId="bmi-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Nepal BMI & Health FAQs"
          quickSummary={{
            question: "What is the ideal BMI score for people in Nepal?",
            directAnswer: "Under World Health Organization (WHO) South Asian guidelines, the ideal BMI for adults in Nepal is between 18.5 and 22.9. A BMI of 23.0 to 27.4 is classified as Overweight (with elevated metabolic risk), while a BMI of 27.5 or above is classified as Obese.",
            keyFacts: ["Normal Range: 18.5 - 22.9", "South Asian WHO Threshold", "Calculates Ideal Weight in KG"],
            authoritySource: "World Health Organization (WHO) South Asia"
          }}
        />
      </div>
    </div>
  );
}
