'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert,
  Percent,
  Calendar
} from 'lucide-react';
import { calculateFuturePurchasingPower, NEPAL_AVERAGE_ANNUAL_INFLATION, NEPAL_HISTORICAL_INFLATION } from '@/lib/rates/inflationRates';

export function InflationCalculator() {
  const [amount, setAmount] = useState<number>(100000); // 1 Lakh default
  const [inflationRate, setInflationRate] = useState<number>(NEPAL_AVERAGE_ANNUAL_INFLATION);
  const [years, setYears] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateFuturePurchasingPower(amount, inflationRate, years);
  }, [amount, inflationRate, years]);

  const handleCopy = () => {
    const text = `Nepal Inflation & Purchasing Power Analysis:
Today's Value: NPR ${amount.toLocaleString('en-IN')}
Annual Inflation Rate: ${inflationRate}%
Time Horizon: ${years} Years
Future Equivalent Required: NPR ${result.futureEquivalentValue.toLocaleString('en-IN')}
Purchasing Power Left: NPR ${result.realPurchasingPower.toLocaleString('en-IN')} (-${result.cumulativeInflationPercent}% eroded)
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>Nepal Rastra Bank CPI Standard</span>
            <span className="badge badge-neutral">Purchasing Power Analysis</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Inflation & Purchasing Power Calculator Nepal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            See how inflation in Nepal erodes your bank savings and what you need in the future to maintain current lifestyle.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '24px' }}>
            <label className="input-label">Current Amount / Today&apos;s Expense (NPR)</label>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
              className="text-input"
              style={{ fontSize: '16px', fontWeight: 700 }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {[50000, 100000, 500000, 1000000].map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() => setAmount(quick)}
                  style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    background: amount === quick ? '#0f172a' : '#f8fafc',
                    color: amount === quick ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  रु {(quick / 100000) >= 1 ? `${quick / 100000} Lakh` : `${quick / 1000}k`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>Expected Annual Inflation Rate (%)</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#d97706' }}>{inflationRate}%</span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>३% (Low)</span>
              <span>६.२% (NRB 10-Yr Avg)</span>
              <span>१५% (Severe)</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>Time Period (Years)</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>१ Year</span>
              <span>१० Years</span>
              <span>३० Years</span>
            </div>
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #fffbeb 100%)', border: '1.5px solid #fde68a' }}>
            <div>
              <span className="stat-label" style={{ color: '#b45309' }}>Future Equivalent Cost Needed</span>
              <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#92400e', marginTop: '4px' }}>
                रु {result.futureEquivalentValue.toLocaleString('en-IN')}
              </div>
              <p style={{ fontSize: '12px', color: '#78350f', marginTop: '4px' }}>
                To buy what रु {amount.toLocaleString('en-IN')} buys today, you will need this amount in {years} years.
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #fef3c7' }}>
              <span className="stat-label">Real Purchasing Power of Current रु {amount.toLocaleString('en-IN')}</span>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#dc2626', marginTop: '2px' }}>
                रु {result.realPurchasingPower.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Lost {result.cumulativeInflationPercent}% of value due to {years} years of compounding inflation.
              </span>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
            💡 <strong>Smart Financial Tip:</strong> If your bank savings account pays 4% interest while Nepal inflation is 6.2%, your money loses purchasing power every year. Consider fixed deposits, SIP mutual funds, or land/real estate to beat inflation.
          </div>
        </div>
      </div>
    </div>
  );
}
