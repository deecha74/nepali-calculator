'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { DEFAULT_FOREX_RATES } from '@/lib/rates/forexRates';

interface ForexCalculatorProps {
  initialCurrency?: string;
  titleTag?: 'h1' | 'h2';
}

export function ForexCalculator({ initialCurrency, titleTag = 'h1' }: ForexCalculatorProps = {}) {
  const TitleHeading = titleTag;
  const [selectedCurrency, setSelectedCurrency] = useState<string>(initialCurrency || "USD");
  const [foreignAmount, setForeignAmount] = useState<number>(1000);
  const [direction, setDirection] = useState<'foreignToNpr' | 'nprToForeign'>('foreignToNpr');
  const [copied, setCopied] = useState<boolean>(false);
  const [forexRates, setForexRates] = useState(DEFAULT_FOREX_RATES);
  const [isLive, setIsLive] = useState(false);

  React.useEffect(() => {
    async function loadLiveForex() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.forex?.currencies)) {
            setForexRates(prev => prev.map(item => {
              const matched = data.forex.currencies.find((c: any) => c.code === item.code);
              if (matched) {
                return {
                  ...item,
                  buyNpr: matched.buyNpr,
                  sellNpr: matched.sellNpr,
                };
              }
              return item;
            }));
            setIsLive(true);
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    loadLiveForex();
  }, []);

  const rate = forexRates.find((r) => r.code === selectedCurrency) || forexRates[0];

  const convertedValue = useMemo(() => {
    const singleUnitBuy = rate.buyNpr / rate.unit;
    if (direction === 'foreignToNpr') {
      return (foreignAmount || 0) * singleUnitBuy;
    } else {
      return (foreignAmount || 0) / singleUnitBuy;
    }
  }, [foreignAmount, rate, direction]);

  const handleCopy = () => {
    const text = `Forex & Remittance Conversion:
${direction === 'foreignToNpr' ? `${foreignAmount} ${rate.code} = रु ${Math.round(convertedValue).toLocaleString('en-IN')}` : `रु ${foreignAmount} = ${(Math.round(convertedValue * 100) / 100)} ${rate.code}`}
Rate: 1 ${rate.code} ≈ रु ${(rate.buyNpr / rate.unit).toFixed(2)}
Via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Nepal Rastra Bank Standard</span>
            <span className="badge badge-neutral">Remittance & Exchange</span>
          </div>
          <TitleHeading style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Forex & Remittance Currency Converter
          </TitleHeading>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Convert USD, AUD, AED, SAR, QAR, JPY, and global remittances to Nepali Rupees (NPR).
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Select Foreign Currency</label>
            <select
              className="select-input"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {DEFAULT_FOREX_RATES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code} — {curr.name} (Unit: {curr.unit})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {direction === 'foreignToNpr' ? `Amount in ${rate.code} (${rate.name})` : 'Amount in Nepali Rupees (रु NPR)'}
            </label>
            <input
              type="number"
              min={1}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700 }}
              value={foreignAmount}
              onChange={(e) => setForeignAmount(Number(e.target.value) || 0)}
            />
          </div>

          <button
            type="button"
            className="btn-secondary"
            style={{ width: '100%' }}
            onClick={() => setDirection(direction === 'foreignToNpr' ? 'nprToForeign' : 'foreignToNpr')}
          >
            <ArrowRightLeft size={16} />
            <span>Switch Direction ({direction === 'foreignToNpr' ? `${rate.code} → NPR` : `NPR → ${rate.code}`})</span>
          </button>
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">Converted Equivalent</span>
            <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
              {direction === 'foreignToNpr' ? `रु ${Math.round(convertedValue).toLocaleString('en-IN')}` : `${(Math.round(convertedValue * 100) / 100).toLocaleString('en-IN')} ${rate.code}`}
            </div>
            <span className="stat-subvalue">
              Official Reference Rate: {rate.unit} {rate.code} = रु {rate.buyNpr} (Buy) / रु {rate.sellNpr} (Sell)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
