'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { PiggyBank, Copy, Check } from 'lucide-react';

export function SavingsGoalCalculator() {
  const { t } = useLanguage();
  const [targetAmountNpr, setTargetAmountNpr] = useState<number>(2500000);
  const [currentSavingsNpr, setCurrentSavingsNpr] = useState<number>(200000);
  const [yearsToGoal, setYearsToGoal] = useState<number>(5);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(9.0);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const r = Math.max(0.1, expectedReturnRate) / 12 / 100;
    const n = Math.max(1, Math.round(yearsToGoal * 12));

    const futureValueOfCurrentSavings = currentSavingsNpr * Math.pow(1 + r, n);
    const remainingTarget = Math.max(0, targetAmountNpr - futureValueOfCurrentSavings);

    const requiredMonthlySaving =
      remainingTarget > 0 ? (remainingTarget * r) / (Math.pow(1 + r, n) - 1) : 0;

    const totalMonthlyDeposits = requiredMonthlySaving * n;
    const totalInterestEarned = Math.max(
      0,
      targetAmountNpr - currentSavingsNpr - totalMonthlyDeposits
    );

    return {
      requiredMonthlySaving: Math.round(requiredMonthlySaving),
      totalMonthlyDeposits: Math.round(totalMonthlyDeposits),
      totalInterestEarned: Math.round(totalInterestEarned),
      months: n,
    };
  }, [targetAmountNpr, currentSavingsNpr, yearsToGoal, expectedReturnRate]);

  const handleCopy = () => {
    const text = `Nepal Savings Goal Plan:
Target Financial Goal: NPR ${targetAmountNpr.toLocaleString('en-IN')} in ${yearsToGoal} Years
Required Monthly Saving: NPR ${calculation.requiredMonthlySaving.toLocaleString('en-IN')}/month (@ ${expectedReturnRate}% return)
Total Compound Interest Earned: NPR ${calculation.totalInterestEarned.toLocaleString('en-IN')}
Calculated on NepalCalc.com/savings-goal`;
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
          marginBottom: '22px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PiggyBank size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0 }}>
              {t('Savings Goal Calculator', 'बचत लक्ष्य क्याल्कुलेटर')}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Find out exactly how much to save each month to reach your target NPR goal
            </p>
          </div>
        </div>
        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              1. Target Savings Goal (लक्ष्य रकम — NPR):
            </label>
            <input type="number" value={targetAmountNpr} onChange={(e) => setTargetAmountNpr(Number(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              2. Current Initial Savings (हालको बचत — NPR):
            </label>
            <input type="number" value={currentSavingsNpr} onChange={(e) => setCurrentSavingsNpr(Number(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Timeframe (Years):</label>
              <input type="number" min={1} max={40} value={yearsToGoal} onChange={(e) => setYearsToGoal(Number(e.target.value) || 1)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Annual Return (%):</label>
              <input type="number" step="0.5" value={expectedReturnRate} onChange={(e) => setExpectedReturnRate(Number(e.target.value) || 1)} className="text-input" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Required Monthly Deposit (मासिक बचत रकम)
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#4ade80', marginTop: '4px' }}>
              NPR {calculation.requiredMonthlySaving.toLocaleString('en-IN')} / mo
            </div>
            <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Total Principal Deposited: <strong>NPR {calculation.totalMonthlyDeposits.toLocaleString('en-IN')}</strong> • Interest Earned:{' '}
              <strong>NPR {calculation.totalInterestEarned.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

