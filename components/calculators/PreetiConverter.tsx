'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, RotateCcw, Type } from 'lucide-react';
import { preetiToUnicode, unicodeToPreeti } from '@/lib/rates/preetiUnicode';
import { useLanguage } from '@/components/LanguageContext';

export function PreetiConverter() {
  const { t } = useLanguage();
  const [sourceText, setSourceText] = useState<string>('g]kfn sfnfls');
  const [direction, setDirection] = useState<'preetiToUnicode' | 'unicodeToPreeti'>('preetiToUnicode');
  const [copied, setCopied] = useState<boolean>(false);

  const convertedText = useMemo(() => {
    if (direction === 'preetiToUnicode') {
      return preetiToUnicode(sourceText);
    } else {
      return unicodeToPreeti(sourceText);
    }
  }, [sourceText, direction]);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setDirection((prev) => (prev === 'preetiToUnicode' ? 'unicodeToPreeti' : 'preetiToUnicode'));
    setSourceText(convertedText);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('Nepal Standard Font Converter', 'नेपाल मानक फन्ट रूपान्तरक')}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Preeti to Nepali Unicode Converter', 'प्रिती देखि युनिकोड रूपान्तरण (Preeti to Unicode)')}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Instantly convert legacy Preeti/Kantipur font text to standard Nepali Unicode for Facebook, Word, websites, and mobile.',
              'परम्परागत प्रिती तथा कान्तिपुर फन्टलाई फेसबुक, वर्ड, वेबसाइट र मोबाइलमा पढ्न मिल्ने मानक नेपाली युनिकोडमा तुरुन्त रूपान्तरण गर्नुहोस्।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSwap} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            <ArrowLeftRight size={16} />
            <span>{t('Switch Direction', 'दिशा बदल्नुहोस्')}</span>
          </button>
          <button onClick={handleCopy} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: '#059669' }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Output', 'नतिजा कपी गर्नुहोस्')}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Source Textarea */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label className="input-label" style={{ margin: 0, fontWeight: 700 }}>
              {direction === 'preetiToUnicode' 
                ? t('Type or Paste Preeti Font Text', 'यहाँ प्रिती फन्टको अक्षर टाइप वा पेस्ट गर्नुहोस्')
                : t('Type or Paste Unicode Nepali Text', 'यहाँ युनिकोड नेपाली टाइप वा पेस्ट गर्नुहोस्')}
            </label>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>
              {sourceText.length} {t('characters', 'अक्षरहरू')}
            </span>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={direction === 'preetiToUnicode' 
              ? t('Type or paste Preeti font text here...', 'यहाँ प्रिती फन्टको अक्षर टाइप वा पेस्ट गर्नुहोस्...') 
              : t('Type or paste Unicode Nepali here...', 'यहाँ युनिकोड नेपाली टाइप वा पेस्ट गर्नुहोस्...')}
            style={{
              width: '100%',
              height: '240px',
              padding: '14px',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
              fontFamily: direction === 'preetiToUnicode' ? 'monospace' : 'var(--font-sans)',
              fontSize: '15px',
              lineHeight: '1.6',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Output Converted Textarea */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label className="input-label" style={{ margin: 0, fontWeight: 700, color: '#059669' }}>
              {direction === 'preetiToUnicode' 
                ? t('Converted Nepali Unicode (Output)', 'रूपान्तरित नेपाली युनिकोड (नतिजा)') 
                : t('Converted Preeti Text (Output)', 'रूपान्तरित प्रिती फन्ट (नतिजा)')}
            </label>
            <button
              onClick={() => setSourceText('')}
              style={{ background: 'none', border: 'none', fontSize: '11px', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <RotateCcw size={12} /> {t('Clear', 'खाली गर्नुहोस्')}
            </button>
          </div>
          <textarea
            readOnly
            value={convertedText}
            placeholder={t('Converted text will appear here...', 'रूपान्तरित पाठ यहाँ देखिनेछ...')}
            style={{
              width: '100%',
              height: '240px',
              padding: '14px',
              borderRadius: '12px',
              border: '1.5px solid #86efac',
              background: '#f0fdf4',
              color: '#064e3b',
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '1.6',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
        💡 <strong>{t('Pro-Tip:', 'महत्वपूर्ण सुझाव:')}</strong> {t(
          'Preeti is a legacy non-Unicode font. Text written in Preeti cannot be read correctly on smartphones, tablets, or Facebook unless the recipient has the Preeti font file installed. Converting to Nepali Unicode guarantees that your text renders perfectly across every device, browser, search engine, and social media platform!',
          'प्रिती पुरानो नन-युनिकोड फन्ट हो। प्रितीमा लेखिएको पाठ फेसबुक वा मोबाइलमा विना फन्ट देखिँदैन। नेपाली युनिकोडमा रूपान्तरण गरेपछि यो सबै स्मार्टफोन, कम्प्युटर र सामाजिक सञ्जालमा शतप्रतिशत स्पष्ट देखिन्छ!'
        )}
      </div>
    </div>
  );
}
