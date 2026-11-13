'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Layers,
  Landmark,
  Calendar,
  ArrowRight,
  Sparkles,
  Calculator,
  RefreshCw,
  Clock,
  ChevronRight,
  TrendingUp,
  Percent,
  Users,
  Home,
  CreditCard
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';
import {
  ropaniToSqFt,
  bighaToSqFt,
  sqFtToRopani,
  sqFtToBigha,
  SQFT_PER_SQMTR
} from '@/lib/rates/landRates';
import {
  convertAdToBsApprox,
  convertBsToAdApprox,
  calculateExactAge,
  NEPALI_MONTHS,
  NEPALI_DAYS
} from '@/lib/nepaliDate';

type TabKey = 'tax' | 'land' | 'emi' | 'date';

export function HeroQuickCalcCard({
  onSwitchToPatro,
  hideHeader = true
}: {
  onSwitchToPatro?: () => void;
  hideHeader?: boolean;
}) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('tax');

  // ================= TAB 1: SALARY TAX =================
  const [taxMarital, setTaxMarital] = useState<'single' | 'married'>('single');
  const [monthlySalary, setMonthlySalary] = useState<number>(75000);

  const taxCalculation = useMemo(() => {
    const annualSalary = monthlySalary * 12;
    // Official FY 2083/84 IRD Slabs (10 Lakh Base Slab)
    const basicExemption = 1000000;
    let tax = 0;

    if (annualSalary <= basicExemption) {
      tax = annualSalary * 0.01; // 1% Social Security Tax (0% if enrolled in SSF)
    } else {
      // First 10,00,000 (1% SST)
      tax = basicExemption * 0.01;
      let remaining = annualSalary - basicExemption;

      // Next 5,00,000 (10L - 15L @ 10%)
      if (remaining > 0) {
        const taxable = Math.min(remaining, 500000);
        tax += taxable * 0.10;
        remaining -= taxable;
      }

      // Next 10,00,000 (15L - 25L @ 20%)
      if (remaining > 0) {
        const taxable = Math.min(remaining, 1000000);
        tax += taxable * 0.20;
        remaining -= taxable;
      }

      // Next 15,00,000 (25L - 40L @ 27%)
      if (remaining > 0) {
        const taxable = Math.min(remaining, 1500000);
        tax += taxable * 0.27;
        remaining -= taxable;
      }

      // Above 40,00,000 (29%)
      if (remaining > 0) {
        tax += remaining * 0.29;
      }
    }

    const ssfAnnualTax = Math.max(0, tax - Math.min(annualSalary, basicExemption) * 0.01);
    const monthlyTax = Math.round(tax / 12);
    const ssfMonthlyTax = Math.round(ssfAnnualTax / 12);
    const netMonthly = Math.max(0, monthlySalary - monthlyTax);
    const effectiveRate = monthlySalary > 0 ? ((tax / annualSalary) * 100).toFixed(1) : '0.0';

    return {
      annualSalary,
      annualTax: Math.round(tax),
      monthlyTax,
      ssfMonthlyTax,
      netMonthly,
      effectiveRate,
    };
  }, [monthlySalary, taxMarital]);

  // ================= TAB 2: LAND CONVERTER =================
  const [landRegion, setLandRegion] = useState<'hilly' | 'terai'>('hilly');
  const [ropani, setRopani] = useState<number>(0);
  const [aana, setAana] = useState<number>(4);
  const [paisa, setPaisa] = useState<number>(0);
  const [daam, setDaam] = useState<number>(0);

  const [bigha, setBigha] = useState<number>(0);
  const [kattha, setKattha] = useState<number>(10);
  const [dhur, setDhur] = useState<number>(0);

  const landCalculation = useMemo(() => {
    let totalSqFt = 0;
    if (landRegion === 'hilly') {
      totalSqFt = ropaniToSqFt(ropani, aana, paisa, daam);
    } else {
      totalSqFt = bighaToSqFt(bigha, kattha, dhur, 0);
    }

    const totalSqMtr = Math.round((totalSqFt / SQFT_PER_SQMTR) * 100) / 100;
    const hillyEquiv = sqFtToRopani(totalSqFt);
    const teraiEquiv = sqFtToBigha(totalSqFt);

    return {
      totalSqFt: Math.round(totalSqFt * 100) / 100,
      totalSqMtr,
      hillyEquiv,
      teraiEquiv,
    };
  }, [landRegion, ropani, aana, paisa, daam, bigha, kattha, dhur]);

  // ================= TAB 3: LOAN EMI =================
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(15);

  const emiCalculation = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let monthlyEmi = 0;
    if (monthlyRate > 0) {
      monthlyEmi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyEmi = loanAmount / totalMonths;
    }

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - loanAmount);

    return {
      monthlyEmi: Math.round(monthlyEmi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [loanAmount, interestRate, tenureYears]);

  // ================= TAB 4: DATE CONVERTER & AGE =================
  const [dateMode, setDateMode] = useState<'adToBs' | 'bsToAd'>('adToBs');
  const [adDateInput, setAdDateInput] = useState<string>('2026-11-09');
  const [bsYearInput, setBsYearInput] = useState<number>(2083);
  const [bsMonthInput, setBsMonthInput] = useState<number>(7); // Kartik
  const [bsDayInput, setBsDayInput] = useState<number>(23);

  const dateCalculation = useMemo(() => {
    if (dateMode === 'adToBs') {
      const adDate = new Date(adDateInput || '2026-11-09');
      const bs = convertAdToBsApprox(adDate);
      const dayObj = NEPALI_DAYS[adDate.getDay()] || NEPALI_DAYS[0];
      const monthObj = NEPALI_MONTHS[bs.month - 1] || NEPALI_MONTHS[0];
      const age = calculateExactAge(adDate);
      return {
        formattedNep: `${toNepaliDigits(bs.year)} ${monthObj.bs} ${toNepaliDigits(bs.day)}, ${dayObj.bs}`,
        formattedEng: `${monthObj.en} ${bs.day}, ${bs.year} BS (${adDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
        ageYears: age.years,
        ageMonths: age.months,
        ageDays: age.days,
      };
    } else {
      const ad = convertBsToAdApprox(bsYearInput, bsMonthInput, bsDayInput);
      const dayObj = NEPALI_DAYS[ad.getDay()] || NEPALI_DAYS[0];
      const monthObj = NEPALI_MONTHS[bsMonthInput - 1] || NEPALI_MONTHS[0];
      const age = calculateExactAge(ad);
      return {
        formattedNep: `${toNepaliDigits(bsYearInput)} ${monthObj.bs} ${toNepaliDigits(bsDayInput)}, ${dayObj.bs}`,
        formattedEng: `${ad.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`,
        ageYears: age.years,
        ageMonths: age.months,
        ageDays: age.days,
      };
    }
  }, [dateMode, adDateInput, bsYearInput, bsMonthInput, bsDayInput]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Optional Top Header Row */}
      {!hideHeader && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0b2b5c 0%, #1e4b8f 100%)',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 6px rgba(11, 43, 92, 0.25)',
              }}
            >
              <Calculator size={15} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#0b2b5c',
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {t('Instant Quick-Calc', 'द्रुत हिसाब क्याल्कुलेटर')}
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                {t('Nepal High-Speed Utilities', 'नेपालका सर्वाधिक प्रयोग हुने टूल्स')}
              </span>
            </div>
          </div>

          {onSwitchToPatro && (
            <button
              type="button"
              onClick={onSwitchToPatro}
              className="neu-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: 700,
                borderRadius: '8px',
                color: '#0b2b5c',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
              }}
              title={t('Switch to Monthly Calendar', 'मासिक पात्रो हेर्नुहोस्')}
            >
              <Calendar size={13} color="#0b2b5c" />
              <span>{t('Monthly Patro', 'मासिक पात्रो')}</span>
            </button>
          )}
        </div>
      )}

      {/* 4 Multi-Tool Tabs with butter-smooth hover and active indicator */}
      <div className="hero-quick-tabs-nav">
        <button
          type="button"
          onClick={() => setActiveTab('tax')}
          className={`hero-quick-tab-btn ${activeTab === 'tax' ? 'active' : ''}`}
        >
          <Users size={16} />
          <span>{t('Salary Tax', 'तलब कर')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('land')}
          className={`hero-quick-tab-btn ${activeTab === 'land' ? 'active' : ''}`}
        >
          <Home size={16} />
          <span>{t('Land', 'जग्गा नाप')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('emi')}
          className={`hero-quick-tab-btn ${activeTab === 'emi' ? 'active' : ''}`}
        >
          <CreditCard size={16} />
          <span>{t('Loan EMI', 'ऋण किस्ता')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('date')}
          className={`hero-quick-tab-btn ${activeTab === 'date' ? 'active' : ''}`}
        >
          <Clock size={16} />
          <span>{t('Due & Age', 'मिति र उमेर')}</span>
        </button>
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* 1. SALARY TAX TAB */}
        {activeTab === 'tax' && (
          <div key="tax" className="tab-panel-smooth" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Header row: Monthly Gross Salary + Capsule Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <label style={{ fontSize: 'clamp(13px, 3.4vw, 14.5px)', fontWeight: 800, color: '#0f172a' }}>
                {t('Monthly Gross Salary', 'मासिक कुल तलब')}
              </label>
              <div className="hero-pill-toggle">
                <button
                  type="button"
                  onClick={() => setTaxMarital('single')}
                  className={`hero-pill-btn ${taxMarital === 'single' ? 'active' : ''}`}
                >
                  {t('Single', 'अविवाहित')}
                </button>
                <button
                  type="button"
                  onClick={() => setTaxMarital('married')}
                  className={`hero-pill-btn ${taxMarital === 'married' ? 'active' : ''}`}
                >
                  {t('Married', 'विवाहित')}
                </button>
              </div>
            </div>

            {/* Input with Rs. Prefix & Large Font */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '9px 14px',
              }}
            >
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#475569' }}>Rs.</span>
              <input
                type="number"
                value={monthlySalary || ''}
                onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
                placeholder="75000"
                style={{
                  width: '100%',
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#0b2b5c',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              />
            </div>

            {/* Quick Preset Salary Chips */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {[
                { label: '30k', val: 30000 },
                { label: '50k', val: 50000 },
                { label: '75k', val: 75000 },
                { label: '1 Lakh', val: 100000 },
                { label: '1.5 Lakh', val: 150000 },
              ].map((chip) => {
                const isSelected = monthlySalary === chip.val;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setMonthlySalary(chip.val)}
                    className={`hero-preset-chip ${isSelected ? 'active' : ''}`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Clean Result Layout */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {/* Row 1: Net In-Hand left, Tax right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                  {t('Net In-Hand (Monthly)', 'मासिक हात पर्ने खुद तलब')}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#dc2626',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fee2e2',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('Tax: NPR', 'कर: रू')} {taxCalculation.monthlyTax.toLocaleString('en-IN')}/{t('mo', 'महिना')} ({taxCalculation.effectiveRate}%)
                </span>
              </div>

              {/* Row 2: Big Bold NPR Net Amount */}
              <div style={{ fontSize: 'clamp(24px, 6.2vw, 28px)', fontWeight: 900, color: '#0b2b5c', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                NPR {taxCalculation.netMonthly.toLocaleString('en-IN')}
              </div>

              {/* Row 3: Annual Gross left, SSF tax info right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px 10px', fontSize: '11.5px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                  {t('Annual: NPR', 'वार्षिक: रू')} {(monthlySalary * 12).toLocaleString('en-IN')}
                </span>
                <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                  ✓ {t('With SSF: NPR', 'SSF सहित: रू')} {taxCalculation.ssfMonthlyTax.toLocaleString('en-IN')}/{t('mo tax', 'महिना कर')}
                </span>
              </div>
            </div>

            {/* Full-width CTA Button */}
            <Link
              href="/tax"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0b2b5c',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 750,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
              }}
              className="hover-lift btn-tactile"
            >
              <Calculator size={15} />
              <span>{t('View Complete Tax Breakdown →', 'विस्तृत आयकर हिसाब हेर्नुहोस् →')}</span>
            </Link>
          </div>
        )}

        {/* 2. LAND CONVERTER TAB */}
        {activeTab === 'land' && (
          <div key="land" className="tab-panel-smooth" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Region Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                {t('Measurement System', 'नाप प्रणाली')}
              </label>
              <div className="hero-pill-toggle">
                <button
                  type="button"
                  onClick={() => setLandRegion('hilly')}
                  className={`hero-pill-btn ${landRegion === 'hilly' ? 'active' : ''}`}
                >
                  {t('Hilly (Ropani)', 'पहाडी (रोपनी)')}
                </button>
                <button
                  type="button"
                  onClick={() => setLandRegion('terai')}
                  className={`hero-pill-btn ${landRegion === 'terai' ? 'active' : ''}`}
                >
                  {t('Terai (Bigha)', 'तराई (बिघा)')}
                </button>
              </div>
            </div>

            {/* Input Grid */}
            {landRegion === 'hilly' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Ropani', 'रोपनी')}</span>
                  <input
                    type="number"
                    min="0"
                    value={ropani}
                    onChange={(e) => setRopani(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Aana', 'आना')}</span>
                  <input
                    type="number"
                    min="0"
                    value={aana}
                    onChange={(e) => setAana(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Paisa', 'पैसा')}</span>
                  <input
                    type="number"
                    min="0"
                    value={paisa}
                    onChange={(e) => setPaisa(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Daam', 'दाम')}</span>
                  <input
                    type="number"
                    min="0"
                    value={daam}
                    onChange={(e) => setDaam(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Bigha', 'बिघा')}</span>
                  <input
                    type="number"
                    min="0"
                    value={bigha}
                    onChange={(e) => setBigha(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Kattha', 'कट्ठा')}</span>
                  <input
                    type="number"
                    min="0"
                    value={kattha}
                    onChange={(e) => setKattha(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Dhur', 'धुर')}</span>
                  <input
                    type="number"
                    min="0"
                    value={dhur}
                    onChange={(e) => setDhur(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '8px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}
                  />
                </div>
              </div>
            )}

            {/* Quick presets */}
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => { setLandRegion('hilly'); setRopani(0); setAana(4); setPaisa(0); setDaam(0); }}
                className="hero-preset-chip"
              >
                {t('4 Aana (House Plot)', '४ आना (घडेरी)')}
              </button>
              <button
                type="button"
                onClick={() => { setLandRegion('hilly'); setRopani(1); setAana(0); setPaisa(0); setDaam(0); }}
                className="hero-preset-chip"
              >
                {t('1 Ropani', '१ रोपनी')}
              </button>
              <button
                type="button"
                onClick={() => { setLandRegion('terai'); setBigha(0); setKattha(10); setDhur(0); }}
                className="hero-preset-chip"
              >
                {t('10 Kattha', '१० कट्ठा')}
              </button>
              <button
                type="button"
                onClick={() => { setLandRegion('terai'); setBigha(1); setKattha(0); setDhur(0); }}
                className="hero-preset-chip"
              >
                {t('1 Bigha', '१ बिघा')}
              </button>
            </div>

            {/* Result Display */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#64748b' }}>{t('Total Area (Square Feet)', 'कुल क्षेत्रफल (वर्ग फिट)')}</span>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0b2b5c' }}>
                    {landCalculation.totalSqFt.toLocaleString('en-IN')} <span style={{ fontSize: '12px', fontWeight: 600 }}>{t('Sq. Ft', 'वर्ग फिट')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748b' }}>{t('Square Meters', 'वर्ग मिटर')}</span>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                    {landCalculation.totalSqMtr.toLocaleString('en-IN')} m²
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '6px', paddingTop: '6px', fontSize: '11px', color: '#475569' }}>
                {landRegion === 'hilly' ? (
                  <span>{t('Terai Equivalent:', 'तराई रूपान्तरण:')} <strong>{landCalculation.teraiEquiv.bigha} {t('Bigha', 'बिघा')}, {landCalculation.teraiEquiv.kattha} {t('Kattha', 'कट्ठा')}, {landCalculation.teraiEquiv.dhur} {t('Dhur', 'धुर')}</strong></span>
                ) : (
                  <span>{t('Hilly Equivalent:', 'पहाड रूपान्तरण:')} <strong>{landCalculation.hillyEquiv.ropani} {t('Ropani', 'रोपनी')}, {landCalculation.hillyEquiv.aana} {t('Aana', 'आना')}, {landCalculation.hillyEquiv.paisa} {t('Paisa', 'पैसा')}</strong></span>
                )}
              </div>
            </div>

            <Link
              href="/land"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0b2b5c',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 750,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
              }}
              className="hover-lift btn-tactile"
            >
              <span>{t('Open Full Land Unit Converter →', 'विस्तृत जग्गा नाप क्याल्कुलेटर →')}</span>
            </Link>
          </div>
        )}

        {/* 3. LOAN EMI TAB */}
        {activeTab === 'emi' && (
          <div key="emi" className="tab-panel-smooth" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                {t('Loan Amount', 'ऋण रकम')}
              </label>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#0b2b5c' }}>
                NPR {(loanAmount / 100000).toFixed(1)} {t('Lakhs', 'लाख')}
              </span>
            </div>

            {/* Quick Loan Chips */}
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {[1000000, 2500000, 5000000, 10000000].map((amt) => {
                const isSelected = loanAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmount(amt)}
                    className={`hero-preset-chip ${isSelected ? 'active' : ''}`}
                  >
                    {amt >= 10000000 ? t('1 Crore', '१ करोड') : `${amt / 100000} ${t('Lakh', 'लाख')}`}
                  </button>
                );
              })}
            </div>

            {/* Interest & Tenure Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Interest Rate (% p.a.)', 'ब्याज दर (% प्रति वर्ष)')}</span>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '7px 8px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: 800 }}
                />
              </div>
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Tenure (Years)', 'ऋण अवधि (वर्ष)')}</span>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{ width: '100%', padding: '7px 8px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: 800, backgroundColor: '#ffffff' }}
                >
                  <option value={5}>5 {t('Years', 'वर्ष')}</option>
                  <option value={10}>10 {t('Years', 'वर्ष')}</option>
                  <option value={15}>15 {t('Years', 'वर्ष')}</option>
                  <option value={20}>20 {t('Years', 'वर्ष')}</option>
                  <option value={25}>25 {t('Years', 'वर्ष')}</option>
                </select>
              </div>
            </div>

            {/* EMI Result Card */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>{t('Monthly Installment (EMI)', 'मासिक किस्ता (EMI)')}</span>
                  <div style={{ fontSize: '19px', fontWeight: 900, color: '#0b2b5c' }}>
                    NPR {emiCalculation.monthlyEmi.toLocaleString('en-IN')} <span style={{ fontSize: '11px', fontWeight: 600 }}>/{t('month', 'महिना')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748b' }}>{t('Total Interest', 'कुल ब्याज')}</span>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#dc2626' }}>
                    NPR {(emiCalculation.totalInterest / 100000).toFixed(2)} {t('Lakhs', 'लाख')}
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '6px', paddingTop: '6px', fontSize: '11px', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Total Payment:', 'कुल भुक्तानी:')} NPR {emiCalculation.totalPayment.toLocaleString('en-IN')}</span>
                <span>{t('Rate:', 'दर:')} {interestRate}% p.a.</span>
              </div>
            </div>

            <Link
              href="/emi"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0b2b5c',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 750,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
              }}
              className="hover-lift btn-tactile"
            >
              <span>{t('View Amortization & Repayment Table →', 'विस्तृत बैंक किस्ता तालिका हेर्नुहोस् →')}</span>
            </Link>
          </div>
        )}

        {/* 4. DATE CONVERTER & AGE TAB */}
        {activeTab === 'date' && (
          <div key="date" className="tab-panel-smooth" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                {t('Conversion Direction', 'रूपान्तरण प्रकार')}
              </label>
              <div className="hero-pill-toggle">
                <button
                  type="button"
                  onClick={() => setDateMode('adToBs')}
                  className={`hero-pill-btn ${dateMode === 'adToBs' ? 'active' : ''}`}
                >
                  AD ➔ BS
                </button>
                <button
                  type="button"
                  onClick={() => setDateMode('bsToAd')}
                  className={`hero-pill-btn ${dateMode === 'bsToAd' ? 'active' : ''}`}
                >
                  BS ➔ AD
                </button>
              </div>
            </div>

            {/* Inputs */}
            {dateMode === 'adToBs' ? (
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>
                  {t('English (A.D.) Date', 'अंग्रेजी (A.D.) मिति')}
                </span>
                <input
                  type="date"
                  value={adDateInput}
                  onChange={(e) => setAdDateInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', fontWeight: 700 }}
                />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '6px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Year (BS)', 'वर्ष (वि.सं.)')}</span>
                  <input
                    type="number"
                    value={bsYearInput}
                    onChange={(e) => setBsYearInput(Number(e.target.value))}
                    style={{ width: '100%', padding: '7px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: 800 }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Month', 'महिना')}</span>
                  <select
                    value={bsMonthInput}
                    onChange={(e) => setBsMonthInput(Number(e.target.value))}
                    style={{ width: '100%', padding: '7px 4px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '12px', fontWeight: 700, backgroundColor: '#ffffff' }}
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.num} value={m.num}>{t(m.en, m.bs)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{t('Day (Gathe)', 'गते')}</span>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={bsDayInput}
                    onChange={(e) => setBsDayInput(Number(e.target.value))}
                    style={{ width: '100%', padding: '7px 6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', fontSize: '13px', fontWeight: 800 }}
                  />
                </div>
              </div>
            )}

            {/* Date Result Card */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 12px',
              }}
            >
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>{t('Converted Date', 'रूपान्तरित मिति')}</span>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0b2b5c', marginTop: '2px' }}>
                {t(dateCalculation.formattedEng, dateCalculation.formattedNep)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>
                {t(dateCalculation.formattedNep, dateCalculation.formattedEng)}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '6px', paddingTop: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                🎂 {t('Exact Age:', 'यथार्थ उमेर:')} {dateCalculation.ageYears} {t('Years', 'वर्ष')}, {dateCalculation.ageMonths} {t('Months', 'महिना')}, {dateCalculation.ageDays} {t('Days', 'दिन')}
              </div>
            </div>

            <Link
              href="/date"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0b2b5c',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 750,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
              }}
              className="hover-lift btn-tactile"
            >
              <span>{t('Open Full BS ⇄ AD Date & Age Tool →', 'मिति रूपान्तरण तथा पात्रो खोल्नुहोस् →')}</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
