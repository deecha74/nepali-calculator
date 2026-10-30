'use client';

import React, { useState, useMemo } from 'react';
import { Zap, Sun, BatteryCharging, Copy, Check, Home } from 'lucide-react';

export function SolarRequirementCalculator() {
  const [monthlyBillNpr, setMonthlyBillNpr] = useState<number>(3500);
  const [dailySunHours, setDailySunHours] = useState<number>(5.0);
  const [backupHoursNeeded, setBackupHoursNeeded] = useState<number>(6);
  const [batteryType, setBatteryType] = useState<'lithium_lifepo4' | 'tubular_lead'>('lithium_lifepo4');
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // Average NEA tariff ~ Rs. 10.5 per unit (kWh)
    const monthlyUnitsKwh = Math.max(10, monthlyBillNpr / 10.5);
    const dailyUnitsKwh = monthlyUnitsKwh / 30;

    // Account for 20% system loss
    const requiredKwSystem = Math.max(0.5, (dailyUnitsKwh * 1.2) / dailySunHours);
    const panelCount550W = Math.ceil((requiredKwSystem * 1000) / 550);
    const actualSystemKw = (panelCount550W * 550) / 1000;

    // Roof area: ~65 sq ft per kW
    const roofAreaSqFt = Math.round(actualSystemKw * 65);
    const roofAreaAana = roofAreaSqFt / 342.25;

    // Inverter sizing (kVA)
    const recommendedInverterKva = Math.ceil(actualSystemKw * 1.25 * 2) / 2;

    // Battery storage sizing for backupHoursNeeded
    const averageHourlyLoadWatts = (dailyUnitsKwh * 1000) / 10;
    const dodFactor = batteryType === 'lithium_lifepo4' ? 0.85 : 0.55;
    const batteryStorageKwh = (averageHourlyLoadWatts * backupHoursNeeded) / (1000 * dodFactor);
    const batteryAhAt48V = Math.ceil((batteryStorageKwh * 1000) / 48);

    // Estimated cost in Nepal (NPR)
    const panelAndInverterCost = actualSystemKw * 85000;
    const batteryCost =
      batteryType === 'lithium_lifepo4' ? batteryStorageKwh * 34000 : batteryStorageKwh * 21000;
    const totalEstimatedCostNpr = Math.round(panelAndInverterCost + batteryCost);

    // Annual savings (NEA bill saved + Net Metering @ Rs 7.10/kWh)
    const annualSavingsNpr = Math.round(monthlyBillNpr * 12);
    const paybackYears = annualSavingsNpr > 0 ? totalEstimatedCostNpr / annualSavingsNpr : 0;

    return {
      monthlyUnitsKwh,
      dailyUnitsKwh,
      actualSystemKw,
      panelCount550W,
      roofAreaSqFt,
      roofAreaAana,
      recommendedInverterKva,
      batteryStorageKwh,
      batteryAhAt48V,
      totalEstimatedCostNpr,
      annualSavingsNpr,
      paybackYears,
    };
  }, [monthlyBillNpr, dailySunHours, backupHoursNeeded, batteryType]);

  const handleCopy = () => {
    const text = `Nepal Home Solar System Estimate:
Monthly NEA Bill: NPR ${monthlyBillNpr} (~${calculation.monthlyUnitsKwh.toFixed(0)} Units/month)
Recommended Solar System: ${calculation.actualSystemKw.toFixed(2)} kW (${calculation.panelCount550W} × 550W Mono PERC Panels)
Hybrid Inverter Size: ${calculation.recommendedInverterKva} kVA
Battery Bank: ${calculation.batteryStorageKwh.toFixed(1)} kWh (${calculation.batteryAhAt48V}Ah @ 48V)
Estimated Installation Cost in Nepal: NPR ${calculation.totalEstimatedCostNpr.toLocaleString('en-IN')}
Calculated via NepalCalc.com/solar-requirement`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#fef9c3',
              color: '#ca8a04',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sun size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>
                AEPC & NEA Net Metering
              </span>
              <span className="badge badge-neutral">सोलार प्यानल तथा ब्याट्री हिसाब</span>
            </div>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              Nepal Solar Panel, Battery & Inverter Sizing Calculator
            </h2>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Estimate'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Left: Inputs */}
        <div>
          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="nea-bill-input" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              1. Average Monthly NEA Electricity Bill (NPR):
            </label>
            <input
              id="nea-bill-input"
              type="number"
              min={500}
              step={500}
              value={monthlyBillNpr}
              onChange={(e) => setMonthlyBillNpr(Number(e.target.value) || 1000)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '16px', fontWeight: 700 }}
            />
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Approx. {calculation.monthlyUnitsKwh.toFixed(0)} kWh/month ({calculation.dailyUnitsKwh.toFixed(1)} Units/day)
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="sun-hours" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              2. Region / Peak Daily Sun Hours in Nepal:
            </label>
            <select
              id="sun-hours"
              value={dailySunHours}
              onChange={(e) => setDailySunHours(Number(e.target.value))}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '13.5px', fontWeight: 700 }}
            >
              <option value={5.0}>Kathmandu Valley & Hills (5.0 Peak Sun Hours)</option>
              <option value={5.5}>Terai — Chitwan, Butwal, Biratnagar, Nepalgunj (5.5 Hours)</option>
              <option value={4.5}>Pokhara & High Cloud/Mountain Regions (4.5 Hours)</option>
            </select>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="backup-hours" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              3. Desired Night / Power-Cut Battery Backup Hours:
            </label>
            <input
              id="backup-hours"
              type="number"
              min={0}
              max={24}
              value={backupHoursNeeded}
              onChange={(e) => setBackupHoursNeeded(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '15px', fontWeight: 700 }}
            />
          </div>

          <div>
            <label className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              4. Battery Technology:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setBatteryType('lithium_lifepo4')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: batteryType === 'lithium_lifepo4' ? '2px solid #059669' : '1px solid var(--border-subtle)',
                  background: batteryType === 'lithium_lifepo4' ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                🔋 Lithium LiFePO4 (10+ Yrs)
              </button>
              <button
                type="button"
                onClick={() => setBatteryType('tubular_lead')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: batteryType === 'tubular_lead' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
                  background: batteryType === 'tubular_lead' ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                ⚡ Tall Tubular Lead-Acid
              </button>
            </div>
          </div>
        </div>

        {/* Right: Outputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700 }}>
              Recommended Rooftop Solar System Capacity
            </div>
            <div style={{ fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 900, color: '#fde047', marginTop: '4px' }}>
              {calculation.actualSystemKw.toFixed(2)} kW System
            </div>
            <div style={{ fontSize: '13.5px', color: '#e2e8f0', marginTop: '4px' }}>
              <strong>{calculation.panelCount550W} Panels</strong> (550W Mono PERC) • Roof Space:{' '}
              <strong>{calculation.roofAreaSqFt} Sq. Ft</strong> ({calculation.roofAreaAana.toFixed(2)} Aana)
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px 16px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Hybrid Solar Inverter Size:</span>
                <strong>{calculation.recommendedInverterKva} kVA</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Battery Bank Capacity ({backupHoursNeeded}h backup):</span>
                <strong>
                  {calculation.batteryStorageKwh.toFixed(1)} kWh ({calculation.batteryAhAt48V}Ah @ 48V)
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569' }}>Estimated Turnkey Cost in Nepal:</span>
                <strong style={{ color: '#059669' }}>NPR {calculation.totalEstimatedCostNpr.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span style={{ color: '#475569' }}>Annual NEA Bill Saved & Payback:</span>
                <strong>
                  NPR {calculation.annualSavingsNpr.toLocaleString('en-IN')}/yr (~{calculation.paybackYears.toFixed(1)} yrs)
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

