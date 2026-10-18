'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';

interface LiveGoldQuickAnswerProps {
  unit: 'tola' | 'gram' | 'lal';
  amount?: number;
  slug: string;
  headlineAnswer: string;
  conversionFormula: string;
}

export function LiveGoldQuickAnswer({
  unit,
  amount = 1,
  slug,
  headlineAnswer,
  conversionFormula,
}: LiveGoldQuickAnswerProps) {
  const [rates, setRates] = useState({
    fineGold24K: DEFAULT_GOLD_RATES.fineGold24K,
    tejabiGold22K: DEFAULT_GOLD_RATES.tejabiGold22K,
    silver: DEFAULT_GOLD_RATES.silver,
    fineGold10g: DEFAULT_GOLD_RATES.fineGold10g,
    silver10g: DEFAULT_GOLD_RATES.silver10g,
    dailyChangeNpr: DEFAULT_GOLD_RATES.dailyChangeNpr,
    dailyChangePercent: DEFAULT_GOLD_RATES.dailyChangePercent,
    isLive: false,
    source: 'FENEGOSIDA Official Live',
  });

  const [isLoading, setIsLoading] = useState(false);

  async function fetchLive() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/live-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.gold) {
          setRates({
            fineGold24K: data.gold.fineGold24K || DEFAULT_GOLD_RATES.fineGold24K,
            tejabiGold22K: data.gold.tejabiGold22K || DEFAULT_GOLD_RATES.tejabiGold22K,
            silver: data.gold.silverPerTola || DEFAULT_GOLD_RATES.silver,
            fineGold10g: data.gold.fineGold10g || DEFAULT_GOLD_RATES.fineGold10g,
            silver10g: data.gold.silver10g || DEFAULT_GOLD_RATES.silver10g,
            dailyChangeNpr: data.gold.dailyChangeNpr ?? DEFAULT_GOLD_RATES.dailyChangeNpr,
            dailyChangePercent: data.gold.dailyChangePercent ?? DEFAULT_GOLD_RATES.dailyChangePercent,
            isLive: true,
            source: data.source || 'FENEGOSIDA Official Live',
          });
        }
      }
    } catch (e) {
      // Fallback silently
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLive();
  }, []);

  // Compute live price based on the page's unit/amount
  const isSilver = slug.includes('silver');
  const isTejabi = slug.includes('tejabi');

  const computePrice = (metal: 'fine' | 'tejabi' | 'silver') => {
    if (metal === 'silver') {
      if (unit === 'gram') {
        return Math.round((rates.silver10g / 10) * amount);
      }
      return Math.round(rates.silver * amount);
    }

    const baseTola = metal === 'fine' ? rates.fineGold24K : rates.tejabiGold22K;
    const base10g = metal === 'fine' ? rates.fineGold10g : Math.round((baseTola / 11.6638) * 10);

    if (slug.includes('1-lal')) {
      return Math.round(baseTola / 100);
    } else if (slug.includes('8-gram')) {
      return Math.round((base10g / 10) * 8);
    } else if (unit === 'gram') {
      return Math.round((base10g / 10) * amount);
    } else {
      return Math.round(baseTola * amount);
    }
  };

  const currentFinePrice = computePrice('fine');
  const currentTejabiPrice = computePrice('tejabi');
  const currentSilverPrice = computePrice('silver');

  const isNegative = rates.dailyChangeNpr < 0;

  return (
    <div
      className="white-card"
      style={{
        padding: '24px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
        border: '1px solid #fde68a',
        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {rates.isLive ? 'FENEGOSIDA Official Live' : 'Market Rates Active'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: isNegative ? '#b91c1c' : '#047857' }}>
            {isNegative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            <span>
              {isNegative ? '' : '+'}रू {Math.abs(rates.dailyChangeNpr).toLocaleString('en-IN')} ({rates.dailyChangePercent}%)
            </span>
          </div>
        </div>

        <button
          onClick={fetchLive}
          title="Refresh Live Rates"
          disabled={isLoading}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#b45309',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          <RefreshCw size={13} className={isLoading ? 'spin' : ''} />
          <span>{isLoading ? 'Updating...' : 'Live Sync'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '15px', color: '#78350f', lineHeight: '1.65', margin: 0, fontWeight: 500 }}>
            {headlineAnswer}
          </p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#92400e' }}>
            <ShieldCheck size={14} color="#059669" />
            <span>Standard: {conversionFormula}</span>
          </div>
        </div>

        {/* Live Dynamic Price Highlight Pill */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #fcd34d',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {!isSilver ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>24K Hallmark (छापावाल):</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#d97706', fontFamily: 'var(--font-mono)' }}>
                  रु {currentFinePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ height: '1px', background: '#f1f5f9' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>22K Tejabi (तेजाबी):</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#b45309', fontFamily: 'var(--font-mono)' }}>
                  रु {currentTejabiPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Pure Silver (चाँदी):</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                रु {currentSilverPrice.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
