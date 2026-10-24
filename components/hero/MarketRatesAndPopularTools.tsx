'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Clock, 
  ReceiptText, 
  Landmark, 
  LineChart, 
  Type, 
  Droplets, 
  Zap, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  Scale, 
  DollarSign, 
  Calculator,
  ChevronRight,
  Info,
  Radio
} from 'lucide-react';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { UpcomingCard } from './DashainAndUpcomingEvents';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';

interface QuickToolItem {
  id: string;
  nameEng: string;
  nameNep: string;
  subEng: string;
  subNep: string;
  slug: string;
  icon: any;
  color: string;
  bgLight: string;
}

const QUICK_POPULAR_TOOLS: QuickToolItem[] = [
  {
    id: "date-conv",
    nameEng: "Date Converter",
    nameNep: "मिति रूपान्तरण",
    subEng: "AD ⇄ BS Calendar",
    subNep: "ई.सं. ⇄ वि.सं. (AD ⇄ BS)",
    slug: "/date",
    icon: Calendar,
    color: "#059669",
    bgLight: "#ecfdf5",
  },
  {
    id: "age-calc",
    nameEng: "Age Calculator",
    nameNep: "उमेर गणना",
    subEng: "Calculate Exact Age",
    subNep: "उमेर गणना गर्नुहोस्",
    slug: "/date",
    icon: User,
    color: "#d97706",
    bgLight: "#fef3c7",
  },
  {
    id: "date-diff",
    nameEng: "Date Difference",
    nameNep: "मिति अन्तर",
    subEng: "Days & Months Diff",
    subNep: "दिन तथा महिना गणना",
    slug: "/date",
    icon: Clock,
    color: "#2563eb",
    bgLight: "#eff6ff",
  },
  {
    id: "holidays",
    nameEng: "Public Holidays",
    nameNep: "सार्वजनिक बिदाहरू",
    subEng: "2083 Full Calendar",
    subNep: "२०८३ सबै बिदा हेर्नुहोस्",
    slug: "/date",
    icon: Calendar,
    color: "#7c3aed",
    bgLight: "#f5f3ff",
  },
  {
    id: "income-tax",
    nameEng: "Income Tax",
    nameNep: "आयकर हिसाब",
    subEng: "FY 2083/84 Slabs",
    subNep: "FY 2083/84 कर स्ल्याब",
    slug: "/tax",
    icon: ReceiptText,
    color: "#059669",
    bgLight: "#ecfdf5",
  },
  {
    id: "land-area",
    nameEng: "Land Measurement",
    nameNep: "जग्गा नाप",
    subEng: "Ropani ⇄ Bigha",
    subNep: "रोपनी ⇄ बिघा ⇄ धुर",
    slug: "/land",
    icon: Landmark,
    color: "#0284c7",
    bgLight: "#f0f9ff",
  },
  {
    id: "loan-emi",
    nameEng: "Bank Loan EMI",
    nameNep: "बैंक ऋण EMI",
    subEng: "Monthly Installments",
    subNep: "मासिक किस्ता र तालिका",
    slug: "/emi",
    icon: LineChart,
    color: "#d97706",
    bgLight: "#fffbeb",
  },
  {
    id: "sip-calc",
    nameEng: "SIP Mutual Fund",
    nameNep: "एसआईपी (SIP)",
    subEng: "Compounding Growth",
    subNep: "म्युचुअल फण्ड कम्पाउन्डिङ",
    slug: "/sip",
    icon: TrendingUp,
    color: "#16a34a",
    bgLight: "#f0fdf4",
  },
  {
    id: "preeti-unicode",
    nameEng: "Preeti to Unicode",
    nameNep: "प्रिती युनिकोड",
    subEng: "Font Converter",
    subNep: "नेपाली फन्ट रूपान्तरण",
    slug: "/preeti",
    icon: Type,
    color: "#0891b2",
    bgLight: "#ecfeff",
  },
  {
    id: "cheque-words",
    nameEng: "Number to Words",
    nameNep: "अङ्कलाई अक्षरमा",
    subEng: "Cheque 'Only' Writing",
    subNep: "बैंक चेक 'मात्र' हिसाब",
    slug: "/number-to-words",
    icon: FileText,
    color: "#6366f1",
    bgLight: "#eef2ff",
  },
  {
    id: "khanepani-bill",
    nameEng: "Water (खानेपानी) Bill",
    nameNep: "खानेपानी महसुल",
    subEng: "KUKL Tap & Sewerage",
    subNep: "KUKL धारा र ढल बिल",
    slug: "/khanepani",
    icon: Droplets,
    color: "#0284c7",
    bgLight: "#f0f9ff",
  },
  {
    id: "electricity-nea",
    nameEng: "NEA Electricity Bill",
    nameNep: "विद्युत महसुल",
    subEng: "Units & Demand Charge",
    subNep: "NEA युनिट र डिमान्ड दर",
    slug: "/nea",
    icon: Zap,
    color: "#ea580c",
    bgLight: "#fff7ed",
  },
];

export function PopularToolsCard() {
  const { language, t } = useLanguage();
  return (
          <div
            data-aos="fade-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '18px',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calculator size={18} color="#003893" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {t('Popular Tools', 'लोकप्रिय उपकरणहरू')}
                </h3>
              </div>

              <Link
                href="#all-tools"
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#003893',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none'
                }}
              >
                <span>{t('All Tools', 'सबै उपकरणहरू')}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Grid of Square Cards */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
                gap: '12px',
                flex: 1
              }}
            >
              {QUICK_POPULAR_TOOLS.map((tool) => {
                const IconComp = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.slug}
                    style={{
                      backgroundColor: tool.bgLight,
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      padding: '12px',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.18s ease'
                    }}
                    className="hover-lift"
                  >
                    <div 
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '8px', 
                        backgroundColor: '#ffffff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}
                    >
                      <IconComp size={16} color={tool.color} />
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                        {language === 'ne' ? tool.nameNep : tool.nameEng}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                        {language === 'ne' ? tool.subNep : tool.subEng}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
  );
}

export function MarketRatesAndPopularTools() {
  const [unitMode, setUnitMode] = useState<'tola' | 'gram'>('tola');
  const [calcTolas, setCalcTolas] = useState(1);
  const { language, t } = useLanguage();

  const [rates, setRates] = useState({
    fineGoldTola: DEFAULT_GOLD_RATES.fineGold24K,
    tejabiGoldTola: DEFAULT_GOLD_RATES.tejabiGold22K,
    silverTola: DEFAULT_GOLD_RATES.silver,
    fineGold10g: DEFAULT_GOLD_RATES.fineGold10g,
    silver10g: DEFAULT_GOLD_RATES.silver10g,
    dailyChangeNpr: DEFAULT_GOLD_RATES.dailyChangeNpr,
    dailyChangePercent: DEFAULT_GOLD_RATES.dailyChangePercent,
    silverDailyChangeNpr: 15,
    silverDailyChangePercent: 0.34,
    isLive: false,
  });

  // Fetch real-time live rates from /api/live-rates (official FENEGOSIDA source)
  useEffect(() => {
    let isMounted = true;
    async function fetchLive() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.gold) {
            const fineTola = Number(data.gold.fineGold24K) || DEFAULT_GOLD_RATES.fineGold24K;
            const silverTola = Number(data.gold.silverPerTola || data.gold.silver) || DEFAULT_GOLD_RATES.silver;
            const fine10g = Number(data.gold.fineGold10g) || Math.round((fineTola / 11.6638) * 10);
            const silver10g = Number(data.gold.silver10g) || Math.round((silverTola / 11.6638) * 10);
            const changeNpr = typeof data.gold.dailyChangeNpr === 'number' ? data.gold.dailyChangeNpr : DEFAULT_GOLD_RATES.dailyChangeNpr;
            const changePct = typeof data.gold.dailyChangePercent === 'number' ? data.gold.dailyChangePercent : DEFAULT_GOLD_RATES.dailyChangePercent;

            setRates({
              fineGoldTola: fineTola,
              tejabiGoldTola: Number(data.gold.tejabiGold22K) || (fineTola - 1000),
              silverTola: silverTola,
              fineGold10g: fine10g,
              silver10g: silver10g,
              dailyChangeNpr: changeNpr,
              dailyChangePercent: changePct,
              silverDailyChangeNpr: Number(data.gold.silverDailyChangeNpr) || 15,
              silverDailyChangePercent: Number(data.gold.silverDailyChangePercent) || 0.34,
              isLive: true,
            });
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    fetchLive();
    return () => {
      isMounted = false;
    };
  }, []);

  const quickGoldTotal = Math.round(calcTolas * rates.fineGoldTola * 1.13); // with approx making & vat

  return (
    <section style={{ backgroundColor: '#ffffff', padding: 'clamp(32px, 4.5vw, 48px) 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '24px',
            alignItems: 'stretch'
          }}
        >

          {/* LEFT: Upcoming in Nepal (swapped with Popular Tools) */}
          <UpcomingCard />


          {/* RIGHT: सुन र चाँदी (Live Gold & Silver Rates Hub) */}
          <div
            data-aos="fade-up"
            className="gold-silver-card"
          >
            {/* Header with Unit Selector & History Link */}
            <div className="gold-silver-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1.5px solid #f1f5f9', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={17} color="#d97706" />
                <h3 className="gold-silver-title" style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {t('Gold & Silver Market Rates', 'सुन र चाँदी बजार दर')}
                </h3>
                {rates.isLive && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#059669',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
                    {t('Live', 'प्रत्यक्ष')}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Neumorphic Unit Switcher */}
                <div className="segmented-control" style={{ padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setUnitMode('tola')}
                    className={`segmented-btn ${unitMode === 'tola' ? 'active' : ''}`}
                    style={{ padding: '2px 8px', fontSize: '11px' }}
                  >
                    {t('Tola', 'तोला')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitMode('gram')}
                    className={`segmented-btn ${unitMode === 'gram' ? 'active' : ''}`}
                    style={{ padding: '2px 8px', fontSize: '11px' }}
                  >
                    {t('10 Gram', '१० ग्राम')}
                  </button>
                </div>

                <Link
                  href="/gold"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#d97706',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    textDecoration: 'none'
                  }}
                >
                  <span>{t('Price & History', 'मूल्य र इतिहास')}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Rate Cards (Fine Gold & Silver) */}
            <div className="gold-rates-grid">
              
              {/* Fine Gold Card */}
              <div
                className="gold-rate-box"
                style={{
                  backgroundColor: '#fffbeb',
                  border: '1.5px solid #fde68a',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div className="gold-rate-label" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }} />
                    <span>{language === 'ne' ? 'फाइन सुन (९९.९९%)' : 'Fine Gold (99.99%)'}</span>
                  </div>
                  
                  <div className="gold-rate-price" style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '3px 0 2px' }}>
                    NPR {language === 'ne' 
                      ? toNepaliDigits((unitMode === 'tola' ? rates.fineGoldTola : rates.fineGold10g).toLocaleString('en-IN'))
                      : (unitMode === 'tola' ? rates.fineGoldTola : rates.fineGold10g).toLocaleString('en-IN')
                    }
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748b', marginLeft: '2px' }}>
                      /{unitMode === 'tola' ? t('Tola', 'तोला') : t('10 Gram', '१० ग्राम')}
                    </span>
                  </div>

                  <div className="gold-rate-sub" style={{ fontSize: '10.5px', color: '#64748b' }}>
                    NPR {language === 'ne'
                      ? toNepaliDigits((unitMode === 'tola' ? rates.fineGold10g : rates.fineGoldTola).toLocaleString('en-IN'))
                      : (unitMode === 'tola' ? rates.fineGold10g : rates.fineGoldTola).toLocaleString('en-IN')
                    } / {unitMode === 'tola' ? (language === 'ne' ? '१० ग्राम' : '10 Gram') : (language === 'ne' ? 'तोला' : 'Tola')}
                  </div>
                </div>

                <div className="gold-rate-change" style={{ marginTop: '8px', fontSize: '10.5px', fontWeight: 700, color: rates.dailyChangeNpr >= 0 ? '#059669' : '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>
                    {rates.dailyChangeNpr >= 0 ? '▲' : '▼'}{' '}
                    NPR {language === 'ne' 
                      ? toNepaliDigits(Math.abs(rates.dailyChangeNpr).toLocaleString('en-IN')) 
                      : Math.abs(rates.dailyChangeNpr).toLocaleString('en-IN')
                    }{' '}
                    ({rates.dailyChangePercent >= 0 ? `+${rates.dailyChangePercent}` : rates.dailyChangePercent}%)
                  </span>
                </div>
              </div>

              {/* Silver Card */}
              <div
                className="gold-rate-box"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div className="gold-rate-label" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#94a3b8', flexShrink: 0 }} />
                    <span>{language === 'ne' ? 'चाँदी (Silver)' : 'Silver (चाँदी)'}</span>
                  </div>
                  
                  <div className="gold-rate-price" style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '3px 0 2px' }}>
                    NPR {language === 'ne' 
                      ? toNepaliDigits((unitMode === 'tola' ? rates.silverTola : rates.silver10g).toLocaleString('en-IN'))
                      : (unitMode === 'tola' ? rates.silverTola : rates.silver10g).toLocaleString('en-IN')
                    }
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748b', marginLeft: '2px' }}>
                      /{unitMode === 'tola' ? t('Tola', 'तोला') : t('10 Gram', '१० ग्राम')}
                    </span>
                  </div>

                  <div className="gold-rate-sub" style={{ fontSize: '10.5px', color: '#64748b' }}>
                    NPR {language === 'ne'
                      ? toNepaliDigits((unitMode === 'tola' ? rates.silver10g : rates.silverTola).toLocaleString('en-IN'))
                      : (unitMode === 'tola' ? rates.silver10g : rates.silverTola).toLocaleString('en-IN')
                    } / {unitMode === 'tola' ? (language === 'ne' ? '१० ग्राम' : '10 Gram') : (language === 'ne' ? 'तोला' : 'Tola')}
                  </div>
                </div>

                <div className="gold-rate-change" style={{ marginTop: '8px', fontSize: '10.5px', fontWeight: 700, color: rates.silverDailyChangeNpr >= 0 ? '#059669' : '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>
                    {rates.silverDailyChangeNpr >= 0 ? '▲' : '▼'}{' '}
                    NPR {language === 'ne'
                      ? toNepaliDigits(Math.abs(rates.silverDailyChangeNpr).toLocaleString('en-IN'))
                      : Math.abs(rates.silverDailyChangeNpr).toLocaleString('en-IN')
                    }{' '}
                    ({rates.silverDailyChangePercent >= 0 ? `+${rates.silverDailyChangePercent}` : rates.silverDailyChangePercent}%)
                  </span>
                </div>
              </div>

            </div>

            {/* Quick In-Card Gold Price Estimator - Modern Box */}
            <div className="gold-estimator-box" style={{ borderRadius: '12px', backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '10px 14px', marginBottom: '12px' }}>
              <div className="gold-estimator-title" style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                {t('Quick Gold Price Estimator (Tola):', 'द्रुत सुन मूल्य क्यालकुलेटर (तोला):')}
              </div>
              <div className="gold-estimator-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', color: '#475569' }}>{t('Weight:', 'तौल:')}</span>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={calcTolas}
                  onChange={(e) => setCalcTolas(parseFloat(e.target.value) || 1)}
                  className="gold-estimator-input"
                  style={{
                    width: '54px',
                    padding: '4px 6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '6px',
                    backgroundColor: '#faf7f0',
                    boxShadow: 'inset 2px 2px 4px rgba(44, 34, 20, 0.08)',
                    outline: 'none',
                    color: '#0b2b5c'
                  }}
                />
                <span style={{ fontSize: '11.5px', color: '#475569' }}>{t('Tola =', 'तोला =')}</span>
                <strong style={{ fontSize: '12.5px', color: '#b45309' }}>
                  NPR {language === 'ne' ? toNepaliDigits(quickGoldTotal.toLocaleString('en-IN')) : quickGoldTotal.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: '9.5px', color: '#64748b' }}>
                  {t('(incl. making + VAT)', '(जर्ती + भ्याट सहित)')}
                </span>
              </div>
            </div>

            {/* FENEGOSIDA Official Disclaimer */}
            <div className="gold-disclaimer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '10.5px', color: '#64748b', lineHeight: 1.35 }}>
              <Info size={13} color="#94a3b8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'Gold and silver rates are indicative based on FENEGOSIDA. Please confirm with your jeweler before transacting.',
                  'सुन-चाँदीको दर सुनचाँदी व्यवसायी महासंघ (FENEGOSIDA) को आधिकारिक दरमा आधारित हो। कारोबार गर्नुअघि पुष्टि गर्नुहोस्।'
                )}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
