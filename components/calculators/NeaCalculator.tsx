'use client';

import React, { useState, useMemo } from 'react';
import { Zap, Copy, Check } from 'lucide-react';
import { NEA_SLABS_5A, METER_CAPACITIES } from '@/lib/rates/neaRates';

export function NeaCalculator() {
  const [unitsConsumed, setUnitsConsumed] = useState<number>(120);
  const [meterCapacity, setMeterCapacity] = useState<string>('5A');
  const [paymentTiming, setPaymentTiming] = useState<'early' | 'normal' | 'late'>('early'); // early gives 2% rebate
  const [copied, setCopied] = useState<boolean>(false);

  const selectedMeter = METER_CAPACITIES.find((m) => m.id === meterCapacity) || METER_CAPACITIES[0];

  const calculation = useMemo(() => {
    let remainingUnits = Math.max(0, unitsConsumed);
    let energyCharge = 0;
    let minCharge = 30 * selectedMeter.multiplier;

    for (const slab of NEA_SLABS_5A) {
      if (remainingUnits <= 0) break;
      const slabSpan = slab.max === Infinity ? remainingUnits : Math.min(remainingUnits, slab.max - slab.min);
      energyCharge += slabSpan * slab.energyRate * selectedMeter.multiplier;
      minCharge = Math.max(minCharge, slab.minCharge5A * selectedMeter.multiplier);
      remainingUnits -= slabSpan;
    }

    // Latest VAT rule: 5% VAT applies to energy consumed beyond 50 units threshold
    let vatAmount = 0;
    if (unitsConsumed > 50) {
      const unitsOver50 = unitsConsumed - 50;
      vatAmount = (unitsOver50 * 9.5 * 0.05); // approx 5% VAT
    }

    const subtotal = Math.max(minCharge, energyCharge) + vatAmount;

    let adjustment = 0;
    if (paymentTiming === 'early') {
      adjustment = -(subtotal * 0.02); // 2% discount
    } else if (paymentTiming === 'late') {
      adjustment = subtotal * 0.05; // 5% late penalty
    }

    const totalBill = subtotal + adjustment;

    return {
      minCharge,
      energyCharge,
      vatAmount,
      subtotal,
      adjustment,
      totalBill,
    };
  }, [unitsConsumed, selectedMeter, paymentTiming]);

  const handleCopy = () => {
    const text = `Nepal Electricity Authority (NEA) Bill Estimate:
Units Consumed: ${unitsConsumed} kWh | Meter: ${meterCapacity}
Energy Charge: रु ${Math.round(calculation.energyCharge)}
5% VAT (>50 units): रु ${Math.round(calculation.vatAmount)}
Adjustment (${paymentTiming}): रु ${Math.round(calculation.adjustment)}
TOTAL PAYABLE: रु ${Math.round(calculation.totalBill).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">NEA Domestic Tariff</span>
            <span className="badge badge-neutral">VAT & Rebate Rules</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            NEA Electricity Bill Calculator (विद्युत महसुल)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate your monthly domestic power bill based on units consumed, ampere capacity, and payment rebates.
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          {/* Units Consumed */}
          <div style={{ marginBottom: '22px' }}>
            <label className="input-label">Monthly Units Consumed (युनिट / kWh)</label>
            <input
              type="number"
              min={0}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              value={unitsConsumed}
              onChange={(e) => setUnitsConsumed(Number(e.target.value) || 0)}
            />
            <input
              type="range"
              className="range-slider"
              min={0}
              max={600}
              value={unitsConsumed}
              onChange={(e) => setUnitsConsumed(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>0 (Lifeline)</span>
              <span>100 Units</span>
              <span>300 Units</span>
              <span>600 Units</span>
            </div>
          </div>

          {/* Meter Capacity */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Meter Capacity (Ampere)</label>
            <select
              className="select-input"
              value={meterCapacity}
              onChange={(e) => setMeterCapacity(e.target.value)}
            >
              {METER_CAPACITIES.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Payment Timing */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Payment Timing & Rebate</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`segmented-btn ${paymentTiming === 'early' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setPaymentTiming('early')}
              >
                Within 7 Days (2% Rebate)
              </button>
              <button
                type="button"
                className={`segmented-btn ${paymentTiming === 'normal' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setPaymentTiming('normal')}
              >
                Day 8 – 22 (Normal)
              </button>
              <button
                type="button"
                className={`segmented-btn ${paymentTiming === 'late' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setPaymentTiming('late')}
              >
                Late (5% Fine)
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="result-card-highlight">
            <span className="stat-label">Estimated Bill Amount (तिर्नुपर्ने रकम)</span>
            <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
              रु {Math.round(calculation.totalBill).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              Monthly Consumption: {unitsConsumed} units
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Energy Slab Charge</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(calculation.energyCharge).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Minimum Monthly Charge</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(calculation.minCharge)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>5% VAT (Consumption above 50 units)</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>रु {Math.round(calculation.vatAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Prompt Payment Rebate / Fine</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: calculation.adjustment < 0 ? '#059669' : '#e11d48' }}>
                  {calculation.adjustment < 0 ? `- रु ${Math.abs(Math.round(calculation.adjustment))}` : `+ रु ${Math.round(calculation.adjustment)}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
