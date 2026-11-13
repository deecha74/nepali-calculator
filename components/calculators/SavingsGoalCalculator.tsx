'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { PiggyBank, Copy, Check } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

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
    const text = `${t('Nepal Savings Goal Plan:', 'नेपाल बचत लक्ष्य योजना:')}
${t('Target Financial Goal:', 'लक्ष्य रकम:')} रु ${targetAmountNpr.toLocaleString('en-IN')} (${yearsToGoal} ${t('Years', 'वर्ष')})
${t('Required Monthly Saving:', 'मासिक बचत गर्नुपर्ने रकम:')} रु ${calculation.requiredMonthlySaving.toLocaleString('en-IN')}/${t('mo', 'महिना')} (@ ${expectedReturnRate}%)
${t('Total Compound Interest Earned:', 'प्राप्त कुल चक्रबृद्धि ब्याज:')} रु ${calculation.totalInterestEarned.toLocaleString('en-IN')}
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
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#003893', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PiggyBank size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              {t('Savings Goal Calculator', 'बचत लक्ष्य क्याल्कुलेटर')}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {t('Calculate exact monthly savings needed to reach your target NPR wealth goal.', 'आफ्नो आर्थिक लक्ष्यमा पुग्न प्रत्येक महिना कति रकम बचत गर्नुपर्छ हिसाब गर्नुहोस्।')}
            </p>
          </div>
        </div>
        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          {/* Mobile Instant Above-the-fold Result */}
          <MobileInstantResult
            primaryLabel={t('Required Monthly Saving', 'मासिक बचत गर्नुपर्ने रकम')}
            primaryValue={`रु ${calculation.requiredMonthlySaving.toLocaleString('en-IN')}`}
            primarySubtext={`${t('Goal:', 'लक्ष्य:')} रु ${targetAmountNpr.toLocaleString('en-IN')}`}
            secondaryLabel={t('Interest Earned', 'प्राप्त ब्याज')}
            secondaryValue={`रु ${calculation.totalInterestEarned.toLocaleString('en-IN')}`}
            tertiaryLabel={t('Timeframe', 'समय')}
            tertiaryValue={`${yearsToGoal} ${t('Yrs', 'वर्ष')}`}
            badge={`@ ${expectedReturnRate}% p.a.`}
            accentColor="emerald"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="savings-goal-details"
          />

          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              {t('Target Savings Goal (NPR)', 'लक्ष्य बचत रकम (रु)')}
            </label>
            <input
              type="number"
              value={targetAmountNpr || ''}
              placeholder="0"
              onChange={(e) => setTargetAmountNpr(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              {t('Current Initial Savings (NPR)', 'हाल जम्मा भएको रकम (रु)')}
            </label>
            <input
              type="number"
              value={currentSavingsNpr || ''}
              placeholder="0"
              onChange={(e) => setCurrentSavingsNpr(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Timeframe (Years)', 'समय (वर्ष)')}
              </label>
              <input
                type="number"
                min={1}
                max={40}
                value={yearsToGoal || ''}
                onChange={(e) => setYearsToGoal(Number(e.target.value) || 1)}
                className="text-input"
                style={{ width: '100%', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Annual Return Rate (%)', 'वार्षिक प्रतिफल दर (%)')}
              </label>
              <input
                type="number"
                step="0.5"
                value={expectedReturnRate || ''}
                onChange={(e) => setExpectedReturnRate(Number(e.target.value) || 1)}
                className="text-input"
                style={{ width: '100%', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </div>

        <div id="savings-goal-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
              {t('Required Monthly Deposit', 'मासिक बचत गर्नुपर्ने रकम')}
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              रु {calculation.requiredMonthlySaving.toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>/{t('month', 'महिना')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Total Principal Deposited:', 'कुल जम्मा हुने मूलधन:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {calculation.totalMonthlyDeposits.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Compound Interest Earned:', 'प्राप्त कुल चक्रबृद्धि ब्याज:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#059669' }}>रु {calculation.totalInterestEarned.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                `At ${expectedReturnRate}% compound annual return, starting today saves you रु ${calculation.totalInterestEarned.toLocaleString('en-IN')} in interest contributions over ${yearsToGoal} years.`,
                `${expectedReturnRate}% चक्रबृद्धि प्रतिफल दरमा, आजैबाट नियमित बचत सुरु गर्दा ${yearsToGoal} वर्षमा रु ${calculation.totalInterestEarned.toLocaleString('en-IN')} ब्याज आम्दानी हुन्छ।`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
