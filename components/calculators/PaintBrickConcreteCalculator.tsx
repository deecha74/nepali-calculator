'use client';

import React, { useState, useMemo } from 'react';
import { Home, Copy, Check } from 'lucide-react';

export function PaintBrickConcreteCalculator() {
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
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Paint Cost, Wall Brick & Concrete Mix (M20) Calculator
            </h2>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              रङरोगन खर्च, गारोको इँटा संख्या र ढलानको सिमेन्ट-बालुवा-गिट्टी अनुपात
            </p>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy All'}</span>
        </button>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'paint', label: '🎨 Paint & Putty Cost (रङ खर्च)' },
          { id: 'brick', label: '🧱 Wall Brick Calculator (इँटा संख्या)' },
          { id: 'concrete', label: '🏗️ Concrete Mix M15/M20 (ढलान अनुपात)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as 'paint' | 'brick' | 'concrete')}
            style={{
              padding: '11px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              border: activeTab === tab.id ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
              background: activeTab === tab.id ? '#eff6ff' : '#f8fafc',
              color: activeTab === tab.id ? '#1e40af' : '#475569',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'paint' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Total Paintable Wall / Ceiling Area (Sq. Ft):
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
                Number of Paint Coats:
              </label>
              <select
                value={coats}
                onChange={(e) => setCoats(Number(e.target.value))}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value={1}>1 Coat (Repainting — 110 sq.ft/L)</option>
                <option value={2}>2 Coats (Standard New Wall — 60 sq.ft/L)</option>
                <option value={3}>3 Coats (Premium Finish — 42 sq.ft/L)</option>
              </select>
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Emulsion Paint Price per Liter (NPR — Asian/Berger/Pashupati):
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

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Estimated Paint, Primer & Putty Requirement
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#38bdf8', margin: '6px 0 12px' }}>
              NPR {calculation.totalPaintCostNpr.toLocaleString('en-IN')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Topcoat Emulsion Paint:</span>
                <strong>{calculation.paintLitersNeeded} Liters</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Wall Primer (1 Coat):</span>
                <strong>{calculation.primerLitersNeeded} Liters</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Wall Putty (2 Coats):</span>
                <strong>{calculation.puttyKgNeeded} KG</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'brick' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                  Wall Length (Feet):
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
                  Wall Height (Feet):
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
                Wall Thickness (गारोको मोटाइ):
              </label>
              <select
                value={wallThickness}
                onChange={(e) => setWallThickness(e.target.value as '4.5_inch' | '9_inch')}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value="9_inch">9-Inch Outer Wall (९ इन्च गारो — ~9.2 bricks/sq.ft)</option>
                <option value="4.5_inch">4.5-Inch Partition Wall (४.५ इन्च गारो — ~4.6 bricks/sq.ft)</option>
              </select>
            </div>
            <div>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                Price per Brick in Nepal (NPR):
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

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Bricks Required (Including 5% Wastage)
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#fbbf24', margin: '6px 0 12px' }}>
              {calculation.totalBricksWithWastage.toLocaleString('en-IN')} Bricks
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Brick Cost:</span>
                <strong>NPR {calculation.brickCostNpr.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Mortar Cement Required (1:5):</span>
                <strong>{calculation.mortarCementBags} Bags (50kg)</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'concrete' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                RCC Slab / Column Area (Sq. Ft):
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
                Slab Thickness (Inches — Standard Nepal Dhalan is 5"):
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
                Concrete Grade Ratio:
              </label>
              <select
                value={mixGrade}
                onChange={(e) => setMixGrade(e.target.value as 'M15' | 'M20' | 'M25')}
                className="text-input"
                style={{ width: '100%' }}
              >
                <option value="M20">M20 (1 : 1.5 : 3 — NBC 105 Standard RCC Slab/Beam)</option>
                <option value="M25">M25 (1 : 1 : 2 — Heavy Columns & High-Rise)</option>
                <option value="M15">M15 (1 : 2 : 4 — PCC Flooring & Foundation Base)</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              {mixGrade} Concrete Materials ({calculation.wetVolumeCft.toFixed(0)} CFT Wet Volume)
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#34d399', margin: '6px 0 12px' }}>
              {calculation.cementBags50Kg} Bags Cement
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Washed River Sand (बालुवा):</span>
                <strong>{calculation.sandCft} CFT (~{(calculation.sandCft / 100).toFixed(1)} Mini Tippers)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Crushed Stone Aggregate (गिट्टी):</span>
                <strong>{calculation.aggregateCft} CFT (~{(calculation.aggregateCft / 100).toFixed(1)} Mini Tippers)</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

