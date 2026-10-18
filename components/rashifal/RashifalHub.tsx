'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Star, 
  Calendar, 
  Share2, 
  Check, 
  Search, 
  ArrowRight, 
  ShieldCheck,
  Compass,
  Heart,
  Briefcase,
  Activity
} from 'lucide-react';
import { TODAY_RASHIFAL, RashiItem } from '@/lib/rashifalData';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { FAQAccordion } from '@/components/FAQAccordion';

export function RashifalHub() {
  const { language, t } = useLanguage();
  const [selectedRashiId, setSelectedRashiId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liveForecasts, setLiveForecasts] = useState<Record<string, string>>({});
  const [isLiveApiActive, setIsLiveApiActive] = useState<boolean>(false);

  // Fetch live daily horoscope from free horoscope API route
  React.useEffect(() => {
    let active = true;
    const signToFetch = selectedRashiId === 'all' ? 'aries' : selectedRashiId;
    async function loadLive() {
      try {
        const res = await fetch(`/api/horoscope?sign=${signToFetch}`);
        if (res.ok) {
          const json = await res.json();
          if (active && json?.data?.livePredictionEng) {
            setLiveForecasts(prev => ({ ...prev, [signToFetch]: json.data.livePredictionEng }));
            setIsLiveApiActive(Boolean(json.data.isLiveApi));
          }
        }
      } catch (err) {}
    }
    loadLive();
    return () => { active = false; };
  }, [selectedRashiId]);

  const filteredRashis = TODAY_RASHIFAL.filter((r) => {
    const matchesFilter = selectedRashiId === 'all' || r.id === selectedRashiId;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      r.nepaliName.includes(q) ||
      r.englishName.toLowerCase().includes(q) ||
      r.sanskritName.includes(q) ||
      r.predictionNep.includes(q) ||
      r.predictionEng.toLowerCase().includes(q);

    return matchesFilter && matchesQuery;
  });

  const handleShare = (rashi: RashiItem) => {
    const text = `🔮 आजको ${rashi.nepaliName} राशिफल (${rashi.englishName}):\n${rashi.predictionNep}\n🔢 शुभ अङ्क: ${rashi.luckyNumber} | 🎨 शुभ रङ्ग: ${rashi.luckyColorNep}\nनेपाल क्याल्क पात्रो: https://nepalcalc.com/rashifal`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(rashi.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const RASHIFAL_FAQS = [
    {
      question: "दैनिक राशिफल कसरी गणना गरिन्छ? (How is Daily Rashifal calculated?)",
      answer: "नेपाली वैदिक ज्योतिषशास्त्र अनुसार चन्द्रमाको दैनिक राशि गोचर (Moon Transit), नक्षत्रको स्थिति, तथा सूर्य सिद्धान्तका आधारमा प्रत्येक राशिका जातकहरूको दैनिक फलादेश, शुभ अङ्क, र शुभ रङ्ग निर्धारण गरिन्छ।",
    },
    {
      question: "१२ राशिको नाम र अङ्ग्रेजी नाम के-के हुन्?",
      answer: "१. मेष (Aries), २. वृष (Taurus), ३. मिथुन (Gemini), ४. कर्कट (Cancer), ५. सिंह (Leo), ६. कन्या (Virgo), ७. तुला (Libra), ८. वृश्चिक (Scorpio), ९. धनु (Sagittarius), १०. मकर (Capricorn), ११. कुम्भ (Aquarius), १२. मीन (Pisces)।",
    },
    {
      question: "आफ्नो नामको पहिलो अक्षरबाट राशि कसरी पत्ता लगाउने?",
      answer: "प्रत्येक राशिको नामाक्षर हुन्छ। जस्तै: 'चु, चे, चो, ला, लि, लु, ले, लो, अ' बाट सुरु हुने नाम मेष राशि, 'इ, उ, ए, ओ, वा, वि, वु, वे, वो' बाट सुरु हुने नाम वृष राशि हुन्छ। प्रत्येक राशिको विवरणमा सम्बन्धित नामाक्षर उल्लेख गरिएको छ।",
    },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Schema.org Structured Data for Google AEO & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "आजको दैनिक राशिफल (Daily Rashifal Nepal 2083)",
            "description": "नेपाल संवत् तथा विक्रम संवत् २०८३ आश्विन २५ गतेको १२ वटै राशिको विस्तृत दैनिक फलादेश, शुभ अङ्क र शुभ रङ्ग।",
            "datePublished": "2026-10-11T00:00:00+05:45",
            "dateModified": "2026-10-11T00:00:00+05:45",
            "author": {
              "@type": "Organization",
              "name": "NepalCalc Astrology Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "NepalCalc",
              "url": "https://nepalcalc.com"
            }
          })
        }}
      />

      {/* Top Breadcrumb & Header Banner */}
      <section 
        style={{ 
          backgroundColor: '#f7f4ed', 
          borderBottom: '1.5px solid #ebe5d8', 
          padding: 'clamp(32px, 4vw, 48px) 0 36px' 
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e7ded0', 
                  padding: '4px 12px', 
                  borderRadius: '9999px',
                  fontSize: '12px', 
                  fontWeight: 800, 
                  color: '#003893'
                }}
              >
                <Sparkles size={14} color="#f59e0b" />
                <span>{t('DAILY ASTROLOGICAL FORECAST', 'वैदिक ज्योतिष दैनिक फलादेश')}</span>
              </div>
              {isLiveApiActive && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#dcfce7',
                    border: '1px solid #86efac',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#166534'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                  <span>{t('Live Daily Horoscope API Active', 'प्रत्यक्ष दैनिक राशिफल API सक्रिय')}</span>
                </div>
              )}
            </div>

            <h1 
              style={{ 
                fontSize: 'clamp(28px, 4vw, 44px)', 
                fontWeight: 900, 
                color: '#0f172a', 
                margin: '0 0 10px',
                letterSpacing: '-0.02em' 
              }}
            >
              {t('आजको दैनिक राशिफल (Daily Rashifal)', 'आजको दैनिक राशिफल (Daily Rashifal)')}
            </h1>

            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 20px', lineHeight: 1.6 }}>
              {t(
                'Ashwin 25, 2083 (Sunday) • Ghatasthapana. Daily predictions, lucky numbers, colors, ruling planets, and remedies for all 12 Zodiac signs.',
                '२५ आश्विन २०८३, आइतबार (घटस्थापना)। मेषदेखि मीन सम्मका १२ वटै राशिका लागि आजको ग्रहगोचर, शुभ अङ्क, शुभ रङ्ग र दैनिक फलादेश।'
              )}
            </p>

            {/* Quick Filter Pill Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setSelectedRashiId('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border: '1px solid',
                  borderColor: selectedRashiId === 'all' ? '#003893' : '#cbd5e1',
                  backgroundColor: selectedRashiId === 'all' ? '#003893' : '#ffffff',
                  color: selectedRashiId === 'all' ? '#ffffff' : '#0f172a',
                  cursor: 'pointer'
                }}
              >
                {t('All 12 Signs', 'सबै १२ राशि')}
              </button>
              {TODAY_RASHIFAL.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRashiId(r.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: selectedRashiId === r.id ? '#003893' : '#cbd5e1',
                    backgroundColor: selectedRashiId === r.id ? '#003893' : '#ffffff',
                    color: selectedRashiId === r.id ? '#ffffff' : '#0f172a',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{r.symbol}</span>
                  <span>{language === 'ne' ? r.nepaliName : r.englishName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="container" style={{ paddingTop: '36px' }}>
        
        {/* Search Bar */}
        <div style={{ maxWidth: '540px', margin: '0 auto 32px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder={t('Search your sign or lucky sign (e.g. मेष, Leo, Aries)...', 'आफ्नो राशि खोज्नुहोस् (जस्तै: मेष, Leo, तुला)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 40px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        {/* 12 Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '24px',
            marginBottom: '48px' 
          }}
        >
          {filteredRashis.map((rashi) => (
            <div 
              key={rashi.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #ebe5d8',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              className="hover-lift"
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '6px', 
                        backgroundColor: '#f7f4ed', 
                        border: '1px solid #e7ded0', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '24px' 
                      }}
                    >
                      {rashi.symbol}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '19px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                        {rashi.nepaliName} ({rashi.englishName})
                      </h2>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {rashi.dates}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} fill={idx < rashi.rating ? '#f59e0b' : 'none'} color="#f59e0b" />
                    ))}
                  </div>
                </div>

                {/* Sanskrit Letters */}
                <div style={{ backgroundColor: '#f8fafc', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', color: '#475569', marginBottom: '14px' }}>
                  <strong>नामाक्षर:</strong> {rashi.sanskritName}
                </div>

                {/* 4 Attributes Matrix */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#faf7f2', padding: '6px 4px', borderRadius: '4px', border: '1px solid #ebe2d3' }}>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ अङ्क</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#003893' }}>{toNepaliDigits(rashi.luckyNumber)}</div>
                  </div>
                  <div style={{ backgroundColor: '#faf7f2', padding: '6px 4px', borderRadius: '4px', border: '1px solid #ebe2d3' }}>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ रङ्ग</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857' }}>{rashi.luckyColorNep}</div>
                  </div>
                  <div style={{ backgroundColor: '#faf7f2', padding: '6px 4px', borderRadius: '4px', border: '1px solid #ebe2d3' }}>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ दिशा</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7' }}>{rashi.luckyDirectionNep}</div>
                  </div>
                  <div style={{ backgroundColor: '#faf7f2', padding: '6px 4px', borderRadius: '4px', border: '1px solid #ebe2d3' }}>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>स्वामी</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#b45309' }}>{rashi.rulingPlanetNep}</div>
                  </div>
                </div>

                {/* Prediction Paragraph */}
                <p style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.6, margin: '0 0 14px' }}>
                  {language === 'ne' ? rashi.predictionNep : (liveForecasts[rashi.id] || rashi.predictionEng)}
                </p>

                {/* Live Forecast Box if available */}
                {liveForecasts[rashi.id] && (
                  <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#166534', marginBottom: '14px', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, marginBottom: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                      <span>{t('Live Daily Forecast (API)', 'प्रत्यक्ष दैनिक फलादेश (Live API)')}</span>
                    </div>
                    <p style={{ margin: 0, color: '#1e293b' }}>{liveForecasts[rashi.id]}</p>
                  </div>
                )}

                {/* Category Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <Briefcase size={14} color="#047857" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#334155' }}><strong>व्यापार / पेसा:</strong> {rashi.careerFinanceNep}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <Activity size={14} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#334155' }}><strong>स्वास्थ्य:</strong> {rashi.healthNep}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <Heart size={14} color="#e11d48" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#334155' }}><strong>प्रेम / परिवार:</strong> {rashi.loveFamilyNep}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  २५ आश्विन २०८३
                </span>
                <button
                  type="button"
                  onClick={() => handleShare(rashi)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: copiedId === rashi.id ? '#ecfdf5' : '#ffffff',
                    color: copiedId === rashi.id ? '#047857' : '#0f172a',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === rashi.id ? <Check size={13} color="#047857" /> : <Share2 size={13} />}
                  <span>{copiedId === rashi.id ? t('Copied!', 'कपि भयो!') : t('Share / Copy', 'साझा / कपि')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* FAQs */}
        <FAQAccordion items={RASHIFAL_FAQS} />
      </div>

    </div>
  );
}
