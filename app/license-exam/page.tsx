import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Driving License Exam (लिखित परीक्षा) — 500 Questions",
  description: "Practice official DOTM Nepal driving license written exam (लिखित परीक्षा) for Bike and Car. 500+ questions, 20 random MCQs, instant scoring, and explanations.",
  path: "/license-exam",
  keywords: [
    "driving license exam nepal",
    "license likhit exam question",
    "dotm written exam test",
    "nepal driving license questions 500",
    "bike license written exam nepal",
    "car license likhit exam",
    "dotm category a bike license questions",
    "category b car license test nepal",
    "traffic signs exam nepal questions",
    "license mock test nepal online",
    "सवारी चालक लिखित परीक्षा",
    "यातायात व्यवस्था विभाग प्रश्नोत्तर",
    "लाइसेन्स लिखित परीक्षा तयारी"
  ],
});

export default function LicenseExamPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Driving License Written Exam Practice",
    description: "Practice official DOTM 100-mark written test for motorcycle and car driving licenses.",
    url: "https://nepalcalc.com/license-exam",
    category: "EducationalApplication",
  });

  const faqs = [
    {
      question: "How many marks are required to pass the Nepal driving license written exam?",
      answer: "Under the new grading criteria of the Department of Transport Management (DOTM), you must secure at least 50% (50 marks out of 100, or 10 correct answers out of 20 objective questions) to qualify for the practical trial test.",
    },
    {
      question: "Can I take the exam in either Nepali or English?",
      answer: "Yes, DOTM computer-based written exams can be answered in both Nepali and English languages.",
    },
    {
      question: "What happens if I fail the written exam in Nepal?",
      answer: "If you fail the written exam, you can reappear after the cooling period set by DOTM (typically 3 months or as notified by the specific Transport Management Office).",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LicenseExamQuiz />
      <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Driving License Exam FAQs (लिखित परीक्षा सोधिने प्रश्नहरू)" />
      </div>
    </div>
  );
}
