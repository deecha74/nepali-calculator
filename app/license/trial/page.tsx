import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Driving License 70-Point Trial Calculator (७० अंक ट्रायल नियम)',
  description:
    'Interactive Nepal driving license 70-point practical trial calculator. Check mark deductions for Figure-8, Narrow Plank, U-Turn, Traffic Lights, Speed Breakers, and Uphill Ramp.',
  path: '/license/trial',
  keywords: [
    '70 point trial rule nepal',
    'driving license trial marks nepal',
    'figure 8 trial rule bike car',
    'nepal trial passing marks 70',
    'driving trial mistake deduction',
    '७० अंक ट्रायल नियम नेपाल',
    'बाइक र कार ट्रायल परीक्षा'
  ]
});

export default function LicenseTrialPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Driving License 70-Point Practical Trial Calculator',
    description: 'Interactive simulator for Nepal DoTM 70-point practical trial scoring across Figure-8, Narrow Plank, Lights, Bumps, and Ramp.',
    url: 'https://nepalicalc.com/license/trial',
    category: 'EducationalApplication'
  });

  const faqs = [
    {
      question: 'How does the 70-point practical trial rule work in Nepal?',
      answer:
        'You start the practical trial with 100 points. Minor mistakes deduct specific marks (for example, touching the Figure-8 boundary once deducts 10 points or forgetting the U-turn indicator deducts 10 points), and scoring 70 or more out of 100 passes.'
    },
    {
      question: 'Which mistakes cause automatic disqualification during the trial?',
      answer:
        'Crossing the outer boundary completely, putting your foot down on the track (for bikes/scooters), failing to stop at red traffic signals, or rolling back past the limit on the uphill ramp can result in immediate failure depending on track severity.'
    },
    {
      question: 'Is the 70-point trial system active across all provinces in Nepal?',
      answer:
        'Yes, Bagmati, Gandaki, Koshi, Lumbini, and other provinces have formally rolled out the 70-mark practical trial guideline to reduce subjectivity in driving evaluations.'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LicenseExamQuiz initialTab="trial-rules" />
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="70-Point Practical Trial FAQs (ट्रायल सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
