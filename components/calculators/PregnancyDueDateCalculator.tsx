'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Heart, Calendar, Sparkles, Copy, Check, Baby, ShieldCheck } from 'lucide-react';
import { convertAdToBsApprox } from '@/lib/nepaliDate';

export function PregnancyDueDateCalculator() {
  const { t } = useLanguage();
  const [lmpDateAd, setLmpDateAd] = useState<string>('2026-04-15');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const parsedLmp = new Date(lmpDateAd);
    const lmp = isNaN(parsedLmp.getTime()) ? new Date() : parsedLmp;

    // Naegele's Rule: +280 days adjusted for cycle length deviation from 28 days
    const cycleAdjustmentDays = cycleLength - 28;
    const totalPregnancyDays = 280 + cycleAdjustmentDays;

    const dueDate = new Date(lmp.getTime() + totalPregnancyDays * 24 * 60 * 60 * 1000);
    const conceptionDate = new Date(lmp.getTime() + (14 + cycleAdjustmentDays) * 24 * 60 * 60 * 1000);

    const today = new Date();
    const elapsedMs = Math.max(0, today.getTime() - lmp.getTime());
    const elapsedDays = Math.min(totalPregnancyDays, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
    const currentWeeks = Math.floor(elapsedDays / 7);
    const currentExtraDays = elapsedDays % 7;
    const remainingDays = Math.max(0, totalPregnancyDays - elapsedDays);
    const progressPercent = Math.min(100, Math.round((elapsedDays / totalPregnancyDays) * 100));

    let trimester = '1st Trimester (पहिलो त्रैमासिक — Weeks 1–12)';
    if (currentWeeks >= 27) trimester = '3rd Trimester (तेस्रो त्रैमासिक — Weeks 27–40)';
    else if (currentWeeks >= 13) trimester = '2nd Trimester (दोस्रो त्रैमासिक — Weeks 13–26)';

    const dueBs = convertAdToBsApprox(dueDate);
    const lmpBs = convertAdToBsApprox(lmp);

    const dueBsFormatted = `${dueBs.formatted} BS`;
    const lmpBsFormatted = `${lmpBs.formatted} BS`;

    return {
      dueDateAdStr: dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionDateAdStr: conceptionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      dueBsFormatted,
      lmpBsFormatted,
      currentWeeks,
      currentExtraDays,
      remainingDays,
      progressPercent,
      trimester,
    };
  }, [lmpDateAd, cycleLength]);

  const handleCopy = () => {
    const text = `Nepali Pregnancy Due Date Summary (BS & AD):
LMP Date: ${lmpDateAd} (${calculation.lmpBsFormatted})
Estimated Due Date (BS): ${calculation.dueBsFormatted}
Estimated Due Date (AD): ${calculation.dueDateAdStr}
Current Gestation: ${calculation.currentWeeks} Weeks, ${calculation.currentExtraDays} Days (${calculation.trimester})
Calculated on NepalCalc.com/pregnancy-due-date`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#fce7f3',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Heart size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-blue">Bikram Sambat (BS) & AD</span>
              <span className="badge badge-neutral">आमा सुरक्षा तथा प्रसूति मिति</span>
            </div>
            <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, margin: '6px 0 0', color: 'var(--text-primary)' }}>
              {t('Pregnancy Due Date Calculator', 'प्रसूति मिति क्याल्कुलेटर')}
            </h1>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Due Date'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Left: Inputs */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lmp-date" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              First Day of Last Menstrual Period — LMP (अन्तिम महिनावारीको पहिलो दिन):
            </label>
            <input
              id="lmp-date"
              type="date"
              value={lmpDateAd}
              onChange={(e) => setLmpDateAd(e.target.value)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '15px', fontWeight: 700 }}
            />
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
              Nepali BS Equivalent: <strong>{calculation.lmpBsFormatted}</strong>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="cycle-len" className="input-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13.5px' }}>
              Average Menstrual Cycle Length (महिनावारी चक्र — सामान्यतया २८ दिन):
            </label>
            <input
              id="cycle-len"
              type="number"
              min={21}
              max={40}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value) || 28)}
              className="text-input"
              style={{ width: '100%', padding: '10px 12px', fontSize: '15px', fontWeight: 700 }}
            />
          </div>

          {/* Nepal Aama Surakshya Programme Box */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#fdf2f8',
              border: '1px solid #fbcfe8',
              fontSize: '12.5px',
              color: '#831843',
              lineHeight: 1.55,
            }}
          >
            <strong>🇳🇵 Nepal Government Aama Surakshya Benefit:</strong> Completing the mandatory 4/8 protocol ANC checkups (Months 4, 6, 8, and 9) and delivering at a listed government health facility entitles mothers to free institutional delivery plus <strong>NPR 1,800 to NPR 3,800</strong> transport & ANC cash incentive (Mountain/Hill/Terai).
          </div>
        </div>

        {/* Right: BS + AD Due Date Result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #831843 0%, #be185d 100%)',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fbcfe8', fontWeight: 700 }}>
              Estimated Baby Delivery Due Date (अनुमानित प्रसूति मिति)
            </div>
            <div style={{ fontSize: 'clamp(24px, 3.8vw, 32px)', fontWeight: 900, color: '#fde047', marginTop: '6px' }}>
              {calculation.dueBsFormatted}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
              English Calendar (AD): {calculation.dueDateAdStr}
            </div>
          </div>

          {/* Progress & Trimester Card */}
          <div style={{ padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13.5px', fontWeight: 800 }}>
              <span>
                Current Stage: {calculation.currentWeeks} Weeks, {calculation.currentExtraDays} Days
              </span>
              <span style={{ color: '#db2777' }}>{calculation.progressPercent}% Complete</span>
            </div>

            <div style={{ width: '100%', height: '10px', backgroundColor: '#fce7f3', borderRadius: '9999px', overflow: 'hidden', marginBottom: '12px' }}>
              <div
                style={{
                  width: `${calculation.progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#db2777',
                  borderRadius: '9999px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Current Trimester:</span>
                <strong>{calculation.trimester}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Conception Date:</span>
                <strong>{calculation.conceptionDateAdStr}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Days Remaining to Due Date:</span>
                <strong>{calculation.remainingDays} Days</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
