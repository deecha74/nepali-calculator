'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Receipt, 
  ShieldCheck, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Scale, 
  UserCheck, 
  Percent, 
  ArrowRightLeft,
  Info,
  BadgePercent
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

type LocationCategory = 'metropolitan' | 'submetropolitan' | 'municipality' | 'rural' | 'apartment';
type HoldingPeriod = 'under5' | 'over5';
type SellerType = 'individual' | 'corporate';
type BuyerGenderCategory = 'general' | 'woman' | 'single_woman';

export function MalpotTaxCalculator() {
  const { t } = useLanguage();

  // Transaction Inputs
  const [declaredPrice, setDeclaredPrice] = useState<number>(7500000); // 75 Lakhs
  const [govtValuation, setGovtValuation] = useState<number>(5000000); // 50 Lakhs
  const [locationCategory, setLocationCategory] = useState<LocationCategory>('metropolitan');
  const [buyerCategory, setBuyerCategory] = useState<BuyerGenderCategory>('woman');
  
  // Seller CGT Inputs
  const [originalCost, setOriginalCost] = useState<number>(4500000); // 45 Lakhs original cost
  const [allowableExpenses, setAllowableExpenses] = useState<number>(300000); // 3 Lakhs
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('over5');
  const [sellerType, setSellerType] = useState<SellerType>('individual');
  const [isPrimaryResidence10Yrs, setIsPrimaryResidence10Yrs] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  // Quick Preset Handlers
  const handlePreset = (dec: number, gov: number, loc: LocationCategory, buy: BuyerGenderCategory, orig: number) => {
    setDeclaredPrice(dec);
    setGovtValuation(gov);
    setLocationCategory(loc);
    setBuyerCategory(buy);
    setOriginalCost(orig);
  };

  // Calculations
  const calculation = useMemo(() => {
    // 1. Taxable Valuation (Higher of Declared Deed Price vs Official Minimum Valuation)
    const taxableBase = Math.max(declaredPrice, govtValuation);

    // 2. Base Registration Rate
    let baseRegRate = 0.05; // 5% default
    if (locationCategory === 'metropolitan') baseRegRate = 0.05;
    else if (locationCategory === 'submetropolitan') baseRegRate = 0.045;
    else if (locationCategory === 'municipality') baseRegRate = 0.045;
    else if (locationCategory === 'rural') baseRegRate = 0.03;
    else if (locationCategory === 'apartment') baseRegRate = 0.01;

    // 3. Concession / Rebate for Women
    let rebatePercent = 0;
    if (buyerCategory === 'woman') {
      rebatePercent = 0.25; // 25% discount on registration fee
    } else if (buyerCategory === 'single_woman') {
      rebatePercent = 0.35; // 35% discount for single woman/widow
    }

    const grossRegistrationFee = taxableBase * baseRegRate;
    const rebateAmount = grossRegistrationFee * rebatePercent;
    const netRegistrationFee = grossRegistrationFee - rebateAmount;

    // Misc writing, stamp & ward office verification charges
    const estimatedDeedWritingFee = 3500;
    const totalBuyerPayable = netRegistrationFee + estimatedDeedWritingFee;

    // 4. Seller Capital Gains Tax (CGT)
    const totalDeductions = originalCost + allowableExpenses;
    const netGain = Math.max(0, taxableBase - totalDeductions);

    let cgtRate = 0;
    let cgtAmount = 0;
    let isCgtExempt = false;
    let exemptReason = '';

    if (sellerType === 'corporate') {
      // Corporate seller: Flat 1.5% Advance Withholding Tax on gross deed valuation
      cgtRate = 0.015;
      cgtAmount = taxableBase * 0.015;
    } else {
      // Individual seller rules
      if (taxableBase < 1000000) {
        isCgtExempt = true;
        exemptReason = t('Exempt: Gross selling value is under Rs 10 Lakhs', '१० लाखभन्दा कम कारोबार भएकाले कर छुट');
        cgtRate = 0;
        cgtAmount = 0;
      } else if (isPrimaryResidence10Yrs) {
        isCgtExempt = true;
        exemptReason = t('Exempt: 10+ Years continuous personal primary residence', '१० वर्षभन्दा बढी बसोबास गरेको निजी घरजग्गा भएकाले छुट');
        cgtRate = 0;
        cgtAmount = 0;
      } else if (netGain <= 0) {
        isCgtExempt = true;
        exemptReason = t('No Net Capital Gain (Sold at loss or breakeven)', 'कुनै खुद पूँजीगत नाफा नभएको (घाटा वा बराबर)');
        cgtRate = 0;
        cgtAmount = 0;
      } else {
        // Holding period tier: <=5 years: 10%, >5 years: 7.5%
        cgtRate = holdingPeriod === 'under5' ? 0.10 : 0.075;
        cgtAmount = netGain * cgtRate;
      }
    }

    const totalGovtRevenue = netRegistrationFee + cgtAmount;

    return {
      taxableBase,
      baseRegRate,
      grossRegistrationFee,
      rebatePercent,
      rebateAmount,
      netRegistrationFee,
      estimatedDeedWritingFee,
      totalBuyerPayable,
      netGain,
      cgtRate,
      cgtAmount,
      isCgtExempt,
      exemptReason,
      totalGovtRevenue,
    };
  }, [
    declaredPrice, 
    govtValuation, 
    locationCategory, 
    buyerCategory, 
    originalCost, 
    allowableExpenses, 
    holdingPeriod, 
    sellerType, 
    isPrimaryResidence10Yrs,
    t
  ]);

  const handleCopy = () => {
    const text = `Nepal Land Malpot Registration & Capital Gains Tax (मालपोत लिखत तथा पूँजीगत लाभकर):
--------------------------------------------------
Taxable Valuation: रु ${calculation.taxableBase.toLocaleString('en-IN')}
Location Category: ${locationCategory.toUpperCase()} (${(calculation.baseRegRate * 100).toFixed(1)}% base)
Buyer Concession: ${buyerCategory === 'woman' ? '25% Woman Rebate' : buyerCategory === 'single_woman' ? '35% Single Woman Rebate' : 'General'}

[ BUYER'S LIABILITY / क्रेताको खर्च ]
- Registration Fee (रजिष्ट्रेसन दस्तुर): रु ${Math.round(calculation.netRegistrationFee).toLocaleString('en-IN')}
- Deed & Ward Charges (लिखत/सिफारिस): रु ${calculation.estimatedDeedWritingFee.toLocaleString('en-IN')}
- Total Buyer Payment: रु ${Math.round(calculation.totalBuyerPayable).toLocaleString('en-IN')}

[ SELLER'S LIABILITY / विक्रेताको लाभकर ]
- Net Capital Gain (खुद नाफा): रु ${Math.round(calculation.netGain).toLocaleString('en-IN')}
- Capital Gains Tax (${(calculation.cgtRate * 100).toFixed(1)}% CGT): रु ${Math.round(calculation.cgtAmount).toLocaleString('en-IN')}
${calculation.isCgtExempt ? `(Exemption Status: ${calculation.exemptReason})` : ''}

Total Malpot Revenue: रु ${Math.round(calculation.totalGovtRevenue).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(20px, 3.5vw, 36px)', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-emerald">
              <Scale size={13} />
              <span>{t('Department of Land Management (DoLMA)', 'भूमि व्यवस्थापन तथा अभिलेख विभाग')}</span>
            </span>
            <span className="badge badge-blue">
              <BadgePercent size={13} />
              <span>{t('Finance Act FY 2083/84 Slabs', 'आर्थिक ऐन २०८३/८४ मापदण्ड')}</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3.2vw, 28px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {t('Land Malpot Registration & Capital Gains Tax Calculator', 'मालपोत जग्गा रजिष्ट्रेसन तथा पूँजीगत लाभकर क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', maxWidth: '780px', lineHeight: 1.5, margin: '4px 0 0' }}>
            {t(
              'Calculate official deed registration fee for buyers (with women concessions) and Capital Gains Tax (CGT) for sellers across all 753 local municipalities.',
              'क्रेताले मालपोत कार्यालयमा बुझाउनुपर्ने लिखत रजिष्ट्रेसन दस्तुर (महिला छुट सहित) र बिक्रेताको पूँजीगत लाभकर (CGT) को आधिकारिक हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '9px 16px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Summary', 'हिसाब कपी गर्नुहोस्')}</span>
        </button>
      </div>

      {/* Quick Location Presets */}
      <div style={{ marginBottom: '24px', padding: '14px 18px', background: 'var(--bg-subtle, #f8fafc)', borderRadius: '14px', border: '1px solid var(--border-subtle, #e2e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>
          <Sparkles size={14} color="#f59e0b" />
          <span>{t('Quick Sample Scenarios:', 'नमुना उदाहरण छान्नुहोस्:')}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button 
            type="button" 
            onClick={() => handlePreset(10000000, 7500000, 'metropolitan', 'woman', 6000000)}
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
          >
            🏛️ {t('Kathmandu 1 Crore (Woman 25% Off)', 'काठमाडौँ १ करोड (महिला २५% छुट)')}
          </button>
          <button 
            type="button" 
            onClick={() => handlePreset(5000000, 4000000, 'municipality', 'general', 3000000)}
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
          >
            🏘️ {t('Nagarpalika 50 Lakhs (General)', 'नगरपालिका ५० लाख (सामान्य)')}
          </button>
          <button 
            type="button" 
            onClick={() => handlePreset(2000000, 1500000, 'rural', 'single_woman', 1200000)}
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '8px' }}
          >
            🌾 {t('Gaunpalika 20 Lakhs (Single Woman)', 'गाउँपालिका २० लाख (एकल महिला ३५%)')}
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '32px' }}>
        
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Section 1: Property Valuation */}
          <div style={{ padding: '18px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <Receipt size={15} />
              <span>{t('1. Land / Property Valuation (थैली रकम)', '१. जग्गा तथा सम्पत्ति मूल्याङ्कन (थैली रकम)')}</span>
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '12.5px' }}>
                  {t('Agreed Deed / Transaction Price (लिखित थैली मूल्य रु)', 'लिखित थैली / जग्गाको कारोबार मूल्य (रु)')}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min={100000}
                    step={50000}
                    className="text-input"
                    style={{ fontSize: '16px', fontWeight: 700, paddingRight: '40px' }}
                    value={declaredPrice || ''}
                    onChange={(e) => setDeclaredPrice(Number(e.target.value) || 0)}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                    रु
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', display: 'block' }}>
                  {declaredPrice ? `रु ${(declaredPrice / 100000).toFixed(2)} लाख (${(declaredPrice / 10000000).toFixed(2)} करोड)` : ''}
                </span>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '12.5px' }}>
                  {t('Govt. Minimum Valuation (सरकारी न्यूनतम मूल्याङ्कन रु)', 'सरकारी न्यूनतम मूल्याङ्कन पुस्तिका अनुसारको रकम (रु)')}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    className="text-input"
                    style={{ fontSize: '16px', fontWeight: 700, paddingRight: '40px' }}
                    value={govtValuation || ''}
                    onChange={(e) => setGovtValuation(Number(e.target.value) || 0)}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                    रु
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#059669', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={12} />
                  {t('Malpot taxes whichever is higher between Transaction Price vs Govt Valuation', 'कारोबार मूल्य र सरकारी मूल्याङ्कनमध्ये जुन बढी हुन्छ, त्यसमा कर लाग्छ।')}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Location Category */}
          <div style={{ padding: '18px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#047857', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <MapPin size={15} />
              <span>{t('2. Location Municipality (स्थानीय तह)', '२. स्थानीय तह तथा क्षेत्र (Municipality)')}</span>
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {[
                { id: 'metropolitan', labelEn: 'Metropolitan (5%)', labelNe: 'महानगर (५%)', sub: 'KTM, Lalitpur, Pokhara' },
                { id: 'submetropolitan', labelEn: 'Sub-Metro (4.5%)', labelNe: 'उपमहानगर (४.५%)', sub: 'Dharan, Butwal' },
                { id: 'municipality', labelEn: 'Municipality (4.5%)', labelNe: 'नगरपालिका (४.५%)', sub: 'Standard Nagarpalika' },
                { id: 'rural', labelEn: 'Rural Metro (3%)', labelNe: 'गाउँपालिका (३%)', sub: 'Gaunpalika Area' },
                { id: 'apartment', labelEn: 'Apartment (1%)', labelNe: 'अपार्टमेन्ट (१%)', sub: 'Group Housing' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocationCategory(loc.id as LocationCategory)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: locationCategory === loc.id ? '2px solid #003893' : '1px solid #e2e8f0',
                    background: locationCategory === loc.id ? '#eff6ff' : '#ffffff',
                    color: locationCategory === loc.id ? '#003893' : '#334155',
                    fontWeight: locationCategory === loc.id ? 800 : 600,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>{t(loc.labelEn, loc.labelNe)}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{loc.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Buyer Concession (Female Rebate) */}
          <div style={{ padding: '18px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <UserCheck size={15} />
              <span>{t('3. Buyer Ownership & Discounts (क्रेताको छुट)', '३. क्रेताको स्वामित्व तथा छुट सुविधा')}</span>
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setBuyerCategory('general')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: buyerCategory === 'general' ? '2px solid #003893' : '1px solid #e2e8f0',
                  background: buyerCategory === 'general' ? '#eff6ff' : '#ffffff',
                  color: buyerCategory === 'general' ? '#003893' : '#334155',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>{t('General', 'सामान्य')}</div>
                <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>0% {t('Rebate', 'छुट')}</div>
              </button>

              <button
                type="button"
                onClick={() => setBuyerCategory('woman')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: buyerCategory === 'woman' ? '2px solid #059669' : '1px solid #e2e8f0',
                  background: buyerCategory === 'woman' ? '#f0fdf4' : '#ffffff',
                  color: buyerCategory === 'woman' ? '#059669' : '#334155',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>👩 {t('Woman', 'महिला')}</div>
                <div style={{ fontSize: '10.5px', color: '#059669', marginTop: '2px', fontWeight: 800 }}>25% {t('Rebate', 'छुट')}</div>
              </button>

              <button
                type="button"
                onClick={() => setBuyerCategory('single_woman')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: buyerCategory === 'single_woman' ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                  background: buyerCategory === 'single_woman' ? '#f5f3ff' : '#ffffff',
                  color: buyerCategory === 'single_woman' ? '#7c3aed' : '#334155',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div>👩‍👧 {t('Single Woman', 'एकल महिला')}</div>
                <div style={{ fontSize: '10.5px', color: '#7c3aed', marginTop: '2px', fontWeight: 800 }}>35% {t('Rebate', 'छुट')}</div>
              </button>
            </div>
          </div>

          {/* Section 4: Seller Capital Gains Tax (CGT) Config */}
          <div style={{ padding: '18px', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <Percent size={15} />
              <span>{t('4. Seller Capital Gains Tax Details (विक्रेताको लाभकर)', '४. विक्रेताको पूँजीगत लाभकर (CGT) विवरण')}</span>
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '12px' }}>
                    {t('Past Acquisition Cost (साविक खरिद रु)', 'साविक खरिद/प्राप्ति मूल्य (रु)')}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    className="text-input"
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value={originalCost || ''}
                    onChange={(e) => setOriginalCost(Number(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label className="input-label" style={{ fontSize: '12px' }}>
                    {t('Allowable Expenses (सुधार खर्च रु)', 'थप सुधार/रजिष्ट्रेसन खर्च (रु)')}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    className="text-input"
                    style={{ fontSize: '14px', fontWeight: 700 }}
                    value={allowableExpenses || ''}
                    onChange={(e) => setAllowableExpenses(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Holding Period Radio */}
              <div>
                <label className="input-label" style={{ fontSize: '12px' }}>
                  {t('Ownership Holding Period (स्वामित्व अवधि):', 'जग्गा स्वामित्व अवधि (खरिद देखि हालसम्म):')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setHoldingPeriod('under5')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: holdingPeriod === 'under5' ? '2px solid #dc2626' : '1px solid #e2e8f0',
                      background: holdingPeriod === 'under5' ? '#fef2f2' : '#ffffff',
                      color: holdingPeriod === 'under5' ? '#dc2626' : '#334155',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {t('≤ 5 Years (10% CGT)', '५ वर्ष वा कम (१०% लाभकर)')}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHoldingPeriod('over5')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: holdingPeriod === 'over5' ? '2px solid #059669' : '1px solid #e2e8f0',
                      background: holdingPeriod === 'over5' ? '#f0fdf4' : '#ffffff',
                      color: holdingPeriod === 'over5' ? '#059669' : '#334155',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {t('> 5 Years (7.5% CGT)', '५ वर्ष भन्दा बढी (७.५% लाभकर)')}
                  </button>
                </div>
              </div>

              {/* Exemption Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <input
                  type="checkbox"
                  id="primaryResidenceCheck"
                  checked={isPrimaryResidence10Yrs}
                  onChange={(e) => setIsPrimaryResidence10Yrs(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="primaryResidenceCheck" style={{ fontSize: '12px', color: '#334155', fontWeight: 600, cursor: 'pointer', margin: 0 }}>
                  {t('10+ Years Continuous Personal Primary Residence (Tax Exempt)', '१० वर्षभन्दा बढी बसोबास गरेको निजी घरजग्गा (कर छुट सुविधा)')}
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Results Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Hero Result Card */}
          <div 
            className="result-card-highlight" 
            style={{ 
              padding: '24px', 
              background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)',
              border: '2px solid #003893',
              borderRadius: '18px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="stat-label" style={{ color: '#003893' }}>
                  {t('Total Government Revenue (Malpot Karyalaya)', 'मालपोत कार्यालयमा बुझाउनुपर्ने कुल सरकारी राजस्व')}
                </span>
                <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: '#003893', letterSpacing: '-0.02em', marginTop: '2px' }}>
                  रु {Math.round(calculation.totalGovtRevenue).toLocaleString('en-IN')}
                </div>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '11px', padding: '4px 10px' }}>
                {t('Taxable Base:', 'कर आधार:')} रु {calculation.taxableBase.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Split: Buyer's vs Seller's Liability */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', marginTop: '16px' }}>
              
              {/* Buyer Box */}
              <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#166534', letterSpacing: '0.04em' }}>
                  🛒 {t("BUYER PAYS (क्रेता)", "क्रेताले तिर्नुपर्ने")}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#15803d', marginTop: '4px' }}>
                  रु {Math.round(calculation.totalBuyerPayable).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#166534', marginTop: '2px' }}>
                  {calculation.rebatePercent > 0 
                    ? `(रु ${Math.round(calculation.rebateAmount).toLocaleString('en-IN')} ${t('Women Rebate Deducted', 'महिला छुट प्राप्त')})`
                    : t('Base Registration Fee', 'नियमित रजिष्ट्रेसन दस्तुर')}
                </div>
              </div>

              {/* Seller Box */}
              <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#991b1b', letterSpacing: '0.04em' }}>
                  🤝 {t("SELLER CGT (विक्रेता)", "विक्रेताको लाभकर")}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#b91c1c', marginTop: '4px' }}>
                  रु {Math.round(calculation.cgtAmount).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '2px' }}>
                  {calculation.isCgtExempt ? t('Exempt from CGT', 'लाभकर पूर्ण छुट') : `${(calculation.cgtRate * 100).toFixed(1)}% ${t('on Net Gain', 'खुद नाफामा')}`}
                </div>
              </div>

            </div>

            {/* Comprehensive Line-Item Breakdown Table */}
            <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Base Registration Rate', 'आधार लिखत रजिष्ट्रेसन दर')}</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{(calculation.baseRegRate * 100).toFixed(1)}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Gross Registration Fee (बिना छुट)', 'रजिष्ट्रेसन दस्तुर (छुट अघि)')}</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>रु {Math.round(calculation.grossRegistrationFee).toLocaleString('en-IN')}</span>
              </div>

              {calculation.rebateAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                  <span>{t('Women Ownership Discount', 'महिला स्वामित्व छुट (२५/३५%)')}</span>
                  <span>- रु {Math.round(calculation.rebateAmount).toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Net Deed Registration Fee', 'क्रेताले तिर्ने खुद रजिष्ट्रेसन दस्तुर')}</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>रु {Math.round(calculation.netRegistrationFee).toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Est. Deed Writing & Ward Verification', 'अनुमानित लिखत लेखन तथा वडा सिफारिस शुल्क')}</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>रु {calculation.estimatedDeedWritingFee.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ borderTop: '1px dashed #cbd5e1', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Seller Net Capital Gain (Profit)', 'विक्रेताको खुद पूँजीगत नाफा')}</span>
                <span style={{ fontWeight: 700, color: calculation.netGain > 0 ? '#b91c1c' : '#059669' }}>
                  रु {Math.round(calculation.netGain).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>{t('Capital Gains Tax (CGT)', 'पूँजीगत लाभकर (CGT)')}</span>
                <span style={{ fontWeight: 800, color: '#dc2626' }}>
                  रु {Math.round(calculation.cgtAmount).toLocaleString('en-IN')}
                </span>
              </div>

              {calculation.isCgtExempt && (
                <div style={{ padding: '8px 12px', background: '#f0fdf4', borderRadius: '8px', color: '#166534', fontSize: '12px', fontWeight: 600 }}>
                  ✓ {calculation.exemptReason}
                </div>
              )}

            </div>
          </div>

          {/* Official Gazette Guide & Advisory Box */}
          <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#475569', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              <ShieldCheck size={16} color="#059669" />
              <span>{t('Official Nepal Malpot Rules & Advice:', 'नेपाल मालपोत नियम तथा कानुनी व्यवस्था:')}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>{t('Taxable Base Rule:', 'मूल्याङ्कन नियम:')}</strong> {t(
                  'The Land Revenue Office strictly applies tax on whichever is higher between your agreed written deed price and the local Minimum Valuation Book (न्यूनतम मूल्याङ्कन पुस्तिका).',
                  'लिखतमा उल्लिखित थैली रकम वा मालपोतको न्यूनतम मूल्याङ्कन पुस्तिकामा तोकिएको दरमध्ये जुन बढी हुन्छ, सोही रकमलाई आधार मानेर राजस्व हिसाब गरिन्छ।'
                )}
              </li>
              <li>
                <strong>{t('25% Women Concession:', '२५% महिला छुट:')}</strong> {t(
                  'In metropolitan and municipal areas, properties registered under a woman’s sole ownership receive an immediate 25% discount on the deed registration fee (35% for single women).',
                  'महिलाको एकल नाममा पारित लिखत गर्दा रजिष्ट्रेसन दस्तुरमा २५% र एकल महिलाको हकमा ३५% छुट प्राप्त हुन्छ।'
                )}
              </li>
              <li>
                <strong>{t('10 Lakh CGT Exemption:', '१० लाख मुनि लाभकर छुट:')}</strong> {t(
                  'Under the Income Tax Act, transactions where the gross sale value is less than NPR 10 Lakhs are completely exempt from seller Capital Gains Tax.',
                  '१० लाख रुपैयाँ भन्दा कम मूल्यको जग्गा कारोबारमा विक्रेताले कुनै पनि पूँजीगत लाभकर बुझाउनु पर्दैन।'
                )}
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
