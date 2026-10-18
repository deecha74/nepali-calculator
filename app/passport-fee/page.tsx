import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PassportFeeCalculator } from '@/components/calculators/PassportFeeCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal e-Passport Fee Calculator (राहदानी दस्तुर)",
  description: "Official Nepal e-Passport fees: Regular 34-page (Rs 5,000), 66-page (Rs 10,000), urgent Kathmandu dispatch, minor discounts, and embassy rates.",
  path: "/passport-fee",
  keywords: [
    "nepal passport fee 2083",
    "epassport cost nepal",
    "urgent passport fee tripureshwor kathmandu",
    "nepal passport 66 page price",
    "राहदानी दस्तुर",
    "इ-पासपोर्ट शुल्क नेपाल",
    "हराएको राहदानी जरिवाना"
  ],
});

export default function PassportFeePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal e-Passport Fee Calculator",
    description: "Calculate official passport revenue fees for district and fast-track processing.",
    url: "https://nepalcalc.com/passport-fee",
    category: "GovernmentApplication",
  });

  const faqs = [
    {
      question: "What is the fee for an urgent e-Passport from the Department of Passport in Kathmandu?",
      answer: "The fast-track urgent fee for a 34-page passport from the Department of Passport (Tripureshwor, Kathmandu) is NPR 10,000 (issued within 2 to 3 working days). For a 66-page frequent traveler passport, the urgent fee is NPR 20,000.",
    },
    {
      question: "What is the fee for applying at the District Administration Office (DAO)?",
      answer: "Regular processing at any District Administration Office (DAO) or Area Administration Office costs NPR 5,000 for 34 pages and NPR 10,000 for 66 pages.",
    },
    {
      question: "Is there a discount for child/minor passports?",
      answer: "Yes, children below 10 years receive a 50% discount (NPR 2,500 regular, NPR 5,000 urgent). The passport validity for minors under 10 years is 5 years.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PassportFeeCalculator />
      <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Nepal Passport FAQs (राहदानी सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
