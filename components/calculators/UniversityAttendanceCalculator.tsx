'use client';

import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Award,
  Sparkles
} from 'lucide-react';

export function UniversityAttendanceCalculator() {
  const [targetPct, setTargetPct] = useState<number>(75);
  const [totalClasses, setTotalClasses] = useState<number>(40);
  const [attendedClasses, setAttendedClasses] = useState<number>(32);
  const [semesterTotal, setSemesterTotal] = useState<number>(60);

  // Core Math
  const calculation = useMemo(() => {
    const total = Math.max(1, totalClasses);
    const attended = Math.min(total, Math.max(0, attendedClasses));
    const currentPct = Math.round((attended / total) * 1000) / 10;
    const targetDecimal = targetPct / 100;

    const isSafe = currentPct >= targetPct;

    // How many consecutive classes can safely bunk:
    // (attended) / (total + x) >= targetDecimal
    // attended >= targetDecimal * total + targetDecimal * x
    // x <= (attended - targetDecimal * total) / targetDecimal
    let maxBunk = 0;
    if (isSafe) {
      maxBunk = Math.floor((attended - targetDecimal * total) / targetDecimal);
      if (maxBunk < 0) maxBunk = 0;
    }

    // How many consecutive classes must attend:
    // (attended + y) / (total + y) >= targetDecimal
    // attended + y >= targetDecimal * total + targetDecimal * y
    // y * (1 - targetDecimal) >= targetDecimal * total - attended
    // y >= (targetDecimal * total - attended) / (1 - targetDecimal)
    let mustAttend = 0;
    if (!isSafe) {
      mustAttend = Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal));
      if (mustAttend < 0) mustAttend = 0;
    }

    // Semester projection
    const remClasses = Math.max(0, semesterTotal - total);
    const totalNeededForSemester = Math.ceil(targetDecimal * semesterTotal);
    const neededFromRemaining = Math.max(0, totalNeededForSemester - attended);
    const isMathematicallyPossible = neededFromRemaining <= remClasses;
    const maxPossiblePct = semesterTotal > 0 
      ? Math.round(((attended + remClasses) / semesterTotal) * 1000) / 10 
      : 0;

    return {
      total,
      attended,
      currentPct,
      isSafe,
      maxBunk,
      mustAttend,
      remClasses,
      totalNeededForSemester,
      neededFromRemaining,
      isMathematicallyPossible,
      maxPossiblePct,
    };
  }, [totalClasses, attendedClasses, targetPct, semesterTotal]);

  return (
    <div className="calculator-card" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div 
          style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            backgroundColor: '#dbeafe', 
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <GraduationCap size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            University 75% Attendance & Bunk Calculator (विश्वविद्यालय हाजिरी)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Tribhuvan University (TU), Kathmandu University (KU) & Pokhara University Exam Rule
          </p>
        </div>
      </div>

      {/* Target & Preset Badges */}
      <div style={{ marginBottom: '20px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            तोकिएको न्यूनतम हाजिरी मापदण्ड (Target Attendance Requirement):
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[75, 80, 85].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setTargetPct(pct)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid var(--border-subtle)',
                  background: targetPct === pct ? 'var(--primary)' : 'var(--bg-primary)',
                  color: targetPct === pct ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {pct}% {pct === 75 ? '(TU/KU/PU Standard)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            सञ्चालित कुल कक्षा (Total Classes Held):
          </label>
          <input
            type="number"
            min="1"
            max="300"
            value={totalClasses}
            onChange={(e) => setTotalClasses(Math.max(1, parseInt(e.target.value) || 0))}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>अहिलेसम्म शिक्षकले पढाएको कुल कक्षा</span>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            उपस्थित भएको कक्षा (Classes Attended):
          </label>
          <input
            type="number"
            min="0"
            max={totalClasses}
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(Math.max(0, parseInt(e.target.value) || 0))}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>तपाईंले हाजिर गरेको कक्षा संख्या</span>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            सेमेस्टरको कुल कक्षा (Total Semester Classes):
          </label>
          <input
            type="number"
            min={totalClasses}
            max="300"
            value={semesterTotal}
            onChange={(e) => setSemesterTotal(Math.max(totalClasses, parseInt(e.target.value) || 0))}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>अनुमानित कुल कक्षा (साधारणतया ६० वा ७५)</span>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      <div 
        style={{ 
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid',
          borderColor: calculation.isSafe ? '#86efac' : '#fca5a5',
          background: calculation.isSafe 
            ? 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.4))'
            : 'linear-gradient(135deg, rgba(254, 242, 242, 0.9), rgba(254, 226, 226, 0.4))',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              fontSize: '13px', 
              fontWeight: 700,
              backgroundColor: calculation.isSafe ? '#16a34a' : '#dc2626',
              color: '#fff'
            }}>
              {calculation.isSafe ? (
                <>
                  <CheckCircle2 size={16} />
                  परीक्षार्थ सुरक्षित (Safe for Exam)
                </>
              ) : (
                <>
                  <AlertTriangle size={16} />
                  NQ Alert (हाजिरी ७५% भन्दा कम)
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '12px' }}>
              <span style={{ fontSize: '42px', fontWeight: 900, color: calculation.isSafe ? '#15803d' : '#b91c1c', lineHeight: 1 }}>
                {calculation.currentPct}%
              </span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                ({calculation.attended} / {calculation.total} कक्षाहरू)
              </span>
            </div>
          </div>

          {/* THE BUNK / RECOVERY HIGHLIGHT CARD */}
          <div style={{ 
            background: '#fff', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            border: '1px solid rgba(0,0,0,0.08)',
            maxWidth: '340px'
          }}>
            {calculation.isSafe ? (
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>
                  🎯 सुरक्षित बङ्क क्याल्कुलेटर (Safe Bunk)
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
                  तपाईं {calculation.maxBunk} वटा कक्षा बङ्क (Skip) गर्न सक्नुहुन्छ!
                </div>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: '6px 0 0', lineHeight: '1.4' }}>
                  अर्को <strong>{calculation.maxBunk}</strong> कक्षा लगातार अनुपस्थित भए पनि तपाईंको हाजिरी {targetPct}% भन्दा तल झर्ने छैन।
                </p>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase' }}>
                  🚨 रिकभरी योजना (Recovery Required)
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
                  लगातार {calculation.mustAttend} कक्षा उपस्थित हुनुपर्छ!
                </div>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: '6px 0 0', lineHeight: '1.4' }}>
                  हाजिरी {targetPct}% पुर्‍याएर परीक्षा दिन अर्को <strong>{calculation.mustAttend}</strong> कक्षा एकपटक पनि नछुटाई उपस्थित हुनैपर्छ।
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Semester Projection Row */}
        {semesterTotal > totalClasses && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '13px', color: '#374151' }}>
            <strong>सेमेस्टर अन्तिम प्रक्षेपण (Semester Projection): </strong>
            बाँकी {calculation.remClasses} कक्षामध्ये तपाईंले कम्तीमा <strong>{calculation.neededFromRemaining}</strong> कक्षामा अनिवार्य हाजिर हुनुपर्दछ (सेमेस्टर अन्त्यमा कुल {calculation.totalNeededForSemester} कक्षा पुग्नुपर्नेछ)। 
            {!calculation.isMathematicallyPossible && (
              <span style={{ color: '#dc2626', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                ⚠️ चेतावनी: बाँकी सबै कक्षा उपस्थित भए पनि अधिकतम {calculation.maxPossiblePct}% मात्र पुग्छ। शिक्षक/विभाग प्रमुखसँग तुरुन्त सम्पर्क गर्नुहोस्।
              </span>
            )}
          </div>
        )}
      </div>

      {/* University Ordinances Note */}
      <div style={{ background: 'var(--bg-subtle)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BookOpen size={18} color="var(--primary)" />
          नेपालका विश्वविद्यालयहरूको हाजिरी सम्बन्धी नियम (University Guidelines):
        </h3>
        <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.7', margin: 0 }}>
          <li><strong>त्रिभुवन विश्वविद्यालय (TU - IOE, IOM, Management):</strong> परीक्षा नियमावली अनुसार प्रत्येक विषयको सैद्धान्तिक र प्रयोगात्मक कक्षामा न्यूनतम ७५% हाजिरी अनिवार्य छ। ७५% नपुगेमा प्रवेशपत्र (Admit Card) रोक्का गरी NQ (Not Qualified) गरिन्छ।</li>
          <li><strong>काठमाडौं विश्वविद्यालय (KU):</strong> ८०% सम्मको हाजिरीलाई प्राथमिकता दिइन्छ भने ७५% भन्दा कम भएमा सम्बन्धित विषयमा परीक्षा दिन पाइँदैन।</li>
          <li><strong>पोखरा विश्वविद्यालय र पूर्वाञ्चल विश्वविद्यालय:</strong> बोर्ड परीक्षाका लागि न्यूनतम ७५% हाजिरी कडाइका साथ लागू गरिएको छ।</li>
          <li><strong>चिकित्सा तथा नर्सिङ परिषद:</strong> प्रयोगात्मक (Practical / Clinical Posting) मा ८०% देखि ८५% सम्म हाजिरी अनिवार्य मानिन्छ।</li>
        </ul>
      </div>
    </div>
  );
}
