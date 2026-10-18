import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { VatCalculator } from '@/components/calculators/VatCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "13% VAT & Service Charge Calculator Nepal — Forward & Reverse VAT",
  description: "Calculate 13% Value Added Tax (VAT) in Nepal. Easily add VAT to prices or reverse calculate VAT from tax-inclusive retail totals with restaurant service charges.",
  path: "/vat",
  keywords: ["13% vat calculator nepal", "reverse vat calculator nepal", "vat bill calculator", "restaurant service charge nepal", "ird vat calculator"],
});

export default function VatPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal 13% VAT & Service Charge Calculator",
    description: "Official 13% VAT and reverse VAT tax calculator for Nepal business and retail.",
    url: "https://nepalcalc.com/vat",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "How do you calculate reverse VAT (extracting VAT from total)?",
      answer: "To extract 13% VAT from a tax-inclusive total in Nepal, divide the total by 1.13 to find the taxable base amount, then subtract the base from the total to get the exact VAT amount.",
    },
    {
      question: "What is the standard VAT rate in Nepal?",
      answer: "Under the Nepal Value Added Tax Act, the standard VAT rate is 13% on all taxable goods and services.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VatCalculator />
      <AdBanner slotId="vat-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="VAT & Billing FAQs" />
    </div>
  );
}
