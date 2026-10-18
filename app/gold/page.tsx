import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { GoldCalculator } from '@/components/calculators/GoldCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Today Gold Price & Jewelry Calculator Nepal (सुनको भाउ)",
  description: "Check today's 24K Hallmark & 22K Tejabi gold rate in Nepal per FENEGOSIDA. Convert Tola, Lal, and Grams with making charges (ज्याला) and wastage (जर्ती).",
  path: "/gold",
  keywords: [
    "gold price in nepal today",
    "fenegosida gold rate",
    "today gold silver rate nepal",
    "tola to gram nepal",
    "gold jewelry making charge calculator",
    "सुनको भाउ आज",
    "चाँदीको भाउ",
    "सुन ज्याला जर्ती हिसाब"
  ],
});

export default function GoldPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Gold & Silver Price Calculator",
    description: "Convert gold and silver weight in Tola, Lal, and Grams with labor and wastage charges in Nepal.",
    url: "https://nepalcalc.com/gold",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How many grams are in 1 Tola in Nepal?",
      answer: "Under the Nepal gold market standard (FENEGOSIDA), exactly 1 Tola = 11.6638 grams. 1 Tola also equals 100 Lal or 16 Aana.",
    },
    {
      question: "What is Jarti (जर्ती) in Nepal jewelry purchases?",
      answer: "Jarti is the percentage of gold accounted for material wastage during the design, soldering, and crafting of jewelry, typically ranging between 1% and 5% depending on craftsmanship.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GoldCalculator />
      <AdBanner slotId="gold-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Gold & Silver Rate FAQs" />
    </div>
  );
}
