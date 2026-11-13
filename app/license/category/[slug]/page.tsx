import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_LICENSE_CATEGORIES, ProgrammaticLicenseCategory } from '@/lib/rates/programmaticLicense';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import Link from 'next/link';
import { Bike, Car, ArrowLeft, CheckCircle2, Clock, Award, ShieldCheck, FileText } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_LICENSE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = PROGRAMMATIC_LICENSE_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Nepal Driving License Exam',
    };
  }

  return constructMetadata({
    title: category.titleEn,
    description: category.metaDescEn,
    path: `/license/category/${category.slug}`,
    keywords: category.keywords,
  });
}

export default async function LicenseCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = PROGRAMMATIC_LICENSE_CATEGORIES.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: cat.titleEn,
    description: cat.metaDescEn,
    url: `https://nepalcalc.com/license/category/${cat.slug}`,
    category: 'EducationalApplication',
  });

  const isBike = cat.categoryCode === 'A' || cat.categoryCode === 'K';

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb / Back Link */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/license"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#2563eb',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={16} />
          <span>All License Tools (लाइसेन्स पोर्टल)</span>
        </Link>
      </div>

      {/* Header Info Box */}
      <div
        className="white-card"
        style={{
          borderRadius: '24px',
          padding: '32px clamp(20px, 4vw, 36px)',
          border: '1.5px solid #dbeafe',
          background: 'linear-gradient(135deg, #f8faff 0%, #eff6ff 100%)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1d4ed8',
            }}
          >
            {isBike ? <Bike size={26} /> : <Car size={26} />}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Official DoTM Syllabus (यातायात व्यवस्था विभाग)
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3.6vw, 34px)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {cat.vehicleNameEn}
            </h1>
          </div>
        </div>

        <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '820px' }}>
          {cat.metaDescEn}
        </p>

        {/* Quick Facts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '14px',
          }}
        >
          <div style={{ padding: '14px 16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Total Questions</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{cat.totalQuestions} Qs ({cat.marksPerQuestion} Marks/Q)</div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Passing Criteria</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669' }}>{cat.passMarks}/100 ({cat.correctNeededToPass} Correct)</div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Time Allowed</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#2563eb' }}>{cat.durationMinutes} Minutes</div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Minimum Age</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{cat.minimumAge} Years</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Mock Test & Practice Tool */}
      <LicenseExamQuiz initialTab="mock-test" />

      {/* Vehicle Specific FAQs */}
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={cat.faqs} title={`${cat.vehicleNameEn} Exam FAQs`} />
      </div>
    </div>
  );
}
