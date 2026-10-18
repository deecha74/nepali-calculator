'use client';

import React, { useState, useMemo } from 'react';
import { Briefcase, Copy, Check } from 'lucide-react';

export function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(40000); // 40k basic
  const [yearsWorked, setYearsWorked] = useState<number>(5);
  const [accumulatedHomeLeaveDays, setAccumulatedHomeLeaveDays] = useState<number>(30); // Max 90
  const [accumulatedSickLeaveDays, setAccumulatedSickLeaveDays] = useState<number>(15); // Max 45
  const [copied, setCopied] = useState<boolean>(false);

  // Labour Act 2074 Rules:
  // 1. Gratuity (उपदान): 8.33% of basic salary every month => 1 full basic salary per year worked!
  // 2. Leave Encashment: (Home Leave + Sick Leave) * (Basic Salary / 30)
  const calculation = useMemo(() => {
    const monthlyGratuity = basicSalary * 0.0833;
    const totalGratuity = monthlyGratuity * 12 * yearsWorked;

    const dailyRate = basicSalary / 30;
    const homeLeaveEncashment = Math.min(90, accumulatedHomeLeaveDays) * dailyRate;
    const sickLeaveEncashment = Math.min(45, accumulatedSickLeaveDays) * dailyRate;
    const totalLeaveEncashment = homeLeaveEncashment + sickLeaveEncashment;

    const totalRetirementPayout = totalGratuity + totalLeaveEncashment;

    return {
      monthlyGratuity,
      totalGratuity,
      dailyRate,
      homeLeaveEncashment,
      sickLeaveEncashment,
      totalLeaveEncashment,
      totalRetirementPayout,
    };
  }, [basicSalary, yearsWorked, accumulatedHomeLeaveDays, accumulatedSickLeaveDays]);

  const handleCopy = () => {
    const text = `Nepal Labour Act 2074 Gratuity & Payout:
Basic Monthly Salary: रु ${basicSalary.toLocaleString('en-IN')}
Service Duration: ${yearsWorked} Years
Total Gratuity (उपदान 8.33%): रु ${Math.round(calculation.totalGratuity).toLocaleString('en-IN')}
Leave Encashment (बिदाको रकम): रु ${Math.round(calculation.totalLeaveEncashment).toLocaleString('en-IN')}
TOTAL SEPARATION PAYOUT: रु ${Math.round(calculation.totalRetirementPayout).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Nepal Labour Act 2074</span>
            <span className="badge badge-neutral">8.33% Monthly Accrual</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Gratuity & Separation Payout Calculator (उपदान हिसाब)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate employee retirement gratuity and accumulated leave encashment per Nepal labour laws.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Basic Monthly Salary (मासिक आधारभूत तलब)</label>
            <input
              type="number"
              min={1000}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700 }}
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value) || 0)}
            />
            <span className="input-subtext">Gratuity is calculated on basic salary without allowances</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Total Years of Service (कार्य अवधि - वर्ष)</label>
            <input
              type="number"
              min={0.1}
              step="0.5"
              className="text-input"
              value={yearsWorked}
              onChange={(e) => setYearsWorked(Number(e.target.value) || 0)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="input-label">Remaining Home Leave (घर बिदा)</label>
              <input
                type="number"
                min={0}
                max={90}
                className="text-input"
                value={accumulatedHomeLeaveDays}
                onChange={(e) => setAccumulatedHomeLeaveDays(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">Max encashable: 90 days</span>
            </div>

            <div>
              <label className="input-label">Remaining Sick Leave (बिरामी बिदा)</label>
              <input
                type="number"
                min={0}
                max={45}
                className="text-input"
                value={accumulatedSickLeaveDays}
                onChange={(e) => setAccumulatedSickLeaveDays(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">Max encashable: 45 days</span>
            </div>
          </div>
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">Total Separation Benefit (कुल प्राप्त हुने उपदान)</span>
            <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
              रु {Math.round(calculation.totalRetirementPayout).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              After {yearsWorked} years of employment
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Accrued Gratuity (8.33% उपदान)</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(calculation.totalGratuity).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Home Leave Encashment</span>
                <span style={{ fontWeight: 700 }}>रु {Math.round(calculation.homeLeaveEncashment).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Sick Leave Encashment</span>
                <span style={{ fontWeight: 700 }}>रु {Math.round(calculation.sickLeaveEncashment).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
