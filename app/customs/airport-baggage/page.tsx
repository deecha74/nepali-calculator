import type { Metadata } from 'next';
import Link from 'next/link';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateGEODatasetSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { AirportBaggageCalculator } from '@/components/calculators/AirportBaggageCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { ArrowLeft, Plane, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Airport Baggage Duty Calculator — TIA Customs Rules, Gold, Phone & TV Limits (2083/84)',
  description:
    'Calculate Tribhuvan International Airport (TIA) customs duty on gold jewelry, raw gold, extra iPhones, laptops, TVs, and alcohol before flying to Nepal. Official Department of Customs personal baggage rules (झिटिगुन्टा आदेश).',
  path: '/customs/airport-baggage',
  keywords: [
    'nepal airport baggage duty calculator',
    'tia customs duty calculator',
    'how much gold can i bring to nepal airport',
    'nepal airport iphone customs duty',
    'nepal airport tv customs duty',
    'shram swikriti phone allowance nepal',
    'झिटिगुन्टा आदेश नेपाल',
    'त्रिभुवन विमानस्थल भन्सार महसुल',
    'विदेशबाट सुन ल्याउने नियम',
  ],
});

export default function AirportBaggageDutyPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/customs/airport-baggage`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Tribhuvan International Airport (TIA) Passenger Baggage Customs Duty Calculator',
    description:
      'Official luggage assessment calculator for Nepalis and tourists arriving at Kathmandu Airport. Checks duty-free gold, smartphone MDMS fees, television sizes, and alcohol allowances under the latest Department of Customs Baggage Order.',
    url: canonicalUrl,
    category: 'UtilityApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Customs & MDMS', url: `${SITE_CONFIG.url}/customs` },
    { name: 'Airport Baggage Duty Calculator', url: canonicalUrl },
  ]);

  const datasetSchema = generateGEODatasetSchema({
    name: 'Nepal Department of Customs Personal Baggage Duty Order Tariff Schedule (झिटिगुन्टा आदेश)',
    description:
      'Statutory passenger baggage exemptions and customs tariffs for gold, electronics, and alcohol at Tribhuvan International Airport (TIA) as notified by the Ministry of Finance.',
    url: canonicalUrl,
    keywords: [
      'TIA Airport Customs Tariff',
      'Nepal Passenger Baggage Order 2083',
      'Gold Jewelry Duty Free Slabs Nepal',
      'MDMS Mobile Phone Customs Tariff',
    ],
  });

  const faqs = [
    {
      question: 'How much gold can a Nepali citizen bring through Tribhuvan International Airport duty-free?',
      answer:
        'Under official Nepal Department of Customs baggage regulations, female passengers can bring up to 50 grams of gold jewelry duty-free, while male passengers can bring up to 25 grams duty-free. Up to an additional 50 grams of gold jewelry can be cleared by paying flat customs duty (~NPR 9,500 per 10 grams). Raw gold (bullion, biscuits, coins) has ZERO duty-free exemption and must be declared at the Red Channel.',
    },
    {
      question: 'How many mobile phones can I bring to Nepal without paying customs?',
      answer:
        'General travelers are permitted 1 personal mobile phone duty-free. However, Nepali citizens returning with a valid Foreign Employment Labor Permit (श्रम स्वीकृति) who have worked abroad for 6 or more consecutive months can bring up to 2 mobile phones completely duty-free. Any 3rd or additional phone incurs flat customs duty (~NPR 10,000 for smartphones/iPhones) and requires MDMS registration.',
    },
    {
      question: 'What is the television (TV) baggage rule for returning Nepali workers?',
      answer:
        'Nepali workers returning from foreign employment with valid labor permits who have completed at least 12 months abroad can bring 1 LED/Smart TV up to 32 inches completely duty-free. Any TV larger than 32 inches or brought by non-labor travelers is taxable based on screen size (NPR 4,500 for up to 32", NPR 9,500 for 43", and higher for larger screens).',
    },
    {
      question: 'What happens if I carry more than 1 liter of liquor into Nepal?',
      answer:
        'Nepal customs strictly limits personal alcohol allowance to 1 bottle (maximum 1,000ml / 1 Liter) of liquor duty-free. Unlike electronics where you can pay excess tax, carrying more than 1 liter of liquor in personal baggage is strictly prohibited under the Customs Act; any excess volume is confiscated at the airport arrival terminal.',
    },
    {
      question: 'When should I walk through the Green Channel vs Red Channel at Kathmandu Airport?',
      answer:
        'You can walk directly through the Green Channel if all your items (gold, phones, laptops, alcohol) fall strictly within the duty-free personal limits and you have less than USD 5,000 in cash. If you carry excess gold jewelry, raw gold, extra smartphones, TVs, commercial goods, or cash over USD 5,000, you MUST proceed to the Red Channel for formal customs declaration and tax payment.',
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div style={{ marginBottom: '16px' }}>
        <Link
          href="/customs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Customs & MDMS Hub</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: '#eff6ff',
            color: '#003893',
            fontSize: '12px',
            fontWeight: 800,
            marginBottom: '10px',
            border: '1px solid #bfdbfe',
          }}
        >
          <Plane size={13} />
          <span>TRIBHUVAN INTERNATIONAL AIRPORT (TIA) ARRIVAL CUSTOMS</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.25 }}>
          Nepal Airport Baggage Duty & Customs Calculator
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Calculate exact customs duty on gold jewelry, raw gold, extra mobile phones, TVs, and liquor before arriving at Kathmandu Airport under the official Department of Customs Baggage Order (झिटिगुन्टा आदेश).
        </p>
      </div>

      {/* Main Interactive Tool */}
      <AirportBaggageCalculator />

      {/* Essential Arrival Guide: Green vs Red Channel */}
      <div
        style={{
          marginTop: '32px',
          padding: '24px',
          borderRadius: '18px',
          backgroundColor: '#ffffff',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(11, 43, 92, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <ShieldCheck size={20} color="#003893" />
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
            Kathmandu Airport Arrival Hall: Green Channel vs Red Channel Rules
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 800, color: '#166534' }}>
              🟢 Green Channel (हरियो मार्ग)
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#14532d', lineHeight: 1.55 }}>
              For passengers carrying <strong>ONLY duty-free items</strong> within legal limits:
              up to 25g/50g gold jewelry, 1 personal phone (2 for 6+ mo labor returnees), 1 laptop, 1L liquor, and under $5,000 cash. Walk straight through baggage scanning without stopping for duty assessment.
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 800, color: '#b45309' }}>
              🔴 Red Channel (रातो मार्ग)
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: 1.55 }}>
              <strong>MANDATORY DECLARATION</strong> if you have:
              extra gold jewelry, any raw gold/coins, 2nd or 3rd smartphone, television, commercial goods, or physical cash over USD 5,000. Officers will inspect items, generate an official customs receipt, and accept card/cash duty payments.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '36px' }}>
        <AdBanner slotId="airport-baggage-bottom" format="horizontal" />
      </div>

      {/* FAQs */}
      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="Frequently Asked Questions (TIA Airport Baggage)" />
      </div>
    </div>
  );
}

