import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { BaseRomanConverter } from '@/components/calculators/BaseRomanConverter';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Number Base & Roman Numeral Converter — Binary, Octal, Decimal, Hex',
  description:
    'Convert numbers between Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16), and Roman Numerals for CSIT, BCA, and engineering students in Nepal →',
  path: '/base-converter',
  keywords: [
    'number base converter',
    'binary to decimal converter',
    'decimal to hexadecimal',
    'roman numeral converter',
    'octal to binary converter nepal',
  ],
});

export default function BaseConverterPage() {
  const schema = generateWebApplicationSchema({
    name: 'Number Base & Roman Numeral Converter',
    description: 'Convert Binary, Octal, Decimal, Hexadecimal, and Roman Numerals instantly.',
    url: `${SITE_CONFIG.url}/base-converter`,
    category: 'EducationalApplication',
  });

  const faqs = [
    {
      question: 'How do you convert Decimal to Binary?',
      answer:
        'Divide the decimal integer repeatedly by 2 and record the remainder (0 or 1) at each step. Reading the remainders from bottom (last) to top (first) gives the binary (Base 2) representation.',
    },
    {
      question: 'What is the maximum number supported by standard Roman numerals?',
      answer:
        'Standard Roman numeral notation without vinculum (overline bars) supports numbers from 1 (I) up to 3,999 (MMMCMXCIX).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Number Base &amp; Roman Numeral Converter
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Convert numbers between Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16), and Roman Numerals in real time.
        </p>
      </div>
      <BaseRomanConverter />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Base & Roman Converter FAQs" />
      </div>
    </div>
  );
}
