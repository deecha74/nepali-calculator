'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { BookOpen, Copy, Check, Info, ShieldCheck, MapPin } from 'lucide-react';

export function PassportFeeCalculator() {
  const { t } = useLanguage();
  const [pageCount, setPageCount] = useState<'34' | '66'>('34');
  const [submissionLocation, setSubmissionLocation] = useState<'dao' | 'dop_urgent' | 'embassy'>('dao');
  const [isMinor, setIsMinor] = useState<boolean>(false); // Below 10 years
  const [isLostOrDamaged, setIsLostOrDamaged] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    let feeNpr = 5000;
    let feeUsd = 0;

    if (submissionLocation === 'embassy') {
      feeUsd = pageCount === '34' ? 80 : 160;
      if (isLostOrDamaged) feeUsd *= 2;
      if (isMinor) feeUsd = Math.round(feeUsd / 2);
      return { feeNpr: feeUsd * 135, feeUsd, isForeign: true };
    }

    if (submissionLocation === 'dop_urgent') {
      feeNpr = pageCount === '34' ? 10000 : 20000;
    } else {
      feeNpr = pageCount === '34' ? 5000 : 10000;
    }

    if (isLostOrDamaged) {
      feeNpr = submissionLocation === 'dop_urgent' ? (pageCount === '34' ? 15000 : 25000) : (pageCount === '34' ? 10000 : 15000);
    } else if (isMinor) {
      feeNpr = Math.round(feeNpr / 2);
    }

    return { feeNpr, feeUsd: 0, isForeign: false };
  }, [pageCount, submissionLocation, isMinor, isLostOrDamaged]);

  const handleCopy = () => {
    const text = `Nepal e-Passport Fee Summary:
Pages: ${pageCount} Pages
Application Center: ${submissionLocation === 'dop_urgent' ? 'Department of Passport, Tripureshwor (Urgent 3-Day)' : submissionLocation === 'dao' ? 'District Administration Office (DAO)' : 'Embassy Abroad'}
Minor (Under 10): ${isMinor ? 'Yes (50% Off)' : 'No'}
Lost/Damaged: ${isLostOrDamaged ? 'Yes' : 'No'}
Total Fee: ${calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('Department of Passport', 'राहदानी विभाग')}</span>
            <span className="badge badge-blue">{t('e-Passport Standard Rates', 'विद्युतीय राहदानी दर')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('Nepal e-Passport Fee Calculator', 'विद्युतीय राहदानी (e-Passport) दस्तुर')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              'Official government revenue fees for DAO regular, Tripureshwor fast-track, and Nepali Embassies abroad.',
              'जिल्ला प्रशासन कार्यालय (DAO), राहदानी विभाग त्रिपुरेश्वर (द्रुत सेवा) तथा विदेशस्थित नेपाली दूतावासको आधिकारिक राजस्व शुल्क।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Details', 'विवरण कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Submission Location Dropdown */}
          <div>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Application Center / Processing Location', 'आवेदन पेश गर्ने स्थान')}
            </label>
            <select
              value={submissionLocation}
              onChange={(e) => setSubmissionLocation(e.target.value as 'dao' | 'dop_urgent' | 'embassy')}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px', fontWeight: 600 }}
            >
              <option value="dao">
                🏢 {t('District Administration Office (DAO — Regular 10–15 Days)', 'जिल्ला प्रशासन कार्यालय / इलाका प्रशासन (DAO — १०–१५ दिन)')}
              </option>
              <option value="dop_urgent">
                ⚡ {t('Department of Passport, Tripureshwor (Urgent 2–3 Days)', 'राहदानी विभाग, त्रिपुरेश्वर काठमाडौँ (द्रुत सेवा २–३ दिन)')}
              </option>
              <option value="embassy">
                🌍 {t('Nepali Embassy / Consulate Abroad ($80 – $160 USD)', 'विदेशस्थित नेपाली दूतावास / नियोग ($८० देखि $१६० USD)')}
              </option>
            </select>
          </div>

          {/* Page Count Dropdown */}
          <div>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Passport Page Count', 'राहदानीको पृष्ठ संख्या')}
            </label>
            <select
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value as '34' | '66')}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px', fontWeight: 600 }}
            >
              <option value="34">
                📖 {t('34 Pages (Standard — Most Travelers)', '३४ पृष्ठ (सामान्य यात्रुका लागि उपयुक्त)')}
              </option>
              <option value="66">
                📚 {t('66 Pages (Frequent Travelers & Business)', '६६ पृष्ठ (बारम्बार यात्रा गर्नेहरूका लागि)')}
              </option>
            </select>
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isMinor}
                onChange={(e) => {
                  setIsMinor(e.target.checked);
                  if (e.target.checked) setIsLostOrDamaged(false);
                }}
              />
              <span>{t('Minor Under 10 Years (50% Fee Discount — 5-Year Validity)', '१० वर्ष मुनिका नाबालिग (५०% छुट — ५ वर्षे म्याद)')}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isLostOrDamaged}
                onChange={(e) => {
                  setIsLostOrDamaged(e.target.checked);
                  if (e.target.checked) setIsMinor(false);
                }}
              />
              <span>{t('Lost, Stolen or Damaged Passport Replacement', 'हराएको वा च्यातिएको राहदानी प्रतिलिपि')}</span>
            </label>
          </div>
        </div>

        {/* Output Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('Total Government Revenue Fee', 'तिर्नुपर्ने कुल राजस्व दस्तुर')}
            </span>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#38bdf8', margin: '8px 0' }}>
              {calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
              {calculation.isForeign 
                ? t(`Approx. NPR ${(calculation.feeNpr).toLocaleString('en-IN')}`, `नेपाली रुपैयाँ करिब रु ${(calculation.feeNpr).toLocaleString('en-IN')}`)
                : t(
                    `NPR ${calculation.feeNpr.toLocaleString('en-IN')} Only`,
                    `अक्षरमा: ${calculation.feeNpr === 5000 ? 'पाँच हजार' : calculation.feeNpr === 10000 ? 'दश हजार' : calculation.feeNpr === 2500 ? 'दुई हजार पाँच सय' : calculation.feeNpr === 15000 ? 'पन्ध्र हजार' : calculation.feeNpr === 20000 ? 'बीस हजार' : 'पच्चीस हजार'} रुपैयाँ मात्र`
                  )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '20px', paddingTop: '16px', textAlign: 'left', fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>
              <div>• {t('Payment: Nepal Bank Ltd / Rastriya Banijya Bank or online via eSewa / ConnectIPS.', 'भुक्तानी: नेपाल बैंक लिमिटेड / राष्ट्रिय वाणिज्य बैंक वा अनलाइन eSewa/ConnectIPS मार्फत राजस्व दाखिला।')}</div>
              <div>• {t('Original Citizenship, National Identity (NIN) number and online appointment slip required on biometric date.', 'बायोमेट्रिक मितिमा नागरिकताको सक्कल, राष्ट्रिय परिचयपत्र (NIN) नम्बर र अनलाइन फारमको प्रिन्ट अनिवार्य छ।')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
