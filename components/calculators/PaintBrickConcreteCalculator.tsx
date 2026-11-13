'use client';

import React, { useState, useMemo } from 'react';
import { Home, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function PaintBrickConcreteCalculator() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'paint' | 'brick' | 'concrete'>('paint');

  // Paint State
  const [wallAreaSqFt, setWallAreaSqFt] = useState<number>(1800);
  const [coats, setCoats] = useState<number>(2);
  const [paintPricePerLiter, setPaintPricePerLiter] = useState<number>(680);

  // Brick State
  const [wallLengthFt, setWallLengthFt] = useState<number>(40);
  const [wallHeightFt, setWallHeightFt] = useState<number>(10);
  const [wallThickness, setWallThickness] = useState<'4.5_inch' | '9_inch'>('9_inch');
  const [brickRateNpr, setBrickRateNpr] = useState<number>(19);

  // Concrete State
  const [slabAreaSqFt, setSlabAreaSqFt] = useState<number>(1000);
  const [slabThicknessInch, setSlabThicknessInch] = useState<number>(5);
  const [mixGrade, setMixGrade] = useState<'M15' | 'M20' | 'M25'>('M20');

  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // 1. Paint Calculation (1 liter emulsion covers ~110 sq ft for 1 coat; 2 coats = ~60 sq ft/liter)
    const coveragePerLiter = coats === 1 ? 110 : coats === 2 ? 60 : 42;
    const paintLitersNeeded = Math.ceil(wallAreaSqFt / coveragePerLiter);
    const primerLitersNeeded = Math.ceil(wallAreaSqFt / 120);
    const puttyKgNeeded = Math.ceil(wallAreaSqFt / 18);
    const totalPaintCostNpr = Math.round(
      paintLitersNeeded * paintPricePerLiter + primerLitersNeeded * 380 + puttyKgNeeded * 65
    );

    // 2. Brick Calculation (Nepali standard brick: ~4.5 bricks per sq ft for 4.5" wall, ~9 bricks per sq ft for 9" wall)
    const wallSqFt = wallLengthFt * wallHeightFt;
    const bricksPerSqFt = wallThickness === '4.5_inch' ? 4.6 : 9.2;
    const totalBricksWithWastage = Math.ceil(wallSqFt * bricksPerSqFt * 1.05); // 5% breakage buffer
    const brickCostNpr = totalBricksWithWastage * brickRateNpr;
    const mortarCementBags = Math.ceil((wallSqFt * (wallThickness === '4.5_inch' ? 0.035 : 0.07)));

    // 3. Concrete Mix (M15 = 1:2:4, M20 = 1:1.5:3, M25 = 1:1:2)
    const wetVolumeCft = slabAreaSqFt * (slabThicknessInch / 12);
    const dryVolumeCft = wetVolumeCft * 1.54;
    const ratioSum = mixGrade === 'M15' ? 7 : mixGrade === 'M20' ? 5.5 : 4;
    const sandPart = mixGrade === 'M15' ? 2 : mixGrade === 'M20' ? 1.5 : 1;
    const aggPart = mixGrade === 'M15' ? 4 : mixGrade === 'M20' ? 3 : 2;

    const cementCft = dryVolumeCft / ratioSum;
    const cementBags50Kg = Math.ceil(cementCft / 1.226);
    const sandCft = Math.ceil(cementCft * sandPart);
    const aggregateCft = Math.ceil(cementCft * aggPart);

    return {
      paintLitersNeeded,
      primerLitersNeeded,
      puttyKgNeeded,
      totalPaintCostNpr,
      wallSqFt,
      totalBricksWithWastage,
      brickCostNpr,
      mortarCementBags,
      wetVolumeCft,
      dryVolumeCft: Math.round(dryVolumeCft),
      cementBags50Kg,
      sandCft,
      aggregateCft,
    };
  }, [wallAreaSqFt, coats, paintPricePerLiter, wallLengthFt, wallHeightFt, wallThickness, brickRateNpr, slabAreaSqFt, slabThicknessInch, mixGrade]);

  const handleCopy = () => {
    const text = `Nepal Paint, Brick & Concrete Estimate:
Paint (${wallAreaSqFt} sq.ft, ${coats} coats): ${calculation.paintLitersNeeded}L Emulsion + ${calculation.primerLitersNeeded}L Primer + ${calculation.puttyKgNeeded}kg Putty (NPR ${calculation.totalPaintCostNpr.toLocaleString('en-IN')})
Bricks (${calculation.wallSqFt} sq.ft ${wallThickness}): ${calculation.totalBricksWithWastage} Bricks (NPR ${calculation.brickCostNpr.toLocaleString('en-IN')})
Concrete (${mixGrade}, ${slabAreaSqFt} sq.ft): ${calculation.cementBags50Kg} Bags Cement, ${calculation.sandCft} CFT Sand, ${calculation.aggregateCft} CFT Gitti
Calculated on NepalCalc.com/paint-cost`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '20px',
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
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Home size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {t('Paint Cost, Wall Brick & Concrete Mix (M20) Calculator', 'रङरोगन खर्च, गारोको इँटा तथा ढलान अनुपात क्याल्कुलेटर')}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {t('Calculate paint, brick requirements and concrete mix ratio for house construction in Nepal', 'नेपालमा घर निर्माणका लागि रङरोगन, इँटा र ढलान सामग्रीको यकिन लागत निकाल्नुहोस्')}
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy All', 'सबै कपी')}</span>
        </button>
      </div>

      {/* Mobile-only instant above-the-fold result */}
      <MobileInstantResult
        primaryLabel={
          activeTab === 'paint'
            ? t('Estimated Paint Cost', 'अनुमानित रङरोगन खर्च')
            : activeTab === 'brick'
            ? t('Total Brick Cost', 'इँटाको कुल लागत')
            : t('Cement Bags (50kg)', 'सिमेन्ट बोरा संख्या')
        }
        primaryValue={
          activeTab === 'paint'
            ? `रु ${calculation.totalPaintCostNpr.toLocaleString('en-IN')}`
            : activeTab === 'brick'
            ? `रु ${calculation.brickCostNpr.toLocaleString('en-IN')}`
            : `${calculation.cementBags50Kg} ${t('Bags', 'बोरा')}`
        }
        primarySubtext={
          activeTab === 'paint'
            ? `${calculation.paintLitersNeeded} ${t('Liters Emulsion Paint', 'लिटर इमल्सन रङ')}`
            : activeTab === 'brick'
            ? `${calculation.totalBricksWithWastage.toLocaleString('en-IN')} ${t('Bricks (+5% buffer)', 'इँटा (५% टुटफुट सहित)')}`
            : `${calculation.sandCft} CFT ${t('Sand', 'बालुवा')} • ${calculation.aggregateCft} CFT ${t('Gitti', 'गिट्टी')}`
        }
        secondaryLabel={
          activeTab === 'paint'
            ? t('Primer', 'प्राइमर')
            : activeTab === 'brick'
            ? t('Mortar Bags', 'मसला सिमेन्ट')
            : t('Dry Volume', 'सुख्खा आयतन')
        }
        secondaryValue={
          activeTab === 'paint'
            ? `${calculation.primerLitersNeeded}L`
            : activeTab === 'brick'
            ? `${calculation.mortarCementBags} ${t('Bags', 'बोरा')}`
            : `${Math.round(calculation.dryVolumeCft)} CFT`
        }
        badge={activeTab === 'paint' ? 'Paint & Putty' : activeTab === 'brick' ? 'Brick Masonry' : 'M20 Concrete'}
        accentColor="blue"
        onCopy={handleCopy}
        copied={copied}
        targetDetailsId="materials-breakdown-details"
      />

      {/* Mode Tabs */}
      <div className="segmented-control" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '24px', padding: '4px' }}>
        {[
          { id: 'paint', label: t('🎨 Paint & Putty', '🎨 रङ तथा पुटि') },
          { id: 'brick', label: t('🧱 Wall Bricks', '🧱 गारोको इँटा') },
          { id: 'concrete', label: t('🏗️ Concrete Mix', '🏗️ ढलान कंक्रीट') },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`segmented-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as 'paint' | 'brick' | 'concrete')}
            style={{
              padding: '10px 8px',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'paint' && (
        <div key="paint" className="tab-panel-smooth" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Total Paintable Area (Sq. Ft):', 'रङ लगाउने कुल क्षेत्रफल (वर्गफिट):')}
              </label>
              <input
                type="number"
                value={wallAreaSqFt}
                onChange={(e) => setWallAreaSqFt(Number(e.target.value) || 0)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Number of Paint Coats:', 'कोट संख्या:')}
              </label>
              <select
                value={coats}
                onChange={(e) => setCoats(Number(e.target.value))}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value={1}>{t('1 Coat (Repainting — 110 sq.ft/L)', '१ कोट (पुनः रङ — ११० वर्गफिट/लिटर)')}</option>
                <option value={2}>{t('2 Coats (Standard New Wall — 60 sq.ft/L)', '२ कोट (नयाँ गारो — ६० वर्गफिट/लिटर)')}</option>
                <option value={3}>{t('3 Coats (Premium Finish — 42 sq.ft/L)', '३ कोट (प्रिमियम फिनिसिङ — ४२ वर्गफिट/लिटर)')}</option>
              </select>
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Emulsion Paint Price per Liter (NPR):', 'इमल्सन रङ प्रति लिटर दर (रु):')}
              </label>
              <input
                type="number"
                value={paintPricePerLiter}
                onChange={(e) => setPaintPricePerLiter(Number(e.target.value) || 0)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Estimated Paint, Primer & Putty Cost', 'अनुमानित रङ, प्राइमर तथा पुटि खर्च')}
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              रु {calculation.totalPaintCostNpr.toLocaleString('en-IN')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Topcoat Emulsion Paint:', 'मुख्य इमल्सन रङ:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.paintLitersNeeded} {t('Liters', 'लिटर')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Wall Primer (1 Coat):', 'वाल प्राइमर (१ कोट):')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.primerLitersNeeded} {t('Liters', 'लिटर')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Wall Putty (2 Coats):', 'वाल पुटि (२ कोट):')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.puttyKgNeeded} KG</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'brick' && (
        <div key="brick" className="tab-panel-smooth" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                  {t('Wall Length (Feet):', 'गारोको लम्बाइ (फिट):')}
                </label>
                <input
                  type="number"
                  value={wallLengthFt}
                  onChange={(e) => setWallLengthFt(Number(e.target.value) || 0)}
                  className="text-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                  {t('Wall Height (Feet):', 'गारोको उचाइ (फिट):')}
                </label>
                <input
                  type="number"
                  value={wallHeightFt}
                  onChange={(e) => setWallHeightFt(Number(e.target.value) || 0)}
                  className="text-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Wall Thickness:', 'गारोको मोटाइ:')}
              </label>
              <select
                value={wallThickness}
                onChange={(e) => setWallThickness(e.target.value as '4.5_inch' | '9_inch')}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value="9_inch">{t('9-Inch Outer Wall (~9.2 bricks/sq.ft)', '९ इन्च बाहिरी गारो (~९.२ इँटा/वर्गफिट)')}</option>
                <option value="4.5_inch">{t('4.5-Inch Partition Wall (~4.6 bricks/sq.ft)', '४.५ इन्च भित्री गारो (~४.६ इँटा/वर्गफिट)')}</option>
              </select>
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Price per Brick (NPR):', 'प्रति इँटा दर (रु):')}
              </label>
              <input
                type="number"
                value={brickRateNpr}
                onChange={(e) => setBrickRateNpr(Number(e.target.value) || 0)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Total Bricks Required (5% Wastage Buffer)', 'कुल इँटा संख्या (५% टुटफुट सहित)')}
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              {calculation.totalBricksWithWastage.toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>{t('Bricks', 'वटा इँटा')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Total Brick Cost:', 'कुल इँटा खर्च:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {calculation.brickCostNpr.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Mortar Cement (1:5):', 'गारोको सिमेन्ट (१:५):')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.mortarCementBags} {t('Bags (50kg)', 'बोरा (५० केजी)')}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'concrete' && (
        <div key="concrete" className="tab-panel-smooth" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('RCC Slab / Beam Area (Sq. Ft):', 'ढलान / बिमको क्षेत्रफल (वर्गफिट):')}
              </label>
              <input
                type="number"
                value={slabAreaSqFt}
                onChange={(e) => setSlabAreaSqFt(Number(e.target.value) || 0)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Slab Thickness (Inches — Standard is 5"):', 'ढलानको मोटाइ (इन्च — सामान्यतया ५ इन्च):')}
              </label>
              <input
                type="number"
                value={slabThicknessInch}
                onChange={(e) => setSlabThicknessInch(Number(e.target.value) || 5)}
                className="text-input"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                {t('Concrete Grade Ratio:', 'कंक्रीट ग्रेड अनुपात:')}
              </label>
              <select
                value={mixGrade}
                onChange={(e) => setMixGrade(e.target.value as 'M15' | 'M20' | 'M25')}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value="M20">{t('M20 (1 : 1.5 : 3 — Standard RCC Slab/Beam)', 'M20 (१ : १.५ : ३ — ढलान तथा बिम)')}</option>
                <option value="M25">{t('M25 (1 : 1 : 2 — Heavy Columns & High-Rise)', 'M25 (१ : १ : २ — ठूला पिल्लर)')}</option>
                <option value="M15">{t('M15 (1 : 2 : 4 — PCC Flooring & Base)', 'M15 (१ : २ : ४ — बेस तथा भुइँ)')}</option>
              </select>
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t(`${mixGrade} Concrete Materials (${calculation.wetVolumeCft.toFixed(0)} CFT Wet Volume)`, `${mixGrade} ढलान सामग्री (${calculation.wetVolumeCft.toFixed(0)} घनफिट आयतन)`)}
            </div>
            <div style={{ fontSize: '34px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              {calculation.cementBags50Kg}{' '}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>{t('Bags Cement', 'बोरा सिमेन्ट')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('River Sand:', 'बालुवा:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.sandCft} CFT (~{(calculation.sandCft / 100).toFixed(1)} {t('Mini Tippers', 'टिपर')})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('Crushed Stone Aggregate:', 'गिट्टी:')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.aggregateCft} CFT (~{(calculation.aggregateCft / 100).toFixed(1)} {t('Mini Tippers', 'टिपर')})</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
