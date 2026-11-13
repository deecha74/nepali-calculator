'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Percent, Copy, Check } from 'lucide-react';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function DiscountTipCalculator() {
  const { t } = useLanguage();
  const [originalPrice, setOriginalPrice] = useState<number>(4500);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [addNepalVat, setAddNepalVat] = useState<boolean>(false);
  const [tipPercent, setTipPercent] = useState<number>(0);
  const [splitPeople, setSplitPeople] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const discountSaved = (originalPrice * Math.min(100, Math.max(0, discountPercent))) / 100;
    const priceAfterDiscount = Math.max(0, originalPrice - discountSaved);
    const vatAmount = addNepalVat ? priceAfterDiscount * 0.13 : 0;
    const tipAmount = (priceAfterDiscount * Math.max(0, tipPercent)) / 100;
    const finalPayable = priceAfterDiscount + vatAmount + tipAmount;
    const perPersonShare = finalPayable / Math.max(1, splitPeople);

    return {
      discountSaved,
      priceAfterDiscount,
      vatAmount,
      tipAmount,
      finalPayable,
      perPersonShare,
    };
  }, [originalPrice, discountPercent, addNepalVat, tipPercent, splitPeople]);

  const handleCopy = () => {
    const text = `${t('Discount & Bill Split Summary:', 'छुट तथा बिल बाँडफाँड सारांश:')}
${t('Original Price:', 'सुरु मूल्य:')} रु ${originalPrice.toLocaleString('en-IN')}
${t(`Discount (${discountPercent}%):`, `छुट (${discountPercent}%):`)} -रु ${calculation.discountSaved.toFixed(2)}
${t('Final Payable:', 'अन्तिम तिर्नुपर्ने रकम:')} रु ${calculation.finalPayable.toFixed(2)} (${splitPeople > 1 ? `रु ${calculation.perPersonShare.toFixed(2)}/${t('person', 'व्यक्ति')}` : t('1 person', '१ जना')})
Calculated on NepalCalc.com/discount-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '22px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Percent size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              {t('Discount & Bill Split Calculator', 'छुट तथा बिल बाँडफाँड क्याल्कुलेटर')}
            </h1>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              {t('Calculate sale discounts, 13% Nepal VAT, restaurant tip, and split bill per person.', 'सामानको छुट, १३% भ्याट, रेस्टुरेन्ट टिप तथा प्रतिव्यक्ति बिल विभाजन हिसाब गर्नुहोस्।')}
            </p>
          </div>
        </div>
        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          {/* Mobile Instant Above-the-fold Result */}
          <MobileInstantResult
            primaryLabel={t('Final Net Payable', 'अन्तिम तिर्नुपर्ने बिल')}
            primaryValue={`रु ${calculation.finalPayable.toFixed(2)}`}
            primarySubtext={`${t('You Save:', 'बचत रकम:')} रु ${calculation.discountSaved.toFixed(2)} (${discountPercent}% OFF)`}
            secondaryLabel={t('Per Person', 'प्रतिव्यक्ति')}
            secondaryValue={`रु ${calculation.perPersonShare.toFixed(2)}`}
            tertiaryLabel={t('Split', 'जना')}
            tertiaryValue={`${splitPeople} ${t('pax', 'जना')}`}
            badge={addNepalVat ? '+13% VAT' : t('Net', 'खुद')}
            accentColor="emerald"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="discount-bill-details"
          />

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              {t('Original Bill / Price (NPR)', 'सुरु बिल वा सामानको मूल्य (रु)')}
            </label>
            <input
              type="number"
              value={originalPrice || ''}
              placeholder="0"
              onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)}
              className="text-input"
              style={{ width: '100%', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ fontWeight: 700, margin: 0 }}>
                {t('Discount Percentage (%)', 'छुट प्रतिशत (%)')}
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#dc2626' }}>{discountPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              {[10, 15, 20, 25, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  className={`segmented-btn ${discountPercent === pct ? 'active' : ''}`}
                  style={{ flex: 1, padding: '4px 0', fontSize: '12px' }}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>{t('Tip (%)', 'टिप (%)')}</label>
              <input
                type="number"
                min={0}
                max={50}
                value={tipPercent || ''}
                placeholder="0"
                onChange={(e) => setTipPercent(Number(e.target.value) || 0)}
                className="text-input"
                style={{ width: '100%', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>{t('Split Among (People)', 'विभाजन (व्यक्ति संख्या)')}</label>
              <input
                type="number"
                min={1}
                max={100}
                value={splitPeople || ''}
                placeholder="1"
                onChange={(e) => setSplitPeople(Math.max(1, Number(e.target.value) || 1))}
                className="text-input"
                style={{ width: '100%', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={addNepalVat}
              onChange={(e) => setAddNepalVat(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#003893' }}
            />
            <span>{t('Add 13% Nepal Government VAT after discount', 'छुट पछिको रकममा १३% नेपाल सरकारी भ्याट जोड्नुहोस्')}</span>
          </label>
        </div>

        {/* Clean Light-Themed Output Card */}
        <div id="discount-bill-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ fontSize: '11px', color: '#003893', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Final Net Payable Bill', 'अन्तिम तिर्नुपर्ने खुद बिल')}
            </div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              रु {calculation.finalPayable.toFixed(2)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span style={{ fontWeight: 700 }}>{t('You Save (Discount):', 'तपाईंको कुल बचत (छुट):')}</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>- रु {calculation.discountSaved.toFixed(2)} ({discountPercent}% OFF)</strong>
              </div>
              {addNepalVat && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
                  <span>{t('13% VAT:', '१३% भ्याट:')}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>+ रु {calculation.vatAmount.toFixed(2)}</strong>
                </div>
              )}
              {tipPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>{t(`Tip (${tipPercent}%):`, `टिप (${tipPercent}%):`)}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>+ रु {calculation.tipAmount.toFixed(2)}</strong>
                </div>
              )}
              {splitPeople > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#003893', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700 }}>{t(`Per Person (${splitPeople} people):`, `प्रतिव्यक्ति (${splitPeople} जना):`)}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>रु {calculation.perPersonShare.toFixed(2)} {t('each', 'जना')}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
