'use client';

import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, Sparkles, CreditCard, Building } from 'lucide-react';
import { numberToNepaliWords, numberToEnglishWords } from '@/lib/rates/numberToWords';

export function NumberToWordsCalculator() {
  const [amount, setAmount] = useState<number>(125480);
  const [copiedNep, setCopiedNep] = useState(false);
  const [copiedEng, setCopiedEng] = useState(false);

  const nepaliWords = useMemo(() => numberToNepaliWords(amount || 0), [amount]);
  const englishWords = useMemo(() => numberToEnglishWords(amount || 0), [amount]);

  const copyText = (text: string, isNep: boolean) => {
    navigator.clipboard.writeText(text);
    if (isNep) {
      setCopiedNep(true);
      setTimeout(() => setCopiedNep(false), 2000);
    } else {
      setCopiedEng(true);
      setTimeout(() => setCopiedEng(false), 2000);
    }
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Nepal Bank Cheque & Voucher Standard</span>
            <span className="badge badge-neutral">अङ्कलाई अक्षरमा</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Nepali Number to Words (Cheque Writing) Converter
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Convert numeric figures into formal Nepali and English words for Bank Cheques, Invoices, and Legal Documents.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <label className="input-label" style={{ fontSize: '15px' }}>Enter Amount in Numbers (NPR)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#64748b' }}>रु</span>
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="e.g. 50000, 1500000"
            className="text-input"
            style={{ fontSize: '20px', fontWeight: 800 }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {[5000, 25000, 50000, 100000, 500000, 1000000, 2500000].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setAmount(val)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: amount === val ? '#0f172a' : '#f8fafc',
                color: amount === val ? '#ffffff' : '#475569',
                cursor: 'pointer',
              }}
            >
              रु {val.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Nepali Words Card */}
        <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)', border: '1.5px solid #bbf7d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="stat-label" style={{ color: '#047857' }}>Nepali Cheque Words (नेपाली अक्षरमा)</span>
            <button
              onClick={() => copyText(nepaliWords, true)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {copiedNep ? <Check size={14} color="#059669" /> : <Copy size={14} />}
              <span>{copiedNep ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#065f46', lineHeight: '1.5' }}>
            {nepaliWords}
          </div>
          <span style={{ fontSize: '11px', color: '#059669', display: 'block', marginTop: '10px' }}>
            Format: करोड, लाख, हजार, सय, रुपैयाँ मात्र
          </span>
        </div>

        {/* English Words Card */}
        <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)', border: '1.5px solid #bfdbfe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="stat-label" style={{ color: '#1d4ed8' }}>English Words (South Asian System)</span>
            <button
              onClick={() => copyText(englishWords, false)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {copiedEng ? <Check size={14} color="#2563eb" /> : <Copy size={14} />}
              <span>{copiedEng ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af', lineHeight: '1.5' }}>
            {englishWords}
          </div>
          <span style={{ fontSize: '11px', color: '#2563eb', display: 'block', marginTop: '10px' }}>
            Format: Crore, Lakh, Thousand, Rupees Only
          </span>
        </div>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
        ✍️ <strong>Cheque Writing Tip:</strong> When writing cheques in Nepali commercial banks (Nabil, Global IME, NIC Asia, Everest, Prabhu), always terminate the word amount with <code>&quot;मात्र&quot;</code> in Nepali or <code>&quot;Only&quot;</code> in English to prevent unauthorized alter-fill modifications.
      </div>
    </div>
  );
}
