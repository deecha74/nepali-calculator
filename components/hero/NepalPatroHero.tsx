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
  Calculator as CalcIcon,
  Sparkles
} from 'lucide-react';
import { toNepaliDigits, NEPALI_MONTHS } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { NepalFlagAnimated } from '@/components/NepalFlagAnimated';
import {
  generateMonthDays,
  DetailedCalendarDay,
  WEEKDAYS_NEP,
  getTodayBsDate,
  KNOWN_FESTIVALS_2083
} from '@/lib/calendarData';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroQuickCalcCard } from './HeroQuickCalcCard';

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

  // Dynamic next upcoming festival calculation (strictly AFTER activeDay/today so it never duplicates Today's event)
  const upcomingFestival = useMemo(() => {
    const refMonth = activeDay ? activeDay.bsMonth : todayBs.bsMonth;
    const refDay = activeDay ? activeDay.bsDay : todayBs.bsDay;
    const upcomingList = KNOWN_FESTIVALS_2083.filter(
      (f) => f.month > refMonth || (f.month === refMonth && f.day > refDay)
    );
    if (upcomingList.length > 0) {
      const next = upcomingList[0];
      let diff = 0;
      if (next.month === refMonth) {
        diff = next.day - refDay;
      } else {
        diff = (heroMeta.totalDays - refDay) + next.day;
      }
      return {
        ...next,
        daysRemaining: Math.max(1, diff),
      };
    }
    return null;
  }, [activeDay, todayBs.bsMonth, todayBs.bsDay, heroMeta.totalDays]);

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

  const [heroRightTab, setHeroRightTab] = useState<'tools' | 'calendar'>('tools');

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

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px, 5.5vw, 64px) 0 clamp(40px, 5.5vw, 60px)',
        overflow: 'hidden',
        minHeight: '480px',
      }}
    >
      {/* Full Scenic Panorama Background: Kathmandu Heritage Sunrise & Himalayas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero-kathmandu-sunrise.webp"
          alt="Kathmandu Valley Temples and Himalayan Sunrise"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQBACdASoUAAsAPxFysFCsJqSisAgBgCIJbACdL1Ds1QIBcG2o1Q4zIAD+sT4Fu9dCjNp+lX821Ex4unqmYs8q08l9NBc4pqvsbg5Be0Sj/XtHa2tMhXEa99LLiu/E6v8DfgAA"
          sizes="100vw"
          quality={88}
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Soft Scenic Mountain Daylight Atmospheric Overlay matching design */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(240, 246, 255, 0.45) 45%, rgba(215, 235, 255, 0.3) 100%)',
          }}
        />
        {/* Soft Left Side Light Wash for text contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 15% 45%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.25) 65%, transparent 100%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Main 2-Column Grid: Left (Cultural Details) + Right (Clean Card) */}
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

              {/* Massive Bold Heading: Dynamic BS Date matching image */}
              <h1
                className="hero-main-title"
                style={{
                  color: '#0b2b5c',
                  textShadow: 'none',
                  fontSize: 'clamp(28px, 4.2vw, 44px)',
                  fontWeight: 900,
                  margin: '0 0 8px',
                  lineHeight: 1.18,
                  letterSpacing: '-0.015em',
                }}
              >
                {toNepaliDigits(activeDay.bsDay)} {heroMeta.monthNameNep} {toNepaliDigits(heroYear)}, {activeDay.dayNameNep}
              </h1>

              {/* Gregorian English Date & Vikram Sambat */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px 12px',
                  fontSize: '14px',
                  color: '#334155',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <CalendarIcon size={14} color="#64748b" />
                  <span>{activeDay.adMonthName} {activeDay.adDay}, {new Date(activeDay.adDate).getFullYear()}</span>
                </span>
                <span style={{ color: '#94a3b8' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Sun size={14} color="#f59e0b" />
                  <span>Bikram Sambat {toNepaliDigits(heroYear)}</span>
                </span>
              </div>

              {/* Capsules Row 1: Time & Weather */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                {/* Time Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.95)',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 10px rgba(11, 43, 92, 0.05)',
                    fontSize: '13px',
                    color: '#0b2b5c',
                  }}
                >
                  <Clock size={14} color="#2563eb" />
                  <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>{t('Time', 'Time')}</span>
                  <span style={{ fontWeight: 800, fontSize: '13.5px' }}>
                    {mounted ? timeStr : '02:36:44 PM NPT'}
                  </span>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 800,
                      backgroundColor: '#eff6ff',
                      border: '1px solid #dbeafe',
                      color: '#1d4ed8',
                      padding: '1px 5px',
                      borderRadius: '5px',
                    }}
                  >
                    NST
                  </span>
                </div>

                {/* Weather Pill */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    type="button"
                    onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      backgroundColor: 'rgba(255, 255, 255, 0.88)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1.5px solid rgba(255, 255, 255, 0.95)',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 10px rgba(11, 43, 92, 0.05)',
                      fontSize: '13px',
                      color: '#0b2b5c',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{currentCity.icon}</span>
                    <span style={{ fontWeight: 700 }}>
                      {language === 'ne' ? currentCity.cityNep : currentCity.cityEng}
                    </span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span style={{ fontWeight: 700 }}>{currentCity.temp}°C - {language === 'ne' ? currentCity.conditionNep : currentCity.conditionEng}</span>
                    <ChevronRight size={14} color="#64748b" />
                  </button>

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
              </div>

              {/* Event Holiday Pills (Dynamically reflects activeDay) */}
              <div className="hero-festival-badges">
                <div className="hero-event-pill hero-event-pill-today">
                  <div className="hero-event-label" style={{ color: '#dc2626' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#dc2626', flexShrink: 0 }} />
                    <span>{activeDay.isToday ? t('Today', 'आज') : `${toNepaliDigits(activeDay.bsDay)} ${heroMeta.monthNameNep}`} :</span>
                  </div>
                  <span className="hero-event-title">
                    {language === 'ne'
                      ? (activeDay.eventNep || `${activeDay.tithi}${activeDay.isWeekend ? ' • साप्ताहिक बिदा' : ''}`)
                      : (activeDay.eventEng || activeDay.eventNep || `${activeDay.tithi}${activeDay.isWeekend ? ' • Weekend' : ''}`)}
                  </span>
                  <span className="hero-event-tag hero-event-tag-red">
                    {activeDay.isHoliday ? t('Public Holiday', 'सार्वजनिक बिदा') : t('Regular Day', 'सामान्य दिन')}
                  </span>
                </div>

                {upcomingFestival && (
                  <div className="hero-event-pill hero-event-pill-upcoming">
                    <div className="hero-event-label" style={{ color: '#d97706' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#d97706', flexShrink: 0 }} />
                      <span>{t('Upcoming', 'अब आउने')} :</span>
                    </div>
                    <span className="hero-event-title">
                      {language === 'ne' ? upcomingFestival.eventNep : upcomingFestival.eventEng}
                    </span>
                    <span className="hero-event-tag hero-event-tag-amber">
                      {upcomingFestival.daysRemaining === 1
                        ? t('Tomorrow', 'भोलि')
                        : (language === 'ne' ? `${toNepaliDigits(upcomingFestival.daysRemaining)} दिनपछि` : `in ${upcomingFestival.daysRemaining} days`)}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>


          {/* RIGHT COLUMN: White Rounded Interactive Card matching image */}
          <div className="hero-calendar-card">
            {/* Tab Switcher: [ 🛡️ Quick Tools ]  [ 📅 Monthly Alert / Patro ] */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'inline-flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '9999px', border: '1px solid #e2e8f0', maxWidth: '100%' }}>
                <button
                  type="button"
                  onClick={() => setHeroRightTab('tools')}
                  className="hero-switcher-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 750,
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: heroRightTab === 'tools' ? '#ffffff' : 'transparent',
                    color: heroRightTab === 'tools' ? '#0f172a' : '#64748b',
                    boxShadow: heroRightTab === 'tools' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: '#dc2626' }}>🛡️</span>
                  <span>{t('Quick Tools', 'Quick Tools')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroRightTab('calendar')}
                  className="hero-switcher-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 750,
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: heroRightTab === 'calendar' ? '#ffffff' : 'transparent',
                    color: heroRightTab === 'calendar' ? '#0f172a' : '#64748b',
                    boxShadow: heroRightTab === 'calendar' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>📅</span>
                  <span>{t('Monthly Patro', 'Monthly Alert')}</span>
                </button>
              </div>

              {heroRightTab === 'tools' ? (
                <Link
                  href="/tools"
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#1d4ed8',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    padding: '4px 6px',
                  }}
                >
                  <span>{t('All 70+ Tools →', 'All 70+ Tools →')}</span>
                </Link>
              ) : (
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
              )}
            </div>

            {/* TAB CONTENT: Quick Tools (Option A) or Monthly Calendar View */}
            {heroRightTab === 'tools' ? (
              <HeroQuickCalcCard onSwitchToPatro={() => setHeroRightTab('calendar')} hideHeader={true} />
            ) : (
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
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
