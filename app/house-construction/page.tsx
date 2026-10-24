import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { HouseConstructionCalculator } from '@/components/calculators/HouseConstructionCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "House Construction Cost & Materials Calculator Nepal (घर बनाउने खर्च)",
  description: "Calculate house construction cost per square foot in Nepal. Estimate total project budget and required bags of cement, steel rebar (rod), bricks, sand, and labor.",
  path: "/house-construction",
  keywords: [
    "ghar banaune kharcha nepal",
    "house construction cost per sq ft nepal",
    "nepal house construction calculator",
    "cement rod brick requirement calculator nepal",
    "2.5 tala ghar banaune kharcha",
    "3 aana ghar banaune kharcha",
    "घर बनाउने खर्च",
    "निर्माण सामग्री क्याल्कुलेटर"
  ],
});

export default function HouseConstructionPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal House Construction Cost & Materials Estimator",
    description: "Calculate building budget, labor costs, and material quantities for residential houses in Nepal.",
    url: "https://nepalcalc.com/house-construction",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "What is the average construction cost per square foot for a residential house in Nepal in 2026?",
      answer: "In urban municipalities across Nepal (including Kathmandu Valley, Pokhara, Chitwan, and Butwal), standard quality RCC construction typically ranges from NPR 4,000 to NPR 4,800 per square foot. Semi-luxury finishes range between NPR 4,800 and NPR 5,800 per square foot, while luxury construction with premium fittings exceeds NPR 6,000 per square foot.",
    },
    {
      question: "What is the split between material costs and labor wages in Nepal?",
      answer: "For standard RCC residential homes in Nepal, building materials (cement, rebar steel, bricks, sand, gravel, plumbing, and electrical) account for approximately 65% of the total cost, while contractor labor and mason wages account for the remaining 35%.",
    },
    {
      question: "How many bags of cement and quintals of steel rod are needed for a 2,000 sq ft house?",
      answer: "As an engineering rule of thumb for standard residential RCC buildings in Nepal, a 2,000 square foot built-up area requires roughly 850 to 900 bags of cement (50kg each) and approximately 75 to 80 quintals (7.5 to 8 metric tons) of 500D TMT steel rebar.",
    },
    {
      question: "How much built-up area can be constructed on a 3 Aana or 4 Aana land plot?",
      answer: "Under municipal building bylaws in Nepal, plots must leave setbacks (typically 5 feet from boundary walls), allowing roughly 65% to 70% ground coverage. On a 3 Aana plot (1,026.75 sq ft), the ground floor area is approximately 680 to 720 sq ft, yielding a total built-up area of about 1,700 to 1,800 sq ft for a 2.5-storey home.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HouseConstructionCalculator />
      <AdBanner slotId="construction-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on House Construction in Nepal" />
    </div>
  );
}
