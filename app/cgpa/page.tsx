import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { UniversityCgpaCalculator } from '@/components/calculators/UniversityCgpaCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'University CGPA & Engineering GPA Calculator Nepal [TU, KU, Pokhara, PoU]',
  description:
    'Calculate cumulative GPA (CGPA), convert CGPA to percentage, and predict the exact SGPA needed in upcoming semesters to graduate with distinction at TU IOE, KU & PU →',
  path: '/cgpa',
  keywords: [
    'cgpa calculator nepal',
    'engineering gpa calculator tu ioe',
    'tu cgpa to percentage converter',
    'pokhara university cgpa calculator',
    'kathmandu university cgpa calculator',
    'target cgpa calculator nepal',
    'विश्वविद्यालय CGPA क्याल्कुलेटर',
  ],
});

export default function UniversityCgpaPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/cgpa`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal University CGPA & Engineering GPA Calculator (TU, KU, PU, PoU)',
    description:
      'Semester credit-weighted CGPA calculator, official CGPA-to-percentage converter, and graduation target grade predictor for Tribhuvan University (IOE/FoM), Kathmandu University, Pokhara University, and Purbanchal University.',
    url: canonicalUrl,
    category: 'EducationalApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Education & GPA', url: `${SITE_CONFIG.url}/gpa` },
    { name: 'University CGPA Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'How is CGPA calculated from semester SGPAs in TU, KU, and Pokhara University?',
      answer:
        'Cumulative GPA (CGPA) is a credit-weighted average, not a simple arithmetic mean. Multiply each semester’s SGPA by its total credit hours, sum those weighted points across all completed semesters, and divide by the sum of all credit hours: CGPA = Σ(Semester Credits × SGPA) / Σ(Total Credits).',
    },
    {
      question: 'How do you convert 4.0 Scale CGPA to Percentage in Nepal universities?',
      answer:
        'On the standard 4.0 scale used by Tribhuvan University (BBA/BIM/BCA/CSIT/Engineering), Kathmandu University, and Purbanchal University, multiplying your CGPA by 25 (or dividing by 4.0 and multiplying by 100) yields the equivalent percentage (e.g., 3.60 CGPA = 90%). Always check your faculty transcript back-page for specific Dean’s Office equivalence tables.',
    },
    {
      question: 'What CGPA is required for Distinction / Dean’s List in Nepal?',
      answer:
        'At Pokhara University and TU Engineering/Science, a CGPA of 3.60 or above qualifies for Distinction, while TU Faculty of Management (BBA/BIM/MBS) requires 3.70+ CGPA for Distinction and 3.30+ for First Division.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '820px', margin: '0 auto 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-blue">TU IOE • FoM • KU • Pokhara • PoU</span>
          <span className="badge badge-neutral">सेमेस्टर CGPA र प्रतिशत रूपान्तरण</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          University CGPA, Engineering GPA & Target Grade Calculator
        </h1>
        <p style={{ fontSize: 'clamp(13.5px, 2vw, 15px)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Calculate credit-weighted CGPA across 1 to 10 semesters, convert CGPA into percentage, and find out the exact SGPA you need in your remaining semesters to hit your graduation goal.
        </p>
      </div>

      <UniversityCgpaCalculator />

      <AdBanner slotId="cgpa-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1040px', margin: '40px auto 0' }}>
        <FAQAccordion
          items={faqs}
          title="University CGPA & Engineering GPA FAQs"
          quickSummary={{
            question: 'How is University CGPA calculated in Nepal (TU, KU, PU)?',
            directAnswer:
              'Multiply each semester’s SGPA by its credit hours, sum all weighted points, and divide by the total credit hours completed: CGPA = Σ(Credits × SGPA) / Σ(Credits). To convert a 4.0 scale CGPA to percentage, multiply CGPA by 25.',
            keyFacts: [
              'Formula: Σ(Credits × SGPA) ÷ Total Credits',
              '4.0 Scale to %: CGPA × 25',
              'Minimum Passing CGPA: 2.00',
              'Distinction Threshold: 3.60 – 3.70 CGPA',
            ],
            authoritySource: 'Tribhuvan University, Kathmandu University & Pokhara University Examination Boards',
          }}
        />
      </div>
    </div>
  );
}

