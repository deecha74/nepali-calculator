'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldAlert,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { TRAFFIC_SIGNS_DATA, TrafficSignItem, SignCategory } from '@/lib/trafficSignsData';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';

export function TrafficSignSvg({ sign, size = 84 }: { sign: TrafficSignItem; size?: number }) {
  const { shape, symbolType } = sign;

  // 1. STOP Octagon
  if (shape === 'octagon') {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <polygon
          points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30"
          fill="#dc2626"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <polygon
          points="32,10 68,10 90,32 90,68 68,90 32,90 10,68 10,32"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="50" y="57" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">
          STOP
        </text>
      </svg>
    );
  }

  // 2. Give Way Inverted Triangle
  if (shape === 'inverted-triangle') {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <polygon
          points="8,14 92,14 50,90"
          fill="#ffffff"
          stroke="#dc2626"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 3. Blue Mandatory Circle
  if (shape === 'circle-blue') {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="42" fill="#003893" stroke="#ffffff" strokeWidth="3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        {symbolType === 'KEEP_LEFT' && (
          <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="64" y1="34" x2="36" y2="64" />
            <polyline points="36,44 36,64 56,64" />
          </g>
        )}
        {symbolType === 'AHEAD_ONLY' && (
          <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="50" y1="72" x2="50" y2="28" />
            <polyline points="34,44 50,28 66,44" />
          </g>
        )}
      </svg>
    );
  }

  // 4. Red Regulatory / Prohibitory Circle
  if (shape === 'circle-red') {
    if (symbolType === 'NO_ENTRY') {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="42" fill="#dc2626" />
          <rect x="20" y="42" width="60" height="16" rx="3" fill="#ffffff" />
        </svg>
      );
    }

    if (symbolType === 'NO_STOPPING') {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="40" fill="#1d4ed8" stroke="#dc2626" strokeWidth="10" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="9" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#dc2626" strokeWidth="9" />
        </svg>
      );
    }

    if (symbolType === 'NO_PARKING') {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="40" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="50" y="64" textAnchor="middle" fill="#0f172a" fontSize="42" fontWeight="900" fontFamily="sans-serif">
            P
          </text>
          <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="8" />
        </svg>
      );
    }

    if (symbolType === 'SPEED_40' || symbolType === 'SPEED_60' || symbolType === 'WEIGHT_5T') {
      const label = symbolType === 'SPEED_40' ? '40' : symbolType === 'SPEED_60' ? '60' : '5T';
      return (
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="40" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="50" y="62" textAnchor="middle" fill="#0f172a" fontSize="34" fontWeight="900" fontFamily="sans-serif">
            {label}
          </text>
        </svg>
      );
    }

    // Standard white circle with red border and slash
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="40" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
        {symbolType === 'NO_STRAIGHT' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="50" y1="72" x2="50" y2="28" />
            <polyline points="36,42 50,28 64,42" />
          </g>
        )}
        {symbolType === 'NO_LEFT' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M58,70 L58,44 L32,44" />
            <polyline points="42,34 32,44 42,54" />
          </g>
        )}
        {symbolType === 'NO_RIGHT' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M42,70 L42,44 L68,44" />
            <polyline points="58,34 68,44 58,54" />
          </g>
        )}
        {symbolType === 'NO_UTURN' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M62,68 L62,42 A12,12 0 0,0 38,42 L38,64" />
            <polyline points="29,55 38,65 47,55" />
          </g>
        )}
        {symbolType === 'NO_OVERTAKE' && (
          <g>
            <rect x="28" y="44" width="18" height="22" rx="4" fill="#dc2626" />
            <rect x="54" y="44" width="18" height="22" rx="4" fill="#0f172a" />
          </g>
        )}
        {symbolType === 'NO_HORN' && (
          <g fill="#0f172a">
            <path d="M28,46 L42,46 L62,34 L62,66 L42,54 L28,54 Z" />
            <circle cx="28" cy="50" r="5" />
          </g>
        )}
        <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="8" />
      </svg>
    );
  }

  // 5. Red Warning Triangle
  if (shape === 'triangle-red') {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <polygon
          points="50,10 92,86 8,86"
          fill="#ffffff"
          stroke="#dc2626"
          strokeWidth="9"
          strokeLinejoin="round"
        />
        {symbolType === 'CURVE_LEFT' && (
          <path d="M58,76 L58,56 Q58,44 42,44 L34,44 M42,37 L33,44 L42,51" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {symbolType === 'CURVE_RIGHT' && (
          <path d="M42,76 L42,56 Q42,44 58,44 L66,44 M58,37 L67,44 L58,51" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {symbolType === 'DOUBLE_BEND' && (
          <path d="M44,76 L44,62 L56,52 L56,38" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {symbolType === 'CROSSROAD' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round">
            <line x1="50" y1="38" x2="50" y2="76" />
            <line x1="32" y1="57" x2="68" y2="57" />
          </g>
        )}
        {symbolType === 'T_JUNCTION' && (
          <g stroke="#0f172a" strokeWidth="6" strokeLinecap="round">
            <line x1="50" y1="46" x2="50" y2="76" />
            <line x1="32" y1="46" x2="68" y2="46" />
          </g>
        )}
        {symbolType === 'ROUNDABOUT' && (
          <circle cx="50" cy="60" r="13" stroke="#0f172a" strokeWidth="5" strokeDasharray="16 6" fill="none" />
        )}
        {symbolType === 'TRAFFIC_LIGHT' && (
          <g>
            <rect x="43" y="36" width="14" height="40" rx="4" fill="#0f172a" />
            <circle cx="50" cy="44" r="4" fill="#ef4444" />
            <circle cx="50" cy="56" r="4" fill="#f59e0b" />
            <circle cx="50" cy="68" r="4" fill="#10b981" />
          </g>
        )}
        {symbolType === 'ZEBRA' && (
          <g stroke="#0f172a" strokeWidth="4" strokeLinecap="round">
            <circle cx="50" cy="42" r="4" fill="#0f172a" stroke="none" />
            <line x1="50" y1="47" x2="50" y2="62" />
            <line x1="50" y1="62" x2="43" y2="74" />
            <line x1="50" y1="62" x2="57" y2="74" />
            <line x1="32" y1="78" x2="68" y2="78" strokeDasharray="4 4" />
          </g>
        )}
        {symbolType === 'SCHOOL' && (
          <g fill="#0f172a">
            <circle cx="44" cy="46" r="4" />
            <circle cx="57" cy="50" r="3.5" />
            <rect x="40" y="52" width="8" height="18" rx="3" />
            <rect x="54" y="55" width="7" height="15" rx="3" />
          </g>
        )}
        {symbolType === 'NARROW_ROAD' && (
          <g stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M36,76 L36,62 L44,50 L44,38" />
            <path d="M64,76 L64,62 L56,50 L56,38" />
          </g>
        )}
        {symbolType === 'NARROW_BRIDGE' && (
          <g stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M34,38 L44,52 L44,64 L34,76" />
            <path d="M66,38 L56,52 L56,64 L66,76" />
          </g>
        )}
        {symbolType === 'STEEP_UP' && (
          <g>
            <polygon points="26,78 72,78 72,46" fill="#0f172a" />
          </g>
        )}
        {symbolType === 'STEEP_DOWN' && (
          <g>
            <polygon points="28,46 28,78 74,78" fill="#0f172a" />
          </g>
        )}
        {symbolType === 'ROAD_WORK' && (
          <g fill="#0f172a">
            <circle cx="46" cy="44" r="4" />
            <path d="M42,50 L52,50 L48,72 L38,72 Z" />
            <polygon points="54,76 68,76 61,64" />
          </g>
        )}
        {symbolType === 'BUMP' && (
          <path d="M28,74 L38,74 Q50,52 62,74 L72,74" stroke="#0f172a" strokeWidth="6" fill="#0f172a" strokeLinecap="round" />
        )}
        {symbolType === 'ROCKS' && (
          <g fill="#0f172a">
            <polygon points="68,36 68,78 44,78" />
            <circle cx="38" cy="62" r="3.5" />
            <circle cx="44" cy="52" r="3" />
            <circle cx="34" cy="72" r="4" />
          </g>
        )}
        {symbolType === 'TWO_WAY' && (
          <g stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="42" y1="74" x2="42" y2="42" />
            <polyline points="36,50 42,42 48,50" />
            <line x1="58" y1="42" x2="58" y2="74" />
            <polyline points="52,66 58,74 64,66" />
          </g>
        )}
      </svg>
    );
  }

  // 6. Blue Informative Square
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="10" y="10" width="80" height="80" rx="12" fill="#003893" />
      <rect x="20" y="20" width="60" height="60" rx="6" fill="#ffffff" />
      {symbolType === 'PARKING' && (
        <text x="50" y="65" textAnchor="middle" fill="#003893" fontSize="44" fontWeight="900" fontFamily="sans-serif">
          P
        </text>
      )}
      {symbolType === 'HOSPITAL' && (
        <g>
          <text x="50" y="54" textAnchor="middle" fill="#003893" fontSize="28" fontWeight="900" fontFamily="sans-serif">
            H
          </text>
          <rect x="46" y="58" width="8" height="16" fill="#dc2626" />
          <rect x="42" y="62" width="16" height="8" fill="#dc2626" />
        </g>
      )}
      {symbolType === 'FIRST_AID' && (
        <g fill="#dc2626">
          <rect x="43" y="28" width="14" height="44" rx="2" />
          <rect x="28" y="43" width="44" height="14" rx="2" />
        </g>
      )}
      {symbolType === 'FUEL' && (
        <g fill="#0f172a">
          <rect x="34" y="30" width="24" height="40" rx="3" />
          <rect x="38" y="35" width="16" height="12" fill="#ffffff" />
          <path d="M58,38 L66,44 L66,64" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )}
      {symbolType === 'BUS_STOP' && (
        <g fill="#003893">
          <rect x="30" y="30" width="40" height="34" rx="5" />
          <rect x="35" y="35" width="30" height="12" fill="#ffffff" />
          <circle cx="38" cy="68" r="5" fill="#0f172a" />
          <circle cx="62" cy="68" r="5" fill="#0f172a" />
        </g>
      )}
      {symbolType === 'WORKSHOP' && (
        <g stroke="#0f172a" strokeWidth="7" strokeLinecap="round">
          <line x1="34" y1="66" x2="64" y2="36" />
          <circle cx="64" cy="36" r="7" fill="#ffffff" stroke="#0f172a" strokeWidth="5" />
        </g>
      )}
      {symbolType === 'FOOD' && (
        <g stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round">
          <line x1="40" y1="30" x2="40" y2="70" />
          <line x1="35" y1="30" x2="45" y2="30" />
          <line x1="60" y1="30" x2="60" y2="70" />
          <ellipse cx="60" cy="38" rx="5" ry="8" fill="#0f172a" />
        </g>
      )}
      {symbolType === 'ONE_WAY' && (
        <g stroke="#003893" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="50" y1="70" x2="50" y2="30" />
          <polyline points="36,44 50,30 64,44" />
        </g>
      )}
      {symbolType === 'DEAD_END' && (
        <g>
          <rect x="44" y="38" width="12" height="34" fill="#003893" />
          <rect x="30" y="28" width="40" height="10" fill="#dc2626" />
        </g>
      )}
    </svg>
  );
}

export function TrafficSignsGallery() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const [selectedCategory, setSelectedCategory] = useState<'all' | SignCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const filteredSigns = useMemo(() => {
    return TRAFFIC_SIGNS_DATA.filter((sign) => {
      if (selectedCategory !== 'all' && sign.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          sign.nameEn.toLowerCase().includes(q) ||
          sign.nameNe.toLowerCase().includes(q) ||
          sign.descEn.toLowerCase().includes(q) ||
          sign.descNe.toLowerCase().includes(q) ||
          sign.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatNum = (n: number) => (isNe ? toNepaliDigits(n) : String(n));

  const categoryTabs: {
    id: 'all' | SignCategory;
    labelEn: string;
    labelNe: string;
    color: string;
    bgActive: string;
    borderActive: string;
    count: number;
  }[] = [
    {
      id: 'all',
      labelEn: 'All Traffic Signs',
      labelNe: 'सबै ट्राफिक चिन्हहरू',
      color: '#003893',
      bgActive: '#eff6ff',
      borderActive: '#003893',
      count: TRAFFIC_SIGNS_DATA.length
    },
    {
      id: 'regulatory',
      labelEn: 'Regulatory Signs',
      labelNe: 'आदेशात्मक चिन्ह',
      color: '#dc2626',
      bgActive: '#fef2f2',
      borderActive: '#dc2626',
      count: TRAFFIC_SIGNS_DATA.filter((s) => s.category === 'regulatory').length
    },
    {
      id: 'warning',
      labelEn: 'Warning Signs',
      labelNe: 'सचेतक चिन्ह',
      color: '#d97706',
      bgActive: '#fffbeb',
      borderActive: '#d97706',
      count: TRAFFIC_SIGNS_DATA.filter((s) => s.category === 'warning').length
    },
    {
      id: 'informative',
      labelEn: 'Informative Signs',
      labelNe: 'सूचनामूलक चिन्ह',
      color: '#0284c7',
      bgActive: '#f0f9ff',
      borderActive: '#0284c7',
      count: TRAFFIC_SIGNS_DATA.filter((s) => s.category === 'informative').length
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* LikhitExam Centered Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 6px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '12px'
          }}
        >
          {t('Essential Road Knowledge', 'सडक सुरक्षाको आधारभूत ज्ञान')}
        </div>
        <h1
          style={{
            fontSize: 'clamp(26px, 3.8vw, 38px)',
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.22,
            margin: '0 0 12px'
          }}
        >
          {t('Nepal ', 'नेपाल ')}
          <span style={{ color: '#003893', position: 'relative', display: 'inline-block' }}>
            {t('Traffic Signs Guide', 'ट्राफिक चिन्ह गाइड')}
            <svg
              style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '11px' }}
              viewBox="0 0 358 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path d="M3 9C118.957 4.47226 184.456 -1.86658 355 9" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, lineHeight: 1.55 }}>
          {t(
            'Master official Mandatory, Warning, and Informative road signs with crisp vector diagrams and flashcards.',
            'आदेशात्मक, सचेतक र सूचनामूलक आधिकारिक सडक चिन्हहरू स्पष्ट चित्र र फ्ल्यासकार्ड मार्फत सिक्नुहोस्।'
          )}
        </p>
      </div>

      {/* Main Filter & Signs Card */}
      <div
        className="white-card"
        style={{
          padding: '28px 24px',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)'
        }}
      >
        {/* Top Filter Row & Search / Flashcard Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '24px',
            paddingBottom: '20px',
            borderBottom: '1px solid #f1f5f9'
          }}
        >
          {/* Category Filter Buttons (Like likhitexam.com/traffic-signs) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isActive ? tab.borderActive : '#cbd5e1'}`,
                    backgroundColor: isActive ? tab.bgActive : '#ffffff',
                    color: isActive ? tab.color : '#475569',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{isNe ? tab.labelNe : tab.labelEn}</span>
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#ffffff' : '#f1f5f9',
                      color: isActive ? tab.color : '#64748b',
                      fontSize: '11px',
                      fontWeight: 900
                    }}
                  >
                    {formatNum(tab.count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Flashcard Memory Mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '210px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search road signs...', 'ट्राफिक चिन्ह खोज्नुहोस्...')}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setQuizMode((prev) => !prev);
                setRevealedIds({});
              }}
              style={{
                padding: '9px 14px',
                borderRadius: '10px',
                border: quizMode ? '1.5px solid #003893' : '1.5px solid #cbd5e1',
                backgroundColor: quizMode ? '#eff6ff' : '#f8fafc',
                color: quizMode ? '#003893' : '#334155',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {quizMode ? <Eye size={15} /> : <EyeOff size={15} />}
              <span>{quizMode ? t('Show All Names', 'सबै नाम देखाउनुहोस्') : t('Flashcard Test Mode', 'फ्ल्यासकार्ड अभ्यास')}</span>
            </button>
          </div>
        </div>

        {/* Signs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredSigns.map((sign) => {
            const isHidden = quizMode && !revealedIds[sign.id];
            const badgeStyle =
              sign.category === 'regulatory'
                ? { bg: '#fef2f2', color: '#dc2626', label: t('Regulatory', 'आदेशात्मक') }
                : sign.category === 'warning'
                  ? { bg: '#fffbeb', color: '#d97706', label: t('Warning', 'सचेतक') }
                  : { bg: '#f0f9ff', color: '#0284c7', label: t('Informative', 'सूचनामूलक') };

            return (
              <div
                key={sign.id}
                onClick={() => quizMode && toggleReveal(sign.id)}
                style={{
                  padding: '18px 16px',
                  borderRadius: '16px',
                  border: '1.5px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: quizMode ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
                }}
                className="hover-lift"
              >
                {/* Top Category & Code Strip */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.color
                    }}
                  >
                    {badgeStyle.label}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {sign.code}
                  </span>
                </div>

                {/* SVG Sign Illustration */}
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px'
                  }}
                >
                  <TrafficSignSvg sign={sign} />
                </div>

                {/* Title & Meaning (or Flashcard Reveal Button) */}
                {isHidden ? (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#eff6ff',
                      border: '1px dashed #93c5fd',
                      color: '#003893',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      width: '100%',
                      marginTop: 'auto'
                    }}
                  >
                    {t('Tap to Reveal Sign Meaning', 'अर्थ हेर्न यहाँ थिच्नुहोस्')}
                  </div>
                ) : (
                  <div style={{ marginTop: 'auto' }}>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.3 }}>
                      {isNe ? sign.nameNe : sign.nameEn}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                      {isNe ? sign.descNe : sign.descEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Counter Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          {t('Showing', 'देखाइँदैछ')} <strong>{formatNum(filteredSigns.length)}</strong> {t('of', 'मध्ये')}{' '}
          <strong>{formatNum(TRAFFIC_SIGNS_DATA.length)}</strong> {t('official DoTM traffic signs', 'आधिकारिक ट्राफिक चिन्हहरू')}
        </div>
      </div>

      {/* How to Master Traffic Signs Quickly — Shape Recognition Guide */}
      <div
        className="white-card"
        style={{
          padding: '24px',
          borderRadius: '18px',
          border: '1.5px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Sparkles size={18} color="#003893" />
          <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            {t('3-Second Shape Rule to Master Traffic Signs', 'आकारबाटै ३ सेकेन्डमा ट्राफिक चिन्ह चिन्ने सजिलो तरिका')}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#dc2626', marginBottom: '4px' }}>
              ⭕ {t('Circle = Mandatory Rule / Order', 'गोलाकार (वृत्त) = अनिवार्य नियम वा निषेध')}
            </div>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              {t(
                'Red circles indicate strict prohibitions (what you MUST NOT do). Blue circles indicate compulsory actions (what you MUST do).',
                'रातो घेराले गर्न नहुने निषेधात्मक नियम जनाउँछ भने नीलो वृत्तले अनिवार्य पालना गर्नुपर्ने आदेश जनाउँछ।'
              )}
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#d97706', marginBottom: '4px' }}>
              🔺 {t('Triangle = Hazard Warning Ahead', 'त्रिकोण = अगाडि खतरा वा सचेतक चेतावनी')}
            </div>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              {t(
                'Upward-pointing red triangles warn you of upcoming road hazards (sharp bends, narrow bridges, schools). Inverted triangle means Give Way.',
                'माथि फर्किएको रातो त्रिकोणले आगामी बाटोको अवस्थाबारे सचेत गराउँछ। उल्टो त्रिकोणले बाटो दिनुहोस् (Give Way) बुझाउँछ।'
              )}
            </p>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#ffffff', border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0284c7', marginBottom: '4px' }}>
              🟦 {t('Square / Rectangle = Information', 'चारपाटे (आयातकार) = सुविधा र दिशा जानकारी')}
            </div>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              {t(
                'Blue or green rectangular signs provide helpful roadside facility information (Hospital, Petrol Pump, Parking, One-Way).',
                'नीलो वा हरियो चारपाटे चिन्हहरूले अस्पताल, पेट्रोल पम्प, पार्किङ र दिशाको जानकारी दिन्छन्।'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

