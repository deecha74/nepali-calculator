'use client';

import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return 'Enter 1 – 3999';
  const pairs: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let n = Math.floor(num);
  let res = '';
  for (const [val, sym] of pairs) {
    while (n >= val) {
      res += sym;
      n -= val;
    }
  }
  return res;
}

export function BaseRomanConverter() {
  const [inputValue, setInputValue] = useState<string>('2083');
  const [sourceBase, setSourceBase] = useState<number>(10);

  const converted = useMemo(() => {
    const parsed = parseInt(inputValue.trim() || '0', sourceBase);
    if (isNaN(parsed) || parsed < 0) {
      return { dec: 'Invalid', bin: 'Invalid', oct: 'Invalid', hex: 'Invalid', roman: '—' };
    }
    return {
      dec: parsed.toString(10),
      bin: parsed.toString(2),
      oct: parsed.toString(8),
      hex: parsed.toString(16).toUpperCase(),
      roman: toRoman(parsed),
    };
  }, [inputValue, sourceBase]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ede9fe', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={22} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
          Number Base (Binary/Hex/Octal/Decimal) & Roman Numeral Converter
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Input Number:</label>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="text-input" style={{ width: '100%', fontFamily: 'monospace' }} />
        </div>
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Input Base System:</label>
          <select value={sourceBase} onChange={(e) => setSourceBase(Number(e.target.value))} className="text-input" style={{ width: '100%' }}>
            <option value={10}>Decimal (Base 10)</option>
            <option value={2}>Binary (Base 2)</option>
            <option value={8}>Octal (Base 8)</option>
            <option value={16}>Hexadecimal (Base 16)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {[
          { label: 'Decimal (Base 10)', val: converted.dec },
          { label: 'Binary (Base 2)', val: converted.bin },
          { label: 'Octal (Base 8)', val: converted.oct },
          { label: 'Hexadecimal (Base 16)', val: converted.hex },
          { label: 'Roman Numeral', val: converted.roman },
        ].map((item) => (
          <div key={item.label} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{item.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace', marginTop: '4px', wordBreak: 'break-all' }}>
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

