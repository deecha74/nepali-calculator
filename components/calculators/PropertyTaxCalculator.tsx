'use client';

import React, { useState, useMemo } from 'react';
import { Building2, Copy, Check, Landmark, ShieldCheck } from 'lucide-react';

// Kathmandu Metropolitan City (KMC) / Municipal Integrated Property Tax (एकीकृत सम्पत्ति कर / घरजग्गा कर)
// Progressive municipal valuation slabs
function calculateMunicipalPropertyTax(totalValuationNpr: number): number {
  const lakhs = totalValuationNpr / 100000;
  if (lakhs <= 0) return 0;
  if (lakhs <= 10) return 300;
  if (lakhs <= 20) return 500;
  if (lakhs <= 50) return 1000;
  if (lakhs <= 100) return 2000; // Up to 1 Crore
  if (lakhs <= 200) return 2000 + (lakhs - 100) * 35; // 1–2 Crore
  if (lakhs <= 300) return 5500 + (lakhs - 200) * 60; // 2–3 Crore
  if (lakhs <= 500) return 11500 + (lakhs - 300) * 100; // 3–5 Crore
  return Math.round(31500 + (lakhs - 500) * 150); // Above 5 Crore
}

export function PropertyTaxCalculator() {
  const [landValueNpr, setLandValueNpr] = useState<number>(8500000);
  const [buildingValueNpr, setBuildingValueNpr] = useState<number>(6500000);
  const [propertyUse, setPropertyUse] = useState<'residential' | 'commercial'>('residential');
  const [payBeforePoushEnd, setPayBeforePoushEnd] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const totalValuation = Math.max(0, landValueNpr) + Math.max(0, buildingValueNpr);
    const baseAnnualTax = calculateMunicipalPropertyTax(totalValuation);
    const commercialMultiplier = propertyUse === 'commercial' ? 1.25 : 1.0;
    const grossAnnualTax = Math.round(baseAnnualTax * commercialMultiplier);

    // 10% early payment rebate if paid by Ashwin/Poush end as per KMC/LMC Finance Act
    const earlyPaymentRebate = payBeforePoushEnd ? Math.round(grossAnnualTax * 0.1) : 0;
    const netPayableAnnualTax = grossAnnualTax - earlyPaymentRebate;

    return {
      totalValuation,
      grossAnnualTax,
      earlyPaymentRebate,
      netPayableAnnualTax,
    };
  }, [landValueNpr, buildingValueNpr, propertyUse, payBeforePoushEnd]);

  const handleCopy = () => {
    const text = `Nepal Municipal Annual Property Tax (Sampurak / Ghar Jagga Kar):
Total Municipal Valuation: NPR ${calculation.totalValuation.toLocaleString('en-IN')}
Gross Annual Property Tax: NPR ${calculation.grossAnnualTax.toLocaleString('en-IN')}
10% Timely Payment Rebate: -NPR ${calculation.earlyPaymentRebate.toLocaleString('en-IN')}
Net Payable Ward Tax: NPR ${calculation.netPayableAnnualTax.toLocaleString('en-IN')}/year
Calculated via NepalCalc.com/property-tax`;
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
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#fef3c7',
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>
                KMC • LMC • Municipality Ward Tax
              </span>
              <span className="badge badge-neutral">एकीकृत सम्पत्ति तथा घरजग्गा कर</span>
            </div>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              Nepal Annual Property Tax Calculator (सम्पत्ति तथा भूमिकर २०८३/८४)
            </h2>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Tax'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="land-val" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              1. Municipal Government Land Valuation (जग्गाको सरकारी मूल्याङ्कन — NPR):
            </label>
            <input
              id="land-val"
              type="number"
              min={0}
              step={500000}
              value={landValueNpr}
              onChange={(e) => setLandValueNpr(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '15px', fontWeight: 700 }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="bldg-val" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              2. Depreciated House / Building Valuation (घरको मूल्याङ्कन — NPR):
            </label>
            <input
              id="bldg-val"
              type="number"
              min={0}
              step={500000}
              value={buildingValueNpr}
              onChange={(e) => setBuildingValueNpr(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '15px', fontWeight: 700 }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              3. Building Usage Category:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setPropertyUse('residential')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: propertyUse === 'residential' ? '2px solid #059669' : '1px solid var(--border-subtle)',
                  background: propertyUse === 'residential' ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                🏠 Residential (आवासीय)
              </button>
              <button
                type="button"
                onClick={() => setPropertyUse('commercial')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: propertyUse === 'commercial' ? '2px solid #b45309' : '1px solid var(--border-subtle)',
                  background: propertyUse === 'commercial' ? '#fffbeb' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                🏢 Commercial / Rental
              </button>
            </div>
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#065f46', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={payBeforePoushEnd}
              onChange={(e) => setPayBeforePoushEnd(e.target.checked)}
            />
            <span>Apply 10% Early Payment Rebate (पुस मसान्तभित्र तिर्दा १०% छुट)</span>
          </label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700 }}>
              Net Annual Ward Property Tax Payable
            </div>
            <div style={{ fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 900, color: '#fbbf24', marginTop: '4px' }}>
              NPR {calculation.netPayableAnnualTax.toLocaleString('en-IN')} / yr
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
              Total Assessed Valuation: <strong>NPR {calculation.totalValuation.toLocaleString('en-IN')}</strong> (
              {(calculation.totalValuation / 10000000).toFixed(2)} Crore)
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Gross Annual Sampurak / Property Tax:</span>
                <strong>NPR {calculation.grossAnnualTax.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>10% Timely Ward Payment Rebate:</span>
                <strong>-NPR {calculation.earlyPaymentRebate.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px', fontWeight: 800 }}>
                <span>Final Payable at Ward Office (वडा कार्यालय):</span>
                <span style={{ color: '#b45309' }}>NPR {calculation.netPayableAnnualTax.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

