'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Home, Car, Copy, Check } from 'lucide-react';

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
      months,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      minMonthlyIncomeRequired,
    };
  }, [propertyOrVehiclePrice, downPaymentPercent, interestRate, tenureYears]);

  const handleCopy = () => {
    const text = `Nepal ${mode === 'home' ? 'Home Loan' : 'Auto / EV Vehicle Loan'} EMI Summary:
Asset Price: NPR ${propertyOrVehiclePrice.toLocaleString('en-IN')}
Down Payment (${downPaymentPercent}%): NPR ${calculation.downPaymentNpr.toLocaleString('en-IN')}
Loan Principal: NPR ${calculation.loanPrincipal.toLocaleString('en-IN')}
Monthly EMI (${interestRate}% for ${tenureYears} yrs): NPR ${calculation.emi.toLocaleString('en-IN')}/month
Min Monthly Income Required (NRB 50% DSTI): NPR ${calculation.minMonthlyIncomeRequired.toLocaleString('en-IN')}
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
          paddingBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
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
                ? 'Nepal Home Loan & Mortgage Calculator (घर कर्जा किस्ता)'
                : 'Nepal Auto & EV Car/Bike Loan Calculator (गाडी कर्जा किस्ता)'}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Includes NRB Down-Payment LTV Ratio & 50% DSTI Income Requirement
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy EMI'}</span>
        </button>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
        <button
          type="button"
          onClick={() => {
            setMode('home');
            setPropertyOrVehiclePrice(15000000);
            setDownPaymentPercent(30);
            setTenureYears(15);
          }}
          style={{
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 700,
            border: mode === 'home' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
            background: mode === 'home' ? '#eff6ff' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          🏠 Home / Land Mortgage Loan (घर/जग्गा कर्जा)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('auto');
            setPropertyOrVehiclePrice(4500000);
            setDownPaymentPercent(20);
            setTenureYears(7);
          }}
          style={{
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 700,
            border: mode === 'auto' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
            background: mode === 'auto' ? '#eff6ff' : '#ffffff',
            cursor: 'pointer',
          }}
        >
          🚗 Auto / EV Car & Bike Loan (सवारी कर्जा)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              1. {mode === 'home' ? 'Total Property / House Valuation (NPR)' : 'Vehicle Showroom Price (NPR)'}:
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
              2. Down Payment % ({mode === 'auto' ? '20% for EV / 50% for ICE Petrol' : 'Typically 30%–50% in Nepal'}):
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
                Interest Rate (% p.a.):
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
                Loan Tenure (Years):
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Monthly Bank Installment (मासिक किस्ता — EMI)
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>
              NPR {calculation.emi.toLocaleString('en-IN')} / mo
            </div>
            <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Loan Amount: <strong>NPR {calculation.loanPrincipal.toLocaleString('en-IN')}</strong> • Down Payment:{' '}
              <strong>NPR {calculation.downPaymentNpr.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff', fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569' }}>Total Interest Payable ({calculation.months} mos):</span>
              <strong>NPR {calculation.totalInterest.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569' }}>Total Principal + Interest:</span>
              <strong>NPR {calculation.totalPayment.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px', color: '#059669' }}>
              <span>Min. Gross Monthly Income Needed (50% DSTI):</span>
              <strong>NPR {calculation.minMonthlyIncomeRequired.toLocaleString('en-IN')}/mo</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

