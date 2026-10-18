'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Keyboard, RotateCcw, Award, CheckCircle2, AlertCircle, Clock, Zap, Target } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const SAMPLE_TEXTS = {
  unicode: "नेपाल एक सुन्दर तथा प्राकृतिक विविधताले भरिपूर्ण देश हो। यहाँ विश्वकै सर्वोच्च शिखर सगरमाथा तथा विभिन्न हिमशृङ्खलाहरू रहेका छन्। लोकसेवा तथा विभिन्न सरकारी सेवामा कम्प्युटर सीप अनिवार्य गरिएको छ। नियमित अभ्यासले टाइपिङ गति र शुद्धता उच्च बनाउन सकिन्छ।",
  english: "Nepal is a sovereign landlocked country located in South Asia along the Himalayan mountain range. It is renowned for Mount Everest, the highest peak on Earth, and its rich cultural heritage. Developing accurate typing skills with high words per minute is essential for administrative and computer-based examinations.",
  preeti: "g]kfn Ps ;'Gb/ / k|fs[lts ljljwtf ePsf] b]z xf] . oxfF ;+;f/s} ;jf]{Rr lzv/ ;u/dfyf /x]sf] 5 . nfls;]jf tyf laleGg k/LIffx?df sDKo'6/ 6fOlkª clgjfo{ ul/Psf] 5 ."
};

export function TypingSpeedTest() {
  const { language, t } = useLanguage();
  const [testMode, setTestMode] = useState<'unicode' | 'english' | 'preeti'>('unicode');
  const [durationSecs, setDurationSecs] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const targetText = SAMPLE_TEXTS[testMode];

  // Timer
  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsFinished(true);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
    setUserInput(val);
    if (val.length >= targetText.length) {
      setIsFinished(true);
      setIsActive(false);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setTimeLeft(durationSecs);
    setIsActive(false);
    setIsFinished(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const elapsedSecs = durationSecs - timeLeft || 1;
    const wordsTyped = userInput.trim().split(/\s+/).filter(Boolean).length;
    
    // Character by character check
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      }
    }

    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;
    const grossWpm = Math.round((wordsTyped / (elapsedSecs / 60))) || 0;
    const netWpm = Math.max(0, Math.round(grossWpm * (accuracy / 100)));

    const isLoksewaPassed = netWpm >= 25 && accuracy >= 85;

    return {
      grossWpm,
      netWpm,
      accuracy,
      correctChars,
      totalChars: userInput.length,
      isLoksewaPassed
    };
  }, [userInput, targetText, durationSecs, timeLeft]);

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">लोकसेवा तथा बैंक विशेष (Loksewa Benchmark)</span>
          <span className="badge badge-emerald">२५ WPM उत्तीर्णाङ्क (Pass Criteria)</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          नेपाली तथा अंग्रेजी टाइपिङ स्पीड टेस्ट (Loksewa Typing Speed Test WPM)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          लोकसेवा आयोग, शिक्षक सेवा तथा बैंक परीक्षार्थीहरूका लागि नेपाली युनिकोड, प्रिती तथा अंग्रेजी टाइपिङ गति (WPM) र शुद्धता नाप्ने आधिकारिक अनलाइन टुल।
        </p>

        {/* Controls: Mode & Duration */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
          {/* Mode Switch */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'unicode', name: 'नेपाली युनिकोड (Unicode)' },
              { id: 'preeti', name: 'Preeti Font (प्रिती)' },
              { id: 'english', name: 'English (अंग्रेजी)' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setTestMode(m.id as any);
                  resetTest();
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: testMode === m.id ? '#003893' : '#cbd5e1',
                  backgroundColor: testMode === m.id ? '#003893' : '#ffffff',
                  color: testMode === m.id ? '#ffffff' : '#334155',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Duration Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>समय:</span>
            {[30, 60, 120].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setDurationSecs(s);
                  setTimeLeft(s);
                  resetTest();
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: durationSecs === s ? '#003893' : '#cbd5e1',
                  backgroundColor: durationSecs === s ? '#eff6ff' : '#ffffff',
                  color: durationSecs === s ? '#003893' : '#64748b',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {s < 60 ? `${s}s` : `${s / 60} min`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Stats Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginBottom: '20px'
        }}
      >
        <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>समय बाँकी</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: timeLeft <= 10 ? '#dc2626' : '#003893', marginTop: '2px' }}>
            {timeLeft}s
          </div>
        </div>

        <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>NET SPEED</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>
            {stats.netWpm} <span style={{ fontSize: '12px', fontWeight: 600 }}>WPM</span>
          </div>
        </div>

        <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>ACCURACY</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
            {stats.accuracy}%
          </div>
        </div>

        <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>GROSS SPEED</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#64748b', marginTop: '2px' }}>
            {stats.grossWpm} <span style={{ fontSize: '12px', fontWeight: 600 }}>WPM</span>
          </div>
        </div>
      </div>

      {/* Target Text Box */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '8px',
          backgroundColor: '#f1f5f9',
          border: '1.5px solid #cbd5e1',
          fontSize: '16px',
          lineHeight: '1.7',
          color: '#334155',
          fontFamily: testMode === 'preeti' ? 'Preeti, sans-serif' : 'inherit',
          letterSpacing: '0.01em',
          marginBottom: '16px',
          userSelect: 'none'
        }}
      >
        {targetText}
      </div>

      {/* Typing Input Box */}
      <textarea
        ref={inputRef}
        rows={4}
        value={userInput}
        disabled={isFinished}
        onChange={handleInputChange}
        placeholder={isFinished ? "टाइपिङ परीक्षा समाप्त भयो। नतिजा तल हेर्नुहोस्।" : "माथिको वाक्य हेरेर यहाँ टाइपिङ सुरु गर्नुहोस् (टाइप गर्न थाल्ने बित्तिकै समय सुरु हुन्छ)..."}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '8px',
          border: '2px solid #003893',
          fontSize: '16px',
          lineHeight: '1.6',
          fontFamily: testMode === 'preeti' ? 'Preeti, sans-serif' : 'inherit',
          outline: 'none',
          backgroundColor: isFinished ? '#f8fafc' : '#ffffff',
          resize: 'none',
          boxShadow: '0 2px 8px rgba(0, 56, 147, 0.08)'
        }}
      />

      {/* Actions & Result */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={resetTest}
          style={{
            backgroundColor: '#ffffff',
            color: '#003893',
            border: '1.5px solid #003893',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={15} />
          <span>पुनः टाइपिङ सुरु (Reset Test)</span>
        </button>

        {isFinished && (
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: stats.isLoksewaPassed ? '#ecfdf5' : '#fef2f2',
              border: `1.5px solid ${stats.isLoksewaPassed ? '#10b981' : '#ef4444'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '13px',
              color: stats.isLoksewaPassed ? '#065f46' : '#991b1b'
            }}
          >
            {stats.isLoksewaPassed ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
            <span>
              {stats.isLoksewaPassed ? 'बधाई छ! लोकसेवा मानक (२५ WPM) उत्तीर्ण हुनुभयो।' : 'लोकसेवा मानक (२५ WPM) भन्दा कम। थप अभ्यास आवश्यक छ।'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
