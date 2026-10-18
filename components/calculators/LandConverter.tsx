'use client';

import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  ArrowLeftRight, 
  DollarSign, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { 
  ropaniToSqFt, 
  bighaToSqFt, 
  sqFtToRopani, 
  sqFtToBigha, 
  SQFT_PER_SQMTR, 
  SQFT_PER_ACRE, 
  SQFT_PER_AANA, 
  SQFT_PER_KATTHA, 
  SQFT_PER_DHUR, 
  SQFT_PER_ROPANI, 
  SQFT_PER_BIGHA 
} from '@/lib/rates/landRates';
import { useLanguage } from '@/components/LanguageContext';

export function LandConverter({ initialSlug, titleTag = 'h1' }: { initialSlug?: string; titleTag?: 'h1' | 'h2' }) {
  const { language, t } = useLanguage();
  const TitleHeading = titleTag;
  // Input mode: 'ropani' | 'bigha' | 'sqft'
  const [activeTab, setActiveTab] = useState<'ropani' | 'bigha' | 'sqft'>('ropani');

  // Hill inputs
  const [ropani, setRopani] = useState<number>(0);
  const [aana, setAana] = useState<number>(4);
  const [paisa, setPaisa] = useState<number>(2);
  const [daam, setDaam] = useState<number>(0);

  // Terai inputs
  const [bigha, setBigha] = useState<number>(0);
  const [kattha, setKattha] = useState<number>(5);
  const [dhur, setDhur] = useState<number>(10);
  const [kanwa, setKanwa] = useState<number>(0);

  // Sqft input
  const [directSqFt, setDirectSqFt] = useState<number>(1540);

  // Price Calculation
  const [priceRateUnit, setPriceRateUnit] = useState<'perAana' | 'perKattha' | 'perDhur' | 'perRopani' | 'perSqFt'>('perAana');
  const [rateAmount, setRateAmount] = useState<number>(4500000); // 45 Lakhs per Aana

  const [copied, setCopied] = useState<boolean>(false);

  // Derived Total Square Feet
  const totalSqFt = useMemo(() => {
    if (activeTab === 'ropani') {
      return ropaniToSqFt(ropani, aana, paisa, daam);
    } else if (activeTab === 'bigha') {
      return bighaToSqFt(bigha, kattha, dhur, kanwa);
    } else {
      return directSqFt || 0;
    }
  }, [activeTab, ropani, aana, paisa, daam, bigha, kattha, dhur, kanwa, directSqFt]);

  // Derived conversions
  const hillBreakdown = useMemo(() => sqFtToRopani(totalSqFt), [totalSqFt]);
  const teraiBreakdown = useMemo(() => sqFtToBigha(totalSqFt), [totalSqFt]);
  const totalSqMtr = totalSqFt / SQFT_PER_SQMTR;
  const totalAcres = totalSqFt / SQFT_PER_ACRE;

  // Valuation Calculation
  const estimatedPrice = useMemo(() => {
    if (!rateAmount || rateAmount <= 0) return 0;
    let unitArea = 1;
    if (priceRateUnit === 'perAana') {
      unitArea = totalSqFt / SQFT_PER_AANA;
    } else if (priceRateUnit === 'perRopani') {
      unitArea = totalSqFt / SQFT_PER_ROPANI;
    } else if (priceRateUnit === 'perKattha') {
      unitArea = totalSqFt / SQFT_PER_KATTHA;
    } else if (priceRateUnit === 'perDhur') {
      unitArea = totalSqFt / SQFT_PER_DHUR;
    } else if (priceRateUnit === 'perSqFt') {
      unitArea = totalSqFt;
    }
    return unitArea * rateAmount;
  }, [totalSqFt, priceRateUnit, rateAmount]);

  const handleCopy = () => {
    const text = `Nepal Land Area Measurement:
Hill/Valley: ${hillBreakdown.ropani} Ropani, ${hillBreakdown.aana} Aana, ${hillBreakdown.paisa} Paisa, ${hillBreakdown.daam} Daam
Terai: ${teraiBreakdown.bigha} Bigha, ${teraiBreakdown.kattha} Kattha, ${teraiBreakdown.dhur} Dhur
Area: ${Math.round(totalSqFt).toLocaleString('en-IN')} Sq. Ft (${(Math.round(totalSqMtr * 100) / 100)} Sq. M)
Estimated Value: रु ${Math.round(estimatedPrice).toLocaleString('en-IN')}
Calculated on NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="white-card" 
      style={{ 
        maxWidth: '100%', 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 0 clamp(24px, 3.5vw, 40px) 0', 
        border: 'none',
        boxShadow: 'none',
        background: 'transparent',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('Nepal Land Survey Standard', 'नापी विभाग आधिकारिक मापदण्ड')}</span>
            <span className="badge badge-neutral">{t('Dual System (Hill & Terai)', 'पहाड तथा तराई दोहोरो प्रणाली')}</span>
          </div>
          <TitleHeading style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Nepal Land Measurement & Price Calculator', 'जग्गा नापजाँच तथा मूल्य क्यालकुलेटर')}
          </TitleHeading>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Instant cross-conversion between Ropani, Bigha, Square Feet, and total land valuation.',
              'रोपनी, आना, पैसा, दाम र बिघा, कट्ठा, धुर बीच तुरुन्त रूपान्तरण र जग्गाको कुल मूल्य हिसाब।'
            )}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '13px' }}
        >
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t("Copied Summary!", "कपी भयो!") : t("Copy Summary", "कपी गर्नुहोस्")}</span>
        </button>
      </div>

      {/* Primary Input Mode Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'ropani' ? 'active' : ''}`}
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
          onClick={() => setActiveTab('ropani')}
        >
          {t('🏔️ Hill System (Ropani-Aana)', '🏔️ पहाड (रोपनी-आना)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'bigha' ? 'active' : ''}`}
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
          onClick={() => setActiveTab('bigha')}
        >
          {t('🌾 Terai System (Bigha-Kattha)', '🌾 तराई (विघा-कठ्ठा)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'sqft' ? 'active' : ''}`}
          style={{ flexShrink: 0, padding: '8px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}
          onClick={() => setActiveTab('sqft')}
        >
          {t('📐 Sq. Feet / Meters', '📐 वर्ग फिट / मिटर')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Input Panel */}
        <div>
          {activeTab === 'ropani' && (
            <div>
              <span className="input-label" style={{ fontSize: '14px', marginBottom: '12px' }}>
                {t('Enter Ropani-Aana-Paisa-Daam Area:', 'रोपनी-आना-पैसा-दाम क्षेत्रफल राख्नुहोस्:')}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('ROPANI', 'रोपनी')}</label>
                  <input
                    type="number"
                    min={0}
                    className="text-input"
                    value={ropani}
                    onChange={(e) => setRopani(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('AANA', 'आना')}</label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    className="text-input"
                    value={aana}
                    onChange={(e) => setAana(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('PAISA', 'पैसा')}</label>
                  <input
                    type="number"
                    min={0}
                    max={3}
                    className="text-input"
                    value={paisa}
                    onChange={(e) => setPaisa(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('DAAM', 'दाम')}</label>
                  <input
                    type="number"
                    min={0}
                    max={3}
                    className="text-input"
                    value={daam}
                    onChange={(e) => setDaam(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>

              {/* Quick helper buttons */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button type="button" className="segmented-btn" onClick={() => { setRopani(0); setAana(4); setPaisa(0); setDaam(0); }}>{t('4 Aana (Standard Plot)', '४ आना (घडेरी)')}</button>
                <button type="button" className="segmented-btn" onClick={() => { setRopani(1); setAana(0); setPaisa(0); setDaam(0); }}>{t('1 Ropani', '१ रोपनी')}</button>
                <button type="button" className="segmented-btn" onClick={() => { setRopani(0); setAana(8); setPaisa(0); setDaam(0); }}>{t('8 Aana', '८ आना')}</button>
              </div>
            </div>
          )}

          {activeTab === 'bigha' && (
            <div>
              <span className="input-label" style={{ fontSize: '14px', marginBottom: '12px' }}>
                {t('Enter Bigha-Kattha-Dhur-Kanwa Area:', 'विघा-कठ्ठा-धुर-कानवा क्षेत्रफल राख्नुहोस्:')}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('BIGHA', 'विघा')}</label>
                  <input
                    type="number"
                    min={0}
                    className="text-input"
                    value={bigha}
                    onChange={(e) => setBigha(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('KATTHA', 'कठ्ठा')}</label>
                  <input
                    type="number"
                    min={0}
                    max={19}
                    className="text-input"
                    value={kattha}
                    onChange={(e) => setKattha(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('DHUR', 'धुर')}</label>
                  <input
                    type="number"
                    min={0}
                    max={19}
                    className="text-input"
                    value={dhur}
                    onChange={(e) => setDhur(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="input-label" style={{ fontSize: '11px' }}>{t('KANWA', 'कानवा')}</label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    className="text-input"
                    value={kanwa}
                    onChange={(e) => setKanwa(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button type="button" className="segmented-btn" onClick={() => { setBigha(0); setKattha(10); setDhur(0); setKanwa(0); }}>{t('10 Kattha', '१० कठ्ठा')}</button>
                <button type="button" className="segmented-btn" onClick={() => { setBigha(1); setKattha(0); setDhur(0); setKanwa(0); }}>{t('1 Bigha', '१ विघा')}</button>
                <button type="button" className="segmented-btn" onClick={() => { setBigha(0); setKattha(1); setDhur(0); setKanwa(0); }}>{t('1 Kattha (3,645 sq ft)', '१ कठ्ठा (३,६४५ वर्गफिट)')}</button>
              </div>
            </div>
          )}

          {activeTab === 'sqft' && (
            <div>
              <label className="input-label">{t('Total Area in Square Feet', 'कुल क्षेत्रफल (वर्ग फिटमा)')}</label>
              <input
                type="number"
                min={0}
                className="text-input"
                style={{ fontSize: '18px', fontWeight: 700 }}
                value={directSqFt}
                onChange={(e) => setDirectSqFt(Math.max(0, Number(e.target.value)))}
              />
              <span className="input-subtext">
                {t('Equivalent to approx', 'करिब')} {Math.round((directSqFt / SQFT_PER_SQMTR) * 100) / 100} {t('sq. meters', 'वर्ग मिटर बराबर')}
              </span>
            </div>
          )}

          {/* Land Valuation / Pricing Section */}
          <div style={{ marginTop: '28px', background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <DollarSign size={18} color="#059669" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {t('Land Price & Total Valuation', 'जग्गाको मूल्य तथा कुल मूल्याङ्कन')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '11px' }}>{t('Rate Amount (NPR)', 'प्रति एकाइ दर (रू)')}</label>
                <input
                  type="number"
                  min={0}
                  className="text-input"
                  style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                  value={rateAmount}
                  onChange={(e) => setRateAmount(Number(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '11px' }}>{t('Unit Type', 'एकाइको प्रकार')}</label>
                <select
                  className="select-input"
                  value={priceRateUnit}
                  onChange={(e) => setPriceRateUnit(e.target.value as any)}
                >
                  <option value="perAana">{t('Per Aana', 'प्रति आना')}</option>
                  <option value="perRopani">{t('Per Ropani', 'प्रति रोपनी')}</option>
                  <option value="perKattha">{t('Per Kattha', 'प्रति कठ्ठा')}</option>
                  <option value="perDhur">{t('Per Dhur', 'प्रति धुर')}</option>
                  <option value="perSqFt">{t('Per Sq. Foot', 'प्रति वर्ग फिट')}</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('TOTAL ESTIMATED PROPERTY VALUE', 'जम्मा अनुमानित जग्गाको मूल्य')}</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                रु {Math.round(estimatedPrice).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Results Overview */}
        <div>
          <div className="result-card-highlight" style={{ marginBottom: '18px' }}>
            <span className="stat-label">{t('Total Square Feet', 'कुल क्षेत्रफल (वर्ग फिट)')}</span>
            <div className="stat-value" style={{ margin: '6px 0 2px' }}>
              {Math.round(totalSqFt).toLocaleString('en-IN')} <span style={{ fontSize: '15px', color: '#64748b' }}>sq. ft</span>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              = {(Math.round(totalSqMtr * 100) / 100).toLocaleString('en-IN')} {t('Sq. Meters', 'वर्ग मिटर')} &nbsp;|&nbsp; {(Math.round(totalAcres * 1000) / 1000)} {t('Acres', 'एकर')}
            </div>
          </div>

          {/* Hill Breakdown Card */}
          <div className="result-card" style={{ marginBottom: '14px', background: '#ffffff' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              {t('🏔️ Hill System Equivalent (Kathmandu / Hills)', '🏔️ पहाडी प्रणाली (काठमाडौं / पहाड)')}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px', textAlign: 'center' }}>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{hillBreakdown.ropani}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Ropani', 'रोपनी')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{hillBreakdown.aana}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Aana', 'आना')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{hillBreakdown.paisa}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Paisa', 'पैसा')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{hillBreakdown.daam}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Daam', 'दाम')}</span>
              </div>
            </div>
          </div>

          {/* Terai Breakdown Card */}
          <div className="result-card" style={{ background: '#ffffff' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
              {t('🌾 Terai System Equivalent (Terai / Madhesh)', '🌾 तराई प्रणाली (तराई / मधेश)')}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px', textAlign: 'center' }}>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{teraiBreakdown.bigha}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Bigha', 'विघा')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{teraiBreakdown.kattha}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Kattha', 'कठ्ठा')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{teraiBreakdown.dhur}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Dhur', 'धुर')}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{teraiBreakdown.kanwa}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t('Kanwa', 'कानवा')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
