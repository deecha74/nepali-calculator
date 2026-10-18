'use client';

import React, { useState, useMemo } from 'react';
import { Percent, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function VatCalculator() {
  const { t } = useLanguage();
  const [calculationMode, setCalculationMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number>(10000);
  const [vatRate] = useState<number>(13); // 13% Nepal VAT
  const [includeServiceCharge, setIncludeServiceCharge] = useState<boolean>(false); // 10%
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    if (calculationMode === 'forward') {
      const discountAmount = amount * (discountPercent / 100);
      const discountedBase = amount - discountAmount;
      const serviceChargeAmount = includeServiceCharge ? discountedBase * 0.10 : 0;
      const taxableAmount = discountedBase + serviceChargeAmount;
      const vatAmount = taxableAmount * (vatRate / 100);
      const grandTotal = taxableAmount + vatAmount;

      return {
        baseAmount: amount,
        discountAmount,
        serviceChargeAmount,
        taxableAmount,
        vatAmount,
        grandTotal,
      };
    } else {
      // Reverse VAT: Extract base and VAT from grand total
      // Grand Total = Taxable * 1.13 => Taxable = Grand Total / 1.13
      const grandTotal = amount;
      const taxableAmount = grandTotal / (1 + vatRate / 100);
      const vatAmount = grandTotal - taxableAmount;

      return {
        baseAmount: taxableAmount,
        discountAmount: 0,
        serviceChargeAmount: 0,
        taxableAmount,
        vatAmount,
        grandTotal,
      };
    }
  }, [calculationMode, amount, vatRate, includeServiceCharge, discountPercent]);

  const handleCopy = () => {
    const text = `Nepal 13% VAT Breakdown:
Base / Taxable Amount: रु ${Math.round(calculation.taxableAmount).toLocaleString('en-IN')}
13% VAT: रु ${Math.round(calculation.vatAmount).toLocaleString('en-IN')}
Total Bill: रु ${Math.round(calculation.grandTotal).toLocaleString('en-IN')}
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
            <span className="badge badge-emerald">{t('Nepal IRD 13% Standard', 'नेपाल आन्तरिक राजस्व विभाग १३% मापदण्ड')}</span>
            <span className="badge badge-neutral">{t('Forward & Reverse VAT', 'सुल्टो तथा उल्टो भ्याट')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('13% VAT & Service Charge Calculator', '१३% मूल्य अभिवृद्धि कर (भ्याट) तथा सेवा शुल्क हिसाब')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Add 13% VAT to invoices or extract VAT backwards from tax-inclusive retail bills.',
              'बिलमा १३% भ्याट थप गर्नुहोस् वा कुल बिलबाट कर पूर्वको रकम र भ्याट अलग गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy', 'नतिजा कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          {/* Mode Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">{t('VAT Calculation Type', 'भ्याट गणनाको प्रकार')}</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`segmented-btn ${calculationMode === 'forward' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setCalculationMode('forward')}
              >
                {t('Forward VAT (Add 13% to Price)', 'सुल्टो भ्याट (मूल्यमा १३% जोड्ने)')}
              </button>
              <button
                type="button"
                className={`segmented-btn ${calculationMode === 'reverse' ? 'active' : ''}`}
                style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                onClick={() => setCalculationMode('reverse')}
              >
                {t('Reverse VAT (Extract from Total)', 'उल्टो भ्याट (कुल बिलबाट निकाल्ने)')}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="input-label">
              {calculationMode === 'forward' 
                ? t('Base / Taxable Amount (NPR)', 'करयोग्य आधार रकम (रु)') 
                : t('Total Inclusive Bill Amount (NPR)', 'भ्याट सहितको कुल बिल रकम (रु)')}
            </label>
            <input
              type="number"
              min={1}
              className="text-input"
              style={{ fontSize: '18px', fontWeight: 700 }}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
          </div>

          {calculationMode === 'forward' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label className="input-label">{t('Discount (%)', 'छुट (%)')}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="text-input"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="input-label">{t('VAT Rate (%)', 'भ्याट दर (%)')}</label>
                  <input
                    type="number"
                    disabled
                    className="text-input"
                    value={13}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{t('Include 10% Restaurant Service Charge', '१०% रेस्टुरेन्ट सेवा शुल्क समावेश गर्ने')}</span>
                <input
                  type="checkbox"
                  checked={includeServiceCharge}
                  onChange={(e) => setIncludeServiceCharge(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="result-card-highlight">
            <span className="stat-label">
              {calculationMode === 'forward' 
                ? t('Total Bill with 13% VAT', '१३% भ्याट सहितको कुल बिल रकम') 
                : t('Extracted 13% VAT Amount', 'अलग गरिएको १३% भ्याट रकम')}
            </span>
            <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
              रु {Math.round(calculationMode === 'forward' ? calculation.grandTotal : calculation.vatAmount).toLocaleString('en-IN')}
            </div>
            <span className="stat-subvalue">
              {calculationMode === 'forward' 
                ? `${t('Includes', 'यसमा')} रु ${Math.round(calculation.vatAmount).toLocaleString('en-IN')} ${t('in 13% VAT', 'भ्याट समावेश छ')}` 
                : `${t('Pre-tax base value:', 'कर अघिको मूल्य:')} रु ${Math.round(calculation.baseAmount).toLocaleString('en-IN')}`}
            </span>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('Pre-Tax Amount', 'कर अघिको आधार रकम')}</span>
                <span style={{ fontWeight: 600 }}>रु {Math.round(calculation.baseAmount).toLocaleString('en-IN')}</span>
              </div>
              {calculation.serviceChargeAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>{t('Service Charge (10%)', 'सेवा शुल्क (१०%)')}</span>
                  <span style={{ fontWeight: 600 }}>रु {Math.round(calculation.serviceChargeAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>{t('13% VAT Amount', '१३% भ्याट रकम')}</span>
                <span style={{ fontWeight: 700, color: '#e11d48' }}>रु {Math.round(calculation.vatAmount).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span style={{ fontWeight: 700 }}>{t('Final Total Payable', 'कुल तिर्नुपर्ने रकम')}</span>
                <span style={{ fontWeight: 800, fontSize: '15px' }}>रु {Math.round(calculation.grandTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
