import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { GpaCalculator } from '@/components/calculators/GpaCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "SEE & +2 GPA Calculator Nepal (ग्रेडिङ हिसाब)",
  description: "Calculate overall GPA and equivalent percentage for SEE and NEB Class 11 & 12 board examinations using official letter grades.",
  path: "/gpa",
  keywords: [
    "gpa calculator nepal",
    "see gpa calculator",
    "+2 gpa calculator",
    "neb grade to gpa",
    "gpa to percentage nepal",
    "neb class 12 gpa calculator",
    "class 11 gpa calculation",
    "see grading system nepal 2081",
    "tu cgpa to percentage calculator nepal",
    "tribhuvan university gpa calculator",
    "gpa into marks percentage nepal",
    "neb grade increment criteria ng",
    "एसईई जिपिए क्याल्कुलेटर",
    "कक्षा १२ ग्रेडिङ हिसाब",
    "लेटर ग्रेडिङ नेपाल"
  ],
});

export default function GpaPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal SEE & +2 GPA Calculator",
    description: "Calculate official NEB board examination GPA and percentage in Nepal.",
    url: "https://nepalcalc.com/gpa",
    category: "EducationApplication",
  });

  const faqs = [
    {
      question: "How is GPA calculated in SEE and NEB +2?",
      answer: "Total GPA is calculated by multiplying each subject's grade point (e.g. 4.0 for A+, 3.6 for A) by its credit hours, summing the products, and dividing by the total credit hours.",
    },
    {
      question: "What does NG mean in NEB exam results?",
      answer: "NG stands for Non-Graded, given to students scoring below 35% in theoretical or practical assessments. Students with NG must appear for grade increment examinations.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GpaCalculator />
      <AdBanner slotId="gpa-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="NEB / SEE GPA FAQs" />
    </div>
  );
}
