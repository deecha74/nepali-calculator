import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale, Coins } from 'lucide-react';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateGEODatasetSchema,
} from '@/lib/seo/metadata';
import { GoldCalculator } from '@/components/calculators/GoldCalculator';
import { LiveGoldQuickAnswer } from '@/components/gold/LiveGoldQuickAnswer';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';

export const metadata: Metadata = constructMetadata({
  title: 'Silver Price in Nepal Today (चाँदीको भाउ) — Per Tola & 10g Rate',
  description:
    'Check live FENEGOSIDA silver price in Nepal today per Tola (11.66g), 10 Grams & 1 Kg. Calculate silver jewelry & ornament costs with making charges (ज्याला).',
  path: '/silver',
  keywords: [
    'silver price in nepal today',
    'chandi ko bhau today',
    '1 tola silver price in nepal',
    '10 gram silver price in nepal',
    '1 kg silver price in nepal',
    'silver rate in nepal today fenegosida',
    'silver calculator nepal',
    'चाँदीको भाउ आज',
    '१ तोला चाँदीको मूल्य',
  ],
});

export default function SilverPage() {
  const schema = generateWebApplicationSchema({
    name: 'Live Silver Price in Nepal Today & Silver Weight Calculator',
    description:
      'Real-time FENEGOSIDA silver rate in Nepal per tola, 10 grams, and 1 kilogram with traditional Nepali weight conversion (Tola, Lal, Aana) and ornament making charge calculator.',
    url: 'https://nepalicalc.com/silver',
    category: 'FinanceApplication',
  });

  const datasetSchema = generateGEODatasetSchema({
    name: 'Official Daily Silver Price in Nepal (FENEGOSIDA Per Tola, 10g & 1 Kg)',
    description:
      'Daily updated fine 999 silver bullion and retail ornament rates in Nepalese Rupees (NPR) per Tola (11.6638g), 10 Grams, 1 Gram, and 1 Kilogram.',
    url: 'https://nepalicalc.com/silver',
    keywords: [
      'silver price in nepal today',
      'chandi ko bhau',
      '1 tola silver rate nepal',
      '10 gram silver price nepal',
    ],
    variableMeasured: [
      'Fine Silver Price per Tola (NPR)',
      'Fine Silver Price per 10 Grams (NPR)',
      'Fine Silver Price per 1 Kilogram (NPR)',
    ],
  });

  const faqs = [
    {
      question: 'What is the silver price in Nepal today per tola? (आज चाँदीको भाउ कति छ?)',
      answer:
        'Today’s official FENEGOSIDA silver price in Nepal is रु 4,100 per tola (11.6638 grams) and रु 3,515 per 10 grams for 999 pure fine silver.',
    },
    {
      question: 'How many grams are in 1 Tola of silver in Nepal?',
      answer:
        'Just like gold, 1 Tola of silver in Nepal equals exactly 11.6638 grams, 100 Lal, or 16 Aana.',
    },
    {
      question: 'How much does 1 Kg of silver cost in Nepal?',
      answer:
        '1 Kilogram (1,000 grams or 85.735 Tolas) of fine silver costs approximately रु 3,51,500 based on the official 10-gram rate.',
    },
    {
      question: 'Are making charges (Jyala) and wastage (Jarti) applied to silver ornaments in Nepal?',
      answer:
        'Yes. For silver utensils, puja items, and ornaments (such as kalli, payal, and karuwa), jewelers typically charge making fees (ज्याला) of रु 200 to रु 800 per tola and wastage (जर्ती) depending on craftsmanship.',
    },
  ];

  const silverProgrammaticItems = PROGRAMMATIC_GOLD_ITEMS.filter(
    (item) => item.metalType === 'silver' || item.slug.includes('1-tola') || item.slug.includes('10-gram')
  );

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <GoldCalculator
        initialMetalType="silver"
        initialWeightUnit="tola"
        initialTola={1}
        initialLal={0}
        initialGram={11.66}
        initialMakingCharge={400}
        initialWastagePercent={2}
        titleTag="h1"
        customTitle="Silver Price in Nepal Today (चाँदीको भाउ) — Live Rate & Calculator"
        customSubtitle="Convert Tola, Lal, and Grams for 999 fine silver and estimate total ornament cost with Jyala & Jarti."
      />

      <div style={{ marginTop: '28px' }}>
        <LiveGoldQuickAnswer
          unit="tola"
          amount={1}
          slug="silver-price-in-nepal-today-per-tola"
          headlineAnswer="Today's official silver price in Nepal is रु 4,100 per tola (11.6638g), रु 3,515 per 10 grams, and रु 3,51,500 per 1 kilogram as published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)."
          conversionFormula="1 Tola Silver = 11.6638 Grams = 100 Lal = 16 Aana"
        />
      </div>

      <AdBanner slotId="silver-page-mid" format="horizontal" />

      {/* Silver Weight Reference Table */}
      <div className="white-card" style={{ padding: '28px', margin: '36px 0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Scale size={20} color="#475569" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Nepal Silver Weight &amp; Price Conversion Table
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Standard conversion reference for buying silver coins, utensils, puja items, and bullion bars in Nepal:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Silver Weight Unit</th>
                <th>Tola Equivalent</th>
                <th>Lal Equivalent</th>
                <th>Grams (g)</th>
                <th>Approx. Market Price (NPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1 Lal Silver (१ लाल)</strong></td>
                <td>0.01 Tola</td>
                <td>1 Lal</td>
                <td>0.1166 g</td>
                <td>रु 41</td>
              </tr>
              <tr>
                <td><strong>1 Aana Silver (१ आना)</strong></td>
                <td>0.0625 Tola</td>
                <td>6.25 Lal</td>
                <td>0.7289 g</td>
                <td>रु 256</td>
              </tr>
              <tr>
                <td><strong>1 Gram Silver (१ ग्राम)</strong></td>
                <td>0.0857 Tola</td>
                <td>8.57 Lal</td>
                <td>1.0000 g</td>
                <td>रु 352</td>
              </tr>
              <tr>
                <td><strong>10 Grams Silver (१० ग्राम)</strong></td>
                <td>0.8573 Tola</td>
                <td>85.73 Lal</td>
                <td>10.000 g</td>
                <td>रु 3,515</td>
              </tr>
              <tr style={{ background: '#f1f5f9', fontWeight: 700 }}>
                <td><strong>1 Tola Silver (१ तोला)</strong></td>
                <td>1.00 Tola</td>
                <td>100 Lal</td>
                <td>11.6638 g</td>
                <td>रु 4,100</td>
              </tr>
              <tr>
                <td><strong>5 Tola Silver (५ तोला)</strong></td>
                <td>5.00 Tola</td>
                <td>500 Lal</td>
                <td>58.319 g</td>
                <td>रु 20,500</td>
              </tr>
              <tr>
                <td><strong>10 Tola Silver (१० तोला)</strong></td>
                <td>10.00 Tola</td>
                <td>1,000 Lal</td>
                <td>116.638 g</td>
                <td>रु 41,000</td>
              </tr>
              <tr>
                <td><strong>1 Kg Silver Bar (१ केजी)</strong></td>
                <td>85.735 Tola</td>
                <td>8,573.5 Lal</td>
                <td>1,000.0 g</td>
                <td>रु 3,51,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Gold & Silver Links */}
      <div className="white-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Coins size={18} color="#d97706" />
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
            Explore Specific Silver &amp; Gold Weight Calculators
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {silverProgrammaticItems.map((item) => (
            <Link
              key={item.slug}
              href={`/gold/${item.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                background: 'var(--surface-primary)',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.shortTitle}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.badge}</div>
              </div>
              <ArrowRight size={14} color="#475569" />
            </Link>
          ))}
        </div>
      </div>

      <FAQAccordion
        items={faqs}
        title="Frequently Asked Questions — Silver Price in Nepal"
        quickSummary={{
          question: 'What is the price of 1 Tola and 10 Gram silver in Nepal today?',
          directAnswer:
            'Today’s official silver rate in Nepal published by FENEGOSIDA is रु 4,100 per Tola (11.6638 grams), रु 3,515 per 10 Grams, and रु 3,51,500 per 1 Kilogram.',
          keyFacts: ['1 Tola = 11.6638g', '1 Kg = 85.735 Tola', '999 Fine Silver Standard'],
          authoritySource: 'Federation of Nepal Gold & Silver Dealers (FENEGOSIDA)',
        }}
      />
    </div>
  );
}
