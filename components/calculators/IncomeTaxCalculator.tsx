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
  Layers
} from 'lucide-react';
import { TAX_CONFIGS, getActiveFiscalYear } from '@/lib/rates/taxRates';
import { DonutChart } from '@/components/DonutChart';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useLanguage } from '@/components/LanguageContext';

interface IncomeTaxCalculatorProps {
  initialMonthlySalary?: number;
  titleTag?: 'h1' | 'h2';
}

export function IncomeTaxCalculator({ initialMonthlySalary, titleTag = 'h1' }: IncomeTaxCalculatorProps = {}) {
  const { language, t } = useLanguage();
  const defaultFY = getActiveFiscalYear();
  const [fiscalYear, setFiscalYear] = useState<string>(defaultFY);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [inSsf, setInSsf] = useState<boolean>(true);
  const [isMonthlyInput, setIsMonthlyInput] = useState<boolean>(true);

  // Salary & Deductions
  const [salaryInput, setSalaryInput] = useState<number>(initialMonthlySalary ?? 85000);
  const [citEpf, setCitEpf] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(40000);
  const [healthInsurance, setHealthInsurance] = useState<number>(0);

  const [copied, setCopied] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);

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
    const slabBreakdown: { label: string; taxableInSlab: number; rate: number; taxAmount: number }[] = [];

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      if (remainingTaxable <= 0) break;

      const taxableInSlab = Math.min(remainingTaxable, slab.limit);
      
      // If enrolled in SSF, the 1% SST on first slab is waived!
      let effectiveRate = slab.rate;
      if (i === 0 && inSsf && currentConfig.ssfExemptsFirstSlabTax) {
        effectiveRate = 0;
      }

      const taxInSlab = taxableInSlab * effectiveRate;
      totalTax += taxInSlab;

      slabBreakdown.push({
        label: slab.label,
        taxableInSlab,
        rate: effectiveRate,
        taxAmount: taxInSlab,
      });

      remainingTaxable -= taxableInSlab;
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
            {t('Nepal Income Tax Calculator', 'नेपाल आयकर तथा तलब कर हिसाब')}
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
                {t('Individual / Unmarried', 'व्यक्तिगत / अविवाहित')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${isMarried ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px 10px', fontSize: '13px' }}
                onClick={() => setIsMarried(true)}
              >
                {t('Married (Couple / Joint)', 'दम्पती / विवाहित')}
              </button>
            </div>
          </div>

          {/* Salary Input */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ marginBottom: 0 }}>
                {isMonthlyInput ? t("Monthly Gross Salary (मासिक तलब)", "मासिक कुल तलब (Gross Salary)") : t("Annual Gross Income (वार्षिक आम्दानी)", "वार्षिक कुल आम्दानी (Annual Gross)")}
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

            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontWeight: 700, color: '#64748b' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input"
                style={{ paddingLeft: '36px', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={salaryInput}
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
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('Social Security Fund (SSF)', 'सामाजिक सुरक्षा कोष (SSF)')}
                </span>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('Exempts the 1% Social Security Tax on first income slab', 'पहिलो स्ल्याबमा लाग्ने १% सामाजिक सुरक्षा कर छुट हुन्छ')}
                </p>
              </div>
              <input
                type="checkbox"
                id="ssf-check"
                checked={inSsf}
                onChange={(e) => setInSsf(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('Female Tax Rebate (10%)', 'महिला कर छुट (१०%)')}
                </span>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('Applies to unmarried resident women employees', 'पारिश्रमिक आय आर्जन गर्ने अविवाहित महिलाका लागि १०% छुट')}
                </p>
              </div>
              <input
                type="checkbox"
                id="female-check"
                checked={isFemale}
                disabled={isMarried}
                onChange={(e) => setIsFemale(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Additional Deductions Accordion / Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {t('Tax Deductible Investments', 'कर कट्टी हुने लगानी तथा कोषहरू')}
            </span>

            <div>
              <label className="input-label" style={{ fontSize: '12px' }}>
                {t('Citizen Investment Trust (CIT) / EPF / Provident Fund', 'नागरिक लगानी कोष (CIT) / सञ्चय कोष (EPF)')}
              </label>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                value={citEpf || ''}
                onChange={(e) => setCitEpf(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">{t('Max allowable: 1/3 of salary or Rs 5,00,000', 'अधिकतम: तलबको १/३ वा रू. ५,००,००० सम्म')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '12px' }}>
                  {t('Life Insurance Premium', 'जीवन बिमा प्रिमियम')}
                </label>
                <input
                  type="number"
                  placeholder={t("Max 40,000", "अधिकतम ४०,०००")}
                  className="text-input"
                  value={lifeInsurance || ''}
                  onChange={(e) => setLifeInsurance(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">{t('Max Rs 40,000', 'अधिकतम रू. ४०,०००')}</span>
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '12px' }}>
                  {t('Health Insurance', 'स्वास्थ्य बिमा')}
                </label>
                <input
                  type="number"
                  placeholder={t("Max 20,000", "अधिकतम २०,०००")}
                  className="text-input"
                  value={healthInsurance || ''}
                  onChange={(e) => setHealthInsurance(Number(e.target.value) || 0)}
                />
                <span className="input-subtext">{t('Max Rs 20,000', 'अधिकतम रू. २०,०००')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Visual Breakdown Column */}
        <div>
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
                  {t('Net Monthly In-Hand (मासिक खुद तलब)', 'मासिक हात पर्ने खुद तलब (Net Take-Home)')}
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

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Income Slab', 'आम्दानी स्ल्याब')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Taxable in Bracket', 'कर लाग्ने रकम')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Tax Rate', 'कर दर')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', textAlign: 'right' }}>{t('Tax Payable', 'तिर्नुपर्ने कर')}</th>
              </tr>
            </thead>
            <tbody>
              {calculation.slabBreakdown.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{item.label}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>
                    रु {Math.round(item.taxableInSlab).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="badge badge-neutral">{(item.rate * 100).toFixed(0)}%</span>
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)', color: item.taxAmount > 0 ? '#e11d48' : '#64748b' }}>
                    रु {Math.round(item.taxAmount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 800, background: '#f8fafc', borderTop: '2px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px' }} colSpan={3}>{t('Total Annual Tax Payable', 'जम्मा वार्षिक तिर्नुपर्ने कर')}</td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#e11d48', fontSize: '15px' }}>
                  रु {Math.round(calculation.totalTax).toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
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
