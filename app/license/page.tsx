import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Driving License Exam (लिखित परीक्षा) — 500 Questions, Mock Test & Signs",
  description: "Practice official DOTM Nepal driving license written exam (लिखित परीक्षा) for Bike and Car. 500+ official questions, 20 random MCQs, instant scoring, eye test, traffic signs and result check.",
  path: "/license",
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

export default function LicenseOverviewPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Driving License Written Exam Practice & Preparation Portal",
    description: "Practice official DOTM 100-mark written test, 500 questions bank, mock test, eye test, traffic signs, and 70-point trial simulator for motorcycle and car driving licenses.",
    url: "https://nepalicalc.com/license",
    category: "EducationalApplication",
  });

  const faqs = [
    {
      question: "How many marks are required to pass the Nepal driving license written exam?",
      answer: "Under the new grading criteria of the Department of Transport Management (DOTM), you must secure at least 60% (60 marks out of 100, or 12 correct answers out of 20 objective questions for Bike, and 15 correct answers out of 25 for Car) to qualify for the practical trial test.",
    },
    {
      question: "Can I take the exam in either Nepali or English?",
      answer: "Yes, DOTM computer-based written exams can be answered in both Nepali and English languages. You can toggle between languages at any time on this preparation portal.",
    },
    {
      question: "What happens if I fail the written exam in Nepal?",
      answer: "If you fail the written exam, you can reappear after the cooling period set by DOTM (typically 3 months or as notified by your specific Transport Management Office).",
    },
    {
      question: "What tools are included in this Nepal Driving License preparation portal?",
      answer: "This portal includes all 500 official DoTM questions organized across 6 topics with 20 questions per page, a realistic 30-minute timed mock test simulator, an interactive 12-plate Ishihara color blindness test, a complete traffic signs guide, a 70-point practical trial scoring calculator, and instant SMS 33001 result instructions.",
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(12px, 2vw, 24px) 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LicenseExamQuiz initialTab="overview" />
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="Driving License Exam FAQs (लिखित परीक्षा सोधिने प्रश्नहरू)" />
      </div>
    </div>
  );
}

