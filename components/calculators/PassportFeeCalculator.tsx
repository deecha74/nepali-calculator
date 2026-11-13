'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { BookOpen, Copy, Check, Info, ShieldCheck, MapPin } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

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
    const text = `${t('Nepal e-Passport Fee Summary:', 'नेपाल विद्युतीय राहदानी दस्तुर सारांश:')}
${t('Pages:', 'पृष्ठ संख्या:')} ${pageCount} ${t('Pages', 'पृष्ठ')}
${t('Application Center:', 'आवेदन केन्द्र:')} ${submissionLocation === 'dop_urgent' ? t('Department of Passport, Tripureshwor (Urgent 3-Day)', 'राहदानी विभाग त्रिपुरेश्वर (द्रुत सेवा)') : submissionLocation === 'dao' ? t('District Administration Office (DAO)', 'जिल्ला प्रशासन कार्यालय') : t('Nepali Embassy Abroad', 'विदेशस्थित नेपाली दूतावास')}
${t('Minor (Under 10):', '१० वर्ष मुनिका नाबालिग:')} ${isMinor ? t('Yes (50% Off)', 'हो (५०% छुट)') : t('No', 'होइन')}
${t('Lost/Damaged:', 'हराएको वा च्यातिएको:')} ${isLostOrDamaged ? t('Yes', 'हो') : t('No', 'होइन')}
${t('Total Revenue Fee:', 'कुल राजस्व दस्तुर:')} ${calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
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
            <span className="badge badge-blue">{t('Official Revenue Rates', 'आधिकारिक राजस्व दर')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('Nepal e-Passport Fee Calculator', 'विद्युतीय राहदानी दस्तुर क्याल्कुलेटर')}
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
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Mobile Instant Above the Fold */}
          <MobileInstantResult
            primaryLabel={t('Official Fee', 'सरकारी दस्तुर')}
            primaryValue={calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
            primarySubtext={calculation.isForeign ? `Approx. NPR ${calculation.feeNpr.toLocaleString('en-IN')}` : `${pageCount} ${t('Pages', 'पृष्ठ')}`}
            secondaryLabel={t('Processing', 'प्रक्रिया')}
            secondaryValue={submissionLocation === 'dop_urgent' ? t('2-3 Days', '२-३ दिन') : submissionLocation === 'dao' ? t('10-15 Days', '१०-१५ दिन') : t('Embassy', 'दूतावास')}
            tertiaryLabel={t('Pages', 'पृष्ठ')}
            tertiaryValue={`${pageCount} Pgs`}
            badge={submissionLocation === 'dop_urgent' ? t('Urgent Fast-Track', 'द्रुत सेवा') : t('Regular DAO', 'जिल्ला प्रशासन')}
            accentColor="blue"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="passport-breakdown-details"
          />

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
                🏢 {t('District Administration Office (DAO — Regular 10–15 Days)', 'जिल्ला प्रशासन कार्यालय / इलाका प्रशासन (१०–१५ दिन)')}
              </option>
              <option value="dop_urgent">
                ⚡ {t('Department of Passport, Tripureshwor (Urgent 2–3 Days)', 'राहदानी विभाग, त्रिपुरेश्वर काठमाडौँ (द्रुत सेवा २–३ दिन)')}
              </option>
              <option value="embassy">
                🌍 {t('Nepali Embassy / Consulate Abroad ($80 – $160 USD)', 'विदेशस्थित नेपाली दूतावास / नियोग ($८० देखि $१६० USD)')}
              </option>
            </select>
          </div>

          {/* Page Count */}
          <div>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
              {t('Passport Page Count', 'राहदानीको पृष्ठ संख्या')}
            </label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${pageCount === '34' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                onClick={() => setPageCount('34')}
              >
                {t('34 Pages (Standard)', '३४ पृष्ठ (सामान्य)')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${pageCount === '66' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                onClick={() => setPageCount('66')}
              >
                {t('66 Pages (Frequent Traveler)', '६६ पृष्ठ (बारम्बार यात्रु)')}
              </button>
            </div>
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
                style={{ width: '16px', height: '16px', accentColor: '#003893' }}
              />
              <span>{t('Minor Under 10 Years (50% Fee Discount)', '१० वर्ष मुनिका नाबालिग (५०% राजस्व छुट)')}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isLostOrDamaged}
                onChange={(e) => {
                  setIsLostOrDamaged(e.target.checked);
                  if (e.target.checked) setIsMinor(false);
                }}
                style={{ width: '16px', height: '16px', accentColor: '#003893' }}
              />
              <span>{t('Lost, Stolen or Damaged Passport Replacement', 'हराएको वा च्यातिएको राहदानी प्रतिलिपि')}</span>
            </label>
          </div>
        </div>

        {/* Clean Light-Themed Output Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            id="passport-breakdown-details"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Total Government Revenue Fee', 'तिर्नुपर्ने कुल सरकारी राजस्व दस्तुर')}
            </span>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              {calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Application Center', 'आवेदन केन्द्र')}:</span>
                <strong style={{ color: '#0f172a' }}>
                  {submissionLocation === 'dop_urgent' ? t('Tripureshwor Fast-Track', 'त्रिपुरेश्वर द्रुत सेवा') : submissionLocation === 'dao' ? t('District Admin (DAO)', 'जिल्ला प्रशासन (DAO)') : t('Embassy Abroad', 'विदेशस्थित दूतावास')}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Booklet Size', 'पुस्तिका आकार')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{pageCount} {t('Pages', 'पृष्ठ')}</strong>
              </div>
              {calculation.isForeign && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>{t('Approximate NPR Equivalent', 'नेपाली रुपैयाँ बराबर')}:</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>रु {calculation.feeNpr.toLocaleString('en-IN')}</strong>
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                'Payment: Accepted via Nepal Bank Ltd, Rastriya Banijya Bank counters or online via ConnectIPS / eSewa.',
                'भुक्तानी: नेपाल बैंक वा राष्ट्रिय वाणिज्य बैंक काउन्टर अथवा ConnectIPS र eSewa मार्फत राजस्व दाखिला गर्न सकिन्छ।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
