import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { UniversityAttendanceCalculator } from '@/components/calculators/UniversityAttendanceCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "University 75% Attendance & Bunk Calculator Nepal — TU, KU, Pokhara University",
  description: "Check if your attendance meets the mandatory 75% university rule for TU, KU, PU, and CTEVT. Calculate how many classes you can safely bunk or need to attend.",
  path: "/university-attendance",
  keywords: [
    "university attendance calculator nepal",
    "75 percent attendance calculator",
    "tu attendance rule nepal",
    "ku attendance calculator",
    "bunk calculator college",
    "ioe 75 attendance calculator",
    "nq calculator tu",
    "विश्वविद्यालय हाजिरी",
  ],
});

export default function UniversityAttendancePage() {
  const schema = generateWebApplicationSchema({
    name: "University 75% Attendance & Bunk Calculator Nepal",
    description: "Calculates college and university semester attendance percentage, safe bunks, and classes needed to reach 75% for TU, KU, and Pokhara University.",
    url: "https://nepalcalc.com/university-attendance",
    category: "EducationalApplication",
  });

  const faqs = [
    {
      question: "What is the 75% attendance rule in Tribhuvan University (TU)?",
      answer: "Under Tribhuvan University Examination Ordinances, students must maintain a minimum of 75% attendance in theoretical and practical classes per course to be eligible for the semester final examination admit card. Students below 75% are marked Not Qualified (NQ).",
    },
    {
      question: "How does the Bunk Calculator work?",
      answer: "The Bunk Calculator checks how much your current attendance exceeds 75%. It calculates the exact number of consecutive classes you can skip without your cumulative percentage dropping below the mandatory 75% threshold.",
    },
    {
      question: "What happens if my attendance is below 75% before finals?",
      answer: "If your attendance falls below 75%, your college or department may withhold your exam admit card, requiring you to repeat the subject or provide verified medical justification subject to campus chief approval.",
    },
    {
      question: "Does Kathmandu University (KU) follow the 75% attendance rule?",
      answer: "Yes. KU requires at least 75% attendance for undergraduate and graduate semester courses, with some medical and clinical departments requiring up to 80% or 85%.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">University Exams</span>
          <span className="badge badge-neutral">TU, KU, PU & CTEVT</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          University 75% Attendance & Bunk Calculator (हाजिरी क्याल्कुलेटर)
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Avoid NQ in final exams! Calculate your current percentage, safe bunk classes, and recovery attendance for TU, KU, and Pokhara University.
        </p>
      </div>

      <UniversityAttendanceCalculator />

      <AdBanner slotId="university-attendance-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion
          items={faqs}
          title="Nepal University Attendance FAQs"
          quickSummary={{
            question: "What is the 75% attendance rule in Nepali universities like TU and KU?",
            directAnswer: "In Nepal, universities including Tribhuvan University (TU), Kathmandu University (KU), and Pokhara University require students to attend at least 75% of total scheduled lectures per subject in a semester. Falling below 75% results in disqualification (Not Qualified / NQ) from appearing in the final board examinations.",
            keyFacts: [
              "75% Mandatory Attendance",
              "NQ (Disqualified) below 75%",
              "Calculate Safe Bunks Instantly",
              "Applies to IOE, IOM, TU, KU & PU"
            ],
            authoritySource: "Tribhuvan University & Kathmandu University Exam Boards"
          }}
        />
      </div>
    </div>
  );
}
