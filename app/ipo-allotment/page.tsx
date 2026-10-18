import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { IpoAllotmentCalculator } from '@/components/calculators/IpoAllotmentCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "IPO Allotment & Share Calculator Nepal (आइपिओ)",
  description: "Calculate your exact probability and lottery odds of receiving 10 kitta in Nepal public IPOs on MeroShare based on total shares offered and oversubscription multiple.",
  path: "/ipo-allotment",
  keywords: [
    "nepal ipo allotment probability",
    "meroshare ipo result odds",
    "10 kitta lottery chance nepal",
    "ipo oversubscription calculator",
    "मेरोसेयर आईपीओ नतिजा सम्भावना",
    "१० कित्ता सेयर गोलाप्रथा"
  ],
});

export default function IpoAllotmentPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal IPO Allotment Probability Calculator",
    description: "Calculate 10 kitta lottery allotment probability and oversubscription ratio for Nepal shares.",
    url: "https://nepalcalc.com/ipo-allotment",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "How does the 10 kitta allotment policy work in Nepal?",
      answer: "Under Securities Board of Nepal (SEBON) guidelines, IPO shares must be distributed in minimum lots of 10 kitta to as many applicants as possible. If the issue is oversubscribed, a computerized lottery draw determines the lucky allottees.",
    },
    {
      question: "What is the minimum bank balance required to apply for an IPO?",
      answer: "At a par value of NPR 100 per share, applying for the minimum 10 kitta requires NPR 1,000, plus any applicable bank C-ASBA charge (NPR 0 to 25 depending on your commercial bank).",
    },
    {
      question: "What happens to the money if I do not get the IPO?",
      answer: "If you are not allotted shares, the blocked amount in your bank account is automatically unblocked within 24 to 48 hours following the official allotment date.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IpoAllotmentCalculator />
      <div style={{ maxWidth: '900px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="MeroShare IPO FAQs (सेयर बाँडफाँड सम्बन्धी प्रश्नहरू)" />
      </div>
    </div>
  );
}
