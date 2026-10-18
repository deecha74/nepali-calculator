'use client';

import React, { useState, useMemo } from 'react';
import { Scale, Copy, Check, ArrowRightLeft } from 'lucide-react';

// Traditional Nepali Weight Constants:
// 1 Dharni (धार्नी) = 2.3328 kg (or commercially 2.5 kg or 2.4 kg approx, standard official is 2.3328 kg / 2.39 kg, 1 Dharni = 12 Pao = 2 Bishe)
// 1 Sher (सेर) = 0.933 kg
// 1 Pao (पाउ) = 194.4 grams (approx 200g commercial)
// 1 Tola = 11.6638 grams

// Traditional Nepali Volume Constants:
// 1 Muri (मुरी) = 20 Pathi
// 1 Pathi (पाथी) = 8 Mana (approx 4.54 liters / approx 3.5 to 4 kg of grain)
// 1 Mana (माना) = 4 Muthi (approx 0.568 liters)
// 1 Muthi (मुठी) = 1/4 Mana

export function TraditionalUnitsConverter() {
  const [category, setCategory] = useState<'weight' | 'volume'>('weight');

  // Weight inputs
  const [dharni, setDharni] = useState<number>(1);
  const [pao, setPao] = useState<number>(0);

  // Volume inputs
  const [muri, setMuri] = useState<number>(0);
  const [pathi, setPathi] = useState<number>(1);
  const [mana, setMana] = useState<number>(0);

  const [copied, setCopied] = useState<boolean>(false);

  // Weight calculation
  const weightCalculation = useMemo(() => {
    // 1 Dharni = 12 Pao. 1 Pao = 0.1944 kg. 1 Dharni = 2.3328 kg
    const totalPao = (dharni || 0) * 12 + (pao || 0);
    const totalKg = totalPao * 0.1944;
    const totalGrams = totalKg * 1000;
    const commercialKg = (dharni || 0) * 2.5 + (pao || 0) * 0.208;

    return {
      totalPao,
      totalKg,
      totalGrams,
      commercialKg,
    };
  }, [dharni, pao]);

  // Volume calculation
  const volumeCalculation = useMemo(() => {
    // 1 Muri = 20 Pathi = 160 Mana
    // 1 Pathi = 8 Mana = approx 4.546 liters
    // 1 Mana = approx 0.568 liters
    const totalMana = (muri || 0) * 160 + (pathi || 0) * 8 + (mana || 0);
    const totalPathi = totalMana / 8;
    const totalLiters = totalMana * 0.5682;
    // For paddy/rice, 1 Pathi is approx 3.6 to 4 kg
    const approxGrainKg = totalPathi * 3.65;

    return {
      totalMana,
      totalPathi,
      totalLiters,
      approxGrainKg,
    };
  }, [muri, pathi, mana]);

  const handleCopy = () => {
    let text = "";
    if (category === 'weight') {
      text = `Traditional Nepali Weight Conversion:
Input: ${dharni} Dharni, ${pao} Pao
Official Standard: ${(Math.round(weightCalculation.totalKg * 100) / 100)} KG (${Math.round(weightCalculation.totalGrams)} grams)
Commercial Market (approx): ${(Math.round(weightCalculation.commercialKg * 100) / 100)} KG
Via NepalCalc.com`;
    } else {
      text = `Traditional Nepali Volume Conversion:
Input: ${muri} Muri, ${pathi} Pathi, ${mana} Mana
Total Mana: ${volumeCalculation.totalMana} Mana (${volumeCalculation.totalPathi.toFixed(2)} Pathi)
Equivalent Volume: ${(Math.round(volumeCalculation.totalLiters * 100) / 100)} Liters
Estimated Grain Weight: ${(Math.round(volumeCalculation.approxGrainKg * 100) / 100)} KG
Via NepalCalc.com`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">नेपाली परम्परागत नाप</span>
            <span className="badge badge-neutral">Standard & Commercial</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Nepali Mana, Pathi, Muri & Dharni Converter
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Convert traditional Nepali weights (धार्नी, पाउ, केजी) and volume units (माना, पाथी, मुरी, लिटर).
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          className={`segmented-btn ${category === 'weight' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setCategory('weight')}
        >
          ⚖️ Weight (धार्नी, सेर, पाउ ⇄ KG)
        </button>
        <button
          type="button"
          className={`segmented-btn ${category === 'volume' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setCategory('volume')}
        >
          🌾 Grain & Volume (माना, पाथी, मुरी ⇄ लिटर)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {category === 'weight' ? (
          <>
            <div>
              <span className="input-label" style={{ marginBottom: '14px' }}>Enter Traditional Weight Units:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label className="input-label">DHARNI (धार्नी)</label>
                  <input
                    type="number"
                    min={0}
                    className="text-input"
                    style={{ fontSize: '18px', fontWeight: 700 }}
                    value={dharni}
                    onChange={(e) => setDharni(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="input-subtext">१ धार्नी = १२ पाउ ≈ २.३३ केजी</span>
                </div>
                <div>
                  <label className="input-label">PAO (पाउ, 0-11)</label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    className="text-input"
                    style={{ fontSize: '18px', fontWeight: 700 }}
                    value={pao}
                    onChange={(e) => setPao(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="input-subtext">१ पाउ ≈ १९४ ग्राम (बजारमा २०० ग्राम)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button type="button" className="segmented-btn" onClick={() => { setDharni(1); setPao(0); }}>१ धार्नी (1 Dharni)</button>
                <button type="button" className="segmented-btn" onClick={() => { setDharni(0); setPao(4); }}>४ पाउ (4 Pao)</button>
                <button type="button" className="segmented-btn" onClick={() => { setDharni(5); setPao(0); }}>५ धार्नी (5 Dharni)</button>
              </div>
            </div>

            <div>
              <div className="result-card-highlight">
                <span className="stat-label">Official Metric Weight (सरकारी मानक)</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  {(Math.round(weightCalculation.totalKg * 100) / 100).toLocaleString('en-IN')} <span style={{ fontSize: '16px', color: '#64748b' }}>KG</span>
                </div>
                <span className="stat-subvalue">
                  = {Math.round(weightCalculation.totalGrams).toLocaleString('en-IN')} Grams
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>Local Market Practice (२.५ केजी प्रति धार्नी)</span>
                    <span style={{ fontWeight: 700 }}>≈ {(Math.round(weightCalculation.commercialKg * 100) / 100)} KG</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>Total Pao</span>
                    <span style={{ fontWeight: 700 }}>{weightCalculation.totalPao} पाउ</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="input-label" style={{ marginBottom: '14px' }}>Enter Traditional Volume Units:</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <div>
                  <label className="input-label">MURI (मुरी)</label>
                  <input
                    type="number"
                    min={0}
                    className="text-input"
                    value={muri}
                    onChange={(e) => setMuri(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="input-subtext">१ मुरी = २० पाथी</span>
                </div>
                <div>
                  <label className="input-label">PATHI (पाथी)</label>
                  <input
                    type="number"
                    min={0}
                    max={19}
                    className="text-input"
                    value={pathi}
                    onChange={(e) => setPathi(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="input-subtext">१ पाथी = ८ माना</span>
                </div>
                <div>
                  <label className="input-label">MANA (माना)</label>
                  <input
                    type="number"
                    min={0}
                    max={7}
                    className="text-input"
                    value={mana}
                    onChange={(e) => setMana(Math.max(0, Number(e.target.value)))}
                  />
                  <span className="input-subtext">१ माना ≈ ०.५६८ लिटर</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button type="button" className="segmented-btn" onClick={() => { setMuri(0); setPathi(1); setMana(0); }}>१ पाथी (1 Pathi)</button>
                <button type="button" className="segmented-btn" onClick={() => { setMuri(1); setPathi(0); setMana(0); }}>१ मुरी (1 Muri = 20 Pathi)</button>
                <button type="button" className="segmented-btn" onClick={() => { setMuri(0); setPathi(0); setMana(4); }}>४ माना (Half Pathi)</button>
              </div>
            </div>

            <div>
              <div className="result-card-highlight">
                <span className="stat-label">Equivalent Volume in Liters (कुल लिटर)</span>
                <div className="stat-value" style={{ color: '#0d9488', margin: '6px 0 2px' }}>
                  {(Math.round(volumeCalculation.totalLiters * 100) / 100).toLocaleString('en-IN')} <span style={{ fontSize: '16px', color: '#64748b' }}>Liters</span>
                </div>
                <span className="stat-subvalue">
                  Total {volumeCalculation.totalMana} Mana = {volumeCalculation.totalPathi.toFixed(2)} Pathi
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>Estimated Paddy / Rice Grain Weight</span>
                    <span style={{ fontWeight: 700 }}>≈ {(Math.round(volumeCalculation.approxGrainKg * 10) / 10)} KG</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
