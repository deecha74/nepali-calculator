'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { DEFAULT_FOREX_RATES } from '@/lib/rates/forexRates';
import { CountryFlag } from '@/components/hero/MarketRatesAndPopularTools';
import { useLanguage } from '@/components/LanguageContext';

interface ForexCalculatorProps {
  initialCurrency?: string;
  initialAmount?: number;
  titleTag?: 'h1' | 'h2';
  customTitle?: string;
}

export function ForexCalculator({ initialCurrency, initialAmount, titleTag = 'h1', customTitle }: ForexCalculatorProps = {}) {
  const { t } = useLanguage();
  const TitleHeading = titleTag;
  const [selectedCurrency, setSelectedCurrency] = useState<string>(initialCurrency || "USD");
  const [foreignAmount, setForeignAmount] = useState<number>(initialAmount !== undefined ? initialAmount : 1000);
  const [direction, setDirection] = useState<'foreignToNpr' | 'nprToForeign'>('foreignToNpr');
  const [copied, setCopied] = useState<boolean>(false);
  const [forexRates, setForexRates] = useState(DEFAULT_FOREX_RATES);
  const [isLive, setIsLive] = useState(false);
  const [publishedDate, setPublishedDate] = useState<string>('');

  React.useEffect(() => {
    async function loadLiveForex() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data.forex?.currencies) && data.forex.currencies.length > 0
            ? data.forex.currencies
            : (Array.isArray(data.nrbCurrencies) ? data.nrbCurrencies : null);

          if (list) {
            setForexRates(prev => prev.map(item => {
              const matched = list.find((c: any) => c.code === item.code);
              if (matched) {
                return {
                  ...item,
                  buyNpr: matched.buyNpr,
                  sellNpr: matched.sellNpr,
                  unit: matched.unit || item.unit,
                };
              }
              return item;
            }));
            setIsLive(true);
            if (data.forex?.publishedDate) {
              setPublishedDate(data.forex.publishedDate);
            }
          }
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    loadLiveForex();
  }, []);

  const rate = forexRates.find((r) => r.code === selectedCurrency) || forexRates[0];

  const convertedValue = useMemo(() => {
    if (direction === 'foreignToNpr') {
      const singleUnitBuy = rate.buyNpr / rate.unit;
      return (foreignAmount || 0) * singleUnitBuy;
    } else {
      const singleUnitSell = rate.sellNpr / rate.unit;
      return (foreignAmount || 0) / singleUnitSell;
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: isLive ? '#ecfdf5' : '#eff6ff',
                color: isLive ? '#059669' : '#1d4ed8',
                border: isLive ? '1px solid #a7f3d0' : '1px solid #bfdbfe',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isLive ? '#059669' : '#1d4ed8',
                }}
              />
              {isLive ? t(`Live NRB Rates (${publishedDate || 'Today'})`, `ताजा राष्ट्र बैंक दर (${publishedDate || 'आज'})`) : t('Nepal Rastra Bank Standard Rates', 'नेपाल राष्ट्र बैंक मानक दर')}
            </span>
            <span className="badge badge-neutral">{t('Remittance & Forex', 'विप्रेषण तथा विदेशी मुद्रा')}</span>
          </div>
          <TitleHeading style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {customTitle || t('Forex & Remittance Currency Converter', 'विदेशी मुद्रा तथा विप्रेषण रूपान्तरण')}
          </TitleHeading>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Real-time Nepal Rastra Bank (NRB) buying and selling exchange rates for remittances and forex.',
              'नेपाल राष्ट्र बैंकको आधिकारिक खरिद तथा बिक्री विनिमय दरका आधारमा रेमिट्यान्स तथा विदेशी मुद्रा हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Result', 'नतिजा कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Select Foreign Currency', 'विदेशी मुद्रा छान्नुहोस्')}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <CountryFlag code={selectedCurrency} size={17} />
              </span>
              <select
                className="select-input has-prefix"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{ paddingLeft: '44px' }}
              >
                {forexRates.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} — {curr.name} ({t(`Unit: ${curr.unit}`, `एकाइ: ${curr.unit}`)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {direction === 'foreignToNpr' ? t(`Amount in ${rate.code} (${rate.name})`, `${rate.code} (${rate.name}) मा रकम`) : t('Amount in Nepali Rupees (NPR)', 'नेपाली रुपैयाँमा रकम (रु)')}
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
            <span>{t(`Switch Direction (${direction === 'foreignToNpr' ? `${rate.code} → NPR` : `NPR → ${rate.code}`})`, `दिशा परिवर्तन गर्नुहोस् (${direction === 'foreignToNpr' ? `${rate.code} → रु` : `रु → ${rate.code}`})`)}</span>
          </button>
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">
              {direction === 'foreignToNpr' ? t('Converted Equivalent in Nepali Rupees (NPR)', 'नेपाली रुपैयाँमा रूपान्तरित मूल्य (रु)') : t(`Converted Equivalent in ${rate.code}`, `${rate.code} मा रूपान्तरित मूल्य`)}
            </span>
            <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
              {direction === 'foreignToNpr' ? `रु ${Math.round(convertedValue).toLocaleString('en-IN')}` : `${(Math.round(convertedValue * 100) / 100).toLocaleString('en-IN')} ${rate.code}`}
            </div>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  {t('Buying Rate (Bank Buys)', 'खरिद दर (बैंकले लिने)')}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                  {rate.unit} {rate.code} = रु {rate.buyNpr}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                  {t('Selling Rate (Bank Sells)', 'बिक्री दर (बैंकले दिने)')}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                  {rate.unit} {rate.code} = रु {rate.sellNpr}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
              {t('Source: Official Nepal Rastra Bank (NRB) Daily Exchange Bulletin.', 'स्रोत: नेपाल राष्ट्र बैंकको आधिकारिक दैनिक विनिमय दर।')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
