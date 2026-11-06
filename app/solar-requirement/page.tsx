import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { SolarRequirementCalculator } from '@/components/calculators/SolarRequirementCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'Solar Panel & Battery Requirement Calculator Nepal [Cost & Net Metering]',
  description:
    'Estimate solar panel kW size, 550W panel count, Lithium/Tubular battery Ah capacity, hybrid inverter kVA, roof area in Aana & installation cost in Nepal →',
  path: '/solar-requirement',
  keywords: [
    'solar requirement calculator nepal',
    'solar panel price in nepal calculator',
    'home solar system cost nepal',
    'nea net metering calculator',
    'solar battery inverter sizing nepal',
    'सोलार प्यानल क्याल्कुलेटर नेपाल',
  ],
});

export default function SolarRequirementPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/solar-requirement`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Solar Panel, Battery & Inverter Requirement Calculator',
    description:
      'Calculate rooftop solar PV kW capacity, number of 550W panels, battery storage in kWh/Ah, inverter kVA, roof area, and installation cost in Nepal.',
    url: canonicalUrl,
    category: 'UtilityApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Daily Utilities', url: `${SITE_CONFIG.url}/nea` },
    { name: 'Solar Requirement Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'How many kW of solar panels do I need for a normal house in Nepal?',
      answer:
        'A typical urban Nepali household with a monthly NEA electricity bill of NPR 2,500 to NPR 4,000 (~250 to 350 units/month) requires a 2 kW to 3 kW rooftop solar system (4 to 6 panels of 550W Mono PERC), occupying roughly 150 to 200 sq. ft. (~0.5 Aana) of shadow-free south-facing roof area.',
    },
    {
      question: 'Does NEA buy surplus solar electricity from homes in Nepal?',
      answer:
        'Yes. Under the Nepal Electricity Authority (NEA) Grid-Connected Solar Net Metering guidelines, residential and commercial consumers installing grid-tied or hybrid rooftop systems can export surplus daytime solar electricity back to the NEA grid at NPR 7.10 per unit (kWh).',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SolarRequirementCalculator />

      <AdBanner slotId="solar-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Solar System & Net Metering FAQs in Nepal" />
      </div>
    </div>
  );
}

