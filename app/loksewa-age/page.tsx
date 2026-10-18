import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LokSewaAgeCalculator } from '@/components/calculators/LokSewaAgeCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Lok Sewa Age & Eligibility Calculator Nepal (लोक सेवा आयोग उमेर क्याल्कुलेटर)",
  description: "Calculate your exact age and check Lok Sewa Aayog exam eligibility for Kharidar, Nayab Subba, Section Officer, and Health Services under Civil Service Act 2049.",
  path: "/loksewa-age",
  keywords: [
    "lok sewa age calculator",
    "loksewa eligibility calculator nepal",
    "lok sewa aayog age limit",
    "psc nepal age limit",
    "kharidar age limit",
    "nasu age limit",
    "section officer age limit nepal",
    "लोक सेवा आयोग उमेर",
    "लोकसेवा उमेर हद",
  ],
});

export default function LokSewaAgePage() {
  const schema = generateWebApplicationSchema({
    name: "Lok Sewa Age & Eligibility Calculator Nepal",
    description: "Calculates candidate age and verifies Public Service Commission (Lok Sewa Aayog) vacancy eligibility based on DOB and application deadline.",
    url: "https://nepalcalc.com/loksewa-age",
    category: "EducationalApplication",
  });

  const faqs = [
    {
      question: "What is the age limit for Lok Sewa Aayog in Nepal?",
      answer: "Under the Civil Service Act 2049, the minimum age is 18 years for Non-Gazetted posts (Kharidar, Nayab Subba) and 21 years for Gazetted posts (Section Officer). The maximum age is 35 years for male candidates, 40 years for female and differently-abled candidates, and 45 years for Health Services. Serving permanent civil servants have no upper age limit.",
    },
    {
      question: "Does the double fee (दोब्बर दस्तुर) deadline extend the age limit?",
      answer: "No. The Public Service Commission strictly calculates candidate age as of the first (normal fee) deadline date specified in the official vacancy notice. The extended double-fee deadline does not grant an age extension.",
    },
    {
      question: "What is the age limit for Section Officer (शाखा अधिकृत)?",
      answer: "For Section Officer (Gazetted 3rd Class), you must be at least 21 years old and not older than 35 years (for males) or 40 years (for females and candidates with recognized disabilities).",
    },
    {
      question: "Is there any age limit for existing permanent civil servants in Nepal?",
      answer: "No. According to the Civil Service Rules (निजामती सेवा नियमावली), permanent civil servants currently in government service do not face an upper age limit when applying for any open civil service competition.",
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
          <span className="badge badge-blue">Civil Service Nepal</span>
          <span className="badge badge-neutral">PSC & Lok Sewa 2083/84</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Lok Sewa Age & Eligibility Calculator (लोक सेवा उमेर क्याल्कुलेटर)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '680px', margin: '8px auto 0' }}>
          Instant age verification for Kharidar, Nayab Subba, Section Officer, and Health Service vacancies under Civil Service Act 2049 rules.
        </p>
      </div>

      <LokSewaAgeCalculator />

      <AdBanner slotId="loksewa-age-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Lok Sewa Age & Eligibility FAQs"
          quickSummary={{
            question: "What is the age limit for Lok Sewa Aayog exams in Nepal?",
            directAnswer: "For Lok Sewa in Nepal, minimum age is 18 years for Non-Gazetted (Kharidar/NaSu) and 21 years for Gazetted (Section Officer). Maximum age limit is 35 years for males, 40 years for females and differently-abled candidates, and 45 years for Health Services. No upper age limit applies to permanent serving civil servants.",
            keyFacts: [
              "Min 18 for Kharidar & NaSu",
              "Min 21 for Section Officer",
              "Max 35 (Male) / 40 (Female)",
              "Max 45 for Health Services",
              "No age limit for permanent staff"
            ],
            authoritySource: "Lok Sewa Aayog & Civil Service Act 2049"
          }}
        />
      </div>
    </div>
  );
}
