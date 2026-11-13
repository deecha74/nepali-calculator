'use client';

import React, { useState, useMemo } from 'react';
import { Flame, Droplets, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function CalorieBmrWaterCalculator() {
  const { t } = useLanguage();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(27);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [activityMultiplier, setActivityMultiplier] = useState<number>(1.375);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // Mifflin-St Jeor Equation
    const bmr =
      gender === 'male'
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    const tdeeMaintenance = Math.round(bmr * activityMultiplier);
    const weightLossCalories = Math.max(1200, tdeeMaintenance - 500);
    const muscleGainCalories = tdeeMaintenance + 350;

    // Daily Water Intake: ~35ml per kg body weight
    const waterLitersPerDay = (weightKg * 0.035).toFixed(2);
    const dalBhatPlatesEquivalent = (tdeeMaintenance / 650).toFixed(1);

    return {
      bmr: Math.round(bmr),
      tdeeMaintenance,
      weightLossCalories,
      muscleGainCalories,
      waterLitersPerDay,
      dalBhatPlatesEquivalent,
    };
  }, [gender, age, weightKg, heightCm, activityMultiplier]);

  const handleCopy = () => {
    const text = `Daily Calorie, BMR & Water Intake Result:
Basal Metabolic Rate (BMR): ${calculation.bmr} kcal/day
Maintenance Calories (TDEE): ${calculation.tdeeMaintenance} kcal/day
Fat Loss Target (-0.5kg/wk): ${calculation.weightLossCalories} kcal/day
Daily Water Requirement: ${calculation.waterLitersPerDay} Liters/day
Calculated on NepalCalc.com/calorie-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#ffedd5',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Daily Calorie (TDEE), BMR & Water Intake Calculator
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              दैनिक क्यालोरी, BMR र पानीको आवश्यकता (दाल-भात पोषण तुलना सहित)
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setGender('male')}
              style={{
                padding: '10px',
                borderRadius: '10px',
                fontWeight: 700,
                border: gender === 'male' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
                background: gender === 'male' ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
              }}
            >
              👨 {t('Male', 'पुरुष')}
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              style={{
                padding: '10px',
                borderRadius: '10px',
                fontWeight: 700,
                border: gender === 'female' ? '2px solid #db2777' : '1px solid var(--border-subtle)',
                background: gender === 'female' ? '#fdf2f8' : '#ffffff',
                cursor: 'pointer',
              }}
            >
              👩 {t('Female', 'महिला')}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Age (Yrs)</label>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 25)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Weight (KG)</label>
              <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value) || 60)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Height (CM)</label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || 165)} className="text-input" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              Daily Physical Activity Level:
            </label>
            <select
              value={activityMultiplier}
              onChange={(e) => setActivityMultiplier(Number(e.target.value))}
              className="text-input"
              style={{ width: '100%' }}
            >
              <option value={1.2}>Sedentary (Desk Job, Little Exercise)</option>
              <option value={1.375}>Lightly Active (1–3 Days/Week Walk or Gym)</option>
              <option value={1.55}>Moderately Active (3–5 Days/Week Workout)</option>
              <option value={1.725}>Very Active (6–7 Days/Week Sports / Physical Work)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Daily Maintenance Calories (TDEE)
            </div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#fb923c', marginTop: '4px' }}>
              {calculation.tdeeMaintenance.toLocaleString('en-IN')} kcal / day
            </div>
            <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Resting BMR: <strong>{calculation.bmr} kcal/day</strong> • Equals ~{calculation.dalBhatPlatesEquivalent} standard Nepali Dal-Bhat thalis
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff', fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#059669', fontWeight: 700 }}>Weight Loss Target (-0.5 kg/week):</span>
              <strong>{calculation.weightLossCalories} kcal/day</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>Lean Muscle Gain Target:</span>
              <strong>{calculation.muscleGainCalories} kcal/day</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
              <span style={{ color: '#0284c7', fontWeight: 700 }}>💧 Recommended Daily Water Intake:</span>
              <strong>{calculation.waterLitersPerDay} Liters / day</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

