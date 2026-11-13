'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface MobileInstantResultProps {
  primaryLabel: string;
  primaryValue: string;
  primarySubtext?: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  tertiaryLabel?: string;
  tertiaryValue?: string;
  badge?: string;
  onCopy?: () => void;
  copied?: boolean;
  accentColor?: 'emerald' | 'blue' | 'amber' | 'rose' | 'purple';
  targetDetailsId?: string;
}

export function MobileInstantResult({
  primaryLabel,
  primaryValue,
  primarySubtext,
  secondaryLabel,
  secondaryValue,
  tertiaryLabel,
  tertiaryValue,
  badge,
  onCopy,
  copied = false,
  accentColor = 'emerald',
  targetDetailsId,
}: MobileInstantResultProps) {
  const { t } = useLanguage();
  const pillRef = useRef<HTMLDivElement>(null);
  const [isPillInView, setIsPillInView] = useState<boolean>(true);

  // Monitor when the top pill scrolls out of the viewport
  useEffect(() => {
    const el = pillRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPillInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colorMap = {
    emerald: {
      text: '#34d399',
      border: 'rgba(52, 211, 153, 0.3)',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeText: '#6ee7b7',
    },
    blue: {
      text: '#60a5fa',
      border: 'rgba(96, 165, 250, 0.3)',
      badgeBg: 'rgba(37, 99, 235, 0.15)',
      badgeText: '#93c5fd',
    },
    amber: {
      text: '#fbbf24',
      border: 'rgba(251, 191, 36, 0.3)',
      badgeBg: 'rgba(217, 119, 6, 0.15)',
      badgeText: '#fde68a',
    },
    rose: {
      text: '#f87171',
      border: 'rgba(248, 113, 113, 0.3)',
      badgeBg: 'rgba(225, 29, 72, 0.15)',
      badgeText: '#fca5a5',
    },
    purple: {
      text: '#c084fc',
      border: 'rgba(192, 132, 252, 0.3)',
      badgeBg: 'rgba(147, 51, 234, 0.15)',
      badgeText: '#e9d5ff',
    },
  };

  const activeColor = colorMap[accentColor] || colorMap.emerald;

  const handleScrollToDetails = () => {
    if (targetDetailsId) {
      const el = document.getElementById(targetDetailsId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Fallback: scroll 400px down
    window.scrollBy({ top: 450, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. ABOVE-THE-FOLD MOBILE INSTANT RESULT PILL */}
      <div
        ref={pillRef}
        className="mobile-instant-pill"
        style={{
          borderLeft: `4px solid ${activeColor.text}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                background: activeColor.badgeBg,
                color: activeColor.badgeText,
              }}
            >
              <Sparkles size={11} />
              {badge || t('Instant Calculation', 'तत्काल हिसाब')}
            </span>
          </div>

          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '3px 9px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
              <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy', 'कपी')}</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#94a3b8' }}>
              {primaryLabel}
            </span>
            <div
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: activeColor.text,
                lineHeight: 1.1,
                fontFamily: 'var(--font-mono)',
                marginTop: '2px',
              }}
            >
              {primaryValue}
            </div>
            {primarySubtext && (
              <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', display: 'block' }}>
                {primarySubtext}
              </span>
            )}
          </div>

          {secondaryValue && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', color: '#94a3b8' }}>
                {secondaryLabel}
              </span>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.15,
                  marginTop: '2px',
                }}
              >
                {secondaryValue}
              </div>
              {tertiaryValue && (
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                  {tertiaryLabel ? `${tertiaryLabel}: ` : ''}{tertiaryValue}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. FLOATING STICKY BOTTOM BAR (Visible on mobile only when scrolled past the top pill) */}
      <div
        className="mobile-sticky-result-bar"
        style={{
          transform: isPillInView ? 'translateY(120%)' : 'translateY(0)',
          opacity: isPillInView ? 0 : 1,
          pointerEvents: isPillInView ? 'none' : 'auto',
          transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#94a3b8',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {primaryLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '19px',
                fontWeight: 800,
                color: activeColor.text,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.15,
              }}
            >
              {primaryValue}
            </span>
            {secondaryValue && (
              <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600 }}>
                • {secondaryLabel}: <span style={{ color: '#ffffff' }}>{secondaryValue}</span>
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
              <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleScrollToDetails}
            aria-label="View breakdown"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: activeColor.badgeBg,
              border: `1px solid ${activeColor.border}`,
              color: activeColor.badgeText,
              cursor: 'pointer',
            }}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

