'use client';

import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  MapPin, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Info,
  Layers,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { calculateBatoKatta, LandSystem, BatoKattaResult } from '@/lib/utils/batoKatta';

export function BatoKattaCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const [system, setSystem] = useState<LandSystem>('ropani');

  // Ropani inputs (default: 0 Ropani, 4 Aana, 0 Paisa, 0 Daam)
  const [ropani, setRopani] = useState<number>(0);
  const [aana, setAana] = useState<number>(4);
  const [paisa, setPaisa] = useState<number>(0);
  const [daam, setDaam] = useState<number>(0);

  // Bigha inputs (default: 0 Bigha, 10 Kattha, 0 Dhur)
  const [bigha, setBigha] = useState<number>(0);
  const [kattha, setKattha] = useState<number>(10);
  const [dhur, setDhur] = useState<number>(0);

  // Direct Sq Ft
  const [directSqFt, setDirectSqFt] = useState<number>(1369);

  // Road parameters (default 13 ft road width, 40 ft length)
  const [roadWidthFt, setRoadWidthFt] = useState<number>(13);
  const [roadLengthFt, setRoadLengthFt] = useState<number>(40);

  // Land Rate per Aana or per Kattha
  const [ratePerUnit, setRatePerUnit] = useState<number>(2500000); // 25 Lakhs/Aana

  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  const result: BatoKattaResult = useMemo(() => {
    return calculateBatoKatta({
      system,
      ropani,
      aana,
      paisa,
      daam,
      bigha,
      kattha,
      dhur,
      directSqFt,
      roadWidthFt,
      roadLengthFt,
      ratePerUnit,
    });
  }, [system, ropani, aana, paisa, daam, bigha, kattha, dhur, directSqFt, roadWidthFt, roadLengthFt, ratePerUnit]);

  // Formatters
  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(formatted) : formatted;
  };

  const formatCurrency = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? `रू. ${toNepaliDigits(formatted)}` : `NPR ${formatted}`;
  };

  const handleCopy = () => {
    const textEn = `Nepal Land Road Deduction (बाटो कट्टा हिसाब):
Gross Land Area: ${result.grossSqFt} sq. ft. (${result.grossRopani.formattedEn})
Road Dimensions: ${roadWidthFt} ft wide × ${roadLengthFt} ft length
• Road Area Deducted: ${result.roadDeductionSqFt} sq. ft. (${result.roadRopani.formattedEn}) [${result.percentageRoadLost}% of land]
• Net Remaining Usable Land: ${result.netRemainingSqFt} sq. ft. (${result.netRopani.formattedEn})

Valuation Impact:
• Gross Purchase Rate: NPR ${ratePerUnit.toLocaleString('en-IN')} / Aana
• Real Effective Usable Cost: NPR ${result.effectiveCostPerNetAana.toLocaleString('en-IN')} / Remaining Aana (+${result.priceIncreasePercentage}%)
Calculated via Nepali Calc: https://nepalcalc.com/bato-katta`;

    const textNe = `जग्गा बाटो कट्टा तथा बाँकी क्षेत्रफल विवरण:
कुल प्रारम्भिक क्षेत्रफल: ${toNepaliDigits(result.grossSqFt)} वर्ग फिट (${result.grossRopani.formattedNe})
बाटोको आकार: ${toNepaliDigits(roadWidthFt)} फिट चौडाइ × ${toNepaliDigits(roadLengthFt)} फिट लम्बाइ
• बाटोमा कट्टा भएको क्षेत्रफल: ${toNepaliDigits(result.roadDeductionSqFt)} वर्ग फिट (${result.roadRopani.formattedNe}) [जग्गाको ${toNepaliDigits(result.percentageRoadLost)}%]
• बाँकी उपयोगयोग्य खुद क्षेत्रफल: ${toNepaliDigits(result.netRemainingSqFt)} वर्ग फिट (${result.netRopani.formattedNe})

मूल्य प्रभाव (Real Usable Rate):
• सुरु दर: रू. ${toNepaliDigits(ratePerUnit.toLocaleString('ne-NP'))} प्रति आना
• बाटो कट्टा पछिको वास्तविक उपयोग दर: रू. ${toNepaliDigits(result.effectiveCostPerNetAana.toLocaleString('ne-NP'))} प्रति बाँकी आना (+${toNepaliDigits(result.priceIncreasePercentage)}%)
नेपाली क्याल्क मार्फत हिसाब गरिएको: https://nepalcalc.com/bato-katta`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `Land Road Deduction: ${result.grossSqFt} sq ft land minus ${roadWidthFt}ft x ${roadLengthFt}ft road (${result.roadDeductionSqFt} sq ft lost) leaves ${result.netRemainingSqFt} sq ft (${result.netRopani.formattedEn}). Check full calculation on: https://nepalcalc.com/bato-katta`
    );
    const messageNe = encodeURIComponent(
      `जग्गा बाटो कट्टा: ${toNepaliDigits(result.grossSqFt)} वर्ग फिट जग्गामा ${toNepaliDigits(roadWidthFt)} फिट × ${toNepaliDigits(roadLengthFt)} फिट बाटो (${toNepaliDigits(result.roadDeductionSqFt)} वर्ग फिट) कट्टा गर्दा बाँकी खुद ${toNepaliDigits(result.netRemainingSqFt)} वर्ग फिट (${result.netRopani.formattedNe}) रहन्छ। पूर्ण हिसाब हेर्नुहोस्: https://nepalcalc.com/bato-katta`
    );

    window.open(`https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Landmark size={12} />
              {t('Plotting & Land Subdivision', 'जग्गा प्लटिङ तथा कित्ताकाट')}
            </span>
            <span className="badge badge-neutral">
              {t('Road Width & Usable Area', 'बाटो चौडाइ र खुद क्षेत्रफल')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('Land Road Deduction (Bato Katta) Calculator', 'जग्गा बाटो कट्टा तथा बाँकी क्षेत्रफल क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Calculate total road area deducted for 10 ft, 13 ft, 16 ft, or 20 ft roads, net saleable land in Ropani or Bigha, and effective usable price per Aana.',
              'जग्गा प्लटिङ वा खरिदबिक्रीमा १०, १३, १६, २० वा २६ फिट बाटो छोड्दा कति क्षेत्रफल बाटोमा जान्छ र खुद बाँकी क्षेत्रफल कति रहन्छ हिसाब गर्नुहोस्।'
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
        {/* Left Column: Land & Road Inputs */}
        <div>
          {/* Measurement System Selector */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
            <button
              type="button"
              onClick={() => setSystem('ropani')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: `1.5px solid ${system === 'ropani' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                background: system === 'ropani' ? 'var(--primary-light, #eff6ff)' : 'transparent',
                color: system === 'ropani' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {t('Ropani-Aana (पहाड)', 'रोपनी-आना (पहाड)')}
            </button>
            <button
              type="button"
              onClick={() => setSystem('bigha')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: `1.5px solid ${system === 'bigha' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                background: system === 'bigha' ? 'var(--primary-light, #eff6ff)' : 'transparent',
                color: system === 'bigha' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {t('Bigha-Kattha (तराई)', 'बिघा-कट्ठा (तराई)')}
            </button>
            <button
              type="button"
              onClick={() => setSystem('sqft')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: `1.5px solid ${system === 'sqft' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                background: system === 'sqft' ? 'var(--primary-light, #eff6ff)' : 'transparent',
                color: system === 'sqft' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {t('Sq. Feet (वर्ग फिट)', 'वर्ग फिट')}
            </button>
          </div>

          {/* Area Inputs */}
          {system === 'ropani' && (
            <div style={{ 
              background: 'var(--bg-elevated, #f8fafc)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '18px' 
            }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: '10px' }}>
                {t('Initial Land Area (कुल जग्गा क्षेत्रफल)', 'कुल जग्गा क्षेत्रफल (रोपनी-आना-पैसा-दाम)')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Ropani', 'रोपनी')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={ropani}
                    onChange={(e) => setRopani(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Aana', 'आना')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={aana}
                    onChange={(e) => setAana(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Paisa', 'पैसा')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={paisa}
                    onChange={(e) => setPaisa(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Daam', 'दाम')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={daam}
                    onChange={(e) => setDaam(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          )}

          {system === 'bigha' && (
            <div style={{ 
              background: 'var(--bg-elevated, #f8fafc)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '18px' 
            }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: '10px' }}>
                {t('Initial Land Area (कुल जग्गा क्षेत्रफल)', 'कुल जग्गा क्षेत्रफल (बिघा-कट्ठा-धुर)')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Bigha', 'बिघा')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={bigha}
                    onChange={(e) => setBigha(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Kattha', 'कट्ठा')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={kattha}
                    onChange={(e) => setKattha(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('Dhur', 'धुर')}</label>
                  <input
                    type="number"
                    min="0"
                    className="number-input"
                    value={dhur}
                    onChange={(e) => setDhur(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          )}

          {system === 'sqft' && (
            <div style={{ marginBottom: '18px' }}>
              <label className="input-label" style={{ fontWeight: 600 }}>
                {t('Total Land Area in Sq. Feet', 'कुल जग्गा क्षेत्रफल (वर्ग फिटमा)')}
              </label>
              <input
                type="number"
                min="100"
                className="number-input"
                value={directSqFt || ''}
                onChange={(e) => setDirectSqFt(parseFloat(e.target.value) || 0)}
                style={{ fontSize: '16px', fontWeight: 700 }}
              />
            </div>
          )}

          {/* Road Width Section */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '6px' }}>
              {t('Road Width in Feet (बाटोको चौडाइ - फिट)', 'बाटोको चौडाइ (फिटमा)')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '8px' }}>
              {[10, 13, 16, 20, 26].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setRoadWidthFt(w)}
                  style={{
                    padding: '8px 2px',
                    borderRadius: '8px',
                    border: `1.5px solid ${roadWidthFt === w ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    background: roadWidthFt === w ? 'var(--primary)' : 'var(--bg-card)',
                    color: roadWidthFt === w ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {isNe ? `${toNepaliDigits(w)} फिट` : `${w} ft`}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px' }}>
                {t('Custom Feet', 'फिट')}
              </span>
              <input
                type="number"
                min="1"
                step="0.5"
                className="number-input"
                value={roadWidthFt}
                onChange={(e) => setRoadWidthFt(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Road Length Section */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {t('Road Length Passing Through Plot (बाटोको लम्बाइ - फिट)', 'जग्गामा पर्ने बाटोको लम्बाइ (फिटमा)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px' }}>
                {t('Feet', 'फिट')}
              </span>
              <input
                type="number"
                min="1"
                step="1"
                className="number-input"
                value={roadLengthFt}
                onChange={(e) => setRoadLengthFt(parseFloat(e.target.value) || 0)}
                style={{ fontSize: '16px', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Price per Aana / Kattha (Optional) */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {system === 'bigha'
                ? t('Land Rate per Kattha (प्रति कट्ठा दर)', 'जग्गाको दर (प्रति कट्ठा)')
                : t('Land Rate per Aana (प्रति आना दर)', 'जग्गाको दर (प्रति आना)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>
                {isNe ? 'रू.' : 'NPR'}
              </span>
              <input
                type="number"
                min="0"
                step="50000"
                className="number-input"
                value={ratePerUnit || ''}
                onChange={(e) => setRatePerUnit(parseFloat(e.target.value) || 0)}
                style={{ paddingLeft: '55px', fontSize: '16px', fontWeight: 700 }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Net Usable Area & Financial Reality */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Header pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Net Usable / Saleable Land Area', 'बाँकी उपयोगयोग्य खुद क्षेत्रफल')}
              </span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} />
                {t('Net Usable Area', 'खुद बाँकी')}
              </span>
            </div>

            {/* Giant Big Net Area */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#059669', lineHeight: 1.2 }}>
                {isNe ? result.netRopani.formattedNe : result.netRopani.formattedEn}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px' }}>
                {formatNumber(result.netRemainingSqFt)} {t('Square Feet', 'वर्ग फिट')}
              </div>
            </div>

            {/* Deducted Area Breakdown Card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>
                  {t('Road Area Deducted (बाटोमा गएको):', 'बाटोमा कट्टा भएको क्षेत्रफल:')}
                </span>
                <span className="badge badge-amber" style={{ fontSize: '11px' }}>
                  {isNe ? `${toNepaliDigits(result.percentageRoadLost)}% जग्गा बाटोमा` : `${result.percentageRoadLost}% of plot`}
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatNumber(result.roadDeductionSqFt)} {t('sq. ft.', 'वर्ग फिट')}{' '}
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  ({isNe ? result.roadRopani.formattedNe : result.roadRopani.formattedEn})
                </span>
              </div>
            </div>

            {/* Real Usable Price Impact Card */}
            {ratePerUnit > 0 && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {t('Real Land Cost Reality Check (सच्चा मूल्य हिसाब)', 'वास्तविक उपयोग दर हिसाब (Real Usable Rate)')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{t('Gross Purchase Rate:', 'सुरु खरिद दर:')}</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(ratePerUnit)} / आना</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    {t('Real Usable Rate / Remaining Aana:', 'बाटो छाडेपछिको खुद दर / बाँकी आना:')}
                  </span>
                  <span style={{ fontWeight: 900, color: '#b45309' }}>
                    {formatCurrency(result.effectiveCostPerNetAana)}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', textAlign: 'right' }}>
                  {isNe 
                    ? `(बाटो कट्टाले गर्दा वास्तविक दर +${toNepaliDigits(result.priceIncreasePercentage)}% महँगो पर्न जान्छ)`
                    : `(+${result.priceIncreasePercentage}% increase per usable unit)`}
                </div>
              </div>
            )}

            {/* Note */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <Info size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'Standard conversion: 1 Aana = 342.25 sq. ft. | 1 Ropani = 16 Aana = 5,476 sq. ft. | 1 Kattha = 3,645 sq. ft. | 1 Bigha = 20 Kattha = 72,900 sq. ft.',
                  'प्रमाणित नाप: १ आना = ३४२.२५ वर्ग फिट | १ रोपनी = १६ आना = ५,४७६ वर्ग फिट | १ कट्ठा = २० धुर = ३,६४५ वर्ग फिट | १ बिघा = ७२,९०० वर्ग फिट।'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
