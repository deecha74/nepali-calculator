'use client';

import React, { useState, useMemo } from 'react';
import { BatteryCharging, Copy, Check, Zap, Tv, Wifi, Lightbulb, Fan, Laptop } from 'lucide-react';

export function BatteryBackupCalculator() {
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(150); // 150Ah tubular
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12); // 12V single battery
  const [batteryCount, setBatteryCount] = useState<number>(1);
  const [ledCount, setLedCount] = useState<number>(4); // 9W each
  const [fanCount, setFanCount] = useState<number>(2); // 60W each
  const [hasRouter, setHasRouter] = useState<boolean>(true); // 15W
  const [hasTv, setHasTv] = useState<boolean>(true); // 65W
  const [hasLaptop, setHasLaptop] = useState<boolean>(1 ? true : false); // 60W
  const [extraWatts, setExtraWatts] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // Total watts consumed
    const ledWatts = ledCount * 9;
    const fanWatts = fanCount * 60;
    const routerWatts = hasRouter ? 15 : 0;
    const tvWatts = hasTv ? 65 : 0;
    const laptopWatts = hasLaptop ? 60 : 0;

    const totalWatts = ledWatts + fanWatts + routerWatts + tvWatts + laptopWatts + extraWatts;

    // Battery Total Energy: Voltage * Ah * count
    // Efficiency 85% inverter * 80% Depth of Discharge (DoD) for Lead-Acid / Tubular
    const totalWattHours = batteryVoltage * batteryCapacityAh * batteryCount * 0.85 * 0.80;

    let backupHours = 0;
    if (totalWatts > 0) {
      backupHours = totalWattHours / totalWatts;
    }

    const hours = Math.floor(backupHours);
    const minutes = Math.round((backupHours - hours) * 60);

    return {
      totalWatts,
      backupHours: Number(backupHours.toFixed(1)),
      hours,
      minutes,
      totalWattHours: Math.round(totalWattHours),
    };
  }, [batteryCapacityAh, batteryVoltage, batteryCount, ledCount, fanCount, hasRouter, hasTv, hasLaptop, extraWatts]);

  const handleCopy = () => {
    const text = `Nepal Inverter Battery Backup:
Battery: ${batteryCount}x ${batteryCapacityAh}Ah (${batteryVoltage}V Tubular)
Total Connected Load: ${calculation.totalWatts} Watts
Estimated Backup Duration: ${calculation.hours} घण्टा ${calculation.minutes} मिनेट (${calculation.backupHours} hrs)
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Inverter & Solar Storage</span>
            <span className="badge badge-blue">१२V ट्युबुलर ब्याट्री ब्याकअप समय</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            इन्भर्टर ब्याट्री ब्याकअप समय क्याल्कुलेटर (Inverter Backup Hours)
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            बत्ती, पंखा, वाइफाइ र टिभीको वाट खपत तथा ब्याट्री क्षमता (Ah) अनुसार इन्भर्टरले कति घण्टा धान्छ पत्ता लगाउनुहोस्।
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Controls */}
        <div>
          {/* Battery Presets */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              ब्याट्री क्षमता (Battery Capacity in Ah)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[100, 150, 200, 220].map((ah) => (
                <button
                  key={ah}
                  type="button"
                  onClick={() => setBatteryCapacityAh(ah)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    border: '1.5px solid',
                    borderColor: batteryCapacityAh === ah ? '#003893' : '#cbd5e1',
                    backgroundColor: batteryCapacityAh === ah ? '#003893' : '#ffffff',
                    color: batteryCapacityAh === ah ? '#ffffff' : '#0f172a',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {ah} Ah
                </button>
              ))}
            </div>
          </div>

          {/* Connected Appliances */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
              जोडिएका घरायसी उपकरणहरू (Connected Appliances)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>💡 ९W LED बत्ती (Lights)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button type="button" onClick={() => setLedCount(Math.max(0, ledCount - 1))} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{ledCount}</span>
                  <button type="button" onClick={() => setLedCount(ledCount + 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>🌀 ६०W सिलिङ पंखा (Fans)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button type="button" onClick={() => setFanCount(Math.max(0, fanCount - 1))} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{fanCount}</span>
                  <button type="button" onClick={() => setFanCount(fanCount + 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>📶 १५W वाइफाइ राउटर (WiFi Router)</span>
                <input type="checkbox" checked={hasRouter} onChange={(e) => setHasRouter(e.target.checked)} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>📺 ६५W LED टिभी (Television)</span>
                <input type="checkbox" checked={hasTv} onChange={(e) => setHasTv(e.target.checked)} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>💻 ६०W ल्यापटप चार्जर (Laptop)</span>
                <input type="checkbox" checked={hasLaptop} onChange={(e) => setHasLaptop(e.target.checked)} />
              </div>
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div>
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              अनुमानित ब्याकअप समय (Backup Duration)
            </span>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#38bdf8', margin: '8px 0 12px' }}>
              {calculation.hours} घण्टा {calculation.minutes} मिनेट
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>
              कुल लोड: <strong>{calculation.totalWatts} Watts</strong> (वाट)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>ब्याट्री प्रभावकारी ऊर्जा:</span>
                <strong>{calculation.totalWattHours} Watt-Hours</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>ब्याट्री प्रकार:</span>
                <strong>१२ भोल्ट ट्युबुलर (Tubular Deep Cycle)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                <span>इन्भर्टर दक्षता (Efficiency):</span>
                <strong>८५% + ८०% सुरक्षित डिस्चार्ज</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              💡 सुझाव: पंखा र टिभी बन्द गर्दा ब्याकअप समय दोब्बर भन्दा धेरै (१०+ घण्टा) लामो हुन्छ।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
