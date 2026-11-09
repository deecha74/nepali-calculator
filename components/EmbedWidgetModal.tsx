'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Code2, Copy, Check, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function EmbedWidgetButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname() || '/';
  const { t } = useLanguage();

  const embedPath = pathname === '/' ? '/tax' : pathname;
  const fullUrl = `https://nepalicalc.com${embedPath}`;

  const embedCode = `<!-- NepaliCalc.com Interactive Calculator Widget -->
<div style="max-width:100%;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;box-shadow:0 4px 12px rgba(15,23,42,0.05);">
  <iframe src="${fullUrl}" width="100%" height="680" style="border:0;display:block;" loading="lazy" title="Nepal Calculator by NepaliCalc.com"></iframe>
  <div style="padding:8px 14px;background:#f8fafc;border-top:1px solid #e2e8f0;font-family:system-ui,-apple-system,sans-serif;font-size:12px;color:#475569;text-align:right;">
    Powered by <a href="${fullUrl}" target="_blank" rel="dofollow" style="color:#0b2b5c;font-weight:700;text-decoration:none;">NepaliCalc.com — Official Nepal Calculators</a>
  </div>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 12px',
          borderRadius: '9999px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#f8fafc',
          color: '#0b2b5c',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        <Code2 size={13} />
        <span>{t('Embed Calculator', 'क्यालकुलेटर इम्बेड गर्नुहोस्')}</span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '580px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    color: '#0b2b5c',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Code2 size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    {t('Embed This Calculator on Your Website', 'यो क्यालकुलेटर आफ्नो वेबसाइटमा राख्नुहोस्')}
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                    {t('100% Free for blogs, CA firms, real estate portals & news sites.', 'ब्लग, शैक्षिक संस्था र वेबसाइटहरूका लागि निःशुल्क विजेट।')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close modal"
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <pre
              style={{
                backgroundColor: '#0f172a',
                color: '#e2e8f0',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '11.5px',
                lineHeight: 1.5,
                overflowX: 'auto',
                margin: '12px 0 16px',
                fontFamily: 'monospace',
              }}
            >
              {embedCode}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: copied ? '#059669' : '#0b2b5c',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 750,
                  cursor: 'pointer',
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? t('Copied HTML Snippet!', 'कपी भयो!') : t('Copy Embed Code', 'इम्बेड कोड कपी गर्नुहोस्')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

