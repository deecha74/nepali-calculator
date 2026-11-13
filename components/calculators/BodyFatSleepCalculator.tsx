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

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Body Fat Percentage</div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '4px 0 12px', fontFamily: 'var(--font-mono)' }}>
              {bodyFatResult.bodyFatPercent}% <span style={{ fontSize: '15px', fontWeight: 600, color: '#64748b' }}>Body Fat</span>
            </div>
            <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
              <div>Lean Muscle Mass: <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{bodyFatResult.leanMassKg} kg</strong></div>
              <div>Fat Mass: <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{bodyFatResult.fatMassKg} kg</strong></div>
              <div>Ideal Weight for {heightCm}cm: <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>{bodyFatResult.idealWeightKg} kg</strong></div>
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
              <div key={c.cycles} style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1.5px solid #bfdbfe', boxShadow: '0 4px 12px rgba(0, 56, 147, 0.05)' }}>
                <div style={{ fontSize: '12px', color: '#003893', fontWeight: 800 }}>{c.cycles} REM Cycles ({c.hours} hrs sleep)</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{c.timeStr}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {c.cycles === 5 ? 'Recommended (7.5 hrs)' : c.cycles === 6 ? 'Deep Rest (9 hrs)' : 'Light Rest (6 hrs)'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

