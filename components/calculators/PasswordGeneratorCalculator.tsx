'use client';

import React, { useState, useMemo } from 'react';
import { Lock, RefreshCw, Copy, Check } from 'lucide-react';

export function PasswordGeneratorCalculator() {
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
    let strength = 'Strong (सुरक्षित)';
    if (entropyBits >= 90) strength = 'Military Grade / Unbreakable (अत्यन्त सुरक्षित)';
    else if (entropyBits < 55) strength = 'Weak — Increase Length';

    return { pwd, entropyBits, strength };
  }, [length, useUpper, useLower, useNumbers, useSymbols, seed]);

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
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
            Secure Password Generator & Entropy Checker
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={() => setSeed((s) => s + 1)} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            <RefreshCw size={15} /> Regenerate
          </button>
          <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            {copied ? <Check size={15} color="#059669" /> : <Copy size={15} />}
            <span>{copied ? 'Copied!' : 'Copy Password'}</span>
          </button>
        </div>
      </div>

      <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#4ade80', fontFamily: 'monospace', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, wordBreak: 'break-all', marginBottom: '20px' }}>
        {generated.pwd}
        <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'sans-serif', marginTop: '6px' }}>
          Entropy: <strong>{generated.entropyBits} bits</strong> • {generated.strength}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
        <div>
          <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
            Password Length: {length} characters
          </label>
          <input type="range" min={8} max={48} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13.5px', fontWeight: 700 }}>
          <label><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase (A-Z)</label>
          <label><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> Lowercase (a-z)</label>
          <label><input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} /> Numbers (0-9)</label>
          <label><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Symbols (!@#$)</label>
        </div>
      </div>
    </div>
  );
}

