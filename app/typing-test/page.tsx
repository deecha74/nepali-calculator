import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { TypingSpeedTest } from '@/components/calculators/TypingSpeedTest';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepali Typing Speed Test Online (टाइपिङ गति WPM)",
  description: "Free online Nepali and English typing speed test for Loksewa Aayog, banking, and government exams. Instant calculation of Net WPM, accuracy %, and keystrokes.",
  path: "/typing-test",
  keywords: [
    "nepali typing test online",
    "loksewa typing speed test",
    "preeti typing test wpm",
    "nepali unicode typing practice",
    "words per minute nepal",
    "नेपाली टाइपिङ गति जाँच"
  ],
});

export default function TypingTestPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepali Typing Speed Test (WPM Calculator)",
    description: "Online typing speed and accuracy testing tool benchmarked to Nepal Public Service Commission (Loksewa Aayog) standards.",
    url: "https://nepalcalc.com/typing-test",
    category: "EducationalApplication",
  });

  const faqs = [
    {
      question: "What is the minimum typing speed required for Loksewa Aayog exams?",
      answer: "Loksewa Aayog (Public Service Commission) typically requires a minimum typing speed of 25 Net Words Per Minute (WPM) in Nepali typing and 30 WPM in English typing, with at least 85% accuracy.",
    },
    {
      question: "How is Net WPM calculated?",
      answer: "Net WPM is calculated as Gross Words Per Minute minus error penalties: Net WPM = (Total Correct Characters / 5) / (Time in minutes).",
    },
    {
      question: "Can I practice with both Traditional Preeti font and Romanized Unicode?",
      answer: "Yes, this tool provides instant toggles between Nepali Unicode, Preeti font, and English paragraphs.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TypingSpeedTest />
      <div style={{ maxWidth: '880px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Typing Test FAQs (टाइपिङ परीक्षा सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
