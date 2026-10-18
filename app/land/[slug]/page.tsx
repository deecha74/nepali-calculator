import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { PROGRAMMATIC_LAND_CONVERSIONS, ProgrammaticLandConversion } from '@/lib/rates/landRates';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LandConverter } from '@/components/calculators/LandConverter';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

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
    url: `https://nepalcalc.com/land/${item.slug}`,
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

      <div style={{ marginBottom: '24px' }}>
        <Link href="/land" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
          <ArrowLeft size={14} />
          <span>Back to All Land Converters</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">Programmatic Land Tool</span>
          <span className="badge badge-neutral">{item.formula}</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '720px' }}>
          {item.metaDescription}
        </p>
      </div>

      <LandConverter initialSlug={item.slug} titleTag="h2" />

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
