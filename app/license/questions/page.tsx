import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: '500 Official DoTM Driving License Questions Nepal (५०० लिखित प्रश्नोत्तर)',
  description:
    'Browse and practice all official DoTM 500 driving license written exam questions and answers by category with 20 questions per page, search, explanations, and self-test mode.',
  path: '/license/questions',
  keywords: [
    '500 driving license questions nepal',
    'dotm likhit question answer pdf',
    'nepal driving license question bank',
    'cat a bike written exam questions',
    'cat b car likhit questions nepal',
    'नेपाल लाइसेन्स ५०० प्रश्नोत्तर',
    'लिखित परीक्षा प्रश्न संग्रह'
  ]
});

export default function LicenseQuestionsPage() {
  const schema = generateWebApplicationSchema({
    name: '500 Official DoTM Driving License Question Bank',
    description: 'Searchable study bank of official Nepal DoTM driving license exam questions organized across all 6 syllabus topics with 20 questions per page.',
    url: 'https://nepalicalc.com/license/questions',
    category: 'EducationalApplication'
  });

  const faqs = [
    {
      question: 'What topics are included in the 500-question DoTM driving license bank?',
      answer:
        'The syllabus covers six areas: traffic laws & knowledge, traffic signs & signals, general mechanical & technical vehicle knowledge, traffic control & accident awareness, environmental pollution laws, and first aid/driver discipline.'
    },
    {
      question: 'Can I hide the answers to quiz myself while reading the question bank?',
      answer:
        'Yes. Click "Hide Answers (Self-Test Mode)" at the top of the question bank to mask correct answers and click an option to check each question immediately.'
    },
    {
      question: 'Are both Nepali and English versions available?',
      answer:
        'Yes. Switch the site language between English and Nepali at any time to study official DoTM questions, options, and explanations in your preferred exam language.'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LicenseExamQuiz initialTab="question-bank" />
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="500 Questions Bank FAQs (५०० प्रश्नोत्तर सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}

