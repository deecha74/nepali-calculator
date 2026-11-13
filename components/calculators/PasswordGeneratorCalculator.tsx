'use client';

import React, { useState, useMemo } from 'react';
import { Lock, RefreshCw, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function PasswordGeneratorCalculator() {
  const { t } = useLanguage();
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const generated = useMemo(() => {
    void seed;
    let pool = '';
    if (useUpper) pool += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (useLower) pool += 'abcdefghijkmnopqrstuvwxyz';
    if (useNumbers) pool += '23456789';
    if (useSymbols) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!pool) pool = 'abcdefghijkmnopqrstuvwxyz23456789';

    let pwd = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      pwd += pool[idx];
    }

    const entropyBits = Math.round(length * Math.log2(pool.length));
    let strength = t('Strong', 'सुरक्षित');
    if (entropyBits >= 90) strength = t('Military Grade / Unbreakable', 'अत्यन्त सुरक्षित');
    else if (entropyBits < 55) strength = t('Weak — Increase Length', 'कमजोर — लम्बाइ बढाउनुहोस्');

    return { pwd, entropyBits, strength };
  }, [length, useUpper, useLower, useNumbers, useSymbols, seed, t]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generated.pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={22} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
            {t('Secure Password Generator & Entropy Checker', 'सुरक्षित पासवर्ड जेनेरेटर तथा सुरक्षा जाँच')}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={() => setSeed((s) => s + 1)} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            <RefreshCw size={15} /> {t('Regenerate', 'नयाँ बनाउनुहोस्')}
          </button>
          <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            {copied ? <Check size={15} color="#059669" /> : <Copy size={15} />}
            <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Password', 'पासवर्ड कपी')}</span>
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          backgroundColor: '#f8fafc',
          border: '2px solid #003893',
          boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)',
          color: '#003893',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(20px, 3vw, 26px)',
          fontWeight: 800,
          wordBreak: 'break-all',
          marginBottom: '20px'
        }}
      >
        {generated.pwd}
        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'var(--font-sans)', marginTop: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
          {t('Entropy:', 'सुरक्षा स्तर:')} <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>{generated.entropyBits} bits</strong> • <strong style={{ color: '#0f172a' }}>{generated.strength}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            {t(`Password Length: ${length} characters`, `पासवर्ड लम्बाइ: ${length} अक्षर`)}
          </label>
          <input type="range" min={8} max={48} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13.5px', fontWeight: 700 }}>
          <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> {t('Uppercase (A-Z)', 'ठूला अक्षर (A-Z)')}</label>
          <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> {t('Lowercase (a-z)', 'साना अक्षर (a-z)')}</label>
          <label><input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> {t('Numbers (0-9)', 'अंक (०-९)')}</label>
          <label><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> {t('Symbols (!@#$)', 'चिह्नहरू (!@#$)')}</label>
        </div>
      </div>
    </div>
  );
}
