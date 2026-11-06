'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Percent, Copy, Check } from 'lucide-react';

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
    const text = `Discount & Bill Split Summary:
Original Price: NPR ${originalPrice.toLocaleString('en-IN')}
Discount (${discountPercent}%): -NPR ${calculation.discountSaved.toFixed(2)}
Final Payable: NPR ${calculation.finalPayable.toFixed(2)} (${splitPeople > 1 ? `NPR ${calculation.perPersonShare.toFixed(2)}/person` : '1 person'})
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
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: 0 }}>
              {t('Discount, Tip & Bill Split Calculator', 'छुट तथा बिल बाँडफाँड क्याल्कुलेटर')}
            </h1>
          </div>
        </div>
        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Bill'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        <div>
          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 700 }}>Original Tag Price / Bill (NPR):</label>
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Discount (%)</label>
              <input type="number" min={0} max={100} value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Tip (%)</label>
              <input type="number" min={0} max={50} value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value) || 0)} className="text-input" style={{ width: '100%' }} />
            </div>
            <div>
              <label className="input-label" style={{ fontSize: '12px', fontWeight: 700 }}>Split People</label>
              <input type="number" min={1} max={100} value={splitPeople} onChange={(e) => setSplitPeople(Number(e.target.value) || 1)} className="text-input" style={{ width: '100%' }} />
            </div>
          </div>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            <input type="checkbox" checked={addNepalVat} onChange={(e) => setAddNepalVat(e.target.checked)} />
            <span>Add 13% Nepal VAT after discount</span>
          </label>
        </div>

        <div style={{ padding: '20px', borderRadius: '14px', backgroundColor: '#0f172a', color: '#ffffff' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Final Net Payable Bill</div>
          <div style={{ fontSize: '34px', fontWeight: 900, color: '#fde047', marginTop: '4px' }}>
            NPR {calculation.finalPayable.toFixed(2)}
          </div>
          <div style={{ fontSize: '13px', color: '#4ade80', marginTop: '4px', fontWeight: 700 }}>
            You Save: NPR {calculation.discountSaved.toFixed(2)} ({discountPercent}% OFF)
          </div>
          {splitPeople > 1 && (
            <div style={{ fontSize: '14px', color: '#38bdf8', marginTop: '8px', fontWeight: 800 }}>
              Per Person ({splitPeople} people): NPR {calculation.perPersonShare.toFixed(2)} each
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

