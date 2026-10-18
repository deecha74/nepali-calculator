'use client';

import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Briefcase, 
  DollarSign,
  ShieldCheck
} from 'lucide-react';

export function OvertimeCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(30000); // 30k basic default
  const [workingDays, setWorkingDays] = useState<number>(26);
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [otHours, setOtHours] = useState<number>(20); // 20 hours OT in month
  const [otMultiplier, setOtMultiplier] = useState<number>(1.5); // 1.5x as per Labour Act 2074
  const [copied, setCopied] = useState<boolean>(false);

  const calc = useMemo(() => {
    const totalRegularHours = workingDays * dailyHours;
    const basicHourlyRate = (basicSalary || 0) / (totalRegularHours || 1);
    const otHourlyRate = basicHourlyRate * otMultiplier;
    const totalOtPay = (otHours || 0) * otHourlyRate;
    const grossSalaryWithOt = (basicSalary || 0) + totalOtPay;

    return {
      totalRegularHours,
      basicHourlyRate: Math.round(basicHourlyRate * 100) / 100,
      otHourlyRate: Math.round(otHourlyRate * 100) / 100,
      totalOtPay: Math.round(totalOtPay),
      grossSalaryWithOt: Math.round(grossSalaryWithOt),
    };
  }, [basicSalary, workingDays, dailyHours, otHours, otMultiplier]);

  const handleCopy = () => {
    const text = `Nepal Labour Act 2074 Overtime Calculation:
Basic Salary: NPR ${basicSalary.toLocaleString('en-IN')}
Basic Hourly Rate: NPR ${calc.basicHourlyRate}
OT Rate (1.5x): NPR ${calc.otHourlyRate}/hour
OT Hours Worked: ${otHours} Hours
Total Overtime Pay: NPR ${calc.totalOtPay.toLocaleString('en-IN')}
Total Gross with OT: NPR ${calc.grossSalaryWithOt.toLocaleString('en-IN')}
Via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Nepal Labour Act 2074 (Section 31)</span>
            <span className="badge badge-neutral">1.5x Basic Pay</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Overtime (OT) & Hourly Wage Calculator Nepal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate overtime earnings and hourly pay compliant with Ministry of Labour & Employment guidelines.
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
            <label className="input-label">Monthly Basic Salary (NPR)</label>
            <input
              type="number"
              value={basicSalary || ''}
              onChange={(e) => setBasicSalary(Math.max(1000, Number(e.target.value)))}
              className="text-input"
              style={{ fontSize: '16px', fontWeight: 700 }}
            />
            <span className="input-subtext">Labour Act rules calculate OT based on Basic Pay (not allowances).</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label className="input-label">Working Days / Month</label>
              <input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(Math.max(1, Math.min(31, Number(e.target.value))))}
                className="text-input"
              />
            </div>
            <div>
              <label className="input-label">Regular Hours / Day</label>
              <input
                type="number"
                value={dailyHours}
                onChange={(e) => setDailyHours(Math.max(1, Math.min(16, Number(e.target.value))))}
                className="text-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ margin: 0 }}>Overtime Hours Worked this Month</label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>{otHours} Hours</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={otHours}
              onChange={(e) => setOtHours(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>० Hours</span>
              <span>२० Hours</span>
              <span>१०० Hours</span>
            </div>
          </div>

          <div>
            <label className="input-label">Overtime Pay Rate Multiplier</label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${otMultiplier === 1.5 ? 'active' : ''}`}
                onClick={() => setOtMultiplier(1.5)}
                style={{ flex: 1 }}
              >
                1.5x (Labour Act Standard)
              </button>
              <button
                type="button"
                className={`segmented-btn ${otMultiplier === 2.0 ? 'active' : ''}`}
                onClick={() => setOtMultiplier(2.0)}
                style={{ flex: 1 }}
              >
                2.0x (Double Pay / Public Holiday)
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)', border: '1.5px solid #bbf7d0' }}>
            <span className="stat-label" style={{ color: '#047857' }}>Total Overtime Payment Payable</span>
            <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
              रु {calc.totalOtPay.toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              For {otHours} hours of overtime at रु {calc.otHourlyRate}/hour.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid #d1fae5', marginTop: '16px' }}>
              <div>
                <span className="stat-label">Basic Hourly Rate</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  रु {calc.basicHourlyRate}
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Based on {calc.totalRegularHours} hrs/mo</span>
              </div>

              <div>
                <span className="stat-label">OT Hourly Rate ({otMultiplier}x)</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  रु {calc.otHourlyRate}
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Per overtime hour</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
              <span className="stat-label">Total Monthly Gross (Basic + OT)</span>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
                रु {calc.grossSalaryWithOt.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
            📜 <strong>Nepal Labour Act 2074 Clause:</strong> No employee shall be deployed for overtime exceeding 4 hours a day and 24 hours a week without mutual consent. Overtime must be compensated at a minimum rate of 150% of the basic wage.
          </div>
        </div>
      </div>
    </div>
  );
}
