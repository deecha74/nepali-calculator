import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Driving License Eye Test (Color Blindness Test) — 12 Ishihara Plates',
  description:
    'Practice the official 12-plate Ishihara Color Vision (Color Blindness) Eye Test required for Nepal DoTM driving license biometric medical checkup.',
  path: '/eye-test',
  keywords: [
    'driving license eye test nepal',
    'color blindness test nepal driving license',
    'ishihara test dotm nepal',
    'likhit exam eye test online',
    'nepal license medical eye check',
    'आँखा परीक्षण सवारी चालक अनुमतिपत्र',
    'लाइसेन्स कलर भिजन टेस्ट'
  ]
});

export default function EyeTestPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Driving License Color Vision Eye Test',
    description: 'Interactive 12-plate Ishihara color blindness simulator for DoTM Nepal driving license medical screening.',
    url: 'https://nepalicalc.com/eye-test',
    category: 'EducationalApplication'
  });

  const faqs = [
    {
      question: 'Is the color vision (Ishihara) eye test mandatory for a Nepal driving license?',
      answer:
        'Yes. During your biometric appointment at any Transport Management Office (Yatayat Karyalaya), you must pass the medical color vision test before you are permitted to sit for the written (Likhit) exam.'
    },
    {
      question: 'How many Ishihara plates do I need to read correctly at the DoTM medical desk?',
      answer:
        'The medical officer typically asks you to identify 4 to 6 plates from an Ishihara book. Correctly reading at least 80% of the plates demonstrates normal red-green signal perception.'
    }
  ];

  return (
    <div className="container" style={{ padding: '28px 20px 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LicenseExamQuiz initialTab="eye-test" />
      <div style={{ maxWidth: '900px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Driving License Eye Test FAQs" />
      </div>
    </div>
  );
}

