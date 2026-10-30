import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { AlgebraMatrixStatisticsSolver } from '@/components/calculators/AlgebraMatrixStatisticsSolver';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: 'Statistics & Quadratic Equation Calculator — Mean, Median, SD & Roots',
  description:
    'Calculate Mean, Median, Variance, Standard Deviation (SD), and solve Quadratic Equations (ax² + bx + c = 0) with real or complex roots →',
  path: '/statistics-calculator',
  keywords: [
    'statistics calculator online',
    'mean median standard deviation calculator',
    'quadratic equation solver',
    'sample variance calculator',
    'math solver nepal',
  ],
});

export default function StatisticsCalculatorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Statistics & Quadratic Equation Solver',
    description: 'Compute Mean, Median, Standard Deviation, Variance, and Quadratic roots instantly.',
    url: `${SITE_CONFIG.url}/statistics-calculator`,
    category: 'EducationalApplication',
  });

  const faqs = [
    {
      question: 'How is Standard Deviation calculated from a dataset?',
      answer:
        'Population Standard Deviation (σ) is the square root of the average of squared deviations from the mean: σ = √[ Σ(xᵢ - μ)² / N ]. It measures how spread out numbers are from their average.',
    },
    {
      question: 'What does the discriminant (b² - 4ac) tell you in a quadratic equation?',
      answer:
        'If b² - 4ac > 0, the quadratic equation has two distinct real roots. If it equals 0, there is one repeated real root. If it is negative (< 0), the equation has two complex conjugate roots.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ textAlign: 'center', marginBottom: '26px', maxWidth: '800px', margin: '0 auto 26px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
          Statistics &amp; Quadratic Equation Calculator
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>
          Analyze datasets for Mean, Median, Variance, and Standard Deviation (σ), or switch to the Quadratic Solver for real and complex roots.
        </p>
      </div>
      <AlgebraMatrixStatisticsSolver defaultMode="statistics" />
      <div style={{ marginTop: '36px', maxWidth: '1000px', margin: '36px auto 0' }}>
        <FAQAccordion items={faqs} title="Statistics & Quadratic Solver FAQs" />
      </div>
    </div>
  );
}
