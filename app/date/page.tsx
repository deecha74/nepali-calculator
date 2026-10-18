import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { DateConverter } from '@/components/calculators/DateConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Date Converter (BS ⇄ AD) & Exact Age Calculator — Bikram Sambat",
  description: "Convert Nepali Bikram Sambat (BS) to English (AD) calendar dates accurately and calculate your exact age in years, months, days, and weeks.",
  path: "/date",
  keywords: ["nepali date converter", "bs to ad converter", "ad to bs converter", "exact age calculator nepali", "bikram sambat date converter"],
});

export default function DatePage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Date Converter & Age Finder",
    description: "Convert between Bikram Sambat and Gregorian calendar dates and find exact age.",
    url: "https://nepalcalc.com/date",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How many years ahead is the Nepali Bikram Sambat calendar compared to AD?",
      answer: "Bikram Sambat (B.S.) is approximately 56 years and 8.5 months ahead of the Gregorian calendar (A.D.).",
    },
    {
      question: "Why do month lengths change in the Nepali calendar?",
      answer: "The Nepali calendar is a solar lunisolar calendar based on solar transit of constellations (sankranti), so the number of days in each month ranges from 29 to 32 days depending on astronomical solar position.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DateConverter />
      <AdBanner slotId="date-page-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Nepali Date & Calendar FAQs" />
    </div>
  );
}
