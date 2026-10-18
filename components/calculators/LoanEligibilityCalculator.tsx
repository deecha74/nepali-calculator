'use client';

import React, { useState, useMemo } from 'react';
import { Landmark, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

export function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(80000);
  const [existingEmi, setExistingEmi] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(9.5); // 9.5% average commercial bank
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years home loan
  const [dstiLimit, setDstiLimit] = useState<number>(50); // NRB 50% rule
  const [copied, setCopied] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);

  const calc = useMemo(() => {
    // Max allowable total EMI by NRB
    const maxTotalEmiAllowed = (monthlyIncome || 0) * (dstiLimit / 100);
    // Remaining EMI capacity for new loan
    const eligibleNewEmi = Math.max(0, maxTotalEmiAllowed - (existingEmi || 0));

    // Loan Amount = (EMI * ((1 + r)^n - 1)) / (r * (1 + r)^n)
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = tenureYears * 12;

    let maxLoanAmount = 0;
    if (eligibleNewEmi > 0 && monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      maxLoanAmount = (eligibleNewEmi * (factor - 1)) / (monthlyRate * factor);
    }

    return {
      maxTotalEmiAllowed: Math.round(maxTotalEmiAllowed),
      eligibleNewEmi: Math.round(eligibleNewEmi),
      maxLoanAmount: Math.round(maxLoanAmount),
    };
  }, [monthlyIncome, existingEmi, interestRate, tenureYears, dstiLimit]);

  const handleCopy = () => {
    const text = `Nepal Bank Loan Eligibility (NRB DSTI Rule):
Monthly Income: NPR ${monthlyIncome.toLocaleString('en-IN')}
Existing EMIs: NPR ${existingEmi.toLocaleString('en-IN')}
Max Allowed EMI (50% DSTI): NPR ${calc.eligibleNewEmi.toLocaleString('en-IN')}/mo
Interest Rate: ${interestRate}%, Tenure: ${tenureYears} Years
Maximum Eligible Loan: NPR ${calc.maxLoanAmount.toLocaleString('en-IN')}
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
            <span className="badge badge-emerald">Nepal Rastra Bank DSTI 50% Rule</span>
            <span className="badge badge-neutral">ऋण योग्यता हिसाब</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Bank Loan Eligibility & DSTI Calculator Nepal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Check the maximum Home or Auto loan amount commercial banks in Nepal will approve based on your salary.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Share Calculation"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Net Verified Monthly Salary (NPR)</label>
            <input
              type="number"
              value={monthlyIncome || ''}
              onChange={(e) => setMonthlyIncome(Math.max(1000, Number(e.target.value)))}
              className="text-input"
              style={{ fontSize: '16px', fontWeight: 700 }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Existing Monthly EMI Payments (NPR)</label>
            <input
              type="number"
              value={existingEmi || ''}
              onChange={(e) => setExistingEmi(Math.max(0, Number(e.target.value)))}
              className="text-input"
            />
            <span className="input-subtext">Total of existing personal loans, credit card EMIs, or bike EMIs.</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label className="input-label">Expected Bank Rate (%)</label>
              <input
                type="number"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(5, Math.min(20, Number(e.target.value))))}
                className="text-input"
              />
            </div>
            <div>
              <label className="input-label">Tenure (Years)</label>
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="text-input"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)', border: '1.5px solid #bbf7d0' }}>
            <span className="stat-label" style={{ color: '#047857' }}>Maximum Eligible Loan Amount</span>
            <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
              रु {calc.maxLoanAmount.toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              Max bank loan approved based on NRB 50% Debt-Service-to-Income cap.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid #d1fae5', marginTop: '16px' }}>
              <div>
                <span className="stat-label">Max Eligible New EMI</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
                  रु {calc.eligibleNewEmi.toLocaleString('en-IN')}/mo
                </div>
              </div>

              <div>
                <span className="stat-label">NRB 50% DSTI Limit</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  रु {calc.maxTotalEmiAllowed.toLocaleString('en-IN')}/mo
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setShowLeadModal(true)}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', background: '#059669', justifyContent: 'center' }}
            >
              <span>Compare Bank Interest Offers</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        leadType="loan"
        title="Check Loan Pre-Approval with Nepal Commercial Banks"
        subtitle="Compare home and auto loan interest rates across Nabil, Global IME, NIC Asia, and Sanima Bank."
      />
    </div>
  );
}
