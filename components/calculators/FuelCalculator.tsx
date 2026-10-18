'use client';

import React, { useState, useMemo } from 'react';
import { Fuel, Copy, Check, Users } from 'lucide-react';

export function FuelCalculator() {
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
            <span className="badge badge-amber">NOC Fuel Prices</span>
            <span className="badge badge-neutral">Trip Cost & Mileage</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Fuel & Travel Cost Calculator (इन्धन खर्च)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate total petrol/diesel needed and split costs per person for highway or city trips in Nepal.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Trip Distance (दूरी - in Kilometers)</label>
            <input
              type="number"
              min={1}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700 }}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value) || 0)}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(200)}>KTM → Pokhara (200 km)</button>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(150)}>KTM → Chitwan (150 km)</button>
              <button type="button" className="segmented-btn" onClick={() => setDistanceKm(30)}>Valley Round (30 km)</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label className="input-label">Vehicle Mileage (km/liter)</label>
              <input
                type="number"
                min={1}
                className="text-input"
                value={mileageKmPerLiter}
                onChange={(e) => setMileageKmPerLiter(Number(e.target.value) || 1)}
              />
              <span className="input-subtext">Bike: 35-45 | Car: 12-16</span>
            </div>

            <div>
              <label className="input-label">Fuel Price (रु प्रति लिटर)</label>
              <input
                type="number"
                min={1}
                className="text-input"
                value={fuelPricePerLiter}
                onChange={(e) => setFuelPricePerLiter(Number(e.target.value) || 0)}
              />
              <span className="input-subtext">Petrol ≈ 168 | Diesel ≈ 154</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Number of Passengers / Splitting (व्यक्ति संख्या)</label>
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
            <span className="stat-label">Total Fuel Expense (कुल इन्धन खर्च)</span>
            <div className="stat-value" style={{ color: '#ea580c', margin: '6px 0 2px' }}>
              रु {Math.round(calculation.totalFuelCost).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              Total Fuel Required: {calculation.litersNeeded.toFixed(1)} Liters
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Cost Per Passenger (प्रति व्यक्ति खर्च)</span>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  रु {Math.round(calculation.costPerPerson).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Running Cost Per KM</span>
                <span style={{ fontWeight: 600 }}>रु {calculation.costPerKm.toFixed(2)} / km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
