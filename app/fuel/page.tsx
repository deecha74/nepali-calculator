import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { FuelCalculator } from '@/components/calculators/FuelCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Fuel & Travel Trip Cost Calculator Nepal — Petrol & Diesel Rates",
  description: "Calculate vehicle fuel consumption, travel expenses, and split passenger costs for highway trips in Nepal based on distance, mileage, and NOC fuel prices.",
  path: "/fuel",
  keywords: ["fuel calculator nepal", "trip cost calculator nepal", "petrol mileage nepal", "ktm to pokhara fuel cost"],
});

export default function FuelPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Fuel & Travel Cost Calculator",
    description: "Calculate vehicle trip costs and fuel consumption in Nepal.",
    url: "https://nepalcalc.com/fuel",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How do I calculate trip fuel cost in Nepal?",
      answer: "Divide your route distance (in km) by your vehicle's mileage (km per liter) to get the required liters, then multiply by the current NOC fuel price.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FuelCalculator />
      <AdBanner slotId="fuel-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Fuel & Trip Cost FAQs" />
    </div>
  );
}
