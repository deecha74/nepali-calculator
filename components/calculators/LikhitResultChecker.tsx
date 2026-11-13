'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink, 
  Calculator, 
  BookOpen, 
  Calendar, 
  Award, 
  AlertTriangle,
  Send,
  Building2,
  FileText
} from 'lucide-react';
import { PROGRAMMATIC_LIKHIT_SCENARIOS, LikhitOfficeInfo } from '@/lib/rates/programmaticLikhit';

interface LikhitResultCheckerProps {
  initialOfficeSlug?: string;
}

export function LikhitResultChecker({ initialOfficeSlug }: LikhitResultCheckerProps) {
  const { t } = useLanguage();
  const [applicantId, setApplicantId] = useState<string>('');
  const [smsService, setSmsService] = useState<'33001' | '31003'>('33001');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedOfficeSlug, setSelectedOfficeSlug] = useState<string>(initialOfficeSlug || 'likhit-result-ekantakuna-lalitpur');
  
  // Score Simulator State
  const [vehicleCategory, setVehicleCategory] = useState<'bike' | 'car'>('bike');
  const [correctCount, setCorrectCount] = useState<number>(14);

  // Active Tab: 'sms_check' | 'score_calc' | 'offices' | 'retrial_rules'
  const [activeTab, setActiveTab] = useState<'sms_check' | 'score_calc' | 'offices' | 'retrial_rules'>('sms_check');

  const selectedOffice: LikhitOfficeInfo = useMemo(() => {
    return (
      PROGRAMMATIC_LIKHIT_SCENARIOS.find((item) => item.slug === selectedOfficeSlug) ||
      PROGRAMMATIC_LIKHIT_SCENARIOS[0]
    );
  }, [selectedOfficeSlug]);

  // SMS Body Calculation
  const smsBody = useMemo(() => {
    const cleanId = applicantId.trim();
    if (smsService === '33001') {
      return `WT ${cleanId || '12345678'}`;
    }
    return `DL ${cleanId || '12345678'}`;
  }, [applicantId, smsService]);

  // Direct SMS URI for Mobile
  const smsHref = useMemo(() => {
    // encode for iOS and Android SMS links
    return `sms:${smsService}?body=${encodeURIComponent(smsBody)}`;
  }, [smsService, smsBody]);

  // Copy SMS
  const handleCopySms = () => {
    navigator.clipboard.writeText(smsBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Score Simulator Calculation (New DoTM 60% Passing Rule)
  const scoreResult = useMemo(() => {
    const totalQuestions = vehicleCategory === 'bike' ? 20 : 25;
    const marksPerQuestion = vehicleCategory === 'bike' ? 5 : 4;
    const boundedCorrect = Math.min(totalQuestions, Math.max(0, correctCount));
    const totalScore = boundedCorrect * marksPerQuestion;
    const isPass = totalScore >= 60;
    const minCorrectNeeded = vehicleCategory === 'bike' ? 12 : 15;

    return {
      totalQuestions,
      marksPerQuestion,
      boundedCorrect,
      totalScore,
      isPass,
      minCorrectNeeded,
      percentage: Math.round((totalScore / 100) * 100)
    };
  }, [vehicleCategory, correctCount]);

  return (
    <div className="white-card" style={{ padding: 'clamp(18px, 3.5vw, 32px)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(19px, 3vw, 23px)', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
            {t('Nepal Driving License Likhit Result Checker', 'सवारी चालक अनुमतिपत्र लिखित परीक्षा नतिजा')}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              '1-tap SMS query, office noticeboards, and 60% score simulator.',
              '१-क्लिक SMS नतिजा, कार्यालय पास नामावली र ६०% अंक क्याल्कुलेटर।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            href="/license"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BookOpen size={15} color="#003893" />
            <span>{t('Mock Exam & 500 Qs', 'नमुना परीक्षा र ५०० प्रश्न')}</span>
          </Link>
          <Link
            href="/eye-test"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Award size={15} color="#0284c7" />
            <span>{t('Eye Test (12 Plates)', 'आँखा रङ परीक्षण')}</span>
          </Link>
          <Link
            href="/traffic-signs"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={15} color="#dc2626" />
            <span>{t('Traffic Signs', 'ट्राफिक चिन्ह')}</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs with Butter-Smooth Styling */}
      <div className="segmented-control" style={{ width: '100%', display: 'flex', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('sms_check')}
          className={`segmented-btn ${activeTab === 'sms_check' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 8px', fontSize: '12.5px' }}
        >
          <MessageSquare size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          {t('Instant SMS Checker', 'SMS बाट नतिजा')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('score_calc')}
          className={`segmented-btn ${activeTab === 'score_calc' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 8px', fontSize: '12.5px' }}
        >
          <Calculator size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          {t('60% Score Simulator', '६०% अंक क्याल्कुलेटर')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('offices')}
          className={`segmented-btn ${activeTab === 'offices' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 8px', fontSize: '12.5px' }}
        >
          <Building2 size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          {t('Transport Offices', 'यातायात कार्यालयहरू')}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('retrial_rules')}
          className={`segmented-btn ${activeTab === 'retrial_rules' ? 'active' : ''}`}
          style={{ flex: 1, padding: '10px 8px', fontSize: '12.5px' }}
        >
          <Calendar size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
          {t('Trial & Retrial Guide', 'ट्रायल र रिट्रायल नियम')}
        </button>
      </div>

      {/* TAB 1: INSTANT SMS CHECKER */}
      {activeTab === 'sms_check' && (
        <div key="sms_check" className="tab-panel-smooth" style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                {t('Enter Application ID / Applicant Number', 'आवेदन नम्बर / एप्लिकेन्ट आईडी राख्नुहोस्')}
              </label>
              <input
                type="text"
                className="text-input"
                value={applicantId}
                placeholder={t('e.g., 01234567', 'उदा: ०१२३४५६७')}
                onChange={(e) => setApplicantId(e.target.value.replace(/[^0-9]/g, ''))}
                style={{ width: '100%', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
              <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                {t('Found on your biometric registration receipt / exam admission slip.', 'बायोमेट्रिक दर्ता रसिद वा परीक्षा प्रवेशपत्रमा उल्लेख हुन्छ।')}
              </span>
            </div>

            {/* SMS Provider / Number */}
            <div style={{ marginBottom: '18px' }}>
              <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                {t('Select SMS Service Gateway', 'SMS सेवा नम्बर छान्नुहोस्')}
              </label>
              <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
                <button
                  type="button"
                  className={`segmented-btn ${smsService === '33001' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px 12px' }}
                  onClick={() => setSmsService('33001')}
                >
                  33001 {t('(Primary DoTM)', '(मुख्य सरकारी सेवा)')}
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${smsService === '31003' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px 12px' }}
                  onClick={() => setSmsService('31003')}
                >
                  31003 {t('(Sparrow SMS)', '(स्प्यारो गेटवे)')}
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={smsHref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#003893',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0, 56, 147, 0.25)',
                }}
              >
                <Send size={16} />
                <span>{t('Send SMS via Mobile App', 'मोबाइलबाट सिधै SMS पठाउनुहोस्')}</span>
              </a>

              <button
                type="button"
                onClick={handleCopySms}
                className="btn-secondary"
                style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}
              >
                {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                <span>{copied ? t('SMS Text Copied!', 'कपी भयो!') : `${t('Copy SMS Text:', 'SMS कपी गर्नुहोस्:')} "${smsBody}"`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCORE SIMULATOR (60% PASSING CRITERIA) */}
      {activeTab === 'score_calc' && (
        <div key="score_calc" className="tab-panel-smooth" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div>
            {/* Vehicle Category Toggle */}
            <div style={{ marginBottom: '16px' }}>
              <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                {t('License Vehicle Category', 'सवारी साधनको वर्ग')}
              </label>
              <div className="segmented-control" style={{ width: '100%', display: 'flex' }}>
                <button
                  type="button"
                  className={`segmented-btn ${vehicleCategory === 'bike' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px 12px' }}
                  onClick={() => {
                    setVehicleCategory('bike');
                    setCorrectCount(14);
                  }}
                >
                  {t('Category A & K (Motorcycle / Scooter)', 'वर्ग क र ट (मोटरसाइकल / स्कुटर)')}
                </button>
                <button
                  type="button"
                  className={`segmented-btn ${vehicleCategory === 'car' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px 12px' }}
                  onClick={() => {
                    setVehicleCategory('car');
                    setCorrectCount(18);
                  }}
                >
                  {t('Category B (Car / Jeep / Van)', 'वर्ग ख (कार / जिप / भ्यान)')}
                </button>
              </div>
            </div>

            {/* Number of Correct Answers Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="input-label" style={{ margin: 0, fontWeight: 700 }}>
                  {t('Correct Questions Answered', 'सही उत्तर मिलाएको संख्या')}
                </label>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#003893', fontFamily: 'var(--font-mono)' }}>
                  {correctCount} / {scoreResult.totalQuestions}
                </span>
              </div>
              <input
                type="range"
                className="range-slider"
                min={0}
                max={scoreResult.totalQuestions}
                value={correctCount}
                onChange={(e) => setCorrectCount(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                <span>0 {t('Correct', 'सही')}</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>{t('Min. Pass:', 'पास हुन:')} {scoreResult.minCorrectNeeded} {t('Correct', 'सही')}</span>
                <span>{scoreResult.totalQuestions} {t('Questions', 'प्रश्न')}</span>
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#475569', lineHeight: 1.6 }}>
              <div>• {t(`Total Questions: ${scoreResult.totalQuestions} questions`, `कुल प्रश्न: ${scoreResult.totalQuestions} वटा`)}</div>
              <div>• {t(`Marks per question: ${scoreResult.marksPerQuestion} points each`, `प्रति प्रश्न अंकभार: ${scoreResult.marksPerQuestion} अंक`)}</div>
              <div>• {t('Negative marking: No (Zero deduction for wrong answers)', 'नेगेटिभ मार्किङ: छैन (गलत उत्तरको अंक काटिँदैन)')}</div>
              <div>• {t('Passing Threshold: 60 points out of 100', 'उत्तीर्णांक: १०० मा कम्तीमा ६० अंक')}</div>
            </div>
          </div>

          {/* Result Card */}
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: `2px solid ${scoreResult.isPass ? '#059669' : '#dc2626'}`,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Simulated Exam Result', 'नतिजा पूर्वानुमान')}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: scoreResult.isPass ? '#ecfdf5' : '#fef2f2',
                    color: scoreResult.isPass ? '#059669' : '#dc2626',
                    border: `1px solid ${scoreResult.isPass ? '#a7f3d0' : '#fecaca'}`
                  }}
                >
                  {scoreResult.isPass ? t('PASSED (Eligible for Trial)', 'उत्तीर्ण (ट्रायल दिन योग्य)') : t('FAILED (Below 60 Marks)', 'अनुत्तीर्ण (६० अंक नपुगेको)')}
                </span>
              </div>

              <div style={{ fontSize: '42px', fontWeight: 900, color: scoreResult.isPass ? '#059669' : '#dc2626', margin: '6px 0 10px', fontFamily: 'var(--font-mono)' }}>
                {scoreResult.totalScore} <span style={{ fontSize: '18px', fontWeight: 600, color: '#64748b' }}>/ 100</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#475569' }}>{t('Correct Answers:', 'सही उत्तर मिलाएको संख्या:')}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{scoreResult.boundedCorrect} {t('Questions', 'वटा')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#475569' }}>{t('Passing Requirement:', 'उत्तीर्ण हुन आवश्यक:')}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: '#059669' }}>{scoreResult.minCorrectNeeded} {t('Questions', 'वटा')} (60 {t('Pts', 'अंक')})</strong>
                </div>
              </div>

              <div style={{ marginTop: '18px' }}>
                <Link
                  href="/license"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#003893',
                    fontSize: '12.5px',
                    fontWeight: 750,
                    textDecoration: 'none'
                  }}
                >
                  <span>{t('Practice 500 Real Exam Questions →', '५०० वटा परीक्षा प्रश्नहरू अभ्यास गर्नुहोस् →')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRANSPORT OFFICES DIRECTORY */}
      {activeTab === 'offices' && (
        <div key="offices" className="tab-panel-smooth">
          <div style={{ marginBottom: '14px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Select Yatayat Office Noticeboard', 'यातायात कार्यालय छान्नुहोस्')}
            </label>
            <select
              value={selectedOfficeSlug}
              onChange={(e) => setSelectedOfficeSlug(e.target.value)}
              className="select-input"
              style={{ width: '100%', padding: '10px 14px', fontSize: '14px', fontWeight: 700 }}
            >
              {PROGRAMMATIC_LIKHIT_SCENARIOS.map((office) => (
                <option key={office.slug} value={office.slug}>
                  {t(office.officeNameEn, office.officeNameNe)}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="badge badge-blue">{t(selectedOffice.provinceEn, selectedOffice.provinceNe)}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '6px 0 2px' }}>
                  {t(selectedOffice.officeNameEn, selectedOffice.officeNameNe)}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                  📍 {t(selectedOffice.locationEn, selectedOffice.locationNe)}
                </div>
              </div>

              {selectedOffice.phone && (
                <div style={{ fontSize: '12.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} color="#003893" />
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>{selectedOffice.phone}</strong>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', margin: '20px 0 16px', fontSize: '13px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('Official Trial Field', 'आधिकारिक ट्रायल सेन्टर')}
                </span>
                <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {t(selectedOffice.trialCenterEn, selectedOffice.trialCenterNe)}
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  {t('SMS Verification Code', 'SMS जाँच गर्ने ढाँचा')}
                </span>
                <div style={{ fontWeight: 800, color: '#003893', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  {selectedOffice.smsCode} &lt;Applicant_ID&gt; → {selectedOffice.smsNumber}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {t('Passing Marks Rule:', 'उत्तीर्णांक नियम:')} <strong>{t(selectedOffice.passingMarksEn, selectedOffice.passingMarksNe)}</strong>
              </div>
              <Link
                href={`/likhit-result/${selectedOffice.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  color: '#003893',
                  textDecoration: 'none'
                }}
              >
                <span>{t('View Dedicated Office Page →', 'कार्यालयको पूर्ण विवरण हेर्नुहोस् →')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TRIAL & RETRIAL PROTOCOL */}
      {activeTab === 'retrial_rules' && (
        <div key="retrial_rules" className="tab-panel-smooth" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#ecfdf5', border: '1.5px solid #a7f3d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <strong style={{ fontSize: '14px', color: '#065f46' }}>
                  {t('What to Do if You PASS Likhit', 'लिखित परीक्षा उत्तीर्ण (PASS) भएपछि')}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#047857', lineHeight: 1.6 }}>
                <li>{t('Your trial date is usually scheduled on the next working day or within 2-3 days.', 'ट्रायल मिति सामान्यतया भोलिपल्ट वा २-३ दिनभित्रको तोकिन्छ।')}</li>
                <li>{t('Carry your original Citizenship card, biometric payment receipt, and medical slip.', 'नागरिकताको सक्कल, राजस्व बुझाएको रसिद र मेडिकल रिपोर्ट अनिवार्य बोक्नुहोस्।')}</li>
                <li>{t('Report to your allocated trial venue at least 30 minutes before time.', 'तोकिएको ट्रायल सेन्टरमा कम्तीमा ३० मिनेट अगावै पुग्नुपर्छ।')}</li>
              </ul>
            </div>

            <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: '#fef2f2', border: '1.5px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AlertTriangle size={18} color="#dc2626" />
                <strong style={{ fontSize: '14px', color: '#991b1b' }}>
                  {t('Retrial Policy & Rules (90-Day Rule)', 'रिट्रायल नियम तथा ९० दिनको सुविधा')}
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#b91c1c', lineHeight: 1.6 }}>
                <li>{t('If you pass Likhit, you have 3 trial attempts within 90 days without having to re-sit written exam.', 'लिखित पास गरेपछि ९० दिनभित्र ३ पटकसम्म पुनः ट्रायल (Retrial) दिन पाइन्छ।')}</li>
                <li>{t('If you fail all 3 trial attempts, you must wait 90 days before reapplying for a new license.', '३ पटक नै ट्रायल फेल भएमा ९० दिनपछि मात्र नयाँ फारम भर्न पाइन्छ।')}</li>
                <li>{t('Retrial fee is payable at the transport office counter or online.', 'रिट्रायल दस्तुर कार्यालयको राजस्व शाखामा बुझाउनुपर्छ।')}</li>
              </ul>
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '13px', color: '#1e40af' }}>
            <strong>💡 {t('New 70-Point Trial Grading System:', 'नयाँ ७० अंक भार ट्रायल प्रणाली:')}</strong>{' '}
            {t(
              'Under Nepal Government 2078/2083 driving trial directive, you no longer need 100% perfection to pass the practical driving test. You only need 70 points out of 100! Touching the line once or one foot down no longer causes instant disqualification.',
              'नेपाल सरकारको निर्देशिका अनुसार ट्रायलमा पनि अब १००% पूर्ण हुन पर्दैन, ७० अंक ल्याए पुग्छ! ८ घुमाउँदा एक पटक खुट्टा टेकेमा वा लाइन छोएमा सिधै फेल हुँदैन, निश्चित अंक मात्र काटिन्छ।'
            )}
          </div>
        </div>
      )}
    </div>
  );
}

