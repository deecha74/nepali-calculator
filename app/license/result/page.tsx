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
    url: 'https://nepalcalc.com/license/result',
    type: 'website',
  },
};

export default function LicenseResultPage() {
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
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: '1360px', margin: '0 auto 20px' }}>
        <LicensePortalNav activeTab="likhit-result" />
      </div>
      <LikhitResultChecker />

      {/* Programmatic SEO Links Directory */}
      <div style={{ maxWidth: '980px', margin: '48px auto 0', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Yatayat Karyalaya Daily Likhit Result Directories (यातायात कार्यालय दैनिक नतिजा)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_LIKHIT_SCENARIOS.slice(0, 12).map((item) => (
            <Link
              key={item.slug}
              href={`/likhit-result/${item.slug}`}
              style={{
                fontSize: '13.5px',
                color: '#2563eb',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{item.officeNameEn} Likhit Result</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

