import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { ForeignEmploymentCalculator } from '@/components/calculators/ForeignEmploymentCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Foreign Employment & Manpower Cost Calculator — Free Visa Free Ticket",
  description: "Calculate official government legal costs for foreign employment to Gulf and Malaysia. Check legal ceilings for Welfare Fund, SSF, Insurance, and detect manpower overcharging.",
  path: "/foreign-employment",
  keywords: [
    "foreign employment calculator nepal",
    "manpower cost calculator nepal",
    "free visa free ticket nepal",
    "dofe legal fee malaysia gulf",
    "baideshik rojgar cost",
    "manpower overcharging nepal",
    "वैदेशिक रोजगार लागत",
    "म्यानपावर खर्च",
  ],
});

export default function ForeignEmploymentPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Foreign Employment & Manpower Cost Calculator",
    description: "Calculates official government regulated fees for foreign employment under DoFE guidelines and identifies illegal manpower overcharges.",
    url: "https://nepalcalc.com/foreign-employment",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "Which countries fall under Nepal's 'Free Visa Free Ticket' policy?",
      answer: "The Free Visa, Free Ticket scheme (enacted on 2072 Ashadh 21) applies to 7 destinations: Malaysia, Qatar, Saudi Arabia, UAE, Kuwait, Oman, and Bahrain. Foreign employers in these countries are required to bear worker visa and two-way air ticket expenses.",
    },
    {
      question: "What is the maximum service charge a manpower agency can legally charge?",
      answer: "Under the Free Visa Free Ticket directive, recruiting agencies can charge a maximum service fee of NPR 10,000 only if the foreign hiring employer does not provide agency commission. Charging NPR 100,000 to 300,000 is illegal.",
    },
    {
      question: "What are the mandatory government fees for foreign employment?",
      answer: "Mandatory government costs include: (1) Foreign Employment Welfare Fund (NPR 1,500 for up to 2 years, NPR 2,500 above 2 years), (2) Social Security Fund initial contribution (NPR 2,000), (3) Term Life Insurance (~NPR 3,700 - 5,500 based on age), (4) Biometric Medical (NPR 5,500 - 6,500), and (5) Orientation training (NPR 700).",
    },
    {
      question: "Where can I report illegal manpower extortion or overcharging?",
      answer: "You can report unauthorized fees to the Department of Foreign Employment (DoFE) toll-free helpline at 1141 or 16600150005, Hello Sarkar at 1111, or file a formal complaint at the Tahachal, Kathmandu DoFE office.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">Department of Foreign Employment</span>
          <span className="badge badge-neutral">Free Visa Free Ticket (२०७२)</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Foreign Employment & Manpower Cost Calculator (वैदेशिक रोजगार लागत)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '680px', margin: '8px auto 0' }}>
          Know your legal rights under Nepal law. Compare government ceiling fees (Welfare, Insurance, SSF) with manpower demands to avoid being overcharged.
        </p>
      </div>

      <ForeignEmploymentCalculator />

      <AdBanner slotId="foreign-employment-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Foreign Employment & Manpower Cost FAQs"
          quickSummary={{
            question: "What is the official legal cost for foreign employment under Free Visa Free Ticket in Nepal?",
            directAnswer: "Under Nepal's 2072 Free Visa Free Ticket policy for Malaysia and 6 Gulf countries, the foreign employer must provide the visa and round-trip air ticket. The worker pays only government welfare fund (NPR 1,500 - 2,500), insurance (approx NPR 3,700), medical (NPR 5,500 - 6,500), orientation (NPR 700), and a maximum service charge of NPR 10,000 to the manpower agency if not paid by employer.",
            keyFacts: [
              "Free Visa & Air Ticket by Employer",
              "Max Manpower Service Fee: NPR 10,000",
              "Welfare Fund: NPR 1,500 - 2,500",
              "Report illegal demands to DoFE Helpline 1141"
            ],
            authoritySource: "Department of Foreign Employment (DoFE) & Foreign Employment Act 2064"
          }}
        />
      </div>
    </div>
  );
}
