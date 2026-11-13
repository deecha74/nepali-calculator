import type { Metadata } from 'next';
import Link from 'next/link';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateGEODatasetSchema,
  generateAEOAnswerSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { GoldCustomsCalculator } from '@/components/calculators/GoldCustomsCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { ShieldCheck, AlertTriangle, Plane, Scale, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'How Much Gold Can You Bring to Nepal? [2083/84 Customs Rules & Calculator]',
  description:
    'Check official Nepal Airport gold customs rules (25g men / 50g women duty-free). Calculate excess gold duty per gram for Dubai, Australia, Qatar & USA returnees →',
  path: '/how-much-gold-can-you-bring-to-nepal',
  keywords: [
    'how much gold can you bring to nepal',
    'how much gold can i bring to nepal from dubai',
    'how much gold can you bring to nepal from australia',
    'nepal gold customs rules 2083',
    'duty free gold limit nepal airport',
    'gold customs duty calculator nepal',
    'jhitigunta gold rule nepal',
    'raw gold customs duty nepal',
    'विदेशबाट कति सुन ल्याउन पाइन्छ',
    'सुनको भन्सार महसुल नेपाल',
  ],
});

export default function HowMuchGoldCanYouBringToNepalPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/how-much-gold-can-you-bring-to-nepal`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Airport Gold & Silver Customs Duty Calculator (FY 2083/84)',
    description:
      'Interactive Nepal Customs passenger baggage calculator to check duty-free gold ornament allowances (25g male, 50g female), excess customs duty slabs, and confiscation limits at Tribhuvan International Airport.',
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Tax & Customs', url: `${SITE_CONFIG.url}/customs` },
    { name: 'How Much Gold Can You Bring to Nepal?', url: canonicalUrl },
  ]);

  const datasetSchema = generateGEODatasetSchema({
    name: 'Nepal Passenger Baggage Gold & Silver Customs Duty Tariff Schedule (FY 2083/84)',
    description:
      'Official Department of Customs (भन्सार विभाग) personal baggage order (झिटिगुन्टा आदेश) and Civil Aviation Authority of Nepal (CAAN) AIP duty-free gold and silver allowances and excess duty slabs per gram.',
    url: canonicalUrl,
    keywords: [
      'Nepal Gold Customs Allowance',
      '25g Male 50g Female Duty Free Gold Nepal',
      'TIA Airport Gold Customs Tariff',
      'Department of Customs Nepal Baggage Rules',
    ],
  });

  const aeoSchema = generateAEOAnswerSchema({
    question: 'How much gold can you bring to Nepal duty-free?',
    answer:
      'Under Nepal’s Department of Customs Personal Baggage Order and CAAN AIP customs regulations, male passengers can bring up to 25 grams (~2.14 Tola) of personal gold ornaments duty-free, and female passengers can bring up to 50 grams (~4.29 Tola) of personal gold ornaments duty-free. Excess gold ornaments up to an additional 200 grams must be declared at the Red Channel and are subject to tiered customs duty (NPR 1,050/g for the first 100g excess and NPR 1,250/g for the next 100g excess). Raw gold bars, biscuits, and bullion do not qualify for the ornament exemption.',
    url: canonicalUrl,
  });

  const faqs = [
    {
      question: 'How much gold can I bring to Nepal duty-free?',
      answer:
        'Under the Department of Customs Personal Baggage Order (झिटिगुन्टा आदेश) and CAAN AIP customs guidance, male passengers are allowed up to 25 grams (~2.14 Tola) of personal gold ornaments duty-free, and female passengers are allowed up to 50 grams (~4.29 Tola) of personal gold ornaments duty-free.',
    },
    {
      question: 'Can I bring raw gold, biscuits, or 24K coins to Nepal from abroad?',
      answer:
        'Raw gold (bars, biscuits, bullion, or unclasped crude single-molded kadas/rings) is strictly separated from finished multi-piece personal jewelry. Raw gold does not qualify for the 25g/50g duty-free ornament allowance. Undeclared raw gold carried through the Green Channel is subject to immediate confiscation under the Nepal Customs Act.',
    },
    {
      question: 'What customs duty do I pay on gold brought to Nepal above the duty-free limit?',
      answer:
        'For finished personal gold ornaments exceeding the 25g (men) or 50g (women) duty-free limit, passengers can clear up to 200 additional grams via the Red Channel by paying NPR 1,050 per gram (NPR 10,500 per 10g) on the first 100 grams of excess, and NPR 1,250 per gram (NPR 12,500 per 10g) on the next 100 grams of excess.',
    },
    {
      question: 'What happens if I bring more gold than the permitted +200g excess allowance?',
      answer:
        'Any gold exceeding the permitted passenger baggage ceiling (more than 225g total for men or 250g total for women), or any undeclared gold hidden during Green Channel inspection, is confiscated (जफत) by the Tribhuvan International Airport Customs Office with an additional fine equal to the value of the seized gold.',
    },
    {
      question: 'Are the gold customs rules different when flying from Australia, Dubai, Qatar, or the USA?',
      answer:
        'No. Nepal Customs applies the same passenger baggage rule regardless of whether your flight originates in Dubai (UAE), Doha (Qatar), Sydney (Australia), New York (USA), or Kuala Lumpur (Malaysia). However, you must carry the original purchase invoice from the country of purchase to verify purity, weight, and legitimate ownership.',
    },
    {
      question: 'How much silver can I bring to Nepal duty-free?',
      answer:
        'Passengers can bring up to 500 grams of finished silver ornaments duty-free, and up to 100 grams of raw silver or silver utensils duty-free. Additional silver ornaments up to 500 grams can be cleared by paying customs duty at the airport Red Channel.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aeoSchema) }} />

      {/* Page Header */}

      {/* Interactive Calculator */}
      <GoldCustomsCalculator />

      <AdBanner slotId="gold-customs-middle" format="horizontal" />

      {/* Detailed Statutory Tables & Country Guides */}
      <div style={{ maxWidth: '1040px', margin: '40px auto 0', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Section 1: Official Duty-Free Gold & Silver Allowance Table */}
        <section className="white-card" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
          <h2 style={{ fontSize: 'clamp(19px, 2.6vw, 24px)', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
            1. Official Duty-Free Gold & Silver Allowance Limits in Nepal (FY 2083/84)
          </h2>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: '0 0 18px' }}>
            The amount of gold you can legally bring into Tribhuvan International Airport (TIA) or land customs checkpoints depends on whether the item is <strong>finished personal jewelry</strong> or <strong>raw bullion/coins</strong>. Below is the official passenger allowance schedule published by the Department of Customs and CAAN AIP:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13.5px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Passenger Category</th>
                  <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Type of Metal</th>
                  <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Duty-Free Allowance</th>
                  <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Dutiable Excess Limit (Red Channel)</th>
                  <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0f172a' }}>Customs Duty Rate on Excess</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>Male Passenger</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Finished Gold Ornaments</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#059669' }}>Up to 25g (~2.14 Tola)</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Up to +200g (225g max total)</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>
                    First 100g: NPR 1,050/g
                    <br />
                    Next 100g: NPR 1,250/g
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fcfcfd' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>Female Passenger</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Finished Gold Ornaments</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#059669' }}>Up to 50g (~4.29 Tola)</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Up to +200g (250g max total)</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>
                    First 100g: NPR 1,050/g
                    <br />
                    Next 100g: NPR 1,250/g
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>All Passengers</td>
                  <td style={{ padding: '12px 14px', color: '#dc2626', fontWeight: 600 }}>Raw Gold, Bars, Biscuits, Coins</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#dc2626' }}>0g (Not Exempt)</td>
                  <td style={{ padding: '12px 14px', color: '#dc2626' }}>Restricted / Red Channel Only</td>
                  <td style={{ padding: '12px 14px', color: '#dc2626' }}>20% Customs Tariff or Seizure if undeclared</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>All Passengers</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Silver Ornaments</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#059669' }}>Up to 500g (~42.87 Tola)</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>Up to +500g</td>
                  <td style={{ padding: '12px 14px', color: '#334155' }}>NPR 15 per gram</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              fontSize: '13px',
              color: '#92400e',
              lineHeight: 1.5,
            }}
          >
            <strong>Important Rule on "Crude Rings & Single-Piece Kadas":</strong> TIA Customs strictly enforces the rule that duty-free gold must consist of genuine, wearable multi-piece ornaments (e.g., necklace, earrings, finger ring with clasp/design). Heavy, unpolished single-piece gold kadas or thick crude rings made solely to transport bullion weight without paying duty are classified as <strong>raw gold</strong> and seized.
          </div>
        </section>

        {/* Section 2: Bringing Gold from Dubai, Australia, USA, Qatar & India */}
        <section className="white-card" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
          <h2 style={{ fontSize: 'clamp(19px, 2.6vw, 24px)', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
            2. How Much Gold Can You Bring to Nepal from Dubai, Australia, USA, or India?
          </h2>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: '0 0 20px' }}>
            Whether you are flying home to Kathmandu from Dubai (UAE), Doha (Qatar), Sydney (Australia), New York (USA), or entering from India, Nepal Customs applies the same national passenger baggage order. However, inspection procedures and common mistakes vary significantly by departure region:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                🇦🇪 Bringing Gold from Dubai (UAE), Qatar & Saudi
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Dubai Gold Souk purchases qualify for the 25g (male) / 50g (female) duty-free allowance <strong>only if they are finished jewelry</strong>. Never accept gold rings, chains, or electronics from unknown passengers at Dubai, Sharjah, or Doha airports—carrying third-party gold is the #1 cause of airport detention at TIA.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                🇦🇺🇺🇸🇬🇧 Bringing Gold from Australia, USA & UK
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                Many NRNs and students returning for weddings buy 24K Perth Mint, Costco, or Credit Suisse gold bars/coins. Remember that <strong>investment bars and coins are treated as raw bullion</strong>, not personal ornaments. Carry original invoices and use the Red Channel if bringing dutiable items.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                🇮🇳 Bringing Gold from India
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                India’s baggage rules (20g men / 40g women value-capped) are different from Nepal’s rules. When entering Nepal by air or land border with wedding jewelry, carry your GST/VAT purchase invoices to demonstrate personal ownership.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Green Channel vs Red Channel & Official Legal Sources */}
        <section className="white-card" style={{ padding: 'clamp(20px, 3.5vw, 32px)' }}>
          <h2 style={{ fontSize: 'clamp(19px, 2.6vw, 24px)', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
            3. Green Channel vs Red Channel Declaration & Official References
          </h2>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
            Upon arrival at Tribhuvan International Airport (TIA), Gautam Buddha International Airport (Bhairahawa), or Pokhara International Airport, passengers must choose between two customs channels:
          </p>

          <ul style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.65, paddingLeft: '20px', margin: '0 0 20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Green Channel:</strong> For passengers carrying only duty-free personal effects within the 25g (male) or 50g (female) gold ornament limit. Baggage is still screened via X-ray.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Red Channel:</strong> Mandatory for passengers carrying excess gold ornaments (between 25g–225g for men or 50g–250g for women) or any dutiable goods. Declare your gold on the customs form, pay the official tariff at the bank counter inside the arrival hall, and collect your official customs receipt.
            </li>
          </ul>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>
              <strong>Official Statutory Sources:</strong> Department of Customs Nepal (customs.gov.np) • Ministry of Finance Economic Act 2083 • CAAN AIP GEN 1.3
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/gold" className="btn-secondary" style={{ fontSize: '12.5px', padding: '7px 12px', textDecoration: 'none' }}>
                Live Gold Price Nepal →
              </Link>
              <Link href="/customs" className="btn-secondary" style={{ fontSize: '12.5px', padding: '7px 12px', textDecoration: 'none' }}>
                Mobile MDMS Customs Calculator →
              </Link>
              <Link
                href="/blog/how-much-gold-can-you-bring-to-nepal-customs-rules"
                className="btn-secondary"
                style={{ fontSize: '12.5px', padding: '7px 12px', textDecoration: 'none' }}
              >
                Read Full Gold Customs Guide →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: '40px', maxWidth: '1040px', margin: '40px auto 0' }}>
        <FAQAccordion
          items={faqs}
          title="Frequently Asked Questions: Bringing Gold to Nepal"
          quickSummary={{
            question: 'How much gold can you bring to Nepal duty-free in 2083/84?',
            directAnswer:
              'Male passengers can bring up to 25 grams (~2.14 Tola) and female passengers can bring up to 50 grams (~4.29 Tola) of finished personal gold ornaments completely duty-free. Up to 200 grams of additional gold ornaments can be brought by declaring them at the TIA Customs Red Channel and paying NPR 1,050/g on the first 100g excess and NPR 1,250/g on the next 100g excess.',
            keyFacts: [
              'Men Duty-Free Limit: Up to 25g Ornaments',
              'Women Duty-Free Limit: Up to 50g Ornaments',
              'Excess Slab 1 (First 100g): NPR 1,050/gram',
              'Raw Gold Bars/Biscuits: 0g Duty-Free (Restricted)',
            ],
            authoritySource: 'Department of Customs Nepal (Baggage Rules / झिटिगुन्टा आदेश) & Finance Act 2083/84',
          }}
        />
      </div>
    </div>
  );
}
