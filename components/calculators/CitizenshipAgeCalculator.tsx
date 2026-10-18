'use client';

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  AlertCircle, 
  Copy, 
  Check, 
  Printer, 
  Info,
  Building
} from 'lucide-react';
import { 
  NEPALI_MONTHS, 
  convertAdToBsApprox, 
  convertBsToAdApprox, 
  toNepaliDigits 
} from '@/lib/nepaliDate';

interface DocumentItem {
  id: string;
  titleNep: string;
  titleEng: string;
  required: boolean;
  desc: string;
}

const REQUIRED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'birth_cert',
    titleNep: '१. जन्मदर्ता प्रमाणपत्रको सक्कल प्रति',
    titleEng: 'Original Birth Registration Certificate',
    required: true,
    desc: 'सम्बन्धित स्थानीय तह (वडा कार्यालय) बाट जारी भएको जन्मदर्ता',
  },
  {
    id: 'parents_citizenship',
    titleNep: '२. बाबु र आमा दुवैको नेपाली नागरिकता',
    titleEng: "Father's & Mother's Nepali Citizenship Certificate",
    required: true,
    desc: 'सक्कल र प्रतिलिपि (वंशजको नागरिकताका लागि अनिवार्य)',
  },
  {
    id: 'ward_recommendation',
    titleNep: '३. वडा कार्यालयको अनुसूची-१ सिफारिस पत्र',
    titleEng: 'Ward Office Recommendation (Schedule 1)',
    required: true,
    desc: 'स्थानीय वडाध्यक्ष वा वडा सचिवले प्रमाणित गरेको सर्जमिन मुचुल्का',
  },
  {
    id: 'photos',
    titleNep: '४. हालसालै खिचिएको ३ प्रति पासपोर्ट साइज फोटो',
    titleEng: '3 Recent Passport-size Photos',
    required: true,
    desc: 'दुवै कान प्रस्ट देखिने, सेतो वा हल्का पृष्ठभूमि भएको फोटो',
  },
  {
    id: 'academic_cert',
    titleNep: '५. शैक्षिक प्रमाणपत्र (SEE / कक्षा ८ को चारित्रिक प्रमाणपत्र)',
    titleEng: 'Academic Certificate (SEE/Grade 8 Marksheet)',
    required: false,
    desc: 'जन्ममिति प्रमाणीकरणका लागि विद्यालयको मार्कसिट वा चारित्रिक प्रमाणपत्र',
  },
  {
    id: 'migration_cert',
    titleNep: '६. बसाइँसराइ दर्ता प्रमाणपत्र (लागू हुने भएमा)',
    titleEng: 'Migration Certificate (If applicable)',
    required: false,
    desc: 'अन्य जिल्ला वा पालिकाबाट हालको ठेगानामा बसाइँ सरेको भए',
  },
  {
    id: 'verifier_presence',
    titleNep: '७. सनाखत गर्न बुबा वा आमाको प्रत्यक्ष उपस्थिति',
    titleEng: 'Physical Presence of Father or Mother for Verification',
    required: true,
    desc: 'जिल्ला प्रशासन कार्यालय (DAO) मा सनाखत गर्न परिवारको मुख्य सदस्य',
  },
];

export function CitizenshipAgeCalculator() {
  const [dateType, setDateType] = useState<'BS' | 'AD'>('BS');

  // BS DOB
  const [bsYear, setBsYear] = useState<number>(2067);
  const [bsMonth, setBsMonth] = useState<number>(4);
  const [bsDay, setBsDay] = useState<number>(10);

  // AD DOB
  const [adDob, setAdDob] = useState<string>('2010-07-26');

  // Checkbox state for checklist
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Reference Evaluation Date (Today)
  const today = useMemo(() => new Date(), []);

  // Compute DOB Date
  const dobDate = useMemo(() => {
    if (dateType === 'BS') {
      return convertBsToAdApprox(bsYear, bsMonth, bsDay);
    }
    return new Date(adDob || '2008-01-01');
  }, [dateType, bsYear, bsMonth, bsDay, adDob]);

  // Exact 16th Birthday Date
  const sixteenthBirthdayDate = useMemo(() => {
    return new Date(dobDate.getFullYear() + 16, dobDate.getMonth(), dobDate.getDate());
  }, [dobDate]);

  // Converted 16th birthday to BS
  const sixteenthBirthdayBs = useMemo(() => {
    return convertAdToBsApprox(sixteenthBirthdayDate);
  }, [sixteenthBirthdayDate]);

  // Current Age & Eligibility
  const calculation = useMemo(() => {
    let y = today.getFullYear() - dobDate.getFullYear();
    let m = today.getMonth() - dobDate.getMonth();
    let d = today.getDate() - dobDate.getDate();

    if (d < 0) {
      m -= 1;
      d += 30;
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    const isEligible = y >= 16;

    // Remaining time if underage:
    let remY = 0;
    let remM = 0;
    let remD = 0;

    if (!isEligible) {
      remY = 15 - y;
      remM = 11 - m;
      remD = 30 - d;
      if (remD >= 30) {
        remM += 1;
        remD -= 30;
      }
      if (remM >= 12) {
        remY += 1;
        remM -= 12;
      }
    }

    return {
      ageYears: Math.max(0, y),
      ageMonths: Math.max(0, m),
      ageDays: Math.max(0, d),
      isEligible,
      remY: Math.max(0, remY),
      remM: Math.max(0, remM),
      remD: Math.max(0, remD),
    };
  }, [dobDate, today]);

  const toggleCheck = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyChecklist = () => {
    const lines = REQUIRED_DOCUMENTS.map((doc, idx) => {
      const isDone = checkedDocs[doc.id] ? '[✓]' : '[ ]';
      return `${idx + 1}. ${isDone} ${doc.titleNep} (${doc.desc})`;
    });
    const header = `नेपाली नागरिकता प्रमाणपत्रका लागि आवश्यक कागजात चेकलिस्ट:\n\n`;
    navigator.clipboard.writeText(header + lines.join('\n') + `\n\nVia NepalCalc.com`);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  return (
    <div className="calculator-card" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div 
          style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            backgroundColor: '#dcfce7', 
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            नेपाली नागरिकता १६ वर्षे उमेर क्याल्कुलेटर
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Nepal Citizenship Act 2063 (Section 8) & DAO Document Checklist
          </p>
        </div>
      </div>

      {/* Date Picker Grid */}
      <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} color="var(--primary)" />
            जन्म मिति (Date of Birth on Birth Certificate)
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
                {Array.from({ length: 65 }, (_, i) => 2083 - i).map((y) => (
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

      {/* ELIGIBILITY RESULT CARD */}
      <div 
        style={{ 
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid',
          borderColor: calculation.isEligible ? '#86efac' : '#fde047',
          background: calculation.isEligible 
            ? 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.4))'
            : 'linear-gradient(135deg, rgba(254, 252, 232, 0.9), rgba(254, 249, 195, 0.4))',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              fontSize: '13px', 
              fontWeight: 700,
              backgroundColor: calculation.isEligible ? '#16a34a' : '#ca8a04',
              color: '#fff'
            }}>
              {calculation.isEligible ? (
                <>
                  <CheckCircle2 size={16} />
                  नागरिकताका लागि पूर्ण योग्य (Eligible)
                </>
              ) : (
                <>
                  <Clock size={16} />
                  १६ वर्ष उमेर पुग्न बाँकी (Under 16 Years)
                </>
              )}
            </div>

            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                तपाईंको हालको यकिन उमेर (Current Exact Age):
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                {calculation.ageYears} वर्ष, {calculation.ageMonths} महिना, {calculation.ageDays} दिन
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', minWidth: '220px' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>
              १६ वर्ष पूरा हुने यकिन मिति:
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
              वि.सं. {sixteenthBirthdayBs.year} {sixteenthBirthdayBs.month} महिना {sixteenthBirthdayBs.day} गते
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
              (AD: {sixteenthBirthdayDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })})
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '14px', color: '#374151' }}>
          {calculation.isEligible ? (
            <span>
              🎉 <strong>बधाई छ!</strong> नेपाल नागरिकता ऐन २०६३, दफा ८ अनुसार तपाईं १६ वर्ष उमेर पूरा भई वंशज वा जन्मका आधारमा नेपाली नागरिकता प्रमाणपत्र लिन योग्य हुनुहुन्छ। तल दिइएका कागजातहरू तयार गरी आफ्नो वडा कार्यालय र जिल्ला प्रशासन कार्यालय (DAO) मा जानुहोस्।
            </span>
          ) : (
            <span>
              ⏳ तपाईंको उमेर १६ वर्ष पुग्न अझै <strong>{calculation.remY} वर्ष, {calculation.remM} महिना र {calculation.remD} दिन</strong> बाँकी छ। सो मिति पूरा भएपछि मात्र तपाईंको नागरिकता आवेदन दर्ता हुनेछ।
            </span>
          )}
        </div>
      </div>

      {/* Official Ward & DAO Document Checklist */}
      <div style={{ background: 'var(--bg-subtle)', borderRadius: '14px', padding: '20px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={18} color="var(--primary)" />
            नागरिकता बनाउन आवश्यक कागजात सूची (DAO & Ward Checklist):
          </h3>
          <button
            type="button"
            onClick={handleCopyChecklist}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            {copiedChecklist ? <Check size={14} /> : <Copy size={14} />}
            {copiedChecklist ? 'Copied Checklist!' : 'Copy Checklist'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {REQUIRED_DOCUMENTS.map((doc) => (
            <label
              key={doc.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px',
                background: 'var(--bg-primary)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={!!checkedDocs[doc.id]}
                onChange={() => toggleCheck(doc.id)}
                style={{ marginTop: '3px', accentColor: 'var(--primary)', width: '16px', height: '16px' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: checkedDocs[doc.id] ? '#15803d' : 'var(--text-primary)' }}>
                  {doc.titleNep}
                  {doc.required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {doc.desc}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
