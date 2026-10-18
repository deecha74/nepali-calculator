'use client';

import React, { useState, useMemo } from 'react';
import { Scale, TrendingUp, ShieldCheck, DollarSign, Copy, Check, Info, Landmark } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function FdVsDebentureCalculator() {
  const { language, t } = useLanguage();
  const [principal, setPrincipal] = useState<number>(1000000); // 10 Lakhs
  const [fdRate, setFdRate] = useState<number>(7.25); // Commercial Bank FD 7.25%
  const [debentureRate, setDebentureRate] = useState<number>(9.5); // Bank Debenture 9.5%
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [investorType, setInvestorType] = useState<'individual' | 'institutional'>('individual');
  const [copied, setCopied] = useState<boolean>(false);

  const tdsRate = investorType === 'individual' ? 0.05 : 0.15; // 5% for individuals, 15% for firms

  const comparison = useMemo(() => {
    // FD (Fixed Deposit) Annual Gross & Net
    const fdAnnualGross = principal * (fdRate / 100);
    const fdAnnualTds = fdAnnualGross * tdsRate;
    const fdAnnualNet = fdAnnualGross - fdAnnualTds;
    const fdTotalNet = fdAnnualNet * tenureYears;
    const fdTotalGross = fdAnnualGross * tenureYears;

    // Debenture Annual Gross & Net
    const debAnnualGross = principal * (debentureRate / 100);
    const debAnnualTds = debAnnualGross * tdsRate;
    const debAnnualNet = debAnnualGross - debAnnualTds;
    const debTotalNet = debAnnualNet * tenureYears;
    const debTotalGross = debAnnualGross * tenureYears;

    // Difference
    const netGain = debTotalNet - fdTotalNet;
    const percentageGain = fdTotalNet > 0 ? ((netGain / fdTotalNet) * 100) : 0;

    return {
      fdAnnualGross: Math.round(fdAnnualGross),
      fdAnnualTds: Math.round(fdAnnualTds),
      fdAnnualNet: Math.round(fdAnnualNet),
      fdTotalNet: Math.round(fdTotalNet),
      fdQuarterlyNet: Math.round(fdAnnualNet / 4),

      debAnnualGross: Math.round(debAnnualGross),
      debAnnualTds: Math.round(debAnnualTds),
      debAnnualNet: Math.round(debAnnualNet),
      debTotalNet: Math.round(debTotalNet),
      debQuarterlyNet: Math.round(debAnnualNet / 4),

      netGain: Math.round(netGain),
      percentageGain: Number(percentageGain.toFixed(1))
    };
  }, [principal, fdRate, debentureRate, tenureYears, tdsRate]);

  const handleCopy = () => {
    const text = `FD vs Debenture: NPR ${principal.toLocaleString()} for ${tenureYears} yrs | FD (${fdRate}%): NPR ${comparison.fdTotalNet.toLocaleString()} net | Debenture (${debentureRate}%): NPR ${comparison.debTotalNet.toLocaleString()} net | Extra Gain: NPR ${comparison.netGain.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">नेपाल राष्ट्र बैंक तथा सेबोन (NRB & SEBON)</span>
          <span className="badge badge-emerald">५% व्यक्तिगत TDS कट्टी</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          मुद्दती निक्षेप vs बैंक ऋणपत्र तुलना (Fixed Deposit vs Debenture Yield)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          क वर्गका वाणिज्य बैंकको मुद्दती निक्षेप (FD) र वार्षिक ८.५%–१०.५% ब्याज दिने बैंक ऋणपत्र (Debenture) बीच खुद नाफा तथा ब्याज आम्दानीको तुलना।
        </p>
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Principal */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            लगानी रकम (Investment Amount)
          </label>
          <input
            type="number"
            step="50000"
            value={principal}
            onChange={(e) => setPrincipal(Math.max(10000, Number(e.target.value) || 0))}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              fontWeight: 800,
              outline: 'none',
            }}
          />
          {/* Quick Amount Buttons */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {[500000, 1000000, 2500000, 5000000].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setPrincipal(amt)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: principal === amt ? '#003893' : '#ffffff',
                  color: principal === amt ? '#ffffff' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {amt / 100000} लाख
              </button>
            ))}
          </div>
        </div>

        {/* FD Rate */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            मुद्दती निक्षेप ब्याजदर (FD Rate %)
          </label>
          <input
            type="number"
            step="0.25"
            value={fdRate}
            onChange={(e) => setFdRate(Number(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              fontWeight: 800,
              outline: 'none',
            }}
          />
        </div>

        {/* Debenture Rate */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            ऋणपत्र कुपन दर (Debenture Rate %)
          </label>
          <input
            type="number"
            step="0.25"
            value={debentureRate}
            onChange={(e) => setDebentureRate(Number(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              fontWeight: 800,
              outline: 'none',
            }}
          />
        </div>

        {/* Tenure */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            अवधि (Tenure in Years)
          </label>
          <select
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '13.5px',
              fontWeight: 700,
              outline: 'none',
              backgroundColor: '#ffffff'
            }}
          >
            {[1, 2, 3, 5, 7, 10].map(y => (
              <option key={y} value={y}>{y} वर्ष ({y * 12} महिना)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        
        {/* Fixed Deposit Card */}
        <div
          style={{
            border: '1.5px solid #cbd5e1',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#f8fafc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#334155' }}>
              🏦 मुद्दती निक्षेप (Fixed Deposit)
            </span>
            <span className="badge badge-blue">{fdRate}% वार्षिक</span>
          </div>

          <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
            रू. {comparison.fdTotalNet.toLocaleString()}
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{tenureYears} वर्षको कुल खुद ब्याज (Net Return)</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>वार्षिक खुद आम्दानी:</span>
              <strong>रू. {comparison.fdAnnualNet.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>त्रैमासिक किस्ता (Quarterly):</span>
              <strong>रू. {comparison.fdQuarterlyNet.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>TDS कर कट्टी (५%):</span>
              <span style={{ color: '#dc2626' }}>-रू. {(comparison.fdAnnualTds * tenureYears).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>तरलता (Liquidity):</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>९०% कर्जा लिन सकिने</span>
            </div>
          </div>
        </div>

        {/* Debenture Card */}
        <div
          style={{
            border: '2px solid #003893',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#eff6ff',
            boxShadow: '0 4px 14px rgba(0, 56, 147, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#003893' }}>
              📜 बैंक ऋणपत्र (Debenture)
            </span>
            <span className="badge badge-emerald">{debentureRate}% कुपन</span>
          </div>

          <div style={{ fontSize: '26px', fontWeight: 900, color: '#003893', marginBottom: '12px' }}>
            रू. {comparison.debTotalNet.toLocaleString()}
            <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 600 }}>{tenureYears} वर्षको कुल खुद ब्याज (Net Return)</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', borderTop: '1px solid #bfdbfe', paddingTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1e3a8a' }}>
              <span>वार्षिक खुद आम्दानी:</span>
              <strong>रू. {comparison.debAnnualNet.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1e3a8a' }}>
              <span>त्रैमासिक किस्ता (Quarterly):</span>
              <strong>रू. {comparison.debQuarterlyNet.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1e3a8a' }}>
              <span>TDS कर कट्टी (५%):</span>
              <span style={{ color: '#dc2626' }}>-रू. {(comparison.debAnnualTds * tenureYears).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1e3a8a' }}>
              <span>तरलता (Liquidity):</span>
              <span style={{ color: '#003893', fontWeight: 700 }}>नेप्सेमा किनबेच सकिने</span>
            </div>
          </div>
        </div>
      </div>

      {/* Difference Banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '10px',
          backgroundColor: '#ecfdf5',
          border: '1.5px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={28} color="#059669" />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#065f46' }}>
              ऋणपत्रबाट हुने थप खुद नाफा: रू. {comparison.netGain.toLocaleString()} (+{comparison.percentageGain}%)
            </div>
            <div style={{ fontSize: '12.5px', color: '#047857', marginTop: '2px' }}>
              {tenureYears} वर्षसम्म मुद्दतीको सट्टा ऋणपत्रमा राख्दा तपाईंले रू. {comparison.netGain.toLocaleString()} धेरै ब्याज पाउनुहुन्छ।
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            backgroundColor: copied ? '#16a34a' : '#059669',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '12.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'कपी गरियो' : 'तुलना कपी गर्नुहोस्'}</span>
        </button>
      </div>
    </div>
  );
}
