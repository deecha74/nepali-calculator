import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FileText,
  Scale,
  CheckCircle2,
  AlertCircle,
  Shield,
  Gavel,
  ArrowRight,
} from 'lucide-react';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service — Conditions of Use & Legal Agreement',
  description:
    'Official Terms of Service and Conditions of Use for Nepali Calc (nepalicalc.com), governing access to calculators, legal document templates, and market data →',
  path: '/terms-of-service',
  keywords: [
    'nepali calc terms of service',
    'nepalicalc.com terms and conditions',
    'calculator terms of use nepal',
  ],
});

export default function TermsOfServicePage() {
  const terms = [
    {
      icon: <CheckCircle2 size={22} color="#003893" />,
      bg: '#eff6ff',
      title: '1. Acceptance of Terms & Scope of Service',
      titleNep: '१. सेवाका सर्तहरूको स्वीकृति र प्रयोगको दायरा',
      body: 'By accessing and using Nepali Calc (https://nepalicalc.com), operated by Chalise Tech, you agree to be bound by these Terms of Service, our Privacy Policy, and our official Disclaimer. Nepali Calc provides free online calculators, unit converters, Bikram Sambat calendar tools, and informational legal document templates tailored for citizens, students, professionals, and businesses in Nepal.',
    },
    {
      icon: <AlertCircle size={22} color="#c8102e" />,
      bg: '#fef2f2',
      title: '2. Informational Use Only — No Professional Tax, Legal, or Medical Advice',
      titleNep: '२. जानकारीमूलक प्रयोजन मात्र — आधिकारिक कानुनी वा वित्तीय सल्लाह होइन',
      body: 'While our engineering team updates tax brackets (FY 2083/84), customs baggage rules, NEPSE broker commissions, municipal land rates, and health formulas using published Nepal Government acts and directives, all outputs are provided for educational and estimation purposes only. You are solely responsible for verifying final figures with the Inland Revenue Department (IRD), Department of Customs, your commercial bank, a licensed legal advocate, or a medical professional before making binding decisions.',
    },
    {
      icon: <Shield size={22} color="#059669" />,
      bg: '#ecfdf5',
      title: '3. Acceptable Use & Intellectual Property',
      titleNep: '३. बौद्धिक सम्पत्ति र उचित प्रयोगको नियम',
      body: 'You may freely use our calculators, copy calculation summaries, and print generated legal agreements (such as Rent Agreements, Partnership Deeds, and AOA drafts) for personal, academic, or internal business use. However, automated scraping of our custom calculation engines, framing our website for commercial resale, or attempting to disrupt site availability is strictly prohibited.',
    },
    {
      icon: <FileText size={22} color="#d97706" />,
      bg: '#fffbeb',
      title: '4. Third-Party Links, APIs & Advertisements',
      titleNep: '४. बाह्य लिङ्क, विज्ञापन तथा बजार दर स्रोतहरू',
      body: 'Nepali Calc may display third-party advertisements (including Google AdSense) and helpful external reference links (such as official government portals or partner document utilities). We do not control or endorse the privacy practices or content of external websites. Live market indicators (such as Gold/Silver Tola rates or NRB foreign exchange rates) are subject to upstream feed availability and may differ slightly from physical counter rates.',
    },
    {
      icon: <Gavel size={22} color="#4f46e5" />,
      bg: '#eef2ff',
      title: '5. Limitation of Liability & Governing Law',
      titleNep: '५. दायित्वको सीमा र प्रचलित नेपाल कानुन',
      body: 'Nepali Calc is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, express or implied. Under no circumstances shall Nepali Calc, Chalise Tech, or its contributors be liable for any direct, indirect, incidental, or consequential damages arising from the use of—or inability to use—our tools. These Terms of Service are governed by and construed in accordance with the prevailing laws of Nepal.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service — Nepali Calc',
    description: 'Terms of Service and Conditions of Use for Nepali Calc.',
    url: `${SITE_CONFIG.url}/terms-of-service`,
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero Banner */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 80%)',
          padding: 'clamp(44px, 6vw, 72px) 20px 40px',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#003893',
              fontSize: '12.5px',
              fontWeight: 800,
              marginBottom: '18px',
            }}
          >
            <Scale size={15} />
            <span>Effective Date: October 30, 2026 • प्रयोगका सर्तहरू</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Terms of Service &amp; Conditions of Use
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Please read these Terms of Service carefully before using the calculators, legal document generators, and informational guides on Nepali Calc (nepalicalc.com).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: 'clamp(36px, 5vw, 56px) 20px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {terms.map((item) => (
              <div
                key={item.title}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 3vw, 28px)',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: item.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                      {item.title}
                    </h2>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#64748b' }}>{item.titleNep}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Related Legal Links */}
          <div
            style={{
              marginTop: '32px',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              padding: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                Related Legal &amp; Compliance Documents
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                Review our Privacy Policy, Disclaimer, or reach out to our team with questions.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13.5px', fontWeight: 700 }}>
              <Link href="/privacy-policy" style={{ color: '#003893', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link href="/disclaimer" style={{ color: '#003893', textDecoration: 'none' }}>
                Disclaimer
              </Link>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link href="/contact" style={{ color: '#0f172a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Contact Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

