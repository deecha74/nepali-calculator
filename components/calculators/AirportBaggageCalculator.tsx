'use client';

import React, { useState, useMemo } from 'react';
import {
  BaggageCustomsInput,
  PASSENGER_TYPES,
  calculateAirportBaggageDuty,
  PassengerType,
  Gender,
} from '@/lib/rates/airportCustomsRates';
import { useLanguage } from '@/components/LanguageContext';
import {
  Plane,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Smartphone,
  Laptop,
  Tv,
  Wine,
  Coins,
  DollarSign,
  Share2,
  Printer,
  Sparkles,
  Info,
  ArrowRight,
} from 'lucide-react';

export function AirportBaggageCalculator() {
  const { t, language } = useLanguage();
  const ne = language === 'ne';

  // Input state
  const [passengerType, setPassengerType] = useState<PassengerType>('migrant_worker_12mo');
  const [gender, setGender] = useState<Gender>('male');
  const [goldOrnamentsGrams, setGoldOrnamentsGrams] = useState<number>(25);
  const [rawGoldGrams, setRawGoldGrams] = useState<number>(0);
  const [silverOrnamentsGrams, setSilverOrnamentsGrams] = useState<number>(0);
  const [smartphonesCount, setSmartphonesCount] = useState<number>(2);
  const [laptopsCount, setLaptopsCount] = useState<number>(1);
  const [alcoholLiters, setAlcoholLiters] = useState<number>(1.0);
  const [tvSizeInches, setTvSizeInches] = useState<number>(32);
  const [cigaretteSticks, setCigaretteSticks] = useState<number>(0);
  const [cashUsd, setCashUsd] = useState<number>(2000);
  const [hasDrone, setHasDrone] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const input: BaggageCustomsInput = useMemo(
    () => ({
      passengerType,
      gender,
      goldOrnamentsGrams,
      rawGoldGrams,
      silverOrnamentsGrams,
      smartphonesCount,
      laptopsCount,
      alcoholLiters,
      tvSizeInches,
      cigaretteSticks,
      cashUsd,
      hasDrone,
    }),
    [
      passengerType,
      gender,
      goldOrnamentsGrams,
      rawGoldGrams,
      silverOrnamentsGrams,
      smartphonesCount,
      laptopsCount,
      alcoholLiters,
      tvSizeInches,
      cigaretteSticks,
      cashUsd,
      hasDrone,
    ]
  );

  const result = useMemo(() => calculateAirportBaggageDuty(input), [input]);

  const handleShare = () => {
    const text = `Tribhuvan International Airport (TIA) Baggage Duty Check: ${result.channelName} (Total Duty: NPR ${result.totalDutyNpr.toLocaleString('en-IN')}). Check your flight baggage duty-free limits on Nepali Calc: https://nepalicalc.com/customs/airport-baggage`;
    if (navigator.share) {
      navigator.share({ title: 'TIA Airport Customs Baggage Duty Check', text, url: 'https://nepalicalc.com/customs/airport-baggage' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      {/* 1. Passenger Profile Controls */}
      <div
        className="white-card"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 12px rgba(11, 43, 92, 0.04)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
          {/* Passenger Type Dropdown */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              <Plane size={15} color="#003893" />
              <span>{t('Traveler Status & Visa Type', 'यात्रुको विवरण तथा भिसा प्रकार')}</span>
            </label>
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value as PassengerType)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#0f172a',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {PASSENGER_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {ne ? pt.nameNe : pt.nameEn} ({pt.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Gender Segmented Toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              {t('Passenger Gender (Affects Duty-Free Gold Limit)', 'यात्रुको लिङ्ग')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setGender('female')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: gender === 'female' ? '2px solid #003893' : '1px solid #cbd5e1',
                  backgroundColor: gender === 'female' ? '#eff6ff' : '#ffffff',
                  color: gender === 'female' ? '#003893' : '#475569',
                  cursor: 'pointer',
                }}
              >
                👩 {t('Female (50g Free)', 'महिला (५० ग्राम निःशुल्क)')}
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: gender === 'male' ? '2px solid #003893' : '1px solid #cbd5e1',
                  backgroundColor: gender === 'male' ? '#eff6ff' : '#ffffff',
                  color: gender === 'male' ? '#003893' : '#475569',
                  cursor: 'pointer',
                }}
              >
                👨 {t('Male (25g Free)', 'पुरुष (२५ ग्राम निःशुल्क)')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Baggage Items Declarations */}
      <div
        className="white-card"
        style={{
          padding: '24px',
          borderRadius: '18px',
          border: '1.5px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(11, 43, 92, 0.04)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Coins size={18} color="#b45309" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
            {t('Step 2: Declare Luggage Items Being Brought into Nepal', 'चरण २: नेपाल ल्याउन लागेका सामानहरूको विवरण')}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Gold Ornaments */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#92400e', marginBottom: '6px' }}>
              <span>🪙 {t('Gold Jewelry / Ornaments', 'सुनका गहना')}</span>
              <strong style={{ fontSize: '15px' }}>{goldOrnamentsGrams} grams</strong>
            </label>
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={goldOrnamentsGrams}
              onChange={(e) => setGoldOrnamentsGrams(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#b45309', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#b45309', marginTop: '4px' }}>
              <span>0g</span>
              <span>{t(`Free: ${gender === 'female' ? '50g' : '25g'}`, `निःशुल्क: ${gender === 'female' ? '५० ग्राम' : '२५ ग्राम'}`)}</span>
              <span>150g</span>
            </div>
          </div>

          {/* Raw Gold / Bullion / Coins */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#991b1b', marginBottom: '6px' }}>
              <span>🧱 {t('Raw Gold (Bullion / Coins / Biscuits)', 'काँचो सुन (सिक्का तथा बिस्कुट)')}</span>
              <strong style={{ fontSize: '15px' }}>{rawGoldGrams} grams</strong>
            </label>
            <input
              type="range"
              min={0}
              max={120}
              step={5}
              value={rawGoldGrams}
              onChange={(e) => setRawGoldGrams(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#991b1b', marginTop: '4px' }}>
              <span>{t('0g Free', '० ग्राम छुट')}</span>
              <span>{t('Max: 100g (Taxable)', 'अधिकतम: १०० ग्राम (कर लाग्ने)')}</span>
              <span>{t('>100g Prohibited', '> १०० ग्राम निषेधित')}</span>
            </div>
          </div>

          {/* Mobile Phones (Smartphones / iPhone) */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#0369a1', marginBottom: '6px' }}>
              <span>📱 {t('Mobile Phones (Smartphones / iPhone)', 'मोबाइल फोन')}</span>
              <strong style={{ fontSize: '15px' }}>{smartphonesCount} {t('Phone(s)', 'वटा')}</strong>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={smartphonesCount}
              onChange={(e) => setSmartphonesCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0369a1', marginTop: '4px' }}>
              <span>1</span>
              <span>{t(`Free: ${passengerType.includes('migrant') ? '2 Phones' : '1 Phone'}`, `छुट: ${passengerType.includes('migrant') ? '२ वटा' : '१ वटा'}`)}</span>
              <span>5</span>
            </div>
          </div>

          {/* Television (TV) Size */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
              <span>📺 {t('Television (LED / Smart TV)', 'टेलिभिजन (टिभी)')}</span>
              <strong style={{ fontSize: '15px' }}>{tvSizeInches > 0 ? `${tvSizeInches} ${t('Inches', 'इन्च')}` : t('None', 'छैन')}</strong>
            </label>
            <select
              value={tvSizeInches}
              onChange={(e) => setTvSizeInches(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff' }}
            >
              <option value={0}>{t('No Television', 'टिभी नल्याउने')}</option>
              <option value={32}>{t('Up to 32 Inches (Free for 12+ Mo Labor)', '३२ इन्चसम्म (१२ महिनाभन्दा बढी श्रममा निःशुल्क)')}</option>
              <option value={43}>{t('43 Inches (Taxable)', '४३ इन्च (कर लाग्ने)')}</option>
              <option value={55}>{t('55 Inches (Taxable)', '५५ इन्च (कर लाग्ने)')}</option>
              <option value={65}>{t('65 Inches or Larger (Heavy Tariff)', '६५ इन्च वा ठूलो (उच्च भन्सार)')}</option>
            </select>
          </div>

          {/* Alcohol & Liquor */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fdf4ff', border: '1px solid #fae8ff' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#86198f', marginBottom: '6px' }}>
              <span>🍾 {t('Alcohol & Liquor (Liters)', 'मदिरा तथा रक्सी (लिटर)')}</span>
              <strong style={{ fontSize: '15px' }}>{alcoholLiters} {t('Liter(s)', 'लिटर')}</strong>
            </label>
            <input
              type="range"
              min={0}
              max={3}
              step={0.5}
              value={alcoholLiters}
              onChange={(e) => setAlcoholLiters(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c026d3', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#86198f', marginTop: '4px' }}>
              <span>0 L</span>
              <span>1.0L Free Limit</span>
              <span>&gt;1L Confiscated</span>
            </div>
          </div>

          {/* Laptops */}
          <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
              <span>💻 {t('Laptops & Tablets', 'ल्यापटप तथा ट्याब्लेट')}</span>
              <strong style={{ fontSize: '15px' }}>{laptopsCount} Unit(s)</strong>
            </label>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={laptopsCount}
              onChange={(e) => setLaptopsCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#003893', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              <span>0</span>
              <span>1 Unit Duty-Free</span>
              <span>3 Units</span>
            </div>
          </div>
        </div>

        {/* Special Declarations: Cash & Drone */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>💵 Cash in Foreign Currency:</span>
            <input
              type="number"
              value={cashUsd}
              onChange={(e) => setCashUsd(Number(e.target.value))}
              style={{ width: '110px', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 700 }}
            />
            <span style={{ fontSize: '12px', color: '#64748b' }}>USD (Declaring required if &gt; $5,000)</span>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            <input
              type="checkbox"
              checked={hasDrone}
              onChange={(e) => setHasDrone(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
            />
            <span>🚁 Carrying Camera Drone (Requires CAAN Permission)</span>
          </label>
        </div>
      </div>

      {/* 3. Output Clearance Card & Duty Assessment */}
      <div
        style={{
          padding: '24px',
          borderRadius: '18px',
          backgroundColor:
            result.channel === 'green' ? '#f0fdf4' : result.channel === 'red' ? '#fffbeb' : '#fef2f2',
          border:
            result.channel === 'green' ? '2px solid #86efac' : result.channel === 'red' ? '2px solid #fde047' : '2px solid #fca5a5',
          marginBottom: '28px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor:
                  result.channel === 'green' ? '#16a34a' : result.channel === 'red' ? '#d97706' : '#dc2626',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              {result.channel === 'green' ? <CheckCircle2 size={24} /> : result.channel === 'red' ? <AlertTriangle size={24} /> : <AlertOctagon size={24} />}
            </div>
            <div>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor:
                    result.channel === 'green' ? '#dcfce7' : result.channel === 'red' ? '#fef3c7' : '#fee2e2',
                  color:
                    result.channel === 'green' ? '#166534' : result.channel === 'red' ? '#92400e' : '#991b1b',
                }}
              >
                {result.channel === 'green' ? '🟢 TIA GREEN CHANNEL ELIGIBLE' : result.channel === 'red' ? '🟡 TIA RED CHANNEL (DUTY REQUIRED)' : '🔴 WARNING: RISK OF CONFISCATION'}
              </span>
              <h2 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>
                {ne ? result.channelNameNe : result.channelName}
              </h2>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Total Customs Duty Payable</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: result.totalDutyNpr > 0 ? '#b45309' : '#16a34a' }}>
              NPR {result.totalDutyNpr.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Warnings list if any */}
        {result.warnings.length > 0 && (
          <div style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #fecaca', marginBottom: '16px' }}>
            <strong style={{ fontSize: '13px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <AlertTriangle size={14} />
              Important Airport Customs Alerts:
            </strong>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12.5px', color: '#7f1d1d', lineHeight: 1.5 }}>
              {result.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons: Share & Print */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Share2 size={13} />
            <span>{copied ? 'Copied Link!' : 'Share Duty Check'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: '#003893',
              border: 'none',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Printer size={13} />
            <span>Print Clearance Slip</span>
          </button>
        </div>
      </div>

      {/* 4. Itemized Assessment Breakdown Table */}
      <div
        className="white-card"
        style={{
          padding: '24px',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(11, 43, 92, 0.04)',
          marginBottom: '32px',
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          {t('Itemized Baggage Assessment', 'भन्सार महसुल फाँटवारी')}
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 12px' }}>{t('Item Category', 'सामानको विवरण')}</th>
                <th style={{ padding: '10px 12px' }}>{t('Declared', 'घोषित परिमाण')}</th>
                <th style={{ padding: '10px 12px' }}>{t('Duty-Free Limit', 'निःशुल्क कोटा')}</th>
                <th style={{ padding: '10px 12px' }}>{t('Taxable Quantity', 'कर लाग्ने परिमाण')}</th>
                <th style={{ padding: '10px 12px' }}>{t('Customs Duty', 'भन्सार महसुल')}</th>
                <th style={{ padding: '10px 12px' }}>{t('Status & Rule', 'अवस्था तथा नियम')}</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 750, color: '#0f172a' }}>
                    <div>{ne ? row.categoryNe : row.category}</div>
                  </td>
                  <td style={{ padding: '12px', color: '#334155' }}>{row.declared}</td>
                  <td style={{ padding: '12px', color: '#059669', fontWeight: 600 }}>{row.dutyFreeLimit}</td>
                  <td style={{ padding: '12px', color: '#b45309', fontWeight: 600 }}>{row.taxableQuantity}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: row.dutyPayableNpr > 0 ? '#b45309' : '#16a34a' }}>
                    {row.dutyPayableNpr > 0 ? `NPR ${row.dutyPayableNpr.toLocaleString('en-IN')}` : 'Free'}
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor:
                          row.status === 'green' ? '#dcfce7' : row.status === 'yellow' ? '#fef3c7' : '#fee2e2',
                        color:
                          row.status === 'green' ? '#166534' : row.status === 'yellow' ? '#92400e' : '#991b1b',
                        marginBottom: '3px',
                      }}
                    >
                      {row.status === 'green' ? '✓ Free' : row.status === 'yellow' ? '⚠ Taxable' : '✕ Prohibited / Excess'}
                    </span>
                    <div>{ne ? row.noteNe : row.note}</div>
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

