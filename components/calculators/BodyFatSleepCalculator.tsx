'use client';

import React, { useState, useMemo } from 'react';
import { Activity, Clock } from 'lucide-react';

export function BodyFatSleepCalculator({ defaultTab = 'body_fat' }: { defaultTab?: 'body_fat' | 'sleep' }) {
  const [tab, setTab] = useState<'body_fat' | 'sleep'>(defaultTab);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [waistCm, setWaistCm] = useState<number>(84);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [hipCm, setHipCm] = useState<number>(96);
  const [wakeUpTime, setWakeUpTime] = useState<string>('06:00');

  const bodyFatResult = useMemo(() => {
    // US Navy Body Fat Formula
    const h = Math.max(100, heightCm);
    const w = Math.max(40, waistCm);
    const n = Math.max(20, neckCm);
    const hip = Math.max(50, hipCm);

    let bf = 18;
    if (gender === 'male' && w > n) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else if (gender === 'female' && w + hip > n) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hip - n) + 0.221 * Math.log10(h)) - 450;
    }
    const clampedBf = Math.min(60, Math.max(3, bf));
    const fatMassKg = (weightKg * clampedBf) / 100;
    const leanMassKg = weightKg - fatMassKg;
    // Devine Ideal Body Weight
    const inchesOver5Ft = Math.max(0, h / 2.54 - 60);
    const idealWeightKg = gender === 'male' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;

    return {
      bodyFatPercent: clampedBf.toFixed(1),
      fatMassKg: fatMassKg.toFixed(1),
      leanMassKg: leanMassKg.toFixed(1),
      idealWeightKg: idealWeightKg.toFixed(1),
    };
  }, [gender, heightCm, weightKg, waistCm, neckCm, hipCm]);

  const sleepCycles = useMemo(() => {
    const [hh, mm] = wakeUpTime.split(':').map((x) => parseInt(x, 10) || 0);
    const wakeMins = hh * 60 + mm;
    // 90-minute REM sleep cycles + 15 mins to fall asleep
    return [6, 5, 4].map((cycles) => {
      let bedMins = wakeMins - cycles * 90 - 15;
      if (bedMins < 0) bedMins += 24 * 60;
      const bH = Math.floor(bedMins / 60);
      const bM = bedMins % 60;
      const ampm = bH >= 12 ? 'PM' : 'AM';
      const hr12 = bH % 12 === 0 ? 12 : bH % 12;
      return {
        cycles,
        hours: (cycles * 1.5).toFixed(1),
        timeStr: `${hr12}:${bM.toString().padStart(2, '0')} ${ampm}`,
      };
    });
  }, [wakeUpTime]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
        <button
          type="button"
          onClick={() => setTab('body_fat')}
          style={{
            padding: '11px',
            borderRadius: '10px',
            fontWeight: 700,
            border: tab === 'body_fat' ? '2px solid #059669' : '1px solid var(--border-subtle)',
            background: tab === 'body_fat' ? '#ecfdf5' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          🏋️ Body Fat % & Ideal Weight (US Navy Method)
        </button>
        <button
          type="button"
          onClick={() => setTab('sleep')}
          style={{
            padding: '11px',
            borderRadius: '10px',
            fontWeight: 700,
            border: tab === 'sleep' ? '2px solid #4f46e5' : '1px solid var(--border-subtle)',
            background: tab === 'sleep' ? '#e0e7ff' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          🌙 90-Minute REM Sleep Cycle Calculator
        </button>
      </div>

      {tab === 'body_fat' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <button type="button" onClick={() => setGender('male')} className="btn-secondary">👨 Male</button>
              <button type="button" onClick={() => setGender('female')} className="btn-secondary">👩 Female</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="input-label">Height (cm)</label>
                <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || 170)} className="text-input" style={{ width: '100%' }} />
              </div>
              <div>
                <label className="input-label">Weight (kg)</label>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value) || 70)} className="text-input" style={{ width: '100%' }} />
              </div>
              <div>
                <label className="input-label">Waist (cm)</label>
                <input type="number" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value) || 80)} className="text-input" style={{ width: '100%' }} />
              </div>
              <div>
                <label className="input-label">Neck (cm)</label>
                <input type="number" value={neckCm} onChange={(e) => setNeckCm(Number(e.target.value) || 38)} className="text-input" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Body Fat Percentage</div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#34d399', margin: '4px 0 10px' }}>
              {bodyFatResult.bodyFatPercent}% Body Fat
            </div>
            <div style={{ fontSize: '13.5px', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Lean Muscle Mass: <strong>{bodyFatResult.leanMassKg} kg</strong></div>
              <div>Fat Mass: <strong>{bodyFatResult.fatMassKg} kg</strong></div>
              <div>Ideal Weight for {heightCm}cm: <strong>{bodyFatResult.idealWeightKg} kg</strong></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>
            What time do you want to wake up tomorrow morning?
          </label>
          <input type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} className="text-input" style={{ maxWidth: '240px', marginBottom: '18px', fontSize: '18px', fontWeight: 800 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {sleepCycles.map((c) => (
              <div key={c.cycles} style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#1e1b4b', color: '#ffffff' }}>
                <div style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: 700 }}>{c.cycles} REM Cycles ({c.hours} hrs sleep)</div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#fde047', marginTop: '4px' }}>Bed by {c.timeStr}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

