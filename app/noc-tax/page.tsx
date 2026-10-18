import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { NocTaxCalculator } from '@/components/calculators/NocTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Abroad Study NOC & Education Tax Calculator Nepal",
  description: "Calculate MOEST NOC verification fee (Rs 2,000) and Nepal Finance Act 3% foreign education service tax on student tuition remittances sent abroad.",
  path: "/noc-tax",
  keywords: [
    "abroad study tax nepal",
    "3% education tax nepal",
    "noc charges nepal",
    "moest noc verification fee",
    "foreign student tuition remittance tax",
    "शिक्षा सेवा शुल्क ३%",
    "एनओसी कर हिसाब"
  ],
});

export default function NocTaxPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Abroad Study NOC & 3% Education Tax Calculator",
    description: "Calculate 3% foreign education tax and MOEST NOC fees for university tuition remittances.",
    url: "https://nepalcalc.com/noc-tax",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is the 3% Foreign Education Tax in Nepal?",
      answer: "Under the Nepal Finance Act, commercial banks are required to collect a 3% Foreign Education Service Charge (शिक्षा सेवा शुल्क) on any funds remitted abroad for tuition fees and living expenses for foreign studies.",
    },
    {
      question: "How much does the MOEST No Objection Certificate (NOC) cost?",
      answer: "The Ministry of Education, Science and Technology (MOEST) charges a flat revenue fee of NPR 2,000 per subject/course NOC application submitted online through the NOC portal.",
    },
    {
      question: "Is the 3% tax applicable to living expenses as well as tuition?",
      answer: "Yes, any foreign exchange draft or TT/SWIFT transfer issued by commercial banks under an approved NOC for tuition or living expenses is subject to the 3% education tax.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NocTaxCalculator />
      <div style={{ maxWidth: '950px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Abroad Study & NOC Tax FAQs (शिक्षा सेवा शुल्क सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
