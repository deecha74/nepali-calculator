'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const SAMPLE_TEXTS = {
  english: "Nepal is a beautiful Himalayan nation known for Mount Everest and rich cultural heritage. Practicing regular typing with high accuracy helps you succeed in Loksewa, banking, and administrative exams.",
  unicode: "नेपाल एक सुन्दर तथा प्राकृतिक विविधताले भरिपूर्ण देश हो। यहाँ विश्वकै सर्वोच्च शिखर सगरमाथा रहेको छ। नियमित अभ्यासले लोकसेवा तथा सरकारी सेवामा टाइपिङ गति र शुद्धता उच्च बनाउन सकिन्छ।",
  preeti: "g]kfn Ps ;'Gb/ / k|fs[lts ljljwtf ePsf] b]z xf] . oxfF ;+;f/s} ;jf]{Rr lzv/ ;u/dfyf /x]sf] 5 .lgoldt cEof;n] 6fOlkª ult / z'4tf pRr agfpg ;lsG5 ."
};

export function TypingSpeedTest() {
  const { language, t } = useLanguage();
  const [testMode, setTestMode] = useState<'english' | 'unicode' | 'preeti'>('english');
  const [durationSecs, setDurationSecs] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const promptBoxRef = useRef<HTMLDivElement>(null);

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

  // Keep current character scrolled into view inside the compact prompt box
  useEffect(() => {
    if (activeCharRef.current && promptBoxRef.current) {
      const container = promptBoxRef.current;
      const charEl = activeCharRef.current;
      const offsetTop = charEl.offsetTop - container.offsetTop;
      if (offsetTop > container.clientHeight - 44 || offsetTop < container.scrollTop) {
        container.scrollTop = Math.max(0, offsetTop - 28);
      }
    }
  }, [userInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!isActive && !isFinished && val.length > 0) {
      setIsActive(true);
    }
    setUserInput(val);
    if (val.length >= targetText.length) {
      setIsFinished(true);
      setIsActive(false);
    }
  };

  const resetTest = (focusInput = false) => {
    setUserInput('');
    setTimeLeft(durationSecs);
    setIsActive(false);
    setIsFinished(false);
    if (promptBoxRef.current) {
      promptBoxRef.current.scrollTop = 0;
    }
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const elapsedSecs = durationSecs - timeLeft || 1;
    const wordsTyped = userInput.trim().split(/\s+/).filter(Boolean).length;

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      }
    }

    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;
    const grossWpm = userInput.length > 0 ? Math.round((wordsTyped / (elapsedSecs / 60))) || 0 : 0;
    const netWpm = Math.max(0, Math.round(grossWpm * (accuracy / 100)));
    const minPassWpm = testMode === 'english' ? 30 : 25;
    const isLoksewaPassed = netWpm >= minPassWpm && accuracy >= 85;

    return {
      grossWpm,
      netWpm,
      accuracy,
      correctChars,
      totalChars: userInput.length,
      minPassWpm,
      isLoksewaPassed
    };
  }, [userInput, targetText, durationSecs, timeLeft, testMode]);

  return (
    <div className="white-card" style={{ padding: 'clamp(14px, 3vw, 26px)', maxWidth: '860px', margin: '0 auto' }}>
      {/* Clean Single-Line Header + Controls */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            {t('Typing Speed Test (WPM)', 'टाइपिङ स्पीड टेस्ट (WPM)')}
          </h1>

          {/* Duration Pills + Quick Reset */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[30, 60, 120].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setDurationSecs(s);
                  setTimeLeft(s);
                  setUserInput('');
                  setIsActive(false);
                  setIsFinished(false);
                }}
                style={{
                  padding: '4px 9px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: durationSecs === s ? '#003893' : '#cbd5e1',
                  backgroundColor: durationSecs === s ? '#eff6ff' : '#ffffff',
                  color: durationSecs === s ? '#003893' : '#64748b',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {s < 60 ? `${s}s` : `${s / 60}m`}
              </button>
            ))}
            <button
              type="button"
              onClick={() => resetTest(true)}
              title={t('Reset Test', 'पुनः सुरु')}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#334155',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Single-Row Language Mode Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '10px' }}>
          {[
            { id: 'english', label: 'English' },
            { id: 'unicode', label: t('Nepali Unicode', 'नेपाली युनिकोड') },
            { id: 'preeti', label: t('Preeti Font', 'प्रिती फन्ट') }
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setTestMode(m.id as any);
                setUserInput('');
                setTimeLeft(durationSecs);
                setIsActive(false);
                setIsFinished(false);
              }}
              style={{
                padding: '7px 8px',
                borderRadius: '7px',
                border: '1.5px solid',
                borderColor: testMode === m.id ? '#003893' : '#e2e8f0',
                backgroundColor: testMode === m.id ? '#003893' : '#f8fafc',
                color: testMode === m.id ? '#ffffff' : '#334155',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Single-Row 3-Stat Bar (Takes only 48px vertical height on mobile!) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '12px'
        }}
      >
        <div style={{ padding: '7px 10px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>{t('Time', 'समय')}</span>
          <span style={{ fontSize: '16px', fontWeight: 900, color: timeLeft <= 10 ? '#dc2626' : '#003893' }}>{timeLeft}s</span>
        </div>

        <div style={{ padding: '7px 10px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>WPM</span>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#16a34a' }}>{stats.netWpm}</span>
        </div>

        <div style={{ padding: '7px 10px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>{t('Acc', 'शुद्धता')}</span>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{stats.accuracy}%</span>
        </div>
      </div>

      {/* Auto-Scrolling Live Highlighted Prompt Box (Max 3 lines visible so mobile never feels crowded) */}
      <div
        ref={promptBoxRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          backgroundColor: '#f8fafc',
          border: '1.5px solid #cbd5e1',
          fontSize: '15.5px',
          lineHeight: '1.65',
          color: '#64748b',
          fontFamily: testMode === 'preeti' ? 'Preeti, sans-serif' : 'inherit',
          marginBottom: '10px',
          maxHeight: '112px',
          overflowY: 'auto',
          userSelect: 'none',
          cursor: 'text',
          position: 'relative'
        }}
      >
        {targetText.split('').map((char, idx) => {
          let color = '#64748b';
          let bg = 'transparent';
          const isCurrent = idx === userInput.length;
          if (idx < userInput.length) {
            if (userInput[idx] === char) {
              color = '#15803d';
            } else {
              color = '#dc2626';
              bg = '#fee2e2';
            }
          } else if (isCurrent) {
            color = '#0f172a';
            bg = '#dbeafe';
          }
          return (
            <span
              key={idx}
              ref={isCurrent ? activeCharRef : undefined}
              style={{
                color,
                backgroundColor: bg,
                borderRadius: '2px',
                fontWeight: isCurrent ? 800 : idx < userInput.length ? 600 : 400,
                borderBottom: isCurrent ? '2px solid #003893' : 'none'
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Compact Typing Input Box */}
      <textarea
        ref={inputRef}
        rows={3}
        value={userInput}
        disabled={isFinished}
        onChange={handleInputChange}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={
          isFinished
            ? t('Test complete! See your score below.', 'परीक्षा समाप्त भयो!')
            : t('Tap here and start typing...', 'यहाँ टाइप गर्न सुरु गर्नुहोस्...')
        }
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: '8px',
          border: '2px solid #003893',
          fontSize: '15.5px',
          lineHeight: '1.5',
          fontFamily: testMode === 'preeti' ? 'Preeti, sans-serif' : 'inherit',
          outline: 'none',
          backgroundColor: isFinished ? '#f8fafc' : '#ffffff',
          resize: 'none',
          boxShadow: '0 2px 6px rgba(0, 56, 147, 0.06)'
        }}
      />

      {/* Result Banner (Only shown when finished or actively typing) */}
      {isFinished && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: stats.isLoksewaPassed ? '#ecfdf5' : '#fef2f2',
            border: `1.5px solid ${stats.isLoksewaPassed ? '#10b981' : '#ef4444'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontWeight: 700,
            fontSize: '13px',
            color: stats.isLoksewaPassed ? '#065f46' : '#991b1b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {stats.isLoksewaPassed ? <CheckCircle2 size={17} color="#10b981" /> : <AlertCircle size={17} color="#ef4444" />}
            <span>
              {stats.isLoksewaPassed
                ? t(`Passed! (${stats.netWpm} WPM, ${stats.accuracy}% Accuracy)`, `उत्तीर्ण! (${stats.netWpm} WPM, ${stats.accuracy}% शुद्धता)`)
                : t(`Score: ${stats.netWpm} WPM (${stats.minPassWpm} WPM needed for Loksewa)`, `नतिजा: ${stats.netWpm} WPM (${stats.minPassWpm} WPM आवश्यक)`)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => resetTest(true)}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              backgroundColor: '#003893',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {t('Try Again', 'फेरि प्रयास गर्नुहोस्')}
          </button>
        </div>
      )}
    </div>
  );
}
