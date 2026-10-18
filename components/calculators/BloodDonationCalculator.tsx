'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Heart, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Copy, Check, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface BloodTypeInfo {
  type: string;
  canDonateTo: string[];
  canReceiveFrom: string[];
  rarityNepal: string;
  note: string;
}

const BLOOD_MATRIX: Record<string, BloodTypeInfo> = {
  'O+': { type: 'O+', canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O+', 'O-'], rarityNepal: '३४% (सर्वाधिक प्रचलित)', note: 'सकारात्मक समूहका सबैलाई दिन मिल्छ।' },
  'O-': { type: 'O-', canDonateTo: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['O-'], rarityNepal: '२% (अत्यन्त दुर्लभ)', note: 'युनिभर्सल डोनर (Universal Donor) - सबैलाई दिन मिल्छ।' },
  'A+': { type: 'A+', canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'], rarityNepal: '२८% (प्रचलित)', note: 'A+ र AB+ लाई दिन मिल्छ।' },
  'A-': { type: 'A-', canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'], rarityNepal: '१.५% (दुर्लभ)', note: 'A र AB समूहका दुवैलाई दिन मिल्छ।' },
  'B+': { type: 'B+', canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'], rarityNepal: '२७% (प्रचलित)', note: 'B+ र AB+ लाई दिन मिल्छ।' },
  'B-': { type: 'B-', canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'], rarityNepal: '१.५% (दुर्लभ)', note: 'B र AB समूहका दुवैलाई दिन मिल्छ।' },
  'AB+': { type: 'AB+', canDonateTo: ['AB+'], canReceiveFrom: ['सबै समूह (Universal Recipient)'], rarityNepal: '५% (दुर्लभ)', note: 'युनिभर्सल रेसिपिएन्ट - सबै समूहको रगत लिन मिल्छ।' },
  'AB-': { type: 'AB-', canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'], rarityNepal: '०.५% (अति दुर्लभ)', note: 'नेपालमा सबैभन्दा दुर्लभ रक्त समूह।' },
};

export function BloodDonationCalculator() {
  const { language, t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('O+');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [lastDonationDate, setLastDonationDate] = useState<string>('2026-08-01');
  const [hasDonatedBefore, setHasDonatedBefore] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const [todayDate, setTodayDate] = useState<Date | null>(null);

  useEffect(() => {
    setTodayDate(new Date());
  }, []);

  const bloodInfo = BLOOD_MATRIX[selectedGroup];

  const eligibility = useMemo(() => {
    if (!hasDonatedBefore || !todayDate) {
      return {
        isEligible: true,
        daysLeft: 0,
        nextDateStr: 'आजै रक्तदान गर्न योग्य (Eligible Today)',
        requiredIntervalDays: gender === 'male' ? 90 : 120,
      };
    }

    const last = new Date(lastDonationDate);
    // Nepal Red Cross: Male 90 days (3 months), Female 120 days (4 months)
    const requiredIntervalDays = gender === 'male' ? 90 : 120;
    const nextEligible = new Date(last.getTime() + requiredIntervalDays * 24 * 60 * 60 * 1000);

    const diffMs = nextEligible.getTime() - todayDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const isEligible = diffDays <= 0;
    const nextDateStr = nextEligible.toLocaleDateString('ne-NP', { year: 'numeric', month: 'long', day: 'numeric' });

    return {
      isEligible,
      daysLeft: Math.max(0, diffDays),
      nextDateStr,
      requiredIntervalDays
    };
  }, [hasDonatedBefore, lastDonationDate, gender, todayDate]);

  const handleCopy = () => {
    const text = `Nepal Blood Donation: Group ${selectedGroup} | Status: ${eligibility.isEligible ? 'Eligible to Donate Now' : `Next eligible in ${eligibility.daysLeft} days (${eligibility.nextDateStr})`} | Can Donate To: ${bloodInfo.canDonateTo.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-rose">नेपाल रेडक्रस सोसाइटी (Nepal Red Cross)</span>
          <span className="badge badge-emerald">जीवनदान रक्तदान</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          रक्तदान योग्यता तथा रक्त समूह क्याल्कुलेटर (Blood Donation Eligibility & Match)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          नेपाल रेडक्रस रक्तसञ्चार सेवाको मापदण्ड अनुसार ९०/१२० दिनको रक्तदान अन्तर, आगामी मिति तथा रक्त समूह अनुकूलता जाँच।
        </p>
      </div>

      {/* Main Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
        
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Blood Group Picker */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px' }}>
              तपाईंको रक्त समूह (Blood Group)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {Object.keys(BLOOD_MATRIX).map(bg => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setSelectedGroup(bg)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1.5px solid',
                    borderColor: selectedGroup === bg ? '#dc2626' : '#cbd5e1',
                    backgroundColor: selectedGroup === bg ? '#fef2f2' : '#ffffff',
                    color: selectedGroup === bg ? '#dc2626' : '#1e293b',
                    fontSize: '14px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              लिङ्ग (Gender - Red Cross Interval Rule)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setGender('male')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: gender === 'male' ? '#003893' : '#cbd5e1',
                  backgroundColor: gender === 'male' ? '#eff6ff' : '#ffffff',
                  color: gender === 'male' ? '#003893' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                पुरुष (९० दिन / ३ महिना)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: gender === 'female' ? '#003893' : '#cbd5e1',
                  backgroundColor: gender === 'female' ? '#eff6ff' : '#ffffff',
                  color: gender === 'female' ? '#003893' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                महिला (१२० दिन / ४ महिना)
              </button>
            </div>
          </div>

          {/* Has donated before? */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              पछिल्लो पटक रक्तदान गर्नुभएको मिति:
            </label>
            <input
              type="date"
              value={lastDonationDate}
              onChange={(e) => setLastDonationDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Results Card */}
        <div
          style={{
            backgroundColor: '#fffbfa',
            border: '1.5px solid #fee2e2',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* Status Banner */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: eligibility.isEligible ? '#ecfdf5' : '#fffbeb',
                border: `1.5px solid ${eligibility.isEligible ? '#10b981' : '#f59e0b'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px'
              }}
            >
              {eligibility.isEligible ? <CheckCircle2 size={24} color="#059669" /> : <AlertCircle size={24} color="#d97706" />}
              <div>
                <div style={{ fontSize: '14.5px', fontWeight: 900, color: eligibility.isEligible ? '#065f46' : '#92400e' }}>
                  {eligibility.isEligible ? 'तपाईं अहिले रक्तदान गर्न योग्य हुनुहुन्छ!' : `अर्को रक्तदानका लागि ${eligibility.daysLeft} दिन बाँकी छ`}
                </div>
                {!eligibility.isEligible && (
                  <div style={{ fontSize: '11.5px', color: '#78350f', marginTop: '2px' }}>
                    अर्को योग्य मिति: <strong>{eligibility.nextDateStr}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Compatibility Grid */}
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              रक्त समूह {selectedGroup} अनुकूलता विवरण
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ padding: '10px 12px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #fed7d7' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#059669', marginBottom: '3px' }}>
                  ✅ कसलाई रक्तदान गर्न मिल्छ (Can Donate To):
                </div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>
                  {bloodInfo.canDonateTo.join('  •  ')}
                </div>
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #fed7d7' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0284c7', marginBottom: '3px' }}>
                  🩸 कसबाट रगत लिन मिल्छ (Can Receive From):
                </div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>
                  {bloodInfo.canReceiveFrom.join('  •  ')}
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748b' }}>
                नेपालमा अनुपात: <strong>{bloodInfo.rarityNepal}</strong> • {bloodInfo.note}
              </div>
            </div>

            {/* Health criteria note */}
            <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11.5px', color: '#475569' }}>
              <strong>रेडक्रस न्यूनतम मापदण्ड:</strong> उमेर १८–६० वर्ष, तौल कम्तीमा ४५ केजी, हेमोग्लोबिन १२ g/dl भन्दा बढी, रक्तचाप सामान्य।
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              marginTop: '16px',
              backgroundColor: copied ? '#16a34a' : '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'विवरण कपी गरियो' : 'रक्तदान विवरण कपी गर्नुहोस्'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
