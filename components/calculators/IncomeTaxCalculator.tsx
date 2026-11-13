'use client';

import React, { useState, useMemo } from 'react';
import { 
  ReceiptText, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';
import { TAX_CONFIGS, getActiveFiscalYear } from '@/lib/rates/taxRates';
import { DonutChart } from '@/components/DonutChart';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useLanguage } from '@/components/LanguageContext';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

interface IncomeTaxCalculatorProps {
  initialMonthlySalary?: number;
  titleTag?: 'h1' | 'h2';
  customTitle?: string;
}

export function IncomeTaxCalculator({ initialMonthlySalary, titleTag = 'h1', customTitle }: IncomeTaxCalculatorProps = {}) {
  const { language, t } = useLanguage();
  const defaultFY = getActiveFiscalYear();
  const [fiscalYear, setFiscalYear] = useState<string>(defaultFY);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [inSsf, setInSsf] = useState<boolean>(false);
  const [isMonthlyInput, setIsMonthlyInput] = useState<boolean>(true);

  // Salary & Deductions (default 0 deductions so standard slab rates apply cleanly out of the box)
  const [salaryInput, setSalaryInput] = useState<number>(initialMonthlySalary ?? 100000);
  const [citEpf, setCitEpf] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(0);
  const [healthInsurance, setHealthInsurance] = useState<number>(0);

  const [copied, setCopied] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);
  const [showSsfInfo, setShowSsfInfo] = useState<boolean>(false);
  const [showFemaleInfo, setShowFemaleInfo] = useState<boolean>(false);
  const [isDeductionsOpen, setIsDeductionsOpen] = useState<boolean>(false);
  const [showCitInfo, setShowCitInfo] = useState<boolean>(false);
  const [showLifeInfo, setShowLifeInfo] = useState<boolean>(false);
  const [showHealthInfo, setShowHealthInfo] = useState<boolean>(false);

  const currentConfig = TAX_CONFIGS[fiscalYear] || TAX_CONFIGS["2083/84"];

  // Calculation Logic
  const calculation = useMemo(() => {
    const annualGross = isMonthlyInput ? salaryInput * 12 : salaryInput;

    // SSF 11% employee contribution if in SSF
    const ssfContribution = inSsf ? (annualGross * 0.11) : 0;

    // Allowable deductions
    const maxCitEpfAllowed = Math.min(annualGross / 3, currentConfig.maxCitEpfDeduction);
    const actualCitEpfDeduction = Math.min(citEpf, maxCitEpfAllowed);
    const actualLifeInsuranceDeduction = Math.min(lifeInsurance, currentConfig.maxLifeInsuranceDeduction);
    const actualHealthInsuranceDeduction = Math.min(healthInsurance, currentConfig.maxHealthInsuranceDeduction);

    const totalDeductions = actualCitEpfDeduction + actualLifeInsuranceDeduction + actualHealthInsuranceDeduction + ssfContribution;
    const taxableIncome = Math.max(0, annualGross - totalDeductions);

    const slabs = isMarried ? currentConfig.marriedSlabs : currentConfig.unmarriedSlabs;

    let remainingTaxable = taxableIncome;
    let totalTax = 0;
    const slabBreakdown: {
      label: string;
      taxableInSlab: number;
      rate: number;
      maxTaxInBand: number | null;
      taxAmount: number;
    }[] = [];

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      const taxableInSlab = remainingTaxable > 0 ? Math.min(remainingTaxable, slab.limit) : 0;

      // Standard rate is 1% on first 10,00,000 (Rs 10,000 max); 0% only if user explicitly enables SSF
      let effectiveRate = slab.rate;
      if (i === 0 && inSsf && currentConfig.ssfExemptsFirstSlabTax) {
        effectiveRate = 0;
      }

      const maxTaxInBand = Number.isFinite(slab.limit) ? slab.limit * effectiveRate : null;
      const taxInSlab = taxableInSlab * effectiveRate;
      totalTax += taxInSlab;

      slabBreakdown.push({
        label: slab.label,
        taxableInSlab,
        rate: effectiveRate,
        maxTaxInBand,
        taxAmount: taxInSlab,
      });

      remainingTaxable = Math.max(0, remainingTaxable - taxableInSlab);
    }

    // Female individual tax rebate (10% rebate on total tax)
    let femaleRebateAmount = 0;
    if (isFemale && !isMarried) {
      femaleRebateAmount = totalTax * currentConfig.femaleTaxRebate;
      totalTax = Math.max(0, totalTax - femaleRebateAmount);
    }

    const netAnnualTakeHome = annualGross - totalTax - ssfContribution;
    const netMonthlyTakeHome = netAnnualTakeHome / 12;
    const monthlyTax = totalTax / 12;

    return {
      annualGross,
      monthlyGross: annualGross / 12,
      ssfContribution,
      actualCitEpfDeduction,
      actualLifeInsuranceDeduction,
      actualHealthInsuranceDeduction,
      totalDeductions,
      taxableIncome,
      totalTax,
      monthlyTax,
      femaleRebateAmount,
      netAnnualTakeHome,
      netMonthlyTakeHome,
      slabBreakdown,
    };
  }, [
    salaryInput,
    isMonthlyInput,
    isMarried,
    isFemale,
    inSsf,
    citEpf,
    lifeInsurance,
    healthInsurance,
    currentConfig,
  ]);

  const handleCopy = () => {
    const text = `Nepal Income Tax Calculation (${fiscalYear}):
Monthly Salary: रु ${Math.round(calculation.monthlyGross).toLocaleString('en-IN')}
Annual Gross: रु ${Math.round(calculation.annualGross).toLocaleString('en-IN')}
Total Annual Tax: रु ${Math.round(calculation.totalTax).toLocaleString('en-IN')}
Monthly Tax: रु ${Math.round(calculation.monthlyTax).toLocaleString('en-IN')}
Net In-Hand Monthly: रु ${Math.round(calculation.netMonthlyTakeHome).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartSegments = [
    { label: "Net Take-Home", value: calculation.netAnnualTakeHome, color: "#059669" },
    { label: "Income Tax", value: calculation.totalTax, color: "#e11d48" },
    { label: "SSF Contribution", value: calculation.ssfContribution, color: "#2563eb" },
    { label: "Other Deductions", value: calculation.actualCitEpfDeduction + calculation.actualLifeInsuranceDeduction, color: "#d97706" },
  ];

  const TitleHeading = titleTag;

  return (
    <div 
      className="white-card" 
      style={{ 
        maxWidth: '100%', 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 0 clamp(24px, 3.5vw, 40px) 0', 
        border: 'none',
        boxShadow: 'none',
        background: 'transparent',
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('Nepal Finance Act Compliant', 'नेपाल आर्थिक ऐन बमोजिम')}</span>
            <span className="badge badge-neutral">{t('Auto Slab Calculator', 'स्ल्याब अनुसार स्वतः हिसाब')}</span>
          </div>
          <TitleHeading style={{ fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)' }}>
            {customTitle || t('Nepal Income Tax Calculator', 'नेपाल आयकर तथा तलब कर हिसाब')}
          </TitleHeading>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {t(
              'Calculate individual and married salary taxes with SSF, CIT, EPF, and insurance deductions.',
              'अविवाहित तथा दम्पतीको तलबमा लाग्ने आयकर, सामाजिक सुरक्षा कोष (SSF), नागरिक लगानी कोष (CIT), सञ्चय कोष र बिमा छुटको विस्तृत हिसाब।'
            )}
          </p>
        </div>

        {/* Fiscal Year Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>{t('Fiscal Year:', 'आर्थिक वर्ष:')}</span>
          <select
            className="select-input"
            style={{ width: 'auto', padding: '8px 14px', fontSize: '13.5px', fontWeight: 600, borderRadius: '8px' }}
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
          >
            {Object.keys(TAX_CONFIGS).map((fy) => (
              <option key={fy} value={fy}>
                {TAX_CONFIGS[fy].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div>
          {/* Mobile-only instant above-the-fold result */}
          <MobileInstantResult
            primaryLabel={t('Net Monthly In-Hand', 'मासिक हात पर्ने खुद तलब')}
            primaryValue={`रु ${Math.round(calculation.netMonthlyTakeHome).toLocaleString('en-IN')}`}
            primarySubtext={`${t('Annual In-Hand: Rs.', 'वार्षिक खुद: रू.')} ${Math.round(calculation.netAnnualTakeHome).toLocaleString('en-IN')}`}
            secondaryLabel={t('Monthly Tax', 'मासिक कर')}
            secondaryValue={`रु ${Math.round(calculation.monthlyTax).toLocaleString('en-IN')}`}
            tertiaryLabel={t('Effective', 'औसत')}
            tertiaryValue={`${calculation.annualGross > 0 ? ((calculation.totalTax / calculation.annualGross) * 100).toFixed(1) : '0'}%`}
            badge={TAX_CONFIGS[fiscalYear]?.label || fiscalYear}
            accentColor="emerald"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="tax-breakdown-details"
          />

          {/* Marital Status & Gender */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Tax Assessment Category', 'कर निर्धारण वर्ग')}</label>
            <div className="segmented-control" style={{ width: '100%', padding: '4px', display: 'flex' }}>
              <button
                type="button"
                className={`segmented-btn ${!isMarried ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 10px', fontSize: '13px' }}
                onClick={() => setIsMarried(false)}
              >
                {t('Individual', 'व्यक्तिगत')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${isMarried ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 10px', fontSize: '13px' }}
                onClick={() => setIsMarried(true)}
              >
                {t('Married', 'विवाहित')}
              </button>
            </div>
          </div>

          {/* Salary Input */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ marginBottom: 0 }}>
                {isMonthlyInput ? t("Monthly Gross Salary", "मासिक कुल तलब") : t("Annual Gross Income", "वार्षिक कुल आम्दानी")}
              </label>
              <div className="segmented-control">
                <button
                  type="button"
                  className={`segmented-btn ${isMonthlyInput ? 'active' : ''}`}
                  onClick={() => {
                    if (!isMonthlyInput) setSalaryInput(Math.round(salaryInput / 12));
                    setIsMonthlyInput(true);
                  }}
                >
                  {t('Monthly', 'मासिक')}
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${!isMonthlyInput ? 'active' : ''}`}
                  onClick={() => {
                    if (isMonthlyInput) setSalaryInput(salaryInput * 12);
                    setIsMonthlyInput(false);
                  }}
                >
                  {t('Yearly', 'वार्षिक')}
                </button>
              </div>
            </div>

            <div className="input-with-prefix-wrap" style={{ position: 'relative' }}>
              <span className="prefix-symbol" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', pointerEvents: 'none' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input input-with-prefix"
                style={{ paddingLeft: '42px', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={salaryInput || ''}
                placeholder="0"
                onChange={(e) => setSalaryInput(Number(e.target.value) || 0)}
              />
            </div>

            {/* Slider */}
            <input
              type="range"
              className="range-slider"
              min={15000}
              max={isMonthlyInput ? 600000 : 7200000}
              step={isMonthlyInput ? 5000 : 50000}
              value={salaryInput}
              onChange={(e) => setSalaryInput(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              <span>{isMonthlyInput ? "रु 15,000" : "रु 1.8 Lakhs"}</span>
              <span>{isMonthlyInput ? "रु 6,00,000+" : "रु 72 Lakhs+"}</span>
            </div>

            {/* Tactile Neumorphic Preset Salary Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', color: '#8c7b66', fontWeight: 600 }}>{t('Quick:', 'छिटो छनौट:')}</span>
              {[50000, 85000, 120000, 200000, 350000].map((amt) => {
                const targetValue = isMonthlyInput ? amt : amt * 12;
                const label = isMonthlyInput
                  ? `${amt >= 100000 ? (amt / 100000).toFixed(1) + ' Lakh' : amt / 1000 + 'k'}`
                  : `${(amt * 12 / 100000).toFixed(1)} Lakh/yr`;
                return (
                  <button
                    key={amt}
                    type="button"
                    className="calc-preset-chip"
                    onClick={() => setSalaryInput(targetValue)}
                  >
                    रु {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SSF & Deductions */}
          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '18px' }}>
            {/* SSF Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label htmlFor="ssf-check" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', margin: 0 }}>
                  {t('Social Security Fund (SSF)', 'सामाजिक सुरक्षा कोष (SSF)')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowSsfInfo(!showSsfInfo)}
                  aria-label="SSF details"
                  title={t('Click to learn about SSF tax waiver', 'थप विवरण हेर्नुहोस्')}
                  style={{
                    background: showSsfInfo ? '#dbeafe' : 'transparent',
                    border: 'none',
                    padding: '2px',
                    borderRadius: '50%',
                    color: showSsfInfo ? '#2563eb' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HelpCircle size={14} />
                </button>
              </div>
              <input
                type="checkbox"
                id="ssf-check"
                checked={inSsf}
                onChange={(e) => setInSsf(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>
            {showSsfInfo && (
              <div style={{ fontSize: '11.5px', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: '6px', margin: '4px 0 6px', borderLeft: '3px solid #2563eb' }}>
                {t('Exempts the 1% Social Security Tax on first income slab', 'पहिलो स्ल्याबमा लाग्ने १% सामाजिक सुरक्षा कर छुट हुन्छ')}
              </div>
            )}

            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

            {/* Female Tax Rebate Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label htmlFor="female-check" style={{ fontSize: '13px', fontWeight: 700, color: isMarried ? '#94a3b8' : 'var(--text-primary)', cursor: isMarried ? 'not-allowed' : 'pointer', margin: 0 }}>
                  {t('Female Tax Rebate (10%)', 'महिला कर छुट (१०%)')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowFemaleInfo(!showFemaleInfo)}
                  aria-label="Female rebate details"
                  title={t('Click to learn about female tax rebate', 'थप विवरण हेर्नुहोस्')}
                  style={{
                    background: showFemaleInfo ? '#dbeafe' : 'transparent',
                    border: 'none',
                    padding: '2px',
                    borderRadius: '50%',
                    color: showFemaleInfo ? '#2563eb' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HelpCircle size={14} />
                </button>
              </div>
              <input
                type="checkbox"
                id="female-check"
                checked={isFemale}
                disabled={isMarried}
                onChange={(e) => setIsFemale(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: isMarried ? 'not-allowed' : 'pointer', accentColor: '#2563eb' }}
              />
            </div>
            {showFemaleInfo && (
              <div style={{ fontSize: '11.5px', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: '6px', margin: '4px 0 2px', borderLeft: '3px solid #2563eb' }}>
                {t('Applies to unmarried resident women employees', 'पारिश्रमिक आय आर्जन गर्ने अविवाहित महिलाका लागि १०% छुट')}
              </div>
            )}
          </div>

          {/* Tax Deductible Investments Accordion */}
          <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginTop: '4px' }}>
            <button
              type="button"
              onClick={() => setIsDeductionsOpen(!isDeductionsOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('Tax Deductible Investments (CIT, Insurance)', 'कर कट्टी हुने लगानी तथा बिमा')}
                </span>
                {(citEpf > 0 || lifeInsurance > 0 || healthInsurance > 0) ? (
                  <span className="badge badge-emerald" style={{ fontSize: '10.5px', padding: '2px 7px' }}>
                    रु {(citEpf + lifeInsurance + healthInsurance).toLocaleString('en-IN')} {t('Deductions', 'कट्टी')}
                  </span>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {t('(Optional • Max Rs 5.6L)', '(ऐच्छिक • अधिकतम रू ५.६ लाख)')}
                  </span>
                )}
              </div>
              <ChevronDown
                size={16}
                color="#64748b"
                style={{
                  transform: (isDeductionsOpen || citEpf > 0 || lifeInsurance > 0 || healthInsurance > 0) ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0
                }}
              />
            </button>

            {(isDeductionsOpen || citEpf > 0 || lifeInsurance > 0 || healthInsurance > 0) && (
              <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                {/* CIT / EPF */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <label className="input-label" style={{ fontSize: '12px', marginBottom: 0, fontWeight: 700 }}>
                        {t('Citizen Investment Trust (CIT) / EPF', 'नागरिक लगानी कोष (CIT) / सञ्चय कोष (EPF)')}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCitInfo(!showCitInfo)}
                        aria-label="CIT info"
                        title={t('Click to learn about CIT/EPF limit', 'थप विवरण')}
                        style={{ background: 'transparent', border: 'none', padding: '2px', color: showCitInfo ? '#2563eb' : '#94a3b8', cursor: 'pointer', display: 'flex' }}
                      >
                        <HelpCircle size={13} />
                      </button>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                      {t('Max: 1/3 salary or Rs 5L', 'अधिकतम: १/३ वा रू ५ लाख')}
                    </span>
                  </div>

                  {showCitInfo && (
                    <div style={{ fontSize: '11px', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: '6px', marginBottom: '6px', borderLeft: '3px solid #2563eb' }}>
                      {t('Contributions to approved retirement funds (CIT, EPF) are deductible up to 1/3 of total salary or Rs. 5,00,000 per year, whichever is lower.', 'स्वीकृत अवकाश कोष (CIT, सञ्चय कोष) मा गरिएको जम्मा रकम कुल तलबको १/३ वा रू. ५,००,००० मध्ये जुन कम हुन्छ, सो बराबर कर कट्टी हुन्छ।')}
                    </div>
                  )}

                  <div className="input-with-prefix-wrap" style={{ position: 'relative' }}>
                    <span className="prefix-symbol" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', pointerEvents: 'none', fontSize: '13px' }}>
                      रु
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      className="text-input input-with-prefix"
                      style={{ paddingLeft: '36px', height: '38px', fontSize: '14px' }}
                      value={citEpf || ''}
                      onChange={(e) => setCitEpf(Number(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Insurance: 2 Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {/* Life Insurance */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <label className="input-label" style={{ fontSize: '12px', marginBottom: 0, fontWeight: 700 }}>
                          {t('Life Insurance', 'जीवन बिमा')}
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowLifeInfo(!showLifeInfo)}
                          aria-label="Life insurance info"
                          title={t('Click to learn about Life Insurance exemption', 'थप विवरण')}
                          style={{ background: 'transparent', border: 'none', padding: '2px', color: showLifeInfo ? '#2563eb' : '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        >
                          <HelpCircle size={13} />
                        </button>
                      </div>
                      <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                        {t('Max 40k', 'अधिकतम ४० हजार')}
                      </span>
                    </div>

                    {showLifeInfo && (
                      <div style={{ fontSize: '11px', color: '#1e40af', background: '#eff6ff', padding: '5px 8px', borderRadius: '6px', marginBottom: '6px', borderLeft: '3px solid #2563eb' }}>
                        {t('Life insurance premium is deductible up to Rs. 40,000 per year.', 'जीवन बिमा प्रिमियम वापत वार्षिक अधिकतम रू. ४०,००० सम्म कर छुट पाइन्छ।')}
                      </div>
                    )}

                    <div className="input-with-prefix-wrap" style={{ position: 'relative' }}>
                      <span className="prefix-symbol" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', pointerEvents: 'none', fontSize: '13px' }}>
                        रु
                      </span>
                      <input
                        type="number"
                        placeholder="0"
                        className="text-input input-with-prefix"
                        style={{ paddingLeft: '36px', height: '38px', fontSize: '14px' }}
                        value={lifeInsurance || ''}
                        onChange={(e) => setLifeInsurance(Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Health Insurance */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <label className="input-label" style={{ fontSize: '12px', marginBottom: 0, fontWeight: 700 }}>
                          {t('Health Insurance', 'स्वास्थ्य बिमा')}
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowHealthInfo(!showHealthInfo)}
                          aria-label="Health insurance info"
                          title={t('Click to learn about Health Insurance exemption', 'थप विवरण')}
                          style={{ background: 'transparent', border: 'none', padding: '2px', color: showHealthInfo ? '#2563eb' : '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        >
                          <HelpCircle size={13} />
                        </button>
                      </div>
                      <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                        {t('Max 20k', 'अधिकतम २० हजार')}
                      </span>
                    </div>

                    {showHealthInfo && (
                      <div style={{ fontSize: '11px', color: '#1e40af', background: '#eff6ff', padding: '5px 8px', borderRadius: '6px', marginBottom: '6px', borderLeft: '3px solid #2563eb' }}>
                        {t('Health insurance premium is deductible up to Rs. 20,000 per year.', 'स्वास्थ्य बिमा प्रिमियम वापत वार्षिक अधिकतम रू. २०,००० सम्म कर छुट पाइन्छ।')}
                      </div>
                    )}

                    <div className="input-with-prefix-wrap" style={{ position: 'relative' }}>
                      <span className="prefix-symbol" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', pointerEvents: 'none', fontSize: '13px' }}>
                        रु
                      </span>
                      <input
                        type="number"
                        placeholder="0"
                        className="text-input input-with-prefix"
                        style={{ paddingLeft: '36px', height: '38px', fontSize: '14px' }}
                        value={healthInsurance || ''}
                        onChange={(e) => setHealthInsurance(Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results & Visual Breakdown Column */}
        <div id="tax-breakdown-details">
          {/* Main Net In-Hand Highlight */}
          <div
            className="result-card-highlight"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              padding: '28px 26px',
              borderRadius: '16px',
              boxShadow: '0 14px 35px -4px rgba(15, 23, 42, 0.25)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
                  {t('Net Monthly In-Hand', 'मासिक हात पर्ने खुद तलब')}
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#34d399', margin: '6px 0 2px', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.netMonthlyTakeHome).toLocaleString('en-IN')}
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8' }}> / {t('mo', 'महिना')}</span>
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  {t('Annual In-Hand: Rs.', 'वार्षिक खुद तलब: रू.')} {Math.round(calculation.netAnnualTakeHome).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {copied ? <Check size={14} color="#60a5fa" /> : <Copy size={14} />}
                <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy', 'कपी')}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{t('MONTHLY TAX', 'मासिक कर')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.monthlyTax).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{t('Annual: Rs.', 'वार्षिक: रू.')} {Math.round(calculation.totalTax).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{t('MONTHLY SSF (11%)', 'मासिक SSF (११%)')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.ssfContribution / 12).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{t('Annual: Rs.', 'वार्षिक: रू.')} {Math.round(calculation.ssfContribution).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Visualization */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', display: 'block', textAlign: 'center', marginBottom: '12px' }}>
              {t('Annual Salary Distribution', 'वार्षिक तलब बाँडफाँड')}
            </span>
            <DonutChart
              segments={chartSegments}
              totalLabel={t('Gross Salary', 'कुल तलब')}
              totalValue={`रु ${Math.round(calculation.annualGross).toLocaleString('en-IN')}`}
            />
          </div>

          {/* High-Ticket Lead Gen Card: Insurance Tax Saver */}
          <div className="lead-box">
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                {t('Tax Saving Opportunity', 'कर बचत अवसर')}
              </span>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                {t('Save up to Rs 12,000 more tax this year', 'यस वर्ष थप रू. १२,००० सम्म कर बचत गर्नुहोस्')}
              </p>
              <p style={{ fontSize: '11px', color: '#64748b' }}>
                {t(
                  'Claim maximum Life & Health insurance rebates allowed by IRD.',
                  'आन्तरिक राजस्व विभागले तोके बमोजिम बिमा छुटको अधिकतम फाइदा लिनुहोस्।'
                )}
              </p>
            </div>
            <button
              onClick={() => setShowLeadModal(true)}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              {t('Get Free Advice', 'सल्लाह लिनुहोस्')}
            </button>
          </div>
        </div>
      </div>

      {/* Tax Slab Breakdown Table */}
      <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} />
          <span>{t('Tax Slabs Breakdown', 'कर स्ल्याब विवरण')} ({fiscalYear})</span>
        </h4>

        {/* Desktop Table View */}
        <div className="desktop-only-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{t('Annual Taxable Income (Rs.)', 'वार्षिक करयोग्य आम्दानी (रू.)')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{t('Tax Rate', 'कर दर')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{t('Maximum Tax in Band', 'यस स्ल्याबको अधिकतम कर')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{t('Your Taxable in Bracket', 'तपाईंको कर लाग्ने रकम')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', textAlign: 'right', whiteSpace: 'nowrap' }}>{t('Your Tax Payable', 'तपाईंले तिर्नुपर्ने कर')}</th>
              </tr>
            </thead>
            <tbody>
              {calculation.slabBreakdown.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', opacity: item.taxableInSlab > 0 ? 1 : 0.72 }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.label}</td>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                    <span className="badge badge-neutral">{(item.rate * 100).toFixed(0)}%</span>
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: '#475569', whiteSpace: 'nowrap' }}>
                    {item.maxTaxInBand !== null ? `रु ${Math.round(item.maxTaxInBand).toLocaleString('en-IN')}` : t('No upper limit', 'सीमा छैन')}
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    रु {Math.round(item.taxableInSlab).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)', color: item.taxAmount > 0 ? '#e11d48' : '#64748b', whiteSpace: 'nowrap' }}>
                    रु {Math.round(item.taxAmount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 800, background: '#f8fafc', borderTop: '2px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }} colSpan={4}>{t('Total Annual Tax Payable', 'जम्मा वार्षिक तिर्नुपर्ने कर')}</td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#e11d48', fontSize: '15px', whiteSpace: 'nowrap' }}>
                  रु {Math.round(calculation.totalTax).toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Slab Cards View (Native Thumb-Friendly Layout) */}
        <div className="mobile-only-slabs">
          {calculation.slabBreakdown.map((item, idx) => {
            const isActive = item.taxableInSlab > 0;
            return (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: isActive ? '#f0fdf4' : '#f8fafc',
                  border: isActive ? '1.5px solid #86efac' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {/* Top Row: Rate Badge + Slab Label + Tax Payable */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        background: isActive ? '#dcfce7' : '#e2e8f0',
                        color: isActive ? '#15803d' : '#475569',
                      }}
                    >
                      {(item.rate * 100).toFixed(0)}%
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        color: item.taxAmount > 0 ? '#e11d48' : '#64748b',
                      }}
                    >
                      रु {Math.round(item.taxAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Sub Row: Your Taxable in this slab vs Max Slab Cap */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#64748b',
                    paddingTop: '6px',
                    borderTop: '1px dashed rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span>
                    {t('Your Taxable:', 'कर लाग्ने:')}{' '}
                    <strong style={{ color: isActive ? '#15803d' : '#334155' }}>
                      रु {Math.round(item.taxableInSlab).toLocaleString('en-IN')}
                    </strong>
                  </span>
                  <span>
                    {t('Max Band Tax:', 'अधिकतम कर:')}{' '}
                    {item.maxTaxInBand !== null
                      ? `रु ${Math.round(item.maxTaxInBand).toLocaleString('en-IN')}`
                      : t('No limit', 'सीमा छैन')}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Mobile Total Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: '12px',
              background: '#0f172a',
              color: '#ffffff',
              marginTop: '4px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700 }}>
              {t('Total Annual Tax', 'जम्मा वार्षिक कर')}
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#34d399',
                fontFamily: 'var(--font-mono)',
              }}
            >
              रु {Math.round(calculation.totalTax).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        leadType="insurance"
        title="Maximize Your Nepal Tax Deductions"
        subtitle="Connect with certified insurance and tax advisors to legally minimize your taxable income."
        referenceData={`Salary: ${salaryInput}, Tax: ${calculation.totalTax}`}
      />
    </div>
  );
}
