'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Home, Car, Copy, Check } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function HomeAutoLoanCalculator({ defaultMode = 'home' }: { defaultMode?: 'home' | 'auto' }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'home' | 'auto'>(defaultMode);
  const [propertyOrVehiclePrice, setPropertyOrVehiclePrice] = useState<number>(
    defaultMode === 'home' ? 15000000 : 4500000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(defaultMode === 'home' ? 30 : 20);
  const [interestRate, setInterestRate] = useState<number>(defaultMode === 'home' ? 9.5 : 10.25);
  const [tenureYears, setTenureYears] = useState<number>(defaultMode === 'home' ? 15 : 7);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const price = Math.max(0, propertyOrVehiclePrice);
    const dpRatio = Math.min(90, Math.max(0, downPaymentPercent)) / 100;
    const downPaymentNpr = Math.round(price * dpRatio);
    const loanPrincipal = Math.max(0, price - downPaymentNpr);

    const monthlyRate = Math.max(0.1, interestRate) / 12 / 100;
    const months = Math.max(1, Math.round(tenureYears * 12));

    const emi =
      loanPrincipal > 0
        ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)
        : 0;

    const totalPayment = emi * months;
    const totalInterest = Math.max(0, totalPayment - loanPrincipal);
    // NRB 50% DSTI rule: Required minimum gross monthly income = EMI * 2
    const minMonthlyIncomeRequired = Math.round(emi * 2);

    return {
      downPaymentNpr,
      loanPrincipal,
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      minMonthlyIncomeRequired,
      months,
    };
  }, [propertyOrVehiclePrice, downPaymentPercent, interestRate, tenureYears]);

  const handleCopy = () => {
    const text = `Nepal ${mode === 'home' ? 'Home Loan' : 'Auto Loan'} EMI Summary:
Valuation / Price: NPR ${propertyOrVehiclePrice.toLocaleString('en-IN')}
Down Payment (${downPaymentPercent}%): NPR ${calculation.downPaymentNpr.toLocaleString('en-IN')}
Loan Principal: NPR ${calculation.loanPrincipal.toLocaleString('en-IN')}
Interest Rate: ${interestRate}% p.a. | Tenure: ${tenureYears} Years (${calculation.months} Months)
Monthly EMI: NPR ${calculation.emi.toLocaleString('en-IN')}/month
Total Interest: NPR ${calculation.totalInterest.toLocaleString('en-IN')}
Min. Gross Family Income (50% DSTI): NPR ${calculation.minMonthlyIncomeRequired.toLocaleString('en-IN')}/mo
Calculated on NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: mode === 'home' ? '#eff6ff' : '#ecfdf5',
              color: mode === 'home' ? '#2563eb' : '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mode === 'home' ? <Home size={24} /> : <Car size={24} />}
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {mode === 'home'
                ? t('Nepal Home Loan & Mortgage Calculator', 'नेपाल घर कर्जा किस्ता क्याल्कुलेटर')
                : t('Nepal Auto & EV Vehicle Loan Calculator', 'नेपाल सवारी कर्जा किस्ता क्याल्कुलेटर')}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {t('Includes NRB Down-Payment LTV Ratio & 50% DSTI Income Requirement', 'नेपाल राष्ट्र बैंक डाउनपेमेन्ट तथा ५०% DSTI आय मापदण्ड सहित')}
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy EMI', 'किस्ता कपी')}</span>
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="segmented-control" style={{ width: '100%', display: 'flex', marginBottom: '22px', padding: '4px' }}>
        <button
          type="button"
          onClick={() => {
            setMode('home');
            setPropertyOrVehiclePrice(15000000);
            setDownPaymentPercent(30);
            setTenureYears(15);
          }}
          className={`segmented-btn ${mode === 'home' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 14px', fontSize: '13px', fontWeight: 700 }}
        >
          🏠 {t('Home / Land Mortgage Loan', 'घर तथा जग्गा कर्जा')}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('auto');
            setPropertyOrVehiclePrice(4500000);
            setDownPaymentPercent(20);
            setTenureYears(7);
          }}
          className={`segmented-btn ${mode === 'auto' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 14px', fontSize: '13px', fontWeight: 700 }}
        >
          🚗 {t('Auto / EV Car & Bike Loan', 'गाडी तथा मोटरसाइकल कर्जा')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          {/* Mobile-only instant above-the-fold result */}
          <MobileInstantResult
            primaryLabel={t('Monthly EMI Payment', 'मासिक किस्ता (EMI)')}
            primaryValue={`रु ${calculation.emi.toLocaleString('en-IN')}`}
            primarySubtext={`${t('Principal:', 'साँवा:')} रु ${calculation.loanPrincipal.toLocaleString('en-IN')}`}
            secondaryLabel={t('Min Income (50% DSTI)', 'न्यूनतम आम्दानी')}
            secondaryValue={`रु ${calculation.minMonthlyIncomeRequired.toLocaleString('en-IN')}`}
            tertiaryLabel={t('Total Interest', 'कुल ब्याज')}
            tertiaryValue={`रु ${calculation.totalInterest.toLocaleString('en-IN')}`}
            badge={mode === 'home' ? t('Home Loan', 'घर कर्जा') : t('Auto Loan', 'सवारी कर्जा')}
            accentColor="blue"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="loan-breakdown-details"
          />

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              1. {mode === 'home' ? t('Total Property / House Valuation (NPR):', 'कुल घर/जग्गा मूल्याङ्कन (रु):') : t('Vehicle Showroom Price (NPR):', 'सवारीको सोरुम मूल्य (रु):')}
            </label>
            <input
              type="number"
              value={propertyOrVehiclePrice}
              onChange={(e) => setPropertyOrVehiclePrice(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              2. {t('Down Payment %:', 'डाउनपेमेन्ट %:')} ({mode === 'auto' ? t('20% for EV / 50% for Petrol', 'विद्युतीयमा २०% / पेट्रोलमा ५०%') : t('Typically 30%–50% in Nepal', 'नेपालमा सामान्यतया ३०% देखि ५०%')})
            </label>
            <input
              type="number"
              min={0}
              max={90}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Interest Rate (% p.a.):', 'वार्षिक ब्याज दर (%):')}
              </label>
              <input
                type="number"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 1)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Loan Tenure (Years):', 'कर्जा अवधि (वर्षमा):')}
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value) || 1)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <div id="loan-breakdown-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Monthly Bank Installment (EMI)', 'मासिक बैंक किस्ता')}
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '6px 0 10px', fontFamily: 'var(--font-mono)' }}>
              रु {calculation.emi.toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>/{t('month', 'महिना')}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
              {t('Loan Principal:', 'कर्जा रकम:')} <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {calculation.loanPrincipal.toLocaleString('en-IN')}</strong> • {t('Down Payment:', 'डाउनपेमेन्ट:')}{' '}
              <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {calculation.downPaymentNpr.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff', fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569' }}>{t(`Total Interest Payable (${calculation.months} mos):`, `कुल तिर्नुपर्ने ब्याज (${calculation.months} महिना):`)}</span>
              <strong>NPR {calculation.totalInterest.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569' }}>{t('Total Principal + Interest:', 'कुल साउँ र ब्याज भुक्तानी:')}</span>
              <strong>NPR {calculation.totalPayment.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px', color: '#059669' }}>
              <span>{t('Min. Gross Monthly Income Needed (50% DSTI):', 'न्यूनतम आवश्यक मासिक पारिवारिक आम्दानी (५०% DSTI):')}</span>
              <strong>NPR {calculation.minMonthlyIncomeRequired.toLocaleString('en-IN')}/{t('mo', 'महिना')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
