'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ReceiptText,
  Landmark,
  Car,
  TrendingUp,
  Percent,
  Calendar,
  Zap,
  DollarSign,
  GraduationCap,
  Scale,
  Fuel,
  Smartphone,
  Briefcase,
  Coins,
  CheckCircle2,
  Lock,
  SmartphoneNfc,
  LineChart,
  TrendingDown,
  Clock,
  Type,
  FileText,
  Droplets,
  Activity,
  PiggyBank,
  BookOpen,
  Home,
  BatteryCharging,
  Package,
  Keyboard,
  Sprout,
  Heart,
  QrCode,
  Building2,
  Award,
  FileSpreadsheet,
  Flame,
  Plane,
  Send,
  Cake
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CALCULATOR_TOOLS, CALCULATOR_CATEGORIES, CalculatorTool } from '@/lib/toolsList';
import { PROGRAMMATIC_LAND_CONVERSIONS } from '@/lib/rates/landRates';
import { PROGRAMMATIC_VEHICLE_TAXES } from '@/lib/rates/programmaticVehicles';
import { PROGRAMMATIC_SALARY_TAXES } from '@/lib/rates/programmaticTax';
import { PROGRAMMATIC_SIP_SCENARIOS } from '@/lib/rates/programmaticSip';
import { PROGRAMMATIC_FOREX_CONVERSIONS } from '@/lib/rates/forexRates';
import { PROGRAMMATIC_EMI_SCENARIOS } from '@/lib/rates/programmaticEmi';
import { PROGRAMMATIC_TRADITIONAL_UNITS } from '@/lib/rates/traditionalUnitRates';
import { PROGRAMMATIC_GOLD_ITEMS } from '@/lib/rates/programmaticGold';
import { NepalPatroHero } from '@/components/hero/NepalPatroHero';
import { DashainAndUpcomingEvents } from '@/components/hero/DashainAndUpcomingEvents';
import { MarketRatesAndPopularTools, CountryFlag } from '@/components/hero/MarketRatesAndPopularTools';
import { SecurityGuaranteeBanner } from '@/components/SecurityGuaranteeBanner';
import { DocumentHub } from '@/components/documents/DocumentHub';
import { DocHomeSection } from '@/components/documents-gen/DocHub';
import { AdBanner } from '@/components/AdBanner';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useLanguage } from '@/components/LanguageContext';

const CATEGORY_EMOJIS: Record<string, string> = {
  tax: '💼',
  land: '📐',
  stocks: '📈',
  vehicle: '🚗',
  finance: '🏦',
  utilities: '🔥',
  education: '🎓',
  all: '✨',
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const toolsCarouselRef = useRef<HTMLDivElement>(null);
  const [activeToolSlide, setActiveToolSlide] = useState(0);

  const handleToolScroll = () => {
    if (!toolsCarouselRef.current) return;
    const { scrollLeft, clientWidth } = toolsCarouselRef.current;
    if (clientWidth > 0) {
      const firstChild = toolsCarouselRef.current.children[0] as HTMLElement | undefined;
      const cardWidth = firstChild ? firstChild.offsetWidth + 12 : 280;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveToolSlide(Math.min(Math.max(index, 0), filteredTools.length - 1));
    }
  };

  const scrollToToolSlide = (index: number) => {
    if (!toolsCarouselRef.current) return;
    const firstChild = toolsCarouselRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth + 12 : 280;
    toolsCarouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveToolSlide(index);
  };

  // Reset carousel slide when category or search changes
  useEffect(() => {
    if (toolsCarouselRef.current) {
      toolsCarouselRef.current.scrollTo({ left: 0 });
    }
    setActiveToolSlide(0);
  }, [searchQuery, selectedCategory]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return CALCULATOR_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        tool.name.toLowerCase().includes(q) ||
        tool.nepaliName.includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.searchKeywords && tool.searchKeywords.some((k) => k.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const categoryMap = useMemo(() => {
    const map: Record<string, { name: string; nepaliName: string }> = {};
    CALCULATOR_CATEGORIES.forEach(c => {
      map[c.id] = { name: c.name, nepaliName: c.nepaliName };
    });
    return map;
  }, []);

  // Render icons dynamically
  const renderIcon = (tool: CalculatorTool, size: number = 24) => {
    const color = tool.color;
    switch (tool.icon) {
      case 'ReceiptText': return <ReceiptText size={size} color={color} />;
      case 'Landmark': return <Landmark size={size} color={color} />;
      case 'Car': return <Car size={size} color={color} />;
      case 'TrendingUp': return <TrendingUp size={size} color={color} />;
      case 'Calculator': return <Calculator size={size} color={color} />;
      case 'Coins': return <Coins size={size} color={color} />;
      case 'Scale': return <Scale size={size} color={color} />;
      case 'Sparkles': return <Sparkles size={size} color={color} />;
      case 'Zap': return <Zap size={size} color={color} />;
      case 'GraduationCap': return <GraduationCap size={size} color={color} />;
      case 'Calendar': return <Calendar size={size} color={color} />;
      case 'Fuel': return <Fuel size={size} color={color} />;
      case 'DollarSign': return <DollarSign size={size} color={color} />;
      case 'Percent': return <Percent size={size} color={color} />;
      case 'Smartphone': return <Smartphone size={size} color={color} />;
      case 'Briefcase': return <Briefcase size={size} color={color} />;
      case 'LineChart': return <LineChart size={size} color={color} />;
      case 'TrendingDown': return <TrendingDown size={size} color={color} />;
      case 'Clock': return <Clock size={size} color={color} />;
      case 'Type': return <Type size={size} color={color} />;
      case 'FileText': return <FileText size={size} color={color} />;
      case 'Droplets': return <Droplets size={size} color={color} />;
      case 'Activity': return <Activity size={size} color={color} />;
      case 'PiggyBank': return <PiggyBank size={size} color={color} />;
      case 'BookOpen': return <BookOpen size={size} color={color} />;
      case 'Home': return <Home size={size} color={color} />;
      case 'BatteryCharging': return <BatteryCharging size={size} color={color} />;
      case 'Package': return <Package size={size} color={color} />;
      case 'Keyboard': return <Keyboard size={size} color={color} />;
      case 'Sprout': return <Sprout size={size} color={color} />;
      case 'Heart': return <Heart size={size} color={color} />;
      case 'QrCode': return <QrCode size={size} color={color} />;
      case 'Building2': return <Building2 size={size} color={color} />;
      case 'Award': return <Award size={size} color={color} />;
      case 'FileSpreadsheet': return <FileSpreadsheet size={size} color={color} />;
      case 'Flame': return <Flame size={size} color={color} />;
      case 'Plane': return <Plane size={size} color={color} />;
      case 'Send': return <Send size={size} color={color} />;
      case 'Cake': return <Cake size={size} color={color} />;
      default: return <Calculator size={size} color={color} />;
    }
  };

  const HOME_FAQS = [
    {
      question: "Is NepalCalc completely free and secure to use?",
      answer: "Yes, 100% free and private! All 25+ calculators, converters, font tools, and tax engines run in-memory inside your local browser. No salary, asset, or financial data is ever collected or sent to external servers.",
      questionNep: "के नेपालक्याल्क पूर्ण रूपमा निःशुल्क र सुरक्षित छ?",
      answerNep: "हो, १००% निःशुल्क र पूर्ण सुरक्षित! सबै ३५+ क्यालकुलेटर, कर हिसाब र रूपान्तरण औजारहरू तपाईंको आफ्नै ब्राउजरमा सिधै चल्छन्। कुनै पनि तलब वा वित्तीय विवरण बाह्य सर्भरमा पठाइँदैन।",
    },
    {
      question: "Are the calculations updated according to the latest Nepal Finance Act?",
      answer: "Yes. All tax slabs (FY 2083/84 & 2082/83), vehicle bluebook road taxes, NEPSE broker commission schedules (0.27%-0.40%), mutual fund SIP returns, and NEA electricity tariffs are built using official government acts and notifications.",
      questionNep: "के यी सबै हिसाबहरू नेपाल सरकारको पछिल्लो आर्थिक ऐन अनुसार अद्यावधिक छन्?",
      answerNep: "हो, आयकर स्ल्याब (आ.व. २०८३/८४ तथा २०८२/८३), सवारी ब्लुबुक कर, नेप्से ब्रोकर कमिसन (०.२७%-०.४०%), म्युचुअल फन्ड तथा विद्युत् महसुल दरहरू आधिकारिक सरकारी राजपत्र र नियमावली अनुसार अद्यावधिक गरिएका छन्।",
    },
    {
      question: "How do I convert Ropani to Bigha and Square Feet?",
      answer: "Use our Land Measurement tool or quick shortcuts: 1 Ropani = 16 Aana = 5,476 Sq. Ft. 1 Bigha = 20 Kattha = 72,900 Sq. Ft. One Bigha equals approximately 13.31 Ropani.",
      questionNep: "रोपनीलाई बिघा र वर्गफिटमा कसरी रूपान्तरण गर्ने?",
      answerNep: "हाम्रो जग्गा नापजाँच टुल प्रयोग गर्नुहोस्: १ रोपनी = १६ आना = ५,४७६ वर्गफिट। १ बिघा = २० कट्ठा = ७२,९०० वर्गफिट। १ बिघा बराबर करिब १३.३१ रोपनी हुन्छ।",
    },
    {
      question: "Can I convert Preeti font to Unicode on my mobile phone?",
      answer: "Yes! Our Preeti to Unicode converter runs directly in your browser. Just paste your Preeti text, and it immediately outputs standard Nepali Unicode which you can copy to Facebook, WhatsApp, or Microsoft Word.",
      questionNep: "के मोबाइलबाटै प्रिती फन्टलाई युनिकोडमा बदल्न सकिन्छ?",
      answerNep: "सकिन्छ! हाम्रो प्रिती युनिकोड कन्भर्टर मोबाइल ब्राउजरमै तुरुन्त चल्छ। प्रिती अक्षर पेस्ट गर्नासाथ आधिकारिक युनिकोड नेपाली बन्छ, जसलाई फेसबुक, वर्ड वा म्यासेजमा कपी गर्न सकिन्छ।",
    },
  ];

  return (
    <div style={{
      backgroundColor: 'transparent',
      minHeight: '100vh',
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37, 99, 235, 0.05), transparent 70%),
        radial-gradient(ellipse 60% 40% at 95% 40%, rgba(200, 16, 46, 0.03), transparent 70%),
        radial-gradient(ellipse 50% 30% at 5% 70%, rgba(16, 185, 129, 0.03), transparent 70%)
      `
    }}>
      {/* Home WebApplication Collection Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Nepali Calc — Smart All-in-One Calculators for Nepal",
            "url": "https://nepalicalc.com",
            "description": "Nepal's premier official online calculation suite: Income Tax, Land Unit Converter, Vehicle Bluebook Tax, Gold Rates, Driving License Written Exam, and Nepali Patro 2083.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NPR",
            },
          }),
        }}
      />

      {/* 1. Signature Nepali Cultural Hero & Interactive Patro Calendar (As in Screenshot 1) */}
      <NepalPatroHero />

      {/* 2. Dashain 2083 Festival Center & Upcoming Nepal Holidays (As in Screenshot 2) */}
      <DashainAndUpcomingEvents />

      {/* 3. Popular Tools Grid & Live Gold/Silver Market Rates (As in Screenshot 2) */}
      <MarketRatesAndPopularTools />


      {/* Legal Document Generators */}
      <DocHomeSection />

      {/* 6. Complete 70+ Tool Directory with Live Search & Category Filters */}
      <div id="all-tools" className="container" style={{ padding: '64px 20px 72px' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 30px' }} data-aos="fade-up">
          <div
            className="cute-tools-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.09) 0%, rgba(236, 72, 153, 0.09) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.22)',
              color: '#4338ca',
              fontSize: '11.5px',
              fontWeight: 750,
              letterSpacing: '0.04em',
              padding: '5px 14px',
              borderRadius: '9999px',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)'
            }}
          >
            <Sparkles size={13} color="#6366f1" />
            <span>{t('All 70+ Nepal Calculators & Converters', 'नेपालका सबै ७०+ क्यालकुलेटर तथा रूपान्तरण औजारहरू')}</span>
          </div>

          <h2
            className="cute-tools-title"
            style={{
              fontSize: 'clamp(22px, 4.2vw, 38px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 10px',
              lineHeight: 1.25
            }}
          >
            {language === 'ne' ? (
              <>एकै ठाउँमा <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #ec4899 50%, #c8102e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>सम्पूर्ण हिसाब ✨</span></>
            ) : (
              <>Every Smart Calculation <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #ec4899 50%, #c8102e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', whiteSpace: 'nowrap' }}>in One Place ✨</span></>
            )}
          </h2>

          <p
            className="cute-tools-subtitle"
            style={{
              fontSize: '13.5px',
              color: '#64748b',
              lineHeight: 1.5,
              margin: '0 auto',
              maxWidth: '560px'
            }}
          >
            {t(
              'Income tax, land units, gold rates, vehicle tax, loan EMI & legal forms — fast, accurate & 100% free.',
              'आयकर, जग्गा नाप, सुनको भाउ, ब्लुबुक कर, बैंक ऋण र कानुनी ढाँचाहरू — छिटो, सही र पूर्ण निःशुल्क।'
            )}
          </p>
        </div>

        {/* Instant Search Bar - Modern Floating Input matching Image 2 */}
        <div style={{ maxWidth: '640px', margin: '0 auto 24px', position: 'relative' }} data-aos="fade-up">
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#0b2b5c',
            }}
          />
          <input
            type="text"
            className="cute-search-input"
            placeholder={t(
              'Search for tools (e.g. tax, loan, gold, bluebook, salary)...',
              'उपकरण खोज्नुहोस् (जस्तै: tax, loan, gold, bluebook, salary)...'
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '13px 85px 13px 46px',
              fontSize: '14px',
              borderRadius: '9999px',
              border: '1.5px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              outline: 'none',
              boxShadow: '0 4px 18px rgba(11, 43, 92, 0.05)',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#0b2b5c';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(11, 43, 92, 0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(11, 43, 92, 0.05)';
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '11px',
              fontWeight: 700,
              color: '#64748b',
              pointerEvents: 'none',
            }}
          >
            Ctrl + K
          </div>
        </div>

        {/* Category Pill Filters matching Image 2 */}
        <div
          data-aos="fade-up"
          className="category-pills-track"
          style={{ justifyContent: 'center', marginBottom: '22px' }}
        >
          {CALCULATOR_CATEGORIES.map((cat) => {
            const count = cat.id === 'all'
              ? CALCULATOR_TOOLS.length
              : CALCULATOR_TOOLS.filter((t) => t.category === cat.id).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill cute-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                  border: isActive ? '1.5px solid #0b2b5c' : '1.5px solid #e2e8f0',
                  background: isActive ? '#0b2b5c' : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  boxShadow: isActive ? '0 4px 14px -2px rgba(11, 43, 92, 0.35)' : '0 1px 3px rgba(15, 23, 42, 0.04)'
                }}
              >
                <span>{language === 'ne' ? cat.nepaliName : cat.name}</span>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subheader Row matching Image 2 */}
        <div className="count-bar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9', gap: '8px', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0b2b5c', margin: 0, whiteSpace: 'nowrap' }}>
            {selectedCategory === 'all'
              ? t(`All Calculators (${filteredTools.length})`, `सबै क्यालकुलेटरहरू (${filteredTools.length})`)
              : `${language === 'ne' ? CALCULATOR_CATEGORIES.find((c) => c.id === selectedCategory)?.nepaliName : CALCULATOR_CATEGORIES.find((c) => c.id === selectedCategory)?.name} (${filteredTools.length})`}
          </h3>
          <span style={{ fontSize: '12.5px', color: '#ff5a5f', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {t('Click any card to start calculating →', 'हिसाब सुरु गर्न कुनै पनि कार्डमा क्लिक गर्नुहोस् →')}
          </span>
        </div>

        {/* Mobile Swipe Hint & Counter for Tools Carousel */}
        {filteredTools.length > 1 && (
          <div className="tools-carousel-hint">
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#0b2b5c' }}>←</span>
              <span>{t('Swipe calculators', 'दायाँ-बायाँ सारेर हेर्नुहोस्')}</span>
              <span style={{ color: '#0b2b5c' }}>→</span>
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0b2b5c', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '9999px' }}>
              {activeToolSlide + 1} / {filteredTools.length}
            </span>
          </div>
        )}

        {/* Modern Vibrant Cards Grid & Mobile Carousel matching Image 2 */}
        <div
          ref={toolsCarouselRef}
          onScroll={handleToolScroll}
          className="grid-smallpdf"
        >
          {filteredTools.map((tool) => {
            const cat = categoryMap[tool.category];
            const categoryLabel = language === 'ne' ? (cat?.nepaliName || 'दैनिक हिसाब') : (cat?.name || 'Tool');
            const categoryEmoji = CATEGORY_EMOJIS[tool.category] || '⚡';

            return (
              <div
                key={tool.id}
                className="smallpdf-card-wrapper"
                style={{ display: 'flex' }}
              >
                <Link
                  href={tool.slug}
                  className="smallpdf-card"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    borderRadius: '16px',
                    border: '1.5px solid #eef2f6',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(11, 43, 92, 0.04)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    {/* Top Row: Squircle Icon + Title | "Open →" pill button */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            backgroundColor: tool.bgLight,
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            boxShadow: `0 2px 8px -2px ${tool.color}35`,
                          }}
                        >
                          {renderIcon(tool, 20)}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <h4
                            style={{
                              fontSize: '15px',
                              fontWeight: 800,
                              color: '#0b2b5c',
                              margin: 0,
                              lineHeight: 1.28,
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {language === 'ne' ? tool.nepaliName : tool.name}
                          </h4>
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#64748b',
                              marginTop: '2px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {language === 'ne' ? tool.name : tool.nepaliName}
                          </div>
                        </div>
                      </div>

                      {/* "Open →" pill button */}
                      <div
                        className="tool-card-action-badge"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#0b2b5c',
                          flexShrink: 0,
                        }}
                      >
                        <span>{t('Open', 'खोल्नुहोस्')}</span>
                        <ArrowRight size={11} className="tool-action-arrow" />
                      </div>
                    </div>

                    {/* Middle: 2-line Description */}
                    <p
                      style={{
                        fontSize: '12.5px',
                        color: '#64748b',
                        lineHeight: 1.5,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Navigation Arrows & Scroller */}
        {filteredTools.length > 1 && (
          <div className="tools-carousel-controls">
            <button
              type="button"
              onClick={() => scrollToToolSlide(Math.max(activeToolSlide - 1, 0))}
              disabled={activeToolSlide === 0}
              className="doc-carousel-btn"
              aria-label="Previous calculator"
              style={{
                opacity: activeToolSlide === 0 ? 0.35 : 1,
                cursor: activeToolSlide === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Compact Progress Bar / Indicator */}
            <div style={{ flex: 1, maxWidth: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.max(5, ((activeToolSlide + 1) / filteredTools.length) * 100)}%`,
                    backgroundColor: '#003893',
                    borderRadius: '9999px',
                    transition: 'width 0.2s ease'
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>
                {activeToolSlide + 1} of {filteredTools.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => scrollToToolSlide(Math.min(activeToolSlide + 1, filteredTools.length - 1))}
              disabled={activeToolSlide >= filteredTools.length - 1}
              className="doc-carousel-btn"
              aria-label="Next calculator"
              style={{
                opacity: activeToolSlide >= filteredTools.length - 1 ? 0.35 : 1,
                cursor: activeToolSlide >= filteredTools.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Programmatic SEO Showcase 1: Land Unit Converters */}
        <section data-aos="fade-up" style={{ marginTop: '48px', marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-blue">High Volume Search</span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', color: '#0f172a' }}>
                Nepal Land Unit Converters (जग्गा एकाइ रूपान्तरण)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Instant one-click shortcuts to convert between Hill Ropani and Terai Bigha units.
              </p>
            </div>
          </div>

          <div className="two-up-mobile-carousel">
            {PROGRAMMATIC_LAND_CONVERSIONS.map((conv) => (
              <Link
                key={conv.slug}
                href={`/land/${conv.slug}`}
                className="two-up-card-item showcase-card-better"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 7px', borderRadius: '4px', textTransform: 'uppercase' }}>
                      Land Unit
                    </span>
                    <div className="showcase-arrow-btn" style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '3px' }}>
                    {conv.fromUnit} to {conv.toUnit}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {conv.fromUnitNepali} देखि {conv.toUnitNepali}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Programmatic SEO Showcase 2: Vehicle Road Taxes by Model */}
        <section data-aos="fade-up" style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-blue">Yatayat Road Tax</span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', color: '#0f172a' }}>
                Vehicle Road Tax by Popular Models (सवारी कर)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Official Bagmati Province annual road tax and renewal rates for popular bikes and cars in Nepal.
              </p>
            </div>
          </div>

          <div className="two-up-mobile-carousel">
            {PROGRAMMATIC_VEHICLE_TAXES.slice(0, 12).map((veh) => (
              <Link
                key={veh.slug}
                href={`/vehicle/${veh.slug}`}
                className="two-up-card-item showcase-card-better"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#003893', backgroundColor: '#eff6ff', padding: '2px 7px', borderRadius: '4px' }}>
                      {veh.capacity}{veh.fuelType === 'electric' ? 'kW' : 'cc'}
                    </span>
                    <div className="showcase-arrow-btn" style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#003893', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '3px' }}>
                    {veh.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {veh.vehicleType === 'bike' ? 'Two-Wheeler Tax' : 'Four-Wheeler Tax'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Programmatic SEO Showcase 3: Salary Income Tax Brackets */}
        <section data-aos="fade-up" style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>Salary Tax Slabs</span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', color: '#0f172a' }}>
                Nepal Salary Tax by Monthly Income (FY 2083/84)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                Check annual tax, monthly deductions, and net in-hand salary for different income tiers.
              </p>
            </div>
          </div>

          <div className="two-up-mobile-carousel">
            {PROGRAMMATIC_SALARY_TAXES.map((sal) => (
              <Link
                key={sal.slug}
                href={`/tax/${sal.slug}`}
                className="two-up-card-item showcase-card-better"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 7px', borderRadius: '4px' }}>
                      Monthly
                    </span>
                    <div className="showcase-arrow-btn" style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#fffbeb', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '2px' }}>
                    Rs. {sal.monthlySalary.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Income Tax Breakdown
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Programmatic SEO Showcase 4: Monthly SIP & Forex Remittance */}
        <div data-aos="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* SIP Links */}
          <div className="white-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <span className="badge badge-blue">Mutual Fund SIP</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              Monthly SIP Investment Milestones
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROGRAMMATIC_SIP_SCENARIOS.map((sip) => (
                <Link
                  key={sip.slug}
                  href={`/sip/${sip.slug}`}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  <span>NPR {sip.monthlyAmount.toLocaleString()}/mo SIP</span>
                  <ArrowRight size={12} color="#003893" />
                </Link>
              ))}
            </div>
          </div>

          {/* Forex Links */}
          <div className="white-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>NRB Live Rates</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              High-Volume Remittance & Forex
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROGRAMMATIC_FOREX_CONVERSIONS.map((fx) => (
                <Link
                  key={fx.slug}
                  href={`/forex/${fx.slug}`}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  <CountryFlag code={fx.code} size={16} />
                  <span>{fx.code} to NPR</span>
                  <ArrowRight size={12} color="#64748b" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Programmatic SEO Showcase 5: Bank Loan EMI, Traditional Units & Gold Weights */}
        <div data-aos="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {/* Bank Loan EMI Scenarios */}
          <div className="white-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <span className="badge badge-blue">NRB Commercial Banks</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              Bank Loan EMI by Loan Amount
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROGRAMMATIC_EMI_SCENARIOS.map((emi) => (
                <Link
                  key={emi.slug}
                  href={`/emi/${emi.slug}`}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0b2b5c',
                    textDecoration: 'none',
                  }}
                >
                  <span>{emi.displayLabel} EMI</span>
                  <ArrowRight size={12} color="#64748b" />
                </Link>
              ))}
            </div>
          </div>

          {/* Traditional Nepali Units (Dharni, Pathi, Muri, Mana, Kosh) */}
          <div className="white-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <span className="badge badge-emerald">मौलिक नापतौल (Traditional Units)</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              Dharni, Pathi, Muri, Mana & Haat
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROGRAMMATIC_TRADITIONAL_UNITS.map((unit) => (
                <Link
                  key={unit.slug}
                  href={`/traditional-units/${unit.slug}`}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  <span>{unit.shortTitle} ({unit.fromUnitNepali})</span>
                  <ArrowRight size={12} color="#059669" />
                </Link>
              ))}
            </div>
          </div>

          {/* Gold & Silver Weight Rates (Lal, Tola, Gram) */}
          <div className="white-card" style={{ padding: '24px', borderRadius: '4px' }}>
            <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>FENEGOSIDA Bullion</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
              Gold & Silver Price by Weight (Tola, Lal & Gram)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROGRAMMATIC_GOLD_ITEMS.slice(0, 10).map((g) => (
                <Link
                  key={g.slug}
                  href={`/gold/${g.slug}`}
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  <span>{g.shortTitle}</span>
                  <ArrowRight size={12} color="#d97706" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <AdBanner slotId="homepage-middle-banner" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={HOME_FAQS} />
      </div>

      {/* Official Regulatory Acts & Interactive Document Reader */}
      <DocumentHub isHomepage={true} />
    </div>
  );
}
