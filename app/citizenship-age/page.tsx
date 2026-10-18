import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { CitizenshipAgeCalculator } from '@/components/calculators/CitizenshipAgeCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Citizenship 16-Year Age Calculator Nepal (नागरिकता उमेर क्याल्कुलेटर)",
  description: "Check if you have completed 16 years of age to obtain a Nepali Citizenship Certificate under Nepal Citizenship Act 2063. Complete DAO & Ward document checklist.",
  path: "/citizenship-age",
  keywords: [
    "citizenship age calculator nepal",
    "nepal citizenship age 16",
    "citizenship document checklist nepal",
    "dao citizenship requirements kathmandu",
    "ward recommendation citizenship nepal",
    "नागरिकता उमेर",
    "नेपाली नागरिकता १६ वर्ष",
  ],
});

export default function CitizenshipAgePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Citizenship 16-Year Age Calculator & Checklist",
    description: "Calculates candidate 16-year eligibility date for Nepali citizenship certificate and provides the official District Administration Office (DAO) document checklist.",
    url: "https://nepalcalc.com/citizenship-age",
    category: "GovernmentApplication",
  });

  const faqs = [
    {
      question: "At what exact age can a person apply for Nepali citizenship?",
      answer: "Under Section 8 of the Nepal Citizenship Act 2063, any citizen of Nepal who has completed 16 years of age is eligible to obtain a Nepali citizenship certificate by descent or birth.",
    },
    {
      question: "Can I apply for citizenship on my 16th birthday?",
      answer: "Yes, you can apply on or immediately following the day you turn 16 years old according to your official birth registration certificate (जन्मदर्ता प्रमाणपत्र).",
    },
    {
      question: "Which government offices issue Nepali citizenship certificates?",
      answer: "First, you must acquire a formal recommendation (Schedule 1 / अनुसूची-१) from your local Ward Office (वडा कार्यालय). With the recommendation and parent documents, the citizenship certificate is issued by the District Administration Office (जिल्ला प्रशासन कार्यालय - DAO) or Area Administration Office (इलाका प्रशासन कार्यालय).",
    },
    {
      question: "What documents are required to make a Nepali citizenship card?",
      answer: "Required documents include: (1) Original birth registration certificate, (2) Copies and originals of both father's and mother's Nepali citizenship certificates, (3) Ward office recommendation letter, (4) Three passport-sized photos, and (5) Academic certificates (e.g. SEE marksheet) to verify date of birth.",
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
          <span className="badge badge-green">Nepal Government Law</span>
          <span className="badge badge-neutral">Citizenship Act 2063</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Citizenship 16-Year Age Calculator (नागरिकता उमेर क्याल्कुलेटर)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Verify if you have completed 16 years for Nepali Citizenship, check countdown dates, and prepare required Ward & DAO documents.
        </p>
      </div>

      <CitizenshipAgeCalculator />

      <AdBanner slotId="citizenship-age-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Nepali Citizenship FAQs"
          quickSummary={{
            question: "At what age are you eligible for Nepali Citizenship?",
            directAnswer: "Under Section 8 of the Nepal Citizenship Act 2063, any citizen of Nepal who has completed 16 years of age is eligible to obtain a Nepali citizenship certificate by descent. The application must be verified by the local Ward Office and issued by the District Administration Office (DAO).",
            keyFacts: [
              "Eligible at 16 Years Exact",
              "Issued by DAO / जिल्ला प्रशासन",
              "Requires Birth Certificate & Parents' Citizenship",
              "Ward Office Recommendation Mandatory"
            ],
            authoritySource: "Nepal Citizenship Act 2063 & Ministry of Home Affairs"
          }}
        />
      </div>
    </div>
  );
}
