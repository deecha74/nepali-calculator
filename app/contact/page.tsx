import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Us — Feedback, Tariff Updates & Support | Nepali Calc',
  description:
    'Contact the Nepali Calc engineering and editorial team at Chalise Tech (Kathmandu, Nepal) for tax slab updates, calculator suggestions, or support →',
  path: '/contact',
  keywords: [
    'contact nepali calc',
    'nepalicalc support email',
    'chalise tech contact kathmandu',
    'report calculator update nepal',
  ],
});

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 80%)',
          padding: 'clamp(44px, 6vw, 72px) 20px 40px',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            <MessageSquare size={15} />
            <span>We Respond Within 24 Hours • सम्पर्क माध्यम</span>
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
            Contact Us &amp; Report Statutory Updates
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            Have a question about a calculation formula, spotted a new Nepal Gazette tariff revision, or want to request a new tool? Reach out directly to our engineering and editorial team.
          </p>
        </div>
      </section>

      {/* Contact Cards + Inquiry Guide */}
      <section style={{ padding: 'clamp(36px, 5vw, 56px) 20px 0' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            {/* Card 1: General & Editorial */}
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Mail size={22} color="#003893" />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                General &amp; Editorial Inquiries
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
                For feedback, partnership inquiries, media questions, or general correspondence:
              </p>
              <a
                href="mailto:contact@nepalicalc.com"
                style={{ fontSize: '14.5px', fontWeight: 800, color: '#003893', textDecoration: 'underline' }}
              >
                contact@nepalicalc.com
              </a>
            </div>

            {/* Card 2: Technical & Tariff Support */}
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <ShieldCheck size={22} color="#059669" />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Formula &amp; Law Update Desk
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
                Found a bug or a newly published IRD, NRB, DOTM, or municipal tax rate update?
              </p>
              <a
                href="mailto:support@nepalicalc.com"
                style={{ fontSize: '14.5px', fontWeight: 800, color: '#059669', textDecoration: 'underline' }}
              >
                support@nepalicalc.com
              </a>
            </div>

            {/* Card 3: Organization & Location */}
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <MapPin size={22} color="#d97706" />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Publisher &amp; Location
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 8px' }}>
                <strong>Chalise Tech</strong> (Engineering &amp; Digital Public Utilities)
              </p>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#334155' }}>
                Kathmandu, Bagmati Province, Nepal
              </div>
            </div>
          </div>

          {/* Direct Email Action Box */}
          <div
            style={{
              border: '1.5px solid #cbd5e1',
              borderRadius: '18px',
              backgroundColor: '#f8fafc',
              padding: 'clamp(24px, 4vw, 36px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Building2 size={20} color="#003893" />
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                How to Submit a Tariff Update or Feature Request
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.75, margin: '0 0 18px' }}>
              When reporting a statutory rate update (such as a provincial Bluebook tax revision or municipal Ghar Jagga Kar rate table), please include the name of the calculator URL and, if available, a link or photo of the relevant Nepal Rajpatra (नेपाल राजपत्र) or municipal Finance Act notice. Our engineering team verifies and deploys verified statutory updates within 24 to 48 hours.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <a
                href="mailto:contact@nepalicalc.com?subject=Nepali%20Calc%20Inquiry%20%2F%20Feedback"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#003893',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                <Mail size={16} />
                <span>Send Email to contact@nepalicalc.com</span>
              </a>

              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <span>Learn More About Us</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

