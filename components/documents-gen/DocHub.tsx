'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { DOC_GENERATORS } from '@/lib/documents/meta';
import { DocIcon } from './DocIcon';

/** Card grid used on the hub page and the homepage section */
export function DocCards() {
  const { t, language } = useLanguage();
  const ne = language === 'ne';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14 }}>
      {DOC_GENERATORS.map((d) => (
        <Link
          key={d.slug}
          href={d.href}
          id={`doc-card-${d.slug}`}
          className="hover-lift"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 16px',
            borderRadius: '16px',
            backgroundColor: d.bgLight,
            border: `1.5px solid ${d.color}25`,
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
            transition: 'all 0.18s ease',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: '#ffffff',
              color: d.color,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            <DocIcon name={d.icon} size={20} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ne ? d.titleNe : d.titleEn}
              </h3>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {d.actNe}
            </p>
          </div>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              backgroundColor: '#ffffff',
              color: d.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            }}
          >
            <ArrowRight size={14} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function DocHomeSection() {
  const { t } = useLanguage();
  return (
    <section id="document-generators" className="container" style={{ padding: '24px 20px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>📜</span>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
            {t('Legal Document Generators', 'कानुनी कागजात जेनेरेटर')}
          </h2>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            • {t('Free & Print-ready', 'निःशुल्क र छाप्न मिल्ने')}
          </span>
        </div>
        <Link href="/document-generators" style={{ fontSize: 12.5, fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}>
          {t('View all', 'सबै हेर्नुहोस्')} →
        </Link>
      </div>
      <DocCards />
    </section>
  );
}

export default function DocHub() {
  const { t } = useLanguage();
  return (
    <div className="container" style={{ padding: '40px 20px 72px' }}>
      <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, margin: '0 0 8px' }}>
        {t('Legal Document Generators', 'कानुनी कागजात जेनेरेटर')}
      </h1>
      <p style={{ margin: '0 0 28px', color: 'var(--text-muted,#64748b)', maxWidth: 620 }}>
        {t('Fill a form, see the Nepali document live, print or save as PDF. Free, private, no sign-up.', 'फारम भर्नुहोस्, नेपाली कागजात हेर्नुहोस्, प्रिन्ट वा PDF गर्नुहोस्। निःशुल्क, गोप्य, साइन-अप चाहिँदैन।')}
      </p>
      <DocCards />
    </div>
  );
}
