'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Compass, Sparkles, Star, ChevronRight, Sun, Moon } from 'lucide-react';

interface RashiInfo {
  id: string;
  nameNep: string;
  nameEng: string;
  icon: string;
  letters: string;
  luckyColor: string;
  luckyNumber: number;
  prediction: string;
  stars: number;
}

const RASHIFAL_DATA: RashiInfo[] = [
  {
    id: "mesh",
    nameNep: "मेष",
    nameEng: "Aries",
    icon: "♈",
    letters: "चु, चे, चो, ला, लि, लु, ले, लो, अ",
    luckyColor: "रातो (Red)",
    luckyNumber: 9,
    prediction: "रोकिएका काम बन्नेछन्। आर्थिक लाभ र व्यापारमा नयाँ सम्झौताको योग छ। परिवारको पूर्ण साथ मिल्नेछ।",
    stars: 5,
  },
  {
    id: "brish",
    nameNep: "वृष",
    nameEng: "Taurus",
    icon: "♉",
    letters: "इ, उ, ए, ओ, वा, वि, वु, वे, वो",
    luckyColor: "सेतो (White)",
    luckyNumber: 6,
    prediction: "प्रेम सम्बन्ध सुदृढ हुनेछ। लगानी गर्दा सतर्क रहनुहोला। विद्या र बौद्धिक क्षेत्रमा सफलता मिल्नेछ।",
    stars: 4,
  },
  {
    id: "mithun",
    nameNep: "मिथुन",
    nameEng: "Gemini",
    icon: "♊",
    letters: "का, कि, कु, घ, ङ, छ, के, को, हा",
    luckyColor: "हरियो (Green)",
    luckyNumber: 5,
    prediction: "नयाँ साथीभाइसँग भेटघाट हुनेछ। यात्राको सम्भावना छ। खानपानमा विशेष ध्यान दिनुहोला।",
    stars: 4,
  },
  {
    id: "karkat",
    nameNep: "कर्कट",
    nameEng: "Cancer",
    icon: "♋",
    letters: "हि, हु, हे, हो, डा, डि, डु, डे, डो",
    luckyColor: "दूधिया (Cream)",
    luckyNumber: 2,
    prediction: "मनमा शान्ति छाउनेछ। धार्मिक तथा सामाजिक कार्यमा रुचि बढ्नेछ। मातापिताको आशीर्वाद लाभदायक रहनेछ।",
    stars: 5,
  },
  {
    id: "singha",
    nameNep: "सिंह",
    nameEng: "Leo",
    icon: "♌",
    letters: "मा, मि, मु, मे, मो, टा, टि, टु, टे",
    luckyColor: "पहेंलो (Golden)",
    luckyNumber: 1,
    prediction: "कार्यक्षेत्रमा नेतृत्व क्षमता प्रशंसा हुनेछ। बोलीको प्रभाव बढ्नेछ। आर्थिक पक्ष सबल रहनेछ।",
    stars: 5,
  },
  {
    id: "kanya",
    nameNep: "कन्या",
    nameEng: "Virgo",
    icon: "♍",
    letters: "टो, पा, पि, पु, ष, ण, ठ, पे, पो",
    luckyColor: "हरियो (Green)",
    luckyNumber: 5,
    prediction: "रोकिएको धन फिर्ता हुन सक्छ। विद्यार्थीहरूको अध्ययनमा प्रगति हुनेछ। मानसिक एकाग्रता बढ्नेछ।",
    stars: 4,
  },
  {
    id: "tula",
    nameNep: "तुला",
    nameEng: "Libra",
    icon: "♎",
    letters: "रा, रि, रु, रे, रो, ता, ति, तु, ते",
    luckyColor: "गुलाबी (Pink)",
    luckyNumber: 7,
    prediction: "साझेदारी कामबाट मनग्ये फाइदा हुनेछ। सौन्दर्य र मनोरञ्जनमा खर्च बढ्न सक्छ। दिन फलदायी रहनेछ।",
    stars: 4,
  },
  {
    id: "brischik",
    nameNep: "वृश्चिक",
    nameEng: "Scorpio",
    icon: "♏",
    letters: "तो, ना, नि, नु, ने, नो, या, यि, यु",
    luckyColor: "गाढा रातो (Maroon)",
    luckyNumber: 8,
    prediction: "शत्रु परास्त हुनेछन्। महत्वपूर्ण निर्णय लिँदा अग्रजको सल्लाह लिनु बुद्धिमानी हुनेछ।",
    stars: 4,
  },
  {
    id: "dhanu",
    nameNep: "धनु",
    nameEng: "Sagittarius",
    icon: "♐",
    letters: "ये, यो, भा, भि, भु, धा, फा, ढा, भे",
    luckyColor: "पहेंलो (Yellow)",
    luckyNumber: 3,
    prediction: "भाग्यको साथ रहनेछ। दीर्घकालीन योजनाहरू अघि बढ्नेछन्। मन प्रसन्न र उत्साहित रहनेछ।",
    stars: 5,
  },
  {
    id: "makar",
    nameNep: "मकर",
    nameEng: "Capricorn",
    icon: "♑",
    letters: "भो, जा, जि, खि, खु, खे, खो, गा, गि",
    luckyColor: "निलो (Blue)",
    luckyNumber: 4,
    prediction: "मेहनतको उचित प्रतिफल मिल्नेछ। भौतिक साधनमा वृद्धि हुनेछ। स्वास्थ्यमा सुधार आउनेछ।",
    stars: 4,
  },
  {
    id: "kumbha",
    nameNep: "कुम्भ",
    nameEng: "Aquarius",
    icon: "♒",
    letters: "गु, गे, गो, सा, सि, सु, से, सो, दा",
    luckyColor: "आसमानी (Sky Blue)",
    luckyNumber: 11,
    prediction: "नयाँ अवसरहरू हात लाग्नेछन्। साथीभाइको सहयोगले जटिल काम सजिलै सम्पन्न हुनेछ।",
    stars: 5,
  },
  {
    id: "meen",
    nameNep: "मीन",
    nameEng: "Pisces",
    icon: "♓",
    letters: "दि, दु, थ, झ, ञ, दे, दो, चा, चि",
    luckyColor: "सुन्तला (Orange)",
    luckyNumber: 3,
    prediction: "आध्यात्मिक चिन्तन बढ्नेछ। टाढाको यात्रा वा अध्ययनका लागि अनुकूल समय छ।",
    stars: 5,
  },
];

export function HeroPatroRashifal() {
  const [selectedRashi, setSelectedRashi] = useState<string>("mesh");
  const [activeTab, setActiveTab] = useState<"patro" | "rashifal">("patro");

  const currentRashi = RASHIFAL_DATA.find((r) => r.id === selectedRashi) || RASHIFAL_DATA[0];

  return (
    <div
      style={{
        background: 'rgba(20, 36, 29, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '6px',
        padding: '20px',
        color: '#ffffff',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
        textAlign: 'left',
      }}
    >
      {/* Top Toggle Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab("patro")}
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            background: activeTab === "patro" ? '#f59e0b' : 'transparent',
            color: activeTab === "patro" ? '#0f172a' : '#cbd5e1',
            border: activeTab === "patro" ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer',
          }}
        >
          📅 नेपाली पात्रो (Today Patro)
        </button>
        <button
          onClick={() => setActiveTab("rashifal")}
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            background: activeTab === "rashifal" ? '#f59e0b' : 'transparent',
            color: activeTab === "rashifal" ? '#0f172a' : '#cbd5e1',
            border: activeTab === "rashifal" ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer',
          }}
        >
          ⭐ दैनिक राशिफल (Horoscope)
        </button>
      </div>

      {activeTab === "patro" ? (
        <div>
          {/* Today's Patro Card */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                आजको पञ्चाङ्ग • OFFICIAL NEPAL CALENDAR
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '2px', letterSpacing: '-0.02em' }}>
                २०८३ आश्विन २५ गते, आइतबार
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                Sunday, 11 October 2026 • शरद् ऋतु
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '8px 12px', borderRadius: '4px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fbbf24' }}>२५</div>
              <div style={{ fontSize: '10px', color: '#fef08a', textTransform: 'uppercase' }}>आश्विन BS</div>
            </div>
          </div>

          {/* Tithi, Sun, Moon Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '4px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>तिथी (Tithi)</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>एकादशी / द्वादशी</span>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>सूर्योदय / सूर्यास्त</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>०६:०४ / १७:३८</span>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>नक्षत्र (Nakshatra)</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>शतभिषा</span>
            </div>
          </div>

          <Link
            href="/date"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#f59e0b',
              textDecoration: 'none',
            }}
          >
            <span>Exact Age Finder & Date Converter (BS ⇄ AD)</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      ) : (
        <div>
          {/* 12 Rashi Horizontal Pill Scroller */}
          <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
            {RASHIFAL_DATA.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRashi(r.id)}
                style={{
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: selectedRashi === r.id ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)',
                  color: selectedRashi === r.id ? '#0f172a' : '#ffffff',
                  border: selectedRashi === r.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{r.icon} {r.nameNep}</span>
              </button>
            ))}
          </div>

          {/* Selected Rashi Forecast Details */}
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '14px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{currentRashi.icon}</span>
                <span style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>{currentRashi.nameNep} ({currentRashi.nameEng})</span>
              </div>
              <div style={{ color: '#fbbf24', fontSize: '12px' }}>
                {'★'.repeat(currentRashi.stars)}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '1.5', marginBottom: '10px' }}>
              {currentRashi.prediction}
            </p>

            <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px' }}>
              <span>शुभ रङ्ग: <strong style={{ color: '#ffffff' }}>{currentRashi.luckyColor}</strong></span>
              <span>शुभ अङ्क: <strong style={{ color: '#f59e0b' }}>{currentRashi.luckyNumber}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
