'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

export type PassengerGender = 'male' | 'female';
export type MetalCategory = 'gold_ornaments' | 'raw_gold' | 'silver_ornaments';
export type WeightUnit = 'grams' | 'tola';
export type OriginRegion = 'uae_gulf' | 'australia_usa_uk' | 'malaysia_korea' | 'india';

const GRAMS_PER_TOLA = 11.6638;

// Official Nepal Customs Baggage Rules (Jhitigunta Aadesh & Finance Act Tariff)
// Men: 25g gold ornaments duty-free
// Women: 50g gold ornaments duty-free
// Excess up to 100g: Rs. 1,050 per gram (Rs. 10,500 per 10g)
// Excess 100g to 200g: Rs. 1,250 per gram (Rs. 12,500 per 10g)
// Above +200g excess: Confiscated (जफत)
const GOLD_DUTY_SLAB_1_PER_GRAM = 1050;
const GOLD_DUTY_SLAB_2_PER_GRAM = 1250;
const SILVER_DUTY_PER_GRAM = 15;

const ORIGIN_OPTIONS: Record<OriginRegion, { label: string; labelNep: string }> = {
  uae_gulf: {
    label: 'Dubai (UAE), Qatar, Saudi Arabia, Kuwait',
    labelNep: 'दुबई (UAE), कतार, साउदी, कुवेत',
  },
  australia_usa_uk: {
    label: 'Australia, USA, UK, Canada & Europe',
    labelNep: 'अष्ट्रेलिया, अमेरिका, बेलायत, क्यानडा',
  },
  malaysia_korea: {
    label: 'Malaysia, South Korea & Japan',
    labelNep: 'मलेसिया, दक्षिण कोरिया र जापान',
  },
  india: {
    label: 'India (Air or Land Checkpoint)',
    labelNep: 'भारत (हवाई वा स्थल नाका)',
  },
};

export function GoldCustomsCalculator() {
  const { t } = useLanguage();
  const [gender, setGender] = useState<PassengerGender>('female');
  const [metalCategory, setMetalCategory] = useState<MetalCategory>('gold_ornaments');
  const [unit, setUnit] = useState<WeightUnit>('grams');
  const [weightInput, setWeightInput] = useState<number>(50);
  const [origin, setOrigin] = useState<OriginRegion>('uae_gulf');
  const [goldRatePerTola, setGoldRatePerTola] = useState<number>(168000);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const safeWeight = Math.max(0, weightInput);
    const totalGrams = unit === 'grams' ? safeWeight : safeWeight * GRAMS_PER_TOLA;
    const totalTola = totalGrams / GRAMS_PER_TOLA;
    const goldRatePerGram = goldRatePerTola / GRAMS_PER_TOLA;

    if (metalCategory === 'silver_ornaments') {
      const dutyFreeGrams = 500;
      const maxDutiableExcessGrams = 500;
      const excessGrams = Math.max(0, totalGrams - dutyFreeGrams);
      const slab1Grams = Math.min(excessGrams, maxDutiableExcessGrams);
      const confiscatedGrams = Math.max(0, excessGrams - maxDutiableExcessGrams);
      const totalDutyNpr = Math.round(slab1Grams * SILVER_DUTY_PER_GRAM);

      let channelStatus: 'green' | 'red' | 'prohibited' = 'green';
      if (confiscatedGrams > 0) channelStatus = 'prohibited';
      else if (excessGrams > 0) channelStatus = 'red';

      return {
        totalGrams,
        totalTola,
        dutyFreeGrams,
        dutyFreeTola: dutyFreeGrams / GRAMS_PER_TOLA,
        taxableGrams: slab1Grams,
        slab1Grams,
        slab2Grams: 0,
        slab1Duty: totalDutyNpr,
        slab2Duty: 0,
        confiscatedGrams,
        totalDutyNpr,
        estimatedMarketValueNpr: Math.round(totalTola * 2100),
        luxuryTaxInNepalNpr: 0,
        channelStatus,
      };
    }

    if (metalCategory === 'raw_gold') {
      const estimatedMarketValueNpr = Math.round(totalGrams * goldRatePerGram);
      const twentyPercentTariff = Math.round(estimatedMarketValueNpr * 0.2);

      return {
        totalGrams,
        totalTola,
        dutyFreeGrams: 0,
        dutyFreeTola: 0,
        taxableGrams: Math.min(totalGrams, 100),
        slab1Grams: Math.min(totalGrams, 100),
        slab2Grams: 0,
        slab1Duty: twentyPercentTariff,
        slab2Duty: 0,
        confiscatedGrams: totalGrams > 100 ? totalGrams - 100 : totalGrams,
        totalDutyNpr: twentyPercentTariff,
        estimatedMarketValueNpr,
        luxuryTaxInNepalNpr: estimatedMarketValueNpr > 1000000 ? Math.round(estimatedMarketValueNpr * 0.02) : 0,
        channelStatus: 'prohibited' as const,
      };
    }

    // Standard Gold Ornaments
    const dutyFreeGrams = gender === 'female' ? 50 : 25;
    const excessGrams = Math.max(0, totalGrams - dutyFreeGrams);

    const slab1Grams = Math.min(excessGrams, 100);
    const slab2Grams = Math.min(Math.max(0, excessGrams - 100), 100);
    const confiscatedGrams = Math.max(0, excessGrams - 200);

    const slab1Duty = Math.round(slab1Grams * GOLD_DUTY_SLAB_1_PER_GRAM);
    const slab2Duty = Math.round(slab2Grams * GOLD_DUTY_SLAB_2_PER_GRAM);
    const totalDutyNpr = slab1Duty + slab2Duty;

    const estimatedMarketValueNpr = Math.round(totalGrams * goldRatePerGram);
    const luxuryTaxInNepalNpr =
      estimatedMarketValueNpr > 1000000 ? Math.round(estimatedMarketValueNpr * 0.02) : 0;

    let channelStatus: 'green' | 'red' | 'prohibited' = 'green';
    if (confiscatedGrams > 0) {
      channelStatus = 'prohibited';
    } else if (excessGrams > 0) {
      channelStatus = 'red';
    }

    return {
      totalGrams,
      totalTola,
      dutyFreeGrams,
      dutyFreeTola: dutyFreeGrams / GRAMS_PER_TOLA,
      taxableGrams: slab1Grams + slab2Grams,
      slab1Grams,
      slab2Grams,
      slab1Duty,
      slab2Duty,
      confiscatedGrams,
      totalDutyNpr,
      estimatedMarketValueNpr,
      luxuryTaxInNepalNpr,
      channelStatus,
    };
  }, [gender, metalCategory, unit, weightInput, goldRatePerTola]);

  const handleCopy = () => {
    const summary = `Nepal Airport Gold Customs Calculation (FY 2083/84):
Passenger: ${gender === 'female' ? 'Female (50g Duty-Free)' : 'Male (25g Duty-Free)'}
Category: ${metalCategory === 'gold_ornaments' ? 'Gold Ornaments' : metalCategory === 'raw_gold' ? 'Raw Gold / Bars' : 'Silver Ornaments'}
Total Weight: ${calculation.totalGrams.toFixed(2)}g (${calculation.totalTola.toFixed(2)} Tola)
Duty-Free Allowance: ${calculation.dutyFreeGrams}g (${calculation.dutyFreeTola.toFixed(2)} Tola)
Taxable Excess Weight: ${calculation.taxableGrams.toFixed(2)}g
Payable Customs Duty at TIA: NPR ${calculation.totalDutyNpr.toLocaleString('en-IN')}
Channel: ${calculation.channelStatus === 'green' ? 'Green Channel (Duty-Free)' : calculation.channelStatus === 'red' ? 'Red Channel (Declare & Pay Duty)' : 'Restricted / Confiscation Risk'}
Calculated on NepalCalc.com/how-much-gold-can-you-bring-to-nepal`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 30px)', maxWidth: '1040px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309', fontSize: '11px', padding: '2px 8px' }}>
                {t('TIA Airport Customs Rules', 'विमानस्थल भन्सार नियम')}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', fontWeight: 800, margin: '4px 0 0', color: 'var(--text-primary)' }}>
              {t('Gold & Silver Customs Duty Calculator', 'सुनचाँदी भन्सार महसुल क्याल्कुलेटर')}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '7px 12px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {copied ? <Check size={15} color="#059669" /> : <Copy size={15} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Result', 'नतिजा कपी')}</span>
        </button>
      </div>

      {/* Main 2-Column Compact Interactive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Column: Calculation Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. Metal Category (Clean Dropdown) */}
          <div>
            <label htmlFor="metal-category-select" className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '13px' }}>
              {t('1. Type of Gold / Silver Carried', '१. सुन वा चाँदीको प्रकार')}
            </label>
            <select
              id="metal-category-select"
              value={metalCategory}
              onChange={(e) => setMetalCategory(e.target.value as MetalCategory)}
              className="text-input"
              style={{ width: '100%', padding: '9px 12px', fontSize: '13.5px', fontWeight: 600 }}
            >
              <option value="gold_ornaments">
                💍 {t('Gold Ornaments & Jewelry (25g / 50g Duty-Free)', 'तयारी सुनका गहना (२५/५० ग्राम छुट)')}
              </option>
              <option value="raw_gold">
                🪙 {t('Raw Gold, Biscuits or Bullion Coins (0g Duty-Free)', 'काँचो सुन, बिस्कुट वा सिक्का (छुट छैन)')}
              </option>
              <option value="silver_ornaments">
                🥈 {t('Silver Ornaments & Utensils (500g Duty-Free)', 'चाँदीका गहना तथा भाँडाकुँडा (५०० ग्राम छुट)')}
              </option>
            </select>
          </div>

          {/* 2. Passenger Gender (Clean Compact Toggle) */}
          {metalCategory === 'gold_ornaments' && (
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '13px' }}>
                {t('2. Passenger Category', '२. यात्रुको वर्ग')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: gender === 'female' ? '2px solid #059669' : '1px solid var(--border-subtle)',
                    background: gender === 'female' ? '#ecfdf5' : '#ffffff',
                    color: gender === 'female' ? '#065f46' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  👩 {t('Female (50g Free)', 'महिला (५० ग्राम छुट)')}
                </button>

                <button
                  type="button"
                  onClick={() => setGender('male')}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: gender === 'male' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
                    background: gender === 'male' ? '#eff6ff' : '#ffffff',
                    color: gender === 'male' ? '#1e40af' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  👨 {t('Male (25g Free)', 'पुरुष (२५ ग्राम छुट)')}
                </button>
              </div>
            </div>
          )}

          {/* 3. Weight Input + Unit Toggle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label htmlFor="gold-weight-input" className="input-label" style={{ fontWeight: 700, fontSize: '13px', margin: 0 }}>
                {t(
                  `3. Total Weight Carried (${unit === 'grams' ? 'Grams' : 'Tola'})`,
                  `३. कुल तौल (${unit === 'grams' ? 'ग्राममा' : 'तोलामा'})`
                )}
              </label>
              <div style={{ display: 'inline-flex', borderRadius: '6px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === 'tola') {
                      setWeightInput(Number((weightInput * GRAMS_PER_TOLA).toFixed(2)));
                      setUnit('grams');
                    }
                  }}
                  style={{
                    padding: '3px 8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    border: 'none',
                    background: unit === 'grams' ? '#0f172a' : '#f8fafc',
                    color: unit === 'grams' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {t('Grams', 'ग्राम')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === 'grams') {
                      setWeightInput(Number((weightInput / GRAMS_PER_TOLA).toFixed(2)));
                      setUnit('tola');
                    }
                  }}
                  style={{
                    padding: '3px 8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    border: 'none',
                    background: unit === 'tola' ? '#0f172a' : '#f8fafc',
                    color: unit === 'tola' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {t('Tola', 'तोला')}
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                id="gold-weight-input"
                type="number"
                min="0"
                step="0.01"
                value={weightInput === 0 ? '' : weightInput}
                onChange={(e) => setWeightInput(parseFloat(e.target.value) || 0)}
                className="text-input"
                style={{ fontSize: '17px', fontWeight: 800, padding: '9px 12px' }}
                placeholder={t('Enter weight', 'तौल लेख्नुहोस्')}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  color: '#64748b',
                }}
              >
                {unit === 'grams' ? t('g', 'ग्राम') : t('Tola', 'तोला')}
              </span>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  if (unit === 'grams') {
                    setWeightInput(gender === 'female' ? 50 : 25);
                  } else {
                    setWeightInput(gender === 'female' ? 4.29 : 2.14);
                  }
                }}
                className="chip-btn"
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                {unit === 'grams'
                  ? gender === 'female'
                    ? t('50g (Free Limit)', '५० ग्राम (छुट)')
                    : t('25g (Free Limit)', '२५ ग्राम (छुट)')
                  : gender === 'female'
                  ? t('4.29 Tola (Free)', '४.२९ तोला (छुट)')
                  : t('2.14 Tola (Free)', '२.१४ तोला (छुट)')}
              </button>
              <button
                type="button"
                onClick={() => setWeightInput(unit === 'grams' ? 100 : 8.57)}
                className="chip-btn"
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                {unit === 'grams' ? '100g' : `8.57 ${t('Tola', 'तोला')}`}
              </button>
              <button
                type="button"
                onClick={() => setWeightInput(unit === 'grams' ? 150 : 12.86)}
                className="chip-btn"
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                {unit === 'grams' ? '150g' : `12.86 ${t('Tola', 'तोला')}`}
              </button>
              <button
                type="button"
                onClick={() => setWeightInput(unit === 'grams' ? 200 : 17.15)}
                className="chip-btn"
                style={{ fontSize: '11px', padding: '3px 8px' }}
              >
                {unit === 'grams' ? '200g' : `17.15 ${t('Tola', 'तोला')}`}
              </button>
            </div>
          </div>

          {/* 4. Departure Country (Clean Dropdown) */}
          <div>
            <label htmlFor="origin-select" className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700, fontSize: '13px' }}>
              {t('4. Travelling From', '४. प्रस्थान भएको देश')}
            </label>
            <select
              id="origin-select"
              value={origin}
              onChange={(e) => setOrigin(e.target.value as OriginRegion)}
              className="text-input"
              style={{ width: '100%', padding: '9px 12px', fontSize: '13.5px', fontWeight: 600 }}
            >
              {(Object.keys(ORIGIN_OPTIONS) as OriginRegion[]).map((key) => (
                <option key={key} value={key}>
                  {t(ORIGIN_OPTIONS[key].label, ORIGIN_OPTIONS[key].labelNep)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Live Calculation Results & Clearance Channel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Status Banner */}
          {calculation.channelStatus === 'green' && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                border: '1.5px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: 800, fontSize: '15px' }}>
                <ShieldCheck size={20} color="#059669" />
                <span>{t('GREEN CHANNEL — 100% DUTY-FREE', 'ग्रीन च्यानल — १००% भन्सार छुट')}</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#047857', margin: '4px 0 0', lineHeight: 1.45 }}>
                {t(
                  `Within the legal ${calculation.dutyFreeGrams}g duty-free limit. No customs duty payable (NPR 0).`,
                  `कानुनी ${calculation.dutyFreeGrams} ग्राम निःशुल्क सीमाभित्र छ। कुनै भन्सार महसुल लाग्दैन (रु ०)।`
                )}
              </p>
            </div>
          )}

          {calculation.channelStatus === 'red' && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1.5px solid #f59e0b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', fontWeight: 800, fontSize: '15px' }}>
                <AlertTriangle size={20} color="#d97706" />
                <span>{t('RED CHANNEL — DECLARE & PAY DUTY', 'रेड च्यानल — भन्सार महसुल बुझाउनुहोस्')}</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#b45309', margin: '4px 0 0', lineHeight: 1.45 }}>
                {t(
                  `First ${calculation.dutyFreeGrams}g is Free. Declare remaining ${calculation.taxableGrams.toFixed(2)}g excess at TIA Red Channel.`,
                  `पहिलो ${calculation.dutyFreeGrams} ग्राम निःशुल्क। बाँकी थप ${calculation.taxableGrams.toFixed(2)} ग्रामको लागि रेड च्यानलमा भन्सार तिर्नुपर्छ।`
                )}
              </p>
            </div>
          )}

          {calculation.channelStatus === 'prohibited' && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: '1.5px solid #ef4444',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontWeight: 800, fontSize: '15px' }}>
                <AlertOctagon size={20} color="#dc2626" />
                <span>
                  {metalCategory === 'raw_gold'
                    ? t('RAW GOLD RESTRICTION — HIGH SEIZURE RISK!', 'काँचो सुन प्रतिबन्ध — जफत हुने जोखिम!')
                    : t('EXCEEDS MAXIMUM LIMIT — CONFISCATION RISK!', 'अधिकतम सीमा नाघ्यो — जफत हुने जोखिम!')}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#b91c1c', margin: '4px 0 0', lineHeight: 1.45 }}>
                {metalCategory === 'raw_gold'
                  ? t(
                      'Raw gold bullion, bars, and coins do not qualify for ornament exemptions.',
                      'काँचो सुन, बिस्कुट वा सिक्कामा गहनाको छुट पाइँदैन।'
                    )
                  : t(
                      `Excess ${calculation.confiscatedGrams.toFixed(2)}g exceeds the legal passenger limit and is subject to seizure.`,
                      `थप ${calculation.confiscatedGrams.toFixed(2)} ग्राम कानुनी सीमाभन्दा बढी भएकाले जफत हुन सक्छ।`
                    )}
              </p>
            </div>
          )}

          {/* Main Payable Duty Card */}
          <div
            style={{
              padding: '22px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#003893', fontWeight: 800 }}>
                {t('Payable Customs Duty at Airport', 'विमानस्थलमा लाग्ने भन्सार महसुल')}
              </div>
              <div style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 900, color: '#003893', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                NPR {calculation.totalDutyNpr.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                {t(
                  `For ${calculation.totalGrams.toFixed(2)} Grams (${calculation.totalTola.toFixed(2)} Tola)`,
                  `${calculation.totalGrams.toFixed(2)} ग्राम (${calculation.totalTola.toFixed(2)} तोला) को लागि`
                )}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                {t('Estimated Nepal Value', 'नेपालमा बजार मूल्य')}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                ~NPR {calculation.estimatedMarketValueNpr.toLocaleString('en-IN')}
              </div>
              <Link
                href="/gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '11px',
                  color: '#38bdf8',
                  fontWeight: 700,
                  marginTop: '3px',
                  textDecoration: 'none',
                }}
              >
                <span>{t('Live Gold Rate', 'आजको सुनको भाउ')}</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* Itemized Breakdown Table */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                padding: '8px 14px',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12px',
                fontWeight: 800,
                color: '#334155',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{t('Calculation Breakdown', 'हिसाब विवरण')}</span>
              <span>{t('Amount / Weight', 'रकम / तौल')}</span>
            </div>

            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>{t('Total Weight Carried:', 'कुल तौल:')}</span>
                <strong style={{ color: '#0f172a' }}>
                  {calculation.totalGrams.toFixed(2)} g ({calculation.totalTola.toFixed(2)} {t('Tola', 'तोला')})
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#059669', fontWeight: 600 }}>{t('Duty-Free Allowance:', 'भन्सार छुट:')}</span>
                <strong style={{ color: '#059669' }}>
                  {calculation.dutyFreeGrams} g ({calculation.dutyFreeTola.toFixed(2)} {t('Tola', 'तोला')}) → NPR 0
                </strong>
              </div>

              {metalCategory === 'gold_ornaments' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569' }}>
                      {t(
                        `Tier 1 Excess (${calculation.slab1Grams.toFixed(1)}g @ NPR 1,050/g):`,
                        `तह १ थप (${calculation.slab1Grams.toFixed(1)} ग्राम @ रु १,०५०/ग्राम):`
                      )}
                    </span>
                    <strong style={{ color: '#0f172a' }}>NPR {calculation.slab1Duty.toLocaleString('en-IN')}</strong>
                  </div>

                  {calculation.slab2Grams > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#b45309' }}>
                        {t(
                          `Tier 2 Excess (${calculation.slab2Grams.toFixed(1)}g @ NPR 1,250/g):`,
                          `तह २ थप (${calculation.slab2Grams.toFixed(1)} ग्राम @ रु १,२५०/ग्राम):`
                        )}
                      </span>
                      <strong style={{ color: '#b45309' }}>NPR {calculation.slab2Duty.toLocaleString('en-IN')}</strong>
                    </div>
                  )}
                </>
              )}

              {calculation.confiscatedGrams > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px dashed #fca5a5',
                    color: '#dc2626',
                    fontWeight: 700,
                  }}
                >
                  <span>{t('Confiscation Risk Weight:', 'जफत हुने जोखिम तौल:')}</span>
                  <span>{calculation.confiscatedGrams.toFixed(2)} g</span>
                </div>
              )}

              {calculation.luxuryTaxInNepalNpr > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid #f1f5f9',
                    color: '#64748b',
                    fontSize: '11.5px',
                  }}
                >
                  <span>{t('2% Luxury Tax (if purchased inside Nepal):', 'नेपालमा किन्दा २% विलासिता कर:')}</span>
                  <span>NPR {calculation.luxuryTaxInNepalNpr.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
