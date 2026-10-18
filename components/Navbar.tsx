'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  ReceiptText, 
  Landmark, 
  ChevronDown,
  LineChart,
  FolderOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Calendar,
  Compass,
  Zap,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveGoldTicker } from '@/components/LiveGoldTicker';
import { LanguageSwitchToggle, useLanguage } from '@/components/LanguageContext';
import { SearchModal } from '@/components/SearchModal';
import { NepalCalcLogo } from '@/components/NepalCalcLogo';

interface NavToolItem {
  name: string;
  href: string;
  desc: string;
  badge?: string;
}

interface NavSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
  dropdownLeft: string;
  subtitle: string;
  col1: NavToolItem[];
  col2: NavToolItem[];
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>('tax');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, t } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);

  // Passive scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K search shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (section: string) => {
    setActiveDropdown(prev => prev === section ? null : section);
  };

  const navSections: NavSection[] = [
    {
      id: 'tax',
      title: t('Tax & Labour', 'कर तथा श्रम'),
      icon: <ReceiptText size={18} color="#c8102e" />,
      color: '#c8102e',
      iconBg: '#fee2e2',
      dropdownLeft: '-30px',
      subtitle: t('Income Tax FY 2083/84, Labour Act & Customs', 'आयकर ऐन, श्रम ऐन तथा भन्सार हिसाब'),
      col1: [
        { name: t('Income Tax (FY 2083/84)', 'आयकर हिसाब (२०८३/८४)'), href: '/tax', desc: 'Salary brackets, SSF, CIT deductions', badge: 'Hot' },
        { name: t('TDS & Withholding Tax', 'स्रोतमा कर कट्टी (TDS)'), href: '/tds', desc: 'Rent, consultancy, freight & contracts', badge: 'New' },
        { name: t('Schedule 2 Tax Depreciation', 'अनुसूची-२ कर ह्रासकट्टी'), href: '/depreciation', desc: 'Block A-E WDV & 7% repairs limit', badge: 'New' },
        { name: t('Corporate & Advance Tax', 'कम्पनी आयकर तथा किस्ता'), href: '/corporate-tax', desc: 'Pvt Ltd rates & Section 94 schedule', badge: 'New' },
        { name: t('Labour Act Gratuity & Leave', 'श्रम ऐन उपदान तथा बिदा'), href: '/gratuity', desc: 'Severance pay & accumulated leave' },
      ],
      col2: [
        { name: t('13% VAT & Service Charge', '१३% भ्याट तथा सेवा शुल्क'), href: '/vat', desc: 'Forward & reverse VAT calculations' },
        { name: t('Rental House TDS Tax', 'घरबहाल कर (१०% TDS)'), href: '/rent-tax', desc: 'Local municipality & IRD rent tax' },
        { name: t('Overtime (OT) 1.5x Pay', 'ओभरटाइम १.५ गुणा हिसाब'), href: '/overtime', desc: 'Overtime rate per hour & law' },
        { name: t('Foreign Study NOC Tax (3%)', 'विदेश अध्ययन एनओसी कर'), href: '/noc-tax', desc: 'MoEST Education Tax & remittance' },
        { name: t('Official Finance Acts', 'आधिकारिक आर्थिक ऐन'), href: '/documents', desc: 'Nepal government gazette schedules' },
      ]
    },
    {
      id: 'finance',
      title: t('Loans & Shares', 'बैंकिङ तथा शेयर'),
      icon: <LineChart size={18} color="#003893" />,
      color: '#003893',
      iconBg: '#dbeafe',
      dropdownLeft: '-110px',
      subtitle: t('Loans, NEPSE, IPO, Mutual Funds & NRB Forex', 'ऋण, शेयर बजार, आईपीओ तथा विदेशी मुद्रा'),
      col1: [
        { name: t('SIP Mutual Fund Compounding', 'एसआइपी म्युचुअल फण्ड'), href: '/sip', desc: 'Monthly investment compounding wealth', badge: 'Wealth' },
        { name: t('Bank Loan EMI & Schedule', 'बैंक लोन ईएमआई (EMI)'), href: '/emi', desc: 'Home, auto & business loan schedules' },
        { name: t('Loan Limit (NRB 50% DSTI)', 'कर्जा सीमा (DSTI ५०%)'), href: '/loan-eligibility', desc: 'Nepal Rastra Bank debt eligibility' },
        { name: t('EPF, CIT & Pension Fund', 'सञ्चय कोष र पेन्सन'), href: '/pension', desc: 'SSF & retirement fund projections' },
        { name: t('NEPSE Broker & Share Profit', 'नेप्से शेयर ब्रोकर हिसाब'), href: '/nepse', desc: 'SEBON fees, broker commission, CGT' },
      ],
      col2: [
        { name: t('IPO Allotment Probability', 'आईपीओ बाँडफाँड सम्भावना'), href: '/ipo-allotment', desc: 'MeroShare 10 kitta lottery odds' },
        { name: t('FD vs Debenture Yield', 'मुद्दती vs ऋणपत्र तुलना'), href: '/fd-vs-debenture', desc: 'Bank deposit vs bond after-tax profit' },
        { name: t('सयकडा २/३ ब्याज र मुद्दती', 'सयकडा ब्याज तथा मुद्दती'), href: '/interest', desc: 'Monthly desi interest & compound' },
        { name: t('NRB Live Forex Rates', 'नेपाल राष्ट्र बैंक विदेशी मुद्रा'), href: '/forex', desc: 'Daily official exchange currency rates' },
        { name: t('Inflation & Rupee Value', 'मुद्रास्फीति र क्रयशक्ति'), href: '/inflation', desc: 'Historical inflation purchasing power' },
      ]
    },
    {
      id: 'land',
      title: t('Land & Utilities', 'जग्गा तथा उपयोगिता'),
      icon: <Landmark size={18} color="#d97706" />,
      color: '#d97706',
      iconBg: '#fef3c7',
      dropdownLeft: '-170px',
      subtitle: t('Land Conversion, Bluebook, Gold, Power & Agri', 'जग्गा नापजाँच, ब्लुबुक, सुनचाँदी र बिजुली बिल'),
      col1: [
        { name: t('Land Malpot Tax & CGT', 'मालपोत लिखत तथा पूँजीगत लाभकर'), href: '/malpot', desc: 'Registration fee, 25% female rebate & CGT', badge: 'New' },
        { name: t('Land Area (Ropani ⇄ Bigha)', 'जग्गा नाप (रोपनी ⇄ बिघा)'), href: '/land', desc: 'Aana, Paisa, Daam, Kattha, Dhur valuation', badge: 'Popular' },
        { name: t('Vehicle Bluebook Tax & Fines', 'सवारी ब्लुबुक कर र जरिवाना'), href: '/vehicle', desc: 'Bike, car, EV annual provincial tax' },
        { name: t('Gold & Silver Rates & Jarti', 'सुनचाँदी मूल्य तथा जर्ती'), href: '/gold', desc: 'Tola, Lal, Gram with making charge' },
        { name: t('Inverter & Battery Backup', 'इन्भर्टर ब्याट्री ब्याकअप'), href: '/battery-backup', desc: 'Household load watts & runtime hours' },
        { name: t('Krishi Fertilizer Dosage', 'कृषि मल तथा बीउ मात्रा'), href: '/krishi-fertilizer', desc: 'Urea, DAP, Potash per Ropani/Bigha' },
      ],
      col2: [
        { name: t('Preeti to Unicode Converter', 'प्रिती युनिकोड रूपान्तरण'), href: '/preeti', desc: 'Instant offline font convert' },
        { name: t('Nepali Number to Words', 'नेपाली अंकलाई अक्षरमा'), href: '/number-to-words', desc: 'Bank cheque & voucher spelling' },
        { name: t('NEA Electricity Bill', 'विद्युत् प्राधिकरण महसुल'), href: '/nea', desc: 'NEA tier tariff slab calculator' },
        { name: t('Drinking Water Bill', 'खानेपानी बिल महसुल'), href: '/khanepani', desc: 'Water meter tariff & sewerage' },
        { name: t('Traditional Units (धार्नी/माना)', 'परम्परागत तौल र नाप'), href: '/traditional-units', desc: 'Dharni, Sher, Mana, Pathi' },
        { name: t('BMI & Ideal Weight', 'बीएमआई (BMI) हिसाब'), href: '/bmi', desc: 'Body mass index & health target' },
      ]
    },
    {
      id: 'citizen',
      title: t('Citizen & Services', 'नागरिक सेवा तथा पात्रो'),
      icon: <GraduationCap size={18} color="#059669" />,
      color: '#059669',
      iconBg: '#d1fae5',
      dropdownLeft: '-260px',
      subtitle: t('License Exam, Passport, Patro, Typing & Citizen Tools', 'लाइसेन्स परीक्षा, राहदानी, पात्रो र नागरिक सेवा'),
      col1: [
        { name: t('Driving License Written Exam', 'सवारी चालक लिखित परीक्षा'), href: '/license-exam', desc: 'Official DOTM mock quiz & random 20 test', badge: 'DOTM' },
        { name: t('MRP & E-Passport Fee', 'ई-राहदानी (Passport) दस्तुर'), href: '/passport-fee', desc: 'Normal, urgent & express passport fees' },
        { name: t('Detailed Nepali Patro 2083', 'नेपाली पात्रो (क्यालेन्डर)'), href: '/calendar', desc: 'Festivals, tithi, holidays & panchang', badge: 'Patro' },
        { name: t('Date Converter (BS ⇄ AD)', 'मिति रूपान्तरण (BS ⇄ AD)'), href: '/date', desc: 'Bikram Sambat to Gregorian dates' },
        { name: t('Daily Rashifal (Horoscope)', 'दैनिक राशिफल'), href: '/rashifal', desc: 'Astrological daily forecast by rashi' },
      ],
      col2: [
        { name: t('Typing Speed Test (WPM)', 'टाइपिङ गति परीक्षण'), href: '/typing-test', desc: 'Loksewa Unicode & Preeti benchmark' },
        { name: t('Nepal Post & EMS Shipping', 'हुलाक तथा पार्सल दर'), href: '/postal-shipping', desc: 'Domestic & overseas postage tariff' },
        { name: t('Red Cross Blood Donation', 'रक्तदान योग्यता र समूह'), href: '/blood-donation', desc: '90/120 days interval & compatibility' },
        { name: t('Payment QR Sticker Generator', 'फोनपे/इसेवा क्युआर कोड'), href: '/qr-generator', desc: 'Printable Nepal QR shop standee' },
        { name: t('Official Acts & Gazettes', 'सरकारी ऐन तथा राजपत्र'), href: '/documents', desc: 'Finance Act, Labour Act & guides' },
      ]
    }
  ];

  return (
    <>
      {/* Live Gold & Silver Ticker on Top */}
      <LiveGoldTicker />

      {/* Sticky Header */}
      <header
        className="sticky-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
          boxShadow: isScrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.08)' : '0 1px 3px rgba(15, 23, 42, 0.03)',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      >
        <div className="container" ref={navRef}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '58px',
            }}
          >
            {/* Brand Logo - Architectural Deepak-style Logo */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                aria-label="Nepali Calc Home"
              >
                <NepalCalcLogo height={32} strokeColor="#0f172a" accentColor="#f59e0b" showFlag={true} />
              </Link>
            </div>

            {/* Desktop Navigation - Individual Wide Mega Dropdowns */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navSections.map(section => {
                const isOpen = activeDropdown === section.id;
                return (
                  <div key={section.id} style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(section.id)}
                      onMouseEnter={() => setActiveDropdown(section.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 12px',
                        backgroundColor: isOpen ? '#f1f5f9' : 'transparent',
                        color: isOpen ? '#0f172a' : '#334155',
                        border: '1px solid',
                        borderColor: isOpen ? '#cbd5e1' : 'transparent',
                        borderRadius: '9999px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {section.icon}
                      <span>{section.title}</span>
                      <ChevronDown
                        size={13}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.18s ease',
                          color: isOpen ? section.color : '#64748b'
                        }}
                      />
                    </button>

                    {/* Wide Mega Dropdown Menu - Sleek White Card */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.99 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          onMouseLeave={() => setActiveDropdown(null)}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: section.dropdownLeft,
                            width: '660px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 1px 1px rgba(15, 23, 42, 0.04)',
                            padding: '16px 18px 14px',
                            zIndex: 100,
                            overflow: 'hidden',
                          }}
                        >

                          {/* Mega Dropdown Header Strip */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingBottom: '12px',
                              borderBottom: '1px solid #f1f5f9',
                              marginBottom: '12px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '8px',
                                  backgroundColor: section.iconBg,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {section.icon}
                              </div>
                              <div>
                                <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>
                                  {section.title}
                                </span>
                                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px', fontWeight: 500 }}>
                                  {section.subtitle}
                                </span>
                              </div>
                            </div>

                            <Link
                              href="/#all-tools"
                              onClick={() => setActiveDropdown(null)}
                              style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                color: section.color,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <span>{t('View all →', 'सबै हेर्नुहोस् →')}</span>
                            </Link>
                          </div>

                          {/* 2-Column Grid of Borderless Fluid Hover Rows */}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
                              gap: '6px 14px',
                            }}
                          >
                            {/* Column 1 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              {section.col1.map(tool => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    display: 'block',
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.14s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                    e.currentTarget.style.transform = 'translateX(2px)';
                                    const title = e.currentTarget.querySelector('.nav-item-title') as HTMLElement;
                                    if (title) title.style.color = section.color;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'none';
                                    const title = e.currentTarget.querySelector('.nav-item-title') as HTMLElement;
                                    if (title) title.style.color = '#0f172a';
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                    <span 
                                      className="nav-item-title"
                                      style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', transition: 'color 0.14s ease' }}
                                    >
                                      {tool.name}
                                    </span>
                                    {tool.badge && (
                                      <span
                                        style={{
                                          fontSize: '9.5px',
                                          fontWeight: 700,
                                          padding: '1px 6px',
                                          borderRadius: '9999px',
                                          backgroundColor: section.iconBg,
                                          color: section.color,
                                          whiteSpace: 'nowrap',
                                        }}
                                      >
                                        {tool.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.35 }}>
                                    {tool.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Column 2 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              {section.col2.map(tool => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    display: 'block',
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.14s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                    e.currentTarget.style.transform = 'translateX(2px)';
                                    const title = e.currentTarget.querySelector('.nav-item-title') as HTMLElement;
                                    if (title) title.style.color = section.color;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'none';
                                    const title = e.currentTarget.querySelector('.nav-item-title') as HTMLElement;
                                    if (title) title.style.color = '#0f172a';
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                    <span 
                                      className="nav-item-title"
                                      style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', transition: 'color 0.14s ease' }}
                                    >
                                      {tool.name}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.35 }}>
                                    {tool.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

          {/* Right Side: Search, Language, Action & Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            
            {/* Search Icon Only Tactile Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSearchModalOpen(true)}
              className="neu-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                color: '#003893',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Search all tools (Ctrl+K)"
              aria-label="Search all tools"
            >
              <Search size={16} />
            </motion.button>

            <LanguageSwitchToggle />

            {/* Calculate Tax CTA: Vibrant Modern Flag Blue & Crimson Glow */}
            <Link
              href="/tax"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #003893 0%, #1e40af 100%)',
                color: '#ffffff',
                padding: '7px 15px',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                borderRadius: '9999px',
                border: '1.5px solid #3b82f6',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 56, 147, 0.35)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              className="hover-lift nav-cta-tax"
            >
              <ReceiptText size={14} color="#fef08a" style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>{t('Calculate Tax', 'आयकर हिसाब')}</span>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn neu-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                cursor: 'pointer',
                color: '#0f172a',
                flexShrink: 0,
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Accordion Menu - Premium Slide Down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '14px 16px 24px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxHeight: '82vh',
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                boxShadow: '0 20px 30px rgba(15, 23, 42, 0.08)',
              }}
            >
              {/* Quick Search Action Bar */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  color: '#64748b',
                  fontSize: '13px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#003893" />
                  <span style={{ fontWeight: 500 }}>{t('Search calculators (Tax, EMI, Land...)', 'क्यालकुलेटर खोज्नुहोस् (आयकर, जग्गा...)')}</span>
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 800, padding: '2px 7px', backgroundColor: '#e2e8f0', borderRadius: '6px', color: '#334155' }}>
                  Ctrl+K
                </span>
              </button>

              {/* Popular Tools Quick Grid */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  {t('⚡ Popular Daily Tools', '⚡ लोकप्रिय हिसाबहरू')}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <Link
                    href="/tax"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <ReceiptText size={16} color="#1d4ed8" />
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e3a8a' }}>{t('Income Tax', 'आयकर हिसाब')}</div>
                      <div style={{ fontSize: '10px', color: '#3b82f6' }}>{t('FY 2083/84', '२०८३/८४')}</div>
                    </div>
                  </Link>

                  <Link
                    href="/vehicle"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <Zap size={16} color="#059669" />
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#065f46' }}>{t('Vehicle Tax', 'सवारी ब्लुबुक')}</div>
                      <div style={{ fontSize: '10px', color: '#10b981' }}>{t('Bike & Car', 'बाइक तथा गाडी')}</div>
                    </div>
                  </Link>

                  <Link
                    href="/land"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <Landmark size={16} color="#d97706" />
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#92400e' }}>{t('Land Area', 'जग्गा नापजाँच')}</div>
                      <div style={{ fontSize: '10px', color: '#d97706' }}>{t('Ropani & Bigha', 'रोपनी र बिघा')}</div>
                    </div>
                  </Link>

                  <Link
                    href="/calendar"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <Calendar size={16} color="#dc2626" />
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#991b1b' }}>{t('Nepali Patro', 'नेपाली पात्रो')}</div>
                      <div style={{ fontSize: '10px', color: '#ef4444' }}>{t('Tithi & Holidays', 'तिथि तथा बिदा')}</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Collapsible Accordion Categories */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                  {t('Explore All Categories', 'सबै वर्गहरू')}
                </span>

                {navSections.map(section => {
                  const isExpanded = expandedMobileCategory === section.id;
                  const tools = [...section.col1, ...section.col2];

                  return (
                    <div 
                      key={section.id} 
                      style={{ 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedMobileCategory(isExpanded ? null : section.id)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isExpanded ? '#f8fafc' : '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: section.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {section.icon}
                          </div>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                            {section.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#f1f5f9', color: '#64748b' }}>
                            {tools.length}
                          </span>
                          <ChevronDown
                            size={16}
                            color="#64748b"
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.18s ease'
                            }}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{ borderTop: '1px solid #f1f5f9' }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {tools.map(tool => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  style={{
                                    padding: '10px 14px',
                                    borderBottom: '1px solid #f8fafc',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                  }}
                                >
                                  <div>
                                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                      {tool.name}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>
                                      {tool.desc}
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                                    {tool.badge && (
                                      <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#dbeafe', color: '#1e40af' }}>
                                        {tool.badge}
                                      </span>
                                    )}
                                    <ArrowRight size={13} color="#94a3b8" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Links & Security Guarantee */}
              <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  <Link href="/documents" onClick={() => setMobileMenuOpen(false)}>{t('📜 Official Acts', '📜 सरकारी ऐन')}</Link>
                  <span>•</span>
                  <Link href="/rashifal" onClick={() => setMobileMenuOpen(false)}>{t('🔮 Rashifal', '🔮 दैनिक राशिफल')}</Link>
                  <span>•</span>
                  <Link href="/typing-test" onClick={() => setMobileMenuOpen(false)}>{t('⌨️ Typing Test', '⌨️ टाइपिङ टेस्ट')}</Link>
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  🛡️ {t('100% Client-side • Your data never leaves your device', '१००% सुरक्षित • कुनै पनि डेटा तपाईंको डिभाइसबाट बाहिर जाँदैन')}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>

      {/* Global Interactive Search Command Palette Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
