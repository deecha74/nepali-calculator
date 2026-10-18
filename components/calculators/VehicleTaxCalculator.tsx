'use client';

import React, { useState, useMemo } from 'react';
import { Car, Bike, Sparkles, Copy, Check, Zap, HelpCircle } from 'lucide-react';
import { 
  BIKE_CC_SLABS, 
  BIKE_ELECTRIC_SLABS, 
  CAR_CC_SLABS, 
  CAR_ELECTRIC_SLABS,
  LATE_FINE_TIERS,
  THIRD_PARTY_INSURANCE,
  PROVINCES 
} from '@/lib/rates/vehicleTaxRates';
import { POPULAR_BIKES_NEPAL, POPULAR_CARS_NEPAL, VehicleModel } from '@/lib/rates/nepalVehicles';
import { useLanguage } from '@/components/LanguageContext';

export function VehicleTaxCalculator({ titleTag = 'h1' }: { titleTag?: 'h1' | 'h2' } = {}) {
  const { language, t } = useLanguage();
  const TitleHeading = titleTag;
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('bike');
  const [selectionMode, setSelectionMode] = useState<'model' | 'manual'>('model');

  // Selected preset model
  const [selectedModelName, setSelectedModelName] = useState<string>("Bajaj Pulsar 150");

  // Manual inputs
  const [fuelType, setFuelType] = useState<'petrol' | 'electric'>('petrol');
  const [engineCapacity, setEngineCapacity] = useState<number>(149);

  // Province & Late Fine
  const [province, setProvince] = useState<string>('bagmati');
  const [fineBracketIdx, setFineBracketIdx] = useState<number>(0);
  const [includeCurrentYear, setIncludeCurrentYear] = useState<boolean>(true);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showYearBreakdown, setShowYearBreakdown] = useState<boolean>(true);

  // Active models list
  const activeModels = vehicleType === 'bike' ? POPULAR_BIKES_NEPAL : POPULAR_CARS_NEPAL;

  // When model is selected
  const handleModelSelect = (name: string) => {
    setSelectedModelName(name);
    if (name === 'other') {
      setSelectionMode('manual');
      return;
    }
    const found = activeModels.find((m) => m.name === name);
    if (found) {
      setFuelType(found.fuelType);
      setEngineCapacity(found.capacity);
    }
  };

  // When vehicle type switches (Bike <-> Car)
  const handleVehicleTypeSwitch = (type: 'bike' | 'car') => {
    setVehicleType(type);
    if (type === 'bike') {
      const defaultBike = POPULAR_BIKES_NEPAL[0];
      setSelectedModelName(defaultBike.name);
      setFuelType(defaultBike.fuelType);
      setEngineCapacity(defaultBike.capacity);
    } else {
      const defaultCar = POPULAR_CARS_NEPAL[0];
      setSelectedModelName(defaultCar.name);
      setFuelType(defaultCar.fuelType);
      setEngineCapacity(defaultCar.capacity);
    }
  };

  // Base Road Tax Calculation (per single year)
  const baseAnnualTax = useMemo(() => {
    let slabs = BIKE_CC_SLABS;
    if (vehicleType === 'bike') {
      slabs = fuelType === 'electric' ? BIKE_ELECTRIC_SLABS : BIKE_CC_SLABS;
    } else {
      slabs = fuelType === 'electric' ? CAR_ELECTRIC_SLABS : CAR_CC_SLABS;
    }

    for (const slab of slabs) {
      if (engineCapacity >= slab.minVal && engineCapacity <= slab.maxVal) {
        return slab.annualTax;
      }
    }
    return slabs[slabs.length - 1].annualTax;
  }, [vehicleType, fuelType, engineCapacity]);

  const currentBracket = LATE_FINE_TIERS[fineBracketIdx] || LATE_FINE_TIERS[0];
  const overdueYears = currentBracket.overdueYears || 0;
  const isMultiYear = overdueYears > 0;

  // Unpaid back-taxes for all overdue years
  const overdueBackTax = isMultiYear ? baseAnnualTax * overdueYears : 0;

  // Current year renewal tax (applies if not overdue, or if overdue and user includes current year renewal)
  const currentYearTax = (!isMultiYear || includeCurrentYear) ? baseAnnualTax : 0;

  // Total road tax
  const totalRoadTax = overdueBackTax + currentYearTax;

  // Total count of fiscal years being paid for
  const totalTaxYears = overdueYears + ((!isMultiYear || includeCurrentYear) ? 1 : 0);

  // Late Fine Calculation:
  // For grace period or within-year late renewals: baseAnnualTax * finePercent
  // For multi-year backlog: calculated across overdue years (e.g. 32% per year = 64% for 2 years)
  const fineAmount = isMultiYear
    ? (currentBracket.finePercent >= 1.0
        ? baseAnnualTax * overdueYears * (currentBracket.finePerYearPercent || 0.5)
        : baseAnnualTax * currentBracket.finePercent)
    : baseAnnualTax * currentBracket.finePercent;

  // Renewal endorsement fee per year (Bike: Rs 300/yr, Car: Rs 500/yr)
  const renewalFeePerYear = vehicleType === 'bike' ? 300 : 500;
  const totalRenewalFee = renewalFeePerYear * totalTaxYears;

  // Mandatory Third-Party Insurance for the upcoming period
  const insuranceFee = includeInsurance
    ? (vehicleType === 'bike' ? THIRD_PARTY_INSURANCE.twoWheeler : THIRD_PARTY_INSURANCE.fourWheeler)
    : 0;

  // Total payable at Yatayat
  const totalPayable = totalRoadTax + fineAmount + totalRenewalFee + insuranceFee;

  // Year-by-year itemized breakdown for Yatayat receipt
  const yearBreakdown = useMemo(() => {
    if (!isMultiYear) return [];
    const items = [];
    const finePerYr = overdueYears > 0 ? fineAmount / overdueYears : 0;
    for (let i = 1; i <= overdueYears; i++) {
      items.push({
        yearLabel: language === 'ne' ? `बक्यौता वर्ष ${i}` : `Overdue Year ${i}`,
        roadTax: baseAnnualTax,
        fine: finePerYr,
        fineRate: `${Math.round((finePerYr / baseAnnualTax) * 100)}%`,
        renewalFee: renewalFeePerYear,
        subtotal: baseAnnualTax + finePerYr + renewalFeePerYear,
      });
    }
    if (includeCurrentYear) {
      items.push({
        yearLabel: language === 'ne' ? `चालु वर्ष (आ.व. २०८३/८४)` : `Current Year (FY 2083/84)`,
        roadTax: baseAnnualTax,
        fine: 0,
        fineRate: `0% (चालु)`,
        renewalFee: renewalFeePerYear,
        subtotal: baseAnnualTax + renewalFeePerYear,
      });
    }
    return items;
  }, [isMultiYear, overdueYears, fineAmount, baseAnnualTax, renewalFeePerYear, includeCurrentYear, language]);

  const handleCopy = () => {
    const text = `Nepal Vehicle Road Tax & Fine Summary (${selectionMode === 'model' ? selectedModelName : `${engineCapacity}${fuelType === 'electric' ? 'W/kW' : 'cc'}`}):
• Overdue Status: ${currentBracket.label}
• Annual Road Tax Rate: रु ${baseAnnualTax.toLocaleString('en-IN')}/year
${isMultiYear ? `• Unpaid Back-Taxes (${overdueYears} Years): रु ${overdueBackTax.toLocaleString('en-IN')}` : ''}
${isMultiYear && includeCurrentYear ? `• Current Year Road Tax: रु ${currentYearTax.toLocaleString('en-IN')}` : (!isMultiYear ? `• Road Tax: रु ${currentYearTax.toLocaleString('en-IN')}` : '')}
• Late Fines: रु ${fineAmount.toLocaleString('en-IN')}
• Renewal Service Fees (${totalTaxYears} Year${totalTaxYears > 1 ? 's' : ''}): रु ${totalRenewalFee.toLocaleString('en-IN')}
• Third-Party Insurance: रु ${insuranceFee.toLocaleString('en-IN')}
TOTAL PAYABLE AT YATAYAT: रु ${Math.round(totalPayable).toLocaleString('en-IN')}
Via NepalCalc.com`;
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
      {/* Modern Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '28px', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', background: '#dbeafe', color: '#1d4ed8', fontSize: '12px', fontWeight: 700 }}>
              <Car size={13} />
              {t('Bagmati & All Provinces (Yatayat)', 'बागमती तथा सबै प्रदेश (यातायात)')}
            </span>
          </div>
          <TitleHeading style={{ fontSize: '26px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            {t('Bluebook Road Tax & Fine Calculator', 'सवारी ब्लुबुक कर तथा जरिवाना क्यालकुलेटर')}
          </TitleHeading>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ borderRadius: '999px', padding: '8px 16px', fontSize: '13px' }}
        >
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t("Copied!", "कपी भयो!") : t("Copy Summary", "कपी गर्नुहोस्")}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div>
          {/* Big Colorful Bike vs Car Toggle */}
          <div style={{ marginBottom: '24px' }}>
            <label className="input-label" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em', color: '#6b7280' }}>
              {t('Select Vehicle Category', 'सवारी वर्ग छनौट गर्नुहोस्')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleVehicleTypeSwitch('bike')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: `2px solid ${vehicleType === 'bike' ? '#2563eb' : '#e5e7eb'}`,
                  background: vehicleType === 'bike' ? '#eff6ff' : '#ffffff',
                  color: vehicleType === 'bike' ? '#1d4ed8' : '#374151',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: vehicleType === 'bike' ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none',
                }}
              >
                <Bike size={18} />
                <span>{t('Motorcycle / Scooter', 'बाइक / स्कुटर')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleVehicleTypeSwitch('car')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: `2px solid ${vehicleType === 'car' ? '#059669' : '#e5e7eb'}`,
                  background: vehicleType === 'car' ? '#ecfdf5' : '#ffffff',
                  color: vehicleType === 'car' ? '#065f46' : '#374151',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: vehicleType === 'car' ? '0 4px 12px rgba(5, 150, 105, 0.12)' : 'none',
                }}
              >
                <Car size={18} />
                <span>{t('Car / Jeep / EV', 'कार / जीप / EV')}</span>
              </button>
            </div>
          </div>

          {/* Model Selection or Manual Mode */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="input-label" style={{ fontWeight: 700, marginBottom: 0 }}>
                {selectionMode === 'model'
                  ? (vehicleType === 'bike' ? t('Choose Your Bike/Scooter Model', 'आफ्नो बाइक/स्कुटर मोडल छान्नुहोस्') : t('Choose Your Car Model', 'आफ्नो कार मोडल छान्नुहोस्'))
                  : t('Enter Engine Specs Manually', 'इन्जिन क्षमता (CC) आफैं राख्नुहोस्')}
              </label>
              <button
                type="button"
                onClick={() => setSelectionMode(selectionMode === 'model' ? 'manual' : 'model')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {selectionMode === 'model' ? t('Or Enter CC Manually ⚙️', 'वा CC आफैं राख्नुहोस् ⚙️') : t('Choose from Model List 📋', 'मोडल सूचीबाट छान्नुहोस् 📋')}
              </button>
            </div>

            {selectionMode === 'model' ? (
              <div>
                <select
                  className="select-input"
                  style={{
                    padding: '14px 16px',
                    fontSize: '15px',
                    fontWeight: 600,
                    borderRadius: '14px',
                    borderColor: '#cbd5e1',
                  }}
                  value={selectedModelName}
                  onChange={(e) => handleModelSelect(e.target.value)}
                >
                  <optgroup label={t(`Popular ${vehicleType === 'bike' ? 'Bikes & Scooters' : 'Cars & EVs'} in Nepal`, `नेपालमा लोकप्रिय ${vehicleType === 'bike' ? 'मोटरसाइकल तथा स्कुटरहरू' : 'कार तथा विद्युतीय गाडीहरू'}`)}>
                    {activeModels.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name} ({m.capacity}{m.fuelType === 'electric' ? (m.type === 'bike' ? 'W' : 'kW') : 'cc'})
                      </option>
                    ))}
                  </optgroup>
                  <option value="other">➕ {t('Other / Not in List (Manual Input)', 'अन्य मोडल / सूचीमा नभएको (CC आफैं राख्नुहोस्)')}</option>
                </select>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{t('Detected Spec:', 'निर्धारित क्षमता:')}</span>
                  <span style={{ padding: '2px 10px', borderRadius: '999px', background: '#f3f4f6', fontSize: '12px', fontWeight: 700, color: '#111827' }}>
                    {engineCapacity} {fuelType === 'electric' ? (vehicleType === 'bike' ? 'Watts' : 'kW') : 'cc'} ({fuelType === 'electric' ? '⚡ EV' : 'Petrol'})
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    type="button"
                    className={`segmented-btn ${fuelType === 'petrol' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                    onClick={() => setFuelType('petrol')}
                  >
                    {t('Petrol / Diesel', 'पेट्रोल / डिजेल')}
                  </button>
                  <button
                    type="button"
                    className={`segmented-btn ${fuelType === 'electric' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '10px' }}
                    onClick={() => setFuelType('electric')}
                  >
                    ⚡ {t('Electric (EV)', 'विद्युतीय (EV)')}
                  </button>
                </div>

                <label className="input-label" style={{ fontSize: '12px' }}>
                  {fuelType === 'petrol' ? t('Engine Capacity (CC)', 'इन्जिन क्षमता (CC)') : vehicleType === 'bike' ? t('Motor Wattage (Watts)', 'मोटर क्षमता (Watts)') : t('Motor Power (kW)', 'मोटर पावर (kW)')}
                </label>
                <input
                  type="number"
                  min={1}
                  className="text-input"
                  style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                  value={engineCapacity}
                  onChange={(e) => setEngineCapacity(Number(e.target.value) || 0)}
                />
              </div>
            )}
          </div>

          {/* Late Renewal Fine & Province */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>{t('Renewal Overdue Status', 'नवीकरण म्याद नाघेको अवस्था')}</label>
              <select
                className="select-input"
                style={{ borderRadius: '12px', fontSize: '13px' }}
                value={fineBracketIdx}
                onChange={(e) => setFineBracketIdx(Number(e.target.value))}
              >
                {LATE_FINE_TIERS.map((tier, idx) => (
                  <option key={idx} value={idx}>
                    {language === 'ne' ? tier.labelNep : tier.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>{t('Province', 'प्रदेश')}</label>
              <select
                className="select-input"
                style={{ borderRadius: '12px', fontSize: '13px' }}
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                {PROVINCES.map((p) => (
                  <option key={p.id} value={p.id}>{p.name.split(' (')[0]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Multi-Year Notice & Current Year Toggle */}
          {isMultiYear && (
            <div style={{ marginBottom: '18px', padding: '14px 16px', background: '#fef3c7', borderRadius: '14px', border: '1px solid #fde68a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '15px' }}>⚠️</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>
                  {t(`${overdueYears} Years Overdue Backlog:`, `${overdueYears} वर्षको म्याद नाघेको बक्यौता:`)}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#78350f', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                {t(
                  `Under Nepal Yatayat rules, you must pay all ${overdueYears} missed overdue years of road tax (रु ${baseAnnualTax.toLocaleString('en-IN')} × ${overdueYears} = रु ${overdueBackTax.toLocaleString('en-IN')}) plus late penalty fines and renewal fees for each year.`,
                  `यातायात नियमानुसार तपाईंले सबै ${overdueYears} बक्यौता वर्षको सवारी कर (रु ${baseAnnualTax.toLocaleString('en-IN')} × ${overdueYears} = रु ${overdueBackTax.toLocaleString('en-IN')}) र जरिवाना अनिवार्य बुझाउनुपर्छ।`
                )}
              </p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#ffffff', padding: '8px 12px', borderRadius: '10px', border: '1px solid #fcd34d' }}>
                <input
                  type="checkbox"
                  checked={includeCurrentYear}
                  onChange={(e) => setIncludeCurrentYear(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#2563eb', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937' }}>
                  {t('Include Current Year Renewal (चालु आ.व. २०८३/८४ कर सहित)', 'चालु आर्थिक वर्ष (२०८३/८४) को कर नवीकरण समावेश गर्नुहोस्')}
                </span>
              </label>
            </div>
          )}

          {/* Insurance Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#f9fafb', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{t('Third-Party Insurance (बीमा)', 'तेस्रो पक्ष बिमा (Third-Party Insurance)')}</span>
              <p style={{ fontSize: '11px', color: '#6b7280' }}>{t('Mandatory renewal fee', 'अनिवार्य नवीकरण शुल्क')} ({vehicleType === 'bike' ? 'रु १,५००' : 'रु ७,५००'})</p>
            </div>
            <input
              type="checkbox"
              checked={includeInsurance}
              onChange={(e) => setIncludeInsurance(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#2563eb' }}
            />
          </div>
        </div>

        {/* Results Highlight Card */}
        <div>
          <div
            className="result-card-highlight"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.2)',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
              {t('Total Payable Amount (कुल तिर्नुपर्ने रकम)', 'जम्मा तिर्नुपर्ने रकम (Total Payable Amount)')}
            </span>
            <div style={{ fontSize: '42px', fontWeight: 800, color: '#34d399', margin: '8px 0 2px', fontFamily: 'var(--font-mono)' }}>
              रु {Math.round(totalPayable).toLocaleString('en-IN')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                {t('Transport Management Office (Yatayat) Payable', 'यातायात व्यवस्था कार्यालयमा बुझाउनुपर्ने')}
              </span>
              {isMultiYear && (
                <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.15)', fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>
                  {t(`${totalTaxYears} Years Total`, `जम्मा ${totalTaxYears} वर्ष`)}
                </span>
              )}
            </div>

            {/* Breakdown Cards */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {isMultiYear ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>
                      {t(`Unpaid Back-Taxes (${overdueYears} Yrs @ रु ${baseAnnualTax.toLocaleString('en-IN')})`, `बक्यौता सवारी कर (${overdueYears} वर्ष × रु ${baseAnnualTax.toLocaleString('en-IN')})`)}
                    </span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {overdueBackTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>
                      {t(`Current Year Tax (${includeCurrentYear ? 'FY 2083/84' : 'Excluded'})`, `चालु वर्ष कर (${includeCurrentYear ? 'आ.व. २०८३/८४' : 'छुटाइएको'})`)}
                    </span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: includeCurrentYear ? '#ffffff' : '#94a3b8' }}>
                      {includeCurrentYear ? `रु ${currentYearTax.toLocaleString('en-IN')}` : t('Excluded', 'छुटाइएको')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>
                      {t('Accumulated Late Fines', 'कुल ढिलाइ जरिवाना')}
                    </span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: fineAmount > 0 ? '#f87171' : '#34d399' }}>
                      {fineAmount > 0 ? `+ रु ${fineAmount.toLocaleString('en-IN')}` : t('रु 0 (Grace Period)', 'रु ० (छुट अवधि)')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>
                      {t(`Renewal Endorsement Fees (${totalTaxYears} Yrs × रु ${renewalFeePerYear})`, `नवीकरण दस्तुर (${totalTaxYears} वर्ष × रु ${renewalFeePerYear})`)}
                    </span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {totalRenewalFee.toLocaleString('en-IN')}</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>{t('Annual Road Tax', 'वार्षिक सवारी कर')}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {baseAnnualTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>{t('Late Fine', 'ढिलाइ जरिवाना')} ({currentBracket.finePercent * 100}%)</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: fineAmount > 0 ? '#f87171' : '#34d399' }}>
                      {fineAmount > 0 ? `+ रु ${fineAmount.toLocaleString('en-IN')}` : t('रु 0 (Grace Period)', 'रु ० (छुट अवधि)')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#cbd5e1' }}>{t('Renewal Service Fee', 'नवीकरण दस्तुर')}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {totalRenewalFee}</span>
                  </div>
                </>
              )}

              {includeInsurance && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#cbd5e1' }}>{t('Third-Party Insurance (1 Year)', 'तेस्रो पक्ष बिमा (१ वर्ष)')}</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {insuranceFee.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Year-by-Year Itemized Receipt Breakdown (Visible when Multi-Year) */}
          {isMultiYear && yearBreakdown.length > 0 && (
            <div style={{ marginTop: '16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  {t('📋 Year-by-Year Yatayat Receipt', '📋 वर्ष अनुसारको रसिद विवरण')}
                </span>
                <button
                  type="button"
                  onClick={() => setShowYearBreakdown(!showYearBreakdown)}
                  style={{ background: 'none', border: 'none', fontSize: '12px', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}
                >
                  {showYearBreakdown ? t('Hide ▲', 'लुकाउनुहोस् ▲') : t('Show ▼', 'हेर्नुहोस् ▼')}
                </button>
              </div>

              {showYearBreakdown && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '6px 8px' }}>{t('Year / Period', 'वर्ष')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Tax', 'कर')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Fine', 'जरिवाना')}</th>
                        <th style={{ padding: '6px 8px' }}>{t('Fee', 'दस्तुर')}</th>
                        <th style={{ padding: '6px 8px', textAlign: 'right' }}>{t('Subtotal', 'जम्मा')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearBreakdown.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '6px 8px', fontWeight: 600, color: '#334155' }}>{row.yearLabel}</td>
                          <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)' }}>रु {row.roadTax.toLocaleString('en-IN')}</td>
                          <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)', color: row.fine > 0 ? '#dc2626' : '#16a34a' }}>
                            {row.fine > 0 ? `+ रु ${row.fine.toLocaleString('en-IN')}` : 'रु ०'}
                          </td>
                          <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)' }}>रु {row.renewalFee}</td>
                          <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'right', color: '#0f172a' }}>
                            रु {row.subtotal.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                      {includeInsurance && (
                        <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                          <td colSpan={4} style={{ padding: '6px 8px', fontWeight: 600, color: '#475569' }}>
                            {t('Third-Party Insurance (तेस्रो पक्ष बिमा)', 'तेस्रो पक्ष बिमा')}
                          </td>
                          <td style={{ padding: '6px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'right', color: '#0f172a' }}>
                            रु {insuranceFee.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      )}
                      <tr style={{ background: '#f0fdf4', fontWeight: 800 }}>
                        <td colSpan={4} style={{ padding: '8px', color: '#166534' }}>
                          {t('TOTAL PAYABLE (कुल जम्मा)', 'कुल बुझाउनुपर्ने')}
                        </td>
                        <td style={{ padding: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', textAlign: 'right', color: '#166534' }}>
                          रु {Math.round(totalPayable).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Quick Tip */}
          <div style={{ marginTop: '16px', padding: '16px', background: '#eff6ff', borderRadius: '16px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <p style={{ fontSize: '12px', color: '#1e40af', lineHeight: '1.4', fontWeight: 500, margin: 0 }}>
              <strong>{t('Tip:', 'सुझाव:')}</strong> {t('Renew within 90 days of registration expiry to avoid up to 100% fine brackets.', 'सवारी दर्ताको म्याद सकिएको ९० दिनभित्र नवीकरण गर्दा जरिवानाबाट बच्न सकिन्छ।')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
