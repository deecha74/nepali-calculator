'use client';

import React, { useState, useMemo } from 'react';
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
import { getTodayBsDate, KNOWN_FESTIVALS_2083, MONTH_NAMES_INFO } from '@/lib/calendarData';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { PopularToolsCard } from './MarketRatesAndPopularTools';

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
  daysRemaining: number;
  highlight?: boolean;
}

export function UpcomingCard() {
  const [eventFilter, setEventFilter] = useState<'all' | 'holidays'>('all');
  const { language, t } = useLanguage();
  const todayBs = useMemo(() => getTodayBsDate(), []);

  // Dynamic Upcoming Events List from Master 2083 Calendar
  const allUpcomingList = useMemo(() => {
    return KNOWN_FESTIVALS_2083
      .filter((f) => f.month > todayBs.bsMonth || (f.month === todayBs.bsMonth && f.day >= todayBs.bsDay))
      .map((f) => {
        let diff = 0;
        if (f.month === todayBs.bsMonth) {
          diff = f.day - todayBs.bsDay;
        } else {
          diff = (30 - todayBs.bsDay) + f.day + Math.max(0, f.month - todayBs.bsMonth - 1) * 30;
        }
        const mInfo = MONTH_NAMES_INFO[f.month - 1] || { nep: '', eng: '' };
        return {
          bsDateNep: toNepaliDigits(f.day),
          bsDateEng: String(f.day),
          bsMonthNep: mInfo.nep,
          bsMonthEng: mInfo.eng,
          titleNep: f.eventNep,
          titleEng: f.eventEng,
          dayTextNep: `${mInfo.nep} ${toNepaliDigits(f.day)} गते`,
          dayTextEng: `${mInfo.eng} ${f.day}`,
          isHoliday: f.isGazettedHoliday,
          daysRemaining: diff,
          countdownNep: diff === 0 ? 'आज' : diff === 1 ? 'भोलि' : `${toNepaliDigits(diff)} दिनपछि`,
          countdownEng: diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `In ${diff} days`,
          slug: '/date',
        };
      });
  }, [todayBs]);

  const displayEvents = (eventFilter === 'all'
    ? allUpcomingList
    : allUpcomingList.filter((e) => e.isHoliday)
  ).slice(0, 6);

  return (
    <div
      data-aos="fade-up"
      className="upcoming-card"
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
      <div className="upcoming-header" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} color="#003893" />
          <h3 className="upcoming-title" style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            {t('Upcoming in Nepal', 'नेपालमा आउँदै गरेको')}
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="upcoming-filter-pills" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
            {language === 'ne' ? `सबै (${toNepaliDigits(allUpcomingList.length)})` : `All (${allUpcomingList.length})`}
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
            {language === 'ne'
              ? `सार्वजनिक बिदा (${toNepaliDigits(allUpcomingList.filter(e => e.isHoliday).length)})`
              : `Holidays (${allUpcomingList.filter(e => e.isHoliday).length})`}
          </button>
        </div>
      </div>

      {/* List of upcoming holidays & festivals */}
      <div
        className="upcoming-events-track custom-smooth-scroll"
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '4px' }}
      >
        {displayEvents.map((ev, index) => (
          <Link
            key={index}
            href={ev.slug}
            className="upcoming-event-item hover-lift"
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
          >
            {/* Main Details block */}
            <div className="upcoming-item-main" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                className="upcoming-date-badge"
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
                <span className="upcoming-date-day" style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>
                  {language === 'ne' ? ev.bsDateNep : ev.bsDateEng}
                </span>
                <span className="upcoming-date-month" style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                  {language === 'ne' ? ev.bsMonthNep : ev.bsMonthEng}
                </span>
              </div>

              <div className="upcoming-details">
                <div className="upcoming-item-title" style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  {language === 'ne' ? ev.titleNep : ev.titleEng}
                </div>
                <div className="upcoming-item-sub" style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
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
            <div className="upcoming-badge-wrap" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                className="upcoming-countdown-badge"
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
              <ChevronRight size={14} color="#94a3b8" className="upcoming-arrow" />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Action Footer matching Left Card */}
      <div
        className="upcoming-footer-row"
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
  );
}

export function DashainAndUpcomingEvents() {
  const [copied, setCopied] = useState(false);
  const { language, t } = useLanguage();

  // Dynamic Real-Time Bikram Sambat Date Anchor
  const todayBs = useMemo(() => getTodayBsDate(), []);

  // Spotlight Season determination based on real-time BS month and day
  const spotlightSeason = useMemo(() => {
    const { bsMonth, bsDay } = todayBs;

    if (bsMonth === 6) {
      return {
        tagNep: 'बडादशैँ २०८३',
        tagEng: 'BADA DASHAIN 2083',
        titleNep: 'बडादशैँ २०८३',
        titleEng: 'Bada Dashain 2083',
        subtitleNep: 'परिवार, आस्था, शक्ति उपासना र नयाँ सुरुवात',
        subtitleEng: 'Family, Faith & New Beginnings',
        milestones: [
          { titleNep: 'घटस्थापना', titleEng: 'Ghatasthapana', month: 6, day: 25, isHoliday: true, adDateNep: 'अक्टोबर ११', adDateEng: 'Oct 11' },
          { titleNep: 'फूलपाती', titleEng: 'Phulpati', month: 6, day: 31, isHoliday: true, adDateNep: 'अक्टोबर १७', adDateEng: 'Oct 17' },
          { titleNep: 'महाअष्टमी', titleEng: 'Maha Ashtami', month: 7, day: 2, isHoliday: true, adDateNep: 'अक्टोबर १९', adDateEng: 'Oct 19' },
          { titleNep: 'महानवमी', titleEng: 'Maha Navami', month: 7, day: 3, isHoliday: true, adDateNep: 'अक्टोबर २०', adDateEng: 'Oct 20' },
          { titleNep: 'विजया दशमी', titleEng: 'Vijaya Dashami', month: 7, day: 4, isHoliday: true, adDateNep: 'अक्टोबर २१', adDateEng: 'Oct 21' },
        ],
      };
    } else if (bsMonth === 7 && bsDay <= 8) {
      return {
        tagNep: 'चाडपर्वको समय',
        tagEng: 'FESTIVAL SEASON',
        titleNep: 'दशैँ समापन तथा कोजाग्रत पूर्णिमा',
        titleEng: 'Dashain Finale & Kojagrat Purnima',
        subtitleNep: 'दशैँको टीका र आशीर्वाद तथा तिहारको शुभ स्वागत',
        subtitleEng: 'Festive Blessings & Welcoming Deepawali',
        milestones: [
          { titleNep: 'महाअष्टमी', titleEng: 'Maha Ashtami', month: 7, day: 2, isHoliday: true, adDateNep: 'अक्टोबर १९', adDateEng: 'Oct 19' },
          { titleNep: 'विजया दशमी', titleEng: 'Vijaya Dashami', month: 7, day: 4, isHoliday: true, adDateNep: 'अक्टोबर २१', adDateEng: 'Oct 21' },
          { titleNep: 'कोजाग्रत पूर्णिमा', titleEng: 'Kojagrat Purnima', month: 7, day: 8, isHoliday: false, adDateNep: 'अक्टोबर २५', adDateEng: 'Oct 25' },
          { titleNep: 'धनतेरस', titleEng: 'Dhanteras', month: 7, day: 15, isHoliday: false, adDateNep: 'नोभेम्बर ०१', adDateEng: 'Nov 01' },
          { titleNep: 'लक्ष्मी पूजा', titleEng: 'Laxmi Puja', month: 7, day: 17, isHoliday: true, adDateNep: 'नोभेम्बर ०३', adDateEng: 'Nov 03' },
        ],
      };
    } else if (bsMonth === 7) {
      return {
        tagNep: 'दीपावली तथा छठ २०८३',
        tagEng: 'TIHAR & CHHATH 2083',
        titleNep: 'यमपञ्चक (तिहार) तथा छठ पर्व २०८३',
        titleEng: 'Tihar (Deepawali) & Chhath 2083',
        subtitleNep: 'उज्यालो, दाजुभाइ-दिदीबहिनीको स्नेह, लक्ष्मी कृपा र सूर्य उपासना',
        subtitleEng: 'Festival of Lights, Sisterly Love & Sun Worship',
        milestones: [
          { titleNep: 'धनतेरस', titleEng: 'Dhanteras', month: 7, day: 15, isHoliday: false, adDateNep: 'नोभेम्बर ०१', adDateEng: 'Nov 01' },
          { titleNep: 'काग/कुकुर तिहार', titleEng: 'Kag & Kukur Tihar', month: 7, day: 16, isHoliday: false, adDateNep: 'नोभेम्बर ०२', adDateEng: 'Nov 02' },
          { titleNep: 'लक्ष्मी पूजा', titleEng: 'Laxmi Puja', month: 7, day: 17, isHoliday: true, adDateNep: 'नोभेम्बर ०३', adDateEng: 'Nov 03' },
          { titleNep: 'गोवर्धन / म्हपूजा', titleEng: 'Govardhan & Mha Puja', month: 7, day: 18, isHoliday: true, adDateNep: 'नोभेम्बर ०४', adDateEng: 'Nov 04' },
          { titleNep: 'भाइटीका', titleEng: 'Bhai Tika', month: 7, day: 19, isHoliday: true, adDateNep: 'नोभेम्बर ०५', adDateEng: 'Nov 05' },
        ],
      };
    } else {
      return {
        tagNep: 'नेपाली राष्ट्रिय चाडपर्व',
        tagEng: 'NEPALI FESTIVAL SEASON',
        titleNep: 'पात्रो उत्सव २०८३',
        titleEng: 'Festival Season 2083',
        subtitleNep: 'आगामी प्रमुख पर्व, बिदा र उत्सवहरूको विवरण',
        subtitleEng: 'Upcoming Celebrations & Public Holidays',
        milestones: KNOWN_FESTIVALS_2083
          .filter(f => f.month > bsMonth || (f.month === bsMonth && f.day >= bsDay))
          .slice(0, 5)
          .map(f => {
            const mInfo = MONTH_NAMES_INFO[f.month - 1] || { nep: '', eng: '' };
            return {
              titleNep: f.eventNep,
              titleEng: f.eventEng,
              month: f.month,
              day: f.day,
              isHoliday: f.isGazettedHoliday,
              adDateNep: `${mInfo.nep} ${toNepaliDigits(f.day)}`,
              adDateEng: `${mInfo.eng} ${f.day}`,
            };
          }),
      };
    }
  }, [todayBs]);

  // Dynamically calculate milestones with real-time days remaining and badges
  const calculatedMilestones: FestivalMilestone[] = useMemo(() => {
    return spotlightSeason.milestones.map((m) => {
      let daysRemaining = 0;
      if (m.month === todayBs.bsMonth) {
        daysRemaining = m.day - todayBs.bsDay;
      } else if (m.month > todayBs.bsMonth) {
        daysRemaining = (30 - todayBs.bsDay) + m.day + (m.month - todayBs.bsMonth - 1) * 30;
      } else {
        daysRemaining = -((todayBs.bsDay - m.day) + (todayBs.bsMonth - m.month) * 30);
      }

      const mInfo = MONTH_NAMES_INFO[m.month - 1] || { nep: '', eng: '' };
      const isPast = daysRemaining < 0;
      const isToday = daysRemaining === 0;

      let statusNep = '';
      let statusEng = '';
      if (isPast) {
        statusNep = 'सम्पन्न';
        statusEng = 'Passed';
      } else if (isToday) {
        statusNep = 'आज (Active)';
        statusEng = 'Today (Active)';
      } else if (daysRemaining === 1) {
        statusNep = 'भोलि';
        statusEng = 'Tomorrow';
      } else {
        statusNep = `${toNepaliDigits(daysRemaining)} दिनपछि`;
        statusEng = `In ${daysRemaining} days`;
      }

      return {
        titleNep: m.titleNep,
        titleEng: m.titleEng,
        bsDateNep: `${mInfo.nep} ${toNepaliDigits(m.day)}`,
        bsDateEng: `${mInfo.eng} ${m.day}`,
        adDateNep: m.adDateNep,
        adDateEng: m.adDateEng,
        isHoliday: m.isHoliday,
        daysRemaining,
        statusNep,
        statusEng,
        highlight: isToday || (!isPast && daysRemaining <= 2),
      };
    });
  }, [spotlightSeason, todayBs]);

  // Spotlight Header Event (closest upcoming milestone)
  const spotlightHeaderEvent = useMemo(() => {
    const upcoming = calculatedMilestones.filter((m) => m.daysRemaining >= 0);
    if (upcoming.length > 0) return upcoming[0];
    return calculatedMilestones[calculatedMilestones.length - 1] || calculatedMilestones[0];
  }, [calculatedMilestones]);

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

          {/* LEFT CARD: चाडपर्वको समय - Dynamic Spotlight Celebration Hub */}
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
              className="festival-banner-wrap"
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
                alt="Nepal Festival Season Artwork"
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
                className="festival-banner-content"
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
                    <span>{language === 'ne' ? spotlightSeason.tagNep : spotlightSeason.tagEng}</span>
                  </div>
                  <h3 className="festival-banner-title" style={{ fontSize: '24px', fontWeight: 900, color: '#003893', margin: 0 }}>
                    {language === 'ne' ? spotlightSeason.titleNep : spotlightSeason.titleEng}
                  </h3>
                  <div className="festival-banner-sub" style={{ fontSize: '13px', fontWeight: 600, color: '#78350f' }}>
                    {language === 'ne' ? spotlightSeason.subtitleNep : spotlightSeason.subtitleEng}
                  </div>
                </div>

                {spotlightHeaderEvent && (
                  <div className="festival-banner-days" style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#dc2626', display: 'block' }}>
                      {spotlightHeaderEvent.daysRemaining === 0
                        ? t('Today', 'आज')
                        : spotlightHeaderEvent.daysRemaining === 1
                        ? t('Tomorrow', 'भोलि')
                        : language === 'ne'
                        ? `${toNepaliDigits(spotlightHeaderEvent.daysRemaining)} दिन बाँकी`
                        : `In ${spotlightHeaderEvent.daysRemaining} days`}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                      {language === 'ne' ? spotlightHeaderEvent.titleNep : spotlightHeaderEvent.titleEng}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Festival Milestone Cards Grid */}
            <div className="festival-card-body" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                className="festival-milestones-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px',
                  marginBottom: '20px'
                }}
              >
                {calculatedMilestones.map((d) => (
                  <div
                    key={d.titleEng}
                    className="festival-milestone-card"
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

                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: d.isHoliday ? '#dc2626' : '#2563eb',
                          backgroundColor: d.isHoliday ? '#fef2f2' : '#eff6ff',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {d.isHoliday ? t('Public Holiday', 'सार्वजनिक बिदा') : t('Festival', 'चाडपर्व')}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: d.highlight ? '#003893' : '#64748b',
                        }}
                      >
                        {language === 'ne' ? d.statusNep : d.statusEng}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="festival-btn-row" style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                  title="Share Festival Dates"
                >
                  {copied ? <Check size={14} color="#003893" /> : <Share2 size={14} />}
                  <span>{t(copied ? 'Link Copied!' : 'Share Dates', copied ? 'लिंक कपि भयो!' : 'मिति सेयर गर्नुहोस्')}</span>
                </button>
              </div>

            </div>
          </div>


          {/* RIGHT CARD: Popular Tools (swapped with Upcoming in Nepal) */}
          <PopularToolsCard />

        </div>

      </div>
    </section>
  );
}
