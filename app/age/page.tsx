import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { NepaliAgeCalculator } from '@/components/calculators/NepaliAgeCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Age Calculator — Exact BS Age in Years, Months & Days (वि.सं. उमेर क्याल्कुलेटर)",
  description: "Calculate your exact age from Bikram Sambat (वि.सं.) birthdate in years, months, and days. Check upcoming birthday countdown and eligibility for Loksewa, citizenship, and driving license.",
  path: "/age",
  keywords: [
    "nepali age calculator",
    "age calculator bikram sambat",
    "aajako umer calculator",
    "mero umer kati bhayo nepal",
    "birthdate in bs to age",
    "bikram sambat age calculator online",
    "loksewa age calculator nepal",
    "वि सं उमेर क्याल्कुलेटर"
  ],
});

export default function AgePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Bikram Sambat Exact Age Calculator",
    description: "Calculate exact age in years, months, and days from Bikram Sambat date of birth with government eligibility checks.",
    url: "https://nepalcalc.com/age",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How is age calculated from Bikram Sambat (वि.सं.) birth dates?",
      answer: "Bikram Sambat age is calculated by subtracting your birth year, month, and day from the target date according to the Nepali Patro calendar, adjusting for variable days per month (29 to 32 days).",
    },
    {
      question: "What is the cut-off age for Loksewa Aayog civil service applications?",
      answer: "For non-gazetted posts (Kharidar, Nayab Subba), applicants must have reached 18 years and not exceeded 35 years (for male candidates) or 40 years (for female and differently-abled candidates). For Section Officer (शाखा अधिकृत), the minimum age requirement is 21 years.",
    },
    {
      question: "At what age can a Nepali citizen apply for a driving license and citizenship certificate?",
      answer: "Under the Nepal Citizenship Act, Nepali citizens are entitled to apply for their citizenship certificate upon completing 16 years of age. For a motor vehicle driving license (सवारी चालक अनुमतिपत्र), applicants must be at least 18 years old for light vehicles and two-wheelers.",
    },
    {
      question: "What is the qualifying age for the Senior Citizen Social Security Allowance in Nepal?",
      answer: "Under current Nepal government social protection guidelines, the general qualifying age for Senior Citizen Allowance (ज्येष्ठ नागरिक भत्ता) is 68 years. For citizens belonging to the Dalit community or residing in the Karnali region, the eligibility threshold begins at 60 years.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NepaliAgeCalculator />
      <AdBanner slotId="age-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Frequently Asked Questions on Bikram Sambat Age Calculation" />
    </div>
  );
}
