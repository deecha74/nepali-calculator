import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { DetailedNepaliCalendar } from '@/components/calendar/DetailedNepaliCalendar';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Calendar 2083 (नेपाली पात्रो) — Patro, Tithi & Holidays",
  description: "Official Nepali Calendar 2083/2082. View daily Tithis, public holidays, Dashain/Tihar festival dates, Panchanga, and Shubh Muhurat on Bikram Sambat Patro.",
  path: "/calendar",
  keywords: [
    "nepali calendar 2083",
    "nepali patro",
    "bikram sambat calendar",
    "nepal holidays 2083",
    "tithi nepal today",
    "aajako tithi patro",
    "nepali panchang today",
    "dashain 2083 dates",
    "tihar 2083 holidays",
    "shuva biwaha lagan 2083",
    "नेपाली पात्रो २०८३",
    "नेपाल बिदा पात्रो",
    "आजको पञ्चाङ्ग र तिथि"
  ],
});

export default function CalendarPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Patro & Detailed Bikram Sambat Calendar",
    description: "Official interactive Nepali Calendar with Tithi, Panchanga, Sunday & Saturday holidays, and festival almanac.",
    url: "https://nepalcalc.com/calendar",
    category: "UtilityApplication",
  });

  const CALENDAR_FAQS = [
    {
      question: "Are both Sunday and Saturday public holidays in Nepal?",
      answer: "In this calendar and official government/banking schedules, Saturday (शनिबार) and Sunday (आइतबार) are marked as weekend holidays. Both days feature special holiday highlighting along with national festival holidays.",
    },
    {
      question: "How is the Nepali Bikram Sambat calendar calculated?",
      answer: "The Nepali calendar (B.S.) is an astronomical solar lunisolar calendar. Year 2083 corresponds to 2026-2027 AD, starting on Baishakh 1 (mid-April) and concluding in Chaitra.",
    },
    {
      question: "Can I view Tithis and Panchanga for any day of the month?",
      answer: "Yes. Clicking any day cell displays its exact Tithi (Pratipada to Purnima/Aunsi), Paksha, Nakshatra, Chandra Rashi, Sunrise, Sunset, and Shubh Muhurat.",
    },
    {
      question: "When does Dashain 2083 occur?",
      answer: "Dashain 2083 begins with Ghatasthapana on Ashwin 25, followed by Phulpati on Kartik 1, Maha Ashtami on Kartik 2, Maha Navami on Kartik 3, and Vijaya Dashami (Tika) on Kartik 4, 2083 BS.",
    },
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '28px 0 48px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container">
        <h1 className="sr-only">
          Nepali Calendar 2083 (नेपाली पात्रो) — Detailed Bikram Sambat Patro, Tithi, Holidays & Panchanga
        </h1>
        {/* Detailed Interactive Calendar */}
        <DetailedNepaliCalendar />

        <div style={{ marginTop: '40px' }}>
          <AdBanner slotId="calendar-page-bottom" format="horizontal" />
          <FAQAccordion items={CALENDAR_FAQS} title="Nepali Calendar & Patro FAQs (पात्रो सम्बन्धी प्रश्नहरू)" />
        </div>
      </div>
    </div>
  );
}
