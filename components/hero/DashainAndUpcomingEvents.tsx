'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
  ChevronRight,
  Bell,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface FestivalMilestone {
  titleNep: string;
  titleEng: string;
  bsDateNep: string;
  bsDateEng: string;
  adDateNep: string;
  adDateEng: string;
  isHoliday: boolean;
  statusNep: string;
  statusEng: string;
  daysRemaining?: number;
  highlight?: boolean;
}

const DASHAIN_DAYS: FestivalMilestone[] = [
  {
    titleNep: "घटस्थापना",
    titleEng: "Ghatasthapana",
    bsDateNep: "आश्विन २५",
    bsDateEng: "Ashwin 25",
    adDateNep: "अक्टोबर ११, २०२६",
    adDateEng: "Oct 11, 2026",
    isHoliday: true,
    statusNep: "आज (Active)",
    statusEng: "Today (Active)",
    highlight: true,
  },
  {
    titleNep: "फूलपाती (दशैँ)",
    titleEng: "Phulpati (Dashain)",
    bsDateNep: "आश्विन ३१",
    bsDateEng: "Ashwin 31",
    adDateNep: "अक्टोबर १७, २०२६",
    adDateEng: "Oct 17, 2026",
    isHoliday: true,
    statusNep: "६ दिनपछि",
    statusEng: "In 6 days",
    daysRemaining: 6,
  },
  {
    titleNep: "महाअष्टमी (दशैँ)",
    titleEng: "Maha Ashtami",
    bsDateNep: "कार्तिक १",
    bsDateEng: "Kartik 1",
    adDateNep: "अक्टोबर १८, २०२६",
    adDateEng: "Oct 18, 2026",
    isHoliday: true,
    statusNep: "७ दिनपछि",
    statusEng: "In 7 days",
    daysRemaining: 7,
  },
  {
    titleNep: "महानवमी (दशैँ)",
    titleEng: "Maha Navami",
    bsDateNep: "कार्तिक ३",
    bsDateEng: "Kartik 3",
    adDateNep: "अक्टोबर २०, २०२६",
    adDateEng: "Oct 20, 2026",
    isHoliday: true,
    statusNep: "९ दिनपछि",
    statusEng: "In 9 days",
    daysRemaining: 9,
  },
  {
    titleNep: "विजया दशमी (दशैँ)",
    titleEng: "Vijaya Dashami",
    bsDateNep: "कार्तिक ४",
    bsDateEng: "Kartik 4",
    adDateNep: "अक्टोबर २१, २०२६",
    adDateEng: "Oct 21, 2026",
    isHoliday: true,
    statusNep: "१० दिनपछि",
    statusEng: "In 10 days",
    daysRemaining: 10,
  },
];

interface UpcomingEvent {
  bsDateNep: string;
  bsDateEng: string;
  bsMonthNep: string;
  bsMonthEng: string;
  titleNep: string;
  titleEng: string;
  dayTextNep: string;
  dayTextEng: string;
  isHoliday: boolean;
  countdownNep: string;
  countdownEng: string;
  slug: string;
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    bsDateNep: "२५",
    bsDateEng: "25",
    bsMonthNep: "आश्विन",
    bsMonthEng: "Ashwin",
    titleNep: "घटस्थापना",
    titleEng: "Ghatasthapana",
    dayTextNep: "आइत, ११ अक्टोबर",
    dayTextEng: "Sun, 11 Oct",
    isHoliday: true,
    countdownNep: "आज",
    countdownEng: "Today",
    slug: "/date",
  },
  {
    bsDateNep: "३१",
    bsDateEng: "31",
    bsMonthNep: "आश्विन",
    bsMonthEng: "Ashwin",
    titleNep: "फूलपाती (दशैँ)",
    titleEng: "Phulpati (Dashain)",
    dayTextNep: "शनि, १७ अक्टोबर",
    dayTextEng: "Sat, 17 Oct",
    isHoliday: true,
    countdownNep: "६ दिनपछि",
    countdownEng: "In 6 days",
    slug: "/date",
  },
  {
    bsDateNep: "१",
    bsDateEng: "1",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "महाअष्टमी (दशैँ)",
    titleEng: "Maha Ashtami (Dashain)",
    dayTextNep: "आइत, १८ अक्टोबर",
    dayTextEng: "Sun, 18 Oct",
    isHoliday: true,
    countdownNep: "७ दिनपछि",
    countdownEng: "In 7 days",
    slug: "/date",
  },
  {
    bsDateNep: "३",
    bsDateEng: "3",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "महानवमी (दशैँ)",
    titleEng: "Maha Navami (Dashain)",
    dayTextNep: "मंगलबार, २० अक्टोबर",
    dayTextEng: "Tue, 20 Oct",
    isHoliday: true,
    countdownNep: "९ दिनपछि",
    countdownEng: "In 9 days",
    slug: "/date",
  },
  {
    bsDateNep: "४",
    bsDateEng: "4",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "विजया दशमी (दशैँ)",
    titleEng: "Vijaya Dashami (Tika)",
    dayTextNep: "बुधबार, २१ अक्टोबर",
    dayTextEng: "Wed, 21 Oct",
    isHoliday: true,
    countdownNep: "१० दिनपछि",
    countdownEng: "In 10 days",
    slug: "/date",
  },
  {
    bsDateNep: "८",
    bsDateEng: "8",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "कोजाग्रत पूर्णिमा",
    titleEng: "Kojagrat Purnima",
    dayTextNep: "आइतबार, २५ अक्टोबर",
    dayTextEng: "Sun, 25 Oct",
    isHoliday: false,
    countdownNep: "१४ दिनपछि",
    countdownEng: "In 14 days",
    slug: "/date",
  },
  {
    bsDateNep: "१५",
    bsDateEng: "15",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "लक्ष्मी पूजा (तिहार)",
    titleEng: "Laxmi Puja (Deepawali)",
    dayTextNep: "आइतबार, ०१ नोभेम्बर",
    dayTextEng: "Sun, 01 Nov",
    isHoliday: true,
    countdownNep: "२१ दिनपछि",
    countdownEng: "In 21 days",
    slug: "/date",
  },
  {
    bsDateNep: "१७",
    bsDateEng: "17",
    bsMonthNep: "कार्तिक",
    bsMonthEng: "Kartik",
    titleNep: "भाइटीका (तिहार)",
    titleEng: "Bhai Tika (Kija Puja)",
    dayTextNep: "मंगलबार, ०३ नोभेम्बर",
    dayTextEng: "Tue, 03 Nov",
    isHoliday: true,
    countdownNep: "२३ दिनपछि",
    countdownEng: "In 23 days",
    slug: "/date",
  },
];

export function DashainAndUpcomingEvents() {
  const [copied, setCopied] = useState(false);
  const [eventFilter, setEventFilter] = useState<'all' | 'holidays'>('all');
  const { language, t } = useLanguage();

  const displayEvents = (eventFilter === 'all'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.isHoliday)
  ).slice(0, 5);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText("https://nepalcalc.com/date");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section style={{ backgroundColor: 'transparent', padding: 'clamp(28px, 4vw, 44px) 0' }}>
      <div className="container">

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}
        >

          {/* LEFT CARD: चाडपर्वको समय - दशैँ २०८३ Celebration Hub */}
          <div
            data-aos="fade-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* Header Art Banner */}
            <div
              style={{
                position: 'relative',
                height: '150px',
                width: '100%',
                backgroundColor: '#eff6ff',
                borderBottom: '1.5px solid #e2e8f0'
              }}
            >
              <Image
                src="/dashain-banner.jpg"
                alt="Dashain 2083 Festival Artwork"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.4) 50%, rgba(255,253,250,0.1) 100%)'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', marginBottom: '4px' }}>
                    <Sparkles size={12} />
                    <span>{t('FESTIVAL SEASON', 'चाडपर्वको समय')}</span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#003893', margin: 0 }}>
                    {t('Dashain 2083', 'दशैँ २०८३')}
                  </h3>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#78350f' }}>
                    {t('Family, Faith & New Beginnings', 'परिवार, आस्था र नयाँ सुरुवात')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#dc2626', display: 'block' }}>
                    {t('Today', 'आज')}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                    {t('Ghatasthapana', 'घटस्थापनासम्म')}
                  </span>
                </div>
              </div>
            </div>

            {/* Festival Milestone Cards Grid */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px',
                  marginBottom: '20px'
                }}
              >
                {DASHAIN_DAYS.map((d) => (
                  <div
                    key={d.titleEng}
                    style={{
                      padding: '12px',
                      backgroundColor: d.highlight ? '#eff6ff' : '#ffffff',
                      border: d.highlight ? '1.5px solid #003893' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: d.highlight ? '#003893' : '#0f172a', marginBottom: '6px' }}>
                        {language === 'ne' ? d.titleNep : d.titleEng}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                        {language === 'ne' ? d.bsDateNep : d.bsDateEng}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {language === 'ne' ? d.adDateNep : d.adDateEng}
                      </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#dc2626',
                          backgroundColor: '#fef2f2',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {t('Public Holiday', 'सार्वजनिक बिदा')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Square with hover and click effects */}
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link
                  href="/date"
                  className="btn-primary"
                  style={{ flex: '1 1 auto', minWidth: '180px', fontSize: '13px', padding: '10px 16px' }}
                >
                  <span>{t('View Festival Dates', 'चाडपर्वका मितिहरू हेर्नुहोस्')}</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/date"
                  className="btn-secondary"
                  style={{ fontSize: '13px', padding: '10px 14px' }}
                >
                  <Calendar size={14} />
                  <span>{t('View Calendar', 'पात्रोमा हेर्नुहोस्')}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-secondary"
                  style={{ fontSize: '13px', padding: '10px 14px' }}
                  title="Share Dashain Dates"
                >
                  {copied ? <Check size={14} color="#003893" /> : <Share2 size={14} />}
                  <span>{t(copied ? 'Link Copied!' : 'Share Dates', copied ? 'लिंक कपि भयो!' : 'मिति सेयर गर्नुहोस्')}</span>
                </button>
              </div>

            </div>
          </div>


          {/* RIGHT CARD: नेपालमा आउँदै गरेको (Upcoming Holidays & Festivals in Nepal) */}
          <div
            data-aos="fade-up"
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '18px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#003893" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {t('Upcoming in Nepal', 'नेपालमा आउँदै गरेको')}
                </h3>
              </div>

              {/* Filter Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setEventFilter('all')}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: eventFilter === 'all' ? '#003893' : '#e2e8f0',
                    background: eventFilter === 'all' ? '#eff6ff' : '#ffffff',
                    color: eventFilter === 'all' ? '#003893' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {t('All (7)', 'सबै (७)')}
                </button>
                <button
                  type="button"
                  onClick={() => setEventFilter('holidays')}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: eventFilter === 'holidays' ? '#dc2626' : '#e2e8f0',
                    background: eventFilter === 'holidays' ? '#fef2f2' : '#ffffff',
                    color: eventFilter === 'holidays' ? '#dc2626' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {t('Public Holidays', 'सार्वजनिक बिदा')}
                </button>
              </div>
            </div>

            {/* List of upcoming holidays & festivals */}
            <div
              className="custom-smooth-scroll"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '4px' }}
            >
              {displayEvents.map((ev, index) => (
                <Link
                  key={index}
                  href={ev.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: index === 0 ? '#eff6ff' : '#f8fafc',
                    border: index === 0 ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  className="hover-lift"
                >
                  {/* Left: Date Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        flexShrink: 0
                      }}
                    >
                      <span style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>
                        {language === 'ne' ? ev.bsDateNep : ev.bsDateEng}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                        {language === 'ne' ? ev.bsMonthNep : ev.bsMonthEng}
                      </span>
                    </div>

                    {/* Middle: Details */}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                        {language === 'ne' ? ev.titleNep : ev.titleEng}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {language === 'ne' ? ev.dayTextNep : ev.dayTextEng}
                        {ev.isHoliday && (
                          <span style={{ color: '#dc2626', fontWeight: 700, marginLeft: '6px' }}>
                            • {t('Public Holiday', 'सार्वजनिक बिदा')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Countdown badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: index === 0 ? '#003893' : '#475569',
                        backgroundColor: index === 0 ? '#dbeafe' : '#e2e8f0',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {language === 'ne' ? ev.countdownNep : ev.countdownEng}
                    </span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Action Footer matching Left Card */}
            <div
              style={{
                marginTop: '14px',
                paddingTop: '14px',
                borderTop: '1.5px solid #f1f5f9',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <Link
                href="/calendar"
                className="btn-primary"
                style={{ flex: '1 1 auto', minWidth: '180px', fontSize: '13px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Calendar size={14} />
                <span>{t('View Full 2083 Calendar', 'पूर्ण २०८३ पात्रो हेर्नुहोस्')}</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/date"
                className="btn-secondary"
                style={{ fontSize: '13px', padding: '10px 14px', whiteSpace: 'nowrap' }}
              >
                <span>{t('BS ⇄ AD Converter', 'मिति रूपान्तरण')}</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
