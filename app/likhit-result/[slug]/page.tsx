import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_LIKHIT_SCENARIOS, LikhitOfficeInfo } from '@/lib/rates/programmaticLikhit';
import { LikhitResultChecker } from '@/components/calculators/LikhitResultChecker';
import Link from 'next/link';
import { MapPin, Phone, CheckCircle2, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_LIKHIT_SCENARIOS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const office = PROGRAMMATIC_LIKHIT_SCENARIOS.find((item) => item.slug === slug);

  if (!office) {
    return {
      title: 'Driving License Likhit Result Nepal',
    };
  }

  return {
    title: `${office.titleEn} | NepalCalc`,
    description: office.metaDescEn,
    keywords: office.keywords,
    openGraph: {
      title: office.titleEn,
      description: office.metaDescEn,
      url: `https://nepalcalc.com/likhit-result/${office.slug}`,
      type: 'article',
    },
  };
}

export default async function ProgrammaticLikhitPage({ params }: PageProps) {
  const { slug } = await params;
  const office = PROGRAMMATIC_LIKHIT_SCENARIOS.find((item) => item.slug === slug);

  if (!office) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: office.officeNameEn,
    serviceType: 'Driving License Written Examination Result Verification',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Department of Transport Management (DoTM Nepal)',
      url: 'https://dotm.gov.np',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: office.districtEn,
    },
    description: office.metaDescEn,
  };

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: '1050px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
        <Link href="/" style={{ color: '#003893', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link href="/likhit-result" style={{ color: '#003893', textDecoration: 'none' }}>Likhit Result</Link>
        <span>/</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{office.districtEn}</span>
      </div>

      {/* Main Tool Pre-selected for this Office */}
      <LikhitResultChecker initialOfficeSlug={office.slug} />

      {/* Detailed SEO Location Notice & Guidelines */}
      <div style={{ marginTop: '32px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
          {office.officeNameEn} — Likhit Exam Guidelines & Notice
        </h2>
        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 12px' }}>
            {office.metaDescEn}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <strong>Official Location:</strong>
              <div>{office.locationEn} ({office.districtEn}, {office.provinceEn})</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <strong>Trial Center:</strong>
              <div>{office.trialCenterEn}</div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <strong>SMS Code:</strong>
              <div>Send <code>{office.smsCode} &lt;Applicant_ID&gt;</code> to <strong>{office.smsNumber}</strong></div>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <strong>Passing Requirement:</strong>
              <div>{office.passingMarksEn}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Transport Offices */}
      <div style={{ marginTop: '36px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          Other Yatayat Offices Likhit Results in Nepal
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROGRAMMATIC_LIKHIT_SCENARIOS.filter((o) => o.slug !== office.slug).map((item) => (
            <Link
              key={item.slug}
              href={`/likhit-result/${item.slug}`}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#003893',
                backgroundColor: '#eff6ff',
                padding: '6px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                border: '1px solid #bfdbfe'
              }}
            >
              {item.districtEn} ({item.officeNameEn.split(',')[1]?.trim() || item.districtEn})
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

