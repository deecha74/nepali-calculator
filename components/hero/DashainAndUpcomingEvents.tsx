'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { getTodayBsDate, KNOWN_FESTIVALS_2083, MONTH_NAMES_INFO } from '@/lib/calendarData';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { PopularToolsCard } from './MarketRatesAndPopularTools';

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
  return (
    <section style={{ backgroundColor: 'transparent', padding: 'clamp(24px, 3.5vw, 36px) 0' }}>
      <div className="container">
        {/* Full-Width Popular Tools Showcase */}
        <PopularToolsCard />
      </div>
    </section>
  );
}
