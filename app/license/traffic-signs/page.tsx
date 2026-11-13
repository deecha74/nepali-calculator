import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Traffic Signs Guide (ट्राफिक चिन्हहरू) — DoTM Written Exam Prep',
  description:
    'Learn all Regulatory, Warning, and Informative Nepal traffic signs with vector illustrations and Flashcard quiz mode for the DoTM driving license exam.',
  path: '/license/traffic-signs',
  keywords: [
    'traffic signs nepal',
    'nepal road signs meaning',
    'dotm traffic signs pdf',
    'mandatory warning informative signs nepal',
    'likhit exam traffic signs',
    'ट्राफिक चिन्ह नेपाल',
    'सडक संकेत र चिन्हहरू'
  ]
});

export default function LicenseTrafficSignsPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal DoTM Traffic Signs Visual Guide',
    description: 'Interactive gallery of Regulatory, Warning, and Informative road signs for the Nepal driving license exam.',
    url: 'https://nepalicalc.com/license/traffic-signs',
    category: 'EducationalApplication'
  });

  const faqs = [
    {
      question: 'What are the 3 main types of traffic signs in Nepal?',
      answer:
        'Nepal traffic signs are categorized into: 1) Regulatory/Mandatory Signs (Circular — orders and prohibitions), 2) Warning/Cautionary Signs (Triangular — upcoming road hazards), and 3) Informative Signs (Rectangular/Square — facilities and directions).'
    },
    {
      question: 'How many traffic sign questions appear in the Likhit written exam?',
      answer:
        'Typically 4 to 6 questions (worth 20 to 25 marks out of 100) in the official DoTM written test directly test your knowledge of road signs and traffic signals.'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LicenseExamQuiz initialTab="traffic-signs" />
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="Nepal Traffic Signs FAQs (ट्राफिक चिन्ह सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}

