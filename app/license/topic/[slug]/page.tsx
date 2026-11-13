import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROGRAMMATIC_LICENSE_TOPICS, ProgrammaticLicenseTopic } from '@/lib/rates/programmaticLicense';
import { LicenseExamQuiz } from '@/components/calculators/LicenseExamQuiz';
import { FAQAccordion } from '@/components/FAQAccordion';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import Link from 'next/link';
import { BookOpen, ArrowLeft, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_LICENSE_TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = PROGRAMMATIC_LICENSE_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    return {
      title: 'Nepal Driving License Question Bank',
    };
  }

  return constructMetadata({
    title: topic.titleEn,
    description: topic.metaDescEn,
    path: `/license/topic/${topic.slug}`,
    keywords: topic.keywords,
  });
}

export default async function LicenseTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = PROGRAMMATIC_LICENSE_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const schema = generateWebApplicationSchema({
    name: topic.titleEn,
    description: topic.metaDescEn,
    url: `https://nepalcalc.com/license/topic/${topic.slug}`,
    category: 'EducationalApplication',
  });

  return (
    <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '16px clamp(16px, 3vw, 36px) 72px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/license/questions"
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
          <span>All 500 Questions Bank (५०० प्रश्न बैंक)</span>
        </Link>
      </div>

      {/* Topic Header Card */}
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
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Official DoTM Syllabus Chapter (यातायात पाठ्यक्रम)
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3.6vw, 34px)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {topic.topicNameEn}
            </h1>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#475569', marginTop: '4px' }}>
              {topic.topicNameNe}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px', maxWidth: '820px' }}>
          {topic.summaryEn}
        </p>

        {/* Exam Weightage Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
            🏍️ Bike Exam Weight: <span style={{ color: '#2563eb' }}>{topic.bikeQuestionsWeight}</span>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
            🚗 Car Exam Weight: <span style={{ color: '#059669' }}>{topic.carQuestionsWeight}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive 500 Questions Viewer */}
      <LicenseExamQuiz initialTab="questions" />

      {/* Chapter Specific FAQs */}
      <div style={{ maxWidth: '960px', margin: '48px auto 0' }}>
        <FAQAccordion items={topic.faqs} title={`${topic.topicNameEn} FAQs`} />
      </div>
    </div>
  );
}
