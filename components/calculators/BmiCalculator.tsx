'use client';

import React, { useState, useMemo } from 'react';
import { Activity, Copy, Check, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function BmiCalculator() {
  const { t, language } = useLanguage();
  const ne = language === 'ne';

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
      return { bmi: 0, statusEn: 'Normal', statusNe: 'उचित तौल', color: '#10b981', minIdealKg: 0, maxIdealKg: 0 };
    }

    const bmi = weightKg / (totalMeters * totalMeters);
    const roundedBmi = Math.round(bmi * 10) / 10;

    let statusEn = 'Healthy & Normal';
    let statusNe = 'उचित तौल';
    let color = '#10b981';

    if (roundedBmi < 18.5) {
      statusEn = 'Underweight';
      statusNe = 'तौल कम (अल्पतौल)';
      color = '#3b82f6';
    } else if (roundedBmi <= 22.9) {
      statusEn = 'Healthy & Normal';
      statusNe = 'उचित तौल';
      color = '#10b981';
    } else if (roundedBmi <= 27.4) {
      statusEn = 'Overweight (South Asian Risk)';
      statusNe = 'बढी तौल';
      color = '#f59e0b';
    } else {
      statusEn = 'Obese (High Health Risk)';
      statusNe = 'मोटोपन (अत्यधिक तौल)';
      color = '#ef4444';
    }

    // Ideal weight range for normal BMI (18.5 to 22.9)
    const minIdealKg = Math.round(18.5 * (totalMeters * totalMeters));
    const maxIdealKg = Math.round(22.9 * (totalMeters * totalMeters));

    return {
      bmi: roundedBmi,
      statusEn,
      statusNe,
      color,
      minIdealKg,
      maxIdealKg,
    };
  }, [heightUnit, feet, inches, heightCm, weightKg]);

  const handleCopy = () => {
    const text = `Nepal BMI & Health Status:
Height: ${heightUnit === 'feet' ? `${feet}ft ${inches}in` : `${heightCm} cm`}
Weight: ${weightKg} kg
BMI Score: ${result.bmi} (${ne ? result.statusNe : result.statusEn})
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
            <span className="badge badge-emerald">{t('WHO South Asian BMI Cutoff', 'विश्व स्वास्थ्य संगठन दक्षिण एसियाली मापदण्ड')}</span>
            <span className="badge badge-neutral">{t('Health Assessment', 'स्वास्थ्य जाँच')}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('BMI (Body Mass Index) Calculator Nepal', 'नेपाल बिएमआई तथा उचित तौल क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate your Body Mass Index with South Asian health criteria, obesity risk tiers, and ideal weight targets.',
              'दक्षिण एसियाली स्वास्थ्य मापदण्ड अनुसार आफ्नो बिएमआई स्कोर, मोटोपनको जोखिम र आदर्श तौल सीमा पत्ता लगाउनुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Result', 'नतिजा कपी गर्नुहोस्')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Height Measurement Unit', 'उचाइ नाप्ने एकाइ')}</label>
            <select
              className="select-input"
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as 'feet' | 'cm')}
              style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}
            >
              <option value="feet">{t('Feet & Inches', 'फिट र इन्च')}</option>
              <option value="cm">{t('Centimeters (cm)', 'सेन्टीमिटर')}</option>
            </select>
          </div>

          {heightUnit === 'feet' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="input-label">{t('Feet', 'फिट')}</label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(Math.max(3, Math.min(8, Number(e.target.value))))}
                  className="text-input"
                />
              </div>
              <div>
                <label className="input-label">{t('Inches', 'इन्च')}</label>
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
              <label className="input-label">{t('Height in Centimeters', 'उचाइ (सेन्टीमिटरमा)')}</label>
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
              <label className="input-label" style={{ margin: 0 }}>{t('Weight (Kilograms)', 'तौल (किलोग्राममा)')}</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{weightKg} {t('kg', 'के.जी.')}</span>
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
            <span className="stat-label">{t('Your Body Mass Index (BMI)', 'तपाईंको बिएमआई (BMI) स्कोर')}</span>
            <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: result.color, marginTop: '4px' }}>
              {result.bmi}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: result.color, marginTop: '2px' }}>
              {ne ? result.statusNe : result.statusEn}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <span className="stat-label">{t('Ideal Healthy Weight For Your Height', 'तपाईंको उचाइ अनुसार उपयुक्त तौल')}</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {result.minIdealKg} kg — {result.maxIdealKg} kg
              </div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {t('Healthy BMI range is between 18.5 and 22.9.', 'स्वस्थ बिएमआई सीमा १८.५ देखि २२.९ बीच मानिन्छ।')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
