'use client';

import React, { useState, useMemo } from 'react';
import { Sprout, Wheat, Check, Copy, Info, AlertCircle, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface CropProfile {
  id: string;
  name: string;
  nepaliName: string;
  // Per Ropani recommendations (in kg)
  ureaPerRopani: number;
  dapPerRopani: number;
  potashPerRopani: number;
  compostPerRopani: number; // in Quintal
  seedPerRopaniKg: number;
  season: string;
}

const CROPS: CropProfile[] = [
  { id: 'paddy', name: 'Paddy / Rice (धान)', nepaliName: 'धान खेती', ureaPerRopani: 6.5, dapPerRopani: 4.5, potashPerRopani: 3.0, compostPerRopani: 6.0, seedPerRopaniKg: 2.5, season: 'असार/साउन (वर्षे धान)' },
  { id: 'maize', name: 'Maize / Corn (मकै)', nepaliName: 'मकै खेती', ureaPerRopani: 8.0, dapPerRopani: 5.0, potashPerRopani: 3.5, compostPerRopani: 7.0, seedPerRopaniKg: 1.2, season: 'फागुन/चैत (वसन्ते तथा वर्षे)' },
  { id: 'wheat', name: 'Wheat (गहुँ)', nepaliName: 'गहुँ खेती', ureaPerRopani: 7.0, dapPerRopani: 4.5, potashPerRopani: 2.5, compostPerRopani: 5.0, seedPerRopaniKg: 5.0, season: 'कात्तिक/मंसिर (हिउँदे)' },
  { id: 'potato', name: 'Potato (आलु)', nepaliName: 'आलु खेती', ureaPerRopani: 10.0, dapPerRopani: 8.0, potashPerRopani: 6.0, compostPerRopani: 10.0, seedPerRopaniKg: 75.0, season: 'असोज/कात्तिक तथा माघ' },
  { id: 'mustard', name: 'Mustard (तोरी)', nepaliName: 'तोरी/सर्सिउँ', ureaPerRopani: 4.0, dapPerRopani: 3.5, potashPerRopani: 2.0, compostPerRopani: 4.0, seedPerRopaniKg: 0.5, season: 'कात्तिक/मंसिर' },
  { id: 'vegetable', name: 'Seasonal Vegetables (मौसमी तरकारी)', nepaliName: 'मौसमी तरकारी', ureaPerRopani: 9.0, dapPerRopani: 7.0, potashPerRopani: 5.0, compostPerRopani: 12.0, seedPerRopaniKg: 0.2, season: 'वर्षैभरी' },
];

export function KrishiFertilizerCalculator() {
  const { language, t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [landSystem, setLandSystem] = useState<'ropani' | 'bigha'>('ropani');
  const [ropaniCount, setRopaniCount] = useState<number>(4);
  const [bighaCount, setBighaCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const crop = useMemo(() => {
    return CROPS.find(c => c.id === selectedCrop) || CROPS[0];
  }, [selectedCrop]);

  // Total Ropani equivalent
  const totalRopanis = useMemo(() => {
    if (landSystem === 'ropani') {
      return ropaniCount;
    } else {
      // 1 Bigha = 13.31 Ropani
      return bighaCount * 13.31;
    }
  }, [landSystem, ropaniCount, bighaCount]);

  const calculation = useMemo(() => {
    const ureaTotal = Math.round(crop.ureaPerRopani * totalRopanis * 10) / 10;
    const dapTotal = Math.round(crop.dapPerRopani * totalRopanis * 10) / 10;
    const potashTotal = Math.round(crop.potashPerRopani * totalRopanis * 10) / 10;
    const compostTotal = Math.round(crop.compostPerRopani * totalRopanis * 10) / 10;
    const seedTotal = Math.round(crop.seedPerRopaniKg * totalRopanis * 10) / 10;

    // Standard 50kg Bags count
    const ureaBags = (ureaTotal / 50).toFixed(1);
    const dapBags = (dapTotal / 50).toFixed(1);
    const potashBags = (potashTotal / 50).toFixed(1);

    // Application schedule:
    // DAP & Potash 100% at planting (Basal)
    // Urea: 50% Basal, 25% 1st Top Dress (25-30 days), 25% 2nd Top Dress (45-50 days)
    const ureaBasal = Math.round(ureaTotal * 0.5 * 10) / 10;
    const ureaTop1 = Math.round(ureaTotal * 0.25 * 10) / 10;
    const ureaTop2 = Math.round(ureaTotal * 0.25 * 10) / 10;

    return {
      ureaTotal,
      dapTotal,
      potashTotal,
      compostTotal,
      seedTotal,
      ureaBags,
      dapBags,
      potashBags,
      ureaBasal,
      ureaTop1,
      ureaTop2,
    };
  }, [crop, totalRopanis]);

  const handleCopy = () => {
    const text = `Nepal Agriculture Fertilizer: ${crop.nepaliName} for ${landSystem === 'ropani' ? `${ropaniCount} Ropani` : `${bighaCount} Bigha`} = Urea: ${calculation.ureaTotal}kg, DAP: ${calculation.dapTotal}kg, Potash: ${calculation.potashTotal}kg, Seed: ${calculation.seedTotal}kg`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">कृषि तथा पशुपन्छी विकास मन्त्रालय मापदण्ड</span>
          <span className="badge badge-blue">रासायनिक मल तथा बीउ दर</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          कृषि मलखाद तथा बीउ क्याल्कुलेटर (Fertilizer & Seed Dosage Calculator Nepal)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          नेपाल कृषि अनुसन्धान परिषद् (NARC) को सिफारिस अनुसार धान, मकै, गहुँ, आलु र तोरी खेतीका लागि युरिया, डीएपी र पोटास मलको सही मात्रा।
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Crop Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              बाली छनोट गर्नुहोस् (Select Crop)
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
                backgroundColor: '#ffffff'
              }}
            >
              {CROPS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nepaliName} ({c.name})
                </option>
              ))}
            </select>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              खेती गर्ने उपयुक्त मौसम: <strong>{crop.season}</strong>
            </div>
          </div>

          {/* Land System Toggle */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              जग्गाको एकाइ (Land Measurement System)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setLandSystem('ropani')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: landSystem === 'ropani' ? '#15803d' : '#cbd5e1',
                  backgroundColor: landSystem === 'ropani' ? '#f0fdf4' : '#ffffff',
                  color: landSystem === 'ropani' ? '#15803d' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                पहाडी (रोपनी / Ropani)
              </button>
              <button
                type="button"
                onClick={() => setLandSystem('bigha')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: landSystem === 'bigha' ? '#15803d' : '#cbd5e1',
                  backgroundColor: landSystem === 'bigha' ? '#f0fdf4' : '#ffffff',
                  color: landSystem === 'bigha' ? '#15803d' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                तराई (बिघा / Bigha)
              </button>
            </div>
          </div>

          {/* Land Quantity */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {landSystem === 'ropani' ? 'कुल जग्गा (रोपनीमा):' : 'कुल जग्गा (बिघामा):'}
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={landSystem === 'ropani' ? ropaniCount : bighaCount}
              onChange={(e) => {
                const val = Math.max(0.1, Number(e.target.value) || 0);
                if (landSystem === 'ropani') setRopaniCount(val);
                else setBighaCount(val);
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: 800,
                outline: 'none',
              }}
            />
            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {(landSystem === 'ropani' ? [1, 2, 4, 8, 10] : [0.5, 1, 2, 5]).map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    if (landSystem === 'ropani') setRopaniCount(val);
                    else setBighaCount(val);
                  }}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: (landSystem === 'ropani' ? ropaniCount : bighaCount) === val ? '#15803d' : '#ffffff',
                    color: (landSystem === 'ropani' ? ropaniCount : bighaCount) === val ? '#ffffff' : '#64748b',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {val} {landSystem === 'ropani' ? 'रोपनी' : 'बिघा'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              सिफारिस गरिएको मल तथा बीउ मात्रा
            </div>

            {/* 3 Chemical Fertilizers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
              <div style={{ padding: '10px 8px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>युरिया (Urea)</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#15803d', marginTop: '2px' }}>
                  {calculation.ureaTotal} kg
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>({calculation.ureaBags} बोरा)</div>
              </div>

              <div style={{ padding: '10px 8px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>डीएपी (DAP)</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0369a1', marginTop: '2px' }}>
                  {calculation.dapTotal} kg
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>({calculation.dapBags} बोरा)</div>
              </div>

              <div style={{ padding: '10px 8px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>पोटास (Potash)</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#b45309', marginTop: '2px' }}>
                  {calculation.potashTotal} kg
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>({calculation.potashBags} बोरा)</div>
              </div>
            </div>

            {/* Compost & Seed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>जैविक / गोबर मल (Compost):</span>
                <strong style={{ color: '#0f172a' }}>{calculation.compostTotal} क्विन्टल (~{Math.round(calculation.compostTotal * 3.3)} डोको)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>आवश्यक उन्नत बीउ (Seed):</span>
                <strong style={{ color: '#15803d' }}>{calculation.seedTotal} किलोग्राम</strong>
              </div>
            </div>

            {/* Application Timings */}
            <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: '12px', color: '#14532d' }}>
              <div style={{ fontWeight: 800, marginBottom: '4px' }}>🌱 मल हाल्ने समय तालिका:</div>
              <div>• रोपाइँ वा छर्ने बेला (Basal): डीएपी र पोटास शतप्रतिशत + युरिया {calculation.ureaBasal} kg</div>
              <div>• पहिलो टपड्रेस (२५-३० दिनमा): युरिया {calculation.ureaTop1} kg</div>
              <div>• दोस्रो टपड्रेस (४५-५० दिनमा): युरिया {calculation.ureaTop2} kg</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              marginTop: '16px',
              backgroundColor: copied ? '#16a34a' : '#15803d',
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
            <span>{copied ? 'मल विवरण कपी गरियो' : 'मलखाद हिसाब कपी गर्नुहोस्'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
