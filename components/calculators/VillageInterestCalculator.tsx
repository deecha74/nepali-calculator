'use client';

import React, { useState, useMemo } from 'react';
import { 
  Coins, 
  Calendar, 
  Copy, 
  Check, 
  Share2, 
  FileText, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Receipt,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { NEPALI_MONTHS, convertAdToBsApprox, toNepaliDigits } from '@/lib/nepaliDate';
import { calculateVillageInterest, VillageInterestParams } from '@/lib/utils/villageInterest';

export function VillageInterestCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const todayBs = useMemo(() => convertAdToBsApprox(new Date()), []);

  // Principal amount (Default 1 Lakh)
  const [principal, setPrincipal] = useState<number>(100000);

  // Start Date (Default 1 year prior to today)
  const [startYear, setStartYear] = useState<number>(todayBs.year - 1);
  const [startMonth, setStartMonth] = useState<number>(todayBs.month);
  const [startDay, setStartDay] = useState<number>(todayBs.day);

  // Settlement Date (Default today)
  const [endYear, setEndYear] = useState<number>(todayBs.year);
  const [endMonth, setEndMonth] = useState<number>(todayBs.month);
  const [endDay, setEndDay] = useState<number>(todayBs.day);

  // Sayakada Rate (Default 2 = 2% per month)
  const [sayakadaRate, setSayakadaRate] = useState<number>(2);

  // Compound annually toggle
  const [isCompoundedYearly, setIsCompoundedYearly] = useState<boolean>(false);

  // Lender & Borrower names for optional voucher
  const [lenderName, setLenderName] = useState<string>('');
  const [borrowerName, setBorrowerName] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Perform calculation
  const result = useMemo(() => {
    const params: VillageInterestParams = {
      principal,
      startDate: { year: startYear, month: startMonth, day: startDay },
      endDate: { year: endYear, month: endMonth, day: endDay },
      sayakadaRate,
      isCompoundedYearly,
    };
    return calculateVillageInterest(params);
  }, [principal, startYear, startMonth, startDay, endYear, endMonth, endDay, sayakadaRate, isCompoundedYearly]);

  // Formatter helpers
  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(formatted) : formatted;
  };

  const startMonthObj = NEPALI_MONTHS[startMonth - 1] || NEPALI_MONTHS[0];
  const endMonthObj = NEPALI_MONTHS[endMonth - 1] || NEPALI_MONTHS[0];

  const handleCopy = () => {
    const textEn = `Nepali Village Interest (साहुको सयकडा ब्याज हिसाब):
Principal Amount: NPR ${principal.toLocaleString('en-IN')}
Loan Taken Date: ${startYear} ${startMonthObj.en} ${startDay} BS
Settlement Date: ${endYear} ${endMonthObj.en} ${endDay} BS
Duration: ${result.elapsedYears} Years, ${result.elapsedMonths} Months, ${result.elapsedDays} Days
Interest Rate: Sayakada ${sayakadaRate} (${result.annualEquivalentRate}% p.a.)
Interest Method: ${isCompoundedYearly ? 'Yearly Compounded (साँवा थप)' : 'Simple Interest (साधारण)'}
Monthly Interest: NPR ${result.monthlyInterestInitial.toLocaleString('en-IN')}
Total Interest Accumulated: NPR ${result.totalInterest.toLocaleString('en-IN')}
Total Settlement Amount: NPR ${result.totalPayable.toLocaleString('en-IN')}
Calculated via Nepali Calc: https://nepalcalc.com/village-interest`;

    const textNe = `गाउँघरको सयकडा ब्याज हिसाब विवरण:
साँवा रकम: रू. ${toNepaliDigits(principal.toLocaleString('ne-NP'))}
ऋण लिएको मिति: वि.सं. ${toNepaliDigits(startYear)} ${startMonthObj.bs} ${toNepaliDigits(startDay)} गते
हिसाब गर्ने मिति: वि.सं. ${toNepaliDigits(endYear)} ${endMonthObj.bs} ${toNepaliDigits(endDay)} गते
अवधि: ${toNepaliDigits(result.elapsedYears)} वर्ष, ${toNepaliDigits(result.elapsedMonths)} महिना, ${toNepaliDigits(result.elapsedDays)} दिन
ब्याजदर: सयकडा ${toNepaliDigits(sayakadaRate)} (वार्षिक ${toNepaliDigits(result.annualEquivalentRate)}%)
हिसाब प्रणाली: ${isCompoundedYearly ? 'वार्षिक चक्रिय (साँवा थप)' : 'साधारण ब्याज'}
मासिक ब्याज: रू. ${toNepaliDigits(result.monthlyInterestInitial.toLocaleString('ne-NP'))}
जम्मा ब्याज: रू. ${toNepaliDigits(result.totalInterest.toLocaleString('ne-NP'))}
कुल तिर्नुपर्ने रकम (साँवा+ब्याज): रू. ${toNepaliDigits(result.totalPayable.toLocaleString('ne-NP'))}
नेपाली क्याल्क मार्फत हिसाब गरिएको: https://nepalcalc.com/village-interest`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `Village Loan Calculation: Principal NPR ${principal.toLocaleString('en-IN')}, Duration ${result.elapsedYears}y ${result.elapsedMonths}m ${result.elapsedDays}d @ Sayakada ${sayakadaRate}. Total Interest: NPR ${result.totalInterest.toLocaleString('en-IN')}. Total Payable: NPR ${result.totalPayable.toLocaleString('en-IN')}. Verified on: https://nepalcalc.com/village-interest`
    );
    const messageNe = encodeURIComponent(
      `ऋण हिसाब विवरण: साँवा रू. ${toNepaliDigits(principal.toLocaleString('ne-NP'))}, अवधि ${toNepaliDigits(result.elapsedYears)} वर्ष ${toNepaliDigits(result.elapsedMonths)} महिना ${toNepaliDigits(result.elapsedDays)} दिन, सयकडा ${toNepaliDigits(sayakadaRate)} का दरले जम्मा ब्याज रू. ${toNepaliDigits(result.totalInterest.toLocaleString('ne-NP'))} र कुल तिर्नुपर्ने रू. ${toNepaliDigits(result.totalPayable.toLocaleString('ne-NP'))}। हिसाब हेर्नुहोस्: https://nepalcalc.com/village-interest`
    );

    window.open(`https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const presetPrincipals = [25000, 50000, 100000, 200000, 500000, 1000000];

  const bsYearOptions = useMemo(() => {
    const list = [];
    for (let y = 2090; y >= 2050; y--) {
      list.push(y);
    }
    return list;
  }, []);

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Coins size={12} />
              {t('Sayakada Interest (सयकडा १, २, ३)', 'सयकडा ब्याज हिसाब (१, २, ३)')}
            </span>
            <span className="badge badge-neutral">
              {t('Bikram Sambat Date Duration', 'वि.सं. मिति अवधि')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('Village Sahu Byaj (Sayakada Interest) Calculator', 'गाउँघरको सयकडा ब्याज क्याल्कुलेटर (साहु महाजनको ब्याज हिसाब)')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Calculate traditional Nepali village lending interest (सयकडा २, ३) between two Bikram Sambat calendar dates with transparent settlement statements.',
              'गाउँघरमा साहु-महाजन तथा लेनदेनमा प्रयोग हुने सयकडा १, १.५, २, ३ ब्याज, वि.सं. ऋण लिएको र हिसाब गर्ने मिति अनुसार साँवा र ब्याजको पारदर्शी हिसाब निकाल्नुहोस्।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleCopy} 
            className="btn-secondary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Statement', 'हिसाब कपि')}</span>
          </button>
          <button 
            onClick={handleWhatsAppShare} 
            className="btn-primary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#25D366', borderColor: '#25D366' }}
          >
            <Share2 size={16} />
            <span>{t('Share on WhatsApp', 'ह्वाट्सएप सेयर')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Column: Loan Inputs */}
        <div>
          {/* Principal Amount Input */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {t('Principal Loan Amount (साँवा रकम)', 'साँवा रकम (Principal)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>
                {isNe ? 'रू.' : 'NPR'}
              </span>
              <input
                type="number"
                min="100"
                step="1000"
                className="number-input"
                value={principal || ''}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                style={{ paddingLeft: '55px', fontSize: '18px', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Preset Principal Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
            {presetPrincipals.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrincipal(p)}
                className={`btn-secondary ${principal === p ? 'active' : ''}`}
                style={{ 
                  padding: '5px 11px', 
                  fontSize: '12px', 
                  borderRadius: '16px',
                  borderColor: principal === p ? 'var(--primary)' : 'var(--border-subtle)',
                  background: principal === p ? 'var(--primary-light, #eff6ff)' : 'transparent',
                  color: principal === p ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                {isNe ? `रू. ${formatNumber(p)}` : `NPR ${formatNumber(p)}`}
              </button>
            ))}
          </div>

          {/* Loan Start Date (BS) */}
          <div style={{ 
            background: 'var(--bg-elevated, #f8fafc)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '16px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Calendar size={16} color="var(--primary)" />
              <label className="input-label" style={{ fontWeight: 700, margin: 0 }}>
                {t('Loan Taken Date in BS (ऋण लिएको मिति)', 'ऋण लिएको मिति (वि.सं.)')}
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr', gap: '8px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Year', 'वर्ष')}
                </label>
                <select
                  className="select-input"
                  value={startYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value))}
                >
                  {bsYearOptions.map((y) => (
                    <option key={y} value={y}>{isNe ? toNepaliDigits(y) : y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Month', 'महिना')}
                </label>
                <select
                  className="select-input"
                  value={startMonth}
                  onChange={(e) => setStartMonth(parseInt(e.target.value))}
                >
                  {NEPALI_MONTHS.map((m) => (
                    <option key={m.num} value={m.num}>
                      {isNe ? m.bs : m.en} ({isNe ? toNepaliDigits(m.num) : m.num})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Day', 'गते')}
                </label>
                <select
                  className="select-input"
                  value={startDay}
                  onChange={(e) => setStartDay(parseInt(e.target.value))}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{isNe ? toNepaliDigits(d) : d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Settlement / Current Date (BS) */}
          <div style={{ 
            background: 'var(--bg-elevated, #f8fafc)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '20px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--primary)" />
                <label className="input-label" style={{ fontWeight: 700, margin: 0 }}>
                  {t('Settlement Date in BS (हिसाब गर्ने मिति)', 'हिसाब गर्ने मिति (वि.सं.)')}
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEndYear(todayBs.year);
                  setEndMonth(todayBs.month);
                  setEndDay(todayBs.day);
                }}
                className="btn-secondary"
                style={{ padding: '3px 8px', fontSize: '11px', borderRadius: '12px' }}
              >
                {t('Set to Today', 'आजको मिति')}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr', gap: '8px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Year', 'वर्ष')}
                </label>
                <select
                  className="select-input"
                  value={endYear}
                  onChange={(e) => setEndYear(parseInt(e.target.value))}
                >
                  {bsYearOptions.map((y) => (
                    <option key={y} value={y}>{isNe ? toNepaliDigits(y) : y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Month', 'महिना')}
                </label>
                <select
                  className="select-input"
                  value={endMonth}
                  onChange={(e) => setEndMonth(parseInt(e.target.value))}
                >
                  {NEPALI_MONTHS.map((m) => (
                    <option key={m.num} value={m.num}>
                      {isNe ? m.bs : m.en} ({isNe ? toNepaliDigits(m.num) : m.num})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Day', 'गते')}
                </label>
                <select
                  className="select-input"
                  value={endDay}
                  onChange={(e) => setEndDay(parseInt(e.target.value))}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{isNe ? toNepaliDigits(d) : d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interest Rate Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '8px' }}>
              {t('Sayakada Monthly Interest Rate (सयकडा ब्याज दर)', 'सयकडा ब्याज दर (मासिक %)')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '10px' }}>
              {[1, 1.5, 2, 2.5, 3].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSayakadaRate(r)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: `1.5px solid ${sayakadaRate === r ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    background: sayakadaRate === r ? 'var(--primary)' : 'var(--bg-card)',
                    color: sayakadaRate === r ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {isNe ? `सयकडा ${toNepaliDigits(r)}` : `Sayakada ${r}`}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {isNe 
                ? `सयकडा ${toNepaliDigits(sayakadaRate)} = प्रति महिना ${toNepaliDigits(sayakadaRate)}% (वार्षिक ${toNepaliDigits(result.annualEquivalentRate)}%)`
                : `Sayakada ${sayakadaRate} = ${sayakadaRate}% per month (${result.annualEquivalentRate}% per year)`}
            </div>
          </div>

          {/* Compounding Toggle */}
          <div style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                {t('Yearly Compounding (साँवा थप)', 'वर्षे चक्रिय (प्रत्येक वर्ष ब्याज साँवामा थपिने)')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t('In traditional lending, unpaid interest is added to the principal each full year.', 'गाउँघरको चलन अनुसार प्रत्येक वर्ष ब्याजलाई साँवामा जोडेर नयाँ ब्याज निकालिन्छ।')}
              </div>
            </div>
            <input
              type="checkbox"
              id="compoundCheck"
              checked={isCompoundedYearly}
              onChange={(e) => setIsCompoundedYearly(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
          </div>
        </div>

        {/* Right Column: Settlement Statement Card */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Duration Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Loan Settlement Summary', 'ऋण भुक्तानी हिसाब')}
              </span>
              <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                {isNe 
                  ? `${toNepaliDigits(result.elapsedYears)} वर्ष, ${toNepaliDigits(result.elapsedMonths)} महिना, ${toNepaliDigits(result.elapsedDays)} दिन`
                  : `${result.elapsedYears}y, ${result.elapsedMonths}m, ${result.elapsedDays}d`}
              </span>
            </div>

            {/* Total Settlement Amount (Big Hero) */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {t('Total Settlement Payable (Principal + Interest):', 'कुल भुक्तानी गर्नुपर्ने रकम (साँवा + ब्याज):')}
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1 }}>
                {isNe ? `रू. ${formatNumber(result.totalPayable)}` : `NPR ${formatNumber(result.totalPayable)}`}
              </div>
            </div>

            {/* Total Interest Component */}
            <div style={{ 
              background: 'var(--bg-card)', 
              borderRadius: '12px', 
              padding: '14px 16px', 
              border: '1px solid var(--border-subtle)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('Total Accumulated Interest (जम्मा ब्याज):', 'जम्मा चढेको कुल ब्याज:')}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#b45309' }}>
                  {isNe ? `रू. ${formatNumber(result.totalInterest)}` : `NPR ${formatNumber(result.totalInterest)}`}
                </span>
              </div>
            </div>

            {/* Micro Breakdown Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '18px' }}>
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', textAlign: 'center', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Monthly Interest', 'मासिक ब्याज')}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {isNe ? `रू. ${formatNumber(result.monthlyInterestInitial)}` : `NPR ${formatNumber(result.monthlyInterestInitial)}`}
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px', textAlign: 'center', background: 'var(--bg-card)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Daily Interest', 'दैनिक ब्याज')}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {isNe ? `रू. ${formatNumber(Math.round(result.dailyInterestInitial))}` : `NPR ${formatNumber(Math.round(result.dailyInterestInitial))}`}
                </div>
              </div>
            </div>

            {/* Annual Compounding Breakdown if applicable */}
            {result.breakdownYears && result.breakdownYears.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {t('Annual Compounding Capitalization Breakdown:', 'वर्षे चक्रिय ब्याज तथा साँवा वृद्धि विवरण:')}
                </div>
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--bg-muted, #f1f5f9)' }}>
                      <tr>
                        <th style={{ padding: '6px 8px' }}>{t('Year', 'वर्ष')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Opening', 'सुरु साँवा')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Interest', 'ब्याज')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Closing', 'अन्तिम साँवा')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.breakdownYears.map((row) => (
                        <tr key={row.yearNumber} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '6px 8px' }}>{formatNumber(row.yearNumber)}</td>
                          <td style={{ padding: '6px 8px' }}>{formatNumber(row.openingPrincipal)}</td>
                          <td style={{ padding: '6px 8px', color: '#b45309', fontWeight: 600 }}>{formatNumber(row.interestEarned)}</td>
                          <td style={{ padding: '6px 8px', fontWeight: 700 }}>{formatNumber(row.closingPrincipal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Legal Notice */}
            <div style={{ 
              borderTop: '1px solid var(--border-subtle)', 
              paddingTop: '14px', 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '8px', 
              fontSize: '11px', 
              color: 'var(--text-muted)' 
            }}>
              <ShieldAlert size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'Legal Note: Under Section 478 of the National Civil Code Act 2074 (मुलुकी देवानी संहिता), informal personal loans in Nepal are legally capped at a maximum of 10% annual interest in court proceedings. Excess interest charged above 10% p.a. cannot be legally enforced.',
                  'कानूनी जानकारी: मुलुकी देवानी संहिता २०७४ को दफा ४७८ अनुसार व्यक्तिगत लेनदेनमा वार्षिक १० प्रतिशतभन्दा बढी ब्याज लिन पाइँदैन। अदालत वा कानूनी कारबाहीमा वार्षिक १०% भन्दा बढी ब्याज दाबी गर्न मिल्दैन।'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
