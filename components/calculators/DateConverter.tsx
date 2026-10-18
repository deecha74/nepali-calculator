'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Copy, Check, Clock } from 'lucide-react';
import { 
  NEPALI_MONTHS, 
  NEPALI_DAYS, 
  convertAdToBsApprox, 
  convertBsToAdApprox, 
  calculateExactAge 
} from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';

export function DateConverter() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'bsToAd' | 'adToBs' | 'age'>('bsToAd');

  // BS to AD state
  const [bsYear, setBsYear] = useState<number>(2055);
  const [bsMonth, setBsMonth] = useState<number>(5);
  const [bsDay, setBsDay] = useState<number>(14);

  // AD to BS state
  const [adDateString, setAdDateString] = useState<string>("1998-08-30");

  // Age state (Birthdate in AD or BS)
  const [birthYearBs, setBirthYearBs] = useState<number>(2057);
  const [birthMonthBs, setBirthMonthBs] = useState<number>(7);
  const [birthDayBs, setBirthDayBs] = useState<number>(12);

  const [copied, setCopied] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // BS to AD conversion
  const convertedAd = useMemo(() => {
    const d = convertBsToAdApprox(bsYear, bsMonth, bsDay);
    const dayOfWeek = NEPALI_DAYS[d.getDay()] || NEPALI_DAYS[0];
    return {
      date: d,
      formatted: d.toDateString(),
      dayOfWeek,
    };
  }, [bsYear, bsMonth, bsDay]);

  // AD to BS conversion
  const convertedBs = useMemo(() => {
    const d = new Date(adDateString || "2000-01-01");
    return convertAdToBsApprox(d);
  }, [adDateString]);

  // Age calculation
  const calculatedAge = useMemo(() => {
    const birthAd = convertBsToAdApprox(birthYearBs, birthMonthBs, birthDayBs);
    return calculateExactAge(birthAd, currentDate || undefined);
  }, [birthYearBs, birthMonthBs, birthDayBs, currentDate]);

  const handleCopy = () => {
    let text = "";
    if (mode === 'bsToAd') {
      text = `Nepali Date Conversion:\nBS: ${bsYear}/${bsMonth}/${bsDay}\nAD: ${convertedAd.formatted} (${convertedAd.dayOfWeek.bs} / ${convertedAd.dayOfWeek.en})\nVia NepalCalc.com`;
    } else if (mode === 'adToBs') {
      text = `English to Nepali Date Conversion:\nAD: ${adDateString}\nBS: ${convertedBs.formatted}\nVia NepalCalc.com`;
    } else {
      text = `Exact Age Calculation:\nAge: ${calculatedAge.years} Years, ${calculatedAge.months} Months, ${calculatedAge.days} Days\nTotal Days: ${calculatedAge.totalDays.toLocaleString('en-IN')}\nVia NepalCalc.com`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Bikram Sambat (वि.सं.)</span>
            <span className="badge badge-neutral">Anno Domini (ई.सं.)</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Nepali Date Converter & Exact Age Finder', 'नेपाली मिति रूपान्तरण तथा उमेर क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Convert between Nepali BS and English AD calendar dates and calculate exact age in years, months, and days.',
              'विक्रम संवत् (वि.सं.) र इस्वी संवत् (ई.सं.) बीच मिति रूपान्तरण गर्नुहोस् र वर्ष, महिना तथा दिनमा यकिन उमेर पत्ता लगाउनुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Result', 'नतिजा कपी गर्नुहोस्')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          className={`segmented-btn ${mode === 'bsToAd' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('bsToAd')}
        >
          {t('📅 BS to AD (Nepali to English)', '📅 वि.सं. देखि ई.सं. (नेपाली ➔ अंग्रेजी)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${mode === 'adToBs' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('adToBs')}
        >
          {t('🌍 AD to BS (English to Nepali)', '🌍 ई.सं. देखि वि.सं. (अंग्रेजी ➔ नेपाली)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${mode === 'age' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('age')}
        >
          {t('🎂 Exact Age Calculator', '🎂 यकिन उमेर क्याल्कुलेटर (Age)')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Input Panel */}
        <div>
          {mode === 'bsToAd' && (
            <div>
              <span className="input-label" style={{ marginBottom: '14px' }}>
                {t('Select Bikram Sambat (BS) Date:', 'विक्रम संवत् (वि.सं.) मिति छान्नुहोस्:')}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '10px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('YEAR (साल)', 'साल (Year)')}</label>
                  <input
                    type="number"
                    min={2000}
                    max={2095}
                    className="text-input"
                    value={bsYear}
                    onChange={(e) => setBsYear(Number(e.target.value) || 2055)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('MONTH (महिना)', 'महिना (Month)')}</label>
                  <select
                    className="select-input"
                    value={bsMonth}
                    onChange={(e) => setBsMonth(Number(e.target.value))}
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.num} value={m.num}>
                        {m.num}. {m.bs} ({m.en})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('DAY (गते)', 'गते (Day)')}</label>
                  <input
                    type="number"
                    min={1}
                    max={32}
                    className="text-input"
                    value={bsDay}
                    onChange={(e) => setBsDay(Number(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'adToBs' && (
            <div>
              <label className="input-label">{t('Select English (AD) Date', 'अंग्रेजी (ई.सं.) मिति छान्नुहोस्')}</label>
              <input
                type="date"
                className="text-input"
                style={{ fontSize: '16px' }}
                value={adDateString}
                onChange={(e) => setAdDateString(e.target.value)}
              />
            </div>
          )}

          {mode === 'age' && (
            <div>
              <span className="input-label" style={{ marginBottom: '14px' }}>
                {t('Enter Birth Date in BS (Bikram Sambat):', 'जन्म मिति वि.सं. छान्नुहोस्:')}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '10px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('YEAR (साल)', 'साल (Year)')}</label>
                  <input
                    type="number"
                    min={1980}
                    max={2083}
                    className="text-input"
                    value={birthYearBs}
                    onChange={(e) => setBirthYearBs(Number(e.target.value) || 2055)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('MONTH (महिना)', 'महिना (Month)')}</label>
                  <select
                    className="select-input"
                    value={birthMonthBs}
                    onChange={(e) => setBirthMonthBs(Number(e.target.value))}
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.num} value={m.num}>{m.num}. {m.bs}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('DAY (गते)', 'गते (Day)')}</label>
                  <input
                    type="number"
                    min={1}
                    max={32}
                    className="text-input"
                    value={birthDayBs}
                    onChange={(e) => setBirthDayBs(Number(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {mode === 'bsToAd' && (
            <div className="result-card-highlight">
              <span className="stat-label">{t('Converted English (AD) Date', 'रूपान्तरित अंग्रेजी (ई.सं.) मिति')}</span>
              <div className="stat-value" style={{ color: '#2563eb', margin: '6px 0 2px' }}>
                {convertedAd.formatted}
              </div>
              <span className="stat-subvalue">
                {t('Day:', 'वार:')} {convertedAd.dayOfWeek.bs} ({convertedAd.dayOfWeek.en})
              </span>
            </div>
          )}

          {mode === 'adToBs' && (
            <div className="result-card-highlight">
              <span className="stat-label">{t('Converted Nepali (BS) Date', 'रूपान्तरित नेपाली (वि.सं.) मिति')}</span>
              <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                {convertedBs.formatted}
              </div>
              <span className="stat-subvalue">
                {t('Bikram Sambat Calendar Output', 'विक्रम संवत् पञ्चाङ्ग गणना')}
              </span>
            </div>
          )}

          {mode === 'age' && (
            <div className="result-card-highlight">
              <span className="stat-label">{t('Your Exact Age', 'तपाईंको यकिन उमेर')}</span>
              <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px', fontSize: '24px' }}>
                {calculatedAge.years} {t('Years', 'वर्ष')}, {calculatedAge.months} {t('Months', 'महिना')}, {calculatedAge.days} {t('Days', 'दिन')}
              </div>
              <span className="stat-subvalue">
                {t('Total Lived:', 'कुल बितेको अवधि:')} {calculatedAge.totalDays.toLocaleString('en-IN')} {t('Days', 'दिन')} ({calculatedAge.totalWeeks.toLocaleString('en-IN')} {t('Weeks', 'हप्ता')})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
