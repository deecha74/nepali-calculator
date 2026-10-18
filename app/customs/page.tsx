import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { CustomsCalculator } from '@/components/calculators/CustomsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "Mobile MDMS & Customs Duty Calculator Nepal — Airport Baggage Tax",
  description: "Calculate Tribhuvan International Airport customs duty and MDMS registration fees for bringing mobile phones (iPhone, Android) into Nepal.",
  path: "/customs",
  keywords: ["mdms nepal calculator", "airport customs phone duty nepal", "iphone customs tax nepal", "shram swikriti phone allowance"],
});

export default function CustomsPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Customs & MDMS Duty Calculator",
    description: "Calculate phone customs duty and MDMS registration fees in Nepal.",
    url: "https://nepalcalc.com/customs",
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: "How many phones can I bring to Nepal duty-free?",
      answer: "General travelers can bring 1 personal mobile phone duty-free. Nepalis returning with a valid foreign employment permit (shram swikriti) who have worked abroad for 6+ months can bring up to 2 mobile phones duty-free.",
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CustomsCalculator />
      <AdBanner slotId="customs-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Customs & MDMS FAQs" />
    </div>
  );
}
