'use client';

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Calendar,
  AlertTriangle,
  Copy,
  Check,
  Percent,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  DollarSign,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface SectorRate {
  id: string;
  name: string;
  nepaliName: string;
  rate: number;
  description: string;
  nepaliDescription: string;
}

export const CORPORATE_SECTORS: SectorRate[] = [
  {
    id: 'general',
    name: 'General Business / Trading & Services (25%)',
    nepaliName: 'व्यापार, सेवा तथा सामान्य कम्पनीहरू (२५%)',
    rate: 25,
    description: 'Private and public limited companies engaged in retail, wholesale, IT domestic, consulting, and trading.',
    nepaliDescription: 'व्यापार, आयात-निर्यात, परामर्श, र सामान्य सेवामूलक प्राइभेट तथा पब्लिक कम्पनीहरू।',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Special Industry (20%)',
    nepaliName: 'उत्पादनमूलक उद्योग (२०%)',
    rate: 20,
    description: 'Entities operating designated manufacturing industries under Section 11 of the Income Tax Act.',
    nepaliDescription: 'आयकर ऐनको दफा ११ अनुसार विशेष उत्पादनमूलक उद्योगका लागि तोकिएको सहुलियत दर।',
  },
  {
    id: 'bfi-liquor',
    name: 'Banks, Financial Institutions & Tobacco/Liquor (30%)',
    nepaliName: 'बैंक, वित्तीय संस्था, चुरोट तथा मदिरा (३०%)',
    rate: 30,
    description: 'Commercial banks, finance companies, insurance, alcohol, beer, and tobacco manufacturers.',
    nepaliDescription: 'वाणिज्य बैंक, वित्तीय संस्था, बिमा, चुरोट, बिडी तथा मदिराजन्य वस्तु उत्पादन गर्ने कम्पनीहरू।',
  },
  {
    id: 'it-export',
    name: 'IT / Software Service Export (12.5% — 50% Rebate)',
    nepaliName: 'सूचना प्रविधि तथा सफ्टवेयर निर्यात (१२.५%)',
    rate: 12.5,
    description: 'Entities generating foreign currency by exporting IT services, software development, BPO, and cloud services.',
    nepaliDescription: 'विदेशी मुद्रा आर्जन गरी सफ्टवेयर, क्लाउड तथा आइटी सेवा निर्यात गर्ने संस्था (५०% छुट)।',
  },
  {
    id: 'agriculture',
    name: 'Agro-processing & Tea/Dairy Cooperatives (15%)',
    nepaliName: 'कृषि प्रशोधन, चिया तथा दुग्ध सहकारी (१५%)',
    rate: 15,
    description: 'Special agro-based processing industries, commercial tea farming, and dairy cooperatives.',
    nepaliDescription: 'कृषिजन्य वस्तु प्रशोधन, व्यावसायिक चिया खेती तथा दुग्ध सहकारी संस्थाहरू।',
  },
];

export function CorporateTaxCalculator() {
  const { language, t } = useLanguage();

  const [selectedSectorId, setSelectedSectorId] = useState<string>('general');
  const [netAccountingProfit, setNetAccountingProfit] = useState<number>(3500000);
  const [nonAllowableExpenses, setNonAllowableExpenses] = useState<number>(250000); // Fines, personal expenses, entertainment
  const [taxDeductionsAllowable, setTaxDeductionsAllowable] = useState<number>(180000); // Tax depreciation diff, scientific research
  const [tdsReceivableAlreadyDeducted, setTdsReceivableAlreadyDeducted] = useState<number>(75000); // Withholding tax withheld by clients
  const [copied, setCopied] = useState<boolean>(false);

  const activeSector = useMemo(() => {
    return CORPORATE_SECTORS.find((s) => s.id === selectedSectorId) || CORPORATE_SECTORS[0];
  }, [selectedSectorId]);

  // Tax and Advance Tax Calculations under Section 94
  const calculation = useMemo(() => {
    const profitBeforeTax = Math.max(0, netAccountingProfit);
    const disallowable = Math.max(0, nonAllowableExpenses);
    const deductions = Math.max(0, taxDeductionsAllowable);

    // Assessable Business Income = Accounting Profit + Disallowable Expenses - Allowable Deductions
    const taxableIncome = Math.max(0, profitBeforeTax + disallowable - deductions);
    const taxRateDecimal = activeSector.rate / 100;
    const grossAnnualTax = taxableIncome * taxRateDecimal;

    // Net tax payable after adjusting client TDS certificates
    const netAnnualTaxPayable = Math.max(0, grossAnnualTax - tdsReceivableAlreadyDeducted);

    // Section 94 Advance Tax Instalments:
    // 1st Instalment: 40% of estimated annual tax by Poush End (पुस मसान्त)
    const inst1Poush = netAnnualTaxPayable * 0.40;
    // 2nd Instalment: 70% cumulative (i.e. 30% additional) by Chaitra End (चैत मसान्त)
    const inst2ChaitraCumulative = netAnnualTaxPayable * 0.70;
    const inst2ChaitraDelta = netAnnualTaxPayable * 0.30;
    // 3rd Instalment: 100% cumulative (i.e. 30% additional) by Ashadh End (असार मसान्त)
    const inst3AshadhDelta = netAnnualTaxPayable * 0.30;

    // Effective Tax Rate on Net Accounting Profit
    const effectiveAccountingRate = profitBeforeTax > 0 ? (grossAnnualTax / profitBeforeTax) * 100 : activeSector.rate;

    return {
      profitBeforeTax,
      disallowable,
      deductions,
      taxableIncome,
      grossAnnualTax,
      netAnnualTaxPayable,
      inst1Poush,
      inst2ChaitraCumulative,
      inst2ChaitraDelta,
      inst3AshadhDelta,
      effectiveAccountingRate,
    };
  }, [
    activeSector,
    netAccountingProfit,
    nonAllowableExpenses,
    taxDeductionsAllowable,
    tdsReceivableAlreadyDeducted,
  ]);

  const handleCopy = () => {
    const summary = `Nepal Corporate Income Tax & Advance Tax Schedule:
Sector: ${language === 'ne' ? activeSector.nepaliName : activeSector.name}
Taxable Net Income: रु ${Math.round(calculation.taxableIncome).toLocaleString('en-IN')}
Corporate Tax Rate: ${activeSector.rate}%
Gross Annual Tax: रु ${Math.round(calculation.grossAnnualTax).toLocaleString('en-IN')}
Less TDS Certificates: रु ${Math.round(tdsReceivableAlreadyDeducted).toLocaleString('en-IN')}
Net Annual Tax Payable: रु ${Math.round(calculation.netAnnualTaxPayable).toLocaleString('en-IN')}
Advance Tax Instalments (Section 94):
- 1st Instalment (Poush End - 40%): रु ${Math.round(calculation.inst1Poush).toLocaleString('en-IN')}
- 2nd Instalment (Chaitra End - 30%): रु ${Math.round(calculation.inst2ChaitraDelta).toLocaleString('en-IN')}
- 3rd Instalment (Ashadh End - 30%): रु ${Math.round(calculation.inst3AshadhDelta).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

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
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">
              {t('Nepal Corporate Tax & Section 94', 'नेपाल कम्पनी आयकर तथा दफा ९४')}
            </span>
            <span className="badge badge-neutral">
              {t('Advance Tax Instalments (किस्ताबन्दी)', 'अग्रिम कर किस्ताबन्दी तालिका')}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 800,
              marginTop: '10px',
              color: 'var(--text-primary)',
            }}
          >
            {t('Nepal Corporate Tax & Advance Tax Calculator', 'नेपाल कम्पनी आयकर तथा अग्रिम कर (किस्ताबन्दी) हिसाब')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {t(
              'Estimate corporate income tax for Pvt Ltd and firms with Section 94 advance tax instalments (Poush 40%, Chaitra 70%, Ashadh 100%).',
              'प्राइभेट लिमिटेड तथा फर्महरूको आयकर दर (२०%, २५%, ३०%) र दफा ९४ अनुसारको ३ किस्ता अग्रिम कर तालिका।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {t('Corporate Rate:', 'लागु कर दर:')}
          </span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#003893',
              background: '#eff6ff',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {activeSector.rate}%
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div>
          {/* Sector Selector */}
          <div style={{ marginBottom: '22px' }}>
            <label className="input-label">
              {t('Business Sector & Industry Type (व्यवसायको प्रकृति)', 'कम्पनीको क्षेत्र तथा प्रकृति')}
            </label>
            <select
              className="select-input"
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 600 }}
            >
              {CORPORATE_SECTORS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.rate}% — {language === 'ne' ? s.nepaliName : s.name}
                </option>
              ))}
            </select>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
              {language === 'ne' ? activeSector.nepaliDescription : activeSector.description}
            </p>
          </div>

          {/* Net Accounting Profit Input */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {t('Net Accounting Profit Before Tax (कर अघिको खुद नाफा)', 'कर अघिको खुद नाफा (Net Profit Before Tax)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontWeight: 700, color: '#64748b' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input"
                style={{ paddingLeft: '38px', fontSize: '17px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={netAccountingProfit || ''}
                onChange={(e) => setNetAccountingProfit(Number(e.target.value) || 0)}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', color: '#8c7b66', fontWeight: 600 }}>{t('Quick:', 'छिटो:')}</span>
              {[1000000, 2500000, 5000000, 10000000, 25000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="calc-preset-chip"
                  onClick={() => setNetAccountingProfit(amt)}
                >
                  रु {amt >= 10000000 ? `${amt / 10000000} Crore` : `${amt / 100000} Lakh`}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Adjustments Card */}
          <div
            style={{
              background: '#f8fafc',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
              {t('Income Tax Adjustments (कर समायोजनहरू)', 'कर समायोजनहरू (Tax Add-Backs & Deductions)')}
            </span>

            {/* Inadmissible Expenses */}
            <div style={{ marginBottom: '12px' }}>
              <label className="input-label" style={{ fontSize: '12px' }}>
                {t('Add: Disallowable / Inadmissible Expenses (अस्वीकृत खर्च)', 'थप: अस्वीकृत खर्चहरू (Non-allowable expenses)')}
              </label>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                value={nonAllowableExpenses || ''}
                onChange={(e) => setNonAllowableExpenses(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">
                {t('Fines, penalties, personal expenses, unapproved donations, excess entertainment', 'जरिवाना, व्यक्तिगत खर्च, ७% भन्दा बढी मर्मत, अस्वीकृत चन्दा')}
              </span>
            </div>

            {/* Allowable Deductions */}
            <div>
              <label className="input-label" style={{ fontSize: '12px' }}>
                {t('Less: Allowable Deductions / Tax Depreciation (स्वीकृत छुट)', 'घटाउने: स्वीकृत छुट तथा कर ह्रासकट्टी')}
              </label>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                value={taxDeductionsAllowable || ''}
                onChange={(e) => setTaxDeductionsAllowable(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">
                {t('Schedule 2 tax depreciation difference, allowable scientific research', 'लेखा ह्रासकट्टी र कर ह्रासकट्टीको फरक, अनुसन्धान खर्च')}
              </span>
            </div>
          </div>

          {/* Withheld TDS Credit */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {t('Less: Advance TDS Withheld by Clients (कट्टी भइसकेको TDS)', 'घटाउने: पार्टीहरूले कट्टी गरेको TDS प्रमाण (TDS Credit)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontWeight: 700, color: '#64748b' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input"
                style={{ paddingLeft: '38px', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}
                value={tdsReceivableAlreadyDeducted || ''}
                onChange={(e) => setTdsReceivableAlreadyDeducted(Number(e.target.value) || 0)}
              />
            </div>
            <span className="input-subtext">
              {t('Withholding tax already deposited by clients under PAN / e-TDS', 'ग्राहकहरूले बिल भुक्तानी गर्दा कट्टी गरेको स्रोतमा कर (TDS)')}
            </span>
          </div>
        </div>

        {/* Results & Instalments Column */}
        <div>
          {/* Main Corporate Tax Highlight Card */}
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
                  {t('Net Annual Tax Payable to IRD (तिर्नुपर्ने खुद आयकर)', 'तिर्नुपर्ने कुल आयकर दायित्व')}
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#f59e0b', margin: '6px 0 2px', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.netAnnualTaxPayable).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  {t('Taxable Income: Rs.', 'करयोग्य खुद आम्दानी: रू.')} {Math.round(calculation.taxableIncome).toLocaleString('en-IN')} ({activeSector.rate}%)
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
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                  {t('GROSS ANNUAL TAX', 'कुल वार्षिक कर')}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.grossAnnualTax).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{activeSector.rate}% Statutory Rate</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                  {t('TDS CREDIT ADJUSTED', 'समायोजित TDS रकम')}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(tdsReceivableAlreadyDeducted).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{t('Advance Tax Credit', 'पहिले नै कट्टी भएको')}</span>
              </div>
            </div>
          </div>

          {/* Section 94 Advance Tax Instalment Schedule */}
          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#003893" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  {t('Section 94 Advance Tax Schedule (किस्ताबन्दी तालिका)', 'दफा ९४ अग्रिम कर किस्ताबन्दी तालिका')}
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>
                3 Instalments
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Instalment 1: Poush End (40%) */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#003893' }}>
                      {t('1st Instalment: Poush End (पुस मसान्त)', 'पहिलो किस्ता: पुस मसान्त (४०%)')}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>(Mid-January)</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                    {t('Cumulative 40% of estimated annual tax', 'कुल अनुमानित करको ४० प्रतिशत')}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    रु {Math.round(calculation.inst1Poush).toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>40% Due</span>
                </div>
              </div>

              {/* Instalment 2: Chaitra End (Cumulative 70% -> 30% Delta) */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#003893' }}>
                      {t('2nd Instalment: Chaitra End (चैत मसान्त)', 'दोस्रो किस्ता: चैत मसान्त (३०%)')}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>(Mid-April)</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                    {t('Additional 30% (Cumulative 70%)', 'थप ३० प्रतिशत (कुल ७०% सम्म)')}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    रु {Math.round(calculation.inst2ChaitraDelta).toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb' }}>30% Due</span>
                </div>
              </div>

              {/* Instalment 3: Ashadh End (Remaining 30% -> 100% Cumulative) */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#003893' }}>
                      {t('3rd Instalment: Ashadh End (असार मसान्त)', 'तेस्रो किस्ता: असार मसान्त (३०%)')}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>(Mid-July)</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                    {t('Final 30% (Reaching 100% of tax liability)', 'अन्तिम ३० प्रतिशत (कुल १००%)')}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    रु {Math.round(calculation.inst3AshadhDelta).toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>30% Due</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 118 Interest Warning Alert */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <ShieldCheck size={18} color="#003893" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: '#1e3a8a', lineHeight: 1.5 }}>
              <strong>{t('Section 118 80% Threshold Rule:', 'दफा ११८ को ८०% नियम:')}</strong>
              <br />
              {t(
                'If the advance tax paid by the deadline is less than 80% of the actual final assessed tax, interest at 15% p.a. is levied on the underpaid portion.',
                'यदि बुझाएको अग्रिम कर वास्तविक निर्धारण हुने करको ८०% भन्दा कम भएमा फरक रकममा वार्षिक १५% का दरले ब्याज जरिवाना लाग्दछ।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
