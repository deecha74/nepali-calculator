'use client';

import React, { useState, useMemo } from 'react';
import { Landmark, Copy, Check, ShieldCheck, ArrowRight, PiggyBank } from 'lucide-react';

export function PensionCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(45000);
  const [monthlyCit, setMonthlyCit] = useState<number>(5000); // 5k CIT voluntary
  const [currentAge, setCurrentAge] = useState<number>(28);
  const [retirementAge, setRetirementAge] = useState<number>(58); // 58 standard government/corporate age
  const [interestRate, setInterestRate] = useState<number>(7.5); // 7.5% EPF average interest
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    const yearsToRetire = Math.max(1, retirementAge - currentAge);
    const months = yearsToRetire * 12;

    // Monthly EPF = 10% employee + 10% employer = 20% of basic salary
    const monthlyEpf = (basicSalary || 0) * 0.20;
    const totalMonthlySavings = monthlyEpf + (monthlyCit || 0);

    const monthlyRate = (interestRate / 100) / 12;

    let accumulatedCorpus = 0;
    let totalInvested = 0;

    for (let m = 1; m <= months; m++) {
      accumulatedCorpus = (accumulatedCorpus + totalMonthlySavings) * (1 + monthlyRate);
      totalInvested += totalMonthlySavings;
    }

    const totalInterestEarned = Math.max(0, accumulatedCorpus - totalInvested);
    // Estimated monthly pension at 7% annuity payout
    const estimatedMonthlyPension = (accumulatedCorpus * 0.07) / 12;

    return {
      yearsToRetire,
      monthlyEpf: Math.round(monthlyEpf),
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalInvested: Math.round(totalInvested),
      totalInterestEarned: Math.round(totalInterestEarned),
      accumulatedCorpus: Math.round(accumulatedCorpus),
      estimatedMonthlyPension: Math.round(estimatedMonthlyPension),
    };
  }, [basicSalary, monthlyCit, currentAge, retirementAge, interestRate]);

  const handleCopy = () => {
    const text = `Nepal EPF & CIT Retirement Projection:
Basic Salary: NPR ${basicSalary.toLocaleString('en-IN')}
Monthly EPF (20%): NPR ${result.monthlyEpf.toLocaleString('en-IN')}
Monthly CIT: NPR ${monthlyCit.toLocaleString('en-IN')}
Retirement Age: ${retirementAge} (${result.yearsToRetire} years left)
Total Retirement Fund: NPR ${result.accumulatedCorpus.toLocaleString('en-IN')}
Estimated Monthly Pension: NPR ${result.estimatedMonthlyPension.toLocaleString('en-IN')}/mo
Calculated on NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Karmachari Sanchaya Kosh (EPF)</span>
            <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>Nagarik Lagani Kosh (CIT)</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            EPF, CIT & Pension Retirement Calculator Nepal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate your accumulated provident fund balance, interest gains, and monthly pension payout at retirement age.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Share Projection"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Monthly Basic Salary (NPR)</label>
            <input
              type="number"
              value={basicSalary || ''}
              onChange={(e) => setBasicSalary(Math.max(1000, Number(e.target.value)))}
              className="text-input"
              style={{ fontSize: '16px', fontWeight: 700 }}
            />
            <span className="input-subtext">EPF automatically contributes 10% from you + 10% from employer = 20%.</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Voluntary Monthly CIT (Nagarik Lagani Kosh)</label>
            <input
              type="number"
              value={monthlyCit || ''}
              onChange={(e) => setMonthlyCit(Math.max(0, Number(e.target.value)))}
              className="text-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label className="input-label">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(18, Math.min(65, Number(e.target.value))))}
                className="text-input"
              />
            </div>
            <div>
              <label className="input-label">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(70, Number(e.target.value))))}
                className="text-input"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)', border: '1.5px solid #bbf7d0' }}>
            <span className="stat-label" style={{ color: '#047857' }}>Total Accumulated Retirement Corpus</span>
            <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
              रु {result.accumulatedCorpus.toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              Accumulated balance at age {retirementAge} ({result.yearsToRetire} years compounding).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid #d1fae5', marginTop: '16px' }}>
              <div>
                <span className="stat-label">Total Contributed</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
                  रु {result.totalInvested.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <span className="stat-label">Compound Interest Gain</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  रु {result.totalInterestEarned.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
              <span className="stat-label">Estimated Monthly Pension</span>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#d97706', marginTop: '2px' }}>
                रु {result.estimatedMonthlyPension.toLocaleString('en-IN')} <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>/ month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
