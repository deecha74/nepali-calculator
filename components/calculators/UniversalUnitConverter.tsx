'use client';

import React, { useState, useMemo } from 'react';
import { Scale } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

type UnitCategory = 'length' | 'weight' | 'temperature';

export function UniversalUnitConverter() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('feet');
  const [toUnit, setToUnit] = useState<string>('meter');
  const [inputVal, setInputVal] = useState<number>(10);

  const unitFactors: Record<'length' | 'weight', Record<string, { label: string; toBase: number }>> = useMemo(() => ({
    length: {
      meter: { label: t('Meters (m)', 'मिटर (m)'), toBase: 1 },
      kilometer: { label: t('Kilometers (km)', 'किलोमिटर (km)'), toBase: 1000 },
      centimeter: { label: t('Centimeters (cm)', 'सेन्टिमिटर (cm)'), toBase: 0.01 },
      millimeter: { label: t('Millimeters (mm)', 'मिलिमिटर (mm)'), toBase: 0.001 },
      feet: { label: t('Feet (ft)', 'फिट (ft)'), toBase: 0.3048 },
      inch: { label: t('Inches (in)', 'इन्च (in)'), toBase: 0.0254 },
      yard: { label: t('Yards (yd)', 'यार्ड (yd)'), toBase: 0.9144 },
      mile: { label: t('Miles (mi)', 'माइल (mi)'), toBase: 1609.344 },
      haat: { label: t('Nepali Haat (18 in)', 'नेपाली हात (१८ इन्च)'), toBase: 0.4572 },
    },
    weight: {
      kilogram: { label: t('Kilograms (kg)', 'किलोग्राम (kg)'), toBase: 1 },
      gram: { label: t('Grams (g)', 'ग्राम (g)'), toBase: 0.001 },
      milligram: { label: t('Milligrams (mg)', 'मिलिग्राम (mg)'), toBase: 0.000001 },
      pound: { label: t('Pounds (lb)', 'पाउन्ड (lb)'), toBase: 0.45359237 },
      ounce: { label: t('Ounces (oz)', 'औंस (oz)'), toBase: 0.0283495 },
      quintal: { label: t('Quintal (100 kg)', 'क्विन्टल (१०० केजी)'), toBase: 100 },
      metric_ton: { label: t('Metric Ton (1,000 kg)', 'मेट्रिक टन (१,००० केजी)'), toBase: 1000 },
      tola: { label: t('Nepali Tola (11.66g)', 'नेपाली तोला (११.६६ ग्राम)'), toBase: 0.0116638 },
      dharni: { label: t('Nepali Dharni (2.39 kg)', 'नेपाली धार्नी (२.३९ केजी)'), toBase: 2.3934 },
    },
  }), [t]);

  const result = useMemo(() => {
    if (category === 'temperature') {
      const c =
        fromUnit === 'celsius'
          ? inputVal
          : fromUnit === 'fahrenheit'
            ? ((inputVal - 32) * 5) / 9
            : inputVal - 273.15;
      const f = (c * 9) / 5 + 32;
      const k = c + 273.15;
      return { c, f, k, converted: toUnit === 'celsius' ? c : toUnit === 'fahrenheit' ? f : k };
    }

    const map = unitFactors[category];
    const fromObj = map[fromUnit] || Object.values(map)[0];
    const toObj = map[toUnit] || Object.values(map)[1];
    const baseVal = inputVal * fromObj.toBase;
    const converted = baseVal / toObj.toBase;
    return { converted, baseVal };
  }, [category, fromUnit, toUnit, inputVal, unitFactors]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Scale size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
            {t('Universal Length, Weight & Temperature Unit Converter', 'लम्बाइ, तौल तथा तापक्रम एकाइ रूपान्तरण')}
          </h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'length', label: t('📏 Length', '📏 लम्बाइ') },
          { id: 'weight', label: t('⚖️ Weight', '⚖️ तौल') },
          { id: 'temperature', label: t('🌡️ Temperature', '🌡️ तापक्रम') },
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              const nextCat = c.id as UnitCategory;
              setCategory(nextCat);
              if (nextCat === 'length') {
                setFromUnit('feet');
                setToUnit('meter');
              } else if (nextCat === 'weight') {
                setFromUnit('kilogram');
                setToUnit('pound');
              } else {
                setFromUnit('celsius');
                setToUnit('fahrenheit');
              }
            }}
            style={{
              padding: '10px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              border: category === c.id ? '2px solid #0d9488' : '1px solid var(--border-subtle)',
              background: category === c.id ? '#f0fdfa' : '#ffffff',
              cursor: 'pointer',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'end' }}>
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            {t('Input Value:', 'मान:')}
          </label>
          <input type="number" step="any" value={inputVal} onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
        </div>

        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            {t('From Unit:', 'स्रोत एकाइ:')}
          </label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="text-input" style={{ width: '100%' }}>
            {category === 'temperature' ? (
              <>
                <option value="celsius">{t('Celsius (°C)', 'सेल्सियस (°C)')}</option>
                <option value="fahrenheit">{t('Fahrenheit (°F)', 'फरेनहाइट (°F)')}</option>
                <option value="kelvin">{t('Kelvin (K)', 'केल्भिन (K)')}</option>
              </>
            ) : (
              Object.entries(unitFactors[category]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            {t('To Unit:', 'गन्तव्य एकाइ:')}
          </label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="text-input" style={{ width: '100%' }}>
            {category === 'temperature' ? (
              <>
                <option value="fahrenheit">{t('Fahrenheit (°F)', 'फरेनहाइट (°F)')}</option>
                <option value="celsius">{t('Celsius (°C)', 'सेल्सियस (°C)')}</option>
                <option value="kelvin">{t('Kelvin (K)', 'केल्भिन (K)')}</option>
              </>
            ) : (
              Object.entries(unitFactors[category]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))
            )}
          </select>
        </div>
      </div>

      <div style={{ marginTop: '22px', padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
          {t('Converted Output', 'रूपान्तरित नतिजा')}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 900, color: '#2dd4bf', marginTop: '4px' }}>
          {Number(result.converted.toFixed(6))}
        </div>
      </div>
    </div>
  );
}
