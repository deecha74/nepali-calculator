'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Plane,
  Scale,
  Copy,
  Check,
  FileText,
  ArrowRight,
  Info,
  Building2,
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
const GOLD_DUTY_SLAB_1_PER_GRAM = 1050; // First 100g excess
const GOLD_DUTY_SLAB_2_PER_GRAM = 1250; // Next 100g excess
const SILVER_DUTY_PER_GRAM = 15; // Rs. 150 per 10g on excess silver

const ORIGIN_GUIDANCE: Record<
  OriginRegion,
  {
    label: string;
    labelNep: string;
    note: string;
    tip: string;
  }
> = {
  uae_gulf: {
    label: 'Dubai (UAE), Qatar, Saudi Arabia, Kuwait, Oman',
    labelNep: 'दुबई (UAE), कतार, साउदी, कुवेत, ओमान',
    note: 'Passengers returning from Gulf countries face strict X-ray and physical inspection at Tribhuvan International Airport (TIA) for single-molded kadas, rings, or chains carried on behalf of third parties.',
    tip: 'Always keep your original Dubai/Doha VAT gold purchase invoice in your name and never carry gold parcels handed to you by strangers at the airport.',
  },
  australia_usa_uk: {
    label: 'Australia, USA, UK, Canada & Europe',
    labelNep: 'अष्ट्रेलिया, अमेरिका, बेलायत, क्यानडा र युरोप',
    note: 'NRNs, students, and visitors arriving from Australia, USA, or UK follow the exact same passenger baggage allowance (25g male / 50g female duty-free for personal ornaments).',
    tip: 'If you bring 24K investment coins or bullion bars from Perth Mint, Royal Mint, or Costco USA, they do NOT qualify as personal jewelry and must be declared at the Red Channel.',
  },
  malaysia_korea: {
    label: 'Malaysia, South Korea (EPS) & Japan',
    labelNep: 'मलेसिया, दक्षिण कोरिया र जापान',
    note: 'Returning workers with valid labor permits (Shram Swikriti) can bring up to 25g (men) or 50g (women) of worn multi-piece personal gold jewelry duty-free.',
    tip: 'Crude unpolished rings or thick single-molded bangles without clasps are classified as raw gold by TIA Customs and risk seizure.',
  },
  india: {
    label: 'India (Air or Land Border Entry)',
    labelNep: 'भारत (हवाई वा स्थल नाका)',
    note: 'Indian customs rules and Nepal customs rules are separate. Wearing personal jewelry across the border requires proof of ownership if the quantity exceeds 25g (men) or 50g (women).',
    tip: 'Carry purchase bills for wedding jewelry when crossing customs checkpoints to prove personal ownership.',
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
      // Raw gold / biscuits / bullion bars are not eligible for the 25g/50g ornament duty-free exemption
      // and undeclared import is subject to confiscation; up to 100g declared under special returnee rules incurs full 20% tariff or flat slab
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

    // Standard Gold Ornaments (सुनका गहना)
    const dutyFreeGrams = gender === 'female' ? 50 : 25;
    const excessGrams = Math.max(0, totalGrams - dutyFreeGrams);

    // Slab 1: First 100g beyond duty-free limit
    const slab1Grams = Math.min(excessGrams, 100);
    // Slab 2: Next 100g (100g to 200g beyond duty-free limit)
    const slab2Grams = Math.min(Math.max(0, excessGrams - 100), 100);
    // Beyond +200g excess: Confiscated (जफत)
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

  const handlePresetClick = (val: number, presetUnit: WeightUnit) => {
    setUnit(presetUnit);
    setWeightInput(val);
  };

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

  const originInfo = ORIGIN_GUIDANCE[origin];

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1040px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#fef3c7',
              color: '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>
                TIA Airport Baggage Rules
              </span>
              <span className="badge badge-neutral">झिटिगुन्टा आदेश २०८३/८४</span>
            </div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              {t('Gold & Silver Customs Duty Calculator', 'सुनचाँदी भन्सार महसुल क्याल्कुलेटर')}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied Summary!' : 'Copy Result'}</span>
        </button>
      </div>

      {/* Main 2-Column Interactive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Left Column: Inputs */}
        <div>
          {/* 1. Metal Category */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              1. Type of Gold / Silver Carried (सुन वा चाँदीको प्रकार)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setMetalCategory('gold_ornaments')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: metalCategory === 'gold_ornaments' ? '2px solid #d97706' : '1px solid var(--border-subtle)',
                  background: metalCategory === 'gold_ornaments' ? '#fffbeb' : '#ffffff',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    💍 Gold Ornaments / Jewelry (तयारी सुनका गहना)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Necklace, chain, earrings, rings, bangles (Eligible for 25g / 50g duty-free)
                  </div>
                </div>
                {metalCategory === 'gold_ornaments' && <ShieldCheck size={18} color="#d97706" />}
              </button>

              <button
                type="button"
                onClick={() => setMetalCategory('raw_gold')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: metalCategory === 'raw_gold' ? '2px solid #dc2626' : '1px solid var(--border-subtle)',
                  background: metalCategory === 'raw_gold' ? '#fef2f2' : '#ffffff',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    🪙 Raw Gold, Biscuits, Coins or Single-Molded Kada (काँचो सुन / बिस्कुट)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Bullion bars, 24K coins, unclasped crude rings (0g duty-free allowance)
                  </div>
                </div>
                {metalCategory === 'raw_gold' && <AlertTriangle size={18} color="#dc2626" />}
              </button>

              <button
                type="button"
                onClick={() => setMetalCategory('silver_ornaments')}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: metalCategory === 'silver_ornaments' ? '2px solid #0284c7' : '1px solid var(--border-subtle)',
                  background: metalCategory === 'silver_ornaments' ? '#f0f9ff' : '#ffffff',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    🥈 Silver Ornaments / Utensils (चाँदीका गहना — ५०० ग्रामसम्म छुट)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Up to 500 grams of personal silver ornaments allowed duty-free
                  </div>
                </div>
                {metalCategory === 'silver_ornaments' && <ShieldCheck size={18} color="#0284c7" />}
              </button>
            </div>
          </div>

          {/* 2. Passenger Gender */}
          {metalCategory === 'gold_ornaments' && (
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
                2. Passenger Category (यात्रुको वर्ग र भन्सार छुट सीमा)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    border: gender === 'female' ? '2px solid #059669' : '1px solid var(--border-subtle)',
                    background: gender === 'female' ? '#ecfdf5' : '#ffffff',
                    color: gender === 'female' ? '#065f46' : 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  👩 Female Passenger
                  <div style={{ fontSize: '11.5px', fontWeight: 600, marginTop: '3px', opacity: 0.85 }}>
                    Up to 50g (~4.29 Tola) Free
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGender('male')}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    border: gender === 'male' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
                    background: gender === 'male' ? '#eff6ff' : '#ffffff',
                    color: gender === 'male' ? '#1e40af' : 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  👨 Male Passenger
                  <div style={{ fontSize: '11.5px', fontWeight: 600, marginTop: '3px', opacity: 0.85 }}>
                    Up to 25g (~2.14 Tola) Free
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* 3. Weight Input + Unit Toggle */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label htmlFor="gold-weight-input" className="input-label" style={{ fontWeight: 700, fontSize: '13.5px', margin: 0 }}>
                3. Total Weight Carried ({unit === 'grams' ? 'in Grams' : 'in Tola'})
              </label>
              <div style={{ display: 'inline-flex', borderRadius: '8px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === 'tola') {
                      setWeightInput(Number((weightInput * GRAMS_PER_TOLA).toFixed(2)));
                      setUnit('grams');
                    }
                  }}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    background: unit === 'grams' ? '#0f172a' : '#f8fafc',
                    color: unit === 'grams' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  Grams (g)
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
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    background: unit === 'tola' ? '#0f172a' : '#f8fafc',
                    color: unit === 'tola' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  Tola (तोला)
                </button>
              </div>
            </div>

            <input
              id="gold-weight-input"
              type="number"
              min={0}
              max={1000}
              step="any"
              className="text-input"
              value={weightInput}
              onChange={(e) => setWeightInput(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', fontSize: '16px', fontWeight: 700 }}
            />

            {/* Quick Weight Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {[
                { label: '25g (Male Free)', val: 25, u: 'grams' as WeightUnit },
                { label: '50g (Female Free)', val: 50, u: 'grams' as WeightUnit },
                { label: '100g', val: 100, u: 'grams' as WeightUnit },
                { label: '150g', val: 150, u: 'grams' as WeightUnit },
                { label: '1 Tola (11.66g)', val: 1, u: 'tola' as WeightUnit },
                { label: '5 Tola (58.32g)', val: 5, u: 'tola' as WeightUnit },
                { label: '10 Tola (116.6g)', val: 10, u: 'tola' as WeightUnit },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePresetClick(preset.val, preset.u)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Country of Departure */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="origin-select" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              4. Travelling From (कुन देशबाट आउँदै हुनुहुन्छ?)
            </label>
            <select
              id="origin-select"
              value={origin}
              onChange={(e) => setOrigin(e.target.value as OriginRegion)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '13.5px', fontWeight: 600 }}
            >
              {(Object.keys(ORIGIN_GUIDANCE) as OriginRegion[]).map((key) => (
                <option key={key} value={key}>
                  {ORIGIN_GUIDANCE[key].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Live Customs Result & Channel Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Status Banner */}
          {calculation.channelStatus === 'green' && (
            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                border: '1.5px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#065f46', fontWeight: 800, fontSize: '16px' }}>
                <ShieldCheck size={22} color="#059669" />
                <span>GREEN CHANNEL — 100% DUTY-FREE (भन्सार छुट)</span>
              </div>
              <p style={{ fontSize: '13px', color: '#047857', margin: '6px 0 0', lineHeight: 1.5 }}>
                Your {calculation.totalGrams.toFixed(2)}g ({calculation.totalTola.toFixed(2)} Tola) is within the{' '}
                <strong>{calculation.dutyFreeGrams}g legal duty-free limit</strong>. You pay <strong>NPR 0</strong> at Tribhuvan International Airport Customs.
              </p>
            </div>
          )}

          {calculation.channelStatus === 'red' && (
            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1.5px solid #f59e0b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#92400e', fontWeight: 800, fontSize: '16px' }}>
                <AlertTriangle size={22} color="#d97706" />
                <span>RED CHANNEL — DECLARE & PAY CUSTOMS DUTY</span>
              </div>
              <p style={{ fontSize: '13px', color: '#b45309', margin: '6px 0 0', lineHeight: 1.5 }}>
                Your first <strong>{calculation.dutyFreeGrams}g is Duty-Free</strong>, and the remaining{' '}
                <strong>{calculation.taxableGrams.toFixed(2)}g excess</strong> must be declared at the TIA Customs Red Channel counter.
              </p>
            </div>
          )}

          {calculation.channelStatus === 'prohibited' && (
            <div
              style={{
                padding: '18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                border: '1.5px solid #ef4444',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#991b1b', fontWeight: 800, fontSize: '16px' }}>
                <AlertOctagon size={22} color="#dc2626" />
                <span>
                  {metalCategory === 'raw_gold'
                    ? 'RAW GOLD RESTRICTION — HIGH SEIZURE RISK!'
                    : 'EXCEEDS MAXIMUM LIMIT — CONFISCATION RISK (जफत हुने)!'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: '6px 0 0', lineHeight: 1.5 }}>
                {metalCategory === 'raw_gold'
                  ? 'Raw gold bars, biscuits, 24K coins, and crude single-molded kadas do NOT qualify for the 25g/50g ornament exemption. Undeclared raw gold is confiscated under the Nepal Customs Act.'
                  : `Passengers cannot clear more than +200g above their duty-free allowance. The excess ${calculation.confiscatedGrams.toFixed(2)}g exceeds the legal baggage ceiling and is subject to seizure (जफत) at TIA Customs.`}
              </p>
            </div>
          )}

          {/* Main Payable Duty Card */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700 }}>
                Estimated TIA Airport Customs Duty Payable
              </div>
              <div style={{ fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: 900, color: '#fbbf24', marginTop: '4px' }}>
                NPR {calculation.totalDutyNpr.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
                For {calculation.totalGrams.toFixed(2)} Grams ({calculation.totalTola.toFixed(2)} Tola)
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Estimated Nepal Value</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                ~NPR {calculation.estimatedMarketValueNpr.toLocaleString('en-IN')}
              </div>
              <Link
                href="/gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11.5px',
                  color: '#38bdf8',
                  fontWeight: 700,
                  marginTop: '4px',
                  textDecoration: 'none',
                }}
              >
                <span>Check Live Gold Rate</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Itemized Breakdown Table */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#334155',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Customs Slab Breakdown (भन्सार महसुल विवरण)</span>
              <span>Amount / Weight</span>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Total Weight Carried:</span>
                <strong style={{ color: '#0f172a' }}>
                  {calculation.totalGrams.toFixed(2)} g ({calculation.totalTola.toFixed(2)} Tola)
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#059669', fontWeight: 600 }}>Duty-Free Allowance (भन्सार छुट):</span>
                <strong style={{ color: '#059669' }}>
                  {calculation.dutyFreeGrams} g ({calculation.dutyFreeTola.toFixed(2)} Tola) → NPR 0
                </strong>
              </div>

              {metalCategory === 'gold_ornaments' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569' }}>
                      Tier 1 Excess ({calculation.slab1Grams.toFixed(1)}g @ NPR 1,050/g):
                    </span>
                    <strong style={{ color: '#0f172a' }}>NPR {calculation.slab1Duty.toLocaleString('en-IN')}</strong>
                  </div>

                  {calculation.slab2Grams > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#b45309' }}>
                        Tier 2 Excess ({calculation.slab2Grams.toFixed(1)}g @ NPR 1,250/g):
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
                    paddingTop: '8px',
                    borderTop: '1px dashed #fca5a5',
                    color: '#dc2626',
                    fontWeight: 700,
                  }}
                >
                  <span>Prohibited / Confiscation Risk Weight:</span>
                  <span>{calculation.confiscatedGrams.toFixed(2)} g (जफत हुने सीमा)</span>
                </div>
              )}

              {calculation.luxuryTaxInNepalNpr > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid #f1f5f9',
                    color: '#64748b',
                    fontSize: '12px',
                  }}
                >
                  <span>2% Luxury Tax if bought inside Nepal (&gt;10 Lakh):</span>
                  <span>NPR {calculation.luxuryTaxInNepalNpr.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Country-Specific Advisory Note */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#334155',
            }}
          >
            <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plane size={15} color="#2563eb" />
              <span>Arrival Advisory: {originInfo.label}</span>
            </div>
            <p style={{ margin: '0 0 6px' }}>{originInfo.note}</p>
            <p style={{ margin: 0, color: '#0f766e', fontWeight: 600 }}>💡 Travel Tip: {originInfo.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
