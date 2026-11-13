'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Droplets, Copy, Check, Info, ShieldCheck } from 'lucide-react';

export function KhanepaniCalculator() {
  const { t } = useLanguage();
  const [pipeSize, setPipeSize] = useState<string>('0.5'); // 1/2 inch
  const [litersUsed, setLitersUsed] = useState<number>(18000); // 18k liters default
  const [hasSewerage, setHasSewerage] = useState<boolean>(true); // 50% sewer charge
  const [copied, setCopied] = useState<boolean>(false);

  const bill = useMemo(() => {
    const units = Math.max(0, litersUsed) / 1000; // 1 unit = 1,000 liters
    let waterCost = 100; // minimum 100 covers first 10 units for 1/2"

    if (units > 10) {
      const tier1 = Math.min(units - 10, 10); // 11 to 20 units
      waterCost += tier1 * 32;
    }
    if (units > 20) {
      const tier2 = Math.min(units - 20, 10); // 21 to 30 units
      waterCost += tier2 * 71;
    }
    if (units > 30) {
      const tier3 = units - 30; // > 30 units
      waterCost += tier3 * 95;
    }

    const sewerCost = hasSewerage ? waterCost * 0.50 : 0;
    const totalPayable = waterCost + sewerCost;

    return {
      units: Math.round(units * 10) / 10,
      waterCost: Math.round(waterCost),
      sewerCost: Math.round(sewerCost),
      totalPayable: Math.round(totalPayable),
    };
  }, [litersUsed, hasSewerage]);

  const handleCopy = () => {
    const text = `Nepal Khanepani (KUKL) Water Bill:
Water Consumed: ${litersUsed.toLocaleString()} Liters (${bill.units} Units)
Water Tariff: NPR ${bill.waterCost}
Sewerage Charge (50%): NPR ${bill.sewerCost}
Total Monthly Bill: NPR ${bill.totalPayable}
Calculated on NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-blue">{t('KUKL & Nepal Water Supply Tariff', 'काठमाडौँ उपत्यका खानेपानी लिमिटेड (KUKL) दर')}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Khanepani Water Bill Calculator', 'खानेपानी महसुल क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t('Calculate monthly drinking water and sewerage tariffs for Kathmandu Valley (KUKL) and municipalities across Nepal.', 'काठमाडौँ उपत्यका (KUKL) तथा नेपालभरका नगरपालिकाको मासिक खानेपानी र ढल महसुल हिसाब गर्नुहोस्।')}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Share Calculation', 'नतिजा सेयर')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Pipe Connection Size', 'धाराको पाइप साइज')}</label>
            <select
              value={pipeSize}
              onChange={(e) => setPipeSize(e.target.value)}
              className="select-input"
            >
              <option value="0.5">{t('1/2 inch (Standard Domestic)', '१/२ इन्च (घरायसी प्रयोजन)')}</option>
              <option value="0.75">{t('3/4 inch (Semi-Commercial)', '३/४ इन्च (अर्ध-व्यावसायिक)')}</option>
              <option value="1.0">{t('1 inch (Commercial / Institutional)', '१ इन्च (व्यावसायिक / संस्थागत)')}</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>{t('Monthly Consumption (Liters)', 'मासिक खपत (लिटरमा)')}</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>
                {litersUsed.toLocaleString()} {t('Liters', 'लिटर')} ({bill.units} {t('Units', 'युनिट')})
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={litersUsed}
              onChange={(e) => setLitersUsed(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>{t('1,000 L (1 Unit)', '१,००० लि (१ युनिट)')}</span>
              <span>{t('10,000 L (Min Slab)', '१०,००० लि (न्यूनतम)')}</span>
              <span>{t('50,000 L', '५०,००० लि')}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasSewerage}
                onChange={(e) => setHasSewerage(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#2563eb' }}
              />
              <span>{t('Include 50% Sewerage Charge', '५०% ढल सेवा शुल्क समावेश गर्नुहोस्')}</span>
            </label>
            <span className="input-subtext" style={{ display: 'block', marginLeft: '28px' }}>
              {t('Standard municipal drainage charge applies to piped connections in Kathmandu.', 'काठमाडौँमा पाइप जडान भएका धाराहरूमा ५०% ढल शुल्क लाग्छ।')}
            </span>
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)', border: '1.5px solid #bfdbfe' }}>
            <span className="stat-label" style={{ color: '#1d4ed8' }}>{t('Total Monthly Water Bill', 'कुल मासिक खानेपानी महसुल')}</span>
            <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#1e40af', marginTop: '4px' }}>
              रु {bill.totalPayable.toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '12px', color: '#1d4ed8', marginTop: '4px' }}>
              {t(`Based on ${bill.units} units (${litersUsed.toLocaleString()} Liters) monthly consumption.`, `मासिक ${bill.units} युनिट (${litersUsed.toLocaleString()} लिटर) खपतका आधारमा।`)}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid #dbeafe', marginTop: '16px' }}>
              <div>
                <span className="stat-label">{t('Water Tariff', 'पानी महसुल')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  रु {bill.waterCost.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <span className="stat-label">{t('Sewerage (50%)', 'ढल महसुल (५०%)')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '2px' }}>
                  रु {bill.sewerCost.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
            🚰 <strong>{t('KUKL Domestic Slabs:', 'KUKL घरायसी महसुल स्ल्याब:')}</strong> {t('Up to 10,000 Liters has a fixed minimum charge of NPR 100. Water consumed beyond 10,000 liters is billed in tiered increments (NPR 32/1kL from 10k-20k, NPR 71/1kL from 20k-30k, NPR 95/1kL above 30k).', '१०,००० लिटरसम्म न्यूनतम रु १०० लाग्छ। १०,००० लिटरभन्दा बढी खपतमा स्ल्याब अनुसार (१०-२० हजारमा रु ३२, २०-३० हजारमा रु ७१, र ३० हजारभन्दा माथि रु ९५ प्रति हजार लिटर) शुल्क लाग्छ।')}
          </div>
        </div>
      </div>
    </div>
  );
}
