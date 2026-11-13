import React from 'react';
import { Metadata } from 'next';
import { LikhitResultChecker } from '@/components/calculators/LikhitResultChecker';
import { LicensePortalNav } from '@/components/calculators/LicenseExamQuiz';
import { PROGRAMMATIC_LIKHIT_SCENARIOS } from '@/lib/rates/programmaticLikhit';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Driving License Likhit Result Nepal 2083 — Check Written Exam Result via SMS 33001',
  description: 'Check Nepal driving license written examination (Likhit) result today. 1-tap mobile SMS checker to 33001/31003, DoTM 60% passing mark calculator, and office-wise pass list.',
  keywords: [
    'driving license likhit result nepal',
    'dotm likhit result 2083',
    'license written exam result nepal',
    'sms 33001 license result check',
    'ekantakuna likhit result today',
    'radhe radhe likhit result',
    'chabahil likhit result',
    'thulo bharyang likhit result',
    'pokhara likhit result',
    'butwal likhit result',
    'new 60 percent passing mark likhit nepal',
    'dotm license result applydl'
  ],
  openGraph: {
    title: 'Driving License Likhit Result Nepal — Instant SMS & Pass List Checker',
    description: 'Instant mobile SMS result query (WT <ID> to 33001), 60% point-based passing criteria, and office noticeboards across Nepal.',
    url: 'https://nepalcalc.com/likhit-result',
    type: 'website',
  },
};

export default function LikhitResultPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nepal Driving License Likhit Result Checker',
    operatingSystem: 'All',
    applicationCategory: 'UtilitiesApplication',
    description: 'Official tool to check driving license written exam result in Nepal via mobile SMS and official DoTM noticeboard.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NPR',
    },
  };

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: '1050px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <LicensePortalNav activeTab="likhit-result" />
      </div>
      <LikhitResultChecker />

      {/* Programmatic SEO Links Directory */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Check Driving License Likhit Results by Transport Office & Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
          {PROGRAMMATIC_LIKHIT_SCENARIOS.map((item) => (
            <Link
              key={item.slug}
              href={`/likhit-result/${item.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#003893',
                fontSize: '12.5px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
              className="hover-lift"
            >
              <span>{item.officeNameEn} →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

