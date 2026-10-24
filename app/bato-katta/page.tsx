import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { BatoKattaCalculator } from '@/components/calculators/BatoKattaCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Land Road Deduction (Bato Katta) Calculator Nepal (जग्गा बाटो कट्टा)",
  description: "Calculate land road area deduction (बाटो कट्टा) for plotting and land subdivision. Estimate net remaining usable area in Ropani-Aana or Bigha and effective price per Aana.",
  path: "/bato-katta",
  keywords: [
    "jagga bato katta hisab",
    "bato katta calculator nepal",
    "land road deduction calculator nepal",
    "plotting land bato hisab",
    "13 ft bato katta aana",
    "16 ft bato katta hisab",
    "जग्गा बाटो कट्टा",
    "बाटो कट्टा हिसाब"
  ],
});

export default function BatoKattaPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Land Road Deduction (Bato Katta) Calculator",
    description: "Calculate road area deduction, remaining net usable land, and real cost per Aana after road dedication.",
    url: "https://nepalcalc.com/bato-katta",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How is road area deduction (बाटो कट्टा) calculated on Nepali land plots?",
      answer: "Road deduction is calculated by multiplying the road width (e.g. 13 ft, 16 ft, or 20 ft) by the length of the road passing through the property. The resulting square footage is subtracted from the gross land area to determine the remaining net usable area.",
    },
    {
      question: "What are the minimum road width bylaws set by urban municipalities in Nepal?",
      answer: "Under standard municipal building bylaws in Kathmandu Valley and major sub-metropolitan cities, residential plotting requires a minimum road width of 13 feet (4 meters) for inner access lanes, 16 to 20 feet (5 to 6 meters) for secondary thoroughfares, and 26 to 30 feet for commercial streets.",
    },
    {
      question: "How does road deduction impact the real price per Aana for land buyers?",
      answer: "When a portion of land is dedicated to road access, the entire financial purchase investment is distributed over fewer remaining usable Aanas. For example, if 4 Aanas purchased at NPR 25 Lakh/Aana yields 0.8 Aana of road sacrifice, the net usable land is 3.2 Aanas, raising the real effective cost to NPR 31.25 Lakh per remaining Aana (+25% increase).",
    },
    {
      question: "What are the standard conversion ratios for Ropani, Aana, and Square Feet?",
      answer: "Under the official Department of Land Management and Archive (DoLMA) standards: 1 Ropani = 16 Aana = 5,476 sq. ft.; 1 Aana = 4 Paisa = 342.25 sq. ft.; 1 Paisa = 4 Daam = 85.56 sq. ft.; and 1 Daam = 21.39 sq. ft.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BatoKattaCalculator />
      <AdBanner slotId="bato-katta-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on Land Road Deduction (Bato Katta)" />
    </div>
  );
}
