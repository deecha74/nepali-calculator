import type { Metadata } from 'next';
import {
  constructMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo/metadata';
import { PropertyTaxCalculator } from '@/components/calculators/PropertyTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Property Tax Calculator 2083/84 — Ghar Jagga & Sampurak Kar (KMC/LMC)',
  description:
    'Calculate annual municipal property tax (एकीकृत सम्पत्ति तथा घरजग्गा कर) in Kathmandu, Lalitpur, Pokhara & municipalities across Nepal with 10% early payment rebate →',
  path: '/property-tax',
  keywords: [
    'property tax calculator nepal',
    'ghar jagga kar kmc calculator',
    'sampurak kar nepal',
    'kathmandu metropolis property tax rate 2083',
    'सम्पत्ति कर क्याल्कुलेटर नेपाल',
    'घरजग्गा कर वडा कार्यालय',
  ],
});

export default function PropertyTaxPage() {
  const canonicalUrl = `${SITE_CONFIG.url}/property-tax`;

  const webAppSchema = generateWebApplicationSchema({
    name: 'Nepal Annual Municipal Property Tax Calculator (Sampurak / Ghar Jagga Kar)',
    description:
      'Calculate annual municipal house and land property tax across Kathmandu Metropolitan City (KMC), Lalitpur, Pokhara, and local ward offices in Nepal.',
    url: canonicalUrl,
    category: 'FinanceApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Land & Real Estate', url: `${SITE_CONFIG.url}/malpot` },
    { name: 'Property Tax Calculator', url: canonicalUrl },
  ]);

  const faqs = [
    {
      question: 'What is the difference between Ward Property Tax (सम्पत्ति कर) and Malpot Registration Tax?',
      answer:
        'Annual Property Tax (एकीकृत सम्पत्ति कर / घरजग्गा कर) is paid every fiscal year at your local Municipality Ward Office based on the combined government valuation of your land and building. In contrast, Malpot Registration Fee and Capital Gains Tax (5% or 7.5%) are paid only once when buying or selling property at the Land Revenue Office.',
    },
    {
      question: 'How do I get the 10% rebate on annual property tax in Kathmandu?',
      answer:
        'Under the Local Government Economic Act of Kathmandu Metropolitan City (KMC) and Lalitpur Metropolitan City (LMC), taxpayers who clear their current fiscal year’s property tax before the end of Ashwin or Poush receive a 10% statutory discount on the annual tax amount.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '820px', margin: '0 auto 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>
            Local Government Economic Act 2083/84
          </span>
          <span className="badge badge-neutral">वडा कार्यालय घरजग्गा तथा सम्पत्ति कर</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Nepal Annual Property Tax (Ghar Jagga Kar) Calculator
        </h1>
        <p style={{ fontSize: 'clamp(13.5px, 2vw, 15px)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Estimate your annual municipal property and house-land tax based on government land and building valuation, with automatic 10% early payment rebate calculation.
        </p>
      </div>

      <PropertyTaxCalculator />

      <AdBanner slotId="property-tax-middle" format="horizontal" />

      <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
        <FAQAccordion items={faqs} title="Annual Municipal Property Tax FAQs" />
      </div>
    </div>
  );
}

