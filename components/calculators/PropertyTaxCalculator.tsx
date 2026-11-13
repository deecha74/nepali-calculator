'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Building2, Copy, Check, Landmark, ShieldCheck } from 'lucide-react';

// Kathmandu Metropolitan City (KMC) / Municipal Integrated Property Tax
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
  const { t } = useLanguage();
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
                {t('KMC • LMC • Municipality Ward Tax', 'नगरपालिका एकीकृत सम्पत्ति कर')}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              {t('Nepal Property Tax Calculator', 'सम्पत्ति तथा भूमिकर क्याल्कुलेटर')}
            </h1>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Tax', 'कर कपी गर्नुहोस्')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="land-val" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              {t('1. Municipal Government Land Valuation (NPR):', '१. जग्गाको सरकारी मूल्याङ्कन (रु):')}
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
              {t('2. Depreciated Building Valuation (NPR):', '२. घर/भवनको ह्रासकट्टी पछिको मूल्याङ्कन (रु):')}
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
              {t('3. Building Usage Category:', '३. भवनको उपयोग वर्ग:')}
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
                  color: propertyUse === 'residential' ? '#065f46' : 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                🏠 {t('Residential', 'आवासीय')}
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
                  color: propertyUse === 'commercial' ? '#92400e' : 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                🏢 {t('Commercial / Rental', 'व्यावसायिक / भाडा')}
              </button>
            </div>
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#065f46', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={payBeforePoushEnd}
              onChange={(e) => setPayBeforePoushEnd(e.target.checked)}
            />
            <span>{t('Apply 10% Early Payment Rebate (Paid before Poush end)', 'पुस मसान्तभित्र तिर्दा १०% छुट पाउनुहोस्')}</span>
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
              {t('Net Annual Ward Property Tax Payable', 'वार्षिक तिर्नुपर्ने खुद सम्पत्ति कर')}
            </div>
            <div style={{ fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 900, color: '#fbbf24', marginTop: '4px' }}>
              NPR {calculation.netPayableAnnualTax.toLocaleString('en-IN')} / {t('yr', 'वर्ष')}
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
              {t('Total Assessed Valuation:', 'कुल सरकारी मूल्याङ्कन:')} <strong>NPR {calculation.totalValuation.toLocaleString('en-IN')}</strong> (
              {(calculation.totalValuation / 10000000).toFixed(2)} {t('Crore', 'करोड')})
            </div>
          </div>

          <div style={{ padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)', backgroundColor: '#ffffff', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{t('Gross Municipal Tax:', 'कुल कर रकम:')}</span>
              <strong>NPR {calculation.grossAnnualTax.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px', color: '#059669' }}>
              <span>{t('Timely Payment Discount (10%):', 'समयमै तिर्दा १०% छुट:')}</span>
              <strong>-NPR {calculation.earlyPaymentRebate.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '14px' }}>
              <span>{t('Final Payable Tax at Ward Office:', 'वडा कार्यालयमा बुझाउनुपर्ने कर:')}</span>
              <span style={{ color: '#0f172a' }}>NPR {calculation.netPayableAnnualTax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
