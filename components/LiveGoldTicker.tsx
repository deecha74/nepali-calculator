'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';
import { useLanguage } from '@/components/LanguageContext';

export function LiveGoldTicker() {
  const [rates, setRates] = useState({
    fineGold24K: DEFAULT_GOLD_RATES.fineGold24K,
    tejabiGold22K: DEFAULT_GOLD_RATES.tejabiGold22K,
    silver: DEFAULT_GOLD_RATES.silver,
    usdNpr: 153.44,
    isLive: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    async function fetchLive() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.gold) {
            setRates({
              fineGold24K: data.gold.fineGold24K || DEFAULT_GOLD_RATES.fineGold24K,
              tejabiGold22K: data.gold.tejabiGold22K || DEFAULT_GOLD_RATES.tejabiGold22K,
              silver: data.gold.silverPerTola || DEFAULT_GOLD_RATES.silver,
              usdNpr: data.forex?.USD || data.forex?.usdToNpr || 153.44,
              isLive: true,
            });
          }
        }
      } catch (e) {
        // Fallback to defaults gracefully
      }
    }
    fetchLive();
    return () => {
      isMounted = false;
    };
  }, []);

  // Announcements array for one-by-one auto-scroll on mobile
  const announcements = [
    {
      id: 'fine-gold',
      label: t('Fine Gold (24K):', 'छापावाल सुन (२४K):'),
      value: `${t('NPR', 'रु')} ${rates.fineGold24K.toLocaleString('en-IN')}/${t('tola', 'तोला')}`,
      valueColor: '#fef08a',
      href: '/gold',
    },
    {
      id: 'tejabi-gold',
      label: t('Tejabi (22K):', 'तेजाबी सुन (२२K):'),
      value: `${t('NPR', 'रु')} ${rates.tejabiGold22K.toLocaleString('en-IN')}/${t('tola', 'तोला')}`,
      valueColor: '#fde047',
      href: '/gold',
    },
    {
      id: 'silver',
      label: t('Silver:', 'चाँदी:'),
      value: `${t('NPR', 'रु')} ${rates.silver.toLocaleString('en-IN')}/${t('tola', 'तोला')}`,
      valueColor: '#ffffff',
      href: '/gold',
    },
    {
      id: 'forex-usd',
      label: 'USD 1 =',
      value: `रू ${rates.usdNpr}`,
      valueColor: '#6ee7b7',
      href: '/forex',
    },
    {
      id: 'jewelry-making',
      label: t('Jewelry & Jarti:', 'गहना र जर्ती:'),
      value: t('Calculate →', 'हिसाब गर्नुहोस् →'),
      valueColor: '#fde047',
      href: '/gold',
    },
  ];

  // Auto-scroll one-by-one on mobile every 3.2 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const currentItem = announcements[activeIndex];

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #002266 0%, #003893 50%, #002266 100%)',
        borderBottom: '1.5px solid #3b82f6',
        boxShadow: '0 2px 12px rgba(0, 56, 147, 0.3), inset 0 -1px 0 rgba(59, 130, 246, 0.25)',
        color: '#ffffff',
        fontSize: '12px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        {/* ============================================================== */}
        {/* MOBILE VIEW: Single item one-by-one auto-scroller (< 768px)    */}
        {/* ============================================================== */}
        <div
          className="ticker-mobile"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Live indicator badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              paddingRight: '8px',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: rates.isLive ? '#10b981' : '#ef4444',
                boxShadow: rates.isLive ? '0 0 8px #10b981' : '0 0 8px #ef4444',
                display: 'inline-block',
                animation: 'pulseGlow 2s infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: '10.5px',
                color: '#fde047',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {rates.isLive ? t('LIVE', 'प्रत्यक्ष') : t('RATES', 'दर')}
            </span>
          </div>

          {/* Active rotating item with smooth transition */}
          <Link
            href={currentItem.href}
            key={currentItem.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              paddingLeft: '10px',
              paddingRight: '6px',
              animation: 'tickerFadeSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span style={{ color: '#bfdbfe', fontSize: '11px', whiteSpace: 'nowrap' }}>
              {currentItem.label}
            </span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '11.5px',
                color: currentItem.valueColor,
                whiteSpace: 'nowrap',
              }}
            >
              {currentItem.value}
            </span>
          </Link>

          {/* Right indicator: item count + tap action */}
          <Link
            href="/gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              color: '#bfdbfe',
              fontSize: '10px',
              fontWeight: 700,
              textDecoration: 'none',
              flexShrink: 0,
              paddingLeft: '6px',
              whiteSpace: 'nowrap',
            }}
            title={t('View all live gold rates', 'सम्पूर्ण प्रत्यक्ष दर हेर्नुहोस्')}
          >
            <span style={{ color: '#93c5fd' }}>
              {activeIndex + 1}/{announcements.length}
            </span>
            <ChevronRight size={13} color="#fde047" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW: Full row ticker with all rates (>= 768px)         */}
        {/* ============================================================== */}
        <div
          className="ticker-desktop"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: rates.isLive ? '#10b981' : '#ef4444',
                  boxShadow: rates.isLive ? '0 0 8px #10b981' : '0 0 8px #ef4444',
                  display: 'inline-block',
                  animation: 'pulseGlow 2s infinite',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 800, color: '#fde047', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                {rates.isLive ? t('LIVE MARKET RATES:', 'प्रत्यक्ष लाइभ दर:') : t('OFFICIAL RATES:', 'आधिकारिक दर:')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#bfdbfe' }}>{t('Fine Gold (24K):', 'छापावाल सुन (२४K):')}</span>
              <span style={{ fontWeight: 800, color: '#fef08a' }}>
                {t('NPR', 'रु')} {rates.fineGold24K.toLocaleString('en-IN')}/{t('tola', 'तोला')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#bfdbfe' }}>{t('Silver:', 'चाँदी:')}</span>
              <span style={{ fontWeight: 800, color: '#ffffff' }}>
                {t('NPR', 'रु')} {rates.silver.toLocaleString('en-IN')}/{t('tola', 'तोला')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#bfdbfe' }}>USD 1 =</span>
              <span style={{ fontWeight: 800, color: '#6ee7b7' }}>
                रू {rates.usdNpr}
              </span>
            </div>
          </div>

          <Link
            href="/gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#fde047',
              fontWeight: 700,
              fontSize: '11px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>
              {t('Calculate Jewelry Making Charges', 'गहना बनाउने ज्याला र जर्ती हिसाब')}
            </span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
