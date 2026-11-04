import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Lock,
  Cookie,
  EyeOff,
  Server,
  Globe,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — Cookie, AdSense & Data Protection Policy',
  description:
    'Read the official Privacy Policy of Nepali Calc (nepalicalc.com), covering 100% client-side calculation privacy, Google AdSense cookies, analytics, and user data rights →',
  path: '/privacy-policy',
  keywords: [
    'nepali calc privacy policy',
    'nepalicalc.com privacy',
    'client side calculator privacy nepal',
    'cookie policy nepalicalc',
  ],
});

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Lock size={22} color="#003893" />,
      bg: '#eff6ff',
      title: '1. 100% Client-Side Financial & Personal Calculation Privacy',
      titleNep: '१. १००% ब्राउजर-भित्रै हुने गोप्य र सुरक्षित हिसाब',
      body: 'At Nepali Calc (https://nepalicalc.com), your financial, academic, health, and legal inputs belong strictly to you. All numbers you enter into our calculators—including monthly salary, Social Security Fund (SSF) deductions, bank loan amounts, land parcel dimensions, NEPSE stock holdings, pregnancy due dates, or legal agreement fields—are processed locally inside your web browser using JavaScript. We do not transmit, store, log, or sell your calculation inputs to any remote database or third party.',
    },
    {
      icon: <Cookie size={22} color="#d97706" />,
      bg: '#fffbeb',
      title: '2. Local Browser Storage & Essential Preferences',
      titleNep: '२. स्थानीय ब्राउजर भण्डारण (LocalStorage) र प्राथमिक सेटिङ',
      body: 'To improve your user experience, Nepali Calc uses your browser’s built-in localStorage for strictly functional preferences—such as remembering your chosen interface language (English or नेपाली), saving your cookie consent choice, and keeping temporary drafts in the Legal Document Generators so you do not lose work if you refresh the page. You can clear this local data at any time using the "Clear all" button inside our tools or via your browser settings.',
    },
    {
      icon: <Globe size={22} color="#059669" />,
      bg: '#ecfdf5',
      title: '3. Google AdSense & Third-Party Advertising Cookies',
      titleNep: '३. गूगल एडसेन्स (Google AdSense) र विज्ञापन कुकीज सम्बन्धी जानकारी',
      body: 'To keep all 70+ calculators free for the public, we may display advertisements served by Google AdSense and certified third-party ad networks. Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve ads based on a user’s prior visits to nepalicalc.com or other websites on the internet. Google’s use of advertising cookies enables it and its partners to serve relevant ads to you. You may opt out of personalized advertising at any time by visiting Google Ads Settings (https://adssettings.google.com) or www.aboutads.info.',
    },
    {
      icon: <Server size={22} color="#4f46e5" />,
      bg: '#eef2ff',
      title: '4. Web Analytics, Server Logs & Live Rate APIs',
      titleNep: '४. वेबसाइट ट्राफिक विश्लेषण र लाइभ मार्केट दर',
      body: 'We use aggregated, anonymized analytics (Google Analytics 4) to understand which calculators are most helpful, measure page load speed across devices, and identify broken links. Standard web server logs record non-personal technical metadata such as browser type, referring page, and anonymized IP region. When you open live-rate pages (such as Gold/Silver Bullion, NRB Forex, or Daily Rashifal), our server fetches public rate feeds without attaching any personal identifier to your session.',
    },
    {
      icon: <EyeOff size={22} color="#c8102e" />,
      bg: '#fef2f2',
      title: '5. Your Privacy Rights (Nepal Privacy Act 2075, GDPR & CCPA)',
      titleNep: '५. वैयक्तिक गोपनीयता ऐन २०७५ र प्रयोगकर्ताको अधिकार',
      body: 'In compliance with the Individual Privacy Act, 2075 (वैयक्तिक गोपनीयता सम्बन्धी ऐन, २०७५) of Nepal as well as international standards (GDPR and CCPA for global Nepali diaspora visitors), you have the right to browse our tools without creating an account, reject non-essential cookies via our Cookie Consent Banner, and request deletion of any email correspondence you send to our support team.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — Nepali Calc',
    description: 'Privacy Policy of Nepali Calc covering client-side calculation privacy, cookies, and analytics.',
    url: `${SITE_CONFIG.url}/privacy-policy`,
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero Header */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 0%, #eff6ff 0%, #ffffff 80%)',
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
            <ShieldCheck size={15} />
            <span>Last Updated: October 30, 2026 • गोपनीयता नीति</span>
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
            Privacy Policy &amp; Cookie Disclosure
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Nepali Calc is built on a privacy-first architecture. Learn how we protect your calculation data, how browser storage and advertising cookies work, and how you control your privacy preferences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: 'clamp(36px, 5vw, 56px) 20px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {sections.map((sec) => (
              <div
                key={sec.title}
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
                      backgroundColor: sec.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {sec.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                      {sec.title}
                    </h2>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#64748b' }}>{sec.titleNep}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.75, margin: 0 }}>{sec.body}</p>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          <div
            style={{
              marginTop: '32px',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Mail size={20} color="#003893" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Questions About Privacy or Data Protection?
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '0 0 16px' }}>
              If you have any questions regarding this Privacy Policy, cookie disclosures, or data handling practices on <strong>nepalicalc.com</strong>, please contact our team directly:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', fontSize: '13.5px', fontWeight: 700 }}>
              <a href="mailto:contact@nepalicalc.com" style={{ color: '#003893', textDecoration: 'underline' }}>
                contact@nepalicalc.com
              </a>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link href="/contact" style={{ color: '#0f172a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Contact Us Page</span>
                <ArrowRight size={14} />
              </Link>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link href="/terms-of-service" style={{ color: '#475569', textDecoration: 'none' }}>
                Terms of Service
              </Link>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link href="/disclaimer" style={{ color: '#475569', textDecoration: 'none' }}>
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

