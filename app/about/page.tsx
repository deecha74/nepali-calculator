import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  Zap, 
  Scale, 
  TrendingUp, 
  Landmark, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Lock,
  Cpu,
  Globe2,
  Users
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { NepalCalcLogo } from '@/components/NepalCalcLogo';

export const metadata: Metadata = constructMetadata({
  title: "About Us — Mission, Precision & Privacy at Nepali Calc",
  description: "Learn about Nepali Calc, an engineering initiative by Chalise Tech founded by Deepak Chalise to provide accurate, client-side private, and officially verified calculators for Nepal.",
  path: "/about",
  keywords: [
    "about nepali calc",
    "chalise tech nepal",
    "deepak chalise software engineer",
    "nepal official calculator portal",
    "client-side private tax calculator nepal"
  ]
});

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Lock size={22} color="#003893" />,
      title: "100% Client-Side Privacy",
      titleNep: "१००% गोप्य र सुरक्षित",
      desc: "Your salary, loan balances, tax records, and land areas never leave your device. All algorithms execute directly in your browser. No trackers, no databases, no financial profiling.",
      bg: "#eff6ff"
    },
    {
      icon: <Scale size={22} color="#c8102e" />,
      title: "Official Government Laws",
      titleNep: "आधिकारिक ऐन तथा कानुन",
      desc: "Our models are strictly coded against the Nepal Finance Act 2083/84, Labour Act 2074, Nepal Rastra Bank (NRB) Directives, FENEGOSIDA gold standards, and DOTM rules.",
      bg: "#fef2f2"
    },
    {
      icon: <Zap size={22} color="#d97706" />,
      title: "Instant Offline-First Performance",
      titleNep: "तीव्र गति र अफलाइन सुलभ",
      desc: "Built with cutting-edge web architecture to load in under a second across all 7 provinces of Nepal, even on rural 3G/4G cellular connections.",
      bg: "#fffbeb"
    },
    {
      icon: <TrendingUp size={22} color="#059669" />,
      title: "Real-Time Official Market APIs",
      titleNep: "प्रत्यक्ष बजार दर (Live APIs)",
      desc: "Direct integration with Nepal Rastra Bank for daily forex, FENEGOSIDA for live gold/silver bullion rates, and Open-Meteo for local weather updates.",
      bg: "#ecfdf5"
    }
  ];

  const milestones = [
    { number: "50+", label: "Specialized Calculators", sub: "Covering Tax, Banking, Land, Utilities & Citizen Tools" },
    { number: "100%", label: "Client-Side Private", sub: "Zero financial data stored on remote servers" },
    { number: "7", label: "Provinces Supported", sub: "Tailored provincial vehicle and municipality tax slabs" },
    { number: "0", label: "Third-Party Data Sale", sub: "Committed to public service utility and education" }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Top Hero Section */}
      <section 
        style={{ 
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 80%)',
          padding: 'clamp(48px, 6vw, 80px) 20px 48px',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', fontSize: '12.5px', fontWeight: 800, marginBottom: '20px' }}>
            <Award size={15} />
            <span>Built by Chalise Tech • Empowering Nepal Digitally</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '18px' }}>
            Empowering Every Nepali with <span style={{ color: '#003893' }}>Accurate</span>, <span style={{ color: '#c8102e' }}>Private</span> & <span style={{ color: '#d97706' }}>Instant</span> Calculations
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: '#475569', lineHeight: 1.7, margin: '0 auto 28px' }}>
            Nepali Calc was engineered from the ground up to eliminate calculation headaches, opaque jeweler invoices, confusing bank amortizations, and complex municipal land tax tables for citizens in Nepal and the worldwide diaspora.
          </p>

          <div className="mobile-stack-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link 
              href="/#all-tools" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#003893',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 56, 147, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Explore All 50+ Calculators</span>
              <ArrowRight size={16} />
            </Link>

            <Link 
              href="/blog" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14.5px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Read Tool Guides & Articles</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Stats Counter Strip */}
      <section style={{ padding: '36px 20px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{ padding: '12px' }}>
                <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 900, color: '#003893', letterSpacing: '-0.02em' }}>
                  {m.number}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story & Vision */}
      <section style={{ padding: 'clamp(48px, 6vw, 72px) 20px' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#003893' }}>
              OUR STORY & PHILOSOPHY
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, color: '#0f172a', marginTop: '6px', marginBottom: '16px' }}>
              Why We Built Nepali Calc
            </h2>
            <p style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
              For years, Nepalese citizens navigating everyday financial decisions faced outdated spreadsheets, inaccurate foreign calculator templates, and fragmented government gazettes. Calculating simple things like a salary tax with Social Security Fund deductions, converting Aana to Square Feet for land registration, or estimating bluebook renewal penalties across different provinces required hours of tedious research.
            </p>
            <p style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
              <strong>Nepali Calc</strong> was founded by <strong>Deepak Chalise</strong> under <strong>Chalise Tech</strong> (<a href="https://chalisetech.com" target="_blank" rel="noopener noreferrer" style={{ color: '#003893', fontWeight: 700, textDecoration: 'underline' }}>chalisetech.com</a>) to provide a modern, world-class computational suite designed explicitly for Nepal. Every single calculator reflects current Nepal laws, local vernacular practices (such as সयकडा ब्याज, धार्नी/माना weight units, and Preeti font rendering), and real-time market data.
            </p>
          </div>

          {/* 4 Pillars of Excellence Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '36px' }}>
            {coreValues.map((v, i) => (
              <div 
                key={i} 
                style={{ 
                  backgroundColor: '#ffffff', 
                  border: '1.5px solid #e2e8f0', 
                  borderRadius: '16px', 
                  padding: '24px', 
                  boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Founder & Engineering Team Card */}
      <section style={{ backgroundColor: '#f8fafc', padding: 'clamp(40px, 5vw, 64px) 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div 
            style={{ 
              backgroundColor: '#ffffff', 
              border: '1.5px solid #e2e8f0', 
              borderRadius: '20px', 
              padding: 'clamp(24px, 4vw, 36px)',
              boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#003893', 
                  color: '#ffffff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 900
                }}
              >
                DC
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Deepak Chalise
                </h3>
                <div style={{ fontSize: '13px', color: '#003893', fontWeight: 700, marginTop: '2px' }}>
                  Founder & Principal Architect • Chalise Tech
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  <a href="https://deepakchalise.com.np" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'underline' }}>deepakchalise.com.np</a>
                  {' • '}
                  <a href="https://chalisetech.com" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'underline' }}>chalisetech.com</a>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              &quot;My goal with Nepali Calc is to deliver the highest quality, most transparent, and completely free digital calculation utilities for every citizen in Nepal. We obsess over the finest details—from the mathematical accuracy of SSF tax exemptions down to microsecond font conversions—ensuring you have tools you can rely on with 100% confidence.&quot;
            </p>
          </div>

        </div>
      </section>

      {/* Contact & Support Strip */}
      <section style={{ padding: 'clamp(40px, 5vw, 64px) 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <HeartHandshake size={32} color="#003893" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
            Have Feedback, Inquiries or Law Updates?
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
            We continuously verify our calculators against the latest government gazettes and fiscal revisions. If you notice any tariff change or have a feature suggestion, reach out directly.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '12px', backgroundColor: '#f1f5f9', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
            <span>Email us:</span>
            <a href="mailto:contact@nepalcalc.com" style={{ color: '#003893', textDecoration: 'none' }}>contact@nepalcalc.com</a>
          </div>
        </div>
      </section>

    </div>
  );
}
