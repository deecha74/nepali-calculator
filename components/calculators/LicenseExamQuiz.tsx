'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Car,
  Bike,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  AlertCircle,
  BookOpen,
  Clock,
  Shuffle,
  Check,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Search,
  Eye,
  ShieldAlert,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Sparkles,
  LayoutGrid,
  ListChecks
} from 'lucide-react';
import { ALL_DOTM_QUESTIONS, DOTM_CATEGORIES, getRandomExamQuestions, Question } from '@/lib/licenseQuestions';
import { TRAFFIC_SIGNS_DATA } from '@/lib/trafficSignsData';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { IshiharaEyeTest, MiniIshiharaPlate } from '@/components/calculators/IshiharaEyeTest';
import { TrafficSignsGallery, TrafficSignSvg } from '@/components/calculators/TrafficSignsGallery';
import { LikhitResultChecker } from '@/components/calculators/LikhitResultChecker';

export type LicensePortalTab =
  | 'overview'
  | 'mock-test'
  | 'question-bank'
  | 'traffic-signs'
  | 'eye-test'
  | 'trial-rules';

export function LicensePortalNav({ activeTab }: { activeTab: LicensePortalTab | 'likhit-result' }) {
  const { language } = useLanguage();
  const isNe = language === 'ne';

  const navItems: {
    id: LicensePortalTab | 'likhit-result';
    href: string;
    labelEn: string;
    labelNe: string;
    icon: React.ReactNode;
  }[] = [
      {
        id: 'overview',
        href: '/license',
        labelEn: 'Overview',
        labelNe: 'अवलोकन',
        icon: <Compass size={16} />
      },
      {
        id: 'mock-test',
        href: '/license/mock-test',
        labelEn: 'Mock Test',
        labelNe: 'नमुना परीक्षा',
        icon: <ClipboardCheck size={16} />
      },
      {
        id: 'eye-test',
        href: '/license/eye-test',
        labelEn: 'Eye Test',
        labelNe: 'आँखा परीक्षण',
        icon: <Eye size={16} />
      },
      {
        id: 'traffic-signs',
        href: '/license/traffic-signs',
        labelEn: 'Traffic Signs',
        labelNe: 'ट्राफिक चिन्ह',
        icon: <ShieldAlert size={16} />
      },
      {
        id: 'question-bank',
        href: '/license/questions',
        labelEn: '500 Questions',
        labelNe: '५०० प्रश्न',
        icon: <BookOpen size={16} />
      },
      {
        id: 'trial-rules',
        href: '/license/trial',
        labelEn: '70-Point Trial',
        labelNe: '७०-अंक ट्रायल',
        icon: <Award size={16} />
      },
      {
        id: 'likhit-result',
        href: '/license/result',
        labelEn: 'Likhit Result',
        labelNe: 'लिखित नतिजा',
        icon: <FileCheck2 size={16} />
      }
    ];

  return (
    <nav
      aria-label="Driving License Navigation"
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        padding: '6px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px'
      }}
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              flex: '1 1 auto',
              padding: '9px 12px',
              borderRadius: '10px',
              border: isActive ? '1px solid #003893' : '1px solid transparent',
              backgroundColor: isActive ? '#003893' : 'transparent',
              color: isActive ? '#ffffff' : '#334155',
              fontSize: '13px',
              fontWeight: isActive ? 800 : 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              whiteSpace: 'nowrap',
              transition: 'all 0.16s ease'
            }}
          >
            {item.icon}
            <span>{isNe ? item.labelNe : item.labelEn}</span>
          </Link>
        );
      })}
    </nav>
  );
}

interface TrialStepItem {
  id: string;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  maxPoints: number;
}

const TRIAL_70_STEPS: TrialStepItem[] = [
  {
    id: 'figure8',
    titleEn: '1. Curved Figure-8 Track',
    titleNe: '१. घुमाउरो आठ परीक्षण',
    descEn: 'Touching boundary line once (-10 pts). Putting foot down or crossing outer line disqualifies.',
    descNe: 'एकपटक रेखा छोएमा (-१० अंक)। भुइँमा खुट्टा टेकेमा वा बाहिरी रेखा नाघेमा फेल।'
  },
  {
    id: 'plank',
    titleEn: '2. Narrow Plank',
    titleNe: '२. साँघुरो फलेक',
    descEn: 'Must stay on plank for full length without slipping off (-10 pts if slipped).',
    descNe: 'फलेकबाट नझरी पार गर्नुपर्ने (चिप्लिएमा -१० अंक)।'
  },
  {
    id: 'uturn',
    titleEn: '3. U-Turn & Side Indicator',
    titleNe: '३. यू-टर्न र साइड लाइट',
    descEn: 'Must switch on turn indicator and turn without touching boundary (-10 pts if forgot indicator).',
    descNe: 'टर्न गर्दा अनिवार्य साइड लाइट बाल्नुपर्ने (नबालेमा -१० अंक)।'
  },
  {
    id: 'lights',
    titleEn: '4. Traffic Signal Light Observation',
    titleNe: '४. ट्राफिक बत्तीको पालना',
    descEn: 'Stop behind zebra line on Red/Amber light and move only on Green (-15 pts if violated).',
    descNe: 'रातो र पहेंलो बत्तीमा रोक्ने र हरियोमा मात्र अघि बढ्ने (उल्लङ्घन भए -१५ अंक)।'
  },
  {
    id: 'bumps',
    titleEn: '5. Speed Breakers & Bumps',
    titleNe: '५. उबडखाबड बाटो',
    descEn: 'Cross uneven humps smoothly without stalling engine or putting foot down (-15 pts).',
    descNe: 'इन्जिन बन्द नगरी र खुट्टा नटेकी उबडखाबड पार गर्ने (-१५ अंक)।'
  },
  {
    id: 'ramp',
    titleEn: '6. Uphill & Downhill Ramp Stop',
    titleNe: '६. उकालो र ओरालोमा रोक्ने र गुडाउने',
    descEn: 'Stop inside yellow box on uphill/downhill and restart without rolling back > 6 inches (-20 pts).',
    descNe: 'तोकिएको बक्सभित्र रोकेर पछाडि नबगी अगाडि बढाउनुपर्ने (-२० अंक)।'
  },
  {
    id: 'behavior',
    titleEn: '7. Pre-Drive Behavioral & Mirror Check',
    titleNe: '७. सवारी चलाउनुअघिको व्यवहारिक जाँच',
    descEn: 'Helmet strap / seatbelt, rear-view mirrors, brake check, and proper posture (-10 pts).',
    descNe: 'हेल्मेटको फित्ता वा सिटबेल्ट, लुकिङ ग्लास र ब्रेक जाँच (-१० अंक)।'
  }
].map((item, idx) => ({
  ...item,
  maxPoints: [20, 10, 10, 15, 15, 20, 10][idx]
}));

export function LicenseExamQuiz({ initialTab = 'overview' }: { initialTab?: LicensePortalTab }) {
  const { language, setLanguage, t } = useLanguage();
  const isNe = language === 'ne';

  // Active Route Tab (each portal module lives on its own SEO page)
  const activeTab = initialTab;
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'car'>('bike');

  // Mock Exam States (asks user for language and vehicle before starting timer)
  const [examStatus, setExamStatus] = useState<'setup' | 'running' | 'submitted'>('setup');
  const [viewMode, setViewMode] = useState<'single' | 'sheet'>('single');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(30 * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Question Bank Study States
  const [writtenFilter, setWrittenFilter] = useState<'all' | 'written' | 'signs'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [practiceBankMode, setPracticeBankMode] = useState<boolean>(false);
  const [bankGuesses, setBankGuesses] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const QUESTIONS_PER_PAGE = 20;

  // 70-Point Practical Trial Simulator State
  const [failedTrialSteps, setFailedTrialSteps] = useState<Record<string, boolean>>({});

  const formatNum = (n: number | string) => (isNe ? toNepaliDigits(n) : String(n));

  // Countdown timer for Mock Exam
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && examStatus === 'running' && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setExamStatus('submitted');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, examStatus, secondsLeft]);

  const questionCountForVehicle = selectedVehicle === 'bike' ? 20 : 25;
  const marksPerQuestion = selectedVehicle === 'bike' ? 5 : 4;
  const passMarksRequired = 60; // 60 out of 100 under DoTM rules

  const handleStartMockExam = (categoryFilter: string = 'all', vehicleOverride?: 'bike' | 'car') => {
    const vType = vehicleOverride || selectedVehicle;
    if (vehicleOverride) setSelectedVehicle(vehicleOverride);
    const count = vType === 'bike' ? 20 : 25;
    const randomBatch = getRandomExamQuestions(count, categoryFilter);
    setExamQuestions(randomBatch);
    setUserAnswers({});
    setCurrentIdx(0);
    setSecondsLeft(30 * 60);
    setIsTimerActive(true);
    setExamStatus('running');
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (examStatus !== 'running') return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitExam = () => {
    setIsTimerActive(false);
    setExamStatus('submitted');
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = examQuestions.length || questionCountForVehicle;

  const correctCount = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
      const q = examQuestions.find((item) => item.id === Number(qId));
      return q && q.correctIndex === ansIdx ? acc + 1 : acc;
    }, 0);
  }, [userAnswers, examQuestions]);

  const earnedMarks = correctCount * marksPerQuestion;
  const isPassed = earnedMarks >= passMarksRequired;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const str = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return isNe ? toNepaliDigits(str) : str;
  };

  // Filtered Question Bank
  const filteredStudyQuestions = useMemo(() => {
    let list = ALL_DOTM_QUESTIONS;
    if (writtenFilter === 'written') {
      list = list.filter((q) => q.category !== 'signs');
    } else if (writtenFilter === 'signs') {
      list = list.filter((q) => q.category === 'signs');
    }
    if (selectedCategory !== 'all') {
      list = list.filter((q) => q.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.questionNep.toLowerCase().includes(q) ||
          item.questionEng.toLowerCase().includes(q) ||
          item.explanationNep.toLowerCase().includes(q) ||
          item.explanationEng.toLowerCase().includes(q)
      );
    }
    return list;
  }, [writtenFilter, selectedCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [writtenFilter, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredStudyQuestions.length / QUESTIONS_PER_PAGE));

  const paginatedStudyQuestions = useMemo(() => {
    const start = (currentPage - 1) * QUESTIONS_PER_PAGE;
    return filteredStudyQuestions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [filteredStudyQuestions, currentPage]);

  // Trial Score Calculation
  const trialScore = useMemo(() => {
    return TRIAL_70_STEPS.reduce((acc, step) => {
      return failedTrialSteps[step.id] ? acc : acc + step.maxPoints;
    }, 0);
  }, [failedTrialSteps]);

  return (
      <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '0 0 48px' }}>
        {/* ============================================================ */}
        {/* DEDICATED DRIVING LICENSE SUBPAGE NAVIGATION                 */}
        {/* ============================================================ */}
        {activeTab !== 'overview' && <LicensePortalNav activeTab={activeTab} />}

        {/* ============================================================ */}
        {/* TAB 1: SPACIOUS MODERN OVERVIEW HUB                          */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* 1. HERO SECTION: REAL CODED LAYOUT MATCHING USER PREFERRED DESIGN */}
            <section
              className="white-card"
              style={{
                position: 'relative',
                borderRadius: '24px',
                border: '1.5px solid #dbeafe',
                background: 'linear-gradient(135deg, #f8faff 0%, #f0f6ff 50%, #e0effe 100%)',
                overflow: 'hidden',
                boxShadow: '0 10px 36px rgba(0, 56, 147, 0.06)',
                padding: 'clamp(24px, 4vw, 44px)',
                margin: 0
              }}
            >
              {/* Decorative Top-Left Dot Matrix Pattern */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '72px',
                  height: '72px',
                  backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.65,
                  pointerEvents: 'none'
                }}
              />

              {/* Decorative Bottom-Right Dot Matrix Pattern */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '72px',
                  height: '72px',
                  backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.5,
                  pointerEvents: 'none'
                }}
              />

              {/* Main 2-Column Content Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Left Column: Real Typography, Badge, Buttons */}
                <div style={{ maxWidth: '620px' }}>
                  {/* Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      backgroundColor: '#eff6ff',
                      border: '1.5px solid #bfdbfe',
                      color: '#1d4ed8',
                      fontSize: '13px',
                      fontWeight: 700,
                      marginBottom: '16px'
                    }}
                  >
                    <span style={{ fontSize: '15px' }}>🇳🇵</span>
                    <span>{t('Nepal Driving License Preparation', 'नेपाल सवारी चालक अनुमतिपत्र तयारी')}</span>
                    <CheckCircle2 size={15} color="#2563eb" />
                  </div>

                  {/* Headline */}
                  <h1
                    style={{
                      fontSize: 'clamp(28px, 4.2vw, 46px)',
                      fontWeight: 900,
                      color: '#0f172a',
                      lineHeight: 1.18,
                      letterSpacing: '-0.025em',
                      margin: '0 0 16px',
                      position: 'relative'
                    }}
                  >
                    {t('Master Your ', 'आफ्नो ')}
                    <span
                      style={{
                        color: '#2563eb',
                        position: 'relative',
                        display: 'inline-block'
                      }}
                    >
                      {t('Likhit Exam', 'लिखित परीक्षा')}
                      {/* Amber / Yellow curved brush stroke underline */}
                      <svg
                        style={{
                          position: 'absolute',
                          bottom: '-8px',
                          left: 0,
                          width: '100%',
                          height: '12px'
                        }}
                        viewBox="0 0 240 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M3 8.5C70 2 170 2 237 8.5"
                          stroke="#f59e0b"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>{' '}
                    {t('With Confidence', 'सहजै पास गर्नुहोस्')}
                  </h1>

                  {/* Subtitle */}
                  <p
                    style={{
                      fontSize: 'clamp(15px, 1.8vw, 16.5px)',
                      color: '#475569',
                      lineHeight: 1.6,
                      margin: '0 0 28px'
                    }}
                  >
                    {t(
                      'Practice with 500 official DoTM questions, take realistic timed mock exams, test your color vision, and check your Likhit exam result in one place.',
                      'यातायात व्यवस्था विभागका ५०० आधिकारिक प्रश्नहरू, समयसहितको नमुना परीक्षा, आँखा रङ परीक्षण र नतिजा जाँच एउटै स्थानबाट गर्नुहोस्।'
                    )}
                  </p>

                  {/* Interactive CTA Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '14px',
                      alignItems: 'center'
                    }}
                  >
                    {/* Primary Button */}
                    <Link
                      href="/license/mock-test"
                      className="hover-lift"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 28px',
                        borderRadius: '9999px',
                        backgroundColor: '#1d4ed8',
                        color: '#ffffff',
                        fontSize: '15.5px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(29, 78, 216, 0.3)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '12px' }}>▶</span>
                      <span>{t('Start Your Likhit Test', 'लिखित परीक्षा सुरु गर्नुहोस्')}</span>
                      <ArrowRight size={17} />
                    </Link>

                    {/* Secondary Button */}
                    <Link
                      href="/license/questions"
                      className="hover-lift"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 26px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #cbd5e1',
                        color: '#1e293b',
                        fontSize: '15px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <BookOpen size={18} color="#2563eb" />
                      <span>{t('Explore 500 Questions', '५०० प्रश्नहरू हेर्नुहोस्')}</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Real illustration with Nepal Smart Driving License Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/license-hero-illustration.png"
                    alt="Nepal Smart Driving License Card and Preparation Illustration"
                    style={{
                      width: '100%',
                      maxWidth: '480px',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 14px 30px rgba(15, 23, 42, 0.12))'
                    }}
                  />
                </div>
              </div>

              {/* Real Floating Stat Card Across Bottom */}
              <div
                style={{
                  marginTop: '36px',
                  padding: '14px 24px',
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 28px rgba(15, 23, 42, 0.05)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Stat 1 */}
                <Link
                  href="/license/questions"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  className="hover:bg-slate-50"
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb',
                      flexShrink: 0
                    }}
                  >
                    <BookOpen size={19} />
                  </div>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>500+</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                      {t('Official Questions', 'आधिकारिक प्रश्नहरू')}
                    </div>
                  </div>
                </Link>

                {/* Stat 2 */}
                <Link
                  href="/license/mock-test"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  className="hover:bg-slate-50"
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669',
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>98%</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                      {t('Success Readiness', 'सफलता दर तयारी')}
                    </div>
                  </div>
                </Link>

                {/* Stat 3 */}
                <Link
                  href="/license"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  className="hover:bg-slate-50"
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#f5f3ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed',
                      flexShrink: 0
                    }}
                  >
                    <Sparkles size={19} />
                  </div>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>24/7</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                      {t('Free Preparation', 'निःशुल्क अनलाइन तयारी')}
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* 2. EVERYTHING YOU NEED TO PASS YOUR TEST MATCHING USER REFERENCE */}
            <section>
              <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
                {/* Star Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 18px',
                    borderRadius: '9999px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    fontSize: '13px',
                    fontWeight: 700,
                    marginBottom: '14px'
                  }}
                >
                  <span style={{ color: '#2563eb', fontSize: '13px' }}>★</span>
                  <span>{t('Everything You Need', 'सबै आवश्यक सामग्री')}</span>
                </div>

                {/* Heading */}
                <h2
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 900,
                    color: '#0f172a',
                    margin: '0 auto 12px',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    textAlign: 'center'
                  }}
                >
                  {t('Everything You Need to ', 'परीक्षा पास गर्न आवश्यक ')}
                  <span style={{ color: '#2563eb', position: 'relative', display: 'inline-block' }}>
                    {t('Pass Your Test', 'सम्पूर्ण तयारी')}
                    <svg
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: 0,
                        width: '100%',
                        height: '10px'
                      }}
                      viewBox="0 0 240 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 8.5C70 2 170 2 238 8.5"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: '16px',
                    color: '#64748b',
                    margin: '0 auto',
                    maxWidth: '620px',
                    lineHeight: 1.6
                  }}
                >
                  {t(
                    'Choose a dedicated preparation tool below to practice questions, signs, vision, and results.',
                    'तल दिइएको टुल छनौट गरी प्रश्नोत्तर, ट्राफिक चिन्ह, आँखा जाँच र नतिजाको तयारी गर्नुहोस्।'
                  )}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px'
                }}
              >
                {[
                  {
                    href: '/license/questions',
                    icon: <BookOpen size={28} strokeWidth={2.2} />,
                    iconBg: '#eff6ff',
                    iconBorder: '#bfdbfe',
                    iconColor: '#2563eb',
                    titleEn: '500 Question Bank',
                    titleNe: '५०० आधिकारिक प्रश्न बैंक',
                    descEn: 'Study all 500 official DoTM questions with bilingual answers, clear explanations, and self-test mode.',
                    descNe: 'सबै ६ विषयका ५०० प्रश्नहरू स्पष्ट व्याख्या, उत्तर र अभ्यास मोडसहित पृष्ठ अनुसार पढ्नुहोस्।',
                    ctaEn: 'Explore 500 Questions',
                    ctaNe: '५०० प्रश्नहरू हेर्नुहोस्',
                    btnBorder: '#3b82f6',
                    btnColor: '#2563eb'
                  },
                  {
                    href: '/license/mock-test',
                    icon: <Clock size={28} strokeWidth={2.2} />,
                    iconBg: '#ecfdf5',
                    iconBorder: '#a7f3d0',
                    iconColor: '#059669',
                    titleEn: 'Timed Likhit Mock Test',
                    titleNe: 'समयसहितको नमुना परीक्षा',
                    descEn: 'Take randomized 20-question Bike/Scooter or 25-question Car exams with live countdown and 60% pass rule.',
                    descNe: '३० मिनेटको टाइमरसहित बाइक/स्कुटर (२०) र कार (२५) को आधिकारिक नमुना परीक्षा दिनुहोस्।',
                    ctaEn: 'Start Mock Exam',
                    ctaNe: 'नमुना परीक्षा सुरु गर्नुहोस्',
                    btnBorder: '#10b981',
                    btnColor: '#059669'
                  },
                  {
                    href: '/license/traffic-signs',
                    icon: <ShieldAlert size={28} strokeWidth={2.2} />,
                    iconBg: '#fff1f2',
                    iconBorder: '#fecdd3',
                    iconColor: '#e11d48',
                    titleEn: 'Nepal Traffic Signs Guide',
                    titleNe: 'नेपाल ट्राफिक चिन्ह निर्देशिका',
                    descEn: 'Master official road signs with crisp high-resolution vector diagrams and interactive flashcard recall.',
                    descNe: 'आदेशात्मक, सचेतक र सूचनामूलक सडक चिन्हहरू सचित्र र फ्ल्यासकार्ड मार्फत सिक्नुहोस्।',
                    ctaEn: 'Learn Traffic Signs',
                    ctaNe: 'ट्राफिक चिन्हहरू हेर्नुहोस्',
                    btnBorder: '#f43f5e',
                    btnColor: '#e11d48'
                  },
                  {
                    href: '/license/eye-test',
                    icon: <Eye size={28} strokeWidth={2.2} />,
                    iconBg: '#f5f3ff',
                    iconBorder: '#ddd6fe',
                    iconColor: '#7c3aed',
                    titleEn: 'Color Vision (Ishihara) Test',
                    titleNe: 'आँखा रङ पहिचान परीक्षण',
                    descEn: 'Screen for red-green color deficiency using official 10-plate Ishihara charts required by DoTM medicals.',
                    descNe: 'लाइसेन्स मेडिकल जाँचको लागि १० वटा इसिहारा प्लेटमार्फत आफ्नो आँखाको रङ परीक्षण गर्नुहोस्।',
                    ctaEn: 'Take Eye Test',
                    ctaNe: 'आँखा जाँच सुरु गर्नुहोस्',
                    btnBorder: '#8b5cf6',
                    btnColor: '#7c3aed'
                  },
                  {
                    href: '/license/result',
                    icon: <FileCheck2 size={28} strokeWidth={2.2} />,
                    iconBg: '#fffbeb',
                    iconBorder: '#fde68a',
                    iconColor: '#d97706',
                    titleEn: 'Likhit SMS Result Checker',
                    titleNe: 'लिखित नतिजा र SMS जाँच',
                    descEn: 'Check your official DoTM written test score via instant SMS 33001 command format and Yatayat notices.',
                    descNe: '३३००१ मा एसएमएस पठाउने सही तरिका र यातायात कार्यालयहरूको दैनिक नतिजा सूचनाहरू हेर्नुहोस्।',
                    ctaEn: 'Check Result',
                    ctaNe: 'नतिजा जाँच्नुहोस्',
                    btnBorder: '#f59e0b',
                    btnColor: '#d97706'
                  },
                  {
                    href: '/license/trial',
                    icon: <Award size={28} strokeWidth={2.2} />,
                    iconBg: '#f0fdfa',
                    iconBorder: '#99f6e4',
                    iconColor: '#0d9488',
                    titleEn: 'Practical Trial 70-Score Guide',
                    titleNe: '७०-अंक ट्रायल सिमुलेटर',
                    descEn: 'Learn the 70-point pass system for 8-shape, ramp, garage parking, traffic light, and U-turn trials.',
                    descNe: '८-आकार, उकालो-ओरालो, ग्यारेज पार्किङ र ट्राफिक लाइटमा अंक नकाटिने गरी पास हुने नियमहरू।',
                    ctaEn: 'View Trial Rules',
                    ctaNe: 'ट्रायल नियमहरू हेर्नुहोस्',
                    btnBorder: '#14b8a6',
                    btnColor: '#0d9488'
                  }
                ].map((card) => (
                  <div
                    key={card.href}
                    className="hover-lift"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '26px',
                      border: '1.5px solid #e2e8f0',
                      padding: '32px 28px 28px',
                      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div>
                      {/* Top Squircle Icon Box */}
                      <div
                        style={{
                          width: '58px',
                          height: '58px',
                          borderRadius: '18px',
                          backgroundColor: card.iconBg,
                          border: `1.5px solid ${card.iconBorder}`,
                          color: card.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '22px'
                        }}
                      >
                        {card.icon}
                      </div>

                      {/* Card Title */}
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: 900,
                          color: '#0f172a',
                          margin: '0 0 10px',
                          lineHeight: 1.3
                        }}
                      >
                        {isNe ? card.titleNe : card.titleEn}
                      </h3>

                      {/* Card Description */}
                      <p
                        style={{
                          fontSize: '14.5px',
                          color: '#64748b',
                          lineHeight: 1.6,
                          margin: '0 0 26px'
                        }}
                      >
                        {isNe ? card.descNe : card.descEn}
                      </p>
                    </div>

                    {/* Outline Pill Action Button Matching Reference */}
                    <div>
                      <Link
                        href={card.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 22px',
                          borderRadius: '9999px',
                          backgroundColor: '#ffffff',
                          border: `1.5px solid ${card.btnBorder}`,
                          color: card.btnColor,
                          fontSize: '13.5px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span>{isNe ? card.ctaNe : card.ctaEn}</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. GET YOUR LICENSE IN THREE EASY STEPS */}
            <section
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '24px',
                padding: '44px 28px',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
                  {t('Get Your License in Three Easy Steps', 'तीन सजिलो चरणमा लाइसेन्स परीक्षा पास गर्नुहोस्')}
                </h2>
                <p style={{ fontSize: '15.5px', color: '#4b5563', margin: 0 }}>
                  {t(
                    'Follow this simple preparation path to clear your written exam, medical eye check, and practical trial.',
                    'लिखित परीक्षा, आँखा जाँच र ट्रायल सहजै पास गर्न तलका तीन चरण अपनाउनुहोस्।'
                  )}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '22px'
                }}
              >
                {[
                  {
                    num: '1',
                    titleEn: 'Study the Material',
                    titleNe: 'पाठ्यक्रम र चिन्ह पढ्नुहोस्',
                    descEn: 'Review the official 500 questions and road signs grouped cleanly by category.',
                    descNe: '५०० आधिकारिक प्रश्न र ट्राफिक चिन्हहरू विषय अनुसार अध्ययन गर्नुहोस्।',
                    bulletsEn: ['Traffic Rules & Penalties', 'Road Signs & Markings'],
                    bulletsNe: ['ट्राफिक नियम तथा जरिवाना', 'सडक चिन्ह र संकेत'],
                    href: '/license/questions',
                    linkEn: 'Open Question Bank',
                    linkNe: 'प्रश्न बैंक खोल्नुहोस्'
                  },
                  {
                    num: '2',
                    titleEn: 'Practice with Mock Tests',
                    titleNe: 'नमुना परीक्षा अभ्यास गर्नुहोस्',
                    descEn: 'Take timed 30-minute tests and verify your color perception before biometric day.',
                    descNe: '३० मिनेटको टाइमर परीक्षा र १२-प्लेट आँखा परीक्षण अभ्यास गर्नुहोस्।',
                    bulletsEn: ['60% Instant Pass Grading', '12-Plate Ishihara Check'],
                    bulletsNe: ['तत्काल ६०% नतिजा जाँच', '१२-प्लेट इशहारा परीक्षण'],
                    href: '/license/mock-test',
                    linkEn: 'Start Mock Exam',
                    linkNe: 'नमुना परीक्षा दिनुहोस्'
                  },
                  {
                    num: '3',
                    titleEn: 'Ace Your Exam & Trial',
                    titleNe: 'लिखित र ट्रायल सफल बनाउनुहोस्',
                    descEn: 'Check your Likhit SMS result cleanly and master the 70-point practical trial evaluation.',
                    descNe: 'SMS मार्फत नतिजा जाँच्नुहोस् र ७०-अंक ट्रायल नियम बुझ्नुहोस्।',
                    bulletsEn: ['1-Tap 33001 SMS Check', '70-Point Trial Score Guide'],
                    bulletsNe: ['३३००१ मा सजिलो SMS जाँच', '७०-अंक ट्रायल मूल्याङ्कन'],
                    href: '/license/trial',
                    linkEn: 'View Trial Guide',
                    linkNe: 'ट्रायल गाइड हेर्नुहोस्'
                  }
                ].map((step) => (
                  <div
                    key={step.num}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '18px',
                      padding: '26px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '18px'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '9999px',
                          backgroundColor: '#003893',
                          color: '#ffffff',
                          fontSize: '20px',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '18px'
                        }}
                      >
                        {formatNum(step.num)}
                      </div>
                      <h3 style={{ fontSize: '18.5px', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>
                        {isNe ? step.titleNe : step.titleEn}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#4b5563', margin: '0 0 16px', lineHeight: 1.55 }}>
                        {isNe ? step.descNe : step.descEn}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(isNe ? step.bulletsNe : step.bulletsEn).map((b) => (
                          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', fontWeight: 600 }}>
                            <CheckCircle2 size={15} color="#10b981" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={step.href}
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#003893',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span>{isNe ? step.linkNe : step.linkEn}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link
                  href="/license/mock-test"
                  className="hover-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    backgroundColor: '#003893',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 8px 20px rgba(0, 56, 147, 0.18)'
                  }}
                >
                  <span>{t('Start Practicing Now', 'अहिले अभ्यास सुरु गर्नुहोस्')}</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </section>

            {/* 4. PROGRAMMATIC SEO DIRECTORY: CATEGORIES, TOPICS & TRIAL GUIDES */}
            <section
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px clamp(18px, 3.5vw, 32px)',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  {t('Comprehensive Preparation Index', 'विस्तृत परीक्षा निर्देशिका तथा प्रश्न संग्रह')}
                </div>
                <h3 style={{ fontSize: 'clamp(20px, 2.8vw, 26px)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                  {t('License Exams by Vehicle Category & Study Topics', 'सवारी साधन वर्ग र विषय अनुसार तयारी')}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0 }}>
                  {t(
                    'Explore dedicated practice tests, chapter-wise questions, and practical trial rubrics:',
                    'आफ्नो सवारी साधन र विषय अनुसार समर्पित नमुना परीक्षा र अंक तालिका हेर्नुहोस्:'
                  )}
                </p>
              </div>

              {/* Sub-grid 1: Vehicle Categories */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
                  {t('🚗 License Category Guides (सवारी साधन वर्ग):', '🚗 सवारी साधन वर्ग अनुसार तयारी:')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <Link
                    href="/license/category/bike-category-a"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      textDecoration: 'none',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: 'all 0.15s ease'
                    }}
                    className="hover:border-blue-300 hover:bg-blue-50/40"
                  >
                    <span>🏍️ Bike / Motorcycle (Cat A)</span>
                    <span style={{ fontSize: '12px', color: '#2563eb' }}>20 Qs →</span>
                  </Link>

                  <Link
                    href="/license/category/scooter-category-k"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      textDecoration: 'none',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: 'all 0.15s ease'
                    }}
                    className="hover:border-blue-300 hover:bg-blue-50/40"
                  >
                    <span>🛵 Scooter / Moped (Cat K)</span>
                    <span style={{ fontSize: '12px', color: '#2563eb' }}>20 Qs →</span>
                  </Link>

                  <Link
                    href="/license/category/car-category-b"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      textDecoration: 'none',
                      color: '#0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: 'all 0.15s ease'
                    }}
                    className="hover:border-blue-300 hover:bg-blue-50/40"
                  >
                    <span>🚗 Car / Jeep / Van (Cat B)</span>
                    <span style={{ fontSize: '12px', color: '#2563eb' }}>25 Qs →</span>
                  </Link>
                </div>
              </div>

              {/* Sub-grid 2: Study Chapters / Topics */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
                  {t('📚 Question Bank by Topic (विषय अनुसार ५०० प्रश्नहरू):', '📚 विषय अनुसार ५०० प्रश्नोत्तरहरू:')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {[
                    { href: '/license/topic/traffic-rules-and-regulations', label: 'Traffic Rules & Penalties (सवारी ऐन नियम)' },
                    { href: '/license/topic/traffic-signs-and-signals', label: 'Road Signs & Signals (सडक संकेत तथा चिन्ह)' },
                    { href: '/license/topic/vehicle-technical-knowledge', label: 'Vehicle Mechanics (प्राविधिक तथा यान्त्रिक ज्ञान)' },
                    { href: '/license/topic/safe-driving-principles', label: 'Safe Driving Principles (सैद्धान्तिक ज्ञान)' },
                    { href: '/license/topic/accident-awareness-first-aid', label: 'Accident Awareness & First Aid (दुर्घटना सचेतना)' },
                    { href: '/license/topic/environmental-pollution-awareness', label: 'Emission & Pollution (वातावरण प्रदूषण)' }
                  ].map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        textDecoration: 'none',
                        color: '#1e293b',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      className="hover:border-blue-300 hover:text-blue-600"
                    >
                      <span>{topic.label}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sub-grid 3: 70-Point Trial Rules */}
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
                  {t('🏁 70-Mark Practical Trial Guides (७० अंक प्रयोगात्मक परीक्षा निर्देशिका):', '🏁 ७० अंक प्रयोगात्मक परीक्षा निर्देशिका:')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                  <Link
                    href="/license/trial/bike-70-mark-trial-system"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      textDecoration: 'none',
                      color: '#166534',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '13.5px'
                    }}
                    className="hover:border-green-400 hover:shadow-sm"
                  >
                    <span>🏍️ Bike 70-Point Trial Evaluation & Rubric</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/license/trial/car-70-mark-trial-system"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      textDecoration: 'none',
                      color: '#1e40af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '13.5px'
                    }}
                    className="hover:border-blue-400 hover:shadow-sm"
                  >
                    <span>🚗 Car 70-Point Trial Evaluation & T-Parking</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Sub-grid 4: Low-Volume Longtail Guides & Specific FAQs */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#334155', marginBottom: '12px' }}>
                  {t('💡 Essential Rules, Medical & Retrial FAQs (बारम्बार सोधिने विशेष प्रश्नहरू):', '💡 बारम्बार सोधिने विशेष प्रश्नहरू:')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                  {[
                    { href: '/license/guide/is-there-negative-marking-in-likhit-exam-nepal', label: 'Negative Marking in Likhit Exam (नेगेटिभ मार्किङ नियम)' },
                    { href: '/license/guide/how-many-retrials-allowed-nepal-license', label: 'Retrials Allowed & 18-Month Validity (रिट्रायल म्याद)' },
                    { href: '/license/guide/bike-trial-8-shape-rules-deductions', label: 'Bike 8-Shape Line Touch Deductions (८ आकार नियम)' },
                    { href: '/license/guide/narrow-plank-falyak-bike-trial-tips', label: 'Narrow Plank (Falyak) Balance Tips (साँघुरो फल्याक)' },
                    { href: '/license/guide/car-t-parking-trial-tips-nepal', label: 'Car T-Parking & Garage Reverse (टी-पार्किङ गाइड)' },
                    { href: '/license/guide/uphill-ramp-car-trial-technique', label: 'Uphill Ramp Stop & Start (उकालो र्‍याम्प विधि)' },
                    { href: '/license/guide/color-blindness-eye-test-rules-nepal-license', label: 'Color Blindness & Ishihara Test (आँखा जाँच नियम)' },
                    { href: '/license/guide/driving-license-medical-test-requirements-nepal', label: 'Medical Test Checkup Procedure (मेडिकलमा के के जाँच्छ)' },
                    { href: '/license/guide/driving-license-total-cost-fees-breakdown-nepal', label: 'Total License Expense & Fees (निकाल्न कति खर्च लाग्छ)' },
                    { href: '/license/guide/smart-license-card-print-check-sms', label: 'Check Smart Card Print via SMS 33001 (प्रिन्ट स्टाटस)' }
                  ].map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        textDecoration: 'none',
                        color: '#1e293b',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      className="hover:border-blue-300 hover:text-blue-600"
                    >
                      <span style={{ maxWidth: '88%' }}>{guide.label}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: MOCK TEST SIMULATOR (DIRECT START, NO SETUP SCREEN)   */}
        {/* ============================================================ */}
        {activeTab === 'mock-test' && (
          <div>
            {/* LikhitExam Centered Hero Header */}
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 28px' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}
              >
                {t('Official Format', 'आधिकारिक ढाँचा')}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(26px, 3.8vw, 38px)',
                  fontWeight: 900,
                  color: '#111827',
                  lineHeight: 1.22,
                  margin: '0 0 12px'
                }}
              >
                {t('Nepal Driving License ', 'नेपाल सवारी चालक अनुमतिपत्र ')}
                <span style={{ color: '#003893', position: 'relative', display: 'inline-block' }}>
                  {t('Likhit Exam', 'लिखित परीक्षा')}
                  <svg
                    style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '11px' }}
                    viewBox="0 0 358 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path d="M3 9C118.957 4.47226 184.456 -1.86658 355 9" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, lineHeight: 1.55 }}>
                {t(
                  'Practice with our simulated test that follows the exact format of the official exam',
                  'यातायात व्यवस्था विभागको आधिकारिक परीक्षा ढाँचामा आधारित नमुना अभ्यास'
                )}
              </p>
            </div>

            {/* PRE-EXAM SETUP SCREEN: SIMPLE MINIMALIST SELECTOR */}
            {examStatus === 'setup' && (
              <div
                className="white-card"
                style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                  padding: '28px 24px',
                  borderRadius: '20px',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* 1. Language Selection */}
                <div style={{ marginBottom: '18px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    {t('Language', 'भाषा')}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setLanguage('ne')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: language === 'ne' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        backgroundColor: language === 'ne' ? '#eff6ff' : '#ffffff',
                        color: language === 'ne' ? '#1d4ed8' : '#334155',
                        fontWeight: 700,
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>🇳🇵</span>
                      <span>नेपाली</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: language === 'en' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        backgroundColor: language === 'en' ? '#eff6ff' : '#ffffff',
                        color: language === 'en' ? '#1d4ed8' : '#334155',
                        fontWeight: 700,
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                </div>

                {/* 2. Vehicle Category */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '8px'
                    }}
                  >
                    {t('Vehicle Category', 'सवारी साधन')}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('bike')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: selectedVehicle === 'bike' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        backgroundColor: selectedVehicle === 'bike' ? '#eff6ff' : '#ffffff',
                        color: selectedVehicle === 'bike' ? '#1d4ed8' : '#334155',
                        fontWeight: 700,
                        fontSize: '14.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Bike size={18} />
                      <span>{t('Bike (20 Qs)', 'बाइक (२०)')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('car')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: selectedVehicle === 'car' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        backgroundColor: selectedVehicle === 'car' ? '#eff6ff' : '#ffffff',
                        color: selectedVehicle === 'car' ? '#1d4ed8' : '#334155',
                        fontWeight: 700,
                        fontSize: '14.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Car size={18} />
                      <span>{t('Car (25 Qs)', 'कार (२५)')}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Start Exam Button */}
                <button
                  type="button"
                  onClick={() => handleStartMockExam('all', selectedVehicle)}
                  className="hover-lift"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '12px' }}>▶</span>
                  <span>{t('Start Mock Exam', 'परीक्षा सुरु गर्नुहोस्')}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* RUNNING EXAM SCREEN */}
            {examStatus === 'running' && examQuestions.length > 0 && (
              <div className="white-card" style={{ padding: '24px', borderRadius: '20px', border: '1.5px solid #e2e8f0' }}>
                {/* Top Timer, Vehicle Switcher & View Toggle */}
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Quick Vehicle Switcher */}
                    <div
                      style={{
                        display: 'inline-flex',
                        gap: '3px',
                        padding: '3px',
                        borderRadius: '10px',
                        backgroundColor: '#e2e8f0'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleStartMockExam('all', 'bike')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: selectedVehicle === 'bike' ? '#ffffff' : 'transparent',
                          color: selectedVehicle === 'bike' ? '#003893' : '#475569',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        <Bike size={14} />
                        <span>{t('Bike (20)', 'बाइक (२०)')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartMockExam('all', 'car')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: selectedVehicle === 'car' ? '#ffffff' : 'transparent',
                          color: selectedVehicle === 'car' ? '#003893' : '#475569',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        <Car size={14} />
                        <span>{t('Car (25)', 'कार (२५)')}</span>
                      </button>
                    </div>

                    <div style={{ fontSize: '13px', color: '#475569' }}>
                      {t('Answered:', 'हल गरिएको:')} <strong style={{ color: '#003893' }}>{formatNum(answeredCount)}</strong> / {formatNum(totalQuestions)}{' '}
                      ({formatNum(marksPerQuestion)} {t('marks/Q', 'अंक/प्र')})
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '9999px',
                        backgroundColor: secondsLeft <= 300 ? '#fef2f2' : '#ffffff',
                        border: `1.5px solid ${secondsLeft <= 300 ? '#fca5a5' : '#cbd5e1'}`,
                        color: secondsLeft <= 300 ? '#dc2626' : '#0f172a',
                        fontWeight: 900,
                        fontSize: '15px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <Clock size={16} />
                      <span>{formatTime(secondsLeft)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setViewMode((v) => (v === 'single' ? 'sheet' : 'single'))}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {viewMode === 'single' ? t('Full Sheet', 'सबै प्रश्न') : t('Single Card', 'एक-एक प्रश्न')}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartMockExam('all')}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#003893',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Shuffle size={13} />
                      <span>{t('New Set', 'नयाँ सेट')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsTimerActive(false);
                        setExamStatus('setup');
                      }}
                      style={{
                        padding: '7px 13px',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #cbd5e1',
                        color: '#475569',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span>⚙️</span>
                      <span>{t('Change Setup', 'सेटिङ')}</span>
                    </button>
                  </div>
                </div>

                {/* SINGLE QUESTION CBT VIEW */}
                {viewMode === 'single' ? (
                  <div>
                    {/* Question Number Pills */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {examQuestions.map((q, idx) => {
                        const isAns = userAnswers[q.id] !== undefined;
                        const isCurr = idx === currentIdx;
                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setCurrentIdx(idx)}
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '9px',
                              border: isCurr ? '2px solid #003893' : isAns ? '1.5px solid #10b981' : '1px solid #cbd5e1',
                              backgroundColor: isCurr ? '#003893' : isAns ? '#ecfdf5' : '#ffffff',
                              color: isCurr ? '#ffffff' : isAns ? '#065f46' : '#475569',
                              fontSize: '12.5px',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            {formatNum(idx + 1)}
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Question Card */}
                    {(() => {
                      const q = examQuestions[currentIdx];
                      const selectedOpt = userAnswers[q.id];
                      const options = isNe ? q.optionsNep : q.optionsEng;
                      const optLabels = isNe ? ['क', 'ख', 'ग', 'घ'] : ['A', 'B', 'C', 'D'];

                      return (
                        <div
                          style={{
                            padding: '24px',
                            borderRadius: '18px',
                            border: '1.5px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            marginBottom: '20px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span className="badge badge-blue">
                              {t('Question', 'प्रश्न')} {formatNum(currentIdx + 1)} / {formatNum(totalQuestions)}
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>
                              {isNe ? q.categoryLabelNep : q.categoryLabelEng}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#0f172a', margin: '0 0 18px', lineHeight: 1.45 }}>
                            {isNe ? q.questionNep : q.questionEng}
                          </h3>

                          {q.signSymbol && (
                            <div style={{ fontSize: '36px', marginBottom: '16px' }}>{q.signSymbol}</div>
                          )}

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                            {options.map((optText, optIdx) => {
                              const isSelected = selectedOpt === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, optIdx)}
                                  style={{
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: isSelected ? '2px solid #003893' : '1.5px solid #cbd5e1',
                                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                                    color: isSelected ? '#003893' : '#1e293b',
                                    fontSize: '14.5px',
                                    fontWeight: isSelected ? 800 : 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textAlign: 'left',
                                    transition: 'all 0.15s ease'
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      backgroundColor: isSelected ? '#003893' : '#f1f5f9',
                                      color: isSelected ? '#ffffff' : '#475569',
                                      fontSize: '12px',
                                      fontWeight: 900,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0
                                    }}
                                  >
                                    {optLabels[optIdx]}
                                  </span>
                                  <span style={{ flex: 1 }}>{optText}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Bottom Prev / Next / Submit Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <button
                        type="button"
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                        style={{
                          padding: '11px 18px',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: currentIdx === 0 ? '#cbd5e1' : '#0f172a',
                          fontSize: '13.5px',
                          fontWeight: 800,
                          cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ChevronLeft size={16} />
                        <span>{t('Previous', 'अघिल्लो')}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        {currentIdx + 1 < totalQuestions && (
                          <button
                            type="button"
                            onClick={() => setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1))}
                            style={{
                              padding: '11px 22px',
                              borderRadius: '12px',
                              backgroundColor: '#003893',
                              color: '#ffffff',
                              border: 'none',
                              fontSize: '13.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>{t('Next Question', 'अर्को प्रश्न')}</span>
                            <ChevronRight size={16} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleSubmitExam}
                          style={{
                            padding: '11px 24px',
                            borderRadius: '12px',
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            fontSize: '13.5px',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                          }}
                        >
                          <Check size={16} />
                          <span>{t('Submit Exam', 'परीक्षा बुझाउनुहोस्')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* FULL SHEET VIEW */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {examQuestions.map((q, qIdx) => {
                      const selectedOpt = userAnswers[q.id];
                      const options = isNe ? q.optionsNep : q.optionsEng;
                      const optLabels = isNe ? ['क', 'ख', 'ग', 'घ'] : ['A', 'B', 'C', 'D'];

                      return (
                        <div
                          key={q.id}
                          style={{
                            padding: '20px',
                            borderRadius: '16px',
                            border: '1.5px solid #e2e8f0',
                            backgroundColor: '#ffffff'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '10px' }}>
                            <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a' }}>
                              {formatNum(qIdx + 1)}. {isNe ? q.questionNep : q.questionEng}
                            </div>
                            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
                              {isNe ? q.categoryLabelNep : q.categoryLabelEng}
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
                            {options.map((optText, optIdx) => {
                              const isSelected = selectedOpt === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, optIdx)}
                                  style={{
                                    padding: '11px 14px',
                                    borderRadius: '10px',
                                    border: isSelected ? '2px solid #003893' : '1.5px solid #e2e8f0',
                                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                                    color: isSelected ? '#003893' : '#1e293b',
                                    fontSize: '13.5px',
                                    fontWeight: isSelected ? 800 : 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textAlign: 'left'
                                  }}
                                >
                                  <span style={{ fontWeight: 800 }}>({optLabels[optIdx]})</span>
                                  <span>{optText}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                      <button
                        type="button"
                        onClick={handleSubmitExam}
                        style={{
                          padding: '14px 32px',
                          borderRadius: '12px',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '15px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Check size={18} />
                        <span>{t('Submit Exam & View Score', 'परीक्षा बुझाई नतिजा हेर्नुहोस्')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2C. SUBMITTED RESULT & DETAILED ANSWER REVIEW */}
            {examStatus === 'submitted' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div
                  className="white-card"
                  style={{
                    padding: '32px 24px',
                    borderRadius: '20px',
                    backgroundColor: isPassed ? '#ecfdf5' : '#fef2f2',
                    border: `2px solid ${isPassed ? '#a7f3d0' : '#fecaca'}`,
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: isPassed ? '#10b981' : '#ef4444',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px'
                    }}
                  >
                    {isPassed ? <Award size={32} /> : <AlertCircle size={32} />}
                  </div>

                  <div style={{ fontSize: '12.5px', fontWeight: 900, textTransform: 'uppercase', color: isPassed ? '#047857' : '#b91c1c' }}>
                    {isPassed
                      ? t('Congratulations! You Passed the Written Mock Exam', 'बधाई छ! तपाईं लिखित नमुना परीक्षामा उत्तीर्ण हुनुभयो')
                      : t('Not Passed — Minimum 60 Marks Required', 'उत्तीर्ण हुन सकिएन — कम्तीमा ६० अंक आवश्यक छ')}
                  </div>

                  <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '8px 0' }}>
                    {formatNum(earnedMarks)} / {formatNum(100)} {t('Marks', 'अंक')} ({formatNum(correctCount)}/{formatNum(totalQuestions)})
                  </h2>

                  <p style={{ fontSize: '14px', color: '#334155', maxWidth: '540px', margin: '0 auto 22px' }}>
                    {t(
                      `You answered ${correctCount} out of ${totalQuestions} questions correctly. Review the explanations below to strengthen your preparation.`,
                      `तपाईंले कुल ${formatNum(totalQuestions)} प्रश्नमध्ये ${formatNum(correctCount)} प्रश्नको सही उत्तर दिनुभयो। तल विस्तृत व्याख्या हेर्नुहोस्।`
                    )}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => handleStartMockExam('all')}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        backgroundColor: '#003893',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>{t('Take New Random Set', 'अर्को नयाँ सेट दिनुहोस्')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartMockExam('all', selectedVehicle === 'bike' ? 'car' : 'bike')}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {selectedVehicle === 'bike'
                        ? t('Switch to Car (25 Qs)', 'कार (२५ प्रश्न) दिनुहोस्')
                        : t('Switch to Bike (20 Qs)', 'बाइक (२० प्रश्न) दिनुहोस्')}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExamStatus('setup')}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ⚙️ {t('Change Language / Setup', 'भाषा वा सेटिङ परिवर्तन')}
                    </button>
                  </div>
                </div>

                {/* Answer Review List */}
                <div className="white-card" style={{ padding: '24px', borderRadius: '20px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 18px' }}>
                    {t('Complete Answer Review & Explanations', 'सम्पूर्ण प्रश्नहरूको सही उत्तर र आधिकारिक व्याख्या')}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {examQuestions.map((q, qIdx) => {
                      const userPicked = userAnswers[q.id];
                      const isCorrect = userPicked === q.correctIndex;
                      const options = isNe ? q.optionsNep : q.optionsEng;
                      const optLabels = isNe ? ['क', 'ख', 'ग', 'घ'] : ['A', 'B', 'C', 'D'];

                      return (
                        <div
                          key={q.id}
                          style={{
                            padding: '18px',
                            borderRadius: '14px',
                            border: `1.5px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
                            backgroundColor: isCorrect ? '#fafffd' : '#fffbfa'
                          }}
                        >
                          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                            {formatNum(qIdx + 1)}. {isNe ? q.questionNep : q.questionEng}
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '8px', marginBottom: '10px' }}>
                            {options.map((optText, optIdx) => {
                              const isRight = optIdx === q.correctIndex;
                              const isWrongPick = !isCorrect && userPicked === optIdx;
                              return (
                                <div
                                  key={optIdx}
                                  style={{
                                    padding: '9px 12px',
                                    borderRadius: '9px',
                                    border: isRight ? '2px solid #10b981' : isWrongPick ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                    backgroundColor: isRight ? '#ecfdf5' : isWrongPick ? '#fef2f2' : '#ffffff',
                                    color: isRight ? '#065f46' : isWrongPick ? '#991b1b' : '#475569',
                                    fontSize: '13px',
                                    fontWeight: isRight || isWrongPick ? 800 : 500,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}
                                >
                                  <span>
                                    ({optLabels[optIdx]}) {optText}
                                  </span>
                                  {isRight && <CheckCircle2 size={15} color="#10b981" />}
                                  {isWrongPick && <XCircle size={15} color="#ef4444" />}
                                </div>
                              );
                            })}
                          </div>

                          <div style={{ fontSize: '12.5px', color: '#334155', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#003893' }}>{t('Explanation:', 'व्याख्या:')} </strong>
                            {isNe ? q.explanationNep : q.explanationEng}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: QUESTION BANK (500 OFFICIAL SYLLABUS, 20/PAGE ONLY)   */}
        {/* ============================================================ */}
        {activeTab === 'question-bank' && (
          <div>
            {/* LikhitExam Centered Hero Header */}
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 28px' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}
              >
                {t('Complete Question Collection', 'सम्पूर्ण प्रश्न संग्रह')}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(26px, 3.8vw, 38px)',
                  fontWeight: 900,
                  color: '#111827',
                  lineHeight: 1.22,
                  margin: '0 0 12px'
                }}
              >
                {t('Nepal Driving License ', 'नेपाल सवारी चालक अनुमतिपत्र ')}
                <span style={{ color: '#003893', position: 'relative', display: 'inline-block' }}>
                  {t('Question Bank', 'प्रश्न बैंक')}
                  <svg
                    style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '11px' }}
                    viewBox="0 0 358 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path d="M3 9C118.957 4.47226 184.456 -1.86658 355 9" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, lineHeight: 1.55 }}>
                {t(
                  'Master all 500 official questions with answers and explanations',
                  'उत्तर र स्पष्टीकरणसहित सबै ५०० आधिकारिक प्रश्नहरूको तयारी गर्नुहोस्'
                )}
              </p>
            </div>

            <div
              className="white-card"
              style={{
                padding: '28px 24px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)'
              }}
            >
              {/* Top 3 Primary Filter Tabs + Search + Self-Test Mode */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all' as const, en: `All Questions (${ALL_DOTM_QUESTIONS.length})`, ne: `सबै प्रश्न (${formatNum(ALL_DOTM_QUESTIONS.length)})` },
                    { id: 'written' as const, en: `Written Questions (${ALL_DOTM_QUESTIONS.length - 80})`, ne: `लिखित प्रश्न (${formatNum(ALL_DOTM_QUESTIONS.length - 80)})` },
                    { id: 'signs' as const, en: 'Traffic Signs (80)', ne: `ट्राफिक चिन्ह (${formatNum(80)})` }
                  ].map((tab) => {
                    const isActive = writtenFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setWrittenFilter(tab.id);
                          setSelectedCategory('all');
                        }}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '10px',
                          border: `1.5px solid ${isActive ? '#003893' : '#e2e8f0'}`,
                          backgroundColor: isActive ? '#003893' : '#ffffff',
                          color: isActive ? '#ffffff' : '#334155',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isNe ? tab.ne : tab.en}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ position: 'relative', minWidth: '220px' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('Search questions...', 'प्रश्न खोज्नुहोस्...')}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPracticeBankMode((p) => !p);
                      setBankGuesses({});
                    }}
                    style={{
                      padding: '9px 15px',
                      borderRadius: '10px',
                      border: practiceBankMode ? '1.5px solid #003893' : '1.5px solid #cbd5e1',
                      backgroundColor: practiceBankMode ? '#eff6ff' : '#f8fafc',
                      color: practiceBankMode ? '#003893' : '#334155',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {practiceBankMode
                      ? t('Show All Answers', 'उत्तर देखाउनुहोस्')
                      : t('Hide Answers (Self-Test)', 'उत्तर लुकाएर अभ्यास')}
                  </button>
                </div>
              </div>

              {/* 6 Topic Category Pills with Counts */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '22px' }}>
                {DOTM_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const topicLabel = isNe ? cat.nameNep.replace(/\s*\(.*?\)/g, '') : cat.nameEng;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (cat.id !== 'all') {
                          setWrittenFilter('all');
                        }
                      }}
                      style={{
                        padding: '6px 13px',
                        borderRadius: '9999px',
                        border: `1px solid ${isSelected ? '#003893' : '#e2e8f0'}`,
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        color: isSelected ? '#003893' : '#475569',
                        fontSize: '12.5px',
                        fontWeight: isSelected ? 800 : 600,
                        cursor: 'pointer'
                      }}
                    >
                      {topicLabel} {cat.count !== undefined ? `(${formatNum(cat.count)})` : ''}
                    </button>
                  );
                })}
              </div>

              {/* Paginated Questions Feed (20 Per Page Only) */}
              {filteredStudyQuestions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '44px 16px', color: '#64748b', fontSize: '14px' }}>
                  {t('No matching questions found. Try clearing filters or search.', 'कुनै मिल्दो प्रश्न भेटिएन।')}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {paginatedStudyQuestions.map((q, idx) => {
                    const globalIdx = (currentPage - 1) * QUESTIONS_PER_PAGE + idx + 1;
                    const options = isNe ? q.optionsNep : q.optionsEng;
                    const optLabels = isNe ? ['क', 'ख', 'ग', 'घ'] : ['A', 'B', 'C', 'D'];
                    const userGuess = bankGuesses[q.id];
                    const showAnswer = !practiceBankMode || userGuess !== undefined;

                    return (
                      <div
                        key={q.id}
                        style={{
                          padding: '18px',
                          borderRadius: '14px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#f8fafc'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px' }}>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                            {formatNum(globalIdx)}. {isNe ? q.questionNep : q.questionEng}
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {isNe ? q.categoryLabelNep : q.categoryLabelEng}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '8px', margin: '10px 0' }}>
                          {options.map((opt, oIdx) => {
                            const isRight = oIdx === q.correctIndex;
                            const isWrongGuess = practiceBankMode && userGuess === oIdx && !isRight;
                            return (
                              <div
                                key={oIdx}
                                onClick={() => {
                                  if (practiceBankMode) {
                                    setBankGuesses((prev) => ({ ...prev, [q.id]: oIdx }));
                                  }
                                }}
                                style={{
                                  padding: '9px 12px',
                                  borderRadius: '9px',
                                  border: showAnswer && isRight
                                    ? '1.5px solid #10b981'
                                    : isWrongGuess
                                      ? '1.5px solid #ef4444'
                                      : '1px solid #e2e8f0',
                                  backgroundColor: showAnswer && isRight
                                    ? '#ecfdf5'
                                    : isWrongGuess
                                      ? '#fef2f2'
                                      : '#ffffff',
                                  color: showAnswer && isRight
                                    ? '#065f46'
                                    : isWrongGuess
                                      ? '#991b1b'
                                      : '#334155',
                                  fontSize: '13px',
                                  fontWeight: showAnswer && isRight ? 800 : 500,
                                  cursor: practiceBankMode ? 'pointer' : 'default',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <span>
                                  ({optLabels[oIdx]}) {opt}
                                </span>
                                {showAnswer && isRight && <Check size={15} color="#10b981" />}
                                {isWrongGuess && <XCircle size={15} color="#ef4444" />}
                              </div>
                            );
                          })}
                        </div>

                        {showAnswer && (
                          <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
                            <strong style={{ color: '#003893' }}>{t('Explanation:', 'व्याख्या:')} </strong>
                            {isNe ? q.explanationNep : q.explanationEng}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Bar (20 Questions Per Page Only) */}
              {filteredStudyQuestions.length > 0 && (
                <div
                  style={{
                    marginTop: '28px',
                    paddingTop: '20px',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                    {t('Showing', 'देखाइँदैछ')}{' '}
                    <strong>{formatNum((currentPage - 1) * QUESTIONS_PER_PAGE + 1)}</strong>–
                    <strong>{formatNum(Math.min(currentPage * QUESTIONS_PER_PAGE, filteredStudyQuestions.length))}</strong>{' '}
                    {t('of', 'मध्ये')} <strong>{formatNum(filteredStudyQuestions.length)}</strong>{' '}
                    {t('questions', 'प्रश्न')} ({t('Page', 'पृष्ठ')} {formatNum(currentPage)}/{formatNum(totalPages)})
                  </div>

                  {totalPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: currentPage === 1 ? '#cbd5e1' : '#334155',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <ChevronLeft size={15} />
                        <span>{t('Previous', 'अघिल्लो')}</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];
                          const showEllipsis = prev !== undefined && p - prev > 1;
                          return (
                            <React.Fragment key={p}>
                              {showEllipsis && (
                                <span style={{ padding: '0 6px', color: '#94a3b8', fontWeight: 700 }}>...</span>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentPage(p);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={{
                                  minWidth: '36px',
                                  height: '36px',
                                  padding: '0 10px',
                                  borderRadius: '10px',
                                  border: `1px solid ${currentPage === p ? '#003893' : '#e2e8f0'}`,
                                  backgroundColor: currentPage === p ? '#003893' : '#ffffff',
                                  color: currentPage === p ? '#ffffff' : '#334155',
                                  fontSize: '13px',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                {formatNum(p)}
                              </button>
                            </React.Fragment>
                          );
                        })}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: currentPage === totalPages ? '#cbd5e1' : '#334155',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{t('Next', 'अर्को')}</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: TRAFFIC SIGNS GALLERY                                 */}
        {/* ============================================================ */}
        {activeTab === 'traffic-signs' && <TrafficSignsGallery />}

        {/* ============================================================ */}
        {/* TAB 5: ISHIHARA EYE / COLOR VISION TEST                      */}
        {/* ============================================================ */}
        {activeTab === 'eye-test' && <IshiharaEyeTest />}

        {/* ============================================================ */}
        {/* TAB 6: 70-POINT PRACTICAL TRIAL SIMULATOR & RESULT CHECKER   */}
        {/* ============================================================ */}
        {activeTab === 'trial-rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* 70-Point Practical Trial Interactive Calculator */}
            <div
              className="white-card"
              style={{
                padding: '28px 24px',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '22px', paddingBottom: '18px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {t('Practical Trial Points Calculator', 'प्रयोगात्मक ट्रायल अंक क्याल्कुलेटर')}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                    {t(
                      'Click any mistake below to see deducted points (70/100 required to pass).',
                      'ट्रायल दिँदा कुन गल्तीमा कति अंक घट्छ र ७० अंक पुग्छ कि पुग्दैन जाँच्नुहोस्।'
                    )}
                  </p>
                </div>

                {/* Live Trial Score Pill */}
                <div
                  style={{
                    padding: '12px 20px',
                    borderRadius: '14px',
                    backgroundColor: trialScore >= 70 ? '#ecfdf5' : '#fef2f2',
                    border: `2px solid ${trialScore >= 70 ? '#a7f3d0' : '#fecaca'}`,
                    textAlign: 'center',
                    minWidth: '170px'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: trialScore >= 70 ? '#047857' : '#b91c1c', textTransform: 'uppercase' }}>
                    {trialScore >= 70 ? t('TRIAL PASSED (≥70)', 'ट्रायल पास (≥७०)') : t('TRIAL FAILED (<70)', 'ट्रायल फेल (<७०)')}
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    {formatNum(trialScore)} / {formatNum(100)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {TRIAL_70_STEPS.map((step) => {
                  const isDeducted = !!failedTrialSteps[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => setFailedTrialSteps((prev) => ({ ...prev, [step.id]: !prev[step.id] }))}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: isDeducted ? '2px solid #ef4444' : '1.5px solid #e2e8f0',
                        backgroundColor: isDeducted ? '#fef2f2' : '#f8fafc',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '8px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                          {isNe ? step.titleNe : step.titleEn}
                        </div>
                        <span
                          style={{
                            padding: '3px 9px',
                            borderRadius: '9999px',
                            backgroundColor: isDeducted ? '#fee2e2' : '#dcfce7',
                            color: isDeducted ? '#dc2626' : '#15803d',
                            fontSize: '12px',
                            fontWeight: 900,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {isDeducted ? `-${formatNum(step.maxPoints)}` : `+${formatNum(step.maxPoints)}`} {t('pts', 'अंक')}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.45 }}>
                        {isNe ? step.descNe : step.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embedded Official Likhit & Smart Card Result Checker */}
            <LikhitResultChecker />
          </div>
        )}
      </div>
      );
}
