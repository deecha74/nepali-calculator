'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight, 
  PieChart as PieChartIcon,
  ShieldCheck,
  ChevronDown,
  Layers
} from 'lucide-react';
import { calculateSip, TOP_NEPAL_MUTUAL_FUNDS } from '@/lib/rates/sipRates';
import { DonutChart } from '@/components/DonutChart';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useLanguage } from '@/components/LanguageContext';

interface SipCalculatorProps {
  initialMonthlyAmount?: number;
  initialReturnRate?: number;
  initialTenureYears?: number;
}

export function SipCalculator({
  initialMonthlyAmount = 5000,
  initialReturnRate = 12,
  initialTenureYears = 10,
}: SipCalculatorProps = {}) {
  const { t } = useLanguage();
  const [monthlyAmount, setMonthlyAmount] = useState<number>(initialMonthlyAmount);
  const [returnRate, setReturnRate] = useState<number>(initialReturnRate);
  const [tenureYears, setTenureYears] = useState<number>(initialTenureYears);
  const [stepUpPercent, setStepUpPercent] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateSip(monthlyAmount, returnRate, tenureYears, stepUpPercent);
  }, [monthlyAmount, returnRate, tenureYears, stepUpPercent]);

  const handleCopy = () => {
    const text = `Nepal SIP Investment Summary:
Monthly Investment: NPR ${monthlyAmount.toLocaleString('en-IN')}
Expected Annual Return: ${returnRate}%
Tenure: ${tenureYears} Years
Total Amount Invested: NPR ${result.investedAmount.toLocaleString('en-IN')}
Estimated Returns (Gain): NPR ${result.wealthGain.toLocaleString('en-IN')}
Total Maturity Wealth: NPR ${result.maturityValue.toLocaleString('en-IN')}
Calculated on NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartSegments = useMemo(() => {
    const total = result.maturityValue || 1;
    return [
      {
        label: 'Invested Amount',
        value: result.investedAmount,
        color: '#3b82f6',
        percentage: Math.round((result.investedAmount / total) * 100),
      },
      {
        label: 'Wealth Gain (Returns)',
        value: result.wealthGain,
        color: '#10b981',
        percentage: Math.round((result.wealthGain / total) * 100),
      },
    ];
  }, [result]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3vw, 32px)', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>
              <Sparkles size={13} />
              <span>{t('Wealth Compounding', 'चक्रवृद्धि बचत')}</span>
            </span>
            <span className="badge badge-emerald">{t('Nepal Mutual Funds', 'नेपाल म्युचुअल फण्ड')}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
            {t('Systematic Investment Plan (SIP) Calculator Nepal', 'नेपाल व्यवस्थित लगानी योजना (SIP) क्याल्कुलेटर')}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t(
              'Calculate maturity returns for NIBL Sahabhagita, Siddhartha, NMB, and open-ended mutual funds.',
              'एनआइबिएल सहभागिता, सिद्धार्थ, एनएमबि लगायत खुलामुखी म्युचुअल फण्डको भविष्यको प्रतिफल हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Share Calculation', 'हिसाब शेयर गर्नुहोस्')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)' }}>
        {/* Controls Column */}
        <div>
          {/* Monthly Investment Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ margin: 0 }}>{t('Monthly Investment (NPR)', 'मासिक लगानी रकम (रु)')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>रु</span>
                <input
                  type="number"
                  value={monthlyAmount || ''}
                  onChange={(e) => setMonthlyAmount(Math.max(100, Number(e.target.value)))}
                  className="text-input"
                  style={{ width: '120px', padding: '6px 10px', fontSize: '14px', fontWeight: 700, textAlign: 'right' }}
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>रु ५००/{t('mo', 'महिना')}</span>
              <span>रु २५,०००</span>
              <span>रु १,००,०००</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ margin: 0 }}>{t('Expected Annual Return (CAGR %)', 'अपेक्षित वार्षिक प्रतिफल (CAGR %)')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  step="0.5"
                  value={returnRate || ''}
                  onChange={(e) => setReturnRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                  className="text-input"
                  style={{ width: '80px', padding: '6px 10px', fontSize: '14px', fontWeight: 700, textAlign: 'right' }}
                />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>%</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>५% ({t('FD Benchmark', 'मुद्दती आधार')})</span>
              <span>१२% ({t('Equity MF Avg', 'म्युचुअल फण्ड औसत')})</span>
              <span>२५% ({t('Aggressive', 'उच्च प्रतिफल')})</span>
            </div>
          </div>

          {/* Tenure Years */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ margin: 0 }}>{t('Investment Duration (Years)', 'लगानी अवधि (वर्ष)')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  value={tenureYears || ''}
                  onChange={(e) => setTenureYears(Math.max(1, Math.min(35, Number(e.target.value))))}
                  className="text-input"
                  style={{ width: '80px', padding: '6px 10px', fontSize: '14px', fontWeight: 700, textAlign: 'right' }}
                />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{t('Years', 'वर्ष')}</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>१ {t('Year', 'वर्ष')}</span>
              <span>१० {t('Years', 'वर्ष')}</span>
              <span>३० {t('Years', 'वर्ष')}</span>
            </div>
          </div>

          {/* Optional Annual Step-Up SIP */}
          <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                  {t('Annual Step-Up SIP (Optional)', 'वार्षिक लगानी वृद्धि (Step-Up SIP)')}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t(
                    `Automatically increase monthly savings by ${stepUpPercent}% each year as salary grows`,
                    `तलब वृद्धि अनुसार हरेक वर्ष मासिक बचत रकम ${stepUpPercent}% ले बढाउने`
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  value={stepUpPercent}
                  onChange={(e) => setStepUpPercent(Math.max(0, Math.min(50, Number(e.target.value))))}
                  className="text-input"
                  style={{ width: '70px', padding: '4px 8px', fontSize: '13px', fontWeight: 700, textAlign: 'right' }}
                />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results & Visual Chart Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="result-card-highlight" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)', border: '1.5px solid #bbf7d0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="stat-label" style={{ color: '#047857' }}>{t('Total Expected Maturity Value', 'कुल प्राप्त हुने सम्भावित रकम')}</span>
                <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#065f46', marginTop: '4px', letterSpacing: '-0.02em' }}>
                  रु {result.maturityValue.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '13px', padding: '6px 12px' }}>
                +{((result.wealthGain / (result.investedAmount || 1)) * 100).toFixed(0)}% {t('Return', 'प्रतिफल')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '16px', borderTop: '1px solid #d1fae5' }}>
              <div>
                <span className="stat-label">{t('Total Invested', 'कुल जम्मा लगानी')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e40af', marginTop: '2px' }}>
                  रु {result.investedAmount.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>
                  {tenureYears} {t('years', 'वर्ष')} ({tenureYears * 12} {t('months', 'महिना')})
                </span>
              </div>

              <div>
                <span className="stat-label">{t('Estimated Wealth Gain', 'अनुमानित कुल नाफा')}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  रु {result.wealthGain.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>
                  {t('Compound Interest Profit', 'चक्रवृद्धि ब्याजबाट नाफा')}
                </span>
              </div>
            </div>

            {/* Donut Chart Visual */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #d1fae5', display: 'flex', justifyContent: 'center' }}>
              <DonutChart segments={chartSegments} size={150} />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowTable(!showTable)}
              className="btn-secondary"
              style={{ flex: 1, padding: '12px', fontSize: '13px' }}
            >
              <Layers size={16} />
              <span>{showTable ? t('Hide Year-by-Year Table', 'वार्षिक तालिका लुकाउनुहोस्') : t('View Growth Schedule', 'वार्षिक तालिका हेर्नुहोस्')}</span>
              <ChevronDown size={14} style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <button
              onClick={() => setShowLeadModal(true)}
              className="btn-primary"
              style={{ padding: '12px 18px', background: '#059669' }}
            >
              <span>{t('Get Free Advice', 'सल्लाह लिनुहोस्')}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Year by Year Growth Breakdown Table */}
      {showTable && (
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#059669" />
            <span>{t('Year-by-Year SIP Compounding Accumulation Schedule', 'वर्षेनी एसआइपी चक्रवृद्धि वृद्धि तालिका')}</span>
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="nepal-table">
              <thead>
                <tr>
                  <th>{t('Year', 'वर्ष')}</th>
                  <th>{t('Invested Total (NPR)', 'कुल लगानी रकम (रु)')}</th>
                  <th>{t('Wealth Gain (NPR)', 'नाफा रकम (रु)')}</th>
                  <th>{t('Maturity Balance (NPR)', 'अन्तिम मौज्दात रकम (रु)')}</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year}>
                    <td style={{ fontWeight: 700 }}>{t(`Year ${row.year}`, `${row.year} औं वर्ष`)}</td>
                    <td>रु {row.investedTotal.toLocaleString('en-IN')}</td>
                    <td style={{ color: '#059669', fontWeight: 600 }}>+ रु {row.wealthGainTotal.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 800 }}>रु {row.maturityTotal.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Open-Ended Mutual Funds in Nepal */}
      <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>
          {t('Popular Open-Ended Mutual Funds for SIP in Nepal', 'नेपालका लोकप्रिय खुलामुखी म्युचुअल फण्डहरू (SIP)')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {TOP_NEPAL_MUTUAL_FUNDS.map((fund) => (
            <div key={fund.name} style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{fund.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{fund.amc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '12px' }}>
                <span className="badge badge-neutral">{fund.schemeType}</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>~{fund.expectedCagr}% CAGR</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        leadType="sip_planning"
        title="Connect with Nepal Investment Advisors"
        subtitle="Get personalized advice for SEBON-registered mutual funds and SIP wealth planning."
      />
    </div>
  );
}
