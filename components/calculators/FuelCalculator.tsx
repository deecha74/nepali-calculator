'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Fuel, Copy, Check, Users } from 'lucide-react';

export function FuelCalculator() {
  const { t } = useLanguage();
  const [distanceKm, setDistanceKm] = useState<number>(200); // 200km (e.g. Kathmandu to Pokhara)
  const [mileageKmPerLiter, setMileageKmPerLiter] = useState<number>(14); // 14 km/l car
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState<number>(168); // NOC Petrol price approx
  const [passengers, setPassengers] = useState<number>(4);

  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const litersNeeded = mileageKmPerLiter > 0 ? distanceKm / mileageKmPerLiter : 0;
    const totalFuelCost = litersNeeded * fuelPricePerLiter;
    const costPerKm = distanceKm > 0 ? totalFuelCost / distanceKm : 0;
    const costPerPerson = passengers > 0 ? totalFuelCost / passengers : totalFuelCost;

    return {
      litersNeeded,
      totalFuelCost,
      costPerKm,
      costPerPerson,
    };
  }, [distanceKm, mileageKmPerLiter, fuelPricePerLiter, passengers]);

  const handleCopy = () => {
    const text = `Nepal Fuel & Trip Cost Calculation:
Trip Distance: ${distanceKm} km | Mileage: ${mileageKmPerLiter} km/l
Fuel Needed: ${calculation.litersNeeded.toFixed(1)} Liters @ रु ${fuelPricePerLiter}/L
TOTAL TRIP FUEL COST: रु ${Math.round(calculation.totalFuelCost).toLocaleString('en-IN')}
Cost per Passenger (${passengers} people): रु ${Math.round(calculation.costPerPerson).toLocaleString('en-IN')}
Via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber">{t('NOC Fuel Rates', 'नेपाल आयल निगम दर')}</span>
            <span className="badge badge-neutral">{t('Trip Cost & Mileage', 'यात्रा खर्च तथा माइलेज')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Fuel & Travel Cost Calculator', 'इन्धन तथा यात्रा खर्च क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate total petrol/diesel needed and split costs per person for highway or city trips in Nepal.',
              'नेपालमा लामो वा छोटो दुरीको यात्रामा लाग्ने पेट्रोल/डिजेलको कुल परिमाण, रकम र प्रतिव्यक्ति खर्च हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'कपी भयो!') : t('Copy Result', 'नतिजा कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Trip Distance (Kilometers)', 'यात्राको दूरी (किलोमिटर)')}</label>
            <input
              type="number"
              min={1}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700 }}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value) || 0)}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(200)}>{t('KTM → Pokhara (200 km)', 'काठमाडौँ → पोखरा (२०० किमी)')}</button>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(150)}>{t('KTM → Chitwan (150 km)', 'काठमाडौँ → चितवन (१५० किमी)')}</button>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(30)}>{t('Valley Round (30 km)', 'उपत्यका यात्रा (३० किमी)')}</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label className="input-label">{t('Vehicle Mileage (km/liter)', 'माइलेज (किमी प्रति लिटर)')}</label>
              <input
                type="number"
                min={1}
                className="text-input"
                value={mileageKmPerLiter}
                onChange={(e) => setMileageKmPerLiter(Number(e.target.value) || 1)}
              />
              <span className="input-subtext">{t('Bike: 35-45 | Car: 12-16', 'बाइक: ३५–४५ | कार: १२–१६')}</span>
            </div>

            <div>
              <label className="input-label">{t('Fuel Price (Rs. / Liter)', 'इन्धन मूल्य (रु प्रति लिटर)')}</label>
              <input
                type="number"
                min={1}
                className="text-input"
                value={fuelPricePerLiter}
                onChange={(e) => setFuelPricePerLiter(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">{t('Petrol ≈ 168 | Diesel ≈ 154', 'पेट्रोल ≈ १६८ | डिजेल ≈ १५४')}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Number of Passengers', 'यात्रु संख्या (खर्च बाँडफाँड)')}</label>
            <input
              type="number"
              min={1}
              max={50}
              className="text-input"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value) || 1)}
            />
          </div>
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">{t('Total Fuel Expense', 'कुल इन्धन खर्च')}</span>
            <div className="stat-value" style={{ color: '#ea580c', margin: '6px 0 2px' }}>
              रु {Math.round(calculation.totalFuelCost).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              {t(`Total Fuel: ${calculation.litersNeeded.toFixed(1)} Liters`, `कुल इन्धन: ${calculation.litersNeeded.toFixed(1)} लिटर`)}
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Cost Per Passenger', 'प्रति व्यक्ति खर्च')}</span>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.costPerPerson).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Running Cost Per KM', 'प्रति किमी खर्च')}</span>
                <span style={{ fontWeight: 600 }}>रु {calculation.costPerKm.toFixed(2)} / km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
