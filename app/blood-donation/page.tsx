import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { BloodDonationCalculator } from '@/components/calculators/BloodDonationCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Blood Donation Date Calculator Nepal (रक्तदान मिति)",
  description: "Check blood donation eligibility date, 90/120 days interval, and donor-recipient compatibility chart (A+, B+, O+, AB+, O-) according to Nepal Red Cross Society.",
  path: "/blood-donation",
  keywords: [
    "blood donation eligibility nepal",
    "nepal red cross blood group match",
    "raktadan date calculator",
    "blood donor compatibility chart",
    "रक्तदान योग्यता",
    "रक्त समूह अनुकूलता"
  ],
});

export default function BloodDonationPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Blood Donation Eligibility & Group Matcher",
    description: "Health tool calculating blood donation intervals and compatibility charts under Nepal Red Cross Society blood transfusion service guidelines.",
    url: "https://nepalcalc.com/blood-donation",
    category: "HealthApplication",
  });

  const faqs = [
    {
      question: "How many months must I wait between blood donations in Nepal?",
      answer: "Under Nepal Red Cross Society guidelines, healthy male donors can safely donate blood every 3 months (90 days), while female donors are recommended to wait at least 4 months (120 days) between whole blood donations.",
    },
    {
      question: "Which blood group is known as the Universal Donor and Universal Recipient?",
      answer: "O-Negative (O-) is the Universal Donor because its red blood cells can be transfused to any patient in emergency situations. AB-Positive (AB+) is the Universal Recipient because an AB+ individual can safely receive red blood cells from any blood type.",
    },
    {
      question: "What are the minimum physical criteria for donating blood in Nepal?",
      answer: "Donors must be between 18 and 60 years old, weigh at least 45 kg, have a hemoglobin count above 12.0 g/dL, and have normal resting blood pressure.",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BloodDonationCalculator />
      <div style={{ maxWidth: '880px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Blood Donation FAQs (रक्तदान सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
