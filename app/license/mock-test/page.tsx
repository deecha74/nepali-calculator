import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Driving License Mock Test Online (लिखित नमुना परीक्षा) — Bike & Car',
  description:
    'Take the timed 30-minute Nepal Driving License Likhit Mock Test online for Category A/K (Bike & Scooter) and Category B (Car & Jeep) with instant score checking.',
  path: '/license/mock-test',
  keywords: [
    'driving license mock test nepal',
    'likhit exam online test nepal',
    'bike license mock test 20 questions',
    'car license mock test 25 questions',
    'dotm written exam simulator',
    'सवारी चालक लिखित नमुना परीक्षा',
    'लाइसेन्स मक टेस्ट नेपाल'
  ]
});

export default function LicenseMockTestPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Driving License Likhit Mock Test',
    description: 'Timed DoTM computer-based written mock test simulator for Category A/K and Category B driving licenses.',
    url: 'https://nepalicalc.com/license/mock-test',
    category: 'EducationalApplication'
  });

  const faqs = [
    {
      question: 'How many questions are asked in the Bike vs Car Likhit mock exam?',
      answer:
        'Category A/K (Bike, Scooter, Moped) has 20 objective questions worth 5 marks each (100 total). Category B (Car, Jeep, Delivery Van) has 25 objective questions worth 4 marks each (100 total).'
    },
    {
      question: 'What is the passing score in the Nepal DoTM written exam?',
      answer:
        'Under the 60% passing system, you need at least 60 marks out of 100 within 30 minutes — meaning at least 12 correct answers for Bike (A/K) or 15 correct answers for Car (B).'
    },
    {
      question: 'Are these mock test questions taken from the official DoTM syllabus?',
      answer:
        'Yes. Questions are randomly drawn from the official 500-question bank published by the Department of Transport Management (DoTM) covering traffic rules, signals, vehicle mechanics, and safety.'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LicenseExamQuiz initialTab="mock-test" />
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="Likhit Mock Exam FAQs (नमुना परीक्षा सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
