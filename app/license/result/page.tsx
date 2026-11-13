import React from 'react';
import { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { LikhitResultChecker } from '@/components/calculators/LikhitResultChecker';
import { LicensePortalNav } from '@/components/calculators/LicenseExamQuiz';
import { PROGRAMMATIC_LIKHIT_SCENARIOS } from '@/lib/rates/programmaticLikhit';
import { FAQAccordion } from '@/components/FAQAccordion';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Driving License Likhit Result Nepal 2083 — Check Written Exam Result via SMS 33001',
  description:
    'Check Nepal driving license written examination (Likhit) result today. 1-tap mobile SMS checker to 33001/31003, DoTM 60% passing mark calculator, and office-wise pass list.',
  path: '/license/result',
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
  ]
});

export default function LicenseResultPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Driving License Likhit Result Checker',
    description: 'Official tool to check driving license written exam result in Nepal via mobile SMS and official DoTM noticeboard.',
    url: 'https://nepalcalc.com/license/result',
    category: 'UtilitiesApplication'
  });

  const faqs = [
    {
      question: 'How do I check my Nepal driving license Likhit result via SMS?',
      answer:
        'Open your mobile messaging app, type WT <Applicant-ID> (e.g. WT 12345678), and send it to 33001 or 31003. You will receive an immediate SMS reply indicating whether you have PASSED or FAILED.'
    },
    {
      question: 'When is the written exam result published after taking the test?',
      answer:
        'Transport Management Offices (यातायात व्यवस्था कार्यालय) typically publish the Likhit exam result on the same evening of the examination day between 5:00 PM and 8:30 PM on their noticeboards and SMS gateways.'
    },
    {
      question: 'What is the passing score under the new DoTM 60% grading system?',
      answer:
        'To pass the written exam and qualify for the practical trial test, Bike/Scooter applicants (Category A/K) must answer at least 12 out of 20 questions correctly (60/100 marks). Car applicants (Category B) must answer at least 15 out of 25 questions correctly (60/100 marks).'
    },
    {
      question: 'What should I do after passing the Likhit exam?',
      answer:
        'After passing the written exam, you will be assigned a date and time for your practical trial test at your designated official trial center. Make sure to bring your original citizenship card and application voucher.'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ maxWidth: '1360px', margin: '0 auto 20px' }}>
        <LicensePortalNav activeTab="likhit-result" />
      </div>

      <LikhitResultChecker />

      {/* Programmatic SEO Office Directory */}
      <div
        style={{
          maxWidth: '980px',
          margin: '48px auto 0',
          padding: '28px 24px',
          backgroundColor: '#f8fafc',
          borderRadius: '20px',
          border: '1.5px solid #e2e8f0'
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
          Yatayat Karyalaya Daily Likhit Result Directories (यातायात कार्यालय दैनिक नतिजा)
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px', lineHeight: 1.55 }}>
          Select your local Transport Management Office below for specific SMS formats, office contact numbers, trial center locations, and noticeboard instructions:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {PROGRAMMATIC_LIKHIT_SCENARIOS.map((item) => (
            <Link
              key={item.slug}
              href={`/likhit-result/${item.slug}`}
              style={{
                fontSize: '13.5px',
                color: '#2563eb',
                textDecoration: 'none',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
              className="hover:border-blue-300 hover:shadow-sm"
            >
              <span>{item.districtEn} ({item.locationEn.split(',')[0]})</span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '980px', margin: '48px auto 0' }}>
        <FAQAccordion items={faqs} title="Driving License Result FAQs (लिखित परीक्षा नतिजा सम्बन्धी जानकारी)" />
      </div>
    </div>
  );
}
