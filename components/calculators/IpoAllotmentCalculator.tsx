'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, Users, Percent, Coins, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function IpoAllotmentCalculator() {
  const { t } = useLanguage();
  const [totalKittaOffered, setTotalKittaOffered] = useState<number>(1500000); // 15 Lakh kitta
  const [totalApplicants, setTotalApplicants] = useState<number>(1200000); // 12 Lakh applicants
  const [casbaCharge, setCasbaCharge] = useState<number>(5); // NPR 5 avg C-ASBA fee
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // 10 kitta per lucky applicant
    const luckyAllottees = Math.floor(totalKittaOffered / 10);
    const validApplicants = Math.max(1, totalApplicants);

    let probabilityPercent = 100;
    let oddsRatioEn = 'All applicants guaranteed 10 kitta';
    let oddsRatioNe = 'सबै आवेदकलाई कम्तीमा १० कित्ता सुनिश्चित';
    let isGuaranteed = false;

    if (luckyAllottees >= validApplicants) {
      probabilityPercent = 100;
      isGuaranteed = true;
      oddsRatioEn = '100% Guaranteed Allotment (10 Kitta each)';
      oddsRatioNe = '१००% सबै आवेदकलाई १० कित्ता सुनिश्चित';
    } else {
      probabilityPercent = Math.min(100, (luckyAllottees / validApplicants) * 100);
      const oneInN = Math.round(validApplicants / luckyAllottees);
      oddsRatioEn = `1 in ${oneInN} applicants gets 10 shares`;
      oddsRatioNe = `प्रत्येक ${oneInN} जना आवेदक मध्ये १ जनालाई १० कित्ता`;
    }

    const oversubscriptionTimes = (validApplicants * 10) / Math.max(1, totalKittaOffered);
    const totalRequiredFund = 1000 + casbaCharge; // Rs 1,000 for 10 kitta @ Rs 100 par value + C-ASBA

    return {
      luckyAllottees,
      probabilityPercent: Number(probabilityPercent.toFixed(2)),
      oversubscriptionTimes: Number(oversubscriptionTimes.toFixed(2)),
      oddsRatioEn,
      oddsRatioNe,
      isGuaranteed,
      totalRequiredFund,
    };
  }, [totalKittaOffered, totalApplicants, casbaCharge]);

  const handleCopy = () => {
    const text = `${t('Nepal IPO Allotment Probability Summary:', 'नेपाल आईपीओ बाँडफाँड सम्भावना सारांश:')}
${t('Total Public Kitta:', 'सार्वजनिक कित्ता:')} ${totalKittaOffered.toLocaleString()}
${t('Total Applicants:', 'कुल आवेदक:')} ${totalApplicants.toLocaleString()}
${t('Lucky Allottees (10 Kitta each):', '१० कित्ता पाउने भाग्यमानी संख्या:')} ${calculation.luckyAllottees.toLocaleString()}
${t('Oversubscription:', 'ओभरसब्स्क्रिप्सन:')} ${calculation.oversubscriptionTimes}x
${t('Allotment Probability:', 'सेयर पर्ने सम्भावना:')} ${calculation.probabilityPercent}% (${t(calculation.oddsRatioEn, calculation.oddsRatioNe)})
${t('Required Bank Balance:', 'आवश्यक बैंक मौज्दात:')} रु ${calculation.totalRequiredFund}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('MeroShare & CDSC', 'मेरोसेयर तथा सीडीएससी')}</span>
            <span className="badge badge-blue">{t('10 Kitta Lottery System', '१० कित्ता गोलाप्रथा')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('Nepal IPO Allotment Probability Calculator', 'मेरोसेयर आईपीओ बाँडफाँड सम्भावना क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              'Calculate your chances of getting 10 shares in a public IPO lottery based on issued units and total applicants.',
              'कम्पनीको निष्कासित कित्ता र कुल आवेदक संख्याका आधारमा १० कित्ता सेयर पर्ने सम्भावना र ओभरसब्स्क्रिप्सन।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        <div>
          {/* Mobile Instant Above-the-fold Result */}
          <MobileInstantResult
            primaryLabel={t('Allotment Chance', 'सेयर पर्ने सम्भावना')}
            primaryValue={`${calculation.probabilityPercent}%`}
            primarySubtext={t(calculation.oddsRatioEn, calculation.oddsRatioNe)}
            secondaryLabel={t('Lucky Applicants', 'पाउने संख्या')}
            secondaryValue={calculation.luckyAllottees.toLocaleString()}
            tertiaryLabel={t('Oversubscribed', 'गुणा ओभर')}
            tertiaryValue={`${calculation.oversubscriptionTimes}x`}
            badge={t('10 Kitta Lottery Rule', '१० कित्ता गोलाप्रथा')}
            accentColor={calculation.probabilityPercent > 50 ? 'emerald' : 'blue'}
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="ipo-breakdown-details"
          />

          {/* Total Shares Offered */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Total Public Shares Offered (Kitta)', 'सर्वसाधारणका लागि खुला गरिएको कित्ता')}
            </label>
            <input
              type="number"
              className="text-input"
              value={totalKittaOffered || ''}
              placeholder="0"
              onChange={(e) => setTotalKittaOffered(Math.max(10, Number(e.target.value)))}
              style={{ width: '100%', padding: '12px 14px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              {t('e.g., 1,500,000 kitta (150,000 lucky applicants)', 'उदा: १५,००,००० कित्ता (१,५०,००० जनालाई १० कित्ता)')}
            </div>
          </div>

          {/* Total Applicants */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Total Verified Applicants', 'कुल आवेदन गर्ने आवेदक संख्या')}
            </label>
            <input
              type="number"
              className="text-input"
              value={totalApplicants || ''}
              placeholder="0"
              onChange={(e) => setTotalApplicants(Math.max(1, Number(e.target.value)))}
              style={{ width: '100%', padding: '12px 14px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              {t('Typically 1.0 to 1.4 million in Nepal IPOs', 'नेपालमा सामान्यतया १० लाख देखि १४ लाख आवेदन पर्ने गर्छ')}
            </div>
          </div>

          {/* C-ASBA Fee */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('Bank C-ASBA Service Charge (Rs 0 to 25)', 'बैंक C-ASBA सेवा शुल्क (रु ० देखि २५)')}
            </label>
            <input
              type="number"
              className="text-input"
              value={casbaCharge || ''}
              placeholder="0"
              onChange={(e) => setCasbaCharge(Math.max(0, Number(e.target.value)))}
              style={{ width: '100%', padding: '10px 14px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>

        {/* Clean Light-Themed Output Card */}
        <div>
          <div
            id="ipo-breakdown-details"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('10 Kitta Allotment Probability', '१० कित्ता सेयर पर्ने सम्भावना')}
            </span>
            <div
              style={{
                fontSize: '40px',
                fontWeight: 900,
                color: calculation.probabilityPercent > 50 ? '#059669' : '#003893',
                margin: '6px 0 6px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {calculation.probabilityPercent}%
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '16px' }}>
              {t(calculation.oddsRatioEn, calculation.oddsRatioNe)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Lucky Allottees', 'भाग्यमानी पाउने आवेदक')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.luckyAllottees.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Oversubscription Rate', 'ओभरसब्स्क्रिप्सन दर')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>{calculation.oversubscriptionTimes}x</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#003893' }}>
                <span style={{ fontWeight: 700 }}>{t('Bank Balance Blocked', 'बैंक खातामा रोक्का हुने रकम')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>रु {calculation.totalRequiredFund.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                'SEBON Rule: All public IPOs in Nepal follow the 10 kitta fair lottery distribution policy. If unallotted, your Rs 1,000 application fund is automatically unblocked in your bank account.',
                'सेबोन नियम: नेपालमा निष्कासित साधारण सेयर १० कित्ता नीति अनुसार गोलाप्रथाबाट निष्पक्ष बाँडफाँड हुन्छ। सेयर नपरेको खण्डमा रू १,००० रकम स्वतः खातामा फुकुवा हुन्छ।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
