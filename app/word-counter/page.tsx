import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { WordCounterCalculator } from '@/components/calculators/WordCounterCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Nepali Unicode & English Word Counter — Character & Loksewa Keystroke Tool',
  description: 'Count words, characters, sentences, paragraphs, and Loksewa 5-keystroke standard words for Nepali Devanagari Unicode and English text →',
  path: '/word-counter',
  keywords: ['word counter nepal', 'nepali unicode word counter', 'character counter online', 'loksewa typing keystroke counter'],
});

export default function WordCounterPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepali Unicode & English Word and Character Counter',
    description: 'Online word, character, sentence, and Loksewa 5-keystroke word counter for Nepali and English text.',
    url: `${SITE_CONFIG.url}/word-counter`,
    category: 'UtilityApplication',
  });

  const faqs = [
    {
      question: 'How does Lok Sewa Aayog count words in computer skill typing tests?',
      answer: 'Under Public Service Commission (Lok Sewa Aayog) computer skill test guidelines, 5 keystrokes/characters (including spaces) are standardized as 1 standard word when evaluating net Words Per Minute (WPM).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Nepali Unicode & English Word Counter (शब्द तथा अक्षर गणना)
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Real-time word, character, sentence, and Loksewa 5-character word counter for Nepali Devanagari and English documents.
        </p>
      </div>
      <WordCounterCalculator />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Word & Character Counter FAQs" />
      </div>
    </div>
  );
}

