import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { GratuityCalculator } from '@/components/calculators/GratuityCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Gratuity & Separation Payout Calculator — Nepal Labour Act 2074",
  description: "Calculate employee retirement gratuity (8.33% monthly accrual) and accumulated home & sick leave encashment under the Nepal Labour Act 2074.",
  path: "/gratuity",
  keywords: ["gratuity calculator nepal", "labour act 2074 gratuity", "leave encashment nepal", "upadan calculation nepal"],
});

export default function GratuityPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Labour Act Gratuity Calculator",
    description: "Calculate retirement gratuity and separation payouts in Nepal.",
    url: "https://nepalcalc.com/gratuity",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "How is employee gratuity calculated under Nepal Labour Act 2074?",
      answer: "Under the Labour Act 2074, employers must accrue 8.33% of the employee's basic monthly salary into a gratuity account from their first day of employment, effectively providing 1 month of basic salary for each year of service.",
    },
  ];

  return (
    <div className="calculator-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GratuityCalculator />
      <AdBanner slotId="gratuity-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Labour Act & Gratuity FAQs" />
    </div>
  );
}
