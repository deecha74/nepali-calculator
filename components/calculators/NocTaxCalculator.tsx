'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap, Copy, Check, DollarSign, Calculator } from 'lucide-react';

export function NocTaxCalculator() {
  const [foreignAmount, setForeignAmount] = useState<number>(10000);
  const [currency, setCurrency] = useState<'USD' | 'AUD' | 'CAD' | 'GBP' | 'EUR' | 'JPY'>('AUD');
  const [exchangeRate, setExchangeRate] = useState<number>(88.5); // Default AUD
  const [nocCount, setNocCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Exchange rates presets
  const handleCurrencyChange = (curr: 'USD' | 'AUD' | 'CAD' | 'GBP' | 'EUR' | 'JPY') => {
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
    const text = `Nepal Abroad Study NOC & 3% Education Tax:
Tuition / Living Amount: ${currency} ${foreignAmount.toLocaleString()} @ NPR ${exchangeRate}
Base Tuition: रु ${Math.round(calculation.tuitionNpr).toLocaleString('en-IN')}
3% Foreign Education Tax (शिक्षा सेवा शुल्क): रु ${Math.round(calculation.educationTax3Percent).toLocaleString('en-IN')}
MOEST NOC Verification (${nocCount}): रु ${calculation.moestNocFee.toLocaleString('en-IN')}
Total NPR Needed at Commercial Bank: रु ${Math.round(calculation.totalPayableNpr).toLocaleString('en-IN')}
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
            <span className="badge badge-emerald">Nepal Finance Act 2083/84</span>
            <span className="badge badge-blue">३% शिक्षा सेवा शुल्क (Education Tax)</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>
            विदेश अध्ययन NOC र ३% शिक्षा कर क्याल्कुलेटर
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            अन्तर्राष्ट्रिय कलेज शुल्क (Tuition) तथा लिभिङ खर्च बैंकबाट पठाउँदा लाग्ने ३% सरकारी शिक्षा सेवा शुल्क र NOC दस्तुर।
          </p>
        </div>

        <button onClick={handleCopy} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
          {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Input Form */}
        <div>
          {/* Currency Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              मुद्रा छान्नुहोस् (Destination Currency)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(['AUD', 'USD', 'CAD', 'GBP', 'EUR', 'JPY'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => handleCurrencyChange(curr)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1.5px solid',
                    borderColor: currency === curr ? '#003893' : '#cbd5e1',
                    backgroundColor: currency === curr ? '#003893' : '#ffffff',
                    color: currency === curr ? '#ffffff' : '#0f172a',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Foreign Amount */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              पठाउने रकम ({currency} Tuition & Living Amount)
            </label>
            <input
              type="number"
              value={foreignAmount}
              onChange={(e) => setForeignAmount(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          {/* Exchange Rate */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              नेपाल राष्ट्र बैंक विनिमय दर (1 {currency} = NPR)
            </label>
            <input
              type="number"
              step="0.01"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          {/* NOC Application Count */}
          <div style={{ marginBottom: '16px' }}>
            <label className="input-label" style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
              NOC आवेदन संख्या (MOEST Application @ रू २,०००)
            </label>
            <input
              type="number"
              value={nocCount}
              onChange={(e) => setNocCount(Math.max(1, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Breakdown Card */}
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
              बैंकमा बुझाउनुपर्ने जम्मा रकम (Total NPR Required)
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#38bdf8', margin: '8px 0 16px' }}>
              रु {Math.round(calculation.totalPayableNpr).toLocaleString('en-IN')}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>मूल शुल्क ({currency} {foreignAmount.toLocaleString()}):</span>
                <strong>रु {Math.round(calculation.tuitionNpr).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                <span>३% शिक्षा सेवा शुल्क (Government Tax):</span>
                <strong>+ रु {Math.round(calculation.educationTax3Percent).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24' }}>
                <span>शिक्षा मन्त्रालय NOC शुल्क ({nocCount}x):</span>
                <strong>+ रु {calculation.moestNocFee.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              💡 सूचना: वाणिज्य बैंकहरूले SWIFT शुल्क (रू १,००० देखि १,५००) तथा TELEX कमिसन थप गर्न सक्नेछन्।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
