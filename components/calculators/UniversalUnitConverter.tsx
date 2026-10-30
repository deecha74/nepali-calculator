'use client';

import React, { useState, useMemo } from 'react';
import { Scale } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature';

const UNIT_FACTORS: Record<'length' | 'weight', Record<string, { label: string; toBase: number }>> = {
  length: {
    meter: { label: 'Meters (m)', toBase: 1 },
    kilometer: { label: 'Kilometers (km)', toBase: 1000 },
    centimeter: { label: 'Centimeters (cm)', toBase: 0.01 },
    millimeter: { label: 'Millimeters (mm)', toBase: 0.001 },
    feet: { label: 'Feet (ft)', toBase: 0.3048 },
    inch: { label: 'Inches (in)', toBase: 0.0254 },
    yard: { label: 'Yards (yd)', toBase: 0.9144 },
    mile: { label: 'Miles (mi)', toBase: 1609.344 },
    haat: { label: 'Nepali Haat (हात — 18 in)', toBase: 0.4572 },
  },
  weight: {
    kilogram: { label: 'Kilograms (kg)', toBase: 1 },
    gram: { label: 'Grams (g)', toBase: 0.001 },
    milligram: { label: 'Milligrams (mg)', toBase: 0.000001 },
    pound: { label: 'Pounds (lb)', toBase: 0.45359237 },
    ounce: { label: 'Ounces (oz)', toBase: 0.0283495 },
    quintal: { label: 'Quintal (क्विन्टल — 100 kg)', toBase: 100 },
    metric_ton: { label: 'Metric Ton (1,000 kg)', toBase: 1000 },
    tola: { label: 'Nepali Tola (तोला — 11.6638g)', toBase: 0.0116638 },
    dharni: { label: 'Nepali Dharni (धार्नी — 2.393 kg)', toBase: 2.3934 },
  },
};

export function UniversalUnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('feet');
  const [toUnit, setToUnit] = useState<string>('meter');
  const [inputVal, setInputVal] = useState<number>(10);

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

    const map = UNIT_FACTORS[category];
    const fromObj = map[fromUnit] || Object.values(map)[0];
    const toObj = map[toUnit] || Object.values(map)[1];
    const baseVal = inputVal * fromObj.toBase;
    const converted = baseVal / toObj.toBase;
    return { converted, baseVal };
  }, [category, fromUnit, toUnit, inputVal]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Scale size={22} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
          Universal Length, Weight & Temperature Unit Converter
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'length', label: '📏 Length / Distance' },
          { id: 'weight', label: '⚖️ Weight / Mass' },
          { id: 'temperature', label: '🌡️ Temperature (°C/°F/K)' },
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
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Input Value:</label>
          <input type="number" step="any" value={inputVal} onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
        </div>

        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>From Unit:</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="text-input" style={{ width: '100%' }}>
            {category === 'temperature' ? (
              <>
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
              </>
            ) : (
              Object.entries(UNIT_FACTORS[category]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>To Unit:</label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="text-input" style={{ width: '100%' }}>
            {category === 'temperature' ? (
              <>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="celsius">Celsius (°C)</option>
                <option value="kelvin">Kelvin (K)</option>
              </>
            ) : (
              Object.entries(UNIT_FACTORS[category]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))
            )}
          </select>
        </div>
      </div>

      <div style={{ marginTop: '22px', padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Converted Output</div>
        <div style={{ fontSize: '32px', fontWeight: 900, color: '#2dd4bf', marginTop: '4px' }}>
          {Number(result.converted.toFixed(6))}
        </div>
      </div>
    </div>
  );
}

