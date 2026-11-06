import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { PROGRAMMATIC_LAND_CONVERSIONS, ProgrammaticLandConversion } from '@/lib/rates/landRates';
import { constructMetadata, generateWebApplicationSchema, SITE_CONFIG } from '@/lib/seo/metadata';
import { LandConverter } from '@/components/calculators/LandConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROGRAMMATIC_LAND_CONVERSIONS.map((conv) => ({
    slug: conv.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_LAND_CONVERSIONS.find((c) => c.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/land/${item.slug}`,
    keywords: [
      `${item.fromUnit.toLowerCase()} to ${item.toUnit.toLowerCase()}`,
      `${item.fromUnitNepali} देखि ${item.toUnitNepali}`,
      "nepal land converter",
      "nepal survey department unit converter",
    ],
  });
}

export default async function ProgrammaticLandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_LAND_CONVERSIONS.find((c) => c.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: `${item.fromUnit} to ${item.toUnit} Converter`,
    description: item.metaDescription,
    url: `${SITE_CONFIG.url}/land/${item.slug}`,
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: `What is the formula to convert ${item.fromUnit} to ${item.toUnit}?`,
      answer: `To convert from ${item.fromUnit} to ${item.toUnit}, apply the official standard: ${item.formula}. Multiply your ${item.fromUnit} count by ${item.factor} to find the equivalent in ${item.toUnit}.`,
    },
    {
      question: `Is this land measurement standard recognized by Nepal Malpot (Land Revenue Office)?`,
      answer: `Yes, all calculations follow the standard conversion coefficients established by the Survey Department (Naapi Bibhag) and Ministry of Land Management, Cooperatives and Poverty Alleviation of Nepal.`,
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '12px' }}>
        <Link href="/land" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} />
          <span>Back to All Land Converters</span>
        </Link>
      </div>

      <LandConverter initialSlug={item.slug} titleTag="h1" customTitle={item.title} />

      <AdBanner slotId={`land-${item.slug}-bottom`} format="horizontal" />

      {/* Conversion details explanation card */}
      <div className="white-card" style={{ padding: '24px', margin: '40px 0 20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
          Conversion Formula & Measurement Standard
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          In Nepal&apos;s land administration system, <strong>{item.fromUnit} ({item.fromUnitNepali})</strong> is converted to <strong>{item.toUnit} ({item.toUnitNepali})</strong> using the exact factor: <code>{item.formula}</code>.
        </p>
      </div>

      <FAQAccordion items={faqs} title={`${item.fromUnit} to ${item.toUnit} Conversion FAQs`} />
    </div>
  );
}
