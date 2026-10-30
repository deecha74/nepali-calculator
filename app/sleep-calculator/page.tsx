import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { BodyFatSleepCalculator } from '@/components/calculators/BodyFatSleepCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Sleep Cycle Calculator — Optimal Bedtime & Wake-Up Time (90-Min Cycles)',
  description:
    'Find the best time to go to sleep or wake up refreshed based on 90-minute REM and deep sleep cycles plus 15-minute sleep onset latency →',
  path: '/sleep-calculator',
  keywords: [
    'sleep cycle calculator',
    'best time to sleep calculator',
    '90 minute rem cycle calculator',
    'wake up refreshed calculator',
    'bedtime calculator',
  ],
});

export default function SleepCalculatorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Sleep Cycle & Bedtime Calculator',
    description: 'Calculate optimal bedtimes based on your wake-up time and 90-minute human sleep cycles.',
    url: `${SITE_CONFIG.url}/sleep-calculator`,
    category: 'HealthApplication',
  });

  const faqs = [
    {
      question: 'Why are sleep cycles calculated in 90-minute intervals?',
      answer:
        'A complete human sleep cycle—progressing through light sleep, deep slow-wave sleep, and REM (dream) sleep—takes approximately 90 minutes on average. Waking up at the end of a 90-minute cycle rather than in the middle of deep sleep reduces grogginess (sleep inertia).',
    },
    {
      question: 'How many sleep cycles do adults need per night?',
      answer:
        'Most adults perform best with 5 to 6 complete sleep cycles per night, which equals 7.5 to 9 hours of actual sleep (plus ~15 minutes to fall asleep).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Sleep Cycle &amp; Optimal Bedtime Calculator
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Avoid morning grogginess by aligning your bedtime with natural 90-minute REM and deep sleep cycles.
        </p>
      </div>
      <BodyFatSleepCalculator defaultTab="sleep" />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Sleep Cycle FAQs" />
      </div>
    </div>
  );
}
