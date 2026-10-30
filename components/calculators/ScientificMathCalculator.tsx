'use client';

import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function ScientificMathCalculator() {
  const [numA, setNumA] = useState<number>(24);
  const [numB, setNumB] = useState<number>(36);
  const [angleDeg, setAngleDeg] = useState<number>(45);

  const mathOut = useMemo(() => {
    const g = gcd(numA, numB);
    const lcm = Math.abs(Math.round(numA * numB)) / g;
    const rad = (angleDeg * Math.PI) / 180;
    const pctOf = (numA / 100) * numB;
    const pctRatio = numB !== 0 ? (numA / numB) * 100 : 0;
    const log10Val = numA > 0 ? Math.log10(numA) : 0;
    const lnVal = numA > 0 ? Math.log(numA) : 0;

    return {
      gcd: g,
      lcm,
      sin: Math.sin(rad).toFixed(4),
      cos: Math.cos(rad).toFixed(4),
      tan: Math.tan(rad).toFixed(4),
      pctOf: pctOf.toFixed(2),
      pctRatio: pctRatio.toFixed(2),
      simplifiedFraction: `${Math.round(numA / g)} / ${Math.round(numB / g)}`,
      log10Val: log10Val.toFixed(4),
      lnVal: lnVal.toFixed(4),
    };
  }, [numA, numB, angleDeg]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={22} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
          Scientific, Percentage, Fraction, LCM/GCF & Logarithm Calculator
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <div>
          <label className="input-label" style={{ fontWeight: 700 }}>Number X (Numerator):</label>
          <input type="number" value={numA} onChange={(e) => setNumA(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
        </div>
        <div>
          <label className="input-label" style={{ fontWeight: 700 }}>Number Y (Denominator):</label>
          <input type="number" value={numB} onChange={(e) => setNumB(parseFloat(e.target.value) || 1)} className="text-input" style={{ width: '100%' }} />
        </div>
        <div>
          <label className="input-label" style={{ fontWeight: 700 }}>Trig Angle (Degrees °):</label>
          <input type="number" value={angleDeg} onChange={(e) => setAngleDeg(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
        {[
          { label: `GCF / HCF of (${numA}, ${numB})`, val: mathOut.gcd },
          { label: `LCM of (${numA}, ${numB})`, val: mathOut.lcm },
          { label: `Simplified Fraction (${numA}/${numB})`, val: mathOut.simplifiedFraction },
          { label: `${numA}% of ${numB}`, val: mathOut.pctOf },
          { label: `${numA} is what % of ${numB}`, val: `${mathOut.pctRatio}%` },
          { label: `sin(${angleDeg}°) / cos(${angleDeg}°)`, val: `${mathOut.sin} / ${mathOut.cos}` },
          { label: `log₁₀(${numA}) / ln(${numA})`, val: `${mathOut.log10Val} / ${mathOut.lnVal}` },
        ].map((card) => (
          <div key={card.label} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>{card.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>{card.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

