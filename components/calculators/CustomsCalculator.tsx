'use client';

import React, { useState, useMemo } from 'react';
import { Smartphone, Copy, Check, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function CustomsCalculator() {
  const { t, language } = useLanguage();
  const [deviceType, setDeviceType] = useState<'iphone' | 'smart' | 'general'>('iphone');
  const [phonePriceUsd, setPhonePriceUsd] = useState<number>(1000);
  const [isMigrantWorkerWithPermit, setIsMigrantWorkerWithPermit] = useState<boolean>(false);
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
          {/* Device Category Dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Select Device Category', 'उपकरणको वर्ग छनौट गर्नुहोस्')}</label>
            <select
              className="select-input"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value as 'iphone' | 'smart' | 'general')}
              style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}
            >
              <option value="iphone">{t('iPhone / Flagship Smartphone', 'आईफोन वा प्रिमियम स्मार्टफोन')}</option>
              <option value="smart">{t('Android Smartphone', 'एन्ड्रोइड स्मार्टफोन')}</option>
              <option value="general">{t('Basic Feature Phone', 'साधारण बार फोन')}</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('Total Number of Phones Brought', 'नेपाल ल्याइएका कुल फोन संख्या')}</label>
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
              <span style={{ fontSize: '13px', fontWeight: 700 }}>{t('Migrant Worker with Valid Labour Permit', 'श्रम स्वीकृति प्राप्त वैदेशिक रोजगार यात्रु')}</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>{t('Worked abroad for 6+ months (Eligible for 2 phones duty-free)', '६ महिनाभन्दा बढी काम गरेका (२ वटा फोन निःशुल्क ल्याउन पाउने)')}</p>
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
            <span className="stat-label">{t('Estimated Customs & MDMS Duty', 'अनुमानित भन्सार तथा MDMS महसुल')}</span>
            <div className="stat-value" style={{ color: calculation.totalCustomsDuty > 0 ? '#e11d48' : '#059669', margin: '6px 0 2px' }}>
              रु {calculation.totalCustomsDuty.toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              {calculation.isFullyExempt ? t('100% Duty Free under personal baggage allowance', 'व्यक्तिगत झिटिगुन्टा अन्तर्गत पूर्ण निःशुल्क') : t(`Duty applies to ${calculation.taxablePhones} phone(s)`, `${calculation.taxablePhones} वटा फोनमा कर लाग्छ`)}
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Flat Rate Per Taxable Device', 'प्रति करयोग्य फोनको दर')}</span>
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
