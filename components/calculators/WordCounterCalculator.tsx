'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { FileText, Copy, Check, Trash2 } from 'lucide-react';

export function WordCounterCalculator() {
  const { t } = useLanguage();
  const [text, setText] = useState<string>(
    'नेपालको संविधान २०७२ र लोक सेवा आयोगको कम्प्युटर टाइपिङ परीक्षामा शब्द तथा अक्षर गणना अत्यन्त उपयोगी हुन्छ। Paste your English or Nepali Unicode text here to count words, characters, sentences, and Loksewa keystrokes.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed ? trimmed.split(/[.!?।]+/).filter((s) => s.trim().length > 0).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    // Standard Loksewa typing benchmark: 5 keystrokes = 1 standard word
    const loksewaStandardWords = Math.round(charsWithSpaces / 5);
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      loksewaStandardWords,
      readingTimeMinutes,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
              {t('Word & Character Counter', 'शब्द तथा अक्षर गणना')}
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '7px 12px', fontSize: '12.5px' }}>
            {copied ? <Check size={15} color="#059669" /> : <Copy size={15} />}
            <span>{copied ? 'Copied Text!' : 'Copy Text'}</span>
          </button>
          <button type="button" onClick={() => setText('')} className="btn-secondary" style={{ padding: '7px 12px', fontSize: '12.5px', color: '#dc2626' }}>
            <Trash2 size={15} /> Clear
          </button>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '18px' }}>
        {[
          { label: 'Total Words (शब्द)', val: stats.words, color: '#2563eb' },
          { label: 'Characters (अक्षर)', val: stats.charsWithSpaces, color: '#059669' },
          { label: 'No Spaces', val: stats.charsWithoutSpaces, color: '#7c3aed' },
          { label: 'Sentences (वाक्य)', val: stats.sentences, color: '#d97706' },
          { label: 'Loksewa 5-Char Words', val: stats.loksewaStandardWords, color: '#dc2626' },
        ].map((item) => (
          <div key={item.label} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: item.color }}>{item.val.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>{item.label}</div>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Type or paste English or Nepali Unicode text here..."
        className="text-input"
        style={{ width: '100%', padding: '14px', fontSize: '15px', lineHeight: 1.6, resize: 'vertical' }}
      />
    </div>
  );
}

