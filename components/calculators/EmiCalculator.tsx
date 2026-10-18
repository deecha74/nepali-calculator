'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, Table, Sparkles, Building2 } from 'lucide-react';
import { DonutChart } from '@/components/DonutChart';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useLanguage } from '@/components/LanguageContext';

export function EmiCalculator() {
  const { language, t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs default
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(10.5); // 10.5%
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years
  const [copied, setCopied] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // EMI Calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = (annualInterestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    let monthlyEmi = 0;
    if (monthlyRate > 0) {
      monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyEmi = principal / totalMonths;
    }

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Amortization Schedule (Yearly)
    let balance = principal;
    const yearlySchedule = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyEmi - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      yearlySchedule.push({
        year: yr,
        yearlyPrincipal,
        yearlyInterest,
        yearlyTotal: yearlyPrincipal + yearlyInterest,
        endingBalance: balance,
      });
    }

    return {
      monthlyEmi,
      totalInterest,
      totalPayment,
      yearlySchedule,
    };
  }, [loanAmount, annualInterestRate, tenureYears]);

  const handleCopy = () => {
    const text = `Nepal Bank Loan EMI:
Loan Amount: रु ${loanAmount.toLocaleString('en-IN')}
Interest: ${annualInterestRate}% | Tenure: ${tenureYears} Years
Monthly EMI: रु ${Math.round(calculation.monthlyEmi).toLocaleString('en-IN')}
Total Interest: रु ${Math.round(calculation.totalInterest).toLocaleString('en-IN')}
Total Payment: रु ${Math.round(calculation.totalPayment).toLocaleString('en-IN')}
Via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartSegments = [
    { label: "Principal", value: loanAmount, color: "#2563eb" },
    { label: "Interest", value: calculation.totalInterest, color: "#e11d48" },
  ];

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '28px', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', background: '#dbeafe', color: '#1d4ed8', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            <Building2 size={13} />
            {t('Nepal Commercial Banks (NRB Regulated)', 'नेपालका वाणिज्य बैंकहरू (राष्ट्र बैंक मापदण्ड)')}
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            {t('Bank Loan EMI & Amortization Calculator', 'बैंक लोन ईएमआई (EMI) तथा किस्ता क्यालकुलेटर')}
          </h1>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ borderRadius: '999px', padding: '8px 16px', fontSize: '13px' }}
        >
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t("Copied!", "कपी भयो!") : t("Copy Summary", "कपी गर्नुहोस्")}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Controls */}
        <div>
          {/* Quick preset buttons */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <button type="button" className="segmented-btn" onClick={() => { setLoanAmount(2500000); setAnnualInterestRate(10.5); setTenureYears(10); }}>{t('Auto Loan (25L)', 'सवारी कर्जा (२५ लाख)')}</button>
            <button type="button" className="segmented-btn" onClick={() => { setLoanAmount(6000000); setAnnualInterestRate(9.8); setTenureYears(20); }}>{t('Home Loan (60L)', 'घर कर्जा (६० लाख)')}</button>
            <button type="button" className="segmented-btn" onClick={() => { setLoanAmount(1000000); setAnnualInterestRate(12.5); setTenureYears(5); }}>{t('Personal Loan (10L)', 'व्यक्तिगत कर्जा (१० लाख)')}</button>
          </div>

          {/* Loan Amount */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: 0 }}>{t('Loan Amount', 'ऋण रकम (Loan Amount)')}</label>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                रु {loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={100000}
              max={30000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          {/* Interest Rate */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: 0 }}>{t('Interest Rate (% p.a.)', 'वार्षिक ब्याजदर (% p.a.)')}</label>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#e11d48', fontFamily: 'var(--font-mono)' }}>
                {annualInterestRate}%
              </span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={6.5}
              max={18.0}
              step={0.1}
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            />
          </div>

          {/* Tenure */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: 0 }}>{t('Tenure (Years)', 'ऋण अवधि (वर्ष)')}</label>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#111827', fontFamily: 'var(--font-mono)' }}>
                {tenureYears} {t('Years', 'वर्ष')} ({tenureYears * 12} {t('Months', 'महिना')})
              </span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
            />
          </div>

          {/* Lead Card */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              background: '#f0fdf4',
              border: '1.5px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>{t('Best Rate Guarantee', 'उत्कृष्ट ब्याजदर ग्यारेन्टी')}</span>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#14532d' }}>{t('Compare Top Bank Loan Offers', 'बैंकहरूको न्यूनतम ब्याजदर तुलना गर्नुहोस्')}</p>
            </div>
            <button
              onClick={() => setShowLeadModal(true)}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', background: '#16a34a', whiteSpace: 'nowrap' }}
            >
              {t('Get Rates', 'दर हेर्नुहोस्')}
            </button>
          </div>
        </div>

        {/* Results Highlight Card */}
        <div>
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '20px',
              padding: '28px',
              color: '#ffffff',
              boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.2)',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
              {t('Monthly EMI (मासिक किस्ता)', 'मासिक किस्ता (Monthly EMI)')}
            </span>
            <div style={{ fontSize: '42px', fontWeight: 800, color: '#34d399', margin: '8px 0 2px', fontFamily: 'var(--font-mono)' }}>
              रु {Math.round(calculation.monthlyEmi).toLocaleString('en-IN')}
              <span style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}> / {t('month', 'महिना')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{t('PRINCIPAL', 'साँवा रकम (Principal)')}</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                  रु {loanAmount.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{t('TOTAL INTEREST', 'जम्मा ब्याज (Total Interest)')}</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.totalInterest).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Donut */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '18px' }}>
            <DonutChart
              segments={chartSegments}
              totalLabel={t('Total Payable', 'जम्मा भुक्तानी रकम')}
              totalValue={`रु ${Math.round(calculation.totalPayment).toLocaleString('en-IN')}`}
            />
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
        <button
          type="button"
          onClick={() => setShowSchedule(!showSchedule)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            color: '#111827',
          }}
        >
          <Table size={16} />
          <span>{showSchedule ? t("Hide Amortization Table ▲", "किस्ता तालिका लुकाउनुहोस् ▲") : t("View Full Year-by-Year Amortization Schedule ▼", "वार्षिक किस्ता तथा भुक्तानी तालिका हेर्नुहोस् ▼")}</span>
        </button>

        {showSchedule && (
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>{t('Year', 'वर्ष')}</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>{t('Principal', 'साँवा')}</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700 }}>{t('Interest', 'ब्याज')}</th>
                  <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'right' }}>{t('Balance', 'बाँकी साँवा')}</th>
                </tr>
              </thead>
              <tbody>
                {calculation.yearlySchedule.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700 }}>{t('Year', 'वर्ष')} {row.year}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>रु {Math.round(row.yearlyPrincipal).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#e11d48' }}>रु {Math.round(row.yearlyInterest).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(row.endingBalance).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        leadType="loan"
        title="Compare Nepal Commercial Bank Loan Rates"
        subtitle="Get pre-approved rates from Nabil, NIC Asia, Global IME, Sanima with zero broker fees."
        referenceData={`Loan: ${loanAmount}, Rate: ${annualInterestRate}%, Tenure: ${tenureYears} yrs`}
      />
    </div>
  );
}
