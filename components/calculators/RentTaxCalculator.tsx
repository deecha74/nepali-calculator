'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Home, Copy, Check, Building2, MapPin } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function RentTaxCalculator() {
  const { t } = useLanguage();
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
            <span className="badge badge-emerald">{t('Local Government Act 2074', 'स्थानीय सरकार सञ्चालन ऐन २०७४')}</span>
            <span className="badge badge-blue">{t('10% Local Rent Tax', '१०% स्थानीय घरबहाल कर')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('House Rent Tax Calculator Nepal', 'घरबहाल कर क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              'Calculate 10% municipality house rent tax and net landlord earnings across Kathmandu, Lalitpur, Pokhara, and all municipalities in Nepal.',
              'काठमाडौँ, ललितपुर, पोखरा लगायत सम्पूर्ण स्थानीय तहमा लाग्ने १०% घरबहाल कर र घरधनीले पाउने खुद भाडा।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        <div>
          {/* Mobile-only instant above-the-fold result */}
          <MobileInstantResult
            primaryLabel={t('Net Landlord Income', 'घरधनीको खुद आम्दानी')}
            primaryValue={`रु ${Math.round(calculation.netMonthlyLandlord).toLocaleString('en-IN')}`}
            primarySubtext={`${t('Annual Net:', 'वार्षिक खुद:')} रु ${Math.round(calculation.netAnnualLandlord).toLocaleString('en-IN')}`}
            secondaryLabel={t('Municipality Tax', 'स्थानीय कर')}
            secondaryValue={`रु ${Math.round(calculation.monthlyTax).toLocaleString('en-IN')}`}
            tertiaryLabel={t('Rate', 'दर')}
            tertiaryValue={`${municipalityRate}%`}
            badge={t('Municipality Rent Tax', 'स्थानीय घरबहाल कर')}
            accentColor="emerald"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="rent-breakdown-details"
          />

          {/* Rent Amount */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Rent Amount', 'भाडा रकम')}
            </label>
            <div className="input-with-prefix-wrap" style={{ position: 'relative' }}>
              <span className="prefix-symbol" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', pointerEvents: 'none' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input input-with-prefix"
                style={{ paddingLeft: '42px', fontSize: '17px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={monthlyRent || ''}
                placeholder="0"
                onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>

          {/* Timeframe Toggle */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Calculation Frequency', 'हिसाबको अवधि')}
            </label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${!isAnnual ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 12px' }}
                onClick={() => setIsAnnual(false)}
              >
                {t('Monthly', 'मासिक')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${isAnnual ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 12px' }}
                onClick={() => setIsAnnual(true)}
              >
                {t('Yearly', 'वार्षिक')}
              </button>
            </div>
          </div>

          {/* Municipality Tax Rate */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Municipality Rent Tax Rate', 'स्थानीय तह घरबहाल कर दर')}
            </label>
            <div className="segmented-control" style={{ display: 'inline-flex' }}>
              {[10, 12, 5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`segmented-btn ${municipalityRate === rate ? 'active' : ''}`}
                  onClick={() => setMunicipalityRate(rate)}
                >
                  {rate}% {rate === 10 ? t('(Standard)', '(मानक)') : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Tenant Type */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Tenant Type', 'भाडामा लिने पक्ष')}
            </label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${tenantType === 'individual' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 10px', fontSize: '12px' }}
                onClick={() => setTenantType('individual')}
              >
                {t('Residential Individual', 'आवासीय / व्यक्तिगत')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${tenantType === 'company' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 10px', fontSize: '12px' }}
                onClick={() => setTenantType('company')}
              >
                {t('Commercial Company (10% TDS)', 'व्यापारिक कम्पनी (१०% TDS)')}
              </button>
            </div>
          </div>
        </div>

        {/* Clean Light-Themed Output Card */}
        <div>
          <div
            id="rent-breakdown-details"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Net Landlord Earnings', 'घरधनीको खुद आम्दानी')}
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              रु {Math.round(calculation.netMonthlyLandlord).toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>{t('/ month', '/ महिना')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Gross Monthly Rent', 'सकल मासिक भाडा')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {Math.round(calculation.monthlyRent).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e11d48' }}>
                <span>{t(`Local Municipality Tax (${municipalityRate}%)`, `स्थानीय घरबहाल कर (${municipalityRate}%)`)}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>- रु {Math.round(calculation.monthlyTax).toLocaleString('en-IN')} {t('/ mo', '/ महिना')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
                <span>{t('Annual Municipality Tax', 'वार्षिक कुल घरबहाल कर')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>रु {Math.round(calculation.annualTax).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 700 }}>{t('Annual Net Landlord Income', 'घरधनीको वार्षिक खुद आम्दानी')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>रु {Math.round(calculation.netAnnualLandlord).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                'Rule: House rent tax is collected directly by your local municipality / ward office. When leasing to a registered company, 10% TDS is withheld and deposited directly with the tax office.',
                'नियम: घरबहाल कर सम्बन्धित वडा कार्यालय वा पालिकाको राजस्व शाखामा बुझाउनुपर्छ। कम्पनी वा फर्म भाडामा बस्दा १०% TDS कट्टी गरी सरकारी खातामा दाखिला गरिन्छ।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
