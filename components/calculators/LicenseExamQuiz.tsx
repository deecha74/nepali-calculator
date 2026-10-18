'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Filter,
  Flame,
  Volume2,
  ArrowRight,
  Sparkles,
  Search,
  Printer,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_DOTM_QUESTIONS, DOTM_CATEGORIES, getRandomExamQuestions, Question } from '@/lib/licenseQuestions';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';

export function LicenseExamQuiz() {
  const { language, t } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'car'>('bike');
  
  // Exam States: 'idle' (normal page) | 'taking' (active exam) | 'submitted' (result review) | 'study' (question bank)
  const [examState, setExamState] = useState<'idle' | 'taking' | 'submitted' | 'study'>('idle');
  
  // Session State
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(30 * 60); // 30 minutes
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && examState === 'taking' && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, examState, secondsLeft]);

  // Start new random exam session
  const handleStartExam = (category: string = 'all') => {
    const randomBatch = getRandomExamQuestions(20, category);
    setExamQuestions(randomBatch);
    setUserAnswers({});
    setSecondsLeft(30 * 60); // 30 minutes
    setIsTimerActive(true);
    setExamState('taking');
    setCurrentIdx(0);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (examState !== 'taking') return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitExam = () => {
    setIsTimerActive(false);
    setExamState('submitted');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    handleStartExam(selectedCategory);
  };

  const handleBackToOverview = () => {
    setIsTimerActive(false);
    setExamState('idle');
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  // Score Calculation
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = examQuestions.length;

  const correctCount = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
      const q = examQuestions.find(item => item.id === Number(qId));
      return q && q.correctIndex === ansIdx ? acc + 1 : acc;
    }, 0);
  }, [userAnswers, examQuestions]);

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassed = correctCount >= 10; // DOTM 50% pass mark (10 out of 20)
  const timeTakenSecs = 1800 - secondsLeft;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter questions for study mode
  const filteredStudyQuestions = useMemo(() => {
    let list = ALL_DOTM_QUESTIONS;
    if (selectedCategory !== 'all') {
      list = list.filter(q => q.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.questionNep.toLowerCase().includes(q) || 
        item.questionEng.toLowerCase().includes(q) ||
        item.explanationNep.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '10px 0 60px' }}>
      
      {/* ============================================================ */}
      {/* 1. NORMAL INTRO PAGE (Default Initial State)                 */}
      {/* ============================================================ */}
      {examState === 'idle' && (
        <div 
          className="white-card"
          style={{ 
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Header Badge & Title */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-blue" style={{ fontSize: '12px', padding: '4px 12px' }}>
                यातायात व्यवस्था विभाग (DOTM) आधिकारिक पाठ्यक्रम
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '12px', padding: '4px 12px' }}>
                ५०% उत्तीर्णाङ्क (Pass Marks: 10/20)
              </span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
              सवारी चालक अनुमतिपत्र अनलाइन लिखित परीक्षा (DOTM Mock Exam)
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              नेपाल यातायात व्यवस्था विभागको आधिकारिक ५०० प्रश्न संग्रहमा आधारित अनलाइन नमुना परीक्षा। परीक्षा सुरु गर्दा २० वटा प्रश्नहरू अनियमित रूपमा चयन गरिनेछ।
            </p>
          </div>

          {/* Vehicle Category Selection Bar */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '10px', 
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedVehicle('bike')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: selectedVehicle === 'bike' ? '#003893' : '#e2e8f0',
                backgroundColor: selectedVehicle === 'bike' ? '#eff6ff' : '#ffffff',
                color: selectedVehicle === 'bike' ? '#003893' : '#475569',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '13px',
                transition: 'all 0.15s ease'
              }}
              className="hover-lift"
            >
              <Bike size={18} color={selectedVehicle === 'bike' ? '#003893' : '#64748b'} />
              <span>वर्ग 'क'/'ट' (बाइक / स्कुटर)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedVehicle('car')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: selectedVehicle === 'car' ? '#003893' : '#e2e8f0',
                backgroundColor: selectedVehicle === 'car' ? '#eff6ff' : '#ffffff',
                color: selectedVehicle === 'car' ? '#003893' : '#475569',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '13px',
                transition: 'all 0.15s ease'
              }}
              className="hover-lift"
            >
              <Car size={18} color={selectedVehicle === 'car' ? '#003893' : '#64748b'} />
              <span>वर्ग 'ख' (कार / भ्यान)</span>
            </button>
          </div>

          {/* 4 Feature Cards */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px', 
              marginBottom: '36px' 
            }}
          >
            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#003893', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Clock size={22} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>३० मिनेट</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>समय सीमा (Time Limit)</div>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Shuffle size={22} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>२० प्रश्नहरू</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>अनियमित प्रश्न बैंक (Random)</div>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Award size={22} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>१० / २० अङ्क</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>उत्तीर्णाङ्क (५०% Pass Mark)</div>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <BookOpen size={22} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>५००+ प्रश्नहरू</div>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>सम्पूर्ण आधिकारिक पाठ्यक्रम</div>
            </div>
          </div>

          {/* Syllabus Topics Pill Row */}
          <div style={{ marginBottom: '36px', padding: '16px 20px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              परीक्षा पाठ्यक्रमका ६ मुख्य विषयहरू:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {DOTM_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <span
                  key={c.id}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    fontSize: '12.5px',
                    color: '#334155',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{c.icon}</span>
                  <span>{c.nameNep}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleStartExam('all')}
              style={{
                padding: '12px 22px',
                borderRadius: '12px',
                backgroundColor: '#003893',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0, 56, 147, 0.25)',
                transition: 'all 0.15s ease'
              }}
              className="hover-lift"
            >
              <span>परीक्षा सुरु गर्नुहोस् (Start Exam)</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => setExamState('study')}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
              className="hover-lift"
            >
              <BookOpen size={16} color="#003893" />
              <span>प्रश्न बैंक अध्ययन (Study Mode)</span>
            </button>
          </div>
        </div>
      )}


      {/* ============================================================ */}
      {/* 2. TAKING EXAM STATE (Live 20 Random Questions Test)          */}
      {/* ============================================================ */}
      {examState === 'taking' && (
        <div 
          className="white-card"
          style={{ 
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Sticky Countdown Header */}
          <div
            style={{
              position: 'sticky',
              top: '76px',
              zIndex: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '14px 18px',
              borderRadius: '16px',
              border: '1.5px solid #e2e8f0',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
            }}
          >
            {/* Left: Progress info */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>
                लिखित परीक्षा सत्र (२० वटा नयाँ प्रश्नहरू)
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                हल गरिएको: <strong style={{ color: '#003893' }}>{toNepaliDigits(answeredCount)}</strong> / {toNepaliDigits(totalQuestions)} प्रश्न
              </div>
            </div>

            {/* Right: Timer & Exit Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: secondsLeft <= 300 ? '#fef2f2' : '#f1f5f9',
                  border: `1.5px solid ${secondsLeft <= 300 ? '#fca5a5' : '#cbd5e1'}`,
                  color: secondsLeft <= 300 ? '#dc2626' : '#0f172a',
                  fontWeight: 900,
                  fontSize: '15px'
                }}
              >
                <Clock size={16} />
                <span>{formatTime(secondsLeft)}</span>
              </div>

              <button
                type="button"
                onClick={handleBackToOverview}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#64748b',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                रद्द गर्नुहोस्
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
            {examQuestions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {/* Question Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: isAnswered ? '#10b981' : '#f1f5f9',
                          color: isAnswered ? '#ffffff' : '#0f172a',
                          fontWeight: 900,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {toNepaliDigits(qIndex + 1)}
                      </span>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', lineHeight: 1.4 }}>
                          {q.questionNep}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                          {q.questionEng}
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', backgroundColor: '#f8fafc', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      {q.categoryLabelNep}
                    </span>
                  </div>

                  {/* Sign Symbol if any */}
                  {q.signSymbol && (
                    <div style={{ margin: '8px 0 14px 42px', fontSize: '32px' }}>
                      {q.signSymbol}
                    </div>
                  )}

                  {/* Options List: SELECTED OPTION IS GREEN */}
                  <div className="license-options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    {q.optionsNep.map((optNep, optIdx) => {
                      const isSelected = selectedOpt === optIdx;

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.12s ease',
                            border: isSelected ? '2px solid #10b981' : '1.5px solid #e2e8f0',
                            backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                            color: isSelected ? '#065f46' : '#1e293b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                          }}
                          className="hover-lift"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                border: isSelected ? '2px solid #10b981' : '1.5px solid #cbd5e1',
                                backgroundColor: isSelected ? '#10b981' : '#ffffff',
                                color: isSelected ? '#ffffff' : '#64748b',
                                fontSize: '11.5px',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              {['क', 'ख', 'ग', 'घ'][optIdx]}
                            </span>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: isSelected ? 800 : 600 }}>
                                {optNep}
                              </div>
                              <div style={{ fontSize: '11px', color: isSelected ? '#047857' : '#94a3b8' }}>
                                {q.optionsEng[optIdx]}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <CheckCircle2 size={18} color="#10b981" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Submit Bar */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                तपाईंले {toNepaliDigits(answeredCount)} / {toNepaliDigits(totalQuestions)} प्रश्नहरू पूरा गर्नुभएको छ।
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                कृपया बुझाउनु अघि सबै प्रश्नहरूको समीक्षा गर्नुहोस्।
              </div>
            </div>

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
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }}
              className="hover-lift"
            >
              <Check size={18} />
              <span>परीक्षा बुझाउनुहोस् (Submit Exam)</span>
            </button>
          </div>
        </div>
      )}


      {/* ============================================================ */}
      {/* 3. SUBMITTED STATE: SCORE + RIGHT ANSWERS IF WRONG            */}
      {/* ============================================================ */}
      {examState === 'submitted' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Hero Score Card */}
          <div
            className="result-card-highlight"
            style={{
              backgroundColor: isPassed ? '#ecfdf5' : '#fef2f2',
              border: `2px solid ${isPassed ? '#a7f3d0' : '#fecaca'}`,
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
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
                margin: '0 auto 16px',
                boxShadow: `0 8px 20px ${isPassed ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`
              }}
            >
              {isPassed ? <Award size={32} /> : <AlertCircle size={32} />}
            </div>

            <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: isPassed ? '#047857' : '#b91c1c' }}>
              {isPassed ? 'बधाई छ! तपाईं लिखित परीक्षामा सफल हुनुभयो' : 'दुःखको कुरा! तपाईं सफल हुन सक्नुभएन'}
            </div>

            <h2 style={{ fontSize: '36px', fontWeight: 900, color: isPassed ? '#065f46' : '#991b1b', margin: '6px 0 12px' }}>
              {toNepaliDigits(correctCount)} / {toNepaliDigits(totalQuestions)} ({toNepaliDigits(scorePercentage)}%)
            </h2>

            <p style={{ fontSize: '14px', color: isPassed ? '#047857' : '#b91c1c', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              {isPassed 
                ? 'तपाईंले ५०% उत्तीर्णाङ्क पार गर्नुभयो। तलका प्रत्येक प्रश्नको सही उत्तर र आधिकारिक व्याख्या हेर्न सक्नुहुन्छ।' 
                : 'उत्तीर्ण हुन कम्तीमा १० वटा (५०%) प्रश्न मिलाउनुपर्नेछ। तल दिएका गल्तीहरू हेरी पुनः अभ्यास गर्नुहोस्।'}
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleRetakeExam}
                style={{
                  padding: '12px 28px',
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
                className="hover-lift"
              >
                <RotateCcw size={16} />
                <span>अर्को नयाँ प्रश्न सेट दिनुहोस् (Retake Random 20)</span>
              </button>

              <button
                type="button"
                onClick={handleBackToOverview}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                className="hover-lift"
              >
                सुरुवातमा फर्कनुहोस्
              </button>
            </div>
          </div>

          {/* DETAILED QUESTION REVIEW (Gives right answer if wrong!) */}
          <div
            className="white-card"
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  सम्पूर्ण २० प्रश्नहरूको विस्तृत नतिजा समीक्षा
                </h3>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                  गलत भएका प्रश्नहरूमा रातो संकेत र आधिकारिक सही उत्तर हरियो रङमा दर्शाइएको छ।
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 700 }}>
                <span style={{ color: '#16a34a' }}>✓ मिलाएको: {toNepaliDigits(correctCount)}</span>
                <span style={{ color: '#dc2626' }}>✗ बिगारेको: {toNepaliDigits(totalQuestions - correctCount)}</span>
              </div>
            </div>

            {/* Questions Review Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {examQuestions.map((q, qIndex) => {
                const userSelected = userAnswers[q.id];
                const isCorrect = userSelected === q.correctIndex;
                const isSkipped = userSelected === undefined;

                return (
                  <div
                    key={q.id}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: `1.5px solid ${isCorrect ? '#bbf7d0' : (isSkipped ? '#fed7aa' : '#fecaca')}`,
                      backgroundColor: isCorrect ? '#fafffd' : (isSkipped ? '#fffbf7' : '#fffbfa'),
                    }}
                  >
                    {/* Status Strip Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: isCorrect ? '#dcfce7' : (isSkipped ? '#ffedd5' : '#fee2e2'),
                          color: isCorrect ? '#166534' : (isSkipped ? '#9a3412' : '#991b1b'),
                        }}
                      >
                        {isCorrect ? '✅ सही उत्तर (+१ अङ्क)' : (isSkipped ? '⚠️ अनुत्तरित प्रश्न' : '❌ गलत उत्तर')}
                      </span>

                      <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
                        {q.categoryLabelNep}
                      </span>
                    </div>

                    {/* Question text */}
                    <div style={{ fontSize: '15.5px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>
                      {toNepaliDigits(qIndex + 1)}. {q.questionNep}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '14px' }}>
                      {q.questionEng}
                    </div>

                    {/* Sign symbol if any */}
                    {q.signSymbol && (
                      <div style={{ margin: '0 0 14px', fontSize: '28px' }}>
                        {q.signSymbol}
                      </div>
                    )}

                    {/* Options Review: Show Right Answer in Green, Wrong User Pick in Red */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px', marginBottom: '14px' }}>
                      {q.optionsNep.map((optNep, optIdx) => {
                        const isThisTheCorrectAnswer = optIdx === q.correctIndex;
                        const isThisTheUserWrongChoice = !isCorrect && userSelected === optIdx;

                        let optBorder = '1.5px solid #e2e8f0';
                        let optBg = '#ffffff';
                        let optColor = '#475569';
                        let badgeText = '';

                        if (isThisTheCorrectAnswer) {
                          // The TRUE RIGHT ANSWER (Always highlighted in bright green!)
                          optBorder = '2px solid #10b981';
                          optBg = '#ecfdf5';
                          optColor = '#065f46';
                          badgeText = '✓ सही उत्तर (Correct)';
                        } else if (isThisTheUserWrongChoice) {
                          // The User's Incorrect Pick (Highlighted in RED!)
                          optBorder = '2px solid #ef4444';
                          optBg = '#fef2f2';
                          optColor = '#991b1b';
                          badgeText = '✗ तपाईंको गलत उत्तर';
                        }

                        return (
                          <div
                            key={optIdx}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: optBorder,
                              backgroundColor: optBg,
                              color: optColor,
                              fontSize: '13.5px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 800 }}>
                                {['(क)', '(ख)', '(ग)', '(घ)'][optIdx]}
                              </span>
                              <span>{optNep}</span>
                            </div>

                            {badgeText && (
                              <span style={{ fontSize: '10.5px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                {badgeText}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Official DOTM Explanation Box */}
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                        color: '#334155',
                        lineHeight: 1.5
                      }}
                    >
                      <strong style={{ color: '#003893' }}>💡 आधिकारिक व्याख्या (Explanation): </strong>
                      {q.explanationNep} ({q.explanationEng})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}


      {/* ============================================================ */}
      {/* 4. STUDY QUESTION BANK MODE (Browse all questions)           */}
      {/* ============================================================ */}
      {examState === 'study' && (
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '24px', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            padding: '28px 24px'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '18px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                सम्पूर्ण DOTM प्रश्न बैंक अध्ययन (Study Mode)
              </h2>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                यातायात व्यवस्था विभागको सम्पूर्ण प्रश्नहरू र सही उत्तरहरू।
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleStartExam('all')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#003893',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
                className="hover-lift"
              >
                नमुना परीक्षा दिनुहोस् 🚀
              </button>

              <button
                type="button"
                onClick={handleBackToOverview}
                style={{
                  padding: '9px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                फर्कनुहोस्
              </button>
            </div>
          </div>

          {/* Category Filter Pills & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {DOTM_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: selectedCategory === cat.id ? '#003893' : '#e2e8f0',
                    backgroundColor: selectedCategory === cat.id ? '#003893' : '#ffffff',
                    color: selectedCategory === cat.id ? '#ffffff' : '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cat.nameNep}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="प्रश्न खोज्नुहोस्..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 32px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* List of Study Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredStudyQuestions.map((q, idx) => (
              <div
                key={q.id}
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                    {toNepaliDigits(idx + 1)}. {q.questionNep}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{q.categoryLabelNep}</span>
                </div>

                {q.signSymbol && (
                  <div style={{ fontSize: '28px', margin: '4px 0 10px' }}>{q.signSymbol}</div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', margin: '10px 0' }}>
                  {q.optionsNep.map((opt, oIdx) => {
                    const isRight = oIdx === q.correctIndex;
                    return (
                      <div
                        key={oIdx}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: isRight ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                          backgroundColor: isRight ? '#ecfdf5' : '#ffffff',
                          color: isRight ? '#065f46' : '#334155',
                          fontSize: '13px',
                          fontWeight: isRight ? 800 : 500,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{['(क)', '(ख)', '(ग)', '(घ)'][oIdx]} {opt}</span>
                        {isRight && <Check size={14} color="#10b981" />}
                      </div>
                    );
                  })}
                </div>

                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  <strong style={{ color: '#003893' }}>व्याख्या: </strong> {q.explanationNep}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
