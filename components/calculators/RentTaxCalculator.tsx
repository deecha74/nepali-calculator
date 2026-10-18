'use client';

import React, { useState, useMemo } from 'react';
import { Home, Copy, Check, Building2, MapPin } from 'lucide-react';

export function RentTaxCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<number>(30000);
  const [municipalityRate, setMunicipalityRate] = useState<number>(10); // Standard 10% in KMC, Lalitpur, Pokhara
  const [tenantType, setTenantType] = useState<'individual' | 'company'>('individual');
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const effectiveMonthly = isAnnual ? monthlyRent / 12 : monthlyRent;
    const annualRent = effectiveMonthly * 12;

    const monthlyTax = (effectiveMonthly * municipalityRate) / 100;
    const annualTax = (annualRent * municipalityRate) / 100;

    const netMonthlyLandlord = effectiveMonthly - monthlyTax;
    const netAnnualLandlord = annualRent - annualTax;

    return {
      monthlyRent: effectiveMonthly,
      annualRent,
      monthlyTax,
      annualTax,
      netMonthlyLandlord,
      netAnnualLandlord,
    };
  }, [monthlyRent, municipalityRate, isAnnual]);

  const handleCopy = () => {
    const text = `Nepal House Rent Tax (घरबहाल कर) Summary:
Monthly Rent: रु ${Math.round(calculation.monthlyRent).toLocaleString('en-IN')}
Annual Rent: रु ${Math.round(calculation.annualRent).toLocaleString('en-IN')}
Municipality Rent Tax (${municipalityRate}%): रु ${Math.round(calculation.monthlyTax).toLocaleString('en-IN')} / month (रु ${Math.round(calculation.annualTax).toLocaleString('en-IN')} / year)
Net Landlord Income: रु ${Math.round(calculation.netMonthlyLandlord).toLocaleString('en-IN')} / month
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">स्थानीय सरकार सञ्चालन ऐन २०७४</span>
            <span className="badge badge-blue">१०% घरबहाल कर (Local Rent Tax)</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            घरबहाल कर तथा भाडा सम्झौता क्याल्कुलेटर (House Rent Tax)
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            काठमाडौँ, ललितपुर, पोखरा लगायत सम्पूर्ण स्थानीय तहमा लाग्ने १०% घरबहाल कर र घरधनीले पाउने खुद भाडा।
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        <div>
          {/* Rent Amount */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              भाडा रकम (Rent Amount in NPR)
            </label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '16px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          {/* Timeframe Toggle */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              अवधि (Calculation Frequency)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: !isAnnual ? '#003893' : '#cbd5e1',
                  backgroundColor: !isAnnual ? '#003893' : '#ffffff',
                  color: !isAnnual ? '#ffffff' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                मासिक (Monthly)
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: isAnnual ? '#003893' : '#cbd5e1',
                  backgroundColor: isAnnual ? '#003893' : '#ffffff',
                  color: isAnnual ? '#ffffff' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                वार्षिक (Yearly)
              </button>
            </div>
          </div>

          {/* Municipality Tax Rate */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              स्थानीय तह बहाल कर दर (Tax Rate %)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[10, 12, 5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMunicipalityRate(rate)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    border: '1.5px solid',
                    borderColor: municipalityRate === rate ? '#003893' : '#cbd5e1',
                    backgroundColor: municipalityRate === rate ? '#003893' : '#ffffff',
                    color: municipalityRate === rate ? '#ffffff' : '#0f172a',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {rate}% {rate === 10 ? '(अधिकांश पालिका)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Tenant Type */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              भाडामा लिने पक्ष (Tenant Type)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setTenantType('individual')}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: tenantType === 'individual' ? '#003893' : '#cbd5e1',
                  backgroundColor: tenantType === 'individual' ? '#eff6ff' : '#ffffff',
                  color: tenantType === 'individual' ? '#003893' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  cursor: 'pointer'
                }}
              >
                व्यक्तिगत (Residential Flat)
              </button>
              <button
                type="button"
                onClick={() => setTenantType('company')}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: tenantType === 'company' ? '#003893' : '#cbd5e1',
                  backgroundColor: tenantType === 'company' ? '#eff6ff' : '#ffffff',
                  color: tenantType === 'company' ? '#003893' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  cursor: 'pointer'
                }}
              >
                कम्पनी / फर्म (TDS 10%)
              </button>
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div>
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              घरधनीको खुद आम्दानी (Net to Landlord)
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#38bdf8', margin: '8px 0 16px' }}>
              रु {Math.round(calculation.netMonthlyLandlord).toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: '#94a3b8' }}>/ महिना</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>सकल मासिक भाडा (Gross Monthly):</span>
                <strong>रु {Math.round(calculation.monthlyRent).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                <span>स्थानीय सरकार बहाल कर ({municipalityRate}% Tax):</span>
                <strong>- रु {Math.round(calculation.monthlyTax).toLocaleString('en-IN')} / महिना</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24' }}>
                <span>वार्षिक कुल कर (Annual Tax to Municipality):</span>
                <strong>रु {Math.round(calculation.annualTax).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                <span>वार्षिक खुद आम्दानी (Annual Net Income):</span>
                <strong>रु {Math.round(calculation.netAnnualLandlord).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              💡 नियम: घरबहाल कर सम्बन्धित वडा कार्यालय वा पालिकाको राजस्व शाखामा बुझाउनुपर्छ। कम्पनी भाडामा बस्दा १०% TDS कट्टी गरी बैंक दाखिला गरिन्छ।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
