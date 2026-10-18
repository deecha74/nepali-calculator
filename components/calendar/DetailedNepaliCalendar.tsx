'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sun, 
  Moon, 
  Clock, 
  ChevronDown, 
  Copy, 
  Check,
  Search,
  Sparkles,
  MapPin,
  Share2,
  Info,
  X,
  Compass,
  Star
} from 'lucide-react';
import { 
  generateMonthDays, 
  DetailedCalendarDay, 
  MONTH_NAMES_INFO, 
  WEEKDAYS_NEP 
} from '@/lib/calendarData';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { useLanguage } from '@/components/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function DetailedNepaliCalendar() {
  const { language, t } = useLanguage();

  // Selected State (Default Anchor: Ashwin 2083 BS)
  const [selectedYear, setSelectedYear] = useState<number>(2083);
  const [selectedMonth, setSelectedMonth] = useState<number>(6); // Ashwin (Month 6)
  const [selectedDay, setSelectedDay] = useState<DetailedCalendarDay | null>(null);
  const [monthPickerOpen, setMonthPickerOpen] = useState<boolean>(false);
  const [englishLabels, setEnglishLabels] = useState<boolean>(false);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Live Nepal Clock & Weather
  const [timeStr, setTimeStr] = useState<string>("बिहानी ०८:०५:१२ AM");
  const [weatherTemp, setWeatherTemp] = useState<number>(25);
  const [weatherDesc, setWeatherDesc] = useState<string>("Partly Cloudy");

  // Tabs & Search
  const [activeBottomTab, setActiveBottomTab] = useState<'festivals' | 'sait' | 'holidays'>('festivals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Live Nepal Clock (UTC +5:45)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const npt = new Date(utc + 5.75 * 3600000);
      
      const hours = npt.getHours();
      const minutes = npt.getMinutes().toString().padStart(2, '0');
      const seconds = npt.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
      const periodNep = hours >= 12 ? (hours >= 19 ? 'राति' : 'दिउँसो') : (hours < 5 ? 'राति' : 'बिहानी');

      setTimeStr(`${periodNep} ${toNepaliDigits(displayHours)}:${toNepaliDigits(minutes)}:${toNepaliDigits(seconds)} ${ampm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time weather from /api/live-rates
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const json = await res.json();
          if (json?.weather?.kathmandu) {
            setWeatherTemp(json.weather.kathmandu.temp || 25);
            setWeatherDesc(json.weather.kathmandu.condition || 'Partly Cloudy');
          }
        }
      } catch (err) {}
    }
    fetchWeather();
  }, []);

  // Generate Month Data
  const { meta, days, allGridDays } = useMemo(() => {
    return generateMonthDays(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  // Today Day (Ashwin 27, 2083 BS)
  const todayDay = useMemo(() => {
    return days.find((d) => d.isToday) || days[26] || days[0];
  }, [days]);

  // Active Highlighted Day
  const activeDay = selectedDay || todayDay;

  // Month navigation
  const handlePrevMonth = () => {
    setSlideDirection('left');
    if (selectedMonth === 1) {
      setSelectedYear(prev => prev - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setSlideDirection('right');
    if (selectedMonth === 12) {
      setSelectedYear(prev => prev + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
    setSelectedDay(null);
  };

  const handleGoToday = () => {
    setSelectedYear(2083);
    setSelectedMonth(6);
    setSelectedDay(todayDay);
  };

  // Quick Festival Jump Handlers
  const handleJumpFestival = (fMonth: number, fDay: number) => {
    setSelectedYear(2083);
    setSelectedMonth(fMonth);
    setMonthPickerOpen(false);
    const targetDays = generateMonthDays(2083, fMonth).days;
    const target = targetDays.find(d => d.bsDay === fDay);
    if (target) setSelectedDay(target);
  };

  // Festivals of this month
  const festivalList = useMemo(() => {
    return days
      .filter((d) => Boolean(d.eventNep))
      .map((d) => {
        const diff = d.bsDay - 27; // relative to today Ashwin 27
        let relText = `${toNepaliDigits(Math.abs(diff))} दिन बाँकी`;
        if (diff === 0) relText = 'आज';
        else if (diff === -1) relText = 'हिजो';
        else if (diff === -2) relText = 'अस्ति';
        else if (diff < -2) relText = `${toNepaliDigits(Math.abs(diff))} दिन अगाडि`;
        else if (diff === 1) relText = 'भोलि';
        else if (diff === 2) relText = 'पर्सि';

        return {
          day: d,
          name: d.eventNep || '',
          tithi: d.tithi,
          adDate: d.adDate,
          isHoliday: d.isHoliday,
          relText,
          diff
        };
      });
  }, [days]);

  // Holidays list
  const holidayList = useMemo(() => {
    return days
      .filter(d => d.isHoliday || d.isWeekend)
      .map(d => {
        const diff = d.bsDay - 27;
        let relText = `${toNepaliDigits(Math.abs(diff))} दिन बाँकी`;
        if (diff === 0) relText = 'आज';
        else if (diff < 0) relText = `${toNepaliDigits(Math.abs(diff))} दिन अगाडि`;

        return {
          day: d,
          name: d.holidayReason || d.eventNep || (d.dayOfWeek === 6 ? 'शनिबार साप्ताहिक बिदा' : (d.dayOfWeek === 0 ? 'आइतबार साप्ताहिक बिदा' : 'सार्वजनिक बिदा')),
          tithi: d.tithi,
          adDate: d.adDate,
          relText,
          diff
        };
      });
  }, [days]);

  // Auspicious Sait list
  const saitList = useMemo(() => {
    const list: Array<{ day: DetailedCalendarDay; title: string; category: string }> = [];
    days.forEach((d) => {
      if (d.sahit && d.sahit.length > 0) {
        d.sahit.forEach((s) => {
          list.push({ day: d, title: s, category: 'मुहूर्त / साइत' });
        });
      } else if (d.tithi.includes('पञ्चमी') || d.tithi.includes('दशमी') || d.tithi.includes('एकादशी')) {
        list.push({ day: d, title: `शुभ मुहूर्त (${d.tithi})`, category: 'पञ्चाङ्ग साइत' });
      }
    });
    return list;
  }, [days]);

  // Search filtered bottom items
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (activeBottomTab === 'festivals') {
      if (!q) return festivalList;
      return festivalList.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.tithi.toLowerCase().includes(q) ||
        item.adDate.includes(q)
      );
    } else if (activeBottomTab === 'holidays') {
      if (!q) return holidayList;
      return holidayList.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.tithi.toLowerCase().includes(q)
      );
    } else {
      if (!q) return saitList;
      return saitList.filter(item => item.title.toLowerCase().includes(q));
    }
  }, [activeBottomTab, festivalList, holidayList, saitList, searchQuery]);

  const handleCopyDay = () => {
    const text = `नेपाली पात्रो: ${toNepaliDigits(activeDay.bsDay)} ${meta.monthNameNep} ${toNepaliDigits(activeDay.bsYear)}, ${activeDay.dayNameNep} (${activeDay.adDate}) | ${activeDay.tithi} (${activeDay.paksha}) | सूर्योदय: ${activeDay.sunrise} • सूर्यास्त: ${activeDay.sunset} | via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 0 60px' }}>
      
      {/* 2-Column Minimal Master Layout */}
      <div className="calendar-main-grid">
        
        {/* ================= LEFT COLUMN: THE CLEAN MINIMAL CALENDAR ================= */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '24px', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            padding: 'clamp(16px, 2.5vw, 24px)',
            position: 'relative',
            minWidth: 0,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          
          {/* Calendar Top Header: Big Month, Year, Dropdown & Right Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Left: Month + Year Title with Chevron Trigger */}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setMonthPickerOpen(!monthPickerOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
                    {meta.monthNameNep} {toNepaliDigits(selectedYear)}
                  </span>
                  <span style={{ fontSize: '15px', color: '#64748b', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {meta.monthNameEng} · {meta.adRange} {selectedYear === 2083 ? '2026' : ''}
                    <ChevronDown size={16} color="#64748b" />
                  </span>
                </button>
              </div>

              {/* Month & Year Picker Popover */}
              {monthPickerOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: 0,
                    width: 'min(360px, calc(100vw - 32px))',
                    maxWidth: 'calc(100vw - 32px)',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                    padding: '16px 14px',
                    zIndex: 100,
                  }}
                >
                  {/* Year Switcher Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {[2081, 2082, 2083, 2084, 2085].map(yr => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedYear(yr)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: selectedYear === yr ? 800 : 600,
                            backgroundColor: selectedYear === yr ? '#0f172a' : '#f1f5f9',
                            color: selectedYear === yr ? '#ffffff' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          {toNepaliDigits(yr)}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setMonthPickerOpen(false)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* 12 Months Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {MONTH_NAMES_INFO.map(m => (
                      <button
                        key={m.num}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(m.num);
                          setMonthPickerOpen(false);
                          setSelectedDay(null);
                        }}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '10px',
                          border: '1px solid',
                          borderColor: selectedMonth === m.num ? '#f59e0b' : '#f1f5f9',
                          backgroundColor: selectedMonth === m.num ? '#fffbeb' : '#ffffff',
                          color: selectedMonth === m.num ? '#b45309' : '#1e293b',
                          fontSize: '13px',
                          fontWeight: selectedMonth === m.num ? 900 : 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.12s ease'
                        }}
                      >
                        <div>{m.nep}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{m.eng}</div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Festival Shortcuts */}
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, alignSelf: 'center' }}>द्रुत पहुँच:</span>
                    <button
                      type="button"
                      onClick={() => handleJumpFestival(6, 25)}
                      style={{ padding: '3px 8px', fontSize: '11px', borderRadius: '9999px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}
                    >
                      घटस्थापना (दशैं)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleJumpFestival(7, 17)}
                      style={{ padding: '3px 8px', fontSize: '11px', borderRadius: '9999px', border: '1px solid #fef3c7', backgroundColor: '#fffbeb', color: '#d97706', fontWeight: 700, cursor: 'pointer' }}
                    >
                      लक्ष्मी पूजा (तिहार)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: "आज" Pill Button + Prev/Next Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={handleGoToday}
                style={{
                  padding: '7px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#f59e0b',
                  color: '#000000',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}
                className="hover-lift"
              >
                आज
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Previous Month"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.12s ease'
                  }}
                  className="hover-lift"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next Month"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.12s ease'
                  }}
                  className="hover-lift"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Weekday Column Headers (Sunday & Saturday in Red, Mon-Fri in Slate) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              marginBottom: '10px',
              padding: '6px 0',
              textAlign: 'center',
              width: '100%',
              minWidth: 0
            }}
          >
            {WEEKDAYS_NEP.map((dayItem, idx) => {
              const isWeekendHoliday = idx === 0 || idx === 6; // Sunday & Saturday
              return (
                <div key={dayItem.fullNep} style={{ padding: '4px 2px', minWidth: 0, overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      fontSize: 'clamp(11px, 1.2vw, 14px)', 
                      fontWeight: 800, 
                      color: isWeekendHoliday ? '#dc2626' : '#334155',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={dayItem.fullNep}
                  >
                    {dayItem.fullNep}
                  </div>
                  {englishLabels && (
                    <div style={{ fontSize: 'clamp(9px, 0.9vw, 10px)', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {dayItem.eng}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Animated 7-Column Day Grid with Breathing Room & Rounded Cells */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedYear}-${selectedMonth}`}
              initial={{ opacity: 0, x: slideDirection === 'right' ? 14 : -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === 'right' ? -14 : 14 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="calendar-cell-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: 'clamp(3px, 0.6vw, 6px)',
                width: '100%',
                minWidth: 0
              }}
            >
              {allGridDays.map((d, index) => {
                const isSelected = activeDay.bsYear === d.bsYear && activeDay.bsMonth === d.bsMonth && activeDay.bsDay === d.bsDay;
                const isToday = d.isToday;
                const isSaturday = d.dayOfWeek === 6;
                const isSunday = d.dayOfWeek === 0;
                const hasHoliday = d.isHoliday || isSaturday || isSunday;

                return (
                  <motion.div
                    key={`${d.bsMonth}-${d.bsDay}-${index}`}
                    whileHover={{ y: -2, transition: { duration: 0.12 } }}
                    onClick={() => setSelectedDay(d)}
                    style={{
                      minHeight: 'clamp(68px, 8vw, 92px)',
                      padding: 'clamp(4px, 0.6vw, 7px)',
                      borderRadius: '12px',
                      border: isToday 
                        ? '2px solid #d97706' 
                        : (isSelected 
                            ? '2px solid #f59e0b' 
                            : '1px solid #f1f5f9'),
                      backgroundColor: isToday 
                        ? '#f59e0b' 
                        : (isSelected 
                            ? '#fffbeb' 
                            : (d.isPadding ? '#fafbfc' : '#ffffff')),
                      color: isToday ? '#000000' : '#0f172a',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      boxShadow: isToday 
                        ? '0 6px 18px rgba(245, 158, 11, 0.35)' 
                        : (isSelected ? '0 4px 12px rgba(245, 158, 11, 0.15)' : 'none'),
                      opacity: d.isPadding ? 0.42 : 1,
                      minWidth: 0,
                      width: '100%',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.12s ease, background-color 0.12s ease'
                    }}
                  >
                    {/* Top Row: Event pill on left, Gregorian AD day on right */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '14px', width: '100%', minWidth: 0, gap: '2px', overflow: 'hidden' }}>
                      {d.eventNep ? (
                        <div
                          style={{
                            fontSize: 'clamp(8px, 0.8vw, 9.5px)',
                            fontWeight: 700,
                            color: isToday ? '#78350f' : (d.isHoliday ? '#dc2626' : '#1e3a8a'),
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minWidth: 0,
                            flex: 1,
                            lineHeight: 1.15
                          }}
                          title={d.eventNep}
                        >
                          {d.eventNep}
                        </div>
                      ) : (
                        <div style={{ minWidth: 0, flex: 1 }} />
                      )}

                      <div
                        style={{
                          fontSize: 'clamp(9px, 0.9vw, 11px)',
                          fontWeight: 500,
                          color: isToday ? '#78350f' : '#94a3b8',
                          lineHeight: 1,
                          flexShrink: 0
                        }}
                      >
                        {d.adDay}
                      </div>
                    </div>

                    {/* Middle: Prominent Nepali Numeral + "आज" pill badge if today */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', margin: '2px 0', minWidth: 0, width: '100%', overflow: 'hidden' }}>
                      <span
                        style={{
                          fontSize: 'clamp(16px, 1.8vw, 22px)',
                          fontWeight: 900,
                          color: isToday 
                            ? '#000000' 
                            : (hasHoliday ? '#dc2626' : '#0f172a'),
                          lineHeight: 1,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {toNepaliDigits(d.bsDay)}
                      </span>

                      {isToday && (
                        <span
                          style={{
                            fontSize: 'clamp(8px, 0.8vw, 9.5px)',
                            fontWeight: 900,
                            backgroundColor: '#18181b',
                            color: '#ffffff',
                            padding: '1px 4px',
                            borderRadius: '9999px',
                            lineHeight: 1.2,
                            flexShrink: 0
                          }}
                        >
                          आज
                        </span>
                      )}
                    </div>

                    {/* Bottom: Tithi Name */}
                    <div style={{ textAlign: 'center', width: '100%', minWidth: 0, overflow: 'hidden' }}>
                      <span
                        style={{
                          fontSize: 'clamp(8.5px, 0.85vw, 10px)',
                          fontWeight: 500,
                          color: isToday ? '#78350f' : '#94a3b8',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          width: '100%'
                        }}
                      >
                        {d.tithiShort}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Minimal Bottom Legend */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: '#64748b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#f59e0b' }} />
                <span>आज (Today)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#dc2626' }} />
                <span>सार्वजनिक बिदा / शनिबार / आइतबार</span>
              </div>
            </div>

            <div style={{ fontWeight: 600 }}>
              महिनाका दिन: {meta.totalDays} • नेपाल संवत् ११४६
            </div>
          </div>
        </div>


        {/* ================= RIGHT COLUMN: CELESTIAL PANCHANGA & DAY DETAILS ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, width: '100%', boxSizing: 'border-box' }}>
          
          {/* Main Panchanga Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: 'clamp(16px, 2vw, 20px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Controls: English toggle & Panchanga Info button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={() => setEnglishLabels(!englishLabels)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span>{englishLabels ? 'नेपाली' : 'A/Z English'}</span>
              </button>

              <button
                type="button"
                onClick={() => setInfoModalOpen(true)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  color: '#334155',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Info size={13} color="#003893" />
                <span>पञ्चाङ्ग विवरण</span>
              </button>
            </div>

            {/* ASTONISHING COSMIC ASTRONOMICAL BANNER (Saturn, Stars & Deep Space) */}
            <div
              style={{
                height: '118px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e1b4b 100%)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Twinkling Star Dust */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #ffffff, transparent), radial-gradient(1px 1px at 60px 80px, #93c5fd, transparent), radial-gradient(1.5px 1.5px at 120px 20px, #ffffff, transparent), radial-gradient(1px 1px at 180px 70px, #fef08a, transparent), radial-gradient(1.5px 1.5px at 240px 30px, #ffffff, transparent), radial-gradient(1px 1px at 290px 90px, #93c5fd, transparent)',
                  opacity: 0.85
                }} 
              />

              {/* Glowing Nebula Cloud */}
              <div
                style={{
                  position: 'absolute',
                  width: '140px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), transparent 70%)',
                  left: '20px',
                  top: '10px'
                }}
              />

              {/* Saturn Celestial Illustration (Vedic Shani / Astronomical Charm) */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <svg width="78" height="52" viewBox="0 0 100 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Planet Body */}
                  <defs>
                    <linearGradient id="saturnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(253, 230, 138, 0.1)" />
                      <stop offset="30%" stopColor="rgba(253, 230, 138, 0.85)" />
                      <stop offset="70%" stopColor="rgba(245, 158, 11, 0.9)" />
                      <stop offset="100%" stopColor="rgba(253, 230, 138, 0.1)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Back of Ring */}
                  <ellipse cx="50" cy="33" rx="44" ry="11" stroke="url(#ringGrad)" strokeWidth="3.5" transform="rotate(-18 50 33)" strokeDasharray="90 90" strokeDashoffset="45" opacity="0.6" />
                  
                  {/* Planet Sphere */}
                  <circle cx="50" cy="33" r="19" fill="url(#saturnGrad)" />
                  <ellipse cx="50" cy="33" r="19" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                  
                  {/* Front of Ring */}
                  <ellipse cx="50" cy="33" rx="44" ry="11" stroke="url(#ringGrad)" strokeWidth="3.5" transform="rotate(-18 50 33)" strokeDasharray="100 80" strokeDashoffset="135" />
                </svg>

                {/* Distant moon */}
                <div 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: '#67e8f9', 
                    boxShadow: '0 0 6px #67e8f9',
                    marginBottom: '24px'
                  }} 
                />

                <div 
                  style={{ 
                    width: '4px', 
                    height: '4px', 
                    borderRadius: '50%', 
                    backgroundColor: '#f43f5e', 
                    boxShadow: '0 0 4px #f43f5e',
                    marginTop: '20px'
                  }} 
                />
              </div>

              {/* Top Corner Astronomical Text */}
              <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '10px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em' }}>
                वैदिक पञ्चाङ्ग • खगोलीय स्थिति
              </div>
            </div>

            {/* Selected Date Header (Red Bold + English Date) */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#dc2626', letterSpacing: '-0.02em' }}>
                  {toNepaliDigits(activeDay.bsDay)} {meta.monthNameNep} {toNepaliDigits(activeDay.bsYear)}, {activeDay.dayNameNep}
                </span>

                {activeDay.isToday && (
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: '#f59e0b',
                      color: '#000000',
                      fontSize: '11px',
                      fontWeight: 900
                    }}
                  >
                    आज
                  </span>
                )}
              </div>

              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
                {activeDay.adDate} ({activeDay.dayNameEng})
              </div>
            </div>

            {/* Astral Bar: Moon Phase, Sunrise, Sunset */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #f1f5f9',
                marginBottom: '14px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#334155'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🌓</span>
                <span>{activeDay.moonPhaseText || 'घट्दो अर्धचन्द्र'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}>
                <span title="सूर्योदय">🌅 {activeDay.sunrise}</span>
                <span title="सूर्यास्त">🌇 {activeDay.sunset}</span>
              </div>
            </div>

            {/* Tithi & Astrological Subtext */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>
                {meta.monthNameNep} {activeDay.paksha.includes('कृष्ण') ? 'कृष्ण' : 'शुक्ल'} {activeDay.tithiShort}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                {activeDay.yoga || 'Siddha'} · {activeDay.karana || 'Vanija'} · {activeDay.nakshatra}
              </div>
            </div>

            {/* Live Clock & Weather Box */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                marginBottom: '14px'
              }}
            >
              {/* Live Nepal Clock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                <Clock size={14} color="#f59e0b" />
                <span>{timeStr}</span>
              </div>

              {/* Weather Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                <span>⛅ {weatherTemp}°C, {weatherDesc}</span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <MapPin size={11} /> काठमाडौं
                </span>
              </div>
            </div>

            {/* चाडपर्व (Festivals & Events) */}
            <div style={{ marginBottom: '14px', fontSize: '13px' }}>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>चाडपर्व: </span>
              {activeDay.eventNep ? (
                <span style={{ fontWeight: 800, color: activeDay.isHoliday ? '#dc2626' : '#003893' }}>
                  🎉 {activeDay.eventNep}
                </span>
              ) : (
                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                  आज कुनै विशेष कार्यक्रम छैन।
                </span>
              )}
            </div>

            {/* साइत (Auspicious Sait Pills) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>साइत:</span>
              <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#fce7f3', color: '#9d174d', fontSize: '11.5px', fontWeight: 800 }}>
                रुद्री जुर्ने
              </span>
              <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '11.5px', fontWeight: 800 }}>
                अग्नि वास
              </span>
              <span style={{ padding: '3px 10px', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#166534', fontSize: '11.5px', fontWeight: 800 }}>
                यात्रा साइत
              </span>
            </div>

            {/* Muhurat & Rahukaal Times */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>शुभ मुहूर्त (अभिजित):</span>
                <span style={{ fontWeight: 800, color: '#16a34a' }}>{activeDay.shubhMuhurat || '११:३८ - १२:२४'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>राहुकाल (अशुभ समय):</span>
                <span style={{ fontWeight: 800, color: '#dc2626' }}>{activeDay.rahukaal || '१५:०० - १६:३०'}</span>
              </div>
            </div>
          </div>

          {/* Quick Share / Copy Pill Button */}
          <button
            type="button"
            onClick={handleCopyDay}
            style={{
              padding: '10px 16px',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
            }}
            className="hover-lift"
          >
            {copied ? <Check size={15} color="#16a34a" /> : <Share2 size={15} color="#003893" />}
            <span>{copied ? 'मिति विवरण कपी भयो!' : 'आजको पञ्चाङ्ग शेयर वा कपी गर्नुहोस्'}</span>
          </button>

        </div>
      </div>


      {/* ================= BOTTOM SECTION: FILTERABLE FESTIVALS & HOLIDAYS ================= */}
      <div 
        style={{ 
          marginTop: '36px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Tab Controls + Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveBottomTab('festivals')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeBottomTab === 'festivals' ? '#f59e0b' : '#f1f5f9',
                color: activeBottomTab === 'festivals' ? '#000000' : '#475569',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🎉 चाडपर्वहरू</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>({festivalList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveBottomTab('sait')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeBottomTab === 'sait' ? '#f59e0b' : '#f1f5f9',
                color: activeBottomTab === 'sait' ? '#000000' : '#475569',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>⭐ शुभ साइतहरू</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>({saitList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveBottomTab('holidays')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeBottomTab === 'holidays' ? '#dc2626' : '#f1f5f9',
                color: activeBottomTab === 'holidays' ? '#ffffff' : '#475569',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🛑 सरकारी बिदाहरू</span>
              <span style={{ fontSize: '11px', opacity: 0.85 }}>({holidayList.length})</span>
            </button>
          </div>

          {/* Instant Search Input */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="पर्व वा साइत खोज्नुहोस्..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 34px',
                borderRadius: '9999px',
                border: '1px solid #cbd5e1',
                fontSize: '12.5px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Grid of festival / holiday cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '10px' }}>
          {filteredItems.map((item: any, idx: number) => {
            const isToday = item.day.bsDay === 27;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedDay(item.day);
                  window.scrollTo({ top: 80, behavior: 'smooth' });
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: isToday ? '2px solid #f59e0b' : '1px solid #f1f5f9',
                  backgroundColor: isToday ? '#fffbeb' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                }}
                className="hover-lift"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Date Badge */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: item.day.isHoliday ? '#fef2f2' : '#f1f5f9',
                      color: item.day.isHoliday ? '#dc2626' : '#0f172a',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      lineHeight: 1,
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{toNepaliDigits(item.day.bsDay)}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, marginTop: '2px', opacity: 0.8 }}>{meta.monthNameNep}</span>
                  </div>

                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                      {item.name || item.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      {item.tithi || item.category} • {item.day.adDate}
                    </div>
                  </div>
                </div>

                {item.relText && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isToday ? '#b45309' : '#475569',
                      backgroundColor: isToday ? '#fef3c7' : '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.relText}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= INFO MODAL (PANCHANGA DETAILS) ================= */}
      {infoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setInfoModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🪐</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  वैदिक पञ्चाङ्ग विवरण तथा महत्व
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}>
                <strong>पञ्चाङ्ग (Panchanga):</strong> पञ्चाङ्ग भनेको पाँच अङ्ग (तिथि, वार, नक्षत्र, योग र करण) को संयोजन हो। यसले हिन्दु तथा नेपाली परम्परा अनुसार दिनको शुभ-अशुभ समय र ग्रह नक्षत्रको स्थिति निर्धारण गर्दछ।
              </p>
              <p style={{ margin: 0 }}>
                <strong>शुभ मुहूर्त (Abhijit):</strong> हरेक दिनको मध्यभागमा पर्ने अत्यन्त शुभ समय, जसमा थालिएका सम्पूर्ण कार्यहरू सफल हुने जनविश्वास छ।
              </p>
              <p style={{ margin: 0 }}>
                <strong>राहुकाल (Rahukaal):</strong> दैनिक समय चक्रमा पर्ने राहुको प्रभाव समय, जसमा नयाँ वा महत्वपूर्ण काम गर्न निषेध मानिन्छ।
              </p>
              <p style={{ margin: 0 }}>
                <strong>बिदा व्यवस्था:</strong> यस पात्रोमा शनिबार र आइतबार दुवै दिनलाई साप्ताहिक बिदाको रूपमा तथा सरकारद्वारा राजपत्रमा प्रकाशित सबै चाडपर्व बिदाहरू समावेश गरिएको छ।
              </p>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                बुझियो
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
