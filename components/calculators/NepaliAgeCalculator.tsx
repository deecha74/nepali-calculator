'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Cake, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Share2, 
  Award,
  Heart,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { NEPALI_MONTHS, convertAdToBsApprox, toNepaliDigits } from '@/lib/nepaliDate';
import { calculateBsAge, BsDate } from '@/lib/utils/nepaliAge';

export function NepaliAgeCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  // Compute current BS date as default target date
  const todayBs = useMemo(() => {
    return convertAdToBsApprox(new Date());
  }, []);

  // Birth Date state (default 2058-05-15 BS ~ 24-25 yrs old)
  const [birthYear, setBirthYear] = useState<number>(2058);
  const [birthMonth, setBirthMonth] = useState<number>(5);
  const [birthDay, setBirthDay] = useState<number>(15);

  // Target Date state (default today)
  const [targetYear, setTargetYear] = useState<number>(todayBs.year);
  const [targetMonth, setTargetMonth] = useState<number>(todayBs.month);
  const [targetDay, setTargetDay] = useState<number>(todayBs.day);

  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Perform calculation
  const result = useMemo(() => {
    const birth: BsDate = { year: birthYear, month: birthMonth, day: birthDay };
    const target: BsDate = { year: targetYear, month: targetMonth, day: targetDay };
    return calculateBsAge(birth, target);
  }, [birthYear, birthMonth, birthDay, targetYear, targetMonth, targetDay]);

  // Formatter helpers
  const formatNumber = (num: number): string => {
    const str = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(str) : str;
  };

  const birthMonthObj = NEPALI_MONTHS[birthMonth - 1] || NEPALI_MONTHS[0];
  const targetMonthObj = NEPALI_MONTHS[targetMonth - 1] || NEPALI_MONTHS[0];

  const handleCopy = () => {
    const textEn = `Exact Bikram Sambat (BS) Age:
Date of Birth: ${birthYear} ${birthMonthObj.en} ${birthDay} BS
As of Date: ${targetYear} ${targetMonthObj.en} ${targetDay} BS
Exact Age: ${result.years} Years, ${result.months} Months, ${result.days} Days
Total Days Lived: ${result.totalDays.toLocaleString('en-IN')} Days
Next Birthday: in ${result.nextBirthday.monthsRemaining} Months, ${result.nextBirthday.daysRemaining} Days
Zodiac Sign: ${result.rashi.nameEn}
Calculated via Nepali Calc: https://nepalcalc.com/age`;

    const textNe = `वि.सं. उमेर विवरण:
जन्म मिति: वि.सं. ${toNepaliDigits(birthYear)} ${birthMonthObj.bs} ${toNepaliDigits(birthDay)} गते
हिसाब गरिएको मिति: वि.सं. ${toNepaliDigits(targetYear)} ${targetMonthObj.bs} ${toNepaliDigits(targetDay)} गते
खुद उमेर: ${toNepaliDigits(result.years)} वर्ष, ${toNepaliDigits(result.months)} महिना, ${toNepaliDigits(result.days)} दिन
कुल बाँचेको दिन: ${toNepaliDigits(result.totalDays.toLocaleString('ne-NP'))} दिन
आगामी जन्मदिन: ${toNepaliDigits(result.nextBirthday.monthsRemaining)} महिना ${toNepaliDigits(result.nextBirthday.daysRemaining)} दिनमा
राशि: ${result.rashi.nameNe}
नेपाली क्याल्क मार्फत हिसाब गरिएको: https://nepalcalc.com/age`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `I am ${result.years} Years, ${result.months} Months, and ${result.days} Days old today in Bikram Sambat! Check your exact BS age: https://nepalcalc.com/age`
    );
    const messageNe = encodeURIComponent(
      `वि.सं. अनुसार मेरो उमेर आज ${toNepaliDigits(result.years)} वर्ष, ${toNepaliDigits(result.months)} महिना, ${toNepaliDigits(result.days)} दिन पुग्यो! आफ्नो उमेर हिसाब गर्नुहोस्: https://nepalcalc.com/age`
    );

    window.open(`https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Generate Year options from 2000 BS to 2090 BS
  const bsYearOptions = useMemo(() => {
    const list = [];
    for (let y = 2090; y >= 2000; y--) {
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
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              {t('Bikram Sambat Patro', 'विक्रम संवत् क्यालेन्डर')}
            </span>
            <span className="badge badge-neutral">
              {t('Years, Months & Days', 'वर्ष, महिना र दिन')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('Bikram Sambat Exact Age & Milestones Calculator', 'वि.सं. उमेर तथा कोसेढुङ्गा क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Calculate your precise age in Nepali Bikram Sambat date format for Loksewa, passport, driving license, citizenship, and school admissions.',
              'लोकसेवा आयोग, राहदानी, सवारी चालक अनुमतिपत्र, नागरिकता तथा व्यक्तिगत फारमका लागि आफ्नो वि.सं. जन्म मितिबाट खुद उमेर निकाल्नुहोस्।'
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
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Details', 'विवरण कपि')}</span>
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
        {/* Left Column: Date Pickers */}
        <div>
          {/* Birth Date Section */}
          <div style={{ 
            background: 'var(--bg-elevated, #f8fafc)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '12px', 
            padding: '20px', 
            marginBottom: '20px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Cake size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {t('Date of Birth (Bikram Sambat)', 'जन्म मिति (वि.सं.)')}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr', gap: '10px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Year', 'वर्ष')}
                </label>
                <select
                  className="select-input"
                  value={birthYear}
                  onChange={(e) => setBirthYear(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
                >
                  {bsYearOptions.map((y) => (
                    <option key={y} value={y}>
                      {isNe ? toNepaliDigits(y) : y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Month', 'महिना')}
                </label>
                <select
                  className="select-input"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
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
                  {t('Day (Gate)', 'गते')}
                </label>
                <select
                  className="select-input"
                  value={birthDay}
                  onChange={(e) => setBirthDay(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {isNe ? toNepaliDigits(d) : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Target / Calculate As Of Date */}
          <div style={{ 
            background: 'var(--bg-elevated, #f8fafc)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '12px', 
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {t('Calculate Age As Of (Target Date)', 'हिसाब गर्ने मिति (वि.सं.)')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTargetYear(todayBs.year);
                  setTargetMonth(todayBs.month);
                  setTargetDay(todayBs.day);
                }}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '14px' }}
              >
                {t('Set to Today', 'आजको मिति')}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr', gap: '10px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Year', 'वर्ष')}
                </label>
                <select
                  className="select-input"
                  value={targetYear}
                  onChange={(e) => setTargetYear(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
                >
                  {bsYearOptions.map((y) => (
                    <option key={y} value={y}>
                      {isNe ? toNepaliDigits(y) : y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Month', 'महिना')}
                </label>
                <select
                  className="select-input"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
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
                  {t('Day (Gate)', 'गते')}
                </label>
                <select
                  className="select-input"
                  value={targetDay}
                  onChange={(e) => setTargetDay(parseInt(e.target.value))}
                  style={{ fontWeight: 600 }}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {isNe ? toNepaliDigits(d) : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Zodiac / Rashifal Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontSize: '32px' }}>{result.rashi.symbol}</div>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#b45309', fontWeight: 700 }}>
                  {t('Solar Zodiac Sign', 'सौर्य राशि')}
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {isNe ? result.rashi.nameNe : result.rashi.nameEn}
                </div>
              </div>
            </div>
            <span className="badge badge-amber" style={{ fontSize: '11px' }}>
              {isNe ? `तत्व: ${result.rashi.elementNe}` : `Element: ${result.rashi.elementEn}`}
            </span>
          </div>
        </div>

        {/* Right Column: Exact Age Display & Eligibility Badges */}
        <div>
          {/* Main Hero Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.06) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Exact Elapsed Age', 'तपाईंको खुद उमेर')}
              </span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} />
                {t('Verified BS Calculation', 'वि.सं. प्रमाणित')}
              </span>
            </div>

            {/* Giant Age Units */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', marginBottom: '18px' }}>
              <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '14px 8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                  {formatNumber(result.years)}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Years', 'वर्ष')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '14px 8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                  {formatNumber(result.months)}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Months', 'महिना')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '14px 8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                  {formatNumber(result.days)}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Days', 'दिन')}
                </div>
              </div>
            </div>

            {/* Next Birthday Banner */}
            <div style={{ 
              background: 'rgba(59, 130, 246, 0.08)', 
              borderRadius: '10px', 
              padding: '12px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              fontSize: '13px',
              color: 'var(--text-primary)'
            }}>
              <Cake size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <strong>{t('Upcoming Birthday:', 'आगामी जन्मदिन:')}</strong>{' '}
                {isNe 
                  ? `${toNepaliDigits(result.nextBirthday.monthsRemaining)} महिना ${toNepaliDigits(result.nextBirthday.daysRemaining)} दिन बाँकी (लगभग ${toNepaliDigits(result.nextBirthday.totalDaysRemaining)} दिन)`
                  : `In ${result.nextBirthday.monthsRemaining} Months and ${result.nextBirthday.daysRemaining} Days (~${result.nextBirthday.totalDaysRemaining} days)`}
              </div>
            </div>
          </div>

          {/* Life Milestones Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Total Days', 'कुल दिन')}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{formatNumber(result.totalDays)}</div>
            </div>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Total Weeks', 'कुल हप्ता')}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{formatNumber(result.totalWeeks)}</div>
            </div>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Total Months', 'कुल महिना')}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{formatNumber(result.totalMonths)}</div>
            </div>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Hours Lived', 'घण्टा')}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{formatNumber(result.totalHours)}</div>
            </div>
          </div>

          {/* Legal / Government Eligibility Badges */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              {t('Official Nepal Government Eligibility Status', 'नेपाल सरकारको आधिकारिक मापदण्ड स्थिति')}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{t('Nepali Citizenship (१६ वर्ष+)', 'नेपाली नागरिकता (१६ वर्ष+)')}</span>
                <span className={`badge ${result.eligibility.citizenship ? 'badge-emerald' : 'badge-neutral'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {result.eligibility.citizenship ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {result.eligibility.citizenship ? t('Eligible', 'योग्य') : t('Not Eligible', 'अयोग्य')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{t('Driving License & Voter ID (१८ वर्ष+)', 'सवारी चालक अनुमति तथा मतदाता (१८ वर्ष+)')}</span>
                <span className={`badge ${result.eligibility.drivingLicense ? 'badge-emerald' : 'badge-neutral'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {result.eligibility.drivingLicense ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {result.eligibility.drivingLicense ? t('Eligible', 'योग्य') : t('Not Eligible', 'अयोग्य')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{t('Loksewa Kharidar / Nasu (१८ - ३५/४० वर्ष)', 'लोकसेवा खरिदार / नासु (१८ - ३५/४० वर्ष)')}</span>
                <span className={`badge ${result.eligibility.lokSewaGeneralFemale ? 'badge-emerald' : 'badge-neutral'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {result.eligibility.lokSewaGeneralFemale ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {result.eligibility.lokSewaGeneralFemale ? t('Eligible', 'योग्य') : t('Age Bar Exceeded', 'उमेर हद नाघेको')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{t('Foreign Employment Labor Permit (१८ - ६० वर्ष)', 'वैदेशिक रोजगार श्रम स्वीकृति (१८ - ६० वर्ष)')}</span>
                <span className={`badge ${result.eligibility.foreignEmployment ? 'badge-emerald' : 'badge-neutral'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {result.eligibility.foreignEmployment ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {result.eligibility.foreignEmployment ? t('Eligible', 'योग्य') : t('Not Eligible', 'अयोग्य')}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{t('Senior Citizen Allowance (६८ वर्ष+)', 'ज्येष्ठ नागरिक सामाजिक सुरक्षा भत्ता (६८ वर्ष+)')}</span>
                <span className={`badge ${result.eligibility.seniorCitizenAllowance ? 'badge-emerald' : 'badge-neutral'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {result.eligibility.seniorCitizenAllowance ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {result.eligibility.seniorCitizenAllowance ? t('Eligible for Allowance', 'भत्ता योग्य') : t('Under Age', 'उमेर नपुगेको')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
