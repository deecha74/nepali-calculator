'use client';

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Building,
  Laptop,
  Car,
  Wrench,
  FileSpreadsheet,
  AlertTriangle,
  Info,
  Copy,
  Check,
  ChevronRight,
  TrendingDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export interface AssetBlockConfig {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  nepaliName: string;
  rate: number; // percentage
  description: string;
  nepaliDescription: string;
  icon: string;
  examples: string[];
}

export const ASSET_BLOCKS: AssetBlockConfig[] = [
  {
    id: 'A',
    name: 'Block A — Buildings & Permanent Structures',
    nepaliName: 'समूह क — भवन, संरचना तथा स्थायी निर्माण',
    rate: 5,
    description: 'Buildings, warehouses, bridges, drainage, and permanent civil structures.',
    nepaliDescription: 'घर, भवन, गोदाम, पर्खाल, सडक तथा स्थायी सिभिल संरचनाहरू।',
    icon: 'Building',
    examples: ['Office Building', 'Factory Shed', 'Boundary Wall', 'Warehouse'],
  },
  {
    id: 'B',
    name: 'Block B — Computers, Furniture & Office Equipment',
    nepaliName: 'समूह ख — कम्प्युटर, फर्निचर तथा अफिस उपकरण',
    rate: 25,
    description: 'Computers, laptops, servers, printers, office desks, chairs, and fixtures.',
    nepaliDescription: 'कम्प्युटर, ल्यापटप, प्रिन्टर, टेबल, कुर्सी तथा कार्यालय फर्निचर।',
    icon: 'Laptop',
    examples: ['MacBook / PC', 'Office Desks & Chairs', 'Laser Printers', 'Routers'],
  },
  {
    id: 'C',
    name: 'Block C — Automobiles & Transport Vehicles',
    nepaliName: 'समूह ग — सवारी साधन तथा अटोमोबाइल्स',
    rate: 20,
    description: 'Cars, motorcycles, scooters, buses, minibuses, and utility transport vehicles.',
    nepaliDescription: 'मोटरसाइकल, स्कुटर, कार, जिप, भ्यान, बस तथा ढुवानी गाडी।',
    icon: 'Car',
    examples: ['Company Car / SUV', 'Motorcycle / Scooter', 'Delivery Van', 'Staff Bus'],
  },
  {
    id: 'D',
    name: 'Block D — Machinery, Equipment & Factory Plant',
    nepaliName: 'समूह घ — यन्त्र, मेशिनरी तथा उत्पादन प्लान्ट',
    rate: 15,
    description: 'Manufacturing plant, generators, transformers, workshop tools, and equipment.',
    nepaliDescription: 'उत्पादन मेशिनरी, जेनेरेटर, ट्रान्सफर्मर तथा कारखानाका औजारहरू।',
    icon: 'Wrench',
    examples: ['Diesel Generator', 'Manufacturing CNC', 'Electric Motors', 'Heavy Tools'],
  },
  {
    id: 'E',
    name: 'Block E — Intangibles (Software, Patents, Goodwill)',
    nepaliName: 'समूह ङ — अमूर्त सम्पत्ति (सफ्टवेयर, पेटेन्ट, प्रतिलिपि)',
    rate: 20, // default amortized over useful life
    description: 'Software licenses, patents, trademarks, copyrights, and intellectual property.',
    nepaliDescription: 'कम्प्युटर सफ्टवेयर लाइसेन्स, पेटेन्ट, ट्रेडमार्क तथा प्रतिलिपि अधिकार।',
    icon: 'Sparkles',
    examples: ['Custom ERP Software', 'Mobile App License', 'Registered Patent', 'Brand Trademark'],
  },
];

export function DepreciationCalculator() {
  const { language, t } = useLanguage();

  const [selectedBlockId, setSelectedBlockId] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('B');
  const [openingWdv, setOpeningWdv] = useState<number>(500000);

  // Additions categorized by Nepal Income Tax Act Absorption periods
  const [additionsPoush, setAdditionsPoush] = useState<number>(120000); // Shrawan - Poush (3/3 = 100%)
  const [additionsChaitra, setAdditionsChaitra] = useState<number>(45000); // Magh - Chaitra (2/3 = 66.67%)
  const [additionsAshadh, setAdditionsAshadh] = useState<number>(30000); // Baisakh - Ashadh (1/3 = 33.33%)

  // Disposals / Sales proceeds received
  const [disposalProceeds, setDisposalProceeds] = useState<number>(0);

  // Actual Repairs & Maintenance expenses incurred
  const [actualRepairs, setActualRepairs] = useState<number>(25000);

  // Block E specific useful life (years)
  const [usefulLifeYears, setUsefulLifeYears] = useState<number>(5);

  const [copied, setCopied] = useState<boolean>(false);

  const activeBlock = useMemo(() => {
    return ASSET_BLOCKS.find((b) => b.id === selectedBlockId) || ASSET_BLOCKS[1];
  }, [selectedBlockId]);

  // Calculations under Schedule 2 of Nepal Income Tax Act 2058
  const schedule = useMemo(() => {
    // 1. Absorbed Additions
    const absorbedPoush = additionsPoush * (3 / 3);
    const absorbedChaitra = additionsChaitra * (2 / 3);
    const absorbedAshadh = additionsAshadh * (1 / 3);
    const totalActualAdditions = additionsPoush + additionsChaitra + additionsAshadh;
    const totalAbsorbedAdditions = absorbedPoush + absorbedChaitra + absorbedAshadh;

    // Unabsorbed additions carry forward to next year's opening WDV
    const unabsorbedAdditions = totalActualAdditions - totalAbsorbedAdditions;

    // 2. Depreciation Base
    const grossBase = openingWdv + totalAbsorbedAdditions;
    const depreciationBase = Math.max(0, grossBase - disposalProceeds);

    // 3. Rate determination
    let ratePercent = activeBlock.rate;
    if (activeBlock.id === 'E') {
      ratePercent = usefulLifeYears > 0 ? (100 / usefulLifeYears) : 20;
    }

    // 4. Depreciation Amount
    const depreciationAmount = depreciationBase * (ratePercent / 100);

    // 5. Section 16 Repair & Maintenance limit (7% of depreciation base)
    const maxAllowableRepair = depreciationBase * 0.07;
    const allowableRepairExpense = Math.min(actualRepairs, maxAllowableRepair);
    const excessRepairCapitalized = Math.max(0, actualRepairs - maxAllowableRepair);

    // 6. Closing WDV to carry forward to next year (अनुसूची २ बमोजिम)
    // Closing WDV = (Depreciation Base - Depreciation Amount) + Unabsorbed Additions + Capitalized Excess Repairs
    const netBaseAfterDepreciation = Math.max(0, depreciationBase - depreciationAmount);
    const closingWdvNextYear = netBaseAfterDepreciation + unabsorbedAdditions + excessRepairCapitalized;

    return {
      openingWdv,
      totalActualAdditions,
      totalAbsorbedAdditions,
      unabsorbedAdditions,
      disposalProceeds,
      depreciationBase,
      ratePercent,
      depreciationAmount,
      maxAllowableRepair,
      allowableRepairExpense,
      excessRepairCapitalized,
      closingWdvNextYear,
      netBaseAfterDepreciation,
    };
  }, [
    activeBlock,
    openingWdv,
    additionsPoush,
    additionsChaitra,
    additionsAshadh,
    disposalProceeds,
    actualRepairs,
    usefulLifeYears,
  ]);

  const handleCopy = () => {
    const summary = `Nepal Tax Depreciation Schedule (${activeBlock.name}):
Opening WDV: रु ${Math.round(schedule.openingWdv).toLocaleString('en-IN')}
Total Additions: रु ${Math.round(schedule.totalActualAdditions).toLocaleString('en-IN')} (Absorbed: रु ${Math.round(schedule.totalAbsorbedAdditions).toLocaleString('en-IN')})
Disposals: रु ${Math.round(schedule.disposalProceeds).toLocaleString('en-IN')}
Depreciation Base: रु ${Math.round(schedule.depreciationBase).toLocaleString('en-IN')}
Depreciation Rate: ${schedule.ratePercent.toFixed(1)}%
Depreciation Expense (Deductible): रु ${Math.round(schedule.depreciationAmount).toLocaleString('en-IN')}
Allowable Repair (7% limit): रु ${Math.round(schedule.allowableRepairExpense).toLocaleString('en-IN')}
Excess Repair Capitalized: रु ${Math.round(schedule.excessRepairCapitalized).toLocaleString('en-IN')}
Closing WDV for Next FY: रु ${Math.round(schedule.closingWdvNextYear).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">
              {t('Nepal Income Tax Act Schedule 2', 'आयकर ऐन २०५८ अनुसूची-२ बमोजिम')}
            </span>
            <span className="badge badge-neutral">
              {t('WDV Block Depreciation & Section 16 Repairs', 'ह्रासकट्टी तथा मर्मत खर्च ७% सीमा')}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 800,
              marginTop: '10px',
              color: 'var(--text-primary)',
            }}
          >
            {t('Nepal Tax Depreciation Calculator (Schedule 2)', 'नेपाल कर ह्रासकट्टी (Schedule 2) हिसाब')}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {t(
              'Calculate written-down value (WDV) depreciation for Blocks A, B, C, D & E with 3-tier timing absorption and 7% repairs limit.',
              'कम्प्युटर, फर्निचर, गाडी, भवन तथा मेशिनरीको समय अनुसारको ह्रासकट्टी (३/३, २/३, १/३) र मर्मत खर्चको हिसाब।'
            )}
          </p>
        </div>

        {/* Block Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {t('Statutory Rate:', 'ऐन बमोजिम दर:')}
          </span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#003893',
              background: '#eff6ff',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {schedule.ratePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Block Selector Tabs */}
      <div style={{ marginBottom: '28px' }}>
        <label className="input-label" style={{ marginBottom: '10px' }}>
          {t('Select Asset Pool Block (सम्पत्तिको समूह छान्नुहोस्)', 'सम्पत्ति समूह (Asset Block)')}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
          {ASSET_BLOCKS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBlockId(b.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px 14px',
                borderRadius: '12px',
                border: selectedBlockId === b.id ? '2px solid #003893' : '1px solid #e2e8f0',
                backgroundColor: selectedBlockId === b.id ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: selectedBlockId === b.id ? '#003893' : '#0f172a' }}>
                  {t(`Block ${b.id}`, `समूह ${b.id}`)}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: selectedBlockId === b.id ? '#003893' : '#64748b',
                    background: selectedBlockId === b.id ? '#dbeafe' : '#f1f5f9',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {b.rate}%
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.3 }}>
                {language === 'ne' ? b.nepaliName.split('—')[1] : b.name.split('—')[1]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Input Column */}
        <div>
          {/* Opening WDV */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {t('Opening Written Down Value (WDV) — सुरुको बाँकी मूल्य', 'सुरुको बाँकी मूल्य (Opening WDV)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontWeight: 700, color: '#64748b' }}>
                रु
              </span>
              <input
                type="number"
                className="text-input"
                style={{ paddingLeft: '38px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                value={openingWdv || ''}
                onChange={(e) => setOpeningWdv(Number(e.target.value) || 0)}
              />
            </div>
            <span className="input-subtext">
              {t('Carried forward from previous year tax audit return closing WDV', 'गत वर्षको कर लेखापरीक्षणबाट सरेको बाँकी मूल्य')}
            </span>
          </div>

          {/* Additions with Nepal Timing Rule Absorptions */}
          <div
            style={{
              background: '#f8fafc',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('Additions / New Purchases (चालू आ.व. को नयाँ खरिद)', 'नयाँ खरिद (समय अनुसार)')}
              </span>
              <span style={{ fontSize: '11px', color: '#003893', fontWeight: 700 }}>
                {t('Schedule 2 Timing Rule', 'ऐनको समय नियम')}
              </span>
            </div>

            {/* Shrawan - Poush (3/3 = 100%) */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  {t('Shrawan 1 – Poush End (साउन देखि पुस मसान्त सम्म)', 'साउन – पुस मसान्त (३/३ = १००%)')}
                </span>
                <span style={{ color: '#059669', fontWeight: 700 }}>100% Absorbed (३/३)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                style={{ fontSize: '14px' }}
                value={additionsPoush || ''}
                onChange={(e) => setAdditionsPoush(Number(e.target.value) || 0)}
              />
            </div>

            {/* Magh - Chaitra (2/3 = 66.67%) */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  {t('Magh 1 – Chaitra End (माघ देखि चैत मसान्त सम्म)', 'माघ – चैत मसान्त (२/३ = ६६.६७%)')}
                </span>
                <span style={{ color: '#d97706', fontWeight: 700 }}>66.7% Absorbed (२/३)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                style={{ fontSize: '14px' }}
                value={additionsChaitra || ''}
                onChange={(e) => setAdditionsChaitra(Number(e.target.value) || 0)}
              />
            </div>

            {/* Baisakh - Ashadh (1/3 = 33.33%) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  {t('Baisakh 1 – Ashadh End (वैशाख देखि असार मसान्त सम्म)', 'वैशाख – असार मसान्त (१/३ = ३३.३३%)')}
                </span>
                <span style={{ color: '#c8102e', fontWeight: 700 }}>33.3% Absorbed (१/३)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                style={{ fontSize: '14px' }}
                value={additionsAshadh || ''}
                onChange={(e) => setAdditionsAshadh(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Disposals & Repairs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '12px' }}>
                {t('Sales / Disposal Proceeds', 'बिक्री / निसर्ग प्राप्त रकम')}
              </label>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                value={disposalProceeds || ''}
                onChange={(e) => setDisposalProceeds(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">{t('Deducted from base', 'आधारबाट घट्छ')}</span>
            </div>

            <div>
              <label className="input-label" style={{ fontSize: '12px' }}>
                {t('Actual Repairs Expense', 'वास्तविक मर्मत खर्च')}
              </label>
              <input
                type="number"
                placeholder="0"
                className="text-input"
                value={actualRepairs || ''}
                onChange={(e) => setActualRepairs(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">{t('Subject to 7% limit', '७% सीमा लागु हुन्छ')}</span>
            </div>
          </div>
        </div>

        {/* Results & Audit Breakdown Column */}
        <div>
          {/* Main Depreciation Highlight Card */}
          <div
            className="result-card-highlight"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              padding: '28px 26px',
              borderRadius: '16px',
              boxShadow: '0 14px 35px -4px rgba(15, 23, 42, 0.25)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
                  {t('Tax Depreciation for the Year (चालू आ.व. को ह्रासकट्टी)', 'चालू आ.व. को ह्रासकट्टी रकम')}
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#38bdf8', margin: '6px 0 2px', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.depreciationAmount).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  {t('Depreciation Base: Rs.', 'ह्रासकट्टी आधार रकम: रू.')} {Math.round(schedule.depreciationBase).toLocaleString('en-IN')} ({schedule.ratePercent.toFixed(1)}%)
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {copied ? <Check size={14} color="#60a5fa" /> : <Copy size={14} />}
                <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy', 'कपी')}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                  {t('CLOSING WDV (NEXT YEAR)', 'आउँदो वर्ष सर्ने WDV')}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.closingWdvNextYear).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{t('Next FY Opening Balance', 'अर्को आ.व. को सुरु मौज्दात')}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                  {t('ALLOWABLE REPAIR (7%)', 'खर्च लेख्न पाउने मर्मत (७%)')}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.allowableRepairExpense).toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {schedule.excessRepairCapitalized > 0
                    ? `रु ${Math.round(schedule.excessRepairCapitalized).toLocaleString('en-IN')} पूँजीकरण`
                    : t('Within 7% limit', '७% सीमा भित्र')}
                </span>
              </div>
            </div>
          </div>

          {/* Section 16 Repairs & Maintenance Check Alert */}
          {schedule.excessRepairCapitalized > 0 && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}
            >
              <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '12.5px', color: '#92400e', lineHeight: 1.5 }}>
                <strong>{t('Section 16 Repair Limitation Triggered:', 'दफा १६ बमोजिम मर्मत खर्च पूँजीकरण:')}</strong>
                <p style={{ margin: '4px 0 0' }}>
                  {t(
                    `Actual repair of Rs. ${Math.round(actualRepairs).toLocaleString('en-IN')} exceeds 7% limit (Rs. ${Math.round(schedule.maxAllowableRepair).toLocaleString('en-IN')}). Excess of Rs. ${Math.round(schedule.excessRepairCapitalized).toLocaleString('en-IN')} is capitalized into next year's opening WDV.`,
                    `वास्तविक मर्मत खर्च रु. ${Math.round(actualRepairs).toLocaleString('en-IN')} ले ७% को सीमा रु. ${Math.round(schedule.maxAllowableRepair).toLocaleString('en-IN')} काटेकोले बाँकी रु. ${Math.round(schedule.excessRepairCapitalized).toLocaleString('en-IN')} अर्को वर्षको सुरु WDV मा पुँजीकरण गरिएको छ।`
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Schedule 2 Detailed Tax Audit Annex Sheet */}
          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileSpreadsheet size={18} color="#003893" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                  {t('IRD Schedule 2 Tax Audit Annex', 'आयकर अनुसूची-२ कर लेखापरीक्षण फाँटवारी')}
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#003893', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                Block {activeBlock.id}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>1. {t('Opening WDV (सुरु बाँकी मूल्य):', '१. सुरु बाँकी मूल्य (Opening WDV):')}</span>
                <strong style={{ color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.openingWdv).toLocaleString('en-IN')}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>2. {t('Total Absorbed Additions (खरिद आधार):', '२. समायोजन भएको खरिद रकम:')}</span>
                <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  + रु {Math.round(schedule.totalAbsorbedAdditions).toLocaleString('en-IN')}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>3. {t('Disposal / Sale Proceeds (निसर्ग रकम):', '३. बिक्री / निसर्ग भएको रकम:')}</span>
                <strong style={{ color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                  - रु {Math.round(schedule.disposalProceeds).toLocaleString('en-IN')}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontWeight: 700, borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span>4. {t('Depreciation Base (ह्रासकट्टी आधार):', '४. ह्रासकट्टी आधार (Depreciation Base):')}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.depreciationBase).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span>5. {t(`Depreciation Amount (${schedule.ratePercent.toFixed(1)}%):`, `५. चालू वर्षको ह्रासकट्टी (${schedule.ratePercent.toFixed(1)}%):`)}</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>
                  - रु {Math.round(schedule.depreciationAmount).toLocaleString('en-IN')}
                </strong>
              </div>

              {schedule.unabsorbedAdditions > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706', fontSize: '12px' }}>
                  <span>+ {t('Unabsorbed Additions (अर्को वर्ष सर्ने खरिद):', 'समायोजन हुन बाँकी नयाँ खरिद:')}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>
                    + रु {Math.round(schedule.unabsorbedAdditions).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}

              {schedule.excessRepairCapitalized > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706', fontSize: '12px' }}>
                  <span>+ {t('Capitalized Excess Repairs (दफा १६):', 'पूँजीकरण भएको बढी मर्मत खर्च:')}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>
                    + रु {Math.round(schedule.excessRepairCapitalized).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  color: '#003893',
                  border: '1px solid #e2e8f0',
                  marginTop: '4px',
                }}
              >
                <span>{t('Closing WDV Carried Forward:', 'अन्तिम बाँकी (अर्को वर्षको सुरु WDV):')}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(schedule.closingWdvNextYear).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
