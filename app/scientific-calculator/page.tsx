import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { ScientificMathCalculator } from '@/components/calculators/ScientificMathCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Scientific Math, Trigonometry & GCD/LCM Calculator',
  description:
    'Calculate Greatest Common Divisor (GCD/HCF), Least Common Multiple (LCM), and trigonometric functions (sin, cos, tan, log, square root) online →',
  path: '/scientific-calculator',
  keywords: [
    'scientific calculator online',
    'gcd lcm calculator',
    'hcf lcm calculator nepal',
    'trigonometry calculator sin cos tan',
    'logarithm square root calculator',
  ],
});

export default function ScientificCalculatorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Scientific Math, Trigonometry & GCD/LCM Calculator',
    description: 'Compute GCD (HCF), LCM, trigonometric functions, and logarithms instantly.',
    url: `${SITE_CONFIG.url}/scientific-calculator`,
    category: 'EducationalApplication',
  });

  const faqs = [
    {
      question: 'How is LCM related to GCD (HCF)?',
      answer:
        'For any two positive integers A and B, the product of the two numbers equals the product of their GCD and LCM: LCM(A, B) = (A × B) / GCD(A, B).',
    },
    {
      question: 'Does the trigonometry calculator use degrees or radians?',
      answer:
        'You enter the angle in Degrees (°), and the calculator automatically converts it to Radians (θ × π / 180) and displays exact sin(θ), cos(θ), and tan(θ) values.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Scientific Math, Trigonometry &amp; GCD / LCM Calculator
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Quickly solve HCF/GCD, Least Common Multiple (LCM), trigonometric ratios (sin, cos, tan), and logarithms.
        </p>
      </div>
      <ScientificMathCalculator />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Scientific Math & GCD/LCM FAQs" />
      </div>
    </div>
  );
}
