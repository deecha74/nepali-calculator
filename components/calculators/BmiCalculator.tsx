'use client';

import React, { useState, useMemo } from 'react';
import { Activity, Copy, Check, Heart, ShieldCheck } from 'lucide-react';

export function BmiCalculator() {
  const [heightUnit, setHeightUnit] = useState<'feet' | 'cm'>('feet');
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(7);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    // Total height in meters
    let totalMeters = 0;
    if (heightUnit === 'feet') {
      const totalInches = (feet || 0) * 12 + (inches || 0);
      totalMeters = totalInches * 0.0254;
    } else {
      totalMeters = (heightCm || 0) / 100;
    }

    if (totalMeters <= 0 || weightKg <= 0) {
      return { bmi: 0, status: 'Normal', color: '#10b981', minIdealKg: 0, maxIdealKg: 0 };
    }

    const bmi = weightKg / (totalMeters * totalMeters);
    const roundedBmi = Math.round(bmi * 10) / 10;

    // South Asian WHO Criteria:
    // Underweight: < 18.5
    // Normal: 18.5 - 22.9
    // Overweight: 23 - 27.4
    // Obese: >= 27.5
    let status = 'Normal Weight';
    let color = '#10b981';

    if (roundedBmi < 18.5) {
      status = 'Underweight (तौल कम)';
      color = '#3b82f6';
    } else if (roundedBmi <= 22.9) {
      status = 'Healthy & Normal (उचित तौल)';
      color = '#10b981';
    } else if (roundedBmi <= 27.4) {
      status = 'Overweight (बढी तौल - South Asian Risk)';
      color = '#f59e0b';
    } else {
      status = 'Obese (अत्यधिक तौल / मोटोपन)';
      color = '#ef4444';
    }

    // Ideal weight range for normal BMI (18.5 to 22.9)
    const minIdealKg = Math.round(18.5 * (totalMeters * totalMeters));
    const maxIdealKg = Math.round(22.9 * (totalMeters * totalMeters));

    return {
      bmi: roundedBmi,
      status,
      color,
      minIdealKg,
      maxIdealKg,
    };
  }, [heightUnit, feet, inches, heightCm, weightKg]);

  const handleCopy = () => {
    const text = `Nepal BMI & Health Status:
Height: ${heightUnit === 'feet' ? `${feet}ft ${inches}in` : `${heightCm} cm`}
Weight: ${weightKg} kg
BMI Score: ${result.bmi} (${result.status})
Ideal Healthy Weight Range: ${result.minIdealKg} kg - ${result.maxIdealKg} kg
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
            <span className="badge badge-emerald">WHO South Asian BMI Cutoff</span>
            <span className="badge badge-neutral">तौल र उचाइ</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            BMI (Body Mass Index) & Ideal Weight Calculator Nepal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate your Body Mass Index with South Asian health criteria, obesity risk tiers, and ideal weight targets.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Share Result"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Height Unit</label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${heightUnit === 'feet' ? 'active' : ''}`}
                onClick={() => setHeightUnit('feet')}
                style={{ flex: 1 }}
              >
                Feet & Inches (फिट र इन्च)
              </button>
              <button
                type="button"
                className={`segmented-btn ${heightUnit === 'cm' ? 'active' : ''}`}
                onClick={() => setHeightUnit('cm')}
                style={{ flex: 1 }}
              >
                Centimeters (सेन्टीमिटर)
              </button>
            </div>
          </div>

          {heightUnit === 'feet' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="input-label">Feet (फिट)</label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(Math.max(3, Math.min(8, Number(e.target.value))))}
                  className="text-input"
                />
              </div>
              <div>
                <label className="input-label">Inches (इन्च)</label>
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(Math.max(0, Math.min(11, Number(e.target.value))))}
                  className="text-input"
                />
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">Height in CM</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Math.max(100, Math.min(250, Number(e.target.value))))}
                className="text-input"
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>Weight (Kilograms)</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{weightKg} kg</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="range-slider"
            />
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', border: `1.5px solid ${result.color}` }}>
            <span className="stat-label">Your Body Mass Index (BMI)</span>
            <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: result.color, marginTop: '4px' }}>
              {result.bmi}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: result.color, marginTop: '2px' }}>
              {result.status}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <span className="stat-label">Ideal Healthy Weight For Your Height</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {result.minIdealKg} kg — {result.maxIdealKg} kg
              </div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Healthy BMI range between 18.5 and 22.9.
              </span>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
            🩺 <strong>South Asian Health Standard:</strong> The World Health Organization (WHO) lowered the healthy BMI cutoff for Nepalese and South Asian adults to <strong>22.9</strong> (compared to 24.9 for Westerners) because South Asians exhibit cardiovascular and insulin-resistance risks at lower body mass indexes.
          </div>
        </div>
      </div>
    </div>
  );
}
