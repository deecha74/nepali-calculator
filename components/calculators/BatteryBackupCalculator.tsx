'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { BatteryCharging, Copy, Check, Zap, Tv, Wifi, Lightbulb, Fan, Laptop } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function BatteryBackupCalculator() {
  const { t } = useLanguage();
  const [batteryCapacityAh, setBatteryCapacityAh] = useState<number>(150); // 150Ah tubular
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12); // 12V single battery
  const [batteryCount, setBatteryCount] = useState<number>(1);
  const [ledCount, setLedCount] = useState<number>(4); // 9W each
  const [fanCount, setFanCount] = useState<number>(2); // 60W each
  const [hasRouter, setHasRouter] = useState<boolean>(true); // 15W
  const [hasTv, setHasTv] = useState<boolean>(true); // 65W
  const [hasLaptop, setHasLaptop] = useState<boolean>(true); // 60W
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
    const text = `${t('Nepal Inverter Battery Backup Summary:', 'नेपाल इन्भर्टर ब्याट्री ब्याकअप सारांश:')}
${t('Battery:', 'ब्याट्री:')} ${batteryCount}x ${batteryCapacityAh}Ah (${batteryVoltage}V Tubular)
${t('Total Connected Load:', 'कुल जोडिएको लोड:')} ${calculation.totalWatts} W
${t('Estimated Backup Duration:', 'अनुमानित ब्याकअप समय:')} ${calculation.hours} ${t('hours', 'घण्टा')} ${calculation.minutes} ${t('mins', 'मिनेट')} (${calculation.backupHours} hrs)
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
            <span className="badge badge-emerald">{t('Inverter & Solar Storage', 'इन्भर्टर तथा सोलार')}</span>
            <span className="badge badge-blue">{t('12V Tubular Battery Backup Time', '१२V ट्युबुलर ब्याट्री ब्याकअप')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('Inverter Battery Backup Calculator', 'इन्भर्टर ब्याट्री ब्याकअप क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              'Calculate backup duration based on connected home appliances and battery capacity in Ampere-hours (Ah).',
              'बत्ती, पंखा, वाइफाइ र टिभीको वाट खपत तथा ब्याट्री क्षमता अनुसार इन्भर्टरले कति समय धान्छ पत्ता लगाउनुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Controls */}
        <div>
          {/* Mobile Instant Above-the-fold Result */}
          <MobileInstantResult
            primaryLabel={t('Estimated Backup Time', 'अनुमानित ब्याकअप समय')}
            primaryValue={`${calculation.hours} ${t('hr', 'घण्टा')} ${calculation.minutes} ${t('min', 'मिनेट')}`}
            primarySubtext={`${t('Connected Load:', 'कुल लोड:')} ${calculation.totalWatts} W`}
            secondaryLabel={t('Usable Energy', 'उपयोगी ऊर्जा')}
            secondaryValue={`${calculation.totalWattHours} Wh`}
            tertiaryLabel={t('Battery', 'ब्याट्री')}
            tertiaryValue={`${batteryCapacityAh} Ah`}
            badge={t('12V Tubular Inverter', '१२V ट्युबुलर इन्भर्टर')}
            accentColor="blue"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="battery-breakdown-details"
          />

          {/* Battery Presets */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
              {t('Battery Capacity (Ah)', 'ब्याट्री क्षमता (Ah)')}
            </label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
              {[100, 150, 200, 220].map((ah) => (
                <button
                  key={ah}
                  type="button"
                  className={`segmented-btn ${batteryCapacityAh === ah ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px 6px', fontSize: '13px' }}
                  onClick={() => setBatteryCapacityAh(ah)}
                >
                  {ah} Ah
                </button>
              ))}
            </div>
          </div>

          {/* Connected Appliances */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
              {t('Connected Appliances', 'जोडिएका घरायसी उपकरणहरू')}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  💡 {t('9W LED Bulbs', '९W LED बत्ती')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button type="button" onClick={() => setLedCount(Math.max(0, ledCount - 1))} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: '24px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{ledCount}</span>
                  <button type="button" onClick={() => setLedCount(ledCount + 1)} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  🌀 {t('60W Ceiling Fans', '६०W सिलिङ पंखा')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button type="button" onClick={() => setFanCount(Math.max(0, fanCount - 1))} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: '24px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{fanCount}</span>
                  <button type="button" onClick={() => setFanCount(fanCount + 1)} style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 800, cursor: 'pointer' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  📶 {t('15W Wi-Fi Router', '१५W वाइफाइ राउटर')}
                </span>
                <input
                  type="checkbox"
                  checked={hasRouter}
                  onChange={(e) => setHasRouter(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#003893' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  📺 {t('65W LED Television', '६५W LED टिभी')}
                </span>
                <input
                  type="checkbox"
                  checked={hasTv}
                  onChange={(e) => setHasTv(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#003893' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  💻 {t('60W Laptop Charger', '६०W ल्यापटप चार्जर')}
                </span>
                <input
                  type="checkbox"
                  checked={hasLaptop}
                  onChange={(e) => setHasLaptop(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#003893' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Light-Themed Output Card */}
        <div>
          <div
            id="battery-breakdown-details"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Estimated Backup Duration', 'अनुमानित ब्याकअप समय')}
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              {calculation.hours} {t('hrs', 'घण्टा')} {calculation.minutes} {t('mins', 'मिनेट')}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Total Connected Load', 'कुल जोडिएको लोड')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.totalWatts} Watts</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Usable Battery Energy', 'उपयोगी ब्याट्री ऊर्जा')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.totalWattHours} Wh</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Battery Chemistry', 'ब्याट्री प्रकार')}:</span>
                <strong style={{ color: '#0f172a' }}>{t('12V Tubular Deep Cycle', '१२V ट्युबुलर डीप साइकल')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 700 }}>{t('Inverter Efficiency & Safety DoD', 'इन्भर्टर दक्षता तथा सुरक्षित डिस्चार्ज')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>85% eff. / 80% DoD</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                'Tip: Turning off fans and television when not needed increases inverter backup time significantly (often 10+ hours for lighting & Wi-Fi).',
                'सुझाव: आवश्यकता नहुँदा पंखा र टिभी बन्द गर्दा ब्याकअप समय उल्लेख्य रूपमा बढ्छ (बत्ती र वाइफाइका लागि १०+ घण्टासम्म टिक्छ)।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
