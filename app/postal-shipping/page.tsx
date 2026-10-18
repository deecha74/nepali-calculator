import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PostalShippingCalculator } from '@/components/calculators/PostalShippingCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Post & EMS Shipping Rate Calculator (हुलाक महसुल)",
  description: "Calculate official Nepal Post Office airmail and Express Mail Service (EMS) postage rates to USA, UK, Australia, Japan, India, and domestic districts with delivery times.",
  path: "/postal-shipping",
  keywords: [
    "nepal post shipping rates",
    "ems nepal parcel price",
    "hulaak mahasul nepal",
    "postage to usa uk from nepal",
    "nepal post tracking",
    "हुलाक सेवा महसुल"
  ],
});

export default function PostalShippingPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Post & EMS Parcel Shipping Calculator",
    description: "Official postal tariff calculator for General Post Office Nepal (GPO) and international Express Mail Service.",
    url: "https://nepalcalc.com/postal-shipping",
    category: "UtilitiesApplication",
  });

  const faqs = [
    {
      question: "How long does Nepal Post EMS take to deliver to the USA or Europe?",
      answer: "Standard international EMS from Kathmandu General Post Office typically takes 6 to 10 working days to reach major destinations in the United States, United Kingdom, and Europe.",
    },
    {
      question: "What is the maximum weight allowed for Nepal Post parcels?",
      answer: "EMS packages are permitted up to 30 kilograms for most countries. General registered documents are limited to 2 kilograms.",
    },
    {
      question: "How do I track my Nepal Post parcel?",
      answer: "Nepal Post EMS issues a 13-character tracking number starting with 'EE' and ending with 'NP' (e.g., EE123456789NP), which can be tracked on the Nepal Post portal and destination country postal authorities (USPS, Royal Mail, Australia Post).",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PostalShippingCalculator />
      <div style={{ maxWidth: '860px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Nepal Post FAQs (हुलाक सेवा तथा पार्सल प्रश्नोत्तर)" />
      </div>
    </div>
  );
}
