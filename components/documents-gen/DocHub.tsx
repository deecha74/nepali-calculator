'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { DOC_GENERATORS } from '@/lib/documents/meta';
import { DocIcon } from './DocIcon';

/** Individual Card item component */
function DocCardItem({ d, ne }: { d: (typeof DOC_GENERATORS)[number]; ne: boolean }) {
  return (
    <Link
      href={d.href}
      id={`doc-card-${d.slug}`}
      className="hover-lift doc-carousel-item"
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
        scrollSnapAlign: 'start',
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
          <h3
            style={{
              margin: 0,
              fontSize: 14.5,
              fontWeight: 800,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {ne ? d.titleNe : d.titleEn}
          </h3>
        </div>
        <p
          style={{
            margin: '2px 0 0',
            fontSize: 12,
            color: '#64748b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
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
  );
}

/** Card grid used on the hub page */
export function DocCards() {
  const { language } = useLanguage();
  const ne = language === 'ne';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 14 }}>
      {DOC_GENERATORS.map((d) => (
        <DocCardItem key={d.slug} d={d} ne={ne} />
      ))}
    </div>
  );
}

export function DocHomeSection() {
  const { t, language } = useLanguage();
  const ne = language === 'ne';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const idx = Math.round(el.scrollLeft / (cardWidth + 12));
    setActiveIdx(Math.min(Math.max(idx, 0), DOC_GENERATORS.length - 1));
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const offset = direction === 'left' ? -(cardWidth + 12) : cardWidth + 12;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    el.scrollTo({ left: idx * (cardWidth + 12), behavior: 'smooth' });
  };

  return (
    <section id="document-generators" className="container" style={{ padding: '24px 20px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', gap: 8, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, overflow: 'hidden' }}>
          <span style={{ fontSize: 17, flexShrink: 0 }}>📜</span>
          <h2 style={{ fontSize: 'clamp(14px, 3.8vw, 18px)', fontWeight: 800, margin: 0, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t('Legal Document Generators', 'कानुनी कागजात जेनेरेटर')}
          </h2>
          <span className="doc-subtag-hide-mobile" style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
            • {t('Free & Print-ready', 'निःशुल्क र छाप्न मिल्ने')}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <Link href="/document-generators" style={{ fontSize: 12, fontWeight: 700, color: '#4f46e5', textDecoration: 'none', whiteSpace: 'nowrap', marginRight: 2 }}>
            {t('View all', 'सबै')} →
          </Link>
          <div className="doc-carousel-arrows" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous documents"
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                opacity: canScrollLeft ? 1 : 0.35,
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                padding: 0,
              }}
            >
              <ChevronLeft size={15} color="#0f172a" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next documents"
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                opacity: canScrollRight ? 1 : 0.35,
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                padding: 0,
              }}
            >
              <ChevronRight size={15} color="#0f172a" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="doc-carousel-track"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: 12,
          padding: '4px 2px 10px',
          scrollbarWidth: 'none',
        }}
      >
        {DOC_GENERATORS.map((d) => (
          <DocCardItem key={d.slug} d={d} ne={ne} />
        ))}
      </div>

      <div
        className="doc-carousel-dots"
        style={{
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          marginTop: 2,
          marginBottom: 10,
        }}
      >
        {DOC_GENERATORS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: activeIdx === i ? 18 : 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: activeIdx === i ? '#4f46e5' : '#cbd5e1',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
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
