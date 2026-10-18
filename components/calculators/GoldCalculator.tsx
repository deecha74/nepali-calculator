'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { DEFAULT_GOLD_RATES, GRAMS_PER_TOLA, LAL_PER_TOLA } from '@/lib/rates/goldRates';
import { useLanguage } from '@/components/LanguageContext';

export function GoldCalculator() {
  const { language, t } = useLanguage();
  const [metalType, setMetalType] = useState<'fine' | 'tejabi' | 'silver'>('fine');
  const [ratePerTola, setRatePerTola] = useState<number>(DEFAULT_GOLD_RATES.fineGold24K);
  const [liveRates, setLiveRates] = useState({
    fine: DEFAULT_GOLD_RATES.fineGold24K,
    tejabi: DEFAULT_GOLD_RATES.tejabiGold22K,
    silver: DEFAULT_GOLD_RATES.silver,
    isLive: false,
  });

  // Fetch real-time live rates
  React.useEffect(() => {
    async function loadLive() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (data.gold) {
            setLiveRates({
              fine: data.gold.fineGold24K || DEFAULT_GOLD_RATES.fineGold24K,
              tejabi: data.gold.tejabiGold22K || DEFAULT_GOLD_RATES.tejabiGold22K,
              silver: data.gold.silverPerTola || DEFAULT_GOLD_RATES.silver,
              isLive: true,
            });
            if (metalType === 'fine') setRatePerTola(data.gold.fineGold24K);
            else if (metalType === 'tejabi') setRatePerTola(data.gold.tejabiGold22K);
            else setRatePerTola(data.gold.silverPerTola);
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    loadLive();
  }, []);

  // Weight units
  const [weightUnit, setWeightUnit] = useState<'tola' | 'gram' | 'lal'>('tola');
  const [tolaAmount, setTolaAmount] = useState<number>(1);
  const [lalAmount, setLalAmount] = useState<number>(0);
  const [gramAmount, setGramAmount] = useState<number>(11.66);

  // Charges
  const [makingCharge, setMakingCharge] = useState<number>(2500); // Fixed or per tola
  const [wastageJartiPercent, setWastageJartiPercent] = useState<number>(2); // 2% jarti

  const [copied, setCopied] = useState<boolean>(false);

  // Synchronize base rate when metal type toggles
  const handleMetalChange = (type: 'fine' | 'tejabi' | 'silver') => {
    setMetalType(type);
    if (type === 'fine') setRatePerTola(liveRates.fine);
    else if (type === 'tejabi') setRatePerTola(liveRates.tejabi);
    else setRatePerTola(liveRates.silver);
  };

  // Convert all weights to Total Tola
  const totalTolas = useMemo(() => {
    if (weightUnit === 'tola') {
      return (tolaAmount || 0) + (lalAmount || 0) / LAL_PER_TOLA;
    } else if (weightUnit === 'gram') {
      return (gramAmount || 0) / GRAMS_PER_TOLA;
    } else {
      return (lalAmount || 0) / LAL_PER_TOLA;
    }
  }, [weightUnit, tolaAmount, lalAmount, gramAmount]);

  const totalGrams = totalTolas * GRAMS_PER_TOLA;

  const calculation = useMemo(() => {
    const baseMetalValue = totalTolas * ratePerTola;
    const wastageJartiValue = baseMetalValue * (wastageJartiPercent / 100);
    const totalMakingCharge = makingCharge;
    const grandTotal = baseMetalValue + wastageJartiValue + totalMakingCharge;

    return {
      baseMetalValue,
      wastageJartiValue,
      totalMakingCharge,
      grandTotal,
    };
  }, [totalTolas, ratePerTola, wastageJartiPercent, makingCharge]);

  const handleCopy = () => {
    const text = `Nepal Gold/Silver Calculation:
Metal: ${metalType.toUpperCase()} | Weight: ${totalTolas.toFixed(3)} Tola (${totalGrams.toFixed(2)}g)
Rate per Tola: रु ${ratePerTola.toLocaleString('en-IN')}
Making Charges: रु ${makingCharge} | Jarti (${wastageJartiPercent}%): रु ${Math.round(calculation.wastageJartiValue)}
TOTAL JEWELRY PRICE: रु ${Math.round(calculation.grandTotal).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber">{t('FENEGOSIDA Rates', 'नेपाल सुनचाँदी व्यवसायी महासंघ दर')}</span>
            <span className="badge badge-neutral">{t('Tola, Lal & Gram', 'तोला, लाल तथा ग्राम')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Gold & Silver Price & Jewelry Calculator', 'सुनचाँदी मूल्य तथा गहना हिसाब क्यालकुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate 24K Hallmark, 22K Tejabi, and Silver prices with making charges (ज्याला) and wastage (जर्ती).',
              '२४ क्यारेट छापावाल, २२ क्यारेट तेजाबी सुन र चाँदीको मूल्य, ज्याला र जर्ती सहितको वास्तविक गहना हिसाब।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t("Copied!", "कपी भयो!") : t("Copy Summary", "कपी गर्नुहोस्")}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          {/* Metal Type */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Select Precious Metal', 'धातु छनौट गर्नुहोस्')}</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`segmented-btn ${metalType === 'fine' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => handleMetalChange('fine')}
              >
                {t('🥇 24K Fine Gold', '🥇 २४ क्यारेट छापावाल सुन')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${metalType === 'tejabi' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => handleMetalChange('tejabi')}
              >
                {t('🥈 22K Tejabi Gold', '🥈 २२ क्यारेट तेजाबी सुन')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${metalType === 'silver' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => handleMetalChange('silver')}
              >
                {t('⚪ Pure Silver', '⚪ चाँदी (Silver)')}
              </button>
            </div>
          </div>

          {/* Daily Market Rate */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Market Rate per Tola (NPR)', 'प्रति तोला बजार मूल्य (रू)')}</label>
            <input
              type="number"
              min={1}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              value={ratePerTola}
              onChange={(e) => setRatePerTola(Number(e.target.value) || 0)}
            />
            <span className="input-subtext">{t('1 Tola = 11.6638 grams = 100 Lal', '१ तोला = ११.६६३८ ग्राम = १०० लाल')}</span>
          </div>

          {/* Weight Unit Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Weight Input Unit', 'तौल एकाइ प्रणाली')}</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button
                type="button"
                className={`segmented-btn ${weightUnit === 'tola' ? 'active' : ''}`}
                onClick={() => setWeightUnit('tola')}
              >
                {t('Tola + Lal', 'तोला र लाल')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${weightUnit === 'gram' ? 'active' : ''}`}
                onClick={() => setWeightUnit('gram')}
              >
                {t('Grams', 'ग्राम')}
              </button>
            </div>

            {weightUnit === 'tola' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('TOLA (तोला)', 'तोला (TOLA)')}</label>
                  <input
                    type="number"
                    min={0}
                    className="text-input"
                    value={tolaAmount}
                    onChange={(e) => setTolaAmount(Number(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('LAL (लाल, 0-99)', 'लाल (LAL, ०-९९)')}</label>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    className="text-input"
                    value={lalAmount}
                    onChange={(e) => setLalAmount(Number(e.target.value) || 0)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="input-label" style={{ fontSize: '11px' }}>{t('GRAMS (ग्राम)', 'ग्राम (GRAMS)')}</label>
                <input
                  type="number"
                  min={0}
                  className="text-input"
                  value={gramAmount}
                  onChange={(e) => setGramAmount(Number(e.target.value) || 0)}
                />
              </div>
            )}
          </div>

          {/* Making charge and Jarti */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '11px' }}>{t('Making Charge (Rs)', 'ज्याला (रू)')}</label>
              <input
                type="number"
                min={0}
                className="text-input"
                value={makingCharge}
                onChange={(e) => setMakingCharge(Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '11px' }}>{t('Wastage / Jarti (%)', 'जर्ती (%)')}</label>
              <input
                type="number"
                min={0}
                max={25}
                className="text-input"
                value={wastageJartiPercent}
                onChange={(e) => setWastageJartiPercent(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="result-card-highlight">
            <span className="stat-label">{t('Total Jewelry Price (गहनाको कुल मूल्य)', 'गहनाको जम्मा मूल्य (Total Jewelry Price)')}</span>
            <div className="stat-value" style={{ color: '#d97706', margin: '6px 0 2px' }}>
              रु {Math.round(calculation.grandTotal).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              {t('Net Weight:', 'जम्मा तौल:')} {totalTolas.toFixed(3)} {t('Tola', 'तोला')} ({totalGrams.toFixed(2)} {t('grams', 'ग्राम')})
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Pure Metal Value', 'धातुको खुद मूल्य')}</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.baseMetalValue).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Wastage / Jarti', 'जर्ती रकम')} ({wastageJartiPercent}%)</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.wastageJartiValue).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Making / Labor Charges', 'ज्याला रकम (Labor)')}</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.totalMakingCharge).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
