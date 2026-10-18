'use client';

import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Info, 
  HelpCircle,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { NEPALI_MONTHS, convertBsToAdApprox, convertAdToBsApprox, toNepaliDigits } from '@/lib/nepaliDate';

export type LokSewaPostType = 'kharidar' | 'nasu' | 'officer' | 'health' | 'security';
export type LokSewaCategory = 'male' | 'female' | 'disabled' | 'permanent_staff';

interface PostRule {
  id: LokSewaPostType;
  titleNep: string;
  titleEng: string;
  minAge: number;
  maxAgeMale: number;
  maxAgeFemale: number;
  maxAgeDisabled: number;
  maxAgeHealth?: number;
  note: string;
}

const POST_RULES: Record<LokSewaPostType, PostRule> = {
  kharidar: {
    id: 'kharidar',
    titleNep: 'खरिदार वा सो सरह (राजपत्र अनंकित द्वितीय)',
    titleEng: 'Kharidar / Assistant Level 4 (Non-Gazetted 2nd)',
    minAge: 18,
    maxAgeMale: 35,
    maxAgeFemale: 40,
    maxAgeDisabled: 40,
    note: 'न्यूनतम १८ वर्ष पूरा भई ३५ वर्ष (महिला/अपाङ्गताको हकमा ४० वर्ष) ननाघेको हुनुपर्ने।',
  },
  nasu: {
    id: 'nasu',
    titleNep: 'नायब सुब्बा वा सो सरह (राजपत्र अनंकित प्रथम)',
    titleEng: 'Nayab Subba (Non-Gazetted 1st)',
    minAge: 18,
    maxAgeMale: 35,
    maxAgeFemale: 40,
    maxAgeDisabled: 40,
    note: 'न्यूनतम १८ वर्ष पूरा भई ३५ वर्ष (महिला/अपाङ्गताको हकमा ४० वर्ष) ननाघेको हुनुपर्ने।',
  },
  officer: {
    id: 'officer',
    titleNep: 'शाखा अधिकृत वा सो सरह (राजपत्रांकित तृतीय)',
    titleEng: 'Section Officer (Gazetted 3rd Class)',
    minAge: 21,
    maxAgeMale: 35,
    maxAgeFemale: 40,
    maxAgeDisabled: 40,
    note: 'अधिकृत तहका लागि न्यूनतम २१ वर्ष पूरा भई ३५ वर्ष (महिला/अपाङ्गताको हकमा ४० वर्ष) ननाघेको हुनुपर्ने।',
  },
  health: {
    id: 'health',
    titleNep: 'स्वास्थ्य सेवा (Health Services - अधिकृत / सहायक)',
    titleEng: 'Nepal Health Services (Levels 4, 5, 7, 8)',
    minAge: 18,
    maxAgeMale: 45,
    maxAgeFemale: 45,
    maxAgeDisabled: 45,
    maxAgeHealth: 45,
    note: 'स्वास्थ्य सेवा ऐन २०५३ बमोजिम स्वास्थ्य सेवाका पदहरूमा महिला तथा पुरुष दुवैका लागि अधिकतम उमेर ४५ वर्ष रहनेछ।',
  },
  security: {
    id: 'security',
    titleNep: 'नेपाल प्रहरी / सशस्त्र / सेना (अधिकृत क्याडेट / जवान)',
    titleEng: 'Security Forces (Nepal Police / APF / Army)',
    minAge: 18,
    maxAgeMale: 24, // Cadet limit
    maxAgeFemale: 24,
    maxAgeDisabled: 24,
    note: 'सुरक्षा निकायको इन्स्पेक्टर/क्याडेटका लागि सामान्यतया अधिकतम २४ वा २५ वर्ष (जवानका लागि २३ वर्ष) तोकिएको हुन्छ।',
  },
};

export function LokSewaAgeCalculator() {
  const [dateType, setDateType] = useState<'BS' | 'AD'>('BS');

  // BS DOB
  const [bsYear, setBsYear] = useState<number>(2058);
  const [bsMonth, setBsMonth] = useState<number>(5);
  const [bsDay, setBsDay] = useState<number>(15);

  // AD DOB
  const [adDob, setAdDob] = useState<string>('2001-08-31');

  // Deadline Date (Default: Today / Active Ad Deadline)
  const [deadlineBsYear, setDeadlineBsYear] = useState<number>(2083);
  const [deadlineBsMonth, setDeadlineBsMonth] = useState<number>(7);
  const [deadlineBsDay, setDeadlineBsDay] = useState<number>(1);

  // Selections
  const [selectedPost, setSelectedPost] = useState<LokSewaPostType>('officer');
  const [selectedCategory, setSelectedCategory] = useState<LokSewaCategory>('male');

  // Convert DOB to AD Date object
  const dobDate = useMemo(() => {
    if (dateType === 'BS') {
      return convertBsToAdApprox(bsYear, bsMonth, bsDay);
    }
    return new Date(adDob || '2000-01-01');
  }, [dateType, bsYear, bsMonth, bsDay, adDob]);

  // Convert Deadline to AD Date object
  const deadlineDate = useMemo(() => {
    return convertBsToAdApprox(deadlineBsYear, deadlineBsMonth, deadlineBsDay);
  }, [deadlineBsYear, deadlineBsMonth, deadlineBsDay]);

  // Accurate Age Calculation on Deadline
  const age = useMemo(() => {
    let y = deadlineDate.getFullYear() - dobDate.getFullYear();
    let m = deadlineDate.getMonth() - dobDate.getMonth();
    let d = deadlineDate.getDate() - dobDate.getDate();

    if (d < 0) {
      m -= 1;
      d += 30;
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    const totalDays = Math.floor((deadlineDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years: Math.max(0, y),
      months: Math.max(0, m),
      days: Math.max(0, d),
      totalDays: Math.max(0, totalDays),
    };
  }, [dobDate, deadlineDate]);

  // Eligibility evaluation
  const postRule = POST_RULES[selectedPost];

  const eligibility = useMemo(() => {
    // Permanent serving civil servants have no upper age limit (निजामती सेवा नियमावली)
    if (selectedCategory === 'permanent_staff') {
      const isUnderage = age.years < postRule.minAge;
      return {
        status: isUnderage ? 'underage' : 'eligible',
        maxLimit: 99,
        minLimit: postRule.minAge,
        reason: isUnderage 
          ? `न्यूनतम ${postRule.minAge} वर्ष उमेर पुगेको हुनुपर्दछ।` 
          : 'बहालवाला स्थायी निजामती कर्मचारीका लागि माथिल्लो उमेर हद लाग्दैन।',
        yearsLeft: 99,
      };
    }

    let maxLimit = postRule.maxAgeMale;
    if (selectedCategory === 'female' || selectedCategory === 'disabled') {
      maxLimit = postRule.maxAgeFemale;
    }
    if (selectedPost === 'health') {
      maxLimit = 45;
    }

    if (age.years < postRule.minAge) {
      return {
        status: 'underage',
        maxLimit,
        minLimit: postRule.minAge,
        reason: `तपाईंको उमेर न्यूनतम ${postRule.minAge} वर्ष पुगेको छैन। (अझै ${postRule.minAge - age.years} वर्ष बाँकी)`,
        yearsLeft: postRule.minAge - age.years,
      };
    }

    // Check if exceeded max age: Exceeded if years > maxLimit or (years == maxLimit && (months > 0 || days > 0))
    const isOverage = age.years > maxLimit || (age.years === maxLimit && (age.months > 0 || age.days > 0));

    if (isOverage) {
      return {
        status: 'overage',
        maxLimit,
        minLimit: postRule.minAge,
        reason: `उम्मेदवारको उमेर अधिकतम ${maxLimit} वर्ष नाघिसकेको छ।`,
        yearsLeft: 0,
      };
    }

    // Eligible
    const yearsLeft = maxLimit - age.years;
    return {
      status: 'eligible',
      maxLimit,
      minLimit: postRule.minAge,
      reason: `तपाईं लोक सेवा आयोगको यस पदका लागि तोकिएको उमेर मापदण्ड अनुसार पूर्ण योग्य हुनुहुन्छ।`,
      yearsLeft,
    };
  }, [age, postRule, selectedCategory, selectedPost]);

  return (
    <div className="calculator-card" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div 
          style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            backgroundColor: '#fee2e2', 
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Award size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            लोक सेवा आयोग उमेर तथा योग्यता क्याल्कुलेटर
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Civil Service Act 2049 & Public Service Commission (PSC) Age Criteria
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* DOB Section */}
        <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="var(--primary)" />
              जन्म मिति (Date of Birth)
            </label>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-primary)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={() => setDateType('BS')}
                style={{
                  padding: '3px 8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: dateType === 'BS' ? 'var(--primary)' : 'transparent',
                  color: dateType === 'BS' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                वि.सं. (BS)
              </button>
              <button
                type="button"
                onClick={() => setDateType('AD')}
                style={{
                  padding: '3px 8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: dateType === 'AD' ? 'var(--primary)' : 'transparent',
                  color: dateType === 'AD' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                ई.सं. (AD)
              </button>
            </div>
          </div>

          {dateType === 'BS' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>साल (Year)</label>
                <select
                  value={bsYear}
                  onChange={(e) => setBsYear(Number(e.target.value))}
                  className="input-field"
                  style={{ width: '100%', padding: '8px' }}
                >
                  {Array.from({ length: 60 }, (_, i) => 2083 - i).map((y) => (
                    <option key={y} value={y}>{y} ({toNepaliDigits(y)})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>महिना (Month)</label>
                <select
                  value={bsMonth}
                  onChange={(e) => setBsMonth(Number(e.target.value))}
                  className="input-field"
                  style={{ width: '100%', padding: '8px' }}
                >
                  {NEPALI_MONTHS.map((m) => (
                    <option key={m.num} value={m.num}>{m.num}. {m.bs} ({m.en})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>गते (Day)</label>
                <select
                  value={bsDay}
                  onChange={(e) => setBsDay(Number(e.target.value))}
                  className="input-field"
                  style={{ width: '100%', padding: '8px' }}
                >
                  {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d} ({toNepaliDigits(d)})</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="date"
                value={adDob}
                onChange={(e) => setAdDob(e.target.value)}
                className="input-field"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          )}
        </div>

        {/* Deadline Date */}
        <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Clock size={16} color="var(--primary)" />
            विज्ञापनको अन्तिम दरखास्त मिति (BS Deadline)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>साल (Year)</label>
              <select
                value={deadlineBsYear}
                onChange={(e) => setDeadlineBsYear(Number(e.target.value))}
                className="input-field"
                style={{ width: '100%', padding: '8px' }}
              >
                {[2081, 2082, 2083, 2084, 2085].map((y) => (
                  <option key={y} value={y}>{y} ({toNepaliDigits(y)})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>महिना (Month)</label>
              <select
                value={deadlineBsMonth}
                onChange={(e) => setDeadlineBsMonth(Number(e.target.value))}
                className="input-field"
                style={{ width: '100%', padding: '8px' }}
              >
                {NEPALI_MONTHS.map((m) => (
                  <option key={m.num} value={m.num}>{m.num}. {m.bs}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>गते (Day)</label>
              <select
                value={deadlineBsDay}
                onChange={(e) => setDeadlineBsDay(Number(e.target.value))}
                className="input-field"
                style={{ width: '100%', padding: '8px' }}
              >
                {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            * लोक सेवा आयोगको विज्ञापनमा दरखास्त बुझाउने पहिलो तोकिएको अन्तिम मिति (दोब्बर दस्तुर अगाडि)
          </p>
        </div>
      </div>

      {/* Post & Category Selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Briefcase size={16} color="var(--primary)" />
            दरखास्त दिने पद / सेवा (Post / Service)
          </label>
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value as LokSewaPostType)}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          >
            <option value="kharidar">खरिदार वा सो सरह (तह ४ / रा.अ. द्वितीय - Min 18)</option>
            <option value="nasu">नायब सुब्बा वा सो सरह (तह ५ / रा.अ. प्रथम - Min 18)</option>
            <option value="officer">शाखा अधिकृत (तह ७ / रा.प. तृतीय - Min 21)</option>
            <option value="health">स्वास्थ्य सेवा (अधिकृत/सहायक - Max 45 वर्ष)</option>
            <option value="security">सुरक्षा निकाय (नेपाल प्रहरी / सशस्त्र / सेना क्याडेट)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <UserCheck size={16} color="var(--primary)" />
            उम्मेदवार समूह / वर्ग (Category)
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as LokSewaCategory)}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          >
            <option value="male">पुरुष उम्मेदवार (Male - Max 35)</option>
            <option value="female">महिला उम्मेदवार (Female - Max 40)</option>
            <option value="disabled">अपाङ्गता भएका व्यक्ति (Differently Abled - Max 40)</option>
            <option value="permanent_staff">बहालवाला स्थायी निजामती कर्मचारी (No Upper Age Limit)</option>
          </select>
        </div>
      </div>

      {/* RESULT CARD */}
      <div
        style={{
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid',
          borderColor: 
            eligibility.status === 'eligible' ? '#86efac' :
            eligibility.status === 'underage' ? '#fde047' : '#fca5a5',
          background: 
            eligibility.status === 'eligible' ? 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.5))' :
            eligibility.status === 'underage' ? 'linear-gradient(135deg, rgba(254, 252, 232, 0.9), rgba(254, 249, 195, 0.5))' :
            'linear-gradient(135deg, rgba(254, 242, 242, 0.9), rgba(254, 226, 226, 0.5))',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
              backgroundColor: 
                eligibility.status === 'eligible' ? '#16a34a' :
                eligibility.status === 'underage' ? '#ca8a04' : '#dc2626',
              color: '#ffffff'
            }}>
              {eligibility.status === 'eligible' ? (
                <>
                  <CheckCircle2 size={16} />
                  दरखास्तका लागि योग्य (Eligible)
                </>
              ) : eligibility.status === 'underage' ? (
                <>
                  <AlertCircle size={16} />
                  उमेर नपुगेको (Underage)
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  उमेर नाघेको (Overage)
                </>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                विज्ञापनको अन्तिम मितिमा तपाईंको यकिन उमेर (Exact Age):
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                {age.years} वर्ष, {age.months} महिना, {age.days} दिन
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                ({toNepaliDigits(age.years)} वर्ष, {toNepaliDigits(age.months)} महिना, {toNepaliDigits(age.days)} दिन / कुल {age.totalDays.toLocaleString('en-IN')} दिन)
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: '180px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>तोकिएको उमेर सीमा (Prescribed Limit):</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>
              न्यूनतम: {postRule.minAge} वर्ष | अधिकतम: {selectedCategory === 'permanent_staff' ? 'हद लाग्दैन' : `${eligibility.maxLimit} वर्ष`}
            </div>
            {eligibility.status === 'eligible' && selectedCategory !== 'permanent_staff' && (
              <div style={{ fontSize: '13px', color: '#15803d', fontWeight: 600, marginTop: '6px' }}>
                उमेर हद पुग्न अझै ~{eligibility.yearsLeft} वर्ष बाँकी छ।
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '14px', color: '#374151' }}>
          <strong>निर्णय तथा कारण: </strong> {eligibility.reason}
        </div>
      </div>

      {/* Official Guidelines Info Box */}
      <div style={{ background: 'var(--bg-subtle)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={18} color="var(--primary)" />
          नेपाल निजामती सेवा ऐन २०४९ अनुसार उमेर सम्बन्धी प्रमुख व्यवस्थाहरू:
        </h3>
        <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.7', margin: 0 }}>
          <li><strong>खरिदार/नासु (तह ४ र ५):</strong> विज्ञापनको अन्तिम मितिसम्म १८ वर्ष उमेर पूरा भई ३५ वर्ष (महिला तथा अपाङ्गता भएका व्यक्तिको हकमा ४० वर्ष) ननाघेको हुनुपर्दछ।</li>
          <li><strong>शाखा अधिकृत (तह ७):</strong> २१ वर्ष उमेर पूरा भई ३५ वर्ष (महिला तथा अपाङ्गता भएकाको हकमा ४० वर्ष) ननाघेको हुनुपर्दछ।</li>
          <li><strong>स्वास्थ्य सेवा:</strong> स्वास्थ्य सेवाका पदहरूमा अधिकृत र सहायक दुवै तहका लागि अधिकतम उमेर ४५ वर्ष तोकिएको छ।</li>
          <li><strong>बहालवाला स्थायी निजामती कर्मचारी:</strong> नेपाल सरकारको सेवामा स्थायी पदमा बहाल रहेका कर्मचारीहरूलाई कुनै पनि तहको खुला प्रतियोगितामा उमेरको हद लाग्दैन।</li>
          <li><strong>दोब्बर दस्तुर म्याद:</strong> उमेर गणना गर्दा विज्ञापनमा तोकिएको पहिलो सामान्य म्यादको अन्तिम दिनलाई आधार मानिन्छ, दोब्बर दस्तुरको म्यादलाई गणना गरिँदैन।</li>
        </ul>
      </div>
    </div>
  );
}
