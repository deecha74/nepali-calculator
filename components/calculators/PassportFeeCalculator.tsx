'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Copy, Check, Info, ShieldCheck, MapPin } from 'lucide-react';
import { toNepaliDigits } from '@/lib/nepaliDate';

export function PassportFeeCalculator() {
  const [pageCount, setPageCount] = useState<'34' | '66'>('34');
  const [submissionLocation, setSubmissionLocation] = useState<'dao' | 'dop_urgent' | 'embassy'>('dao');
  const [isMinor, setIsMinor] = useState<boolean>(false); // Below 10 years
  const [isLostOrDamaged, setIsLostOrDamaged] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    let feeNpr = 5000;
    let feeUsd = 0;

    if (submissionLocation === 'embassy') {
      feeUsd = pageCount === '34' ? 80 : 160;
      if (isLostOrDamaged) feeUsd *= 2;
      if (isMinor) feeUsd = Math.round(feeUsd / 2);
      return { feeNpr: feeUsd * 135, feeUsd, isForeign: true };
    }

    if (submissionLocation === 'dop_urgent') {
      feeNpr = pageCount === '34' ? 10000 : 20000;
    } else {
      feeNpr = pageCount === '34' ? 5000 : 10000;
    }

    if (isLostOrDamaged) {
      feeNpr = submissionLocation === 'dop_urgent' ? (pageCount === '34' ? 15000 : 25000) : (pageCount === '34' ? 10000 : 15000);
    } else if (isMinor) {
      feeNpr = Math.round(feeNpr / 2);
    }

    return { feeNpr, feeUsd: 0, isForeign: false };
  }, [pageCount, submissionLocation, isMinor, isLostOrDamaged]);

  const handleCopy = () => {
    const text = `Nepal e-Passport Fee Summary:
Pages: ${pageCount} Pages
Application Center: ${submissionLocation === 'dop_urgent' ? 'Department of Passport, Tripureshwor (Urgent 3-Day)' : submissionLocation === 'dao' ? 'District Administration Office (DAO)' : 'Embassy Abroad'}
Minor (Under 10): ${isMinor ? 'Yes (50% Off)' : 'No'}
Lost/Damaged: ${isLostOrDamaged ? 'Yes' : 'No'}
Total Fee: ${calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">Department of Passport (राहदानी विभाग)</span>
            <span className="badge badge-blue">e-Passport Rates 2083</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            विद्युतीय राहदानी (e-Passport) दस्तुर क्याल्कुलेटर
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            जिल्ला प्रशासन कार्यालय (DAO), राहदानी विभाग त्रिपुरेश्वर (द्रुत सेवा) तथा विदेशस्थित नेपाली दूतावासको आधिकारिक राजस्व शुल्क।
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Controls */}
        <div>
          {/* Submission Location */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              आवेदन पेश गर्ने स्थान (Application Center)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSubmissionLocation('dao')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: submissionLocation === 'dao' ? '#003893' : '#e2e8f0',
                  backgroundColor: submissionLocation === 'dao' ? '#eff6ff' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '13.5px', color: submissionLocation === 'dao' ? '#003893' : '#0f172a' }}>
                  जिल्ला प्रशासन कार्यालय / इलाका प्रशासन (DAO)
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>सामान्य समय: १० देखし १५ दिन (Regular processing)</div>
              </button>

              <button
                type="button"
                onClick={() => setSubmissionLocation('dop_urgent')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: submissionLocation === 'dop_urgent' ? '#c8102e' : '#e2e8f0',
                  backgroundColor: submissionLocation === 'dop_urgent' ? '#fef2f2' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '13.5px', color: submissionLocation === 'dop_urgent' ? '#c8102e' : '#0f172a' }}>
                  राहदानी विभाग, त्रिपुरेश्वर काठमाडौँ (द्रुत सेवा)
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>अति जरुरी: २ देखि ३ कार्यदिन (Fast-track within 3 days)</div>
              </button>

              <button
                type="button"
                onClick={() => setSubmissionLocation('embassy')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: submissionLocation === 'embassy' ? '#059669' : '#e2e8f0',
                  backgroundColor: submissionLocation === 'embassy' ? '#ecfdf5' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '13.5px', color: submissionLocation === 'embassy' ? '#059669' : '#0f172a' }}>
                  विदेशस्थित नेपाली दूतावास / नियोग (Nepali Embassy Abroad)
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>शुल्क USD $८० देखि $१६० (Payment in foreign currency)</div>
              </button>
            </div>
          </div>

          {/* Page Count */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              राहदानीको पृष्ठ संख्या (Passport Pages)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setPageCount('34')}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: pageCount === '34' ? '#003893' : '#cbd5e1',
                  backgroundColor: pageCount === '34' ? '#003893' : '#ffffff',
                  color: pageCount === '34' ? '#ffffff' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                ३४ पृष्ठ (साधारण यात्रु)
              </button>
              <button
                type="button"
                onClick={() => setPageCount('66')}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: pageCount === '66' ? '#003893' : '#cbd5e1',
                  backgroundColor: pageCount === '66' ? '#003893' : '#ffffff',
                  color: pageCount === '66' ? '#ffffff' : '#0f172a',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                ६६ पृष्ठ (बारम्बार यात्रा गर्ने)
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isMinor}
                onChange={(e) => {
                  setIsMinor(e.target.checked);
                  if (e.target.checked) setIsLostOrDamaged(false);
                }}
              />
              <span>१० वर्ष मुनिका नाबालिग (Minor: ५०% छुट - ५ वर्षे म्याद)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isLostOrDamaged}
                onChange={(e) => {
                  setIsLostOrDamaged(e.target.checked);
                  if (e.target.checked) setIsMinor(false);
                }}
              />
              <span>हराएको वा च्यातिएको राहदानी नवीकरण (Lost / Damaged)</span>
            </label>
          </div>
        </div>

        {/* Output Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              तिर्नुपर्ने कुल राजस्व दस्तुर
            </span>
            <div style={{ fontSize: '38px', fontWeight: 900, color: '#38bdf8', margin: '8px 0' }}>
              {calculation.isForeign ? `$${calculation.feeUsd} USD` : `रु ${calculation.feeNpr.toLocaleString('en-IN')}`}
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
              {calculation.isForeign ? `नेपाली रुपैयाँ करिब रु ${(calculation.feeNpr).toLocaleString('en-IN')}` : `अक्षरमा: ${calculation.feeNpr === 5000 ? 'पाँच हजार' : calculation.feeNpr === 10000 ? 'दश हजार' : calculation.feeNpr === 2500 ? 'दुई हजार पाँच सय' : calculation.feeNpr === 15000 ? 'पन्ध्र हजार' : calculation.feeNpr === 20000 ? 'बीस हजार' : 'पच्चीस हजार'} रुपैयाँ मात्र`}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '20px', paddingTop: '16px', textAlign: 'left', fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>
              <div>• भुक्तानी: नेपाल बैंक लिमिटेड / राष्ट्रिय वाणिज्य बैंक वा अनलाइन eSewa/ConnectIPS मार्फत राजस्व दाखिला।</div>
              <div>• बायोमेट्रिक मितिमा नागरिकताको सक्कल, राष्ट्रिय परिचयपत्र (NIN) नम्बर र अनलाइन फारमको प्रिन्ट अनिवार्य छ।</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
