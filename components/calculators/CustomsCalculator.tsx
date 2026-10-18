'use client';

import React, { useState, useMemo } from 'react';
import { Smartphone, Copy, Check, ShieldAlert } from 'lucide-react';

export function CustomsCalculator() {
  const [deviceType, setDeviceType] = useState<'iphone' | 'smart' | 'general'>('iphone');
  const [phonePriceUsd, setPhonePriceUsd] = useState<number>(1000);
  const [isMigrantWorkerWithPermit, setIsMigrantWorkerWithPermit] = useState<boolean>(false); // Shram Swikriti holders get 1 phone duty free!
  const [phoneCount, setPhoneCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Nepal Customs & MDMS Rates:
  // iPhone / High-end phones (Customs flat rate: Rs 10,000 for iPhone/flagships, Rs 3,000 for other smartphones)
  // Plus 13% VAT and 5% excise duty if brought for commercial or second piece beyond free quota.
  const calculation = useMemo(() => {
    let flatDutyPerPhone = 3000;
    if (deviceType === 'iphone') flatDutyPerPhone = 10000;
    else if (deviceType === 'general') flatDutyPerPhone = 1500;

    // Free quota: 1 phone free for returning travelers
    let taxablePhones = phoneCount;
    if (isMigrantWorkerWithPermit) {
      taxablePhones = Math.max(0, phoneCount - 2); // 2 phones free for migrant workers > 6 months
    } else {
      taxablePhones = Math.max(0, phoneCount - 1); // 1 personal phone free
    }

    const totalCustomsDuty = taxablePhones * flatDutyPerPhone;
    const mdmsFee = totalCustomsDuty; // MDMS charges duty to whitelist IMEI

    return {
      taxablePhones,
      flatDutyPerPhone,
      totalCustomsDuty,
      mdmsFee,
      isFullyExempt: taxablePhones === 0,
    };
  }, [deviceType, isMigrantWorkerWithPermit, phoneCount]);

  const handleCopy = () => {
    const text = `Nepal Customs & MDMS Phone Duty:
Device: ${deviceType.toUpperCase()} | Quantity: ${phoneCount}
Migrant Worker with Shram: ${isMigrantWorkerWithPermit ? 'Yes' : 'No'}
Taxable Phones: ${calculation.taxablePhones}
Total Customs & MDMS Fee: रु ${calculation.totalCustomsDuty.toLocaleString('en-IN')}
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
            <span className="badge badge-emerald">Nepal Customs & MDMS</span>
            <span className="badge badge-neutral">TIA Airport Passenger Baggage Rules</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            Mobile MDMS & Customs Duty Calculator
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Calculate customs clearance duty and MDMS registration fees when bringing mobile phones into Nepal.
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
            <label className="input-label">Select Device Category</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`segmented-btn ${deviceType === 'iphone' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setDeviceType('iphone')}
              >
                📱 iPhone / Premium Flagship
              </button>
              <button
                type="button"
                className={`segmented-btn ${deviceType === 'smart' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setDeviceType('smart')}
              >
                📲 Android Smartphone
              </button>
              <button
                type="button"
                className={`segmented-btn ${deviceType === 'general' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setDeviceType('general')}
              >
                ☎️ Basic Feature Phone
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">Total Number of Phones Brought</label>
            <input
              type="number"
              min={1}
              max={10}
              className="text-input"
              value={phoneCount}
              onChange={(e) => setPhoneCount(Number(e.target.value) || 1)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Migrant Worker with Valid Labour Permit (श्रम स्वीकृति)</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Worked abroad for 6+ months (Eligible for 2 phones duty-free)</p>
            </div>
            <input
              type="checkbox"
              checked={isMigrantWorkerWithPermit}
              onChange={(e) => setIsMigrantWorkerWithPermit(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">Estimated Customs / MDMS Duty (भन्सार महसुल)</span>
            <div className="stat-value" style={{ color: calculation.totalCustomsDuty > 0 ? '#e11d48' : '#059669', margin: '6px 0 2px' }}>
              रु {calculation.totalCustomsDuty.toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              {calculation.isFullyExempt ? '✅ 100% Duty Free under personal baggage allowance' : `Duty applies to ${calculation.taxablePhones} phone(s)`}
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Flat Rate Per Taxable Device</span>
                <span style={{ fontWeight: 700 }}>रु {calculation.flatDutyPerPhone.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Free Quota Applied</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>{isMigrantWorkerWithPermit ? '2 Phones Free' : '1 Phone Free'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
