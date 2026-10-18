'use client';

import React, { useState, useMemo } from 'react';
import {
  Receipt,
  FileCheck2,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Printer,
  Info,
  Building2,
  Percent,
  ArrowRightLeft,
  ShieldCheck,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface TdsCategory {
  id: string;
  name: string;
  nepaliName: string;
  section: string;
  rate: number;
  description: string;
  nepaliDescription: string;
  deductOnVat: boolean; // TDS is applied on gross excluding VAT
  isFinalWithholding?: boolean;
}

export const TDS_CATEGORIES: TdsCategory[] = [
  {
    id: 'service-vat',
    name: 'Consultancy / Professional Service (VAT Bill)',
    nepaliName: 'परामर्श तथा प्राविधिक सेवा (भ्याट बिल भएको)',
    section: 'Section 88(1)',
    rate: 1.5,
    description: 'Services provided by a VAT-registered business or resident firm with tax invoice.',
    nepaliDescription: 'भ्याटमा दर्ता भएको संस्था वा व्यक्तिले जारी गरेको कर बीजक अनुसारको सेवा शुल्क।',
    deductOnVat: false,
  },
  {
    id: 'service-non-vat',
    name: 'Consultancy / Service by Individual (PAN / No VAT)',
    nepaliName: 'व्यक्तिगत परामर्श सेवा (प्यान मात्र भएको वा भ्याट नभएको)',
    section: 'Section 88(1)',
    rate: 15.0,
    description: 'Services provided by resident natural persons not registered in VAT.',
    nepaliDescription: 'भ्याटमा दर्ता नभएका प्राकृतिक व्यक्तिले प्रदान गरेको परामर्श वा सेवा शुल्क।',
    deductOnVat: false,
  },
  {
    id: 'house-rent-corporate',
    name: 'House Rent (Corporate / Business Tenant)',
    nepaliName: 'घर/जग्गा बहाल कर (व्यावसायिक प्रयोजन)',
    section: 'Section 88(1)',
    rate: 10.0,
    description: 'Rental payment made by a business or corporate entity for office, warehouse, or building.',
    nepaliDescription: 'व्यवसाय, कार्यालय वा गोदामका लागि घरधनीलाई भुक्तानी गरिने घर बहाल रकम।',
    deductOnVat: false,
  },
  {
    id: 'contract-supply',
    name: 'Contract / Goods Supply (> Rs 50,000)',
    nepaliName: 'ठेक्का तथा वस्तु आपूर्ति (रु ५०,००० भन्दा बढी)',
    section: 'Section 89(1)',
    rate: 1.5,
    description: 'Payments exceeding NPR 50,000 under a contract or procurement agreement.',
    nepaliDescription: 'कुनै सम्झौता वा ठेक्का अन्तर्गत रु. ५०,००० भन्दा बढीको वस्तु वा निर्माण आपूर्ति।',
    deductOnVat: false,
  },
  {
    id: 'transport-non-vat',
    name: 'Freight & Transportation (Without VAT Bill)',
    nepaliName: 'ढुवानी सेवा (भ्याट बिल नभएको सवारी साधन)',
    section: 'Section 88Ka',
    rate: 2.5,
    description: 'Freight and transport services provided by vehicle owners without VAT registration.',
    nepaliDescription: 'भ्याटमा दर्ता नभएका गाडी धनी वा ढुवानी व्यवसायीलाई गरिने ढुवानी भुक्तानी।',
    deductOnVat: false,
  },
  {
    id: 'transport-vat',
    name: 'Freight & Transportation (VAT Registered)',
    nepaliName: 'ढुवानी सेवा (भ्याट बिल भएको)',
    section: 'Section 88Ka',
    rate: 1.5,
    description: 'Freight service provided by a VAT registered logistics company.',
    nepaliDescription: 'भ्याट बिल जारी गर्ने ढुवानी वा लजिस्टिक कम्पनीलाई गरिने भुक्तानी।',
    deductOnVat: false,
  },
  {
    id: 'vehicle-hire',
    name: 'Vehicle / Equipment Rental Hire',
    nepaliName: 'गाडी वा उपकरण भाडा भुक्तानी',
    section: 'Section 88(1)',
    rate: 10.0,
    description: 'Lease or hiring of vehicles, machinery, or equipment from individuals.',
    nepaliDescription: 'गाडी, मेशिनरी वा उपकरण भाडामा लिए बापत गरिने भुक्तानी।',
    deductOnVat: false,
  },
  {
    id: 'audit-fee',
    name: 'Statutory Audit & Certification Fee',
    nepaliName: 'लेखापरीक्षण (Audit) तथा प्रमाणीकरण शुल्क',
    section: 'Section 88(1)',
    rate: 1.5,
    description: 'Audit fees paid to Chartered Accountants (CA / RA) with VAT invoice.',
    nepaliDescription: 'भ्याट बिल सहित लेखापरीक्षक (CA/RA) लाई भुक्तानी गरिने अडिट शुल्क।',
    deductOnVat: false,
  },
  {
    id: 'meeting-allowance',
    name: 'Meeting Allowance & Board Fee',
    nepaliName: 'बैठक भत्ता तथा सञ्चालक पारिश्रमिक',
    section: 'Section 88(1)',
    rate: 15.0,
    description: 'Meeting allowances paid to board members or committee participants.',
    nepaliDescription: 'सञ्चालक समिति, उपसमिति वा अन्य बैठक भत्ता बापत भुक्तानी हुने रकम (अन्तिम कर कट्टी)।',
    deductOnVat: false,
    isFinalWithholding: true,
  },
  {
    id: 'commission-agency',
    name: 'Commission & Agency Fee',
    nepaliName: 'कमिशन तथा एजेन्सी दस्तुर',
    section: 'Section 88(1)',
    rate: 15.0,
    description: 'Commission paid to agents or brokers without VAT invoice.',
    nepaliDescription: 'भ्याट दर्ता नभएका एजेन्ट वा कमिसनदारलाई भुक्तानी गरिने कमिसन रकम।',
    deductOnVat: false,
  },
  {
    id: 'software-foreign',
    name: 'Foreign Software / Digital Service Payment',
    nepaliName: 'विदेशी सफ्टवेयर, क्लाउड तथा डिजिटल सेवा भुक्तानी',
    section: 'Section 88(1) & 90',
    rate: 15.0,
    description: 'Royalty, software licenses, or IT services paid to non-resident foreign companies.',
    nepaliDescription: 'नेपाल बाहिरका विदेशी कम्पनी (AWS, Google, Microsoft, Zoom) लाई भुक्तानी गरिने सफ्टवेयर शुल्क।',
    deductOnVat: false,
    isFinalWithholding: true,
  },
  {
    id: 'dividend',
    name: 'Dividend Payment to Residents',
    nepaliName: 'लाभांश भुक्तानी (Dividend Tax)',
    section: 'Section 88(2)',
    rate: 5.0,
    description: 'Dividend distributed by resident companies to shareholders.',
    nepaliDescription: 'कम्पनीले सेयरधनीलाई वितरण गर्ने लाभांशमा लाग्ने अन्तिम कर।',
    deductOnVat: false,
    isFinalWithholding: true,
  },
  {
    id: 'bank-interest',
    name: 'Bank Deposit Interest (Individual)',
    nepaliName: 'बैंक निक्षेप ब्याज (व्यक्तिगत बचत)',
    section: 'Section 88(1)',
    rate: 5.0,
    description: 'Interest earned on deposits in banks & financial institutions.',
    nepaliDescription: 'वाणिज्य बैंक तथा वित्तीय संस्थाको बचत तथा मुद्दती खातामा प्राप्त हुने ब्याज।',
    deductOnVat: false,
    isFinalWithholding: true,
  },
];

export function TdsCalculator() {
  const { language, t } = useLanguage();

  // Mode: 'forward' (Gross -> Net + TDS) or 'reverse' (Target Net -> Gross Bill + TDS)
  const [calcMode, setCalcMode] = useState<'forward' | 'reverse'>('forward');
  const [selectedCatId, setSelectedCatId] = useState<string>('service-vat');
  const [amountInput, setAmountInput] = useState<number>(100000);
  const [isVatRegistered, setIsVatRegistered] = useState<boolean>(true);
  const [hasVatAmount, setHasVatAmount] = useState<boolean>(true);
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeCategory = useMemo(() => {
    return TDS_CATEGORIES.find((c) => c.id === selectedCatId) || TDS_CATEGORIES[0];
  }, [selectedCatId]);

  const effectiveRate = customRate !== null ? customRate : activeCategory.rate;

  // Calculation computation
  const result = useMemo(() => {
    const rateDecimal = effectiveRate / 100;

    if (calcMode === 'forward') {
      // Input is Taxable Gross Base
      const taxableBase = Math.max(0, amountInput);
      const vatAmount = (hasVatAmount && isVatRegistered) ? taxableBase * 0.13 : 0;
      const totalInvoiceWithVat = taxableBase + vatAmount;

      // In Nepal, TDS is legally deducted on the taxable base EXCLUDING VAT
      const tdsAmount = taxableBase * rateDecimal;
      const netPayable = totalInvoiceWithVat - tdsAmount;

      return {
        taxableBase,
        vatAmount,
        totalInvoiceWithVat,
        tdsAmount,
        netPayable,
        effectiveRate,
      };
    } else {
      // Reverse (Gross-Up): Input is desired Net In-Hand Cash
      const desiredNet = Math.max(0, amountInput);

      if (hasVatAmount && isVatRegistered) {
        // netPayable = taxableBase * (1 + 0.13 - rateDecimal)
        const factor = 1 + 0.13 - rateDecimal;
        const taxableBase = factor > 0 ? desiredNet / factor : 0;
        const vatAmount = taxableBase * 0.13;
        const totalInvoiceWithVat = taxableBase + vatAmount;
        const tdsAmount = taxableBase * rateDecimal;
        return {
          taxableBase,
          vatAmount,
          totalInvoiceWithVat,
          tdsAmount,
          netPayable: desiredNet,
          effectiveRate,
        };
      } else {
        // netPayable = taxableBase * (1 - rateDecimal)
        const factor = 1 - rateDecimal;
        const taxableBase = factor > 0 ? desiredNet / factor : 0;
        const vatAmount = 0;
        const totalInvoiceWithVat = taxableBase;
        const tdsAmount = taxableBase * rateDecimal;
        return {
          taxableBase,
          vatAmount,
          totalInvoiceWithVat,
          tdsAmount,
          netPayable: desiredNet,
          effectiveRate,
        };
      }
    }
  }, [calcMode, amountInput, effectiveRate, hasVatAmount, isVatRegistered]);

  const handleCopy = () => {
    const summaryText = `Nepal TDS Calculation (${activeCategory.section}):
Payment Category: ${language === 'ne' ? activeCategory.nepaliName : activeCategory.name}
Taxable Base (Excl. VAT): रु ${Math.round(result.taxableBase).toLocaleString('en-IN')}
13% VAT Amount: रु ${Math.round(result.vatAmount).toLocaleString('en-IN')}
Total Bill/Invoice Amount: रु ${Math.round(result.totalInvoiceWithVat).toLocaleString('en-IN')}
TDS Deducted (${result.effectiveRate}%): रु ${Math.round(result.tdsAmount).toLocaleString('en-IN')}
Net Payable to Vendor: रु ${Math.round(result.netPayable).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;

    navigator.clipboard.writeText(summaryText);
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
              {t('Nepal Income Tax Act 2058 Compliant', 'नेपाल आयकर ऐन २०५८ बमोजिम')}
            </span>
            <span className="badge badge-neutral">
              {t('IRD Sections 87, 88, 88Ka, 89', 'दफा ८७, ८८, ८८(क) र ८९')}
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
            {t('Nepal TDS & Withholding Tax Calculator', 'नेपाल स्रोतमा कर कट्टी (TDS) हिसाब')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {t(
              'Calculate TDS on vendor payments, house rent, consultancy, freight, and contracts with reverse gross-up.',
              'परामर्श सेवा, घर बहाल, ढुवानी, ठेक्का तथा विदेशी भुक्तानीमा लाग्ने स्रोतमा कर कट्टी र नेट भुक्तानीको हिसाब।'
            )}
          </p>
        </div>

        {/* Calculation Direction Toggle: Forward vs Reverse Gross-Up */}
        <div className="segmented-control" style={{ padding: '4px' }}>
          <button
            type="button"
            className={`segmented-btn ${calcMode === 'forward' ? 'active' : ''}`}
            onClick={() => setCalcMode('forward')}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            {t('Forward (From Gross)', 'बिल रकमबाट TDS')}
          </button>
          <button
            type="button"
            className={`segmented-btn ${calcMode === 'reverse' ? 'active' : ''}`}
            onClick={() => setCalcMode('reverse')}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowRightLeft size={13} />
              {t('Reverse (Gross-Up)', 'नेट हात पर्नेबाट TDS')}
            </span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div>
          {/* Payment Category Selector */}
          <div style={{ marginBottom: '22px' }}>
            <label className="input-label">
              {t('Payment / Service Category (कर कट्टी हुने शिर्षक)', 'भुक्तानी / सेवा शिर्षक')}
            </label>
            <select
              className="select-input"
              value={selectedCatId}
              onChange={(e) => {
                setSelectedCatId(e.target.value);
                setCustomRate(null);
              }}
              style={{ padding: '12px 14px', fontSize: '14px', fontWeight: 600 }}
            >
              {TDS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.rate}% — {language === 'ne' ? cat.nepaliName : cat.name} ({cat.section})
                </option>
              ))}
            </select>
            <div
              style={{
                marginTop: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12.5px',
                color: '#475569',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#003893' }}>
                <Info size={14} />
                <span>{activeCategory.section}</span>
                {activeCategory.isFinalWithholding && (
                  <span style={{ fontSize: '10.5px', color: '#c8102e', background: '#fef2f2', padding: '1px 6px', borderRadius: '4px' }}>
                    {t('Final Withholding', 'अन्तिम कर कट्टी')}
                  </span>
                )}
              </div>
              <p style={{ margin: '4px 0 0', lineHeight: 1.5 }}>
                {language === 'ne' ? activeCategory.nepaliDescription : activeCategory.description}
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ marginBottom: 0 }}>
                {calcMode === 'forward'
                  ? t('Gross Taxable Amount (करयोग्य रकम - भ्याट बाहेक)', 'करयोग्य रकम (भ्याट बाहेकको बिल रकम)')
                  : t('Desired Net Payable (हात पर्ने खुद भुक्तानी रकम)', 'हात पर्ने खुद रकम (Net in Hand)')}
              </label>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#003893' }}>
                {result.effectiveRate}% TDS Rate
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontWeight: 700, color: '#64748b' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input"
                style={{ paddingLeft: '38px', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={amountInput || ''}
                onChange={(e) => setAmountInput(Number(e.target.value) || 0)}
              />
            </div>

            {/* Quick Amount Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '11.5px', color: '#8c7b66', fontWeight: 600 }}>{t('Quick:', 'छिटो:')}</span>
              {[25000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="calc-preset-chip"
                  onClick={() => setAmountInput(amt)}
                >
                  रु {amt >= 100000 ? `${amt / 100000} Lakh` : `${amt / 1000}k`}
                </button>
              ))}
            </div>
          </div>

          {/* VAT Configuration */}
          <div
            style={{
              background: '#f8fafc',
              padding: '16px 18px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('13% VAT Bill Issued', '१३% भ्याट बिल जारी भएको')}
                </span>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t('TDS is legally deducted on the taxable base amount, not on VAT.', 'कानुन अनुसार TDS भ्याट रकममा नभई करयोग्य रकममा मात्र कट्टी हुन्छ।')}
                </p>
              </div>
              <input
                type="checkbox"
                id="vat-check"
                checked={hasVatAmount && isVatRegistered}
                onChange={(e) => {
                  setHasVatAmount(e.target.checked);
                  setIsVatRegistered(e.target.checked);
                }}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            {/* Manual Rate Override Accordion */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {t('Custom / Special Rate override:', 'विशेष कर दर परिवर्तन:')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="number"
                  step="0.1"
                  placeholder={String(activeCategory.rate)}
                  value={customRate !== null ? customRate : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomRate(val === '' ? null : Number(val));
                  }}
                  style={{
                    width: '70px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 700 }}>%</span>
              </div>
            </div>
          </div>

          {/* Statutory Deposit Notice Box */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <Clock size={18} color="#003893" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: '#1e3a8a', lineHeight: 1.5 }}>
              <strong>{t('Statutory Deposit Deadline (दफा ९०):', 'राजस्व दाखिला म्याद (दफा ९०):')}</strong>
              <br />
              {t(
                'TDS deducted must be deposited to the government revenue account by the 25th of the following Bikram Sambat month along with e-TDS return.',
                'कट्टी गरिएको स्रोतमा कर आउँदो महिनाको २५ गतेभित्र सम्बन्धित राजस्व खातामा दाखिला गरी ई-टिडीएस (e-TDS) विवरण प्रविष्ट गर्नुपर्दछ।'
              )}
            </div>
          </div>
        </div>

        {/* Results Column */}
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
                  {t('Net Payable to Vendor / Beneficiary', 'पार्टीलाई भुक्तानी गर्नुपर्ने खुद रकम')}
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#34d399', margin: '6px 0 2px', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.netPayable).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  {t('Invoice Total: Rs.', 'कुल बिल रकम: रू.')} {Math.round(result.totalInvoiceWithVat).toLocaleString('en-IN')}
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
                <span style={{ fontSize: '11px', color: '#f87171', fontWeight: 700 }}>
                  {t(`TDS DEDUCTED (${result.effectiveRate}%)`, `कट्टी हुने TDS (${result.effectiveRate}%)`)}
                </span>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.tdsAmount).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{t('Government Revenue', 'नेपाल सरकार राजस्व')}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700 }}>
                  {t('13% VAT INCLUDED', '१३% भ्याट रकम')}
                </span>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.vatAmount).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {hasVatAmount ? t('Tax Invoice Applicable', 'कर बीजक बमोजिम') : t('No VAT', 'भ्याट नलागेको')}
                </span>
              </div>
            </div>
          </div>

          {/* Printable Official Voucher Preview */}
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
                <FileCheck2 size={18} color="#003893" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                  {t('IRD Payment Voucher Breakdown', 'आन्तरिक राजस्व भौचर सारांश')}
                </span>
              </div>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#003893', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                {activeCategory.section}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Taxable Base Amount (भ्याट बाहेक):', 'करयोग्य रकम (भ्याट बाहेक):')}</span>
                <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.taxableBase).toLocaleString('en-IN')}
                </strong>
              </div>

              {result.vatAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>{t('Add: 13% Value Added Tax (VAT):', 'थप: १३% मूल्य अभिवृद्धि कर (भ्याट):')}</span>
                  <strong style={{ color: '#2563eb', fontFamily: 'var(--font-mono)' }}>
                    + रु {Math.round(result.vatAmount).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontWeight: 700, borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span>{t('Total Invoice Amount (कुल बिल रकम):', 'कुल बिल रकम (भ्याट सहित):')}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.totalInvoiceWithVat).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span>{t(`Less: TDS Withheld (${result.effectiveRate}%):`, `घटाउने: कट्टी भएको TDS (${result.effectiveRate}%):`)}</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>
                  - रु {Math.round(result.tdsAmount).toLocaleString('en-IN')}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#059669',
                  border: '1px solid #e2e8f0',
                  marginTop: '4px',
                }}
              >
                <span>{t('Net Cheque / Bank Transfer Payable:', 'पार्टीलाई दिनुपर्ने चेक / बैंक रकम:')}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(result.netPayable).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TDS Quick Rate Reference Table */}
      <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Percent size={16} />
          <span>{t('Nepal Official TDS Rate Schedule (आयकर ऐन बमोजिम स्रोतमा कर कट्टी दरहरू)', 'नेपाल आधिकारिक TDS दर सूची')}</span>
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Payment Nature', 'भुक्तानी शिर्षक')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Section', 'दफा')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('TDS Rate', 'कर कट्टी दर')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>{t('Status', 'प्रकृति')}</th>
                <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', textAlign: 'right' }}>{t('Action', 'हिसाब')}</th>
              </tr>
            </thead>
            <tbody>
              {TDS_CATEGORIES.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>
                    {language === 'ne' ? cat.nepaliName : cat.name}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>{cat.section}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="badge badge-emerald" style={{ fontWeight: 800 }}>
                      {cat.rate}%
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b' }}>
                    {cat.isFinalWithholding ? (
                      <span style={{ color: '#c8102e', fontWeight: 700 }}>{t('Final Withholding', 'अन्तिम कट्टी')}</span>
                    ) : (
                      <span>{t('Adjustable in Tax Return', 'वार्षिक विवरणमा समायोजन हुने')}</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCatId(cat.id);
                        setCustomRate(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '11.5px', borderRadius: '4px' }}
                    >
                      {t('Calculate', 'हिसाब गर्नुहोस्')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
