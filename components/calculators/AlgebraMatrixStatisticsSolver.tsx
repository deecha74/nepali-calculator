'use client';

import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

export function AlgebraMatrixStatisticsSolver({ defaultMode = 'quadratic' }: { defaultMode?: 'quadratic' | 'statistics' }) {
  const [mode, setMode] = useState<'quadratic' | 'statistics'>(defaultMode);
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);
  const [datasetInput, setDatasetInput] = useState<string>('12, 15, 18, 22, 25, 30, 34');

  const quadResult = useMemo(() => {
    if (a === 0) {
      const lin = b !== 0 ? (-c / b).toFixed(4) : 'No Solution';
      return { discriminant: 0, roots: `Linear root x = ${lin}` };
    }
    const d = b * b - 4 * a * c;
    if (d >= 0) {
      const r1 = ((-b + Math.sqrt(d)) / (2 * a)).toFixed(4);
      const r2 = ((-b - Math.sqrt(d)) / (2 * a)).toFixed(4);
      return { discriminant: d, roots: `x₁ = ${r1}, x₂ = ${r2}` };
    } else {
      const real = (-b / (2 * a)).toFixed(3);
      const imag = (Math.sqrt(-d) / (2 * a)).toFixed(3);
      return { discriminant: d, roots: `${real} ± ${imag}i (Complex Roots)` };
    }
  }, [a, b, c]);

  const statsResult = useMemo(() => {
    const nums = datasetInput
      .split(/[\s,]+/)
      .map((x) => parseFloat(x))
      .filter((x) => !isNaN(x))
      .sort((x, y) => x - y);
    if (nums.length === 0) return { count: 0, mean: 0, median: 0, stdDev: 0, variance: 0 };

    const count = nums.length;
    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / count;
    const mid = Math.floor(count / 2);
    const median = count % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return { count, mean, median, variance, stdDev };
  }, [datasetInput]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setMode('quadratic')}
          style={{
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 700,
            border: mode === 'quadratic' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
            background: mode === 'quadratic' ? '#eff6ff' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          📐 Quadratic & Linear Equation Solver (ax² + bx + c = 0)
        </button>
        <button
          type="button"
          onClick={() => setMode('statistics')}
          style={{
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 700,
            border: mode === 'statistics' ? '2px solid #059669' : '1px solid var(--border-subtle)',
            background: mode === 'statistics' ? '#ecfdf5' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          📊 Standard Deviation, Mean, Median & Variance
        </button>
      </div>

      {mode === 'quadratic' ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div>
              <label className="input-label">Coefficient a (x²):</label>
              <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label">Coefficient b (x):</label>
              <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label">Constant c:</label>
              <input type="number" value={c} onChange={(e) => setC(parseFloat(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>Discriminant (Δ = b² - 4ac): {quadResult.discriminant}</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8', marginTop: '6px' }}>{quadResult.roots}</div>
          </div>
        </div>
      ) : (
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            Enter Dataset Numbers (Comma or Space Separated):
          </label>
          <input type="text" value={datasetInput} onChange={(e) => setDatasetInput(e.target.value)} className="text-input" style={{ width: '100%', marginBottom: '18px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Mean (Average)', val: statsResult.mean.toFixed(2) },
              { label: 'Median', val: statsResult.median.toFixed(2) },
              { label: 'Standard Deviation (σ)', val: statsResult.stdDev.toFixed(4) },
              { label: 'Variance (σ²)', val: statsResult.variance.toFixed(4) },
            ].map((item) => (
              <div key={item.label} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

