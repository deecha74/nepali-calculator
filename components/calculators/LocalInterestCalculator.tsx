'use client';

import React, { useState, useMemo } from 'react';
import { Coins, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function LocalInterestCalculator() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'local' | 'fd'>('local');

  // Local byaj inputs
  const [principal, setPrincipal] = useState<number>(100000); // 1 Lakh
  const [sayakadaRate, setSayakadaRate] = useState<number>(2); // 2% per month
  const [months, setMonths] = useState<number>(6); // 6 months
  const [isChakrabriddhi, setIsChakrabriddhi] = useState<boolean>(false); // Compound

  // Bank FD inputs
  const [fdAmount, setFdAmount] = useState<number>(500000); // 5 Lakhs
  const [fdAnnualRate, setFdAnnualRate] = useState<number>(7.5); // 7.5% p.a.
  const [fdMonths, setFdMonths] = useState<number>(12); // 1 Year

  const [copied, setCopied] = useState<boolean>(false);

  // Local byaj calculation
  const localCalc = useMemo(() => {
    const monthlyRate = sayakadaRate / 100;
    let totalInterest = 0;
    if (!isChakrabriddhi) {
      totalInterest = principal * monthlyRate * months;
    } else {
      totalInterest = principal * (Math.pow(1 + monthlyRate, months) - 1);
    }
    const monthlyInterest = principal * monthlyRate;
    const totalAmount = principal + totalInterest;

    return {
      monthlyInterest,
      totalInterest,
      totalAmount,
      annualEquivalentRate: sayakadaRate * 12,
    };
  }, [principal, sayakadaRate, months, isChakrabriddhi]);

  // Bank FD calculation (Quarterly compounding standard in Nepal + 5% TDS on interest)
  const fdCalc = useMemo(() => {
    const p = fdAmount;
    const r = fdAnnualRate / 100;
    const t = fdMonths / 12;
    const n = 4; // quarterly

    const maturityAmount = p * Math.pow(1 + r / n, n * t);
    const grossInterest = maturityAmount - p;
    const tdsTax = grossInterest * 0.05; // 5% TDS in Nepal
    const netInterest = grossInterest - tdsTax;
    const netMaturity = p + netInterest;

    return {
      grossInterest,
      tdsTax,
      netInterest,
      netMaturity,
    };
  }, [fdAmount, fdAnnualRate, fdMonths]);

  const handleCopy = () => {
    let text = "";
    if (mode === 'local') {
      text = `Nepali Local Byaj Calculation:
Principal: रु ${principal.toLocaleString('en-IN')}
Interest Rate: ${sayakadaRate}% monthly (${localCalc.annualEquivalentRate}% annual)
Duration: ${months} Months
Monthly Interest: रु ${Math.round(localCalc.monthlyInterest).toLocaleString('en-IN')}
Total Interest: रु ${Math.round(localCalc.totalInterest).toLocaleString('en-IN')}
Total Payable: रु ${Math.round(localCalc.totalAmount).toLocaleString('en-IN')}
Via NepalCalc.com`;
    } else {
      text = `Bank Fixed Deposit Calculation:
FD Amount: रु ${fdAmount.toLocaleString('en-IN')}
Annual Rate: ${fdAnnualRate}% | Duration: ${fdMonths} Months
Gross Interest: रु ${Math.round(fdCalc.grossInterest).toLocaleString('en-IN')}
5% TDS Tax: रु ${Math.round(fdCalc.tdsTax).toLocaleString('en-IN')}
Net In-Hand Interest: रु ${Math.round(fdCalc.netInterest).toLocaleString('en-IN')}
Total Maturity: रु ${Math.round(fdCalc.netMaturity).toLocaleString('en-IN')}
Via NepalCalc.com`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber">{t('Local Lending & Fixed Deposit', 'सयकडा ब्याज तथा मुद्दती बचत')}</span>
            <span className="badge badge-neutral">{t('5% TDS Deduction', '५% अग्रिम कर (TDS)')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Nepali Byaj & Bank Fixed Deposit Calculator', 'नेपाली ब्याज तथा बैंक मुद्दती खाता क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate local monthly interest rate (Sayakada) and commercial bank Fixed Deposit returns with tax.',
              'गाउँघरको मासिक सयकडा ब्याज तथा वाणिज्य बैंकहरूको मुद्दती निक्षेपको खुद प्रतिफल हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Summary', 'विवरण कपी')}</span>
        </button>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          className={`segmented-btn ${mode === 'local' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('local')}
        >
          {t('🤝 Local Monthly Interest (Sayakada)', '🤝 गाउँघरको सयकडा ब्याज')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${mode === 'fd' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('fd')}
        >
          {t('🏦 Bank Fixed Deposit (FD)', '🏦 बैंक मुद्दती खाता')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {mode === 'local' ? (
          <>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Principal Amount (NPR)', 'साउँ रकम (रु)')}</label>
                <input
                  type="number"
                  min={1000}
                  className="text-input"
                  style={{ fontSize: '18px', fontWeight: 700 }}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Monthly Interest Rate (% per month / Sayakada)', 'मासिक ब्याज दर (सयकडा)')}</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 1 ? 'active' : ''}`} onClick={() => setSayakadaRate(1)}>{t('1% / Sayakada 1', 'सयकडा १')}</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 1.5 ? 'active' : ''}`} onClick={() => setSayakadaRate(1.5)}>{t('1.5%', 'सयकडा १.५')}</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 2 ? 'active' : ''}`} onClick={() => setSayakadaRate(2)}>{t('2% / Sayakada 2', 'सयकडा २')}</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 3 ? 'active' : ''}`} onClick={() => setSayakadaRate(3)}>{t('3% / Sayakada 3', 'सयकडा ३')}</button>
                </div>
                <input
                  type="number"
                  step="0.1"
                  className="text-input"
                  value={sayakadaRate}
                  onChange={(e) => setSayakadaRate(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">
                  {t(
                    `${sayakadaRate}% per month = ${sayakadaRate * 12}% per year`,
                    `सयकडा ${sayakadaRate} = प्रति महिना ${sayakadaRate}% = वार्षिक ${sayakadaRate * 12}%`
                  )}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Duration (Months)', 'अवधि (महिनामा)')}</label>
                <input
                  type="number"
                  min={1}
                  className="text-input"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value) || 1)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{t('Compound Interest (Chakrabriddhi)', 'चक्रवृद्धि ब्याज')}</span>
                <input
                  type="checkbox"
                  checked={isChakrabriddhi}
                  onChange={(e) => setIsChakrabriddhi(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div>
              <div className="result-card-highlight">
                <span className="stat-label">{t('Total Payable (Principal + Interest)', 'कुल फिर्ता रकम (साउँ + ब्याज)')}</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  रु {Math.round(localCalc.totalAmount).toLocaleString('en-IN')}
                </div>
                <span className="stat-subvalue">
                  {t(
                    `Principal रु ${principal.toLocaleString('en-IN')} for ${months} months`,
                    `साउँ रु ${principal.toLocaleString('en-IN')} मा ${months} महिनाको हिसाब`
                  )}
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Monthly Interest', 'मासिक ब्याज')}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(localCalc.monthlyInterest).toLocaleString('en-IN')} / {t('mo', 'महिना')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t(`Total Interest (${months} Months)`, `कुल जम्मा ब्याज (${months} महिना)`)}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#d97706' }}>रु {Math.round(localCalc.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Calculation Mode', 'ब्याजको प्रकार')}</span>
                    <span style={{ fontWeight: 600 }}>{isChakrabriddhi ? t('Compound', 'चक्रवृद्धि') : t('Simple', 'साधारण')}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Deposit Amount (NPR)', 'मुद्दती खाता रकम (रु)')}</label>
                <input
                  type="number"
                  min={10000}
                  className="text-input"
                  style={{ fontSize: '18px', fontWeight: 700 }}
                  value={fdAmount}
                  onChange={(e) => setFdAmount(Number(e.target.value) || 0)}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Annual Interest Rate (% p.a.)', 'वार्षिक ब्याज दर (%)')}</label>
                <input
                  type="number"
                  step="0.05"
                  className="text-input"
                  value={fdAnnualRate}
                  onChange={(e) => setFdAnnualRate(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">{t('Commercial banks typically offer 6.5% - 8.5% p.a.', 'वाणिज्य बैंकहरूको हालको दर ६.५% देखि ८.५% सम्म छ।')}</span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">{t('Duration (Months)', 'अवधि (महिनामा)')}</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button type="button" className={`segmented-btn ${fdMonths === 3 ? 'active' : ''}`} onClick={() => setFdMonths(3)}>{t('3 Months', '३ महिना')}</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 6 ? 'active' : ''}`} onClick={() => setFdMonths(6)}>{t('6 Months', '६ महिना')}</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 12 ? 'active' : ''}`} onClick={() => setFdMonths(12)}>{t('1 Year', '१ वर्ष')}</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 24 ? 'active' : ''}`} onClick={() => setFdMonths(24)}>{t('2 Years', '२ वर्ष')}</button>
                </div>
              </div>
            </div>

            <div>
              <div className="result-card-highlight">
                <span className="stat-label">{t('Net In-Hand Return (After TDS)', 'कर कटाएर खुद प्राप्त हुने ब्याज')}</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  रु {Math.round(fdCalc.netInterest).toLocaleString('en-IN')}
                </div>
                <span className="stat-subvalue">
                  {t(
                    `Maturity Total: रु ${Math.round(fdCalc.netMaturity).toLocaleString('en-IN')}`,
                    `साउँ + खुद ब्याज जम्मा: रु ${Math.round(fdCalc.netMaturity).toLocaleString('en-IN')}`
                  )}
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Gross Interest Earned', 'कुल आर्जित ब्याज')}</span>
                    <span style={{ fontWeight: 700 }}>रु {Math.round(fdCalc.grossInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('5% Government TDS Deducted', '५% अग्रिम कर (TDS) कट्टा')}</span>
                    <span style={{ fontWeight: 700, color: '#e11d48' }}>- रु {Math.round(fdCalc.tdsTax).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
