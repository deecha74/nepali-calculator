import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { KrishiFertilizerCalculator } from '@/components/calculators/KrishiFertilizerCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Fertilizer & Seed Calculator Nepal (कृषि मलखाद हिसाब)",
  description: "Calculate recommended chemical fertilizer (Urea, DAP, Potash) and seed dosage for Paddy, Maize, Wheat, Potato, and Mustard in Nepal per Ropani and Bigha.",
  path: "/krishi-fertilizer",
  keywords: [
    "fertilizer calculator nepal",
    "urea dap potash dosage per ropani",
    "krishi calculator narc",
    "paddy wheat maize fertilizer nepal",
    "कृषि मलखाद क्याल्कुलेटर",
    "युरिया डिएपी मात्रा"
  ],
});

export default function KrishiFertilizerPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Agriculture Fertilizer & Seed Calculator",
    description: "Crop fertilizer recommendation tool according to Nepal Agricultural Research Council (NARC) standards.",
    url: "https://nepalcalc.com/krishi-fertilizer",
    category: "UtilitiesApplication",
  });

  const faqs = [
    {
      question: "How much Urea and DAP is needed for 1 Ropani of Paddy (धान) in Nepal?",
      answer: "According to Nepal Agricultural Research Council (NARC) guidelines, 1 Ropani of paddy requires approximately 6.5 kg of Urea, 4.5 kg of DAP, 3.0 kg of Potash, and 5–6 quintals of well-rotted organic compost.",
    },
    {
      question: "When should Urea be applied to crops?",
      answer: "Urea should be applied in split doses: 50% as basal dose during planting/transplanting, 25% at first top-dressing (tillering stage around 25–30 days), and the remaining 25% at panicle initiation (45–50 days).",
    },
    {
      question: "How many Ropanis are in 1 Bigha of Terai land?",
      answer: "1 Bigha is equal to approximately 13.31 Ropanis (or 20 Kattha = 400 Dhur).",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <KrishiFertilizerCalculator />
      <div style={{ maxWidth: '880px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Fertilizer FAQs (मलखाद सम्बन्धी सोधिने प्रश्नहरू)" />
      </div>
    </div>
  );
}
