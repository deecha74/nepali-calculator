'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  NEPAL_COMMERCIAL_BANKS,
  LoanCategory,
  getBankEffectiveRate,
  calculateMonthlyEmi,
  CommercialBank,
} from '@/lib/rates/bankLoanRates';
import { useLanguage } from '@/components/LanguageContext';
import {
  Building2,
  Percent,
  Calendar,
  Wallet,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

interface Props {
  initialCategory?: LoanCategory;
  initialAmount?: number;
  initialTenureYears?: number;
  highlightBankId?: string;
}

export function BankLoanComparison({
  initialCategory = 'home',
  initialAmount = 5000000, // 50 Lakh
  initialTenureYears = 20,
  highlightBankId,
}: Props) {
  const { t, language } = useLanguage();
  const ne = language === 'ne';

  const [category, setCategory] = useState<LoanCategory>(initialCategory);
  const [loanAmount, setLoanAmount] = useState<number>(initialAmount);
  const [tenureYears, setTenureYears] = useState<number>(initialTenureYears);
  const [selectedBankId, setSelectedBankId] = useState<string>(highlightBankId || 'all');
  const [copied, setCopied] = useState(false);

  // Categories config
  const categories: { id: LoanCategory; nameEn: string; nameNe: string; icon: string; defaultTenure: number; defaultAmount: number }[] = [
    { id: 'home', nameEn: 'Home Loan', nameNe: 'घर कर्जा', icon: '🏠', defaultTenure: 20, defaultAmount: 5000000 },
    { id: 'ev', nameEn: 'EV Car Loan', nameNe: 'इभी गाडी कर्जा', icon: '⚡', defaultTenure: 7, defaultAmount: 3000000 },
    { id: 'auto', nameEn: 'Auto / Car Loan', nameNe: 'सवारी कर्जा', icon: '🚗', defaultTenure: 7, defaultAmount: 2500000 },
    { id: 'education', nameEn: 'Abroad Education', nameNe: 'शिक्षा कर्जा', icon: '🎓', defaultTenure: 10, defaultAmount: 3500000 },
    { id: 'personal', nameEn: 'Personal Loan', nameNe: 'व्यक्तिगत कर्जा', icon: '💼', defaultTenure: 5, defaultAmount: 1500000 },
  ];

  const handleCategoryChange = (newCat: LoanCategory) => {
    setCategory(newCat);
    const catConfig = categories.find((c) => c.id === newCat);
    if (catConfig) {
      setTenureYears(catConfig.defaultTenure);
      setLoanAmount(catConfig.defaultAmount);
    }
  };

  // Compute comparisons for all banks
  const bankComparisons = useMemo(() => {
    const list = NEPAL_COMMERCIAL_BANKS.map((bank) => {
      const effectiveRate = getBankEffectiveRate(bank, category);
      const monthlyEmi = calculateMonthlyEmi(loanAmount, effectiveRate, tenureYears);
      const totalMonths = tenureYears * 12;
      const totalRepayment = monthlyEmi * totalMonths;
      const totalInterest = totalRepayment - loanAmount;
      const requiredIncome = monthlyEmi * 2; // NRB 50% DSTI limit

      return {
        bank,
        effectiveRate,
        monthlyEmi,
        totalInterest,
        totalRepayment,
        requiredIncome,
      };
    });

    // Sort by lowest monthly EMI / lowest rate
    return list.sort((a, b) => a.effectiveRate - b.effectiveRate);
  }, [category, loanAmount, tenureYears]);

  const bestBank = bankComparisons[0];

  // Quick Amount presets
  const presets = category === 'home'
    ? [2500000, 5000000, 7500000, 10000000]
    : category === 'ev' || category === 'auto'
    ? [1500000, 2500000, 3500000, 5000000]
    : [1000000, 2000000, 3500000, 5000000];

  const handleShare = () => {
    const shareText = `Compare Nepal Commercial Bank Loan EMI for NPR ${loanAmount.toLocaleString('en-IN')}: Lowest rate at ${bestBank.bank.name} (${bestBank.effectiveRate}% APR, EMI: NPR ${bestBank.monthlyEmi.toLocaleString('en-IN')}/mo). Check all 12+ banks live on Nepali Calc: https://nepalicalc.com/emi/banks`;
    if (navigator.share) {
      navigator.share({ title: 'Nepal Bank Loan EMI Comparison', text: shareText, url: 'https://nepalicalc.com/emi/banks' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCategoryChange(c.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 700,
                border: active ? '1.5px solid #003893' : '1px solid #e2e8f0',
                backgroundColor: active ? '#003893' : '#ffffff',
                color: active ? '#ffffff' : '#334155',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                boxShadow: active ? '0 4px 12px rgba(0, 56, 147, 0.25)' : 'none',
              }}
            >
              <span>{c.icon}</span>
              <span>{ne ? c.nameNe : c.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Controls Card */}
      <div
        className="white-card"
        style={{
          padding: '28px',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(11, 43, 92, 0.04)',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* Loan Amount */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              <span>{t('Loan Amount (NPR)', 'कर्जा रकम (रु)')}</span>
              <span style={{ color: '#003893', fontSize: '15px' }}>
                NPR {loanAmount.toLocaleString('en-IN')}
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>
                  ({(loanAmount / 100000).toFixed(loanAmount % 100000 === 0 ? 0 : 2)} Lakh)
                </span>
              </span>
            </label>
            <input
              type="range"
              min={500000}
              max={20000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#003893', height: '6px', cursor: 'pointer' }}
            />
            {/* Quick Amount Chips */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setLoanAmount(p)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    border: loanAmount === p ? '1px solid #003893' : '1px solid #e2e8f0',
                    backgroundColor: loanAmount === p ? '#eff6ff' : '#f8fafc',
                    color: loanAmount === p ? '#003893' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {(p / 100000).toFixed(0)} Lakh
                </button>
              ))}
            </div>
          </div>

          {/* Loan Tenure (Years) */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              <span>{t('Loan Tenure', 'भुक्तानी अवधि')}</span>
              <span style={{ color: '#003893', fontSize: '15px' }}>
                {tenureYears} {t('Years', 'वर्ष')} ({tenureYears * 12} {t('Months', 'महिना')})
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={category === 'home' ? 25 : category === 'personal' ? 7 : 10}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#003893', height: '6px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              {(category === 'home' ? [5, 10, 15, 20, 25] : [3, 5, 7, 10]).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTenureYears(y)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    border: tenureYears === y ? '1px solid #003893' : '1px solid #e2e8f0',
                    backgroundColor: tenureYears === y ? '#eff6ff' : '#f8fafc',
                    color: tenureYears === y ? '#003893' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {y} {t('Yrs', 'वर्ष')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight Card: Lowest Rate Winner */}
        {bestBank && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                🏆
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '9999px', textTransform: 'uppercase' }}>
                    {t('Lowest Rate Leader', 'सबैभन्दा सस्तो दर')}
                  </span>
                  <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>
                    {t('Base Rate', 'आधार दर')}: {bestBank.bank.baseRate}%
                  </span>
                </div>
                <h4 style={{ margin: '3px 0 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  {bestBank.bank.name} — {bestBank.effectiveRate}% p.a.
                </h4>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>
                  {t('Estimated Monthly EMI', 'अनुमानित मासिक किस्ता')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#15803d' }}>
                  NPR {bestBank.monthlyEmi.toLocaleString('en-IN')}/mo
                </div>
              </div>
              <button
                type="button"
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Share2 size={13} />
                <span>{copied ? t('Copied!', 'कपी भयो!') : t('Share', 'साझेदारी')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Grid & Tables */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            {t(`Commercial Banks Loan Comparison (${bankComparisons.length} Banks)`, `वाणिज्य बैंक कर्जा तुलना (${bankComparisons.length} बैंकहरू)`)}
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {t('Sorted by Lowest Effective APR', 'न्यूनतम प्रभावकारी ब्याजदर अनुसार')}
          </span>
        </div>

        {/* Responsive Cards for All Banks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {bankComparisons.map((item, idx) => {
            const isWinner = idx === 0;
            return (
              <div
                key={item.bank.id}
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: isWinner ? '2px solid #16a34a' : '1.5px solid #eef2f6',
                  boxShadow: isWinner ? '0 8px 24px -4px rgba(22, 163, 74, 0.15)' : '0 2px 8px rgba(11, 43, 92, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                {isWinner && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '3px 12px',
                      borderBottomLeftRadius: '10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Lowest EMI
                  </div>
                )}

                <div>
                  {/* Bank Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#eff6ff',
                        color: '#003893',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 900,
                        fontSize: '12px',
                        flexShrink: 0,
                        border: '1px solid #dbeafe',
                      }}
                    >
                      {item.bank.shortCode}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                        {item.bank.name}
                      </h4>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {item.bank.nepaliName}
                      </div>
                    </div>
                  </div>

                  {/* Monthly EMI & Interest Metric Box */}
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      marginBottom: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{t('Monthly Installment (EMI)', 'मासिक किस्ता')}</span>
                      <strong style={{ fontSize: '16px', color: '#003893', fontWeight: 900 }}>
                        रु {item.monthlyEmi.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#475569' }}>
                      <span>{t('Effective APR', 'ब्याजदर')}:</span>
                      <strong style={{ color: '#0f172a' }}>
                        {item.effectiveRate}% <span style={{ color: '#64748b', fontWeight: 500 }}>(Base {item.bank.baseRate}% + Spread)</span>
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>
                      <span>{t('Total Interest', 'कुल ब्याज')}:</span>
                      <span style={{ color: '#b45309', fontWeight: 700 }}>
                        रु {item.totalInterest.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Criteria & DBR Requirements */}
                  <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t('Min. Monthly Income (50% DSTI)', 'न्यूनतम मासिक आम्दानी')}:</span>
                      <strong style={{ color: '#334155' }}>रु {item.requiredIncome.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t('Processing Fee', 'प्रक्रिया शुल्क')}:</span>
                      <span>{item.bank.processingFeePercent}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t('Max Financing (LTV)', 'अधिकतम कर्जा अनुपात')}:</span>
                      <span>{category === 'ev' ? '80%' : category === 'home' ? '70%' : '50%'}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Page Link */}
                <Link
                  href={`/emi/banks/${item.bank.id}-bank-${category === 'ev' ? 'ev-car' : category}-loan`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#003893',
                    fontSize: '12px',
                    fontWeight: 750,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{t('Full Bank Schedule & Eligibility', 'विस्तृत तालिका र सर्तहरू')}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nepal Rastra Bank (NRB) Loan Directives Explainer */}
      <div
        style={{
          padding: '24px',
          borderRadius: '18px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <ShieldCheck size={18} color="#003893" />
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
            {t('Nepal Rastra Bank (NRB) Lending Directives Cheat Sheet', 'नेपाल राष्ट्र बैंक कर्जा मापदण्ड')}
          </h4>
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.65 }}>
          <li>
            <strong>{t('Debt Service to Income Ratio (50% DSTI Limit):', 'ऋण भुक्तानी आय अनुपात (DSTI - ५०% मापदण्ड):')}</strong>{' '}
            {t(
              'Your total monthly EMI commitments across all financial institutions cannot exceed 50% of your verifiable gross family income.',
              'सबै बैंक तथा वित्तीय संस्थाहरूमा गरी तिर्नुपर्ने कुल मासिक किस्ता प्रमाणित पारिवारिक कुल आम्दानीको ५०% भन्दा बढी हुनु हुँदैन।'
            )}
          </li>
          <li>
            <strong>{t('Loan-to-Value (LTV) Ratio:', 'धितो मूल्य अनुपात (LTV):')}</strong>{' '}
            {t(
              'Up to 70% for first-time residential home buyers; up to 80% for Electric Vehicles (EVs); and 50% for petrol/diesel private cars.',
              'पहिलो पटक आवासीय घर खरिदकर्ताका लागि ७०% सम्म, विद्युतीय सवारी (EV) का लागि ८०% सम्म र पेट्रोल/डिजेल निजी गाडीका लागि ५०% सम्म कर्जा पाइन्छ।'
            )}
          </li>
          <li>
            <strong>{t('Quarterly Base Rate Revision:', 'त्रैमासिक आधार दर समायोजन:')}</strong>{' '}
            {t(
              'Commercial banks in Nepal revise their base rate every quarter. If the base rate drops, your monthly EMI interest automatically decreases.',
              'नेपालका वाणिज्य बैंकहरूले प्रत्येक त्रैमासमा आधार दर हेरफेर गर्छन्। आधार दर घट्दा तपाईंको मासिक किस्ताको ब्याज पनि स्वतः घट्छ।'
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

