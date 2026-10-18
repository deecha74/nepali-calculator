'use client';

import React, { useState, useMemo } from 'react';
import { Coins, Copy, Check } from 'lucide-react';

export function LocalInterestCalculator() {
  const [mode, setMode] = useState<'local' | 'fd'>('local');

  // Local byaj inputs
  const [principal, setPrincipal] = useState<number>(100000); // 1 Lakh
  const [sayakadaRate, setSayakadaRate] = useState<number>(2); // सयकडा २ (2% per month)
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
      // Simple: P * r * t
      totalInterest = principal * monthlyRate * months;
    } else {
      // Compound monthly: P * (1 + r)^t - P
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
      text = `Nepali Local Byaj (साउँ-ब्याज हिसाब):
साउँ (Principal): रु ${principal.toLocaleString('en-IN')}
ब्याज दर: सयकडा ${sayakadaRate} (वार्षिक ${localCalc.annualEquivalentRate}%)
अवधि: ${months} महिना
मासिक ब्याज: रु ${Math.round(localCalc.monthlyInterest).toLocaleString('en-IN')}
कुल ब्याज: रु ${Math.round(localCalc.totalInterest).toLocaleString('en-IN')}
कुल तिर्नुपर्ने (साउँ+ब्याज): रु ${Math.round(localCalc.totalAmount).toLocaleString('en-IN')}
Via NepalCalc.com`;
    } else {
      text = `Bank Fixed Deposit (मुद्दती खाता हिसाब):
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
            <span className="badge badge-amber">सयकडा ब्याज र मुद्दती</span>
            <span className="badge badge-neutral">5% TDS Calculation</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Nepali Byaj & Bank Fixed Deposit Calculator
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate local monthly interest (सयकडा २/३) and commercial bank Fixed Deposit (FD) returns.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
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
          🤝 Local Byaj (सयकडा २, ३ वा ५ ब्याज)
        </button>
        <button
          type="button"
          className={`segmented-btn ${mode === 'fd' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setMode('fd')}
        >
          🏦 Bank Fixed Deposit (मुद्दती खाता)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {mode === 'local' ? (
          <>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">साउँ रकम (Principal Amount in NPR)</label>
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
                <label className="input-label">मासिक ब्याज दर (Rate per 100 / सयकडा)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 1 ? 'active' : ''}`} onClick={() => setSayakadaRate(1)}>सयकडा १</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 1.5 ? 'active' : ''}`} onClick={() => setSayakadaRate(1.5)}>सयकडा १.५</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 2 ? 'active' : ''}`} onClick={() => setSayakadaRate(2)}>सयकडा २</button>
                  <button type="button" className={`segmented-btn ${sayakadaRate === 3 ? 'active' : ''}`} onClick={() => setSayakadaRate(3)}>सयकडा ३</button>
                </div>
                <input
                  type="number"
                  step="0.1"
                  className="text-input"
                  value={sayakadaRate}
                  onChange={(e) => setSayakadaRate(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">सयकडा {sayakadaRate} = {sayakadaRate}% प्रति महिना = {sayakadaRate * 12}% वार्षिक</span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">अवधि (Months / महिना)</label>
                <input
                  type="number"
                  min={1}
                  className="text-input"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value) || 1)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>चक्रवृद्धि ब्याज (Compound Interest)</span>
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
                <span className="stat-label">कुल फिर्ता रकम (साउँ + ब्याज)</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  रु {Math.round(localCalc.totalAmount).toLocaleString('en-IN')}
                </div>
                <span className="stat-subvalue">
                  साउँ रु {principal.toLocaleString('en-IN')} मा {months} महिनाको हिसाब
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>मासिक ब्याज (Monthly Byaj)</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(localCalc.monthlyInterest).toLocaleString('en-IN')} / महिना</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>कुल जम्मा ब्याज ({months} महिना)</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#d97706' }}>रु {Math.round(localCalc.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>ब्याजको प्रकार</span>
                    <span style={{ fontWeight: 600 }}>{isChakrabriddhi ? 'चक्रवृद्धि (Compound)' : 'साधारण (Simple)'}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">मुद्दती खाता रकम (Deposit Amount in NPR)</label>
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
                <label className="input-label">वार्षिक ब्याज दर (Annual Interest Rate %)</label>
                <input
                  type="number"
                  step="0.05"
                  className="text-input"
                  value={fdAnnualRate}
                  onChange={(e) => setFdAnnualRate(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">Commercial banks typically offer 6.5% - 8.5% p.a.</span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="input-label">अवधि (Months)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button type="button" className={`segmented-btn ${fdMonths === 3 ? 'active' : ''}`} onClick={() => setFdMonths(3)}>3 Months</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 6 ? 'active' : ''}`} onClick={() => setFdMonths(6)}>6 Months</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 12 ? 'active' : ''}`} onClick={() => setFdMonths(12)}>1 Year</button>
                  <button type="button" className={`segmented-btn ${fdMonths === 24 ? 'active' : ''}`} onClick={() => setFdMonths(24)}>2 Years</button>
                </div>
              </div>
            </div>

            <div>
              <div className="result-card-highlight">
                <span className="stat-label">Net In-Hand Return (कर कटाएर खुद ब्याज)</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  रु {Math.round(fdCalc.netInterest).toLocaleString('en-IN')}
                </div>
                <span className="stat-subvalue">
                  Maturity Total (साउँ+खुद ब्याज): रु {Math.round(fdCalc.netMaturity).toLocaleString('en-IN')}
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>Gross Interest Earned</span>
                    <span style={{ fontWeight: 700 }}>रु {Math.round(fdCalc.grossInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>5% Government TDS Deducted</span>
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
