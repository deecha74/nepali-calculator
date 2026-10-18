'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  History, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  Scale, 
  Clock, 
  Copy, 
  Check, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { HISTORICAL_GOLD_DATA, compareGoldRates, HistoricalGoldRecord } from '@/lib/rates/goldHistory';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';
import { useLanguage } from '@/components/LanguageContext';

export function Gold100YearComparison() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number>(2016); // 10 years ago default
  const [tolaCount, setTolaCount] = useState<number>(1);
  const [liveTodayRate, setLiveTodayRate] = useState<number>(DEFAULT_GOLD_RATES.fineGold24K);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Fetch live today's gold rate
  useEffect(() => {
    async function loadLive() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (data.gold?.fineGold24K) {
            setLiveTodayRate(data.gold.fineGold24K);
            setIsLive(true);
          }
        }
      } catch (e) {
        // Fallback to default
      }
    }
    loadLive();
  }, []);

  // Compute comparison
  const comparison = useMemo(() => {
    return compareGoldRates(selectedYear, liveTodayRate, tolaCount);
  }, [selectedYear, liveTodayRate, tolaCount]);

  // Quick milestone presets
  const presets = [
    { label: t('10 Years Ago (2016)', '१० वर्ष अघि (२०१६)'), year: 2016, badge: 'Popular' },
    { label: t('5 Years Ago (2021)', '५ वर्ष अघि (२०२१)'), year: 2021 },
    { label: t('20 Years Ago (2006)', '२० वर्ष अघि (२००६)'), year: 2006 },
    { label: t('50 Years Ago (1976)', '५० वर्ष अघि (१९७६)'), year: 1976 },
    { label: t('100 Years Ago (1926)', '१०० वर्ष अघि (१९२६)'), year: 1926, badge: '100 Years' },
  ];

  const handleCopy = () => {
    const text = `Nepal Gold Price 100-Year Return Comparison:
Selected Period: ${comparison.pastYear} AD (${comparison.pastYearBS}) vs Today (2026 AD)
Time Elapsed: ${comparison.yearsElapsed} Years
Past Rate: रु ${comparison.pastRatePerTola.toLocaleString('en-IN')}/tola
Today's Rate: रु ${comparison.todayRatePerTola.toLocaleString('en-IN')}/tola
Quantity: ${tolaCount} Tola
Past Investment: रु ${Math.round(comparison.pastTotalCost).toLocaleString('en-IN')}
Today's Value: रु ${Math.round(comparison.todayTotalValue).toLocaleString('en-IN')}
Net Wealth Gain: +रु ${Math.round(comparison.netProfitNpr).toLocaleString('en-IN')} (+${comparison.percentageGrowth.toFixed(1)}%)
Multiplier: ${comparison.multiplier.toFixed(1)}x | Annualized Return (CAGR): ${comparison.cagrPercent.toFixed(2)}% per year
Context: ${comparison.context}
Calculated via Nepali Calc (nepalcalc.com/gold/history)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter historical table
  const filteredHistory = useMemo(() => {
    if (!searchFilter.trim()) return HISTORICAL_GOLD_DATA;
    const q = searchFilter.toLowerCase();
    return HISTORICAL_GOLD_DATA.filter(
      (item) =>
        item.yearAD.toString().includes(q) ||
        item.yearBS.includes(q) ||
        item.eventOrContext.toLowerCase().includes(q) ||
        item.ratePerTolaNpr.toString().includes(q)
    );
  }, [searchFilter]);

  return (
    <div className="white-card" style={{ padding: '32px', maxWidth: '1040px', margin: '0 auto 40px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <History size={13} />
              <span>100-Year Historical Data (1926 - 2026)</span>
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span>{isLive ? 'Live FENEGOSIDA Synced' : 'Official Base'}</span>
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Today\'s Gold Rate vs Historical 100-Year Comparison', 'आजको सुनको भाउ र १०० वर्षे ऐतिहासिक तुलना')}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Compare today\'s live gold rate against any year from 1926 to 2025. Calculate your gold return (CAGR) and wealth growth in Nepal.',
              'आजको सुनको भाउलाई १९२६ देखि २०२५ सम्मको कुनै पनि वर्षसँग तुलना गर्नुहोस्। नेपालमा सुनको नाफा र वार्षिक प्रतिफल (CAGR) पत्ता लगाउनुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied Summary!', 'कपी भयो!') : t('Share Comparison', 'शेयर / कपी गर्नुहोस्')}</span>
        </button>
      </div>

      {/* Quick Preset Buttons */}
      <div style={{ marginBottom: '24px' }}>
        <label className="input-label" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={14} color="#d97706" />
          <span>{t('Popular Comparison Timeframes:', 'लोकप्रिय तुलना समयसीमा:')}</span>
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map((p) => {
            const isActive = selectedYear === p.year;
            return (
              <button
                key={p.year}
                type="button"
                onClick={() => setSelectedYear(p.year)}
                className={`segmented-btn ${isActive ? 'active' : ''}`}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{p.label}</span>
                {p.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: isActive ? '#ffffff' : '#fef3c7',
                      color: isActive ? '#d97706' : '#b45309',
                      fontWeight: 800,
                    }}
                  >
                    {p.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls: Pick Year & Quantity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px', background: 'var(--surface-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <label className="input-label">{t('Select Comparison Year (AD / BS)', 'तुलना गर्ने वर्ष छनौट गर्नुहोस्')}</label>
          <select
            className="text-input"
            style={{ fontWeight: 600 }}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {HISTORICAL_GOLD_DATA.filter((r) => r.yearAD < 2026).map((item) => (
              <option key={item.yearAD} value={item.yearAD}>
                {item.yearAD} AD ({item.yearBS} BS) — रु {item.ratePerTolaNpr.toLocaleString('en-IN')}/tola
              </option>
            ))}
          </select>
          <span className="input-subtext">{comparison.context}</span>
        </div>

        <div>
          <label className="input-label">{t('Gold Quantity (तोला)', 'सुनको परिमाण (तोला)')}</label>
          <input
            type="number"
            min={0.1}
            step={0.5}
            className="text-input"
            style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            value={tolaCount}
            onChange={(e) => setTolaCount(Math.max(0.01, Number(e.target.value) || 0))}
          />
          <span className="input-subtext">1 Tola = 11.6638 grams = 100 Lal</span>
        </div>
      </div>

      {/* Comparison Scorecard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Past Rate Card */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {comparison.pastYear} AD ({comparison.pastYearBS}) Value
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#334155', fontFamily: 'var(--font-mono)', margin: '8px 0 4px' }}>
            रु {Math.round(comparison.pastTotalCost).toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            रु {comparison.pastRatePerTola.toLocaleString('en-IN')} / tola ({tolaCount} Tola)
          </div>
          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
            <strong>Historical Context:</strong> {comparison.context}
          </div>
        </div>

        {/* Today's Live Rate Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Today (2026 Live FENEGOSIDA)
            </span>
            <span className="badge badge-amber" style={{ fontSize: '10px', padding: '2px 6px' }}>
              Current Value
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#d97706', fontFamily: 'var(--font-mono)', margin: '8px 0 4px' }}>
            रु {Math.round(comparison.todayTotalValue).toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '13px', color: '#92400e', fontWeight: 600 }}>
            रु {comparison.todayRatePerTola.toLocaleString('en-IN')} / tola ({tolaCount} Tola)
          </div>
          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #fde68a', fontSize: '12px', color: '#78350f' }}>
            <strong>Value Multiplier:</strong> {comparison.multiplier.toFixed(1)}x Original Price
          </div>
        </div>

        {/* Wealth Gain & ROI Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Net Wealth Growth ({comparison.yearsElapsed} Years)
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-mono)', margin: '8px 0 4px' }}>
            +रु {Math.round(comparison.netProfitNpr).toLocaleString('en-IN')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#065f46', fontWeight: 700 }}>
            <TrendingUp size={16} />
            <span>+{comparison.percentageGrowth.toFixed(1)}% Total Gain</span>
          </div>
          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #a7f3d0', fontSize: '12px', color: '#065f46' }}>
            <strong>Compound Annual Return (CAGR):</strong> {comparison.cagrPercent.toFixed(2)}% per year
          </div>
        </div>
      </div>

      {/* Visual Narrative Box */}
      <div
        style={{
          padding: '18px 22px',
          borderRadius: '10px',
          background: 'var(--surface-primary)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <Sparkles size={22} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '14px', lineHeight: '1.65', color: 'var(--text-primary)' }}>
          <strong>Summary for {tolaCount} Tola:</strong> An investment of{' '}
          <span style={{ fontWeight: 700, color: '#334155' }}>
            रु {Math.round(comparison.pastTotalCost).toLocaleString('en-IN')}
          </span>{' '}
          in {comparison.pastYear} AD ({comparison.pastYearBS}) has grown to{' '}
          <span style={{ fontWeight: 700, color: '#d97706' }}>
            रु {Math.round(comparison.todayTotalValue).toLocaleString('en-IN')}
          </span>{' '}
          today. That represents an absolute profit of{' '}
          <span style={{ fontWeight: 700, color: '#059669' }}>
            +रु {Math.round(comparison.netProfitNpr).toLocaleString('en-IN')}
          </span>{' '}
          ({comparison.percentageGrowth.toFixed(1)}% total return), multiplying your money by{' '}
          <strong>{comparison.multiplier.toFixed(1)} times</strong> at an annualized compounding return of{' '}
          <strong>{comparison.cagrPercent.toFixed(2)}% CAGR</strong> over {comparison.yearsElapsed} years.
        </div>
      </div>

      {/* Searchable 100-Year Rates History Table */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {t('Year-by-Year Gold Price Archive (1926 - 2026)', 'वर्ष-वार सुनको भाउ अभिलेख (१९२६ - २०२६)')}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Historical benchmark rates per Tola (11.66g), 10 Grams, and 1 Lal in Nepal
            </p>
          </div>

          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search year or event..."
              className="text-input"
              style={{ paddingLeft: '32px', fontSize: '12px', height: '34px' }}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto', maxHeight: '480px', overflowY: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '10px' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 2 }}>
              <tr>
                <th style={{ padding: '10px 14px' }}>Year (AD)</th>
                <th style={{ padding: '10px 14px' }}>वर्ष (वि.सं.)</th>
                <th style={{ padding: '10px 14px' }}>Rate / Tola (NPR)</th>
                <th style={{ padding: '10px 14px' }}>Rate / 10 Grams</th>
                <th style={{ padding: '10px 14px' }}>Rate / 1 Lal</th>
                <th style={{ padding: '10px 14px' }}>Key Milestone / Context</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((row) => {
                const isSelected = selectedYear === row.yearAD;
                return (
                  <tr
                    key={row.yearAD}
                    style={{
                      background: isSelected ? '#fef3c7' : undefined,
                      fontWeight: isSelected ? 700 : undefined,
                    }}
                  >
                    <td style={{ padding: '10px 14px' }}>
                      <strong>{row.yearAD}</strong>
                      {row.yearAD === 2026 && (
                        <span className="badge badge-emerald" style={{ marginLeft: '6px', fontSize: '10px' }}>
                          Today Live
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{row.yearBS}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#d97706' }}>
                      रु {row.ratePerTolaNpr.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>
                      रु {Math.round(row.ratePer10gNpr).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>
                      रु {Math.round(row.ratePerLalNpr).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      {row.eventOrContext}
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      {row.yearAD !== 2026 ? (
                        <button
                          type="button"
                          onClick={() => setSelectedYear(row.yearAD)}
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px', whiteSpace: 'nowrap' }}
                        >
                          Compare
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>Base</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
