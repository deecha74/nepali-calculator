import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, Bike, ShieldCheck, Check } from 'lucide-react';
import { PROGRAMMATIC_VEHICLE_TAXES, ProgrammaticVehicleTax } from '@/lib/rates/programmaticVehicles';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { VehicleTaxCalculator } from '@/components/calculators/VehicleTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export async function generateStaticParams() {
  return PROGRAMMATIC_VEHICLE_TAXES.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = PROGRAMMATIC_VEHICLE_TAXES.find((v) => v.slug === slug);
  if (!item) return {};

  return constructMetadata({
    title: item.title,
    description: item.metaDescription,
    path: `/vehicle/${item.slug}`,
    keywords: item.keywords,
  });
}

export default async function ProgrammaticVehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = PROGRAMMATIC_VEHICLE_TAXES.find((v) => v.slug === slug);

  if (!item) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: `${item.name} Bluebook Road Tax Calculator`,
    description: item.metaDescription,
    url: `https://nepalcalc.com/vehicle/${item.slug}`,
    category: "UtilityApplication",
  });

  const faqs = [
    {
      question: `What is the annual road tax for ${item.name} in Nepal?`,
      answer: `For ${item.name} (${item.capacity}${item.fuelType === 'electric' ? (item.vehicleType === 'bike' ? 'W' : 'kW') : 'cc'}), the base annual government road tax is determined by the provincial transport management act. Renewal includes the base tax, NPR ${item.vehicleType === 'bike' ? '300' : '500'} renewal charge, and mandatory third-party insurance.`,
    },
    {
      question: `What happens if I miss the renewal deadline for ${item.name}?`,
      answer: `Renewing within 90 days of registration expiry is fine-free. Overdue renewals incur tiered penalty fines: 5% (up to 120 days), 10% (up to 165 days), 20% (till fiscal year end), up to 100% fine on annual tax for multi-year overdue.`,
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '24px' }}>
        <Link href="/vehicle" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '12px' }}>
          <ArrowLeft size={14} />
          <span>Back to All Vehicles</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-blue">{item.name} Road Tax</span>
          <span className="badge badge-neutral">{item.capacity}{item.fuelType === 'electric' ? (item.vehicleType === 'bike' ? 'W' : 'kW') : 'cc'}</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', color: '#111827' }}>
          {item.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '4px', maxWidth: '720px' }}>
          {item.metaDescription}
        </p>
      </div>

      <VehicleTaxCalculator titleTag="h2" />

      <AdBanner slotId={`vehicle-${item.slug}-bottom`} format="horizontal" />

      <FAQAccordion items={faqs} title={`${item.name} Road Tax & Renewal FAQs`} />
    </div>
  );
}
