'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap, Copy, Check, DollarSign, Calculator } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { MobileInstantResult } from '@/components/calculators/MobileInstantResult';

export function NocTaxCalculator() {
  const { t } = useLanguage();
  const [foreignAmount, setForeignAmount] = useState<number>(10000);
  const [currency, setCurrency] = useState<'AUD' | 'USD' | 'CAD' | 'GBP' | 'EUR' | 'JPY'>('AUD');
  const [exchangeRate, setExchangeRate] = useState<number>(88.5); // Default AUD
  const [nocCount, setNocCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Exchange rates presets
  const handleCurrencyChange = (curr: 'AUD' | 'USD' | 'CAD' | 'GBP' | 'EUR' | 'JPY') => {
    setCurrency(curr);
    switch (curr) {
      case 'USD': setExchangeRate(135.2); break;
      case 'AUD': setExchangeRate(88.5); break;
      case 'CAD': setExchangeRate(98.2); break;
      case 'GBP': setExchangeRate(176.4); break;
      case 'EUR': setExchangeRate(146.8); break;
      case 'JPY': setExchangeRate(0.88); break;
    }
  };

  const calculation = useMemo(() => {
    const tuitionNpr = foreignAmount * exchangeRate;
    const educationTax3Percent = tuitionNpr * 0.03; // 3% education service fee
    const moestNocFee = nocCount * 2000; // Rs 2,000 per NOC application
    const totalPayableNpr = tuitionNpr + educationTax3Percent + moestNocFee;

    return {
      tuitionNpr,
      educationTax3Percent,
      moestNocFee,
      totalPayableNpr,
    };
  }, [foreignAmount, exchangeRate, nocCount]);

  const handleCopy = () => {
    const text = `${t('Nepal Abroad Study NOC & 3% Education Tax Summary:', 'विदेश अध्ययन NOC र ३% शिक्षा कर सारांश:')}
${t('Tuition & Living:', 'ट्युसन तथा खर्च:')} ${currency} ${foreignAmount.toLocaleString()} @ NPR ${exchangeRate}
${t('Base Tuition (NPR):', 'मूल ट्युसन शुल्क:')} रु ${Math.round(calculation.tuitionNpr).toLocaleString('en-IN')}
${t('3% Foreign Education Tax:', '३% शिक्षा सेवा शुल्क:')} रु ${Math.round(calculation.educationTax3Percent).toLocaleString('en-IN')}
${t(`MOEST NOC Fee (${nocCount}x):`, `शिक्षा मन्त्रालय NOC दस्तुर (${nocCount}x):`)} रु ${calculation.moestNocFee.toLocaleString('en-IN')}
${t('Total Payable at Bank:', 'बैंकमा जम्मा गर्नुपर्ने कुल रकम:')} रु ${Math.round(calculation.totalPayableNpr).toLocaleString('en-IN')}
Calculated via NepalCalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">{t('Nepal Finance Act', 'नेपाल आर्थिक ऐन')}</span>
            <span className="badge badge-blue">{t('3% Education Tax', '३% शिक्षा सेवा शुल्क')}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            {t('Abroad Study NOC & 3% Education Tax Calculator', 'विदेश अध्ययन NOC र ३% शिक्षा कर क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {t(
              'Calculate total NPR needed to wire tuition fees abroad including 3% government education tax and MOEST NOC fees.',
              'अन्तर्राष्ट्रिय कलेज शुल्क तथा लिभिङ खर्च बैंकबाट पठाउँदा लाग्ने ३% सरकारी शिक्षा सेवा शुल्क र NOC दस्तुर।'
            )}
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? t('Copied', 'कपी भयो') : t('Copy', 'कपी')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Input Form */}
        <div>
          {/* Mobile Instant Result Above the Fold */}
          <MobileInstantResult
            primaryLabel={t('Total NPR Required at Bank', 'बैंकमा बुझाउनुपर्ने जम्मा रकम')}
            primaryValue={`रु ${Math.round(calculation.totalPayableNpr).toLocaleString('en-IN')}`}
            primarySubtext={`${t('Base:', 'मूल रकम:')} रु ${Math.round(calculation.tuitionNpr).toLocaleString('en-IN')}`}
            secondaryLabel={t('3% Tax', '३% कर')}
            secondaryValue={`रु ${Math.round(calculation.educationTax3Percent).toLocaleString('en-IN')}`}
            tertiaryLabel={t('NOC Fee', 'NOC दस्तुर')}
            tertiaryValue={`रु ${calculation.moestNocFee.toLocaleString('en-IN')}`}
            badge={`${currency} @ NPR ${exchangeRate}`}
            accentColor="emerald"
            onCopy={handleCopy}
            copied={copied}
            targetDetailsId="noc-breakdown-details"
          />

          {/* Currency Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', display: 'block' }}>
              {t('Destination Currency', 'मुद्रा छान्नुहोस्')}
            </label>
            <div className="segmented-control" style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
              {(['AUD', 'USD', 'CAD', 'GBP', 'EUR', 'JPY'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  className={`segmented-btn ${currency === curr ? 'active' : ''}`}
                  style={{ flex: 1, minWidth: '45px', padding: '8px 10px', fontSize: '12.5px' }}
                  onClick={() => handleCurrencyChange(curr)}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Foreign Amount */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t(`Tuition & Living Amount (${currency})`, `पठाउने रकम (${currency})`)}
            </label>
            <input
              type="number"
              className="text-input"
              value={foreignAmount || ''}
              placeholder="0"
              onChange={(e) => setForeignAmount(Math.max(0, Number(e.target.value)))}
              style={{ width: '100%', padding: '12px 14px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>

          {/* Exchange Rate */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t(`Exchange Rate (1 ${currency} = NPR)`, `नेपाल राष्ट्र बैंक विनिमय दर (१ ${currency} = रू)`)}
            </label>
            <input
              type="number"
              step="0.01"
              className="text-input"
              value={exchangeRate || ''}
              placeholder="0.00"
              onChange={(e) => setExchangeRate(Math.max(0, Number(e.target.value)))}
              style={{ width: '100%', padding: '12px 14px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>

          {/* NOC Application Count */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              {t('NOC Applications (MOEST @ Rs 2,000 each)', 'NOC आवेदन संख्या (प्रति आवेदन रू २,०००)')}
            </label>
            <input
              type="number"
              className="text-input"
              value={nocCount || ''}
              min={1}
              onChange={(e) => setNocCount(Math.max(1, Number(e.target.value)))}
              style={{ width: '100%', padding: '12px 14px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>

        {/* Breakdown Card */}
        <div>
          <div
            id="noc-breakdown-details"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #003893',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0, 56, 147, 0.08)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('Total NPR Required at Bank', 'बैंकमा बुझाउनुपर्ने जम्मा रकम')}
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#003893', margin: '6px 0 16px', fontFamily: 'var(--font-mono)' }}>
              रु {Math.round(calculation.totalPayableNpr).toLocaleString('en-IN')}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>{t('Base Tuition Amount', 'मूल ट्युसन रकम')} ({currency} {foreignAmount.toLocaleString()}):</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>रु {Math.round(calculation.tuitionNpr).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e11d48' }}>
                <span>{t('3% Education Service Tax', '३% शिक्षा सेवा शुल्क')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>+ रु {Math.round(calculation.educationTax3Percent).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
                <span>{t(`MOEST NOC Verification Fee (${nocCount}x)`, `शिक्षा मन्त्रालय NOC दस्तुर (${nocCount}x)`)}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>+ रु {calculation.moestNocFee.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 700 }}>{t('Effective Cost per Unit', '१ विदेशी मुद्रा बराबर कुल लागत')}:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  NPR {foreignAmount > 0 ? (calculation.totalPayableNpr / foreignAmount).toFixed(2) : exchangeRate}
                </strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: 1.5 }}>
              💡 {t(
                'Note: Under Nepal Finance Act, class A commercial banks automatically collect 3% education service tax before processing TT (Telegraphic Transfer) or Swift international college fee payments.',
                'नोट: नेपाल आर्थिक ऐन अनुसार ‘क’ वर्गका वाणिज्य बैंकहरूले विदेशमा कलेज शुल्क स्विफ्ट (SWIFT/TT) मार्फत पठाउँदा ३% शिक्षा सेवा शुल्क अनिवार्य रूपमा असुल गर्दछन्।'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
