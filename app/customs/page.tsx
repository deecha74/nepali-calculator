import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';
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
    url: "https://nepalicalc.com/customs",
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

      {/* Prominent Link to Airport Luggage Baggage Duty Estimator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          borderRadius: '14px',
          backgroundColor: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#003893', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Plane size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Traveling to Nepal? Calculate Airport Luggage Customs Duty (झिटिगुन्टा आदेश)
            </h4>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              Check duty-free limits on Gold Jewelry, Raw Gold, Extra iPhones, Laptops, 32" TVs & Alcohol at TIA.
            </div>
          </div>
        </div>

        <Link
          href="/customs/airport-baggage"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: '#003893',
            color: '#ffffff',
            fontSize: '12.5px',
            fontWeight: 750,
            textDecoration: 'none',
          }}
        >
          <span>Airport Baggage Calculator</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <CustomsCalculator />
      <AdBanner slotId="customs-bottom" format="horizontal" />
      <FAQAccordion items={faqs} title="Customs & MDMS FAQs" />
    </div>
  );
}
