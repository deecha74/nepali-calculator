'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Home,
  Layers,
  Hammer,
  Truck,
  Copy,
  Check,
  Share2,
  Sparkles,
  Building,
  Building2,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Columns3,
  Boxes,
  ShieldCheck,
  Activity,
  HardHat,
  Ruler,
  Landmark,
  FileCheck,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Award,
  CalendarDays,
  Users,
  MapPin,
  X
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';
import {
  calculateHouseConstruction,
  ConstructionTier,
  SoilCondition,
  MasonryType,
  TIER_RATES,
  DEFAULT_UNIT_RATES,
  UnitRateCustomization,
  ConstructionEstimate
} from '@/lib/utils/houseConstruction';

export function HouseConstructionCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  // Input mode: direct sq ft or land area (Aana)
  const [inputMode, setInputMode] = useState<'sqft' | 'aana'>('sqft');
  const [aanaCount, setAanaCount] = useState<number>(3.5);
  const [storeys, setStoreys] = useState<number>(2.5);
  const [builtUpSqFt, setBuiltUpSqFt] = useState<number>(2000);
  const [tier, setTier] = useState<ConstructionTier>('standard');
  const [soilCondition, setSoilCondition] = useState<SoilCondition>('medium');
  const [masonryType, setMasonryType] = useState<MasonryType>('chimney_brick');
  const [customRate, setCustomRate] = useState<number>(0);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);

  // Local Market Unit Rates Customizer Modal
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [isRateModalOpen, setIsRateModalOpen] = useState<boolean>(false);
  const [customRates, setCustomRates] = useState<UnitRateCustomization>({
    cementBag: DEFAULT_UNIT_RATES.cementBag,
    steelKg: DEFAULT_UNIT_RATES.steelKg,
    brickPiece: DEFAULT_UNIT_RATES.brickPiece,
    aacBlock: DEFAULT_UNIT_RATES.aacBlock,
    sandCuFt: DEFAULT_UNIT_RATES.sandCuFt,
    aggregateCuFt: DEFAULT_UNIT_RATES.aggregateCuFt,
    masonWage: DEFAULT_UNIT_RATES.masonWage,
    laborWage: DEFAULT_UNIT_RATES.laborWage,
  });

  const isCustomized = useMemo(() => {
    return (
      customRates.cementBag !== DEFAULT_UNIT_RATES.cementBag ||
      customRates.steelKg !== DEFAULT_UNIT_RATES.steelKg ||
      customRates.brickPiece !== DEFAULT_UNIT_RATES.brickPiece ||
      customRates.aacBlock !== DEFAULT_UNIT_RATES.aacBlock ||
      customRates.sandCuFt !== DEFAULT_UNIT_RATES.sandCuFt ||
      customRates.aggregateCuFt !== DEFAULT_UNIT_RATES.aggregateCuFt ||
      customRates.masonWage !== DEFAULT_UNIT_RATES.masonWage ||
      customRates.laborWage !== DEFAULT_UNIT_RATES.laborWage
    );
  }, [customRates]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRateModalOpen(false);
      }
    };
    if (isRateModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRateModalOpen]);

  // Active detail inspector tab
  type DetailTab =
    | 'pillars'
    | 'structural'
    | 'architectural'
    | 'bricks'
    | 'cement'
    | 'steel'
    | 'rate_analysis'
    | 'boq'
    | 'cashflow'
    | 'permits'
    | 'checklist';

  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>('pillars');

  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // When Aana changes or storeys change in Aana mode, compute approximate built-up area
  // 1 Aana = 342.25 sq ft. Standard municipal ground coverage in Nepal is ~65-70%.
  const effectiveSqFt = useMemo(() => {
    if (inputMode === 'aana') {
      const groundCoverage = aanaCount * 342.25 * 0.68;
      return Math.round(groundCoverage * storeys);
    }
    return builtUpSqFt;
  }, [inputMode, aanaCount, storeys, builtUpSqFt]);

  const estimate: ConstructionEstimate = useMemo(() => {
    return calculateHouseConstruction({
      builtUpSqFt: effectiveSqFt,
      storeys,
      tier,
      soilCondition,
      masonryType,
      costPerSqFtCustom: useCustomRate && customRate > 0 ? customRate : undefined,
      customRates,
    });
  }, [effectiveSqFt, storeys, tier, soilCondition, masonryType, useCustomRate, customRate, customRates]);

  // Number formatters
  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(formatted) : formatted;
  };

  const formatCurrency = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? `रू. ${toNepaliDigits(formatted)}` : `NPR ${formatted}`;
  };

  const handleResetRates = () => {
    setCustomRates({ ...DEFAULT_UNIT_RATES });
  };

  const handleCopy = () => {
    const textEn = `Senior Structural Engineer Detailed Project Report (DPR) & BOQ:
Project: Residential RCC Frame Building (NBC 105:2020 Standard)
Built-up Area: ${estimate.totalBuiltUpSqFt.toLocaleString('en-IN')} sq. ft. (${storeys} Storeys)
Quality Standard: ${TIER_RATES[tier].nameEn}
Rate per Sq. Ft.: NPR ${estimate.effectiveRatePerSqFt.toLocaleString('en-IN')}
Total Estimated Project Budget: NPR ${estimate.totalBudget.toLocaleString('en-IN')}
• Materials Budget (65%): NPR ${estimate.materialBudget.toLocaleString('en-IN')}
• Labor & Wage Budget (35%): NPR ${estimate.laborBudget.toLocaleString('en-IN')}

Key Engineering Structural Breakdown:
- Columns / Pillars: ${estimate.materials.pillars.pillarCount} Columns (${estimate.materials.pillars.pillarSizeEn})
- Column Main Rebar: ${estimate.materials.pillars.rebarSpecEn}
- Footing Size & Depth: ${estimate.materials.pillars.footingSizeEn} (${estimate.materials.pillars.footingDepthEn})
- Plinth Beam & Roof Slab: ${estimate.materials.pillars.plinthBeamSizeEn} | 5" M20 Slab
- Wall Units: ${estimate.materials.bricksCount.toLocaleString('en-IN')} ${estimate.materials.bricksDetail.unitTypeEn} (Exterior 9": ${estimate.materials.bricksDetail.exterior9InchUnits.toLocaleString('en-IN')} | Interior 4.5": ${estimate.materials.bricksDetail.interior4InchUnits.toLocaleString('en-IN')})
- Cement: ${estimate.materials.cementBags} Bags (OPC Structure: ${estimate.materials.cementDetail.opcStructureBags} | PPC Finishing: ${estimate.materials.cementDetail.ppcFinishingBags})
- TMT Fe500D Rebar Steel: ${estimate.materials.steelQuintals} Quintals (${estimate.materials.steelKg} kg)
- River Sand: ~${estimate.materials.sandTrips} Tipper Trucks (${estimate.materials.sandCuFt} cu. ft.)
- Crushed Aggregate: ~${estimate.materials.aggregateTrips} Tipper Trucks (${estimate.materials.aggregateCuFt} cu. ft.)
- Municipal Permits & Scrutiny Fee: NPR ${estimate.materials.municipalPermits.totalConsultancyAndPermitCost.toLocaleString('en-IN')}
Calculated via Nepali Calc Senior Engineer DPR: https://nepalcalc.com/house-construction`;

    const textNe = `वरिष्ठ स्ट्रक्चरल इन्जिनियर विस्तृत DPR तथा निर्माण लागत विवरण (BOQ):
आयोजना: आवासीय आरसीसी फ्रेम घर (NBC 105:2020 मापदण्ड)
कुल निर्माण क्षेत्रफल: ${toNepaliDigits(estimate.totalBuiltUpSqFt.toLocaleString('ne-NP'))} वर्ग फिट (${toNepaliDigits(storeys)} तला)
निर्माण स्तर: ${TIER_RATES[tier].nameNe}
प्रति वर्ग फिट दर: रू. ${toNepaliDigits(estimate.effectiveRatePerSqFt.toLocaleString('ne-NP'))}
कुल अनुमानित आयोजना बजेट: रू. ${toNepaliDigits(estimate.totalBudget.toLocaleString('ne-NP'))}
• निर्माण सामग्री खर्च (६५%): रू. ${toNepaliDigits(estimate.materialBudget.toLocaleString('ne-NP'))}
• ठेक्का लेबर तथा ज्याला खर्च (३५%): रू. ${toNepaliDigits(estimate.laborBudget.toLocaleString('ne-NP'))}

मुख्य इन्जिनियरिङ संरचना विवरण:
- आरसीसी खम्बा (पिल्लर): ${toNepaliDigits(estimate.materials.pillars.pillarCount)} वटा (${estimate.materials.pillars.pillarSizeNe})
- मुख्य पिल्लर रड: ${estimate.materials.pillars.rebarSpecNe}
- जग (Footing): ${toNepaliDigits(estimate.materials.pillars.footingCount)} वटा (${estimate.materials.pillars.footingDepthNe})
- प्लिन्थ डिपिसी र छत ढलान: ${estimate.materials.pillars.plinthBeamSizeNe} | ५ इन्च M20 स्ल्याब
- गारो एकाइ: ${toNepaliDigits(estimate.materials.bricksCount.toLocaleString('ne-NP'))} वटा ${estimate.materials.bricksDetail.unitTypeNe}
- सिमेन्ट: ${toNepaliDigits(estimate.materials.cementBags)} बोरा (ओपिसी ढलान: ${toNepaliDigits(estimate.materials.cementDetail.opcStructureBags)} | पिपिसी गारो/प्लास्टर: ${toNepaliDigits(estimate.materials.cementDetail.ppcFinishingBags)})
- TMT Fe500D रड: ${toNepaliDigits(estimate.materials.steelQuintals)} क्विन्टल (${toNepaliDigits(estimate.materials.steelKg)} केजी)
- खोलाको बालुवा: करिब ${toNepaliDigits(estimate.materials.sandTrips)} ट्रिपर (${toNepaliDigits(estimate.materials.sandCuFt)} घनफिट)
- गिट्टी: करिब ${toNepaliDigits(estimate.materials.aggregateTrips)} ट्रिपर (${toNepaliDigits(estimate.materials.aggregateCuFt)} घनफिट)
- नगरपालिका नक्शा पास तथा इन्जिनियर शुल्क: रू. ${toNepaliDigits(estimate.materials.municipalPermits.totalConsultancyAndPermitCost.toLocaleString('ne-NP'))}
नेपाली क्याल्क इन्जिनियरिङ पोर्टल: https://nepalcalc.com/house-construction`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `Senior Structural Engineer DPR (${storeys} Floors, ${estimate.totalBuiltUpSqFt} sq ft): Total Budget NPR ${estimate.totalBudget.toLocaleString('en-IN')}. Recommended: ${estimate.materials.pillars.pillarCount} RCC Columns (${estimate.materials.pillars.pillarSizeEn}), ${estimate.materials.bricksCount.toLocaleString('en-IN')} Bricks, ${estimate.materials.cementBags} Cement Bags, ${estimate.materials.steelQuintals} Quintals Steel. View full structural BOQ: https://nepalcalc.com/house-construction`
    );
    const messageNe = encodeURIComponent(
      `इन्जिनियरिङ विस्तृत DPR (${toNepaliDigits(storeys)} तला, ${toNepaliDigits(estimate.totalBuiltUpSqFt)} वर्ग फिट): कुल बजेट रू. ${toNepaliDigits(estimate.totalBudget.toLocaleString('ne-NP'))}। पिल्लर: ${toNepaliDigits(estimate.materials.pillars.pillarCount)} वटा (${estimate.materials.pillars.pillarSizeNe}), इँटा: ${toNepaliDigits(estimate.materials.bricksCount.toLocaleString('ne-NP'))} वटा, सिमेन्ट: ${toNepaliDigits(estimate.materials.cementBags)} बोरा, रड: ${toNepaliDigits(estimate.materials.steelQuintals)} क्विन्टल। पूर्ण विवरण: https://nepalcalc.com/house-construction`
    );

    window.open(`https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const storeyOptions = [
    { value: 1, labelEn: '1 Floor', labelNe: '१ तला', icon: Home },
    { value: 2, labelEn: '2 Floors', labelNe: '२ तला', icon: Building },
    { value: 2.5, labelEn: '2.5 Floors', labelNe: '२.५ तला', icon: Building2 },
    { value: 3, labelEn: '3 Floors', labelNe: '३ तला', icon: Layers },
    { value: 4, labelEn: '4 Floors', labelNe: '४ तला', icon: Building2 },
  ];

  const tabs: { id: DetailTab; labelEn: string; labelNe: string; icon: any }[] = [
    { id: 'pillars', labelEn: '1. Pillars & Footings', labelNe: '१. खम्बा तथा जग', icon: Columns3 },
    { id: 'structural', labelEn: '2. Structural Schedule', labelNe: '२. संरचना विवरण (NBC 105)', icon: Ruler },
    { id: 'architectural', labelEn: '3. Floor Plan & Rooms', labelNe: '३. कोठा नाप र प्लान', icon: Home },
    { id: 'bricks', labelEn: '4. Masonry Walls', labelNe: '४. इँटाको गारो', icon: Boxes },
    { id: 'cement', labelEn: '5. Cement Grade (OPC/PPC)', labelNe: '५. सिमेन्ट बाँडफाँड', icon: Layers },
    { id: 'steel', labelEn: '6. Rebar BBS (Ø 8-20mm)', labelNe: '६. डण्डी तालिका', icon: Hammer },
    { id: 'rate_analysis', labelEn: '7. DUDBC Rate Analysis', labelNe: '७. दर विश्लेषण', icon: Activity },
    { id: 'boq', labelEn: '8. 6-Phase BOQ', labelNe: '८. ६-चरण BOQ', icon: FileSpreadsheet },
    { id: 'cashflow', labelEn: '9. 7-Stage Loan Disbursement', labelNe: '९. ७-किस्ता भुक्तानी', icon: Landmark },
    { id: 'permits', labelEn: '10. Municipality Permit & Fees', labelNe: '१०. नक्शा पास दस्तुर', icon: FileCheck },
    { id: 'checklist', labelEn: '11. NBC Earthquake Checklist', labelNe: '११. भूकम्प सुरक्षा नियम', icon: ShieldCheck },
  ];

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1160px', margin: '0 auto' }}>
      {/* Top Header & Quick Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <HardHat size={13} />
              {t('Senior Structural Engineer DPR & BOQ', 'वरिष्ठ स्ट्रक्चरल इन्जिनियर विस्तृत DPR र BOQ')}
            </span>
            <span className="badge badge-blue">
              {t('NBC 105:2020 / NBC 205 Standard', 'नेपाल राष्ट्रिय भवन संहिता मापदण्ड')}
            </span>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Award size={13} />
              {t('NEC Professional Standard', 'नेपाल इन्जिनियरिङ काउन्सिल प्रमाणीकरण')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('House Construction Cost & Engineering Materials Estimator', 'घर बनाउने खर्च तथा इन्जिनियरिङ निर्माण सामग्री क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Complete architectural Bill of Quantities (BOQ), structural pillar sizing, footing schedules, rebar diameter distribution, DUDBC rate analysis, municipal approval fees, and bank loan disbursement timeline.',
              'नेपालमा घर निर्माणको आधिकारिक इन्जिनियरिङ DPR: पिल्लर साइज, जगको गहिराइ, डण्डीको बार तालिका, इँटाको गारो, सिमेन्ट बाँडफाँड, सरकारी दर विश्लेषण, नक्शा पास राजस्व र ७-किस्ता भुक्तानी कार्यतालिका हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsRateModalOpen(true)}
            className="btn-secondary"
            style={{ 
              padding: '8px 14px', 
              fontSize: '13px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              border: isCustomized ? '2px solid #2563eb' : '1.5px solid var(--border-subtle)',
              background: isCustomized ? '#eff6ff' : 'var(--bg-card)',
              color: isCustomized ? '#1d4ed8' : 'var(--text-primary)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={t('Customize Material & Labor Rates', 'स्थानीय सामग्री तथा लेबर दर कस्टमाइज गर्नुहोस्')}
          >
            <SlidersHorizontal size={15} color={isCustomized ? '#2563eb' : 'currentColor'} />
            <span>{t('Customize Rates', 'दर कस्टमाइज')}</span>
            {isCustomized && (
              <span style={{ 
                padding: '1px 6px', 
                fontSize: '10px', 
                background: '#2563eb', 
                color: '#ffffff', 
                borderRadius: '8px', 
                fontWeight: 800 
              }}>
                {t('Custom', 'परिमार्जित')}
              </span>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy DPR', 'DPR कपि')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            title={t('Print Engineer Estimate Sheet', 'इन्जिनियरिङ लागत पाना प्रिन्ट गर्नुहोस्')}
          >
            <Printer size={16} />
            <span>{t('Print BOQ', 'प्रिन्ट')}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#25D366', borderColor: '#25D366' }}
          >
            <Share2 size={16} />
            <span>{t('WhatsApp Share', 'ह्वाट्सएप')}</span>
          </button>
        </div>
      </div>

      {/* Main Parameters Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '28px' }}>
        {/* Left Column: Dimensions, Soil & Quality */}
        <div>
          {/* Input Mode Selector */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            <button
              type="button"
              onClick={() => setInputMode('sqft')}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                border: `2px solid ${inputMode === 'sqft' ? '#2563eb' : 'var(--border-subtle)'}`,
                background: inputMode === 'sqft' ? '#eff6ff' : 'var(--bg-card)',
                color: inputMode === 'sqft' ? '#1d4ed8' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {t('By Built-Up Sq. Ft.', 'कुल वर्ग फिट अनुसार')}
            </button>
            <button
              type="button"
              onClick={() => setInputMode('aana')}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                border: `2px solid ${inputMode === 'aana' ? '#2563eb' : 'var(--border-subtle)'}`,
                background: inputMode === 'aana' ? '#eff6ff' : 'var(--bg-card)',
                color: inputMode === 'aana' ? '#1d4ed8' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {t('By Land Size (Aana / आना)', 'जग्गाको आना अनुसार')}
            </button>
          </div>

          {/* Area Input */}
          {inputMode === 'sqft' ? (
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ fontWeight: 600 }}>
                {t('Total Built-Up Area (Across All Floors in Sq. Ft.)', 'सबै तलाको कुल निर्माण क्षेत्रफल (वर्ग फिटमा)')}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)', fontSize: '13px' }}>
                  {t('Sq. Ft.', 'वर्ग फिट')}
                </span>
                <input
                  type="number"
                  min="200"
                  step="50"
                  className="number-input"
                  value={builtUpSqFt || ''}
                  onChange={(e) => setBuiltUpSqFt(parseFloat(e.target.value) || 0)}
                  style={{ fontSize: '18px', fontWeight: 700 }}
                />
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ fontWeight: 600 }}>
                {t('Plot Land Area in Aana (जग्गाको आना)', 'जग्गाको क्षेत्रफल (आनामा)')}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)', fontSize: '13px' }}>
                  {t('Aana (आना)', 'आना')}
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.25"
                  className="number-input"
                  value={aanaCount || ''}
                  onChange={(e) => setAanaCount(parseFloat(e.target.value) || 0)}
                  style={{ fontSize: '18px', fontWeight: 700 }}
                />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isNe
                  ? `(मापदण्ड अनुसार खुला ठाउँ छाड्दा करिब ${toNepaliDigits(Math.round(aanaCount * 342.25 * 0.68))} वर्ग फिट प्रति तला बन्नेछ)`
                  : `(~${Math.round(aanaCount * 342.25 * 0.68)} sq. ft. ground coverage per floor factoring setbacks)`}
              </div>
            </div>
          )}

          {/* Quick Preset Area Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {inputMode === 'sqft'
              ? [1200, 1600, 2000, 2500, 3000].map((sq) => {
                const isSelected = builtUpSqFt === sq;
                return (
                  <button
                    key={sq}
                    type="button"
                    onClick={() => setBuiltUpSqFt(sq)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      borderRadius: '20px',
                      border: `1.5px solid ${isSelected ? '#2563eb' : 'var(--border-subtle)'}`,
                      background: isSelected ? '#eff6ff' : 'var(--bg-card)',
                      color: isSelected ? '#1d4ed8' : 'var(--text-secondary)',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {formatNumber(sq)} {t('sq ft', 'वर्ग फिट')}
                  </button>
                );
              })
              : [2.5, 3, 3.5, 4, 5].map((a) => {
                const isSelected = aanaCount === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAanaCount(a)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      borderRadius: '20px',
                      border: `1.5px solid ${isSelected ? '#2563eb' : 'var(--border-subtle)'}`,
                      background: isSelected ? '#eff6ff' : 'var(--bg-card)',
                      color: isSelected ? '#1d4ed8' : 'var(--text-secondary)',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {formatNumber(a)} {t('Aana', 'आना')}
                  </button>
                );
              })}
          </div>

          {/* Number of Storeys with High-Contrast Active Indicator */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ fontWeight: 600, margin: 0 }}>
                {t('Number of Storeys / Floors (घरको तला)', 'घरको तला (Storeys)')}
              </label>
              <span className="badge badge-emerald" style={{ fontSize: '11px', fontWeight: 700 }}>
                {isNe ? `छनोट भएको: ${toNepaliDigits(storeys)} तला` : `Selected: ${storeys} Floors`}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {storeyOptions.map((opt) => {
                const isSelected = storeys === opt.value;
                const IconComp = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStoreys(opt.value)}
                    style={{
                      padding: '12px 6px',
                      borderRadius: '10px',
                      border: `2px solid ${isSelected ? '#2563eb' : 'var(--border-subtle)'}`,
                      background: isSelected ? '#2563eb' : 'var(--bg-card)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.28)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <IconComp size={18} color={isSelected ? '#ffffff' : 'var(--text-muted)'} />
                    <span>{isNe ? opt.labelNe : opt.labelEn}</span>
                    {isSelected && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'block'
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Senior Engineer Parameters: Soil Condition & Masonry Type */}
          <div style={{
            background: 'var(--bg-elevated, #f8fafc)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            {/* <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1e40af', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Ruler size={14} />
              {t('Senior Engineering Site Variables', 'स्ट्रक्चरल इन्जिनियरिङ साइट मानक')}
            </div> */}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {/* Soil Condition */}
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Soil Foundation Condition', 'माटोको अवस्था')}
                </label>
                <select
                  className="select-input"
                  value={soilCondition}
                  onChange={(e) => setSoilCondition(e.target.value as SoilCondition)}
                  style={{ fontSize: '12.5px', fontWeight: 600 }}
                >
                  <option value="medium">
                    {t('Firm / Medium Soil (5.5 ft footing)', 'बलियो / सामान्य माटो (५.५ फिट जग)')}
                  </option>
                  <option value="soft_clay">
                    {t('Soft Clay / Valley Silt (7.5 ft footing)', 'कालोमाटो / कमजोर माटो (७.५ फिट जग)')}
                  </option>
                </select>
              </div>

              {/* Masonry Unit Type */}
              <div>
                <label className="input-label" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  {t('Wall Masonry Material', 'पर्खालको सामग्री')}
                </label>
                <select
                  className="select-input"
                  value={masonryType}
                  onChange={(e) => setMasonryType(e.target.value as MasonryType)}
                  style={{ fontSize: '12.5px', fontWeight: 600 }}
                >
                  <option value="chimney_brick">
                    {t('1st Class Chimney Red Bricks', 'पहिलो नम्बर रातो इँटा (Standard)')}
                  </option>
                  <option value="aac_block">
                    {t('AAC Lightweight Blocks (Eco/Earthquake)', 'एएसी हलुका ब्लक (२५% कम तौल)')}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Quality Tier Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '8px' }}>
              {t('Construction Quality Specification', 'निर्माणको स्तर तथा फिनिसिङ')}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(['standard', 'semiLuxury', 'luxury'] as ConstructionTier[]).map((tr) => {
                const info = TIER_RATES[tr];
                const isSelected = tier === tr;
                return (
                  <div
                    key={tr}
                    onClick={() => {
                      setTier(tr);
                      setUseCustomRate(false);
                    }}
                    style={{
                      border: `2px solid ${isSelected ? '#2563eb' : 'var(--border-subtle)'}`,
                      borderRadius: '12px',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      background: isSelected ? '#eff6ff' : 'var(--bg-card)',
                      boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.12)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isSelected ? '#2563eb' : 'transparent',
                        }}>
                          {isSelected && <Check size={11} color="#ffffff" strokeWidth={3} />}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '13.5px', color: isSelected ? '#1e40af' : 'var(--text-primary)' }}>
                          {isNe ? info.nameNe : info.nameEn}
                        </div>
                      </div>
                      <span className={`badge ${isSelected ? 'badge-blue' : 'badge-neutral'}`} style={{ fontSize: '11px', fontWeight: 700 }}>
                        {isNe ? `रू. ${toNepaliDigits(info.rate)} / फिट` : `NPR ${info.rate} / sq ft`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Budget & Clickable Material Cards */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Header pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Total Estimated Construction Budget (DPR)', 'अनुमानित कुल निर्माण बजेट (DPR)')}
              </span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} />
                {isNe ? `${toNepaliDigits(estimate.totalBuiltUpSqFt)} वर्ग फिट` : `${estimate.totalBuiltUpSqFt} Sq. Ft.`}
              </span>
            </div>

            {/* Giant Big Budget Number */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1 }}>
                {isNe ? `रू. ${formatNumber(estimate.totalBudget)}` : `NPR ${formatNumber(estimate.totalBudget)}`}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isNe
                  ? `(प्रति वर्ग फिट रू. ${toNepaliDigits(estimate.effectiveRatePerSqFt)} का दरले • सामग्री ६५% + लेबर ३५%)`
                  : `(At NPR ${estimate.effectiveRatePerSqFt.toLocaleString('en-IN')} per sq. ft. • Material 65% + Labor 35%)`}
              </div>
            </div>

            {/* Budget Split: Material vs Labor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Materials Budget (65%)', 'निर्माण सामग्री खर्च (६५%)')}</div>
                <div style={{ fontSize: '17px', fontWeight: 800, marginTop: '2px', color: '#059669' }}>
                  {formatCurrency(estimate.materialBudget)}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Labor & Wage Budget (35%)', 'ज्याला तथा लेबर खर्च (३५%)')}</div>
                <div style={{ fontSize: '17px', fontWeight: 800, marginTop: '2px', color: '#b45309' }}>
                  {formatCurrency(estimate.laborBudget)}
                </div>
              </div>
            </div>

            {/* Interactive Material Cards Grid */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={15} color="var(--primary)" />
                {t('Click Material to Inspect Engineering Specs:', 'थप इन्जिनियरिङ विवरणका लागि कार्ड थिच्नुहोस्:')}
              </div>
              <span className="badge badge-amber" style={{ fontSize: '10.5px' }}>
                {t('Senior BOQ', 'इन्जिनियरिङ BOQ')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {/* Pillars Card */}
              <div
                onClick={() => setActiveDetailTab('pillars')}
                style={{
                  background: activeDetailTab === 'pillars' ? '#eff6ff' : 'var(--bg-card)',
                  border: `2px solid ${activeDetailTab === 'pillars' ? '#2563eb' : 'var(--border-subtle)'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeDetailTab === 'pillars' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('RCC Pillars / खम्बा', 'पिल्लर (खम्बा)')}</div>
                  <Columns3 size={15} color={activeDetailTab === 'pillars' ? '#2563eb' : 'var(--text-muted)'} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
                  {formatNumber(estimate.materials.pillars.pillarCount)} {t('Pillars', 'वटा')}
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  {isNe ? 'NBC 205 मापदण्ड खम्बा' : 'NBC 205 Grid'}
                </div>
              </div>

              {/* Bricks Card */}
              <div
                onClick={() => setActiveDetailTab('bricks')}
                style={{
                  background: activeDetailTab === 'bricks' ? '#eff6ff' : 'var(--bg-card)',
                  border: `2px solid ${activeDetailTab === 'bricks' ? '#2563eb' : 'var(--border-subtle)'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeDetailTab === 'bricks' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {isNe ? estimate.materials.bricksDetail.unitTypeNe : estimate.materials.bricksDetail.unitTypeEn}
                  </div>
                  <Boxes size={15} color={activeDetailTab === 'bricks' ? '#2563eb' : 'var(--text-muted)'} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {formatNumber(estimate.materials.bricksCount)} {t('Units', 'वटा')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ~{formatCurrency(estimate.materials.bricksCost)}
                </div>
              </div>

              {/* Cement Card */}
              <div
                onClick={() => setActiveDetailTab('cement')}
                style={{
                  background: activeDetailTab === 'cement' ? '#eff6ff' : 'var(--bg-card)',
                  border: `2px solid ${activeDetailTab === 'cement' ? '#2563eb' : 'var(--border-subtle)'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeDetailTab === 'cement' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('Cement / सिमेन्ट', 'सिमेन्ट (५० केजी बोरा)')}</div>
                  <Layers size={15} color={activeDetailTab === 'cement' ? '#2563eb' : 'var(--text-muted)'} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {formatNumber(estimate.materials.cementBags)} {t('Bags', 'बोरा')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ~{formatCurrency(estimate.materials.cementCost)}
                </div>
              </div>

              {/* Steel Rebar Card */}
              <div
                onClick={() => setActiveDetailTab('steel')}
                style={{
                  background: activeDetailTab === 'steel' ? '#eff6ff' : 'var(--bg-card)',
                  border: `2px solid ${activeDetailTab === 'steel' ? '#2563eb' : 'var(--border-subtle)'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeDetailTab === 'steel' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('Steel Rebar / रड', 'स्टिल रड (TMT ५००D)')}</div>
                  <Hammer size={15} color={activeDetailTab === 'steel' ? '#2563eb' : 'var(--text-muted)'} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {formatNumber(estimate.materials.steelQuintals)} {t('Quintals', 'क्विन्टल')}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ({formatNumber(estimate.materials.steelKg)} kg) ~{formatCurrency(estimate.materials.steelCost)}
                </div>
              </div>
            </div>

            {/* Note */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'Compliant with NBC 105:2020 seismic design of buildings and NBC 205 mandatory rules of thumb for reinforced concrete buildings with masonry infill in Nepal.',
                  'नेपाल राष्ट्रिय भवन संहिता NBC 105:2020 तथा NBC 205 भूकम्प प्रतिरोधी आवासीय भवन मापदण्ड अनुरूप तयार पारिएको आधिकारिक इन्जिनियरिङ विवरण।'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* SENIOR STRUCTURAL ENGINEER ADVANCED INSPECTOR TABS */}
      <div style={{
        background: 'var(--bg-elevated, #f8fafc)',
        border: '2px solid #2563eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08)',
      }}>
        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '14px',
          marginBottom: '22px'
        }}>
          {tabs.map((tab) => {
            const isActive = activeDetailTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDetailTab(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: `1.5px solid ${isActive ? '#2563eb' : 'var(--border-subtle)'}`,
                  background: isActive ? '#2563eb' : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComponent size={14} color={isActive ? '#ffffff' : 'var(--text-secondary)'} />
                <span>{isNe ? tab.labelNe : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Pillars & Foundation Schedule */}
        {activeDetailTab === 'pillars' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 2px', color: '#0f172a' }}>
                  {t('Pillar (Column) & Footing Schedule', 'पिल्लर (खम्बा) तथा जगको नाप')}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  {isNe
                    ? `भुइँ क्षेत्रफल ~${toNepaliDigits(estimate.materials.pillars.groundFootprintSqFt)} वर्ग फिट (${toNepaliDigits(storeys)} तला)`
                    : `Ground footprint ~${estimate.materials.pillars.groundFootprintSqFt} sq. ft. (${storeys} storeys)`}
                </p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '4px 12px', borderRadius: '999px' }}>
                {isNe ? `${toNepaliDigits(estimate.materials.pillars.pillarCount)} वटा पिल्लर (RCC Columns)` : `${estimate.materials.pillars.pillarCount} RCC Columns`}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
              {/* Pillar Size */}
              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Pillar Size (खम्बाको नाप)', 'पिल्लरको नाप')}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1e40af', margin: '4px 0 2px' }}>
                  12" × 12"
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  {t('300mm × 300mm (NBC 205)', '३००mm × ३००mm (NBC 205)')}
                </span>
              </div>

              {/* Main Rebar */}
              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Main Rebar Steel (ठाडो रड)', 'मुख्य ठाडो रड')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#b45309', margin: '4px 0 2px' }}>
                  {isNe ? '६ देखि ८ वटा १६mm' : '6 to 8 Nos. 16mm'}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  Fe500D TMT Rebar
                </span>
              </div>

              {/* Rings / Stirrups */}
              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Stirrups (रिङको दूरी)', 'रिङको दूरी (Ties)')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '4px 0 2px' }}>
                  8mm @ 4"–6" c/c
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  {t('135° Seismic Hooks', '१३५° भूकम्प हुक')}
                </span>
              </div>

              {/* Footing Size & Depth */}
              <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Footing & Depth (जग)', 'जगको नाप र गहिराइ')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669', margin: '4px 0 2px' }}>
                  5'0" × 5'0"
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#047857', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>
                  {isNe ? estimate.materials.pillars.footingDepthNe : estimate.materials.pillars.footingDepthEn}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Plinth Tie-Beam (डिपिसी बिम):', 'प्लिन्थ डिपिसी बिम:')}{' '}
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                  9" × 12" (4 Nos. 12mm bars)
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Roof Slab (छत ढलान):', 'छत ढलान:')}{' '}
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                  5" (125mm) M20 concrete
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full NBC 105 Structural Elements Schedule */}
        {activeDetailTab === 'structural' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Full Structural Member Engineering Schedule (NBC 105:2020)', 'नेपाल राष्ट्रिय भवन संहिता (NBC 105:2020) संरचना तालिका')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    `${estimate.materials.structuralSchedule.designCode} • Seismic Zone V (Z=0.35)`,
                    `${estimate.materials.structuralSchedule.designCode} • भूकम्प उच्च जोखिम क्षेत्र V`
                  )}
                </p>
              </div>
              <span className="badge badge-blue" style={{ fontSize: '11px', fontWeight: 700 }}>
                {isNe ? estimate.materials.structuralSchedule.soilBearingCapacityNe : estimate.materials.structuralSchedule.soilBearingCapacityEn}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                estimate.materials.structuralSchedule.columns,
                estimate.materials.structuralSchedule.plinthBeam,
                estimate.materials.structuralSchedule.floorBeams,
                estimate.materials.structuralSchedule.roofSlab,
                estimate.materials.structuralSchedule.staircase,
                estimate.materials.structuralSchedule.lintelSillBands,
              ].map((member, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e40af' }}>
                      {isNe ? member.memberNameNe : member.memberNameEn}
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '11px' }}>
                      {isNe ? member.concreteGradeNe : member.concreteGradeEn}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '12.5px' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                        {t('Dimensions / Cross Section', 'साइज तथा नाप')}
                      </div>
                      <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                        {isNe ? member.dimensionsNe : member.dimensionsEn}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                        {t('Main Rebar Specification', 'मुख्य डण्डी (रड)')}
                      </div>
                      <div style={{ fontWeight: 700, marginTop: '2px', color: '#b45309' }}>
                        {isNe ? member.mainRebarNe : member.mainRebarEn}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                        {t('Shear Stirrups / Ties', 'रिङ (टाई)')}
                      </div>
                      <div style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>
                        {isNe ? member.shearTiesNe : member.shearTiesEn}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                        {t('Clear Cover', 'कभर ब्लक')}
                      </div>
                      <div style={{ marginTop: '2px', color: '#059669', fontWeight: 600 }}>
                        {isNe ? member.clearCoverNe : member.clearCoverEn}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Floor Plan & Architectural Room Statement */}
        {activeDetailTab === 'architectural' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Architectural Floor Plan & Room Area Statement', 'आर्किटेक्चरल कोठा नाप तथा क्षेत्रफल विवरण')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    `Carpet Area: ~${formatNumber(estimate.materials.architecturalPlan.totalCarpetAreaSqFt)} sq. ft. (${estimate.materials.architecturalPlan.efficiencyPercentage}% efficiency) • Circulation: ~${formatNumber(estimate.materials.architecturalPlan.circulationAreaSqFt)} sq. ft.`,
                    `बस्ने कोठा क्षेत्रफल: करिब ${formatNumber(estimate.materials.architecturalPlan.totalCarpetAreaSqFt)} वर्ग फिट (${toNepaliDigits(estimate.materials.architecturalPlan.efficiencyPercentage)}% उपयोग) • सिँढी/प्यासेज: करिब ${formatNumber(estimate.materials.architecturalPlan.circulationAreaSqFt)} वर्ग फिट।`
                  )}
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                {isNe ? `${toNepaliDigits(storeys)} तलाको नक्सा` : `${storeys} Storey Plan`}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {estimate.materials.architecturalPlan.floors.map((fl, fIdx) => (
                <div key={fIdx} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1e40af' }}>
                      {isNe ? fl.floorLevelNe : fl.floorLevelEn}
                    </div>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {formatNumber(fl.floorAreaSqFt)} {t('sq. ft.', 'वर्ग फिट')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                    {fl.rooms.map((rm, rIdx) => (
                      <div key={rIdx} style={{
                        background: '#f8fafc',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                            {isNe ? rm.nameNe : rm.nameEn}
                          </span>
                          <span className="badge badge-blue" style={{ fontSize: '10.5px' }}>
                            {isNe ? rm.dimensionsNe : rm.dimensionsEn}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                          {isNe ? rm.notesNe : rm.notesEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Masonry & Wall Specifications */}
        {activeDetailTab === 'bricks' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Masonry Brickwork & Wall Partition Analysis', 'इँटाको गारो, पर्खाल तथा मसला विश्लेषण')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    `Total units: ${estimate.materials.bricksCount.toLocaleString('en-IN')} ${estimate.materials.bricksDetail.unitTypeEn}.`,
                    `कुल एकाइ: ${toNepaliDigits(estimate.materials.bricksCount.toLocaleString('ne-NP'))} वटा ${estimate.materials.bricksDetail.unitTypeNe}।`
                  )}
                </p>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '12px', fontWeight: 800 }}>
                {isNe ? `${toNepaliDigits(estimate.materials.bricksCount.toLocaleString('ne-NP'))} एकाइ` : `${estimate.materials.bricksCount.toLocaleString('en-IN')} Units`}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Exterior 9-Inch Boundary Walls (६०%)', 'बाहिरी ९ इन्च पर्खाल (६०%)')}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
                  {formatNumber(estimate.materials.bricksDetail.exterior9InchUnits)} {t('Units', 'वटा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Double layer brickwork resisting direct heavy rainfall and heat.', 'घामपानी र बाहिरी तापक्रमबाट घर सुरक्षित राख्न ९ इन्चको बाक्लो गारो।')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Interior 4.5-Inch Room Partitions (४०%)', 'भित्री ४.५ इन्च पार्टिसन (४०%)')}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#2563eb', marginTop: '4px' }}>
                  {formatNumber(estimate.materials.bricksDetail.interior4InchUnits)} {t('Units', 'वटा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Single brick partitions to maximize living room and bedroom floor space.', 'कोठाको बस्ने ठाउँ बढाउन भित्री भागमा ४.५ इन्चको पर्खाल।')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Mortar Mix Ratios & Cement Required', 'मसला अनुपात र सिमेन्ट')}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
                  ~{formatNumber(estimate.materials.bricksDetail.mortarCementBags)} {t('Bags', 'बोरा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isNe ? estimate.materials.bricksDetail.mortarRatioNe : estimate.materials.bricksDetail.mortarRatioEn}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Breakage Wastage Allowance (५% छुट)', 'टुटेफुटेको खेर जाने भाग (५%)')}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>
                  +{formatNumber(estimate.materials.bricksDetail.breakageWastageUnits)} {t('Units', 'वटा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Standard transportation and cutting wastage buffer included.', 'ढुवानी तथा काट्दा खेर जाने सामान्य ५% अतिरिक्त मात्रा।')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Cement Allocation (OPC vs PPC) */}
        {activeDetailTab === 'cement' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Cement Grade Sizing: OPC 43/53 vs PPC Specification', 'सिमेन्ट ग्रेड वर्गीकरण: ओपिसी (OPC) vs पिपिसी (PPC)')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    `Total estimated: ${estimate.materials.cementBags} bags (50kg). Engineering best practice recommends OPC for RCC load frames and PPC for finishing.`,
                    `कुल अनुमानित: ${toNepaliDigits(estimate.materials.cementBags)} बोरा (५० केजी)। पिल्लर र ढलानमा ओपिसी तथा गारो र प्लास्टरमा पिपिसी सिफारिस गरिन्छ।`
                  )}
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                {isNe ? `${toNepaliDigits(estimate.materials.cementBags)} बोरा कुल सिमेन्ट` : `${estimate.materials.cementBags} Bags Total`}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg-card)', border: '2px solid #2563eb', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#1e40af' }}>
                  {t('OPC 43/53 Grade (RCC Framing - ५२%)', 'ओपिसी (OPC) सिमेन्ट - पिल्लर र ढलान (५२%)')}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e40af', marginTop: '4px' }}>
                  {formatNumber(estimate.materials.cementDetail.opcStructureBags)} {t('Bags', 'बोरा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('High early compressive strength for Columns, Footings, Beams, and Roof Slabs (ढलान).', 'उच्च भार वहन क्षमताका लागि जग, पिल्लर, बिम र छत ढलानमा प्रयोग हुने।')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '2px solid #059669', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#065f46' }}>
                  {t('PPC Grade (Masonry & Plaster - ४८%)', 'पिपिसी (PPC) सिमेन्ट - गारो र प्लास्टर (४८%)')}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
                  {formatNumber(estimate.materials.cementDetail.ppcFinishingBags)} {t('Bags', 'बोरा')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Crack-resistant, smooth-workability pozzolana cement for wall joint mortar, plastering, and floor screed.', 'धाँजा नफाट्ने चिल्लो फिनिसिङका लागि इँटाको गारो, भित्तो प्लास्टर र टायलमा प्रयोग।')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Waterproofing Chemical Additive', 'वाटरप्रुफिङ केमिकल (Dr. Fixit / Fosroc)')}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
                  ~{formatNumber(estimate.materials.cementDetail.waterproofingCompoundLiters)} {t('Liters', 'लिटर')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Integral liquid waterproofing compound for roof casting and external wall plaster (~200ml/bag).', 'छत ढलान र बाहिरी प्लास्टरमा ओस र चुहावट रोक्न मिसाइने केमिकल।')}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('Total Water for Mixing & Curing', 'क्युरिङ तथा निर्माण पानी आवश्यकता')}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0284c7', marginTop: '4px' }}>
                  ~{formatNumber(estimate.materials.cementDetail.waterRequiredLiters)} {t('Liters', 'लिटर')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t('Mandatory 21 days continuous water curing ponding on roof slab is crucial for concrete strength.', 'छत ढलानमा कम्तीमा २१ दिनसम्म पानी जमाएर क्युरिङ गर्नु अनिवार्य हुन्छ।')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Rebar Bar Schedule by Diameter */}
        {activeDetailTab === 'steel' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Steel Rebar Bar Bending Schedule (BBS) by Diameter', 'डण्डीको मोटाइ (Diameter) अनुसार विस्तृत बार तालिका')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    `Total: ${estimate.materials.steelQuintals} Quintals (${estimate.materials.steelKg} kg) of Fe500D TMT earthquake-resistant rebar.`,
                    `कुल डण्डी: ${toNepaliDigits(estimate.materials.steelQuintals)} क्विन्टल (${toNepaliDigits(estimate.materials.steelKg)} केजी) Fe500D भूकम्प प्रतिरोधी TMT रड।`
                  )}
                </p>
              </div>
              <span className="badge badge-blue" style={{ fontSize: '12px', fontWeight: 800 }}>
                {isNe ? `${toNepaliDigits(estimate.materials.steelQuintals)} क्विन्टल डण्डी` : `${estimate.materials.steelQuintals} Quintals Steel`}
              </span>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead style={{ background: '#f1f5f9', borderBottom: '1px solid var(--border-subtle)' }}>
                  <tr>
                    <th style={{ padding: '10px 14px', fontWeight: 800 }}>{t('Rebar Size', 'डण्डी मोटाइ')}</th>
                    <th style={{ padding: '10px 14px', fontWeight: 800 }}>{t('Structural Application', 'प्रयोग हुने स्थान')}</th>
                    <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'right' }}>{t('Weight (Quintals)', 'तौल (क्विन्टल)')}</th>
                    <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'right' }}>{t('Weight (KG)', 'तौल (केजी)')}</th>
                    <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'right' }}>{t('Share (%)', 'प्रतिशत')}</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.materials.steelDetail.diameterSchedule.map((bar, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 800, color: '#1e40af' }}>{bar.diameter}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{isNe ? bar.purposeNe : bar.purposeEn}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'right' }}>{formatNumber(bar.quintals)}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'right' }}>{formatNumber(bar.kg)}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <span className="badge badge-neutral">{bar.percentage}%</span>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 800 }}>
                    <td colSpan={2} style={{ padding: '10px 14px' }}>
                      {t('Total TMT Steel Rebar + Binding Wire:', 'कुल TMT स्टिल रड + बाइन्डिङ तार:')}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#1e40af' }}>
                      {formatNumber(estimate.materials.steelQuintals)} {t('Quintals', 'क्विन्टल')}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#1e40af' }}>
                      {formatNumber(estimate.materials.steelKg)} kg
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                      {isNe ? `तार: ${toNepaliDigits(estimate.materials.steelDetail.bindingWireKg)} kg` : `Wire: ${estimate.materials.steelDetail.bindingWireKg} kg`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: DUDBC Standard Rate Analysis */}
        {activeDetailTab === 'rate_analysis' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Government DUDBC Itemized Rate Analysis (District Norms)', 'सरकारी DUDBC मापदण्ड अनुसार विस्तृत दर विश्लेषण (Rate Analysis)')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    'Standard unit rates combining material supply costs and departmental labor wage norms.',
                    'नेपाल सरकार सहरी विकास तथा भवन निर्माण विभागको नर्म्स अनुसार सामग्री र ज्याला दर विश्लेषण।'
                  )}
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                {t('District Rate Norms', 'जिल्ला दररेट मापदण्ड')}
              </span>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead style={{ background: '#f1f5f9', borderBottom: '1px solid var(--border-subtle)' }}>
                  <tr>
                    <th style={{ padding: '10px 12px', fontWeight: 800 }}>{t('Item Code', 'कोड')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800 }}>{t('Item Description', 'कामको विवरण')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right' }}>{t('Qty', 'परिमाण')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right' }}>{t('Material Rate', 'सामग्री दर')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right' }}>{t('Labor Rate', 'ज्याला दर')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right' }}>{t('Total Rate', 'कुल दर')}</th>
                    <th style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right' }}>{t('Amount', 'रकम')}</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.materials.rateAnalysis.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e40af' }}>{item.code}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                        {isNe ? item.descriptionNe : item.descriptionEn}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'right' }}>
                        {formatNumber(item.quantity)} {item.unit}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>
                        {formatCurrency(item.materialUnitCost)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: 'var(--text-muted)' }}>
                        {formatCurrency(item.laborUnitCost)}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'right' }}>
                        {formatCurrency(item.totalRate)}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 800, textAlign: 'right', color: '#059669' }}>
                        {formatCurrency(item.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 8: Itemized 6-Phase Engineering BOQ */}
        {activeDetailTab === 'boq' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Comprehensive 6-Phase Engineering Bill of Quantities (BOQ)', '६-चरण विस्तृत इन्जिनियरिङ कार्यतालिका तथा लागत (BOQ)')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    'Standard breakdown of sub-contracts, material supply milestones, and cash flow schedule.',
                    'निर्माणका ६ वटा मुख्य उप-चरणहरू, सामग्री आपूर्ति र भुक्तानी तालिका।'
                  )}
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                {formatCurrency(estimate.totalBudget)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {estimate.materials.boqPhases.map((phase) => (
                <div key={phase.id} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '13px'
                      }}>
                        {phase.phaseNumber}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>
                        {isNe ? phase.titleNe : phase.titleEn}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                        {phase.durationWeeks}
                      </span>
                      <span className="badge badge-blue" style={{ fontSize: '12px', fontWeight: 800 }}>
                        {formatCurrency(phase.estimatedCost)} ({phase.sharePercent}%)
                      </span>
                    </div>
                  </div>

                  <ul style={{ margin: '8px 0 0', paddingLeft: '22px', fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {(isNe ? phase.scopeItemsNe : phase.scopeItemsEn).map((item, idx) => (
                      <li key={idx} style={{ lineHeight: 1.5 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 9: Home Loan 7-Stage Milestone Disbursement */}
        {activeDetailTab === 'cashflow' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Bank Home Loan & Contractor 7-Stage Milestone Disbursement', 'बैंक घर कर्जा तथा निर्माण व्यवसायी ७-किस्ता भुक्तानी तालिका')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    'Standard payment release milestones aligned with commercial bank valuations and site engineer inspections.',
                    'नेपालका वाणिज्य बैंकहरू र इन्जिनियर सुपरभिजन अनुसार किस्ता रकम फुकुवा गर्ने कार्यतालिका।'
                  )}
                </p>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                {t('100% Phased Release', '१००% चरणबद्ध भुक्तानी')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {estimate.materials.milestoneCashflow.map((m) => (
                <div key={m.stageNumber} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#1e40af' }}>
                      {isNe ? m.titleNe : m.titleEn}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                        {t('Cumulative:', 'कुल पुगेको:')} {m.cumulativePercent}%
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '12px', fontWeight: 800 }}>
                        {formatCurrency(m.amount)}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', marginBottom: '4px' }}>
                    {t('Engineer Verification Criteria before Payment Release:', 'रकम भुक्तानी गर्नुअघि इन्जिनियरले जाँच्नुपर्ने शर्तहरू:')}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {(isNe ? m.inspectionRequirementsNe : m.inspectionRequirementsEn).map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 10: Municipality Permit & Engineering Fees */}
        {activeDetailTab === 'permits' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  {t('Municipality Approval (नक्शा पास) & Professional Engineering Fees', 'नगरपालिका नक्शा पास, धरौटी तथा इन्जिनियर परामर्श खर्च')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {t(
                    'Pre-construction regulatory fees for architectural 2D/3D design, ETABS seismic analysis report, and municipal building permits.',
                    'घर बनाउनु अगाडि नक्शा कोर्ने, स्ट्रक्चरल ETABS विश्लेषण, स्यानिटरी रेखांकन र नगरपालिका राजस्व खर्च।'
                  )}
                </p>
              </div>
              <span className="badge badge-blue" style={{ fontSize: '12px', fontWeight: 800 }}>
                {t('Total:', 'जम्मा:')} {formatCurrency(estimate.materials.municipalPermits.totalConsultancyAndPermitCost)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {estimate.materials.municipalPermits.items.map((permit, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{ flex: '1 1 340px' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>
                      {isNe ? permit.titleNe : permit.titleEn}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {isNe ? permit.descriptionNe : permit.descriptionEn}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {permit.timelineDays}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>
                      {formatCurrency(permit.cost)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 11: NBC Seismic Code & Site Quality Checklist */}
        {activeDetailTab === 'checklist' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
                {t('Senior Structural Engineer Earthquake & Quality Assurance Checklist', 'भूकम्प सुरक्षा तथा साइट गुणस्तर इन्जिनियरिङ चेकलिस्ट')}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                {t(
                  'Critical site supervision rules that every homeowner and site supervisor in Nepal must verify before casting.',
                  'ढलान गर्नु अगाडि र निर्माण गर्दा घरधनी तथा इन्जिनियरले अनिवार्य जाँच्नुपर्ने मुख्य बुँदाहरू।'
                )}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {[
                {
                  titleEn: '1. 135-Degree Seismic Hook Ties',
                  titleNe: '१. १३५ डिग्री भूकम्प प्रतिरोधी हुक',
                  descEn: 'All stirrup rings in pillars and beams must bend at 135 degrees with minimum 10-diameter hook length. Standard 90-degree open hooks unfold during an earthquake!',
                  descNe: 'पिल्लर र बिमको रिङ (टाई) ९० डिग्रीमा होइन, १३५ डिग्रीमा भित्रपटि दोब्रिएको हुनुपर्छ। ९० डिग्रीको हुक भूकम्प आउँदा तुरुन्तै खुस्किन्छ।',
                },
                {
                  titleEn: '2. Concrete Cover Blocks',
                  titleNe: '२. कभर ब्लक (Cover Blocks)',
                  descEn: 'Ensure concrete cover blocks before casting: 40mm for footings, 25mm for columns/beams, and 15mm for roof slabs to prevent rebar corrosion from atmospheric moisture.',
                  descNe: 'ढलान गर्दा डण्डी बाहिर नदेखियोस् भनेर जगमा ४०mm, पिल्लर/बिममा २५mm र छतमा १५mm को कंक्रीट कभर ब्लक राख्नु अनिवार्य छ।',
                },
                {
                  titleEn: '3. Mandatory 21-Day Slab Water Ponding',
                  titleNe: '३. २१ दिनसम्म छतमा पानी जमाएर क्युरिङ',
                  descEn: 'Concrete achieves 70% strength in 7 days, but requires 21 to 28 days of continuous water curing to reach full 100% design compressive strength (M20 grade).',
                  descNe: 'छत ढलान गरेको अर्को दिनदेखि माटो वा बालुवाको घेरा (क्यारी) बनाएर कम्तीमा २१ दिनसम्म निरन्तर पानी जमाएर क्युरिङ गर्नुपर्छ।',
                },
                {
                  titleEn: '4. Chicken Wire Mesh over Brick-Pillar Joints',
                  titleNe: '४. पिल्लर-इँटा जोर्नीमा कुखुरे जाली (Chicken Mesh)',
                  descEn: 'RCC concrete and red bricks expand and contract at different thermal rates. Nailing GI chicken mesh across the joint before plastering prevents unsightly vertical hairline cracks.',
                  descNe: 'पिल्लर र इँटाको गारो जोडिने भागमा प्लास्टर गर्नुअघि कुखुरे तारजाली ठोक्नुपर्छ, जसले पछि भित्तामा ठाडो धाँजा फाट्न दिँदैन।',
                },
                {
                  titleEn: '5. Mechanical Needle Vibrator Compaction',
                  titleNe: '५. मेकानिकल भाइब्रेटरको प्रयोग',
                  descEn: 'Never allow hand-tamping with wooden sticks during column or slab casting. A mechanical needle vibrator eliminates honeycombing and air voids in the concrete matrix.',
                  descNe: 'ढलान गर्दा पिल्लर वा छतमा काठको लाठीले होइन, मेकानिकल भाइब्रेटर चलाएर कङ्क्रिट भर्नुपर्छ जसले गर्दा भित्र हावाको प्वाल (हनीकम्ब) रहँदैन।',
                },
                {
                  titleEn: '6. Soil Test & Municipal Setbacks',
                  titleNe: '६. माटो परीक्षण र ५ फिट सेटब्याक',
                  descEn: 'Conduct a dynamic cone penetration (DCP) or bore-hole soil test. Maintain mandatory 5-foot clearance from plot boundaries to avoid municipal building code compliance fines.',
                  descNe: 'घर बनाउनु अगाडि माटोको भार वहन क्षमता (SBC) जाँच्ने र नगरपालिकाको नियम अनुसार चारैतिर कम्तीमा ५ फिट जग्गा छाडेर नक्सा पास गर्ने।',
                },
              ].map((check, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <h4 style={{ fontSize: '13.5px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {isNe ? check.titleNe : check.titleEn}
                    </h4>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {isNe ? check.descNe : check.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FORMAL ENGINEER VERIFICATION & DPR METADATA BLOCK FOR PRINT / REPORT */}
      <div style={{
        marginTop: '28px',
        padding: '20px',
        background: '#f8fafc',
        border: '1.5px dashed #cbd5e1',
        borderRadius: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Award size={16} />
            {t('Nepal Engineering Council (NEC) Verification & DPR Metadata', 'नेपाल इन्जिनियरिङ काउन्सिल (NEC) प्रमाणीकरण तथा DPR विवरण')}
          </div>
          <div>
            <strong>{t('Project:', 'आयोजना:')}</strong> {t('Proposed Residential RCC Frame Building', 'प्रस्तावित भूकम्प प्रतिरोधी आवासीय आरसीसी भवन')} |
            <strong> {t('Code:', 'संहिता:')}</strong> NBC 105:2020 / NBC 205 |
            <strong> {t('Concrete:', 'कङ्क्रिट:')}</strong> M20 (1:1.5:3) |
            <strong> {t('Steel:', 'डण्डी:')}</strong> Fe500D TMT
          </div>
          <div style={{ marginTop: '2px', color: 'var(--text-muted)' }}>
            {t('Official Computerized Structural Preliminary BOQ generated by Nepali Calc Senior Engineering Suite.', 'नेपाली क्याल्क इन्जिनियरिङ सुइटद्वारा कम्प्युटर प्रणालीबाट तयार पारिएको आधिकारिक प्रारम्भिक BOQ।')}
          </div>
        </div>

        <div style={{ textAlign: 'right', minWidth: '160px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('Engineer Signature Block', 'इन्जिनियर हस्ताक्षर')}
          </div>
          <div style={{ height: '32px', borderBottom: '1px solid #94a3b8', margin: '4px 0' }} />
          <div style={{ fontSize: '10.5px', color: '#64748b' }}>
            {t('Registered Civil / Structural Engineer', 'दर्तावाला सिभिल / स्ट्रक्चरल इन्जिनियर')}
          </div>
        </div>
      </div>

      {/* CUSTOM RATES MODAL POPUP — Rendered via React Portal onto document.body to guarantee perfect viewport centering and always be above navbar (z-index: 99999) */}
      {isRateModalOpen && mounted && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsRateModalOpen(false);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.4)',
              border: '1px solid #e2e8f0',
              padding: '20px 24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <SlidersHorizontal size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                    {t('Adjust Local Market Material & Labor Rates', 'स्थानीय सामग्री तथा ज्याला दर परिमार्जन')}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                    {t('Customize unit prices for your locality. Quantities & budgets recalculate instantly.', 'आफ्नो स्थानीय बजार दर राख्नुहोस्, सम्पूर्ण BOQ तुरुन्त हिसाब हुनेछ।')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRateModalOpen(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
                title={t('Close', 'बन्द')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Regional Quick Presets */}
            <div style={{
              marginBottom: '16px',
              padding: '9px 12px',
              background: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={14} color="#2563eb" />
                {t('Presets:', 'प्रिसेट:')}
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setCustomRates({ cementBag: 720, steelKg: 98, brickPiece: 16.5, aacBlock: 92, sandCuFt: 55, aggregateCuFt: 62, masonWage: 1350, laborWage: 900 })}
                  style={{
                    padding: '4px 11px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    border: customRates.cementBag === 720 && customRates.steelKg === 98 ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                    background: customRates.cementBag === 720 && customRates.steelKg === 98 ? '#eff6ff' : '#ffffff',
                    color: customRates.cementBag === 720 && customRates.steelKg === 98 ? '#1d4ed8' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {t('📍 Kathmandu Valley', '📍 काठमाडौं उपत्यका')}
                </button>
                <button
                  type="button"
                  onClick={() => setCustomRates({ cementBag: 670, steelKg: 94, brickPiece: 14.5, aacBlock: 88, sandCuFt: 42, aggregateCuFt: 48, masonWage: 1200, laborWage: 800 })}
                  style={{
                    padding: '4px 11px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    border: customRates.cementBag === 670 && customRates.sandCuFt === 42 ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                    background: customRates.cementBag === 670 && customRates.sandCuFt === 42 ? '#eff6ff' : '#ffffff',
                    color: customRates.cementBag === 670 && customRates.sandCuFt === 42 ? '#1d4ed8' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {t('📍 Terai / Highway', '📍 तराई / चितवन')}
                </button>
                <button
                  type="button"
                  onClick={() => setCustomRates({ cementBag: 790, steelKg: 104, brickPiece: 19.0, aacBlock: 98, sandCuFt: 68, aggregateCuFt: 72, masonWage: 1500, laborWage: 1000 })}
                  style={{
                    padding: '4px 11px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    borderRadius: '999px',
                    border: customRates.cementBag === 790 && customRates.sandCuFt === 68 ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                    background: customRates.cementBag === 790 && customRates.sandCuFt === 68 ? '#eff6ff' : '#ffffff',
                    color: customRates.cementBag === 790 && customRates.sandCuFt === 68 ? '#1d4ed8' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {t('📍 Hilly & Mountain', '📍 पोखरा / पहाडी')}
                </button>
              </div>
            </div>

            {/* Section 1: Materials */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                {t('1. Materials (सामग्री दर)', '१. निर्माण सामग्री दर')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '9px' }}>
                {/* 1. Cement */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={14} color="#2563eb" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('Cement', 'सिमेन्ट')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ 50kg bag', '/ बोरा')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="10"
                      className="rate-number-input"
                      value={customRates.cementBag}
                      onChange={(e) => setCustomRates({ ...customRates, cementBag: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 2. Steel */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Hammer size={14} color="#7c3aed" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('Steel Rebar', 'TMT रड')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ kg', '/ केजी')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="1"
                      className="rate-number-input"
                      value={customRates.steelKg}
                      onChange={(e) => setCustomRates({ ...customRates, steelKg: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 3. Brick */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Boxes size={14} color="#dc2626" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('1st Class Brick', 'रातो इँटा')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ pc', '/ गोटा')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="0.5"
                      className="rate-number-input"
                      value={customRates.brickPiece}
                      onChange={(e) => setCustomRates({ ...customRates, brickPiece: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 4. AAC Block */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building size={14} color="#0891b2" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('AAC Block', 'एएसी ब्लक')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ pc', '/ गोटा')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="1"
                      className="rate-number-input"
                      value={customRates.aacBlock}
                      onChange={(e) => setCustomRates({ ...customRates, aacBlock: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 5. Sand */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} color="#d97706" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('River Sand', 'बालुवा')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ cu. ft.', '/ घनफिट')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="1"
                      className="rate-number-input"
                      value={customRates.sandCuFt}
                      onChange={(e) => setCustomRates({ ...customRates, sandCuFt: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 6. Aggregate */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={14} color="#16a34a" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('Aggregate', 'गिट्टी')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ cu. ft.', '/ घनफिट')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="1"
                      className="rate-number-input"
                      value={customRates.aggregateCuFt}
                      onChange={(e) => setCustomRates({ ...customRates, aggregateCuFt: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Labor */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                {t('2. Daily Wages (दैनिक ज्याला)', '२. दैनिक ज्याला दर')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '9px' }}>
                {/* 7. Mason */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HardHat size={14} color="#ea580c" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('Mason (Mistri)', 'डकर्मी (मिस्त्री)')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#c2410c', background: '#fff7ed', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ day', '/ दिन')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="50"
                      className="rate-number-input"
                      value={customRates.masonWage}
                      onChange={(e) => setCustomRates({ ...customRates, masonWage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* 8. Helper */}
                <div className="rate-field-card" style={{ padding: '8px 10px', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} color="#db2777" />
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                        {t('Helper Labor', 'सहयोगी लेबर')}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#be185d', background: '#fdf2f8', padding: '1px 5px', borderRadius: '4px' }}>
                      {t('/ day', '/ दिन')}
                    </span>
                  </div>
                  <div className="rate-input-container" style={{ padding: '5px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {isNe ? 'रू.' : 'Rs.'}
                    </span>
                    <input
                      type="number"
                      step="50"
                      className="rate-number-input"
                      value={customRates.laborWage}
                      onChange={(e) => setCustomRates({ ...customRates, laborWage: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
              <button
                type="button"
                onClick={handleResetRates}
                className="btn-secondary"
                style={{ padding: '7px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', borderRadius: '8px' }}
              >
                <RotateCcw size={13} />
                <span>{t('Reset Averages', 'साधारण दर')}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRateModalOpen(false)}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '12.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', borderRadius: '8px' }}
              >
                <Check size={15} />
                <span>{t('Apply & Recalculate BOQ', 'लागु गर्नुहोस्')}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
