'use client';

import React, { useState, useMemo } from 'react';
import { LineChart, Copy, Check, TrendingUp } from 'lucide-react';

export function CagrSavingsCalculator() {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(265000);
  const [years, setYears] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const start = Math.max(1, initialValue);
    const end = Math.max(1, finalValue);
    const n = Math.max(0.5, years);

    const cagrPercent = (Math.pow(end / start, 1 / n) - 1) * 100;
    const absoluteReturnPercent = ((end - start) / start) * 100;
    const netGain = end - start;
    const ruleOf72Years = cagrPercent > 0 ? 72 / cagrPercent : 0;

    return {
      cagrPercent,
      absoluteReturnPercent,
      netGain,
      ruleOf72Years,
    };
  }, [initialValue, finalValue, years]);

  const handleCopy = () => {
    const text = `CAGR & Investment Return Summary:
Initial Investment: NPR ${initialValue.toLocaleString('en-IN')}
Final Maturity Value: NPR ${finalValue.toLocaleString('en-IN')} (${years} Years)
Compound Annual Growth Rate (CAGR): ${calculation.cagrPercent.toFixed(2)}% per year
Total Absolute Return: ${calculation.absoluteReturnPercent.toFixed(2)}%
Calculated on NepalCalc.com/cagr`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LineChart size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              CAGR, Compound Interest & Wealth Growth Calculator
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              चक्रवृद्धि वार्षिक वृद्धिदर (CAGR) तथा लगानी प्रतिफल हिसाब
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy CAGR'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              1. Beginning Investment Value (शुरुको लगानी — NPR):
            </label>
            <input
              type="number"
              min={1}
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e.target.value) || 1)}
              className="text-input"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              2. Ending Investment Value (अन्तिम मूल्य — NPR):
            </label>
            <input
              type="number"
              min={1}
              value={finalValue}
              onChange={(e) => setFinalValue(Number(e.target.value) || 1)}
              className="text-input"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              3. Investment Duration (Years):
            </label>
            <input
              type="number"
              min={0.5}
              max={50}
              step="0.5"
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 1)}
              className="text-input"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a7f3d0', fontWeight: 700 }}>
              Compound Annual Growth Rate (CAGR)
            </div>
            <div style={{ fontSize: 'clamp(30px, 4.5vw, 40px)', fontWeight: 900, color: '#fde047', marginTop: '4px' }}>
              {calculation.cagrPercent.toFixed(2)}% / yr
            </div>
            <div style={{ fontSize: '13px', color: '#ecfdf5', marginTop: '4px' }}>
              Absolute Return: <strong>{calculation.absoluteReturnPercent.toFixed(2)}%</strong> • Net Gain:{' '}
              <strong>NPR {calculation.netGain.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: '#475569' }}>Money Doubling Time (Rule of 72):</span>
              <strong>{calculation.ruleOf72Years > 0 ? `${calculation.ruleOf72Years.toFixed(1)} Years` : '—'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

