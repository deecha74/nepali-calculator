'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, Users, Percent, Coins, Sparkles } from 'lucide-react';

export function IpoAllotmentCalculator() {
  const [totalKittaOffered, setTotalKittaOffered] = useState<number>(1500000); // 15 Lakh kitta
  const [totalApplicants, setTotalApplicants] = useState<number>(1200000); // 12 Lakh applicants
  const [casbaCharge, setCasbaCharge] = useState<number>(5); // NPR 5 avg C-ASBA fee
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    // 10 kitta per lucky applicant
    const luckyAllottees = Math.floor(totalKittaOffered / 10);
    const validApplicants = Math.max(1, totalApplicants);

    let probabilityPercent = 100;
    let oddsRatio = '१००% सबैलाई १० कित्ता (All Get 10 Kitta)';
    let isGuaranteed = false;

    if (luckyAllottees >= validApplicants) {
      probabilityPercent = 100;
      isGuaranteed = true;
      oddsRatio = 'सबै आवेदकलाई कम्तीमा १० कित्ता सुनिश्चित (100% Guaranteed)';
    } else {
      probabilityPercent = Math.min(100, (luckyAllottees / validApplicants) * 100);
      const oneInN = Math.round(validApplicants / luckyAllottees);
      oddsRatio = `प्रत्येक ${oneInN} जना आवेदक मध्ये १ जनालाई (1 in ${oneInN} applicants)`;
    }

    const oversubscriptionTimes = (validApplicants * 10) / Math.max(1, totalKittaOffered);
    const totalRequiredFund = 1000 + casbaCharge; // Rs 1,000 for 10 kitta @ Rs 100 par value + C-ASBA

    return {
      luckyAllottees,
      probabilityPercent: Number(probabilityPercent.toFixed(2)),
      oversubscriptionTimes: Number(oversubscriptionTimes.toFixed(2)),
      oddsRatio,
      isGuaranteed,
      totalRequiredFund,
    };
  }, [totalKittaOffered, totalApplicants, casbaCharge]);

  const handleCopy = () => {
    const text = `Nepal IPO Allotment Probability (मेरोसेयर):
Total Public Kitta: ${totalKittaOffered.toLocaleString()} Kitta
Total Applicants: ${totalApplicants.toLocaleString()}
Lucky Allottees (10 Kitta each): ${calculation.luckyAllottees.toLocaleString()}
Oversubscription: ${calculation.oversubscriptionTimes}x
Probability of Allotment: ${calculation.probabilityPercent}% (${calculation.oddsRatio})
Required Bank Balance: रु ${calculation.totalRequiredFund}
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
            <span className="badge badge-emerald">MeroShare & CDSC</span>
            <span className="badge badge-blue">१० कित्ता गोलाप्रथा (Lottery Probability)</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            मेरोसेयर आईपीओ बाँडफाँड सम्भावना क्याल्कुलेटर
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            कम्पनीको निष्कासित कित्ता र कुल आवेदक संख्याका आधारमा १० कित्ता सेयर पर्ने सम्भावना (Allotment Odds) र ओभरसब्स्क्रिप्सन।
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        <div>
          {/* Total Shares Offered */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              सर्वसाधारणका लागि खुला गरिएको कित्ता (Public Shares)
            </label>
            <input
              type="number"
              value={totalKittaOffered}
              onChange={(e) => setTotalKittaOffered(Math.max(10, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '16px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              उदा: १५,००,००० कित्ता (अर्थात् १,५०,००० जनालाई १० कित्ता)
            </div>
          </div>

          {/* Total Applicants */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              कुल आवेदन गर्ने आवेदक संख्या (Total Applicants)
            </label>
            <input
              type="number"
              value={totalApplicants}
              onChange={(e) => setTotalApplicants(Math.max(1, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '16px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
              नेपालमा सामान्यतया १० लाख देखि १३ लाख आवेदन पर्ने गर्छ।
            </div>
          </div>

          {/* C-ASBA Fee */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              बैंक C-ASBA सेवा शुल्क (रु ० देखि २५)
            </label>
            <input
              type="number"
              value={casbaCharge}
              onChange={(e) => setCasbaCharge(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Output Card */}
        <div>
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              १० कित्ता सेयर पर्ने सम्भावना (Allotment Probability)
            </span>
            <div style={{ fontSize: '42px', fontWeight: 900, color: calculation.probabilityPercent > 50 ? '#4ade80' : '#38bdf8', margin: '6px 0 12px' }}>
              {calculation.probabilityPercent}%
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>
              {calculation.oddsRatio}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>भाग्यमानी पाउने आवेदक:</span>
                <strong>{calculation.luckyAllottees.toLocaleString()} जना</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>ओभरसब्स्क्रिप्सन (Oversubscription):</span>
                <strong>{calculation.oversubscriptionTimes} गुणा</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24' }}>
                <span>बैंक खातामा आवश्यक रकम:</span>
                <strong>रु {calculation.totalRequiredFund.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              💡 सेबोन (SEBON) नियम: १० कित्ता नीति अनुसार गोलाप्रथा (Lottery Draw) बाट निष्पक्ष बाँडफाँड गरिन्छ। नपरेको खण्डमा रू १,००० रकम स्वतः फुकुवा हुन्छ।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
