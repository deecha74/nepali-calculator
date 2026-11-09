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
  Radio,
  Coins,
  Car,
  Keyboard,
  Percent,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { DEFAULT_GOLD_RATES } from '@/lib/rates/goldRates';
import { DEFAULT_FOREX_RATES, CurrencyRate } from '@/lib/rates/forexRates';

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
  {
    id: "gold-silver",
    nameEng: "Gold & Silver",
    nameNep: "सुन चाँदी दर",
    subEng: "Tola & Gram Rates",
    subNep: "तोला तथा १० ग्राम दर",
    slug: "/gold",
    icon: Coins,
    color: "#d97706",
    bgLight: "#fffbeb",
  },
  {
    id: "nepse-trading",
    nameEng: "NEPSE Share Trading",
    nameNep: "नेप्से शेयर किनबेच",
    subEng: "Broker & SEBON Fee",
    subNep: "ब्रोकर कमिसन र मुनाफा",
    slug: "/nepse",
    icon: LineChart,
    color: "#2563eb",
    bgLight: "#eff6ff",
  },
  {
    id: "vehicle-tax",
    nameEng: "Vehicle Bluebook Tax",
    nameNep: "सवारी साधन कर",
    subEng: "CC & Electric kW Tax",
    subNep: "सीसी तथा ईभी नवीकरण कर",
    slug: "/vehicle",
    icon: Car,
    color: "#dc2626",
    bgLight: "#fef2f2",
  },
  {
    id: "forex-rates",
    nameEng: "Forex & Remittance",
    nameNep: "विदेशी मुद्रा विनिमय",
    subEng: "NRB Live Exchange Rates",
    subNep: "राष्ट्र बैंक विनिमय दर",
    slug: "/forex",
    icon: DollarSign,
    color: "#059669",
    bgLight: "#ecfdf5",
  },
  {
    id: "license-quiz",
    nameEng: "License Exam Quiz",
    nameNep: "लाइसेन्स लिखित परीक्षा",
    subEng: "500+ Official MCQs",
    subNep: "वर्ग 'क' र 'ख' मोडल प्रश्न",
    slug: "/license-exam",
    icon: Award,
    color: "#8b5cf6",
    bgLight: "#f5f3ff",
  },
  {
    id: "typing-test",
    nameEng: "Nepali Typing Test",
    nameNep: "टाइपिङ स्पिड टेस्ट",
    subEng: "Unicode & Preeti WPM",
    subNep: "लोकसेवा परीक्षा तयारी",
    slug: "/typing-test",
    icon: Keyboard,
    color: "#0891b2",
    bgLight: "#ecfeff",
  },
  {
    id: "vat-tax",
    nameEng: "VAT & Bill Tax",
    nameNep: "भ्याट (VAT) हिसाब",
    subEng: "13% Tax & Breakdown",
    subNep: "१३% कर र छुट हिसाब",
    slug: "/vat",
    icon: Percent,
    color: "#4f46e5",
    bgLight: "#eef2ff",
  },
  {
    id: "gratuity-calc",
    nameEng: "Gratuity & SSF",
    nameNep: "उपदान तथा सामाजिक सुरक्षा",
    subEng: "Labour Act 2074 Rules",
    subNep: "८.३३% उपदान र अवकाश कोष",
    slug: "/gratuity",
    icon: Briefcase,
    color: "#0f766e",
    bgLight: "#f0fdfa",
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
        borderRadius: '20px',
        padding: 'clamp(20px, 3vw, 28px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 30px rgba(11, 43, 92, 0.05)',
        width: '100%',
      }}
    >
      {/* Header matching Image 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '22px',
          paddingBottom: '14px',
          borderBottom: '1.5px solid #f1f5f9',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0b2b5c 0%, #1e4b8f 100%)',
              display: 'grid',
              placeItems: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(11, 43, 92, 0.22)',
            }}
          >
            <Calculator size={21} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0b2b5c', margin: 0, letterSpacing: '-0.01em' }}>
                {t('Popular Calculators & Quick Tools', 'लोकप्रिय क्यालकुलेटर तथा औजारहरू')}
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0', fontWeight: 500 }}>
              {t('Fast, simple and accurate tools for your everyday needs.', 'दैनिक जीवनका हिसाबहरू छिटो, सरल र यथार्थ रूपमा गर्नुहोस्।')}
            </p>
          </div>
        </div>

        <Link
          href="/tools"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: '9999px',
            border: '1.5px solid #e2e8f0',
            backgroundColor: '#ffffff',
            fontSize: '12.5px',
            fontWeight: 700,
            color: '#0b2b5c',
            textDecoration: 'none',
            transition: 'all 0.18s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
          className="neu-btn"
        >
          <span>{t('View All 70+ Tools →', 'सबै ७०+ उपकरणहरू →')}</span>
        </Link>
      </div>

      {/* Grid of Horizontal Cards: Exactly 4 rows (5 columns on desktop) */}
      <div 
        className="popular-tools-grid"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
          gap: '10px',
          width: '100%'
        }}
      >
        {QUICK_POPULAR_TOOLS.map((tool) => {
          const IconComp = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.slug}
              className="hover-lift"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '11px 13px',
                borderRadius: '12px',
                border: '1px solid #e8eef5',
                backgroundColor: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: tool.bgLight,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    boxShadow: `0 2px 6px ${tool.color}18`,
                  }}
                >
                  <IconComp size={18} color={tool.color} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#0b2b5c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {language === 'ne' ? tool.nameNep : tool.nameEng}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                    {language === 'ne' ? tool.subNep : tool.subEng}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} color="#94a3b8" style={{ flexShrink: 0 }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CountryFlag({ code, size = 16 }: { code: string; size?: number }) {
  const width = Math.round(size * 1.33);
  const height = size;

  switch (code.toUpperCase()) {
    case 'USD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#B22234" />
          <rect y="1.38" width="24" height="1.38" fill="#FFFFFF" />
          <rect y="4.15" width="24" height="1.38" fill="#FFFFFF" />
          <rect y="6.92" width="24" height="1.38" fill="#FFFFFF" />
          <rect y="9.69" width="24" height="1.38" fill="#FFFFFF" />
          <rect y="12.46" width="24" height="1.38" fill="#FFFFFF" />
          <rect y="15.23" width="24" height="1.38" fill="#FFFFFF" />
          <rect width="9.6" height="9.7" fill="#3C3B6E" />
          <circle cx="2" cy="2" r="0.6" fill="#FFFFFF" />
          <circle cx="4.8" cy="2" r="0.6" fill="#FFFFFF" />
          <circle cx="7.6" cy="2" r="0.6" fill="#FFFFFF" />
          <circle cx="3.4" cy="3.6" r="0.6" fill="#FFFFFF" />
          <circle cx="6.2" cy="3.6" r="0.6" fill="#FFFFFF" />
          <circle cx="2" cy="5.2" r="0.6" fill="#FFFFFF" />
          <circle cx="4.8" cy="5.2" r="0.6" fill="#FFFFFF" />
          <circle cx="7.6" cy="5.2" r="0.6" fill="#FFFFFF" />
          <circle cx="3.4" cy="6.8" r="0.6" fill="#FFFFFF" />
          <circle cx="6.2" cy="6.8" r="0.6" fill="#FFFFFF" />
          <circle cx="4.8" cy="8.4" r="0.6" fill="#FFFFFF" />
        </svg>
      );
    case 'AED':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="6" fill="#00732F" />
          <rect y="6" width="24" height="6" fill="#FFFFFF" />
          <rect y="12" width="24" height="6" fill="#000000" />
          <rect width="6" height="18" fill="#FF0000" />
        </svg>
      );
    case 'QAR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#8D1B3D" />
          <path d="M0 0 H7 L9.5 1 L7 2 L9.5 3 L7 4 L9.5 5 L7 6 L9.5 7 L7 8 L9.5 9 L7 10 L9.5 11 L7 12 L9.5 13 L7 14 L9.5 15 L7 16 L9.5 17 L7 18 H0 Z" fill="#FFFFFF" />
        </svg>
      );
    case 'AUD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#00008B" />
          <rect width="11" height="9" fill="#00247D" />
          <path d="M0 0 L11 9 M11 0 L0 9" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M0 0 L11 9 M11 0 L0 9" stroke="#CF142B" strokeWidth="0.9" />
          <path d="M5.5 0 V9 M0 4.5 H11" stroke="#FFFFFF" strokeWidth="2.8" />
          <path d="M5.5 0 V9 M0 4.5 H11" stroke="#CF142B" strokeWidth="1.6" />
          <circle cx="5.5" cy="13.5" r="1.6" fill="#FFFFFF" />
          <circle cx="17" cy="4" r="0.8" fill="#FFFFFF" />
          <circle cx="19" cy="7.5" r="0.8" fill="#FFFFFF" />
          <circle cx="15.5" cy="8.5" r="0.8" fill="#FFFFFF" />
          <circle cx="17.2" cy="14" r="0.8" fill="#FFFFFF" />
          <circle cx="18" cy="10" r="0.6" fill="#FFFFFF" />
        </svg>
      );
    case 'EUR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#003399" />
          <circle cx="12" cy="4" r="0.8" fill="#FFCC00" />
          <circle cx="12" cy="14" r="0.8" fill="#FFCC00" />
          <circle cx="7" cy="9" r="0.8" fill="#FFCC00" />
          <circle cx="17" cy="9" r="0.8" fill="#FFCC00" />
          <circle cx="8.5" cy="5.5" r="0.8" fill="#FFCC00" />
          <circle cx="15.5" cy="5.5" r="0.8" fill="#FFCC00" />
          <circle cx="8.5" cy="12.5" r="0.8" fill="#FFCC00" />
          <circle cx="15.5" cy="12.5" r="0.8" fill="#FFCC00" />
        </svg>
      );
    case 'GBP':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#00247D" />
          <path d="M0 0 L24 18 M24 0 L0 18" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M0 0 L24 18 M24 0 L0 18" stroke="#CF142B" strokeWidth="1.6" />
          <path d="M12 0 V18 M0 9 H24" stroke="#FFFFFF" strokeWidth="4.8" />
          <path d="M12 0 V18 M0 9 H24" stroke="#CF142B" strokeWidth="2.8" />
        </svg>
      );
    case 'SAR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#006C35" />
          <rect x="5" y="7" width="14" height="2.5" fill="#FFFFFF" rx="1" />
          <rect x="7" y="11.5" width="10" height="1.2" fill="#FFFFFF" />
        </svg>
      );
    case 'JPY':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
          <circle cx="12" cy="9" r="4.5" fill="#BC002D" />
        </svg>
      );
    case 'INR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="6" fill="#FF9933" />
          <rect y="6" width="24" height="6" fill="#FFFFFF" />
          <rect y="12" width="24" height="6" fill="#138808" />
          <circle cx="12" cy="9" r="2.2" stroke="#000080" strokeWidth="0.9" fill="none" />
        </svg>
      );
    case 'CAD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#FF0000" />
          <rect x="6" width="12" height="18" fill="#FFFFFF" />
          <polygon points="12,4.5 13,8 16.5,7 14,10 15,13.5 12,11.5 9,13.5 10,10 7.5,7 11,8" fill="#FF0000" />
        </svg>
      );
    case 'KWD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="6" fill="#007A3D" />
          <rect y="6" width="24" height="6" fill="#FFFFFF" />
          <rect y="12" width="24" height="6" fill="#CE1126" />
          <polygon points="0,0 7,6 7,12 0,18" fill="#000000" />
        </svg>
      );
    case 'BHD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#CE1126" />
          <polygon points="0,0 7,0 9.5,1.8 7,3.6 9.5,5.4 7,7.2 9.5,9 7,10.8 9.5,12.6 7,14.4 9.5,16.2 7,18 0,18" fill="#FFFFFF" />
        </svg>
      );
    case 'SGD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="9" fill="#ED2939" />
          <rect y="9" width="24" height="9" fill="#FFFFFF" />
          <circle cx="5" cy="4.5" r="2.8" fill="#FFFFFF" />
          <circle cx="6" cy="4.5" r="2.4" fill="#ED2939" />
        </svg>
      );
    case 'MYR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#CC0000" />
          <rect y="2.5" width="24" height="2.5" fill="#FFFFFF" />
          <rect y="7.5" width="24" height="2.5" fill="#FFFFFF" />
          <rect y="12.5" width="24" height="2.5" fill="#FFFFFF" />
          <rect width="12" height="10" fill="#000066" />
          <circle cx="5" cy="5" r="3.2" fill="#FFCC00" />
          <circle cx="6.2" cy="5" r="2.7" fill="#000066" />
          <polygon points="8,4 8.6,5 9.8,5 8.9,5.8 9.2,7 8,6.2 6.8,7 7.1,5.8 6.2,5 7.4,5" fill="#FFCC00" />
        </svg>
      );
    case 'KRW':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
          <circle cx="12" cy="9" r="3.6" fill="#CD2E3A" />
          <path d="M12 9 C 12 10.8, 13.8 10.8, 13.8 9 C 13.8 7.2, 12 7.2, 12 9 Z" fill="#0047A0" />
        </svg>
      );
    case 'CHF':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#D52B1E" />
          <rect x="10.2" y="4" width="3.6" height="10" fill="#FFFFFF" />
          <rect x="7" y="7.2" width="10" height="3.6" fill="#FFFFFF" />
        </svg>
      );
    case 'CNY':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#DE2910" />
          <circle cx="5.5" cy="5.5" r="2.2" fill="#FFDE00" />
          <circle cx="9.5" cy="2.8" r="0.8" fill="#FFDE00" />
          <circle cx="11" cy="4.6" r="0.8" fill="#FFDE00" />
          <circle cx="11" cy="7" r="0.8" fill="#FFDE00" />
          <circle cx="9.5" cy="8.8" r="0.8" fill="#FFDE00" />
        </svg>
      );
    case 'HKD':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#DE2910" />
          <circle cx="12" cy="9" r="3.8" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="3 1.5" />
        </svg>
      );
    case 'THB':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#A51931" />
          <rect y="3" width="24" height="12" fill="#F4F5F8" />
          <rect y="6" width="24" height="6" fill="#2D2A4A" />
        </svg>
      );
    case 'DKK':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#C8102E" />
          <rect x="7" width="2.8" height="18" fill="#FFFFFF" />
          <rect y="7.6" width="24" height="2.8" fill="#FFFFFF" />
        </svg>
      );
    case 'SEK':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#006AA7" />
          <rect x="7" width="2.8" height="18" fill="#FECC02" />
          <rect y="7.6" width="24" height="2.8" fill="#FECC02" />
        </svg>
      );
    case 'OMR':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="6" fill="#FFFFFF" />
          <rect y="6" width="24" height="6" fill="#DB161B" />
          <rect y="12" width="24" height="6" fill="#008000" />
          <rect width="6.5" height="18" fill="#DB161B" />
        </svg>
      );
    case 'ILS':
      return (
        <svg width={width} height={height} viewBox="0 0 24 18" fill="none" style={{ borderRadius: '3px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}>
          <rect width="24" height="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
          <rect y="2" width="24" height="2.4" fill="#0038B8" />
          <rect y="13.6" width="24" height="2.4" fill="#0038B8" />
          <polygon points="12,5.8 14.8,10.8 9.2,10.8" stroke="#0038B8" strokeWidth="1" fill="none" />
          <polygon points="12,12.2 14.8,7.2 9.2,7.2" stroke="#0038B8" strokeWidth="1" fill="none" />
        </svg>
      );
    default:
      return (
        <span style={{ fontSize: '15px', lineHeight: 1 }}>🏳️</span>
      );
  }
}

export function LiveForexCard() {
  const { language, t } = useLanguage();
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(DEFAULT_FOREX_RATES);
  const [isLive, setIsLive] = useState(false);
  const [convertAmount, setConvertAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  useEffect(() => {
    let isMounted = true;
    async function fetchForex() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            const liveCurrenciesList = Array.isArray(data.nrbCurrencies) && data.nrbCurrencies.length > 0
              ? data.nrbCurrencies
              : (Array.isArray(data.forex?.currencies) && data.forex.currencies.length > 0 ? data.forex.currencies : null);

            if (liveCurrenciesList) {
              setCurrencies(liveCurrenciesList);
              setIsLive(true);
            } else if (data.forex && typeof data.forex === 'object') {
              const updated = DEFAULT_FOREX_RATES.map((c) => {
                const liveRate = data.forex[c.code];
                if (typeof liveRate === 'number' && liveRate > 0) {
                  return {
                    ...c,
                    sellNpr: Number(liveRate.toFixed(2)),
                    buyNpr: Number((liveRate * 0.996).toFixed(2)),
                  };
                }
                return c;
              });
              setCurrencies(updated);
              setIsLive(true);
            }
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    fetchForex();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentRateObj = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  const convertedTotal = Math.round(((convertAmount / (currentRateObj.unit || 1)) * currentRateObj.sellNpr) * 100) / 100;

  // Featured 4 spotlight currencies matching image: USD, AED, QAR, AUD
  const featuredCodes = ['USD', 'AED', 'QAR', 'AUD'];
  const topList = featuredCodes
    .map((code) => currencies.find((c) => c.code === code))
    .filter(Boolean) as CurrencyRate[];

  return (
    <div
      data-aos="fade-up"
      style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '20px',
        padding: 'clamp(18px, 2.5vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 30px rgba(11, 43, 92, 0.05)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          paddingBottom: '10px',
          borderBottom: '1.5px solid #f1f5f9',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              display: 'grid',
              placeItems: 'center',
              color: '#059669',
            }}
          >
            <DollarSign size={17} color="#059669" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            {t('NRB Forex & Currency Rates', 'NRB Forex & Currency Rates')}
          </h3>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              color: '#059669',
              backgroundColor: '#ecfdf5',
              border: '1px solid #d1fae5',
              padding: '2px 8px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
            {t('Live NRB', 'Live NRB')}
          </span>
        </div>

        <Link
          href="/forex"
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#059669',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            textDecoration: 'none',
          }}
        >
          <span>{t('All 16 Currencies →', 'सबै १६ मुद्रा दर →')}</span>
        </Link>
      </div>

      {/* Top 4 Currency Rates Grid (2x2) with REAL SVG Country Flags */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '12px',
        }}
      >
        {topList.map((item) => (
          <div
            key={item.code}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '11px 13px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                <CountryFlag code={item.code} size={15} />
                <span>{item.code}</span>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  color: '#64748b',
                  fontWeight: 700,
                  backgroundColor: '#ffffff',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {item.unit > 1 ? `${item.unit} Units` : '1 Unit'}
              </span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0b2b5c', margin: '4px 0 2px', letterSpacing: '-0.01em' }}>
              NPR {language === 'ne' ? toNepaliDigits(item.sellNpr.toFixed(2)) : item.sellNpr.toFixed(2)}
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748b', display: 'flex', justifyContent: 'flex-start', gap: '8px', fontWeight: 500 }}>
              <span>Buy: {item.buyNpr.toFixed(2)}</span>
              <span>Sell: {item.sellNpr.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick In-Card Currency Estimator Box with Flag Badge */}
      <div
        style={{
          borderRadius: '12px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #dcfce7',
          padding: '11px 13px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          <Zap size={13} color="#059669" fill="#059669" />
          <span>{t('Quick Currency to NPR Converter', 'द्रुत मुद्रा रूपान्तरण (NPR)')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="number"
            min="1"
            value={convertAmount}
            onChange={(e) => setConvertAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            style={{
              width: '62px',
              padding: '5px 8px',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              outline: 'none',
              color: '#0b2b5c',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '4px 8px',
            }}
          >
            <CountryFlag code={selectedCurrency} size={15} />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#0b2b5c',
                cursor: 'pointer',
              }}
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>=</span>
          <strong style={{ fontSize: '14.5px', color: '#059669', fontWeight: 900 }}>
            NPR {language === 'ne' ? toNepaliDigits(convertedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })) : convertedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </strong>
        </div>
      </div>

      {/* Full-width CTA Button using our signature Blue Button Color */}
      <Link
        href="/forex"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: '100%',
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: '#0b2b5c',
          color: '#ffffff',
          fontSize: '13.5px',
          fontWeight: 800,
          textDecoration: 'none',
          transition: 'all 0.18s ease',
          boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
        }}
        className="hover-lift btn-tactile"
      >
        <TrendingUp size={15} />
        <span>{t('Live Converter →', 'Live Converter →')}</span>
      </Link>
    </div>
  );
}

export function MarketRatesAndPopularTools() {
  const [unitMode, setUnitMode] = useState<'tola' | '10g' | '1g'>('tola');
  const [calcTolas, setCalcTolas] = useState(1);
  const { language, t } = useLanguage();

  const [rates, setRates] = useState({
    fineGoldTola: DEFAULT_GOLD_RATES.fineGold24K,
    tejabiGoldTola: DEFAULT_GOLD_RATES.tejabiGold22K,
    silverTola: DEFAULT_GOLD_RATES.silver,
    fineGold10g: DEFAULT_GOLD_RATES.fineGold10g,
    silver10g: DEFAULT_GOLD_RATES.silver10g,
    dailyChangeNpr: 1300,
    dailyChangePercent: 0.46,
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
            const changeNpr = typeof data.gold.dailyChangeNpr === 'number' ? data.gold.dailyChangeNpr : 1300;
            const changePct = typeof data.gold.dailyChangePercent === 'number' ? data.gold.dailyChangePercent : 0.46;

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

  // Calculate dynamic display price based on unitMode
  const goldPriceDisplay =
    unitMode === 'tola'
      ? rates.fineGoldTola
      : unitMode === '10g'
      ? rates.fineGold10g
      : Math.round(rates.fineGold10g / 10);

  const silverPriceDisplay =
    unitMode === 'tola'
      ? rates.silverTola
      : unitMode === '10g'
      ? rates.silver10g
      : Math.round(rates.silver10g / 10);

  const unitSuffix = unitMode === 'tola' ? '/Tola' : unitMode === '10g' ? '/10g' : '/1g';

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

          {/* LEFT: Live NRB Forex & Remittance Currency Converter */}
          <LiveForexCard />

          {/* RIGHT: सुन र चाँदी (Gold & Silver Market Rates matching Image) */}
          <div
            data-aos="fade-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '20px',
              padding: 'clamp(18px, 2.5vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 30px rgba(11, 43, 92, 0.05)',
            }}
          >
            {/* Header with Unit Selector & History Link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1.5px solid #f1f5f9',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🪙</span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {t('Gold & Silver Market Rates', 'Gold & Silver Market Rates')}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Unit Toggle Switcher matching image */}
                <div
                  style={{
                    display: 'inline-flex',
                    backgroundColor: '#f1f5f9',
                    padding: '2px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setUnitMode('1g')}
                    style={{
                      padding: '3px 8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: unitMode === '1g' ? '#ffffff' : 'transparent',
                      color: unitMode === '1g' ? '#0f172a' : '#64748b',
                      boxShadow: unitMode === '1g' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    1g
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitMode('10g')}
                    style={{
                      padding: '3px 8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: unitMode === '10g' ? '#ffffff' : 'transparent',
                      color: unitMode === '10g' ? '#0f172a' : '#64748b',
                      boxShadow: unitMode === '10g' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    10g
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitMode('tola')}
                    style={{
                      padding: '3px 8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: unitMode === 'tola' ? '#ffffff' : 'transparent',
                      color: unitMode === 'tola' ? '#0f172a' : '#64748b',
                      boxShadow: unitMode === 'tola' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t('Tola', 'तोला')}
                  </button>
                </div>

                <Link
                  href="/gold"
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#047857',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #d1fae5',
                    borderRadius: '9999px',
                    padding: '4px 10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{t('Price & History →', 'Price & History →')}</span>
                </Link>
              </div>
            </div>

            {/* Rate Cards (Fine Gold & Silver) with decorative Sparklines */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '12px',
              }}
            >
              
              {/* Fine Gold Card */}
              <div
                style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '20px' }}>🧈</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 750, color: '#1e293b', marginBottom: '4px' }}>
                    {language === 'ne' ? 'फाइन सुन (९९.९९%)' : 'Fine Gold (99.99%)'}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '2px 0', letterSpacing: '-0.01em' }}>
                    NPR {language === 'ne' 
                      ? toNepaliDigits(goldPriceDisplay.toLocaleString('en-IN'))
                      : goldPriceDisplay.toLocaleString('en-IN')
                    }
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginLeft: '3px' }}>
                      {unitSuffix}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '6px', fontSize: '10.5px', fontWeight: 700, color: rates.dailyChangeNpr >= 0 ? '#059669' : '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>
                    {rates.dailyChangeNpr >= 0 ? '▲' : '▼'}{' '}
                    NPR {language === 'ne' 
                      ? toNepaliDigits(Math.abs(rates.dailyChangeNpr).toLocaleString('en-IN')) 
                      : Math.abs(rates.dailyChangeNpr).toLocaleString('en-IN')
                    }{' '}
                    ({rates.dailyChangePercent >= 0 ? `+${rates.dailyChangePercent}` : rates.dailyChangePercent}%)
                  </span>
                </div>

                {/* Decorative Sparkline Chart for Gold */}
                <svg
                  width="85"
                  height="42"
                  viewBox="0 0 92 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', right: 4, bottom: 4, pointerEvents: 'none', opacity: 0.9 }}
                >
                  <defs>
                    <linearGradient id="goldSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 2 34 Q 16 38 28 26 T 54 22 T 72 12 T 90 6 L 90 42 L 2 42 Z"
                    fill="url(#goldSparkGrad)"
                  />
                  <path
                    d="M 2 34 Q 16 38 28 26 T 54 22 T 72 12 T 90 6"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Silver Card */}
              <div
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '20px' }}>🪙</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 750, color: '#1e293b', marginBottom: '4px' }}>
                    {language === 'ne' ? 'चाँदी (Silver)' : 'Silver (चाँदी)'}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '2px 0', letterSpacing: '-0.01em' }}>
                    NPR {language === 'ne' 
                      ? toNepaliDigits(silverPriceDisplay.toLocaleString('en-IN'))
                      : silverPriceDisplay.toLocaleString('en-IN')
                    }
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginLeft: '3px' }}>
                      {unitSuffix}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '6px', fontSize: '10.5px', fontWeight: 700, color: rates.silverDailyChangeNpr >= 0 ? '#059669' : '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>
                    {rates.silverDailyChangeNpr >= 0 ? '▲' : '▼'}{' '}
                    NPR {language === 'ne'
                      ? toNepaliDigits(Math.abs(rates.silverDailyChangeNpr).toLocaleString('en-IN'))
                      : Math.abs(rates.silverDailyChangeNpr).toLocaleString('en-IN')
                    }{' '}
                    ({rates.silverDailyChangePercent >= 0 ? `+${rates.silverDailyChangePercent}` : rates.silverDailyChangePercent}%)
                  </span>
                </div>

                {/* Decorative Sparkline Chart for Silver */}
                <svg
                  width="85"
                  height="42"
                  viewBox="0 0 92 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', right: 4, bottom: 4, pointerEvents: 'none', opacity: 0.9 }}
                >
                  <defs>
                    <linearGradient id="silverSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 2 36 Q 18 34 32 28 T 58 24 T 74 14 T 90 8 L 90 42 L 2 42 Z"
                    fill="url(#silverSparkGrad)"
                  />
                  <path
                    d="M 2 36 Q 18 34 32 28 T 58 24 T 74 14 T 90 8"
                    stroke="#94a3b8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

            </div>

            {/* Quick In-Card Gold Price Estimator matching image */}
            <div
              style={{
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '11px 13px',
                marginBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                <Calculator size={13} color="#059669" />
                <span>{t('Quick Gold Price Estimator (Tola)', 'Quick Gold Price Estimator (Tola)')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '12px' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>{t('Weight', 'Weight')}</span>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={calcTolas}
                  onChange={(e) => setCalcTolas(parseFloat(e.target.value) || 1)}
                  style={{
                    width: '46px',
                    padding: '5px 6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textAlign: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    color: '#0b2b5c',
                  }}
                />
                <span style={{ color: '#475569', fontWeight: 600 }}>{t('Tola =', 'Tola =')}</span>
                <strong style={{ fontSize: '14px', color: '#b45309', fontWeight: 900 }}>
                  NPR {language === 'ne' ? toNepaliDigits(quickGoldTotal.toLocaleString('en-IN')) : quickGoldTotal.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                  {t('(incl. making + VAT)', '(incl. making + VAT)')}
                </span>
              </div>
            </div>

            {/* Matching Full-width Action CTA with signature Blue Button Color */}
            <Link
              href="/gold"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0b2b5c',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                boxShadow: '0 4px 14px rgba(11, 43, 92, 0.25)',
              }}
              className="hover-lift btn-tactile"
            >
              <Coins size={15} />
              <span>{t('Gold & Silver Calculator →', 'Gold & Silver Calculator →')}</span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
