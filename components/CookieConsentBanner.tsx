'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('nepalcalc_cookie_consent');
      if (!consent) {
        // Show after a slight delay for smooth entrance
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage may be disabled in some incognito settings
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('nepalcalc_cookie_consent', 'all');
    } catch (e) {}
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('nepalcalc_cookie_consent', 'essential');
    } catch (e) {}
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      aria-label="Privacy and cookie consent"
      role="region"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: '560px',
        margin: '0 auto',
        zIndex: 9999,
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.16), 0 4px 12px rgba(15, 23, 42, 0.08)',
        padding: '16px 18px',
        animation: 'slideUpFade 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#eff6ff',
            color: '#003893',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <ShieldCheck size={20} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
            <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
              {t('Privacy & Cookie Consent', 'गोपनीयता तथा कुकीज सहमति')}
            </h4>
            <button
              type="button"
              onClick={handleEssentialOnly}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                padding: '4px',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>

          <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, margin: '0 0 12px' }}>
            {t(
              'NepalCalc stores your inputs locally in your browser to save bookmarks, preferences, and calculations. No salary, bank, or personal data is collected or sent to external servers.',
              'नेपालक्याल्कले तपाईंको हिसाब, बुकमार्क र रोजाइ सुरक्षित राख्न स्थानीय ब्राउजर भण्डारण प्रयोग गर्दछ। कुनै पनि तलब वा वित्तीय विवरण बाह्य सर्भरमा जाँदैन।'
            )}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleAccept}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#003893',
                color: '#ffffff',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 56, 147, 0.25)',
                transition: 'background-color 0.15s ease',
              }}
            >
              <Check size={14} />
              <span>{t('Accept All', 'स्वीकार गर्नुहोस्')}</span>
            </button>

            <button
              type="button"
              onClick={handleEssentialOnly}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{t('Essential Only', 'आवश्यक मात्र')}</span>
            </button>

            <Link
              href="/documents"
              style={{
                fontSize: '11.5px',
                color: '#64748b',
                textDecoration: 'underline',
                marginLeft: 'auto',
              }}
            >
              {t('Learn more', 'थप विवरण')}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
