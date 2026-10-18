'use client';

import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Utensils, 
  Activity, 
  Coffee, 
  Share2, 
  Copy, 
  Check, 
  Sparkles,
  Info,
  Heart
} from 'lucide-react';
import { toNepaliDigits } from '@/lib/nepaliDate';

export type MomoType = 'buff' | 'chicken' | 'veg' | 'paneer' | 'pork';
export type MomoStyle = 'steamed' | 'kothey' | 'fried' | 'cmomo' | 'jhol';
export type MomoDrink = 'none' | 'coke' | 'diet_coke' | 'milk_tea' | 'black_tea';

interface MomoBaseNutrition {
  nameNep: string;
  nameEng: string;
  kcalPerPiece: number;
  proteinPerPiece: number;
  carbsPerPiece: number;
  fatPerPiece: number;
}

const MOMO_NUTRITION: Record<MomoType, MomoBaseNutrition> = {
  buff: {
    nameNep: 'बफ मोमो (Buff)',
    nameEng: 'Buff Momo',
    kcalPerPiece: 42,
    proteinPerPiece: 3.2,
    carbsPerPiece: 3.4,
    fatPerPiece: 1.8,
  },
  chicken: {
    nameNep: 'चिकेन मोमो (Chicken)',
    nameEng: 'Chicken Momo',
    kcalPerPiece: 38,
    proteinPerPiece: 3.5,
    carbsPerPiece: 3.4,
    fatPerPiece: 1.2,
  },
  veg: {
    nameNep: 'भेज मोमो (Veg)',
    nameEng: 'Veg Momo',
    kcalPerPiece: 28,
    proteinPerPiece: 1.1,
    carbsPerPiece: 4.2,
    fatPerPiece: 0.8,
  },
  paneer: {
    nameNep: 'पनिर मोमो (Paneer)',
    nameEng: 'Paneer Momo',
    kcalPerPiece: 48,
    proteinPerPiece: 2.6,
    carbsPerPiece: 3.6,
    fatPerPiece: 2.8,
  },
  pork: {
    nameNep: 'पोर्क मोमो (Pork)',
    nameEng: 'Pork Momo',
    kcalPerPiece: 46,
    proteinPerPiece: 3.0,
    carbsPerPiece: 3.3,
    fatPerPiece: 2.4,
  },
};

const STYLE_MULTIPLIERS: Record<MomoStyle, { nameNep: string; nameEng: string; mult: number; extraKcalPerPlate: number; extraFatGrams: number }> = {
  steamed: { nameNep: 'बाफ (Steamed)', nameEng: 'Steamed', mult: 1.0, extraKcalPerPlate: 0, extraFatGrams: 0 },
  kothey: { nameNep: 'कोथे (Kothey / Pan-Fried)', nameEng: 'Kothey', mult: 1.22, extraKcalPerPlate: 15, extraFatGrams: 3.5 },
  fried: { nameNep: 'डीप फ्राइड (Deep Fried)', nameEng: 'Deep Fried', mult: 1.48, extraKcalPerPlate: 30, extraFatGrams: 8.0 },
  cmomo: { nameNep: 'सी-मोमो (Chilli C-Momo)', nameEng: 'Chilli C-Momo', mult: 1.15, extraKcalPerPlate: 85, extraFatGrams: 5.0 },
  jhol: { nameNep: 'झोल मोमो (Jhol Momo)', nameEng: 'Jhol Momo', mult: 1.0, extraKcalPerPlate: 70, extraFatGrams: 4.0 },
};

const DRINK_NUTRITION: Record<MomoDrink, { nameNep: string; kcal: number; sugar: number }> = {
  none: { nameNep: 'कुनै पेय छैन (None)', kcal: 0, sugar: 0 },
  coke: { nameNep: 'कोकाकोला / फ्यान्टा (Coke/Fanta 250ml)', kcal: 140, sugar: 35 },
  diet_coke: { nameNep: 'डाइट कोक (Diet Coke)', kcal: 1, sugar: 0 },
  milk_tea: { nameNep: 'दूध चिया (Milk Tea with Sugar)', kcal: 120, sugar: 18 },
  black_tea: { nameNep: 'कालो चिया (Black Tea)', kcal: 15, sugar: 3 },
};

export function MomoCalorieCalculator() {
  const [momoType, setMomoType] = useState<MomoType>('buff');
  const [style, setStyle] = useState<MomoStyle>('steamed');
  const [pieces, setPieces] = useState<number>(10); // Standard plate = 10 pcs
  const [extraAchar, setExtraAchar] = useState<boolean>(true);
  const [drink, setDrink] = useState<MomoDrink>('none');
  const [copied, setCopied] = useState<boolean>(false);

  // Nutritional Calculation
  const calculation = useMemo(() => {
    const base = MOMO_NUTRITION[momoType];
    const styleInfo = STYLE_MULTIPLIERS[style];
    const plates = pieces / 10;

    // Per piece calculation with style multiplier
    const kcalFromPieces = Math.round(pieces * base.kcalPerPiece * styleInfo.mult);
    const kcalFromStyleExtra = Math.round(plates * styleInfo.extraKcalPerPlate);
    const acharKcal = extraAchar ? Math.round(plates * 40) : 0;
    const drinkKcal = DRINK_NUTRITION[drink].kcal;

    const totalKcal = kcalFromPieces + kcalFromStyleExtra + acharKcal + drinkKcal;

    // Macros
    const protein = Math.round((pieces * base.proteinPerPiece) * 10) / 10;
    const carbs = Math.round((pieces * base.carbsPerPiece + (extraAchar ? plates * 4 : 0) + DRINK_NUTRITION[drink].sugar) * 10) / 10;
    const fat = Math.round((pieces * base.fatPerPiece * styleInfo.mult + plates * styleInfo.extraFatGrams + (extraAchar ? plates * 2.5 : 0)) * 10) / 10;

    // Calories from macros: protein: 4kcal/g, carbs: 4kcal/g, fat: 9kcal/g
    const totalMacroKcal = (protein * 4) + (carbs * 4) + (fat * 9);
    const proteinPct = totalMacroKcal > 0 ? Math.round((protein * 4 / totalMacroKcal) * 100) : 0;
    const carbsPct = totalMacroKcal > 0 ? Math.round((carbs * 4 / totalMacroKcal) * 100) : 0;
    const fatPct = totalMacroKcal > 0 ? Math.round((fat * 9 / totalMacroKcal) * 100) : 0;

    // Burn off minutes:
    // Walking: 4 kcal/min (~240/hr)
    // Jogging: 10 kcal/min (~600/hr)
    // Cycling: 7.5 kcal/min (~450/hr)
    // Jump Rope: 11 kcal/min (~660/hr)
    const walkMins = Math.round(totalKcal / 4.2);
    const jogMins = Math.round(totalKcal / 10.0);
    const cycleMins = Math.round(totalKcal / 7.5);
    const ropeMins = Math.round(totalKcal / 11.0);

    // Rice bowl equivalence (~130 kcal per bowl of cooked white rice)
    const riceBowls = Math.round((totalKcal / 130) * 10) / 10;
    const rotis = Math.round((totalKcal / 105) * 10) / 10;

    return {
      totalKcal,
      protein,
      carbs,
      fat,
      proteinPct,
      carbsPct,
      fatPct,
      walkMins,
      jogMins,
      cycleMins,
      ropeMins,
      riceBowls,
      rotis,
    };
  }, [momoType, style, pieces, extraAchar, drink]);

  const handleShare = () => {
    const text = `🥟 Nepali Momo Calorie Count:\n` +
      `Item: ${pieces} pcs of ${MOMO_NUTRITION[momoType].nameEng} (${STYLE_MULTIPLIERS[style].nameEng})\n` +
      `Total Calories: ${calculation.totalKcal} kcal\n` +
      `Protein: ${calculation.protein}g | Carbs: ${calculation.carbs}g | Fat: ${calculation.fat}g\n` +
      `Burn it off: ~${calculation.jogMins} mins jogging or ${calculation.walkMins} mins walking!\n` +
      `Check yours at: https://nepalcalc.com/momo-calorie`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calculator-card" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              backgroundColor: '#ffedd5', 
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Nepali Momo Calorie Counter (मोमो पोषण तथा क्यालोरी)
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              Buff, Chicken, Veg, Paneer & Pork with Steamed, Kothey, Fried, C-Momo & Jhol
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 14px' }}
        >
          {copied ? <Check size={15} /> : <Share2 size={15} />}
          {copied ? 'Copied Link & Result!' : 'Share Result'}
        </button>
      </div>

      {/* Selectors Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Momo Variety */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Utensils size={16} color="var(--primary)" />
            मोमोको प्रकार (Momo Variety)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(MOMO_NUTRITION) as MomoType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setMomoType(type)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: momoType === type ? 'var(--primary)' : 'var(--border-subtle)',
                  backgroundColor: momoType === type ? 'rgba(2, 132, 199, 0.08)' : 'var(--bg-subtle)',
                  color: momoType === type ? 'var(--primary)' : 'var(--text-primary)',
                  fontWeight: momoType === type ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {MOMO_NUTRITION[type].nameNep}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Style */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Flame size={16} color="#ea580c" />
            पकाउने तरिका (Cooking Style)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(STYLE_MULTIPLIERS) as MomoStyle[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: style === s ? '#ea580c' : 'var(--border-subtle)',
                  backgroundColor: style === s ? 'rgba(234, 88, 12, 0.08)' : 'var(--bg-subtle)',
                  color: style === s ? '#ea580c' : 'var(--text-primary)',
                  fontWeight: style === s ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {STYLE_MULTIPLIERS[s].nameNep}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plates / Pieces & Add-ons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Quantity */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              मोमोको संख्या (Portion / Pieces):
            </label>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
              {pieces} वटा ({pieces / 10} प्लेट)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            {[10, 15, 20, 25].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setPieces(count)}
                style={{
                  flex: 1,
                  padding: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: pieces === count ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: pieces === count ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {count / 10} प्लेट ({count} pcs)
              </button>
            ))}
          </div>

          <input
            type="range"
            min="5"
            max="40"
            step="1"
            value={pieces}
            onChange={(e) => setPieces(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        {/* Extras & Drinks */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Coffee size={16} color="var(--primary)" />
            पेय तथा अतिरिक्त अचार (Drinks & Achar)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={extraAchar}
                onChange={(e) => setExtraAchar(e.target.checked)}
              />
              थप टमाटर/तीलको अचार (+४० क्यालोरी)
            </label>

            <select
              value={drink}
              onChange={(e) => setDrink(e.target.value as MomoDrink)}
              className="input-field"
              style={{ width: '100%', padding: '8px', fontSize: '13px' }}
            >
              {(Object.keys(DRINK_NUTRITION) as MomoDrink[]).map((d) => (
                <option key={d} value={d}>
                  {DRINK_NUTRITION[d].nameNep} {DRINK_NUTRITION[d].kcal > 0 ? `(+${DRINK_NUTRITION[d].kcal} kcal)` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 237, 213, 0.4), rgba(254, 215, 170, 0.2))',
          borderRadius: '16px',
          border: '1px solid #fed7aa',
          padding: '24px',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#c2410c' }}>
              कुल क्यालोरी (TOTAL ENERGY)
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '42px', fontWeight: 900, color: '#9a3412', lineHeight: 1 }}>
                {calculation.totalKcal}
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#c2410c' }}>
                kcal (क्यालोरी)
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#7c2d12', marginTop: '6px' }}>
              {pieces} pieces of {MOMO_NUTRITION[momoType].nameNep} ({STYLE_MULTIPLIERS[style].nameNep})
            </p>
          </div>

          {/* Macros Pill Box */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid #fed7aa', minWidth: '90px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>प्रोटिन (Protein)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb' }}>{calculation.protein}g</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>{calculation.proteinPct}% Energy</div>
            </div>

            <div style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid #fed7aa', minWidth: '90px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>कार्बोहाइड्रेट (Carbs)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>{calculation.carbs}g</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>{calculation.carbsPct}% Energy</div>
            </div>

            <div style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid #fed7aa', minWidth: '90px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>चिल्लो (Fat)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ea580c' }}>{calculation.fat}g</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>{calculation.fatPct}% Energy</div>
            </div>
          </div>
        </div>

        {/* Nepali Food Equivalence Fun Banner */}
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#7c2d12' }}>
          <Sparkles size={18} color="#ea580c" />
          <span>
            <strong>तुलना: </strong> यो {pieces} वटा मोमो करिब <strong>{calculation.riceBowls} कचौरा उसिनेको भात</strong> वा <strong>{calculation.rotis} वटा गहुँको रोटी</strong> बराबरको ऊर्जा हो!
          </span>
        </div>
      </div>

      {/* How to Burn It Off Section */}
      <div style={{ background: 'var(--bg-subtle)', borderRadius: '14px', padding: '20px', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#ef4444" />
          यो मोमो पचाउन कति कसरत गर्नुपर्छ? (How to Burn {calculation.totalKcal} Calories)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🚶 हिँडाइ (Brisk Walk)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              ~{calculation.walkMins} मिनेट
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>@ 5 km/hr गतिमा</div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🏃 दौडाइ (Jogging)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              ~{calculation.jogMins} मिनेट
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>@ 8.5 km/hr गतिमा</div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🚴 साइकल चलाइ (Cycling)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              ~{calculation.cycleMins} मिनेट
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>मध्यम गतिमा</div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🪢 डोरी नाघ्ने (Jump Rope)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              ~{calculation.ropeMins} मिनेट
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>तीव्र गतिमा</div>
          </div>
        </div>
      </div>
    </div>
  );
}
