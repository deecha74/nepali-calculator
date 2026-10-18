'use client';

import React, { useState, useMemo } from 'react';
import { Package, Send, Plane, Truck, Clock, ShieldCheck, Copy, Check, Info } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface CountryZone {
  code: string;
  name: string;
  nepaliName: string;
  zone: 'domestic' | 'saarc' | 'mideast' | 'europe' | 'americas' | 'asia';
  baseEms500g: number;
  per500gAdd: number;
  baseAirmail20g: number;
  deliveryDays: string;
}

const DESTINATIONS: CountryZone[] = [
  { code: 'NP', name: 'Nepal (Domestic/अन्तर-जिल्ला)', nepaliName: 'नेपालभित्र (जिल्ला/उपत्यका)', zone: 'domestic', baseEms500g: 150, per500gAdd: 60, baseAirmail20g: 25, deliveryDays: '1-3 Days' },
  { code: 'IN', name: 'India (भारत)', nepaliName: 'भारत', zone: 'saarc', baseEms500g: 1250, per500gAdd: 450, baseAirmail20g: 80, deliveryDays: '5-8 Days' },
  { code: 'US', name: 'United States (USA)', nepaliName: 'संयुक्त राज्य अमेरिका', zone: 'americas', baseEms500g: 3850, per500gAdd: 1100, baseAirmail20g: 220, deliveryDays: '6-10 Days' },
  { code: 'GB', name: 'United Kingdom (UK)', nepaliName: 'संयुक्त अधिराज्य (बेलायत)', zone: 'europe', baseEms500g: 3400, per500gAdd: 950, baseAirmail20g: 200, deliveryDays: '5-9 Days' },
  { code: 'AU', name: 'Australia (अस्ट्रेलिया)', nepaliName: 'अस्ट्रेलिया', zone: 'asia', baseEms500g: 3600, per500gAdd: 1050, baseAirmail20g: 210, deliveryDays: '6-10 Days' },
  { code: 'JP', name: 'Japan (जापान)', nepaliName: 'जापान', zone: 'asia', baseEms500g: 2900, per500gAdd: 850, baseAirmail20g: 190, deliveryDays: '5-8 Days' },
  { code: 'AE', name: 'United Arab Emirates (UAE/दुबई)', nepaliName: 'युएई (दुबई)', zone: 'mideast', baseEms500g: 2450, per500gAdd: 700, baseAirmail20g: 160, deliveryDays: '4-7 Days' },
  { code: 'QA', name: 'Qatar (कतार)', nepaliName: 'कतार', zone: 'mideast', baseEms500g: 2450, per500gAdd: 700, baseAirmail20g: 160, deliveryDays: '4-7 Days' },
  { code: 'CA', name: 'Canada (क्यानाडा)', nepaliName: 'क्यानाडा', zone: 'americas', baseEms500g: 3950, per500gAdd: 1150, baseAirmail20g: 230, deliveryDays: '7-12 Days' },
  { code: 'KR', name: 'South Korea (दक्षिण कोरिया)', nepaliName: 'दक्षिण कोरिया', zone: 'asia', baseEms500g: 2800, per500gAdd: 820, baseAirmail20g: 180, deliveryDays: '5-8 Days' },
];

export function PostalShippingCalculator() {
  const { language, t } = useLanguage();
  const [destCountry, setDestCountry] = useState<string>('US');
  const [serviceType, setServiceType] = useState<'ems' | 'registered' | 'airmail'>('ems');
  const [weightGram, setWeightGram] = useState<number>(500);
  const [itemType, setItemType] = useState<'document' | 'merchandise'>('document');
  const [insuranceDeclaredVal, setInsuranceDeclaredVal] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const country = useMemo(() => {
    return DESTINATIONS.find(d => d.code === destCountry) || DESTINATIONS[0];
  }, [destCountry]);

  const calculation = useMemo(() => {
    const weightKg = weightGram / 1000;
    let baseTariff = 0;

    if (serviceType === 'ems') {
      // EMS has 500g initial tier, then each 500g added
      const units = Math.max(1, Math.ceil(weightGram / 500));
      baseTariff = country.baseEms500g + (units - 1) * country.per500gAdd;
    } else if (serviceType === 'registered') {
      // Registered standard post (approx 60% of EMS rate + NPR 120 registry fee)
      const units = Math.max(1, Math.ceil(weightGram / 250));
      baseTariff = (country.baseEms500g * 0.6) + (units - 1) * (country.per500gAdd * 0.55) + 120;
    } else {
      // General airmail document (under 2kg only)
      const units20g = Math.max(1, Math.ceil(weightGram / 20));
      baseTariff = country.baseAirmail20g * Math.min(units20g, 40) + (weightGram > 100 ? (weightGram - 100) * 1.5 : 0);
    }

    // Postal handling & stamp fee
    const handlingFee = country.zone === 'domestic' ? 20 : 150;
    
    // Optional insurance (1% of declared value if declared)
    const insuranceFee = insuranceDeclaredVal > 0 ? Math.max(100, Math.round(insuranceDeclaredVal * 0.01)) : 0;

    // Fuel & security surcharge (approx 8% on intl EMS)
    const surcharge = country.zone === 'domestic' ? 0 : Math.round(baseTariff * 0.08);

    const totalPostage = Math.round(baseTariff + handlingFee + insuranceFee + surcharge);

    return {
      baseTariff: Math.round(baseTariff),
      handlingFee,
      insuranceFee,
      surcharge,
      totalPostage,
      deliveryDays: country.deliveryDays,
      trackingType: serviceType === 'ems' ? 'EE83921048NP' : 'RR83921048NP'
    };
  }, [country, serviceType, weightGram, insuranceDeclaredVal]);

  const handleCopy = () => {
    const text = `Nepal Post Shipping: ${country.name} | ${weightGram}g via ${serviceType.toUpperCase()} = NPR ${calculation.totalPostage.toLocaleString()} (${calculation.deliveryDays})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-amber">हुलाक सेवा विभाग (Nepal Post Rates)</span>
          <span className="badge badge-blue">EMS International & Domestic</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          नेपाल हुलाक तथा ईएमएस पार्सल महसुल (Nepal Post Office & EMS Parcel Shipping)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          हुलाक सेवा विभाग (Nepal Post) को आधिकारिक दर अनुसार अमेरिका, बेलायत, जापान, अस्ट्रेलिया तथा नेपालका विभिन्न जिल्लामा पार्सल पठाउने खर्च।
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Destination */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              गन्तव्य देश / ठाउँ (Destination Country / Zone)
            </label>
            <select
              value={destCountry}
              onChange={(e) => setDestCountry(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 600,
                outline: 'none',
                backgroundColor: '#ffffff'
              }}
            >
              {DESTINATIONS.map(d => (
                <option key={d.code} value={d.code}>
                  {d.name} — {d.deliveryDays}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              सेवा प्रकार (Service Type)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                { id: 'ems', name: 'EMS Express', badge: 'Fastest ⚡' },
                { id: 'registered', name: 'Registry (दर्ता)', badge: 'Tracked 🛡️' },
                { id: 'airmail', name: 'Airmail (हवाई)', badge: 'Economy ✉️' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceType(s.id as any)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid',
                    borderColor: serviceType === s.id ? '#003893' : '#e2e8f0',
                    backgroundColor: serviceType === s.id ? '#eff6ff' : '#f8fafc',
                    color: serviceType === s.id ? '#003893' : '#334155',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div>{s.name}</div>
                  <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>{s.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                तौल (Weight in Grams)
              </label>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#003893' }}>
                {weightGram >= 1000 ? `${(weightGram / 1000).toFixed(2)} kg` : `${weightGram} grams`}
              </span>
            </div>
            <input
              type="number"
              min="20"
              max="30000"
              step="50"
              value={weightGram}
              onChange={(e) => setWeightGram(Math.max(10, Number(e.target.value) || 0))}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: 700,
                outline: 'none',
              }}
            />
            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {[100, 250, 500, 1000, 2000, 5000].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeightGram(w)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: weightGram === w ? '#003893' : '#ffffff',
                    color: weightGram === w ? '#ffffff' : '#475569',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {w >= 1000 ? `${w / 1000}kg` : `${w}g`}
                </button>
              ))}
            </div>
          </div>

          {/* Item Category */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setItemType('document')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                border: '1.5px solid',
                borderColor: itemType === 'document' ? '#059669' : '#e2e8f0',
                backgroundColor: itemType === 'document' ? '#ecfdf5' : '#ffffff',
                color: itemType === 'document' ? '#065f46' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📄 कागजात (Document)
            </button>
            <button
              type="button"
              onClick={() => setItemType('merchandise')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                border: '1.5px solid',
                borderColor: itemType === 'merchandise' ? '#059669' : '#e2e8f0',
                backgroundColor: itemType === 'merchandise' ? '#ecfdf5' : '#ffffff',
                color: itemType === 'merchandise' ? '#065f46' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📦 सामान/पार्सल (Merchandise)
            </button>
          </div>
        </div>

        {/* Breakdown Card */}
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
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              अनुमानित कुल हुलाक महसुल (Estimated Total Postage)
            </div>
            
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#003893', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              रू. {calculation.totalPostage.toLocaleString()}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>आधार महसुल (Base Tariff):</span>
                <strong style={{ color: '#0f172a' }}>रू. {calculation.baseTariff.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>दर्ता तथा स्ट्याम्प शुल्क:</span>
                <strong style={{ color: '#0f172a' }}>रू. {calculation.handlingFee}</strong>
              </div>
              {calculation.surcharge > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>इन्धन तथा हवाई अधिभार:</span>
                  <strong style={{ color: '#0f172a' }}>रू. {calculation.surcharge}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', paddingTop: '6px', borderTop: '1px dashed #e2e8f0' }}>
                <span>डेलिभरी समय (Transit Time):</span>
                <span className="badge badge-emerald" style={{ fontSize: '11.5px' }}>{calculation.deliveryDays}</span>
              </div>
            </div>

            {/* Tracking Badge */}
            <div style={{ marginTop: '16px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e3a8a' }}>
              <div style={{ fontWeight: 800 }}>📦 Nepal Post Tracking Code Format:</div>
              <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '13px', marginTop: '2px' }}>
                {calculation.trackingType}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            style={{
              marginTop: '20px',
              backgroundColor: copied ? '#16a34a' : '#003893',
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
              gap: '6px',
              transition: 'background-color 0.2s ease'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'महसुल विवरण प्रतिलिपि गरियो!' : 'महसुल हिसाब कपी गर्नुहोस्'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
