'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Plus,
  Trash2,
  Copy,
  Check,
  Calculator,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export type ShareLotType = 'secondary' | 'ipo_fpo' | 'bonus' | 'right';

export interface ShareLot {
  id: string;
  type: ShareLotType;
  quantity: number;
  pricePerShare: number;
}

function getSebonBrokerCommissionRate(amount: number): number {
  if (amount <= 50000) return 0.004; // 0.40%
  if (amount <= 500000) return 0.0037; // 0.37%
  if (amount <= 2000000) return 0.0034; // 0.34%
  if (amount <= 10000000) return 0.003; // 0.30%
  return 0.0027; // 0.27%
}

export function NepseWaccCalculator() {
  const [lots, setLots] = useState<ShareLot[]>([
    { id: '1', type: 'ipo_fpo', quantity: 10, pricePerShare: 100 },
    { id: '2', type: 'secondary', quantity: 50, pricePerShare: 480 },
    { id: '3', type: 'bonus', quantity: 12, pricePerShare: 100 },
  ]);
  const [includeSecondaryFees, setIncludeSecondaryFees] = useState<boolean>(true);
  const [targetSellPrice, setTargetSellPrice] = useState<number>(620);
  const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('long');
  const [copied, setCopied] = useState<boolean>(false);

  const addLot = (type: ShareLotType = 'secondary') => {
    setLots((prev) => [
      ...prev,
      {
        id: String(Date.now() + Math.random()),
        type,
        quantity: type === 'ipo_fpo' ? 10 : 25,
        pricePerShare: type === 'secondary' ? 400 : 100,
      },
    ]);
  };

  const removeLot = (id: string) => {
    if (lots.length <= 1) return;
    setLots((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLot = (id: string, field: keyof ShareLot, value: string | number) => {
    setLots((prev) =>
      prev.map((lot) => {
        if (lot.id !== id) return lot;
        if (field === 'type') {
          const newType = value as ShareLotType;
          return {
            ...lot,
            type: newType,
            pricePerShare: newType === 'bonus' || newType === 'ipo_fpo' || newType === 'right' ? 100 : lot.pricePerShare,
          };
        }
        return { ...lot, [field]: Number(value) || 0 };
      })
    );
  };

  const calculation = useMemo(() => {
    let totalKitta = 0;
    let totalCostNpr = 0;

    const processedLots = lots.map((lot) => {
      const qty = Math.max(0, lot.quantity);
      // CDSC MeroShare rule: Bonus shares use par value (Rs. 100) for WACC calculation
      const effectiveRate = lot.type === 'bonus' ? 100 : Math.max(0, lot.pricePerShare);
      const baseAmount = qty * effectiveRate;

      let brokerCommission = 0;
      let sebonFee = 0;
      let dpCharge = 0;

      if (lot.type === 'secondary' && includeSecondaryFees && baseAmount > 0) {
        const commRate = getSebonBrokerCommissionRate(baseAmount);
        brokerCommission = Math.max(10, baseAmount * commRate);
        sebonFee = baseAmount * 0.00015;
        dpCharge = 25;
      }

      const lotTotalCost = baseAmount + brokerCommission + sebonFee + dpCharge;
      totalKitta += qty;
      totalCostNpr += lotTotalCost;

      return {
        ...lot,
        effectiveRate,
        baseAmount,
        fees: brokerCommission + sebonFee + dpCharge,
        lotTotalCost,
      };
    });

    const waccPerShare = totalKitta > 0 ? totalCostNpr / totalKitta : 0;

    // Target Sell Profit Preview
    const grossSellAmount = totalKitta * Math.max(0, targetSellPrice);
    const sellCommRate = getSebonBrokerCommissionRate(grossSellAmount);
    const sellBrokerComm = grossSellAmount > 0 ? Math.max(10, grossSellAmount * sellCommRate) : 0;
    const sellSebonFee = grossSellAmount * 0.00015;
    const sellDpCharge = grossSellAmount > 0 ? 25 : 0;
    const netSellBeforeTax = grossSellAmount - sellBrokerComm - sellSebonFee - sellDpCharge;

    const capitalGain = Math.max(0, netSellBeforeTax - totalCostNpr);
    const cgtRate = holdingPeriod === 'long' ? 0.05 : 0.075;
    const cgtPayable = capitalGain * cgtRate;
    const netReceivable = netSellBeforeTax - cgtPayable;
    const netProfit = netReceivable - totalCostNpr;

    return {
      processedLots,
      totalKitta,
      totalCostNpr,
      waccPerShare,
      grossSellAmount,
      cgtRate,
      cgtPayable,
      netReceivable,
      netProfit,
    };
  }, [lots, includeSecondaryFees, targetSellPrice, holdingPeriod]);

  const handleCopy = () => {
    const summary = `NEPSE WACC & Share Average Summary:
Total Kitta: ${calculation.totalKitta} shares
Total Cost Basis: NPR ${calculation.totalCostNpr.toFixed(2)}
MeroShare WACC per Share: NPR ${calculation.waccPerShare.toFixed(2)}
Net Profit at Rs. ${targetSellPrice}/share: NPR ${calculation.netProfit.toFixed(2)} (After ${calculation.cgtRate * 100}% CGT)
Calculated via NepalCalc.com/nepse-wacc`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1040px', margin: '0 auto' }}>
      {/* Header */}
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
              backgroundColor: '#ede9fe',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-blue">CDSC MeroShare Standard</span>
              <span className="badge badge-neutral">WACC & Share Average</span>
            </div>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              NEPSE WACC & Share Average Price Calculator (औसत लागत मूल्य)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied WACC!' : 'Copy WACC'}</span>
        </button>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Left: Share Lots Builder */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
              Your Share Purchase Lots (खरिद तथा बोनस विवरण)
            </span>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includeSecondaryFees}
                onChange={(e) => setIncludeSecondaryFees(e.target.checked)}
              />
              <span>Auto-add Broker + SEBON + Rs. 25 DP Fee</span>
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            {calculation.processedLots.map((lot, idx) => (
              <div
                key={lot.id}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1fr 1fr auto',
                  gap: '8px',
                  alignItems: 'end',
                }}
              >
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    Lot #{idx + 1} Source
                  </label>
                  <select
                    value={lot.type}
                    onChange={(e) => updateLot(lot.id, 'type', e.target.value)}
                    className="text-input"
                    style={{ width: '100%', padding: '7px 8px', fontSize: '12.5px', fontWeight: 600 }}
                  >
                    <option value="secondary">Secondary Buy (TMS)</option>
                    <option value="ipo_fpo">IPO / FPO (Rs. 100)</option>
                    <option value="bonus">Bonus Share (Rs. 100 Par)</option>
                    <option value="right">Right Share (Rs. 100 Par)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    Kitta (Qty)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={lot.quantity}
                    onChange={(e) => updateLot(lot.id, 'quantity', e.target.value)}
                    className="text-input"
                    style={{ width: '100%', padding: '7px 8px', fontSize: '13px', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    Rate (NPR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    disabled={lot.type === 'bonus'}
                    value={lot.type === 'bonus' ? 100 : lot.pricePerShare}
                    onChange={(e) => updateLot(lot.id, 'pricePerShare', e.target.value)}
                    className="text-input"
                    style={{
                      width: '100%',
                      padding: '7px 8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      backgroundColor: lot.type === 'bonus' ? '#e2e8f0' : '#ffffff',
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeLot(lot.id)}
                  disabled={lots.length <= 1}
                  aria-label="Remove share lot"
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    cursor: lots.length <= 1 ? 'not-allowed' : 'pointer',
                    opacity: lots.length <= 1 ? 0.4 : 1,
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Lot Quick Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
            <button
              type="button"
              onClick={() => addLot('secondary')}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '7px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} /> Add Secondary Buy
            </button>
            <button
              type="button"
              onClick={() => addLot('bonus')}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '7px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} /> Add Bonus Share (Rs. 100)
            </button>
            <button
              type="button"
              onClick={() => addLot('right')}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '7px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} /> Add Right Share
            </button>
          </div>

          {/* Optional Target Selling Price & CGT Simulation */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Target Selling Price & CGT Profit Simulator (बिक्री नाफा जाँच)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Selling Price per Share (NPR)
                </label>
                <input
                  type="number"
                  min={0}
                  value={targetSellPrice}
                  onChange={(e) => setTargetSellPrice(parseFloat(e.target.value) || 0)}
                  className="text-input"
                  style={{ width: '100%', padding: '8px 10px', fontSize: '14px', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Holding Period (CGT Rate)
                </label>
                <select
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(e.target.value as 'short' | 'long')}
                  className="text-input"
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', fontWeight: 700 }}
                >
                  <option value="long">&gt; 365 Days (5% Long-Term CGT)</option>
                  <option value="short">&le; 365 Days (7.5% Short-Term CGT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: WACC Output Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Primary WACC Hero Box */}
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#c7d2fe', fontWeight: 700 }}>
              Official MeroShare WACC (Weighted Average Cost per Share)
            </div>
            <div style={{ fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 900, color: '#38bdf8', margin: '6px 0 4px' }}>
              NPR {calculation.waccPerShare.toFixed(2)}
            </div>
            <div style={{ fontSize: '12.5px', color: '#e0e7ff' }}>
              Total Portfolio: <strong>{calculation.totalKitta} Kitta</strong> • Total Cost Basis:{' '}
              <strong>NPR {calculation.totalCostNpr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
            </div>
          </div>

          {/* Lot Breakdown Table */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#334155',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Lot-by-Lot Cost & Fee Breakdown</span>
              <span>Total Cost (NPR)</span>
            </div>

            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {calculation.processedLots.map((lot, idx) => (
                <div key={lot.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ color: '#475569' }}>
                    Lot #{idx + 1} ({lot.type.toUpperCase()}): {lot.quantity} kitta × Rs. {lot.effectiveRate}
                    {lot.fees > 0 ? ` (+Rs. ${lot.fees.toFixed(1)} fees)` : ''}
                  </span>
                  <strong style={{ color: '#0f172a' }}>NPR {lot.lotTotalCost.toFixed(2)}</strong>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                <span>Break-Even Selling Price (incl. sell fees):</span>
                <span style={{ color: '#7c3aed' }}>NPR {(calculation.waccPerShare * 1.005).toFixed(2)} / share</span>
              </div>
            </div>
          </div>

          {/* Profit & CGT Card */}
          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#065f46', marginBottom: '8px' }}>
              Selling all {calculation.totalKitta} Kitta @ NPR {targetSellPrice}/share:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#064e3b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Gross Sale Value:</span>
                <strong>NPR {calculation.grossSellAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Capital Gains Tax ({calculation.cgtRate * 100}% CGT):</span>
                <strong>NPR {calculation.cgtPayable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid #a7f3d0', fontSize: '14px' }}>
                <span>Net Take-Home Profit / Loss:</span>
                <strong style={{ color: calculation.netProfit >= 0 ? '#059669' : '#dc2626' }}>
                  {calculation.netProfit >= 0 ? '+' : ''}NPR {calculation.netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

