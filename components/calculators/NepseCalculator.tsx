'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { calculateBrokerCommission, SEBON_FEE_RATE, DP_FEE, CGT_RATES } from '@/lib/rates/nepseRates';
import { useLanguage } from '@/components/LanguageContext';

export function NepseCalculator() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'adjustment'>('buy');

  // Buy/Sell inputs
  const [quantity, setQuantity] = useState<number>(100);
  const [buyPrice, setBuyPrice] = useState<number>(450);
  const [sellPrice, setSellPrice] = useState<number>(550);
  const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('short'); // < 365 vs >= 365 days
  const [isIndividual, setIsIndividual] = useState<boolean>(true);

  // Bonus/Right Adjustment inputs
  const [marketPriceBeforeBookClose, setMarketPriceBeforeBookClose] = useState<number>(600);
  const [bonusPercent, setBonusPercent] = useState<number>(15); // 15%
  const [rightPercent, setRightPercent] = useState<number>(20); // 20%
  const [adjType, setAdjType] = useState<'bonus' | 'right'>('bonus');

  const [copied, setCopied] = useState<boolean>(false);

  // Buy Calculation
  const buyCalculation = useMemo(() => {
    const grossAmount = quantity * buyPrice;
    const brokerCommission = calculateBrokerCommission(grossAmount);
    const sebonFee = grossAmount * SEBON_FEE_RATE;
    const dpCharge = DP_FEE;
    const totalCost = grossAmount + brokerCommission + sebonFee + dpCharge;
    const costPerShare = quantity > 0 ? totalCost / quantity : 0;

    return {
      grossAmount,
      brokerCommission,
      sebonFee,
      dpCharge,
      totalCost,
      costPerShare,
    };
  }, [quantity, buyPrice]);

  // Sell Calculation
  const sellCalculation = useMemo(() => {
    const buyGross = quantity * buyPrice;
    const buyBroker = calculateBrokerCommission(buyGross);
    const buySebon = buyGross * SEBON_FEE_RATE;
    const buyDp = DP_FEE;
    const totalBuyCost = buyGross + buyBroker + buySebon + buyDp;

    const sellGross = quantity * sellPrice;
    const sellBroker = calculateBrokerCommission(sellGross);
    const sellSebon = sellGross * SEBON_FEE_RATE;
    const sellDp = DP_FEE;

    const grossProfit = sellGross - totalBuyCost;

    // CGT on positive profit
    let cgtRate = CGT_RATES.shortTerm; // 7.5%
    if (!isIndividual) {
      cgtRate = CGT_RATES.institutional;
    } else if (holdingPeriod === 'long') {
      cgtRate = CGT_RATES.longTerm; // 5%
    }

    const cgtAmount = grossProfit > 0 ? (grossProfit - sellBroker - sellSebon) * cgtRate : 0;
    const totalDeductions = sellBroker + sellSebon + sellDp + Math.max(0, cgtAmount);
    const netReceivable = sellGross - totalDeductions;
    const netProfitOrLoss = netReceivable - totalBuyCost;

    return {
      totalBuyCost,
      sellGross,
      sellBroker,
      sellSebon,
      sellDp,
      cgtRate,
      cgtAmount: Math.max(0, cgtAmount),
      netReceivable,
      netProfitOrLoss,
    };
  }, [quantity, buyPrice, sellPrice, holdingPeriod, isIndividual]);

  // Adjustment Calculation
  const adjustedPrice = useMemo(() => {
    if (adjType === 'bonus') {
      return marketPriceBeforeBookClose / (1 + bonusPercent / 100);
    } else {
      // Right share adjustment: (Market Price + Right% * 100) / (1 + Right%)
      const r = rightPercent / 100;
      return (marketPriceBeforeBookClose + r * 100) / (1 + r);
    }
  }, [marketPriceBeforeBookClose, bonusPercent, rightPercent, adjType]);

  const handleCopy = () => {
    const text = `NEPSE Share Calculation:
Quantity: ${quantity} units
Buy Price: रु ${buyPrice} | Sell Price: रु ${sellPrice}
Total Buy Cost: रु ${Math.round(buyCalculation.totalCost).toLocaleString('en-IN')}
Net Sell Receivable: रु ${Math.round(sellCalculation.netReceivable).toLocaleString('en-IN')}
Net Profit/Loss: रु ${Math.round(sellCalculation.netProfitOrLoss).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('SEBON 0.015% & DP Rs 25', 'धितोपत्र बोर्ड ०.०१५% तथा DP शुल्क रू. २५')}</span>
            <span className="badge badge-neutral">{t('MeroShare EDIS Ready', 'मेरोसेयर EDIS हिसाब')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('NEPSE Share Calculator & Fees', 'नेप्से सेयर नाफा, कमिसन तथा पूँजीगत लाभकर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate buy costs, sell returns with CGT (5% / 7.5%), and bonus/right share adjustments.',
              'सेयर खरिद-बिक्री हिसाब, ब्रोकर कमिसन (०.२७%-०.४०%), अल्पकालीन/दीर्घकालीन लाभकर (CGT) तथा बोनस/हकप्रद समायोजन।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t("Copied!", "कपी भयो!") : t("Copy Summary", "कपी गर्नुहोस्")}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'buy' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setActiveTab('buy')}
        >
          {t('🛒 Share Buy Calculator', '🛒 सेयर खरिद हिसाब (Buy)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'sell' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setActiveTab('sell')}
        >
          {t('💰 Share Sell & Profit / CGT', '💰 सेयर बिक्री तथा नाफा/लाभकर (Sell)')}
        </button>
        <button
          type="button"
          className={`segmented-btn ${activeTab === 'adjustment' ? 'active' : ''}`}
          style={{ padding: '10px 18px', fontSize: '14px' }}
          onClick={() => setActiveTab('adjustment')}
        >
          {t('📈 Bonus & Right Adjustment', '📈 बोनस तथा हकप्रद समायोजन (Adjustment)')}
        </button>
      </div>

      {activeTab !== 'adjustment' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Inputs */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="input-label">{t('Share Quantity (units)', 'कित्ता संख्या (Units)')}</label>
                <input
                  type="number"
                  min={1}
                  className="text-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="input-label">{t('Buy Price per Share (Rs)', 'खरिद मूल्य प्रति कित्ता (रू)')}</label>
                <input
                  type="number"
                  min={1}
                  className="text-input"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            {activeTab === 'sell' && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label className="input-label">{t('Selling Price per Share (Rs)', 'बिक्री मूल्य प्रति कित्ता (रू)')}</label>
                  <input
                    type="number"
                    min={1}
                    className="text-input"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value) || 0)}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="input-label">{t('Holding Period for Capital Gains Tax (CGT)', 'सेयर राखेको अवधि (पूँजीगत लाभकर दर)')}</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      className={`segmented-btn ${holdingPeriod === 'short' ? 'active' : ''}`}
                      style={{ flex: 1, padding: '8px', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setHoldingPeriod('short')}
                    >
                      {t('Under 365 Days (7.5% CGT)', '३६५ दिन भन्दा कम (७.५% CGT)')}
                    </button>
                    <button
                      type="button"
                      className={`segmented-btn ${holdingPeriod === 'long' ? 'active' : ''}`}
                      style={{ flex: 1, padding: '8px', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setHoldingPeriod('long')}
                    >
                      {t('365 Days or More (5.0% CGT)', '३६५ दिन वा सोभन्दा बढी (५.०% CGT)')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Results */}
          <div>
            {activeTab === 'buy' ? (
              <div className="result-card-highlight">
                <span className="stat-label">{t('Total Amount to Pay (कुल खरिद लागत)', 'जम्मा भुक्तानी गर्नुपर्ने रकम (Total Buy Cost)')}</span>
                <div className="stat-value" style={{ margin: '6px 0 2px' }}>
                  रु {Math.round(buyCalculation.totalCost).toLocaleString('en-IN')}
                </div>
                <span className="stat-subvalue">
                  {t('Effective Cost per Share: Rs', 'प्रति कित्ता खुद लागत: रू.')} {(Math.round(buyCalculation.costPerShare * 100) / 100).toFixed(2)}
                </span>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Gross Stock Amount', 'कुल सेयर रकम')}</span>
                    <span style={{ fontWeight: 600 }}>रु {buyCalculation.grossAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Broker Commission', 'ब्रोकर कमिसन')}</span>
                    <span style={{ fontWeight: 600 }}>रु {buyCalculation.brokerCommission.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('SEBON Regulatory Fee (0.015%)', 'धितोपत्र बोर्ड (SEBON) शुल्क')}</span>
                    <span style={{ fontWeight: 600 }}>रु {buyCalculation.sebonFee.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('DP Charge', 'डिपोजिटरी (DP) शुल्क')}</span>
                    <span style={{ fontWeight: 600 }}>रु {buyCalculation.dpCharge.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="result-card-highlight">
                <span className="stat-label">{t('Net Receivable (प्राप्त हुने खुद रकम)', 'हात पर्ने खुद रकम (Net Receivable)')}</span>
                <div className="stat-value" style={{ color: '#059669', margin: '6px 0 2px' }}>
                  रु {Math.round(sellCalculation.netReceivable).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: sellCalculation.netProfitOrLoss >= 0 ? '#059669' : '#e11d48', marginTop: '4px' }}>
                  {t('Net Profit / Loss: Rs', 'खुद नाफा / घाटा: रू.')} {Math.round(sellCalculation.netProfitOrLoss).toLocaleString('en-IN')}
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Selling Gross Value', 'कुल बिक्री रकम')}</span>
                    <span style={{ fontWeight: 600 }}>रु {sellCalculation.sellGross.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Broker Commission', 'ब्रोकर कमिसन')}</span>
                    <span style={{ fontWeight: 600 }}>रु {sellCalculation.sellBroker.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('SEBON Fee (0.015%)', 'धितोपत्र बोर्ड (SEBON) शुल्क')}</span>
                    <span style={{ fontWeight: 600 }}>रु {sellCalculation.sellSebon.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>{t('Capital Gains Tax (CGT)', 'पूँजीगत लाभकर (CGT)')} ({sellCalculation.cgtRate * 100}%)</span>
                    <span style={{ fontWeight: 600, color: '#e11d48' }}>रु {sellCalculation.cgtAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Adjustment Calculator */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">{t('Adjustment Type', 'समायोजन प्रकार')}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className={`segmented-btn ${adjType === 'bonus' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                  onClick={() => setAdjType('bonus')}
                >
                  {t('Bonus Share Adjustment', 'बोनस सेयर समायोजन')}
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${adjType === 'right' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '10px', border: '1px solid var(--border-subtle)' }}
                  onClick={() => setAdjType('right')}
                >
                  {t('Right Share Adjustment', 'हकप्रद सेयर समायोजन')}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">{t('Market Price Before Book Closure (Rs)', 'बुक क्लोज हुनु अघिको बजार मूल्य (रू)')}</label>
              <input
                type="number"
                min={1}
                className="text-input"
                value={marketPriceBeforeBookClose}
                onChange={(e) => setMarketPriceBeforeBookClose(Number(e.target.value) || 0)}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="input-label">{adjType === 'bonus' ? t('Bonus Share (%)', 'बोनस सेयर प्रतिशत (%)') : t('Right Share (%)', 'हकप्रद सेयर प्रतिशत (%)')}</label>
              <input
                type="number"
                min={0}
                className="text-input"
                value={adjType === 'bonus' ? bonusPercent : rightPercent}
                onChange={(e) => adjType === 'bonus' ? setBonusPercent(Number(e.target.value) || 0) : setRightPercent(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <div className="result-card-highlight">
              <span className="stat-label">{t('Adjusted Share Price (समायोजित मूल्य)', 'समायोजित सेयर मूल्य (Adjusted Price)')}</span>
              <div className="stat-value" style={{ color: '#2563eb', margin: '6px 0 2px' }}>
                रु {(Math.round(adjustedPrice * 100) / 100).toFixed(2)}
              </div>
              <span className="stat-subvalue">
                {t('Theoretical opening price after book closure', 'बुक क्लोजपछिको सैद्धान्तिक सुरुवाती मूल्य')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
