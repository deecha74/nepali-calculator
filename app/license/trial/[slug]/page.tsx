import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_TRIAL_GUIDES, ProgrammaticTrialGuide } from '@/lib/rates/programmaticLicense';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import Link from 'next/link';
import { Award, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Bike, Car } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_TRIAL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = PROGRAMMATIC_TRIAL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Nepal Driving License 70-Point Trial Rules',
    };
  }

  return constructMetadata({
    title: guide.titleEn,
    description: guide.metaDescEn,
    path: `/license/trial/${guide.slug}`,
    keywords: guide.keywords,
  });
}

export default async function LicenseTrialGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = PROGRAMMATIC_TRIAL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: guide.titleEn,
    description: guide.metaDescEn,
    url: `https://nepalcalc.com/license/trial/${guide.slug}`,
    category: 'EducationalApplication',
  });

  const isBike = guide.vehicleType === 'bike';

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/license/trial"
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
          <span>70-Point Trial Guide (ट्रायल निर्देशिका)</span>
        </Link>
      </div>

      {/* Header Info */}
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
              DoTM Official 70-Point Grading System (७० अंक प्रयोगात्मक परीक्षा)
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3.6vw, 34px)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {guide.titleEn.split('(')[0].trim()}
            </h1>
          </div>
        </div>

        <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '820px' }}>
          {guide.subtitleEn}
        </p>

        {/* Passing Rule Summary */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', fontSize: '13.5px', fontWeight: 700, color: '#059669' }}>
            ✔ Pass Mark: {guide.passingScore} / {guide.totalScore} Points
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', fontSize: '13.5px', fontWeight: 700, color: '#1d4ed8' }}>
            🎯 Allowed Minor Faults: Up to 30 Deductions
          </div>
        </div>
      </div>

      {/* Trial Score Table & Checklist */}
      <div
        className="white-card"
        style={{
          borderRadius: '20px',
          padding: '24px',
          border: '1.5px solid #e2e8f0',
          backgroundColor: '#ffffff',
          marginBottom: '36px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
          Official Evaluation Tasks & Points Breakdown
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {guide.criteria.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a' }}>
                  {item.taskEn}
                </div>
                <div style={{ fontSize: '13.5px', color: '#64748b', marginTop: '3px' }}>
                  {item.faultDeductionEn}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.isImmediateFail && (
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#b91c1c',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    Immediate Fail
                  </span>
                )}
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    fontSize: '14px',
                    fontWeight: 800,
                  }}
                >
                  {item.maxPoints} Pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Trial Rules Component */}
      <LicenseExamQuiz initialTab="trial-rules" />

      {/* Trial FAQs */}
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={guide.faqs} title={`${guide.vehicleType === 'bike' ? 'Motorcycle' : 'Car'} Trial FAQs`} />
      </div>
    </div>
  );
}

