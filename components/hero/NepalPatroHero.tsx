'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sun,
  Calendar as CalendarIcon,
  Sparkles,
  Star
} from 'lucide-react';
import { toNepaliDigits, NEPALI_MONTHS } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { TODAY_RASHIFAL } from '@/lib/rashifalData';
import { NepalFlagAnimated } from '@/components/NepalFlagAnimated';
import {
  generateMonthDays,
  DetailedCalendarDay,
  WEEKDAYS_NEP,
  getTodayBsDate,
  KNOWN_FESTIVALS_2083
} from '@/lib/calendarData';
import { motion, AnimatePresence } from 'framer-motion';

interface CityWeather {
  cityNep: string;
  cityEng: string;
  temp: number;
  conditionNep: string;
  conditionEng: string;
  icon: string;
}

const NEPAL_CITIES: CityWeather[] = [
  { cityNep: "काठमाडौँ", cityEng: "Kathmandu", temp: 17, conditionNep: "सफा आकाश", conditionEng: "Clear Sky", icon: "☀️" },
  { cityNep: "पोखरा", cityEng: "Pokhara", temp: 22, conditionNep: "हल्का बादल", conditionEng: "Partly Cloudy", icon: "⛅" },
  { cityNep: "ललितपुर", cityEng: "Lalitpur", temp: 17, conditionNep: "सफा आकाश", conditionEng: "Clear Sky", icon: "☀️" },
  { cityNep: "भक्तपुर", cityEng: "Bhaktapur", temp: 16, conditionNep: "सफा आकाश", conditionEng: "Clear Sky", icon: "☀️" },
  { cityNep: "विराटनगर", cityEng: "Biratnagar", temp: 26, conditionNep: "न्यानो घाम", conditionEng: "Sunny", icon: "☀️" },
  { cityNep: "चितवन", cityEng: "Chitwan", temp: 25, conditionNep: "सुन्दर मौसम", conditionEng: "Pleasant", icon: "🌤️" },
  { cityNep: "बुटवल", cityEng: "Butwal", temp: 24, conditionNep: "सफा मौसम", conditionEng: "Clear", icon: "☀️" },
  { cityNep: "धरान", cityEng: "Dharan", temp: 23, conditionNep: "सुन्दर मौसम", conditionEng: "Sunny", icon: "☀️" },
];

export function NepalPatroHero() {
  const { language, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState("राति १०:४४:३४");
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileCalendarExpanded, setMobileCalendarExpanded] = useState(false);

  // Dynamic Real-Time Bikram Sambat Calendar State
  const todayBs = useMemo(() => getTodayBsDate(), []);
  const [heroYear, setHeroYear] = useState<number>(todayBs.bsYear);
  const [heroMonth, setHeroMonth] = useState<number>(todayBs.bsMonth);
  const [selectedDay, setSelectedDay] = useState<DetailedCalendarDay | null>(null);

  const { meta: heroMeta, days: heroDays } = useMemo(() => {
    return generateMonthDays(heroYear, heroMonth);
  }, [heroYear, heroMonth]);

  // Active day defaults to today's real day
  const activeDay = selectedDay || heroDays.find((d) => d.isToday) || heroDays.find((d) => d.bsDay === todayBs.bsDay) || heroDays[0];

  // Dynamic next upcoming festival calculation
  const upcomingFestival = useMemo(() => {
    const cur = getTodayBsDate();
    const upcomingList = KNOWN_FESTIVALS_2083.filter(
      (f) => f.month > cur.bsMonth || (f.month === cur.bsMonth && f.day >= cur.bsDay)
    );
    if (upcomingList.length > 0) {
      const next = upcomingList[0];
      let diff = 0;
      if (next.month === cur.bsMonth) {
        diff = next.day - cur.bsDay;
      } else {
        diff = (30 - cur.bsDay) + next.day;
      }
      return {
        ...next,
        daysRemaining: Math.max(0, diff),
      };
    }
    return null;
  }, [heroYear, heroMonth]);

  const handleHeroPrevMonth = () => {
    if (heroMonth === 1) {
      setHeroYear((y) => Math.max(2081, y - 1));
      setHeroMonth(12);
    } else {
      setHeroMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const handleHeroNextMonth = () => {
    if (heroMonth === 12) {
      setHeroYear((y) => Math.min(2085, y + 1));
      setHeroMonth(1);
    } else {
      setHeroMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const handleHeroToday = () => {
    const cur = getTodayBsDate();
    setHeroYear(cur.bsYear);
    setHeroMonth(cur.bsMonth);
    const mDays = generateMonthDays(cur.bsYear, cur.bsMonth).days;
    setSelectedDay(mDays.find((d) => d.isToday) || mDays.find((d) => d.bsDay === cur.bsDay) || null);
  };

  const [heroRightTab, setHeroRightTab] = useState<'calendar' | 'rashifal'>('calendar');
  const [selectedRashiId, setSelectedRashiId] = useState<string>('aries');
  const [liveHoroscope, setLiveHoroscope] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Live Horoscope API Fetcher
  useEffect(() => {
    let active = true;
    async function loadLiveHoroscope() {
      try {
        const res = await fetch(`/api/horoscope?sign=${selectedRashiId}`);
        if (res.ok) {
          const json = await res.json();
          if (active && json?.data?.livePredictionEng) {
            setLiveHoroscope(json.data.livePredictionEng);
            setIsLiveApi(Boolean(json.data.isLiveApi));
          }
        }
      } catch (err) { }
    }
    loadLiveHoroscope();
    return () => { active = false; };
  }, [selectedRashiId]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const period = hours >= 12 ? (hours >= 19 ? 'राति' : 'दिउँसो') : (hours < 5 ? 'राति' : 'बिहान');
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      if (language === 'ne') {
        setTimeStr(`${period} ${toNepaliDigits(`${formattedHours}:${minutes}:${seconds}`)}`);
      } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        setTimeStr(`${formattedHours}:${minutes}:${seconds} ${ampm} NPT`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [language]);

  const currentCity = NEPAL_CITIES[activeCityIndex];
  const activeRashi = TODAY_RASHIFAL.find((r) => r.id === selectedRashiId) || TODAY_RASHIFAL[0];

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px, 5.5vw, 64px) 0 clamp(40px, 5.5vw, 60px)',
        overflow: 'hidden',
        minHeight: '480px',
      }}
    >
      {/* Full Colored Panorama Background: Everest, River & Kathmandu City */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/nepal-hero-panorama.jpg"
          alt="Mount Everest, Himalayan River, and Kathmandu City"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Nepal Red & Blue Blended Twilight Atmospheric Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(150, 15, 38, 0.68) 0%, rgba(25, 20, 65, 0.52) 45%, rgba(0, 56, 147, 0.68) 100%)',
          }}
        />
        {/* Soft Vignette Depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(10, 15, 30, 0.5) 100%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Main 2-Column Grid: Left (Cultural Details) + Right (Clean Calendar Card) */}
        <div className="hero-patro-grid">

          {/* LEFT COLUMN: Open Heritage Canvas */}
          <div
            className="hero-left-col"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Foreground Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>

              {/* Top Subtitle Badge: Live Patro Status */}
              <div className="hero-live-badge">
                <span className="pulse-dot" />
                <span className="hero-live-badge-text">
                  {language === 'ne' ? 'नेपाल आधिकारिक समय · प्रत्यक्ष पात्रो' : 'Nepal Live Patro & Time'}
                </span>
                <span className="hero-live-badge-year">२०८३</span>
              </div>

              {/* Massive Bold Heading: Dynamic BS Date - Modern Mukta Devanagari */}
              <h1 className="hero-main-title">
                {toNepaliDigits(activeDay.bsDay)} {heroMeta.monthNameNep} {toNepaliDigits(heroYear)}, {activeDay.dayNameNep}
              </h1>

              {/* Gregorian English Date & Vikram Sambat */}
              <div className="hero-subdate-wrap">
                <span className="hero-ad-date">
                  {activeDay.adMonthName} {activeDay.adDay}, {new Date(activeDay.adDate).getFullYear()}
                </span>
                <span className="hero-subdate-sep">•</span>
                <span className="hero-tithi-tag">
                  <Sparkles size={13} color="#fde047" />
                  <span>{t('Bikram Sambat', 'विक्रम संवत्')} ({activeDay.tithiShort})</span>
                </span>
              </div>

              {/* Live Nepal Time - Modern Glassmorphic Pill */}
              <div className="hero-live-clock-card">
                <Clock size={15} color="#fef08a" />
                <span className="clock-label">{t('Time:', 'समय:')}</span>
                <span className="clock-time-val">
                  {mounted ? timeStr : 'राति १०:४४:३४'}
                </span>
                <span className="clock-npt-badge">NPT</span>
              </div>

              {/* Weather Pill (Floating Frosted Glass with Location Switcher) */}
              <div className="hero-weather-pill-wrap" style={{ position: 'relative', display: 'inline-block' }}>
                <div className="hero-pill-badge" style={{ color: '#003893' }}>
                  <span style={{ fontSize: '15px' }}>{currentCity.icon}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong style={{ color: '#003893' }}>{language === 'ne' ? currentCity.cityNep : currentCity.cityEng}</strong> · <span style={{ color: '#003893', fontWeight: 800 }}>{currentCity.temp}°C</span> · {language === 'ne' ? currentCity.conditionNep : currentCity.conditionEng}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(0, 56, 147, 0.08)',
                      border: '1px solid rgba(0, 56, 147, 0.2)',
                      borderRadius: '9999px',
                      color: '#003893',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      padding: '3px 8px',
                      marginLeft: '2px',
                      flexShrink: 0
                    }}
                  >
                    <RefreshCw size={11} />
                    <span>{t('Change', 'फेर्नुहोस्')}</span>
                  </button>
                </div>

                {/* City Picker Dropdown */}
                {cityDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0,
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #003893',
                      borderRadius: '12px',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                      zIndex: 50,
                      width: '260px',
                      maxHeight: '240px',
                      overflowY: 'auto',
                      padding: '6px'
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', padding: '6px 8px', textTransform: 'uppercase' }}>
                      {t('Select City', 'सहर रोज्नुहोस्')}
                    </div>
                    {NEPAL_CITIES.map((c, idx) => (
                      <button
                        key={c.cityEng}
                        type="button"
                        onClick={() => {
                          setActiveCityIndex(idx);
                          setCityDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 10px',
                          backgroundColor: idx === activeCityIndex ? '#eff6ff' : 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0f172a',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{c.icon} {language === 'ne' ? c.cityNep : c.cityEng}</span>
                        <span style={{ color: '#003893', fontWeight: 800 }}>{c.temp}°C</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Holiday Pills (Dynamically reflects activeDay) */}
              <div className="hero-holiday-pills-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="hero-pill-badge hero-today-holiday-pill">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeDay.isHoliday ? '#ef4444' : '#10b981', boxShadow: activeDay.isHoliday ? '0 0 8px #ef4444' : '0 0 8px #10b981', flexShrink: 0 }} />
                  <span>
                    <strong>{activeDay.isToday ? t('Today', 'आज') : activeDay.dayNameNep}</strong> · {activeDay.eventNep || (activeDay.isWeekend ? 'साप्ताहिक बिदा' : 'शुभ दिन')} · <span style={{ color: activeDay.isHoliday ? '#dc2626' : '#059669', fontWeight: 800 }}>{activeDay.isHoliday ? t('Public Holiday', 'सार्वजनिक बिदा') : t('Workday', 'कार्यदिन')}</span>
                  </span>
                </div>

                {upcomingFestival && (
                  <div className="hero-pill-badge">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 8px #f59e0b', flexShrink: 0 }} />
                    <span>
                      {language === 'ne'
                        ? <><strong>अब आउने</strong> · {upcomingFestival.eventNep} · <span style={{ color: '#d97706', fontWeight: 800 }}>{upcomingFestival.daysRemaining === 0 ? 'आज' : `${toNepaliDigits(upcomingFestival.daysRemaining)} दिनपछि`}</span></>
                        : <><strong>Upcoming</strong> · {upcomingFestival.eventEng} · <span style={{ color: '#d97706', fontWeight: 800 }}>{upcomingFestival.daysRemaining === 0 ? 'Today' : `in ${upcomingFestival.daysRemaining} days`}</span></>}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>


          {/* RIGHT COLUMN: Art Nouveau Ivory Parchment Calendar Card */}
          <div className="hero-calendar-card">
            {/* Tab Switcher: [ 📅 मासिक पात्रो (Calendar) ]  [ 🔮 दैनिक राशिफल (Daily Horoscope) ] */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div className="segmented-control" style={{ padding: '3px' }}>
                <button
                  type="button"
                  onClick={() => setHeroRightTab('calendar')}
                  className={`segmented-btn ${heroRightTab === 'calendar' ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    padding: '5px 12px'
                  }}
                >
                  <CalendarIcon size={13} />
                  <span>{t('Monthly Patro', 'मासिक पात्रो')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroRightTab('rashifal')}
                  className={`segmented-btn ${heroRightTab === 'rashifal' ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    padding: '5px 12px'
                  }}
                >
                  <Sparkles size={13} color={heroRightTab === 'rashifal' ? '#d4af37' : '#64748b'} />
                  <span>{t('Daily Horoscope', 'दैनिक राशिफल')}</span>
                </button>
              </div>

              {heroRightTab === 'calendar' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={handleHeroToday}
                    className="neu-btn"
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      color: '#0f172a',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CalendarIcon size={12} />
                    <span>आज</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleHeroPrevMonth}
                    className="neu-btn"
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      color: '#0f172a'
                    }}
                    title="अघिल्लो महिना"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleHeroNextMonth}
                    className="neu-btn"
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      color: '#0f172a'
                    }}
                    title="पछिल्लो महिना"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/rashifal"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#003893',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none'
                  }}
                >
                  <span>{t('Full 12 Signs', 'सबै १२ राशि')}</span>
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>

            {/* TAB 1: CALENDAR VIEW */}
            {heroRightTab === 'calendar' ? (
              <>
                {/* Header Subtitle: आश्विन २०८३ सेप्टेम्बर – अक्टोबर २०२६ */}
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    <span>{heroMeta.monthNameNep} {toNepaliDigits(heroYear)}</span>{' '}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                      {heroMeta.adRange} {heroYear - 57}
                    </span>
                  </h2>
                </div>

                {/* Weekday Strip: आइत सोम मंगल बुध बिहि शुक्र शनि (Sunday and Saturday in red) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    backgroundColor: '#f6f1e8',
                    padding: '8px 0',
                    borderRadius: '6px',
                    marginBottom: '12px'
                  }}
                >
                  {WEEKDAYS_NEP.map((d, index) => {
                    const isRedDay = index === 0 || index === 6;
                    return (
                      <div
                        key={d.nep}
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          color: isRedDay ? '#c8102e' : '#475569'
                        }}
                      >
                        {d.nep}
                      </div>
                    );
                  })}
                </div>

                {/* Days Grid with Motion */}
                {/* Days Grid with Motion & Mobile Minimal Week Support */}
                {(() => {
                  const activeSlotIdx = heroMeta.startDayOfWeek + (activeDay.bsDay - 1);
                  const activeRowIdx = Math.floor(activeSlotIdx / 7);

                  return (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${heroYear}-${heroMonth}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.16 }}
                          className={`hero-calendar-grid ${mobileCalendarExpanded ? 'is-expanded' : ''}`}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '4px',
                            textAlign: 'center',
                            marginBottom: '6px'
                          }}
                        >
                          {/* Empty slots for start of month */}
                          {Array.from({ length: heroMeta.startDayOfWeek }).map((_, i) => {
                            const isHiddenOnMobile = Math.floor(i / 7) !== activeRowIdx;
                            return (
                              <div
                                key={`empty-hero-${i}`}
                                className={`hero-day-cell ${isHiddenOnMobile ? 'hero-slot-hidden-mobile' : ''}`}
                                style={{ height: '52px' }}
                              />
                            );
                          })}

                          {heroDays.map((day) => {
                            const isSelected = activeDay.bsDay === day.bsDay && activeDay.bsMonth === day.bsMonth;
                            const isToday = day.isToday;
                            const isWeekend = day.dayOfWeek === 0 || day.dayOfWeek === 6;
                            const slotIndex = heroMeta.startDayOfWeek + (day.bsDay - 1);
                            const isHiddenOnMobile = Math.floor(slotIndex / 7) !== activeRowIdx;

                            let cellBg = '#ffffff';
                            let textColor = (isWeekend || day.isHoliday) ? '#dc2626' : '#1e293b';

                            if (isToday) {
                              cellBg = '#f59e0b';
                              textColor = '#000000';
                            } else if (isSelected) {
                              cellBg = '#fffbeb';
                              textColor = '#b45309';
                            } else if (day.isHoliday || isWeekend) {
                              cellBg = '#fef2f2';
                              textColor = '#dc2626';
                            }

                            return (
                              <motion.button
                                key={day.bsDay}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.12 }}
                                onClick={() => setSelectedDay(day)}
                                className={`hero-day-cell ${isHiddenOnMobile ? 'hero-slot-hidden-mobile' : ''}`}
                                style={{
                                  height: '52px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: cellBg,
                                  color: textColor,
                                  border: isToday ? '2px solid #d97706' : (isSelected ? '2px solid #f59e0b' : '1px solid #f1f5f9'),
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  padding: '2px',
                                  position: 'relative',
                                  boxShadow: isToday ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {/* Big Nepali Digit */}
                                <span style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1 }}>
                                  {toNepaliDigits(day.bsDay)}
                                </span>
                                {/* Small English Date */}
                                <span
                                  style={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    color: isSelected ? 'rgba(255,255,255,0.85)' : (isWeekend || day.isHoliday ? '#c8102e' : '#94a3b8'),
                                    lineHeight: 1,
                                    marginTop: '3px'
                                  }}
                                >
                                  {day.adDay}
                                </span>

                                {/* Active Today / Selected Dot Indicator from Screenshot 2 */}
                                {isSelected && (
                                  <span
                                    style={{
                                      width: '4px',
                                      height: '4px',
                                      borderRadius: '50%',
                                      backgroundColor: '#f59e0b',
                                      marginTop: '2px'
                                    }}
                                  />
                                )}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      </AnimatePresence>

                      {/* Mobile Minimal Toggle: Expand Full Month or Collapse to Week */}
                      <div className="hero-mobile-expand-bar">
                        <button
                          type="button"
                          onClick={() => setMobileCalendarExpanded(!mobileCalendarExpanded)}
                          className="hero-mobile-expand-btn"
                        >
                          {mobileCalendarExpanded ? (
                            <>
                              <span>{t('Collapse to Week View', 'संक्षिप्त हप्ता हेर्नुहोस्')}</span>
                              <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              <span>{t('View Full Month (30 Days)', 'पूरा महिना हेर्नुहोस् (३० दिन)')}</span>
                              <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  );
                })()}

                {/* Footer Legend & Link: 🔴 सार्वजनिक बिदा  🟣 चाडपर्व  ⚪ अन्य  | पूरा पात्रो हेर्नुहोस् → */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#64748b',
                    paddingTop: '10px',
                    borderTop: '1px solid #f1f5f9'
                  }}
                >
                  <div className="hero-calendar-legend-mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
                      सार्वजनिक बिदा
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                      चाडपर्व
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                      अन्य
                    </span>
                  </div>

                  <Link
                    href="/calendar"
                    style={{
                      color: '#003893',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                      marginLeft: 'auto'
                    }}
                  >
                    <span>पूरा पात्रो हेर्नुहोस्</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </>
            ) : (
              /* TAB 2: DAILY RASHIFAL (HOROSCOPE) VIEW */
              <div>
                {/* 12 Rashi Selection Bar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '6px',
                    marginBottom: '16px'
                  }}
                >
                  {TODAY_RASHIFAL.map((rashi) => {
                    const isRashiActive = rashi.id === selectedRashiId;
                    return (
                      <button
                        key={rashi.id}
                        type="button"
                        onClick={() => setSelectedRashiId(rashi.id)}
                        style={{
                          padding: '6px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isRashiActive ? '#003893' : '#f8fafc',
                          color: isRashiActive ? '#ffffff' : '#0f172a',
                          border: isRashiActive ? '1.5px solid #003893' : '1px solid #e2e8f0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '15px', lineHeight: 1 }}>{rashi.symbol}</span>
                        <span style={{ fontSize: '11px', fontWeight: 800, marginTop: '2px' }}>
                          {language === 'ne' ? rashi.nepaliName : rashi.englishName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Rashi Details Card */}
                <div
                  style={{
                    backgroundColor: '#faf7f2',
                    border: '1.5px solid #ebe2d3',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '14px'
                  }}
                >
                  {/* Top Details & Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '26px' }}>{activeRashi.symbol}</span>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                          {activeRashi.nepaliName} ({activeRashi.englishName})
                        </h3>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {activeRashi.sanskritName}
                        </span>
                      </div>
                    </div>
                    {/* 5-Star Rating */}
                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={14} fill={idx < activeRashi.rating ? '#f59e0b' : 'none'} color="#f59e0b" />
                      ))}
                    </div>
                  </div>

                  {/* Auspicious Badges */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px', textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '4px', border: '1px solid #ebd8c0' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ अङ्क</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#003893' }}>{toNepaliDigits(activeRashi.luckyNumber)}</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '4px', border: '1px solid #ebd8c0' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ रङ्ग</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857' }}>{activeRashi.luckyColorNep}</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '4px', border: '1px solid #ebd8c0' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>शुभ दिशा</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7' }}>{activeRashi.luckyDirectionNep}</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '4px', border: '1px solid #ebd8c0' }}>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>स्वामी ग्रह</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#b45309' }}>{activeRashi.rulingPlanetNep}</div>
                    </div>
                  </div>

                  {/* Live API Status Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                      {t('Daily Prediction', 'दैनिक फलादेश')}
                    </span>
                    {isLiveApi && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10px',
                          fontWeight: 800,
                          color: '#065f46',
                          backgroundColor: '#d1fae5',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: '1px solid #a7f3d0'
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        {t('Live Horoscope API', 'प्रत्यक्ष राशिफल')}
                      </span>
                    )}
                  </div>

                  {/* Main Prediction */}
                  <p style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.6, margin: '0 0 10px', fontWeight: 500 }}>
                    {language === 'ne' ? activeRashi.predictionNep : (liveHoroscope || activeRashi.predictionEng)}
                  </p>

                  {/* English Live Prediction Translation Pill (when in Nepali mode) */}
                  {language === 'ne' && liveHoroscope && (
                    <div style={{ fontSize: '11px', color: '#334155', backgroundColor: '#ffffff', padding: '8px 10px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '10px', lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 800, color: '#003893' }}>Live Astrological Forecast: </span>
                      {liveHoroscope}
                    </div>
                  )}

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                    <div style={{ color: '#047857', fontWeight: 600 }}>
                      💼 {language === 'ne' ? activeRashi.careerFinanceNep : 'Favorable career & business growth.'}
                    </div>
                    <div style={{ color: '#2563eb', fontWeight: 600 }}>
                      🩺 {language === 'ne' ? activeRashi.healthNep : 'Good vitality; take balanced meals.'}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    २५ आश्विन २०८३ • दैनिक फलादेश
                  </span>
                  <Link
                    href="/rashifal"
                    style={{
                      color: '#003893',
                      fontSize: '12px',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>विस्तृत राशिफल हेर्नुहोस्</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
