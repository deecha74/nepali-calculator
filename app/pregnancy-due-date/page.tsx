import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { PregnancyDueDateCalculator } from '@/components/calculators/PregnancyDueDateCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'Nepali Pregnancy Due Date Calculator (BS & AD) — प्रसूति मिति र हप्ता हिसाब',
  description:
    'Calculate your baby’s exact delivery due date in both Nepali Bikram Sambat (BS) and English (AD) calendars, current pregnancy week, trimester & Aama Surakshya benefits →',
  path: '/pregnancy-due-date',
  keywords: [
    'pregnancy due date calculator nepal',
    'nepali pregnancy calculator bs',
    'prasuti miti calculator',
    'pregnancy week calculator nepal',
    'aama surakshya allowance nepal',
    'प्रसूति मिति क्याल्कुलेटर',
    'गर्भावस्था हप्ता हिसाब',
  ],
});

export default function PregnancyDueDatePage() {
  const canonicalUrl = `${SITE_CONFIG.url}/pregnancy-due-date`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepali Pregnancy Due Date & Week Calculator (BS & AD)',
    description:
      'Calculate estimated baby delivery due date in Bikram Sambat (BS) and Gregorian (AD) calendars, current gestation week, trimester milestones, and Nepal Ministry of Health ANC incentives.',
    url: canonicalUrl,
    category: 'HealthApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Daily Utilities & Health', url: `${SITE_CONFIG.url}/bmi` },
    { name: 'Pregnancy Due Date Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'How is the pregnancy due date calculated from the last menstrual period (LMP)?',
      answer:
        'Using standard obstetrical Naegele’s Rule, a full-term pregnancy lasts 40 weeks (280 days) from the first day of your last menstrual period (LMP) for a regular 28-day cycle. If your cycle is longer or shorter than 28 days, the due date adjusts by the difference.',
    },
    {
      question: 'What is the Nepal Government Aama Surakshya Programme incentive for pregnant mothers?',
      answer:
        'Under the Ministry of Health and Population’s Aama Surakshya Programme, mothers who complete protocol Antenatal Care (ANC) visits at months 4, 6, 8, and 9 receive NPR 800, plus free institutional delivery and transport incentives of NPR 1,000 (Terai), NPR 2,000 (Hills), or NPR 3,000 (Mountains) at listed public hospitals.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PregnancyDueDateCalculator />

      <AdBanner slotId="pregnancy-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Pregnancy Due Date & Maternal Health FAQs" />
      </div>
    </div>
  );
}

